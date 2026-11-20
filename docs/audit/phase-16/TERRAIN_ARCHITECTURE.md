# Phase 16 — Terrain Architecture

## Phase 15 prerequisite audit (verified from source before Phase 16 work)

Verdict: **SUFFICIENT as architecture / PARTIAL as product.**

All claimed Phase 15 artifacts exist, are typed and tested — but the DEM path was **not wired into the production runtime**: no real DEM existed, `selectTerrainProvider` was never called outside tests, the scene mesh was hardcoded to synthetic dimensions, and the manifest bypassed the injected provider. That matches `docs/PHASE_STATUS.md` (“Phase 15 … implemented … PUSHED”; overall verdict stays **PARTIAL**).

Gaps found by reading (all addressed or explicitly deferred in Phase 16):

| Gap | Phase 16 disposition |
| --- | --- |
| `unsupported-crs` exists in the `ElevationSample` union but no provider ever returns it (dead status) | Unchanged — still dead; no provider in this phase needs it. Noted for Phase 17. |
| `GridDemProvider.spawnPosition` Y = 0, not sampled elevation | **Fixed.** Spawn is now the sampled elevation at the grid centre; if the centre cell is NoData it falls back to 0 and the diagnostics spawn check shows the mismatch. |
| `GridDemProvider.resolveHorizontalCollisions` is an identity no-op; `sampleSupportSurface` just delegates to terrain | **Documented, not hidden.** A DEM world has terrain-only collision: no platforms/rocks/trees exist there, so there is nothing to collide with. The scene omits synthetic colliders in DEM mode instead of reusing their coordinates. Re-placing colliders from DEM heights is Phase 17 work. |
| `createWorldRuntime` `dispose()` never called `terrain.dispose()` | **Fixed.** A runtime-owned DEM provider is disposed exactly once; the synthetic singleton is never disposed by a runtime. |
| `GAME_CONFIG.worldBoundaryRadius: 68` is a dead duplicate of `SYNTHETIC_BOUNDARY_RADIUS_METERS`, never read | Unchanged — still dead. Noted for a cleanup pass. |
| `src/worlds/danang/zones/manifest.ts` imports the synthetic singleton directly for rock Y placement | **Fixed at the scene level.** The manifest is not loaded in DEM mode; the manifest itself still imports the singleton (its only consumer is the synthetic scene path). |
| `selectTerrainProvider` only called from tests | **Fixed.** Called by `createWorldRuntime` in `dem-pilot` mode. |

## What Phase 16 added

### Ingestion and asset

- `src/worlds/danang/data/danang-dem-pilot.ts` (842 lines): the cropped 100×100 pilot as base64 little-endian Float32 (40,000 bytes) plus `DANANG_DEM_PILOT_METADATA` (datasetId `copernicus-dem-glo30-danang-pilot-v1`, sourceId `copernicus-dsm`, checksum, CRS EPSG:4326, datum `ORTHOMETRIC_EGM2008`, coverage ±1500 m, 100×100, 30 m, NoData −32767, capture `2015-12-31`, accuracy 4 m, licence, attribution, 3 processing-history entries, purpose `production`, `isGeographic: true`), geo bounds, measured stats and 7 checkpoints. Header documents source, SHA-256, that the COG is not in the repo, ENU reprojection, orthometric-kept datum, DSM-not-DTM, and measured stats. Exports `decodeBase64ToFloat32` (no Node-only APIs) and `danangDemPilotGridInput(): GridDemInput`.
- Raw COG stays out of the repo (`/tmp/dem16/`, 2.8 MB). The embedded pilot is 40 KB of elevations — the approved static-asset mechanism for this phase is “embed the cropped pilot in a TS module”; a full-tile or multi-tile production asset is too large for the repo and must go through a separate delivery decision (see `KNOWN_ISSUES.md`). No Git LFS introduced.

### Contract and validation changes

- `src/world-core/terrain/validation.ts`: orthometric heights are no longer rejected outright. `ORTHOMETRIC_EGM2008` is accepted for ingestion as a labelled pilot; the datum stays `ORTHOMETRIC_EGM2008` and `isProductionReady` stays false (still requires `WGS84_ELLIPSOID`). Production geographic now requires datum `WGS84_ELLIPSOID` **or** `ORTHOMETRIC_EGM2008` plus checksum/capture/accuracy/history.
- `src/engine/terrain/type.ts`: comment updated — world Y is ellipsoidal for WGS84 datasets; orthometric stays orthometric, never relabelled.
- `src/world-core/terrain/selection.ts`: comment updated — orthometric DEM accepted only as a labelled pilot, `isProductionReady` false, absolute ellipsoid alignment NOT VERIFIED.
- `src/world-core/registries/data-sources.ts`: `ingestionDenials` now supports the `dsm` category (other non-OSM kinds still denied).

