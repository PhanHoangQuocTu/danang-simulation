# Phase 16 — Real Terrain & DEM Integration — Implementation Report

**Status: IMPLEMENTED, UNCOMMITTED — push authorisation pending (see §21).**
**Date:** 2026-11-20. **Local HEAD:** `9170689`. **Branch:** local `master`, tree has uncommitted Phase 16 work only. **No commit, no push was made in this phase.**
**Toolchain:** Node 22.23.5 / pnpm 12.14.0.
**Overall verdict: PARTIAL** — a real DEM is acquired, ingested and integrated behind an explicit opt-in, with all gates passing; browser verification, geographic accuracy certification and ellipsoid alignment remain NOT VERIFIED.

## 1. Executive summary

Phase 16 integrates the first real elevation data into the Da Nang 3D Open World: a 3 km × 3 km pilot of the Copernicus DEM GLO-30 (30 m, tile `Copernicus_DSM_COG_10_N16_00_E108_00_DEM`) centred on lat 16.0544, lon 108.2022. The tile was downloaded anonymously from the public AWS S3 bucket, SHA-256-verified, cropped and resampled offline onto a regular 30 m ENU grid, and embedded as a 40 KB base64 Float32 asset (`src/worlds/danang/data/danang-dem-pilot.ts`). The raw 2.8 MB COG stays outside the repo.

Integration reuses the Phase 15 contract end to end: the pilot validates through the strict Zod metadata path, loads through `GridDemProvider` + `selectTerrainProvider`, renders through a new provider-driven mesh builder, and drives character grounding, camera and Mini Map through the single elevation owner. The synthetic 180 m world stays the production default; the DEM world is an explicit opt-in via `?terrain=dem`. F3 diagnostics now label the mode (`REAL DEM (pilot — orthometric, ellipsoid alignment NOT VERIFIED)` / `SYNTHETIC TERRAIN` / `TEST-ONLY DEM`) and the checks chip is 35/35.

All gates pass: lint, format:check, type-check, test (**53 files / 302 tests**), build (14 pages), build-storybook (0 PLUGIN_TIMINGS), `pnpm audit --prod` (0 vulnerabilities).

**Not done / not verified (see §18):** browser verification at the 6 viewports was not run in this session (this subagent has no live-browser capability); geographic accuracy certification (no independent checkpoints, no RMSE); absolute WGS84-ellipsoid alignment (no verified geoid conversion, no offset invented); FPS 60 / physical device / Docker / GPU (standing blockers).

## 2. Phase 15 prerequisite audit

Verdict: **SUFFICIENT as architecture / PARTIAL as product** (verified from source before any Phase 16 edit).

All Phase 15 artifacts exist, are typed and tested — but the DEM path was not wired into the production runtime: no real DEM existed, `selectTerrainProvider` was never called outside tests, the scene mesh was hardcoded to synthetic dimensions, and the manifest bypassed the injected provider. Full audit in `docs/audit/phase-16/TERRAIN_ARCHITECTURE.md`.

Gaps and their Phase 16 disposition:

| Gap | Disposition |
| --- | --- |
| `GridDemProvider.spawnPosition` Y = 0 | **Fixed** — spawn is now the sampled elevation at the grid centre |
| `createWorldRuntime` `dispose()` never disposed terrain | **Fixed** — runtime-owned DEM provider disposed exactly once; synthetic singleton never disposed by a runtime |
| `selectTerrainProvider` only called from tests | **Fixed** — called by `createWorldRuntime` in `dem-pilot` mode |
| Manifest imports synthetic singleton for rock Y | **Fixed at scene level** — manifest not loaded in DEM mode |
| `resolveHorizontalCollisions` identity no-op / `sampleSupportSurface` delegates to terrain | **Documented** — DEM world has terrain-only collision; synthetic colliders are omitted in DEM mode, not reused |
| `unsupported-crs` never returned; `GAME_CONFIG.worldBoundaryRadius: 68` dead | Unchanged, noted for cleanup |

## 3. Baseline

HEAD `9170689`, tree clean. Baseline gates (all exit 0): lint (424 files), format:check (423 files), type-check, test **47 files / 280 tests** (66.08 s), build (7.2 s, 14 pages), build-storybook (12.12 s, 0 PLUGIN_TIMINGS), audit --prod (0 vulnerabilities). Full report: `docs/audit/phase-16/BASELINE_REPORT.md`.

