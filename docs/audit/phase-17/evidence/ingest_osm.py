#!/usr/bin/env python3
"""Phase 17 — deterministic offline ingest of the OSM pilot response.

Reads the raw OSM API XML saved under /tmp/osm17/osm-pilot-raw.xml
(GET https://api.openstreetmap.org/api/0.6/map?bbox=108.188181,16.040844,108.216217,16.067955,
retrieved 2026-11-20, SHA-256 recorded in ingest-report.json) and emits a
compact, delta-encoded JSON asset for the repo
(src/worlds/danang/data/danang-gis-pilot.ts is generated from it).

Python standard library only. No network access. Deterministic output:
input order is OSM document order, floats are rounded, no timestamps or
randomness are embedded (the retrieval date is recorded, not generated).

Coordinate math mirrors src/engine/geospatial/core.ts exactly:
WGS84 (a=6378137, 1/f=298.257223563), geodetic -> ECEF -> ENU about the
anchor (lat 16.0544, lon 108.2022, h=0) -> world (x=east, y=up, z=-north).
Coordinates are stored as integer decimetres (0.1 m) of world x/z,
delta-encoded per feature (first vertex absolute, rest deltas).

Policies (documented, never silent):
- Roads: ways with a `highway` tag. `highway=proposed` is REJECTED (not
  built). Ways with < 2 distinct vertices after clipping are rejected.
- Buildings: closed ways with a `building` tag, plus type=multipolygon
  relations with a `building` tag (outer/inner roles). Open building ways
  are rejected. `building=roof` is kept as a footprint-only kind (a roof
  has no walls to extrude; height provenance stays unknown).
- Width: NO road in the pilot carries a `width` tag, so every width is
  an ESTIMATED class default (see ROAD_WIDTH_DEFAULTS_M). Never
  presented as measured.
- Height: `height` tag (metres) = KNOWN; else `building:levels` x 3.0 m
  per level = ESTIMATED (assumption stated in the asset and the report);
  else UNKNOWN = footprint-only, never invented.
- Geometry: vertices are projected to world metres, then clipped to the
  pilot ENU rectangle (the bbox corners projected to ENU, min/max).
  Roads are clipped segment-wise (Liang-Barsky); buildings are clipped
  with Sutherland-Hodgman. A building whose clipped area is < 25% of the
  original or < 4 m^2 is rejected as out-of-bounds. Self-intersecting
  rings are REJECTED, never silently repaired. Ring orientation is
  normalised (outer CCW, holes CW in lon/lat plane, i.e. positive /
  negative signed area in x=east, y=north).
- Dedupe: OSM ids are unique by construction; a second identical id is
  rejected. Identical geometries (same rounded vertices) are rejected
  as duplicates.
"""

import hashlib
import json
import math
import sys
import xml.etree.ElementTree as ET
from collections import Counter

RAW_PATH = "/tmp/osm17/osm-pilot-raw.xml"
OUT_JSON = "/tmp/osm17/danang-gis-pilot.json"
REPORT_PATH = "/tmp/osm17/ingest-report.json"

ANCHOR_LAT = 16.0544
ANCHOR_LON = 108.2022
BBOX = (108.188181, 16.040844, 108.216217, 16.067955)  # west, south, east, north

# WGS84 — same constants as src/engine/geospatial/core.ts
A = 6378137.0
F = 1.0 / 298.257223563
E2 = F * (2 - F)

# Class-based road widths (metres). ESTIMATED defaults, not measurements:
# Vietnamese urban road practice for the pilot's classes; every rendered
# road carries widthProvenance="estimated" unless a source width exists
# (none does in this pilot). Footways/paths/steps get a narrow strip.
ROAD_WIDTH_DEFAULTS_M = {
    "primary": 14.0, "primary_link": 7.0,
    "secondary": 10.0, "secondary_link": 7.0,
    "tertiary": 8.0, "tertiary_link": 6.0,
    "residential": 6.0, "living_street": 5.0,
    "unclassified": 5.0, "service": 4.0,
    "pedestrian": 6.0, "footway": 2.0, "path": 2.0,
    "steps": 2.0, "track": 3.0,
}
# Highway values with no width default are rejected (unknown class).
METERS_PER_LEVEL = 3.0  # documented assumption for levels-derived heights

# --- geodetic math (mirrors src/engine/geospatial/core.ts) ---

