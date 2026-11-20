import * as THREE from 'three';
import type { GisBuilding, GisPoint, GisRoad } from './type';

/**
 * GIS geometry builders (Phase 17).
 *
 * Everything here is generic Three.js geometry from normalized features;
 * no Da Nang content. Elevation comes from the caller-supplied sampler
 * (the active terrain provider), so roads and buildings drape on whatever
 * terrain is active — never on a duplicated elevation formula.
 *
 * Anti-z-fighting policy (documented, not tuned per feature):
 * - road ribbons sit `ROAD_LIFT_METERS` (0.08 m) above sampled terrain;
 * - junction discs sit `JUNCTION_LIFT_METERS` (0.09 m) above terrain, so
 *   they never fight the ribbons they cover;
 * - footprint-only buildings sit `FOOTPRINT_LIFT_METERS` (0.05 m) above
 *   their foundation; extruded buildings start at the foundation itself.
 * Foundation policy: a building's base Y is the MINIMUM sampled
 * elevation under its footprint (outer vertices + centroid), so the
 * extrusion never floats above the lowest corner and never sinks below
 * the terrain on a slope — the walls cover the height difference.
 */
export const ROAD_LIFT_METERS = 0.08;
export const JUNCTION_LIFT_METERS = 0.09;
export const FOOTPRINT_LIFT_METERS = 0.05;
/** Long centreline segments are subdivided so draping follows the terrain. */
export const MAX_RIBBON_SEGMENT_METERS = 10;

export type ElevationSampler = (x: number, z: number) => number | null;

function subdivide(points: readonly GisPoint[]): GisPoint[] {
  const out: GisPoint[] = [points[0]!];
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!;
    const b = points[i]!;
    const length = Math.hypot(b.x - a.x, b.z - a.z);
    const steps = Math.max(1, Math.ceil(length / MAX_RIBBON_SEGMENT_METERS));
    for (let step = 1; step <= steps; step++) {
      const t = step / steps;
      out.push({ x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t });
    }
  }
  return out;
}

/**
 * One road centreline as a flat ribbon strip, draped on the terrain.
 * Returns null when any sampled elevation is missing (the road is
 * skipped, never draped at an invented height). The ribbon has no end
 * caps; junction discs close the joints (see `buildJunctionDiscs`).
 */
