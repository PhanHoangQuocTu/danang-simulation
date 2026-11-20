import { describe, expect, it } from 'vitest';
import {
  nativeCoordinateToPixel,
  pixelToNativeCoordinate,
  rasterPixelFootprint,
  validateRasterRegistration,
} from '../alignment';

/**
 * Real Sentinel-2 pilot mosaic registration (2026-11-20 ingestion, see
 * docs/audit/phase-14/SENTINEL2_PILOT_INGESTION.md). Two L2A scenes from
 * 2026-04-06 (tiles 49PBT + 48PZC, cloud 0.0032% / 0.0024%) mosaicked onto a
 * common EPSG:4326 grid over the DEM pilot bbox, 300x300 px at ~10 m.
 * This test pins the real metadata — it is not fixture data.
 */
const sentinel2PilotRegistration = {
  assetId: 'sentinel2-pilot-rgb-20260406',
  sourceId: 'sentinel-imagery',
  datasetId: 'sentinel-2-l2a',
  version: '2026-04-06-mosaic-v1',
  width: 300,
  height: 300,
  nativeCrs: 'EPSG:4326' as const,
  pixelReference: 'pixel-corner' as const,
  transform: [108.188181, 0.00009345333333333334, 0, 16.067955, 0, -0.00009037] as [
    number,
    number,
    number,
    number,
    number,
    number,
  ],
  footprintWgs84: [
    [108.188181, 16.067955],
    [108.216217, 16.067955],
    [108.216217, 16.040844],
    [108.188181, 16.040844],
    [108.188181, 16.067955],
  ] as [number, number][],
  captureDate: '2026-04-06',
  groundSampleDistanceMeters: 10.05,
  noData: 0,
  cloudFraction: 0.000032,
  noDataFraction: 0,
  orthorectified: true as const,
};

describe('Sentinel-2 pilot mosaic registration (real 2026-04-06 ingestion)', () => {
  it('validates against the Phase 14 inspector', () => {
    const raster = validateRasterRegistration(sentinel2PilotRegistration);
    expect(raster.width).toBe(300);
    expect(raster.height).toBe(300);
    expect(raster.captureDate).toBe('2026-04-06');
    expect(raster.cloudFraction).toBeCloseTo(0.000032, 8);
  });

  it('footprint corners reproduce the DEM pilot bbox exactly', () => {
    const raster = validateRasterRegistration(sentinel2PilotRegistration);
    const footprint = rasterPixelFootprint(raster);
    const expected = [
      [108.188181, 16.067955],
      [108.216217, 16.067955],
      [108.216217, 16.040844],
      [108.188181, 16.040844],
      [108.188181, 16.067955],
    ];
    expect(footprint).toHaveLength(5);
    for (const [i, [lon, lat]] of expected.entries()) {
      expect(footprint[i][0]).toBeCloseTo(lon, 6);
      expect(footprint[i][1]).toBeCloseTo(lat, 6);
    }
  });

  it('pixel <-> native round-trips at the pilot anchor (16.0544, 108.2022)', () => {
    const raster = validateRasterRegistration(sentinel2PilotRegistration);
    // Anchor is the bbox centre: column 150, row 150 (300x300 grid).
    const native = pixelToNativeCoordinate({ column: 150, row: 150 }, raster.transform, raster.pixelReference);
    expect(native.x).toBeCloseTo(108.2022, 4);
    expect(native.y).toBeCloseTo(16.0544, 4);
    const back = nativeCoordinateToPixel(native, raster.transform);
    expect(back.column).toBeCloseTo(150, 6);
    expect(back.row).toBeCloseTo(150, 6);
  });

  it('does not claim GCP certification — no surveyed control points exist yet', () => {
    // Deliberate: evaluateControlPoints is NOT run here because there are no
    // independent surveyed checkpoints. Pixel parity stays NOT VERIFIED.
    expect(sentinel2PilotRegistration.cloudFraction).toBeLessThan(0.2);
  });
});