## 4. DEM source comparison

Researched live 2026-11-20 (~09:54–10:00 +07). Full comparison: `docs/audit/phase-16/DEM_SOURCE_RESEARCH.md`.

| Candidate | Resolution | Datum | Licence | Access | Verdict |
| --- | --- | --- | --- | --- | --- |
| **Copernicus DEM GLO-30** | 30 m | EPSG:4326 / EGM2008 | Free incl. commercial, attribution | Anonymous public S3 | **Selected** |
| Copernicus DEM GLO-90 | 90 m | Same | Same | Anonymous S3 | Fallback (3× coarser) |
| NASADEM V001 | 30 m | Geoid model NOT VERIFIED | Open, cite NASA JPL | Earthdata login required | Rejected — login blocker, older (2000) |
| ALOS AW3D30 v3.2 | 30 m | Geoid NOT VERIFIED | Free, registration + attribution | JAXA registration / API key | Cross-check only |
| FABDEM v1-2 | 30 m | EGM2008 inherited | **CC BY-NC-SA 4.0 (non-commercial)** | Anonymous mirror reported | Cross-check only — bare-earth DTM, licence risk |
| Vietnam / Da Nang official DEM | — | NOT VERIFIED | NOT VERIFIED | No public download found | Formal MONRE/DONRE request only |

## 5. Selection rationale

Copernicus GLO-30 is the only candidate that is (a) anonymously downloadable — proven by a successful download, (b) free including commercial use with clear attribution, (c) 30 m with officially published accuracy (<4 m vertical, <6 m horizontal) and a named vertical datum (EGM2008), (d) COG GeoTIFF directly consumable, (e) under current maintenance (releases to 2024_1). FABDEM is the better terrain model (bare-earth DTM vs DSM) but its non-commercial licence may conflict with the project licence.

## 6. Licence and provenance

- Licence: Copernicus DEM licence — free use including commercial use, with attribution. Raw-data redistribution is **not** claimed (registry `redistributionAllowed: false`, permitted uses `download, display, derived-geometry`).
- Attribution (embedded in the asset and the registry): “© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved”.
- Registry: `copernicus-dsm` moved `candidate` → `approved-for-ingestion` in `src/worlds/danang/data-sources.ts` with `metadataReview` (reviewer “Phase 16 DEM research (live verification 2026-11-20)”, evidence URL the Copernicus dataspace COP-DEM page), licence, CRS, datum, capture date, accuracy, geographic bounds and coverage evidence.
- Provenance: source tile URL, SHA-256, COG structure, crop/resample steps and the “no geoid conversion” decision are recorded in the asset header, its `processingHistory`, and `docs/audit/phase-16/DATASET_VALIDATION.md`. The ingestion script is preserved at `docs/audit/phase-16/evidence/ingest_pilot.py`.

## 7. Pilot coverage

Centre lat 16.0544, lon 108.2022; source window rows 3354–3453, cols 678–777 (100×100 cells); bbox lon 108.188333–108.216111, lat 16.040556–16.068333; **3074 m N–S × 2972 m E–W** (~9.1 km²); cell 30.74 m (lat) × 29.72 m (lon). Justification: 100 cells across gives ~100 independent samples per axis — an order of magnitude more than the 180 m synthetic boundary — while staying far inside one tile (no mosaicking; tile edge ~6 km north, ~22 km east). The pilot is flat coastal urban terrain (mean 8.47 m); it will not exercise steep-slope handling — a mountain pilot over the same tile (max 1408.79 m) is the natural follow-up.

## 8. CRS and datum

- Horizontal EPSG:4326; vertical EPSG:3855 (EGM2008, orthometric). World Y = orthometric height. **No geoid conversion, no invented offset. Absolute ellipsoid alignment NOT VERIFIED.**
- The Phase 15 contract requires a known datum and `isProductionReady` only for WGS84-ellipsoidal data. Phase 16 changed the validation rule deliberately: `ORTHOMETRIC_EGM2008` is now accepted for ingestion as a **labelled pilot** (datum stays orthometric, `isProductionReady` stays false). This is a documented rule change, not a weakened test — see §12.
- RasterPixelIsArea (file GeoKeys) vs RasterPixelIsPoint (dataspace page): a half-pixel (~15 m) interpretation difference, flagged in the asset and in `GEOREFERENCING_REPORT.md`.
- Full georeferencing detail: `docs/audit/phase-16/GEOREFERENCING_REPORT.md`.

