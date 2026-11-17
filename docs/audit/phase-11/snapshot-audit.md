# Phase 11 historical snapshot comparison

## Scope and evidence

This is a static source audit. No source, configuration, dependency, or historical file was changed. Browser execution and repository checks are owned by the main audit and are not claimed here.

The source authority order is current runtime, current project configuration, historical Phase 10 snapshot, and historical handover. The Phase 11 directive explicitly sets this order at `docs/prompts/PHASE_11.md:77–87` and acknowledges an existing architecture may differ at lines 129–155.

Full-read coverage:

- `history/code/da_nang_3d_open_world_simulation_phase_10.tsx`: all 8,514 lines, read in contiguous numbered chunks. Coverage was 1–700 (with 538–700 repeated to recover a truncated combined tool response), 701–1300, 1301–2150, 2151–2900, 2901–3650, 3651–4450, 4451–5200, 5201–5950, 5951–6700, 6701–7450, 7451–8150, and 8151–8514. One streamed read completed through a follow-up tool poll.
- `history/conversation/da_nang_3d_open_world_master_handover_context_transfer_phase_1_to_10.md`: all 150 lines. This was the only Markdown file listed in that directory during the audit.
- `docs/prompts/PHASE_11.md`: all 1,599 lines, including an explicit UTF-8 reread in three chunks after the initial combined response was truncated.

CodeGraph was queried before current indexed code exploration. Its returned source was reused; direct reads only filled explicitly omitted portions of `runtime/world.ts` and `worlds/danang/scene.ts`. The full current scene composition, current controller, current input binding, current registry, current map projection, and all nine current diagnostics were read. This does not assert an independent full read of every current repository file.

## Architecture and historical differences

