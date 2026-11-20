# Phase 17 — Road Data Report

**Dataset:** `osm-vector-danang-pilot-v1` (OSM, retrieved 2026-11-20,
raw SHA-256 `b4bf752fab45898631449b837e329c5d0b64d38addfc81671c190f634848d94d`).
**Scope:** pilot bbox only — never full-city coverage.

## Counts

- Raw response: 1,829 ways with a `highway` tag.
- Rejected at ingest: 2 (`highway=proposed`, not built).
- Kept: **1,827 ways → 1,830 runs** (3 ways split into 2 runs each by
  bbox clipping: OSM ids 118674634, 698768064, 1551312087).
- Total centreline length: **178,315 m** (measured on the decoded,
  decimetre-quantized geometry).
- Distinct road names: 328 (685 named runs).

## Roads by class (runs / length)

| highway | Runs | Length (m) | Default width (m) |
| --- | --- | --- | --- |
| service | 772 | 70,098 | 4.0 |
| residential | 619 | 66,203 | 6.0 |
| footway | 173 | 6,819 | 2.0 |
| tertiary | 97 | 13,478 | 8.0 |
| primary | 96 | 14,274 | 14.0 |
| primary_link | 25 | 1,171 | 7.0 |
| secondary | 21 | 4,344 | 10.0 |
| steps | 8 | 72 | 2.0 |
| unclassified | 5 | 422 | 5.0 |
| tertiary_link | 5 | 146 | 6.0 |
| living_street | 3 | 337 | 5.0 |
| track | 3 | 727 | 3.0 |
| secondary_link | 1 | 27 | 7.0 |
| pedestrian | 1 | 112 | 6.0 |
| path | 1 | 85 | 2.0 |

Longest named roads: Đường Nguyễn Hoàng (tertiary, 1,201 m),
Đường Nguyễn Tri Phương (tertiary, 1,050 m), Đường Trưng Nữ Vương
(secondary, 897 m), Đường Điện Biên Phủ (primary, 871 m),
Đường Hà Huy Tập (tertiary, 860 m).

## Tag coverage (of 1,829 raw highway ways)

| Tag | Ways | Notes |
| --- | --- | --- |
| name | 685 | 328 distinct names |
| surface | 956 | asphalt 546, concrete 400, paving_stones 5, paved 3, unpaved 1, gravel 1 |
| oneway | 257 | yes 215, no 42 (no `-1` values in the pilot) |
| lanes | 251 | 1 lane: 45, 2: 86, 3: 95, 4: 25, 5: 1 |
| maxspeed | 162 | Recorded, not stored in the asset (renderer does not use it) |
| bridge | 20 | Rendered as ribbons (no separate bridge deck geometry — see Known Issues) |
| tunnel | 2 | Rendered as ribbons (tunnel flag stored; no cut-through geometry) |
| width | **0** | **No road carries a `width` tag** |
| ref | 0 | — |

## Width provenance — the key fact

**Every road width in the pilot is ESTIMATED** (source 0 / estimated
1,830). Widths are the documented class defaults in
`ROAD_WIDTH_DEFAULTS_M` (`src/engine/gis/type.ts`), applied because no
measurement exists. The renderer never presents them as measured: the
schema enforces `estimated ⇒ width == class default`, the decode test
asserts it for all 1,830 runs, and F3 GIS-08 reports the split
(source 0 / estimated 1,830). A class with no table entry has no width
policy and its ways are rejected at ingest (none in this pilot).

## Geometry handling

- **Projection:** WGS84 lon/lat → ENU about the anchor → world metres,
  same math as `src/engine/geospatial/core.ts` (verified by the decode
  test checkpoints, ±1 mm).
- **Quantization:** integer decimetres (0.1 m), delta-encoded per run.
  One vertex collapsed onto its neighbour after rounding (8,953 →
  8,952 points); the ingest dedupes after quantization so the decoder
  never sees consecutive duplicates.
- **Clipping:** Liang-Barsky segment clipping to the pilot ENU
  rectangle (x -1500.21..1500.0, z -1500.04..1500.05). Runs fully
  outside are rejected (none — every way touches the bbox by
  construction of the API call).
- **Junctions:** 525 coincident-endpoint junctions merged into discs
  (radius = widest incident half-width). T-junctions need no disc: the
  side road starts on the main road's centreline, so the two ribbon
  strips already cross with no gap within half a width of the crossing.
- **Draping:** ribbons are subdivided to ≤ 10 m segments and sampled
  against the active terrain provider (+ 0.08 m lift). 0 runs skipped
  on the DEM pilot.
- **Flags stored:** bridge (20), tunnel (2), oneway yes (215). The
  renderer does not yet use bridge/tunnel/oneway for behaviour — they
  are data, not promises (see Known Issues).
