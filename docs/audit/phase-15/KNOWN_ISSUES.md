# Phase 15 — Known Issues

Date: 2026-11-19. Status of the overall product remains **PARTIAL** (see
`PHASE_15_IMPLEMENTATION_REPORT.md` acceptance matrix).

## Phase 15 limitations (introduced or confirmed by this phase)

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

## Pre-existing issues NOT resolved by Phase 15 (carried over)

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

## Risks

- The internal collision-result object reuse (no-allocation design) requires
  callers to consume the result immediately and not retain it. This is documented
  on the interface; a future caller retaining it would read stale values.
- `selectTerrainProvider` disposal is deterministic, but no UI exists yet to switch
  providers at runtime; provider switching is a code-level operation until a later
  phase adds an approved flow.
