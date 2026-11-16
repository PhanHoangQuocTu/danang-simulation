import type { Camera, Scene } from 'three';

/** Renderer-specific setup stays behind the browser boundary. */
export interface WorldRenderer {
  readonly canvas: HTMLCanvasElement;
  render(scene: Scene, camera: Camera): void;
  resize(width: number, height: number, pixelRatio: number): void;
  captureOverview(scene: Scene, camera: Camera, target: HTMLCanvasElement): void;
  getDiagnostics(): { calls: number; triangles: number; geometries: number; textures: number; pixelRatio: number };
  dispose(): void;
}
