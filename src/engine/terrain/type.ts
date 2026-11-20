/**
 * Unified terrain provider contract (Phase 15).
 *
 * Pure TypeScript: no React, no Next.js, no Three.js. Lives in `src/engine/terrain/`
 * (not world-core) so the engine can consume the contract without importing
 * world-core — the documented dependency direction is world-core → engine
 * (`docs/architecture/CONFIG_OWNERSHIP.md`). Metadata validation, the grid DEM
 * provider and selection live in `src/world-core/terrain/` and import this file.
 *
 * A provider answers "what is the ground height here?" for exactly one dataset.
 * Terrain mesh, character grounding, collision and camera must all read elevation
 * through this contract — never through a duplicated synthetic formula.
 *
 * Coordinate conventions (Phase 12): world +X = East, +Y = Up, -Z = North,
 * 1 world unit = 1 meter. World Y is an ellipsoidal height relative to the
 * Da Nang anchor (0 m reference assumption), never an orthometric height
 * unless a verified geoid transformation was applied during preprocessing.
 */

/** Horizontal coordinate reference of a terrain dataset. */
export type TerrainCoordinateSpace = 'synthetic-local-meters' | 'EPSG:4326' | 'EPSG:4979';

/** Vertical reference of the elevation values. */
export type TerrainVerticalDatum = 'WGS84_ELLIPSOID' | 'ORTHOMETRIC_EGM2008' | 'SYNTHETIC_LOCAL' | 'UNKNOWN';

/** Intended use of a dataset. TEST-ONLY data must never enter production. */
export type TerrainDatasetPurpose = 'production' | 'test-only';

/** Rectangular coverage in world meters. */
export interface TerrainCoverage {
  readonly minXMeters: number;
  readonly maxXMeters: number;
  readonly minZMeters: number;
  readonly maxZMeters: number;
}

/** Strict elevation dataset metadata (Phase 15 §6). */
export interface TerrainDatasetMetadata {
  /** Unique dataset identity, e.g. `copernicus-dsm-danang-2024-v1`. */
  readonly datasetId: string;
  /** Source registry reference, e.g. a `data-sources.ts` entry id. */
  readonly sourceId: string;
  /** Immutable dataset version. */
  readonly version: string;
  /** SHA-256 of the source payload, or null only for analytic (synthetic) data. */
  readonly checksumSha256: string | null;
  readonly crs: TerrainCoordinateSpace;
  /** Mandatory. UNKNOWN is rejected for production terrain use. */
  readonly verticalDatum: TerrainVerticalDatum;
  readonly unit: 'meters';
  readonly coverage: TerrainCoverage;
  /** Raster dimensions in cells, or null for analytic (non-raster) providers. */
  readonly widthCells: number | null;
  readonly heightCells: number | null;
  /** Horizontal resolution in meters, or null for analytic providers. */
  readonly resolutionMeters: number | null;
  /** Missing-value representation, or null when the provider has no NoData. */
  readonly noData: number | null;
  readonly captureDate: string | null;
  /** Reported source accuracy in meters, or null when unknown. */
  readonly sourceAccuracyMeters: number | null;
  readonly license: string;
  readonly attribution: string;
  /** Transform / preprocessing provenance, newest last. */
  readonly processingHistory: readonly string[];
  readonly purpose: TerrainDatasetPurpose;
  /** False for synthetic-local data: its coordinates are not geographic. */
  readonly isGeographic: boolean;
}

/** Result of one elevation query. Never a silent zero fallback. */
export type ElevationSample =
  | {
      readonly status: 'ok';
      /** Elevation in meters (world Y). */
      readonly elevationMeters: number;
      /** Raw terrain elevation before platform support is applied, if known. */
      readonly terrainElevationMeters: number | null;
    }
  | {
      readonly status: 'outside-coverage' | 'no-data' | 'invalid-input' | 'unsupported-crs';
      readonly elevationMeters: null;
      readonly terrainElevationMeters: null;
      readonly reason: string;
    };