## 9. Preprocessing (deterministic ingestion)

Script `evidence/ingest_pilot.py` (offline, Python 3.12.3 + `tifffile`/`imagecodecs`; GDAL absent in this VM): reads the COG, crops the pilot, resamples onto a regular 30 m ENU grid with the same WGS84 geodetic↔ECEF↔ENU math as `src/engine/geospatial/core.ts`. Outputs: `evidence/danang-dem-pilot.json` + the base64 asset (row-major, row 0 = north edge, col 0 = west edge).

Measured (reproduced in an independent re-check): raw window min 1.79 / max 25.68 / mean 8.4667 / median 8.2156 / std 2.3259, 0 NoData, 0 NaN; centre pixel 5.5646138191223145; full tile min −14.00 / max 1408.79 / mean 9.2703. Resampled grid: min 2.061 / max 25.393 / mean 8.463 / median 8.262 / std 2.208; bilinear-vs-nearest difference mean 0.34 m, max 6.05 m. 7 checkpoints recorded in the asset.

## 10. Provider and mesh integration

- **Provider:** `danangDemPilotGridInput()` → `GridDemProvider` via `selectTerrainProvider` in `createWorldRuntime` (`dem-pilot` mode). Coverage ±1500 m, boundary 1500 m, spawn = sampled centre elevation (~6.30 m, not Y = 0). Synthetic stays the default; DEM is selected only by the exact `?terrain=dem` query (`resolveTerrainMode`).
- **Mesh:** `buildTerrainMesh(scope, terrain, material)` — one builder, no duplicated formula. Synthetic: 180 m / 128 segments, original path/rock colouring. DEM: 3000 m from coverage, 99×99 segments from raster dimensions, hypsometric colouring, vertical exaggeration 1.0 (vertex Y = sampled elevation unchanged). Fog 0.0006 in DEM mode (vs 0.0055 synthetic); camera far 6000 m (vs 320 m); Mini Map half-extent 1500 m and camera height 1600 m (vs 72 m / 140 m).
- **Scene:** `scene.ts` calls `buildTerrainMesh` instead of hardcoding 180/128. Spawn plaza/ring sit at the provider spawn. Step stones, platforms, manifest rocks and trees are skipped in DEM mode; lanterns, bushes, grass and the 3 interaction fixtures are kept and sample the active provider.
- **Lifecycle:** runtime-owned DEM provider disposed exactly once on runtime dispose; active provider resets to synthetic. A DEM construction failure throws instead of silently falling back to synthetic.

## 11. Character, collision, camera, Mini Map

- Character spawns grounded at the sampled DEM elevation, walks forward staying on the surface, jumps and lands back, and clamps to the 1500 m DEM boundary (tests in `dem-grounding.test.ts`). Still 1 elevation evaluation per tick.
- **Collision is terrain-only in DEM mode** (documented decision): `GridDemProvider.resolveHorizontalCollisions` is an identity no-op and no synthetic colliders exist in the DEM world, so there is nothing to collide with. Synthetic platforms/rocks/trees are omitted rather than reused at wrong heights. Re-placing colliders from DEM heights is Phase 17 work.
- Camera far, Mini Map extent/height and `reset()` all follow the active provider (see §10). HUD diagnostics read the active provider via `getActiveTerrainProvider()`.

**Browser-QA follow-up (2026-11-20, 2 defects found and fixed — see §15):** the initial implementation mislabelled the provider in F3 in DEM mode and mislabelled the Mini Map span in DEM mode. Both are fixed and spot-verified in the browser at 1024×768 in both modes (TER-09 `REAL DEM (pilot …)`, TER-10 spawn Y = sampled elevation 6.045524001121521 m, Span 3000 m in DEM; Span 144 m in synthetic; checks chip 35/35 and Terrain checks 10/10 in both modes).

## 12. Tests and regression

Full suite: **53 files / 302 tests, exit 0** (baseline 47 / 280; 52 files / 298 tests before the browser-QA follow-up below). 16 new Phase 16 tests across 5 files; 2 more from the TER-09/TER-10 diagnostics extension; 4 more from the browser-QA follow-up (`hud-terrain-mode.test.tsx`). Details: `docs/audit/phase-16/TEST_MATRIX.md`.

