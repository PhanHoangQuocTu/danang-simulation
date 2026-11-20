# PHASE 12 — GEOSPATIAL CORE IMPLEMENTATION REPORT

Date: 2026-11-17, Asia/Bangkok. **Status: PARTIAL — implementation delivered; full phase acceptance is blocked.**

The active Next.js application contains working geographic conversions, an immutable Da Nang reference, read-only player telemetry and deterministic F3 diagnostics. Production Chrome rendered the updated application and exercised desktop/mobile controls. **Gemini Preview is NOT VERIFIED:** this session exposes no Gemini Preview connection or interaction tool. Local Chrome evidence does not substitute for that required gate. Storybook builds, but its inherited warnings still fail the repository's zero-warning gate.

## 1. Source authority and prerequisite baseline

- Active entry: `src/app/[locale]/page.tsx` → `src/modules/WorldExplorer/index.tsx` → ClientBoundary → WorldExplorerClient → useWorldExplorer → runtime/world.ts. This is Next.js 16.4.2 / React 19 / TypeScript 7, not the historical single-file React 18 Preview.
- The entire `docs/prompts/PHASE_12_GEOSPATIAL_CORE_MASTER_PROMPT.md` was read. The Phase 1–10 handover, historical coordinate/minimap/controller/solar/weather sections, current owners and Phase 11 audit were compared. This work does not claim a new line-by-line audit of all 8,514 historical lines or unrelated application components.
- `PHASE_11_AUDIT_REPORT.md` exists and concludes **BLOCKED – NOT READY**, with no established P0/P1. The current owner's explicit instruction authorizes Phase 12 implementation; it does not turn the earlier audit into PASS or authorize unrelated stabilization.
- Before product edits, `pnpm.cmd type-check`, the five historical helper regression tests (including DIAG-01–09), and `pnpm.cmd build` passed in this session. The initial Git status contained only the owner's untracked Phase 12 master prompt. That prompt remains untouched.
- A new before-change browser baseline was attempted but failed: sandbox CDP `Page.enable` timed out; the escalated attempt reached Chrome but `127.0.0.1` caused `ERR_TOO_MANY_REDIRECTS`. The harness switched to the previously used `localhost`, which rendered successfully. The old build had already been replaced; **a controlled before/after browser comparison is NOT VERIFIED**. Retained baseline evidence: [baseline-browser.json](docs/audit/phase-12/evidence/baseline-browser.json).

## 2. Implemented architecture and API contract

`src/engine/geospatial/core.ts` is pure TypeScript with no React, Next.js, Three.js, DOM, city or network dependency. All CPU math uses JavaScript double precision. Three.js continues receiving its existing small simulation coordinates.

| Public contract | Behavior |
|---|---|
| `validateGeodeticCoordinate(unknown)` | Asserts finite degrees and explicit ellipsoid height; latitude [-90,90], longitude [-180,180]; never clamps or invents height |
| `normalizeLongitudeDegrees(number)` | Explicit wrapping to [-180,180); both ±180 become -180; nonfinite inputs throw |
| `geodeticToEcef` / `ecefToGeodetic` | EPSG:4979 degrees/ellipsoid meters ↔ EPSG:4978 geocentric meters |
| `createGeoReference(anchor, worldOrigin?)` | Copies/freezes anchor, local world-origin offset, ECEF and trigonometric basis once |
| `ecefToEnu` / `enuToEcef` | Cached anchor-relative orthonormal basis and its transpose, all in meters |
| `enuToWorld` / `worldToEnu` | x=East, y=Up, z=-North; no origin offset in these low-level adapters |
| `geoToWorld` / `worldToGeo` | Applies/subtracts the reference's explicit worldOrigin exactly once |
| `headingToWorldYaw` / `worldYawToHeading` | Compass degrees clockwise from North ↔ character yaw radians, character forward +Z |
| `DANANG_GEO_REFERENCE` | Read-only active configuration/status export; consumers use `.reference` for conversions |

