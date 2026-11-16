import { describe, expect, it } from 'vitest';
import { Group, Mesh, BoxGeometry, MeshStandardMaterial, Color } from 'three';
import { InteractableRegistry, evaluateInteractionDistanceAndEligibility } from '../registry';
import { INITIAL_INTERACTABLE_FIXTURES } from '@/worlds/danang/zones/fixtures';

function fixture() {
  const registry = new InteractableRegistry();
  const group = new Group();
  const material = new MeshStandardMaterial({ emissive: new Color(0x112233), emissiveIntensity: 0.2 });
  const geometry = new BoxGeometry(1, 1, 1);
  const mesh = new Mesh(geometry, material);
  group.add(mesh);
  const entry = registry.register(
    { ...INITIAL_INTERACTABLE_FIXTURES[2], worldPosition: [0, 0, 0], maxDistance: 5 },
    group,
    [mesh]
  );
  return {
    registry,
    entry,
    mesh,
    material,
    dispose() {
      registry.clear();
      material.dispose();
      geometry.dispose();
    },
  };
}
describe('critical interaction states', () => {
  it('uses inclusive distance bounds and reports occlusion before range', () => {
    const f = fixture();
    try {
      expect(evaluateInteractionDistanceAndEligibility({ x: 5, y: 0, z: 0 }, f.entry, false).status).toBe('eligible');
      expect(evaluateInteractionDistanceAndEligibility({ x: 5.01, y: 0, z: 0 }, f.entry, false).status).toBe(
        'out-of-range'
      );
      expect(evaluateInteractionDistanceAndEligibility({ x: 2, y: 0, z: 0 }, f.entry, true).status).toBe('occluded');
    } finally {
      f.dispose();
    }
  });
  it('disabling removes candidate and restores highlight', () => {
    const f = fixture();
    try {
      f.registry.applyHighlight(f.entry.definition.id, 'eligible');
      expect(f.material.emissive.getHex()).toBe(0x38bdf8);
      f.registry.setEnabled(f.entry.definition.id, false);
      expect(f.registry.getCandidateMeshes()).toEqual([]);
      expect(f.material.emissive.getHex()).toBe(0x112233);
      expect(evaluateInteractionDistanceAndEligibility({ x: 0, y: 0, z: 0 }, f.entry, false).status).toBe('disabled');
    } finally {
      f.dispose();
    }
  });
  it('preserves activated material after highlight restoration and tracks counts', () => {
    const f = fixture();
    try {
      expect(f.registry.toggleActivated(f.entry.definition.id)).toBe(true);
      f.registry.applyHighlight(f.entry.definition.id, 'eligible');
      f.registry.applyHighlight(null, 'idle');
      expect(f.material.emissive.getHex()).toBe(0x10b981);
      expect(f.entry.interactionCount).toBe(1);
      expect(f.registry.toggleActivated(f.entry.definition.id)).toBe(false);
      expect(f.material.emissive.getHex()).toBe(0x112233);
      expect(f.entry.interactionCount).toBe(2);
    } finally {
      f.dispose();
    }
  });
  it('unregisters metadata and excludes invisible objects', () => {
    const f = fixture();
    try {
      f.entry.object3D.visible = false;
      expect(f.registry.getCandidateMeshes()).toEqual([]);
      expect(f.registry.unregister(f.entry.definition.id)).toBe(true);
      expect(f.mesh.userData.interactableId).toBeUndefined();
      expect(f.registry.unregister(f.entry.definition.id)).toBe(false);
    } finally {
      f.dispose();
    }
  });
  it('one fixture highlight never changes another fixture material', () => {
    const f = fixture();
    const other = new MeshStandardMaterial({ emissive: new Color(0x334455) });
    const mesh = new Mesh(f.mesh.geometry, other);
    try {
      f.registry.register({ ...INITIAL_INTERACTABLE_FIXTURES[0] }, new Group(), [mesh]);
      f.registry.applyHighlight(f.entry.definition.id, 'eligible');
      expect(other.emissive.getHex()).toBe(0x334455);
    } finally {
      f.dispose();
      other.dispose();
    }
  });
});
