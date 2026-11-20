# Phase 15 — Baseline Report

Date: 2026-11-19. Environment: Node 22.23.5, pnpm 12.14.0, Linux VM.
Local checkout head at baseline: `5e7eca6` (`fix(weather): distinguish upstream 429 and verify blocked items`),
mirroring GitHub `main` head `4c427d0d87c7063d5657eab0bccb54dd18b21e1a`. Tree clean at baseline.
Raw outputs: `docs/audit/phase-15/evidence/*-baseline.txt`.

## Baseline gates (all exit 0)

| Gate | Result |
|---|---|
| `pnpm lint` | exit 0 |
| `pnpm format:check` | exit 0 |
| `pnpm type-check` | exit 0 |
| `pnpm test` | exit 0 — 42 files / 242 tests |
| `pnpm build` | exit 0 — 14 static pages |
| `pnpm build-storybook` | exit 0 — 0 PLUGIN_TIMINGS |
| `pnpm audit --prod` | exit 0 — 0 vulnerabilities |

`pnpm test:coverage` was not run at baseline; final coverage is 77.83% statements /
67.3% branches / 63.03% functions / 79.64% lines (see `evidence/test-coverage-after.txt`).

## Baseline terrain state (verified against source, not the prompt)

- Exactly one terrain-elevation formula, in `src/worlds/danang/zones/synthetic.ts:43-49`
  (`getTerrainElevation`): spawn flatten `smoothstep(dist, 5.5, 17.0)`; rolling hills
  `sin(x*0.055)*cos(z*0.055)*1.35 + sin(x*0.13+z*0.09)*0.42`; outer rim
  `smoothstep(dist, 38.0, 68.0)*3.2`. Elevation at origin is exactly 0.
- Terrain mesh 180 m × 180 m, 128 segments/side (16,641 vertices) — `src/worlds/danang/scene.ts:223-224`.
- Character boundary radius 68 m (`src/engine/core/const.ts:44`); spawn implicit `(0, 0, 0)`,
  no named spawn constant; camera initial `(0, 3, 5.4)`.
- No `TerrainProvider` type existed; no `getHeight` / `heightAt` / `terrainHeight` /
  `groundHeight` symbols anywhere.
- Consumers (all calling the same formula directly, no caching, no mesh raycast): terrain
  mesh (`scene.ts:239`), stepping stones (`:318`), lanterns (`:355`), trees (`:453`),
  bushes (`:523`), fixtures (`:541`), grass (`:660`), rocks via `manifest.ts:45`, character
  grounding via `controller.ts:119` (`getSupportSurfaceHeight`), camera clamp
  (`world.ts:339`). Mini Map is ground-plane only (no elevation). HUD shows
  `state.surfaceHeight` as "elevation". Geo-telemetry converts actual Y (including jumps)
  via `worldToGeo`.
- Duplication measured: character controller re-evaluated elevation up to 3× per frame
  (`controller.ts:119,130,131`); camera a 4th evaluation per frame; 10+ independent call
  sites; winding-path centre formula triplicated (`scene.ts:242,317,657`); boundary 68
  written twice unlinked (playable clamp vs outer-rim end); implicit "elevation at
  origin = 0" assumed in ≥5 places.
- Boundaries: engine must not import React/Next/Da Nang content; world-core must not
  depend on React/Next/Three; Da Nang-specific data stays in `src/worlds/danang/`;
  `src/engine/geospatial/core.ts` is already clean pure WGS84/ECEF/ENU math;
  `src/worlds/danang/zones/synthetic.ts` depended on `three` only for
  `THREE.MathUtils.smoothstep`.

## Baseline browser state (pre-existing, not a Phase 15 regression)

The previous verification session (2026-11-19, commit `4c427d0`) reported the 3D world
did not initialize in this VM's headless browser (0 canvases, root cause not established).
Phase 15 re-investigated and found the root cause: the standalone server was started
without the required `.next/static` (and `public`) copy, so every `/_next/static/...`
subresource failed (33 requests `net::ERR_ABORTED`, only the HTML document finished).
WebGL2 itself was available (SwiftShader ANGLE). After copying `.next/static` and
`public` into `.next/standalone/` and restarting, the world initializes with 2 canvases.
See `PHASE_15_IMPLEMENTATION_REPORT.md` §12 and `evidence/browser-*.json`.
