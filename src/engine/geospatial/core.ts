import type { ECEFCoordinate, ENUCoordinate, GeodeticCoordinate, GeoReference, WorldCoordinate } from './type';

export const WGS84 = Object.freeze({ semiMajorAxisMeters: 6378137, inverseFlattening: 298.257223563 });
const a = WGS84.semiMajorAxisMeters;
const f = 1 / WGS84.inverseFlattening;
const e2 = f * (2 - f);
const b = a * (1 - f);
const radians = Math.PI / 180;
const references = new WeakSet<GeoReference>();

function validateReference(ref: GeoReference): void {
  if (!references.has(ref)) throw new GeospatialValidationError('Reference must be created by createGeoReference');
}

export class GeospatialValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GeospatialValidationError';
  }
}

function finite(value: unknown, label: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new GeospatialValidationError(`${label} must be a finite number`);
  }
}

function components(value: unknown, keys: readonly string[]): void {
  if (typeof value !== 'object' || value === null) throw new GeospatialValidationError('Coordinate is required');
  for (const key of keys) finite((value as Record<string, unknown>)[key], key);
}

/**
 * Strict degrees/ellipsoid-meter validation; no clamping, wrapping or missing-height defaults.
 * Height must be >= a/2-b (approximately -3,167,683.814 m), conservatively excluding
 * the ambiguous deep interior at every latitude. Surface and orbital heights are supported.
 */
export function validateGeodeticCoordinate(value: unknown): asserts value is GeodeticCoordinate {
  components(value, ['latitudeDeg', 'longitudeDeg', 'ellipsoidalHeightMeters']);
  const geo = value as GeodeticCoordinate;
  if (Math.abs(geo.latitudeDeg) > 90 || Math.abs(geo.longitudeDeg) > 180) {
    throw new GeospatialValidationError('Latitude must be [-90,90] and longitude [-180,180] degrees');
  }
  // The smallest ellipsoid radius is b: keep every latitude outside the inverse's a/2 exclusion.
  if (geo.ellipsoidalHeightMeters < a / 2 - b) {
    throw new GeospatialValidationError('Deep-interior geodetic coordinates are unsupported');
  }
}

/** Explicit wrapping in degrees to [-180,180); both date-line representations become -180. */
export function normalizeLongitudeDegrees(degrees: number): number {
  finite(degrees, 'longitudeDeg');
  return (((degrees % 360) + 540) % 360) - 180;
}

/** Valid EPSG:4979 degrees/ellipsoid meters to EPSG:4978 geocentric meters. */
export function geodeticToEcef(geo: GeodeticCoordinate): ECEFCoordinate {
  validateGeodeticCoordinate(geo);
  const latitude = geo.latitudeDeg * radians;
  const longitude = geo.longitudeDeg * radians;
  const sin = Math.sin(latitude);
  const cos = Math.cos(latitude);
  const n = a / Math.sqrt(1 - e2 * sin * sin);
  const h = geo.ellipsoidalHeightMeters;
  const result = {
    xMeters: (n + h) * cos * Math.cos(longitude),
    yMeters: (n + h) * cos * Math.sin(longitude),
    zMeters: (n * (1 - e2) + h) * sin,
  };
  components(result, ['xMeters', 'yMeters', 'zMeters']);
  return result;
}

/**
 * Finite EPSG:4978 meters to EPSG:4979. Deep interior (radius < a/2) is rejected.
 * Bounded latitude iteration (20 steps, 1e-14 rad); normal-projected height avoids
 * division by cos(latitude) near poles. Pole longitude is conventionally zero.
 * Intended for Earth surface/local-world work; not a solver for Earth's center.
 */
export function ecefToGeodetic(ecef: ECEFCoordinate): GeodeticCoordinate {
  components(ecef, ['xMeters', 'yMeters', 'zMeters']);
  const { xMeters: x, yMeters: y, zMeters: z } = ecef;
  const p = Math.hypot(x, y);
  const radius = Math.hypot(p, z);
  finite(radius, 'ECEF radius');
  if (radius < a / 2) throw new GeospatialValidationError('Near-center ECEF has no supported geodetic solution');
  if (p < 1e-8) {
    return { latitudeDeg: z < 0 ? -90 : 90, longitudeDeg: 0, ellipsoidalHeightMeters: Math.abs(z) - b };
  }
  let latitude = Math.atan2(z, p * (1 - e2));
  let converged = false;
  for (let iteration = 0; iteration < 20; iteration++) {
    const sin = Math.sin(latitude);
    const n = a / Math.sqrt(1 - e2 * sin * sin);
    const next = Math.atan2(z + e2 * n * sin, p);
    if (Math.abs(next - latitude) < 1e-14) converged = true;
    latitude = next;
    if (converged) break;
  }
  if (!converged) throw new GeospatialValidationError('ECEF inverse did not converge');
  const sin = Math.sin(latitude);
  const result = {
    latitudeDeg: latitude / radians,
    longitudeDeg: normalizeLongitudeDegrees(Math.atan2(y, x) / radians),
    ellipsoidalHeightMeters: p * Math.cos(latitude) + z * sin - a * Math.sqrt(1 - e2 * sin * sin),
  };
  validateGeodeticCoordinate(result);
  return result;
}

