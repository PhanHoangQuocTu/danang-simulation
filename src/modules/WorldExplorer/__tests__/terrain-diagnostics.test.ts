import { describe, expect, it } from 'vitest';
import { createTestDemProvider } from '@/world-core/terrain/fixtures';
import { syntheticTerrainProvider } from '@/worlds/danang/zones/synthetic-terrain';
import { runTerrainDiagnosticsSuite } from '../terrain-diagnostics';

describe('terrain diagnostics suite', () => {
  it('passes all checks for the synthetic production provider', () => {
    const results = runTerrainDiagnosticsSuite(syntheticTerrainProvider);
    expect(results).toHaveLength(10);
    expect(results.map((check) => check.id)).toEqual([
      'TER-01',
      'TER-02',
      'TER-03',
      'TER-04',
      'TER-05',
      'TER-06',
      'TER-07',
      'TER-08',
      'TER-09',
      'TER-10',
    ]);
    expect(results.every((check) => check.passed)).toBe(true);
  });

  it('labels the synthetic provider as SYNTHETIC TERRAIN, never real DEM', () => {
    const results = runTerrainDiagnosticsSuite(syntheticTerrainProvider);
    const mode = results.find((check) => check.id === 'TER-09');
    expect(mode?.details).toContain('SYNTHETIC TERRAIN');
  });

  it('labels a test-only DEM fixture as TEST-ONLY DEM, never real DEM', () => {
    const results = runTerrainDiagnosticsSuite(createTestDemProvider());
    const mode = results.find((check) => check.id === 'TER-09');
    expect(mode?.details).toContain('TEST-ONLY DEM');
    expect(mode?.details).not.toContain('REAL DEM');
  });

  it('flags a test-only DEM provider as not a production provider', () => {
    const results = runTerrainDiagnosticsSuite(createTestDemProvider());
    const production = results.find((check) => check.id === 'TER-08');
    expect(production?.passed).toBe(false);
  });
});
