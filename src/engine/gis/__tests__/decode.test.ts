import { describe, expect, it } from 'vitest';
import { createGeoReference, geoToWorld } from '@/engine/geospatial/core';
import { decodeGisBuildings, decodeGisRoads, decodeDeltaPoints } from '../decode';
import { ROAD_WIDTH_DEFAULTS_M } from '../type';
import {
  DANANG_GIS_PILOT_CHECKPOINTS,
  DANANG_GIS_PILOT_METADATA,
  danangGisPilotAsset,
} from '@/worlds/danang/data/danang-gis-pilot';

describe('GIS pilot asset decode', () => {
  it('decodes 1,830 road runs and 418 buildings with the recorded provenance', () => {
    const roads = decodeGisRoads(danangGisPilotAsset);
    const buildings = decodeGisBuildings(danangGisPilotAsset);
    expect(roads).toHaveLength(1830);
    expect(buildings).toHaveLength(418);
    expect(DANANG_GIS_PILOT_METADATA.checksumSha256).toBe(
      'b4bf752fab45898631449b837e329c5d0b64d38addfc81671c190f634848d94d'
    );
    expect(DANANG_GIS_PILOT_METADATA.roadsKept).toBe(1830);
    expect(DANANG_GIS_PILOT_METADATA.buildingsKept).toBe(418);
    const heightProvenance = { known: 0, estimated: 0, unknown: 0 };
    for (const building of buildings) heightProvenance[building.heightProvenance]++;
    expect(heightProvenance).toEqual({ known: 1, estimated: 7, unknown: 410 });
    const widthProvenance = { source: 0, estimated: 0 };
    for (const road of roads) widthProvenance[road.widthProvenance]++;
    // No road in the pilot carries a `width` tag: every width is estimated.
    expect(widthProvenance).toEqual({ source: 0, estimated: 1830 });
  });

  it('keeps every estimated road width equal to its class default', () => {
    for (const road of decodeGisRoads(danangGisPilotAsset)) {
      expect(road.widthMeters).toBe(ROAD_WIDTH_DEFAULTS_M[road.highway]);
    }
  });

  it('reproduces the ingest checkpoints with the TS geodetic math', () => {
    // Same WGS84 math as core.ts, checked against the Python ingest:
    // the anchor maps to the origin and the other points within 1 mm.
    const reference = createGeoReference({ latitudeDeg: 16.0544, longitudeDeg: 108.2022, ellipsoidalHeightMeters: 0 });
    for (const checkpoint of DANANG_GIS_PILOT_CHECKPOINTS) {
      const world = geoToWorld(
        { latitudeDeg: checkpoint.lat, longitudeDeg: checkpoint.lon, ellipsoidalHeightMeters: 0 },
        reference
      );
      expect(world.x).toBeCloseTo(checkpoint.worldX, 3);
      expect(world.z).toBeCloseTo(checkpoint.worldZ, 3);
    }
  });

  it('keeps every decoded point inside the pilot clip with closed building rings', () => {
    for (const road of decodeGisRoads(danangGisPilotAsset)) {
      expect(road.points.length).toBeGreaterThanOrEqual(2);
      for (const point of road.points) {
        expect(point.x).toBeGreaterThanOrEqual(-1500.21);
        expect(point.x).toBeLessThanOrEqual(1500.0);
        expect(point.z).toBeGreaterThanOrEqual(-1500.04);
        expect(point.z).toBeLessThanOrEqual(1500.05);
      }
    }
    for (const building of decodeGisBuildings(danangGisPilotAsset)) {
      const first = building.outer[0]!;
      const last = building.outer[building.outer.length - 1]!;
      expect(first).toEqual(last);
      expect(building.areaM2).toBeGreaterThanOrEqual(4);
      for (const hole of building.holes) {
        expect(hole[0]).toEqual(hole[hole.length - 1]);
      }
    }
  });

  it('round-trips delta-encoded points exactly at decimetre precision', () => {
    const points = decodeDeltaPoints([15000, -15000, 10, -20, -5, 5]);
    expect(points).toEqual([
      { x: 1500, z: -1500 },
      { x: 1501, z: -1502 },
      { x: 1500.5, z: -1501.5 },
    ]);
    expect(() => decodeDeltaPoints([1, 2, 3])).toThrow('even length');
    expect(() => decodeDeltaPoints([1.5, 2])).toThrow('integers');
  });

  it('records the one known height and the levels-derived heights', () => {
    const buildings = decodeGisBuildings(danangGisPilotAsset);
    const known = buildings.filter((building) => building.heightProvenance === 'known');
    expect(known).toHaveLength(1);
    expect(known[0]!.heightMeters).toBe(21);
    expect(known[0]!.levels).toBe(7);
    for (const building of buildings.filter((item) => item.heightProvenance === 'estimated')) {
      expect(building.heightMeters).toBeCloseTo((building.levels ?? 0) * 3, 9);
    }
    expect(buildings.filter((building) => building.heightMeters === null)).toHaveLength(410);
  });
});