| Area | Historical implementation | Current implementation and implication |
|---|---|---|
| Entry and ownership | A single exported `App` owns React state, Three.js scene, inputs, weather, and animation (`snapshot:4821–7757`). | `WorldExplorer` renders a client boundary (`src/modules/WorldExplorer/index.tsx:5–25`); `useWorldExplorer` owns UI orchestration (`hooks/useWorldExplorer.ts:16–177`); `createWorldRuntime` composes renderer, world, injected controller, and loop (`runtime/world.ts:86–199`). The handover's React 18/single-file requirement describes history, not the active architecture. |
| Physics constants | Walk 4.5, run 8.6, gravity -25, jump 9.8, radius 0.38, delta limit 0.05 (`snapshot:814–878`). | All physics, camera, joystick, map, and interaction constants remain at `src/engine/core/const.ts:2–66`. |
| Movement equations | Camera-relative movement, diagonal normalization, exponential acceleration, jump/gravity, horizontal collision, radial boundary, support, and six animation transitions (`snapshot:7285–7450`). | Equivalent equations are extracted into `src/engine/character/controller.ts:25–155`; world queries are injected at `runtime/world.ts:138–145`. Invalid or nonpositive delta is rejected (`controller.ts:31–32`), rather than forced to a minimum of 0.001 seconds (`snapshot:6825–6828`). |
| Terrain and placements | Mathematical 180 × 180 m terrain; radius 68; 5 platforms, 8 rocks, 18 trees, 48 shrubs, and a target of 2,600 grass blades (`snapshot:2375–2424, 5946–6420`). | Synthetic elevation and collider definitions remain (`worlds/danang/zones/synthetic.ts:3–109`); scene retains terrain, plaza, path, lanterns, platforms, vegetation, fixtures, and rig (`worlds/danang/scene.ts:222–714`). Rocks now enter through a catalog and prefab manifest (`scene.ts:414–417`). These remain synthetic local meters. |
| Grass count | Requested 2,600; placement loop may skip samples and assigns actual accepted count (`snapshot:6373–6419`). | Same bounded random placement and accepted `gIdx` count (`scene.ts:629–673`). A literal 2,600 rendered blades must be measured rather than inferred from the requested count. |
| Input aliases and focus | Boolean flags shared by WASD/arrows; keydown target guards; blur/visibility clear some actions (`snapshot:5384–5557`). Dialog existence does not globally block the historical controller. | A pressed-key set preserves overlapping aliases; focusin releases inputs; `blocked()` guards keyboard, camera, and wheel (`engine/controls/events.ts:20–213`). Dialog state blocks the runtime and releases controls (`useWorldExplorer.ts:171–174`, `runtime/world.ts:510–517`). |
| Camera accessibility | Mouse/pointer lock, touch orbit and pinch (`snapshot:6575–6724`). | Same interaction paths plus I/J/K/L camera rotation and PageUp/PageDown zoom (`events.ts:78–90`). Fullscreen failures are represented (`useWorldExplorer.ts:269–278`); historical fullscreen rejections were swallowed (`snapshot:5210–5217`). |
| Touch lifecycle | Joystick captures a pointer; sprint latch uses `onDoubleClick`; action buttons do not capture pointers (`snapshot:5634–5680, 8328–8389`). | Independent joystick/action pointer identities, capture, and a 320 ms two-tap latch (`useWorldExplorer.ts:279–379`). These are intentional implementation differences requiring real-device verification. |
| Interaction definitions | Three inspect/information/activate fixtures and their X/Z, distances, colors (`snapshot:1159–1214`). | The definitions remain at `worlds/danang/zones/fixtures.ts:2–57`. Scene anchors are elevated to terrain + 1.2 m in both versions (`snapshot:6363–6367`; `scene.ts:619–623`). Thus eligibility uses 3D distance to an elevated anchor, not purely the listed ground-plane distance. |
| Target selection and execution | Center ray, cone fallback 0.94, max detection 12.5 m, 50 ms cadence; execution trusts the last cached eligible target (`snapshot:4975–5035, 7518–7627`). | `runtime/world.ts:201–250` retains targeting and checks object visibility in cone fallback; `interact()` reselects immediately before execution (`539–551`). A cooldown fallback discrepancy is recorded below. |
| Mini map | One renderer; isolated top-down view; hidden sky/rain/character; viewport/scissor saved and restored; marker uses Y=0 (`snapshot:6428–6569, 7632–7713`). | Same design split between `runtime/world.ts:251–282,352–392`, `engine/renderer/webgl.ts:34–58`, and `engine/spatial/minimap.ts:24–92`. Current capture failure remains `unavailable`; history immediately wrote `ready` after calling a capture that could fail (`snapshot:6545–6550,7662–7668`). |
| Rendering and lifetime | PCFSoftShadowMap, scene traversal disposal, no loop pause on context loss (`snapshot:5717–5718,5729–5735,7718–7757`). | PCFShadowMap (`engine/renderer/webgl.ts:13`), owned resources (`engine/core/resources.ts:6–29`), explicit shadow ownership (`scene.ts:218`), and idempotent renderer cleanup with deferred context release (`webgl.ts:69–89`). Runtime pauses on hidden page, pagehide, context loss, or failure (`runtime/world.ts:461–505`). Context restoration is only statically inspected here. |
| Clock and solar | One 1 Hz updater feeds UI and renderer (`snapshot:5281–5317`). | UI clock updates at 1 Hz (`useWorldExplorer.ts:178–190`); runtime independently computes solar at 1 Hz (`runtime/world.ts:299–302`). Same helper, separate schedules; they may be sampled at different instants. |
| Weather trust | Browser requests Open-Meteo directly; permissive sanitizer inserts numerical fallbacks (`snapshot:1696–1866`). | Browser requests the fixed BFF and computes freshness on receipt (`useWorldExplorer.ts:191–245`). Do not identify the retained legacy diagnostic normalizer as the live trust boundary. Current provider validation requires its own audit. |
| Diagnostics presentation | Every row renders a green check labelled Passed regardless of its result (`snapshot:8132–8141`). | Current row color and text depend on `check.passed` (`components/WorldHud.tsx:499–509`). The summary remains logic diagnostics, not full regression coverage. |
| Initial performance values | Historical state begins with 60 FPS and 16.6/18 ms before measurement (`snapshot:5058–5068,5177–5179`). | Current runtime begins with zero performance samples (`runtime/world.ts:44–55`), then publishes measured frame samples at HUD cadence (`393–448`). Historical initial values are not valid audit measurements. |

## Adequacy of all nine diagnostics

The current implementation is `src/modules/WorldExplorer/diagnostics.ts:12–228`; the historical implementation is `snapshot:2137–2370`. All results are computed predicates, not unconditional `passed: true`. The assertions are nevertheless narrow. No diagnostic creates a WebGL renderer or drives a browser event.