/** Copy/freeze anchor and world origin (meters); cache Float64 ECEF and ENU basis once. */
export function createGeoReference(
  anchor: GeodeticCoordinate,
  worldOrigin: WorldCoordinate = { x: 0, y: 0, z: 0 }
): GeoReference {
  validateGeodeticCoordinate(anchor);
  components(worldOrigin, ['x', 'y', 'z']);
  const reference = Object.freeze({
    anchor: Object.freeze({ ...anchor }),
    worldOrigin: Object.freeze({ ...worldOrigin }),
    ecef: Object.freeze(geodeticToEcef(anchor)),
    sinLatitude: Math.sin(anchor.latitudeDeg * radians),
    cosLatitude: Math.cos(anchor.latitudeDeg * radians),
    sinLongitude: Math.sin(anchor.longitudeDeg * radians),
    cosLongitude: Math.cos(anchor.longitudeDeg * radians),
  });
  references.add(reference);
  return reference;
}

/** Finite geocentric meters to anchor-relative East/North/Up meters (ESA Navipedia basis). */
export function ecefToEnu(point: ECEFCoordinate, ref: GeoReference): ENUCoordinate {
  validateReference(ref);
  components(point, ['xMeters', 'yMeters', 'zMeters']);
  const x = point.xMeters - ref.ecef.xMeters;
  const y = point.yMeters - ref.ecef.yMeters;
  const z = point.zMeters - ref.ecef.zMeters;
  const result = {
    eastMeters: -ref.sinLongitude * x + ref.cosLongitude * y,
    northMeters: -ref.sinLatitude * ref.cosLongitude * x - ref.sinLatitude * ref.sinLongitude * y + ref.cosLatitude * z,
    upMeters: ref.cosLatitude * ref.cosLongitude * x + ref.cosLatitude * ref.sinLongitude * y + ref.sinLatitude * z,
  };
  components(result, ['eastMeters', 'northMeters', 'upMeters']);
  return result;
}

/** Finite anchor-relative ENU meters to geocentric meters using the transposed basis. */
export function enuToEcef(enu: ENUCoordinate, ref: GeoReference): ECEFCoordinate {
  validateReference(ref);
  components(enu, ['eastMeters', 'northMeters', 'upMeters']);
  const { eastMeters: e, northMeters: n, upMeters: u } = enu;
  const result = {
    xMeters:
      ref.ecef.xMeters -
      ref.sinLongitude * e -
      ref.sinLatitude * ref.cosLongitude * n +
      ref.cosLatitude * ref.cosLongitude * u,
    yMeters:
      ref.ecef.yMeters +
      ref.cosLongitude * e -
      ref.sinLatitude * ref.sinLongitude * n +
      ref.cosLatitude * ref.sinLongitude * u,
    zMeters: ref.ecef.zMeters + ref.cosLatitude * n + ref.sinLatitude * u,
  };
  components(result, ['xMeters', 'yMeters', 'zMeters']);
  return result;
}

/** Finite ENU meters to local renderer meters; does not apply a world-origin offset. */
export function enuToWorld(enu: ENUCoordinate): WorldCoordinate {
  components(enu, ['eastMeters', 'northMeters', 'upMeters']);
  return { x: enu.eastMeters, y: enu.upMeters, z: -enu.northMeters };
}

/** Finite local renderer meters to ENU meters; does not subtract a world-origin offset. */
export function worldToEnu(world: WorldCoordinate): ENUCoordinate {
  components(world, ['x', 'y', 'z']);
  return { eastMeters: world.x, northMeters: -world.z, upMeters: world.y };
}

/** EPSG:4979 to renderer meters. Anchor maps to ref.worldOrigin, applied exactly once. */
export function geoToWorld(geo: GeodeticCoordinate, ref: GeoReference): WorldCoordinate {
  const local = enuToWorld(ecefToEnu(geodeticToEcef(geo), ref));
  const result = { x: local.x + ref.worldOrigin.x, y: local.y + ref.worldOrigin.y, z: local.z + ref.worldOrigin.z };
  components(result, ['x', 'y', 'z']);
  return result;
}

/** Renderer meters to derived EPSG:4979; does not establish source-data accuracy. */
export function worldToGeo(world: WorldCoordinate, ref: GeoReference): GeodeticCoordinate {
  validateReference(ref);
  components(world, ['x', 'y', 'z']);
  const local = { x: world.x - ref.worldOrigin.x, y: world.y - ref.worldOrigin.y, z: world.z - ref.worldOrigin.z };
  return ecefToGeodetic(enuToEcef(worldToEnu(local), ref));
}

/** Compass degrees clockwise from North to character yaw radians, forward +Z, range (-pi,pi]. */
export function headingToWorldYaw(headingDeg: number): number {
  finite(headingDeg, 'headingDeg');
  const heading = ((headingDeg % 360) + 360) % 360;
  return Math.PI - heading * radians;
}

/** Character yaw radians to compass heading degrees [0,360); not camera yaw or wind FROM. */
export function worldYawToHeading(worldYawRad: number): number {
  finite(worldYawRad, 'worldYawRad');
  return (((180 - (worldYawRad % (2 * Math.PI)) / radians) % 360) + 360) % 360;
}
