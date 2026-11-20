import { z } from 'zod';
import { TERRAIN_LIMITS } from '@/engine/terrain/const';
import type { ElevationSample, TerrainCoverage, TerrainProvider } from '@/engine/terrain/type';
import { TerrainValidationError, validateTerrainDatasetMetadata } from './validation';

export interface GridDemInput {
  metadata: unknown;
  /** Grid width in cells (columns, +X / east). */
  width: number;
  /** Grid height in cells (rows, +Z / south). */
  height: number;
  /** Cell size in meters; must equal metadata.resolutionMeters. */
  cellSizeMeters: number;
  /** World X of the west edge (column 0 centre is originX + cellSize / 2). */
  originXMeters: number;
  /** World Z of the north edge (row 0 centre is originZ + cellSize / 2). */
  originZMeters: number;
  /**
   * Elevations in row-major order, row 0 = north edge (min Z), row index
   * increasing toward +Z (south); column index increasing toward +X (east).
   * Every value must be finite, or exactly equal to `noData`.
   */
  elevations: readonly number[];
  /** Missing-value marker; must be a finite number. */
  noData: number;
  /**
   * Interpolation policy. `bilinear` refuses to interpolate across any
   * NoData neighbour; `nearest` returns the nearest valid cell.
   */
  interpolation?: 'bilinear' | 'nearest';
}

const gridInputSchema = z.strictObject({
  metadata: z.unknown(),
  width: z.number().int().min(2).max(TERRAIN_LIMITS.maxDimension),
  height: z.number().int().min(2).max(TERRAIN_LIMITS.maxDimension),
  cellSizeMeters: z.number().positive().max(TERRAIN_LIMITS.maxCellSizeMeters),
  originXMeters: z.number().finite(),
  originZMeters: z.number().finite(),
  elevations: z.array(z.number()),
  noData: z.number().finite(),
  interpolation: z.enum(['bilinear', 'nearest']).optional(),
});

/**
 * Reusable grid-based DEM provider (Phase 15 §7).
 *
 * The grid is already transformed to world meters by preprocessing: columns
 * run east (+X), rows run south (+Z from the north edge), elevations are
 * WGS84 ellipsoidal meters (world Y). This provider performs no CRS
 * conversion at sample time, so sampling stays allocation-free and fast.
 * It accepts only validated geographic metadata — orthometric data and
 * unknown datums are rejected by `validateTerrainDatasetMetadata`.
 */
export class GridDemProvider implements TerrainProvider {
  readonly metadata;
  readonly coverage: TerrainCoverage;
  readonly boundaryRadiusMeters: number;
  readonly spawnPosition: readonly [number, number, number];
  isDisposed = false;

  private readonly width: number;
  private readonly height: number;
  private readonly cellSizeMeters: number;
  private readonly originXMeters: number;
  private readonly originZMeters: number;
  private readonly samples: Float32Array;
  private readonly noData: number;
  private readonly interpolation: 'bilinear' | 'nearest';
  private readonly collisionResult = { x: 0, z: 0 };

  constructor(input: GridDemInput) {
    const parsed = gridInputSchema.safeParse(input);
    if (!parsed.success) {
      throw new TerrainValidationError(`Invalid DEM grid input: ${parsed.error.issues[0]?.message ?? 'unknown error'}`);
    }
    const validated = validateTerrainDatasetMetadata(parsed.data.metadata);
    const { metadata } = validated;
    if (metadata.crs === 'synthetic-local-meters') {
      throw new TerrainValidationError('DEM grid metadata must use a geographic CRS');
    }
    if (metadata.widthCells !== parsed.data.width || metadata.heightCells !== parsed.data.height) {
      throw new TerrainValidationError('DEM grid dimensions do not match metadata');
    }
    if (metadata.resolutionMeters === null || metadata.resolutionMeters !== parsed.data.cellSizeMeters) {
      throw new TerrainValidationError('DEM grid cell size does not match metadata resolution');
    }
    if (metadata.noData === null || metadata.noData !== parsed.data.noData) {
      throw new TerrainValidationError('DEM grid NoData marker does not match metadata');
    }
    if (parsed.data.width * parsed.data.height > TERRAIN_LIMITS.maxSamples) {
      throw new TerrainValidationError('DEM grid sample count exceeds the limit');
    }
    if (parsed.data.elevations.length !== parsed.data.width * parsed.data.height) {
      throw new TerrainValidationError('DEM grid elevation count does not match dimensions');
    }
    if (parsed.data.elevations.some((value) => !Number.isFinite(value))) {
      throw new TerrainValidationError('DEM grid elevations must be finite or the NoData marker');
    }
    const coverage: TerrainCoverage = {
      minXMeters: parsed.data.originXMeters,
      maxXMeters: parsed.data.originXMeters + parsed.data.width * parsed.data.cellSizeMeters,
      minZMeters: parsed.data.originZMeters,
      maxZMeters: parsed.data.originZMeters + parsed.data.height * parsed.data.cellSizeMeters,
    };
    if (
      coverage.minXMeters !== metadata.coverage.minXMeters ||
      coverage.maxXMeters !== metadata.coverage.maxXMeters ||
      coverage.minZMeters !== metadata.coverage.minZMeters ||
      coverage.maxZMeters !== metadata.coverage.maxZMeters
    ) {
      throw new TerrainValidationError('DEM grid coverage does not match metadata coverage');
    }
    this.metadata = metadata;
    this.coverage = coverage;
    // A DEM grid has no playable boundary of its own; callers set it.
    // Default to the largest inscribed circle so character clamping stays
    // inside the grid.
    this.boundaryRadiusMeters = Math.min(
      (coverage.maxXMeters - coverage.minXMeters) / 2,
      (coverage.maxZMeters - coverage.minZMeters) / 2
    );
    this.spawnPosition = [
      (coverage.minXMeters + coverage.maxXMeters) / 2,
      0,
      (coverage.minZMeters + coverage.maxZMeters) / 2,
    ];
    this.width = parsed.data.width;
    this.height = parsed.data.height;
    this.cellSizeMeters = parsed.data.cellSizeMeters;
    this.originXMeters = parsed.data.originXMeters;
    this.originZMeters = parsed.data.originZMeters;
    this.samples = new Float32Array(parsed.data.elevations);
    this.noData = parsed.data.noData;
    this.interpolation = parsed.data.interpolation ?? 'bilinear';
  }

