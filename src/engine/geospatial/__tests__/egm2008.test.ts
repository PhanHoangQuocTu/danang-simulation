import { describe, expect, it } from 'vitest';
import {
  DANANG_EGM2008_ANCHOR_UNDULATION_METERS,
  DANANG_EGM2008_PILOT_SPREAD_METERS,
  DANANG_EGM2008_SAMPLES,
  danangEgm2008UndulationMeters,
  EGM2008ValidationError,
  ellipsoidalToOrthometricMeters,
  orthometricToEllipsoidalMeters,
} from '../egm2008';

describe('EGM2008 verified undulation — Da Nang pilot', () => {
  it('stores exactly the five values verified on 2026-11-20, nothing invented', () => {
    expect(DANANG_EGM2008_SAMPLES).toHaveLength(5);
    expect(DANANG_EGM2008_ANCHOR_UNDULATION_METERS).toBe(-10.8043);
    expect(DANANG_EGM2008_PILOT_SPREAD_METERS).toBeCloseTo(0.1321, 4);
    const byCoord = new Map(
      DANANG_EGM2008_SAMPLES.map((s) => [`${s.latitudeDeg},${s.longitudeDeg}`, s.undulationMeters])
    );
    expect(byCoord.get('16.0544,108.2022')).toBe(-10.8043);
    expect(byCoord.get('16.067955,108.188181')).toBe(-10.8704);
    expect(byCoord.get('16.067955,108.216217')).toBe(-10.8571);
    expect(byCoord.get('16.040844,108.188181')).toBe(-10.747);
    expect(byCoord.get('16.040844,108.216217')).toBe(-10.7383);
  });

  it('interpolates near the verified anchor value at the pilot centre', () => {
    // Bilinear over the four corners gives the corner mean (-10.8032 m) at the
    // bbox centre; the independently verified anchor sample is -10.8043 m —
    // a 1.1 mm difference, within the EGM2008 5' grid interpolation noise.
    expect(danangEgm2008UndulationMeters(16.0544, 108.2022)).toBeCloseTo(-10.8032, 3);
  });

  it('bilinear interpolation stays within the verified corner range', () => {
    const n = danangEgm2008UndulationMeters(16.0544, 108.2022);
    expect(n).toBeGreaterThanOrEqual(-10.8704);
    expect(n).toBeLessThanOrEqual(-10.7383);
    // Corners reproduce their verified values exactly.
    expect(danangEgm2008UndulationMeters(16.067955, 108.188181)).toBeCloseTo(-10.8704, 10);
    expect(danangEgm2008UndulationMeters(16.040844, 108.216217)).toBeCloseTo(-10.7383, 10);
  });

  it('converts the measured DEM spawn height: H 6.0455 m -> h about -4.758 m', () => {
    // Bilinear N at the anchor is -10.8032 m (verified anchor sample -10.8043 m);
    // h = 6.0455 - 10.8032 = -4.7577 m, within 1.1 mm of the -4.759 m computed
    // from the anchor sample directly.
    const h = orthometricToEllipsoidalMeters(6.0455, 16.0544, 108.2022);
    expect(h).toBeCloseTo(-4.7577, 3);
    expect(ellipsoidalToOrthometricMeters(h, 16.0544, 108.2022)).toBeCloseTo(6.0455, 6);
  });

  it('round-trips orthometric <-> ellipsoidal across the pilot', () => {
    for (const sample of DANANG_EGM2008_SAMPLES) {
      const h = orthometricToEllipsoidalMeters(10, sample.latitudeDeg, sample.longitudeDeg);
      expect(ellipsoidalToOrthometricMeters(h, sample.latitudeDeg, sample.longitudeDeg)).toBeCloseTo(10, 9);
    }
  });

  it('refuses to extrapolate outside the verified pilot bbox', () => {
    expect(() => danangEgm2008UndulationMeters(16.1, 108.2022)).toThrow(EGM2008ValidationError);
    expect(() => danangEgm2008UndulationMeters(16.0544, 108.3)).toThrow(EGM2008ValidationError);
    expect(danangEgm2008UndulationMeters(16.1, 108.2022, true)).toBe(DANANG_EGM2008_ANCHOR_UNDULATION_METERS);
  });

  it('rejects non-finite inputs', () => {
    expect(() => orthometricToEllipsoidalMeters(Number.NaN, 16.0544, 108.2022)).toThrow(EGM2008ValidationError);
    expect(() => danangEgm2008UndulationMeters(Number.POSITIVE_INFINITY, 108.2022)).toThrow(EGM2008ValidationError);
  });
});