export function buildRoadRibbon(road: GisRoad, sampleElevation: ElevationSampler): THREE.BufferGeometry | null {
  const points = subdivide(road.points);
  const halfWidth = road.widthMeters / 2;
  const positions: number[] = [];
  const normals: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];
  let distance = 0;
  for (let i = 0; i < points.length; i++) {
    const point = points[i]!;
    if (i > 0) {
      distance += Math.hypot(point.x - points[i - 1]!.x, point.z - points[i - 1]!.z);
    }
    const prev = points[Math.max(0, i - 1)]!;
    const next = points[Math.min(points.length - 1, i + 1)]!;
    const dx = next.x - prev.x;
    const dz = next.z - prev.z;
    const length = Math.hypot(dx, dz);
    if (length === 0) return null;
    const nx = -dz / length;
    const nz = dx / length;
    const elevation = sampleElevation(point.x, point.z);
    if (elevation === null) return null;
    const y = elevation + ROAD_LIFT_METERS;
    positions.push(point.x + nx * halfWidth, y, point.z + nz * halfWidth);
    positions.push(point.x - nx * halfWidth, y, point.z - nz * halfWidth);
    normals.push(0, 1, 0, 0, 1, 0);
    uvs.push(0, distance, 1, distance);
    if (i > 0) {
      const base = (i - 1) * 2;
      indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  return geometry;
}

/** Flat discs covering coincident-endpoint junctions, draped on terrain. */
export function buildJunctionDiscs(
  junctions: readonly { readonly x: number; readonly z: number; readonly radiusMeters: number }[],
  sampleElevation: ElevationSampler
): THREE.BufferGeometry | null {
  const geometries: THREE.BufferGeometry[] = [];
  for (const junction of junctions) {
    const elevation = sampleElevation(junction.x, junction.z);
    if (elevation === null) continue;
    const disc = new THREE.CircleGeometry(junction.radiusMeters, 20);
    disc.rotateX(-Math.PI / 2);
    disc.translate(junction.x, elevation + JUNCTION_LIFT_METERS, junction.z);
    geometries.push(disc);
  }
  if (geometries.length === 0) return null;
  const merged = mergeGeometries(geometries);
  for (const geometry of geometries) geometry.dispose();
  return merged;
}

/** Minimum sampled elevation under a footprint (vertices + centroid). */
export function sampleFoundationElevation(building: GisBuilding, sampleElevation: ElevationSampler): number | null {
  let min: number | null = null;
  const consider = (x: number, z: number): boolean => {
    const value = sampleElevation(x, z);
    if (value === null) return false;
    min = min === null ? value : Math.min(min, value);
    return true;
  };
  for (const point of building.outer) {
    if (!consider(point.x, point.z)) return null;
  }
  let cx = 0;
  let cz = 0;
  for (const point of building.outer) {
    cx += point.x;
    cz += point.z;
  }
  const count = building.outer.length;
  if (!consider(cx / count, cz / count)) return null;
  return min;
}

function toShape(ring: readonly GisPoint[]): THREE.Shape {
  // Shape space is XY; after rotateX(-PI/2) shape Y maps to world -Z,
  // so shape Y must be -worldZ for the footprint to land correctly.
  const shape = new THREE.Shape();
  shape.moveTo(ring[0]!.x, -ring[0]!.z);
  for (let i = 1; i < ring.length; i++) shape.lineTo(ring[i]!.x, -ring[i]!.z);
  return shape;
}

/**
 * One building as geometry.
 * - Known/estimated height: extruded walls + flat roof from
 *   foundation (+ minHeight) to foundation + height. Roof shape is
 *   recorded in the data but always rendered flat (documented).
 * - Unknown height: footprint-only flat geometry at foundation + lift.
 * Returns null when any foundation sample is missing.
 */
export function buildBuildingGeometry(
  building: GisBuilding,
  sampleElevation: ElevationSampler
): { geometry: THREE.BufferGeometry; baseY: number; topY: number; extruded: boolean } | null {
  const foundation = sampleFoundationElevation(building, sampleElevation);
  if (foundation === null) return null;
  const shape = toShape(building.outer);
  for (const hole of building.holes) {
    const holePath = new THREE.Path();
    holePath.moveTo(hole[0]!.x, -hole[0]!.z);
    for (let i = 1; i < hole.length; i++) holePath.lineTo(hole[i]!.x, -hole[i]!.z);
    shape.holes.push(holePath);
  }
  if (building.heightMeters === null) {
    const geometry = new THREE.ShapeGeometry(shape);
    geometry.rotateX(-Math.PI / 2);
    geometry.translate(0, foundation + FOOTPRINT_LIFT_METERS, 0);
    return { geometry, baseY: foundation, topY: foundation, extruded: false };
  }
  const baseY = foundation + (building.minHeightMeters ?? 0);
  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth: building.heightMeters - (building.minHeightMeters ?? 0),
    bevelEnabled: false,
  });
  geometry.rotateX(-Math.PI / 2);
  geometry.translate(0, baseY, 0);
  return { geometry, baseY, topY: foundation + building.heightMeters, extruded: true };
}

/**
 * Concatenate non-indexed geometries with identical attributes
 * (position/normal/uv) into one geometry, for one-draw-call layers.
 * Indexed inputs are converted first; sources are NOT disposed here.
 */
export function mergeGeometries(geometries: readonly THREE.BufferGeometry[]): THREE.BufferGeometry {
  const converted = geometries.map((geometry) => (geometry.index ? geometry.toNonIndexed() : geometry));
  let vertexCount = 0;
  for (const geometry of converted) vertexCount += geometry.attributes.position!.count;
  const positions = new Float32Array(vertexCount * 3);
  const normals = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  let offset = 0;
  for (const geometry of converted) {
    const count = geometry.attributes.position!.count;
    positions.set(geometry.attributes.position!.array as Float32Array, offset * 3);
    const normalAttr = geometry.attributes.normal;
    if (normalAttr) normals.set(normalAttr.array as Float32Array, offset * 3);
    const uvAttr = geometry.attributes.uv;
    if (uvAttr) uvs.set(uvAttr.array as Float32Array, offset * 2);
    offset += count;
  }
  // Dispose only the temporary non-indexed copies, never the inputs.
  for (let i = 0; i < converted.length; i++) {
    if (converted[i] !== geometries[i]) converted[i]!.dispose();
  }
  const merged = new THREE.BufferGeometry();
  merged.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  merged.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
  merged.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  return merged;
}