  private assertAlive(): void {
    if (this.isDisposed) throw new Error('Terrain provider disposed');
  }

  private invalid(reason: string): ElevationSample {
    return { status: 'invalid-input', elevationMeters: null, terrainElevationMeters: null, reason };
  }

  private outside(reason: string): ElevationSample {
    return { status: 'outside-coverage', elevationMeters: null, terrainElevationMeters: null, reason };
  }

  private noDataSample(): ElevationSample {
    return {
      status: 'no-data',
      elevationMeters: null,
      terrainElevationMeters: null,
      reason: 'NoData cell',
    };
  }

  private cell(col: number, row: number): number {
    return this.samples[row * this.width + col]!;
  }

  sampleElevation(x: number, z: number): ElevationSample {
    this.assertAlive();
    if (!Number.isFinite(x) || !Number.isFinite(z)) return this.invalid('Non-finite coordinate');
    const { minXMeters, maxXMeters, minZMeters, maxZMeters } = this.coverage;
    if (x < minXMeters || x > maxXMeters || z < minZMeters || z > maxZMeters) {
      return this.outside('Coordinate outside grid coverage');
    }
    const colF = (x - this.originXMeters) / this.cellSizeMeters - 0.5;
    const rowF = (z - this.originZMeters) / this.cellSizeMeters - 0.5;
    if (this.interpolation === 'nearest') {
      const col = Math.min(Math.max(Math.round(colF), 0), this.width - 1);
      const row = Math.min(Math.max(Math.round(rowF), 0), this.height - 1);
      const value = this.cell(col, row);
      if (value === this.noData) return this.noDataSample();
      return { status: 'ok', elevationMeters: value, terrainElevationMeters: value };
    }
    // Bilinear over cell centres; clamp the base cell so the last centre
    // still interpolates to the edge instead of reading out of bounds.
    const col0 = Math.min(Math.max(Math.floor(colF), 0), this.width - 2);
    const row0 = Math.min(Math.max(Math.floor(rowF), 0), this.height - 2);
    const fx = Math.min(Math.max(colF - col0, 0), 1);
    const fz = Math.min(Math.max(rowF - row0, 0), 1);
    const v00 = this.cell(col0, row0);
    const v10 = this.cell(col0 + 1, row0);
    const v01 = this.cell(col0, row0 + 1);
    const v11 = this.cell(col0 + 1, row0 + 1);
    if (v00 === this.noData || v10 === this.noData || v01 === this.noData || v11 === this.noData) {
      return this.noDataSample();
    }
    const value = v00 * (1 - fx) * (1 - fz) + v10 * fx * (1 - fz) + v01 * (1 - fx) * fz + v11 * fx * fz;
    if (!Number.isFinite(value)) return this.invalid('Non-finite interpolated elevation');
    return { status: 'ok', elevationMeters: value, terrainElevationMeters: value };
  }

  sampleSupportSurface(x: number, z: number, _currentY: number, _playerRadius: number): ElevationSample {
    // A DEM grid has no platforms: the support surface is the terrain itself.
    return this.sampleElevation(x, z);
  }

  resolveHorizontalCollisions(
    x: number,
    z: number,
    _currentY: number,
    _playerRadius: number,
    output?: { x: number; z: number }
  ): { x: number; z: number } {
    this.assertAlive();
    const result = output ?? this.collisionResult;
    result.x = x;
    result.z = z;
    return result;
  }

  dispose(): void {
    this.isDisposed = true;
  }
}
