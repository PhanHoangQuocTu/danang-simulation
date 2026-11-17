import { afterEach, describe, expect, it, vi } from 'vitest';
import { Scene, PerspectiveCamera, Vector4 } from 'three';
const fake = vi.hoisted(() => ({
  state: { target: null as unknown, scissorTest: false },
  render: vi.fn(),
  dispose: vi.fn(),
  resetState: vi.fn(),
  forceContextLoss: vi.fn(),
  setPixelRatio: vi.fn(),
  setSize: vi.fn(),
  setViewport: vi.fn(),
  setScissor: vi.fn(),
  view: { x: 0, y: 0, z: 800, w: 600 },
  clip: { x: 0, y: 0, z: 800, w: 600 },
}));
vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<typeof import('three')>();
  return {
    ...actual,
    WebGLRenderer: class {
      shadowMap = { enabled: false, type: 0 };
      toneMapping = 0;
      toneMappingExposure = 1;
      outputColorSpace = '';
      info = { render: { calls: 4, triangles: 8 }, memory: { geometries: 2, textures: 1 } };
      render = fake.render;
      dispose = fake.dispose;
      resetState = fake.resetState;
      forceContextLoss = fake.forceContextLoss;
      setPixelRatio = fake.setPixelRatio;
      setSize = fake.setSize;
      getPixelRatio() {
        return 2;
      }
      getRenderTarget() {
        return fake.state.target;
      }
      setRenderTarget(target: unknown) {
        fake.state.target = target;
      }
      getScissorTest() {
        return fake.state.scissorTest;
      }
      setScissorTest(value: boolean) {
        fake.state.scissorTest = value;
      }
      getViewport(target: Vector4) {
        return target.set(fake.view.x, fake.view.y, fake.view.z, fake.view.w);
      }
      setViewport = fake.setViewport;
      getScissor(target: Vector4) {
        return target.set(fake.clip.x, fake.clip.y, fake.clip.z, fake.clip.w);
      }
      setScissor = fake.setScissor;
    },
  };
});
import { createWebGlRenderer } from '../webgl';
afterEach(() => vi.restoreAllMocks());
function fixture() {
  const canvas = document.createElement('canvas');
  Object.defineProperties(canvas, { clientWidth: { value: 800 }, clientHeight: { value: 600 } });
  canvas.height = 1200;
  const target = document.createElement('canvas');
  target.width = 256;
  target.height = 256;
  const drawImage = vi.fn();
  vi.spyOn(target, 'getContext').mockReturnValue({
    clearRect: vi.fn(),
    drawImage,
  } as unknown as CanvasRenderingContext2D);
  return { renderer: createWebGlRenderer(canvas), target, drawImage };
}
describe('single renderer adapter', () => {
  it('releases the owned context after disposal unless Strict Mode immediately reuses its canvas', async () => {
    const f = fixture();
    fake.forceContextLoss.mockClear();
    f.renderer.dispose();
    const replacement = createWebGlRenderer(f.renderer.canvas);
    await Promise.resolve();
    expect(fake.forceContextLoss).not.toHaveBeenCalled();
    replacement.dispose();
    await Promise.resolve();
    expect(fake.forceContextLoss).toHaveBeenCalledTimes(1);
  });
  it('coalesces context release when both Strict Mode instances are disposed in the same task', async () => {
    const f = fixture();
    fake.forceContextLoss.mockClear();
    f.renderer.dispose();
    const replacement = createWebGlRenderer(f.renderer.canvas);
    replacement.dispose();
    await Promise.resolve();
    expect(fake.forceContextLoss).toHaveBeenCalledTimes(1);
  });
  it('caps DPR, rejects invalid sizes, and disposes once', () => {
    const f = fixture();
    f.renderer.resize(800, 600, 3);
    expect(fake.setPixelRatio).toHaveBeenLastCalledWith(2);
    expect(() => f.renderer.resize(0, 600, 1)).toThrow('Invalid viewport');
    fake.dispose.mockClear();
    fake.resetState.mockClear();
    f.renderer.dispose();
    f.renderer.dispose();
    expect(fake.dispose).toHaveBeenCalledTimes(1);
    expect(fake.resetState).toHaveBeenCalledTimes(1);
    expect(fake.resetState.mock.invocationCallOrder[0]).toBeLessThan(fake.dispose.mock.invocationCallOrder[0]);
    expect(() => f.renderer.render(new Scene(), new PerspectiveCamera())).toThrow('disposed');
  });
  it('copies overview in device pixels and restores render target, viewport, and scissor', () => {
    const f = fixture();
    const target = { id: 'borrowed-target' };
    fake.state.target = target;
    fake.state.scissorTest = false;
    f.renderer.captureOverview(new Scene(), new PerspectiveCamera(), f.target);
    expect(f.drawImage).toHaveBeenCalled();
    expect(fake.state.target).toBe(target);
    expect(fake.state.scissorTest).toBe(false);
    expect(fake.setViewport).toHaveBeenLastCalledWith(new Vector4(0, 0, 800, 600));
    f.renderer.dispose();
  });
  it('restores renderer state when overview rendering fails', () => {
    const f = fixture();
    const target = { id: 'saved' };
    fake.state.target = target;
    fake.render.mockImplementationOnce(() => {
      throw new Error('render failed');
    });
    expect(() => f.renderer.captureOverview(new Scene(), new PerspectiveCamera(), f.target)).toThrow('render failed');
    expect(fake.state.target).toBe(target);
    expect(fake.state.scissorTest).toBe(false);
    f.renderer.dispose();
  });
});
