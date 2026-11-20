# Phase 16 — Performance Report

## What was measured

- **Gates (Node 22.23.5 / pnpm 12.14.0):** lint, format:check, type-check, test (53 files / 302 tests after the browser-QA follow-up), build (14 pages), build-storybook (0 PLUGIN_TIMINGS), `pnpm audit --prod` (0 vulnerabilities) — all exit 0. Full logs in `evidence/`.
- **Test suite time:** full `pnpm test` completed in the final gate run (see `evidence/test.log`).
- **Asset size:** the embedded pilot is 40,000 bytes of Float32 (53,336 base64 chars) for 10,000 samples — negligible against the bundle. The raw 2.8 MB COG stays outside the repo.
- **Mesh size:** DEM mesh is 100×100 = 10,000 vertices / 99×99 segments, versus 129×129 = 16,641 vertices for the synthetic mesh — smaller than the existing synthetic mesh.
- **Character controller:** still 1 elevation evaluation per tick (counting-stub test from Phase 15 still passes); the DEM provider adds no per-tick allocation beyond the returned sample object.

## What was NOT measured (honest status)

- **FPS 60: NOT VERIFIED / NOT_APPLICABLE on SwiftShader.** This VM has no GPU and no Docker; headless 3D runs on SwiftShader software rendering only. Phase 15 measured 0.79 FPS over 20 s on SwiftShader — that number describes the software renderer, not the product. No FPS figure is claimed for Phase 16.
- **Physical device / Docker / GPU long-term profiling: NOT VERIFIED.** Same standing blocker as Phases 14–15: no Docker (`docker: command not found`), no `/dev/dri`, no `nvidia-smi` in this VM.
- **Browser frame cost: NOT VERIFIED.** No live-browser run was performed in this session (see `KNOWN_ISSUES.md`); the 6-viewport browser verification is pending with the parent agent, including the frame-cost observation that would let the performance criterion be judged.
- **Live weather observation: NOT VERIFIED.** Open-Meteo 429 daily limit on the shared egress IP (standing blocker; the BFF 429 handling from the 2026-11-19 verification fix is unchanged).

## Performance risks noted for Phase 17

- A full-tile (3600×3600) mesh would be ~13 M vertices — not buildable as a single `PlaneGeometry`. Any larger DEM integration needs tiling / LOD / chunked meshes, not a bigger plane.
- The pilot's 30 m cells bilinearly interpolated at mesh vertices spaced 30.3 m apart is fine at this scale; a coarser mesh over a larger area would smooth real features.
- The DSM includes buildings/vegetation; a future DTM (e.g. FABDEM cross-check) would change the surface the character walks on.
