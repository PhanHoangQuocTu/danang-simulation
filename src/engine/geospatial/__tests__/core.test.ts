import { describe, expect, it } from 'vitest';
import {
  createGeoReference,
  ecefToEnu,
  ecefToGeodetic,
  enuToEcef,
  enuToWorld,
  geodeticToEcef,
  geoToWorld,
  GeospatialValidationError,
  headingToWorldYaw,
  normalizeLongitudeDegrees,
  validateGeodeticCoordinate,
  worldToEnu,
  worldToGeo,
  worldYawToHeading,
} from '../core';

const anchor = { latitudeDeg: 16.0544, longitudeDeg: 108.2022, ellipsoidalHeightMeters: 0 };
const reference = () => createGeoReference(anchor);
const distance = (a: { x: number; y: number; z: number }, b: { x: number; y: number; z: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

describe('Phase 12 pure geographic core', () => {
  it('GEO-01/02 maps anchor and local origin without moving the simulation', () => {
    expect(geoToWorld(anchor, reference())).toEqual({ x: 0, y: 0, z: 0 });
    const geo = worldToGeo({ x: 0, y: 0, z: 0 }, reference());
    expect(geo.latitudeDeg).toBeCloseTo(anchor.latitudeDeg, 10);
    expect(geo.longitudeDeg).toBeCloseTo(anchor.longitudeDeg, 10);
    expect(geo.ellipsoidalHeightMeters).toBeCloseTo(0, 6);
  });

  it('GEO-03 matches independent EPSG Guidance Note 7-2 geographic/geocentric example', () => {
    // EPSG method 9602 worked example, published rounded Cartesian meters.
    const geo = {
      latitudeDeg: 53 + 48 / 60 + 33.82 / 3600,
      longitudeDeg: 2 + 7 / 60 + 46.38 / 3600,
      ellipsoidalHeightMeters: 73,
    };
    const ecef = geodeticToEcef(geo);
    expect(ecef.xMeters).toBeCloseTo(3771793.97, 2);
    expect(ecef.yMeters).toBeCloseTo(140253.34, 2);
    expect(ecef.zMeters).toBeCloseTo(5124304.35, 2);
    const inverse = ecefToGeodetic({ xMeters: 3771793.97, yMeters: 140253.34, zMeters: 5124304.35 });
    expect(inverse.latitudeDeg).toBeCloseTo(geo.latitudeDeg, 7);
    expect(inverse.longitudeDeg).toBeCloseTo(geo.longitudeDeg, 7);
    expect(inverse.ellipsoidalHeightMeters).toBeCloseTo(73, 2);
    expect(geodeticToEcef({ latitudeDeg: 0, longitudeDeg: 0, ellipsoidalHeightMeters: 0 })).toEqual({
      xMeters: 6378137,
      yMeters: 0,
      zMeters: 0,
    });
  });

  it('GEO-04 uses the ENU rotation and its transpose', () => {
    const equator = createGeoReference({ latitudeDeg: 0, longitudeDeg: 0, ellipsoidalHeightMeters: 0 });
    expect(ecefToEnu({ xMeters: 6378140, yMeters: 1, zMeters: 2 }, equator)).toEqual({
      eastMeters: 1,
      northMeters: 2,
      upMeters: 3,
    });
    const point = { xMeters: -1999999, yMeters: 5999999, zMeters: 1999999 };
    const restored = enuToEcef(ecefToEnu(point, reference()), reference());
    expect(
      Math.hypot(restored.xMeters - point.xMeters, restored.yMeters - point.yMeters, restored.zMeters - point.zMeters)
    ).toBeLessThan(1e-8);
  });

  it('GEO-05/08 maps exact axes, vertical and signed offsets', () => {
    expect(enuToWorld({ eastMeters: 1, northMeters: 2, upMeters: 3 })).toEqual({ x: 1, y: 3, z: -2 });
    expect(worldToEnu({ x: -1, y: -3, z: 2 })).toEqual({ eastMeters: -1, northMeters: -2, upMeters: -3 });
  });

  it('GEO-06/07 places increasing longitude east and latitude north', () => {
    expect(geoToWorld({ ...anchor, longitudeDeg: anchor.longitudeDeg + 0.001 }, reference()).x).toBeGreaterThan(100);
    expect(geoToWorld({ ...anchor, latitudeDeg: anchor.latitudeDeg + 0.001 }, reference()).z).toBeLessThan(-100);
    expect(geoToWorld({ ...anchor, ellipsoidalHeightMeters: 10 }, reference()).y).toBeCloseTo(10, 7);
  });

  it.each([
    [0, Math.PI],
    [90, Math.PI / 2],
    [180, 0],
    [270, -Math.PI / 2],
    [-90, -Math.PI / 2],
    [360, Math.PI],
    [450, Math.PI / 2],
  ])('GEO-09 heading %s maps character forward +Z', (heading, yaw) => {
    expect(Math.sin(headingToWorldYaw(heading))).toBeCloseTo(Math.sin(yaw), 12);
    expect(Math.cos(headingToWorldYaw(heading))).toBeCloseTo(Math.cos(yaw), 12);
    expect(worldYawToHeading(yaw)).toBeCloseTo(((heading % 360) + 360) % 360, 10);
  });

  it('GEO-11 retains millimeter through 5km offsets with <=0.01m numerical residual', () => {
    let maximum = 0;
    for (const x of [-3500, -68, -0.001, 0, 0.001, 68, 3500]) {
      for (const z of [-3500, -68, 0, 68, 3500]) {
        for (const y of [-100, 0, 0.001, 10, 100]) {
          const world = { x, y, z };
          maximum = Math.max(maximum, distance(world, geoToWorld(worldToGeo(world, reference()), reference())));
        }
      }
    }
    console.info(`GEO-11 maximum world residual: ${maximum} m; threshold 0.01 m`);
    expect(maximum).toBeLessThanOrEqual(0.01);
  });

  it('rejects invalid coordinates, missing height, vectors, origins and angles explicitly', () => {
    for (const value of [
      null,
      undefined,
      {},
      { ...anchor, latitudeDeg: 91 },
      { ...anchor, longitudeDeg: 181 },
      { ...anchor, ellipsoidalHeightMeters: undefined },
      { ...anchor, latitudeDeg: Number.NaN },
    ]) {
      expect(() => validateGeodeticCoordinate(value)).toThrow(GeospatialValidationError);
      expect(() => geodeticToEcef(value as typeof anchor)).toThrow(GeospatialValidationError);
    }
    for (const bad of [Number.NaN, Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, undefined]) {
      expect(() => worldToGeo({ x: bad as number, y: 0, z: 0 }, reference())).toThrow(GeospatialValidationError);
      expect(() => ecefToGeodetic({ xMeters: 1, yMeters: bad as number, zMeters: 1 })).toThrow(
        GeospatialValidationError
      );
      expect(() => enuToWorld({ eastMeters: 0, northMeters: 0, upMeters: bad as number })).toThrow(
        GeospatialValidationError
      );
      expect(() => createGeoReference(anchor, { x: 0, y: bad as number, z: 0 })).toThrow(GeospatialValidationError);
      expect(() => headingToWorldYaw(bad as number)).toThrow(GeospatialValidationError);
      expect(() => worldYawToHeading(bad as number)).toThrow(GeospatialValidationError);
      expect(() => normalizeLongitudeDegrees(bad as number)).toThrow(GeospatialValidationError);
    }
    for (const radius of [0, 0.001, 1000])
      expect(() => ecefToGeodetic({ xMeters: radius, yMeters: 0, zMeters: 0 })).toThrow(GeospatialValidationError);
  });

  it('GEO-13/14 handles poles, date line, southern hemisphere and negative height', () => {
    expect(normalizeLongitudeDegrees(180)).toBe(-180);
    expect(normalizeLongitudeDegrees(-180)).toBe(-180);
    expect(normalizeLongitudeDegrees(540)).toBe(-180);
    for (const latitudeDeg of [-90, -89.999999, -45, 0, 89.999999, 90]) {
      for (const longitudeDeg of [-180, -108, 0, 180]) {
        const geo = { latitudeDeg, longitudeDeg, ellipsoidalHeightMeters: -100 };
        const p = geodeticToEcef(geo);
        const q = geodeticToEcef(ecefToGeodetic(p));
        expect(Math.hypot(p.xMeters - q.xMeters, p.yMeters - q.yMeters, p.zMeters - q.zMeters)).toBeLessThan(0.000001);
      }
    }
    expect(ecefToGeodetic({ xMeters: 0, yMeters: 0, zMeters: 6356752.314245179 }).latitudeDeg).toBe(90);
  });

  it('copies and freezes a nonzero relative world origin and anchor', () => {
    const origin = { x: 100, y: 20, z: -200 };
    const mutable = { ...anchor };
    const ref = createGeoReference(mutable, origin);
    origin.x = 999;
    mutable.latitudeDeg = 0;
    expect(geoToWorld(anchor, ref)).toEqual({ x: 100, y: 20, z: -200 });
    const p = { x: 101, y: 22, z: -203 };
    expect(distance(p, geoToWorld(worldToGeo(p, ref), ref))).toBeLessThan(0.000001);
    expect(Object.isFrozen(ref)).toBe(true);
    expect(Object.isFrozen(ref.anchor)).toBe(true);
    expect(Object.isFrozen(ref.worldOrigin)).toBe(true);
    expect(Object.isFrozen(ref.ecef)).toBe(true);
  });

  it('rejects missing or forged references with the same typed error contract', () => {
    for (const value of [null, undefined, {}, { ...reference(), sinLatitude: Number.NaN }]) {
      const ref = value as ReturnType<typeof createGeoReference>;
      expect(() => worldToGeo({ x: 0, y: 0, z: 0 }, ref)).toThrow(GeospatialValidationError);
      expect(() => geoToWorld(anchor, ref)).toThrow(GeospatialValidationError);
      expect(() => ecefToEnu({ xMeters: 6378137, yMeters: 0, zMeters: 0 }, ref)).toThrow(GeospatialValidationError);
      expect(() => enuToEcef({ eastMeters: 0, northMeters: 0, upMeters: 0 }, ref)).toThrow(GeospatialValidationError);
    }
  });

  it('never accepts a polar anchor inside the inverse exclusion radius', () => {
    const unsupported = { latitudeDeg: 90, longitudeDeg: 0, ellipsoidalHeightMeters: -3189068.5 };
    expect(() => createGeoReference(unsupported)).toThrow(GeospatialValidationError);
    for (const latitudeDeg of [-90, -45, 0, 45, 90]) {
      const coordinate = { latitudeDeg, longitudeDeg: 0, ellipsoidalHeightMeters: -3167683 };
      const ref = createGeoReference(coordinate);
      const restored = worldToGeo({ x: 0, y: 0, z: 0 }, ref);
      expect(restored.latitudeDeg).toBeCloseTo(latitudeDeg, 9);
      expect(restored.ellipsoidalHeightMeters).toBeCloseTo(coordinate.ellipsoidalHeightMeters, 6);
    }
  });
});
