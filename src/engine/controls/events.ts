import { GAME_CONFIG } from '../core/const';
import type { KeyboardInputState, PlayerRuntimeState } from '../core/type';
import { isInteractiveInputElement } from './input';

export type WorldCommand = 'interact' | 'environment' | 'map' | 'follow' | 'guide' | 'reset' | 'debug' | 'escape';

/** One keyboard owner, independent pointer identities, and deterministic release on focus loss. */
export function bindWorldInput(
  canvas: HTMLCanvasElement,
  state: PlayerRuntimeState,
  keyboard: KeyboardInputState,
  options: {
    blocked(): boolean;
    command(command: WorldCommand): void;
    device(pointer: 'mouse' | 'touch' | 'keyboard'): void;
    zoom(delta: number): void;
    release(): void;
  }
) {
  const pressed = new Set<string>();
  const touches = new Map<number, { x: number; y: number }>();
  let mouseId: number | null = null;
  let pinch: number | null = null;
  const listeners: (() => void)[] = [];
  const listen = (target: EventTarget, name: string, callback: EventListener, passive = true) => {
    target.addEventListener(name, callback, { passive });
    listeners.push(() => target.removeEventListener(name, callback));
  };
  const sync = () => {
    keyboard.forward = pressed.has('KeyW') || pressed.has('ArrowUp');
    keyboard.backward = pressed.has('KeyS') || pressed.has('ArrowDown');
    keyboard.left = pressed.has('KeyA') || pressed.has('ArrowLeft');
    keyboard.right = pressed.has('KeyD') || pressed.has('ArrowRight');
    keyboard.sprint = pressed.has('ShiftLeft') || pressed.has('ShiftRight');
    keyboard.jump = pressed.has('Space');
  };
  const release = () => {
    pressed.clear();
    sync();
    mouseId = null;
    pinch = null;
    for (const id of touches.keys()) {
      if (canvas.hasPointerCapture?.(id)) canvas.releasePointerCapture(id);
    }
    touches.clear();
    options.release();
  };
  const codes = new Set([
    'KeyW',
    'KeyA',
    'KeyS',
    'KeyD',
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ShiftLeft',
    'ShiftRight',
    'Space',
  ]);
  listen(
    window,
    'keydown',
    ((event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        options.command('escape');
        return;
      }
      if (
        options.blocked() ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        isInteractiveInputElement(event.target) ||
        isInteractiveInputElement(document.activeElement)
      )
        return;
      const commands: Record<string, WorldCommand> = {
        KeyE: event.shiftKey ? 'environment' : 'interact',
        KeyF: 'follow',
        KeyM: 'map',
        KeyH: 'guide',
        KeyR: 'reset',
        F3: 'debug',
      };
      const command = commands[event.code];
      if (command) {
        event.preventDefault();
        if (!event.repeat) options.command(command);
        return;
      }
      if (codes.has(event.code)) {
        event.preventDefault();
        pressed.add(event.code);
        sync();
        options.device('keyboard');
      }
    }) as EventListener,
    false
  );
  listen(window, 'keyup', ((event: KeyboardEvent) => {
    pressed.delete(event.code);
    sync();
  }) as EventListener);
  listen(window, 'blur', release);
  listen(document, 'focusin', (() => {
    if (isInteractiveInputElement(document.activeElement)) release();
  }) as EventListener);
  listen(document, 'pointerlockchange', () => {
    state.isPointerLocked = document.pointerLockElement === canvas;
  });
  listen(canvas, 'pointerdown', ((event: PointerEvent) => {
    if (options.blocked() || event.button > 0) return;
    canvas.focus();
    options.device(event.pointerType === 'touch' ? 'touch' : 'mouse');
    canvas.setPointerCapture?.(event.pointerId);
    if (event.pointerType === 'mouse') {
      mouseId = event.pointerId;
      return;
    }
    touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (touches.size === 2) {
      const [a, b] = Array.from(touches.values());
      pinch = Math.hypot(a.x - b.x, a.y - b.y);
    }
  }) as EventListener);
  const orbit = (dx: number, dy: number, sensitivity: number) => {
    state.cameraYaw -= dx * sensitivity;
    state.cameraPitch = Math.max(
      GAME_CONFIG.camera.minPitch,
      Math.min(GAME_CONFIG.camera.maxPitch, state.cameraPitch + dy * sensitivity)
    );
  };
  listen(canvas, 'pointermove', ((event: PointerEvent) => {
    if (options.blocked()) return;
    if (event.pointerType === 'mouse') {
      if (mouseId === event.pointerId && !state.isPointerLocked)
        orbit(event.movementX, event.movementY, GAME_CONFIG.camera.mouseSensitivity);
      return;
    }
    const point = touches.get(event.pointerId);
    if (!point) return;
    const dx = event.clientX - point.x;
    const dy = event.clientY - point.y;
    point.x = event.clientX;
    point.y = event.clientY;
    if (touches.size === 1) orbit(dx, dy, GAME_CONFIG.camera.touchSensitivity);
    else {
      const [a, b] = Array.from(touches.values());
      const next = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinch !== null) options.zoom((pinch - next) * 0.025);
      pinch = next;
    }
  }) as EventListener);
  listen(document, 'mousemove', ((event: MouseEvent) => {
    if (state.isPointerLocked && !options.blocked())
      orbit(event.movementX, event.movementY, GAME_CONFIG.camera.mouseSensitivity);
  }) as EventListener);
  const pointerUp = ((event: PointerEvent) => {
    touches.delete(event.pointerId);
    if (mouseId === event.pointerId) mouseId = null;
    if (touches.size < 2) pinch = null;
  }) as EventListener;
  for (const name of ['pointerup', 'pointercancel', 'lostpointercapture']) listen(canvas, name, pointerUp);
  listen(canvas, 'click', ((event: MouseEvent) => {
    if (
      options.blocked() ||
      event.detail === 0 ||
      touches.size ||
      !canvas.requestPointerLock ||
      document.pointerLockElement === canvas
    )
      return;
    // Touch-generated clicks must never request pointer lock.
    if ((event as PointerEvent).pointerType === 'touch') return;
    try {
      const result = canvas.requestPointerLock();
      result?.catch(() => {
        /* Drag remains available when pointer lock is denied. */
      });
    } catch {
      /* Drag remains available. */
    }
  }) as EventListener);
  listen(
    canvas,
    'wheel',
    ((event: WheelEvent) => {
      event.preventDefault();
      if (!options.blocked()) options.zoom(Math.sign(event.deltaY) * GAME_CONFIG.camera.zoomStep);
    }) as EventListener,
    false
  );
  return {
    release,
    dispose() {
      release();
      for (const remove of listeners.reverse()) remove();
      if (document.pointerLockElement === canvas) document.exitPointerLock();
    },
  };
}
