import { z } from 'zod';
import { TERRAIN_LIMITS } from '@/engine/terrain/const';
import type { TerrainDatasetMetadata, ValidatedTerrainDataset } from '@/engine/terrain/type';

const finiteNumber = z.number().finite();
const coverageSchema = z.strictObject({
  minXMeters: finiteNumber.min(-TERRAIN_LIMITS.maxCoverageMeters).max(TERRAIN_LIMITS.maxCoverageMeters),
  maxXMeters: finiteNumber.min(-TERRAIN_LIMITS.maxCoverageMeters).max(TERRAIN_LIMITS.maxCoverageMeters),
  minZMeters: finiteNumber.min(-TERRAIN_LIMITS.maxCoverageMeters).max(TERRAIN_LIMITS.maxCoverageMeters),
  maxZMeters: finiteNumber.min(-TERRAIN_LIMITS.maxCoverageMeters).max(TERRAIN_LIMITS.maxCoverageMeters),
});

export const terrainDatasetMetadataSchema = z.strictObject({
  datasetId: z.string().min(1).max(200),
  sourceId: z.string().min(1).max(200),
  version: z.string().min(1).max(100),
  checksumSha256: z
    .string()
    .regex(/^[a-f0-9]{64}$/)
    .nullable(),
  crs: z.enum(['synthetic-local-meters', 'EPSG:4326', 'EPSG:4979']),
  verticalDatum: z.enum(['WGS84_ELLIPSOID', 'ORTHOMETRIC_EGM2008', 'SYNTHETIC_LOCAL', 'UNKNOWN']),
  unit: z.literal('meters'),
  coverage: coverageSchema,
  widthCells: z.number().int().min(2).max(TERRAIN_LIMITS.maxDimension).nullable(),
  heightCells: z.number().int().min(2).max(TERRAIN_LIMITS.maxDimension).nullable(),
  resolutionMeters: z.number().positive().max(TERRAIN_LIMITS.maxCellSizeMeters).nullable(),
  noData: finiteNumber.nullable(),
  captureDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .nullable(),
  sourceAccuracyMeters: z.number().positive().max(10_000).nullable(),
  license: z.string().min(1).max(TERRAIN_LIMITS.maxTextLength),
  attribution: z.string().min(1).max(TERRAIN_LIMITS.maxTextLength),
  processingHistory: z.array(z.string().min(1).max(TERRAIN_LIMITS.maxTextLength)).max(30),
  purpose: z.enum(['production', 'test-only']),
  isGeographic: z.boolean(),
});

export class TerrainValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TerrainValidationError';
  }
}

function fail(message: string): never {
  throw new TerrainValidationError(message);
}

/**
 * Strictly validate dataset metadata. Rejects: invalid bounds, unsupported
 * CRS, unknown vertical datum, missing provenance, invalid checksum,
 * unsupported units, inconsistent raster dimensions, and excessive extents.
 * A dataset is production-ready only when it is geographic, ellipsoidal,
 * checksummed, and has provenance + accuracy recorded.
 */
export function validateTerrainDatasetMetadata(raw: unknown): ValidatedTerrainDataset {
  const parsed = terrainDatasetMetadataSchema.safeParse(raw);
  if (!parsed.success) {
    fail(`Invalid terrain dataset metadata: ${parsed.error.issues[0]?.message ?? 'unknown error'}`);
  }
  const metadata: TerrainDatasetMetadata = parsed.data;
  const { minXMeters, maxXMeters, minZMeters, maxZMeters } = metadata.coverage;
  if (minXMeters >= maxXMeters || minZMeters >= maxZMeters) fail('Terrain coverage bounds are inverted');
  if (maxXMeters - minXMeters > TERRAIN_LIMITS.maxSpanMeters) fail('Terrain coverage span exceeds the limit');
  if (maxZMeters - minZMeters > TERRAIN_LIMITS.maxSpanMeters) fail('Terrain coverage span exceeds the limit');
  if ((metadata.widthCells === null) !== (metadata.heightCells === null)) {
    fail('Terrain raster dimensions must both be set or both be null');
  }
  if (metadata.widthCells !== null && metadata.heightCells !== null) {
    if (metadata.widthCells * metadata.heightCells > TERRAIN_LIMITS.maxSamples) {
      fail('Terrain raster sample count exceeds the limit');
    }
    if (metadata.resolutionMeters === null) fail('Raster terrain metadata must record resolution');
  }
  if (metadata.crs === 'synthetic-local-meters' && metadata.isGeographic) {
    fail('Synthetic-local terrain cannot be geographic');
  }
  if (metadata.crs !== 'synthetic-local-meters' && !metadata.isGeographic) {
    fail('Geographic CRS terrain must be marked geographic');
  }
  if (metadata.verticalDatum === 'UNKNOWN') fail('Terrain vertical datum is unknown');
  if (metadata.crs === 'synthetic-local-meters' && metadata.verticalDatum !== 'SYNTHETIC_LOCAL') {
    fail('Synthetic-local terrain must use the SYNTHETIC_LOCAL vertical datum');
  }
  if (metadata.crs !== 'synthetic-local-meters' && metadata.verticalDatum === 'SYNTHETIC_LOCAL') {
    fail('Geographic terrain cannot use the SYNTHETIC_LOCAL vertical datum');
  }
  // Orthometric heights must never be passed off as ellipsoidal heights:
  // Phase 12 uses ellipsoidal heights. An ORTHOMETRIC_EGM2008 dataset is
  // accepted for ingestion (Phase 16) only as what it is — its datum stays
  // ORTHOMETRIC_EGM2008 in the metadata, world Y equals the orthometric
  // height, and `isProductionReady` below stays false, because no verified
  // geoid transformation to WGS84_ELLIPSOID exists in this codebase.
  // Production geographic terrain still requires WGS84_ELLIPSOID.
  if (metadata.purpose === 'production' && metadata.isGeographic) {
    if (metadata.checksumSha256 === null) fail('Production terrain datasets require a SHA-256 checksum');
    if (metadata.captureDate === null) fail('Production terrain datasets require a capture date');
    if (metadata.sourceAccuracyMeters === null) fail('Production terrain datasets require a source accuracy');
    if (metadata.processingHistory.length === 0) fail('Production terrain datasets require processing history');
    if (metadata.verticalDatum !== 'WGS84_ELLIPSOID' && metadata.verticalDatum !== 'ORTHOMETRIC_EGM2008') {
      fail('Production geographic terrain must use the WGS84_ELLIPSOID vertical datum');
    }
  }
  // The synthetic provider is the production default, but it is not
  // geographic production terrain: it still needs its formula provenance.
  if (metadata.purpose === 'production' && metadata.processingHistory.length === 0) {
    fail('Production terrain datasets require processing history');
  }
  const isProductionReady =
    metadata.purpose === 'production' &&
    metadata.isGeographic &&
    metadata.verticalDatum === 'WGS84_ELLIPSOID' &&
    metadata.checksumSha256 !== null;
  return { metadata, isProductionReady };
}
