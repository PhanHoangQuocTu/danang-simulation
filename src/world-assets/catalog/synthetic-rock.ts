import { DodecahedronGeometry, Mesh, MeshStandardMaterial, type Group } from 'three';
import { ResourceScope } from '@/engine/core/resources';
import type { ElementFactory } from '@/world-core/registries/prefabs';

/** Synthetic Phase 1 rock kit. One catalog owns the shared geometry and material. */
export function createSyntheticRockCatalog(parent: Group) {
  const scope = new ResourceScope();
  const geometry = scope.own(new DodecahedronGeometry(1, 1));
  const material = scope.own(new MeshStandardMaterial({ color: 0x64748b, roughness: 0.82, metalness: 0.08 }));
  const instances = new Set<Mesh>();
  let disposed = false;
  const factory: ElementFactory = (element) => {
    if (disposed) throw new Error('Catalog is disposed');
    const mesh = new Mesh(geometry, material);
    mesh.name = element.id;
    mesh.position.fromArray(element.transform.position);
    mesh.rotation.set(...element.transform.rotation);
    mesh.scale.fromArray(element.transform.scale);
    mesh.userData.sourceId = element.sourceId;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    instances.add(mesh);
    return {
      dispose() {
        mesh.removeFromParent();
        instances.delete(mesh);
      },
    };
  };
  return {
    factory,
    dispose() {
      if (disposed) return;
      disposed = true;
      for (const mesh of instances) mesh.removeFromParent();
      instances.clear();
      scope.dispose();
    },
  };
}
