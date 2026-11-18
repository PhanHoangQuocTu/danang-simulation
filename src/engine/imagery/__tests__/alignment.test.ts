import { describe, expect, it } from 'vitest';
import { createGeoReference } from '@/engine/geospatial/core';
import { runGeospatialDiagnosticsSuite } from '@/modules/WorldExplorer/geospatial-diagnostics';
import {
  pixelToNativeCoordinate,
  nativeCoordinateToPixel,
  nativeCoordinateToGeodetic,
  geodeticToNativeCoordinate,
  pixelToWorld,
  worldToPixel,
  rasterPixelFootprint,
  validateRasterRegistration,
  evaluateControlPoints,
  isNoData,
} from '../alignment';

import { rasterFixture } from './fixtures';
const valid = () => validateRasterRegistration(rasterFixture);
const ref = createGeoReference(
  { latitudeDeg: 16.06, longitudeDeg: 108.2, ellipsoidalHeightMeters: 0 },
  { x: 12, y: 4, z: 8 }
);
const point = (id: string, column: number, row: number, role = 'independent-validation') => ({
  id,
  assetId: 'test-raster',
  sourceId: 'test-source',
  version: 'v1',
  pixel: { column, row },
  ground: { longitudeDeg: 108.2 + column * 0.00001, latitudeDeg: 16.06 - row * 0.00001 },
  role,
  provenance: 'TEST DATA / not surveyed',
  collectedAt: '2026-11-18',
  uncertaintyMeters: 1,
  authoritative: false,
});
describe('raster alignment', () => {
  it('IMG-01 accepts explicit raster metadata and unknown capture date', () => {
    expect(valid().captureDate).toBeNull();
  });
  it.each([0, -1, 1.5, Number.POSITIVE_INFINITY, Number.NaN, 100000])(
    'IMG-02/65 rejects invalid dimensions %s',
    (width) => {
      expect(() => validateRasterRegistration({ ...rasterFixture, width })).toThrow();
    }
  );
  it.each([Number.NaN, Number.POSITIVE_INFINITY])('IMG-03 rejects nonfinite coefficients', (value) => {
    expect(() => validateRasterRegistration({ ...rasterFixture, transform: [0, value, 0, 0, 0, -1] })).toThrow();
  });
  it.each([
    [0, 1, 1, 0, 1, 1],
    [0, 1, 1, 0, 1, 1 + 1e-13],
  ])('IMG-04 rejects unstable matrix', (...transform) => {
    expect(() => nativeCoordinateToPixel({ x: 1, y: 1 }, transform)).toThrow(/affine/);
  });
  it('IMG-05 identity forward/inverse independently known vector', () => {
    expect(pixelToNativeCoordinate({ column: 2, row: 3 }, [0, 1, 0, 0, 0, 1])).toEqual({ x: 2, y: 3 });
    expect(nativeCoordinateToPixel({ x: 2, y: 3 }, [0, 1, 0, 0, 0, 1])).toEqual({ column: 2, row: 3 });
  });
  it('IMG-06 north-up corner has negative row Y', () => {
    const corner = pixelToNativeCoordinate({ column: 100, row: 100 }, valid().transform);
    expect(corner.x).toBeCloseTo(108.201, 10);
    expect(corner.y).toBeCloseTo(16.059, 10);
  });
  it('IMG-07 rotated signed off-diagonal forward vector', () => {
    expect(pixelToNativeCoordinate({ column: 2, row: 3 }, [100, 2, -1, 200, 1, -2])).toEqual({ x: 101, y: 196 });
  });
  it('IMG-08 shear inverse and large coordinates', () => {
    const transform = [700000, 2, 0.3, 2000000, 0.2, -2];
    const p = nativeCoordinateToPixel(pixelToNativeCoordinate({ column: 17.25, row: 82.5 }, transform), transform);
    expect(p.column).toBeCloseTo(17.25, 8);
    expect(p.row).toBeCloseTo(82.5, 8);
  });
  it('IMG-09 normalizes center-based affine to edge pixel coordinates', () => {
    expect(pixelToNativeCoordinate({ column: 0.5, row: 0.5 }, [10, 2, 1, 20, 1, -2], 'pixel-center')).toEqual({
      x: 10,
      y: 20,
    });
    expect(nativeCoordinateToPixel({ x: 10, y: 20 }, [10, 2, 1, 20, 1, -2], 'pixel-center')).toEqual({
      column: 0.5,
      row: 0.5,
    });
  });
  it('IMG-10 ordered closed edge footprint', () => {
    const ring = rasterPixelFootprint(valid());
    expect(ring).toHaveLength(5);
    expect(ring[0]).toEqual(ring[4]);
    expect(ring[1][0]).toBeGreaterThan(ring[0][0]);
    expect(ring[2][1]).toBeLessThan(ring[1][1]);
  });
  it.each([undefined, 'EPSG:32649', 'VN-2000', 'EPSG:4979'])(
    'IMG-11/13/36 unsupported CRS %s fails closed',
    (nativeCrs) => {
      expect(() => validateRasterRegistration({ ...rasterFixture, nativeCrs })).toThrow();
    }
  );
  it('IMG-12 geographic adapter requires explicit lon/lat and height separately', () => {
    expect(nativeCoordinateToGeodetic({ x: 108.2, y: 16.06 }, 'EPSG:4326', 25)).toEqual({
      longitudeDeg: 108.2,
      latitudeDeg: 16.06,
      ellipsoidalHeightMeters: 25,
    });
    expect(geodeticToNativeCoordinate({ longitudeDeg: 108.2, latitudeDeg: 16.06 }, 'EPSG:4326')).toEqual({
      x: 108.2,
      y: 16.06,
    });
    expect(() => nativeCoordinateToGeodetic({ x: 16, y: 108 }, 'EPSG:4326', 0)).toThrow();
  });
  it('IMG-14/15 uses Phase 12 axes and nonzero world origin once', () => {
    const r = valid();
    const origin = pixelToWorld({ column: 0, row: 0 }, r, ref, 0);
    expect(origin.x).toBeCloseTo(12, 7);
    expect(origin.z).toBeCloseTo(8, 7);
    const w = pixelToWorld({ column: 40, row: 60 }, r, ref, 0);
    expect(w.x).toBeGreaterThan(origin.x);
    expect(w.z).toBeGreaterThan(origin.z);
    const restored = worldToPixel(w, r, ref);
    expect(restored.column).toBeCloseTo(40, 6);
    expect(restored.row).toBeCloseTo(60, 6);
  });
  it('IMG-16 rejects self-intersection and footprint mismatch', () => {
    const f = rasterFixture.footprintWgs84;
    expect(() =>
      validateRasterRegistration({ ...rasterFixture, footprintWgs84: [f[0], f[2], f[1], f[3], f[0]] })
    ).toThrow();
  });
  it('IMG-17 rejects antimeridian and polar extent', () => {
    for (const transform of [
      [179.99, 0.01, 0, 16, 0, -0.01],
      [108, 0.00001, 0, 89, 0, -0.00001],
    ])
      expect(() => validateRasterRegistration({ ...rasterFixture, transform })).toThrow();
  });
  it('IMG-18 rejects upside-down and mirrored orientation', () => {
    for (const transform of [
      [108, -0.00001, 0, 16, 0, -0.00001],
      [108, 0.00001, 0, 16, 0, 0.00001],
    ])
      expect(() => validateRasterRegistration({ ...rasterFixture, transform })).toThrow();
  });
  it('IMG-19 rejects unrealistic extent and GSD mismatch', () => {
    expect(() => validateRasterRegistration({ ...rasterFixture, groundSampleDistanceMeters: 1000 })).toThrow();
    expect(() => validateRasterRegistration({ ...rasterFixture, transform: [108, 0.1, 0, 16, 0, -0.1] })).toThrow();
  });
  it('IMG-20 preserves nodata and cloud unknown rather than content', () => {
    expect(isNoData(0, { ...valid(), noData: 0 })).toBe(true);
    expect(isNoData(0, valid())).toBe(false);
    expect(isNoData(Number.NaN, valid())).toBe(true);
  });
  it('IMG-21 rejects implicit height and never writes georeference', () => {
    expect(() => pixelToWorld({ column: 0, row: 0 }, valid(), ref, Number.NaN)).toThrow();
    expect(Object.isFrozen(ref)).toBe(true);
  });
  it('IMG-22 preserves GEO and historical diagnostics', () => {
    expect(runGeospatialDiagnosticsSuite().every((c) => c.passed)).toBe(true);
  });
  it('IMG-29/35 matched synthetic controls do not establish real accuracy', () => {
    const result = evaluateControlPoints(valid(), [point('a', 0, 0), point('b', 100, 0), point('c', 0, 100)], ref, {
      rmseMeters: 2,
      maxMeters: 3,
    });
    expect(result.independent.n).toBe(3);
    expect(result.independent.rmseMeters).toBeLessThan(1e-6);
    expect(result.status).toBe('unverified');
  });
  it('IMG-30 rejects duplicate, collinear, clustered, out of bounds and wrong-version GCP', () => {
    const a = point('a', 0, 0);
    const b = point('b', 100, 0);
    const c = point('c', 0, 100);
    for (const points of [
      [a, a, c],
      [a, b, point('c', 50, 0)],
      [a, point('b', 1, 0), point('c', 0, 1)],
      [a, b, point('c', 101, 101)],
      [a, b, { ...c, version: 'v2' }],
    ])
      expect(() => evaluateControlPoints(valid(), points, ref, { rmseMeters: 2, maxMeters: 3 })).toThrow();
  });
  it('IMG-31 calibration and holdout statistics remain separate', () => {
    const result = evaluateControlPoints(
      valid(),
      [point('a', 0, 0, 'calibration'), point('b', 100, 0, 'calibration'), point('c', 0, 100, 'calibration')],
      ref,
      { rmseMeters: 2, maxMeters: 3 }
    );
    expect(result.calibration.n).toBe(3);
    expect(result.independent.n).toBe(0);
    expect(result.independent.rmseMeters).toBeNull();
    expect(result.status).toBe('unverified');
  });
  it('IMG-32/33/34 offset and outlier remain visible and thresholds are enforced', () => {
    const points = [point('a', 0, 0), point('b', 100, 0), point('c', 0, 100)].map((p) => ({
      ...p,
      authoritative: true,
    }));
    points[2].ground.longitudeDeg += 0.0001;
    const result = evaluateControlPoints(valid(), points, ref, { rmseMeters: 2, maxMeters: 3 });
    expect(result.status).toBe('rejected');
    expect(result.independent.maxMeters).toBeGreaterThan(10);
    expect(result.independent.rmseMeters).toBeCloseTo(result.independent.maxMeters! / Math.sqrt(3), 4);
    expect(evaluateControlPoints(valid(), points, ref, { rmseMeters: 20, maxMeters: 20 }).status).toBe(
      'checkpoint-validated'
    );
  });
  it('IMG-35 empty controls remain unverified', () => {
    expect(evaluateControlPoints(valid(), [], ref, { rmseMeters: 2, maxMeters: 3 }).status).toBe('unverified');
  });
  it('IMG-32 measures GCP errors locally even when the caller world anchor is distant', () => {
    const r = valid();
    const raster = {
      ...r,
      transform: [18.2, ...r.transform.slice(1)] as typeof r.transform,
      footprintWgs84: r.footprintWgs84.map(([lon, lat]) => [lon - 90, lat]) as typeof r.footprintWgs84,
    };
    const controls = [point('a', 0, 0), point('b', 100, 0), point('c', 0, 100)].map((p) => ({
      ...p,
      authoritative: true,
      ground: { ...p.ground, longitudeDeg: p.ground.longitudeDeg - 90 + 0.0001 },
    }));
    const result = evaluateControlPoints(raster, controls, ref, { rmseMeters: 3, maxMeters: 3 });
    expect(result.status).toBe('rejected');
    expect(result.independent.rmseMeters).toBeGreaterThan(10);
  });
});
