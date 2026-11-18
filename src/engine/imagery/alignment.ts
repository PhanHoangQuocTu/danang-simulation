import { z } from 'zod';
import {
  geoToWorld,
  worldToGeo,
  validateGeodeticCoordinate,
  createGeoReference as createRasterReference,
} from '../geospatial/core';
import type { GeoHorizontalCoordinate, GeoReference, WorldCoordinate } from '../geospatial/type';
import { IMAGERY_LIMITS as limits } from './const';

export class ImageryValidationError extends Error {
  constructor(
    readonly code: 'metadata' | 'affine' | 'crs' | 'footprint' | 'scale' | 'control-points',
    message: string
  ) {
    super(message);
    this.name = 'ImageryValidationError';
  }
}
export interface PixelCoordinate {
  readonly column: number;
  readonly row: number;
}
export interface NativeCoordinate {
  readonly x: number;
  readonly y: number;
}
type PixelReference = 'pixel-corner' | 'pixel-center';
const finite = (value: number) => {
  if (!Number.isFinite(value)) throw new ImageryValidationError('metadata', 'Finite coordinate required');
  return value;
};

/** Normalize before inversion to avoid overflow and reject ill-conditioned matrices independent of scale. */
function affine(transform: readonly number[]) {
  if (transform.length !== 6 || !transform.every(Number.isFinite))
    throw new ImageryValidationError('affine', 'Invalid affine coefficients');
  const [x, a, b, y, c, d] = transform;
  const scale = Math.max(Math.abs(a), Math.abs(b), Math.abs(c), Math.abs(d));
  const aa = a / scale;
  const bb = b / scale;
  const cc = c / scale;
  const dd = d / scale;
  const det = aa * dd - bb * cc;
  const condition =
    (Math.max(Math.abs(aa) + Math.abs(bb), Math.abs(cc) + Math.abs(dd)) *
      Math.max(Math.abs(dd) + Math.abs(bb), Math.abs(cc) + Math.abs(aa))) /
    Math.abs(det);
  if (!Number.isFinite(condition) || condition > limits.maxCondition)
    throw new ImageryValidationError('affine', 'Singular or ill-conditioned affine');
  return { x, y, a, b, c, d, scale, aa, bb, cc, dd, det };
}

/** Public pixel coordinates always refer to edges: upper-left center is (0.5,0.5). */
export function pixelToNativeCoordinate(
  pixel: PixelCoordinate,
  transform: readonly number[],
  reference: PixelReference = 'pixel-corner'
): NativeCoordinate {
  const m = affine(transform);
  const offset = reference === 'pixel-center' ? 0.5 : 0;
  const column = finite(pixel.column) - offset;
  const row = finite(pixel.row) - offset;
  return { x: finite(m.x + column * m.a + row * m.b), y: finite(m.y + column * m.c + row * m.d) };
}
export function nativeCoordinateToPixel(
  native: NativeCoordinate,
  transform: readonly number[],
  reference: PixelReference = 'pixel-corner'
): PixelCoordinate {
  const m = affine(transform);
  const x = (finite(native.x) - m.x) / m.scale;
  const y = (finite(native.y) - m.y) / m.scale;
  const offset = reference === 'pixel-center' ? 0.5 : 0;
  return {
    column: finite((m.dd * x - m.bb * y) / m.det + offset),
    row: finite((-m.cc * x + m.aa * y) / m.det + offset),
  };
}
export function nativeCoordinateToGeodetic(native: NativeCoordinate, crs: string, ellipsoidalHeightMeters: number) {
  if (crs !== 'EPSG:4326')
    throw new ImageryValidationError('crs', 'Unsupported CRS; preprocess explicitly to EPSG:4326');
  const geo = {
    longitudeDeg: native.x,
    latitudeDeg: native.y,
    ellipsoidalHeightMeters: finite(ellipsoidalHeightMeters),
  };
  validateGeodeticCoordinate(geo);
  return geo;
}
export function geodeticToNativeCoordinate(geo: GeoHorizontalCoordinate, crs: string): NativeCoordinate {
  nativeCoordinateToGeodetic({ x: geo.longitudeDeg, y: geo.latitudeDeg }, crs, 0);
  return { x: geo.longitudeDeg, y: geo.latitudeDeg };
}

