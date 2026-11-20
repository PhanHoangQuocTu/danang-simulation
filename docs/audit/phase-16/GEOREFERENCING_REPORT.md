# Phase 16 — Georeferencing Report

## Reference frame

- Anchor: lat 16.0544, lon 108.2022 (`DA_NANG_CONFIG`), height 0 m assumption — `DANANG_GEO_REFERENCE` in `src/worlds/danang/georeference.ts`, `readiness: 'reference-only'`, explicitly not ground-truth verified.
- Phase 12 core (`src/engine/geospatial/core.ts`): `geodeticToEcef` / `ecefToGeodetic` (EPSG:4979 ↔ EPSG:4978), `ecefToEnu` / `enuToEcef`, `enuToWorld` / `worldToEnu`, `geoToWorld` / `worldToGeo`, heading↔yaw; WGS84 `a=6378137`, `1/f=298.257223563`. No UTM anywhere in `src/engine`, `src/world-core` or `src/worlds`.
- World axes: +X East / +Y Up / −Z North; 1 world unit = 1 metre.

## Source CRS and datum

- Horizontal: EPSG:4326 (WGS84 geographic). The COG GeoKeys confirm EPSG:4326; pixel scale 1/3600°, tiepoint (0,0) → (lon 108.0, lat 17.0); RasterPixelIsArea per the file GeoKeys (the official dataspace page says DGED alignment is RasterPixelIsPoint — a half-pixel, ~15 m, interpretation difference, flagged, not a blocker).
- Vertical: EPSG:3855 (EGM2008 geoid), i.e. **orthometric heights**. Kept as-is; world Y = orthometric height. **No geoid conversion applied, no offset invented. Absolute WGS84-ellipsoid alignment is NOT VERIFIED.**
- The Phase 15 contract requires a known vertical datum and `isProductionReady` true only for WGS84-ellipsoidal data. The pilot therefore validates as a labelled pilot with `isProductionReady === false` (see `DATASET_VALIDATION.md`).

## Pilot grid geometry

- Source window: rows 3354–3453, cols 678–777 of the 3600×3600 tile (100×100 cells).
- Resampled grid: regular 30 m ENU, origin −1500/−1500 m, coverage −1500..1500 m both axes, cell 30 m, 100×100. Row 0 = north edge, col 0 = west edge.
- Geographic bbox: lon 108.188181–108.216217, lat 16.040844–16.067955; centre 16.0544 / 108.2022.
- Cell size at this latitude: 30.74 m (lat) × 29.72 m (lon).
- Resampling difference (bilinear vs nearest source sample): mean 0.34 m, max 6.05 m — a consequence of bilinear interpolation across real 30 m cells, recorded in the asset processing history.

## Cross-implementation check (Python ingestion ↔ TS core)

The ingestion script (`evidence/ingest_pilot.py`) projected the source tile onto the ENU frame using the same WGS84 constants as the TS core. The test suite verifies the two implementations agree: for each of the 7 recorded checkpoints, `worldToGeo` (TS core) applied to the checkpoint's world coordinates recovers the recorded lat/lon to within 1e-4 deg. This checks the Python↔TS math consistency; it is **not** an accuracy certification against the real world.

## What is NOT established

- No independent ground control points, no surveyed checkpoints, no RMSE. Geographic accuracy certification is **NOT VERIFIED**.
- No verified geoid undulation value for Da Nang was sourced; no EGM2008→ellipsoid conversion exists in the repo.
- The pilot covers flat coastal urban terrain (mean 8.47 m, range 1.79–25.68 m). Steep-slope behaviour (the same tile reaches 1408.79 m in the western mountains) is untested — a mountain pilot is the natural follow-up.
