# Verification 2026-11-19 — Standalone, FPS, Weather, Contradictions

Date: **2026-11-19 ~17:25–17:40 +07**. Base: GitHub `main` head
`e686522` (local checkout `26a59f8`, same contents). Environment: Linux VM,
Node **22.23.5**, pnpm **12.14.0**, Next **16.4.6**. All evidence in
`docs/audit/verification-2026-11-19/evidence/`.

Overall verdict after this session: **PARTIAL**. One real code fix landed
(weather 429 handling, §3, verified live). The standalone loop, FPS 60,
physical-device, Docker and GPU profiling remain **FAIL / NOT VERIFIED**
for the reasons below — none of them is claimed PASS.

## 1. Standalone bind 127.0.0.1 redirect loop — FAIL (upstream, unchanged)

Re-probed on the fresh build (`BUILD_ID N1vpvCu3njXS6kKkQkMRZ`), one server
per `HOSTNAME`, `curl -L --max-redirs 5`:

| HOSTNAME | `/` | `/health` | `/vi` |
|---|---|---|---|
| `127.0.0.1` | **307 loop (5 redirects, still 307)** | **307 loop** | 200 |
| `localhost` | 200 | 200 | 200 |
| `0.0.0.0` (curl via localhost) | 200 | 200 | 200 |

Evidence: `evidence/EVIDENCE.md#redirect-probetxt`.

Upstream, checked live 19/11 ~17:25 +07:

- Next.js issue **#94745** ("Middleware rewrites are network-proxied when
  using `next start -H 127.0.0.1`") is still open/unfixed: its fix PR
  **#95917** is still `open`, unmerged, last updated 2026-10-08; the
  issue's latest comment (2026-09-26) still reproduces on 16.3.6. The
  issue's own `state` field could not be read directly (GitHub API
  unauthenticated rate limit exhausted, reset 10:35 UTC) — "still open"
  is inferred from the open fix PR, the reproducing comment and the
  release notes below.
- **No newer stable Next exists**: npm `latest` = **16.4.6**; no 16.4.7
  (404) and no stable 16.5.0 (404). Canary is `16.5.0-canary.55`
  (2026-11-18) and its release notes contain no mention of #94745,
  #95917 or loopback — so even canary shows no evidence of a fix, and
  a canary jump is not an upgrade target for this repo.
- **Do not upgrade anything for this bug.** Keep the workaround already
  in `README.md`: run standalone with `HOSTNAME=localhost` or
  `HOSTNAME=0.0.0.0` (Docker already uses `0.0.0.0`); never bind
  `127.0.0.1`. Do not change `localePrefix` to `always` and do not add
  host-trust/proxy hacks (already ruled out in the completion report).
- Re-test trigger: PR #95917 merging **and** appearing in a stable
  release's notes (a future 16.4.7+ backport or 16.5.0 stable).

## 2. FPS 60 / physical device / Docker / long-term GPU — NOT VERIFIED

### 2.1 What this VM can and cannot do

| Check (19/11, re-verified) | Result |
|---|---|
| `docker version` / `docker ps` | `docker: command not found` (exit 127) — no Docker at all |
| `ls /dev/dri` | No such file or directory — no GPU device |
| `nvidia-smi` | command not found; no `/dev/nvidia*` |
| `/opt/meta-chromium/chrome` | Blocked at startup: "Hatch WebGL domain policy is required for browser startup" |
| Playwright headless shell 141 (`~/.cache/ms-playwright/chromium_headless_shell-1194/`) | Starts; SwiftShader software rendering only |

**New finding from this session:** in this VM's headless shell, the 3D
world does not initialize at all — after 8 s the page still shows
"Preparing 3D world…" with **0 canvases**, and a 20 s CDP trace shows
subresource loads aborting (`net::ERR_ABORTED` for stylesheets, fonts
and scripts) with no JS exception captured. The root cause is **not
established** (headless-shell resource loading vs SwiftShader WebGL2 vs
something else) and is not claimed here. Consequence: no FPS number can
be measured in this VM at all — not even a SwiftShader baseline. The
earlier "12–15 FPS @1024×768 SwiftShader" figure was from the completion
session's browser run; it is not reproduced here and is not relied on.

### 2.2 What was added so it can be verified on a real machine