const id = z
  .string()
  .regex(/^[a-z][a-z0-9-]*$/)
  .max(120);
const coefficient = z.number();
const lonlat = z.tuple([z.number().min(-180).max(180), z.number().min(-85).max(85)]);
const rasterSchema = z.strictObject({
  assetId: id,
  sourceId: id,
  datasetId: id,
  version: z.string().min(1).max(120),
  width: z.number().int().positive().max(limits.maxDimension),
  height: z.number().int().positive().max(limits.maxDimension),
  nativeCrs: z.literal('EPSG:4326'),
  pixelReference: z.enum(['pixel-corner', 'pixel-center']),
  transform: z.tuple([coefficient, coefficient, coefficient, coefficient, coefficient, coefficient]),
  footprintWgs84: z.tuple([lonlat, lonlat, lonlat, lonlat, lonlat]),
  captureDate: z.iso.date().nullable(),
  groundSampleDistanceMeters: z.number().positive().max(1000),
  noData: z.number().nullable(),
  cloudFraction: z.number().min(0).max(1).nullable(),
  noDataFraction: z.number().min(0).max(1).nullable(),
  orthorectified: z.literal(true),
});
export type RasterRegistration = z.infer<typeof rasterSchema>;

export function rasterPixelFootprint(raster: RasterRegistration): [number, number][] {
  return [
    [0, 0],
    [raster.width, 0],
    [raster.width, raster.height],
    [0, raster.height],
    [0, 0],
  ].map(([column, row]) => {
    const native = pixelToNativeCoordinate({ column, row }, raster.transform, raster.pixelReference);
    const geo = nativeCoordinateToGeodetic(native, raster.nativeCrs, 0);
    return [geo.longitudeDeg, geo.latitudeDeg];
  });
}
/** Strict preprocessed 2D metadata. Passing this validator is not a license or a survey certificate. */
export function validateRasterRegistration(raw: unknown): RasterRegistration {
  const parsed = rasterSchema.safeParse(raw);
  if (!parsed.success)
    throw new ImageryValidationError(
      'metadata',
      `Invalid raster metadata: ${parsed.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`).join('; ')}`
    );
  const raster = parsed.data;
  if (raster.width * raster.height > limits.maxPixels)
    throw new ImageryValidationError('metadata', 'Raster pixel budget exceeded');
  const m = affine(raster.transform);
  // Phase 14 supports rotated/sheared east-right, north-up grids only; other orientations need explicit preprocessing.
  if (m.a <= 0 || m.d >= 0 || m.det >= 0)
    throw new ImageryValidationError('affine', 'Mirrored or upside-down affine is unsupported');
  const footprint = rasterPixelFootprint(raster);
  const xs = footprint.map((p) => p[0]);
  const ys = footprint.map((p) => p[1]);
  if (
    Math.max(...xs) - Math.min(...xs) > limits.maxSpanDegrees ||
    Math.max(...ys) - Math.min(...ys) > limits.maxSpanDegrees ||
    ys.some((y) => Math.abs(y) > limits.maxLatitude)
  )
    throw new ImageryValidationError('footprint', 'Unsupported wrapping, polar or excessive raster extent');
  if (
    footprint.some((p, i) =>
      p.some((value, j) => Math.abs(value - raster.footprintWgs84[i][j]) > limits.footprintToleranceDegrees)
    )
  )
    throw new ImageryValidationError('footprint', 'Footprint must match ordered, closed affine edge corners');
  const anchor = nativeCoordinateToGeodetic(
    pixelToNativeCoordinate({ column: 0, row: 0 }, raster.transform, raster.pixelReference),
    raster.nativeCrs,
    0
  );
  // GSD is a declared nominal scalar; verify both local pixel axes against the WGS84 tangent frame.
  const reference = createRasterReference(anchor);
  const origin = pixelToWorld({ column: 0, row: 0 }, raster, reference, 0);
  for (const pixel of [
    { column: 1, row: 0 },
    { column: 0, row: 1 },
  ]) {
    const world = pixelToWorld(pixel, raster, reference, 0);
    const gsd = Math.hypot(world.x - origin.x, world.z - origin.z);
    if (gsd < raster.groundSampleDistanceMeters * 0.5 || gsd > raster.groundSampleDistanceMeters * 2)
      throw new ImageryValidationError('scale', 'Declared GSD disagrees with affine pixel scale');
  }
  return raster;
}

// This factory is the Phase 12 owner; no second Earth model or magic degree-to-meter scale.
export function pixelToWorld(
  pixel: PixelCoordinate,
  raster: RasterRegistration,
  reference: GeoReference,
  ellipsoidalHeightMeters: number
): WorldCoordinate {
  return geoToWorld(
    nativeCoordinateToGeodetic(
      pixelToNativeCoordinate(pixel, raster.transform, raster.pixelReference),
      raster.nativeCrs,
      ellipsoidalHeightMeters
    ),
    reference
  );
}
/** Inverse of a 3D world point with its actual ellipsoid height, not an intersection with terrain. */
export function worldToPixel(
  world: WorldCoordinate,
  raster: RasterRegistration,
  reference: GeoReference
): PixelCoordinate {
  return nativeCoordinateToPixel(
    geodeticToNativeCoordinate(worldToGeo(world, reference), raster.nativeCrs),
    raster.transform,
    raster.pixelReference
  );
}
export function isNoData(sample: number, raster: Pick<RasterRegistration, 'noData'>): boolean {
  return !Number.isFinite(sample) || (raster.noData !== null && sample === raster.noData);
}

const controlSchema = z.strictObject({
  id,
  assetId: id,
  sourceId: id,
  version: z.string().min(1).max(120),
  pixel: z.strictObject({ column: z.number(), row: z.number() }),
  ground: z.strictObject({ longitudeDeg: z.number().min(-180).max(180), latitudeDeg: z.number().min(-85).max(85) }),
  role: z.enum(['calibration', 'independent-validation']),
  provenance: z.string().min(1).max(2000),
  collectedAt: z.iso.date(),
  uncertaintyMeters: z.number().nonnegative().max(10000),
  authoritative: z.boolean(),
});
export type GroundControlPoint = z.infer<typeof controlSchema>;
function statistics(residuals: number[]) {
  const sorted = [...residuals].sort((a, b) => a - b);
  const n = sorted.length;
  return {
    n,
    meanMeters: n ? sorted.reduce((a, b) => a + b, 0) / n : null,
    medianMeters: n ? (sorted[Math.floor((n - 1) / 2)] + sorted[Math.floor(n / 2)]) / 2 : null,
    rmseMeters: n ? Math.sqrt(sorted.reduce((sum, r) => sum + r * r, 0) / n) : null,
    maxMeters: n ? sorted[n - 1] : null,
    p95Meters: n ? sorted[Math.ceil(0.95 * n) - 1] : null,
  };
}
export function evaluateControlPoints(
  raster: RasterRegistration,
  raw: unknown,
  reference: GeoReference,
  thresholds: { rmseMeters: number; maxMeters: number }
) {
  if (!Array.isArray(raw) || raw.length > limits.maxControlPoints)
    throw new ImageryValidationError('control-points', 'Control point budget exceeded');
  const parsed = z.array(controlSchema).safeParse(raw);
  if (!parsed.success) throw new ImageryValidationError('control-points', 'Invalid control point metadata');
  if (
    !(thresholds.rmseMeters > 0) ||
    !(thresholds.maxMeters > 0) ||
    !Number.isFinite(thresholds.rmseMeters + thresholds.maxMeters)
  )
    throw new ImageryValidationError('control-points', 'Positive finite dataset thresholds required');
  const points = parsed.data;
  const ids = new Set<string>();
  const pixels = new Set<string>();
  const grounds = new Set<string>();
  for (const p of points) {
    const pixel = `${p.pixel.column},${p.pixel.row}`;
    const ground = `${p.ground.longitudeDeg},${p.ground.latitudeDeg}`;
    if (
      ids.has(p.id) ||
      pixels.has(pixel) ||
      grounds.has(ground) ||
      p.assetId !== raster.assetId ||
      p.sourceId !== raster.sourceId ||
      p.version !== raster.version ||
      p.pixel.column < 0 ||
      p.pixel.column > raster.width ||
      p.pixel.row < 0 ||
      p.pixel.row > raster.height
    )
      throw new ImageryValidationError('control-points', 'Duplicate, mismatched or out-of-bounds control point');
    ids.add(p.id);
    pixels.add(pixel);
    grounds.add(ground);
  }
  for (const role of ['calibration', 'independent-validation'] as const) {
    const group = points.filter((p) => p.role === role);
    if (!group.length) continue;
    let area = 0;
    for (let i = 0; i < group.length; i++)
      for (let j = i + 1; j < group.length; j++)
        for (let k = j + 1; k < group.length; k++) {
          const [a, b, c] = [group[i].pixel, group[j].pixel, group[k].pixel];
          area = Math.max(
            area,
            Math.abs((b.column - a.column) * (c.row - a.row) - (b.row - a.row) * (c.column - a.column)) / 2
          );
        }
    if (area / (raster.width * raster.height) < limits.minControlAreaFraction)
      throw new ImageryValidationError(
        'control-points',
        'Need at least three well-distributed non-collinear points per role'
      );
  }
  const residuals = points.map((p) => {
    const predictedGeo = nativeCoordinateToGeodetic(
      pixelToNativeCoordinate(p.pixel, raster.transform, raster.pixelReference),
      raster.nativeCrs,
      reference.anchor.ellipsoidalHeightMeters
    );
    // Horizontal error must not depend on a distant renderer anchor. Restrict the tangent approximation domain.
    if (
      Math.abs(predictedGeo.longitudeDeg - p.ground.longitudeDeg) > limits.maxSpanDegrees ||
      Math.abs(predictedGeo.latitudeDeg - p.ground.latitudeDeg) > limits.maxSpanDegrees
    )
      throw new ImageryValidationError('control-points', 'Ground control outside supported local residual domain');
    const localReference = createRasterReference(predictedGeo);
    const predicted = geoToWorld(predictedGeo, localReference);
    const actual = geoToWorld(
      { ...p.ground, ellipsoidalHeightMeters: reference.anchor.ellipsoidalHeightMeters },
      localReference
    );
    const pixel = nativeCoordinateToPixel(
      geodeticToNativeCoordinate(p.ground, raster.nativeCrs),
      raster.transform,
      raster.pixelReference
    );
    return {
      id: p.id,
      role: p.role,
      horizontalMeters: Math.hypot(predicted.x - actual.x, predicted.z - actual.z),
      pixelResidual: Math.hypot(pixel.column - p.pixel.column, pixel.row - p.pixel.row),
      uncertaintyMeters: p.uncertaintyMeters,
    };
  });
  const calibration = statistics(residuals.filter((p) => p.role === 'calibration').map((p) => p.horizontalMeters));
  const independent = statistics(
    residuals.filter((p) => p.role === 'independent-validation').map((p) => p.horizontalMeters)
  );
  const failed =
    residuals.some((p) => p.horizontalMeters > thresholds.maxMeters) ||
    [calibration, independent].some((s) => s.rmseMeters !== null && s.rmseMeters > thresholds.rmseMeters);
  const trusted = points
    .filter((p) => p.role === 'independent-validation')
    .every((p) => p.authoritative && p.uncertaintyMeters <= thresholds.maxMeters);
  let status: 'rejected' | 'checkpoint-validated' | 'unverified' = 'unverified';
  if (failed) status = 'rejected';
  else if (independent.n >= 3 && trusted) status = 'checkpoint-validated';
  return {
    status,
    calibration,
    independent,
    residuals,
    thresholds: { ...thresholds },
    heightPolicy: 'common-reference-ellipsoid-height / horizontal-only',
  } as const;
}