All invalid coordinate/angle inputs throw `GeospatialValidationError`. Conversion functions require a factory-created reference, checked through a private WeakSet. Missing, forged or deserialized reference objects are rejected with the same typed error; reconstruct a reference through `createGeoReference` rather than casting JSON. Weak membership does not retain discarded references.

WGS84 uses a=6378137m, inverse flattening=298.257223563 and e²=f(2-f). Inverse latitude iteration is bounded at 20 steps with a 1e-14 rad convergence criterion. Height uses normal projection, avoiding division by cos(latitude). At the polar axis, longitude conventionally becomes zero. ECEF radius below a/2 is rejected as unsupported deep interior. Geodetic height must be at least a/2-b (approximately -3,167,683.814m), so accepted anchors stay outside that inverse exclusion at every latitude. This is a surface/local-world API, not an Earth-interior solver.

The ENU basis follows [ESA Navipedia](https://gssc.esa.int/navipedia/index.php/Transformations_between_ECEF_and_ENU_coordinates). The independent numerical fixture uses the rounded geographic/geocentric example from EPSG Guidance Note 7-2, method 9602 (53°48′33.82″N, 2°7′46.38″E, h=73m; X=3771793.97m, Y=140253.34m, Z=5124304.35m). It is a fixed published reference vector, not a live external transform service call.

## 3. Anchor, orientation and integration

- One city-owned configuration reuses `DA_NANG_CONFIG.latitude/longitude` without changing weather or solar: 16.0544°, 108.2022°; ID `danang-reference-v1`, version 1.
- Status `reference-only`, `isGroundTruthVerified=false`, horizontal/vertical accuracy null. Height 0m is explicitly a mathematical reference assumption. Datum is `WGS84_ELLIPSOID`, **not MSL or measured terrain elevation**.
- Existing origin, terrain, boundary radius 68m, player physics, collision, reset, six animation states, fixtures, cameras, minimap and environment code remain authoritative. The only runtime snapshot addition is the existing character `rotationY` value.
- `useGeoTelemetry` reads the latest snapshot immediately on expanded F3 opening and then every 500ms. Closing/compacting F3 removes its timer. It never feeds derived coordinates back to physics. Unit tests verify throttling, cleanup and source-position preservation.
- F3 shows derived latitude/longitude/ellipsoid height/compass heading, the reference-only status, axes and explicit simulated-position warning in both locales. It reuses the existing bounded scrollable region. No panel, canvas, renderer or network source was added.
- DIAG-01–09 remain unchanged. GEO-01–16 are a separate deterministic suite. Compact HUD totals are dynamic (currently 25/25); geographic diagnostics expand through a native disclosure.
- North/East/South/West map to yaw π, π/2, 0, -π/2. Solar azimuth is clockwise from North and still produces x=sin(azimuth), z=-cos(azimuth). Solar/heading consistency is tested without modifying astronomy. Camera yaw is separate. Meteorological wind is FROM; its existing travel-vector convention remains untouched.
- Relative origin is a fixed mathematical offset only. No streaming, zone loading, floating-origin loop, geographic data ingestion or Phase 13 implementation was added.

## 4. Files changed

| Paths | Purpose |
|---|---|
| `src/engine/geospatial/type.ts`, `core.ts` | Geographic types, validation, cached reference and conversion API |
| `src/engine/geospatial/__tests__/core.test.ts` | Independent golden vector, edge/negative tests, exact axes, headings, numerical residual and relative-origin proof |
| `src/worlds/danang/georeference.ts` | Single immutable city reference with honest provenance/datum metadata |
| `src/modules/WorldExplorer/geospatial-diagnostics.ts` | GEO-01–16, including measured residuals and original diagnostics regression |
| `src/modules/WorldExplorer/hooks/useGeoTelemetry.ts` | Enabled-only 2Hz read-only adapter |
| `src/modules/WorldExplorer/runtime/world.ts` | Adds rotationY to existing sampled snapshot; no simulation logic change |
| `src/modules/WorldExplorer/components/WorldHud.tsx` | Existing F3 telemetry/disclosure and dynamic check denominator |
| `src/modules/WorldExplorer/components/WorldHud.stories.tsx` | Supplies rotationY in existing story snapshot |
| `src/modules/WorldExplorer/__tests__/geospatial.test.tsx`, `hud-semantics.test.tsx` | Read-only integration, solar/minimap consistency, timer cleanup, confidence labels and dynamic total |
| `src/messages/en/worldExplorer.json`, `src/messages/vi/worldExplorer.json` | Matching translated geographic labels/warnings |
| `docs/superpowers/plans/2026-11-17-phase-12.md` | Design decisions, execution plan and verification ledger |
| `docs/audit/phase-12/` | Reproducible native CDP driver, raw checks and screenshots |
| This report | Evidence, remaining gates and handoff |

Dependencies, lockfile, framework, routes, environment variables, historical source, controller, input, minimap, terrain, fixtures, solar, weather and Health implementation were not changed. No commit, push, deployment, index rebuild or remote change was performed.

## 5. Automated verification

Commands use `pnpm.cmd` because PowerShell rejects the unsigned pnpm.ps1 shim. Global RTK was attempted and denied by the sandbox; native equivalents preserved command semantics. SWC native-cache access required approved escalation for final type/build/Storybook runs; no cache-security bypass or dependency change was applied. PowerShell's stderr wrapper prints `NativeCommandError` for pnpm script banners even on successful commands; the recorded process exit code and actual tool diagnostics determine success.

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS, no lint warnings/errors | [lint.txt](docs/audit/phase-12/evidence/EVIDENCE.md#linttxt) |
| Formatting | PASS after formatting generated evidence JSON | [format-check.txt](docs/audit/phase-12/evidence/EVIDENCE.md#format-checktxt) |
| Strict types + Next route generation | PASS | [type-check.txt](docs/audit/phase-12/evidence/EVIDENCE.md#type-checktxt) |
| Complete repository suite | PASS, 33 files / 151 tests | [test.txt](docs/audit/phase-12/evidence/EVIDENCE.md#testtxt) |
| Production build | PASS, all 14 static pages generated | [build.txt](docs/audit/phase-12/evidence/EVIDENCE.md#buildtxt) |
| Storybook build | Output generated, exit 0; **zero-warning gate FAIL** | [storybook.txt](docs/audit/phase-12/evidence/EVIDENCE.md#storybooktxt) |
| Focused geographic suites | PASS, 23 tests | [geospatial.txt](docs/audit/phase-12/evidence/EVIDENCE.md#geospatialtxt) |

Storybook still emits Node 26 DEP0205 (`module.register()` deprecation) and Vite `PLUGIN_TIMINGS`, matching the earlier audit. Host Node is 26.13.1; supported Node 22 rerun is **NOT VERIFIED**. Warnings were not suppressed.

Initial geographic tests failed because the implementation/imports did not exist. The dynamic-total test failed against the old 9/9 HUD. Review reproduced malformed-reference TypeError; a regression test failed, then passed after factory-reference validation. The reviewer also identified the deep-interior domain mismatch; forward validation now excludes anchors that could violate the inverse origin contract. A later solar consistency test passes against unchanged astronomy.

### GEO-01–16 actual results

| ID | Check | Actual result |
|---|---|---|
| 01 | Anchor maps to origin | PASS, 0m residual |
| 02 | World origin inverse | PASS, 6.780130685568339e-9m ECEF residual |
| 03 | Independent EPSG vector | PASS, 0.0030970181388314585m residual; threshold 0.01m against rounded reference |
| 04 | ECEF/ENU inverse | PASS, 2.0372681319713593e-10m residual |
| 05 | ENU/world axes | PASS; exact signed-axis unit assertions |
| 06 | East | PASS, X=10.700537735483234m |
| 07 | North | PASS, Z=-11.065924930947537m |
| 08 | Vertical | PASS, Y=10.00000000020203m for +10m |
| 09 | Heading | PASS, N/E/S/W and -90/360/450 normalization |
| 10 | Mini Map | PASS, East right / North up; all four headings agree |
| 11 | World/geo inverse | PASS, maximum 9.18977803700484e-9m across 175 points within 5km; threshold 0.01m |
| 12 | Invalid input | PASS; runtime diagnostic 5/5; unit tests also cover missing/null/NaN/Infinity, malformed references/origins, vectors and angles |
| 13 | Date line | PASS, ±180 canonicalize to -180 |
| 14 | Poles | PASS, polar height residual 0m; both poles/near-poles and southern hemisphere covered |
| 15 | Datum/confidence | PASS, reference-only / assumed ellipsoid height / unknown accuracy |
| 16 | Original diagnostics | PASS, all nine unchanged checks |

Additional unit proof covers negative height, valid zero latitude/longitude, millimeter offsets, copied/frozen nonzero relative origins and solar/cardinal agreement. Numerical precision is not geographic survey accuracy.

## 6. Actual browser review

Method: production standalone build, installed Chrome headless with native CDP, real WebGL and real input dispatch. No browser/test dependency was installed. No weather payload, fake geographic observation, controller teleport or application test control was introduced. Browser/server processes started by the driver are stopped in its finalizer.

Primary evidence: [after-browser.json](docs/audit/phase-12/evidence/after-browser.json), [fixtures-browser.json](docs/audit/phase-12/evidence/fixtures-browser.json), [fixture-sequence-browser.json](docs/audit/phase-12/evidence/fixture-sequence-browser.json). The driver is [browser-driver.cjs.txt](docs/audit/phase-12/browser-driver.cjs.txt).

| Scenario | Result / boundary |
|---|---|
| Production 1920×1080 | Real scene, player, live weather, two canvases (one WebGL plus existing 2D map); PASS for this rendered sample |
| F3 | 25 passing checks, reference-only warning and coordinates; inspected screenshot |
| East/North travel | Actual local X/Z change, derived longitude/latitude change, East heading 90°; walk/sprint/jump/reset exercised |
| Map | Follow, compact toggle and zoom exercised; cardinal/marker numerical consistency covered by automated tests |
| Camera and guide | Keyboard orbit/zoom and H toggle exercised |
| Debug lifecycle | Twelve hotkey toggles; reopened telemetry works |
| Desktop 1366×768 | F3 bounded/scrollable; no document horizontal overflow |
| Mobile 390×844 and 844×390 | F3 bounded/scrollable; screenshots; actual touch joystick, pinch, sprint and jump exercised through emulation |
| English/Vietnamese | Both locale warnings rendered; Vietnamese screenshot retained |
| Three fixtures | Monolith and station dialogs, beacon activation PASS in isolated run and rerun after map/debug/camera sequence |
| Weather | Real LIVE observation visible; blocking only `/api/weather` produces unavailable placeholders rather than invented observations |
| Health | Existing health endpoint requested; no Health code change |

The first map assertion incorrectly expected mixed-case `Follow`; actual translated content is `PLAYER FOLLOW`. The harness was corrected, and the next run passed. [after-attempt1.json](docs/audit/phase-12/evidence/after-attempt1.json) retains that failure.

The broader second run had one fixture assertion fail. Isolated fixture testing and a repeat of the preceding map/debug/camera sequence both passed, with correct dialog/feedback contents. The initial failure remains in after-browser.json. **Its root cause was not established; these reruns do not certify every timing/aim sequence.** No speculative production interaction repair was made.

No `Runtime.exceptionThrown`, warning or unexpected console event was recorded in the completed normal scenarios. The three blocked XHR events belong to the explicitly delimited weather-negative scenario. This is not a blanket clean-console certificate: Phase 11's known second-click pointer-lock exception was not retested/repaired, and its interaction cooldown/overlap issues remain documented.

Screenshots inspected directly:

- [Desktop F3](docs/audit/phase-12/evidence/after-debug.png)
- [Desktop 1366×768](docs/audit/phase-12/evidence/after-1366x768-debug.png)
- [Mobile portrait F3](docs/audit/phase-12/evidence/after-390x844-debug.png)
- [Mobile landscape F3](docs/audit/phase-12/evidence/after-844x390-debug.png)
- [Vietnamese F3](docs/audit/phase-12/evidence/after-vi-debug.png)

Physical devices, browser diversity, exhaustive collision/occlusion paths, all six animation transitions, long-session memory/context-loss stress and full Phase 1–10 manual parity are **NOT VERIFIED** in this phase. The prior audit remains the reference for those earlier observations, not a substitute for fresh proof.

## 7. Performance and limitations

The final broad Chrome run measured 16.33 FPS / 61.24ms average / 80ms p95 at idle 1920×1080; expanded F3 measured 17.89 FPS / 55.89ms average / 80.1ms p95. These short samples are observational, not a controlled benchmark or a 60 FPS PASS. Earlier Phase 11 reported 16.81–25.67 FPS on this host. A successful same-session pre-edit browser sample is unavailable, so a numerical performance regression conclusion cannot be drawn.

Source ownership proves no extra renderer/canvas, draw primitive, geospatial network call or per-frame conversion was introduced. Existing resource snapshots remain around 151 geometries / 5 textures before movement and may register lazy resources on movement/highlight. No long-run memory or GPU frame-time claim is made.

All terrain and placements remain synthetic. ENU is a local tangent plane, with curvature implications away from its anchor. Derived height includes synthetic local Y and reference geometry, not a DEM/geoid measurement. Geographic source accuracy is unknown; a nanometer-scale arithmetic residual cannot establish surveyed accuracy or satellite alignment.

## 8. Quality gates and acceptance

| Gate | Status |
|---|---|
| 0 Inspect / baseline | PARTIAL: source and earlier audit understood; fresh types/build/diagnostics pass; fresh pre-edit browser baseline unavailable |
| 1 Architecture | PASS: fixed axes/units, typed errors, immutable reference, no dependency or ownership conflict |
| 2 Pure core | PASS: strict types, golden and numerical tests |
| 3 Read-only integration | PASS for automated checks and named local Chrome scenarios; complete historical runtime parity NOT VERIFIED |
| 4 Extended tests | PASS: GEO-01–16 and 151 repository tests |
| 5 Gemini Preview / complete runtime QA | **NOT VERIFIED**: Gemini tool unavailable; local browser evidence delivered with explicit limits |
| 6 Source/report handoff | Delivered, **overall acceptance PARTIAL** because required gates remain open |

Acceptance A (mathematics): PASS for every specified item. Acceptance B (architecture): PASS for immutable reference, existing origin/config, dependencies, cadence, renderer count, no assets/network and reusable API. Acceptance C: type/build and local F3/map evidence PASS; Gemini Preview NOT VERIFIED; physical mobile/full overlay parity NOT VERIFIED; weather/solar preserved and named checks pass. Acceptance D: DIAG/GEO/repository tests PASS; no new P0/P1 identified; files/evidence delivered; full console/regression cleanliness NOT VERIFIED because inherited defects and untested paths remain. Storybook zero-warning requirement is FAIL.

## 9. Review and next-phase handoff

An independent read-only reviewer found the malformed-reference contract gap and deep-interior domain mismatch; both were addressed with focused regression proof. It found no additional axis, origin-application, physics-writeback or cadence defect. Review did not independently verify browser or Gemini behavior.

Before owner acceptance: run the actual Gemini Preview desktop/mobile matrix, rerun on supported Node 22 and resolve Storybook warnings, address/accept the Phase 11 stabilization findings, and complete the remaining regression/performance checks. No full readiness PASS is claimed.

Future data readiness only: obtain licensed/provenanced geographic sources with CRS, horizontal accuracy, vertical datum/geoid, date, resolution, extent, missing-data policy and surveyed control points. Define zone/version ownership and validate seam transforms before importing real geometry. **No Phase 13 work was implemented.**

For local review, run `pnpm dev`, open `http://localhost:3000/en` or `/vi`, and expand F3. No manual module copying is needed. The driver also reproduces a production review with `node docs/audit/phase-12/browser-driver.cjs.txt after` after `pnpm build` (installed Chrome path is host-specific).
