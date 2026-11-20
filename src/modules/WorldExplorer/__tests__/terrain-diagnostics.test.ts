import { describe, expect, it } from 'vitest';
import { createTestDemProvider } from '@/world-core/terrain/fixtures';
import { syntheticTerrainProvider } from '@/worlds/danang/zones/synthetic-terrain';
import { runTerrainDiagnosticsSuite } from '../terrain-diagnostics';

describe('terrain diagnostics suite', () => {
  it('passes all checks for the synthetic production provider', () => {
    const results = runTerrainDiagnosticsSuite(syntheticTerrainProvider);
    expect(results).toHaveLength(8);
    expect(results.map((check) => check.id)).toEqual([
      'TER-01',
      'TER-02',
      'TER-03',
      'TER-04',
      'TER-05',
      'TER-06',
      'TER-07',
      'TER-08',
    ]);
    expect(results.every((check) => check.passed)).toBe(true);
  });

  it('flags a test-only DEM provider as not a production provider', () => {
    const results = runTerrainDiagnosticsSuite(createTestDemProvider());
    const production = results.find((check) => check.id === 'TER-08');
    expect(production?.passed).toBe(false);
  });
});