Deliberate rule changes (not weakenings, rationale recorded):

| Change | Rationale |
| --- | --- |
| Orthometric datum tests: “rejects” → “accepts as labelled pilot, not production-ready” | Validation rule changed in §8; datum never relabelled, `isProductionReady` stays false |
| Data-sources DS-01/10/25: `canIngest(...,'download').allowed` now true only for `copernicus-dsm` | Reflects the `copernicus-dsm` approval-for-ingestion with full metadata review |
| Diagnostics 8 → 10 checks; checks chip 33/33 → 35/35 | TER-09 mode label + TER-10 spawn grounding added |

No other test was deleted or had assertions lowered. The Phase 15 counting-stub test (1 evaluation/tick) still passes.

## 13. Performance

- Asset 40 KB; DEM mesh 10,000 vertices (smaller than the synthetic 16,641). Gates all exit 0 (see §14).
- **FPS 60: NOT VERIFIED / NOT_APPLICABLE on SwiftShader** (no GPU/Docker in this VM; Phase 15 measured 0.79 FPS over 20 s on SwiftShader — a software-renderer number, not a product number). No FPS figure is claimed.
- Risk for larger areas: a full 3600×3600 tile (~13 M vertices) cannot be a single `PlaneGeometry`; tiling/LOD is required. Full report: `docs/audit/phase-16/PERFORMANCE_REPORT.md`.

## 14. Gates (final, Node 22.23.5 / pnpm 12.14.0)

| Gate | Exit | Evidence |
| --- | --- | --- |
| `pnpm lint` | 0 | `docs/audit/phase-16/evidence/lint.log` |
| `pnpm format:check` | 0 | `evidence/format-check.log` |
| `pnpm type-check` | 0 | `evidence/type-check.log` |
| `pnpm test` | 0 — 53 files / 302 tests | `evidence/fix-test.log` (post-fix rerun; 52 / 298 before the follow-up) |
| `pnpm build` | 0 — 14 pages | `evidence/build.log` |
| `pnpm build-storybook` | 0 — 0 PLUGIN_TIMINGS | `evidence/build-storybook.log` |
| `pnpm audit --prod` | 0 — no known vulnerabilities | `evidence/audit-prod.log` |

Three failures occurred during the work and were fixed before the final run (unused imports; `noNestedTernary` in diagnostics and the base64 decoder; `sampleSupportSurface` arity in the grounding test). No gate was skipped and no warning suppressed. Full detail: `docs/audit/phase-16/BASELINE_REPORT.md`.

## 15. Browser QA

**Not run in this session — NOT VERIFIED.** The subagent that implemented Phase 16 has no live-browser capability, so no viewport result is claimed. The production build exists (`.next/` from the passing build). Procedure for the parent agent: start the standalone server with `.next/static` + `public` copied into `.next/standalone/` (Phase 15 lesson — without the copy, `/_next/static/...` subresources 404 and the world never initialises), then verify all 6 viewports (1920×1080, 1366×768, 1024×768, 768×1024, 390×844, 844×390) in both default mode and `?terrain=dem`: world initialises, character grounded/moves/jumps on the real terrain, camera/Mini Map/HUD/weather/interaction/F3 work, 0 console errors, WebGL context loss/restore.

What the automated tests do cover instead: DEM scene composition (no synthetic colliders, fog 0.0006), DEM runtime creation/disposal, and character grounding/movement/jump/boundary in jsdom with the real provider.

### Browser-QA follow-up (2026-11-20) — 2 defects found by the parent-agent QA, fixed and spot-verified

The parent-agent QA ran the 6 viewports in both modes after this report was written (`evidence/browser-qa*.json`, screenshots `evidence/browser-*.png`) and found 2 real defects. Both were fixed in the uncommitted working copy (no other behaviour touched) and verified in a headless-Chromium spot-check at 1024×768 in both modes — standalone server started correctly (`.next/static` + `public` copied into `.next/standalone/`, `HOSTNAME=localhost`), rebuilt with the fix (`pnpm build` exit 0). Evidence: `evidence/browser-qa-fix.json`, `evidence/browser-synthetic-1024x768-fix-f3.png`, `evidence/browser-dem-1024x768-fix-f3.png`.

