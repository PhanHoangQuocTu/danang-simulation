# Phase 15 — Terrain Provider Architecture & DEM Readiness — Implementation Report

Date: 2026-11-19. Repo: `PhanHoangQuocTu/danang-simulation`, branch `main`.
Local checkout head at start: `5e7eca6` (mirrors GitHub `main` `4c427d0d87c7063d5657eab0bccb54dd18b21e1a`).
**Status: implementation complete and PUSHED to `main` on 2026-11-20. GitHub commits `b0722d87` (`feat(terrain): add phase 15 terrain provider architecture and dem readiness`, 48 files) and `5fc908a` (`refactor(terrain): remove superseded synthetic.ts replaced by synthetic-terrain.ts`), parent `4c427d0`. Overall product verdict stays PARTIAL.**

## 1. Overview

Phase 15 introduces one elevation owner for the whole world: a unified
`TerrainProvider` contract in pure TypeScript — the contract itself in
`src/engine/terrain/` (so the engine never imports world-core, matching the
documented world-core → engine direction), with strict metadata validation, a
grid-based DEM provider and selection in `src/world-core/terrain/` — and a refactor of the existing
synthetic terrain into a provider using that contract — preserving appearance,
dimensions, spawn, collision, structures/vegetation, camera, boundaries and
environment exactly. The synthetic provider remains the production default until a
real dataset passes all approval/verification. A deterministic 5×5 test DEM fixture
is provided, explicitly marked TEST-ONLY, and no real DEM was downloaded or invented.

Final gates (Node 22.23.5 / pnpm 12.14.0, all exit 0): lint, format:check,
type-check, test **47 files / 280 tests** (baseline 42 / 242), test:coverage
(77.83% / 67.3% / 63.03% / 79.64%), build (14 static pages), build-storybook
(0 PLUGIN_TIMINGS), audit --prod (0 vulnerabilities). Browser verification in this
VM now succeeds: the world initializes (2 canvases) at six viewports, character
spawns/moves/jumps, F3 shows "Terrain checks: 8/8", WebGL context loss/restore
works, zero console errors. FPS 60 remains NOT_APPLICABLE/NOT VERIFIED (SwiftShader
software rendering only; no GPU/physical device in this VM).

## 2. Scope & constraints

- **No commit / no push at implementation time.** Prompt §21: do not commit or push unless explicitly
  authorized by the Project Owner. The user had not authorized push for Phase 15 at that time.
  Work was in the working copy only; this report lists every changed file (§19).
  **Update 2026-11-20: push was authorized by the Project Owner and landed on `main` as `b0722d87` + `5fc908a`.**
- Phase 15 only. No Phase 16–20 work was started.
- User's strict rule applied throughout: verify carefully, ensure a real pass, do
  not self-mark PASS. Every PASS below cites independently run evidence.
- No files modified outside the repo checkout except working notes in `/tmp`.
  `PROJECT_KNOWLEDGE_REPORT-2026-11-19.md` untouched. No historical Phase 11–14
  reports or evidence rewritten.
- No new dependencies, no new backend, no new GIS server/DB/NestJS/proxy/
  microservice, no arbitrary remote URL loading, no fabricated approval, no fake
  elevations.

## 3. Baseline

Measured before any change; raw outputs in `docs/audit/phase-15/evidence/*-baseline.txt`.
Full detail: `PHASE_15_IMPLEMENTATION_REPORT.md` (Appendix: BASELINE_REPORT.md).

| Gate | Baseline result |
|---|---|
| `pnpm lint` | exit 0 |
| `pnpm format:check` | exit 0 |
| `pnpm type-check` | exit 0 |
| `pnpm test` | exit 0 — 42 files / 242 tests |
| `pnpm build` | exit 0 — 14 static pages |
| `pnpm build-storybook` | exit 0 — 0 PLUGIN_TIMINGS |
| `pnpm audit --prod` | exit 0 — 0 vulnerabilities |

`test:coverage` was not run at baseline.

## 4. Audit findings — terrain (verified against source)

Two read-only audits were run (terrain audit; architecture/boundaries/conventions
audit). Findings verified against actual source:

- Exactly one terrain-elevation formula: `src/worlds/danang/zones/synthetic.ts:43-49`
  (`getTerrainElevation`): spawn flatten `smoothstep(dist, 5.5, 17.0)`; rolling hills
  `sin(x*0.055)*cos(z*0.055)*1.35 + sin(x*0.13+z*0.09)*0.42`; outer rim
  `smoothstep(dist, 38.0, 68.0)*3.2`. Elevation at origin is exactly 0.
- Verified values: terrain 180 m × 180 m (`scene.ts:223`), 128 segments/side
  (`scene.ts:224`, 16,641 vertices), character boundary radius 68 m
  (`src/engine/core/const.ts:44`), spawn implicit (0,0,0) with no named spawn
  constant, camera initial (0,3,5.4).
- No `TerrainProvider` type existed; no `getHeight`/`heightAt`/`terrainHeight`/
  `groundHeight` symbols.
- Consumers (all calling the same formula, no caching, no mesh raycast): terrain
  mesh (`scene.ts:239`), stepping stones (`:318`), lanterns (`:355`), trees (`:453`),
  bushes (`:523`), fixtures (`:541`), grass (`:660`), rocks via `manifest.ts:45`,
  character grounding via `controller.ts:119`, camera clamp (`world.ts:339`).
  Mini Map is ground-plane only; HUD shows `state.surfaceHeight` as "elevation";
  geo-telemetry converts actual Y (including jumps) via `worldToGeo`.
