import { describe, expect, it } from 'vitest';
import { ResourceScope } from '@/engine/core/resources';
import { danangDemPilotGridInput } from '@/worlds/danang/data/danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';
import { buildGisLayer } from '../gis-layer';

describe('Phase 17 GIS layer', () => {
  it('builds the pilot layer on DEM terrain with no skipped features', () => {
    const scope = new ResourceScope();
    const terrain = new GridDemProvider(danangDemPilotGridInput());
    const layer = buildGisLayer(scope, terrain);
    expect(layer.normalized.stats.roadRuns).toBe(1830);
    expect(layer.normalized.stats.buildings).toBe(418);
    expect(layer.normalized.stats.junctions).toBeGreaterThan(0);
    expect(layer.skippedRoads).toBe(0);
    expect(layer.skippedBuildings).toBe(0);
    expect(layer.normalized.rejected).toHaveLength(0);
    expect(layer.extrudedBuildings).toBe(8); // 1 known + 7 estimated heights
    expect(layer.footprintBuildings).toBe(410); // unknown heights stay flat
    expect(layer.group.children).toHaveLength(4); // roads, junctions, buildings, footprints
    expect(layer.roadTriangles).toBeGreaterThan(0);
    expect(layer.buildingTriangles).toBeGreaterThan(0);
    expect(layer.junctionTriangles).toBeGreaterThan(0);
    expect(layer.footprintTriangles).toBeGreaterThan(0);
    const names = layer.group.children.map((child) => child.name);
    expect(names).toEqual(['gis-roads', 'gis-junctions', 'gis-buildings', 'gis-footprints']);
    terrain.dispose();
    scope.dispose();
  });
});
