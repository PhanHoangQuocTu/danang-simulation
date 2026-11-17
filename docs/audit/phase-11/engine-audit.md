# Phase 11 engine, runtime, and resource audit

Audit scope: active `src/engine`, `src/modules/WorldExplorer/runtime/world.ts`, `src/world-core`, `src/world-assets`, their composition in `src/worlds/danang/scene.ts`, and associated tests. Static review only. Browser execution and check results belong to the main audit. No runtime behavior is marked PASS here.

## Architecture inventory

| Owner | Responsibility | Evidence |
| --- | --- | --- |
| `useWorldExplorer` | React lifecycle, runtime generation, HUD snapshots, weather reference, modal blocking | `src/modules/WorldExplorer/hooks/useWorldExplorer.ts:132-177` |
| `createWorldRuntime` | Browser composition, controller/environment/cameras, one scheduler, minimap capture, target selection, telemetry | `src/modules/WorldExplorer/runtime/world.ts:86-568` |
| `EngineRuntime` | Injected RAF scheduler, idempotent start/stop, first-frame delta zero, delta clamp, terminal update failure | `src/engine/core/runtime.ts:12-80` |
| `ResourceScope` | Explicit owned disposables, reverse teardown, error aggregation, duplicate ownership deduplication | `src/engine/core/resources.ts:6-29` |
| `createWebGlRenderer` | Single WebGL renderer adapter, DPR cap, overview pass, deferred context release | `src/engine/renderer/webgl.ts:8-92` |
| `createCharacterController` | Camera-relative movement, acceleration, jump/gravity, injected collisions/support, animation state | `src/engine/character/controller.ts:15-162` |
| `bindWorldInput` | Keyboard ownership, pointer identities, camera orbit/zoom, focus/blur release | `src/engine/controls/events.ts:8-214` |
| `InteractableRegistry` | Fixture metadata, eligibility, activation/count state, material highlight | `src/engine/interactions/registry.ts:4-182` |
| `PrefabRegistry` | Validated manifest creation, reverse instance teardown, failed-zone rollback | `src/world-core/registries/prefabs.ts:10-53` |
| `createSyntheticRockCatalog` | Shared geometry/material ownership; instances borrow and only detach | `src/world-assets/catalog/synthetic-rock.ts:6-43` |
| `createDaNangScene` | City-specific synthetic scene and owned rendering assets | `src/worlds/danang/scene.ts:16-714` |

Generic engine code imports Three.js and engine types/configuration, while city terrain/collision callbacks are injected into the controller. React and city composition remain outside generic engine ownership. The manifest registry is framework-independent. The active composition is modular; the archived single-file `App` is not this runtime's owner.

## Lifecycle and ownership evidence

- `EngineRuntime.start()` guards duplicate starts; `stop()` cancels the outstanding handle and clears timing. Updates catch errors and stop scheduling. Disposing systems continues after individual system cleanup failures (`runtime.ts:29-79`).
- World pause combines document visibility, pagehide/pageshow, context loss, and terminal runtime failure. Pause releases input; resume resets first-frame timing (`world.ts:461-503`). Modal blocking releases input and stops player velocity while atmosphere/rendering continue (`world.ts:510-517`).
- World teardown removes its registered listeners and observer, then disposes runtime systems. Scene registry clears before `ResourceScope.dispose()` (`world.ts:450-453,553-565`). React effect cleanup invalidates the generation before disposal (`useWorldExplorer.ts:155-165`).
- Scope owns renderer before scene assets, so reverse teardown releases scene assets before renderer. Scope owns textures, geometry, materials, directional-light shadow, and the grass `InstancedMesh` before scene attachment (`scene.ts:182-195,205-219,265-278,638-674`).
- Rocks have one catalog-owned geometry/material; zone handles detach meshes without disposing shared assets. Zone handle is registered after catalog, so zone disposal precedes catalog disposal (`scene.ts:414-417`; `synthetic-rock.ts:14-40`). Borrowed stone texture is owned by outer scene scope.
- Renderer disposal resets Three.js state, disposes renderer caches, and releases context in a microtask only when that canvas has no replacement renderer. This explicitly accounts for synchronous Strict Mode reuse (`webgl.ts:69-87`). Browser-level confirmation remains NOT VERIFIED.

