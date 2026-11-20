import * as THREE from 'three';
import type { ResourceScope } from '@/engine/core/resources';
import type { TerrainProvider } from '@/engine/terrain/type';
import { requireElevation } from '@/engine/terrain/type';
import { SYNTHETIC_TERRAIN_SEGMENTS, SYNTHETIC_TERRAIN_SIZE_METERS } from './zones/synthetic-terrain';

/**
 * Terrain mesh construction (Phase 16).
 *
 * The mesh is built from the active provider only — never from a duplicated
 * elevation formula. For the synthetic provider the size/segments stay the
 * Phase 1–10 values (180 m / 128) with the original path/rock colouring.
 * For a geographic DEM provider the size comes from the provider coverage
 * and the segments from the raster dimensions, so a 100x100 DEM grid
 * becomes a 99x99-segment mesh; colours are hypsometric (elevation-based)
 * because no synthetic path exists on real terrain.
 *
 * Vertical exaggeration is 1.0: vertex Y is the sampled elevation, unchanged.
 */
export function buildTerrainMesh(
  scope: ResourceScope,
  terrain: TerrainProvider,
  material: THREE.Material
): { mesh: THREE.Mesh; sizeXMeters: number; sizeZMeters: number; segmentsX: number; segmentsZ: number } {
  const isDem = terrain.metadata.isGeographic;
  const spanX = terrain.coverage.maxXMeters - terrain.coverage.minXMeters;
  const spanZ = terrain.coverage.maxZMeters - terrain.coverage.minZMeters;
  const sizeXMeters = isDem ? spanX : SYNTHETIC_TERRAIN_SIZE_METERS;
  const sizeZMeters = isDem ? spanZ : SYNTHETIC_TERRAIN_SIZE_METERS;
  const segmentsX = isDem ? Math.max(1, (terrain.metadata.widthCells ?? 2) - 1) : SYNTHETIC_TERRAIN_SEGMENTS;
  const segmentsZ = isDem ? Math.max(1, (terrain.metadata.heightCells ?? 2) - 1) : SYNTHETIC_TERRAIN_SEGMENTS;
  const centreX = (terrain.coverage.minXMeters + terrain.coverage.maxXMeters) / 2;
  const centreZ = (terrain.coverage.minZMeters + terrain.coverage.maxZMeters) / 2;

  const terrainGeo = scope.own(new THREE.PlaneGeometry(sizeXMeters, sizeZMeters, segmentsX, segmentsZ));
  terrainGeo.rotateX(-Math.PI / 2);

  const posAttr = terrainGeo.attributes.position;
  const heights: number[] = new Array(posAttr.count);
  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i) + centreX;
    const vz = posAttr.getZ(i) + centreZ;
    const vy = requireElevation(terrain.sampleElevation(vx, vz), vx, vz);
    heights[i] = vy;
    posAttr.setY(i, vy);
    if (vy < minY) minY = vy;
    if (vy > maxY) maxY = vy;
  }

  const colors: number[] = [];
  const cGrassLight = new THREE.Color(0x4d8b31);
  const cGrassLush = new THREE.Color(0x3b7523);
  const cPathDirt = new THREE.Color(0x948268);
  const cRockSlope = new THREE.Color(0x64748b);
  const tempColor = new THREE.Color();
  for (let i = 0; i < posAttr.count; i++) {
    const vx = posAttr.getX(i) + centreX;
    const vz = posAttr.getZ(i) + centreZ;
    const vy = heights[i]!;
    if (isDem) {
      // Hypsometric tint: lowland green, higher ground trending to rock.
      const t = maxY > minY ? (vy - minY) / (maxY - minY) : 0;
      const noiseMix = (Math.sin(vx * 0.14) * Math.cos(vz * 0.14) + 1) * 0.5;
      if (t < 0.4) {
        tempColor.copy(cGrassLight).lerp(cGrassLush, t / 0.4);
      } else if (t < 0.8) {
        tempColor.copy(cGrassLush).lerp(cRockSlope, ((t - 0.4) / 0.4) * 0.7);
      } else {
        tempColor.copy(cRockSlope);
      }
      tempColor.lerp(cGrassLush, noiseMix * 0.12);
    } else {
      const pathCenterX = Math.sin(vz * 0.08) * 3.5;
      const distToPath = Math.abs(vx - pathCenterX);
      const distFromOrigin = Math.hypot(vx, vz);
      if (distFromOrigin < 4.5) {
        tempColor.copy(cPathDirt).lerp(cRockSlope, 0.45);
      } else if (distToPath < 2.1 && Math.abs(vz) < 58) {
        const pathBlend = THREE.MathUtils.smoothstep(distToPath, 1.1, 2.1);
        tempColor.copy(cPathDirt).lerp(cGrassLight, pathBlend);
      } else if (vy > 1.35) {
        const rockBlend = THREE.MathUtils.clamp((vy - 1.35) / 1.8, 0, 0.85);
        tempColor.copy(cGrassLush).lerp(cRockSlope, rockBlend);
      } else {
        const noiseMix = (Math.sin(vx * 0.14) * Math.cos(vz * 0.14) + 1) * 0.5;
        tempColor.copy(cGrassLight).lerp(cGrassLush, noiseMix);
      }
    }
    colors.push(tempColor.r, tempColor.g, tempColor.b);
  }

  terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  terrainGeo.computeVertexNormals();

  const terrainMesh = new THREE.Mesh(terrainGeo, material);
  terrainMesh.position.set(centreX, 0, centreZ);
  terrainMesh.receiveShadow = true;
  return { mesh: terrainMesh, sizeXMeters, sizeZMeters, segmentsX, segmentsZ };
}