def geodetic_to_ecef(lat_deg, lon_deg, h=0.0):
    lat = math.radians(lat_deg)
    lon = math.radians(lon_deg)
    sin_lat = math.sin(lat)
    n = A / math.sqrt(1 - E2 * sin_lat * sin_lat)
    return (
        (n + h) * math.cos(lat) * math.cos(lon),
        (n + h) * math.cos(lat) * math.sin(lon),
        (n * (1 - E2) + h) * sin_lat,
    )

_ANCHOR_ECEF = geodetic_to_ecef(ANCHOR_LAT, ANCHOR_LON, 0.0)
_SIN_LAT = math.sin(math.radians(ANCHOR_LAT))
_COS_LAT = math.cos(math.radians(ANCHOR_LAT))
_SIN_LON = math.sin(math.radians(ANCHOR_LON))
_COS_LON = math.cos(math.radians(ANCHOR_LON))

def lonlat_to_world(lon_deg, lat_deg):
    """(lon, lat) -> (worldX east m, worldZ south-positive m)."""
    x, y, z = geodetic_to_ecef(lat_deg, lon_deg, 0.0)
    dx, dy, dz = x - _ANCHOR_ECEF[0], y - _ANCHOR_ECEF[1], z - _ANCHOR_ECEF[2]
    east = -_SIN_LON * dx + _COS_LON * dy
    north = -_SIN_LAT * _COS_LON * dx - _SIN_LAT * _SIN_LON * dy + _COS_LAT * dz
    return east, -north  # world z = -north

# Pilot clip rectangle in world metres (bbox corners projected, min/max).
_CORNERS = [
    lonlat_to_world(BBOX[0], BBOX[1]),
    lonlat_to_world(BBOX[2], BBOX[1]),
    lonlat_to_world(BBOX[0], BBOX[3]),
    lonlat_to_world(BBOX[2], BBOX[3]),
]
CLIP = (
    min(c[0] for c in _CORNERS), min(c[1] for c in _CORNERS),
    max(c[0] for c in _CORNERS), max(c[1] for c in _CORNERS),
)

# --- geometry helpers (world x/z plane; z is south-positive here) ---

def clip_polyline_liang_barsky(points):
    """Clip an open polyline to CLIP; returns list of disjoint clipped runs."""
    xmin, zmin, xmax, zmax = CLIP
    runs, current = [], []
    for (x1, z1), (x2, z2) in zip(points, points[1:]):
        dx, dz = x2 - x1, z2 - z1
        t0, t1 = 0.0, 1.0
        ok = True
        for p, q in ((-dx, x1 - xmin), (dx, xmax - x1), (-dz, z1 - zmin), (dz, zmax - z1)):
            if p == 0:
                if q < 0:
                    ok = False
                    break
            else:
                t = q / p
                if p < 0:
                    if t > t1:
                        ok = False
                        break
                    t0 = max(t0, t)
                else:
                    if t < t0:
                        ok = False
                        break
                    t1 = min(t1, t)
        if not ok or t0 > t1:
            if len(current) >= 2:
                runs.append(current)
            current = []
            continue
        a = (x1 + dx * t0, z1 + dz * t0)
        b = (x1 + dx * t1, z1 + dz * t1)
        if not current:
            current = [a, b]
        else:
            # Continue the run if the segment starts where the run ended.
            if math.hypot(a[0] - current[-1][0], a[1] - current[-1][1]) < 1e-9:
                current.append(b)
            else:
                if len(current) >= 2:
                    runs.append(current)
                current = [a, b]
    if len(current) >= 2:
        runs.append(current)
    return runs

