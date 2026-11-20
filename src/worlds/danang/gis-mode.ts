/**
 * GIS mode selection (Phase 17).
 *
 * The production world stays synthetic by default, and the DEM pilot stays
 * terrain-only by default. Real OSM roads and buildings are an explicit
 * opt-in via the `?gis=real` query parameter, so nobody lands on the GIS
 * layer by accident. Anything else (including a missing or misspelled
 * value) keeps GIS off.
 *
 * The GIS layer is geographic (3 km pilot): it is only built when the
 * active terrain is geographic (the DEM pilot). `?gis=real` without
 * `?terrain=dem` is a documented no-op — the diagnostics say so instead
 * of placing kilometre-scale features on the 180 m synthetic world.
 */
export type GisMode = 'off' | 'real';

export function resolveGisMode(search: string): GisMode {
  try {
    return new URLSearchParams(search).get('gis') === 'real' ? 'real' : 'off';
  } catch {
    return 'off';
  }
}
