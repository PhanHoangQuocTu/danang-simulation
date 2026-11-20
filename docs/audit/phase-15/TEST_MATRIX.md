# Phase 15 — Test Matrix

Date: 2026-11-19. Runner: Vitest, Node 22.23.5. Full suite: **47 files / 280 tests,
all passing** (baseline: 42 files / 242 tests). No existing test was weakened; no
timeout was increased. One existing test was updated to the new truthful total:
`hud-semantics.test.tsx` pins the diagnostics chip at `33/33` (was `25/25`; the 8
new terrain checks are now counted). Raw output: `evidence/test-after.txt`;
coverage: `evidence/test-coverage-after.txt` (77.83% stmts / 67.3% branches /
63.03% funcs / 79.64% lines).

## New tests (38 new tests, 5 new files)

| File | Coverage |
|---|---|
| `src/world-core/terrain/__tests__/validation.test.ts` | Metadata validation: valid synthetic + geographic metadata; rejects unknown datum, orthometric without verified geoid, unsupported CRS, inverted bounds, missing checksum/capture/accuracy for production geographic data, mismatched raster dimensions, unsupported units, excessive resources, invalid resolution; synthetic production data allowed with null checksum/capture/accuracy + processing history. |
| `src/world-core/terrain/__tests__/grid.test.ts` | Grid provider: valid sampling, bilinear (exact values + no interpolation across NoData neighbours), nearest, edge clamping, outside-coverage, NoData, invalid input, unsupported CRS/datum rejection, resource limits, disposal. |
| `src/world-core/terrain/__tests__/synthetic.test.ts` | Synthetic provider: formula preserved verbatim (origin = 0, known values at fixed coordinates), spawn, boundary 68 m, coverage ±90 m, support surface with platform colliders, collision resolution, disposal. |
| `src/world-core/terrain/__tests__/selection.test.ts` | Provider selection: synthetic default; DEM only from validated grid input; invalid input rejected; switching disposes the old provider; disposed provider sampling throws. |
| `src/modules/WorldExplorer/__tests__/terrain-diagnostics.test.ts` | Diagnostics suite: 8/8 pass for the synthetic production provider; TER-08 fails for a test-only DEM provider. |

## Updated tests

| File | Change |
|---|---|
| `src/engine/character/__tests__/controller.test.ts` | Stub environment now uses `syntheticTerrainProvider`; added a counting-stub test proving **one elevation evaluation per tick over 10 updates** (was up to 3×/tick). |
| `src/modules/WorldExplorer/__tests__/world.test.ts` | Import updated from `zones/synthetic` to `zones/synthetic-terrain`. |
| `src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx` | Checks chip expectation `25/25` → `33/33` (9 system + 16 geo + 8 terrain). |

## Regression

All 42 baseline test files still pass unchanged (except the two truthful updates
above). Phase 01–14 behaviour is covered by the existing suite; the full run is
green with no skips added.

## Browser verification (not unit tests — see `evidence/browser-*.json`)

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

## Not covered by tests (honest gaps)

- No end-to-end test builds a world mesh from a real DEM provider (no real DEM
  exists; scene dimensions remain synthetic-specific — see `KNOWN_ISSUES.md`).
- No physical-device, Docker, or long-session GPU profiling (not available in this VM).
- No screen-reader / 200% zoom verification in this phase.
