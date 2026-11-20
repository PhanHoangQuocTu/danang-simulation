/**
 * Real GIS vector features (Phase 17).
 *
 * Pure data types: no React, no Next.js, no Three.js, no Da Nang content.
 * A feature is a normalized OpenStreetMap way (or multipolygon relation)
 * projected once, at ingest time, into world metres (world +X = East,
 * +Y = Up, -Z = North, 1 unit = 1 m) with the WGS84 math of
 * `src/engine/geospatial/core.ts` about the Da Nang anchor
 * (lat 16.0544, lon 108.2022). Runtime code never re-projects lon/lat.
 *
 * Provenance is part of the data, never a comment:
 * - `widthProvenance: 'source'` means an OSM `width` tag was measured
 *   into the feature; `'estimated'` means the class default below was
 *   applied. In the Phase 17 pilot NO road carries a `width` tag, so
 *   every width is estimated.
 * - `heightProvenance: 'known'` means an OSM `height` tag (metres);
 *   `'estimated'` means `building:levels` x 3.0 m per level (a documented
 *   assumption, not a measurement); `'unknown'` means footprint-only —
 *   the height was NEVER invented.
 */

/** How a road width was obtained. */
export type WidthProvenance = 'source' | 'estimated';

/** How a building height was obtained. */
export type HeightProvenance = 'known' | 'estimated' | 'unknown';

/** OSM `highway` values present in the Phase 17 pilot, with a width policy. */
export const GIS_ROAD_CLASSES = [
  'footway',
  'living_street',
  'path',
  'pedestrian',
  'primary',
  'primary_link',
  'residential',
  'secondary',
  'secondary_link',
  'service',
  'steps',
  'tertiary',
  'tertiary_link',
  'track',
  'unclassified',
] as const;
export type GisRoadClass = (typeof GIS_ROAD_CLASSES)[number];

/**
 * Class-based road widths in metres. ESTIMATED defaults, not measurements:
 * no road in the pilot carries a `width` tag. A class with no entry here
 * has no width policy and its ways are rejected at ingest, never rendered
 * at an invented width. This table MUST match the ingest script
 * (`/tmp/osm17/ingest_osm.py`, `ROAD_WIDTH_DEFAULTS_M`); the decode test
 * asserts every estimated road width equals its table entry.
 */
export const ROAD_WIDTH_DEFAULTS_M: Record<GisRoadClass, number> = {
  primary: 14,
  primary_link: 7,
  secondary: 10,
  secondary_link: 7,
  tertiary: 8,
  tertiary_link: 6,
  residential: 6,
  living_street: 5,
  unclassified: 5,
  service: 4,
  pedestrian: 6,
  footway: 2,
  path: 2,
  steps: 2,
  track: 3,
};

/** Metres of height assumed per `building:levels` level (estimated only). */
export const METERS_PER_LEVEL = 3;

/** One world-metre point (x = east, z = south-positive, i.e. -north). */
export interface GisPoint {
  readonly x: number;
  readonly z: number;
}

/** A normalized road centreline (one clipped run of one OSM way). */
export interface GisRoad {
  /** OSM way id. A way split by bbox clipping keeps its id on every run. */
  readonly osmId: number;
  readonly highway: GisRoadClass;
  readonly name: string | null;
  readonly lanes: number | null;
  readonly widthMeters: number;
  readonly widthProvenance: WidthProvenance;
  readonly surface: string | null;
  readonly bridge: boolean;
  readonly tunnel: boolean;
  readonly oneway: 'yes' | '-1' | null;
  /** Centreline in world metres, 2+ distinct points, inside the pilot clip. */
  readonly points: readonly GisPoint[];
}

/** OSM `building` values present in the Phase 17 pilot. */
export const GIS_BUILDING_KINDS = [
  'apartments',
  'church',
  'commercial',
  'florist',
  'hangar',
  'hospital',
  'hotel',
  'house',
  'navigationaid',
  'residential',
  'retail',
  'roof',
  'ruins',
  'school',
  'temple',
  'tower',
  'transportation',
  'university',
  'yes',
] as const;
export type GisBuildingKind = (typeof GIS_BUILDING_KINDS)[number];

/** A normalized building footprint (one OSM way or multipolygon relation). */
export interface GisBuilding {
  /** OSM way id, or relation id for a multipolygon building. */
  readonly osmId: number;
  readonly kind: GisBuildingKind;
  readonly name: string | null;
  /** Extrusion height in metres, or null when provenance is unknown. */
  readonly heightMeters: number | null;
  readonly heightProvenance: HeightProvenance;
  readonly levels: number | null;
  readonly minHeightMeters: number | null;
  readonly roofShape: string | null;
  /** Closed outer ring (first point == last), CCW, world metres. */
  readonly outer: readonly GisPoint[];
  /** Closed hole rings, CW, world metres (empty in the pilot except one). */
  readonly holes: readonly (readonly GisPoint[])[];
  /** Footprint area in m^2, computed from the clipped outer ring. */
  readonly areaM2: number;
}

/** A feature the pipeline refused, with the reason recorded (never silent). */
export interface GisRejectedFeature {
  readonly osmId: number;
  readonly kind: 'road' | 'building';
  readonly reason: string;
}

/** Counts and provenance tallies for one loaded GIS dataset. */
export interface GisDatasetStats {
  readonly datasetId: string;
  readonly sourceId: string;
  readonly roadRuns: number;
  readonly roadWays: number;
  readonly totalRoadLengthMeters: number;
  readonly roadsByClass: Readonly<Record<string, number>>;
  readonly roadWidthProvenance: Readonly<Record<WidthProvenance, number>>;
  readonly buildings: number;
  readonly buildingsByKind: Readonly<Record<string, number>>;
  readonly buildingHeightProvenance: Readonly<Record<HeightProvenance, number>>;
  readonly junctions: number;
  readonly rejected: number;
}
