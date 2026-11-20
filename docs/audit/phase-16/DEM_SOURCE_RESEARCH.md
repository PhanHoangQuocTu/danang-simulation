# Phase 16 — DEM Source Research

All facts below were checked against live official pages on 2026-11-20 (~09:54–10:00 +07) unless marked otherwise. No repo files were modified by the research; downloads only under `/tmp/dem16/`.

## Download outcome — SUCCESS

File `/tmp/dem16/Copernicus_DSM_COG_10_N16_00_E108_00_DEM.tif` (kept outside the repo; the raw 2.8 MB COG is NOT committed):

- URL: `https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N16_00_E108_00_DEM/Copernicus_DSM_COG_10_N16_00_E108_00_DEM.tif`
- HTTP 200, 2.56 s, anonymous, no account/token.
- Size 2,833,380 bytes. SHA-256 `f4f95dc5677eaaca9a967230a676bb8a39025ab79d28b89e225a7e822acbdde6` (reproduced independently in the ingestion re-check).
- Format verified via `file` and `tifffile`: TIFF little-endian, 3600×3600, 32-bit float, DEFLATE, Predictor 3, 1024×1024 internal tiles, 4 pages (3600/1800/900/450 overviews).
- Georeferencing from the file itself: pixel scale 1/3600° (0.0002777…°), tiepoint (0,0) → (lon 108.0, lat 17.0); GeoKeys EPSG:4326 horizontal, EPSG:3855 vertical (EGM2008), RasterType = RasterPixelIsArea.
- Tile existence confirmed in the bucket index `/tmp/dem16/tileList.txt` (1,110,900 bytes, HTTP 200), which contains `Copernicus_DSM_COG_10_N16_00_E108_00_DEM` plus neighbours (N15/N16 × E107/E108).

## Measured elevations (read with `tifffile` + `imagecodecs`, not invented)

- Full 1° tile (12,960,000 px, zero NoData/NaN pixels): min **−14.00 m**, max **1408.79 m**, mean 9.27 m, median 0.00 m, std 68.45 m — coastal tile (mostly sea at 0 m, mountains inland to ~1400 m).
- Pilot-centre pixel (row 3404, col 728; lat 16.0544, lon 108.2022): **5.56 m**.
- 100×100 pilot window: min 1.79 m, max 25.68 m, mean 8.47 m, median 8.22 m, std 2.33 m; corners NW 5.92 / NE 7.58 / SW 10.63 / SE 7.47 m; centre-row range 5.56–14.31 m.

Caveats: no `GDAL_NODATA` tag in this COG; −32767 NoData is stated only by secondary documentation (windPRO wiki) for the original DGED data — **NOT VERIFIED** from the official Copernicus page or the file (the tile has zero −32767 pixels, so it is moot for the pilot). File GeoKeys say RasterPixelIsArea; the official dataspace page says DGED grid alignment is RasterPixelIsPoint — a half-pixel (~15 m) interpretation difference, flagged for ingestion, not a blocker. Negative values (−14 m min) exist despite the bucket readme saying ocean ≈ 0; reported as measured, cause not investigated.

## Candidate comparison (live sources only)