| Diagnostic | Actual assertion in current source | What it does not establish |
|---|---|---|
| DIAG-01, lines 15–24 | One UTC instant becomes 08:30:00 GMT+7. | Midnight/date rollover, clock update timing, tab resume, locale rendering. |
| DIAG-02, lines 26–41 | June noon altitude >70°, midnight <-30°, NOON/NIGHT labels. | Independent ephemeris accuracy, azimuth sign, all six phase boundaries, rendered sun/shadows. Broad inequalities permit many inaccurate implementations. |
| DIAG-03, lines 43–57 | Codes 0, 95, and 999; storm lightning flag; historical unknown fallback. | Entire WMO table, strict live rejection of unknown codes, actual rain/cloud/lighting effects. |
| DIAG-04, lines 59–93 | One malformed payload is sanitized; humidity/cloud bounds, wrapped wind direction, finite apparent temperature. | Strict live schema validation, unit/timestamp checks, HTTP failures, timeout, retry, stale observations, cancellation. It intentionally accepts/coerces malformed input through the historical helper. |
| DIAG-05, lines 95–109 | Deadzone, saturated upward input, non-finite input safety. | DOM pointer capture/release, diagonal analog behavior, device detection, simultaneous camera and joystick, sprint/jump. |
| DIAG-06, lines 111–128 | Two arrays have five unique IDs; desktop contains W/D; touch entries have touch type. | Actual control-guide language/copy, adaptive switching, HUD stability, rendered layout, binding correctness. |
| DIAG-07, lines 130–149 | Zoom clamp/default/NaN behavior; spans 144 and 72 m. | Orthographic camera, capture, zoom button wiring, clear map render, main-pass state restoration. |
| DIAG-08, lines 151–178 | Analytic projection examples, heading, edge clamp, follow center, finite fallback. | The optional real-camera matrix branch, DOM marker updates, all headings, image/marker synchronization during camera pan. |
| DIAG-09, lines 180–223 | Isolated registry, near/far status, caller-supplied occlusion boolean, one material highlight/restore, one activation, unregister. | Real raycasting/blocker list, cooldown, two-toggle OFF restoration, disabling, visibility, material arrays, UI/dialog behavior, all fixtures, scene cleanup. |

DIAG-09 uses an isolated group, mesh, geometry, and material; current code disposes geometry/material at lines 225–226. It does not mutate the live scene registry. Historical diagnostics omitted this disposal. These fixtures are pre-existing test inputs, not observed weather. This audit added no mock data or runtime test inputs.

Existing supplementary tests are useful but separate evidence: `phase-regression.test.ts:19–74` compares extracted WMO mappings, joystick, analytic map projection, and seasonal clock/solar output against the historical module; `engine/character/__tests__/controller.test.ts:47–86` covers flat-world walking/sprint/diagonal normalization, jump/landing, and delta clamp. Test source was inspected; this document claims no execution result.

## Findings for the issue register

### SNAP-01 — Occlusion omits solid world objects

- **Severity:** P2.
- **Category:** Bug / inherited incomplete interaction behavior.
- **Affected phase:** 10.
- **File / symbol / line range:** `src/worlds/danang/scene.ts`, `createDaNangScene`, 534–624 and return at 712; `src/modules/WorldExplorer/runtime/world.ts`, `selectTarget`, 225–238. Historical references: snapshot 6284, 7563–7586.
- **Current behavior:** The occlusion list contains only `terrainMesh`. Platforms, rocks, tree trunks, and other fixtures are not included. The occlusion ray cannot report these objects as blockers.
- **Expected behavior:** Objects intended to block interaction should prevent target eligibility when between camera and target, as required by the Phase 11 interaction checklist at lines 697–707.
- **Reproduction steps:** Align the camera and a fixture with an intervening solid world object; remain within the fixture's player-distance threshold; attempt interaction. The missing raycast coverage is statically confirmed; a visible through-object reproduction is NOT VERIFIED in this sub-audit.
- **Root cause:** Scene assembly creates a terrain-only blocker array and returns it unchanged.
- **Impact:** The feature advertised as interaction occlusion is partial. DIAG-09 cannot catch this because it directly supplies the occlusion boolean.
- **Recommended fix:** In an explicitly approved remediation, define which meshes block interaction and register them consistently. Exclude the selected fixture or otherwise avoid self-occlusion.
- **Proposed target phase:** Approved Phase 11 remediation or before relying on Phase 12 world-object interactions.
- **Verification method:** Real-scene raycast tests with platform, rock, tree, and other-fixture blockers; browser interaction tests at valid/invalid distances.

### SNAP-02 — Interaction cooldown falls through to environment toggle

- **Severity:** P2.
- **Category:** Bug / behavior difference from historical Phase 10.
- **Affected phase:** 10 and HUD environment panel behavior.
- **File / symbol / line range:** `src/modules/WorldExplorer/runtime/world.ts`, returned `interact`, 539–551; `src/modules/WorldExplorer/hooks/useWorldExplorer.ts`, `interact`, 88–96. Historical references: snapshot 4975–4985, 5473–5484.
- **Current behavior:** `runtime.interact()` returns `null` both when no target is eligible and when an eligible target is within the 320 ms cooldown. The UI treats either result as an instruction to toggle the environment panel.
- **Expected behavior:** An eligible interaction suppressed by cooldown should be ignored without changing another panel. Historically, eligible E dispatch entered the execution callback, whose cooldown guard returned without toggling Env. Shift+E should remain the explicit environment command.
- **Reproduction steps:** Face an eligible activation beacon; press and release E twice within 320 ms. Use distinct key presses, not an event with `repeat=true`. The second attempt reaches the cooldown branch and toggles Env. Browser reproduction is NOT VERIFIED in this sub-audit.
- **Root cause:** A single nullable return value conflates no eligible target and suppressed execution.
- **Impact:** Rapid valid interaction attempts unexpectedly alter the HUD. A stale prompt click may also take the fallback path after eligibility changes.
- **Recommended fix:** In an approved remediation, return an explicit execution outcome or separate no-target fallback from cooldown suppression.
- **Proposed target phase:** Approved Phase 11 remediation, before declaring exact Phase 10 input parity.
- **Verification method:** Regression test distinct E presses inside/outside cooldown; verify Env state stays unchanged for suppressed eligible attempts and Shift+E still toggles it.