/** A terrain dataset that has passed strict validation. */
export interface ValidatedTerrainDataset {
  readonly metadata: TerrainDatasetMetadata;
  /** True only for geographic data whose datum is WGS84 ellipsoidal. */
  readonly isProductionReady: boolean;
}

/**
 * One consistent elevation owner for the whole world.
 *
 * Implementations must be deterministic: the same (x, z) always returns the
 * same sample, and sampling must not allocate per call beyond the returned
 * sample object. `dispose()` is idempotent; sampling after disposal throws.
 */
export interface TerrainProvider {
  readonly metadata: TerrainDatasetMetadata;
  readonly coverage: TerrainCoverage;
  /** Playable boundary radius in meters; the character is clamped to it. */
  readonly boundaryRadiusMeters: number;
  /** Spawn position in world meters; its elevation is `sampleElevation` there. */
  readonly spawnPosition: readonly [number, number, number];
  readonly isDisposed: boolean;

  /**
   * Raw terrain elevation at (x, z). Returns `outside-coverage` outside
   * `coverage`, `no-data` on a NoData cell, `invalid-input` for non-finite
   * coordinates — never a fabricated zero.
   */
  sampleElevation(x: number, z: number): ElevationSample;

  /**
   * Highest walkable surface at (x, z): raw terrain, raised by any platform
   * whose top the character can step onto from `currentY`. The returned
   * `terrainElevationMeters` is the raw terrain value from the same query,
   * so callers evaluate elevation once per tick instead of twice.
   */
  sampleSupportSurface(x: number, z: number, currentY: number, playerRadius: number): ElevationSample;

  /**
   * Push (x, z) out of horizontal colliders (platform sides, rocks, trees).
   * Terrain height is not an input here; vertical support is separate.
   * Reuses `output` when given; otherwise the provider may return a
   * reused internal object — callers must consume it immediately and
   * must not retain it across calls.
   */
  resolveHorizontalCollisions(
    x: number,
    z: number,
    currentY: number,
    playerRadius: number,
    output?: { x: number; z: number }
  ): { x: number; z: number };

  dispose(): void;
}

/** Throw unless the sample is `ok`; used where elevation must exist (scene build). */
export function requireElevation(sample: ElevationSample, x: number, z: number): number {
  if (sample.status !== 'ok' || sample.elevationMeters === null) {
    throw new Error(`No terrain elevation at (${x}, ${z}): ${sample.status}`);
  }
  return sample.elevationMeters;
}

/** Read-only diagnostic snapshot of the active provider (F3 diagnostics). */
export interface TerrainDiagnostics {
  readonly datasetId: string;
  readonly sourceId: string;
  readonly version: string;
  readonly crs: TerrainCoordinateSpace;
  readonly verticalDatum: TerrainVerticalDatum;
  readonly purpose: TerrainDatasetPurpose;
  readonly isGeographic: boolean;
  readonly coverage: TerrainCoverage;
  readonly resolutionMeters: number | null;
  readonly boundaryRadiusMeters: number;
  readonly spawnElevationMeters: number | null;
  readonly isDisposed: boolean;
}

export function describeTerrainProvider(provider: TerrainProvider): TerrainDiagnostics {
  const spawn = provider.sampleElevation(provider.spawnPosition[0], provider.spawnPosition[2]);
  return {
    datasetId: provider.metadata.datasetId,
    sourceId: provider.metadata.sourceId,
    version: provider.metadata.version,
    crs: provider.metadata.crs,
    verticalDatum: provider.metadata.verticalDatum,
    purpose: provider.metadata.purpose,
    isGeographic: provider.metadata.isGeographic,
    coverage: provider.coverage,
    resolutionMeters: provider.metadata.resolutionMeters,
    boundaryRadiusMeters: provider.boundaryRadiusMeters,
    spawnElevationMeters: spawn.status === 'ok' ? spawn.elevationMeters : null,
    isDisposed: provider.isDisposed,
  };
}
