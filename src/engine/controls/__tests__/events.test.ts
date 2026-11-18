import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindWorldInput } from '../events';
import { createPlayerState } from '@/modules/WorldExplorer/runtime/world';

const cleanups: (() => void)[] = [];
afterEach(() => {
  Reflect.deleteProperty(document, 'pointerLockElement');
  for (const cleanup of cleanups.splice(0)) cleanup();
  Reflect.deleteProperty(document, 'pointerLockElement');
  document.body.replaceChildren();
});
function setup() {
  const canvas = document.createElement('canvas');
  canvas.tabIndex = 0;
  document.body.append(canvas);
  const keyboard = { forward: false, backward: false, left: false, right: false, sprint: false, jump: false };
  let blocked = false;
  const command = vi.fn();
  const release = vi.fn();
  const zoom = vi.fn();
  const state = createPlayerState();
  const binding = bindWorldInput(canvas, state, keyboard, {
    blocked: () => blocked,
    command,
    release,
    zoom,
    device: vi.fn(),
  });
  cleanups.push(() => binding.dispose());
  return {
    keyboard,
    canvas,
    state,
    command,
    release,
    zoom,
    binding,
    block() {
      blocked = true;
      binding.release();
    },
  };
}
const key = (type: string, code: string, target: EventTarget = window) =>
  target.dispatchEvent(new KeyboardEvent(type, { code, bubbles: true, cancelable: true }));
describe('input lifecycle', () => {
  it('IMG-48 skips capture on a locked second click and releases mouse drag on blur', () => {
    const { canvas, binding } = setup();
    const capture = vi.fn();
    const release = vi.fn();
    canvas.setPointerCapture = capture;
    canvas.hasPointerCapture = () => true;
    canvas.releasePointerCapture = release;
    const down = () => {
      const event = new Event('pointerdown');
      Object.defineProperties(event, {
        pointerType: { value: 'mouse' },
        pointerId: { value: 1 },
        button: { value: 0 },
      });
      canvas.dispatchEvent(event);
    };
    Object.defineProperty(document, 'pointerLockElement', { configurable: true, value: canvas });
    down();
    expect(capture).not.toHaveBeenCalled();
    Reflect.deleteProperty(document, 'pointerLockElement');
    down();
    expect(capture).toHaveBeenCalledWith(1);
    binding.release();
    expect(release).toHaveBeenCalledWith(1);
  });
  it('orbits and tilts the camera from the keyboard without moving the player', () => {
    const { state, keyboard } = setup();
    const pitch = state.cameraPitch;
    key('keydown', 'KeyJ');
    expect(state.cameraYaw).toBeGreaterThan(0);
    key('keydown', 'KeyL');
    expect(state.cameraYaw).toBeCloseTo(0);
    key('keydown', 'KeyI');
    expect(state.cameraPitch).toBeGreaterThan(pitch);
    key('keydown', 'KeyK');
    expect(state.cameraPitch).toBeCloseTo(pitch);
    expect(Object.values(keyboard).some(Boolean)).toBe(false);
  });
  it('keeps keyboard camera tilt within the pointer camera limits', () => {
    const { state } = setup();
    for (let i = 0; i < 100; i++) key('keydown', 'KeyI');
    expect(state.cameraPitch).toBe(1.25);
    const upper = state.cameraPitch;
    key('keydown', 'KeyI');
    expect(state.cameraPitch).toBe(upper);
    for (let i = 0; i < 100; i++) key('keydown', 'KeyK');
    expect(state.cameraPitch).toBeLessThan(upper);
    const lower = state.cameraPitch;
    expect(lower).toBe(-0.18);
    key('keydown', 'KeyK');
    expect(state.cameraPitch).toBe(lower);
  });
  it('zooms the camera with Page Up and Page Down', () => {
    const { zoom } = setup();
    key('keydown', 'PageUp');
    expect(zoom).toHaveBeenLastCalledWith(expect.any(Number));
    expect(zoom.mock.calls[0][0]).toBeLessThan(0);
    key('keydown', 'PageDown');
    expect(zoom.mock.calls[1][0]).toBeGreaterThan(0);
  });
  it('does not change the camera while typing, using modifiers, or blocked', () => {
    const { state, zoom, block, canvas } = setup();
    const pitch = state.cameraPitch;
    const input = document.createElement('input');
    document.body.append(input);
    input.focus();
    key('keydown', 'KeyJ', input);
    key('keydown', 'PageUp', input);
    canvas.focus();
    for (const modifier of ['ctrlKey', 'altKey', 'metaKey']) {
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyI', [modifier]: true }));
      window.dispatchEvent(new KeyboardEvent('keydown', { code: 'PageUp', [modifier]: true }));
    }
    block();
    key('keydown', 'KeyJ');
    key('keydown', 'PageUp');
    expect(state.cameraYaw).toBe(0);
    expect(state.cameraPitch).toBe(pitch);
    expect(zoom).not.toHaveBeenCalled();
  });
  it('retains movement when one overlapping mapping is released', () => {
    const { keyboard } = setup();
    key('keydown', 'KeyW');
    key('keydown', 'ArrowUp');
    key('keyup', 'KeyW');
    expect(keyboard.forward).toBe(true);
    key('keyup', 'ArrowUp');
    expect(keyboard.forward).toBe(false);
  });
  it('keeps both Shift keys independent', () => {
    const { keyboard } = setup();
    key('keydown', 'ShiftLeft');
    key('keydown', 'ShiftRight');
    key('keyup', 'ShiftLeft');
    expect(keyboard.sprint).toBe(true);
    key('keyup', 'ShiftRight');
    expect(keyboard.sprint).toBe(false);
  });
  it('clears pressed keys on blur and does not retain listeners after disposal', () => {
    const { keyboard, binding, release } = setup();
    key('keydown', 'KeyW');
    window.dispatchEvent(new Event('blur'));
    expect(keyboard.forward).toBe(false);
    expect(release).toHaveBeenCalled();
    binding.dispose();
    key('keydown', 'KeyW');
    expect(keyboard.forward).toBe(false);
  });
  it('ignores typing and blocked gameplay', () => {
    const { keyboard, block, command } = setup();
    const input = document.createElement('input');
    document.body.append(input);
    input.focus();
    key('keydown', 'KeyW', input);
    key('keydown', 'KeyE', input);
    expect(keyboard.forward).toBe(false);
    expect(command).not.toHaveBeenCalled();
    input.blur();
    block();
    key('keydown', 'Space');
    expect(keyboard.jump).toBe(false);
  });
  it('releases movement when focus enters a real input', () => {
    const { keyboard } = setup();
    key('keydown', 'KeyW');
    const input = document.createElement('input');
    document.body.append(input);
    input.focus();
    expect(keyboard.forward).toBe(false);
  });
  it('routes Escape while gameplay is blocked', () => {
    const { block, command } = setup();
    block();
    key('keydown', 'Escape');
    expect(command).toHaveBeenCalledWith('escape');
  });
  it('does not repeat interaction hotkeys', () => {
    const { command } = setup();
    key('keydown', 'KeyE');
    window.dispatchEvent(new KeyboardEvent('keydown', { code: 'KeyE', repeat: true }));
    expect(command).toHaveBeenCalledTimes(1);
  });
});