### Mesh — one builder, no duplicated formula

- `src/worlds/danang/terrain-mesh.ts`: `buildTerrainMesh(scope, terrain, material)` builds the mesh from the active provider only.
  - Synthetic: size/segments stay Phase 1–10 (180 m / 128) with the original path/rock colouring.
  - Geographic DEM: size from provider coverage (3000 m), segments from raster dimensions (100×100 grid → 99×99 segments), hypsometric colouring (lowland green → rock with elevation, plus small noise tint) because no synthetic path exists on real terrain.
  - Vertical exaggeration 1.0: vertex Y = sampled elevation unchanged. Mesh centred on the coverage centre, `receiveShadow = true`, `computeVertexNormals()`.
- `src/worlds/danang/scene.ts` now calls `buildTerrainMesh` instead of hardcoding 180/128. Fog density follows the world: 0.0055 synthetic, 0.0006 DEM (a 3 km world would otherwise be fully fogged a few hundred metres out). Spawn plaza/ring sit at the provider spawn. Step stones, platforms, manifest rocks and trees are skipped in DEM mode (see the collision table above); lanterns, bushes, grass and the 3 interaction fixtures are kept and sample the active provider.

### Runtime — explicit opt-in, one elevation owner

- `src/worlds/danang/terrain-mode.ts`: `resolveTerrainMode(search)` — `'dem-pilot'` only for the exact `?terrain=dem` query; anything else (including a missing or misspelled value) is `'synthetic'`.
- `src/modules/WorldExplorer/runtime/world.ts`: `createWorldRuntime(bindings, { terrainMode })` selects the provider once (`selectTerrainProvider` for DEM, synthetic otherwise) and shares that single instance with scene, controller and camera. Camera far: 320 m synthetic, 6000 m DEM. Mini Map ortho half-extent: 72 m synthetic, 1500 m DEM (half the pilot span); map camera height 140 m synthetic, 1600 m DEM. `reset()` respawns at the active provider spawn. `dispose()` disposes a runtime-owned DEM provider once and restores the active provider to synthetic.
- `src/modules/WorldExplorer/hooks/useWorldExplorer.ts` passes `resolveTerrainMode(window.location.search)`.
- `src/modules/WorldExplorer/components/WorldHud.tsx` runs diagnostics on `getActiveTerrainProvider()` (was hardcoded to the synthetic provider), so F3 shows the world the player is actually standing on.

### Diagnostics and messages

- `src/modules/WorldExplorer/terrain-diagnostics.ts`: TER-09 (mode label) and TER-10 (spawn Y equals sampled elevation within 1e-6) added; suite is now 10 checks; TER-02 accepts `WGS84_ELLIPSOID` or `ORTHOMETRIC_EGM2008` for geographic data. Checks chip is 35/35 (9 system + 16 geo + 10 terrain).
- `src/messages/en|vi/worldExplorer.json`: `terrainDiag9` (“Terrain mode” / “Chế độ địa hình”) and `terrainDiag10` (“Spawn grounding” / “Spawn bám đất”).

## Design decisions recorded

1. **Synthetic stays the production default.** The DEM pilot is an explicit opt-in (`?terrain=dem`) until it is verified. Playable world dimensions are not silently changed: the default world is still 180 m.
2. **The pilot is 3 km, not 180 m.** A 30 m DEM cannot say anything meaningful inside a 180 m scene (6 cells across); the pilot bbox is justified from the dataset coverage in `DEM_SOURCE_RESEARCH.md`, not invented.
3. **DSM, not DTM.** Copernicus GLO-30 includes buildings and vegetation. The mesh is a surface model; do not present it as bare earth.
4. **No runtime GeoTIFF parsing.** Ingestion is offline (Python); the browser receives a validated Float32 grid. No new dependency was added.
5. **No new backend, database, microservice, GIS server or NestJS.** Reused Phase 12 geospatial core, Phase 13 governance and the Phase 15 contract throughout.
