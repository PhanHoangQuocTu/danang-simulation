import type { DiagnosticCheckResult } from '@/engine/core/type';
import {
  ecefToEnu,
  ecefToGeodetic,
  enuToEcef,
  enuToWorld,
  geodeticToEcef,
  geoToWorld,
  GeospatialValidationError,
  headingToWorldYaw,
  normalizeLongitudeDegrees,
  worldToEnu,
  worldToGeo,
  worldYawToHeading,
} from '@/engine/geospatial/core';
import { projectWorldToMiniMap } from '@/engine/spatial/minimap';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { runSystemDiagnosticsSuite } from './diagnostics';

/** Deterministic checks, separate from and preserving the nine historical diagnostics. */
export function runGeospatialDiagnosticsSuite(): DiagnosticCheckResult[] {
  const results: DiagnosticCheckResult[] = [];
  const config = DANANG_GEO_REFERENCE;
  const ref = config.reference;
  const anchor = config.anchor.coordinate;
  const add = (id: number, passed: boolean, details: string) => {
    results.push({
      id: `GEO-${String(id).padStart(2, '0')}`,
      domain: 'Geospatial Core',
      name: `GEO-${id}`,
      passed,
      details,
    });
  };
  const residual = (point: { x: number; y: number; z: number }) => {
    const restored = geoToWorld(worldToGeo(point, ref), ref);
    return Math.hypot(restored.x - point.x, restored.y - point.y, restored.z - point.z);
  };
  const origin = geoToWorld(anchor, ref);
  add(
    1,
    Math.hypot(origin.x, origin.y, origin.z) < 1e-8,
    `Anchor residual ${Math.hypot(origin.x, origin.y, origin.z)} m`
  );
  const zero = worldToGeo({ x: 0, y: 0, z: 0 }, ref);
  const zeroEcef = geodeticToEcef(zero);
  const zeroError = Math.hypot(
    zeroEcef.xMeters - ref.ecef.xMeters,
    zeroEcef.yMeters - ref.ecef.yMeters,
    zeroEcef.zMeters - ref.ecef.zMeters
  );
  add(2, zeroError < 1e-6, `World origin residual ${zeroError} m`);
  // EPSG Guidance Note 7-2 method 9602 worked example (rounded published meters).
  const golden = geodeticToEcef({
    latitudeDeg: 53 + 48 / 60 + 33.82 / 3600,
    longitudeDeg: 2 + 7 / 60 + 46.38 / 3600,
    ellipsoidalHeightMeters: 73,
  });
  const goldenError = Math.hypot(golden.xMeters - 3771793.97, golden.yMeters - 140253.34, golden.zMeters - 5124304.35);
  add(3, goldenError < 0.01, `EPSG golden residual ${goldenError} m; threshold 0.01 m`);
  const point = { xMeters: golden.xMeters, yMeters: golden.yMeters, zMeters: golden.zMeters };
  const restored = enuToEcef(ecefToEnu(point, ref), ref);
  const ecefError = Math.hypot(
    restored.xMeters - point.xMeters,
    restored.yMeters - point.yMeters,
    restored.zMeters - point.zMeters
  );
  add(4, ecefError < 1e-6, `ECEF/ENU residual ${ecefError} m`);
  const axes = worldToEnu(enuToWorld({ eastMeters: 1, northMeters: 2, upMeters: 3 }));
  add(5, axes.eastMeters === 1 && axes.northMeters === 2 && axes.upMeters === 3, 'ENU 1,2,3 = World 1,3,-2');
  const east = geoToWorld({ ...anchor, longitudeDeg: anchor.longitudeDeg + 0.0001 }, ref);
  const north = geoToWorld({ ...anchor, latitudeDeg: anchor.latitudeDeg + 0.0001 }, ref);
  add(6, east.x > 0, `East X=${east.x} m`);
  add(7, north.z < 0, `North Z=${north.z} m`);
  const up = geoToWorld({ ...anchor, ellipsoidalHeightMeters: 10 }, ref);
  add(8, Math.abs(up.y - 10) < 1e-6, `Up Y=${up.y} m`);
  const headings = [0, 90, 180, 270];
  add(
    9,
    headings.every((heading) => Math.abs(worldYawToHeading(headingToWorldYaw(heading)) - heading) < 1e-9),
    'N/E/S/W heading/yaw round-trip'
  );
  add(
    10,
    projectWorldToMiniMap(east.x, east.z, 0, 0, 0, 1).u > 0.5 &&
      projectWorldToMiniMap(north.x, north.z, 0, 0, 0, 1).v < 0.5 &&
      headings.every(
        (h) => Math.abs(projectWorldToMiniMap(0, 0, headingToWorldYaw(h), 0, 0, 1).screenRotationDeg - h) < 1e-9
      ),
    'East right; North up; marker heading consistent'
  );
  let maxError = 0;
  for (const x of [-3500, -68, -0.001, 0, 0.001, 68, 3500]) {
    for (const z of [-3500, -68, 0, 68, 3500]) {
      for (const y of [-100, 0, 0.001, 10, 100]) maxError = Math.max(maxError, residual({ x, y, z }));
    }
  }
  add(11, maxError <= 0.01, `Maximum world residual ${maxError} m; threshold 0.01 m; 175 points within 5km`);
  let rejected = 0;
  const invalid = [
    () => geodeticToEcef({ ...anchor, latitudeDeg: Number.NaN }),
    () => geodeticToEcef({ ...anchor, longitudeDeg: 181 }),
    () => geodeticToEcef({ ...anchor, latitudeDeg: 91 }),
    () => worldToGeo({ x: Number.POSITIVE_INFINITY, y: 0, z: 0 }, ref),
    () => ecefToGeodetic({ xMeters: 0, yMeters: 0, zMeters: 0 }),
  ];
  for (const check of invalid) {
    try {
      check();
    } catch (error) {
      if (!(error instanceof GeospatialValidationError)) throw error;
      rejected++;
    }
  }
  add(12, rejected === invalid.length, `${rejected}/${invalid.length} invalid coordinates rejected`);
  const dateLine = { latitudeDeg: 0, longitudeDeg: 180, ellipsoidalHeightMeters: 0 };
  const dateLineInverse = ecefToGeodetic(geodeticToEcef(dateLine));
  add(
    13,
    normalizeLongitudeDegrees(180) === -180 &&
      normalizeLongitudeDegrees(-180) === -180 &&
      Math.abs(dateLineInverse.longitudeDeg + 180) < 1e-9,
    'Date line canonical longitude -180 degrees'
  );
  const pole = ecefToGeodetic({ xMeters: 0, yMeters: 0, zMeters: 6356752.314245179 });
  add(
    14,
    pole.latitudeDeg === 90 && Math.abs(pole.ellipsoidalHeightMeters) < 1e-6,
    `Pole height residual ${pole.ellipsoidalHeightMeters} m`
  );
  add(
    15,
    config.heightDatum === 'WGS84_ELLIPSOID' &&
      config.anchor.status === 'reference-only' &&
      !config.anchor.isGroundTruthVerified &&
      config.anchor.verticalAccuracyMeters === null,
    `${config.heightDatum}; ${config.anchor.heightAssumption}`
  );
  const historical = runSystemDiagnosticsSuite();
  add(
    16,
    historical.length === 9 && historical.every((check) => check.passed),
    `${historical.filter((check) => check.passed).length}/${historical.length} historical diagnostics pass`
  );
  return results;
}