1. **F3 diagnostics mislabelled the provider in DEM mode (FAIL).** In `?terrain=dem` the F3 panel reported TER-09 `SYNTHETIC TERRAIN — synthetic-danang-phase-10` and TER-10 `Spawn Y 0 m equals sampled elevation 0` while the world was demonstrably DEM. Root cause, verified from source: `WorldHud.tsx` computed `runTerrainDiagnosticsSuite(getActiveTerrainProvider())` inside `useMemo(..., [])` — once at mount, when the active provider is still the synthetic default (the runtime is created in an effect, after mount), and never recomputed. Fix: the suite is now keyed on the provider identity (`useMemo(..., [activeTerrainProvider])`), so it recomputes when the runtime switches provider. No diagnostic content changed, only which provider it reads.
2. **Mini Map “Span” label wrong in DEM mode (FAIL, minor).** The DEM screenshot showed `Span: 144 m`; `computeMiniMapVisibleSpanMeters` used the synthetic `GAME_CONFIG.miniMap.orthoHalfExtent` (72 m) while the map camera itself was correct (1500 m). Fix: the function now takes the half-extent as a parameter, and both the map camera and the label read one shared helper, `resolveMiniMapHalfExtentMeters(provider)` in `runtime/world.ts` (72 m synthetic, 1500 m DEM pilot).

Spot-check results (1024×768, F3 open, 0 console errors, 2 canvases in both modes):

| | Synthetic (`/`) | DEM (`?terrain=dem`) |
| --- | --- | --- |
| TER-09 | `SYNTHETIC TERRAIN — synthetic-danang-phase-10 @ n/a m, datum SYNTHETIC_LOCAL, production-ready: no` | `REAL DEM (pilot — orthometric, ellipsoid alignment NOT VERIFIED) — copernicus-dem-glo30-danang-pilot-v1 @ 30 m, datum ORTHOMETRIC_EGM2008, production-ready: no` |
| TER-10 | `Spawn Y 0 m equals sampled elevation 0` | `Spawn Y 6.045524001121521 m equals sampled elevation 6.045524001121521` |
| Mini Map Span | `Span: 144 m` | `Span: 3000 m` |
| Checks chip / Terrain checks | 35/35 / 10/10 | 35/35 / 10/10 |
| Console errors / page errors | 0 / 0 | 0 / 0 |

One non-error observation: the synthetic run logged one failed request, `/api/weather net::ERR_ABORTED` (no console error attached); the DEM run had none. This is the standing weather-observation blocker (Open-Meteo 429 on the shared egress IP), not a defect of this fix. Full 6-viewport re-QA after the fix was not run — only this 1024×768 spot-check — so P16-14 stays NOT VERIFIED.

## 16. Limitations

