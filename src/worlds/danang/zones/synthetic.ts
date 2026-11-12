import * as THREE from 'three';
import type { PlatformCollider, CylinderCollider } from '@/engine/core/type';
export const PLATFORM_COLLIDERS: PlatformCollider[] = [
  { id: 'step-1', x: 7.5, z: -6.0, width: 3.4, depth: 3.4, topY: 0.45, baseY: -0.5, color: 0x64748b },
  { id: 'step-2', x: 11.5, z: -6.0, width: 3.6, depth: 3.6, topY: 1.0, baseY: -0.5, color: 0x475569 },
  { id: 'step-3', x: 15.8, z: -6.0, width: 4.0, depth: 4.0, topY: 1.6, baseY: -0.5, color: 0x334155 },
  { id: 'step-4', x: 15.8, z: -11.2, width: 4.6, depth: 4.6, topY: 2.2, baseY: -0.5, color: 0x475569 },
  { id: 'overlook', x: 10.5, z: -12.0, width: 5.5, depth: 4.5, topY: 2.75, baseY: -0.5, color: 0x1e293b },
];

export const ROCK_COLLIDERS: CylinderCollider[] = [
  { x: -9.5, z: -7.5, radius: 1.6, height: 1.8 },
  { x: -14.0, z: 5.5, radius: 2.2, height: 2.5 },
  { x: 6.5, z: 11.0, radius: 1.5, height: 1.6 },
  { x: -6.5, z: 16.5, radius: 2.0, height: 2.1 },
  { x: 19.0, z: 7.5, radius: 2.4, height: 2.8 },
  { x: -19.5, z: -14.5, radius: 2.6, height: 3.0 },
  { x: 3.0, z: -20.0, radius: 1.9, height: 2.2 },
  { x: 23.0, z: -17.0, radius: 2.3, height: 2.6 },
];

export const TREE_COLLIDERS: CylinderCollider[] = [
  { x: -7.5, z: -13.0, radius: 0.48, height: 5.0 },
  { x: -13.5, z: -4.0, radius: 0.52, height: 5.5 },
  { x: -11.0, z: 11.0, radius: 0.48, height: 5.0 },
  { x: -4.5, z: 13.5, radius: 0.45, height: 4.8 },
  { x: 11.5, z: 8.5, radius: 0.52, height: 5.4 },
  { x: 16.5, z: 3.0, radius: 0.48, height: 5.0 },
  { x: 19.5, z: -2.0, radius: 0.52, height: 5.2 },
  { x: 6.0, z: -17.5, radius: 0.48, height: 5.0 },
  { x: -17.5, z: -19.0, radius: 0.55, height: 6.0 },
  { x: -23.0, z: 2.0, radius: 0.55, height: 5.8 },
  { x: -19.0, z: 18.5, radius: 0.52, height: 5.5 },
  { x: 2.5, z: 23.0, radius: 0.5, height: 5.2 },
  { x: 17.0, z: 19.0, radius: 0.55, height: 5.8 },
  { x: 26.0, z: 11.0, radius: 0.52, height: 5.4 },
  { x: 27.0, z: -9.5, radius: 0.55, height: 6.0 },
  { x: 15.0, z: -23.5, radius: 0.5, height: 5.2 },
  { x: -4.0, z: -25.0, radius: 0.52, height: 5.4 },
  { x: -26.0, z: -9.5, radius: 0.55, height: 5.8 },
];

export function getTerrainElevation(x: number, z: number): number {
  const distFromOrigin = Math.hypot(x, z);
  const spawnFlatten = THREE.MathUtils.smoothstep(distFromOrigin, 5.5, 17.0);
  const rollingHills = Math.sin(x * 0.055) * Math.cos(z * 0.055) * 1.35 + Math.sin(x * 0.13 + z * 0.09) * 0.42;
  const outerRim = THREE.MathUtils.smoothstep(distFromOrigin, 38.0, 68.0) * 3.2;
  return (rollingHills + outerRim) * spawnFlatten;
}

export function getSupportSurfaceHeight(x: number, z: number, currentY: number, playerRadius: number): number {
  let highestY = getTerrainElevation(x, z);
  for (const p of PLATFORM_COLLIDERS) {
    const halfW = p.width / 2 + playerRadius * 0.72;
    const halfD = p.depth / 2 + playerRadius * 0.72;
    if (Math.abs(x - p.x) <= halfW && Math.abs(z - p.z) <= halfD && currentY >= p.topY - 0.68) {
      if (p.topY > highestY) highestY = p.topY;
    }
  }
  return highestY;
}

export function resolveHorizontalCollisions(
  nextX: number,
  nextZ: number,
  currentY: number,
  playerRadius: number
): { x: number; z: number } {
  let rx = nextX;
  let rz = nextZ;

  for (const p of PLATFORM_COLLIDERS) {
    if (currentY < p.topY - 0.25) {
      const halfW = p.width / 2 + playerRadius;
      const halfD = p.depth / 2 + playerRadius;
      const dx = rx - p.x;
      const dz = rz - p.z;
      if (Math.abs(dx) < halfW && Math.abs(dz) < halfD) {
        const overlapX = halfW - Math.abs(dx);
        const overlapZ = halfD - Math.abs(dz);
        if (overlapX < overlapZ) {
          rx += dx > 0 ? overlapX : -overlapX;
        } else {
          rz += dz > 0 ? overlapZ : -overlapZ;
        }
      }
    }
  }

  const allCylinders = [...ROCK_COLLIDERS, ...TREE_COLLIDERS];
  for (const c of allCylinders) {
    const minDist = c.radius + playerRadius;
    const dx = rx - c.x;
    const dz = rz - c.z;
    const distSq = dx * dx + dz * dz;
    if (distSq < minDist * minDist && distSq > 0.00001) {
      const dist = Math.sqrt(distSq);
      const push = minDist - dist;
      rx += (dx / dist) * push;
      rz += (dz / dist) * push;
    }
  }

  return { x: rx, z: rz };
}
