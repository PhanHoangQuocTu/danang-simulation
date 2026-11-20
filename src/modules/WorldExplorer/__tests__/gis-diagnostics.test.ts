import { describe, expect, it } from 'vitest';
import { ResourceScope } from '@/engine/core/resources';
import { danangDemPilotGridInput } from '@/worlds/danang/data/danang-dem-pilot';
import { GridDemProvider } from '@/world-core/terrain/grid';
import { buildGisLayer } from '@/worlds/danang/gis-layer';
import { runGisDiagnosticsSuite } from '../gis-diagnostics';

describe('GIS diagnostics', () => {
  it('passes all 8 checks when the layer is off, naming the mode', () => {
    const checks = runGisDiagnosticsSuite(null, 'off');
    expect(checks).toHaveLength(8);
    expect(checks.map((check) => check.id)).toEqual([
      'GIS-01',
      'GIS-02',
      'GIS-03',
      'GIS-04',
      'GIS-05',
      'GIS-06',
      'GIS-07',
      'GIS-08',
    ]);
    expect(checks.every((check) => check.passed)).toBe(true);
    expect(checks[0]!.details).toContain('GIS off');
  });

  it('fails GIS-01 when GIS was requested but the layer was not built', () => {
    const checks = runGisDiagnosticsSuite(null, 'real');
    expect(checks[0]!.passed).toBe(false);
    expect(checks[0]!.details).toContain('not built');
    expect(checks.slice(1).every((check) => check.passed)).toBe(true);
  });

  it('passes all 8 checks for the real pilot layer and names the dataset', () => {
    const scope = new ResourceScope();
    const terrain = new GridDemProvider(danangDemPilotGridInput());
    const layer = buildGisLayer(scope, terrain);
    const checks = runGisDiagnosticsSuite(layer, 'real');
    expect(checks).toHaveLength(8);
    expect(checks.every((check) => check.passed)).toBe(true);
    expect(checks[0]!.details).toContain('osm-vector-danang-pilot-v1');
    expect(checks[1]!.details).toContain('1830 road runs / 418 buildings');
    expect(checks[6]!.details).toContain('known 1 / estimated 7 / unknown 410');
    terrain.dispose();
    scope.dispose();
  });
});
