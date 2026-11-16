import { ACESFilmicToneMapping, PCFShadowMap, SRGBColorSpace, Vector4, WebGLRenderer } from 'three';
import type { WorldRenderer } from './type';

/** Call only after mounting the client viewport. Scene assets have a separate owner. */
export function createWebGlRenderer(canvas: HTMLCanvasElement): WorldRenderer {
  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFShadowMap;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  canvas.style.touchAction = 'none';
  let disposed = false;
  const viewport = new Vector4();
  const scissor = new Vector4();
  return {
    canvas,
    render(scene, camera) {
      if (disposed) throw new Error('Renderer is disposed');
      renderer.render(scene, camera);
    },
    resize(width, height, pixelRatio) {
      if (disposed) throw new Error('Renderer is disposed');
      if (![width, height, pixelRatio].every((value) => Number.isFinite(value) && value > 0)) {
        throw new Error('Invalid viewport size');
      }
      renderer.setPixelRatio(Math.min(pixelRatio, 2));
      renderer.setSize(width, height, false);
    },
    captureOverview(scene, camera, target) {
      if (disposed) throw new Error('Renderer is disposed');
      const context = target.getContext('2d');
      if (!context) throw new Error('Mini map canvas unavailable');
      const renderTarget = renderer.getRenderTarget();
      const scissorTest = renderer.getScissorTest();
      renderer.getViewport(viewport);
      renderer.getScissor(scissor);
      const size = Math.min(target.width, canvas.clientWidth, canvas.clientHeight);
      if (size < 1) throw new Error('Mini map viewport unavailable');
      try {
        renderer.setRenderTarget(null);
        renderer.setViewport(0, 0, size, size);
        renderer.setScissor(0, 0, size, size);
        renderer.setScissorTest(true);
        renderer.render(scene, camera);
        const pixels = Math.floor(size * renderer.getPixelRatio());
        context.clearRect(0, 0, target.width, target.height);
        context.drawImage(canvas, 0, canvas.height - pixels, pixels, pixels, 0, 0, target.width, target.height);
      } finally {
        renderer.setRenderTarget(renderTarget);
        renderer.setViewport(viewport);
        renderer.setScissor(scissor);
        renderer.setScissorTest(scissorTest);
      }
    },
    getDiagnostics() {
      return {
        calls: renderer.info.render.calls,
        triangles: renderer.info.render.triangles,
        geometries: renderer.info.memory.geometries,
        textures: renderer.info.memory.textures,
        pixelRatio: renderer.getPixelRatio(),
      };
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      renderer.dispose();
    },
  };
}
