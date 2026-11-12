import * as THREE from 'three';
interface DustParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  age: number;
  maxAge: number;
  active: boolean;
}

export function createFootstepParticleSystem(scene: THREE.Scene) {
  const pool: DustParticle[] = [];
  const geo = new THREE.SphereGeometry(0.11, 6, 6);
  const baseMat = new THREE.MeshBasicMaterial({
    color: 0xd6d3d1,
    transparent: true,
    opacity: 0.55,
  });

  for (let i = 0; i < 24; i++) {
    const mesh = new THREE.Mesh(geo, baseMat.clone());
    mesh.visible = false;
    scene.add(mesh);
    pool.push({
      mesh,
      velocity: new THREE.Vector3(),
      age: 0,
      maxAge: 0.45,
      active: false,
    });
  }

  const spawnBurst = (x: number, y: number, z: number, count: number) => {
    let spawned = 0;
    for (let i = 0; i < pool.length && spawned < count; i++) {
      const p = pool[i];
      if (!p.active) {
        p.active = true;
        p.age = 0;
        p.maxAge = 0.35 + Math.random() * 0.25;
        p.mesh.position.set(x + (Math.random() - 0.5) * 0.35, y + 0.06, z + (Math.random() - 0.5) * 0.35);
        p.mesh.scale.setScalar(0.6 + Math.random() * 0.5);
        p.velocity.set((Math.random() - 0.5) * 1.4, 0.6 + Math.random() * 0.9, (Math.random() - 0.5) * 1.4);
        p.mesh.visible = true;
        spawned++;
      }
    }
  };

  const update = (dt: number) => {
    for (const p of pool) {
      if (!p.active) continue;
      p.age += dt;
      if (p.age >= p.maxAge) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);
      const progress = p.age / p.maxAge;
      p.mesh.scale.setScalar(0.7 + progress * 1.3);
      const mat = p.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - progress) * 0.45;
    }
  };

  return { spawnBurst, update };
}
