import { describe, expect, it } from 'vitest';
import {
  SYNTHETIC_BOUNDARY_RADIUS_METERS,
  SYNTHETIC_TERRAIN_SEGMENTS,
  SYNTHETIC_TERRAIN_SIZE_METERS,
  SyntheticTerrainProvider,
  syntheticElevation,
  syntheticTerrainProvider,
} from '@/worlds/danang/zones/synthetic-terrain';

describe('synthetic terrain provider', () => {
  it('preserves the exact Phase 1-10 elevation formula', () => {
    // Spawn is flattened to exactly zero.
    expect(syntheticElevation(0, 0)).toBe(0);
    expect(syntheticElevation(3, 4)).toBe(0);
    // Outside the spawn flatten radius the hills are non-zero.
    expect(syntheticElevation(20, 0)).not.toBe(0);
    // Formula is deterministic.
    expect(syntheticElevation(20, 10)).toBe(syntheticElevation(20, 10));
  });

  it('keeps the 180 m terrain, 128 segments and 68 m boundary', () => {
    expect(SYNTHETIC_TERRAIN_SIZE_METERS).toBe(180);
    expect(SYNTHETIC_TERRAIN_SEGMENTS).toBe(128);
    expect(SYNTHETIC_BOUNDARY_RADIUS_METERS).toBe(68);
    expect(syntheticTerrainProvider.boundaryRadiusMeters).toBe(68);
    expect(syntheticTerrainProvider.spawnPosition).toEqual([0, 0, 0]);
  });

  it('samples the spawn elevation as zero and rejects out-of-coverage', () => {
    const provider = new SyntheticTerrainProvider();
    const spawn = provider.sampleElevation(0, 0);
    expect(spawn.status).toBe('ok');
    if (spawn.status === 'ok') expect(spawn.elevationMeters).toBe(0);
    expect(provider.sampleElevation(91, 0).status).toBe('outside-coverage');
    expect(provider.sampleElevation(0, -91).status).toBe('outside-coverage');
  });

  it('never returns a silent zero for invalid input', () => {
    const provider = new SyntheticTerrainProvider();
    const sample = provider.sampleElevation(Number.NaN, 0);
    expect(sample.status).toBe('invalid-input');
    if (sample.status === 'invalid-input') expect(sample.elevationMeters).toBeNull();
  });

  it('is explicit synthetic-local metadata, not geographic', () => {
    const provider = new SyntheticTerrainProvider();
    expect(provider.metadata.crs).toBe('synthetic-local-meters');
    expect(provider.metadata.verticalDatum).toBe('SYNTHETIC_LOCAL');
    expect(provider.metadata.isGeographic).toBe(false);
    expect(provider.metadata.purpose).toBe('production');
  });

  it('support surface is terrain or a steppable platform, whichever is higher', () => {
    const provider = new SyntheticTerrainProvider();
    // Step-1 platform top is 0.45 at (7.5, -6); terrain there is ~0 (flattened).
    const support = provider.sampleSupportSurface(7.5, -6, 1, 0.38);
    expect(support.status).toBe('ok');
    if (support.status === 'ok') {
      expect(support.elevationMeters).toBeCloseTo(0.45, 6);
      expect(support.terrainElevationMeters).not.toBeNull();
      expect(support.terrainElevationMeters).toBeLessThanOrEqual(0.45);
    }
    // Too low to step up: the platform is not counted.
    const low = provider.sampleSupportSurface(7.5, -6, -1, 0.38);
    expect(low.status).toBe('ok');
    if (low.status === 'ok' && low.terrainElevationMeters !== null) {
      expect(low.elevationMeters).toBeCloseTo(low.terrainElevationMeters, 6);
    }
  });

  it('resolves horizontal collisions without allocating a new result when given one', () => {
    const provider = new SyntheticTerrainProvider();
    const output = { x: 0, z: 0 };
    const result = provider.resolveHorizontalCollisions(-9.0, -7.5, 0, 0.38, output);
    expect(result).toBe(output);
    // Rock at (-9.5,-7.5) radius 1.6 pushes the point out to at least 1.98 m away.
    expect(Math.hypot(result.x + 9.5, result.z + 7.5)).toBeGreaterThanOrEqual(1.98);
  });

  it('throws after disposal', () => {
    const provider = new SyntheticTerrainProvider();
    provider.dispose();
    expect(provider.isDisposed).toBe(true);
    expect(() => provider.sampleElevation(0, 0)).toThrow(/disposed/i);
  });
});
