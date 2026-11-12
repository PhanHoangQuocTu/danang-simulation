export interface Disposable {
  dispose(): void;
}

/** Tracks only owned resources. Shared borrowed resources must not be registered here. */
export class ResourceScope {
  private readonly resources = new Set<Disposable>();
  private disposed = false;

  own<T extends Disposable>(resource: T): T {
    if (this.disposed) throw new Error('Resource scope is disposed');
    this.resources.add(resource);
    return resource;
  }

  dispose(): void {
    if (this.disposed) return;
    this.disposed = true;
    const errors: unknown[] = [];
    for (const resource of Array.from(this.resources).reverse()) {
      try {
        resource.dispose();
      } catch (error) {
        errors.push(error);
      }
    }
    this.resources.clear();
    if (errors.length) throw new AggregateError(errors, 'Resource cleanup failed');
  }
}
