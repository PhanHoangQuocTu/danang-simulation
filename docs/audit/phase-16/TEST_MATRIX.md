# Phase 16 — Test Matrix

Toolchain: Node 22.23.5 / pnpm 12.14.0. Full suite: **53 files / 302 tests, exit 0** (`evidence/fix-test.log`). Baseline at HEAD `9170689`: 47 files / 280 tests. Before the browser-QA follow-up: 52 files / 298 tests.

## New Phase 16 tests (16 tests, 5 files)

| File | Tests | What is proven |
| --- | --- | --- |
| `src/worlds/danang/data/__tests__/danang-dem-pilot.test.ts` | 6 | Base64 decoder against hand-computed Float32 values; decoded grid reproduces measured stats (min/max/mean, 0 NoData); metadata validates as orthometric labelled pilot, `isProductionReady === false`, checksum and accuracy recorded; all 7 checkpoints reproduced at cell centres; world→geo round-trip recovers checkpoint lat/lon (Python ingestion ↔ TS core cross-check); coverage ±1500 m, sampled spawn, outside-coverage refusal; diagnostics label `REAL DEM (pilot …)` and all 10 terrain checks pass |
| `src/worlds/danang/__tests__/terrain-mode.test.ts` | 2 | `resolveTerrainMode` defaults to synthetic; only the exact `?terrain=dem` opts into the DEM pilot |
| `src/worlds/danang/__tests__/terrain-mesh.test.ts` | 2 | Synthetic mesh stays 180 m / 128 segments with provider elevations; DEM mesh is 3000 m / 99×99 segments / 10,000 vertices with Y in the measured range and no vertical exaggeration |
| `src/modules/WorldExplorer/__tests__/dem-grounding.test.ts` | 3 | Character spawns grounded at the sampled DEM elevation, walks forward staying on the surface, jumps and lands back, clamps to the 1500 m DEM boundary |
| `src/modules/WorldExplorer/__tests__/dem-scene.test.ts` | 3 | DEM scene builds from the real pilot grid without synthetic colliders (0 trees, 0 manifest rocks, fog 0.0006); DEM runtime grounds the character and disposes the DEM provider exactly once; default runtime keeps the synthetic provider |

## Browser-QA follow-up tests (4 tests, 1 file)

| File | Tests | What is proven |
| --- | --- | --- |
| `src/modules/WorldExplorer/__tests__/hud-terrain-mode.test.tsx` | 4 | F3 terrain diagnostics recompute when the active provider switches to DEM (TER-09 `REAL DEM … copernicus-dem-glo30-danang-pilot-v1`, TER-10 spawn Y = sampled elevation 6.045524001121521 — would have caught the stale `useMemo(..., [])`); checks chip stays 35/35 in DEM mode; Mini Map Span label follows the active mode's half-extent (144 m synthetic → 3000 m DEM at zoom 1); `computeMiniMapVisibleSpanMeters` unit cases (144 m @ 72 m, 3000 m @ 1500 m, zoom 2 → 1500 m) |

## Updated tests (deliberate rule changes, not weakenings)

| File | Change | Rationale |
| --- | --- | --- |
| `src/world-core/terrain/__tests__/validation.test.ts`, `grid.test.ts` | Orthometric datum tests changed from “rejects” to “accepts as labelled pilot, not production-ready” | Rule change in `validation.ts`: orthometric EGM2008 is now accepted for ingestion as a labelled pilot; the datum is never relabelled and `isProductionReady` stays false |
| `src/world-core/registries/__tests__/data-sources.test.ts` (DS-01/10/25) | `canIngest(source.id, 'download').allowed` now true only for `copernicus-dsm`, false for all others (was false for all) | Reflects the `copernicus-dsm` approval-for-ingestion with full metadata review |
| `src/modules/WorldExplorer/__tests__/terrain-diagnostics.test.ts` | Suite now 10 checks (TER-09 mode label, TER-10 spawn grounding); synthetic labelled `SYNTHETIC TERRAIN`, test-only fixture labelled `TEST-ONLY DEM` | Diagnostics extension for Phase 16 |
| `src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx` | Checks chip 33/33 → 35/35 (9 system + 16 geo + 10 terrain) | Follows the diagnostics extension |

## Regression

- Phase 01–15 regression: the full suite passes with no failures; no existing test was deleted or had its assertions lowered. The two deliberate rule changes above are recorded with rationale.
- The Phase 15 counting-stub test (1 elevation evaluation per character tick) still passes.
- `pnpm lint`, `format:check`, `type-check`, `build`, `build-storybook`, `audit --prod` all exit 0 (see `BASELINE_REPORT.md`).

## Browser spot-check after the fix (2026-11-20)

Headless Chromium, standalone server started correctly (`.next/static` + `public` copied into `.next/standalone/`, `HOSTNAME=localhost`, rebuilt with the fix), 1024×768, F3 open, both modes — evidence `evidence/browser-qa-fix.json` and `browser-{synthetic,dem}-1024x768-fix-f3.png`:

| | Synthetic | DEM |
| --- | --- | --- |
| TER-09 | `SYNTHETIC TERRAIN — synthetic-danang-phase-10 @ n/a m, datum SYNTHETIC_LOCAL` | `REAL DEM (pilot — orthometric, ellipsoid alignment NOT VERIFIED) — copernicus-dem-glo30-danang-pilot-v1 @ 30 m, datum ORTHOMETRIC_EGM2008` |
| TER-10 | `Spawn Y 0 m equals sampled elevation 0` | `Spawn Y 6.045524001121521 m equals sampled elevation 6.045524001121521` |
| Mini Map Span | `Span: 144 m` | `Span: 3000 m` |
| Checks chip / Terrain checks | 35/35 / 10/10 | 35/35 / 10/10 |
| Canvases / console errors / page errors | 2 / 0 / 0 | 2 / 0 / 0 |

One non-error observation: the synthetic run logged one failed request (`/api/weather net::ERR_ABORTED`, no console error); the DEM run had none. Standing weather-observation blocker, not a defect of this fix. Full 6-viewport re-QA after the fix was not run.

## Not covered by automated tests (browser verification pending)

- World initialisation, movement, jump, camera, Mini Map, HUD, weather, interaction and F3 in a real browser at the 6 viewports, in both synthetic and `?terrain=dem` modes.
- WebGL context loss/restore in DEM mode.
- Frame cost / FPS on real hardware.
