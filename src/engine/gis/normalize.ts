import type {
  GisBuilding,
  GisDatasetStats,
  GisPoint,
  GisRejectedFeature,
  GisRoad,
  HeightProvenance,
  WidthProvenance,
} from './type';
import { GIS_PILOT_CLIP } from './schema';

/**
 * Normalization and validation of decoded GIS features (Phase 17).
 *
 * The ingest script already clips, dedupes and rejects; this module is
 * the runtime second gate — it re-checks every invariant the renderer
 * depends on and records every rejection instead of silently dropping a
 * feature. Topology the pipeline cannot verify is REJECTED here, never
 * silently repaired (notably self-intersecting rings).
 */

/** True when segments AB and CD cross at an interior point of both. */
export function segmentsCross(a: GisPoint, b: GisPoint, c: GisPoint, d: GisPoint): boolean {
  const orient = (p: GisPoint, q: GisPoint, r: GisPoint): number => {
    const value = (q.x - p.x) * (r.z - p.z) - (q.z - p.z) * (r.x - p.x);
    if (value === 0) return 0;
    return value > 0 ? 1 : -1;
  };
  const o1 = orient(a, b, c);
  const o2 = orient(a, b, d);
  const o3 = orient(c, d, a);
  const o4 = orient(c, d, b);
  return o1 !== o2 && o3 !== o4 && o1 !== 0 && o2 !== 0 && o3 !== 0 && o4 !== 0;
}

/** True when a closed ring self-intersects (adjacent segments excluded). */
export function ringSelfIntersects(ring: readonly GisPoint[]): boolean {
  const points = ring.slice(0, -1);
  const count = points.length;
  for (let i = 0; i < count; i++) {
    for (let j = i + 2; j < count; j++) {
      if (i === 0 && j === count - 1) continue;
      if (segmentsCross(points[i]!, points[(i + 1) % count]!, points[j]!, points[(j + 1) % count]!)) return true;
    }
  }
  return false;
}

/** True when a ring closes, has 4+ points and no consecutive duplicates. */
export function isValidRing(ring: readonly GisPoint[]): boolean {
  if (ring.length < 4) return false;
  const first = ring[0]!;
  const last = ring[ring.length - 1]!;
  if (first.x !== last.x || first.z !== last.z) return false;
  for (let i = 1; i < ring.length; i++) {
    if (ring[i]!.x === ring[i - 1]!.x && ring[i]!.z === ring[i - 1]!.z) return false;
  }
  return true;
}

export interface NormalizedGis {
  readonly roads: readonly GisRoad[];
  readonly buildings: readonly GisBuilding[];
  readonly rejected: readonly GisRejectedFeature[];
  /** Junction centres (world metres) with the incident road widths. */
  readonly junctions: readonly { readonly x: number; readonly z: number; readonly radiusMeters: number }[];
  readonly stats: GisDatasetStats;
}

function tally<T extends string>(values: readonly T[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const value of values) counts[value] = (counts[value] ?? 0) + 1;
  return counts;
}

function roadLengthMeters(road: GisRoad): number {
  let total = 0;
  for (let i = 1; i < road.points.length; i++) {
    total += Math.hypot(road.points[i]!.x - road.points[i - 1]!.x, road.points[i]!.z - road.points[i - 1]!.z);
  }
  return total;
}

/**
 * Validate decoded features and find junctions.
 *
 * Junction rule: a point shared (exactly, at decimetre precision) by the
 * endpoints of two or more road runs is one junction; its disc radius is
 * the largest incident half-width, so the flat end caps of the incident
 * ribbons meet under one disc with no wedge gap. T-junctions need no
 * disc: the side road starts on the main road's centreline, so the two
 * ribbon strips already cross there with no gap within half a width of
 * the crossing point.
 */
