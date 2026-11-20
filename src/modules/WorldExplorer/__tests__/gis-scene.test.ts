import { describe, expect, it } from 'vitest';
import { ResourceScope } from '@/engine/core/resources';
import { InteractableRegistry } from '@/engine/interactions/registry';
import { createDaNangScene } from '@/worlds/danang/scene';
import { danangDemPilotGridInput } from '@/worlds/danang/data/danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';
import { syntheticTerrainProvider } from '@/worlds/danang/zones/synthetic-terrain';

describe('Phase 17 GIS scene integration', () => {
  it('adds the GIS layer on DEM terrain when opted in, and keeps Phase 1–10 content', () => {
    const scope = new ResourceScope();
    const registry = new InteractableRegistry();
    const provider = new GridDemProvider(danangDemPilotGridInput());
    const world = createDaNangScene(registry, scope, provider, { gisEnabled: true });
    expect(world.gisLayer).not.toBeNull();
    expect(world.gisLayer!.normalized.stats.roadRuns).toBe(1830);
    expect(world.gisLayer!.normalized.stats.buildings).toBe(418);
    // Additive only: the Phase 10 fixtures and the plaza are still there.
    expect(registry.getAll()).toHaveLength(3);
    const gisGroup = world.scene.getObjectByName('danang-gis-pilot');
    expect(gisGroup).toBeDefined();
    expect(gisGroup!.children).toHaveLength(4);
    provider.dispose();
    scope.dispose();
  });

  it('builds no GIS layer without the opt-in, on synthetic terrain, or both', () => {
    const demProvider = new GridDemProvider(danangDemPilotGridInput());
    for (const [terrain, options] of [
      [demProvider, {}],
      [demProvider, { gisEnabled: false }],
      [syntheticTerrainProvider, { gisEnabled: true }],
      [syntheticTerrainProvider, {}],
    ] as const) {
      const scope = new ResourceScope();
      const registry = new InteractableRegistry();
      const world = createDaNangScene(registry, scope, terrain, options);
      expect(world.gisLayer).toBeNull();
      expect(world.scene.getObjectByName('danang-gis-pilot')).toBeUndefined();
      scope.dispose();
    }
    demProvider.dispose();
  });
});
