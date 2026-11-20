# Phase 16 — Known Issues

## Fixed in browser-QA follow-up (2026-11-20)

The parent-agent browser QA found 2 real defects after this report was written. Both are fixed in commit `f10d98c` (pushed 2026-11-20) and spot-verified in headless Chromium at 1024×768 in both modes (evidence: `evidence/browser-qa-fix.json`, `browser-synthetic-1024x768-fix-f3.png`, `browser-dem-1024x768-fix-f3.png`), then confirmed fixed at all 6 viewports in the full re-QA of 2026-11-20 (`docs/audit/verification-2026-11-20/VERIFICATION_REPORT.md`).

1. **F3 diagnostics mislabelled the provider in DEM mode (was FAIL).** `WorldHud.tsx` ran `runTerrainDiagnosticsSuite(getActiveTerrainProvider())` inside `useMemo(..., [])` — once at mount, when the active provider is still the synthetic default, never recomputed after the runtime switched to DEM. Fix: the suite is now keyed on the provider identity (`useMemo(..., [activeTerrainProvider])`). Verified: DEM TER-09 `REAL DEM (pilot — orthometric, ellipsoid alignment NOT VERIFIED) — copernicus-dem-glo30-danang-pilot-v1 @ 30 m`, TER-10 `Spawn Y 6.045524001121521 m equals sampled elevation 6.045524001121521`; synthetic TER-09/TER-10 unchanged; checks chip 35/35 and Terrain checks 10/10 in both modes. Regression test: `src/modules/WorldExplorer/__tests__/hud-terrain-mode.test.tsx` (renders the HUD, switches the active provider, asserts TER-09/TER-10 follow it).
2. **Mini Map “Span” label wrong in DEM mode (was FAIL, minor).** The label read `Span: 144 m` in DEM mode because `computeMiniMapVisibleSpanMeters` always used the synthetic half-extent (72 m); the map camera itself was correct (1500 m). Fix: the function now takes the half-extent as a parameter, and camera and label share `resolveMiniMapHalfExtentMeters(provider)` (72 m synthetic, 1500 m DEM). Verified: Span `3000 m` in DEM, `144 m` in synthetic, at zoom 1. Regression test: same `hud-terrain-mode.test.tsx` (span label follows the active provider) plus unit cases for the span function.

## Open in this phase

1. **Browser verification — done 2026-11-20 (was NOT VERIFIED at implementation time).** The parent agent ran the full 6-viewport × 2-mode QA (12/12 PASS, 0 console errors), found 2 real defects, both fixed; a full 6-viewport re-QA after the fix also passed 12/12 (see `docs/audit/verification-2026-11-20/VERIFICATION_REPORT.md`). The original "parent agent must run it" text below is kept as the pre-QA procedure. Start the standalone server with `.next/static` + `public` copied into `.next/standalone/` (the Phase 15 lesson — without the copy, all `/_next/static/...` subresources 404 and the world never initialises), then check all 6 viewports (1920×1080, 1366×768, 1024×768, 768×1024, 390×844, 844×390) in both default mode and `?terrain=dem`: world initialises, character grounded/moves/jumps on the real terrain, camera/Mini Map/HUD/weather/interaction/F3 work, 0 console errors, WebGL context loss/restore.
2. **Geographic accuracy certification NOT VERIFIED.** No independent checkpoints, GCPs or RMSE. Checkpoints in the asset are self-consistency against the same source tile. The published Copernicus accuracy (<4 m vertical, <6 m horizontal) is the publisher's claim, not a measurement made here.
3. **Absolute WGS84-ellipsoid alignment NOT VERIFIED.** No verified EGM2008→ellipsoid conversion; no offset invented. World Y = orthometric height for the pilot.
4. **FPS 60 / physical device / Docker / GPU NOT VERIFIED.** Standing blocker: no Docker, no GPU in this VM; SwiftShader only (FPS on SwiftShader is NOT_APPLICABLE).
5. **Live weather observation NOT VERIFIED.** Open-Meteo 429 daily limit on the shared egress IP (standing blocker).
6. **Standalone `127.0.0.1` redirect loop still FAIL.** Upstream Next.js #94745, fix PR #95917 unmerged, latest Next 16.4.6. Workaround: `HOSTNAME=localhost` or `0.0.0.0`. (Standing blocker from the 2026-11-19 verification.)
7. **DEM collision is terrain-only.** `GridDemProvider.resolveHorizontalCollisions` is an identity no-op and there are no platforms/rocks/trees in DEM mode. This is a documented design decision (nothing exists to collide with), not a bug — but it means the DEM world has no step-up platforms or tree/rock blockers. Re-placing colliders from DEM heights is Phase 17 work.
8. **Pilot is flat coastal terrain only.** Range 1.79–25.68 m; steep-slope handling untested (same tile reaches 1408.79 m inland). A mountain pilot is the natural follow-up.
9. **DSM, not DTM.** Copernicus GLO-30 includes buildings and vegetation. Do not present the mesh as bare earth. FABDEM (bare-earth, CC BY-NC-SA 4.0) is a cross-check candidate only, pending a licence decision.
10. **NoData value (−32767) NOT VERIFIED from the official page or file.** Secondary source only; the pilot tile has zero such pixels, so it is moot for the pilot.
11. **RasterPixelIsArea vs RasterPixelIsPoint.** File GeoKeys say Area; the dataspace page says DGED alignment is Point — a half-pixel (~15 m) interpretation difference, flagged for ingestion.
12. **Dead code carried over from Phase 15 (not fixed here):** `unsupported-crs` is never returned by any provider; `GAME_CONFIG.worldBoundaryRadius: 68` is a dead duplicate, never read. Noted for a cleanup pass.

## Deferred / Phase 17 dependencies

- Browser verification at 6 viewports (item 1) — must run before any claim that the DEM world works in the browser.
- Independent checkpoints / GCPs and an RMSE measurement for geographic certification.
- A verified geoid undulation value for Da Nang (or a documented decision to stay orthometric) before the DEM can be called production-ready.
- Mountain pilot (steep terrain) and, if approved, a larger-area DEM with tiling/LOD (a full 3600×3600 tile cannot be a single `PlaneGeometry`).
- Re-placing colliders (platforms/rocks/trees) from DEM heights; deciding the FABDEM cross-check and its licence implications.
- Production asset delivery decision for anything larger than the embedded 40 KB pilot (no Git LFS without approval).
- Coverage re-measurement (baseline coverage 77.83% / 67.3% / 63.03% / 79.64% is from Phase 15).

## Rollback strategy

- The change is committed as `f10d98c` on `main` (2026-11-20). To roll back, `git revert f10d98c` (or reset the branch to `9170689`); do NOT use `git checkout -- .` — that only discards uncommitted changes.
- At runtime, the DEM path is entirely opt-in: removing `?terrain=dem` (or any failure in DEM selection) leaves the synthetic production world untouched — the default path is byte-for-byte the Phase 15 behaviour. If a DEM provider fails to construct, `createWorldRuntime` throws instead of silently falling back, so a bad DEM can never masquerade as the synthetic world.