### SNAP-03 — Map image and marker can use different camera samples

- **Severity:** P2 pending runtime impact assessment.
- **Category:** Technical debt / inherited synchronization risk; visible defect NOT VERIFIED.
- **Affected phase:** 9.
- **File / symbol / line range:** `src/modules/WorldExplorer/runtime/world.ts`, frame update, 352–391. Historical references: snapshot 7632–7710.
- **Current behavior:** The map center and camera matrix move every frame; map imagery is captured at approximately 50 ms cadence in follow mode, or 2,500 ms in overview unless a single-frame center displacement exceeds 0.04 m. The marker is projected every frame through the latest matrix. The raster image still reflects the most recent capture matrix.
- **Expected behavior:** Player-marker position should correspond to the camera that produced the displayed map image, or the image should be transformed in step with the latest camera.
- **Reproduction steps:** Move in Follow at high zoom and switch back to Overview; inspect marker alignment against fixed geometry during the camera's settling interval. Runtime visibility and severity are NOT VERIFIED here.
- **Root cause:** Projection and capture share the mutable current camera but run at different cadences without retaining the last captured matrix.
- **Impact:** Temporary image/marker offset is possible, especially during transition settling. DIAG-08 checks analytical coordinates and cannot establish displayed alignment.
- **Recommended fix:** Measure first. If visible, preserve the last captured projection for marker placement or synchronize image and camera transitions in an approved remediation.
- **Proposed target phase:** Before changing map coordinate contracts in Phase 12.
- **Verification method:** Frame-by-frame browser capture with a known static landmark and an actual player marker during follow/overview transitions at zoom 2.8.

### SNAP-04 — Strict zero-allocation language exceeds implementation guarantees

- **Severity:** P3.
- **Category:** Technical debt / documentation accuracy.
- **Affected phase:** 4 and 10.
- **File / symbol / line range:** `src/engine/interactions/registry.ts`, `getAll/getCandidateMeshes`, 83–97; `src/modules/WorldExplorer/runtime/world.ts`, `selectTarget/captureMap/frame`, 225–246, 251–261, 393–445. Historical references: snapshot 2476, 2491, 7518–7525.
- **Current behavior:** Reusable vectors, collision output, and projection output avoid substantial frame allocations, but interaction queries allocate candidate arrays/target objects at raycast cadence; map captures allocate visibility arrays; HUD sampling copies/sorts a typed array and produces snapshots. The handover's universal zero-allocation wording is not literal in either implementation.
- **Expected behavior:** Performance claims should identify allocation cadence and measured cost rather than asserting universal zero allocation.
- **Reproduction steps:** Inspect the named allocation sites and profile allocation rate during Follow and interactions. Runtime cost is NOT AVAILABLE in this sub-audit.
- **Root cause:** Optimized hot-path math coexists with bounded allocations in less frequent systems.
- **Impact:** No measured performance regression is established. The risk is overstating guarantees and missing allocation-sensitive behavior on constrained devices.
- **Recommended fix:** Record measured allocation/GC costs before proposing optimization; qualify the documentation claim.
- **Proposed target phase:** Audit documentation now; optimize only with later approval and measurements.
- **Verification method:** Browser allocation/GC profile correlated with idle, Follow, movement, and interaction frame-time samples.

## Remaining validation boundaries

No P0 or P1 is established by this static comparison. This is not proof that none exists. Exact visual equivalence is not claimed: the active app has different UI composition, translations, renderer shadow-map selection, and ownership/lifecycle behavior. Terrain tessellation and placements are synthetic and not surveyed city geometry. The fixed Da Nang latitude/longitude configure environmental references, not a world-to-GPS transform.

The following still require main-audit runtime evidence: all six animation states, actual platform/rock/tree collisions, boundary and terrain following, pointer lock, wheel/pinch limits, touch multi-pointer behavior, held-action release, all three fixture interactions, E/Shift+E distinction and cooldown, map marker/image agreement, main/map pass isolation, context loss/restoration, repeated mount/unmount resource growth, console cleanliness, and real performance scenarios. A 9/9 diagnostic result alone cannot satisfy any of these runtime gates.
