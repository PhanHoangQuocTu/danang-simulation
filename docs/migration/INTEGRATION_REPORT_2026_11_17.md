# Phase 1–10 Integration Report — 2026-11-17

## Delivery and scope

The existing repository already contained a real homepage integration when this task started. That implementation was reused. `/` and `/vi` render an interactive Three.js simulation through a client-only boundary; the historical extraction report had not been updated to reflect it. This batch fixes confirmed lifecycle and minimap defects and records actual verification. It does not certify every master-specification milestone or exact visual parity.

The current world is the original synthetic test environment in local meters. No authoritative city geometry, geographic ingestion, first-person mode or Product Phase 11 was added. Historical TSX and handover remain unchanged. Their SHA-256 values after normalizing Windows CRLF to LF match the original baseline: TSX `418734fb71ae5026980c400450abc0b6ea6dda03c23adcfc8392cc1b7a0bf566`; handover `242527dfc1215c13f14378f72f19713d8aff1e8997a2cbfad67811e16bf61b42`.

## Architecture in production source

| Responsibility | Actual source |
| --- | --- |
| Thin homepage, metadata, locale | `src/app/[locale]/page.tsx` |
| Server semantic copy and JSON-LD | `src/modules/WorldExplorer/index.tsx` |
| Browser boundary, loading and error boundary | `src/modules/WorldExplorer/components/ClientBoundary.tsx` |
| Canvas and HUD composition | `src/modules/WorldExplorer/components/WorldExplorerClient.tsx` |
| HUD panels, map controls, touch controls and accessible dialogs | `src/modules/WorldExplorer/components/WorldHud.tsx`, `Icons.tsx`, `styles/world.css` |
| Browser lifecycle, weather requests and sampled UI state | `src/modules/WorldExplorer/hooks/useWorldExplorer.ts` |
| Physics, camera, targeting, map synchronization and main loop | `src/modules/WorldExplorer/runtime/world.ts` |
| Synthetic terrain, vegetation, fixtures, lighting and character placement | `src/worlds/danang/scene.ts`, `zones/manifest.ts`, `zones/synthetic.ts`, `zones/fixtures.ts` |
| Sky, sun/moon, clouds, rain, wind and solar response | `src/worlds/danang/environment/simulation.ts`, `solar.ts` |
| Generic controller, runtime, resources, input and interactions | `src/engine/` |
| Shared rock prefab ownership and rollback | `src/world-assets/catalog/synthetic-rock.ts`, `src/world-core/registries/prefabs.ts` |
| One renderer, main pass and viewport/scissor map capture | `src/engine/renderer/webgl.ts` |
| Fixed weather upstream, validation and cache | `src/app/api/weather/route.ts`, `src/integrations/weather/` |
| English/Vietnamese UI | `src/messages/{en,vi}/worldExplorer.json`, registered in `src/messages/index.ts` |

The engine owns mutable frame state. HUD snapshots run at 10 Hz, targeting at 20 Hz, and clock/solar updates at 1 Hz. Mini Map uses the same WebGL renderer and a 2D presentation canvas. No second WebGL renderer, React Three Fiber or new rendering backend was introduced.

## Confirmed defects fixed in this batch

1. Retry previously changed an unused generation counter, leaving failed initialization in loading forever. Runtime mount now depends on generation; cleanup precedes replacement. Map, weather and dialog blocking are reapplied to the replacement.
2. Reset previously replaced `isPointerLocked` without releasing browser pointer lock, disabling mouse-look. It also replaced quality telemetry without resetting renderer DPR/rain quality. Reset now preserves both runtime invariants.
3. Instanced grass geometry/material were owned, but its instance buffer was not. The scene now owns the InstancedMesh before attaching it; repeated disposal releases it once.
4. FOLLOW-to-STATIC map transitions used a slowly refreshed image while marker projection followed an easing camera. The original 50 ms refresh continues while the map center moves; stable overview returns to 2,500 ms refresh.
5. Rebuilding a renderer on the same canvas retained WebGL texture unpack flags, causing `texImage3D` warnings. Disposal now calls the installed Three.js `resetState()` before `dispose()` in try/finally. A real production-browser runtime failure and Retry now recover without console warnings.

