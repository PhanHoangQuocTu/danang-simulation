# Phase 17 — Baseline Report

**Date:** 2026-11-20. **HEAD at implementation time:** `986baab`
(`docs(audit): follow-up 2026-11-20 egm2008, sentinel-2, canary test`),
tree clean. **Toolchain:** Node 22.23.5 / pnpm 12.14.0 (portable
toolchain in `~/workspace/danang-simulation-work/tools/`).

## Baseline gates (before any Phase 17 edit)

Full test suite re-run at the start of this phase (2026-11-20 08:27 +07):

| Gate | Result |
| --- | --- |
| `pnpm test` | **55 files / 313 tests, all pass** |
| lint / format / type-check / build / build-storybook / audit | Passing at HEAD `986baab` per the 2026-11-20 follow-up record (55 files / 313 tests, coverage 78.87%/69.41%/64.07%/80.73%, build 14 pages, audit --prod 0 vulnerabilities); re-verified after the Phase 17 edits, see `PHASE_17_IMPLEMENTATION_REPORT.md` §13 |

## Phase 15/16 prerequisite audit (P17-01)

Verified from source before any Phase 17 edit:

| Prerequisite | Status | Evidence |
| --- | --- | --- |
| TerrainProvider contract (`src/engine/terrain/`) | Present, unchanged | Unified contract, one elevation owner |
| GridDemProvider + DEM pilot asset | Present | `src/worlds/danang/data/danang-dem-pilot.ts` (100x100, 30 m), `?terrain=dem` opt-in |
| Geospatial core (`src/engine/geospatial/core.ts`) | Present, reused | WGS84 geodetic/ECEF/ENU/world math; Phase 17 reuses it, no duplicate transform |
| EGM2008 module | Present | `src/engine/geospatial/egm2008.ts`, anchor N = -10.8043 m, decision "giữ orthometric" |
| Data registry | Present | `src/worlds/danang/data-sources.ts`; `osm-vector` was a CANDIDATE (ODbL-1.0, EPSG:4326) |
| F3 diagnostics (TER-01..TER-10) | Present | `src/modules/WorldExplorer/terrain-diagnostics.ts`, checks chip 35/35 at HEAD |
| Synthetic scene (Phases 1–10) | Present | `src/worlds/danang/scene.ts`: plaza, platforms, rocks, trees, bushes, grass, fixtures. There are **no synthetic buildings or roads** in the scene — nothing to hide or delete for GIS. The GIS layer is therefore purely additive by construction. |
| Overpass transport | Present but unusable here | `src/integrations/geodata/overpass.server.ts` (10 s timeout, 256 KB cap, max 100 elements); Overpass times out from this VM, so the OSM API map call is the acquisition route |

**Verdict: SUFFICIENT as architecture / PARTIAL as product** (same
standing as Phase 16): all contracts exist and are tested, but no real
GIS features existed before this phase, and geographic accuracy
certification (GCPs/RMSE) is still missing — see `KNOWN_ISSUES.md`.
