#!/usr/bin/env python3
"""Phase 16 DEM ingestion: Copernicus GLO-30 tile -> 100x100 pilot grid (30 m ENU).

Reads the verified source COG /tmp/dem16/Copernicus_DSM_COG_10_N16_00_E108_00_DEM.tif
(SHA-256 f4f95dc5677eaaca9a967230a676bb8a39025ab79d28b89e225a7e822acbdde6),
crops a 3 km x 3 km pilot window around the Da Nang anchor (lat 16.0544,
lon 108.2022), and resamples it onto a regular square ENU grid using the
same WGS84 geodetic<->ECEF<->ENU math as src/engine/geospatial/core.ts.

Vertical datum: source heights are ORTHOMETRIC (EGM2008, EPSG:3855). They are
kept as-is; NO geoid conversion is applied and NO offset is invented.
World Y = orthometric height (mean-sea-level reference). Absolute ellipsoid
alignment is NOT VERIFIED and is documented as such in the metadata.

Outputs (into /tmp/dem16/out/):
  danang-dem-pilot.json  - metadata + stats + checkpoints + provenance
  danang-dem-pilot.b64   - base64 little-endian Float32, row-major,
                           row 0 = north edge, col 0 = west edge
"""
import base64
import hashlib
import json
import math
import os

import numpy as np
import tifffile

SRC = "/tmp/dem16/Copernicus_DSM_COG_10_N16_00_E108_00_DEM.tif"
OUT = "/tmp/dem16/out"
ANCHOR_LAT = 16.0544
ANCHOR_LON = 108.2022
CELL_M = 30.0
N = 100  # 100x100 cells -> 3000x3000 m
NO_DATA = -32767.0

A = 6378137.0
F = 1 / 298.257223563
E2 = F * (2 - F)
RAD = math.pi / 180.0


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def geodetic_to_ecef(lat_deg, lon_deg, h):
    lat, lon = lat_deg * RAD, lon_deg * RAD
    sin = math.sin(lat)
    n = A / math.sqrt(1 - E2 * sin * sin)
    return (
        (n + h) * math.cos(lat) * math.cos(lon),
        (n + h) * math.cos(lat) * math.sin(lon),
        (n * (1 - E2) + h) * sin,
    )


def ecef_to_geodetic(x, y, z):
    p = math.hypot(x, y)
    lat = math.atan2(z, p * (1 - E2))
    for _ in range(20):
        sin = math.sin(lat)
        n = A / math.sqrt(1 - E2 * sin * sin)
        nxt = math.atan2(z + E2 * n * sin, p)
        if abs(nxt - lat) < 1e-14:
            lat = nxt
            break
        lat = nxt
    sin = math.sin(lat)
    n = A / math.sqrt(1 - E2 * sin * sin)
    h = p * math.cos(lat) + z * sin - A * math.sqrt(1 - E2 * sin * sin)
    lon = math.atan2(y, x) / RAD
    lon = ((lon % 360) + 540) % 360 - 180
    return lat / RAD, lon, h


