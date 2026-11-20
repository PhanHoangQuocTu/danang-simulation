import { describe, expect, it, vi } from 'vitest';
import { createCharacterController, type CharacterEnvironment } from '@/engine/character/controller';
import { createPlayerState } from '../runtime/world';
import { danangDemPilotGridInput } from '@/worlds/danang/data/danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';

const noJoystick = { x: 0, y: 0, magnitude: 0, active: false };
const noTouch = { sprint: false, sprintLatched: false, jump: false };
const keys = { forward: false, backward: false, left: false, right: false, sprint: false, jump: false };

function environment(): CharacterEnvironment {
  return { terrain: new GridDemProvider(danangDemPilotGridInput()), onLanding: vi.fn() };
}

describe('Phase 16 character grounding on real DEM terrain', () => {
  it('spawns grounded at the sampled DEM elevation and walks forward on the terrain', () => {
    const state = createPlayerState(environment().terrain);
    const controller = createCharacterController(state, environment());
    expect(state.isGrounded).toBe(true);
    expect(state.position.y).toBeGreaterThan(2);
    expect(state.position.y).toBeLessThan(26);
    for (let index = 0; index < 120; index++) {
      controller.update(1 / 60, { ...keys, forward: true }, noJoystick, noTouch);
    }
    expect(state.isGrounded).toBe(true);
    expect(state.position.z).toBeLessThan(-1);
    // The character stays on the terrain surface, not at a fixed Y.
    const support = environment().terrain.sampleSupportSurface(
      state.position.x,
      state.position.z,
      state.position.y,
      0.38
    );
    expect(support.status).toBe('ok');
    if (support.status === 'ok') {
      expect(state.surfaceHeight).toBeCloseTo(support.elevationMeters, 6);
      expect(state.position.y).toBeCloseTo(support.elevationMeters, 6);
    }
  });

  it('jumps and lands back on the DEM surface', () => {
    const state = createPlayerState(environment().terrain);
    const controller = createCharacterController(state, environment());
    const groundY = state.position.y;
    controller.update(1 / 60, { ...keys, jump: true }, noJoystick, noTouch);
    expect(state.isGrounded).toBe(false);
    expect(state.position.y).toBeGreaterThan(groundY);
    for (let index = 0; index < 120; index++) {
      controller.update(1 / 60, keys, noJoystick, noTouch);
    }
    expect(state.isGrounded).toBe(true);
    expect(state.position.y).toBeCloseTo(groundY, 3);
  });

  it('clamps the character to the 1500 m DEM boundary', () => {
    const state = createPlayerState(environment().terrain);
    const controller = createCharacterController(state, environment());
    state.position.set(2000, state.position.y, 0);
    controller.update(1 / 60, keys, noJoystick, noTouch);
    expect(Math.hypot(state.position.x, state.position.z)).toBeLessThanOrEqual(1500.000001);
  });
});
