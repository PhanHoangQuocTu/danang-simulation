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
- **Browser frame cost: measured on SwiftShader only — NOT_APPLICABLE as a product number.** The full 6-viewport re-QA of 2026-11-20 measured rAF 0.6–2.6 fps (software rendering); no GPU/Docker in this VM, so no 60 FPS claim is made.
- **Live weather observation: VERIFIED LIVE 2026-11-20.** Direct Open-Meteo returned HTTP 200 (26.5 °C) and the BFF `/api/weather` returned HTTP 200 in the live browser QA (26 °C drizzle, WMO #51) and in a direct probe (26.2 °C, WMO 51, humidity 81%). The shared-egress daily quota has reset since 2026-11-19; the 429 handling added then is unchanged.

## Performance risks noted for Phase 17

- A full-tile (3600×3600) mesh would be ~13 M vertices — not buildable as a single `PlaneGeometry`. Any larger DEM integration needs tiling / LOD / chunked meshes, not a bigger plane.
- The pilot's 30 m cells bilinearly interpolated at mesh vertices spaced 30.3 m apart is fine at this scale; a coarser mesh over a larger area would smooth real features.
- The DSM includes buildings/vegetation; a future DTM (e.g. FABDEM cross-check) would change the surface the character walks on.