def clip_polygon_sutherland(points):
    """Clip a closed ring (last point == first) to CLIP; returns a ring or []."""
    xmin, zmin, xmax, zmax = CLIP
    poly = points[:-1]  # drop duplicated closure
    # Explicit per-edge clipping (left, right, top(zmin), bottom(zmax)).
    def clip_edge(poly, inside, intersect):
        if not poly:
            return []
        out = []
        for i, cur in enumerate(poly):
            prev = poly[i - 1]
            cur_in, prev_in = inside(*cur), inside(*prev)
            if cur_in:
                if not prev_in:
                    out.append(intersect(prev, cur))
                out.append(cur)
            elif prev_in:
                out.append(intersect(prev, cur))
        return out
    poly = clip_edge(poly, lambda x, z: x >= xmin,
                     lambda p, c: (xmin, p[1] + (c[1] - p[1]) * (xmin - p[0]) / (c[0] - p[0]) if c[0] != p[0] else p[1]))
    poly = clip_edge(poly, lambda x, z: x <= xmax,
                     lambda p, c: (xmax, p[1] + (c[1] - p[1]) * (xmax - p[0]) / (c[0] - p[0]) if c[0] != p[0] else p[1]))
    poly = clip_edge(poly, lambda x, z: z >= zmin,
                     lambda p, c: (p[0] + (c[0] - p[0]) * (zmin - p[1]) / (c[1] - p[1]) if c[1] != p[1] else p[0], zmin))
    poly = clip_edge(poly, lambda x, z: z <= zmax,
                     lambda p, c: (p[0] + (c[0] - p[0]) * (zmax - p[1]) / (c[1] - p[1]) if c[1] != p[1] else p[0], zmax))
    if len(poly) < 3:
        return []
    poly.append(poly[0])
    return poly

def signed_area_xy(points):
    """Signed area with x=east, y=north (so z=-y here). Positive = CCW."""
    s = 0.0
    for (x1, z1), (x2, z2) in zip(points, points[1:]):
        s += x1 * (-z2) - x2 * (-z1)
    return s / 2.0

def polygon_area(points):
    return abs(signed_area_xy(points))

