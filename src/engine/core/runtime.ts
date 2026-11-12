export interface FrameScheduler {
  request(callback: (timestampMs: number) => void): number;
  cancel(handle: number): void;
}

export interface RuntimeSystem {
  update(deltaSeconds: number, timestampMs: number): void;
  dispose(): void;
}

/** Owns systems and one frame loop. Browser scheduling is injected at the client boundary. */
export class EngineRuntime {
  private handle: number | null = null;
  private previousTimestamp: number | null = null;
  private running = false;
  private disposed = false;

  constructor(
    private readonly scheduler: FrameScheduler,
    private readonly systems: readonly RuntimeSystem[],
    private readonly onError: (error: unknown) => void,
    private readonly maxDeltaSeconds = 0.05
  ) {
    if (!Number.isFinite(maxDeltaSeconds) || maxDeltaSeconds <= 0) {
      throw new Error('Invalid maximum frame delta');
    }
  }

  start(): void {
    if (this.disposed) throw new Error('Runtime is disposed');
    if (this.running) return;
    this.running = true;
    this.previousTimestamp = null;
    this.handle = this.scheduler.request(this.frame);
  }

  stop(): void {
    this.running = false;
    if (this.handle !== null) this.scheduler.cancel(this.handle);
    this.handle = null;
    this.previousTimestamp = null;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.stop();
    const errors: unknown[] = [];
    for (let index = this.systems.length - 1; index >= 0; index--) {
      try {
        this.systems[index].dispose();
      } catch (error) {
        errors.push(error);
      }
    }
    for (const error of errors) this.onError(error);
  }

  private readonly frame = (timestampMs: number): void => {
    this.handle = null;
    if (!this.running || this.disposed) return;
    if (!Number.isFinite(timestampMs)) {
      this.stop();
      this.onError(new Error('Invalid frame timestamp'));
      return;
    }
    const delta = this.previousTimestamp === null ? 0 : (timestampMs - this.previousTimestamp) / 1000;
    this.previousTimestamp = timestampMs;
    try {
      for (const system of this.systems) {
        if (!this.running || this.disposed) break;
        system.update(Math.min(Math.max(delta, 0), this.maxDeltaSeconds), timestampMs);
      }
    } catch (error) {
      this.stop();
      this.onError(error);
      return;
    }
    if (this.running && !this.disposed) this.handle = this.scheduler.request(this.frame);
  };
}
