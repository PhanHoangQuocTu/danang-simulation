# Phase 1–10 browser QA report

## A. Preview and scope

- Date: 2026-11-17; branch: `main`.
- Source baseline: `a0455bdae4bfd9d387c10659427de91d96da574b`, with the uncommitted integration and QA fixes described here. The delivery commit contains this report.
- Node: 22.22.3; pnpm: 12.14.0; Next.js 16; React 19.
- Browsers: Chrome 132.0.6834.110 and Edge 157.0.4341.60, Windows headless CDP.
- Actual preview: `http://localhost:3000`, using `pnpm dev verification-tmp --port 3000` and a source-identical isolated copy. The copy changes only Turbopack's workspace root to resolve existing dependencies. Final production smoke uses the generated standalone server with `HOSTNAME=localhost` and `PORT=3000`.
- Original Phase 10: separate Vite harness at `http://127.0.0.1:3188`, executing the archived TSX unchanged. Production continues to use decomposed modules.
- Existing user processes were preserved. No environment files, dependencies, archived sources, gameplay constants, geographic data, or product Phase 11 work were changed in this QA batch.
- Owned preview/reference servers are stopped after verification. Start `pnpm dev` to review locally.

Raw evidence and executable driver transcripts are in [prompt-02-2026-11-17](prompt-02-2026-11-17/). Drivers are saved as `.cjs.txt`; restore `.cjs` in a local QA directory to execute them. The reference harness requires the already-installed Vite dependencies. Previous production/live-weather evidence remains in [2026-11-17](2026-11-17/).

## B. Visual verification and fixes

These are actual rendered WebGL screenshots. Mobile/tablet screenshots use DPR 2; dimensions in this table are CSS viewports.

| Viewport | Actual homepage | Controlled application comparison | Executed original reference |
| --- | --- | --- | --- |
| 1920 × 1080 | [Desktop 1920](prompt-02-2026-11-17/homepage-desktop-1920.png) | [Current](prompt-02-2026-11-17/comparison-current-desktop-1920.png) | [Phase 10](prompt-02-2026-11-17/reference-phase10-desktop-1920.png) |
| 1440 × 900 | [Desktop 1440](prompt-02-2026-11-17/homepage-desktop-1440.png) | [Current](prompt-02-2026-11-17/comparison-current-desktop-1440.png) | [Phase 10](prompt-02-2026-11-17/reference-phase10-desktop-1440.png) |
| 1280 × 720 | [Desktop 1280](prompt-02-2026-11-17/homepage-desktop-1280.png) | [Current](prompt-02-2026-11-17/comparison-current-desktop-1280.png) | [Phase 10](prompt-02-2026-11-17/reference-phase10-desktop-1280.png) |
| 390 × 844 | [Mobile 390](prompt-02-2026-11-17/homepage-mobile-390.png) | [Current](prompt-02-2026-11-17/comparison-current-mobile-390.png) | [Phase 10](prompt-02-2026-11-17/reference-phase10-mobile-390.png) |
| 375 × 812 | [Mobile 375](prompt-02-2026-11-17/homepage-mobile-375.png) | [Current](prompt-02-2026-11-17/comparison-current-mobile-375.png) | [Phase 10](prompt-02-2026-11-17/reference-phase10-mobile-375.png) |
| 768 × 1024 | [Tablet 768](prompt-02-2026-11-17/homepage-tablet-768.png) | [Current](prompt-02-2026-11-17/comparison-current-tablet-768.png) | [Phase 10](prompt-02-2026-11-17/reference-phase10-tablet-768.png) |

Also captured: [Vietnamese desktop](prompt-02-2026-11-17/homepage-vi-desktop-1440.png), [dialog](prompt-02-2026-11-17/dialog-desktop.png), and [distant overview map](prompt-02-2026-11-17/minimap-distant-overview.png).

Direct comparisons use a fixed Vietnam noon timestamp (`2026-11-17T12:00:00+07:00`), seed 42, and a WMO 2 / 28°C fixture. The live screenshots use current time/weather. Inspection confirms the original terrain, paths, vegetation, fixtures, humanoid, follow camera, sky, lighting, and translucent HUD hierarchy. This is a direct screenshot comparison plus source verification, not a pixel-perfect certification. The prototype mixes English and Vietnamese; production uses typed locale messages. Random grass placement and animated rings are not pixel-identical.

Fixed and retested:

1. Restored the missing compact Frame chip next to FPS and Checks, with a regression test.
2. Restored desktop debug alignment and WASD ordering. Tablet debug previously shrank to 108px and clipped; it now opens at 320px. Compact tablet chips flow below the left HUD without crossing the weather widget. See [before](prompt-02-2026-11-17/tablet-debug-before.png) and [after](prompt-02-2026-11-17/tablet-debug-after.png).
3. Fixed a blank drawing buffer during adaptive-quality changes. DPR resize now runs before the next frame's map/main rendering. A regression test first reproduced resize after drawing, then passed with the corrected order.
4. Fixed native GPU resource retention across Retry. Each retry owns a fresh canvas. Renderer disposal releases its context in a coalesced microtask unless Strict Mode has synchronously reused that canvas. Renderer state is reset before disposal. Tests cover immediate reuse, final release, and retry canvas identity.

