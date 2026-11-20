import { describe, expect, it } from 'vitest';
import { createTestDemProvider } from '../fixtures';
import { GridDemProvider } from '../grid';
import { selectTerrainProvider } from '../selection';
import { syntheticTerrainProvider } from '@/worlds/danang/zones/synthetic-terrain';

describe('terrain provider selection', () => {
  it('selects the synthetic provider by default', () => {
    const provider = selectTerrainProvider({ kind: 'synthetic' }, syntheticTerrainProvider);
    expect(provider).toBe(syntheticTerrainProvider);
    expect(provider.metadata.datasetId).toBe('synthetic-danang-phase-10');
  });

  it('instantiates a DEM provider only from validated grid input', () => {
    const fixture = createTestDemProvider();
    const provider = selectTerrainProvider(
      {
        kind: 'dem',
        grid: {
          metadata: fixture.metadata,
          width: 5,
          height: 5,
          cellSizeMeters: 10,
          originXMeters: -25,
          originZMeters: -25,
          elevations: [0, 1, 2, 3, 4, 1, 2, 3, 4, 5, 2, 3, 4, 5, 6, 3, 4, 5, 6, 7, 4, 5, 6, 7, 8],
          noData: -9999,
        },
      },
      syntheticTerrainProvider
    );
    expect(provider).toBeInstanceOf(GridDemProvider);
    expect(provider.metadata.purpose).toBe('test-only');
  });

  it('switching providers disposes the old one without stale references', () => {
    const old = createTestDemProvider();
    const next = selectTerrainProvider({ kind: 'synthetic' }, syntheticTerrainProvider);
    old.dispose();
    expect(old.isDisposed).toBe(true);
    expect(() => old.sampleElevation(0, 0)).toThrow(/disposed/i);
    expect(next.sampleElevation(0, 0).status).toBe('ok');
  });
});
