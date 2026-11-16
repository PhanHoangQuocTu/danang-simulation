import { afterEach, describe, expect, it, vi } from 'vitest';
import { Mesh } from 'three';
import { ResourceScope } from '@/engine/core/resources';
import { InteractableRegistry } from '@/engine/interactions/registry';
import { createDaNangScene } from '@/worlds/danang/scene';
import { ROCK_COLLIDERS } from '@/worlds/danang/zones/synthetic';
import { createWorldRuntime, type WorldBindings, type WorldSnapshot } from '../runtime/world';

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
describe('scene composition and browser runtime', () => {
  it('preserves synthetic fixtures, shared rocks, character, grass, and owned resource disposal', () => {
    canvasContext();
    const scope = new ResourceScope();
    const registry = new InteractableRegistry();
    const world = createDaNangScene(registry, scope);
    expect(registry.getAll()).toHaveLength(3);
    expect(world.characterRig.root.name).toBe('PlayerRoot');
    expect(world.instancedGrass.count).toBe(2600);
    expect(world.lanternLights).toHaveLength(3);
    expect(world.treeCrownGroups).toHaveLength(18);
    expect(world.cloudClusters).toHaveLength(24);
    const rocks: Mesh[] = [];
    world.scene.traverse((object) => {
      if (object.name.startsWith('rock-') && object instanceof Mesh) rocks.push(object);
    });
    expect(rocks).toHaveLength(ROCK_COLLIDERS.length);
    expect(rocks[0].geometry).toBe(rocks[1].geometry);
    expect(rocks[0].material).toBe(rocks[1].material);
    const dispose = vi.spyOn(rocks[0].geometry, 'dispose');
    registry.clear();
    scope.dispose();
    scope.dispose();
    expect(dispose).toHaveBeenCalledTimes(1);
    expect(rocks[0].parent).toBeNull();
  });
  it('owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources', () => {
    canvasContext();
    const queue = new Map<number, FrameRequestCallback>();
    let sequence = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      const id = ++sequence;
      queue.set(id, callback);
      return id;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => queue.delete(id));
    const disconnect = vi.fn();
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {
          /* Tests drive frame and resize events explicitly. */
        }
        disconnect = disconnect;
      }
    );
    const canvas = document.createElement('canvas');
    canvas.tabIndex = 0;
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
    const snapshots: WorldSnapshot[] = [];
    const bindings: WorldBindings = {
      canvas,
      mapCanvas: document.createElement('canvas'),
      marker: document.createElement('div'),
      cone: document.createElement('div'),
      edge: document.createElement('span'),
      command: vi.fn(),
      device: vi.fn(),
      status: vi.fn(),
      snapshot: (value) => snapshots.push(value),
    };
    renderer.dispose.mockClear();
    const runtime = createWorldRuntime(bindings);
    expect(queue.size).toBe(1);
    expect(renderer.resize).toHaveBeenCalledWith(800, 600, expect.any(Number));
    const frame = (time: number) => {
      const entry = queue.entries().next().value!;
      queue.delete(entry[0]);
      entry[1](time);
    };
    frame(0);
    canvas.focus();
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyW' }));
    for (let time = 16; time <= 1200; time += 16) frame(time);
    expect(snapshots.at(-1)!.z).toBeLessThan(-1);
    expect(queue.size).toBe(1);
    const camera = renderer.render.mock.calls.at(-1)![1] as { aspect: number };
    expect(camera.aspect).toBe(800 / 600);
    const lost = new Event('webglcontextlost', { cancelable: true });
    canvas.dispatchEvent(lost);
    expect(lost.defaultPrevented).toBe(true);
    expect(queue.size).toBe(0);
    canvas.dispatchEvent(new Event('webglcontextrestored'));
    expect(queue.size).toBe(1);
    frame(2000);
    expect(snapshots.at(-1)!.speed).toBeLessThan(5);
    runtime.dispose();
    runtime.dispose();
    expect(queue.size).toBe(0);
    expect(disconnect).toHaveBeenCalledTimes(1);
    expect(renderer.dispose).toHaveBeenCalledTimes(1);
  });
  it('keeps Mini Map failure unavailable while restoring scene visibility', () => {
    canvasContext();
    let callback: FrameRequestCallback = () => {
      throw new Error('RAF was not scheduled');
    };
    vi.stubGlobal('requestAnimationFrame', (next: FrameRequestCallback) => {
      callback = next;
      return 1;
    });
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.stubGlobal(
      'ResizeObserver',
      class {
        observe() {
          /* Tests drive frame and resize events explicitly. */
        }
        disconnect() {
          /* No native observer is allocated in jsdom. */
        }
      }
    );
    renderer.captureOverview.mockImplementationOnce(() => {
      throw new Error('capture failed');
    });
    const canvas = document.createElement('canvas');
    vi.spyOn(canvas, 'getBoundingClientRect').mockReturnValue({ width: 800, height: 600 } as DOMRect);
    const snapshot = vi.fn();
    const runtime = createWorldRuntime({
      canvas,
      mapCanvas: document.createElement('canvas'),
      marker: document.createElement('div'),
      cone: document.createElement('div'),
      edge: document.createElement('span'),
      command: vi.fn(),
      device: vi.fn(),
      status: vi.fn(),
      snapshot,
    });
    callback(0);
    expect(snapshot.mock.calls[0][0].mapStatus).toBe('unavailable');
    const scene = renderer.render.mock.calls.at(-1)![0] as { getObjectByName(name: string): { visible: boolean } };
    expect(scene.getObjectByName('PlayerRoot').visible).toBe(true);
    runtime.dispose();
  });
});
