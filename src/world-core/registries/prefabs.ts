import { manifestSchema, type ElementInstance, type PrefabDefinition } from '../schemas/manifest';

export interface ElementHandle {
  dispose(): void;
}

export type ElementFactory = (element: ElementInstance, prefab: PrefabDefinition) => ElementHandle;

/** Owns created instances; shared assets remain owned by the caller's asset cache. */
export class PrefabRegistry {
  private readonly factories = new Map<string, ElementFactory>();

  register(id: string, factory: ElementFactory): void {
    if (!id.trim() || this.factories.has(id)) throw new Error(`Invalid or duplicate factory: ${id}`);
    this.factories.set(id, factory);
  }

  loadZone(rawManifest: unknown, zoneId: string): ElementHandle {
    const manifest = manifestSchema.parse(rawManifest);
    const zone = manifest.zones.find((entry) => entry.id === zoneId);
    if (!zone) throw new Error(`Unknown zone: ${zoneId}`);
    const handles: ElementHandle[] = [];
    let disposed = false;
    const dispose = () => {
      if (disposed) return;
      disposed = true;
      const errors: unknown[] = [];
      for (const handle of handles.reverse()) {
        try {
          handle.dispose();
        } catch (error) {
          errors.push(error);
        }
      }
      if (errors.length) throw new AggregateError(errors, 'Zone cleanup failed');
    };
    try {
      for (const element of zone.elements) {
        const prefab = manifest.prefabs.find((entry) => entry.id === element.prefabId);
        const factory = this.factories.get(element.prefabId);
        if (!prefab || !factory) throw new Error(`Missing factory: ${element.prefabId}`);
        handles.push(factory(element, prefab));
      }
    } catch (error) {
      try {
        dispose();
      } catch (cleanupError) {
        throw new AggregateError([error, cleanupError], 'Zone creation and rollback failed');
      }
      throw error;
    }
    return { dispose };
  }
}