Regression tests were observed failing before their fixes and passing afterward. New `retry-lifecycle.test.tsx` covers failed initialization recovery, replacement disposal, Strict Mode stale callbacks and restoration of map/weather/dialog state. Existing `world.test.ts` now covers instance-buffer disposal, reset invariants and map settling. Renderer tests verify one reset before disposal. Scoped generation ownership preserves these behaviors without relaxing exhaustive-dependency lint rules.

## Demo cleanup and preserved foundations

The authorized cleanup was already present at task start: no `src/api/posts/`, `src/app/api/posts/`, ProxyExampleCard, Posts-only exports/translations or JSONPlaceholder backend default remain in current application source. No files were removed in this batch. The old baseline report retains historical route names as dated audit evidence, not implementation guidance.

Preserved: `src/api/axios.ts`, interceptors and refresh handling, Health domain and routes, API error normalization, optional backend configuration, `src/proxy.ts`, next-intl negotiation and auth guard template, providers, TanStack Query, Zustand, shadcn/ui, shared layouts/hooks/utilities, SEO, Storybook, Vitest, Biome, Husky, Commitlint, Docker, Nginx and CI. `docs/API_INTEGRATIONS.md` documents keys, requests, queries, optional mutations, types, exports and Route Handlers. No configured backend means no backend rewrite or third-party fallback.

## Browser evidence

Actual homepage was opened first against the existing development server on port 3001. It rendered a real character, terrain, vegetation, fixtures, shadows, night sky, minimap and HUD. Walking approached 4.5 m/s and sprint 8.6 m/s. Live `/api/weather` returned 502; UI retained unavailable semantics and displayed no fabricated observation.

A separate production build and standalone server on port 3187 avoided the user's locked `.next/audit-chrome` profile and active dev server. Chrome desktop viewport: 1440 × 1000; mobile emulation: 390 × 844 with five touch points. The deterministic browser run intercepted only `/api/weather` with an explicitly controlled observation. This is UI test data, not evidence of live provider availability.

The production run verified English homepage WebGL, weather fixture display, walking, sprint, jump/landing, mouse drag/wheel, map follow/compact/zoom, dialogs blocking movement and closing with Escape, fullscreen enter/exit, beacon activation/deactivation, real-input keyboard isolation, WebGL context loss/restoration, repeated locale navigation, Vietnamese mobile layout without document overflow, joystick, simultaneous movement/camera touch, release, pinch, sprint, jump and Health. No console errors or warnings were recorded in that controlled run. Repeated locale mounts returned to 151 geometries and 5 textures before first movement; this is a smoke observation, not a leak-proof GPU profile.

Headless frame-rate observations varied substantially with viewport and host load. No target FPS is claimed. Mobile emulation does not replace physical device testing. A standalone server bound to `127.0.0.1` exposed a hostname/rewrite loop in the local QA setup; using the repository's normal Docker hostname `0.0.0.0` resolved it without application changes.

The initial live-weather failure was traced to `UNABLE_TO_VERIFY_LEAF_SIGNATURE` in the host Node certificate configuration. Running the isolated Node 22 server with `--use-system-ca` used the configured Windows certificate store while retaining TLS verification. The fixed upstream and `/api/weather` then returned HTTP 200 with a valid observation: 25.1°C, WMO 0, observed 02:15 Da Nang time on 2026-11-17. A separate Chrome run used no weather interception, displayed the live widget and recorded zero console errors/warnings. No app environment variable, API key or TLS bypass was added. The user's existing server was not reconfigured.

## Verification and remaining work

