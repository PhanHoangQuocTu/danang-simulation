import { describe, expect, it } from 'vitest';
import { MeshStandardMaterial } from 'three';
import { ResourceScope } from '@/engine/core/resources';
import { buildTerrainMesh } from '../terrain-mesh';
import { syntheticTerrainProvider } from '../zones/synthetic-terrain';
import { danangDemPilotGridInput } from '../data/danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';
import { syntheticElevation } from '../zones/synthetic-terrain';

function vertexY(mesh: ReturnType<typeof buildTerrainMesh>['mesh'], index: number): number {
  return (mesh.geometry.attributes.position as { getY: (i: number) => number }).getY(index);
}

describe('Phase 16 terrain mesh from the active provider', () => {
  it('builds the synthetic 180 m / 128-segment mesh with provider elevations', () => {
    const scope = new ResourceScope();
    try {
      const { mesh, sizeXMeters, sizeZMeters, segmentsX, segmentsZ } = buildTerrainMesh(
        scope,
        syntheticTerrainProvider,
        scope.own(new MeshStandardMaterial())
      );
      expect(sizeXMeters).toBe(180);
      expect(sizeZMeters).toBe(180);
      expect(segmentsX).toBe(128);
      expect(segmentsZ).toBe(128);
      const positions = mesh.geometry.attributes.position;
      expect(positions.count).toBe(129 * 129);
      // Vertex at the centre of the plane is the synthetic spawn: Y = 0.
      const centreIndex = 64 * 129 + 64;
      expect(vertexY(mesh, centreIndex)).toBeCloseTo(syntheticElevation(0, 0), 6);
      // A vertex on the north-east rim follows the synthetic formula.
      const cornerIndex = 128 * 129 + 128;
      expect(vertexY(mesh, cornerIndex)).toBeCloseTo(syntheticElevation(90, 90), 4);
      expect(mesh.geometry.attributes.normal.count).toBe(129 * 129);
      expect(mesh.receiveShadow).toBe(true);
    } finally {
      scope.dispose();
    }
  });

  it('builds the DEM mesh from the real pilot grid: 3000 m, 99x99 segments, sampled heights', () => {
    const scope = new ResourceScope();
    try {
      const provider = new GridDemProvider(danangDemPilotGridInput());
      const { mesh, sizeXMeters, sizeZMeters, segmentsX, segmentsZ } = buildTerrainMesh(
        scope,
        provider,
        scope.own(new MeshStandardMaterial())
      );
      expect(sizeXMeters).toBe(3000);
      expect(sizeZMeters).toBe(3000);
      expect(segmentsX).toBe(99);
      expect(segmentsZ).toBe(99);
      const positions = mesh.geometry.attributes.position;
      expect(positions.count).toBe(100 * 100);
      // Vertex Y range matches the pilot stats (bilinear resampling keeps
      // vertices inside the measured min/max).
      let min = Number.POSITIVE_INFINITY;
      let max = Number.NEGATIVE_INFINITY;
      for (let i = 0; i < positions.count; i++) {
        const y = vertexY(mesh, i);
        if (!Number.isFinite(y)) throw new Error(`non-finite vertex Y at ${i}`);
        if (y < min) min = y;
        if (y > max) max = y;
      }
      expect(min).toBeGreaterThanOrEqual(2.06);
      expect(max).toBeLessThanOrEqual(25.4);
      // The vertex nearest the centre is at (+15.15, +15.15) on the 99
      // segments / 3000 m grid, and its Y is the provider sample there.
      const centreIndex = 50 * 100 + 50;
      const centreX = -1500 + 50 * (3000 / 99);
      const centreZ = -1500 + 50 * (3000 / 99);
      const centre = provider.sampleElevation(centreX, centreZ);
      expect(centre.status).toBe('ok');
      if (centre.status === 'ok') expect(vertexY(mesh, centreIndex)).toBeCloseTo(centre.elevationMeters, 4);
      // No vertical exaggeration: mesh Y equals sampled elevation.
      expect(mesh.position.y).toBe(0);
    } finally {
      scope.dispose();
    }
  });
});
