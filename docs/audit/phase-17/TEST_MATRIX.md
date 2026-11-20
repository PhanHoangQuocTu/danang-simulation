# Phase 17 — Test Matrix

**Gates (all exit 0, 2026-11-20):** lint (461 files), format:check
(460 files), type-check, test **63 files / 343 tests** (baseline 55 /
313 → +8 files / +30 tests), build (14 pages), build-storybook
(completed successfully), `pnpm audit --prod` (0 vulnerabilities).

## New tests (30)

| File | Tests | Covers |
| --- | --- | --- |
| `src/engine/gis/__tests__/schema.test.ts` | 6 | Estimated width == class default; duplicate/out-of-bounds points; height/provenance agreement; estimated height == levels x 3.0 m; open/CW rings; min_height < height |
| `src/engine/gis/__tests__/decode.test.ts` | 6 | 1,830 runs / 418 buildings; 1 / 7 / 410 height split; 0 / 1,830 width split; all estimated widths == defaults; geoToWorld checkpoints ±1 mm; all points in clip; closed rings; delta round-trip |
| `src/engine/gis/__tests__/normalize.test.ts` | 4 | Bow-tie self-intersection rejected, not repaired; duplicate geometry rejected; coincident endpoints → 1 junction, radius = widest half-width; stats tallies |
| `src/engine/gis/__tests__/geometry.test.ts` | 6 | Ribbon lift 0.08 m, edges ±half-width, 10 m subdivision; null elevation → null ribbon; junction disc radius/lift; foundation = min sampled elevation; footprint-only flat; merge concatenates |
| `src/worlds/danang/__tests__/gis-mode.test.ts` | 2 | `?gis=real` exact opt-in; everything else off |
| `src/worlds/danang/__tests__/gis-layer.test.ts` | 1 | Full pilot layer on the real DEM provider: 1,830 / 418, 525 junctions, 0 skipped, 8 extruded / 410 footprint, 4 meshes |
| `src/modules/WorldExplorer/__tests__/gis-diagnostics.test.ts` | 3 | 8 checks pass when off; GIS-01 fails when requested-but-not-built; 8 checks pass on the real layer with dataset/provenance details |
| `src/modules/WorldExplorer/__tests__/gis-scene.test.ts` | 2 | Layer added on DEM + opt-in, Phase 10 fixtures kept; no layer without opt-in / on synthetic / both |

## Updated tests (not weakened — expectations moved to the new state)

| File | Change | Why |
| --- | --- | --- |
| `src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx` | checks chip 35/35 → **43/43** | +8 GIS diagnostics (9 system + 16 geo + 10 terrain + 8 GIS) |
| `src/modules/WorldExplorer/__tests__/hud-terrain-mode.test.tsx` | checks chip 35/35 → **43/43** | Same |
| `src/world-core/registries/__tests__/data-sources.test.ts` | `canIngest(download)` allowed for `copernicus-dsm` **or `osm-vector`**; `osm-vector` permittedUses `[]` → `['download','display','derived-geometry']`; no-evidence escalation case now uses `commons-ground-reference` | `osm-vector` is approved-for-ingestion with real review evidence; the old assertions described the candidate state |
| `src/integrations/geodata/__tests__/overpass.test.ts` | Denial-before-network case now uses `commons-ground-reference` | `osm-vector` is now eligible, so it no longer exercises the denial path |

## Not tested here (explicit)

- **Browser QA (P17-19):** no live-browser run in this session.
  The layer builds and the scene integrates in jsdom, but no viewport,
  canvas, console, or interaction check ran. Separate follow-up.
- **Visual correctness:** ribbon/junction/building placement is
  asserted geometrically (coordinates, lifts, counts), not by
  screenshot.
- **FPS / GPU / memory:** standing blockers, no GPU in this VM.
