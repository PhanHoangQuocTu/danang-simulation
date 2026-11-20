import { describe, expect, it } from 'vitest';
import {
  DANANG_DEM_PILOT_CHECKPOINTS,
  DANANG_DEM_PILOT_GEO_BOUNDS,
  DANANG_DEM_PILOT_METADATA,
  DANANG_DEM_PILOT_STATS,
  danangDemPilotGridInput,
  decodeBase64ToFloat32,
} from '../danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';
import { selectTerrainProvider } from '@/world-core/terrain/selection';
import { validateTerrainDatasetMetadata } from '@/world-core/terrain/validation';
import { syntheticTerrainProvider } from '@/worlds/danang/zones/synthetic-terrain';
import { runTerrainDiagnosticsSuite } from '@/modules/WorldExplorer/terrain-diagnostics';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { worldToGeo } from '@/engine/geospatial/core';

/** World coordinates of a cell centre: origin -1500/-1500, cell 30 m. */
function cellCentreWorld(row: number, col: number): { x: number; z: number } {
  return { x: -1500 + (col + 0.5) * 30, z: -1500 + (row + 0.5) * 30 };
}

describe('Phase 16 real DEM pilot asset (Copernicus GLO-30)', () => {
  it('decodes the embedded 100x100 Float32 grid and reproduces the measured stats', () => {
    const input = danangDemPilotGridInput();
    expect(input.width).toBe(100);
    expect(input.height).toBe(100);
    expect(input.elevations).toHaveLength(10000);
    // The decoder itself, checked against hand-computed little-endian
    // Float32 base64: 1.0 -> "AACAPw==", 2.5 -> "AAAiQA==".
    expect(Array.from(decodeBase64ToFloat32('AACAPw=='))).toEqual([1]);
    expect(Array.from(decodeBase64ToFloat32('AAAgQA=='))).toEqual([2.5]);
    expect(() => decodeBase64ToFloat32('not!base64')).toThrow();
    // The stats are checked against an independent pass over the decoded
    // values, not against themselves.
    const decoded = new Float32Array(input.elevations);
    let min = Number.POSITIVE_INFINITY;
    let max = Number.NEGATIVE_INFINITY;
    let sum = 0;
    let noDataCount = 0;
    for (const v of decoded) {
      if (v === DANANG_DEM_PILOT_METADATA.noData) noDataCount += 1;
      if (v < min) min = v;
      if (v > max) max = v;
      sum += v;
    }
    expect(noDataCount).toBe(0);
    expect(min).toBeCloseTo(DANANG_DEM_PILOT_STATS.minMeters, 2);
    expect(max).toBeCloseTo(DANANG_DEM_PILOT_STATS.maxMeters, 2);
    expect(sum / decoded.length).toBeCloseTo(DANANG_DEM_PILOT_STATS.meanMeters, 2);
  });

  it('validates as an orthometric labelled pilot, not production-ready', () => {
    const { metadata, isProductionReady } = validateTerrainDatasetMetadata(DANANG_DEM_PILOT_METADATA);
    expect(metadata.verticalDatum).toBe('ORTHOMETRIC_EGM2008');
    expect(isProductionReady).toBe(false);
    expect(metadata.isGeographic).toBe(true);
    expect(metadata.purpose).toBe('production');
    expect(metadata.checksumSha256).toBe('f4f95dc5677eaaca9a967230a676bb8a39025ab79d28b89e225a7e822acbdde6');
    expect(metadata.sourceAccuracyMeters).toBe(4);
  });

  it('reproduces every recorded checkpoint value at its cell centre', () => {
    const provider = new GridDemProvider(danangDemPilotGridInput());
    for (const checkpoint of DANANG_DEM_PILOT_CHECKPOINTS) {
      const { x, z } = cellCentreWorld(checkpoint.row, checkpoint.col);
      const sample = provider.sampleElevation(x, z);
      expect(sample.status).toBe('ok');
      if (sample.status === 'ok') {
        expect(sample.elevationMeters).toBeCloseTo(checkpoint.elevationMeters, 4);
      }
    }
  });

  it('maps checkpoint world coordinates back to the recorded lat/lon (ENU round-trip)', () => {
    // The ingestion script projected the source tile onto the same WGS84
    // ENU frame this core uses, so world->geo must recover the checkpoint
    // coordinates to within a metre. This is a cross-implementation
    // check of the Python ingestion against the TS geospatial core.
    for (const checkpoint of DANANG_DEM_PILOT_CHECKPOINTS) {
      const { x, z } = cellCentreWorld(checkpoint.row, checkpoint.col);
      // World axes are +X East / +Y Up / -Z North, and the cell-centre
      // world z already is -north, so it is passed through unchanged.
      const geo = worldToGeo({ x, y: checkpoint.elevationMeters, z }, DANANG_GEO_REFERENCE.reference);
      expect(geo.latitudeDeg).toBeCloseTo(checkpoint.lat, 4);
      expect(geo.longitudeDeg).toBeCloseTo(checkpoint.lon, 4);
    }
    expect(DANANG_DEM_PILOT_GEO_BOUNDS).toEqual({
      westLon: 108.18818106464255,
      eastLon: 108.21621703842368,
      northLat: 16.067954657654433,
      southLat: 16.040844408071024,
      centreLat: 16.0544,
      centreLon: 108.2022,
    });
  });

  it('covers +/-1500 m with a sampled spawn, and refuses points outside coverage', () => {
    const provider = selectTerrainProvider({ kind: 'dem', grid: danangDemPilotGridInput() }, syntheticTerrainProvider);
    expect(provider.coverage).toEqual({ minXMeters: -1500, maxXMeters: 1500, minZMeters: -1500, maxZMeters: 1500 });
    expect(provider.boundaryRadiusMeters).toBe(1500);
    // Spawn is the sampled elevation at the grid centre, not Y = 0.
    expect(provider.spawnPosition[0]).toBe(0);
    expect(provider.spawnPosition[2]).toBe(0);
    const centre = provider.sampleElevation(0, 0);
    expect(centre.status).toBe('ok');
    if (centre.status === 'ok') {
      expect(provider.spawnPosition[1]).toBeCloseTo(centre.elevationMeters, 6);
      expect(provider.spawnPosition[1]).toBeGreaterThan(2);
      expect(provider.spawnPosition[1]).toBeLessThan(26);
    }
    expect(provider.sampleElevation(2000, 0).status).toBe('outside-coverage');
    expect(provider.sampleElevation(0, -2000).status).toBe('outside-coverage');
  });

  it('diagnostics label it REAL DEM (pilot) and pass all ten terrain checks', () => {
    const provider = new GridDemProvider(danangDemPilotGridInput());
    const checks = runTerrainDiagnosticsSuite(provider);
    expect(checks).toHaveLength(10);
    expect(checks.every((check) => check.passed)).toBe(true);
    const mode = checks.find((check) => check.id === 'TER-09')!;
    expect(mode.details).toContain('REAL DEM (pilot');
    expect(mode.details).toContain('ORTHOMETRIC_EGM2008');
    expect(mode.details).toContain('production-ready: no');
  });
});