## Renderer state restoration and context limits

Overview capture saves render target, viewport, scissor, and scissor-test state, then restores them in `finally` (`webgl.ts:34-58`). Scene-side overview capture independently saves/restores fog, hidden-object visibility, ambient intensity, and hemisphere intensity in `finally` (`world.ts:251-281`). This prevents an overview exception from leaving the main view in map mode. Overview capture failure degrades `mapStatus` to `unavailable`; main rendering continues.

Context loss calls `preventDefault()`, stops RAF, and releases controls. Restore marks map dirty, resizes, announces ready, and resumes (`world.ts:473-484`). Scene CPU objects remain present, allowing Three.js to re-upload geometry/material/texture resources after native restoration. The installed Three.js renderer has its own `onContextRestore` initialization (`node_modules/three/src/renderers/WebGLRenderer.js:1119-1145`). Application restore does not recreate the renderer or reconstruct the world, and does not verify a successful rendered frame before announcing ready. A dispatched DOM event with a mocked renderer proves scheduling only. Actual GPU restoration, re-uploaded shader programs/textures/shadows, repeated loss, and restore failure remain NOT VERIFIED.

No P0/P1 defect is established by this static review. This is not proof that none exists at runtime.

## Findings

### ENG-01 — Long active frames disappear from performance telemetry

- ISSUE ID: ENG-01
- TITLE: Frame samples of 250 ms or longer are discarded.
- SEVERITY: P2
- CATEGORY: Bug, established by static control flow; runtime reproduction NOT VERIFIED.
- AFFECTED PHASE: Existing performance monitoring and adaptive quality.
- FILE: `src/modules/WorldExplorer/runtime/world.ts`
- FUNCTION / COMPONENT: `createWorldRuntime` frame update.
- LINE RANGE: 292-298,396-423.
- CURRENT BEHAVIOR: Only `0 < rawMs < 250` enters the 60-sample ring. A long active-tab frame does not affect displayed FPS, average, p95, or the quality decision. Sustained frames at or above 250 ms can leave older samples displayed indefinitely.
- EXPECTED BEHAVIOR: Active rendering stalls must be represented in baseline telemetry. Intentional suspension may be excluded explicitly.
- REPRODUCTION STEPS: Keep document visible, run initial frames, then introduce repeated active-tab stalls above 250 ms. Compare browser frame trace with HUD samples and quality tier. A deterministic future test can drive scheduler timestamps with these gaps.
- ROOT CAUSE: Outlier rejection uses the elapsed value, although pause/resume already resets `lastFrame`.
- IMPACT: Optimistic performance baseline and failure to react to the worst slow frames.
- RECOMMENDED FIX: Retain finite positive active-frame intervals; separately label/exclude suspension. Add focused sampling/adaptive-quality tests.
- PROPOSED TARGET PHASE: Approved stabilization before using HUD numbers as a Phase 12 baseline.
- VERIFICATION METHOD: Controlled long-frame scheduler test and real browser trace comparison.

### ENG-02 — Draw-call telemetry excludes the minimap pass

- ISSUE ID: ENG-02
- TITLE: HUD draw calls and triangles report the final render pass only.
- SEVERITY: P2
- CATEGORY: Bug in whole-frame performance reporting; static evidence, runtime count comparison NOT VERIFIED.
- AFFECTED PHASE: Minimap and performance monitoring.
- FILE: `src/modules/WorldExplorer/runtime/world.ts`; `src/engine/renderer/webgl.ts`
- FUNCTION / COMPONENT: `captureMap`, frame update, `getDiagnostics`.
- LINE RANGE: `world.ts:372-394,426-431`; `webgl.ts:49,60-67`.
- CURRENT BEHAVIOR: Optional overview renders before the main render; diagnostics are read after the main render. Three.js defaults to resetting `info.render` for each `render()` (`node_modules/three/src/renderers/WebGLRenderer.js:1731`). The earlier overview pass is absent from these reported counts.
- EXPECTED BEHAVIOR: A whole-frame baseline includes all render passes, or explicitly names counts as main-pass-only.
- REPRODUCTION STEPS: Compare main-only frames with follow-map frames using a GPU/frame capture. HUD counts alone omit the added pass.
- ROOT CAUSE: Per-render Three.js counters are treated as whole-frame counters.
- IMPACT: Under-reported drawing work, especially in follow mode at a requested 50 ms map cadence.
- RECOMMENDED FIX: Accumulate per-pass counters or control `info.autoReset` across the complete frame, with exception-safe reset. Report main and overview passes separately if useful.
- PROPOSED TARGET PHASE: Approved performance instrumentation stabilization.
- VERIFICATION METHOD: Mock adapter tests with distinct pass counts, then browser capture comparison.

