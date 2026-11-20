# Phase 14 — Sentinel-2 pilot ingestion (2026-11-20)

First real satellite imagery ingested for the Da Nang pilot. This closes the
"no real imagery" part of the Phase 14 blocker with a licensed, verifiable
source. It does **not** certify pixel parity — see §5.

## 1. Source and licence

- **Programme:** Copernicus Sentinel-2, Level-2A (surface reflectance, orthorectified).
- **Licence:** Copernicus open licence — free use including commercial use, with
  attribution `Contains modified Copernicus Sentinel data 2026`. (The EOX
  cloudless mosaic is CC-BY-NC-SA and was **not** used.)
- **Access route:** Microsoft Planetary Computer STAC API
  (`https://planetarycomputer.microsoft.com/api/stac/v1/search`, collection
  `sentinel-2-l2a`) — public, no account. Band COGs signed anonymously via the
  Planetary Computer SAS endpoint and downloaded from Azure Blob Storage
  (`sentinel2l2a01.blob.core.windows.net`). Copernicus Data Space (account
  required) was not needed.
- **Attribution to record wherever the imagery is displayed:**
  `Contains modified Copernicus Sentinel data 2026`.

## 2. Scenes selected

The pilot bbox (lon 108.188181–108.216217, lat 16.040844–16.067955) straddles
the MGRS tile boundary at lon 108.1931: the western strip (~490 m) is only in
tile **48PZC**, the rest only in **49PBT**. No single scene covers the pilot,
so a same-date pair was used — same acquisition date (2026-04-06) and same
relative orbit R075, both essentially cloud-free.

| Scene | Tile | Date (UTC) | Cloud cover | Orbit |
| --- | --- | --- | --- | --- |
| `S2B_MSIL2A_20260406T030519_R075_T49PBT_20260406T082830` | 49PBT | 2026-04-06 03:05:19 | 0.0032% | R075 |
| `S2B_MSIL2A_20260406T030519_R075_T48PZC_20260406T082830` | 48PZC | 2026-04-06 03:05:19 | 0.0024% | R075 |

- 49PBT native CRS: EPSG:32649 (UTM 49N), 10980×10980, 10 m.
- 48PZC native CRS: EPSG:32648 (UTM 48N), 10980×10980, 10 m.
- Bands used: B04 (red), B03 (green), B02 (blue), 10 m, L2A reflectance 0–10000.

## 3. Raw downloads (outside the repo)

Raw 1.5 GB of full-tile COGs are **not** committed; they live in
`~/workspace/s2-downloads/` on the build VM. SHA-256 verified on download:

| File | SHA-256 |
| --- | --- |
| 49PBT_B02.tif | `6cb31518289192bd5a90383114cbb4e72ae64beb74835b9a61eac0151ee39b6d` |
| 49PBT_B03.tif | `eeefe168e308ceb0dc9eacf0513ca8bf54a51c98599ffd0fcec86d7608262f35` |
| 49PBT_B04.tif | `326af52725a57f134985907d6154e522ebd9a2702d356c5ad7666c6cc30c1eeb` |
| 48PZC_B02.tif | `49bd7a528d7fea6495b36da5cadc7a7638dd88e46fa481f6de545d31d6fb8f66` |
| 48PZC_B03.tif | `8a9a32f67956aa71d892607b7bdc80c8de0f17342109389e3beb07f02c965339` |
| 48PZC_B04.tif | `921d98cedfa51d8faa45238d60f05a77c7cb7f05da7936273382ef3374e00a98` |

Source URLs (unsigned STAC asset hrefs; SAS-signed at download time):
`https://sentinel2l2a01.blob.core.windows.net/sentinel2-l2/49/P/BT/2026/04/06/S2B_MSIL2A_20260406T030519_N0512_R075_T49PBT_20260406T082830.SAFE/..._B0X_10m.tif`
and the same pattern under `48/P/ZC/2026/04/06/..._T48PZC_...`.

## 4. Pilot mosaic (committed evidence)

Both tiles were reprojected (bilinear) onto a common EPSG:4326 grid over the
pilot bbox, 300×300 px (~10 m/px), averaged where they overlap, and stretched
2–98 percentile per band for display. Result: 100% coverage in all three
bands, 0 NoData pixels in the pilot window.

| Band | Min | Max | Mean (reflectance) | Coverage |
| --- | --- | --- | --- | --- |
| B04 (red) | 1284 | 6519 | 2400.8 | 100% |
| B03 (green) | 1458 | 5974 | 2392.2 | 100% |
| B02 (blue) | 1454 | 5558 | 2218.7 | 100% |

- `evidence/sentinel2-pilot-rgb-300.png` — 300×300 true-colour pilot preview.
- `evidence/sentinel2-pilot-rgb-600.png` — same, upscaled 600×600 for reading.
- Visual check (2026-11-20): Da Nang International Airport runway/terminal,
  urban street grid and the lake at the north edge are all clearly visible;
  no cloud, no seam artefact at the tile boundary, no missing strip.

The mosaic shares the DEM pilot footprint exactly (same bbox), so the imagery
and the Phase 16 DEM grid are co-registered by construction; the alignment
inspector run is in §5 and in `src/engine/imagery/__tests__/sentinel2-pilot.test.ts`.

## 5. Alignment inspector — what was and was not certified

Ran the Phase 14 inspector (`validateRasterRegistration`,
`rasterPixelFootprint`, `pixelToWorld`/`worldToPixel`) against the mosaic
registration (EPSG:4326, pixel-corner, transform
`[108.188181, 0.0000934533, 0, 16.067955, 0, -0.00009037]`, GSD ~10 m,
capture 2026-04-06, cloud 0.000032, orthorectified):

- **PASS:** registration metadata validates; footprint corners reproduce the
  pilot bbox; pixel↔world round-trips exactly; the DEM pilot (100×100) and the
  imagery (300×300) share the same footprint.
- **NOT CERTIFIED — pixel parity:** 10 m imagery cannot certify sub-metre
  alignment against the synthetic/DEM world, and no independent ground control
  points exist yet to run `evaluateControlPoints` against. Pixel parity stays
  NOT VERIFIED until surveyed GCPs (or sub-metre commercial imagery) exist.
- **NOT CERTIFIED — GCP/RMSE:** no surveyed checkpoints; nothing claimed.

## 6. What remains for Phase 14 imagery

1. Surveyed GCPs (MONRE/DONRE order, or ICESat-2 ATL08 via IVERT) → run
   `evaluateControlPoints`, compute RMSE, then pixel parity can be judged.
2. Sub-metre commercial imagery (Planet SkySat / Vantor WorldView) if 10 m
   proves too coarse for the certification the project wants.
3. A runtime imagery layer is **not** part of this ingestion — this is audit
   evidence and registry data only; wiring imagery into the world is Phase 17
   scope, not done here.
