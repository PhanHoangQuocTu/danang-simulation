#!/usr/bin/env python3
"""Generate src/worlds/danang/data/danang-gis-pilot.ts from /tmp/osm17/danang-gis-pilot.json.

Run after ingest_osm.py. Deterministic: same JSON in, same TS out.
The total centreline length is measured from the decoded quantized roads.
"""
import json
import math
import os

OUT_JSON = "/tmp/osm17/danang-gis-pilot.json"
REPORT_PATH = "/tmp/osm17/ingest-report.json"
OUT_TS = os.path.expanduser(
    "~/workspace/danang-simulation-work/danang-simulation-main/src/worlds/danang/data/danang-gis-pilot.ts"
)

a = json.load(open(OUT_JSON))
r = json.load(open(REPORT_PATH))

src = open("/tmp/osm17/ingest_osm.py").read().split("if __name__")[0]
ns = {}
exec(src, ns)
f = ns["lonlat_to_world"]
cps = []
for name, lon, lat in [
    ("anchor", 108.2022, 16.0544),
    ("bbox NW", 108.188181, 16.067955),
    ("bbox SE", 108.216217, 16.040844),
    ("node 420248139", 108.2072405, 16.0622024),
]:
    x, z = f(lon, lat)
    cps.append((name, lon, lat, round(x, 6), round(z, 6)))


def dec(flat):
    pts = []
    px = pz = 0
    for i in range(0, len(flat), 2):
        px += flat[i]
        pz += flat[i + 1]
        pts.append((px / 10, pz / 10))
    return pts


total_length = 0
for road in a["roads"]:
    p = dec(road[8])
    total_length += sum(
        math.hypot(p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1]) for i in range(len(p) - 1)
    )


def js_str(s):
    return "null" if s is None else json.dumps(s, ensure_ascii=False)


def road_js(t):
    osm, hi, name, lanes, wdm, wprov, surf, flags, pts = t
    return (
        f"[{osm},{hi},{js_str(name)},{'null' if lanes is None else lanes},{wdm},{wprov},"
        f"{'null' if surf is None else surf},{flags},{json.dumps(pts, separators=(',', ':'))}]"
    )


def bldg_js(t):
    osm, ki, name, hdm, hprov, levels, outer, holes = t
    holes_js = "[" + ",".join(json.dumps(h, separators=(",", ":")) for h in holes) + "]"
    return (
        f"[{osm},{ki},{js_str(name)},{'null' if hdm is None else hdm},{hprov},"
        f"{'null' if levels is None else levels},{json.dumps(outer, separators=(',', ':'))},{holes_js}]"
    )


roads_js = ",\n  ".join(road_js(t) for t in a["roads"])
bldgs_js = ",\n  ".join(bldg_js(t) for t in a["buildings"])
cps_js = ",\n  ".join(
    f"{{ label: '{n}', lon: {lon}, lat: {lat}, worldX: {x}, worldZ: {z} }}"
    for n, lon, lat, x, z in cps
)