- Geographic accuracy certification NOT VERIFIED (no independent checkpoints/GCPs/RMSE; asset checkpoints are self-consistency only).
- Absolute ellipsoid alignment NOT VERIFIED (orthometric heights kept as-is).
- Browser verification, FPS, physical device, Docker, GPU: NOT VERIFIED (standing blockers).
- Live weather observation NOT VERIFIED (Open-Meteo 429 on shared egress IP).
- Standalone `127.0.0.1` redirect loop still FAIL (upstream Next.js #94745, PR #95917 unmerged).
- DEM world is a DSM (buildings/vegetation included), flat coastal pilot only, terrain-only collision, and an explicit opt-in — not the production default.
- Full list: `docs/audit/phase-16/KNOWN_ISSUES.md`.

## 17. Acceptance matrix P16-01..P16-25

**Criterion texts:** taken verbatim from §21 of the Phase 16 master prompt (P16-01..P16-25). The earlier draft of this section listed P16-16..P16-25 as UNMAPPED because the implementing subagent's context had been compacted and it could not recover the prompt text; the parent agent has now re-checked the matrix against the original prompt in this chat and corrected it below. No status was changed without evidence.

| ID | Scope (§21) | Status | Evidence |
| --- | --- | --- | --- |
| P16-01 | Phase 15 architecture verified | **PASS** | Audit §2; verdict SUFFICIENT as architecture / PARTIAL as product |
| P16-02 | Official DEM source research completed | **PASS** | §4; `DEM_SOURCE_RESEARCH.md` (5 candidates + official Vietnamese datasets, live sources) |
| P16-03 | Actual dataset selected and license verified | **PASS** | §4; Copernicus DEM GLO-30 selected — free including commercial use with attribution, published accuracy <4 m vertical / <6 m horizontal |
| P16-04 | Dataset coverage for pilot area verified | **PASS** | §9; pilot bbox lon 108.188181–108.216217, lat 16.040844–16.067955, 100×100 cells, 0 NoData cells |
| P16-05 | Raw dataset integrity recorded | **PASS** | §9; tile SHA-256 `f4f95dc5…` verified on download and re-checked |
| P16-06 | Dataset metadata validated | **PASS** | §9; strict Zod validation, CRS EPSG:4326, datum EPSG:3855 (EGM2008) |
| P16-07 | Horizontal CRS transformations validated | **PASS** | `GEOREFERENCING_REPORT.md`; Python↔TS cross-check: 7 checkpoints, `worldToGeo` recovers lat/lon within 1e-4 deg (math consistency, not ground-truth certification) |
| P16-08 | Vertical datum correctly handled | **PARTIAL** | Orthometric EGM2008 kept and labelled, `isProductionReady === false`; no geoid conversion applied, no offset invented; ellipsoid alignment NOT VERIFIED |
| P16-09 | DEM preprocessing pipeline implemented | **PASS** | §9; deterministic pipeline (SHA-256, validation, crop, reprojection, resampling, NoData, provenance), `ingest_pilot.py` |
| P16-10 | NoData behavior correctly implemented | **PASS** | Bilinear refuses to interpolate across NoData, typed `ElevationSample`; pilot itself has 0 NoData cells, so no real NoData area was exercised in the browser |
| P16-11 | Terrain tiles generated | **PARTIAL** | One pilot tile generated (100×100, 30 m); multi-tile neighbour relationships / seam handling not implemented |
| P16-12 | Real DEM provider integrated | **PASS** | §10; `GridDemProvider` + `selectTerrainProvider` via the Phase 15 contract |
| P16-13 | Three.js terrain mesh uses actual DEM | **PASS** | §10; 3000 m / 99×99, Y = sampled elevation, exaggeration 1.0 |
| P16-14 | Character grounding uses actual terrain | **PASS** | Browser QA: spawn 6.045 m on DEM, jump arc 6.046 → 7.718 → 6.038 m, landed on the DEM surface |
| P16-15 | Collision is compatible with terrain | **PARTIAL** | Terrain-only collision by documented decision — no platforms/rocks/trees exist in the DEM world yet |
| P16-16 | Camera remains stable | **PASS** | Browser QA: camera distance constant 5.40 m at spawn, after walk and after context restore, both modes |
| P16-17 | Mini Map remains functional | **PASS** | Browser QA: marker tracks the character both modes; Span label was wrong in DEM mode (144 m) — fixed, now 3000 m, browser-verified at 1024×768 |
| P16-18 | F3 diagnostics updated | **PARTIAL** | TER-09/TER-10 label REAL DEM correctly after the fix (browser-verified at 1024×768); no UNAVAILABLE runtime state exists yet |
| P16-19 | Geographic validation evidence available | **NOT VERIFIED** | No independent ground control points, no surveyed checkpoints, no RMSE claimed |
| P16-20 | Performance evaluated | **PARTIAL** | Mesh/asset/gate costs measured (DEM mesh 10,000 vertices, smaller than synthetic 16,641; pilot asset 40 KB); FPS 60 NOT_APPLICABLE on SwiftShader, no GPU/Docker in VM |
| P16-21 | Responsive browser QA completed | **PARTIAL** | 6 viewports × 2 modes all operationally PASS (0 console errors); full 6-viewport re-QA after the 2-defect fix has not run — only a 1024×768 spot-check |
| P16-22 | Existing Phase 01–15 regression verified | **PASS** | §12; 53 files / 302 tests, exit 0; no test weakened |
| P16-23 | No unauthorized data introduced | **PASS** | Only Copernicus GLO-30 (open, anonymous S3 download, attribution recorded); no scraping, no bypassed auth/payment |
| P16-24 | Documentation updated | **PASS** | `docs/PHASE_STATUS.md` + phase-16 audit docs updated; historical Phase 11–15 reports untouched |
| P16-25 | Implementation report completed | **PASS** | This report + `docs/audit/phase-16/` |

**Tally (P16-01..P16-25):** 17 PASS, 6 PARTIAL, 1 NOT VERIFIED, 0 FAIL.

## 18. File list (uncommitted)

Modified (18): `src/engine/terrain/type.ts`, `src/messages/en/worldExplorer.json`, `src/messages/vi/worldExplorer.json`, `src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx`, `src/modules/WorldExplorer/__tests__/terrain-diagnostics.test.ts`, `src/modules/WorldExplorer/components/WorldHud.tsx`, `src/modules/WorldExplorer/hooks/useWorldExplorer.ts`, `src/modules/WorldExplorer/runtime/world.ts`, `src/modules/WorldExplorer/terrain-diagnostics.ts`, `src/world-core/registries/__tests__/data-sources.test.ts`, `src/world-core/registries/data-sources.ts`, `src/world-core/terrain/__tests__/grid.test.ts`, `src/world-core/terrain/__tests__/validation.test.ts`, `src/world-core/terrain/grid.ts`, `src/world-core/terrain/selection.ts`, `src/world-core/terrain/validation.ts`, `src/worlds/danang/data-sources.ts`, `src/worlds/danang/scene.ts`.

Browser-QA follow-up (2026-11-20, §15) additionally modifies `src/engine/spatial/minimap.ts`, `src/modules/WorldExplorer/components/WorldHud.tsx` and `src/modules/WorldExplorer/runtime/world.ts` (already listed above), adds `src/modules/WorldExplorer/__tests__/hud-terrain-mode.test.tsx`, and adds `docs/audit/phase-16/evidence/browser-qa-fix.json`, `browser-synthetic-1024x768-fix-f3.png`, `browser-dem-1024x768-fix-f3.png`, `fix-lint.log`, `fix-format-check.log`, `fix-type-check.log`, `fix-test.log`, `fix-build.log`. It also reformats (whitespace only, parsed content verified identical) the three parent-QA JSON files `evidence/browser-qa.json`, `browser-qa-p3.json`, `browser-qa-p4.json`, which previously failed `pnpm format:check`.

Added: `src/worlds/danang/data/danang-dem-pilot.ts`, `src/worlds/danang/data/__tests__/danang-dem-pilot.test.ts`, `src/worlds/danang/terrain-mesh.ts`, `src/worlds/danang/terrain-mode.ts`, `src/worlds/danang/__tests__/terrain-mode.test.ts`, `src/worlds/danang/__tests__/terrain-mesh.test.ts`, `src/modules/WorldExplorer/__tests__/dem-grounding.test.ts`, `src/modules/WorldExplorer/__tests__/dem-scene.test.ts`, `PHASE_16_IMPLEMENTATION_REPORT.md` (this file), `docs/audit/phase-16/` (8 reports + `evidence/` with 9 files).

Deleted: none. Historical Phase 11–15 reports untouched. `docs/PHASE_STATUS.md` updated for Phase 16 only.

## 19. Rollback strategy

The work is uncommitted. `git checkout -- .` plus removing the new untracked paths restores HEAD `9170689` exactly (verify with `git status --short`). At runtime, the DEM path is entirely opt-in: without `?terrain=dem` the default path is the Phase 15 synthetic behaviour, and a DEM construction failure throws instead of silently falling back. Full detail: `docs/audit/phase-16/KNOWN_ISSUES.md`.

## 20. Phase 17 dependencies

1. Browser verification at 6 viewports (see §15) — before any claim the DEM world works in the browser.
2. Independent checkpoints / GCPs and an RMSE measurement for geographic certification.
3. A verified geoid undulation value for Da Nang (or a documented decision to stay orthometric) before the DEM can be called production-ready.
4. Mountain pilot (steep terrain) and, if approved, a larger-area DEM with tiling/LOD.
5. Re-placing colliders (platforms/rocks/trees) from DEM heights; FABDEM cross-check and its licence decision.
6. Production asset delivery decision for anything larger than the embedded 40 KB pilot (no Git LFS without approval).
7. Coverage re-measurement (Phase 15 baseline: 77.83% / 67.3% / 63.03% / 79.64%).
8. Cleanup of dead code carried over from Phase 15 (`unsupported-crs` never returned; `GAME_CONFIG.worldBoundaryRadius: 68` dead duplicate).

## 21. Push authorisation

**No commit and no push were made in this phase, per §24 of the Phase 16 prompt. All work above is uncommitted in the working copy at `~/workspace/danang-simulation-work/danang-simulation-main/`. Push authorisation is pending from the Project Owner.**
