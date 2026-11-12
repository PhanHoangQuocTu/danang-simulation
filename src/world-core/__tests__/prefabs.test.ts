import { describe, expect, it, vi } from 'vitest';
import { Group, type Mesh } from 'three';
import { manifestSchema, type WorldManifest } from '../schemas/manifest';
import { PrefabRegistry } from '../registries/prefabs';
import { createSyntheticRockCatalog } from '@/world-assets/catalog/synthetic-rock';

function fixture(): WorldManifest {
  return {
    version: 1,
    sources: [
      {
        id: 'phase-1',
        provider: 'Project prototype',
        source: 'history/code/da_nang_3d_open_world_simulation_phase_10.tsx',
        confidence: 'S',
        horizontalCrs: null,
        verticalDatum: null,
        captureDate: null,
        verifiedDate: null,
        license: 'Project source; redistribution rights require owner review',
        accuracyMeters: null,
        processing: [],
      },
    ],
    assets: [],
    prefabs: [
      {
        id: 'rock',
        version: 1,
        assetIds: [],
        instancing: 'individual',
        materialProfile: null,
        lodProfile: null,
        collisionProfile: null,
        interactionProfile: null,
      },
    ],
    zones: [
      {
        id: 'test-a',
        version: 1,
        coordinateSpace: 'synthetic-local-meters',
        origin: [0, 0, 0],
        bounds: { min: [-68, -10, -68], max: [68, 20, 68] },
        elements: [
          {
            id: 'rock-a',
            prefabId: 'rock',
            sourceId: 'phase-1',
            transform: { position: [-9.5, 0, -7.5], rotation: [0, 0, 0], scale: [1.6, 1.8, 1.6] },
          },
        ],
      },
      {
        id: 'test-b',
        version: 1,
        coordinateSpace: 'synthetic-local-meters',
        origin: [0, 0, 0],
        bounds: { min: [-68, -10, -68], max: [68, 20, 68] },
        elements: [
          {
            id: 'rock-b',
            prefabId: 'rock',
            sourceId: 'phase-1',
            transform: { position: [-14, 0, 5.5], rotation: [0, 1, 0], scale: [2.2, 2.5, 2.2] },
          },
        ],
      },
    ],
  };
}

describe('Prefab composition and ownership', () => {
  it('shares geometry/material across independent transforms, metadata and zones', () => {
    const parent = new Group();
    const catalog = createSyntheticRockCatalog(parent);
    const registry = new PrefabRegistry();
    registry.register('rock', catalog.factory);
    const zoneA = registry.loadZone(fixture(), 'test-a');
    const zoneB = registry.loadZone(fixture(), 'test-b');
    const [a, b] = parent.children as Mesh[];
    expect(a.geometry).toBe(b.geometry);
    expect(a.material).toBe(b.material);
    expect(a.position.equals(b.position)).toBe(false);
    expect(a.scale.equals(b.scale)).toBe(false);
    expect(a.userData).not.toBe(b.userData);
    const disposeGeometry = vi.spyOn(a.geometry, 'dispose');
    zoneA.dispose();
    zoneA.dispose();
    expect(parent.children).toEqual([b]);
    expect(disposeGeometry).not.toHaveBeenCalled();
    zoneB.dispose();
    catalog.dispose();
    catalog.dispose();
    expect(disposeGeometry).toHaveBeenCalledTimes(1);
    expect(parent.children).toEqual([]);
  });

  it('rejects duplicate IDs and broken provenance/prefab/asset references', () => {
    const manifest = fixture();
    manifest.zones.push(manifest.zones[0]);
    expect(manifestSchema.safeParse(manifest).success).toBe(false);
    const broken = fixture();
    broken.zones[0].elements[0].sourceId = 'missing';
    broken.prefabs[0].assetIds.push('missing');
    expect(manifestSchema.safeParse(broken).success).toBe(false);
  });

  it('rejects unknown fields, non-finite transforms and inverted bounds', () => {
    expect(manifestSchema.safeParse({ ...fixture(), imaginaryCity: true }).success).toBe(false);
    const manifest = fixture();
    manifest.zones[0].bounds.min[0] = 100;
    manifest.zones[0].elements[0].transform.position[0] = Number.NaN;
    expect(manifestSchema.safeParse(manifest).success).toBe(false);
  });

  it('rolls back prior elements if a factory fails part way through loading', () => {
    const manifest = fixture();
    manifest.zones[0].elements.push({ ...manifest.zones[0].elements[0], id: 'second' });
    const dispose = vi.fn();
    const registry = new PrefabRegistry();
    registry.register('rock', (element) => {
      if (element.id === 'second') throw new Error('factory failure');
      return { dispose };
    });
    expect(() => registry.loadZone(manifest, 'test-a')).toThrow('factory failure');
    expect(dispose).toHaveBeenCalledTimes(1);
  });

  it('accepts a new prefab through registration without editing the engine', () => {
    const manifest = fixture();
    manifest.prefabs.push({ ...manifest.prefabs[0], id: 'new-prefab' });
    manifest.zones[0].elements[0].prefabId = 'new-prefab';
    const registry = new PrefabRegistry();
    const factory = vi.fn(() => ({ dispose: vi.fn() }));
    registry.register('new-prefab', factory);
    registry.loadZone(manifest, 'test-a').dispose();
    expect(factory).toHaveBeenCalledTimes(1);
    expect(() => registry.register('new-prefab', factory)).toThrow('duplicate');
  });
});
