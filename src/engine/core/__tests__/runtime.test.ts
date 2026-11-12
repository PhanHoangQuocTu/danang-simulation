import { describe, expect, it, vi } from 'vitest';
import { EngineRuntime, type FrameScheduler, type RuntimeSystem } from '../runtime';

function setup(systems: RuntimeSystem[] = []) {
  let callback: (time: number) => void = vi.fn();
  const scheduler: FrameScheduler = {
    request: vi.fn((next) => {
      callback = next;
      return 1;
    }),
    cancel: vi.fn(),
  };
  const onError = vi.fn();
  const runtime = new EngineRuntime(scheduler, systems, onError);
  return { runtime, scheduler, onError, tick: (time: number) => callback(time) };
}

describe('EngineRuntime ownership', () => {
  it('runs one loop, clamps suspended frames and resets time when restarted', () => {
    const system = { update: vi.fn(), dispose: vi.fn() };
    const { runtime, scheduler, tick } = setup([system]);
    runtime.start();
    runtime.start();
    expect(scheduler.request).toHaveBeenCalledTimes(1);
    tick(100);
    tick(10100);
    expect(system.update.mock.calls.map((call) => call[0])).toEqual([0, 0.05]);
    runtime.stop();
    runtime.start();
    tick(20100);
    expect(system.update).toHaveBeenLastCalledWith(0, 20100);
    runtime.dispose();
    expect(() => runtime.start()).toThrow('disposed');
  });

  it('cleans every system in reverse order even after a disposal failure', () => {
    const order: number[] = [];
    const { runtime, onError } = setup([
      {
        update: vi.fn(),
        dispose() {
          order.push(1);
        },
      },
      {
        update: vi.fn(),
        dispose() {
          order.push(2);
          throw new Error('cleanup');
        },
      },
    ]);
    runtime.dispose();
    runtime.dispose();
    expect(order).toEqual([2, 1]);
    expect(onError).toHaveBeenCalledTimes(1);
  });

  it('stops updates after a system disposes runtime during a frame', () => {
    const second = { update: vi.fn(), dispose: vi.fn() };
    const first = { update: () => runtime.dispose(), dispose: vi.fn() };
    const { runtime, tick, scheduler } = setup([first, second]);
    runtime.start();
    tick(0);
    expect(second.update).not.toHaveBeenCalled();
    expect(scheduler.request).toHaveBeenCalledTimes(1);
  });

  it('stops on update failure and reports the error', () => {
    const { runtime, tick, onError, scheduler } = setup([
      {
        update() {
          throw new Error('update');
        },
        dispose: vi.fn(),
      },
    ]);
    runtime.start();
    tick(0);
    tick(10);
    expect(onError).toHaveBeenCalledTimes(1);
    expect(scheduler.request).toHaveBeenCalledTimes(1);
    runtime.dispose();
  });
});
