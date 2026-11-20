import { describe, expect, it } from 'vitest';
import { resolveGisMode } from '../gis-mode';

describe('Phase 17 GIS mode selection', () => {
  it('defaults to off for an empty or missing query', () => {
    expect(resolveGisMode('')).toBe('off');
    expect(resolveGisMode('?foo=bar')).toBe('off');
  });

  it('opts into the real GIS pilot only for the exact ?gis=real value', () => {
    expect(resolveGisMode('?gis=real')).toBe('real');
    expect(resolveGisMode('?terrain=dem&gis=real')).toBe('real');
    expect(resolveGisMode('?gis=REAL')).toBe('off');
    expect(resolveGisMode('?gis=true')).toBe('off');
    expect(resolveGisMode('?gis=')).toBe('off');
  });
});
