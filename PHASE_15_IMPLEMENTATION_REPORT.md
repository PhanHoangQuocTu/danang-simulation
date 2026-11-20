# Phase 15 — Terrain Provider Architecture & DEM Readiness — Implementation Report

Date: 2026-11-19. Repo: `PhanHoangQuocTu/danang-simulation`, branch `main`.
Local checkout head at start: `5e7eca6` (mirrors GitHub `main` `4c427d0d87c7063d5657eab0bccb54dd18b21e1a`).
**Status: implementation complete locally, NOT pushed. No commit was made in this
task and nothing was pushed — push authorization from the Project Owner is required
(see §2). Overall product verdict stays PARTIAL.**

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

- **No commit / no push.** Prompt §21: do not commit or push unless explicitly
  authorized by the Project Owner. The user has not authorized push for Phase 15.
  Work is in the working copy only; this report lists every changed file (§19).
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
Full detail: `docs/audit/phase-15/BASELINE_REPORT.md`.

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
77.83% / 67.3% / 63.03% / 79.64%. Detail: `docs/audit/phase-15/TEST_MATRIX.md`.

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
`browser-context-restore-1024x768.txt`):

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

Known issues: `docs/audit/phase-15/KNOWN_ISSUES.md`. Headlines:

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
