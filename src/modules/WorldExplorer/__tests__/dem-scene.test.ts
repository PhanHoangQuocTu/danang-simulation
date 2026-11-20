import { afterEach, describe, expect, it, vi } from 'vitest';
import { Mesh } from 'three';
import { ResourceScope } from '@/engine/core/resources';
import { InteractableRegistry } from '@/engine/interactions/registry';
import { createDaNangScene } from '@/worlds/danang/scene';
import { danangDemPilotGridInput } from '@/worlds/danang/data/danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';
import { createWorldRuntime, getActiveTerrainProvider, type WorldBindings } from '../runtime/world';

const renderer = vi.hoisted(() => ({
  render: vi.fn(),
  resize: vi.fn(),
  dispose: vi.fn(),
  captureOverview: vi.fn(),
  getDiagnostics: () => ({ calls: 12, triangles: 100, geometries: 20, textures: 2, pixelRatio: 1 }),
}));
vi.mock('@/engine/renderer/webgl', () => ({ createWebGlRenderer: () => renderer }));

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  document.body.replaceChildren();
});

function canvasContext() {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
    fillRect: vi.fn(),
    fillStyle: '',
  } as unknown as CanvasRenderingContext2D);
}

describe('Phase 16 DEM scene and runtime', () => {
  it('builds the DEM scene from the real pilot grid without synthetic colliders', () => {
    canvasContext();
    const scope = new ResourceScope();
    const registry = new InteractableRegistry();
    const provider = new GridDemProvider(danangDemPilotGridInput());
    const world = createDaNangScene(registry, scope, provider);
    expect(registry.getAll()).toHaveLength(3);
    expect(world.characterRig.root.name).toBe('PlayerRoot');
    // No synthetic trees, platforms or manifest rocks in a DEM world:
    // the DEM provider has terrain-only collision, so visual-only
    // colliders the character would fall through are omitted.
    expect(world.treeCrownGroups).toHaveLength(0);
    const rocks: Mesh[] = [];
    world.scene.traverse((object) => {
      if (object.name.startsWith('rock-') && object instanceof Mesh) rocks.push(object);
    });
    expect(rocks).toHaveLength(0);
    // The terrain mesh spans the 3 km pilot at the real elevations.
    const terrain = world.scene.children.find(
      (child) => child instanceof Mesh && child.geometry.attributes.position.count === 10000
    );
    expect(terrain).toBeDefined();
    // The fog is far thinner than the synthetic world's, or the 3 km
    // terrain would be fully fogged a few hundred metres out.
    expect((world.scene.fog as { density: number }).density).toBeCloseTo(0.0006, 6);
    scope.dispose();
  });

  it('runs the DEM runtime, grounds the character, and disposes the DEM provider', () => {
    canvasContext();
    vi.stubGlobal('requestAnimationFrame', () => 1);
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {
          /* Tests drive nothing here; the runtime only needs the class. */
        }
        disconnect() {
          /* No native observer is allocated in jsdom. */
        }
      }
    );
    const canvas = document.createElement('canvas');
    document.body.append(canvas);
    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
      width: 800,
      height: 600,
      x: 0,
      y: 0,
      top: 0,
      bottom: 600,
      left: 0,
      right: 800,
      toJSON() {
        return {};
      },
    });
    const bindings: WorldBindings = {
      canvas,
      mapCanvas: document.createElement('canvas'),
      marker: document.createElement('div'),
      cone: document.createElement('div'),
      edge: document.createElement('span'),
      command: vi.fn(),
      device: vi.fn(),
      status: vi.fn(),
      snapshot: vi.fn(),
    };
    const runtime = createWorldRuntime(bindings, { terrainMode: 'dem-pilot' });
    const active = getActiveTerrainProvider();
    expect(active.metadata.isGeographic).toBe(true);
    expect(active.metadata.datasetId).toBe('copernicus-dem-glo30-danang-pilot-v1');
    const provider = active;
    const dispose = vi.spyOn(provider, 'dispose');
    runtime.reset();
    runtime.dispose();
    runtime.dispose();
    // The runtime-owned DEM provider is disposed exactly once; the
    // synthetic singleton is never disposed by a runtime.
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(getActiveTerrainProvider().metadata.isGeographic).toBe(false);
  });

  it('keeps the synthetic provider active by default', () => {
    canvasContext();
    vi.stubGlobal('requestAnimationFrame', () => 1);
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {
          /* Tests drive nothing here; the runtime only needs the class. */
        }
        disconnect() {
          /* No native observer is allocated in jsdom. */
        }
      }
    );
    const canvas = document.createElement('canvas');
    document.body.append(canvas);
    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({
      width: 800,
      height: 600,
      x: 0,
      y: 0,
      top: 0,
      bottom: 600,
      left: 0,
      right: 800,
      toJSON() {
        return {};
      },
    });
    const bindings: WorldBindings = {
      canvas,
      mapCanvas: document.createElement('canvas'),
      marker: document.createElement('div'),
      cone: document.createElement('div'),
      edge: document.createElement('span'),
      command: vi.fn(),
      device: vi.fn(),
      status: vi.fn(),
      snapshot: vi.fn(),
    };
    const runtime = createWorldRuntime(bindings);
    expect(getActiveTerrainProvider().metadata.isGeographic).toBe(false);
    runtime.dispose();
  });
});
