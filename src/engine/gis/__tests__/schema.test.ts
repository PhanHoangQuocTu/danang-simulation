import { describe, expect, it } from 'vitest';
import { gisBuildingSchema, gisRoadSchema } from '../schema';

function road(overrides: Record<string, unknown> = {}) {
  return {
    osmId: 123,
    highway: 'residential',
    name: 'Đường Test',
    lanes: 2,
    widthMeters: 6,
    widthProvenance: 'estimated',
    surface: 'asphalt',
    bridge: false,
    tunnel: false,
    oneway: null,
    points: [
      { x: 0, z: 0 },
      { x: 10, z: 0 },
    ],
    ...overrides,
  };
}

function building(overrides: Record<string, unknown> = {}) {
  return {
    osmId: 456,
    kind: 'yes',
    name: null,
    heightMeters: null,
    heightProvenance: 'unknown',
    levels: null,
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
    ...overrides,
  };
}

describe('GIS schemas', () => {
  it('accepts a valid estimated-width road and a footprint-only building', () => {
    expect(gisRoadSchema.safeParse(road()).success).toBe(true);
    expect(gisBuildingSchema.safeParse(building()).success).toBe(true);
  });

  it('rejects an estimated width that is not the class default', () => {
    expect(gisRoadSchema.safeParse(road({ widthMeters: 7 })).success).toBe(false);
    expect(gisRoadSchema.safeParse(road({ widthMeters: 6, widthProvenance: 'source' })).success).toBe(true);
  });

  it('rejects roads with duplicate points or points outside the pilot clip', () => {
    expect(
      gisRoadSchema.safeParse(
        road({
          points: [
            { x: 0, z: 0 },
            { x: 0, z: 0 },
          ],
        })
      ).success
    ).toBe(false);
    expect(
      gisRoadSchema.safeParse(
        road({
          points: [
            { x: 0, z: 0 },
            { x: 2000, z: 0 },
          ],
        })
      ).success
    ).toBe(false);
  });

  it('rejects an unknown height provenance paired with a height, and vice versa', () => {
    expect(gisBuildingSchema.safeParse(building({ heightMeters: 12 })).success).toBe(false);
    expect(gisBuildingSchema.safeParse(building({ heightProvenance: 'known', heightMeters: 12 })).success).toBe(true);
    expect(gisBuildingSchema.safeParse(building({ heightProvenance: 'known', heightMeters: null })).success).toBe(
      false
    );
  });

  it('requires an estimated height to equal levels x 3.0 m', () => {
    expect(
      gisBuildingSchema.safeParse(building({ heightProvenance: 'estimated', levels: 5, heightMeters: 15 })).success
    ).toBe(true);
    expect(
      gisBuildingSchema.safeParse(building({ heightProvenance: 'estimated', levels: 5, heightMeters: 12 })).success
    ).toBe(false);
  });

  it('rejects an open outer ring, a clockwise outer ring, and a min_height above the height', () => {
    const outer = building().outer as { x: number; z: number }[];
    expect(gisBuildingSchema.safeParse(building({ outer: outer.slice(0, -1) })).success).toBe(false);
    expect(gisBuildingSchema.safeParse(building({ outer: [...outer].reverse() })).success).toBe(false);
    expect(
      gisBuildingSchema.safeParse(building({ heightProvenance: 'known', heightMeters: 10, minHeightMeters: 12 }))
        .success
    ).toBe(false);
  });
});
