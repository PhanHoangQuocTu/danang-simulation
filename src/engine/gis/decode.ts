import { GIS_BUILDING_KINDS, GIS_ROAD_CLASSES, type GisBuilding, type GisPoint, type GisRoad } from './type';
import { parseGisBuilding, parseGisRoad, ringSignedAreaM2 } from './schema';

/**
 * Compact pilot asset format (Phase 17).
 *
 * The committed asset stores coordinates as integer decimetres (0.1 m) of
 * world x/z, delta-encoded per feature (first vertex absolute, the rest
 * deltas), and features as positional tuples so the 1,830 road runs and
 * 418 buildings fit in ~193 KB. The decoder below is the only reader:
 * it expands the tuples, converts decimetres to metres, and validates
 * every feature through the strict Zod schemas.
 *
 * Road tuple:    [osmId, highwayIdx, name|null, lanes|null, widthDm,
 *                 widthProv(0=source, 1=estimated), surfaceIdx|null,
 *                 flags, pointsDelta]
 *   flags bit 0 = bridge, bit 1 = tunnel, bit 2 = oneway yes,
 *   bit 3 = oneway -1.
 * Building tuple: [osmId, kindIdx, name|null, heightDm|null,
 *                 heightProv(0=known, 1=estimated, 2=unknown),
 *                 levels|null, outerDelta, holesDelta[]]
 */
export type GisRoadTuple = [
  number,
  number,
  string | null,
  number | null,
  number,
  number,
  number | null,
  number,
  number[],
];
export type GisBuildingTuple = [
  number,
  number,
  string | null,
  number | null,
  number,
  number | null,
  number[],
  number[][],
];

export interface GisPilotAsset {
  readonly datasetId: string;
  readonly sourceId: string;
  /** [west, south, east, north] degrees, EPSG:4326. */
  readonly bbox: readonly [number, number, number, number];
  readonly anchor: { readonly lat: number; readonly lon: number };
  readonly clipWorld: readonly [number, number, number, number];
  readonly highwayClasses: readonly string[];
  readonly surfaces: readonly string[];
  readonly buildingKinds: readonly string[];
  readonly roads: readonly GisRoadTuple[];
  readonly buildings: readonly GisBuildingTuple[];
}

/** Decode one delta-encoded flat array into world-metre points. */
export function decodeDeltaPoints(flat: readonly number[]): GisPoint[] {
  if (flat.length % 2 !== 0) throw new Error('Delta-encoded points must have an even length');
  const points: GisPoint[] = [];
  let x = 0;
  let z = 0;
  for (let i = 0; i < flat.length; i += 2) {
    const dx = flat[i];
    const dz = flat[i + 1];
    if (!Number.isInteger(dx) || !Number.isInteger(dz)) throw new Error('Delta-encoded points must be integers');
    x += dx;
    z += dz;
    points.push({ x: x / 10, z: z / 10 });
  }
  return points;
}

/** Expand and validate every road tuple of a compact asset. */
export function decodeGisRoads(asset: GisPilotAsset): GisRoad[] {
  if (asset.highwayClasses.length !== GIS_ROAD_CLASSES.length) {
    throw new Error('GIS asset highway class table does not match the schema');
  }
  for (let i = 0; i < GIS_ROAD_CLASSES.length; i++) {
    if (asset.highwayClasses[i] !== GIS_ROAD_CLASSES[i]) {
      throw new Error(`GIS asset highway class table mismatch at index ${i}`);
    }
  }
  return asset.roads.map((tuple) => {
    const [osmId, highwayIdx, name, lanes, widthDm, widthProv, surfaceIdx, flags, pointsFlat] = tuple;
    const highway = GIS_ROAD_CLASSES[highwayIdx];
    if (highway === undefined) throw new Error(`Unknown highway class index ${highwayIdx}`);
    const surface = surfaceIdx === null ? null : asset.surfaces[surfaceIdx];
    if (surfaceIdx !== null && surface === undefined) throw new Error(`Unknown surface index ${surfaceIdx}`);
    let oneway: 'yes' | '-1' | null = null;
    if ((flags & 4) !== 0) oneway = 'yes';
    else if ((flags & 8) !== 0) oneway = '-1';
    return parseGisRoad({
      osmId,
      highway,
      name,
      lanes,
      widthMeters: widthDm / 10,
      widthProvenance: widthProv === 0 ? 'source' : 'estimated',
      surface,
      bridge: (flags & 1) !== 0,
      tunnel: (flags & 2) !== 0,
      oneway,
      points: decodeDeltaPoints(pointsFlat),
    });
  });
}

const HEIGHT_PROVENANCE = ['known', 'estimated', 'unknown'] as const;

/** Expand and validate every building tuple of a compact asset. */
export function decodeGisBuildings(asset: GisPilotAsset): GisBuilding[] {
  if (asset.buildingKinds.length !== GIS_BUILDING_KINDS.length) {
    throw new Error('GIS asset building kind table does not match the schema');
  }
  for (let i = 0; i < GIS_BUILDING_KINDS.length; i++) {
    if (asset.buildingKinds[i] !== GIS_BUILDING_KINDS[i]) {
      throw new Error(`GIS asset building kind table mismatch at index ${i}`);
    }
  }
  return asset.buildings.map((tuple) => {
    const [osmId, kindIdx, name, heightDm, heightProv, levels, outerFlat, holesFlat] = tuple;
    const kind = GIS_BUILDING_KINDS[kindIdx];
    if (kind === undefined) throw new Error(`Unknown building kind index ${kindIdx}`);
    const outer = decodeDeltaPoints(outerFlat);
    const holes = holesFlat.map((flat) => decodeDeltaPoints(flat));
    const heightProvenance = HEIGHT_PROVENANCE[heightProv];
    if (heightProvenance === undefined) throw new Error(`Unknown height provenance index ${heightProv}`);
    return parseGisBuilding({
      osmId,
      kind,
      name,
      heightMeters: heightDm === null ? null : heightDm / 10,
      heightProvenance,
      levels,
      minHeightMeters: null,
      roofShape: null,
      outer,
      holes,
      areaM2: ringSignedAreaM2(outer),
    });
  });
}
