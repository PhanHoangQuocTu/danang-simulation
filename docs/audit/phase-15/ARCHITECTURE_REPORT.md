# Phase 15 — Architecture Report: Terrain Provider & DEM Readiness

Date: 2026-11-19. Scope: Phase 15 only. No Phase 16–20 work. No new backend,
no new GIS server/DB/NestJS/proxy/microservice, no new dependencies (Zod and the
Phase 13 registry infrastructure were reused).

## Placement decisions (boundaries)

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

## Contract (`src/engine/terrain/type.ts`, limits in `src/engine/terrain/const.ts`)

`TerrainProvider`: `metadata`, `coverage`, `boundaryRadiusMeters`, `spawnPosition`,
`sampleElevation(x, z)`, `sampleSupportSurface(x, z)`, `resolveHorizontalCollisions(...)`,
`dispose()`. `ElevationSample` is a discriminated union — `ok` / `outside-coverage` /
`no-data` / `invalid-input` / `unsupported-crs` — with `elevationMeters: number | null`
and a `reason` string. A provider never returns 0 as a silent fallback and never
manufactures elevation. `requireElevation()` throws where elevation must exist
(scene build). `describeTerrainProvider()` renders the diagnostics summary.

## Metadata & validation (`const.ts`, `validation.ts`)

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

## Grid DEM provider (`grid.ts`)

`GridDemProvider`: regular grid, row 0 = north edge (min Z), rows increase toward +Z
(south), columns east (+X). Bilinear interpolation (refuses to interpolate across any
NoData neighbour) and nearest-neighbour sampling. Edge clamping only at the coverage
edge; no silent clamping of missing data. Accepts only validated geographic metadata
with `WGS84_ELLIPSOID` datum; elevations are already transformed to world meters by
preprocessing — no CRS conversion at sample time. Resource limits enforced at
construction. `dispose()` marks the provider disposed; sampling afterwards throws.

## Synthetic provider (`src/worlds/danang/zones/synthetic-terrain.ts`)

`SyntheticTerrainProvider` + singleton `syntheticTerrainProvider`. The Phase 1–10
formula is preserved verbatim (same constants, same `smoothstep` shape). Constants
now named: `SYNTHETIC_TERRAIN_SIZE_METERS = 180`, `SYNTHETIC_TERRAIN_SEGMENTS = 128`,
`SYNTHETIC_BOUNDARY_RADIUS_METERS = 68`, coverage ±90 m. Collider arrays moved here:
`PLATFORM_COLLIDERS` (5), `ROCK_COLLIDERS` (8), `TREE_COLLIDERS` (18). The provider
is the production default and stays the default until a real dataset passes all
approval/verification. Its metadata declares `synthetic` provenance, ellipsoidal
datum, meters, and `isTestOnly: false` with an explicit "not surveyed geography" note.

## Selection & lifecycle (`selection.ts`)

`selectTerrainProvider()`: synthetic default; a DEM provider is constructed only from
validated grid input (`validateTerrainDatasetMetadata` + `GridDemProvider`).
Switching means constructing a new provider and disposing the old one — no stale
references, no shared mutable state. Providers reuse a single internal collision-result
object when no output object is supplied (callers must consume immediately, not
retain); `ALL_CYLINDERS` is module-level, not rebuilt per call.

## Consumer integration (one elevation owner)

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

## Diagnostics

`runTerrainDiagnosticsSuite()` (TER-01..08, same style as the geo suite): provider active,
CRS/datum, spawn elevation, boundary in coverage, outside coverage rejected, invalid
input rejected, support surface, production provider. Wired into `WorldHud.tsx` checks
count (now 33 = 9 system + 16 geo + 8 terrain) and a details block mirroring the geo
diagnostics. New translation keys `terrainDiagnostics`, `terrainDiag1`–`terrainDiag8`
in both `en` and `vi` `worldExplorer.json`. TEST-ONLY providers are never presented as
approved production terrain (TER-08 fails for them by design).

## What Phase 15 deliberately does NOT do

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
