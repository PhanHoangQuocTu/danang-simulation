# Phase 17 — Building Data Report

**Dataset:** `osm-vector-danang-pilot-v1` (OSM, retrieved 2026-11-20,
raw SHA-256 `b4bf752fab45898631449b837e329c5d0b64d38addfc81671c190f634848d94d`).
**Scope:** pilot bbox only — never full-city coverage.

## Counts

- Raw response: 420 ways with a `building` tag + 1 multipolygon
  relation with a `building` tag.
- Rejected at ingest: 3 (clipped area < 25% of the original —
  buildings mostly outside the pilot bbox: OSM ids 1330673710,
  1394803648, 1561346721).
- Kept: **418 buildings** (417 ways + 1 multipolygon).
- Total footprint area: **249,686 m²** (~2.7% of the ~9.1 km² pilot).
  Smallest kept footprint 13.7 m², largest 24,346 m².

## Buildings by kind

| building | Count |
| --- | --- |
| yes | 366 |
| temple | 11 |
| roof | 7 |
| residential | 6 |
| apartments | 5 |
| university | 4 |
| hospital | 3 |
| church | 2 |
| commercial | 2 |
| hangar | 2 |
| transportation | 2 |
| florist | 1 |
| hotel | 1 |
| house | 1 |
| navigationaid | 1 |
| retail | 1 |
| ruins | 1 |
| school | 1 |
| tower | 1 |

Largest footprints: Nhà ga Quốc tế T2 (transportation, 24,346 m²),
Nhà ga Quốc nội T1 (transportation, 15,830 m²), AEON Mall Đà Nẵng
(9,473 m²), Siêu thị GO! (5,669 m²).

## Tag coverage (of 421 raw building features)

| Tag | Features | Notes |
| --- | --- | --- |
| name | 59 | e.g. Nhà ga Quốc tế T2, Chợ Siêu thị Đà Nẵng |
| addr:street | 82 | Recorded, not stored in the asset |
| building:levels | 9 | See height provenance below |
| height | 1 | 21 m (Thành Quân Mobile, 7 levels) |
| min_height | 0 | — |
| roof:shape | 0 | All roofs render flat (documented) |

## Height provenance — the key fact

| Provenance | Buildings | Rendering |
| --- | --- | --- |
| known (`height` tag) | **1** | Extruded to 21 m |
| estimated (`building:levels` x 3.0 m/level) | **7** | Extruded to 6 / 12 / 12 / 15 / 15 / 15 / 84 m |
| unknown (no height, no levels) | **410** | Footprint-only flat geometry, never extruded |

The 3.0 m/level factor is a **documented assumption, not a
measurement**. The tallest estimated building is the 28-level
Chung cư Hoàng Anh Gia Lai (84 m estimated). Of the 9 `building:levels`
tags in the raw data: 1 belongs to the building with the explicit
`height` tag (known wins), 1 belongs to a rejected building ("A2",
mostly out of bounds), 7 are used as estimates. The schema enforces
`estimated ⇒ height == levels x 3.0 m` and `unknown ⇔ height == null`;
the decode test asserts the 1 / 7 / 410 split; F3 GIS-07 reports it.

## Geometry handling

- **Footprints:** closed rings, orientation normalized (outer CCW,
  holes CW). 1 building has a hole (preserved). Self-intersecting
  rings are **rejected, never silently repaired** (0 in this pilot —
  the check exists and is tested with a bow-tie ring).
- **Clipping:** Sutherland–Hodgman to the pilot ENU rectangle. A
  building whose clipped area is < 25% of the original or < 4 m² is
  rejected (3 rejected, listed above).
- **Multipolygons:** the single `type=multipolygon` building relation
  is ingested with outer/inner roles. Relations with ≠ 1 outer ring
  would be rejected (none in this pilot).
- **Foundation:** base Y = minimum sampled terrain elevation under
  the footprint (outer vertices + centroid), so an extrusion never
  floats and never sinks below the lowest corner on a slope.
- **`building=roof` (7):** kept as footprint-only kinds. A roof has no
  walls to extrude; rendering it as a flat footprint is the honest
  representation of what OSM says.
- **Draping:** 0 buildings skipped on the DEM pilot.