- Duplicates: controller re-evaluated elevation up to 3× per frame
  (`controller.ts:119,130,131`); camera a 4th evaluation per frame; 10+ independent
  call sites; winding-path centre formula triplicated (`scene.ts:242,317,657`);
  boundary 68 written twice unlinked; implicit "elevation at origin = 0" assumed
  in ≥5 places.

## 5. Audit findings — architecture & boundaries

- Engine must not import React/Next/Da Nang content; world-core must not depend on
  React/Next/Three; Da Nang-specific data stays in `src/worlds/danang/`.
- `src/engine/geospatial/core.ts` is already clean pure WGS84/ECEF/ENU math.
- `src/worlds/danang/zones/synthetic.ts` depended on `three` only for
  `THREE.MathUtils.smoothstep`.
- Repo conventions (`AGENTS.md`): pnpm 12 / Node 22; Biome formatting; strict
  translations (every key in `en` and `vi`); tests in `__tests__/` next to code;
  definition of done = lint + format:check + type-check + test (+ build /
  build-storybook when routes/components change); zero errors and zero warnings;
  no commit/push unless the user asks; do not kill processes with `pkill -f`
  from a shell whose command line contains the pattern (kill by PID/port).

## 6. Design — TerrainProvider contract

Location: `src/engine/terrain/` (`type.ts`, `const.ts`) — pure TypeScript, no React/Next/Three.
The contract lives in engine rather than world-core so the engine can consume it
without importing world-core (documented direction: world-core → engine,
`docs/architecture/CONFIG_OWNERSHIP.md`). This placement was corrected after the
read-only architecture audit arrived: the contract was first written in
`src/world-core/terrain/` and moved before delivery; all gates were re-run after
the move with identical results, and zero engine→world-core imports remain.

- `type.ts` — `TerrainProvider`: `metadata`, `coverage`, `boundaryRadiusMeters`,
  `spawnPosition`, `sampleElevation`, `sampleSupportSurface`,
  `resolveHorizontalCollisions`, `dispose`. `ElevationSample` discriminated union:
  `ok` / `outside-coverage` / `no-data` / `invalid-input` / `unsupported-crs`,
  with `elevationMeters: number | null` and a `reason`. Never a silent zero, never
  manufactured elevation. `requireElevation()` throws where elevation must exist.
  `describeTerrainProvider()` renders the diagnostics summary.
- `const.ts` — `TERRAIN_LIMITS`: max dimension 4096, max samples 4,194,304, max
  bytes 16,777,216, max span 100,000 m, max cell size 1000 m.

## 7. Design — metadata & validation

`validation.ts` — Zod `terrainDatasetMetadataSchema` + `validateTerrainDatasetMetadata()`.

Metadata: dataset ID, source ID (registry ref), version, checksum (SHA-256), CRS,
vertical datum (mandatory), unit, coverage bounds, width/height, resolution, NoData
value, capture date, accuracy, license, attribution, processing history.

Rejects: unknown datum; orthometric heights without a verified geoid transformation
(no invented geoid conversion — Phase 12 uses WGS84 ellipsoidal); unsupported CRS;
inverted bounds; missing checksum/capture date/accuracy for production geographic
data; mismatched raster dimensions; unsupported units; excessive resources; invalid
resolution. Synthetic production data is allowed with null checksum/capture/accuracy
but requires processing history.

## 8. Implementation — grid DEM provider

`grid.ts` — `GridDemProvider`: regular grid, row 0 = north edge (min Z), rows increase
toward +Z (south), columns east (+X). Bilinear interpolation (refuses to interpolate
across any NoData neighbour) and nearest-neighbour sampling. Edge clamping only at
the coverage edge; no silent clamping of missing data. Accepts only validated
geographic metadata with `WGS84_ELLIPSOID` datum; elevations are already transformed
to world meters by preprocessing — no CRS conversion at sample time. Resource limits
enforced at construction. `dispose()` marks the provider disposed; sampling
afterwards throws.

`fixtures.ts` — `createTestDemProvider()`: deterministic 5×5 test grid (cell 10 m,
origin −25/−25, coverage −25..25, elevation = col+row, NoData −9999 at col 4/row 0),
explicitly marked `TEST-ONLY — NOT REAL DA NANG GEOGRAPHIC DATA`, never referenced
by production world config.

## 9. Implementation — synthetic provider

`src/worlds/danang/zones/synthetic-terrain.ts` — `SyntheticTerrainProvider` +
singleton `syntheticTerrainProvider`. The Phase 1–10 formula is preserved verbatim
(same constants, plain-JS `smoothstep`, no Three.js import). Named constants:
`SYNTHETIC_TERRAIN_SIZE_METERS = 180`, `SYNTHETIC_TERRAIN_SEGMENTS = 128`,
`SYNTHETIC_BOUNDARY_RADIUS_METERS = 68`, coverage ±90 m. Collider arrays moved here:
`PLATFORM_COLLIDERS` (5), `ROCK_COLLIDERS` (8), `TREE_COLLIDERS` (18). Old
`src/worlds/danang/zones/synthetic.ts` deleted after all consumers moved.
Metadata declares synthetic provenance, ellipsoidal datum, meters, and an explicit
"not surveyed geography" note. Synthetic stays the DEFAULT production provider.

## 10. Implementation — consumer integration

One elevation owner; mesh, grounding and collision read the same provider at the
same coordinate:

- `src/worlds/danang/scene.ts` — `createDaNangScene(registry, scope, terrain = syntheticTerrainProvider)`;
  all 7 former `getTerrainElevation` call sites now use
  `requireElevation(terrain.sampleElevation(...))`.
- `src/engine/character/controller.ts` — `CharacterEnvironment` is now
  `{ terrain: TerrainProvider; onLanding? }`; **one elevation evaluation per tick**
  via `sampleSupportSurface` (returns both surface and raw terrain height);
  boundary from `terrain.boundaryRadiusMeters`.