- `fps-probe.mjs` — zero-dependency (Node 22 built-in WebSocket CDP)
  sustained probe: rAF deltas over the full duration, mean/p50/p95/p99,
  FPS as frames/wall-time and reciprocal-of-mean, 1% low, hitch counts
  (>50/100/250 ms), heap start/end, unmasked GPU renderer string,
  console errors. **It refuses to report a fake PASS**: if no canvas
  exists after warmup it reports
  `FAIL (world did not initialize — no canvas after warmup)` instead of
  measuring the bare vsync clock (an earlier draft measured exactly
  60.04 FPS with no scene — that result was discarded, not kept).
  SwiftShader/llvmpipe runs are `NOT_APPLICABLE`, never a PASS.
  PASS criteria: desktop 1920×1080 — p95 ≤ 16.7 ms AND mean FPS ≥ 60
  over 60 s AND zero frames > 100 ms; mobile 390×844 — p95 ≤ 33.3 ms
  AND mean FPS ≥ 30.
- Smoke run in this VM: `evidence/fps-1024x768-swiftshader.json` —
  status `FAIL (world did not initialize — no canvas after warmup)`,
  0 frames. This is the probe working correctly, not a performance
  result.
- `PHYSICAL_DEVICE_CHECKLIST.md` — device inventory, 60 s scenarios,
  touch/zoom/safe-area/background-resume, screen-reader pass (closes
  TEST_MATRIX IMG-55), 600 s soak (heap growth ≤ 10%, FPS degradation
  ≤ 10%).
- `DOCKER_CHECKLIST.md` — host with a working daemon, compose build +
  boot, `/api/health` via nginx on 8080, `fps-probe.mjs` against the
  container, `docker stats` during soak, CI smoke step for the
  `docker` job (currently build-only).

Existing in-app telemetry (for context, not re-measured): HUD samples
FPS as reciprocal-of-mean over a 60-sample ring at 10 Hz; frames
≥ 250 ms are silently dropped from the ring; `jsHeapUsedMb` is never
populated. See the completion report §4.6 for the Phase 14 numbers
(1920×1080: ~21 FPS on a real Intel iGPU — the 60 FPS target failed
even on real low-end hardware).

**Still needed from the user:** a physical device (or a machine with a
real GPU + Docker daemon) to run the probe and checklists. Nothing in
this VM can substitute for that.

## 3. Weather live — NOT VERIFIED (live observation), but the 429 path is now fixed and verified live

Direct Open-Meteo, 19/11 10:25 UTC and again 10:35 UTC:

```text
GET https://api.open-meteo.com/v1/forecast?latitude=16.0544&longitude=108.2022&current=temperature_2m&timezone=Asia/Ho_Chi_Minh
HTTP 429 {"reason":"Daily API request limit exceeded. Please try again tomorrow.","error":true}
```

Evidence: `evidence/EVIDENCE.md#open-meteo-directtxt`. This is the **shared egress
proxy IP's daily quota** exhausted by other tenants: this app's volume
cannot exhaust Open-Meteo's 10,000 calls/day/IP (healthy: ≤ 96
upstream calls/day via the 15-min server cache; worst case during an
outage: ≤ 288/day). The remedy is deployment-side (dedicated egress
IP/NAT, a paid plan, or a different network), not a code change — and
no live observation was invented or served.

### 3.1 Real code fix landed in this session

The BFF already handled 429 correctly in the broad sense (no fabricated
defaults, stale observation retained, UI shows "Weather unavailable"),
but it collapsed 429 into a generic error: `provider.ts` never read
`Retry-After`, `route.ts` returned 502 for a 429, and `client.ts`
retried 3× into a rate-limited upstream (up to 3 upstream calls per
refresh cycle instead of 1). Fixed:

| File | Change |
|---|---|
| `src/integrations/weather/errors.ts` (new) | Typed `WeatherUpstreamRateLimitedError` with `retryAfterSeconds` |
| `src/integrations/weather/provider.ts` | 429 → typed error, `Retry-After` parsed and clamped to 1 s–1 h |
| `src/app/api/weather/route.ts` | 429 → `429 {code: WEATHER_RATE_LIMITED}` + `Retry-After` header; other failures still 502 `WEATHER_UNAVAILABLE`, no upstream details leaked |
| `src/integrations/weather/client.ts` | No retry on axios 429 — surfaces immediately so the hook keeps the last observation marked stale |
| Tests | +5 tests: provider 429 with/without `Retry-After`, route 429 response, client no-retry on 429, client retry-then-success on transient failure |

**Verified live** (not just unit tests): against the fresh standalone
build, `GET /api/weather` returned
`HTTP 429, retry-after: 3600`
`{"status":429,"code":"WEATHER_RATE_LIMITED","message":"Weather service rate limited, try again later"}`
while direct Open-Meteo returned 429 at the same time
(`evidence/EVIDENCE.md#redirect-probetxt`).

