import { z } from 'zod';
import { GIS_BUILDING_KINDS, GIS_ROAD_CLASSES, ROAD_WIDTH_DEFAULTS_M, type GisBuilding, type GisRoad } from './type';

/** Pilot clip rectangle in world metres (bbox corners projected to ENU). */
export const GIS_PILOT_CLIP = {
  minXMeters: -1500.21,
  minZMeters: -1500.04,
  maxXMeters: 1500.0,
  maxZMeters: 1500.05,
} as const;

const pointSchema = z.strictObject({
  x: z.number().finite().min(GIS_PILOT_CLIP.minXMeters).max(GIS_PILOT_CLIP.maxXMeters),
  z: z.number().finite().min(GIS_PILOT_CLIP.minZMeters).max(GIS_PILOT_CLIP.maxZMeters),
});

function distinctPoints(points: readonly { x: number; z: number }[]): boolean {
  for (let i = 1; i < points.length; i++) {
    if (points[i]!.x === points[i - 1]!.x && points[i]!.z === points[i - 1]!.z) return false;
  }
  return true;
}

function signedArea(points: readonly { x: number; z: number }[]): number {
  // x = east, y = north = -z, so the shoelace sum uses (x, -z).
  let sum = 0;
  for (let i = 0; i + 1 < points.length; i++) {
    const a = points[i]!;
    const b = points[i + 1]!;
    sum += a.x * -b.z - b.x * -a.z;
  }
  return sum / 2;
}

/** Strict road schema: 2+ distinct in-bounds points, width from its class policy. */
export const gisRoadSchema: z.ZodType<GisRoad> = z
  .strictObject({
    osmId: z.number().int().positive(),
    highway: z.enum(GIS_ROAD_CLASSES),
    name: z.string().min(1).max(200).nullable(),
    lanes: z.number().int().min(1).max(12).nullable(),
    widthMeters: z.number().positive().max(60),
    widthProvenance: z.enum(['source', 'estimated']),
    surface: z.string().min(1).max(100).nullable(),
    bridge: z.boolean(),
    tunnel: z.boolean(),
    oneway: z.enum(['yes', '-1']).nullable(),
    points: z.array(pointSchema).min(2).max(10000),
  })
  .refine((road) => distinctPoints(road.points), 'Road centreline has consecutive duplicate points')
  .refine(
    (road) => road.widthProvenance === 'source' || road.widthMeters === ROAD_WIDTH_DEFAULTS_M[road.highway],
    'Estimated road width must equal the class default'
  );

function closedRing(points: readonly { x: number; z: number }[]): boolean {
  return (
    points.length >= 4 && points[0]!.x === points[points.length - 1]!.x && points[0]!.z === points[points.length - 1]!.z
  );
}

/** Strict building schema: closed rings, orientation, height/provenance agreement. */
export const gisBuildingSchema: z.ZodType<GisBuilding> = z
  .strictObject({
    osmId: z.number().int().positive(),
    kind: z.enum(GIS_BUILDING_KINDS),
    name: z.string().min(1).max(200).nullable(),
    heightMeters: z.number().positive().max(500).nullable(),
    heightProvenance: z.enum(['known', 'estimated', 'unknown']),
    levels: z.number().int().min(0).max(200).nullable(),
    minHeightMeters: z.number().nonnegative().max(500).nullable(),
    roofShape: z.string().min(1).max(100).nullable(),
    outer: z.array(pointSchema).min(4).max(10000),
    holes: z.array(z.array(pointSchema).min(4).max(10000)),
    areaM2: z.number().positive().max(1000000),
  })
  .refine((building) => closedRing(building.outer), 'Building outer ring is not closed')
  .refine((building) => building.holes.every(closedRing), 'Building hole ring is not closed')
  .refine((building) => distinctPoints(building.outer), 'Building outer ring has consecutive duplicate points')
  .refine((building) => signedArea(building.outer) > 0, 'Building outer ring must be counter-clockwise')
  .refine((building) => building.holes.every((hole) => signedArea(hole) < 0), 'Building hole rings must be clockwise')
  .refine(
    (building) => (building.heightProvenance === 'unknown') === (building.heightMeters === null),
    'Unknown height provenance requires a null height, and vice versa'
  )
  .refine(
    (building) =>
      building.heightProvenance !== 'estimated' ||
      (building.levels !== null &&
        building.heightMeters !== null &&
        Math.abs(building.heightMeters - building.levels * 3) < 1e-9),
    'Estimated height must equal levels x 3.0 m'
  )
  .refine(
    (building) =>
      building.minHeightMeters === null ||
      (building.heightMeters !== null && building.minHeightMeters < building.heightMeters),
    'min_height must be below the building height'
  );

/** Signed footprint area (m^2) of a closed ring; positive when counter-clockwise. */
export function ringSignedAreaM2(points: readonly { x: number; z: number }[]): number {
  return signedArea(points);
}

/** Parse-or-throw for one decoded road; the message names the failing field. */
export function parseGisRoad(value: unknown): GisRoad {
  return gisRoadSchema.parse(value);
}

/** Parse-or-throw for one decoded building; the message names the failing field. */
export function parseGisBuilding(value: unknown): GisBuilding {
  return gisBuildingSchema.parse(value);
}