def segments_intersect(a, b, c, d):
    def orient(p, q, r):
        v = (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
        return 0 if abs(v) < 1e-12 else (1 if v > 0 else -1)
    o1, o2, o3, o4 = orient(a, b, c), orient(a, b, d), orient(c, d, a), orient(c, d, b)
    return o1 != o2 and o3 != o4

def ring_self_intersects(ring):
    pts = ring[:-1]
    n = len(pts)
    for i in range(n):
        for j in range(i + 2, n):
            if i == 0 and j == n - 1:
                continue  # adjacent via closure
            if segments_intersect(pts[i], pts[(i + 1) % n], pts[j], pts[(j + 1) % n]):
                return True
    return False

def dedupe_consecutive(points):
    out = []
    for p in points:
        if not out or math.hypot(p[0] - out[-1][0], p[1] - out[-1][1]) > 1e-9:
            out.append(p)
    return out

def parse_meters(value):
    """Parse an OSM height/width tag value in metres; None when unparsable."""
    if value is None:
        return None
    v = value.strip().lower().replace("m", "").strip()
    try:
        num = float(v)
    except ValueError:
        return None
    return num if math.isfinite(num) and num >= 0 else None

def quantize_dm_points(points):
    """Round world-metre points to integer decimetres and drop consecutive
    duplicates. Distinct metre points can collapse to one decimetre cell,
    so this must run BEFORE the asset is written — otherwise the decoder
    (which rejects consecutive duplicate points) would fail on real data.
    Returns a list of (x_dm, z_dm) integer pairs."""
    out = []
    for x, z in points:
        pair = (int(round(x * 10)), int(round(z * 10)))
        if not out or out[-1] != pair:
            out.append(pair)
    return out

def delta_encode_dm(points):
    """World-metre points -> flat delta-encoded integer decimetres."""
    ints = quantize_dm_points(points)
    flat = []
    prev_x = prev_z = 0
    for x_dm, z_dm in ints:
        flat.append(x_dm - prev_x)
        flat.append(z_dm - prev_z)
        prev_x, prev_z = x_dm, z_dm
    return flat

def delta_encode_ints(pairs):
    """Already-quantized (x_dm, z_dm) pairs -> flat delta-encoded ints."""
    flat = []
    prev_x = prev_z = 0
    for x_dm, z_dm in pairs:
        flat.append(x_dm - prev_x)
        flat.append(z_dm - prev_z)
        prev_x, prev_z = x_dm, z_dm
    return flat

def main():
    with open(RAW_PATH, "rb") as fh:
        raw = fh.read()
    sha256 = hashlib.sha256(raw).hexdigest()
    root = ET.fromstring(raw)
    nodes = {}
    ways = []
    relations = []
    for el in root:
        if el.tag == "node":
            nodes[int(el.get("id"))] = (float(el.get("lat")), float(el.get("lon")))
        elif el.tag == "way":
            ways.append(el)
        elif el.tag == "relation":
            relations.append(el)

    def tags(el):
        return {c.get("k"): c.get("v") for c in el if c.tag == "tag"}

    def way_points(el):
        pts = []
        missing = False
        for nd in el:
            if nd.tag != "nd":
                continue
            ref = int(nd.get("ref"))
            if ref not in nodes:
                missing = True
                continue
            lat, lon = nodes[ref]
            pts.append(lonlat_to_world(lon, lat))
        return pts, missing

    rejected = []  # {id, kind, reason}
    roads = []
    buildings = []
    seen_geom = set()
    tag_cov_road = Counter()
    tag_cov_building = Counter()

    # --- roads ---
    for el in ways:
        tg = tags(el)
        if "highway" not in tg:
            continue
        wid = int(el.get("id"))
        cls = tg["highway"]
        for k in ("name", "ref", "lanes", "width", "surface", "bridge", "tunnel", "oneway"):
            if k in tg:
                tag_cov_road[k] += 1
        if cls == "proposed":
            rejected.append({"id": wid, "kind": "road", "reason": "highway=proposed is not built"})
            continue
        if cls not in ROAD_WIDTH_DEFAULTS_M:
            rejected.append({"id": wid, "kind": "road", "reason": f"unknown highway class '{cls}' (no width policy)"})
            continue
        pts, missing = way_points(el)
        if missing:
            rejected.append({"id": wid, "kind": "road", "reason": "references a node missing from the response"})
            continue
        pts = dedupe_consecutive(pts)
        if len(pts) < 2:
            rejected.append({"id": wid, "kind": "road", "reason": "fewer than 2 distinct vertices"})
            continue
        runs = clip_polyline_liang_barsky(pts)
        if not runs:
            rejected.append({"id": wid, "kind": "road", "reason": "fully outside the pilot bbox"})
            continue
        lanes = None
        if "lanes" in tg:
            try:
                lanes = int(tg["lanes"])
                if lanes < 1 or lanes > 12:
                    lanes = None
            except ValueError:
                lanes = None
        width_m = parse_meters(tg.get("width"))
        width_prov = "source" if width_m is not None else "estimated"
        if width_m is None:
            width_m = ROAD_WIDTH_DEFAULTS_M[cls]
        flags = 0
        if tg.get("bridge") == "yes":
            flags |= 1
        if tg.get("tunnel") == "yes":
            flags |= 2
        if tg.get("oneway") == "yes":
            flags |= 4
        elif tg.get("oneway") == "-1":
            flags |= 8
        for run in runs:
            quantized = quantize_dm_points(run)
            if len(quantized) < 2:
                rejected.append({"id": wid, "kind": "road",
                                 "reason": "fewer than 2 distinct vertices after decimetre rounding"})
                continue
            key = tuple(quantized)
            if key in seen_geom:
                rejected.append({"id": wid, "kind": "road", "reason": "duplicate geometry after clipping"})
                continue
            seen_geom.add(key)
            roads.append({
                "id": wid, "highway": cls,
                "name": tg.get("name"), "ref": tg.get("ref"),
                "lanes": lanes, "widthM": width_m, "widthProvenance": width_prov,
                "surface": tg.get("surface"),
                "flags": flags, "pointsDm": quantized,
            })

    # --- buildings (ways) ---
    def add_building(oid, tg, outer, holes):
        for k in ("name", "height", "building:levels", "min_height", "roof:shape"):
            if k in tg:
                tag_cov_building[k] += 1
        if len(outer) < 4 or outer[0] != outer[-1]:
            rejected.append({"id": oid, "kind": "building", "reason": "open or degenerate footprint ring"})
            return
        if ring_self_intersects(outer):
            rejected.append({"id": oid, "kind": "building", "reason": "self-intersecting footprint ring"})
            return
        for hole in holes:
            if ring_self_intersects(hole):
                rejected.append({"id": oid, "kind": "building", "reason": "self-intersecting hole ring"})
                return
        area0 = polygon_area(outer)
        if area0 < 4.0:
            rejected.append({"id": oid, "kind": "building", "reason": f"footprint area {area0:.1f} m^2 below 4 m^2"})
            return
        clipped = clip_polygon_sutherland(outer)
        if not clipped:
            rejected.append({"id": oid, "kind": "building", "reason": "fully outside the pilot bbox"})
            return
        area1 = polygon_area(clipped)
        if area1 < 4.0 or area1 < 0.25 * area0:
            rejected.append({"id": oid, "kind": "building",
                             "reason": f"clipped area {area1:.1f} m^2 < 25% of {area0:.1f} m^2 original"})
            return
        # Normalise orientation: outer CCW (positive signed area in x/y-north),
        # holes CW (negative).
        if signed_area_xy(clipped) < 0:
            clipped = [clipped[0]] + list(reversed(clipped[1:-1])) + [clipped[0]]
        clipped_holes = []
        for hole in holes:
            ch = clip_polygon_sutherland(hole)
            if len(ch) >= 4 and polygon_area(ch) >= 1.0:
                if signed_area_xy(ch) > 0:
                    ch = [ch[0]] + list(reversed(ch[1:-1])) + [ch[0]]
                clipped_holes.append(ch)
        # Quantize to decimetres (the asset unit) and re-check: distinct
        # metre vertices can collapse to one decimetre cell.
        outer_dm = quantize_dm_points(clipped)
        if len(outer_dm) < 4 or outer_dm[0] != outer_dm[-1]:
            rejected.append({"id": oid, "kind": "building",
                             "reason": "fewer than 4 distinct vertices after decimetre rounding"})
            return
        holes_dm = []
        for hole in clipped_holes:
            hole_dm = quantize_dm_points(hole)
            if len(hole_dm) >= 4 and hole_dm[0] == hole_dm[-1]:
                holes_dm.append(hole_dm)
        key = tuple(outer_dm)
        if key in seen_geom:
            rejected.append({"id": oid, "kind": "building", "reason": "duplicate footprint geometry"})
            return
        seen_geom.add(key)
        height_m = parse_meters(tg.get("height"))
        levels = None
        if "building:levels" in tg:
            try:
                levels = int(float(tg["building:levels"]))
                if levels < 0 or levels > 200:
                    levels = None
            except ValueError:
                levels = None
        if height_m is not None:
            height_prov = "known"
        elif levels is not None:
            height_m = round(levels * METERS_PER_LEVEL, 2)
            height_prov = "estimated"
        else:
            height_prov = "unknown"
        min_height = parse_meters(tg.get("min_height"))
        buildings.append({
            "id": oid, "building": tg.get("building", "yes"),
            "name": tg.get("name"),
            "heightM": height_m, "heightProvenance": height_prov,
            "levels": levels, "minHeightM": min_height,
            "roof": tg.get("roof:shape"),
            "outer": clipped, "holes": clipped_holes,
            "outerDm": outer_dm, "holesDm": holes_dm,
            "areaM2": round(area1, 1),
        })

    for el in ways:
        tg = tags(el)
        if "building" not in tg:
            continue
        oid = int(el.get("id"))
        pts, missing = way_points(el)
        if missing:
            rejected.append({"id": oid, "kind": "building", "reason": "references a node missing from the response"})
            continue
        pts = dedupe_consecutive(pts)
        add_building(oid, tg, pts, [])

    # --- buildings (multipolygon relations) ---
    for el in relations:
        tg = tags(el)
        if tg.get("type") != "multipolygon" or "building" not in tg:
            continue
        oid = int(el.get("id"))
        way_by_id = {}
        for w in ways:
            way_by_id[int(w.get("id"))] = w
        outers, inners = [], []
        incomplete = False
        for m in el:
            if m.tag != "member" or m.get("type") != "way":
                continue
            ref = int(m.get("ref"))
            if ref not in way_by_id:
                incomplete = True
                continue
            pts, missing = way_points(way_by_id[ref])
            if missing:
                incomplete = True
                continue
            pts = dedupe_consecutive(pts)
            if m.get("role") == "outer":
                outers.append(pts)
            elif m.get("role") == "inner":
                inners.append(pts)
        if incomplete:
            rejected.append({"id": oid, "kind": "building", "reason": "multipolygon member missing from response"})
            continue
        if len(outers) != 1:
            rejected.append({"id": oid, "kind": "building",
                             "reason": f"multipolygon with {len(outers)} outer rings is not supported"})
            continue
        add_building(oid, tg, outers[0], inners)

    roads.sort(key=lambda r: r["id"])
    buildings.sort(key=lambda b: b["id"])

    # Compact positional encoding (keeps the committed asset small):
    # road    = [osmId, highwayIdx, name|null, lanes|null, widthDm,
    #            widthProv(0=source,1=estimated), surfaceIdx|null, flags, pointsDelta]
    # building= [osmId, kindIdx, name|null, heightDm|null,
    #            heightProv(0=known,1=estimated,2=unknown), levels|null,
    #            outerDelta, holesDelta[]]
    # Code tables are emitted in the TS asset; the decoder maps them back.
    highway_classes = sorted(ROAD_WIDTH_DEFAULTS_M)
    surfaces = sorted({r["surface"] for r in roads if r["surface"]})
    building_kinds = sorted({b["building"] for b in buildings})
    asset = {
        "datasetId": "osm-vector-danang-pilot-v1",
        "sourceId": "osm-vector",
        "bbox": list(BBOX),
        "anchor": {"lat": ANCHOR_LAT, "lon": ANCHOR_LON},
        "clipWorld": [round(v, 2) for v in CLIP],
        "highwayClasses": highway_classes,
        "surfaces": surfaces,
        "buildingKinds": building_kinds,
        "roads": [
            [
                r["id"], highway_classes.index(r["highway"]), r["name"], r["lanes"],
                int(round(r["widthM"] * 10)),
                0 if r["widthProvenance"] == "source" else 1,
                surfaces.index(r["surface"]) if r["surface"] else None,
                r["flags"], delta_encode_ints(r["pointsDm"]),
            ]
            for r in roads
        ],
        "buildings": [
            [
                b["id"], building_kinds.index(b["building"]), b["name"],
                int(round(b["heightM"] * 10)) if b["heightM"] is not None else None,
                {"known": 0, "estimated": 1, "unknown": 2}[b["heightProvenance"]],
                b["levels"], delta_encode_ints(b["outerDm"]),
                [delta_encode_ints(h) for h in b["holesDm"]],
            ]
            for b in buildings
        ],
    }
    with open(OUT_JSON, "w", encoding="utf-8") as fh:
        json.dump(asset, fh, ensure_ascii=False, separators=(",", ":"), sort_keys=False)

    road_classes = Counter(r["highway"] for r in roads)
    building_kinds = Counter(b["building"] for b in buildings)
    height_prov = Counter(b["heightProvenance"] for b in buildings)
    report = {
        "rawSha256": sha256,
        "rawBytes": len(raw),
        "rawNodes": len(nodes), "rawWays": len(ways), "rawRelations": len(relations),
        "retrieved": "2026-11-20",
        "url": "https://api.openstreetmap.org/api/0.6/map?bbox=108.188181,16.040844,108.216217,16.067955",
        "bbox": list(BBOX),
        "clipWorld": [round(v, 2) for v in CLIP],
        "roadsKept": len(roads),
        "roadRuns": len(roads),
        "roadClasses": dict(sorted(road_classes.items())),
        "roadTagCoverage": dict(sorted(tag_cov_road.items())),
        "roadWidthProvenance": dict(Counter(r["widthProvenance"] for r in roads)),
        "roadPointsTotal": sum(len(r["pointsDm"]) for r in roads),
        "roadWaysSplitByClipping": sorted(
            {r["id"] for r in roads if sum(1 for x in roads if x["id"] == r["id"]) > 1}
        ),
        "buildingsKept": len(buildings),
        "buildingKinds": dict(sorted(building_kinds.items())),
        "buildingTagCoverage": dict(sorted(tag_cov_building.items())),
        "buildingHeightProvenance": dict(sorted(height_prov.items())),
        "buildingAreaM2": {
            "min": min((b["areaM2"] for b in buildings), default=None),
            "max": max((b["areaM2"] for b in buildings), default=None),
        },
        "rejected": rejected,
        "rejectedCount": len(rejected),
        "rejectedReasons": dict(sorted(Counter(x["reason"].split(" (")[0] for x in rejected).items())),
    }
    with open(REPORT_PATH, "w", encoding="utf-8") as fh:
        json.dump(report, fh, ensure_ascii=False, indent=2)
    print(json.dumps({k: report[k] for k in (
        "rawSha256", "roadsKept", "buildingsKept", "buildingHeightProvenance",
        "rejectedCount", "rejectedReasons")}, indent=2))
    print("asset bytes:", len(json.dumps(asset, ensure_ascii=False, separators=(",", ":"))))

if __name__ == "__main__":
    sys.exit(main())