| Candidate | Provider / product | Resolution | CRS / vertical datum | Accuracy (published) | Capture | Format | Licence | Access | Verdict |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **Copernicus DEM GLO-30** | ESA/Copernicus, `COP-DEM_GLO-30-DGED` | 30 m (1″) | EPSG:4326 / EGM2008 (EPSG:3855) | abs. vertical <4 m (90% LE), rel. <2 m slope ≤20%, <4 m above; abs. horizontal <6 m (90% CE) | TanDEM-X 2011–2015, releases to 2024_1, maintained until 2026 | COG GeoTIFF Float32 | Free incl. commercial, attribution required | Anonymous public AWS S3 `s3://copernicus-dem-30m/`, HTTPS, no account | **Selected — primary** |
| Copernicus DEM GLO-90 | Same programme | 90 m (3″) | Same CRS/datum/accuracy | Same | Same | COG GeoTIFF | Same, “WorldDEM-90” notice | Anonymous `s3://copernicus-dem-90m/` | Fallback only (3× coarser) |
| NASADEM V001 | NASA JPL / LP DAAC, DOI 10.5067/MEASURES/NASADEM/NASADEM_HGT.001 | 30 m | Cartesian/geographic; geoid model name NOT VERIFIED on official page (EGM96 secondary only) | NOT VERIFIED on official page (secondary claims typically <16 m abs., <10 m rel.) | SRTM flown 11–21 Feb 2000, published 2020-02-13 | .hgt int16 + NetCDF4 | Openly shared without restriction per EOSDIS | **No** — free NASA Earthdata login required; anonymous mirror via Microsoft Planetary Computer STAC (secondary route, not NASA's own) | Rejected — login blocker, older (2000), no resolution advantage |
| ALOS AW3D30 v3.2 | JAXA, DOI 10.57746/EO.01kkfx0ejw8r5ndc9bg5nt13ws | 30 m | WGS84 geographic, height above sea level; geoid model NOT VERIFIED | 5 m std dev (1σ) — secondary OSM wiki only, not verified against JAXA | PRISM 2006–2011, v3.2 Jan 2021 | GeoTIFF int16 in .tar.gz 5°×5° packages or per-tile via OpenTopography | Free commercial + non-commercial under JAXA Terms of Use, registration required, attribution required (exact wording not verified) | **No** — JAXA registration required; OpenTopography mirror needs free API key | Cross-check only; exact JAXA filename NOT VERIFIED (official product page fetch failed) |
| FABDEM v1-2 | Univ. of Bristol / Fathom (ML-derived from GLO-30) | 30 m | Same grid as GLO-30, EGM2008 inherited (secondary) | NOT VERIFIED from primary | Derived from GLO-30 (2011–2015) | GeoTIFF 1° tiles in 10°×10° zips | **CC BY-NC-SA 4.0 — non-commercial only**; commercial use needs FABDEM+ (Fathom, paid) | Anonymous HTTPS from Bristol/Hugging Face mirror reported (not tested) | Bare-earth DTM — technically the best terrain model, but NC licence may conflict with the project licence; cross-check only, not primary, unless the project is non-commercial |
| Vietnam / Da Nang official DEM | MONRE / Dept. of Survey & Mapping Vietnam | — | Da Nang CRS NOT VERIFIED | NOT VERIFIED | 2008–2018 (5 m LiDAR for Vu Gia–Thu Bon basin, project data; 30 m DEM digitised from 1:10,000 spot heights, MONRE 2016) | NOT VERIFIED | NOT VERIFIED — government data, no public licence found | **No public download route found**; no open LiDAR/high-res dataset for Vietnam on record (TechnicalGIS atlas, checked 2026-10) | Revisit only via formal MONRE / Da Nang DONRE data request |

## Selection rationale

Copernicus DEM GLO-30 is the only candidate that is (a) anonymously downloadable — proven by the successful download, (b) free including commercial use with clear attribution, (c) 30 m with officially published accuracy (<4 m vertical, <6 m horizontal) and a named vertical datum (EGM2008), (d) COG GeoTIFF directly consumable, (e) under current maintenance (releases to 2024_1). FABDEM is the better terrain model (bare-earth DTM vs DSM) but its CC BY-NC-SA licence is a legal risk; keep as a later cross-check. NASADEM/AW3D30 are blocked behind logins, with no resolution advantage.

## Pilot area

Centre lat 16.0544, lon 108.2022; window rows 3354–3453, cols 678–777 = **100 × 100 cells**; bbox **lon 108.188333–108.216111, lat 16.040556–16.068333**; size **3074 m N–S × 2972 m E–W** (~3.0 × 3.0 km, ~9.1 km²); cell size at this latitude 30.74 m (lat) × 29.72 m (lon). Justification: 100 cells across gives ~100 independent samples per axis — an order of magnitude more than the 180 m Phase 15 synthetic boundary, so real variation is visible (measured range 1.79–25.68 m, std 2.33 m) while staying far inside one tile (no mosaicking; tile edge ~6 km north, ~22 km east). The pilot is flat coastal urban terrain (mean 8.47 m) — good for a first real-data pass, but it will not exercise steep-slope handling; a second pilot over the western mountains (same tile, max 1408.79 m) is the natural follow-up.

## Tooling note

**GDAL absent** (no `gdalinfo`/`gdal_translate`, no Python `osgeo`/`rasterio`). Python 3.12.3 with numpy present; `tifffile 2026.11.16` + `imagecodecs 2026.11.11` installed via `pip --user` to decode the COG (Predictor 3 requires imagecodecs) — side effect: numpy upgraded 1.26.4 → 2.5.5, pip now warns installed scipy 1.11.4 requires numpy<1.28. Repo JS/TS: no GeoTIFF library; `package.json` has no `geotiff`/GDAL/raster dependency. Recommended ingestion path (used in Phase 16): offline Python preprocessing → cropped Float32Array + JSON metadata into `GridDemProvider`; no runtime GeoTIFF parsing in the browser.

## Sources read live

- Copernicus dataspace COP-DEM page: `https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM`
- AWS bucket readme: `https://copernicus-dem-30m.s3.amazonaws.com/readme.html`
- LP DAAC NASADEM page: `https://lpdaac.usgs.gov/products/nasadem_hgtv001/`
- JAXA DOI landing page, OpenTopography AW3D30 page, FABDEM Bristol/Hugging Face pages via search-result citations.