All final checks used Node 22.22.3. Existing 121 tests passed before these fixes; no existing test was deleted. Native Windows checkout CRLFs caused the baseline format failure. Local tracked text was normalized to the repository's existing LF format without source-content changes; no formatter rules were relaxed. Git on this host can continue listing these files as modified because its index stat entries describe the prior CRLF sizes; content diffs remain limited to the task and preserved user edits. No content was staged.

| Check | Result | Evidence |
| --- | --- | --- |
| `pnpm lint` | PASS, zero errors/warnings | `evidence/2026-11-17/lint-node22.txt` |
| `pnpm format:check` | PASS after adding final newlines to new evidence JSON | `evidence/2026-11-17/format-check-node22.txt` |
| `pnpm type-check` | PASS, route generation and nonincremental TypeScript | `evidence/2026-11-17/type-check-node22.txt` |
| `pnpm test` | PASS, 31 files, 124 tests | `evidence/2026-11-17/test-node22.txt` |
| Production build | PASS, final isolated source copy | `evidence/2026-11-17/build-node22.txt` |
| `pnpm build-storybook` | Build PASS; existing `PLUGIN_TIMINGS` warning | `evidence/2026-11-17/build-storybook-node22.txt`; corrected during Prompt 02 QA |
| Desktop/mobile production browser | PASS, zero console errors/warnings | `evidence/2026-11-17/complete-report.json` |
| Minimap settling, inspect/information dialogs, runtime Retry, fresh-cookie locale Health | PASS, zero console errors/warnings | `evidence/2026-11-17/focused-report.json` |
| Actual live weather via BFF and browser | PASS with Node system certificate store, zero console errors/warnings | `evidence/2026-11-17/live-report.json` |

The root `pnpm build` was blocked by the user's active Chrome profile inside `.next`. At the owner's request, these processes remained running. The successful production check used copied current source/tests/config and the same installed dependencies; only the temporary Turbopack root was set explicitly to resolve those dependencies. `verification-tmp/` and the owned port-3187 QA server were removed after verification. The existing user server on port 3001 was not stopped.

The evidence directory includes desktop/mobile/live screenshots and the native-CDP driver (`browser-driver.cjs.txt`). This Windows driver uses installed Chrome and Node, not Playwright or a new dependency. `QA_FOCUSED=1` selects follow-up controls/lifecycle checks; `QA_LIVE=1` selects the real provider run. The default run labels its weather fixture explicitly. The isolated-build driver is also retained as text; adapt local paths and launch the standalone server with `HOSTNAME=0.0.0.0`, `PORT=3187`, and Node `--use-system-ca` when reproducing live weather on this host. Stop owned QA processes and remove their temporary directories afterward.

Remaining limits: full pixel-by-pixel visual comparison with the original preview, long-running GPU/heap profiling, actual mobile/tablet hardware, physical-browser pointer-lock policies and broader accessibility testing. Chromium-only heap telemetry remains unavailable in the current HUD snapshot (`jsHeapUsedMb` is null); no memory measurement is claimed. No GIS or city streaming work is included. Phase 1–10 integration exists, but these limits prevent a claim of exhaustive parity certification.

## Change inventory

Created in this batch: `src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx`, this report, the implementation plan under `docs/superpowers/plans/`, and dated verification evidence. Modified: `src/modules/WorldExplorer/hooks/useWorldExplorer.ts`, `runtime/world.ts`, `__tests__/world.test.ts`, `src/worlds/danang/scene.ts`, `src/engine/renderer/webgl.ts`, its renderer tests, phase/migration reports, migration map, architecture/lifecycle documentation and README. No application files were removed, no dependency versions changed, and no Git commit/push/history rewrite occurred.

Pre-existing user changes were preserved separately: input events and their tests, WorldHud, both WorldExplorer message files, and the untracked HUD semantics test. They are included in verification but are not attributed to this batch.
