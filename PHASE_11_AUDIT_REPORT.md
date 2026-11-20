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
| 03 Architecture audit | Section 3; [engine audit](PHASE_11_AUDIT_REPORT.md#appendix-engine-auditmd); [historical comparison](PHASE_11_AUDIT_REPORT.md#appendix-snapshot-auditmd) |
| 04 Regression test report | Section 2; [raw browser commands, results and events](docs/audit/phase-11/evidence/browser.json) |
| 05 Performance baseline | Section 4; raw measurements in browser.json |
| 06 Geospatial readiness | Section 5; [detailed readiness](PHASE_11_AUDIT_REPORT.md#geographic-readiness) |
| 07 Environmental readiness | Section 6; [coupling and trust-boundary audit](PHASE_11_AUDIT_REPORT.md#environmental-coupling) |
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
| Q-01 | `pnpm lint`: zero diagnostics | 342 files checked, no fixes or diagnostics | PASS | [lint.txt](docs/audit/phase-11/evidence/EVIDENCE.md#linttxt) |
| Q-02 | `pnpm format:check`: existing source formatted | 341 files checked, no fixes | PASS | [format-check.txt](docs/audit/phase-11/evidence/EVIDENCE.md#format-checktxt) |
| Q-03 | `pnpm type-check`: generate routes and strict types | Successful after SWC native-cache permission escalation | PASS | [type-check.txt](docs/audit/phase-11/evidence/EVIDENCE.md#type-checktxt) |
| Q-04 | `pnpm test`: existing suite | 31 files, 127 tests passed | PASS | [test.txt](docs/audit/phase-11/evidence/EVIDENCE.md#testtxt) |
| Q-05 | `pnpm build`: production routes | Build and 14 static pages completed | PASS | [build.txt](docs/audit/phase-11/evidence/EVIDENCE.md#buildtxt) |
| Q-06 | `pnpm build-storybook`: zero errors/warnings | Output built; Node DEP0205 and Vite PLUGIN_TIMINGS warnings | FAIL | [storybook.txt](docs/audit/phase-11/evidence/EVIDENCE.md#storybooktxt) |
| Q-07 | Browser console: zero uncaught errors/warnings | Reproduced pointer-capture DOMException; no claim of a clean full run | FAIL | browser.json, `pointer-lock-second-click` |

Final documentation/evidence formatting was also checked: lint checked 345 files and formatting checked 344, both with zero diagnostics. See [lint-final.txt](docs/audit/phase-11/evidence/EVIDENCE.md#lint-finaltxt) and [format-check-final.txt](docs/audit/phase-11/evidence/EVIDENCE.md#format-check-finaltxt).

PowerShell wraps pnpm's stderr script banner in a `NativeCommandError` record even for successful commands. The actual process exit codes and subsequent tool diagnostics determine the check result. SWC cache sandbox failures were rerun with approved escalation; no dependency or config workaround was applied. The initial `next start` probe emitted the expected standalone-configuration warning; it was replaced with the documented standalone server. The final server's startup is in [server-standalone.txt](docs/audit/phase-11/evidence/EVIDENCE.md#server-standalonetxt).

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

All nine are isolated logic checks, not live-world integration tests. The [comparison report](PHASE_11_AUDIT_REPORT.md#appendix-snapshot-auditmd) enumerates their exact assertions and gaps. DIAG-01 checks timezone; 02 solar bounds/phases; 03 WMO mappings; 04 the historical permissive sanitizer; 05 joystick limits; 06 guide selection; 07 map zoom/span; 08 analytical projection/heading; 09 an isolated registry and supplied occlusion boolean. DIAG-04 does **not** test the strict live schema. DIAG-09 does **not** test the scene's blocker mesh list, pointer lock or the UI cooldown fallback. The diagnostic registry uses isolated resources and disposes them; it does not change live fixture activation.

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

Potential issues are distinguished from observed bugs in [engine-audit.md](PHASE_11_AUDIT_REPORT.md#appendix-engine-auditmd). No dead-code purge, architecture rewrite, ownership migration, dependency change or optimization was made.

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
- **File / function / line range:** `package.json:scripts.build-storybook`; warning stacks/timing diagnostics in `docs/audit/phase-11/evidence/EVIDENCE.md#storybooktxt`. No application source line is identified as the warning owner.
- **Current / expected behavior:** Build succeeds but emits Node DEP0205 (`module.register()` deprecation) and Vite PLUGIN_TIMINGS; repository requires zero warnings.
- **Reproduction:** Run `pnpm build-storybook` with installed Node 26.13.1 and existing dependencies. SWC cache requires the documented host permissions.
- **Root cause:** Runtime/tooling deprecation and measured Storybook transform callback cost. A supported Node 22 reproduction and dependency-owner attribution remain NOT VERIFIED.
- **Impact:** Warning-free gate fails despite usable Storybook output.
- **Recommendation / proposed target:** Rerun on supported Node 22 first; investigate remaining warning ownership in an approved maintenance task. Do not suppress warnings or upgrade packages during this audit.
- **Verification:** Supported-runtime build completes with no warnings and stories remain functional.

## 8. Phase 12 preparation — proposal only

The [detailed proposal](PHASE_11_AUDIT_REPORT.md#proposed-phase-12--geospatial-core-architecture-design-only) specifies contracts, math, compatibility and tests. No Phase 12 code exists from this audit.

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

Final tracked-diff and process-cleanup verification is recorded in [integrity.txt](docs/audit/phase-11/evidence/EVIDENCE.md#integritytxt). No regression was introduced by source changes because there were no source changes; this does not erase the pre-existing defects found by the audit.

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

---

## Appendix: engine-audit.md

Merged from docs/audit/phase-11/engine-audit.md on 2026-11-20 — file removed as part of Option A docs consolidation.

## Phase 11 engine, runtime, and resource audit

Audit scope: active `src/engine`, `src/modules/WorldExplorer/runtime/world.ts`, `src/world-core`, `src/world-assets`, their composition in `src/worlds/danang/scene.ts`, and associated tests. Static review only. Browser execution and check results belong to the main audit. No runtime behavior is marked PASS here.

### Architecture inventory

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

### Lifecycle and ownership evidence

- `EngineRuntime.start()` guards duplicate starts; `stop()` cancels the outstanding handle and clears timing. Updates catch errors and stop scheduling. Disposing systems continues after individual system cleanup failures (`runtime.ts:29-79`).
- World pause combines document visibility, pagehide/pageshow, context loss, and terminal runtime failure. Pause releases input; resume resets first-frame timing (`world.ts:461-503`). Modal blocking releases input and stops player velocity while atmosphere/rendering continue (`world.ts:510-517`).
- World teardown removes its registered listeners and observer, then disposes runtime systems. Scene registry clears before `ResourceScope.dispose()` (`world.ts:450-453,553-565`). React effect cleanup invalidates the generation before disposal (`useWorldExplorer.ts:155-165`).
- Scope owns renderer before scene assets, so reverse teardown releases scene assets before renderer. Scope owns textures, geometry, materials, directional-light shadow, and the grass `InstancedMesh` before scene attachment (`scene.ts:182-195,205-219,265-278,638-674`).
- Rocks have one catalog-owned geometry/material; zone handles detach meshes without disposing shared assets. Zone handle is registered after catalog, so zone disposal precedes catalog disposal (`scene.ts:414-417`; `synthetic-rock.ts:14-40`). Borrowed stone texture is owned by outer scene scope.
- Renderer disposal resets Three.js state, disposes renderer caches, and releases context in a microtask only when that canvas has no replacement renderer. This explicitly accounts for synchronous Strict Mode reuse (`webgl.ts:69-87`). Browser-level confirmation remains NOT VERIFIED.

### Renderer state restoration and context limits

Overview capture saves render target, viewport, scissor, and scissor-test state, then restores them in `finally` (`webgl.ts:34-58`). Scene-side overview capture independently saves/restores fog, hidden-object visibility, ambient intensity, and hemisphere intensity in `finally` (`world.ts:251-281`). This prevents an overview exception from leaving the main view in map mode. Overview capture failure degrades `mapStatus` to `unavailable`; main rendering continues.

Context loss calls `preventDefault()`, stops RAF, and releases controls. Restore marks map dirty, resizes, announces ready, and resumes (`world.ts:473-484`). Scene CPU objects remain present, allowing Three.js to re-upload geometry/material/texture resources after native restoration. The installed Three.js renderer has its own `onContextRestore` initialization (`node_modules/three/src/renderers/WebGLRenderer.js:1119-1145`). Application restore does not recreate the renderer or reconstruct the world, and does not verify a successful rendered frame before announcing ready. A dispatched DOM event with a mocked renderer proves scheduling only. Actual GPU restoration, re-uploaded shader programs/textures/shadows, repeated loss, and restore failure remain NOT VERIFIED.

No P0/P1 defect is established by this static review. This is not proof that none exists at runtime.

### Findings

#### ENG-01 — Long active frames disappear from performance telemetry

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

#### ENG-02 — Draw-call telemetry excludes the minimap pass

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

#### ENG-03 — Interaction occlusion considers terrain only

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

#### ENG-04 — Exception safety stops at the outer world cleanup loop

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

### Hot paths and measurement limits

- Controller preallocates vectors and injects reusable collision output (`controller.ts:19-22`; `world.ts:136-145`). Runtime also reuses raycasters, hit arrays, vectors, and minimap projection output (`world.ts:125-137`).
- Target selection runs at most every 50 ms, but allocates registry candidate arrays, `getAll()` arrays on fallback, eligibility/target objects, and ray intersections. It also updates scene matrices before raycasts (`world.ts:201-249`; `registry.ts:83-97`). With three fixtures this is bounded; city-scale cost is NOT MEASURED.
- Overview capture allocates hidden/visibility arrays per capture. Overview mode requests a pass each 2500 ms; follow mode each 50 ms. Return-to-overview movement can also request 50 ms captures (`world.ts:251-261,352-375`). The pass redraws the scene with a second camera and may regenerate shadows.
- HUD snapshots run at 100 ms cadence. Typed-array `slice()` creates a new sorted sample, and snapshots copy performance/target objects (`world.ts:393-447`). The typed-array sort is numeric; no lexicographic-sort defect was found.
- Footstep dust pools 24 meshes/velocities and reuses them (`dust.ts:11-69`). Grass uses one `InstancedMesh` for up to 2600 blades (`scene.ts:628-674`). Trees/cloud puffs/shrubs remain individual meshes. There is no city streaming, visibility partition, asset LOD implementation, or broad-phase interaction structure in this scope; those are future expansion work, not current regressions.
- `jsHeapUsedMb` starts `null` and is never populated by the world telemetry (`world.ts:44-55,426-432`). GPU memory bytes, CPU/GPU render time, long tasks, asset download sizes, and long-session memory trend are NOT AVAILABLE from this instrumentation. Geometry/texture counts are counts, not byte estimates.
- FPS is computed from the reciprocal of the mean of up to 60 frame intervals, and p95 from the sorted ring. Samples span approximately one second at 60 FPS, longer at lower FPS. This is a short rolling estimate, not a sustained baseline. Quality changes DPR and rain density only (`world.ts:413-423`), while antialiasing, shadow resolution, and most geometry remain unchanged.
- Scene star, rain, grass, and texture generation use randomness. Reinitialization changes exact geometry/particles, so benchmark runs should disclose this variability (`scene.ts:69-75,170-179,651-664`). No seeded data was added for this audit.

### Tests inspected, not executed by this sub-audit

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

### Future scope boundaries

Manifest origins/bounds/provenance are validated metadata. `PrefabRegistry` passes element/prefab to factories and does not apply zone origin; the rock factory uses element-local transforms directly. Existing zone origin is zero. A nonzero zone-origin coordinate contract, ENU/WGS84 conversion, rebasing, streaming budgets, mesh/collider synchronization, geospatial precision, and asset LOD behavior require Phase 12 design. None is implemented or implied by current manifest validation.

Conclusion for this scope: static separation and ownership are identifiable; identified medium issues affect telemetry fidelity and occlusion completeness. Runtime stability, native context recovery, sustained performance, and GPU/resource trends remain NOT VERIFIED until main audit evidence is attached.

### Follow-up: collision, animation, and allocation boundaries

#### ENG-05 — Cylinder collision does not use finite vertical extent

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

---

## Appendix: environment-audit.md

Merged from docs/audit/phase-11/environment-audit.md on 2026-11-20 — file removed as part of Option A docs consolidation.

## Phase 11: geospatial and environmental audit

### Evidence scope

This is a static source audit of the current application, not the archived Phase 10 application. CodeGraph returned current line-numbered source; direct reads filled only omitted anonymous runtime sections. No runtime, browser, live provider, test, or performance PASS is claimed here. The coordinating report owns executed checks and browser observations. No application source, dependency, configuration, or historical file was changed by this audit.

### Source of truth and current world

The application composes `createWorldRuntime` in `src/modules/WorldExplorer/runtime/world.ts:86`; it creates the renderer, `createDaNangScene`, and `createEnvironmentSystem` at lines 112–115. The engine controller receives the synthetic elevation/support/collision functions at lines 138–145. Generic engine code receives these world policies as dependencies.

| Current item | Actual representation | Evidence |
|---|---|---|
| World origin | Synthetic plaza at `[0,0,0]`, not a surveyed geographic origin | `src/worlds/danang/zones/manifest.ts:37–39`; `src/worlds/danang/scene.ts:283–305` |
| Local X/Z and scale | Local meter convention; X east and negative Z north in sun/wind direction mappings | `src/worlds/danang/environment/solar.ts:163–168`; `src/worlds/danang/environment/simulation.ts:246–249`; `src/world-core/schemas/manifest.ts:25,53` |
| Terrain elevation | Trigonometric hills, flattened spawn, synthetic outer rim | `src/worlds/danang/zones/synthetic.ts:getTerrainElevation`, lines 43–48 |
| Terrain mesh | 180 m square, 128 segments per side; vertices sample the synthetic function | `src/worlds/danang/scene.ts:223–240` |
| Boundary | 68 m radius passed to character controller | `src/engine/core/const.ts:44`; `runtime/world.ts:138–142` |
| Plaza and trail | Procedural cylinders/rings and sine-path stepping stones | `scene.ts:283–325` |
| Buildings/structures | Five synthetic stepped box platforms and origin fixtures; no city buildings inferred | `zones/synthetic.ts:3–9`; `scene.ts:382–411,534` |
| Trees and vegetation | Fixed collider positions, procedural crowns, shrubs and instanced grass | `zones/synthetic.ts:22–41`; `scene.ts:419–531`; `environment/simulation.ts:331–357` |
| Colliders | Boxes and cylinders in local meters; synthetic support height | `zones/synthetic.ts:51–109` |
| Player position | Mutable Three.js local Vector3, emitted as x/y/z snapshot | `runtime/world.ts:30–35,433–445` |
| Mini Map | Orthographic local scene overview with local x/z projection, zoom and follow center | `runtime/world.ts:251–281,352–391`; `src/engine/core/const.ts:46–57` |
| Real-world references | Fixed Da Nang latitude 16.0544, longitude 108.2022, time zone; used for solar/weather queries | `src/worlds/danang/const.ts:1–10`; `weather/service.ts:6–31`; `environment/solar.ts:128–130` |
| Verified geographic assets | None established by this evidence. The one manifest source explicitly has confidence S and null CRS/datum/date/accuracy | `zones/manifest.ts:5–18` |

The city's name and weather location do not georeference any terrain, collider, road, fixture, or vegetation object.

### Geographic readiness

| Category | Existing capability | Missing prerequisite / risk | Assessment |
|---|---|---|---|
| Coordinate System / WGS84 | Latitude/longitude constants for weather and sun | No WGS84-to-ECEF-to-ENU or inverse contract; no altitude datum or geographic origin record | Missing geospatial core |
| Local ENU / origin | Meter convention, Y up, north aligned to negative Z in atmosphere | No typed ENU space, explicit render mapping, origin version, zone transform or rebasing protocol | Partial foundation |
| Scale | Manifest assets specify meters; speeds and dimensions use local meter convention | No imported-asset normalization or survey calibration proof | Implemented convention; external accuracy NOT VERIFIED |
| Elevation | Shared height callback used by mesh, player and camera | No DEM sampling, nodata policy, resolution, vertical datum or height interpolation contract | Synthetic only |
| Terrain | Height function can be supplied to the controller | City scene and camera still import concrete synthetic sampling; no tiled surface provider or datum integration | Partial seam, not real terrain ready |
| Buildings | Prefab/element transform schema and factory seam | No footprints, polygon holes, semantic height, levels, roof, source CRS or building dataset | Missing |
| Roads | Synthetic footpath | No GIS centerlines, topology, widths, grade, intersection or bridge elevation policies | Missing |
| Coastline / rivers / bridges | No georeferenced representation established | Survey/source data, hydrography, water level datum, bridge support and clearance | Missing |
| Landmarks / POIs | Interactable test fixtures | No verified landmark assets or geographic POI identifiers and placement | Missing |
| Vegetation | Procedural trees and grass | No geographically referenced species/placement dataset or accuracy record | Synthetic only |
| Satellite | Procedural grass/stone textures | No georeferenced imagery, CRS, pixel resolution, acquisition/coverage metadata, ground control points or alignment verification | Missing |
| Streaming | `PrefabRegistry.loadZone` validates and returns disposable instance handles with rollback | Synchronous eager zone creation only; no spatial loading policy, async cancellation, budgets, eviction or origin transforms | Partial foundation |
| Accuracy | Provenance supports nullable accuracy/confidence/verification dates | Current source has null accuracy and verification; no control-point residual or dimension audit | Not established |
| Provenance | Strict source/license/CRS/datum/date/confidence schema with referential integrity | Coverage currently only synthetic rock instances; remaining procedural scene lacks manifest provenance; asset URI is not proof of a loaded or licensed asset | Partial foundation |

Schema evidence: `src/world-core/schemas/manifest.ts:6–26,39–98`. Zone creation/rollback/disposal evidence: `src/world-core/registries/prefabs.ts:18–52`. Current zone selection is eager at `scene.ts:414–417`.

Technology compatibility is prospective: OSM can provide road/building inputs after license and transform rules; licensed imagery needs georeferencing and permitted delivery; Copernicus DEM needs sampling/nodata/vertical-datum decisions; Cesium terrain/3D Tiles needs a format/coordinate/streaming adapter and memory budget; photogrammetry/LiDAR needs source CRS, survey control, scale and decimation; GLB needs units, axis, transform, compression and ownership policies. None is installed or integrated by this audit. A later phase must select data and tools explicitly.

### Environmental coupling

Every implemented row below is source-inspected only. “Implemented but Not Verified” means runtime visual behavior and physical accuracy were not verified here.

| Interaction | Status | Actual connection and limit | Evidence |
|---|---|---|---|
| Time → Sun | Implemented but Not Verified | Da Nang date/time feeds approximate solar equation, declination/hour angle, azimuth/altitude and direction; runtime refreshes solar at 1 s cadence | `environment/solar.ts:101–223`; `runtime/world.ts:299–302` |
| Sun → Lighting | Implemented but Not Verified | Daylight/twilight drive directional, hemisphere and ambient intensity/color; exponential dt interpolation | `environment/simulation.ts:90–123,184–212` |
| Sun → Shadows | Partially Implemented | Shadow-casting directional light follows solar direction and player target, but sun height is clamped to 0.14 and switches to approximate opposite-sun moon direction at night; fixed shadow extent is not city-scale coverage | `simulation.ts:141–171`; `scene.ts:205–218` |
| Cloud → Sunlight | Partially Implemented | Global cloud percentage/category attenuates directional intensity; individual cloud geometry does not occlude sunlight physically | `simulation.ts:93–97,184–189`; `scene.ts:115–158` |
| Wind → Rain | Implemented but Not Verified | Meteorological direction is reversed to travel direction; km/h becomes m/s; rain drift and streak tilt use horizontal components | `simulation.ts:242–249,277–322` |
| Wind → Vegetation | Implemented but Not Verified | Direction rotates tree crowns/grass; weighted mean/gust speeds determine wave amplitude/frequency | `simulation.ts:325–357` |
| Wind → Clouds | Implemented but Not Verified | Horizontal drift scaled from wind speed with 0.45 minimum, wrapped around player | `simulation.ts:260–274` |
| Rain → Ground | Partially Implemented | WMO effects interpolate only terrain material roughness/metalness. No accumulation/drying model, surface classification, rain terrain impact, or platform wetness. Precipitation fallback can start particles without changing category wetness | `simulation.ts:234–237,277–280,300–312`; `mapper.ts:12–20,121–129` |
| Rain → Water | Missing | No water surface/system exists in the audited current scene; no ripple, splash or hydrology coupling | `scene.ts:createDaNangScene`; `simulation.ts:createEnvironmentSystem` |
| Weather → Visibility | Partially Implemented | WMO category drives exponential fog density; no measured visibility field is requested or validated | `simulation.ts:214–222`; `weather/service.ts:10–23` |
| Weather → Lighting | Implemented but Not Verified | Category effects and cover drive sky color, intensity, stars, moon opacity and occasional lightning flashes | `simulation.ts:99–130,149–212` |

#### Cadence, wind, rain and cost

- **Clock:** HUD wall clock ticks every second and refreshes on foreground; renderer computes a separate solar snapshot at most once per second. Both call the same clock/solar helpers, but there is no shared atomic snapshot (`hooks/useWorldExplorer.ts:46–47,178–190`; `runtime/world.ts:158,299–302`).
- **Weather data:** client polls every 15 minutes only while visible; foreground refresh checks fetch age. BFF caches validated observations for 900 seconds. First request, cache reuse and cache revalidation are data events, not new observations (`hooks/useWorldExplorer.ts:216–234`; `src/app/api/weather/route.ts:4–13`; `GAME_CONFIG:41–43`).
- **Weather animation:** `environment.update(dt, now, ...)` executes each render-loop update with the most recent observation. Hidden-page/context-loss runtime stop is handled separately. Frame updates do not refetch meteorological data (`runtime/world.ts:342,461–485`).
- **Wind vector:** horizontal travel vector is computed locally from meteorological bearing; there is no vertical wind, spatial field, turbulence or height profile (`simulation.ts:242–249`).
- **Gusts:** vegetation uses `0.7 * windSpeed + 0.3 * windGusts`; this is a visual mean/gust blend, not a time-varying observed gust event. Cloud/rain drift use mean speed (`simulation.ts:260,286–287,325–329`).
- **Clouds:** 24 procedural clusters with 4–6 puff meshes each; shared geometry/material. Player-relative wrapping is visual atmosphere, not meteorological advection volume (`scene.ts:115–158`; `simulation.ts:263–274`).
- **Rain:** one line-segment buffer preallocates 3,200 drops, category controls count/fall speed; quality reduces active count. CPU updates six float components per active drop each frame. Drop heights wrap relative to player instead of terrain, roofs or platforms (`scene.ts:160–195`; `simulation.ts:277–322`; `runtime/world.ts:416–423`).
- **Vegetation:** tree crowns update every frame; grass updates alternating batches inside 32 m and uploads instance matrices when changed (`simulation.ts:331–357`). Vegetation is visual; wind does not affect player motion or collision.
- **Wet surfaces:** terrain-only global roughness/metalness target changes smoothly using `1-exp(-3.5*dt)`. Wetness is category-derived, not measured soil moisture; no wet friction (`simulation.ts:115,234–237`).
- **Lighting:** colors/intensities interpolate at frame cadence. Light position and sun disc direction update from 1 s solar samples; low-sun clamp is an artistic stability approximation. Moon is the opposite sun direction with a minimum elevation, not a lunar ephemeris (`simulation.ts:132–171`).
- **Physics coupling:** controller receives terrain/collision policy and fixed physics constants, not weather. No wind force, precipitation friction, flooding or foliage collider deformation (`runtime/world.ts:138–145,303,342`; `src/engine/core/const.ts:3–17`). This is a missing future physical feature, not an established Phase 1–10 regression.
- **Performance cost:** bounded particle allocation, shared cloud resources and grass batching are visible optimizations. CPU/GPU time, draw calls attributable to environment, GPU memory, FPS and frame time are **NOT AVAILABLE** from static evidence. They must be measured in the coordinating runtime baseline.

### Weather trust boundary and lifecycle

| Concern | Static behavior / limit | Evidence |
|---|---|---|
| Fixed upstream / SSRF | Fixed HTTPS Open-Meteo URL, fixed Da Nang location/query; BFF rejects every query string; redirects rejected | `weather/service.ts:6–31`; `weather/provider.ts:5–15`; `api/weather/route.ts:6–11` |
| Secrets | This path needs no API key and accepts no credentials or user-selected backend | Same source |
| Timeout and payload bounds | Provider aborts after 10 s; checks content length and streamed 256 KiB bound; reader lock and timer cleaned | `weather/provider.ts:4,7–45` |
| Non-2xx / empty / invalid JSON | Throws; BFF returns 502 unavailable; no fabricated observation emitted | `provider.ts:16–43`; `route.ts:14–18` |
| Missing / NaN / Infinity / ranges | Zod requires all current numeric fields, finite numbers, explicit ranges, supported integral WMO codes and binary is_day before historical normalizer | `weather/validation.ts:4–39` |
| Optional sunrise/sunset | Optional arrays; missing values format as `--:--`; calculated sun remains separate | `validation.ts:28–30`; `service.ts:84–109` |
| Stale data | Age uses older of fetch and observation timestamp, threshold 25 minutes; failure retains previous reading but marks stale; 1 s clock effect also ages existing values | `weather/freshness.ts:4–9`; `hooks/useWorldExplorer.ts:199–213,235–245` |
| Cache timestamp integrity | Only normalized results cached; original fetch/observation timestamps survive cache reuse; HTTP response itself no-store | `route.ts:4–13` |
| Retry | Three attempts total, each 10 s, delays 1 s then 2 s, abort-aware wait; no status-specific retry distinction | `weather/client.ts:5–36` |
| Duplicate / race handling | Every refresh aborts previous controller; post-fetch/post-error abort checks suppress replaced result; unmount clears poll and aborts request | `hooks/useWorldExplorer.ts:191–234` |
| Renderer binding lifecycle | Runtime generation guard suppresses old snapshot/status callbacks; cleanup clears refs and disposes old instance | `hooks/useWorldExplorer.ts:132–177` |
| Weather unavailable UI | Null reading renders unavailable/loading label and the no-observation temperature placeholder; expanded widget exposes error/retry. Compact retains icon/time/temperature placeholder | `WorldHud.tsx:246–330` |
| WebGL lifecycle | Renderer context loss stops loop; restore resizes/restarts; runtime hook classifies initialization failure. Browser recovery and console cleanliness remain NOT VERIFIED here | `runtime/world.ts:461–485`; `hooks/useWorldExplorer.ts:162–167` |

Existing automated test source covers field rejection, stale timestamps, optional solar values, provider URL/redirect policy, streamed size cap and provider abort (`src/integrations/weather/__tests__/weather.test.ts:26–91`). Reading tests is not executing them. It does not prove browser fetch sequencing, production cache revalidation, current provider reachability or all lifecycle/error branches.

### Findings and remediation proposals

No P0/P1 defect is established by this static sub-audit. This is not a runtime stability claim.

#### ENV-01 — BFF response has only partial client runtime validation

- **Severity:** P2. **Category:** Technical Debt / reliability boundary gap. **Affected phase:** Current weather integration; not proven historical regression.
- **File / symbol / lines:** `src/integrations/weather/client.ts:fetchWeather:9–16`; consumers `WorldHud.tsx:72,262,347`; `environment/simulation.ts:93,96,242–249`.
- **Current behavior:** Client accepts a response if only temperature and fetch timestamp are finite and validationStatus is valid. It trusts all other fields, nested mapped/effects, timestamps and category through a TypeScript generic.
- **Expected behavior:** Any accepted serialized observation satisfies the complete normalized contract before HUD or renderer consumption.
- **Reproduction:** For a future authorized negative integration test, intercept the BFF response with the three checked fields but omit `mapped` or provide nonfinite wind data. The check admits it; consumers dereference `mapped.category`/effects or propagate invalid numbers. No such synthetic response was injected during this audit.
- **Root cause:** Server payload validation protects the provider boundary, while the client uses an unchecked nominal type for the distinct serialized BFF boundary.
- **Impact:** Contract drift, corrupted proxy/cache responses or a future route regression can break UI/rendering instead of reporting unavailable weather. Current valid BFF output is not shown to fail.
- **Recommended fix:** Reuse a shared complete normalized-observation validator without reintroducing historical fallback values; reject malformed nested data and preserve prior stale observation.
- **Proposed target phase:** Owner-approved maintenance before expanding provider contracts, or early subsequent reliability work. Do not implement during Phase 11.
- **Verification method:** Negative boundary tests for missing/nested/malformed fields, plus browser error-state and race tests. Current runtime manifestation: NOT VERIFIED.

#### ENV-02 — Calendar dates are shape-checked, not strictly validated

- **Severity:** P3. **Category:** Technical Debt / validation gap. **Affected phase:** Current strict live validation.
- **File / symbol / lines:** `src/integrations/weather/validation.ts:localTime:8`, `normalizeLiveWeather:33–39`.
- **Current behavior:** Time regex accepts any two-digit calendar parts, then Date.parse checks finiteness and future time. JavaScript may normalize impossible dates such as February 30 into March. Daily times are only shape-checked and formatted by slicing.
- **Expected behavior:** Accepted observation date represents exactly the supplied local calendar timestamp; impossible daily times are rejected or explicitly unavailable.
- **Reproduction:** A future authorized validator test should use an impossible day for a past month with otherwise valid fields and compare parsed date components to input. No fixture response was created or served in this audit.
- **Root cause:** Regex validates shape; Date.parse is not a strict calendar round-trip validator.
- **Impact:** A malformed upstream timestamp can appear valid or have misleading freshness; no real upstream malformed date observed.
- **Recommended fix / target:** Strict component/calendar validation and timezone conversion tests in later reliability work; retain current failure behavior and do not fabricate a replacement date.
- **Verification method:** Leap/nonleap February, month/day/hour bounds, future tolerance and daily timestamp tests. Runtime occurrence: NOT VERIFIED.

#### ENV-03 — Visual atmosphere is not a physical environmental model

- **Severity:** INFO. **Category:** Missing Feature / future enhancement. **Affected phase:** Future environment work, not a demonstrated Phase 1–10 bug.
- **File / symbol / lines:** `createEnvironmentSystem`, `simulation.ts:234–237,260,277–357`; `runtime/world.ts:138–145,303,342`.
- **Current behavior:** Ground wetness is category-based material interpolation; rain wraps relative to player; clouds have minimum drift; gust affects vegetation blend; no water/physics coupling.
- **Expected future behavior:** Clearly separate observed meteorology from visual policy and any validated physical dynamics.
- **Reproduction:** Static call/data-flow inspection demonstrates these limits; visual appearance, terrain penetration and cost still need runtime observation.
- **Root cause:** Current system is a bounded synthetic visual prototype.
- **Impact:** Unsuitable for claims of measured hydrology, soil wetness, building shelter or citywide meteorology.
- **Recommended fix / target:** Preserve current behavior, document fidelity, then scope terrain/roof rain contacts, wetness persistence and water response only after geospatial terrain and product requirements exist; proposed Phase 13–20 environmental follow-on.
- **Verification method:** Later acceptance scenarios with real observations, ground/roof geometry and physical-unit budgets. Current runtime status: NOT VERIFIED.

#### GEO-01 — Synthetic coordinate contract cannot ingest geographic zones

- **Severity:** INFO. **Category:** Missing Feature / Phase 12 prerequisite.
- **File / symbol / lines:** `zoneSchema`, `src/world-core/schemas/manifest.ts:50–59`; `syntheticManifest`, `zones/manifest.ts:35–39`; terrain/controller references above.
- **Current behavior:** Schema permits only `synthetic-local-meters`; zone origin is metadata and loader passes element transforms directly to factories. No geographic conversion is called.
- **Expected future behavior:** Explicit coordinate and origin contracts translate validated geographic inputs to local rendering coordinates once.
- **Reproduction / root cause:** Static schema rejects a geographic coordinateSpace; loader iterates elements without applying origin (`registries/prefabs.ts:18–42`). Existing zero origin avoids a current placement defect.
- **Impact:** Geographic data cannot safely be inserted as lat/lon, ECEF coordinates or nonzero-origin zone data.
- **Recommended fix / target:** Phase 12 core design below; retain synthetic mode as a separate compatibility adapter.
- **Verification method:** Round-trip, axis, origin and nonzero-zone placement tests plus unchanged synthetic regression suite. No Phase 12 implementation performed.

### Proposed Phase 12 — Geospatial Core Architecture (design only)

#### Scope and invariants

Build only coordinate contracts, pure conversions, origin records and adapters to the existing runtime. Keep synthetic Phase 1–10 placement and behavior. Do not acquire/render city datasets, add map engines, introduce a second weather/clock system, replace the controller, or implement streaming/terrain production in Phase 12. Owner approval is required before implementation.

#### Architecture and coordinate decisions

1. Add a framework-independent geospatial core beside the existing world-core seams. Pure math must not import React, Next.js or Da Nang content. Da Nang composition selects its origin and supplies adapters.
2. Define distinct types for WGS84 geodetic degrees plus ellipsoid height in meters, ECEF meters, ENU meters, render-local meters and zone-local meters. Include origin ID/version where a coordinate depends on a frame. Reject ambiguous untagged tuples at public boundaries.
3. Use WGS84 ellipsoid constants explicitly: semi-major axis 6,378,137 m and flattening 1/298.257223563. Convert geodetic to ECEF, subtract origin ECEF in double precision, then rotate to ENU. Provide the inverse using a documented convergence/edge policy. Avoid flat degrees-to-meters approximations for the authoritative conversion.
4. Keep renderer axes compatible: render x = East, y = Up, z = -North. A named adapter owns this mapping; do not scatter sign changes across minimap, weather or controller code. Existing solar/wind signs must remain consistent.
5. Start with one fixed, versioned origin chosen and documented by the owner. The existing weather coordinate is only a candidate reference; do not claim it is surveyed or assign invented altitude. Record source, WGS84 latitude/longitude and ellipsoid height, CRS, vertical datum and validation date/confidence. If authoritative origin height is unavailable, label the mode unverified and keep real terrain ingestion blocked.
6. Use double precision for CPU geodetic/ECEF/ENU math; upload bounded local floats to GPU. Specify supported world extent and numeric error budget before implementation. Evaluate rebasing as a future design, not an automatic Phase 12 feature. Never write city-scale ECEF values directly to mesh Float32 buffers.
7. Evolve manifest coordinateSpace as a versioned discriminated contract preserving existing version-1 synthetic data. Geographic and ENU zones require matching origin IDs and explicit bounds; zone origin transforms apply exactly once. Maintain separate source/provenance metadata and runtime placement transforms.

#### Terrain, player and map compatibility

- Introduce a narrow surface-sampling contract capable of `height`, validity/nodata, normal and source/frame metadata. Adapt the existing mathematical terrain first. Renderer, player support, camera clearance and placement must use the same sampling/frame conversion. No automatic elevation-zero fallback for missing DEM.
- Decide ellipsoid-versus-orthometric heights before importing any DEM. Require declared datum and an approved geoid transformation when needed. A terrain adapter may remain absent in Phase 12; coordinate compatibility does not mean surveyed terrain is available.
- Keep the controller authoritative in render-local meters. Derive geographic player coordinates from a versioned origin snapshot for display/integration; do not feed rounded geographic UI values back into physics each frame. Reset, teleport and future zone transfers must convert once, atomically.
- Preserve current orthographic Mini Map capture. Convert authoritative ENU positions into the same render frame before projecting. Validate four cardinal directions, heading, camera bounds, follow/overview, zoom and edge clipping. Future satellite alignment requires CRS/geotransform metadata and control points and remains separate.
- Define integration units for bearings, radians/degrees, elapsed seconds, km/h, m/s and heights. Keep the current weather provider fixed to its existing location in Phase 12 unless a separately authorized product change requires otherwise.

#### Validation and test plan

| Test group | Required cases and evidence |
|---|---|
| Input boundary | Finite numeric values only; latitude [-90,90], explicit longitude wrap/reject policy, declared altitude units/datum, invalid/missing origin IDs, no unknown coordinate spaces |
| WGS84 ↔ ECEF | Independently sourced equator/pole/reference vectors; both hemispheres; date line; altitude extremes; inverse convergence and unsupported center-of-earth input |
| ECEF ↔ ENU | Origin maps to zero; orthonormal basis; positive east/north/up; inverse round trips; independently reviewed tolerances |
| Precision | Round-trip bounds across declared Da Nang extent, near origin and zone edges; assess CPU error and GPU local float precision separately |
| Render adapter | x=E/y=U/z=-N; heading and wind/solar cardinal signs; no double conversion |
| Zones | Nonzero zone origin, inter-zone continuity, mismatched origin versions, bounds and provenance validation; version-1 synthetic manifest unchanged |
| Terrain contract | Same height in render mesh, support, camera and placement; declared nodata behavior; datum mismatch rejection; seam continuity |
| Player | Spawn/reset, walk/run/jump/collision and teleport retain local behavior; geodetic readout round trip stays within explicit budget |
| Mini Map | Four cardinal paths, headings, overview/follow, default/min/max zoom, marker clipping and edge indicator use the same frame |
| Lifecycle | Remount/retry, disposed zone handles, aborted future input, context recovery; no extra RAF, timer, provider request or resource ownership regression |
| Regression gates | Full lint/format/types/tests; build and Storybook where required; real browser desktop/tablet/mobile, current nine diagnostics plus independent interactions/weather failure checks |
| Performance | Before/after capture on same device/scenario; coordinate conversions outside hot loops where possible; report measured FPS/frame time/draw calls/resources and unavailable GPU metrics honestly |

Acceptance requires independently reviewed numeric references/tolerances, explicit origin/datum and axis documentation, preserved synthetic compatibility, complete boundary validation, passing required checks with zero warnings, and measured browser regression evidence. No Phase 12 output is authorized by this proposal.

### Readiness conclusion for this scope

The architecture has useful seams: injected controller surface policies, disposable prefab zone instances, provenance schema, fixed weather BFF, strict upstream validation and bounded animation resources. It does not yet have a geospatial coordinate core or verified geographic assets. Environmental visuals are connected but physically approximate. Static findings do not establish P0/P1, and they do not satisfy runtime, live network, accuracy or performance gates. Final readiness remains dependent on the coordinating audit's measured evidence and explicit outstanding limitations.

---

## Appendix: snapshot-audit.md

Merged from docs/audit/phase-11/snapshot-audit.md on 2026-11-20 — file removed as part of Option A docs consolidation.

## Phase 11 historical snapshot comparison

### Scope and evidence

This is a static source audit. No source, configuration, dependency, or historical file was changed. Browser execution and repository checks are owned by the main audit and are not claimed here.

The source authority order is current runtime, current project configuration, historical Phase 10 snapshot, and historical handover. The Phase 11 directive explicitly sets this order at `docs/prompts/PHASE_11.md:77–87` and acknowledges an existing architecture may differ at lines 129–155.

Full-read coverage:

- `history/code/da_nang_3d_open_world_simulation_phase_10.tsx`: all 8,514 lines, read in contiguous numbered chunks. Coverage was 1–700 (with 538–700 repeated to recover a truncated combined tool response), 701–1300, 1301–2150, 2151–2900, 2901–3650, 3651–4450, 4451–5200, 5201–5950, 5951–6700, 6701–7450, 7451–8150, and 8151–8514. One streamed read completed through a follow-up tool poll.
- `history/conversation/da_nang_3d_open_world_master_handover_context_transfer_phase_1_to_10.md`: all 150 lines. This was the only Markdown file listed in that directory during the audit.
- `docs/prompts/PHASE_11.md`: all 1,599 lines, including an explicit UTF-8 reread in three chunks after the initial combined response was truncated.

CodeGraph was queried before current indexed code exploration. Its returned source was reused; direct reads only filled explicitly omitted portions of `runtime/world.ts` and `worlds/danang/scene.ts`. The full current scene composition, current controller, current input binding, current registry, current map projection, and all nine current diagnostics were read. This does not assert an independent full read of every current repository file.

### Architecture and historical differences

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

### Adequacy of all nine diagnostics

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

### Findings for the issue register

#### SNAP-01 — Occlusion omits solid world objects

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

#### SNAP-02 — Interaction cooldown falls through to environment toggle

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

#### SNAP-03 — Map image and marker can use different camera samples

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

#### SNAP-04 — Strict zero-allocation language exceeds implementation guarantees

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

### Remaining validation boundaries

No P0 or P1 is established by this static comparison. This is not proof that none exists. Exact visual equivalence is not claimed: the active app has different UI composition, translations, renderer shadow-map selection, and ownership/lifecycle behavior. Terrain tessellation and placements are synthetic and not surveyed city geometry. The fixed Da Nang latitude/longitude configure environmental references, not a world-to-GPS transform.

The following still require main-audit runtime evidence: all six animation states, actual platform/rock/tree collisions, boundary and terrain following, pointer lock, wheel/pinch limits, touch multi-pointer behavior, held-action release, all three fixture interactions, E/Shift+E distinction and cooldown, map marker/image agreement, main/map pass isolation, context loss/restoration, repeated mount/unmount resource growth, console cleanliness, and real performance scenarios. A 9/9 diagnostic result alone cannot satisfy any of these runtime gates.
