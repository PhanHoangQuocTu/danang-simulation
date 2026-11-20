import { describe, expect, it } from 'vitest';
import { isValidRing, normalizeGisFeatures, ringSelfIntersects } from '../normalize';
import type { GisBuilding, GisRoad } from '../type';

function road(osmId: number, points: { x: number; z: number }[], highway: GisRoad['highway'] = 'residential'): GisRoad {
  return {
    osmId,
    highway,
    name: null,
    lanes: null,
    widthMeters: 6,
    widthProvenance: 'estimated',
    surface: null,
    bridge: false,
    tunnel: false,
    oneway: null,
    points,
  };
}

function building(osmId: number, outer: { x: number; z: number }[]): GisBuilding {
  return {
    osmId,
    kind: 'yes',
    name: null,
    heightMeters: null,
    heightProvenance: 'unknown',
    levels: null,
    minHeightMeters: null,
    roofShape: null,
    outer,
    holes: [],
    areaM2: 100,
  };
}

const square = [
  { x: 0, z: 0 },
  { x: 10, z: 0 },
  { x: 10, z: -10 },
  { x: 0, z: -10 },
  { x: 0, z: 0 },
];

describe('GIS normalization', () => {
  it('detects self-intersecting rings and rejects them instead of repairing them', () => {
    // Bow-tie ring: (0,0) -> (10,-10) -> (10,0) -> (0,-10) -> (0,0).
    const bowtie = [
      { x: 0, z: 0 },
      { x: 10, z: -10 },
      { x: 10, z: 0 },
      { x: 0, z: -10 },
      { x: 0, z: 0 },
    ];
    expect(ringSelfIntersects(bowtie)).toBe(true);
    expect(ringSelfIntersects(square)).toBe(false);
    expect(isValidRing(square)).toBe(true);
    expect(isValidRing(bowtie.slice(0, -1))).toBe(false);
    const result = normalizeGisFeatures('test', 'test', [], [building(1, bowtie), building(2, square)]);
    expect(result.buildings).toHaveLength(1);
    expect(result.rejected).toEqual([{ osmId: 1, kind: 'building', reason: 'self-intersecting footprint ring' }]);
  });

  it('dedupes identical road geometry and records the rejection', () => {
    const points = [
      { x: 0, z: 0 },
      { x: 20, z: 0 },
    ];
    const result = normalizeGisFeatures('test', 'test', [road(1, points), road(2, points)], []);
    expect(result.roads).toHaveLength(1);
    expect(result.rejected).toEqual([{ osmId: 2, kind: 'road', reason: 'duplicate geometry' }]);
  });

  it('merges coincident endpoints into junction discs with the widest half-width', () => {
    const a = road(1, [
      { x: 0, z: 0 },
      { x: 10, z: 0 },
    ]);
    const b = {
      ...road(
        2,
        [
          { x: 10, z: 0 },
          { x: 10, z: 10 },
        ],
        'primary'
      ),
      widthMeters: 14,
    };
    const c = road(3, [
      { x: 10, z: 0 },
      { x: 20, z: 0 },
    ]);
    const result = normalizeGisFeatures('test', 'test', [a, b, c], []);
    expect(result.junctions).toHaveLength(1);
    expect(result.junctions[0]).toEqual({ x: 10, z: 0, radiusMeters: 7 });
    expect(result.stats.junctions).toBe(1);
  });

  it('tallies the pilot dataset stats from decoded features', () => {
    const result = normalizeGisFeatures(
      'osm-vector-danang-pilot-v1',
      'osm-vector',
      [
        road(1, [
          { x: 0, z: 0 },
          { x: 30, z: 40 },
        ]),
      ],
      [building(9, square)]
    );
    expect(result.stats.roadRuns).toBe(1);
    expect(result.stats.roadWays).toBe(1);
    expect(result.stats.totalRoadLengthMeters).toBeCloseTo(50, 9);
    expect(result.stats.roadsByClass).toEqual({ residential: 1 });
    expect(result.stats.buildings).toBe(1);
    expect(result.stats.buildingHeightProvenance).toEqual({ unknown: 1 });
    expect(result.stats.rejected).toBe(0);
  });
});
