# PHASE 11 – AUDIT COMPLETION REPORT

Audit date: 2026-11-17, Asia/Bangkok (UTC+07:00). Source revision: `c7c6d7427f3684cea8b73f7722c4526606b371cc`.

**Final decision: BLOCKED – NOT READY.** The audit is delivered; Phase 12 is not authorized. Required quality gates are not green: ordinary mouse input produces an uncaught exception, Storybook emits warnings, and responsive HUD controls overlap. No application repair was made. No P0/P1 defect was established; the release/readiness block follows the repository's explicit zero-error/zero-warning requirement and the verification gaps below, rather than an invented critical severity.

## 1. Executive summary

The active application is a modular Next.js 16 / React 19 / TypeScript 7 implementation. The historical React single-file snapshot is reference material, not the preview entry point. Source authority is unambiguous. The homepage renders WorldExplorer without MainLayout; Health retains its operational layout and API.

Production build, lint, formatting, type checking, and all 127 tests passed. Chrome rendered the real scene and live weather. All nine diagnostics passed in the browser. Movement, touch, all three fixtures, map edge/follow, pointer lock, fullscreen, real network failure/recovery, and native WebGL context restoration were exercised. A second mouse click while pointer lock is active reliably throws `InvalidStateError` at `setPointerCapture`. An eligible interaction during cooldown unexpectedly changes Env state. These are recorded defects, not fixed during this audit.

Performance is measured, not certified: the 1920 × 1080 headless desktop samples ranged from 16.81 to 25.67 FPS, below the 60 FPS target. A smaller mobile-emulated viewport was faster; this is not physical mobile performance. Three visible SPA unmount/remount cycles returned to 151 geometries and 5 textures, with no monotonic retained heap increase across those three samples. This short smoke test does not prove absence of leaks.

Geospatial readiness is a foundation only: local meters, injectable surface/collision functions, disposable prefab instances and partial provenance exist. WGS84/ECEF/ENU conversion, geographic origins/datum contracts, surveyed terrain, imagery alignment, geographic buildings/roads, and streaming are missing. Environmental visuals are connected to real time/weather, but are approximate visual simulation, not hydrology or validated physical weather coupling.

### Evidence and deliverables

