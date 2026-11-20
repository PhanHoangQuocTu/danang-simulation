# Phase 16 — Dataset Validation

## Source dataset

- Product: Copernicus DEM GLO-30 (`COP-DEM_GLO-30-DGED`), tile `Copernicus_DSM_COG_10_N16_00_E108_00_DEM`.
- File: `/tmp/dem16/Copernicus_DSM_COG_10_N16_00_E108_00_DEM.tif` (outside the repo; raw COG not committed).
- SHA-256: `f4f95dc5677eaaca9a967230a676bb8a39025ab79d28b89e225a7e822acbdde6` — verified on download and reproduced in the independent ingestion re-check.
- Structure: 3600×3600 Float32 COG, DEFLATE, Predictor 3, 1024×1024 tiles, 4 overview pages; pixel scale 1/3600°, tiepoint (0,0) → (lon 108.0, lat 17.0); GeoKeys EPSG:4326 / EPSG:3855 (EGM2008), RasterPixelIsArea.
- Published accuracy: absolute vertical <4 m (90% LE), relative <2 m slope ≤20% / <4 m above, absolute horizontal <6 m (90% CE). Capture: TanDEM-X 2011–2015 (multi-year composite; the asset records capture date `2015-12-31` as the end of the acquisition window, not a single-date capture).

## Ingestion (deterministic, offline)

Script: `evidence/ingest_pilot.py`. It reads the source COG, crops the 3 km × 3 km pilot around the anchor, and resamples onto a regular 30 m ENU grid using the same WGS84 geodetic↔ECEF↔ENU math as `src/engine/geospatial/core.ts`. Outputs: `evidence/danang-dem-pilot.json` and the base64 Float32 asset embedded in `src/worlds/danang/data/danang-dem-pilot.ts` (40,000 bytes, 53,336 base64 chars; row-major, row 0 = north edge, col 0 = west edge).

Vertical datum: source heights are **ORTHOMETRIC (EGM2008, EPSG:3855), kept as-is. NO geoid conversion applied, NO offset invented.** World Y = orthometric height. Absolute ellipsoid alignment is **NOT VERIFIED**.

## Independent re-check (reproduced from the source tile)

| Check | Result |
| --- | --- |
| Source SHA-256 | `f4f95dc5…` reproduced exactly |
| Source shape / dtype | (3600, 3600) Float32 |
| ModelPixelScaleTag | (0.0002777777777777778, …) |
| ModelTiepointTag | (0, 0, 0, 108.0, 17.0, 0) |
| GeoKeyDirectoryTag | includes 4326 and 9102 |
| Raw 100×100 window (rows 3354–3453, cols 678–777) | min 1.79, max 25.68, mean 8.4667, median 8.2156, std 2.3259 |
| NoData (−32767) count / NaN count in raw window | 0 / 0 |
| Centre pixel (row 3404, col 728) | 5.5646138191223145 |
| Full tile | min −14.00, max 1408.79, mean 9.2703 |

## Resampled grid (the asset actually shipped)

- min 2.061061143875122, max 25.392606735229492, mean 8.462543337392807, median 8.262186050415039, std 2.2081508019747442, NoData cells 0.
- Resampling difference (bilinear vs nearest source sample): max abs 6.054367971488951 m, mean abs 0.33723534917974857 m.
- Corners: r0c0 lat 16.0678191157156, lon 108.18832126338168, elev 7.377557740691363; r0c99 elev 11.937462419253995.
- Checkpoints (7 cells, recorded in the asset): e.g. (50,50) grid 6.2985148429870605 vs direct nearest 5.5646138191223145 (diff 0.7339); (75,25) diff 1.6121187210083008 (largest checkpoint diff).
- Geographic bbox of grid: westLon 108.18818106464255, eastLon 108.21621703842368, northLat 16.067954657654433, southLat 16.040844408071024, centre 16.0544 / 108.2022. Origin −1500 / −1500 m, coverage −1500..1500 m both axes, cell 30 m, 100×100.

## Validation verdicts

- **Metadata validation: PASS.** `validateTerrainDatasetMetadata` accepts the pilot metadata; datum `ORTHOMETRIC_EGM2008`, `isProductionReady === false` (production-ready requires `WGS84_ELLIPSOID`). The registry entry `copernicus-dsm` moved `candidate` → `approved-for-ingestion` with full metadata review, licence and coverage evidence (see `src/worlds/danang/data-sources.ts`).
- **Checkpoint reproduction: PASS (self-consistency only).** The provider reproduces all 7 recorded checkpoint values at their cell centres (test `danang-dem-pilot.test.ts`), and world→geo round-trips through the TS geospatial core recover the checkpoint lat/lon to within 1e-4 deg (~10 m tolerance; the test asserts 4 decimal places).
- **Independent geographic accuracy: NOT VERIFIED.** The checkpoints above are self-consistency checks against the same source tile, NOT independent ground truth. No independent checkpoints, GCPs or RMSE exist yet. No RMSE / max / mean residual figures are claimed anywhere in this phase. The published Copernicus accuracy (<4 m vertical, <6 m horizontal) is the only accuracy statement, and it is the publisher's, not a measurement made in this project.
- **NoData: PASS for the pilot.** Zero NoData cells in the pilot window; the provider's NoData path is exercised by the Phase 15 5×5 fixture tests, not by the pilot.
- **Geoid / ellipsoid alignment: NOT VERIFIED.** No verified EGM2008→ellipsoid conversion exists in this repo; no offset was invented. The pilot is labelled `REAL DEM (pilot — orthometric, ellipsoid alignment NOT VERIFIED)` in F3 diagnostics.
