import type { DiagnosticCheckResult } from '@/engine/core/type';
import type { GisMode } from '@/worlds/danang/gis-mode';
import type { GisLayerResult } from '@/worlds/danang/gis-layer';

/**
 * Deterministic GIS diagnostics (Phase 17), in the same style as the
 * terrain suite. When the GIS layer is off, GIS-02..GIS-08 pass
 * vacuously with "not applicable" details — the established TER-09
 * pattern — so the default world never reports GIS failures for a
 * layer nobody asked for; GIS-01 always names the actual mode.
 */
export function runGisDiagnosticsSuite(layer: GisLayerResult | null, mode: GisMode): DiagnosticCheckResult[] {
  const results: DiagnosticCheckResult[] = [];
  const add = (id: number, passed: boolean, details: string) => {
    results.push({
      id: `GIS-${String(id).padStart(2, '0')}`,
      domain: 'GIS Roads & Buildings',
      name: `GIS-${id}`,
      passed,
      details,
    });
  };
  const stats = layer?.normalized.stats;
  let modeDetails: string;
  if (mode === 'off') {
    modeDetails = 'GIS off (default — use ?gis=real with ?terrain=dem for the pilot layer)';
  } else if (layer !== null) {
    modeDetails = `GIS real — ${stats?.datasetId ?? 'unknown dataset'}`;
  } else {
    modeDetails = 'GIS requested (?gis=real) but the layer was not built (needs ?terrain=dem)';
  }
  add(1, mode === 'off' ? layer === null : layer !== null, modeDetails);
  const na = 'Not applicable — GIS layer off';
  add(
    2,
    layer === null || (stats !== undefined && stats.roadRuns > 0 && stats.buildings > 0),
    layer === null
      ? na
      : `${stats!.roadRuns} road runs / ${stats!.buildings} buildings decoded from ${stats!.datasetId}`
  );
  add(
    3,
    layer === null || stats!.rejected === 0,
    layer === null
      ? na
      : `Runtime normalization rejected ${stats!.rejected} features (ingest rejected 5, recorded separately)`
  );
  add(
    4,
    layer === null || stats!.junctions > 0,
    layer === null ? na : `${stats!.junctions} junctions merged from coincident road endpoints`
  );
  add(
    5,
    layer === null || layer.skippedRoads === 0,
    layer === null ? na : `${stats!.roadRuns - layer.skippedRoads}/${stats!.roadRuns} road runs draped on terrain`
  );
  add(
    6,
    layer === null || layer.skippedBuildings === 0,
    layer === null ? na : `${stats!.buildings - layer.skippedBuildings}/${stats!.buildings} buildings placed on terrain`
  );
  const known = stats?.buildingHeightProvenance.known ?? 0;
  const estimated = stats?.buildingHeightProvenance.estimated ?? 0;
  const unknown = stats?.buildingHeightProvenance.unknown ?? 0;
  add(
    7,
    layer === null || (layer.extrudedBuildings === known + estimated && layer.footprintBuildings === unknown),
    layer === null
      ? na
      : `Heights known ${known} / estimated ${estimated} / unknown ${unknown} (footprint-only ${layer.footprintBuildings})`
  );
  const sourceWidths = stats?.roadWidthProvenance.source ?? 0;
  const estimatedWidths = stats?.roadWidthProvenance.estimated ?? 0;
  add(
    8,
    layer === null || sourceWidths + estimatedWidths === stats!.roadRuns,
    layer === null ? na : `Road widths: source ${sourceWidths} / estimated (class default) ${estimatedWidths}`
  );
  return results;
}