### ENG-03 — Interaction occlusion considers terrain only

- ISSUE ID: ENG-03
- TITLE: Rendered solid objects are absent from the interaction blocker list.
- SEVERITY: P2
- CATEGORY: Technical debt / partial occlusion implementation. A user-visible blocked-target reproduction is NOT VERIFIED; do not classify as a confirmed runtime regression.
- AFFECTED PHASE: Phase 10 interaction eligibility.
- FILE: `src/worlds/danang/scene.ts`; `src/modules/WorldExplorer/runtime/world.ts`
- FUNCTION / COMPONENT: `createDaNangScene`, `selectTarget`.
- LINE RANGE: `scene.ts:383-417,452-508,537,712`; `world.ts:201-238`.
- CURRENT BEHAVIOR: `blockerMeshes` contains only `terrainMesh`. Platforms, rocks, and trunks render and have player colliders but never enter the occlusion raycast. The cone fallback can select a fixture without a direct mesh hit.
- EXPECTED BEHAVIOR: Approved solid occluders should block line-of-sight interaction consistently.
- REPRODUCTION STEPS: In a future targeted scenario, align camera, an opaque platform/rock/trunk, and an interaction anchor while player is within max distance; compare rendered obstruction with eligibility. Current fixture placement may limit naturally reachable cases.
- ROOT CAUSE: Blocker collection is initialized with terrain and never populated by other scene elements.
- IMPACT: Occlusion contract covers terrain only; unsuitable as a general city interaction guarantee.
- RECOMMENDED FIX: Define explicit occluder semantics and populate a dedicated blocker collection without including the target's own meshes. Add real scene-raycast coverage.
- PROPOSED TARGET PHASE: Approved interaction stabilization or later geometry integration.
- VERIFICATION METHOD: Geometric raycast tests and camera/player browser scenarios.

### ENG-04 — Exception safety stops at the outer world cleanup loop

- ISSUE ID: ENG-04
- TITLE: A listener/input cleanup exception can skip GPU disposal.
- SEVERITY: P3
- CATEGORY: Technical debt; fault-path risk, no observed runtime leak.
- AFFECTED PHASE: Runtime lifecycle.
- FILE: `src/modules/WorldExplorer/runtime/world.ts`
- FUNCTION / COMPONENT: Returned `dispose`, construction catch.
- LINE RANGE: 553-565.
- CURRENT BEHAVIOR: Outer `releases` callbacks execute without individual error guards. A thrown cleanup prevents later callbacks and `runtime.dispose()` or `scope.dispose()` from running. Inner `ResourceScope` and `EngineRuntime` disposal are more robust.
- EXPECTED BEHAVIOR: All owned cleanup should be attempted even after an individual release fails.
- REPRODUCTION STEPS: Future fault-injection test: make an input release or observer cleanup throw, then assert renderer/resource disposal and remaining listener removal still run.
- ROOT CAUSE: Outer release loop lacks the error aggregation used by inner ownership classes.
- IMPACT: Potential retained resources/listeners during an exceptional teardown or failed construction.
- RECOMMENDED FIX: Use an all-attempted cleanup helper preserving the original failure and aggregating cleanup errors.
- PROPOSED TARGET PHASE: Approved lifecycle hardening.
- VERIFICATION METHOD: Teardown and construction rollback fault-injection tests.

## Hot paths and measurement limits

