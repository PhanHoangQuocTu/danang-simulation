import { act, renderHook } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { geoToWorld, headingToWorldYaw } from '@/engine/geospatial/core';
import { projectWorldToMiniMap } from '@/engine/spatial/minimap';
import { DA_NANG_CONFIG } from '@/worlds/danang/const';
import { runGeospatialDiagnosticsSuite } from '../geospatial-diagnostics';
import { useGeoTelemetry } from '../hooks/useGeoTelemetry';
import { calculateDaNangSolarData, getDaNangClockData } from '@/worlds/danang/environment/solar';

afterEach(() => vi.useRealTimers());

describe('read-only geographic integration', () => {
  it('GEO-15 preserves unknown accuracy and an explicitly assumed ellipsoid height', () => {
    const config = DANANG_GEO_REFERENCE;
    expect(config.anchor.coordinate.latitudeDeg).toBe(DA_NANG_CONFIG.latitude);
    expect(config.anchor.coordinate.longitudeDeg).toBe(DA_NANG_CONFIG.longitude);
    expect(config.anchor.status).toBe('reference-only');
    expect(config.anchor.isGroundTruthVerified).toBe(false);
    expect(config.anchor.horizontalAccuracyMeters).toBeNull();
    expect(config.anchor.verticalAccuracyMeters).toBeNull();
    expect(config.heightDatum).toBe('WGS84_ELLIPSOID');
    expect(Object.isFrozen(config.anchor.coordinate)).toBe(true);
    expect(Object.isFrozen(config.anchor)).toBe(true);
  });

  it('GEO-10 keeps East right, North up and all marker headings consistent', () => {
    const { anchor, reference } = DANANG_GEO_REFERENCE;
    const east = geoToWorld({ ...anchor.coordinate, longitudeDeg: anchor.coordinate.longitudeDeg + 0.0001 }, reference);
    const north = geoToWorld({ ...anchor.coordinate, latitudeDeg: anchor.coordinate.latitudeDeg + 0.0001 }, reference);
    expect(projectWorldToMiniMap(east.x, east.z, 0, 0, 0, 1).u).toBeGreaterThan(0.5);
    expect(projectWorldToMiniMap(north.x, north.z, 0, 0, 0, 1).v).toBeLessThan(0.5);
    for (const heading of [0, 90, 180, 270]) {
      expect(projectWorldToMiniMap(0, 0, headingToWorldYaw(heading), 0, 0, 1).screenRotationDeg).toBeCloseTo(
        heading,
        10
      );
    }
  });

  it('GEO-01–16 execute and retain measured residual evidence', () => {
    const checks = runGeospatialDiagnosticsSuite();
    expect(checks).toHaveLength(16);
    expect(checks.filter((check) => !check.passed)).toEqual([]);
    expect(checks[10].details).toContain('0.01');
    console.info(checks.map((check) => `${check.id}: ${check.passed ? 'PASS' : 'FAIL'} ${check.details}`).join('\n'));
  });

  it('keeps solar azimuth clockwise from North, separate from character yaw', () => {
    for (const hour of [0, 6, 12, 18]) {
      const solar = calculateDaNangSolarData(
        getDaNangClockData(new Date(`2026-06-21T${String(hour).padStart(2, '0')}:00:00Z`))
      );
      const yaw = headingToWorldYaw(solar.azimuthDeg);
      const horizontal = Math.hypot(solar.sunDirection.x, solar.sunDirection.z);
      expect(solar.sunDirection.x / horizontal).toBeCloseTo(Math.sin(yaw), 10);
      expect(solar.sunDirection.z / horizontal).toBeCloseTo(Math.cos(yaw), 10);
    }
    // Literal cardinal vectors are also checked by GEO-09 and Mini Map tests.
    expect(Math.cos(headingToWorldYaw(0))).toBeCloseTo(-1, 12);
    expect(Math.sin(headingToWorldYaw(90))).toBeCloseTo(1, 12);
  });

  it('samples current player position at 2Hz only while debug is open', () => {
    vi.useFakeTimers();
    const initial = { x: 0, y: 0, z: 0, rotationY: Math.PI };
    const { result, rerender, unmount } = renderHook(({ position, enabled }) => useGeoTelemetry(position, enabled), {
      initialProps: { position: initial, enabled: false },
    });
    expect(result.current).toBeNull();
    rerender({ position: initial, enabled: true });
    expect(result.current?.coordinate.latitudeDeg).toBeCloseTo(16.0544, 9);
    expect(result.current?.headingDeg).toBeCloseTo(0, 9);
    const first = result.current;
    const moved = { x: 10, y: 3, z: -10, rotationY: Math.PI / 2 };
    rerender({ position: moved, enabled: true });
    act(() => vi.advanceTimersByTime(499));
    expect(result.current).toBe(first);
    act(() => vi.advanceTimersByTime(1));
    expect(result.current?.coordinate.latitudeDeg).toBeGreaterThan(16.0544);
    expect(result.current?.coordinate.longitudeDeg).toBeGreaterThan(108.2022);
    expect(result.current?.headingDeg).toBeCloseTo(90, 9);
    expect(moved).toEqual({ x: 10, y: 3, z: -10, rotationY: Math.PI / 2 });
    rerender({ position: moved, enabled: false });
    const last = result.current;
    act(() => vi.advanceTimersByTime(5000));
    expect(result.current).toBe(last);
    expect(vi.getTimerCount()).toBe(0);
    unmount();
  });
});