- `src/modules/WorldExplorer/runtime/world.ts` — one shared `syntheticTerrainProvider`
  instance passed to scene, controller and camera clamp;
  `createPlayerState(terrain = syntheticTerrainProvider)` uses `terrain.spawnPosition`;
  camera clamp skips when the sample is not `ok`.
- `src/worlds/danang/zones/manifest.ts` — rock Y via the singleton provider +
  `requireElevation`.

## 11. Provider selection & lifecycle

`selection.ts` — `selectTerrainProvider()`: synthetic default; a DEM provider is
constructed only from validated grid input. Switching means constructing a new
provider and disposing the old one — no stale references, no shared mutable state,
deterministic disposal, no duplicate RAF/WebGL, no React state per frame.
Providers reuse a single internal collision-result object when no output object is
supplied (callers must consume immediately, not retain); `ALL_CYLINDERS` is
module-level, not rebuilt per call.

## 12. Diagnostics & HUD

`src/modules/WorldExplorer/terrain-diagnostics.ts` — `runTerrainDiagnosticsSuite()`
(TER-01..08, same style as the geo suite): provider active, CRS/datum, spawn
elevation, boundary in coverage, outside coverage rejected, invalid input rejected,
support surface, production provider. Wired into `WorldHud.tsx` checks count
(now 33 = 9 system + 16 geo + 8 terrain) and a details block mirroring the geo
diagnostics. New translation keys `terrainDiagnostics`, `terrainDiag1`–`terrainDiag8`
in both `en` and `vi` `worldExplorer.json`. No large new HUD panel. TER-08 fails
for test-only providers by design — TEST-ONLY is never presented as approved
production terrain.

## 13. Performance (before/after)

Measured with a temporary Vitest probe (200,000 `sampleElevation` calls, Node
22.23.5; probe file deleted after measurement):

| Metric | Before | After |
|---|---|---|
| Elevation evaluations per frame (character tick + camera) | up to 4 (controller 3× + camera 1×) | 2 (controller 1× via `sampleSupportSurface` + camera 1×) |
| Synthetic `sampleElevation` cost | same formula, unmeasured | ≈163 ns/call (32.6 ms / 200,000) |
| Grid DEM `sampleElevation` cost | n/a | ≈62 ns/call mixed in/out of coverage (12.3 ms / 200,000; only 16,472 in-coverage for the ±25 m fixture) |
| Allocations per sample | — | none (reused result object; no validation/CRS construction per frame; no full-grid scans) |

At 60 fps, 2 samples/frame ≈ 0.3 µs/frame of elevation work — negligible. No
speculative optimisation was introduced. Browser-side frame cost could not be
measured under SwiftShader (see §15).

## 14. Tests

Full suite: **47 files / 280 tests, all passing** (baseline 42 / 242). Coverage
77.83% / 67.3% / 63.03% / 79.64%. Detail: `PHASE_15_IMPLEMENTATION_REPORT.md` (Appendix: TEST_MATRIX.md).

New tests (38 tests, 5 files): `validation.test.ts`, `grid.test.ts`,
`synthetic.test.ts`, `selection.test.ts`, `terrain-diagnostics.test.ts`.
Updated: `controller.test.ts` (stub env uses the provider; counting-stub test proves
one elevation evaluation per tick over 10 updates), `world.test.ts` (import
update), `hud-semantics.test.tsx` (checks chip `25/25` → `33/33` — the truthful
new total, not a weakening). No existing test was weakened; no timeout increased.

## 15. Browser verification

