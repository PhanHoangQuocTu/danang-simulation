import { describe, expect, it, vi } from 'vitest';
import { Vector3 } from 'three';
import { createCharacterController, type CharacterEnvironment } from '../controller';
import type { PlayerRuntimeState } from '@/engine/core/type';

function player(): PlayerRuntimeState {
  return {
    position: new Vector3(),
    velocity: new Vector3(),
    horizontalSpeed: 0,
    rotationY: 0,
    isGrounded: true,
    surfaceHeight: 0,
    animationState: 'IDLE',
    landingTimer: 0,
    cameraYaw: 0,
    cameraPitch: 0,
    cameraDistance: 5.4,
    isPointerLocked: false,
    perf: {
      fps: 0,
      avgFrameTimeMs: 0,
      p95FrameTimeMs: 0,
      drawCalls: 0,
      triangles: 0,
      geometriesCount: 0,
      texturesCount: 0,
      jsHeapUsedMb: null,
      pixelRatioActive: 1,
      adaptiveQualityTier: 'balanced',
    },
  };
}
const noJoystick = { x: 0, y: 0, magnitude: 0, active: false };
const noTouch = { sprint: false, sprintLatched: false, jump: false };
const keys = { forward: false, backward: false, left: false, right: false, sprint: false, jump: false };
function environment(): CharacterEnvironment {
  return {
    boundaryRadius: 68,
    getTerrainElevation: () => 0,
    getSupportSurfaceHeight: () => 0,
    resolveHorizontalCollisions: (x, z) => ({ x, z }),
    onLanding: vi.fn(),
  };
}

describe('Phase 1 character physics', () => {
  it('walks and sprints at historical speeds without diagonal speed gain', () => {
    const straight = player();
    const diagonal = player();
    const a = createCharacterController(straight, environment());
    const b = createCharacterController(diagonal, environment());
    for (let index = 0; index < 120; index++) {
      a.update(1 / 60, { ...keys, forward: true }, noJoystick, noTouch);
      b.update(1 / 60, { ...keys, forward: true, right: true }, noJoystick, noTouch);
    }
    expect(straight.horizontalSpeed).toBeCloseTo(4.5, 3);
    expect(diagonal.horizontalSpeed).toBeCloseTo(straight.horizontalSpeed, 3);
    for (let index = 0; index < 120; index++) {
      a.update(1 / 60, { ...keys, forward: true, sprint: true }, noJoystick, noTouch);
    }
    expect(straight.horizontalSpeed).toBeCloseTo(8.6, 3);
    expect(straight.animationState).toBe('RUN');
  });

  it('jumps, falls and lands with one landing event', () => {
    const state = player();
    const world = environment();
    const controller = createCharacterController(state, world);
    controller.update(1 / 60, { ...keys, jump: true }, noJoystick, noTouch);
    expect(state.position.y).toBeGreaterThan(0);
    expect(state.animationState).toBe('JUMP');
    for (let index = 0; index < 90; index++) controller.update(1 / 60, keys, noJoystick, noTouch);
    expect(state.position.y).toBe(0);
    expect(state.isGrounded).toBe(true);
    expect(world.onLanding).toHaveBeenCalledTimes(1);
  });

  it('clamps suspended frames and ignores invalid deltas', () => {
    const state = player();
    const controller = createCharacterController(state, environment());
    controller.update(Number.NaN, { ...keys, forward: true }, noJoystick, noTouch);
    expect(state.position.length()).toBe(0);
    controller.update(10, { ...keys, forward: true, sprint: true }, noJoystick, noTouch);
    expect(state.position.length()).toBeLessThan(0.43);
  });
});