export function normalizeGisFeatures(
  datasetId: string,
  sourceId: string,
  roads: readonly GisRoad[],
  buildings: readonly GisBuilding[]
): NormalizedGis {
  const rejected: GisRejectedFeature[] = [];
  const keptRoads: GisRoad[] = [];
  const seenRoadGeometry = new Set<string>();
  for (const road of roads) {
    const key = road.points.map((point) => `${point.x},${point.z}`).join('|');
    if (seenRoadGeometry.has(key)) {
      rejected.push({ osmId: road.osmId, kind: 'road', reason: 'duplicate geometry' });
      continue;
    }
    seenRoadGeometry.add(key);
    keptRoads.push(road);
  }

  const keptBuildings: GisBuilding[] = [];
  const seenBuildingGeometry = new Set<string>();
  for (const building of buildings) {
    if (!isValidRing(building.outer)) {
      rejected.push({ osmId: building.osmId, kind: 'building', reason: 'open or degenerate footprint ring' });
      continue;
    }
    if (ringSelfIntersects(building.outer)) {
      rejected.push({ osmId: building.osmId, kind: 'building', reason: 'self-intersecting footprint ring' });
      continue;
    }
    if (building.holes.some((hole) => !isValidRing(hole) || ringSelfIntersects(hole))) {
      rejected.push({ osmId: building.osmId, kind: 'building', reason: 'invalid or self-intersecting hole ring' });
      continue;
    }
    if (building.areaM2 < 4) {
      rejected.push({ osmId: building.osmId, kind: 'building', reason: 'footprint area below 4 m^2' });
      continue;
    }
    const key = building.outer.map((point) => `${point.x},${point.z}`).join('|');
    if (seenBuildingGeometry.has(key)) {
      rejected.push({ osmId: building.osmId, kind: 'building', reason: 'duplicate footprint geometry' });
      continue;
    }
    seenBuildingGeometry.add(key);
    keptBuildings.push(building);
  }

  // Junctions from coincident road endpoints.
  const endpoints = new Map<string, { x: number; z: number; halfWidths: number[] }>();
  for (const road of keptRoads) {
    for (const point of [road.points[0]!, road.points[road.points.length - 1]!]) {
      const key = `${point.x},${point.z}`;
      const entry = endpoints.get(key) ?? { x: point.x, z: point.z, halfWidths: [] };
      entry.halfWidths.push(road.widthMeters / 2);
      endpoints.set(key, entry);
    }
  }
  const junctions = [...endpoints.values()]
    .filter((entry) => entry.halfWidths.length >= 2)
    .map((entry) => ({
      x: entry.x,
      z: entry.z,
      radiusMeters: Math.max(...entry.halfWidths),
    }))
    .sort((a, b) => a.x - b.x || a.z - b.z);

  const stats: GisDatasetStats = {
    datasetId,
    sourceId,
    roadRuns: keptRoads.length,
    roadWays: new Set(keptRoads.map((road) => road.osmId)).size,
    totalRoadLengthMeters: keptRoads.reduce((sum, road) => sum + roadLengthMeters(road), 0),
    roadsByClass: tally(keptRoads.map((road) => road.highway)),
    roadWidthProvenance: tally(keptRoads.map((road) => road.widthProvenance)) as Record<WidthProvenance, number>,
    buildings: keptBuildings.length,
    buildingsByKind: tally(keptBuildings.map((building) => building.kind)),
    buildingHeightProvenance: tally(keptBuildings.map((building) => building.heightProvenance)) as Record<
      HeightProvenance,
      number
    >,
    junctions: junctions.length,
    rejected: rejected.length,
  };
  return { roads: keptRoads, buildings: keptBuildings, rejected, junctions, stats };
}

/** True when a point lies inside the pilot clip rectangle. */
export function isInsidePilotClip(point: GisPoint): boolean {
  return (
    point.x >= GIS_PILOT_CLIP.minXMeters &&
    point.x <= GIS_PILOT_CLIP.maxXMeters &&
    point.z >= GIS_PILOT_CLIP.minZMeters &&
    point.z <= GIS_PILOT_CLIP.maxZMeters
  );
}
