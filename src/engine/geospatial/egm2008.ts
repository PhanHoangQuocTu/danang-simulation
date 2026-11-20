/**
 * EGM2008 geoid undulation (N) for the Da Nang DEM pilot — verified values only.
 *
 * Provenance (2026-11-20): values below were read from the official NGA EGM2008
 * model through GeographicLib GeoidEval v2.5.2
 * (https://geographiclib.sourceforge.io/cgi-bin/GeoidEval, 1-arc-minute grid,
 * cubic interpolation). Cross-check performed the same day: the same tool
 * returns N = -28.4939 m at Everest (27.9881 N, 86.9250 E), matching the
 * published EGM2008 value of -28.49 m. No value here is estimated, rounded
 * from another source, or invented — only the five verified points are stored.
 *
 * Relation: h = H + N, where h is the ellipsoidal height (WGS84) and H is the
 * orthometric height (height above the EGM2008 geoid, roughly mean sea level).
 *
 * DECISION (2026-11-20, "giữ orthometric"): the Phase 16 DEM pilot stays
 * orthometric by default — world Y = orthometric height, exactly as ingested.
 * The conversion helpers in this module exist so callers can convert
 * explicitly when a WGS84-ellipsoidal height is required; nothing in the
 * runtime calls them implicitly. The pilot bbox is small (3 km) and N varies
 * by only 0.132 m across it, so a single anchor constant is also safe — the
 * bilinear interpolation below is provided for correctness, not because the
 * variation matters at this scale.
 *
 * Pure TypeScript: no React, Next.js, Three.js or city content (engine rule).
 */

/** One verified EGM2008 undulation sample. */
export interface EGM2008Sample {
  readonly latitudeDeg: number;
  readonly longitudeDeg: number;
  /** Geoid height N above the WGS84 ellipsoid, metres. */
  readonly undulationMeters: number;
}

/** Pilot bbox (Phase 16 resampled grid): lon 108.188181–108.216217, lat 16.040844–16.067955. */
export const DANANG_PILOT_BBOX = Object.freeze({
  minLongitudeDeg: 108.188181,
  maxLongitudeDeg: 108.216217,
  minLatitudeDeg: 16.040844,
  maxLatitudeDeg: 16.067955,
});

/**
 * The five verified EGM2008 samples (GeographicLib GeoidEval v2.5.2, 2026-11-20).
 * Anchor = Phase 16 pilot centre (16.0544, 108.2022); corners = pilot bbox.
 */
export const DANANG_EGM2008_SAMPLES: readonly EGM2008Sample[] = Object.freeze([
  { latitudeDeg: 16.0544, longitudeDeg: 108.2022, undulationMeters: -10.8043 },
  { latitudeDeg: 16.067955, longitudeDeg: 108.188181, undulationMeters: -10.8704 },
  { latitudeDeg: 16.067955, longitudeDeg: 108.216217, undulationMeters: -10.8571 },
  { latitudeDeg: 16.040844, longitudeDeg: 108.188181, undulationMeters: -10.747 },
  { latitudeDeg: 16.040844, longitudeDeg: 108.216217, undulationMeters: -10.7383 },
]);

/** Undulation at the pilot anchor (16.0544, 108.2022). */
export const DANANG_EGM2008_ANCHOR_UNDULATION_METERS = -10.8043;

/** Spread of N across the pilot bbox: max - min = 0.132 m. */
export const DANANG_EGM2008_PILOT_SPREAD_METERS = 0.1321;

export class EGM2008ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EGM2008ValidationError';
  }
}

function finite(value: unknown, label: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new EGM2008ValidationError(`${label} must be a finite number`);
  }
}

/**
 * Bilinear interpolation of N over the pilot bbox from the four verified
 * corner samples. Outside the bbox the anchor value is returned only when
 * the caller explicitly opts in via `allowOutsidePilot`; otherwise it throws
 * — N is verified for this pilot only, never extrapolated silently.
 */
export function danangEgm2008UndulationMeters(
  latitudeDeg: number,
  longitudeDeg: number,
  allowOutsidePilot = false
): number {
  finite(latitudeDeg, 'latitudeDeg');
  finite(longitudeDeg, 'longitudeDeg');
  const { minLatitudeDeg, maxLatitudeDeg, minLongitudeDeg, maxLongitudeDeg } = DANANG_PILOT_BBOX;
  const inside =
    latitudeDeg >= minLatitudeDeg &&
    latitudeDeg <= maxLatitudeDeg &&
    longitudeDeg >= minLongitudeDeg &&
    longitudeDeg <= maxLongitudeDeg;
  if (!inside && !allowOutsidePilot) {
    throw new EGM2008ValidationError(
      'EGM2008 undulation is verified for the Da Nang pilot bbox only (lat 16.040844–16.067955, lon 108.188181–108.216217)'
    );
  }
  if (!inside) return DANANG_EGM2008_ANCHOR_UNDULATION_METERS;
  const byLatLon = (lat: number, lon: number): number => {
    const sample = DANANG_EGM2008_SAMPLES.find((s) => s.latitudeDeg === lat && s.longitudeDeg === lon);
    if (!sample) throw new EGM2008ValidationError('Missing verified EGM2008 corner sample');
    return sample.undulationMeters;
  };
  const fx = (longitudeDeg - minLongitudeDeg) / (maxLongitudeDeg - minLongitudeDeg);
  const fy = (latitudeDeg - minLatitudeDeg) / (maxLatitudeDeg - minLatitudeDeg);
  const sw = byLatLon(minLatitudeDeg, minLongitudeDeg);
  const se = byLatLon(minLatitudeDeg, maxLongitudeDeg);
  const nw = byLatLon(maxLatitudeDeg, minLongitudeDeg);
  const ne = byLatLon(maxLatitudeDeg, maxLongitudeDeg);
  return sw * (1 - fx) * (1 - fy) + se * fx * (1 - fy) + nw * (1 - fx) * fy + ne * fx * fy;
}

/** Orthometric height H (m, EGM2008) -> ellipsoidal height h (m, WGS84): h = H + N. */
export function orthometricToEllipsoidalMeters(
  orthometricHeightMeters: number,
  latitudeDeg: number,
  longitudeDeg: number
): number {
  finite(orthometricHeightMeters, 'orthometricHeightMeters');
  return orthometricHeightMeters + danangEgm2008UndulationMeters(latitudeDeg, longitudeDeg);
}

/** Ellipsoidal height h (m, WGS84) -> orthometric height H (m, EGM2008): H = h - N. */
export function ellipsoidalToOrthometricMeters(
  ellipsoidalHeightMeters: number,
  latitudeDeg: number,
  longitudeDeg: number
): number {
  finite(ellipsoidalHeightMeters, 'ellipsoidalHeightMeters');
  return ellipsoidalHeightMeters - danangEgm2008UndulationMeters(latitudeDeg, longitudeDeg);
}