## C. Functional matrix

| Feature | Test | Result | Evidence |
| --- | --- | --- | --- |
| Renderer | Actual WebGL initialization; one world renderer and map pass | PASS | Chrome report, renderer/runtime unit tests |
| Scene | Visible terrain, sky, fixtures, grass, character and lighting | PASS | Six screenshots and original comparisons |
| Character | WASD and all arrow directions; diagonal normalization | PASS | Chrome checks; observed diagonal speed ≤ 4.5 m/s |
| Character | Sprint, jump, landing | PASS | Edge checks; walk 4.4999 m/s, sprint 8.5921 m/s during acceleration |
| Camera | Mouse drag and wheel zoom | PASS | Edge checks and camera snapshot changes |
| Input | Blur stops movement; editable input isolates keys | PASS | Chrome blur check, Edge input check, event unit tests |
| Input | Joystick, release, simultaneous camera swipe, pinch, sprint, jump | PASS, emulated touch | Edge mobile checks; controller/input unit coverage for deadzone and bounds |
| Mini Map | Follow/static, zoom limits, distant position, resize | PASS | Chrome checks, map screenshot, runtime/math tests |
| Weather | Fixed BFF, payload validation, failures, stale observation handling | PASS at tested scope | Weather unit tests; Chrome query rejection; prior live BFF report |
| Clock | Vietnam timezone, solar phase and original calculation parity | PASS | Widget screenshots; phase-regression tests |
| Interaction | Approach, E activation/deactivation, feedback | PASS | Edge beacon checks |
| Interaction | Range, eligibility, occlusion, unregister, material restoration | PASS unit scope | Registry/runtime tests; exhaustive geometry combinations were not manually played |
| HUD | Panels, debug, map, movement guide, status, dialog focus/Escape | PASS | Chrome/Edge checks, dialog screenshot, HUD semantic tests |
| Fullscreen | Native transition / unavailable fallback | PARTIAL | Earlier Chrome production smoke passed; current Edge headless displayed graceful fallback. Physical-window behavior not verified in this batch |
| Lifecycle | Context loss/restoration, repeated locale mounts, five retries | PASS smoke scope | Edge recovery checks; Chrome native resource counts; runtime tests |
| Responsive | Six viewport sizes, no document overflow, touch HUD | PASS, emulated | Screenshots, layout assertions, Edge touch checks |
| Locales | `/` and `/vi`; typed messages and ICU parity | PASS | Chrome/Edge and translation tests |
| Health | `/health`, `/vi/health`, `/api/health` | PASS | Browser routes; HTTP 200 and `Cache-Control: no-store` |
| Foundations | API clients, locale proxy, Health, Docker healthcheck, SEO, providers | PRESERVED | Source audit and automated suite; Docker container execution not performed |
| Demo cleanup | Posts / ProxyExampleCard / JSONPlaceholder defaults | REMOVED | Application-source audit; historical source retained |

The Chrome [raw report](prompt-02-2026-11-17/prompt02-report.json) has zero application console issues and zero network failures. Its combined network log contains six Open-Meteo fixture responses belonging to the separately executed original reference, not the Next.js application. The production client uses `/api/weather`. The Edge [development report](prompt-02-2026-11-17/prompt02-edge-report.json) records zero console issues. Fixtures are explicitly labelled and do not establish live weather availability.

Final standalone production retesting also passed: [desktop/touch gameplay](prompt-02-2026-11-17/production-edge-report.json), [inspect/information dialogs, runtime failure Retry, and fresh-cookie Health locales](prompt-02-2026-11-17/production-focused-report.json), and [current live weather/network](prompt-02-2026-11-17/production-live-report.json). All three runs recorded zero console issues. The live run confirms no browser request to Open-Meteo or JSONPlaceholder. Additional [production desktop](prompt-02-2026-11-17/production-desktop.png), [mobile](prompt-02-2026-11-17/production-mobile-controls.png), and [live weather](prompt-02-2026-11-17/production-live-weather.png) screenshots exclude development tooling.

Live Open-Meteo observation was separately verified through the final production BFF: 26.9°C, WMO 0, observed at 20:30 Vietnam time on 2026-11-17. This Windows host needs Node `--use-system-ca` for its trusted certificate chain. Without that flag the route correctly reports an upstream failure; TLS verification was never disabled. Unit tests cover missing, malformed and out-of-range observations, fixed upstream URL, timeout, and retaining the last valid observation. No fabricated default is presented as a live observation.

## D. Quality checks

Final command results are recorded after the final source edits. Exact command logs are retained in the dated evidence directory. Production build uses an isolated copy to avoid the user's existing `.next/audit-chrome` profile. An initial nested-CWD standalone packaging failure is retained as [`build-isolation-failed.txt`](prompt-02-2026-11-17/EVIDENCE.md#build-isolation-failedtxt); it is an environment/setup failure, not a passing build. Running pnpm inside the copy automatically installed a second dependency tree there; that temporary tree was removed. Final builds run `pnpm build verification-tmp` from the real repository with its existing dependencies. No root dependency or lockfile changes were made.