Live observation itself remains **NOT VERIFIED** until the shared-IP
quota resets (tomorrow) or the app runs on a network with its own
quota — then re-run `curl /api/weather` and confirm a 200 with a real
observation.

## 4. Contradictory files fixed in this session

Historical reports were **not** edited. Only current-status files:

| Conflict | File | Fix |
|---|---|---|
| Header 17/11 vs body 19/11 | `docs/PHASE_STATUS.md:3` | Date → 2026-11-19 |
| Stale "Storybook warning and advisory still remain" clause contradicting :19 in the same file | `docs/PHASE_STATUS.md:17` | Clause removed, pointer to the 19/11 completion paragraph |
| Milestone vs Product Phase numbering collision | `docs/PHASE_STATUS.md` | Table header → `Migration Milestone (M0–M13)` + explanatory line |
| §2 baseline citations pointed at final/missing files | `PHASE_14_COMPLETION_REPORT.md` §2 | Test row → [`test-coverage-before-timeout-fix.txt`](../phase-14-completion/evidence/EVIDENCE.md#test-coverage-before-timeout-fixtxt) (236 total); Storybook row → [`build-storybook-before.txt`](../phase-14-completion/evidence/EVIDENCE.md#build-storybook-beforetxt); coverage row → [`test-coverage-before-timeout-fix.txt`](../phase-14-completion/evidence/EVIDENCE.md#test-coverage-before-timeout-fixtxt); §3.1 evidence → [`build-storybook.txt`](evidence/EVIDENCE.md#build-storybooktxt); §3.4 evidence → [`test-coverage.txt`](evidence/EVIDENCE.md#test-coveragetxt) |
| `package.json` still `frontend-boilerplate` | `package.json`, `src/app/icon.svg`, `LICENSE`, `src/lib/__tests__/seo.test.ts` | Name → `da-nang-3d-open-world`, description → Da Nang 3D Open World; favicon title, LICENSE holder and SEO test mock updated to match. Lockfile unchanged (no root name stored). |
| README version rounding | `README.md` | `next-intl v4.15` → `v4.15.1`; `Storybook 10.6` → `10.6.7` |

Not errors, left alone: Phase 13 evidence 171 vs 176 (176 matches the
report's cited `release-test.txt`; the `final-*` files are an earlier
run); Phase 10 line count 8513 vs 8514 (`wc -l` undercounts by 1 — the
file has no trailing newline, 8514 is correct).

## 5. Gates (Node 22.23.5, pnpm 12.14.0, after all changes)

| Gate | Result | Evidence |
|---|---|---|
| `pnpm lint` | exit 0, 409 files | `evidence/EVIDENCE.md#linttxt` |
| `pnpm format:check` | exit 0, 408 files | `evidence/EVIDENCE.md#formattxt` |
| `pnpm type-check` | exit 0 | `evidence/EVIDENCE.md#type-checktxt` |
| `pnpm test` | exit 0, **42 files / 242 tests** (was 41 / 237; +1 file, +5 tests) | `evidence/EVIDENCE.md#testtxt` |
| `pnpm test:coverage --maxWorkers=2` | exit 0, 42 / 242, 77.22% stmts / 65.49% branches / 61.76% funcs / 79.01% lines | `evidence/EVIDENCE.md#test-coveragetxt` |
| `pnpm build` | exit 0, 14 static pages | `evidence/EVIDENCE.md#buildtxt` |
| `pnpm build-storybook` | exit 0, 12.39 s, **0 PLUGIN_TIMINGS** | `evidence/EVIDENCE.md#build-storybooktxt` |
| `pnpm audit --prod` | exit 0, 0 vulnerabilities | `evidence/EVIDENCE.md#audit-prodtxt` |
| `pnpm audit` (full) | exit 1, 2 moderate dev-only (glob, minimatch — unchanged) | `evidence/EVIDENCE.md#audit-alltxt` |

Note: the first gate run in this session failed lint (nested ternary in
`fps-probe.mjs`), format (4 files) and type-check (axios namespace in
`client.test.ts`) — all three were real defects in the new code, fixed
before the final run above. No gate was waived.

## 6. Still needed from the user

1. A machine with a real GPU + Docker daemon, or a physical device, to
   run `fps-probe.mjs` and the two checklists — FPS 60, Docker and
   GPU profiling cannot be verified in this VM.
2. A network with its own Open-Meteo quota (or tomorrow, after the
   shared-IP daily quota resets) to verify a live weather observation
   end to end.
3. Watch PR vercel/next.js#95917 merging into a stable Next release,
   then re-run the standalone probe — that is the only route to
   closing the 127.0.0.1 FAIL.
