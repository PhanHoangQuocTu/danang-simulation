import { describe, expect, it } from 'vitest';
import { resolveTerrainMode } from '../terrain-mode';

describe('Phase 16 terrain mode selection', () => {
  it('defaults to synthetic for an empty or missing query', () => {
    expect(resolveTerrainMode('')).toBe('synthetic');
    expect(resolveTerrainMode('?foo=bar')).toBe('synthetic');
  });

  it('opts into the DEM pilot only for the exact ?terrain=dem value', () => {
    expect(resolveTerrainMode('?terrain=dem')).toBe('dem-pilot');
    expect(resolveTerrainMode('?terrain=dem&other=1')).toBe('dem-pilot');
    expect(resolveTerrainMode('?terrain=DEM')).toBe('synthetic');
    expect(resolveTerrainMode('?terrain=real')).toBe('synthetic');
    expect(resolveTerrainMode('?terrain=')).toBe('synthetic');
  });
});
