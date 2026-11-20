# Phase 17 — Known Issues

**Status at implementation:** 2026-11-20, uncommitted, HEAD `986baab`.

## Open / NOT VERIFIED

1. **Browser QA (P17-19) PARTIAL — update 2026-11-20 (parent verification).** The full 12-combo QA ran (`BROWSER_QA_REPORT.md`): all combos operationally PASS, GIS checks 8/8, roads/buildings visible, weather LIVE. Two sub-items remain unverified: the jump arc on GIS terrain (both probes failed to capture an airborne phase — bare Space does nothing unless the Jump button is focused) and WebGL context-loss restore (lose/restore return ok, 2 canvases persist, but the Checks HUD did not reappear within 30 s). Jump code is unchanged from Phase 16, where the arc was captured.
2. **Geographic accuracy NOT VERIFIED.** OSM positional accuracy is
   unknown; no surveyed GCPs, no independent checkpoints, no RMSE.
   The georeferencing checks are math-consistency (Python vs TS),
   not ground truth.
3. **FPS 60 / physical device / Docker / GPU NOT VERIFIED.** Standing
   blockers from Phases 15–16. The geometry counts in
   `PERFORMANCE_REPORT.md` are construction-time, not frame rate.
4. **No authoritative Vietnamese dataset.** MONRE/DONRE have no public
   download route (see `GIS_SOURCE_RESEARCH.md`). A formal data
   request is the only route to authoritative geometry.

## Documented limitations (by design, not defects)

5. **All road widths are estimated.** 0 of 1,830 runs have a measured
   width; every width is a class default. Widths must never be quoted
   as measurements.
6. **410 of 418 buildings are footprint-only.** Only 1 height is
   known and 7 are levels-derived estimates. The pilot city is
   therefore mostly flat footprints — honest, but visually sparse.
7. **Bridge/tunnel/oneway are stored, not rendered as behaviour.**
   Bridge decks are flat ribbons at terrain height; tunnels are flat
   ribbons (no cut-through); oneway does not affect movement. The
   flags exist in the data for a future phase.
8. **Roofs are flat.** `roof:shape` is recorded in the schema but no
   building in the pilot carries the tag, and the extruder always
   builds a flat roof.
9. **Junctions cover coincident endpoints only.** A road ending
   mid-segment of another road (a T-junction with no shared node) gets
   no disc; the crossing ribbons cover it visually, but the guarantee
   is the coincident-endpoint rule only.
10. **Asset is 209,657 bytes, ~5% over the < 200 KB target.** The
    payload is 192,783 bytes; the rest is the TS provenance header and
    formatting. No data was dropped to hit the number.
11. **`canRender` still denies everything.** The registry's render
    gate returns `scene-integration-not-implemented` for all sources
    (Phase 13). The GIS layer is integrated in the scene, but the
    registry gate was not changed in this phase — it is a separate
    governance decision.
12. **Standalone 127.0.0.1 redirect loop still FAIL** (upstream Next.js
    #94745, standing from Phases 15–16). Use `localhost` / `0.0.0.0`.
    This affects browser QA setup, not the GIS code.

## Fixed during this phase

- **Decimetre-collapse duplicates:** the first ingest produced road
  centrelines with consecutive duplicate points after 0.1 m rounding
  (distinct metre vertices collapsing to one cell). Fixed by
  quantizing-then-deduping in the ingest script; the decoder test
  now passes on the regenerated asset.
- **Nested-ternary lint errors (3):** fixed in `decode.ts` and
  `gis-diagnostics.ts` (helper + if/else), not suppressed.
- **Stale test expectations (4 files):** checks chip 35/35 → 43/43,
  registry `canIngest`/permittedUses, overpass denial source,
  no-evidence escalation source — all moved to the new approved state,
  none weakened.
