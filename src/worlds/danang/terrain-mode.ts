/**
 * Terrain mode selection (Phase 16).
 *
 * The production world stays synthetic by default. The real-DEM pilot is
 * an explicit opt-in via the `?terrain=dem` query parameter, so nobody
 * lands on the 3 km DEM world by accident and the 180 m synthetic world
 * dimensions are never silently changed. Anything else (including a
 * missing or misspelled value) falls back to synthetic.
 */
export type TerrainMode = 'synthetic' | 'dem-pilot';

export function resolveTerrainMode(search: string): TerrainMode {
  try {
    return new URLSearchParams(search).get('terrain') === 'dem' ? 'dem-pilot' : 'synthetic';
  } catch {
    return 'synthetic';
  }
}