Saved terminal logs use UTF-8 with trailing terminal whitespace and excess EOF blank lines removed. Diagnostic messages and exit statuses are preserved.

The production harness also exposed a hostname mismatch: binding the standalone server to `127.0.0.1` while opening `localhost` caused a default-locale rewrite loop. Matching `HOSTNAME=localhost` to the browser origin returned HTTP 200 for `/`, `/vi`, and `/health` without application changes. A persisted Vietnamese cookie also required clearing before assertions using English labels. These failed harness attempts are not counted as passing browser runs.

| Command | Result | Details |
| --- | --- | --- |
| `pnpm lint` | PASS | [`lint.txt`](prompt-02-2026-11-17/EVIDENCE.md#linttxt); exit 0, no diagnostics |
| `pnpm format:check` | PASS | [`format-check.txt`](prompt-02-2026-11-17/EVIDENCE.md#format-checktxt); exit 0 |
| `pnpm type-check` | PASS | [`type-check.txt`](prompt-02-2026-11-17/EVIDENCE.md#type-checktxt); Next type generation and strict TypeScript, exit 0 |
| `pnpm test` | PASS | [`test.txt`](prompt-02-2026-11-17/EVIDENCE.md#testtxt); 31 files, 127 tests passed, exit 0 |
| `pnpm build` | PASS | [`build.txt`](prompt-02-2026-11-17/EVIDENCE.md#buildtxt); `pnpm build verification-tmp`, isolated source/output, exit 0 |
| `pnpm build-storybook` | BUILD PASS; warning remains | [`build-storybook.txt`](prompt-02-2026-11-17/EVIDENCE.md#build-storybooktxt); exit 0, existing `PLUGIN_TIMINGS` warning |

Storybook was rerun without competing test workers. It completed in 11.55s but Rolldown still reported 9.0s in JavaScript plugin callbacks, including 4.1s in `storybook:react-docgen-plugin`. The retained earlier integration log also contains `PLUGIN_TIMINGS`; it was previously overlooked in the narrative. The zero-warning criterion is therefore **not met**, despite successful builds. No warning filters, dependency versions, or Storybook features were changed to hide it. Vitest also emits an environment startup performance hint; all 127 tests pass.

## E. Measured performance and resources

Chrome headless, development server, warm compiled routes, instrumented rendering. These are five-second samples of rendered RAF intervals, not a physical GPU/device benchmark or a production SLA.

| Measurement | Desktop 1440 × 900 | Mobile viewport 390 × 844 |
| --- | --- | --- |
| First GL draw after navigation | 873.7 ms | 1215.5 ms |
| Runtime ready | 1793.4 ms | 1731.2 ms |
| Sample duration / intervals | 4973.6 ms / 140 | 4993.5 ms / 287 |
| Average FPS | 28.15 | 57.47 |
| Minimum instantaneous FPS | 14.29 | 16.67 |
| Average / maximum frame interval | 35.53 / 70 ms | 17.40 / 60 ms |
| JS heap snapshot | 64,152,248 bytes | 81,022,505 bytes |
| Long tasks / maximum duration, including startup | 5 / 955 ms | 5 / 643 ms |
| HUD DOM mutation batches during sample | 13 | 34 |

HUD mutation batches are not React state-update counts. Source snapshots remain capped at 10 Hz; the engine owns per-frame mutable data. Desktop 60 FPS was not achieved in this environment. GPU timings and GPU bytes were unavailable.

Before the Retry fix, native allocations grew by five textures and one program per recreation on a retained context. After the fix, five successive retries each returned to one active context, **594 buffers, 9 native textures, and 13 programs**. Six contexts were created and five released. Three.js reported 151–152 geometries depending on lazy uploads and 5 textures. Native counts include internal fallback textures. This demonstrates bounded short-run ownership, not long-duration leak certification.

## F. Remaining issues and migration status

- Critical: none found in the tested flows.
- High: none found in the tested flows.
- Medium: desktop headless development rendering averaged 28.15 FPS. A representative production GPU benchmark is still needed before accepting any 60 FPS target.
- Low: dense original HUD typography remains small at mobile widths. Automated layout heuristics flagged small text and nested panels; icon SVG warnings were false positives. No broad redesign was made against the required original appearance.
- Low / acceptance gap: the existing Storybook `PLUGIN_TIMINGS` build warning remains. All required commands exit successfully, but the repository's strict zero-warning definition of done is not satisfied.
- Not verified: physical iOS/Android touch behavior, Safari/Firefox, native fullscreen in a physical window, screen-reader/WCAG certification, long-duration GPU byte profiling, Docker execution, and exhaustive manual interaction/occlusion combinations.

The homepage is a working interactive decomposed simulation. Phase 1–10 core flows have browser and automated evidence. Full master-spec acceptance and pixel-perfect parity are not claimed. The world remains synthetic local meters, and product Phase 11 remains unstarted.
