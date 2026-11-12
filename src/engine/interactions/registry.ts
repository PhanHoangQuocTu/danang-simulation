import * as THREE from 'three';
import { GAME_CONFIG } from '../core/const';
import type { InteractableDefinition, RegisteredInteractableEntry, InteractionEligibilityStatus } from '../core/type';
export class InteractableRegistry {
  private entries = new Map<string, RegisteredInteractableEntry>();

  public register(
    definition: InteractableDefinition,
    object3D: THREE.Object3D,
    highlightMeshes: THREE.Mesh[]
  ): RegisteredInteractableEntry {
    if (!definition?.id || typeof definition.id !== 'string') {
      throw new Error('Invalid InteractableDefinition: stable id is required');
    }
    const safeMaxDist =
      Number.isFinite(definition.maxDistance) && definition.maxDistance > 0.5
        ? definition.maxDistance
        : GAME_CONFIG.interaction.defaultMaxDistance;

    const normalizedDef: InteractableDefinition = {
      ...definition,
      maxDistance: safeMaxDist,
      enabled: Boolean(definition.enabled),
    };

    const existing = this.entries.get(normalizedDef.id);
    if (existing) {
      this.restoreOriginalMaterial(existing);
    }

    highlightMeshes.forEach((mesh) => {
      mesh.userData.interactableId = normalizedDef.id;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat?.emissive && mesh.userData.baseEmissiveHex === undefined) {
        mesh.userData.baseEmissiveHex = mat.emissive.getHex();
        mesh.userData.baseEmissiveIntensity = mat.emissiveIntensity ?? 0;
      }
    });

    const anchor = new THREE.Vector3(
      normalizedDef.worldPosition[0],
      normalizedDef.worldPosition[1],
      normalizedDef.worldPosition[2]
    );

    const entry: RegisteredInteractableEntry = {
      definition: normalizedDef,
      object3D,
      highlightMeshes,
      worldAnchor: anchor,
      isActivated: existing ? existing.isActivated : false,
      interactionCount: existing ? existing.interactionCount : 0,
    };

    this.entries.set(normalizedDef.id, entry);
    return entry;
  }

  public unregister(id: string): boolean {
    const existing = this.entries.get(id);
    if (!existing) return false;
    this.restoreOriginalMaterial(existing);
    existing.highlightMeshes.forEach((m) => {
      delete m.userData.interactableId;
    });
    return this.entries.delete(id);
  }

  public setEnabled(id: string, enabled: boolean): boolean {
    const entry = this.entries.get(id);
    if (!entry) return false;
    entry.definition.enabled = Boolean(enabled);
    if (!enabled) {
      this.restoreOriginalMaterial(entry);
    }
    return true;
  }

  public get(id: string): RegisteredInteractableEntry | undefined {
    return this.entries.get(id);
  }

  public getAll(): RegisteredInteractableEntry[] {
    return Array.from(this.entries.values());
  }

  public getCandidateMeshes(): THREE.Mesh[] {
    const list: THREE.Mesh[] = [];
    this.entries.forEach((entry) => {
      if (entry.definition.enabled && entry.object3D.visible) {
        for (const mesh of entry.highlightMeshes) {
          list.push(mesh);
        }
      }
    });
    return list;
  }

  public applyHighlight(targetId: string | null, status: InteractionEligibilityStatus): void {
    this.entries.forEach((entry, id) => {
      if (id !== targetId || status === 'idle' || status === 'disabled') {
        this.restoreOriginalMaterial(entry);
        return;
      }

      const isEligible = status === 'eligible';
      const highlightHex = isEligible ? 0x38bdf8 : 0xf59e0b;
      const highlightIntensity = isEligible ? 0.85 : 0.32;

      entry.highlightMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat?.emissive) {
          mat.emissive.setHex(highlightHex);
          mat.emissiveIntensity = highlightIntensity;
        }
      });
    });
  }

  public restoreOriginalMaterial(entry: RegisteredInteractableEntry): void {
    entry.highlightMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat?.emissive && mesh.userData.baseEmissiveHex !== undefined) {
        if (entry.definition.type === 'activate' && entry.isActivated) {
          mat.emissive.setHex(0x10b981);
          mat.emissiveIntensity = 0.72;
        } else {
          mat.emissive.setHex(mesh.userData.baseEmissiveHex);
          mat.emissiveIntensity = mesh.userData.baseEmissiveIntensity ?? 0;
        }
      }
    });
  }

  public toggleActivated(id: string): boolean {
    const entry = this.entries.get(id);
    if (!entry) return false;
    entry.isActivated = !entry.isActivated;
    entry.interactionCount += 1;
    this.restoreOriginalMaterial(entry);
    return entry.isActivated;
  }

  public recordInteraction(id: string): number {
    const entry = this.entries.get(id);
    if (!entry) return 0;
    entry.interactionCount += 1;
    return entry.interactionCount;
  }

  public clear(): void {
    this.entries.forEach((entry) => {
      this.restoreOriginalMaterial(entry);
    });
    this.entries.clear();
  }
}

export function evaluateInteractionDistanceAndEligibility(
  playerPos: { x: number; y: number; z: number },
  entry: RegisteredInteractableEntry,
  isOccluded: boolean
): { distanceMeters: number; status: InteractionEligibilityStatus } {
  if (!entry.definition.enabled) {
    return { distanceMeters: Number.POSITIVE_INFINITY, status: 'disabled' };
  }
  const dx = (Number.isFinite(playerPos.x) ? playerPos.x : 0) - entry.worldAnchor.x;
  const dy = (Number.isFinite(playerPos.y) ? playerPos.y : 0) - entry.worldAnchor.y;
  const dz = (Number.isFinite(playerPos.z) ? playerPos.z : 0) - entry.worldAnchor.z;
  const dist = Math.hypot(dx, dy, dz);

  if (!Number.isFinite(dist)) {
    return { distanceMeters: Number.POSITIVE_INFINITY, status: 'out-of-range' };
  }
  if (isOccluded) {
    return { distanceMeters: Number(dist.toFixed(2)), status: 'occluded' };
  }
  if (dist <= entry.definition.maxDistance) {
    return { distanceMeters: Number(dist.toFixed(2)), status: 'eligible' };
  }
  return { distanceMeters: Number(dist.toFixed(2)), status: 'out-of-range' };
}