- Controller preallocates vectors and injects reusable collision output (`controller.ts:19-22`; `world.ts:136-145`). Runtime also reuses raycasters, hit arrays, vectors, and minimap projection output (`world.ts:125-137`).
- Target selection runs at most every 50 ms, but allocates registry candidate arrays, `getAll()` arrays on fallback, eligibility/target objects, and ray intersections. It also updates scene matrices before raycasts (`world.ts:201-249`; `registry.ts:83-97`). With three fixtures this is bounded; city-scale cost is NOT MEASURED.
- Overview capture allocates hidden/visibility arrays per capture. Overview mode requests a pass each 2500 ms; follow mode each 50 ms. Return-to-overview movement can also request 50 ms captures (`world.ts:251-261,352-375`). The pass redraws the scene with a second camera and may regenerate shadows.
- HUD snapshots run at 100 ms cadence. Typed-array `slice()` creates a new sorted sample, and snapshots copy performance/target objects (`world.ts:393-447`). The typed-array sort is numeric; no lexicographic-sort defect was found.
- Footstep dust pools 24 meshes/velocities and reuses them (`dust.ts:11-69`). Grass uses one `InstancedMesh` for up to 2600 blades (`scene.ts:628-674`). Trees/cloud puffs/shrubs remain individual meshes. There is no city streaming, visibility partition, asset LOD implementation, or broad-phase interaction structure in this scope; those are future expansion work, not current regressions.
- `jsHeapUsedMb` starts `null` and is never populated by the world telemetry (`world.ts:44-55,426-432`). GPU memory bytes, CPU/GPU render time, long tasks, asset download sizes, and long-session memory trend are NOT AVAILABLE from this instrumentation. Geometry/texture counts are counts, not byte estimates.
- FPS is computed from the reciprocal of the mean of up to 60 frame intervals, and p95 from the sorted ring. Samples span approximately one second at 60 FPS, longer at lower FPS. This is a short rolling estimate, not a sustained baseline. Quality changes DPR and rain density only (`world.ts:413-423`), while antialiasing, shadow resolution, and most geometry remain unchanged.
- Scene star, rain, grass, and texture generation use randomness. Reinitialization changes exact geometry/particles, so benchmark runs should disclose this variability (`scene.ts:69-75,170-179,651-664`). No seeded data was added for this audit.

## Tests inspected, not executed by this sub-audit

| Test file | Existing coverage | Limit |
| --- | --- | --- |
| `src/engine/core/__tests__/runtime.test.ts` | Single RAF, delta clamp/restart, reverse cleanup after error, disposal mid-frame, failed update stops | No native RAF/browser execution |
| `src/engine/renderer/__tests__/webgl.test.ts` | DPR bounds, dispose once, Strict Mode microtask release, overview copy/state restoration, overview render failure | Mock WebGLRenderer; no GPU state/context proof |
| `src/modules/WorldExplorer/__tests__/world.test.ts` | Scene fixtures/shared rocks/grass disposal, runtime scheduling/resize, quality change, context event pause/resume, map failure visibility recovery | Renderer mocked; context restoration is event simulation |
| `src/engine/controls/__tests__/events.test.ts` | Keyboard camera limits/zoom, overlapping keys, modifier/typing/block suppression, blur/focus/disposal, Escape/repeat handling | No touch/pinch/pointer-lock request failure assertions in this file |
| `src/engine/character/__tests__/controller.test.ts` | Walk/sprint/diagonal speed, jump/fall/landing, invalid/clamped deltas | Flat injected environment; actual platform/tree/rock collision geometry not exercised here |
| `src/engine/interactions/__tests__/registry.test.ts` | Inclusive distance, supplied occlusion boolean, disable/unregister, highlight/activation isolation | Does not prove scene raycast obstruction or target selection |
| `src/world-core/__tests__/prefabs.test.ts` | Shared assets across zones, independent transforms/metadata, validation, failed creation rollback, new factory registration | No streaming or world-origin transform contract |

`createFootstepParticleSystem` and `createCasualExplorerRig` permit an omitted `ResourceScope`, but their return values expose no scope disposal. The active scene passes its scope, so this is an API reuse hazard rather than an active leak (`dust.ts:11,69`; `humanoid.ts:4`). Prefer requiring explicit ownership before reuse.