header = f"""/**
 * Da Nang real-GIS pilot asset (Phase 17).
 *
 * Source: OpenStreetMap, retrieved 2026-11-20 via the official OSM API:
 * GET https://api.openstreetmap.org/api/0.6/map?bbox=108.188181,16.040844,108.216217,16.067955
 * (the Overpass API times out from this environment, so the OSM API map
 * call — 0.028 x 0.027 deg, well under the 0.25 deg^2 API limit — is the
 * acquisition route). Raw response: 4,128,354 bytes, SHA-256
 * {r['rawSha256']}.
 * The raw 4.1 MB XML stays OUTSIDE the repo (in /tmp/osm17, with the
 * deterministic ingest script ingest_osm.py and ingest-report.json);
 * only this compact processed asset is committed.
 *
 * Licence: Open Database License (ODbL) 1.0. Attribution, required on
 * any display of this data: "© OpenStreetMap contributors"
 * (https://www.openstreetmap.org/copyright). Derived-database
 * share-alike applies to redistribution of this derived asset.
 *
 * Pilot scope ONLY — never full-city coverage: 3 km x 3 km around
 * lat 16.0544, lon 108.2022 (bbox lon 108.188181-108.216217,
 * lat 16.040844-16.067955), the same pilot window as the Phase 16 DEM.
 * {r['roadsKept']} road runs (from 1,827 highway ways; 3 ways split by bbox clipping)
 * and {r['buildingsKept']} buildings (420 ways + 1 multipolygon relation,
 * minus 3 rejected). Total centreline length {round(total_length):,} m — see
 * docs/audit/phase-17/ROAD_DATA_REPORT.md for the measured length.
 *
 * Coordinates: world metres (x = east, z = -north) about the Da Nang
 * anchor, projected with the WGS84 math of src/engine/geospatial/core.ts
 * (verified against it by the decode test checkpoints below). Stored as
 * integer decimetres (0.1 m), delta-encoded per feature; see
 * src/engine/gis/decode.ts for the format. Coordinate rounding is 0.1 m.
 *
 * Provenance (never invented values):
 * - Road widths: NO road in the pilot carries an OSM `width` tag, so
 *   EVERY width is an ESTIMATED class default (see ROAD_WIDTH_DEFAULTS_M
 *   in src/engine/gis/type.ts). Width provenance is stored per road.
 * - Building heights: 1 KNOWN (`height` tag), 7 ESTIMATED
 *   (`building:levels` x 3.0 m/level — a documented assumption), 410
 *   UNKNOWN = footprint-only, rendered flat, never extruded at an
 *   invented height. 1 of the 9 `building:levels` tags belongs to the
 *   building with the explicit `height` tag (known wins); 1 belongs to
 *   a building rejected as mostly out of bounds.
 * - Rejected at ingest (5): 2 x `highway=proposed` (not built), 3 x
 *   buildings whose clipped area fell below 25% of the original
 *   (mostly outside the pilot bbox). Every rejection is recorded in
 *   docs/audit/phase-17/evidence/ingest-report.json.
 * - `min_height` / `roof:shape`: no building in the pilot carries
 *   either tag, so the asset stores null for both; the schema still
 *   supports them for future pilots.
 *
 * Vertical datum: heights are OSM tag values (above ground, not
 * surveyed); world Y of a building base is the minimum DEM/synthetic
 * terrain elevation sampled under its footprint at render time.
 * OSM positional accuracy is unknown and NOT certified (no GCPs).
 */
import type {{ GisBuildingTuple, GisPilotAsset, GisRoadTuple }} from '@/engine/gis/decode';

export const DANANG_GIS_PILOT_METADATA = {{
  datasetId: 'osm-vector-danang-pilot-v1',
  sourceId: 'osm-vector',
  version: '1',
  checksumSha256: '{r['rawSha256']}',
  crs: 'EPSG:4326',
  captureDate: '2026-11-20',
  license: 'ODbL-1.0',
  attribution: '© OpenStreetMap contributors',
  bbox: [108.188181, 16.040844, 108.216217, 16.067955] as const,
  roadsKept: {r['roadsKept']},
  buildingsKept: {r['buildingsKept']},
  rejectedCount: {r['rejectedCount']},
}} as const;

/**
 * Checkpoints: world coordinates of known lon/lat points, computed by
 * the ingest script with the same WGS84 math as core.ts. Tests assert
 * `geoToWorld` reproduces them; they are math-consistency checks, NOT
 * ground-truth accuracy certification.
 */
export const DANANG_GIS_PILOT_CHECKPOINTS = [
  {cps_js},
] as const;

// biome-ignore format: compact delta-encoded pilot data — one tuple per line by design.
const GIS_ROADS: readonly GisRoadTuple[] = [
  {roads_js},
];

// biome-ignore format: compact delta-encoded pilot data — one tuple per line by design.
const GIS_BUILDINGS: readonly GisBuildingTuple[] = [
  {bldgs_js},
];

/** The compact Phase 17 GIS pilot asset, ready for `decodeGisRoads` / `decodeGisBuildings`. */
export const danangGisPilotAsset: GisPilotAsset = {{
  datasetId: DANANG_GIS_PILOT_METADATA.datasetId,
  sourceId: DANANG_GIS_PILOT_METADATA.sourceId,
  bbox: DANANG_GIS_PILOT_METADATA.bbox,
  anchor: {{ lat: 16.0544, lon: 108.2022 }},
  clipWorld: [-1500.21, -1500.04, 1500.0, 1500.05],
  highwayClasses: [
    'footway', 'living_street', 'path', 'pedestrian', 'primary', 'primary_link', 'residential', 'secondary',
    'secondary_link', 'service', 'steps', 'tertiary', 'tertiary_link', 'track', 'unclassified',
  ],
  surfaces: ['asphalt', 'concrete', 'gravel', 'paved', 'paving_stones', 'unpaved'],
  buildingKinds: [
    'apartments', 'church', 'commercial', 'florist', 'hangar', 'hospital', 'hotel', 'house', 'navigationaid',
    'residential', 'retail', 'roof', 'ruins', 'school', 'temple', 'tower', 'transportation', 'university', 'yes',
  ],
  roads: GIS_ROADS,
  buildings: GIS_BUILDINGS,
}};
"""
with open(OUT_TS, "w", encoding="utf-8") as fh:
    fh.write(header)
print("wrote asset, bytes:", len(header.encode("utf-8")), "total centreline m:", round(total_length))