def main():
    os.makedirs(OUT, exist_ok=True)
    src_sha = sha256(SRC)
    print("source sha256:", src_sha)
    with tifffile.TiffFile(SRC) as tif:
        page = tif.pages[0]
        print("shape:", page.shape, "dtype:", page.dtype)
        print("tags of interest:")
        for tag in ("ModelPixelScaleTag", "ModelTiepointTag", "GeoKeyDirectoryTag", "GDAL_NODATA"):
            if tag in page.tags:
                print(" ", tag, "=", page.tags[tag].value)
        arr = page.asarray()
    assert arr.shape == (3600, 3600), arr.shape
    assert arr.dtype == np.float32

    # --- Independent re-check of the research agent's window stats (raw tile) ---
    win = arr[3354:3454, 678:778].astype(np.float64)
    print("raw 100x100 window rows3354-3453 cols678-777: min %.2f max %.2f mean %.4f median %.4f std %.4f"
          % (win.min(), win.max(), win.mean(), np.median(win), win.std()))
    print("raw window NoData(-32767) count:", int((win == NO_DATA).sum()),
          "NaN count:", int(np.isnan(win).sum()))
    print("centre pixel row3404 col728:", float(arr[3404, 728]))
    print("full tile: min %.2f max %.2f mean %.4f" % (arr.min(), arr.max(), arr.mean()))

    # --- ENU basis at anchor (mirror of core.ts createGeoReference) ---
    ax, ay, az = geodetic_to_ecef(ANCHOR_LAT, ANCHOR_LON, 0.0)
    slat, clat = math.sin(ANCHOR_LAT * RAD), math.cos(ANCHOR_LAT * RAD)
    slon, clon = math.sin(ANCHOR_LON * RAD), math.cos(ANCHOR_LON * RAD)

    def enu_to_ecef(e, n, u):
        return (
            ax - slon * e - slat * clon * n + clat * clon * u,
            ay + clon * e - slat * slon * n + clat * slon * u,
            az + clat * n + slat * u,
        )

    def enu_to_geo(e, n):
        x, y, z = enu_to_ecef(e, n, 0.0)
        lat, lon, _h = ecef_to_geodetic(x, y, z)
        return lat, lon

    # Output grid: 100x100 cells, 30 m, centred on anchor.
    # World X = east, world Z = south (world -Z = north). GridDemProvider:
    # originX = west edge, originZ = north edge, row 0 = north, col 0 = west.
    half = N * CELL_M / 2.0  # 1500 m
    origin_x, origin_z = -half, -half

    # Bilinear sample of the source raster at a lon/lat (RasterPixelIsArea:
    # pixel (row,col) covers lon [108+col/3600, 108+(col+1)/3600),
    # lat (17-(row+1)/3600, 17-row/3600]; centre offset -0.5).
    def sample_source(lat, lon):
        colf = (lon - 108.0) * 3600.0 - 0.5
        rowf = (17.0 - lat) * 3600.0 - 0.5
        c0 = int(math.floor(colf))
        r0 = int(math.floor(rowf))
        fx, fz = colf - c0, rowf - r0
        c0 = min(max(c0, 0), 3598)
        r0 = min(max(r0, 0), 3598)
        fx = min(max(fx, 0.0), 1.0)
        fz = min(max(fz, 0.0), 1.0)
        v00 = float(arr[r0, c0])
        v10 = float(arr[r0, c0 + 1])
        v01 = float(arr[r0 + 1, c0])
        v11 = float(arr[r0 + 1, c0 + 1])
        if NO_DATA in (v00, v10, v01, v11):
            return None
        return v00 * (1 - fx) * (1 - fz) + v10 * fx * (1 - fz) + v01 * (1 - fx) * fz + v11 * fx * fz

    def nearest_source(lat, lon):
        col = int(round((lon - 108.0) * 3600.0 - 0.5))
        row = int(round((17.0 - lat) * 3600.0 - 0.5))
        col = min(max(col, 0), 3599)
        row = min(max(row, 0), 3599)
        return float(arr[row, col])

    grid = np.empty((N, N), dtype=np.float32)
    nodata_cells = 0
    resample_err = []
    corners_geo = {}
    for row in range(N):
        north_m = half - (row + 0.5) * CELL_M  # north offset of cell centre
        for col in range(N):
            east_m = -half + (col + 0.5) * CELL_M
            lat, lon = enu_to_geo(east_m, north_m)
            v = sample_source(lat, lon)
            if v is None:
                nodata_cells += 1
                grid[row, col] = NO_DATA
            else:
                grid[row, col] = v
                resample_err.append(abs(v - nearest_source(lat, lon)))
            if (row, col) in ((0, 0), (0, 99), (99, 0), (99, 99), (50, 50)):
                corners_geo[f"r{row}c{col}"] = {"lat": lat, "lon": lon, "elev": None if v is None else v}

    valid = grid[grid != NO_DATA].astype(np.float64)
    resample_err = np.array(resample_err)
    stats = {
        "min": float(valid.min()),
        "max": float(valid.max()),
        "mean": float(valid.mean()),
        "median": float(np.median(valid)),
        "std": float(valid.std()),
        "nodataCells": nodata_cells,
        "resampleMaxAbsErrM": float(resample_err.max()),
        "resampleMeanAbsErrM": float(resample_err.mean()),
    }
    print("grid stats:", json.dumps(stats, indent=1))
    print("corners:", json.dumps(corners_geo, indent=1))

    # Checkpoints: direct raw-tile reads at the same lon/lat (self-consistency,
    # NOT independent ground truth) + grid round-trip via worldToGeo inverse.
    checkpoints = []
    for (row, col) in ((0, 0), (0, 99), (99, 0), (99, 99), (50, 50), (25, 75), (75, 25)):
        north_m = half - (row + 0.5) * CELL_M
        east_m = -half + (col + 0.5) * CELL_M
        lat, lon = enu_to_geo(east_m, north_m)
        direct = nearest_source(lat, lon)
        checkpoints.append({
            "cell": [row, col],
            "lat": lat, "lon": lon,
            "gridValueM": float(grid[row, col]),
            "directTileNearestM": direct,
            "absDiffM": abs(float(grid[row, col]) - direct),
        })
    print("checkpoints:", json.dumps(checkpoints, indent=1))

    # Geographic bbox of the grid (cell-centre extremes + half cell).
    nw_lat, nw_lon = enu_to_geo(-half, half)
    se_lat, se_lon = enu_to_geo(half, -half)
    bbox = {
        "westLon": nw_lon, "eastLon": se_lon,
        "northLat": nw_lat, "southLat": se_lat,
        "centreLat": ANCHOR_LAT, "centreLon": ANCHOR_LON,
    }
    print("bbox:", json.dumps(bbox, indent=1))

    b64 = base64.b64encode(grid.astype("<f4").tobytes()).decode("ascii")
    with open(os.path.join(OUT, "danang-dem-pilot.b64"), "w") as f:
        f.write(b64)
    meta = {
        "datasetId": "copernicus-dem-glo30-danang-pilot-v1",
        "sourceId": "copernicus-dsm",
        "version": "1",
        "sourceTile": "Copernicus_DSM_COG_10_N16_00_E108_00_DEM",
        "sourceTileSha256": src_sha,
        "sourceUrl": "https://copernicus-dem-30m.s3.amazonaws.com/Copernicus_DSM_COG_10_N16_00_E108_00_DEM/Copernicus_DSM_COG_10_N16_00_E108_00_DEM.tif",
        "sourceFormat": "COG GeoTIFF, Float32, 3600x3600, 1 arc-second",
        "sourceCrs": "EPSG:4326",
        "sourceVerticalDatum": "EGM2008 (EPSG:3855)",
        "worldVerticalDatum": "ORTHOMETRIC_EGM2008 (no geoid conversion applied; absolute ellipsoid alignment NOT VERIFIED)",
        "anchorLat": ANCHOR_LAT, "anchorLon": ANCHOR_LON,
        "cellSizeMeters": CELL_M, "widthCells": N, "heightCells": N,
        "originXMeters": origin_x, "originZMeters": origin_z,
        "coverageMeters": {"minX": -half, "maxX": half, "minZ": -half, "maxZ": half},
        "bbox": bbox,
        "noData": NO_DATA,
        "stats": stats,
        "checkpoints": checkpoints,
        "license": "Copernicus DEM free licence (commercial use allowed with attribution)",
        "attribution": "© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved",
        "processingHistory": [
            "Downloaded Copernicus_DSM_COG_10_N16_00_E108_00_DEM.tif from the public AWS S3 bucket copernicus-dem-30m (anonymous, 2026-11-20)",
            "Verified SHA-256, COG structure, EPSG:4326 / EGM2008 GeoKeys from the file itself",
            "Cropped a 100x100-cell pilot window around lat 16.0544 lon 108.2022 and resampled it onto a regular 30 m ENU grid centred on the anchor using WGS84 geodetic-ECEF-ENU math (same constants as src/engine/geospatial/core.ts); bilinear resampling from RasterPixelIsArea source cells",
            "No geoid conversion applied: elevations remain orthometric EGM2008 heights; world Y equals orthometric height",
        ],
    }
    with open(os.path.join(OUT, "danang-dem-pilot.json"), "w") as f:
        json.dump(meta, f, indent=2)
    print("wrote", OUT, "b64 chars:", len(b64), "grid bytes:", grid.nbytes)


if __name__ == "__main__":
    main()
