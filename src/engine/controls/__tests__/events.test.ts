import { afterEach, describe, expect, it, vi } from 'vitest';
import { bindWorldInput } from '../events';
import { createPlayerState } from '@/modules/WorldExplorer/runtime/world';

const cleanups: (() => void)[] = [];
afterEach(() => {
  for (const cleanup of cleanups.splice(0)) cleanup();
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
  const state = createPlayerState();
  const binding = bindWorldInput(canvas, state, keyboard, {
    blocked: () => blocked,
    command,
    release,
    zoom: vi.fn(),
    device: vi.fn(),
  });
  cleanups.push(() => binding.dispose());
  return {
    keyboard,
    canvas,
    state,
    command,
    release,
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
