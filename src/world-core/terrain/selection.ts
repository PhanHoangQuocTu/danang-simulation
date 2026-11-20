import { GridDemProvider, type GridDemInput } from './grid';
import type { TerrainProvider } from '@/engine/terrain/type';

export type TerrainProviderSelection =
  | { readonly kind: 'synthetic' }
  | { readonly kind: 'dem'; readonly grid: GridDemInput };

/**
 * Explicit provider selection (Phase 15 §8). Synthetic is the default and
 * the only provider the production world uses today. A DEM provider can
 * only be instantiated from a validated grid input — `GridDemProvider`
 * rejects unvalidated metadata and unknown datums — so selection can never
 * silently swap in an unapproved dataset. An orthometric (EGM2008) DEM is
 * accepted only as a labelled pilot (Phase 16): its datum stays
 * ORTHOMETRIC_EGM2008, `isProductionReady` is false for it, and absolute
 * ellipsoid alignment remains NOT VERIFIED.
 *
 * No plugin framework: selection is a plain function, and switching means
 * constructing a new provider and disposing the old one; the runtime owns
 * exactly one provider at a time.
 */
export function selectTerrainProvider(
  selection: TerrainProviderSelection,
  synthetic: TerrainProvider
): TerrainProvider {
  if (selection.kind === 'synthetic') return synthetic;
  return new GridDemProvider(selection.grid);
}
