import type { DiagnosticCheckResult } from '@/engine/core/type';
import { describeTerrainProvider } from '@/engine/terrain/type';
import type { TerrainProvider } from '@/engine/terrain/type';

/** Deterministic terrain diagnostics, in the same style as the geo suite. */
export function runTerrainDiagnosticsSuite(provider: TerrainProvider): DiagnosticCheckResult[] {
  const results: DiagnosticCheckResult[] = [];
  const info = describeTerrainProvider(provider);
  const add = (id: number, passed: boolean, details: string) => {
    results.push({
      id: `TER-${String(id).padStart(2, '0')}`,
      domain: 'Terrain Provider',
      name: `TER-${id}`,
      passed,
      details,
    });
  };
  add(1, !provider.isDisposed, `Provider ${info.datasetId} v${info.version} is active`);
  add(
    2,
    info.crs === 'synthetic-local-meters'
      ? info.verticalDatum === 'SYNTHETIC_LOCAL' && !info.isGeographic
      : (info.verticalDatum === 'WGS84_ELLIPSOID' || info.verticalDatum === 'ORTHOMETRIC_EGM2008') && info.isGeographic,
    `${info.crs} / ${info.verticalDatum} / ${info.purpose}`
  );
  const spawn = provider.sampleElevation(provider.spawnPosition[0], provider.spawnPosition[2]);
  add(
    3,
    spawn.status === 'ok' && spawn.elevationMeters !== null,
    `Spawn elevation ${spawn.status === 'ok' ? spawn.elevationMeters : spawn.status}`
  );
  add(
    4,
    provider.boundaryRadiusMeters > 0 &&
      provider.coverage.minXMeters <= -provider.boundaryRadiusMeters &&
      provider.coverage.maxXMeters >= provider.boundaryRadiusMeters,
    `Boundary ${provider.boundaryRadiusMeters} m inside coverage ${provider.coverage.minXMeters}..${provider.coverage.maxXMeters} m`
  );
  const outside = provider.sampleElevation(provider.coverage.maxXMeters + 1, provider.coverage.maxZMeters + 1);
  add(5, outside.status === 'outside-coverage', `Outside coverage returns ${outside.status}, never a silent zero`);
  const invalid = provider.sampleElevation(Number.NaN, 0);
  add(6, invalid.status === 'invalid-input', `Invalid input returns ${invalid.status}`);
  const support = provider.sampleSupportSurface(
    provider.spawnPosition[0],
    provider.spawnPosition[2],
    provider.spawnPosition[1],
    0.38
  );
  add(
    7,
    support.status === 'ok' &&
      support.elevationMeters !== null &&
      support.terrainElevationMeters !== null &&
      support.elevationMeters >= support.terrainElevationMeters,
    'Support surface is terrain or higher, from one evaluation'
  );
  add(
    8,
    info.purpose !== 'test-only',
    info.purpose === 'test-only'
      ? 'TEST-ONLY data must never be the production provider'
      : `Production provider is ${info.datasetId} (${info.purpose})`
  );
  // Phase 16: name the active terrain mode explicitly, never implying a
  // test fixture or synthetic world is real geographic terrain.
  let mode: string;
  if (info.purpose === 'test-only') mode = 'TEST-ONLY DEM';
  else if (!info.isGeographic) mode = 'SYNTHETIC TERRAIN';
  else if (info.verticalDatum === 'WGS84_ELLIPSOID') mode = 'REAL DEM';
  else mode = 'REAL DEM (pilot — orthometric, ellipsoid alignment NOT VERIFIED)';
  const productionReady =
    info.purpose === 'production' && info.isGeographic && info.verticalDatum === 'WGS84_ELLIPSOID';
  add(
    9,
    info.isGeographic ? info.resolutionMeters !== null : true,
    `${mode} — ${info.datasetId} @ ${info.resolutionMeters ?? 'n/a'} m, datum ${info.verticalDatum}, production-ready: ${productionReady ? 'yes' : 'no'}`
  );
  // Phase 16: spawn must sit on the sampled terrain surface, not at Y = 0.
  const spawnY = provider.spawnPosition[1];
  add(
    10,
    spawn.status === 'ok' && spawn.elevationMeters !== null && Math.abs(spawnY - spawn.elevationMeters) < 1e-6,
    `Spawn Y ${spawnY} m equals sampled elevation ${spawn.status === 'ok' ? spawn.elevationMeters : spawn.status}`
  );
  return results;
}
