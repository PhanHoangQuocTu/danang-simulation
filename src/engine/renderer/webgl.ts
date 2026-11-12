import { ACESFilmicToneMapping, PCFSoftShadowMap, WebGLRenderer } from 'three';
import type { WorldRenderer } from './type';

/** Call only after mounting the client viewport. Scene assets have a separate owner. */
export function createWebGlRenderer(canvas: HTMLCanvasElement): WorldRenderer {
  const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = PCFSoftShadowMap;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  canvas.style.touchAction = 'none';
  let disposed = false;
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
    dispose() {
      if (disposed) return;
      disposed = true;
      renderer.dispose();
    },
  };
}