## Future scope boundaries

Manifest origins/bounds/provenance are validated metadata. `PrefabRegistry` passes element/prefab to factories and does not apply zone origin; the rock factory uses element-local transforms directly. Existing zone origin is zero. A nonzero zone-origin coordinate contract, ENU/WGS84 conversion, rebasing, streaming budgets, mesh/collider synchronization, geospatial precision, and asset LOD behavior require Phase 12 design. None is implemented or implied by current manifest validation.

Conclusion for this scope: static separation and ownership are identifiable; identified medium issues affect telemetry fidelity and occlusion completeness. Runtime stability, native context recovery, sustained performance, and GPU/resource trends remain NOT VERIFIED until main audit evidence is attached.

## Follow-up: collision, animation, and allocation boundaries

### ENG-05 — Cylinder collision does not use finite vertical extent

- ISSUE ID: ENG-05
- TITLE: Rock/tree cylinder collisions are treated as infinitely tall horizontal obstacles.
- SEVERITY: P2
- CATEGORY: Technical debt / simplified collision contract; not an established new regression.
- AFFECTED PHASE: Existing character physics and synthetic terrain.
- FILE: `src/worlds/danang/zones/synthetic.ts`
- FUNCTION / COMPONENT: `resolveHorizontalCollisions`.
- LINE RANGE: 93-103; collider heights declared at 11-40.
- CURRENT BEHAVIOR: Every rock/tree cylinder pushes the horizontal position out regardless of player height. `currentY` is used for platforms, but not cylinders. Declared cylinder `height` values are never considered. Exact center overlap (`distSq <= 0.00001`) receives no push because its normal is undefined.
- EXPECTED BEHAVIOR: A finite-height collider contract should explicitly define base/top elevations and player vertical extent, or explicitly document cylinders as infinite exclusion columns. Spawn/teleport into a cylinder requires deterministic recovery.
- REPRODUCTION STEPS: For a future pure test, call the collision resolver above a rock's terrain-relative top with X/Z inside its radius; it still pushes. Call at the exact rock center; it returns that center unchanged. For browser confirmation, jump toward the top of a low rock. Current runtime has no general teleport control, so exact-center recovery is a reuse boundary rather than a proven reachable user defect.
- ROOT CAUSE: Cylinder branch is a two-dimensional radial test; no finite vertical overlap or coincident-center fallback exists.
- IMPACT: Airborne motion cannot cross low-rock footprints, and future spawn/rebase placement needs extra collision recovery.
- RECOMMENDED FIX: First define player/collider vertical bounds and grounding semantics. Then add vertical overlap and a deterministic coincident-center separation rule, retaining current behavior unless an approved stabilization task changes it.
- PROPOSED TARGET PHASE: Approved physics stabilization before geospatial object/collider integration.
- VERIFICATION METHOD: Pure boundary tests for above/below/top/center contacts, followed by browser jump and landing scenarios.

The controller's `horizontalSpeed` is derived from velocity before position collision resolution (`controller.ts:85,108-117`). A stationary player pushing against a wall/world boundary can retain movement animation and a positive HUD speed; this value is commanded horizontal motion, not measured world displacement. No new issue severity is assigned without an agreed animation/speed contract. The character animation updater performs scalar calculations and mutates existing rig transforms (`humanoid.ts:266-421`). Animation targets cover idle, walk, run, jump, fall, and landing. Native visual blending, feet clipping, and actual obstacle traversal remain NOT VERIFIED.

The repository cannot honestly claim literal zero per-frame allocations. Main frame marker updates create CSS percentage/rotation strings (`world.ts:388-390`). Selection, map capture, HUD snapshots, and solar refresh allocate at their respective cadences described above; `simulation.ts:230` also constructs a `forEach` callback during update. No application-level `scene.add`, `scene.remove`, mesh creation, geometry construction, or material construction occurs in the inspected steady-state runtime/controller/environment/dust/animation updates. Dust toggles pooled visibility, rain mutates its buffer, and grass mutates instance matrices. This establishes reuse patterns, not zero allocations inside JavaScript engines or Three.js internals. A browser allocation profile is required to quantify garbage collection cost.
