import { describe, expect, it } from 'vitest';
import {
  buildBuildingGeometry,
  buildJunctionDiscs,
  buildRoadRibbon,
  mergeGeometries,
  sampleFoundationElevation,
} from '../geometry';
import type { GisBuilding, GisRoad } from '../type';

const flat = () => 5;
const sloped = (x: number, z: number) => 5 + x * 0.01 + z * 0.02;

function road(points: { x: number; z: number }[], widthMeters = 6): GisRoad {
  return {
    osmId: 1,
    highway: 'residential',
    name: null,
    lanes: null,
    widthMeters,
    widthProvenance: 'estimated',
    surface: null,
    bridge: false,
    tunnel: false,
    oneway: null,
    points,
  };
}

function building(heightMeters: number | null, provenance: GisBuilding['heightProvenance']): GisBuilding {
  return {
    osmId: 2,
    kind: 'yes',
    name: null,
    heightMeters,
    heightProvenance: provenance,
    levels: heightMeters === null ? null : 4,
    minHeightMeters: null,
    roofShape: null,
    outer: [
      { x: 0, z: 0 },
      { x: 10, z: 0 },
      { x: 10, z: -10 },
      { x: 0, z: -10 },
      { x: 0, z: 0 },
    ],
    holes: [],
    areaM2: 100,
  };
}

describe('GIS geometry', () => {
  it('builds a draped ribbon with the documented lift and both edges', () => {
    const geometry = buildRoadRibbon(
      road([
        { x: 0, z: 0 },
        { x: 20, z: 0 },
      ]),
      flat
    );
    expect(geometry).not.toBeNull();
    const positions = geometry!.attributes.position!;
    expect(positions.count).toBe(6); // subdivided to 10 m steps: 3 samples x 2 edges
    const ys = new Set<number>();
    for (let i = 0; i < positions.count; i++) ys.add(positions.getY(i));
    // Float32 storage: 5.08 is stored as 5.0799999, so compare with tolerance.
    expect(ys.size).toBe(1);
    expect([...ys][0]).toBeCloseTo(5.08, 5);
    const xs = new Set<number>();
    for (let i = 0; i < positions.count; i++) xs.add(positions.getX(i));
    expect([...xs].sort((a, b) => a - b)).toEqual([0, 10, 20]);
    const zs = new Set<number>();
    for (let i = 0; i < positions.count; i++) zs.add(positions.getZ(i));
    expect([...zs].sort((a, b) => a - b)).toEqual([-3, 3]);
    expect(geometry!.index!.count).toBe(12);
    geometry!.dispose();
  });

  it('refuses a ribbon when any elevation is missing instead of inventing one', () => {
    const geometry = buildRoadRibbon(
      road([
        { x: 0, z: 0 },
        { x: 20, z: 0 },
      ]),
      () => null
    );
    expect(geometry).toBeNull();
  });

  it('builds junction discs at the merged radius above the ribbons', () => {
    const discs = buildJunctionDiscs([{ x: 0, z: 0, radiusMeters: 7 }], flat);
    expect(discs).not.toBeNull();
    const positions = discs!.attributes.position!;
    let maxRadius = 0;
    let y = 0;
    for (let i = 0; i < positions.count; i++) {
      maxRadius = Math.max(maxRadius, Math.hypot(positions.getX(i), positions.getZ(i)));
      y = positions.getY(i);
    }
    expect(maxRadius).toBeCloseTo(7, 5);
    expect(y).toBeCloseTo(5.09, 5);
    expect(buildJunctionDiscs([], flat)).toBeNull();
    discs!.dispose();
  });

  it('uses the minimum sampled elevation as the building foundation', () => {
    expect(sampleFoundationElevation(building(12, 'known'), sloped)).toBeCloseTo(5 + 0 + -10 * 0.02, 9);
    const built = buildBuildingGeometry(building(12, 'known'), sloped);
    expect(built).not.toBeNull();
    expect(built!.baseY).toBeCloseTo(4.8, 9);
    expect(built!.topY).toBeCloseTo(16.8, 9);
    expect(built!.extruded).toBe(true);
    const positions = built!.geometry.attributes.position!;
    let minY = Number.POSITIVE_INFINITY;
    let maxY = Number.NEGATIVE_INFINITY;
    for (let i = 0; i < positions.count; i++) {
      minY = Math.min(minY, positions.getY(i));
      maxY = Math.max(maxY, positions.getY(i));
    }
    expect(minY).toBeCloseTo(4.8, 5);
    expect(maxY).toBeCloseTo(16.8, 5);
    built!.geometry.dispose();
  });

  it('renders unknown-height buildings as flat footprints, never extruded', () => {
    const built = buildBuildingGeometry(building(null, 'unknown'), flat);
    expect(built).not.toBeNull();
    expect(built!.extruded).toBe(false);
    expect(built!.topY).toBeCloseTo(5, 9);
    const positions = built!.geometry.attributes.position!;
    for (let i = 0; i < positions.count; i++) expect(positions.getY(i)).toBeCloseTo(5.05, 5);
    built!.geometry.dispose();
  });

  it('merges geometries into one draw call with concatenated vertices', () => {
    const a = buildRoadRibbon(
      road([
        { x: 0, z: 0 },
        { x: 10, z: 0 },
      ]),
      flat
    )!;
    const b = buildRoadRibbon(
      road([
        { x: 0, z: 10 },
        { x: 10, z: 10 },
      ]),
      flat
    )!;
    const merged = mergeGeometries([a, b]);
    // Inputs are indexed; merging converts to non-indexed, so the merged
    // vertex count equals the summed triangle-vertex counts.
    expect(merged.attributes.position!.count).toBe(a.index!.count + b.index!.count);
    expect(merged.index).toBeNull();
    a.dispose();
    b.dispose();
    merged.dispose();
  });
});