Standalone server: `node .next/standalone/server.js`, `HOSTNAME=localhost PORT=3100`
(workaround for upstream Next.js #94745 on `127.0.0.1`).

**Root-cause finding (new, significant):** the previous verification session's
"world did not initialize in headless — 0 canvases" was reproduced at first
(1024×768, 0 canvases, "Preparing 3D world…", 0 console errors). Investigation
showed WebGL2 **was** available (SwiftShader ANGLE) and the failure was 33
`/_next/static/...` subresource requests failing `net::ERR_ABORTED` — because the
standalone server had been started **without** the required `.next/static` and
`public` copies (curl confirmed the chunks 404). After copying them into
`.next/standalone/` and restarting, the world initializes. This was a test-harness
setup error, not an app defect. The `fps-probe.mjs` usage notes should gain the
copy step (follow-up, not done here).

Results after the fix (evidence: `docs/audit/phase-15/evidence/browser-*.json`,
[`browser-context-restore-1024x768.txt`](docs/audit/phase-15/evidence/EVIDENCE.md#browser-context-restore-1024x768txt)):

| Viewport | Canvases | World | Checks chip | Console errors | Horiz. overflow |
|---|---|---|---|---|---|
| 1920×1080 | 2 | yes | 33/33 | 0 | none |
| 1366×768 | 2 | yes | 33/33 | 0 | none |
| 1024×768 | 2 | yes | 33/33 | 0 | none |
| 768×1024 | 2 | yes | 33/33 | 0 | none |
| 390×844 | 2 | yes | not surfaced in compact HUD | 0 | none |
| 844×390 | 2 | yes | 33/33 | 0 | none |

Interaction (1024×768, `browser-interact-1024x768.json`): spawn at (0, 0); holding W
for 3 s moved the character to (0, −0.61); Space produced JUMP state; F3 opened
diagnostics showing **"Terrain checks: 8/8"**; WebGL context loss showed the app's
recovery UI ("Waiting for graphics recovery" / Retry) and `restoreContext()` brought
the world back with 2 canvases and no exceptions.

FPS: 20 s probe at 1024×768 measured 0.79 FPS, mean frame 1275 ms, renderer
SwiftShader — status **NOT_APPLICABLE** per the probe's own rules (software
rendering is a regression baseline only, never a 60 FPS certification). 60 FPS on
hardware, physical devices, Docker and long-session GPU profiling remain
NOT VERIFIED (no GPU/Docker in this VM).

## 16. Security & governance

- No arbitrary remote URL loading; no new network surface. DEM input is
  validated in-process only.
- No fabricated approval: no dataset is marked approved/ingested; the six city
  catalog entries remain unapproved; TEST-ONLY fixtures are fenced out of the
  production registry path.
- No fake elevations: every non-`ok` sample carries `elevationMeters: null` and a
  reason; scene build throws rather than inventing terrain.
- No new GIS server/DB/NestJS/proxy/microservice; no new backend; no new
  dependencies (Zod + Phase 13 registry infra reused).
- No secrets touched. No credentials in code or evidence.

## 17. Refactor & cleanup

- Deleted `src/worlds/danang/zones/synthetic.ts` (110 lines); one elevation owner
  replaces 10+ independent call sites of the duplicated formula.
- Controller: 3 elevation evaluations/tick → 1; camera clamp reads the same
  provider; boundary now comes from `terrain.boundaryRadiusMeters` instead of a
  second hardcoded 68.
- No circular imports (world-core/terrain imports only `zod` + relative files and
  the engine contract; engine imports the contract type-only via a relative path;
  zero engine→world-core imports verified by grep after the contract move).
- No giant config, no utility dumps; styles/config ownership unchanged
  (per `AGENTS.md`).
- Formatting: `pnpm exec biome format --write` applied to the touched files;
  final `format:check` exit 0.

## 18. Acceptance matrix (P15-01..P15-20)

Statuses: PASS = evidence cited; PARTIAL = done with a stated gap; NOT_VERIFIED =
could not be checked in this environment; no item is marked PASS without evidence.

| ID | Acceptance | Status | Evidence |
|---|---|---|---|
| P15-01 | Unified `TerrainProvider` contract (elevation, coverage, metadata, CRS, datum, units, resolution, NoData, boundary, interpolation, accuracy/provenance, validation) | PASS | `src/engine/terrain/{type,const}.ts` + `src/world-core/terrain/validation.ts`; tests `validation.test.ts`, `synthetic.test.ts` |
| P15-02 | `ElevationSample` distinguishes valid / outside-coverage / NoData / invalid-input / unsupported-CRS; never silent 0 | PASS | `type.ts`; `grid.test.ts`, `synthetic.test.ts` |
| P15-03 | Strict metadata + validation rejects invalid dimensions/non-finite/invalid bounds/unsupported CRS/unknown datum/missing provenance/invalid checksum/unsupported units/excessive resources/invalid resolution | PASS | `validation.ts`; `validation.test.ts` (all rejection classes tested) |
| P15-04 | Vertical datum mandatory; ellipsoidal vs orthometric vs MSL distinguished; orthometric without verified geoid rejected; no invented geoid conversion | PASS | `validation.ts`; `validation.test.ts` |
| P15-05 | Grid DEM provider: regular grid, extent, cell spacing, orientation, NoData, nearest + bilinear, edge/NoData/out-of-coverage/invalid handling, no interpolation across missing samples, bounded resources | PASS | `grid.ts`; `grid.test.ts` |
| P15-06 | Synthetic provider refactored onto the contract, preserving appearance/dimensions/spawn/collision/structures/vegetation/camera/boundaries/environment exactly | PASS | `synthetic-terrain.ts` (formula verbatim); `synthetic.test.ts`; full suite green; browser verification §15 |
| P15-07 | Synthetic stays the DEFAULT production provider until a real dataset passes approval/verification | PASS | `selection.ts`; `selection.test.ts`; no approved dataset exists |
| P15-08 | Mesh / grounding / collision / camera use the same provider elevation at the same coordinate; duplicated formulas removed | PASS | §10; `scene.ts`, `controller.ts`, `world.ts`, `manifest.ts`; counting-stub test (1 evaluation/tick) |
| P15-09 | Test-only DEM fixtures deterministic, marked TEST-ONLY, never in production config; no real DEM downloaded/invented | PASS | `fixtures.ts`; `selection.test.ts`; no production reference to the fixture |
| P15-10 | Provider selection/lifecycle: synthetic default, DEM only from validated data, explicit selection, no stale references, deterministic disposal | PASS | `selection.ts`; `selection.test.ts` |
| P15-11 | Diagnostics show active provider/readiness/dataset/coverage/resolution/datum/sampling/NoData/synthetic vs DEM; no large new HUD panel; TEST-ONLY never shown as approved | PASS | `terrain-diagnostics.ts` (TER-01..08); `WorldHud.tsx`; browser: "Terrain checks: 8/8", chip 33/33 |
| P15-12 | Performance: no allocations per sample, no repeated validation/CRS per frame, no full-grid scans, no React updates per frame; before/after measured | PARTIAL | §13 measured in Node (163 ns/call synthetic; 4→2 evals/frame); browser-side frame cost NOT measured under SwiftShader |
| P15-13 | Provider/grid/integration/regression tests; no weakened tests, no timeout increases | PASS | 47 files / 280 tests, all passing; `TEST_MATRIX.md` |
| P15-14 | Browser: world loads, terrain renders, spawn/walk/run/jump/land, collision, camera, Mini Map, HUD, time/weather, interactions, F3, context restoration, no stale reference after disposal | PARTIAL | §15: load/render/spawn/walk/jump/F3/context-restore verified at 1024×768; run/land/collision/time/weather interactions not individually exercised in this probe; six viewports load clean |
| P15-15 | Viewports 1920×1080, 1366×768, 1024×768, 768×1024, 390×844, 844×390 | PASS | §15 table; 2 canvases, 0 console errors at all six |
| P15-16 | No arbitrary remote URL loading, no fabricated approval, no fake elevations, no new backend/GIS service, no unnecessary dependencies | PASS | §16; no new dependency in `package.json` (unchanged) |
| P15-17 | Refactor: one elevation owner, no duplicate terrain calculations, no circular imports, no giant config, styles/config ownership kept | PASS | §17; `synthetic.ts` deleted; lint/type-check exit 0 |
| P15-18 | Boundaries respected: engine no React/Next/Da Nang and no world-core import; world-core no React/Next/Three; Da Nang data in `src/worlds/danang/` | PASS | `ARCHITECTURE_REPORT.md`; `type-check` + `lint` exit 0; grep confirms zero engine→world-core imports |
| P15-19 | Reports & evidence delivered (this report + `docs/audit/phase-15/`); `PHASE_STATUS.md` updated truthfully | PASS | This file; `BASELINE_REPORT.md`, `ARCHITECTURE_REPORT.md`, `TEST_MATRIX.md`, `KNOWN_ISSUES.md`, `evidence/` |
| P15-20 | No commit/push without Project Owner authorization; no Phase 16 started | PASS | No local commit made; nothing pushed; no Phase 16 files |

## 19. Known issues, limitations & next steps

Known issues: `PHASE_15_IMPLEMENTATION_REPORT.md` (Appendix: KNOWN_ISSUES.md). Headlines:

- Scene mesh dimensions remain synthetic-specific (180 m / 128 segments); a DEM
  provider that does not cover ±90 m throws at scene build via `requireElevation`.
  DEM-driven mesh sizing is Phase 16 work.
- No real DEM exists; synthetic remains the production default by design.
- No CRS conversion at sample time; no geoid model bundled.
- Checks chip not surfaced in the compact mobile HUD at 390×844 (observation).
- FPS 60 / physical device / Docker / GPU long-term profiling still NOT VERIFIED.
- Standalone `127.0.0.1` bind still FAIL (upstream Next.js #94745).
- **Follow-up:** update `fps-probe.mjs` usage notes to copy `.next/static` and
  `public` into `.next/standalone/` before starting the standalone server — the
  missing copy was the root cause of the earlier "0 canvases" headless result.

### Files changed (local only, unpushed — no commit made)

New: `src/engine/terrain/{const,type}.ts`,
`src/world-core/terrain/{validation,grid,fixtures,selection}.ts`,
`src/world-core/terrain/__tests__/{validation,grid,synthetic,selection}.test.ts`,
`src/worlds/danang/zones/synthetic-terrain.ts`,
`src/modules/WorldExplorer/terrain-diagnostics.ts`,
`src/modules/WorldExplorer/__tests__/terrain-diagnostics.test.ts`,
`PHASE_15_IMPLEMENTATION_REPORT.md`,
`docs/audit/phase-15/{BASELINE_REPORT,ARCHITECTURE_REPORT,TEST_MATRIX,KNOWN_ISSUES}.md`,
`docs/audit/phase-15/evidence/*`.

Modified: `src/engine/character/controller.ts`,
`src/engine/character/__tests__/controller.test.ts`,
`src/modules/WorldExplorer/runtime/world.ts`,
`src/modules/WorldExplorer/components/WorldHud.tsx`,
`src/modules/WorldExplorer/__tests__/world.test.ts`,
`src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx`,
`src/worlds/danang/scene.ts`, `src/worlds/danang/zones/manifest.ts`,
`src/messages/en/worldExplorer.json`, `src/messages/vi/worldExplorer.json`,
`docs/PHASE_STATUS.md`, `docs/architecture/WORLD_ARCHITECTURE.md`.

Deleted: `src/worlds/danang/zones/synthetic.ts`.

### Final gates (after)

| Gate | Result |
|---|---|
| `pnpm lint` | exit 0 |
| `pnpm format:check` | exit 0 |
| `pnpm type-check` | exit 0 |
| `pnpm test` | exit 0 — 47 files / 280 tests |
| `pnpm test:coverage` | exit 0 — 77.83% / 67.3% / 63.03% / 79.64% |
| `pnpm build` | exit 0 — 14 static pages |
| `pnpm build-storybook` | exit 0 — 11.55 s, 0 PLUGIN_TIMINGS |
| `pnpm audit --prod` | exit 0 — 0 vulnerabilities |

**Push authorization needed:** nothing was committed or pushed in this task.
The parent/user must explicitly authorize push before these Phase 15 changes go
to `main`.

---

## Appendix: ARCHITECTURE_REPORT.md

Merged from docs/audit/phase-15/ARCHITECTURE_REPORT.md on 2026-11-20 — file removed as part of Option A docs consolidation.

## Phase 15 — Architecture Report: Terrain Provider & DEM Readiness

Date: 2026-11-19. Scope: Phase 15 only. No Phase 16–20 work. No new backend,
no new GIS server/DB/NestJS/proxy/microservice, no new dependencies (Zod and the
Phase 13 registry infrastructure were reused).

### Placement decisions (boundaries)

| Piece | Location | Why |
|---|---|---|
| `TerrainProvider` contract, `ElevationSample`, resource limits | `src/engine/terrain/` (`type.ts`, `const.ts`) | Pure TypeScript; no React/Next/Three imports. The contract lives in engine (not world-core) so the engine can consume it without importing world-core — the documented direction is world-core → engine (`docs/architecture/CONFIG_OWNERSHIP.md`). This placement was corrected after the read-only architecture audit arrived: the contract was first written in `src/world-core/terrain/` and moved before delivery. |
| Metadata validation, grid provider, selection, test fixtures | `src/world-core/terrain/` (`validation.ts`, `grid.ts`, `selection.ts`, `fixtures.ts`) | World-core is the schema/registry layer; these import the contract from `src/engine/terrain/`, matching world-core → engine. |
| Synthetic provider + colliders + terrain constants | `src/worlds/danang/zones/synthetic-terrain.ts` | Da Nang-specific data stays in `src/worlds/danang/`. |
| Character grounding / collision / camera consumption | `src/engine/character/controller.ts`, `src/modules/WorldExplorer/runtime/world.ts` | Engine consumes the injected provider; it does not import Da Nang content. |
| Diagnostics suite | `src/modules/WorldExplorer/terrain-diagnostics.ts` | Module-owned, mirrors the existing geo diagnostics suite. |

`src/world-core/terrain/` imports only `zod`, relative files and the engine contract.
`src/engine/character/` imports the contract type from `../terrain/type` (relative,
type-only); no engine file imports world-core. `src/worlds/danang/zones/synthetic.ts`
was deleted; its only Three.js use was `THREE.MathUtils.smoothstep`, replaced by a
plain-JS `smoothstep` in the provider.

### Contract (`src/engine/terrain/type.ts`, limits in `src/engine/terrain/const.ts`)

`TerrainProvider`: `metadata`, `coverage`, `boundaryRadiusMeters`, `spawnPosition`,
`sampleElevation(x, z)`, `sampleSupportSurface(x, z)`, `resolveHorizontalCollisions(...)`,
`dispose()`. `ElevationSample` is a discriminated union — `ok` / `outside-coverage` /
`no-data` / `invalid-input` / `unsupported-crs` — with `elevationMeters: number | null`
and a `reason` string. A provider never returns 0 as a silent fallback and never
manufactures elevation. `requireElevation()` throws where elevation must exist
(scene build). `describeTerrainProvider()` renders the diagnostics summary.

### Metadata & validation (`const.ts`, `validation.ts`)

`TerrainDatasetMetadata`: dataset ID, source ID (registry ref), version, checksum
(SHA-256), CRS, vertical datum (mandatory), unit, coverage bounds, width/height,
resolution, NoData value, capture date, accuracy, license, attribution, processing
history. `TERRAIN_LIMITS`: max dimension 4096, max samples 4,194,304, max bytes
16,777,216, max span 100,000 m, max cell size 1000 m.

`validateTerrainDatasetMetadata()` (Zod) rejects: unknown datum; orthometric heights
without a verified geoid transformation (no invented geoid conversion — Phase 12 uses
WGS84 ellipsoidal); unsupported CRS; inverted bounds; missing checksum / capture date /
accuracy for production geographic data; mismatched raster dimensions; unsupported
units; excessive resources; invalid resolution. Synthetic production data is allowed
with null checksum/capture/accuracy but requires processing history.

### Grid DEM provider (`grid.ts`)

`GridDemProvider`: regular grid, row 0 = north edge (min Z), rows increase toward +Z
(south), columns east (+X). Bilinear interpolation (refuses to interpolate across any
NoData neighbour) and nearest-neighbour sampling. Edge clamping only at the coverage
edge; no silent clamping of missing data. Accepts only validated geographic metadata
with `WGS84_ELLIPSOID` datum; elevations are already transformed to world meters by
preprocessing — no CRS conversion at sample time. Resource limits enforced at
construction. `dispose()` marks the provider disposed; sampling afterwards throws.

### Synthetic provider (`src/worlds/danang/zones/synthetic-terrain.ts`)

`SyntheticTerrainProvider` + singleton `syntheticTerrainProvider`. The Phase 1–10
formula is preserved verbatim (same constants, same `smoothstep` shape). Constants
now named: `SYNTHETIC_TERRAIN_SIZE_METERS = 180`, `SYNTHETIC_TERRAIN_SEGMENTS = 128`,
`SYNTHETIC_BOUNDARY_RADIUS_METERS = 68`, coverage ±90 m. Collider arrays moved here:
`PLATFORM_COLLIDERS` (5), `ROCK_COLLIDERS` (8), `TREE_COLLIDERS` (18). The provider
is the production default and stays the default until a real dataset passes all
approval/verification. Its metadata declares `synthetic` provenance, ellipsoidal
datum, meters, and `isTestOnly: false` with an explicit "not surveyed geography" note.

### Selection & lifecycle (`selection.ts`)

`selectTerrainProvider()`: synthetic default; a DEM provider is constructed only from
validated grid input (`validateTerrainDatasetMetadata` + `GridDemProvider`).
Switching means constructing a new provider and disposing the old one — no stale
references, no shared mutable state. Providers reuse a single internal collision-result
object when no output object is supplied (callers must consume immediately, not
retain); `ALL_CYLINDERS` is module-level, not rebuilt per call.

### Consumer integration (one elevation owner)

- `src/worlds/danang/scene.ts` — `createDaNangScene(registry, scope, terrain = syntheticTerrainProvider)`;
  all 7 former `getTerrainElevation` call sites now use `requireElevation(terrain.sampleElevation(...))`.
- `src/engine/character/controller.ts` — `CharacterEnvironment` is now
  `{ terrain: TerrainProvider; onLanding? }`; one elevation evaluation per tick via
  `sampleSupportSurface` (returns both surface and raw terrain height); boundary from
  `terrain.boundaryRadiusMeters`.
- `src/modules/WorldExplorer/runtime/world.ts` — one shared `syntheticTerrainProvider`
  instance passed to scene, controller and camera clamp; `createPlayerState(terrain = syntheticTerrainProvider)`
  uses `terrain.spawnPosition`; camera clamp skips when the sample is not `ok`.
- `src/worlds/danang/zones/manifest.ts` — rock Y via the singleton provider + `requireElevation`.
- Mesh, grounding and collision now read the same provider at the same coordinate.

### Diagnostics

`runTerrainDiagnosticsSuite()` (TER-01..08, same style as the geo suite): provider active,
CRS/datum, spawn elevation, boundary in coverage, outside coverage rejected, invalid
input rejected, support surface, production provider. Wired into `WorldHud.tsx` checks
count (now 33 = 9 system + 16 geo + 8 terrain) and a details block mirroring the geo
diagnostics. New translation keys `terrainDiagnostics`, `terrainDiag1`–`terrainDiag8`
in both `en` and `vi` `worldExplorer.json`. TEST-ONLY providers are never presented as
approved production terrain (TER-08 fails for them by design).

### What Phase 15 deliberately does NOT do

- No real DEM downloaded or invented; the only DEM data is the 5×5 deterministic
  test fixture (`fixtures.ts`), explicitly marked `TEST-ONLY — NOT REAL DA NANG
  GEOGRAPHIC DATA`, never referenced by production world config.
- No mesh rebuild from a DEM: the scene terrain dimensions (180 m / 128 segments)
  remain synthetic-specific; building a world mesh from a DEM provider of different
  size/coverage is Phase 16 work. A DEM provider whose coverage does not cover the
  180 m mesh correctly throws at scene build via `requireElevation` instead of
  silently producing wrong terrain.
- No CRS conversion at sample time, no geoid model, no remote URL loading, no new
  backend service.

---

## Appendix: BASELINE_REPORT.md

Merged from docs/audit/phase-15/BASELINE_REPORT.md on 2026-11-20 — file removed as part of Option A docs consolidation.

## Phase 15 — Baseline Report

Date: 2026-11-19. Environment: Node 22.23.5, pnpm 12.14.0, Linux VM.
Local checkout head at baseline: `5e7eca6` (`fix(weather): distinguish upstream 429 and verify blocked items`),
mirroring GitHub `main` head `4c427d0d87c7063d5657eab0bccb54dd18b21e1a`. Tree clean at baseline.
Raw outputs: `docs/audit/phase-15/evidence/*-baseline.txt`.

### Baseline gates (all exit 0)

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
67.3% branches / 63.03% functions / 79.64% lines (see `docs/audit/phase-15/evidence/EVIDENCE.md#test-coverage-aftertxt`).

### Baseline terrain state (verified against source, not the prompt)

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

### Baseline browser state (pre-existing, not a Phase 15 regression)

The previous verification session (2026-11-19, commit `4c427d0`) reported the 3D world
did not initialize in this VM's headless browser (0 canvases, root cause not established).
Phase 15 re-investigated and found the root cause: the standalone server was started
without the required `.next/static` (and `public`) copy, so every `/_next/static/...`
subresource failed (33 requests `net::ERR_ABORTED`, only the HTML document finished).
WebGL2 itself was available (SwiftShader ANGLE). After copying `.next/static` and
`public` into `.next/standalone/` and restarting, the world initializes with 2 canvases.
See `PHASE_15_IMPLEMENTATION_REPORT.md` §12 and `evidence/browser-*.json`.

---

## Appendix: KNOWN_ISSUES.md

Merged from docs/audit/phase-15/KNOWN_ISSUES.md on 2026-11-20 — file removed as part of Option A docs consolidation.

## Phase 15 — Known Issues

Date: 2026-11-19. Status of the overall product remains **PARTIAL** (see
`PHASE_15_IMPLEMENTATION_REPORT.md` acceptance matrix).

### Phase 15 limitations (introduced or confirmed by this phase)

1. **Scene mesh dimensions are still synthetic-specific.** `createDaNangScene`
   builds a 180 m × 180 m / 128-segment mesh and samples the provider at every
   vertex via `requireElevation`. A DEM provider whose coverage does not cover
   ±90 m throws at scene build instead of silently producing wrong terrain.
   Building a world mesh from a DEM of arbitrary size/coverage is Phase 16 work.
2. **No real DEM exists in this repo.** The only DEM data is the 5×5 deterministic
   test fixture, marked TEST-ONLY. No real dataset has passed approval/verification,
   so the synthetic provider remains the production default by design.
3. **No CRS conversion at sample time.** Elevations must already be transformed to
   world meters by preprocessing. Orthometric heights without a verified geoid
   transformation are rejected at validation; no geoid model is bundled.
4. **Checks chip not surfaced in the compact mobile HUD.** At 390×844 the `33/33`
   chip text was not found in the visible body text (compact HUD hides it). The
   diagnostics themselves exist and pass; this is an observation, not a defect
   found by Phase 15, and was not changed in this phase.
5. **Performance measured in Node only.** Sampling cost: synthetic ≈163 ns/call,
   grid DEM ≈62 ns/call (mixed in/out of coverage) over 200,000 calls in Vitest.
   Per-frame elevation evaluations dropped from up to 4 (controller 3× + camera 1×)
   to 2 (controller 1× via `sampleSupportSurface` + camera 1×). No browser-side
   frame-cost measurement was possible under SwiftShader; no speculative
   optimisation was introduced.

### Pre-existing issues NOT resolved by Phase 15 (carried over)

- Standalone `127.0.0.1` bind still FAIL (upstream Next.js #94745, PR #95917
  unmerged; latest Next 16.4.6). Workaround: `localhost` or `0.0.0.0`.
  **New finding:** the standalone server also requires `.next/static` and `public`
  to be copied into `.next/standalone/` (Next.js standalone deployment requirement);
  without that copy every `/_next/static/...` subresource fails and the world never
  initializes in a browser. That was the root cause of the "0 canvases" result in
  the 2026-11-19 verification session — a test-harness setup error, not an app
  defect. The repo's `fps-probe.mjs` usage notes should be updated to include the
  copy step (follow-up, not done in this phase).
- FPS 60 / physical device / Docker / GPU long-term profiling: NOT VERIFIED
  (no Docker, no GPU in this VM; headless rendering is SwiftShader software only).
- Live weather observation: NOT VERIFIED (Open-Meteo 429 daily limit on shared
  egress IP; BFF 429 handling already landed in `4c427d0`).
- No real satellite imagery / GCP / legal approval; Overpass at capacity;
  collision/occlusion, storm, day-sweep, screen reader / 200% zoom, Gemini Preview
  remain NOT VERIFIED (see Phase 14 reports).

### Risks

- The internal collision-result object reuse (no-allocation design) requires
  callers to consume the result immediately and not retain it. This is documented
  on the interface; a future caller retaining it would read stale values.
- `selectTerrainProvider` disposal is deterministic, but no UI exists yet to switch
  providers at runtime; provider switching is a code-level operation until a later
  phase adds an approved flow.

---

## Appendix: TEST_MATRIX.md

Merged from docs/audit/phase-15/TEST_MATRIX.md on 2026-11-20 — file removed as part of Option A docs consolidation.

## Phase 15 — Test Matrix

Date: 2026-11-19. Runner: Vitest, Node 22.23.5. Full suite: **47 files / 280 tests,
all passing** (baseline: 42 files / 242 tests). No existing test was weakened; no
timeout was increased. One existing test was updated to the new truthful total:
`hud-semantics.test.tsx` pins the diagnostics chip at `33/33` (was `25/25`; the 8
new terrain checks are now counted). Raw output: `docs/audit/phase-15/evidence/EVIDENCE.md#test-aftertxt`;
coverage: `docs/audit/phase-15/evidence/EVIDENCE.md#test-coverage-aftertxt` (77.83% stmts / 67.3% branches /
63.03% funcs / 79.64% lines).

### New tests (38 new tests, 5 new files)

| File | Coverage |
|---|---|
| `src/world-core/terrain/__tests__/validation.test.ts` | Metadata validation: valid synthetic + geographic metadata; rejects unknown datum, orthometric without verified geoid, unsupported CRS, inverted bounds, missing checksum/capture/accuracy for production geographic data, mismatched raster dimensions, unsupported units, excessive resources, invalid resolution; synthetic production data allowed with null checksum/capture/accuracy + processing history. |
| `src/world-core/terrain/__tests__/grid.test.ts` | Grid provider: valid sampling, bilinear (exact values + no interpolation across NoData neighbours), nearest, edge clamping, outside-coverage, NoData, invalid input, unsupported CRS/datum rejection, resource limits, disposal. |
| `src/world-core/terrain/__tests__/synthetic.test.ts` | Synthetic provider: formula preserved verbatim (origin = 0, known values at fixed coordinates), spawn, boundary 68 m, coverage ±90 m, support surface with platform colliders, collision resolution, disposal. |
| `src/world-core/terrain/__tests__/selection.test.ts` | Provider selection: synthetic default; DEM only from validated grid input; invalid input rejected; switching disposes the old provider; disposed provider sampling throws. |
| `src/modules/WorldExplorer/__tests__/terrain-diagnostics.test.ts` | Diagnostics suite: 8/8 pass for the synthetic production provider; TER-08 fails for a test-only DEM provider. |

### Updated tests

| File | Change |
|---|---|
| `src/engine/character/__tests__/controller.test.ts` | Stub environment now uses `syntheticTerrainProvider`; added a counting-stub test proving **one elevation evaluation per tick over 10 updates** (was up to 3×/tick). |
| `src/modules/WorldExplorer/__tests__/world.test.ts` | Import updated from `zones/synthetic` to `zones/synthetic-terrain`. |
| `src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx` | Checks chip expectation `25/25` → `33/33` (9 system + 16 geo + 8 terrain). |

### Regression

All 42 baseline test files still pass unchanged (except the two truthful updates
above). Phase 01–14 behaviour is covered by the existing suite; the full run is
green with no skips added.

### Browser verification (not unit tests — see `evidence/browser-*.json`)

| Check | Result |
|---|---|
| World loads, 2 canvases (world + Mini Map) | PASS at 1024×768, 1920×1080, 1366×768, 768×1024, 390×844, 844×390 |
| Spawn at (0, 0) | PASS (1024×768) |
| Walk (W, 3 s) → position (0, −0.61) | PASS (1024×768) |
| Jump → JUMP state observed | PASS (1024×768) |
| F3 diagnostics → "Terrain checks: 8/8" | PASS (1024×768) |
| Checks chip 33/33 | PASS (all desktop/tablet viewports; not surfaced in the compact mobile HUD at 390×844 — observation, not a defect) |
| WebGL context loss → recovery UI; restore → world back, 2 canvases | PASS (1024×768) |
| Console errors / exceptions | 0 at every viewport probed |
| Horizontal overflow | None at any viewport probed |
| FPS 60 | NOT_APPLICABLE — SwiftShader software renderer only in this VM (0.79 FPS over 20 s at 1024×768); software rendering is a regression baseline only, never a 60 FPS certification. Physical device + GPU still NOT VERIFIED. |

### Not covered by tests (honest gaps)

- No end-to-end test builds a world mesh from a real DEM provider (no real DEM
  exists; scene dimensions remain synthetic-specific — see `KNOWN_ISSUES.md`).
- No physical-device, Docker, or long-session GPU profiling (not available in this VM).
- No screen-reader / 200% zoom verification in this phase.
