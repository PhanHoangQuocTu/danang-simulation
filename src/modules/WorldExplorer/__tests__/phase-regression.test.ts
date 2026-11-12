import { describe, expect, it } from 'vitest';

import { runSystemDiagnosticsSuite } from '../diagnostics';
import { computeNormalizedJoystickInput } from '@/engine/controls/input';
import { projectWorldToMiniMap } from '@/engine/spatial/minimap';
import { mapWmoWeatherCode } from '@/integrations/weather/mapper';
import { calculateDaNangSolarData, getDaNangClockData } from '@/worlds/danang/environment/solar';

// A variable import keeps historical TSX outside production TypeScript's module graph.
const referencePath = '../../../../history/code/da_nang_3d_open_world_simulation_phase_10.tsx';
const original = (await import(referencePath)) as {
  mapWmoWeatherCode: typeof mapWmoWeatherCode;
  computeNormalizedJoystickInput: typeof computeNormalizedJoystickInput;
  projectWorldToMiniMap: typeof projectWorldToMiniMap;
  getDaNangClockData: typeof getDaNangClockData;
  calculateDaNangSolarData: typeof calculateDaNangSolarData;
};

describe('Phase 1–10 helper extraction', () => {
  it('passes all nine historical diagnostics without creating a renderer', () => {
    const results = runSystemDiagnosticsSuite();
    expect(results.map((result) => result.id)).toEqual([
      'DIAG-01',
      'DIAG-02',
      'DIAG-03',
      'DIAG-04',
      'DIAG-05',
      'DIAG-06',
      'DIAG-07',
      'DIAG-08',
      'DIAG-09',
    ]);
    expect(results.filter((result) => !result.passed)).toEqual([]);
  });

  it('preserves every WMO mapping and unknown-code behavior', () => {
    for (let code = -1; code <= 100; code++) {
      expect(mapWmoWeatherCode(code)).toEqual(original.mapWmoWeatherCode(code));
    }
  });

  it('preserves joystick deadzone, normalization and non-finite guards', () => {
    for (const [x, y] of [
      [0, 0],
      [2, 2],
      [100, -100],
      [-44, 20],
      [Number.NaN, Number.POSITIVE_INFINITY],
    ]) {
      expect(computeNormalizedJoystickInput(x, y, 44, 0.12)).toEqual(
        original.computeNormalizedJoystickInput(x, y, 44, 0.12)
      );
    }
  });

  it('preserves map heading, zoom and edge projection', () => {
    for (const x of [-250, -36, 0, 36, 250]) {
      for (const yaw of [0, Math.PI / 2, Math.PI]) {
        expect(projectWorldToMiniMap(x, -36, yaw, 0, 0, 1)).toEqual(
          original.projectWorldToMiniMap(x, -36, yaw, 0, 0, 1)
        );
      }
    }
  });

  it('preserves clock and solar snapshots across seasons and midnight', () => {
    for (const timestamp of ['2026-06-21T05:00:00Z', '2026-12-21T17:00:00Z', '2026-11-10T01:30:00Z']) {
      const date = new Date(timestamp);
      const clock = getDaNangClockData(date);
      expect(clock).toEqual(original.getDaNangClockData(date));
      expect(calculateDaNangSolarData(clock)).toEqual(original.calculateDaNangSolarData(clock));
    }
  });
});
