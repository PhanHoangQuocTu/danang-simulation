# Phase 17 — Georeferencing Report

**Anchor:** lat 16.0544, lon 108.2022, ellipsoidal height 0 m — the
same anchor as the Phase 16 DEM pilot and `DANANG_GEO_REFERENCE`.

## CRS and datum

| Item | Value |
| --- | --- |
| Source CRS | EPSG:4326 (lon/lat, degrees), per the OSM API response |
| Computation CRS | EPSG:4979 → EPSG:4978 → ENU (WGS84, `src/engine/geospatial/core.ts`) |
| World axes | +X East, +Y Up, -Z North; 1 world unit = 1 m |
| Pilot bbox | lon 108.188181–108.216217, lat 16.040844–16.067955 |
| Pilot clip (world m) | x -1500.21..1500.0, z -1500.04..1500.05 (bbox corners projected to ENU, min/max) |
| Vertical datum (terrain) | Orthometric EGM2008 (DEM pilot), "giữ orthometric" decision unchanged |
| Building heights | OSM tag values, metres above ground — not surveyed, not a datum |
| Positional accuracy | **Unknown, NOT certified** (no GCPs, no RMSE — see Known Issues) |

## Transformation validation (P17-08)

The Python ingest math was verified against the TypeScript core with
4 checkpoints (asset `DANANG_GIS_PILOT_CHECKPOINTS`, asserted by
`src/engine/gis/__tests__/decode.test.ts` with `geoToWorld`, ±1 mm):

| Checkpoint | lon / lat | World (x, z) m |
| --- | --- | --- |
| anchor | 108.2022 / 16.0544 | 0.000000 / -0.000000 |
| bbox NW | 108.188181 / 16.067955 | -1500.006831 / -1500.037801 |
| bbox SE | 108.216217 / 16.040844 | 1499.995808 / 1500.045073 |
| node 420248139 | 108.2072405 / 16.0622024 | 539.339593 / -863.414595 |

These are **math-consistency checks** (Python vs TypeScript
implementation of the same formulas), NOT ground-truth accuracy
certification. No independent checkpoints exist yet.

## Edge cases handled

- **Clip vs DEM coverage:** the pilot clip extends up to 0.21 m
  beyond the DEM coverage on the west edge. The GIS sampler clamps
  sample coordinates into the provider coverage (a sub-cell shift
  against a 30 m DEM cell, documented in `gis-layer.ts`). 0 features
  were skipped for missing elevation.
- **Coordinate quantization:** world metres are stored as integer
  decimetres (0.1 m). The ingest quantizes *then* dedupes, because
  distinct metre vertices can collapse to one decimetre cell (1 road
  vertex collapsed; the decoder rejects consecutive duplicates, so
  this ordering is load-bearing).
- **Ring orientation:** outer rings are normalized to CCW and holes to
  CW in the lon/lat plane (positive / negative signed area with
  y = north = -z), matching the `THREE.Shape` winding the extrusion
  expects. The schema re-checks orientation at decode time.
- **No duplicate transform:** the runtime never converts lon/lat. All
  projection happened once, at ingest; the asset carries world metres
  only. `src/engine/geospatial/core.ts` is the single source of the
  math, reused by the ingest script verbatim (same constants).