| Deliverable | Artifact |
|---|---|
| 01 Executive audit | This section and final decision |
| 02 Phase 1–10 feature inventory | Section 2 |
| 03 Architecture audit | Section 3; [engine audit](docs/audit/phase-11/engine-audit.md); [historical comparison](docs/audit/phase-11/snapshot-audit.md) |
| 04 Regression test report | Section 2; [raw browser commands, results and events](docs/audit/phase-11/evidence/browser.json) |
| 05 Performance baseline | Section 4; raw measurements in browser.json |
| 06 Geospatial readiness | Section 5; [detailed readiness](docs/audit/phase-11/environment-audit.md#geographic-readiness) |
| 07 Environmental readiness | Section 6; [coupling and trust-boundary audit](docs/audit/phase-11/environment-audit.md#environmental-coupling) |
| 08 Risk and debt register | Section 7 and linked issue templates |
| 09 Phase 12 technical preparation | Section 8; detailed proposal in environment audit |
| 10 Final readiness decision | Section 10 |

Historical source: all 8,514 lines of `history/code/da_nang_3d_open_world_simulation_phase_10.tsx` and all 150 lines of the handover were read by the comparison reviewer. Active simulation owners and associated tests were reviewed with CodeGraph and current-source reads for omitted sections. The complete findings and precise line ranges are retained in the three scoped reports. A line-by-line audit of every generated shadcn component and unrelated boilerplate module is **NOT VERIFIED**; compilation and repository tests cover those areas, not exhaustive source review.

## 2. Phase 1–10 regression

### Environment and method

- Windows, installed Node **26.13.1**, pnpm script entry points, Next.js 16.4.2, Chrome **132.0.6834.110** headless. Repository target is Node 22; an equivalent fresh Node 22 run is **NOT VERIFIED** in this audit. No runtime or package installation was performed.
- Real GPU: `ANGLE (Intel, Intel(R) UHD Graphics (0x00009B41) Direct3D11 vs_5_0 ps_5_0, D3D11)`, WebGL 2.0.
- Built production source, then served `.next/standalone/server.js` on port 3191 with Node system certificate trust enabled. Static/public assets were copied into generated standalone output. No source/build configuration was changed.
- Browser automation used installed Chrome's native CDP and Node, with no additional dependency. Desktop/tablet/mobile inputs were dispatched through the browser. No weather fixture, provider response, fake control, or fabricated observation was introduced.
- Manual visual QA: screenshots were inspected for desktop, tablet landscape, mobile landscape and context restoration. Programmatic checks of all six requested viewport sizes are in `browser.json:viewports`. Physical manual device testing was not performed.
- Test failures in the driver are preserved. English-only selectors failed after a Vietnamese cookie selected `/vi`; reruns used explicit `/en`. A freeze/thaw probe left Chrome's page visibility hidden; later visible tests explicitly enabled CDP focus emulation. Hidden mount attempts were not counted as rendered mount proof. Immediate React state reads were rerun after settling. None of these harness failures is silently counted as PASS.

### Required checks

| Test ID | Scenario / expected result | Actual result | Status | Evidence |
|---|---|---|---|---|
| Q-01 | `pnpm lint`: zero diagnostics | 342 files checked, no fixes or diagnostics | PASS | [lint.txt](docs/audit/phase-11/evidence/lint.txt) |
| Q-02 | `pnpm format:check`: existing source formatted | 341 files checked, no fixes | PASS | [format-check.txt](docs/audit/phase-11/evidence/format-check.txt) |
| Q-03 | `pnpm type-check`: generate routes and strict types | Successful after SWC native-cache permission escalation | PASS | [type-check.txt](docs/audit/phase-11/evidence/type-check.txt) |
| Q-04 | `pnpm test`: existing suite | 31 files, 127 tests passed | PASS | [test.txt](docs/audit/phase-11/evidence/test.txt) |
| Q-05 | `pnpm build`: production routes | Build and 14 static pages completed | PASS | [build.txt](docs/audit/phase-11/evidence/build.txt) |
| Q-06 | `pnpm build-storybook`: zero errors/warnings | Output built; Node DEP0205 and Vite PLUGIN_TIMINGS warnings | FAIL | [storybook.txt](docs/audit/phase-11/evidence/storybook.txt) |
| Q-07 | Browser console: zero uncaught errors/warnings | Reproduced pointer-capture DOMException; no claim of a clean full run | FAIL | browser.json, `pointer-lock-second-click` |

Final documentation/evidence formatting was also checked: lint checked 345 files and formatting checked 344, both with zero diagnostics. See [lint-final.txt](docs/audit/phase-11/evidence/lint-final.txt) and [format-check-final.txt](docs/audit/phase-11/evidence/format-check-final.txt).

PowerShell wraps pnpm's stderr script banner in a `NativeCommandError` record even for successful commands. The actual process exit codes and subsequent tool diagnostics determine the check result. SWC cache sandbox failures were rerun with approved escalation; no dependency or config workaround was applied. The initial `next start` probe emitted the expected standalone-configuration warning; it was replaced with the documented standalone server. The final server's startup is in [server-standalone.txt](docs/audit/phase-11/evidence/server-standalone.txt).

### Feature inventory

`Runtime verified` is limited to the named scenario, not every edge case. `Regression` identifies demonstrated historical differences separately from inherited limitations.

| Phase | Feature | Code exists | Runtime verified | Regression | Status | Evidence |
|---|---|---|---|---|---|---|
| 1 | Explorer rig, terrain, vegetation and fixtures | Yes | Visible real WebGL scene | Exact pixel parity not certified | PARTIAL | desktop-1920.png; snapshot comparison |
| 1 | WASD and ArrowUp movement | Yes | Actual position changes | None observed in tested paths | PASS | browser command results; `diagonal` |
| 1 | Walk / sprint / diagonal normalization | Yes | Controller/HUD speed snapshots 4.50 / 8.60 / 4.50 m/s; position changes observed | None observed in these snapshots | PASS | measurements; `diagonal` |
| 1 | IDLE / WALK / RUN / JUMP / FALL / LANDING | Yes | All six states sampled | None observed | PASS | `jump-animation-sequence`, movement measurements |
| 1 | Terrain following and radial boundary | Yes | Terrain Y changes; Z stops at -68 m | None observed on north route | PASS | `boundary` |
| 1 | Every platform/rock/tree collision and camera ground clearance | Yes | No exhaustive collision course | Finite cylinder height gap, static | NOT VERIFIED | ENG-05; controller tests |
| 1 | Mouse orbit / wheel / pointer lock / keyboard orbit | Yes | Orbit, zoom and lock work | Locked second click throws | PARTIAL | `mouse-drag`, `pointer-lock-second-click`; first desktop controls command |
| 2 | Da Nang clock and solar astronomy | Yes | Clock/date/timezone and night scene visible; clock advances | Numerical approximation, not external astronomy certification | PARTIAL | 9 diagnostics; source parity tests; screenshots |
| 2 | Day/dawn/noon/sunset visual transition | Yes | Only actual nighttime observed | No artificial time override used | NOT VERIFIED | environmental source audit |
| 2 | Fixed live weather BFF | Yes | HTTP 200, validated real 26.8°C, WMO 1, observation 21:00 | None observed | PASS | [weather-response.json](docs/audit/phase-11/evidence/weather-response.json) |
| 2 | Stale and unavailable/retry | Yes | Actual observation aged to STALE; blocked requests show unavailable; retry returns LIVE | None observed | PASS | `network-unavailable`, `network-retry-restored`, stale snapshots |
| 2 | Rain/lightning/high-wind visual behavior | Yes | No rainy/storm observation during audit | Not forced with fake weather | NOT VERIFIED | weather/environment source audit |
| 3 | Device profile and guide input mode | Yes | Desktop/tablet/mobile labels and touch controls | HUD click stability not exhaustively exercised | PARTIAL | six viewport captures, mobile touch run |
| 3 | Joystick / camera swipe / pinch / simultaneous touch | Yes | Movement, yaw change, zoom, release to zero | None observed | PASS | mobile touch command results; mobile-touch.png |
| 3 | Touch sprint hold / jump | Yes | RUN controller speed 8.60 m/s and JUMP observed | None observed | PASS | mobile touch command results |
| 3 | Double-tap sprint latch / pointer cancel / hybrid hardware | Yes | Not all branches browser-tested | No regression conclusion | NOT VERIFIED | source review; physical hardware unavailable |
| 3 | Text input and dialog isolation | Yes | Input leaves Z unchanged; Specs blocks speed at 0 | None observed | PASS | `input-isolation`, `specs-blocking` |
| 4 | Tokens, HUD zones, motion CSS | Yes | CSS reduced-motion transition becomes 0s | Under-sized text and overlap remain | PARTIAL | UI detector; `reduced-motion-css` |
| 5 | Persistent expanded/compact time/weather | Yes | Clock, icon, temperature remain compact | No hidden state exists | PASS | `weather-compact`; viewport-390x844.png |
| 6 | Independent information and character panels | Yes | Env/Debug visible, compact/expanded controls present | Cooldown incorrectly toggles Env | PARTIAL | SNAP-02; viewport captures |
| 7 | Adaptive movement guide / H | Yes | Desktop and touch content; settled H states checked | Some guide layouts cover toolbar | PARTIAL | confirmed guide scenarios; UI-01 |
| 8 | One renderer, top-down overview, zoom | Yes | WebGL plus 2D map canvas, map visible; zoom reaches 2.8 | Full zoom-limit interaction matrix incomplete | PARTIAL | canvas result; `map-edge`; renderer unit tests |
| 9 | Marker, heading, follow, edge | Yes | North travel, clamped marker, EDGE then hidden in follow | Image/camera sampling risk remains | PARTIAL | `map-edge`, `follow-edge-hidden`; SNAP-03 |
| 10 | Monolith inspect | Yes | Correct title, local-axis details and interaction count | None observed | PASS | `inspect-fixture` |
| 10 | Weather station information | Yes | Correct fixture details plus current clock/weather/solar | Stale wording in contextual content not separately certified | PASS | `information-fixture` |
| 10 | Beacon activate/deactivate and cooldown | Yes | ON/OFF feedback; rapid E changes Env | Confirmed migration regression | FAIL | cooldown command results; SNAP-02 |
| 10 | Real-scene occlusion and material restoration | Partial | No full blocker/visibility matrix | Inherited terrain-only blocker list | NOT VERIFIED | ENG-03 / SNAP-01 |
| All | Native context loss/restore | Yes | Lost state; restored actual GL calls, error 0, visible scene and movement | No failure/repeated-loss guarantee | PASS | context-restored.png; context command results |
| All | SPA unmount/remount three times | Yes | Same JS realm, 0 canvases on Health, 2 on world, stable resource counts | No monotonic three-sample heap trend | PASS | `visible-spa-cycle-0/1/2` |
| All | Fullscreen and Escape | Yes | Enter/exit true; dialogs and lock close | None observed | PASS | fullscreen and Specs scenarios |
| All | Physical tablet/mobile, safe-area cutouts, browser diversity | Yes, intended support | Emulation only | No hardware conclusion | NOT TESTABLE | hardware/browser limitation |

### Diagnostics adequacy

All nine are isolated logic checks, not live-world integration tests. The [comparison report](docs/audit/phase-11/snapshot-audit.md) enumerates their exact assertions and gaps. DIAG-01 checks timezone; 02 solar bounds/phases; 03 WMO mappings; 04 the historical permissive sanitizer; 05 joystick limits; 06 guide selection; 07 map zoom/span; 08 analytical projection/heading; 09 an isolated registry and supplied occlusion boolean. DIAG-04 does **not** test the strict live schema. DIAG-09 does **not** test the scene's blocker mesh list, pointer lock or the UI cooldown fallback. The diagnostic registry uses isolated resources and disposes them; it does not change live fixture activation.

### Runtime and negative-test boundaries

The native `WEBGL_lose_context` extension caused real loss/restoration. After restore, observed draw calls increased from 254 at loss to 12,166, `isContextLost()` became false, and `getError()` returned 0. The inspected screenshot showed terrain, player, lighting, HUD and minimap. This is stronger evidence than a dispatched restored event, but not proof of every resource/shader recovery path.

Network failure was induced by blocking only `/api/weather` requests in CDP. This is an actual request failure, not a synthetic response. Existing null-data UI showed the unavailable placeholder and retry control. Unblocking and retrying returned a validated observation. Expected blocked-request network events are bounded by `networkFailureStart` and `networkFailureEnd` in browser.json. They must not be confused with unexpected normal-operation errors.

Browser tests not completed: exhaustive per-fixture occlusion/material arrays/disabled states, every platform and obstacle approach, full map four-direction heading/image alignment, physical orientation and safe-area behavior, true human background/foreground policies across browsers, unsupported GPU initialization on hardware, long-session GPU profiling and repeated context failures. These remain **NOT VERIFIED** or **NOT TESTABLE**, not PASS.

Speed values above come from controller/HUD velocity, not independently timed displacement per wall-clock second. Collision and the 0.05 s simulation delta clamp can separate velocity from actual displacement; the boundary sample retains RUN speed while position remains at Z = -68. Wall-clock movement-rate certification is **NOT VERIFIED**.

### Executed browser test report

Environment for these tests: production standalone build, Chrome 132 CDP on the documented Windows/Intel host. Touch tests use emulation, not a physical device. Raw command strings, result objects, scenario IDs and event payloads are preserved in browser.json; failed driver attempts remain separate from their corrected reruns.

| Test ID | Scenario / expected result | Actual result | Status | Evidence |
|---|---|---|---|---|
| B-01 | Spawn/render with one WebGL and one map presentation canvas | Visible character/terrain/HUD; canvas sizes 1920 × 1080 and 256 × 256 | PASS | First browser command; desktop-1920.png |
| B-02 | Walk/sprint/diagonal controller speeds remain bounded | Snapshot speeds 4.50 / 8.60 / 4.50; position changes | PASS | Movement measurements; `diagonal` |
| B-03 | Jump progresses through airborne/landing states | IDLE, JUMP, FALL, LANDING, IDLE sampled | PASS | `jump-animation-sequence` |
| B-04 | North route stops at radial boundary | Z stops at -68; terrain Y approximately 3.27 | PASS | `boundary` |
| B-05 | Valid fixtures open correct dialogs / toggle beacon | Monolith and station dialogs correct; beacon ON/OFF feedback | PASS | `inspect-fixture`, `information-fixture`, cooldown command results |
| B-06 | Cooldown suppresses repeat interaction without HUD side effect | Second E inside cooldown hides Env | FAIL | `cooldownEnvBefore:true`, `cooldownEnvAfter:false` in command results |
| B-07 | Map marker clips to edge, then follows player | At zoom 2.8 marker top 6.5%, EDGE visible; follow hides EDGE | PASS | `map-edge`, `follow-edge-hidden`, map-edge.png |
| B-08 | Touch joystick plus camera remain independent; release stops movement | Speed approximately 3.80, yaw -0.24, then speed 0 | PASS | Mobile touch command result |
| B-09 | Pinch, sprint hold and jump work | Distance 5.4 to 4.15; RUN approximately 8.60; JUMP sampled | PASS | Mobile touch command result; mobile-touch.png |
| B-10 | Input/dialog focus prevents world movement | Input Z 0 before/after; Specs speed 0; Escape closes | PASS | `input-isolation`, `specs-blocking`, `specs-closed` |
| B-11 | Pointer lock, Escape and fullscreen work | Lock acquired/released; fullscreen enter/exit true | PASS | Pointer/fullscreen scenarios |
| B-12 | Clicking locked canvas remains error-free | Uncaught pointer-capture InvalidStateError, repeated reproduction | FAIL | `pointer-lock-second-click`; exception events |
| B-13 | Native context loss stops scene; restore draws again | Lost true; restored false, GL error 0, draws advance; scene visually inspected | PASS | Context command result; context-restored.png |
| B-14 | Three visible SPA mounts clean up and preserve resources | Health 0 canvases; world 2; 151 geometries / 5 textures each cycle | PASS | `visible-spa-cycle-0/1/2` |
| B-15 | Actual weather request failure shows no invented observation; retry recovers | Unavailable placeholder then real LIVE observation | PASS | Network scenarios; weather-unavailable.png; weather-response.json |
| B-16 | Compact weather, map states, guide and motion CSS remain operable | Time/icon/temperature retained; M/H settle correctly; reduced transition 0s | PASS | Confirmed HUD/guide/motion scenarios |
| B-17 | Live Health remains operational | HTTP 200, status ok, Cache-Control no-store; page rendered on SPA route | PASS | `health-api`, visible SPA Health snapshots |
| V-01 | All six requested viewports keep document within bounds | No document overflow in all six | PASS | `viewports` and six screenshots |
| V-02 | Tablet/mobile landscape controls stay unobscured | Guide/Controls overlap toolbar controls | FAIL | Hit-test output; inspected 1024 × 768 and 844 × 390 screenshots |

B tests are automated browser interaction/inspection. V-01 combines automated geometry checks with retained screenshots; V-02 includes manual visual inspection. These do not imply full manual device testing or a formal accessibility audit.

## 3. Architecture audit

Entry chain: `src/app/[locale]/page.tsx:24` → `src/modules/WorldExplorer/index.tsx` → `components/ClientBoundary.tsx` → `WorldExplorerClient.tsx` → `hooks/useWorldExplorer.ts:132` → `runtime/world.ts:86`. Engine code does not own React or city content. City scene and atmosphere remain under `src/worlds/danang/`.

| Layer | Ownership and assessment |
|---|---|
| React | Hook owns HUD state, clock/weather requests, modal blocking, generation-guarded runtime lifecycle and touch state. Runtime mutable physics state remains outside React; snapshots are sampled. |
| EngineRuntime | One RAF scheduler with idempotent start/stop, first-frame reset, 0.05 s delta clamp and terminal update error handling. |
| Resources | ResourceScope deduplicates owned disposables and tears down in reverse order. Scene owns GPU resources before attachment. Catalog owns shared rock geometry/material; instances borrow and detach. |
| Rendering | One WebGLRenderer. Perspective main camera plus orthographic map camera. Second canvas is 2D presentation, not another WebGL renderer. DPR capped at 2. Map render target/viewport/scissor/scissor-test restore in finally. |
| Atmosphere | Da Nang-specific clock/solar/weather visuals update through one environment system, not a second engine/provider. Map hides atmosphere/character and restores scene fog/light/visibility. |
| Input/interactions | One keyboard/pointer owner; focus/blur release, camera-relative normalized movement, registry eligibility and execution revalidation. Pointer capture and cooldown handling have confirmed defects. |
| Error handling | Unsupported/error/context-lost UI and retry generation exist. Client aborts superseded/unmounted weather requests. Cleanup exceptions in the outer release loop can still skip later disposal. |
| Maintainability | Extracted logic and ownership seams are materially stronger than the archived monolith. The scene and composition runtime remain large; no whole-file refactor is proposed without measured need. |
| Scalability | Current eager synthetic scene, linear interaction candidates and fixed-size shadows do not establish city streaming, GIS, LOD or physical atmosphere readiness. |

Hot paths reuse vectors, raycasters, collision outputs and projection outputs. Literal zero-allocation claims are unsupported: CSS strings update each frame, interaction/capture arrays allocate at their cadence, and HUD sampling copies/sorts data at 10 Hz. No per-frame React setState was found; sampled HUD updates still rerender their React tree. Targeting is capped at 20 Hz, solar at 1 Hz, map follow captures at approximately 20 Hz, stable overview at 0.4 Hz.

Potential issues are distinguished from observed bugs in [engine-audit.md](docs/audit/phase-11/engine-audit.md). No dead-code purge, architecture rewrite, ownership migration, dependency change or optimization was made.

## 4. Performance baseline

Measured using independent browser RAF intervals while the app ran. Samples are short 1.2–3 s windows after warmup; the first idle sample occurred more than 30 s after runtime startup. FPS is frame count / elapsed time; p95 is the sorted interval percentile. The camera-rotation sample is a single keyboard orbit step followed by sampling; the later continuous sample repeatedly issues orbit commands. Host load, scene location, view direction and adaptive quality differ between samples. These are a reproducible smoke baseline, not a device certification or controlled A/B benchmark.

| Scenario | Viewport | FPS | Average ms | P95 ms | Main-pass calls / triangles | Geometries / textures | JS heap MiB |
|---|---|---:|---:|---:|---|---|---:|
| Idle after 30 s | 1920 × 1080 | 17.93 | 55.79 | 80.10 | 349 / 76,590 | 152 / 5 | 31.43 |
| Walking | 1920 × 1080 | 16.81 | 59.50 | 110.20 | 333 / 74,868 | 153 / 5 | 30.75 |
| Sprinting | 1920 × 1080 | 25.08 | 39.87 | 50.10 | 270 / 68,930 | 153 / 5 | 29.21 |
| Jumping | 1920 × 1080 | 25.67 | 38.96 | 60.00 | 262 / 68,514 | 153 / 5 | 29.77 |
| Camera orbit step | 1920 × 1080 | 21.75 | 45.97 | 60.10 | 351 / 76,878 | 153 / 5 | 30.57 |
| Mini Map Follow | 1920 × 1080 | 19.27 | 51.90 | 100.00 | 352 / 77,022 | 153 / 5 | 33.24 |
| Beacon interaction | 1920 × 1080 | 22.35 | 44.74 | 60.00 | 345 / 76,382 | 153 / 5 | 17.51 |
| Repeated camera orbit | 1366 × 768 | 34.06 | 29.36 | 40.10 | 329 / 73,858 | 151 / 5 | 38.30 |
| Mobile-emulated idle after touch | 390 × 844 | 91.71 | 10.90 | 20.00 | NOT AVAILABLE in that snapshot | 152 / 5 | 81.18 |

1920 samples used Performance tier at DPR 1.00; rain quality multiplier is 0.5 by source mapping, **not independently measured/exposed**. Repeated camera orbit used Balanced at DPR 1.00 (mapping multiplier 0.75). Mobile tier/rain multiplier were not exposed in that sample. The 1920 × 1080 initial observed HUD was Ultra / DPR 1.00, 349 calls, 76,590 triangles, 151 geometries, 5 textures; its short startup rolling FPS was 17, not a measured loading duration.

Missing metrics are explicit: loading duration, GPU memory bytes, GPU frame time, complete-frame draw calls/triangles including minimap, allocation/GC rate, independent active rain density/cost, and physical mobile results are **NOT AVAILABLE**. A rainy-weather scenario was **NOT VERIFIED** because actual WMO 1 weather had no precipitation. Existing HUD heap field remains null; the heap values above come directly from Chromium `performance.memory`, not the HUD.

HUD telemetry omits active frames of 250 ms or longer (ENG-01), and render counters omit the minimap pass (ENG-02). Therefore independent RAF intervals are the primary timing evidence. No estimate is substituted for unavailable GPU numbers. DPR-only quality changes cannot be assumed to restore 60 FPS when the host already uses DPR 1.

Visible SPA remount samples, after debugger-requested GC, were 37,190,644; 29,447,086; and 29,933,984 heap bytes. All returned to 151 geometries / 5 textures and two canvases; Health had zero canvases in the same realm. Counts can rise from 151 to 152–153 after first movement/highlight due to lazy GPU registration. These observations neither establish a leak nor prove leak freedom.

## 5. Geospatial readiness

All current terrain, plaza, path, trees, grass, colliders and fixtures are **synthetic**. The fixed Da Nang latitude/longitude drives weather and solar reference only. No scene asset is certified as a real landmark, surveyed geometry, or verified geographic asset.

| Category | Existing | Missing / risk | Readiness |
|---|---|---|---|
| WGS84 / GPS conversion | Environmental reference coordinates | Typed geographic contracts and conversion math | Missing |
| ENU / fixed origin / axes | Local meters, Y up; east +X, north -Z convention | Versioned geographic origin and height datum; explicit axis adapter | Partial |
| Scale / precision | Meter-sized geometry, controller speeds | Survey calibration, imported units, extent/error budget | Partial |
| Terrain / elevation | Shared synthetic height and support functions | DEM/nodata/datum/seam policies; real surface adapter | Synthetic only |
| Buildings / roads / rivers / coast / bridges | Procedural paths and platforms | GIS geometry, topology, elevations and verified datasets | Missing |
| Satellite alignment | Procedural textures | CRS/geotransform, license, resolution/date/coverage, control points | Missing |
| Streaming | Disposable prefab zone loading/rollback | Spatial loading policy, async cancellation, eviction, budgets | Partial foundation |
| Accuracy / provenance | Validated provenance schema for rock manifest | Wider coverage, real sources, verified dates and accuracy | Partial foundation |

The detailed report evaluates OSM, licensed imagery, Copernicus DEM, Cesium/3D Tiles, photogrammetry, LiDAR and GLB prospectively. No tool was installed or integrated. A URI, asset label or city's name is not evidence of a loaded licensed asset or accurate placement.

## 6. Environmental readiness

Weather API updates/cache operate at 15-minute cadence; stale threshold is 25 minutes against the older of fetch/observation time. Animation uses the render loop; clock/solar refresh is 1 Hz. These cadences are distinct. Provider requests have a 10 s timeout, fixed URL, no redirects and 256 KiB payload cap. Client retry is three attempts with 1 s / 2 s waits; replacement and unmount abort old requests. Strict live validation precedes the historical normalizer.

| Coupling | Assessment |
|---|---|
| Time → Sun | Implemented; clock/night runtime observed, full-day visual change NOT VERIFIED |
| Sun → Lighting | Implemented; night scene observed, interpolation and day sweep NOT VERIFIED |
| Sun → Shadows | Partially implemented; approximate moon/opposite-sun policy and fixed shadow bounds |
| Cloud → Sunlight | Partial global attenuation; not physical cloud occlusion |
| Wind → Rain | Implemented but rainy runtime NOT VERIFIED; km/h-to-m/s and meteorological direction handled |
| Wind → Vegetation | Implemented; mean/gust blend is visual, not physical foliage dynamics |
| Wind → Clouds | Implemented; minimum drift and wrap policy remain approximate |
| Rain → Ground | Partial material roughness/metalness on terrain; no accumulation/drying/contact model |
| Rain → Water | Missing; no water/hydrology system |
| Weather → Visibility | Partial category-based fog; not measured visibility |
| Weather → Lighting | Implemented approximate attenuation; extreme-weather visuals NOT VERIFIED |

Do not duplicate this clock/weather/atmosphere system in later phases. Missing physical coupling is future scope, not automatically a current bug. Calendar validation and the partial serialized-response client validator are documented debt, with exact boundaries and proposed negative tests in the environmental report.

## 7. Risk and technical debt register

No P0/P1 finding was established. P2/P3 issues and verification gaps still prevent the required clean readiness gate. Duplicate occlusion findings ENG-03 and SNAP-01 refer to one issue, not two.

| Issue | Severity / class | Evidence and impact | Recommended action / proposed target |
|---|---|---|---|
| UI-INPUT-01 | P2 confirmed bug | Second mouse click while locked throws uncaught InvalidStateError | Guard pointer capture for lock state; approved stabilization before Phase 12 |
| SNAP-02 | P2 confirmed regression | Eligible E during 320 ms cooldown falls through to Env toggle | Distinguish suppressed execution from no eligible target; approved stabilization |
| UI-01 | P2 confirmed responsive bug | 1024 × 768 guide covers toolbar/Env/Debug; 844 × 390 Controls covers Specs/fullscreen | Resolve HUD layout budgets within current design; approved stabilization |
| PERF-01 | P2 measured limitation | 1920 × 1080 baseline misses 60 FPS on tested host | Profile main/map passes and shadows on target hardware before optimization |
| ENG-01 | P2 static bug | Long active frames discarded from performance sampler | Retain active stalls, distinguish suspension; before baseline certification |
| ENG-02 | P2 reporting bug | Draw calls/triangles exclude map pass | Count all passes per frame; before baseline certification |
| ENG-03 / SNAP-01 | P2 inherited incomplete feature | Only terrain enters occlusion list; solid obstacles omitted | Define/register real blocker meshes; before city interactions |
| ENG-05 | P2 collision debt | Cylinder collision ignores finite collider height/current Y | Specify obstacle overflight semantics and add finite-height tests; approved controller maintenance |
| ENV-01 | P2 reliability debt | Client trusts most serialized weather fields | Complete shared response validation; before weather contract expansion |
| QA-01 | P2 quality-gate limitation | Storybook warnings on Node 26 | Rerun supported Node 22; identify plugin/deprecation ownership before approved remediation |
| UI-02 | P3 accessibility/usability debt | Functional text at 8–10 px, small touch controls | Review text/target sizes at mobile layouts; approved UI maintenance |
| ENG-04 | P3 fault-path risk | Outer cleanup exception can skip remaining releases/disposal | All-attempted cleanup with error aggregation; approved lifecycle maintenance |
| ENV-02 | P3 validation debt | Date.parse can normalize impossible dates | Strict calendar validation without fabricated defaults; approved reliability maintenance |
| SNAP-03 | P2 risk, visible defect NOT VERIFIED | Map image capture and current marker use different camera samples | Measure alignment before proposing repair; before coordinate-contract migration |
| SNAP-04 | P3 documentation debt | Universal zero-allocation claim exceeds actual implementation | Qualify claims; optimize only after profiling |
| GEO-01 / ENV-03 | INFO missing future capability | No geographic core or physical weather model | Phase 12 proposal and later scoped environment work |

### UI-INPUT-01 — Pointer capture conflicts with active pointer lock

- **Affected phase / category:** Phase 3 camera/mouse input; confirmed runtime bug.
- **File / function / line range:** `src/engine/controls/events.ts`, `bindWorldInput` pointerdown, 126–134; click handler 179–197.
- **Current behavior:** First canvas click requests pointer lock. Another mouse pointerdown unconditionally calls `canvas.setPointerCapture(event.pointerId)` while lock is active. Chrome throws `InvalidStateError`. The handler exits before assigning the drag pointer ID.
- **Expected behavior:** Clicking a locked canvas produces no uncaught exception and preserves working mouse-look/input release.
- **Reproduction:** Open `/en`, click canvas at an unobstructed world position, confirm `document.pointerLockElement` is `.world-canvas`, click again. Browser events contain the uncaught DOMException. Escape releases lock. Reproduced twice in this audit, independent of network-negative tests.
- **Root cause:** Capture suitability is tested only by optional method availability; active pointer-lock state is not considered.
- **Impact:** Normal camera input violates zero-console-error gate. The tested scene continued rendering; no whole-app crash or P1 severity is claimed.
- **Recommended fix:** Skip inappropriate pointer capture during lock and handle browser capture failure at this input boundary without breaking drag/touch ownership. Do not silently swallow unrelated exceptions. No fix was implemented.
- **Proposed target:** Owner-approved stabilization before readiness approval.
- **Verification:** Real Chrome two-click repro, locked mouse movement, Escape, unlocked drag, touch capture/cancel and focused regression test.

### UI-01 — HUD layout overlaps reachable controls

- **Affected phase / category:** Phases 4/7 responsive HUD; P2 bug.
- **Files / components:** `WorldHud.tsx:523` MovementGuide; `styles/world.css:208` corner anchor, touch rules near 958, and responsive/short-height overrides at 1098–1266.
- **Current behavior:** At 1024 × 768 touch emulation, the expanded guide covers toolbar controls and Env/Debug. At 844 × 390 the collapsed Controls button covers Specs/fullscreen. DOM center-hit checks and inspected screenshots agree.
- **Expected behavior:** Toolbar controls remain reachable without an unrelated panel obscuring them.
- **Reproduction:** Load with touch enabled at those exact sizes; retain default panel states. See [tablet landscape](docs/audit/phase-11/evidence/viewport-1024x768.png) and [mobile landscape](docs/audit/phase-11/evidence/viewport-844x390.png).
- **Root cause:** Fixed corner anchors and content heights share screen space without a sufficient shared layout budget.
- **Impact:** Secondary controls become obscured; collapsing/adjusting panels provides a workaround. No redesign was performed.
- **Recommended fix / target:** Adjust responsive panel defaults/geometry and reserves within existing design after approval, before release.
- **Verification:** All six viewport sizes, both locales, expanded/compact states, touch controls and center-hit visibility checks.

### UI-02 — Small functional text and touch targets

- **Affected phase / category:** HUD readability and ergonomics; P3 debt.
- **File / component:** `styles/world.css`, compact/mobile panel and typography rules; WorldHud.
- **Behavior / evidence:** Impeccable detector found visible 8–10 px labels, confirmed in landscape screenshot/CSS. At 390 × 844 one measured button dimension was below 24 px. Larger controls still often fall below the 44 px ergonomic target.
- **Expected / impact:** Readable text and comfortably operable controls on small physical displays. This is not an assertion of WCAG failure based solely on pixel font size; WCAG has no universal minimum font size, and target-spacing exceptions need separate review.
- **Reproduction / root cause:** Load small viewports and inspect computed text/target geometry; dense fixed HUD styles reduce both.
- **Recommendation / target / verification:** Approved text/target review, physical device usability and contrast/spacing checks; P3 UI maintenance.

### Scoped UI audit score

Implementation integrity: coherent product-specific synthetic explorer with clear geographic limitations and locale support. Not a substitute for formal conformance testing.

| Dimension | Score / 4 | Main evidence |
|---|---:|---|
| Accessibility | 2 | Keyboard/dialog/input paths work; small text/targets, complete contrast audit unavailable |
| Performance | 1 | Measured desktop target miss |
| Theming | 3 | Consistent scoped dark semantic tokens; fixed dark world is intentional |
| Responsive | 2 | No document overflow at six sizes, but confirmed control overlap |
| Implementation integrity | 3 | Actual scene and observed data; no decorative fake controls |
| Total | 11 / 20 | Scoped acceptable foundation with significant work remaining |

[ui-detector.json](docs/audit/phase-11/evidence/ui-detector.json) is a heuristic scan, not a WCAG verdict. Complete text contrast against translucent WebGL backgrounds, screen-reader operation and physical motor-accessibility testing are NOT VERIFIED. Recommended future sequence: `$impeccable harden` for input/error paths, `$impeccable adapt` for layout/targets, `$impeccable optimize` after profiling, then `$impeccable polish`. These are proposals, not authorization to change Phase 11 source.

### PERF-01 — Desktop target missed on audited host

- **Severity / category / affected phase:** P2 measured performance limitation; Phases 1–10 runtime.
- **File / function / line range:** `runtime/world.ts:283–448`, runtime update/render; `scene.ts:createDaNangScene`; `simulation.ts:createEnvironmentSystem`. No single source line is established as the bottleneck.
- **Current / expected behavior:** Independent 1920 × 1080 sample windows produced 16.81–25.67 FPS, below the intended stable 60 FPS / 16.67 ms budget.
- **Reproduction:** Production Chrome on the documented Intel GPU, DPR 1, same viewport/scenarios; use retained CDP measurement commands. Expect host-load variation rather than exact identical values.
- **Root cause:** NOT ESTABLISHED by timing alone. Main pass, map pass, shadows, CPU work and host contention need separate profiling. Lowering DPR cannot help below DPR 1 in the tested quality policy.
- **Impact:** Reduced interaction smoothness on this host; physical target-device performance is not established.
- **Recommendation / proposed target:** Profile before optimizing in an approved stabilization task, then repeat equivalent scenarios on agreed target hardware.
- **Verification:** Before/after frame distributions with full-pass counters, consistent hardware/load/viewpoints, and no regression in image quality or controls.

### QA-01 — Storybook warning-free gate fails on installed runtime

- **Severity / category / affected phase:** P2 tooling/readiness limitation; repository validation.
- **File / function / line range:** `package.json:scripts.build-storybook`; warning stacks/timing diagnostics in `evidence/storybook.txt`. No application source line is identified as the warning owner.
- **Current / expected behavior:** Build succeeds but emits Node DEP0205 (`module.register()` deprecation) and Vite PLUGIN_TIMINGS; repository requires zero warnings.
- **Reproduction:** Run `pnpm build-storybook` with installed Node 26.13.1 and existing dependencies. SWC cache requires the documented host permissions.
- **Root cause:** Runtime/tooling deprecation and measured Storybook transform callback cost. A supported Node 22 reproduction and dependency-owner attribution remain NOT VERIFIED.
- **Impact:** Warning-free gate fails despite usable Storybook output.
- **Recommendation / proposed target:** Rerun on supported Node 22 first; investigate remaining warning ownership in an approved maintenance task. Do not suppress warnings or upgrade packages during this audit.
- **Verification:** Supported-runtime build completes with no warnings and stories remain functional.

## 8. Phase 12 preparation — proposal only

The [detailed proposal](docs/audit/phase-11/environment-audit.md#proposed-phase-12--geospatial-core-architecture-design-only) specifies contracts, math, compatibility and tests. No Phase 12 code exists from this audit.

1. Keep a framework-independent geographic core beside world-core. Da Nang composition selects the origin; engine/controller remain city-independent.
2. Separate WGS84 geodetic degrees/ellipsoid height, ECEF meters, ENU meters, zone-local and render-local types. Version origin-dependent coordinates. Reject nonfinite/out-of-range and ambiguous units/datum inputs.
3. Use WGS84 geodetic ↔ ECEF ↔ ENU conversion with independently sourced reference vectors. Map render x = East, y = Up, z = -North in one adapter. CPU math stays double precision; GPU receives bounded local coordinates.
4. Owner must approve geographic origin, altitude datum, geographic extent and error tolerances. Existing weather coordinates are a candidate reference, not a surveyed origin. Never invent origin elevation or DEM nodata heights.
5. Version manifest coordinate contracts while preserving current synthetic manifests. Apply a nonzero zone origin exactly once. Preserve resource/catalog ownership and rollback.
6. Share a compatible surface/frame contract among terrain, player support, camera clearance, colliders and placement. Keep existing synthetic behavior as an adapter; do not prematurely ingest real terrain or imagery.
7. Derive geographic player display from authoritative local state; never feed rounded display coordinates into physics. Retain orthographic Mini Map and test axis/heading/edge/follow compatibility.
8. Validate origin-zero, cardinal directions, poles/date line, inverse convergence, independent round trips/tolerances, nonzero zones, datum mismatch, finite inputs and synthetic compatibility. Then run repository checks and the full browser regression matrix with the same hardware/settings before/after.

**Dependencies:** no additional library has been selected or installed. Pure math/native facilities may suffice for core conversion. A library choice needs numerical correctness and lifecycle justification. Dataset procurement, imagery/OSM/DEM delivery, Cesium, streaming, new providers and real landmarks remain separate later scope.

**Approval prerequisites:** clear current zero-console-error and zero-warning gates; resolve/accept each P2 limitation explicitly; obtain origin/datum/error-budget decisions; validate reference math independently; preserve historical terrain/controller/map behavior; establish target-device performance and provenance acceptance. Existing Phase 11 reports are evidence for that decision, not permission to start.

## 9. Source code integrity

Initial workspace status contained only the user's untracked `docs/prompts/PHASE_11.md`. Historical snapshot, application source, package versions, lockfile, runtime/build configuration and environment files were not edited. No code files, fake controls or dependencies were created. No commit, push, index rebuild, history rewrite or remote change was performed.

Additions are this report and documentation/evidence under `docs/audit/phase-11/`. Generated `.next` and `storybook-static` output changed while running required checks; these are ignored build artifacts. Browser instrumentation existed only in the audit browser to measure real calls/states; it did not alter repository source. The initial driver launch warning, selector failures, hidden-page attempts and expected blocked-request events remain in evidence rather than being erased.

Final tracked-diff and process-cleanup verification is recorded in [integrity.txt](docs/audit/phase-11/evidence/integrity.txt). No regression was introduced by source changes because there were no source changes; this does not erase the pre-existing defects found by the audit.

## 10. Final decision and quality gates

| Gate | Outcome |
|---|---|
| 01 Workspace/source authority | PASS: active modular entry identified; historical snapshot compared |
| 02 Static architecture and issues | Delivered: scoped source evidence and classified register; exhaustive unrelated boilerplate review not certified |
| 03 Build/preview | Build/render work; clean-console requirement FAIL due pointer capture exception |
| 04 Regression | PARTIAL: core tested paths work; cooldown regression and incomplete collision/occlusion matrix remain |
| 05 Performance/reliability | Baseline delivered; desktop target missed, whole-frame/GPU metrics unavailable |
| 06 Geographic/environment readiness | Delivered: existing seams, missing contracts, fidelity limits and prerequisites documented |
| 07 Handover | Reports/evidence delivered; owner decision pending; no automatic Phase 12 transition |

**BLOCKED – NOT READY.** Do not interpret 127 passing tests or 9/9 diagnostics as complete parity certification. Required warning-free checks and error-free normal input did not pass. Proposed remediation is limited to the documented defects and needs a separate owner instruction because the Phase 11 prompt prohibits source repairs. Physical-device, complete collision/occlusion and sustained performance proof also remain outstanding.

**Awaiting Project Owner Approval. Phase 12 remains unstarted.**
