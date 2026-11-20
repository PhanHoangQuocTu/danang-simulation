import * as THREE from 'three';
import type { ResourceScope } from '@/engine/core/resources';
import type { TerrainProvider } from '@/engine/terrain/type';
import { decodeGisBuildings, decodeGisRoads } from '@/engine/gis/decode';
import { buildBuildingGeometry, buildJunctionDiscs, buildRoadRibbon, mergeGeometries } from '@/engine/gis/geometry';
import { normalizeGisFeatures, type NormalizedGis } from '@/engine/gis/normalize';
import { danangGisPilotAsset } from './data/danang-gis-pilot';

/**
 * Real GIS layer for the Da Nang world (Phase 17).
 *
 * Additive only: the Phase 1–10 synthetic content (plaza, platforms,
 * rocks, trees, bushes, grass, fixtures) is untouched by this layer.
 * There are no synthetic buildings or roads in the scene to hide — the
 * GIS layer adds real OSM roads and buildings on top of the DEM terrain
 * when `?terrain=dem&gis=real` is active. With any other combination the
 * layer is not built (see `gis-mode.ts`).
 *
 * Ownership: every geometry and material is registered on the caller's
 * `ResourceScope` before it is attached, so runtime disposal frees the
 * layer exactly once. The layer builds at most 4 meshes (roads, junction
 * discs, extruded buildings, footprint-only buildings) from the whole
 * pilot, so the GIS layer costs 4 draw calls, not one per feature.
 */
export interface GisLayerResult {
  readonly group: THREE.Group;
  readonly normalized: NormalizedGis;
  /** Road runs skipped because a draped elevation was missing (never invented). */
  readonly skippedRoads: number;
  /** Buildings skipped because a foundation elevation was missing. */
  readonly skippedBuildings: number;
  readonly roadTriangles: number;
  readonly buildingTriangles: number;
  readonly junctionTriangles: number;
  readonly footprintTriangles: number;
  /** Extruded buildings (known or estimated height). */
  readonly extrudedBuildings: number;
  /** Footprint-only buildings (unknown height). */
  readonly footprintBuildings: number;
}

export function buildGisLayer(scope: ResourceScope, terrain: TerrainProvider): GisLayerResult {
  const roads = decodeGisRoads(danangGisPilotAsset);
  const buildings = decodeGisBuildings(danangGisPilotAsset);
  const normalized = normalizeGisFeatures(
    danangGisPilotAsset.datasetId,
    danangGisPilotAsset.sourceId,
    roads,
    buildings
  );

  // The pilot clip extends up to 0.21 m beyond the DEM coverage on the
  // west edge; clamping keeps those vertices on the edge cell instead of
  // returning outside-coverage (a sub-cell shift, documented here).
  const coverage = terrain.coverage;
  const sampleElevation = (x: number, z: number): number | null => {
    const cx = Math.min(Math.max(x, coverage.minXMeters), coverage.maxXMeters);
    const cz = Math.min(Math.max(z, coverage.minZMeters), coverage.maxZMeters);
    const sample = terrain.sampleElevation(cx, cz);
    return sample.status === 'ok' ? sample.elevationMeters : null;
  };

  const group = new THREE.Group();
  group.name = 'danang-gis-pilot';

  const roadMaterial = scope.own(new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, metalness: 0.0 }));
  const junctionMaterial = scope.own(
    new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.9, metalness: 0.0 })
  );
  const buildingMaterial = scope.own(
    new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.85, metalness: 0.05 })
  );
  const footprintMaterial = scope.own(
    new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9, metalness: 0.0 })
  );

  let skippedRoads = 0;
  const ribbonGeometries: THREE.BufferGeometry[] = [];
  for (const road of normalized.roads) {
    const ribbon = buildRoadRibbon(road, sampleElevation);
    if (ribbon === null) {
      skippedRoads++;
      continue;
    }
    ribbonGeometries.push(ribbon);
  }
  let roadTriangles = 0;
  if (ribbonGeometries.length > 0) {
    const merged = scope.own(mergeGeometries(ribbonGeometries));
    for (const geometry of ribbonGeometries) geometry.dispose();
    roadTriangles = (merged.index?.count ?? merged.attributes.position!.count) / 3;
    const mesh = new THREE.Mesh(merged, roadMaterial);
    mesh.receiveShadow = true;
    mesh.name = 'gis-roads';
    group.add(mesh);
  }

  let junctionTriangles = 0;
  const discs = buildJunctionDiscs(normalized.junctions, sampleElevation);
  if (discs !== null) {
    const owned = scope.own(discs);
    junctionTriangles = (owned.index?.count ?? owned.attributes.position!.count) / 3;
    const mesh = new THREE.Mesh(owned, junctionMaterial);
    mesh.receiveShadow = true;
    mesh.name = 'gis-junctions';
    group.add(mesh);
  }

  let skippedBuildings = 0;
  const extrudedGeometries: THREE.BufferGeometry[] = [];
  const footprintGeometries: THREE.BufferGeometry[] = [];
  for (const building of normalized.buildings) {
    const built = buildBuildingGeometry(building, sampleElevation);
    if (built === null) {
      skippedBuildings++;
      continue;
    }
    if (built.extruded) extrudedGeometries.push(built.geometry);
    else footprintGeometries.push(built.geometry);
  }
  let buildingTriangles = 0;
  if (extrudedGeometries.length > 0) {
    const merged = scope.own(mergeGeometries(extrudedGeometries));
    for (const geometry of extrudedGeometries) geometry.dispose();
    buildingTriangles = merged.attributes.position!.count / 3;
    const mesh = new THREE.Mesh(merged, buildingMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.name = 'gis-buildings';
    group.add(mesh);
  }
  let footprintTriangles = 0;
  if (footprintGeometries.length > 0) {
    const merged = scope.own(mergeGeometries(footprintGeometries));
    for (const geometry of footprintGeometries) geometry.dispose();
    footprintTriangles = merged.attributes.position!.count / 3;
    const mesh = new THREE.Mesh(merged, footprintMaterial);
    mesh.receiveShadow = true;
    mesh.name = 'gis-footprints';
    group.add(mesh);
  }

  return {
    group,
    normalized,
    skippedRoads,
    skippedBuildings,
    roadTriangles,
    buildingTriangles,
    junctionTriangles,
    footprintTriangles,
    extrudedBuildings: extrudedGeometries.length,
    footprintBuildings: footprintGeometries.length,
  };
}
