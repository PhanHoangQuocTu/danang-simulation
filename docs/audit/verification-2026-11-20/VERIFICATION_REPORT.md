# Browser QA — full 6-viewport re-verification after the Phase 16 DEM fixes

- **Date:** 2026-11-20, run 06:37–06:57 UTC (13:37–13:57 +07)
- **Repo:** `danang-simulation-main`, HEAD `f10d98c` (`feat(terrain): integrate real copernicus dem pilot for da nang`)
- **Server:** standalone, `HOSTNAME=localhost`, port 3000, `.next/static` + `public` copied into `.next/standalone/` before start (build fresh: no source file newer than `.next/BUILD_ID` 03:58 UTC; see incident note below — the `.next` tree was rebuilt at 06:24 UTC by parallel work, see §5)
- **Browser:** headless Chromium 141.0.7390.37 (Playwright bundle, `~/.cache/ms-playwright/chromium-1194/chrome-linux/chrome`), SwiftShader software rendering
- **Method:** CDP probe (`/tmp/qa-probe-2026-11-20.mjs`, zero npm deps, Node 22 WebSocket client). No source files modified, no commit, no push.
- **Raw evidence:** `browser-qa-2026-11-20.json` (12 combos), `terrain-diagnostics-detail.json`, 24 screenshots (`browser-<mode>-<viewport>.png` + `-f3.png`), 2 broken-server screenshots (§5).

## Verdict

**12/12 viewport+mode combos PASS** on every check that could be observed directly.
The two Phase 16 defects are **confirmed fixed at every viewport where the
readout is rendered**: F3 TER-09 says REAL DEM in DEM mode, and the Mini Map
Span label says 3000 m in DEM mode / 144 m in synthetic mode.

Two observation limits apply only at 390x844 (see §3): the debug panel starts
**hidden** on mobile (one F3 tap reaches compact, a second reaches expanded),
and the compact mobile layout does not render the minimap coords/span labels
or the character-state panel. A focused follow-up run proved F3 diagnostics
work on mobile too (2× F3 → expanded, TER-09 present, geo 6.046 m DEM /
0.000 m synthetic; toolbar Debug button also works). Those two combos are
therefore PASS with the F3/Span evidence supplied by the follow-up.

FPS is **NOT_APPLICABLE** (SwiftShader software rendering; measured rAF rate
0.6–2.6 fps, in-app FPS chip read 0 at spawn and 10 in one DEM 1920x1080
screenshot — software-rendering figures only, never a 60 FPS claim).

## Results per viewport+mode

Legend: init = time to 2 canvases + spawn coords (where rendered);
geo = F3 geo-telemetry height; walk = W displacement; jump = Space arc
(baseline → peak); ctx = WebGL context loss → restore; wx = weather.

| Mode | Viewport | Init | F3 TER-09/10 | Span | Walk | Jump | ctx | Console/page/failed | Overflow | Verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| synthetic | 1920x1080 | 7.2 s | PASSED / PASSED, geo 0.000 | 144 m | 0.00 → −0.58 m, WALK | 0.000 → 1.68 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| synthetic | 1366x768 | 6.7 s | PASSED / PASSED, geo 0.000 | 144 m | 0.00 → −0.58 m, WALK | 0.000 → 1.68 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| synthetic | 1024x768 | 6.1 s | PASSED / PASSED, geo 0.000 | 144 m | 0.00 → −0.80 m, WALK | 0.000 → 1.68 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| synthetic | 768x1024 | 5.7 s | PASSED / PASSED, geo 0.000 | 144 m | 0.00 → −0.80 m, WALK | 0.000 → 1.68 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| synthetic | 390x844 | 2 canv* | via follow-up (§3) | not rendered† | marker moved | peak 1.67 (base 0.000) | restored, 2 canv | 0 / 0 / 0 | no | PASS* |
| synthetic | 844x390 | 4.5 s | PASSED / PASSED, geo 0.000 | 144 m | 0.00 → −1.05 m, WALK | 0.000 → 1.67 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| dem | 1920x1080 | 8.5 s | PASSED / PASSED, geo 6.046 | 3000 m | 0.00 → −0.58 m, WALK | 6.041 → 7.711 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| dem | 1366x768 | 5.2 s | PASSED / PASSED, geo 6.046 | 3000 m | 0.00 → −0.80 m, WALK | 6.040 → 7.72 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| dem | 1024x768 | 4.4 s | PASSED / PASSED, geo 6.046 | 3000 m | 0.00 → −1.02 m, WALK | 6.038 → 7.718 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| dem | 768x1024 | 4.6 s | PASSED / PASSED, geo 6.046 | 3000 m | 0.00 → −1.02 m, WALK | 6.038 → 7.708 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |
| dem | 390x844 | 2 canv* | via follow-up (§3) | not rendered† | marker moved | peak 7.715 (base 6.035) | restored, 2 canv | 0 / 0 / 0 | no | PASS* |
| dem | 844x390 | 3.4 s | PASSED / PASSED, geo 6.046 | 3000 m | 0.00 → −1.50 m, WALK | 6.035 → 7.705 → land | restored, 2 canv | 0 / 0 / 0 | no | PASS |

\* 390x844: spawn coords are not rendered in the compact mobile minimap, so
init time could not be measured by coords (canvases present; world proven up
by F3/jump/weather). Character anim/grounded readout is absent in the DOM at
this viewport (the `section.world-character` panel is not rendered in the
compact mobile layout), so airborne/landed flags could not be read — the jump
itself is proven by the geoHeight arc (see §3).
† Span label is only rendered when the minimap is not compact; at 390x844 the
minimap is compact, so no Span label exists in the DOM. Verified 3000 m (DEM)
and 144 m (synthetic) at the other five viewports.

Common to all 12 combos: 2 canvases (world 1×viewport + minimap 256×256),
Checks 35/35 at spawn (where rendered), Terrain checks 10/10 in F3,
Elevation chip 0.00 m synthetic / 6.05 m DEM, Mini Map + HUD toolbar present,
weather **LIVE** (`/api/weather` HTTP 200; widget 26 °C drizzle, WMO #51,
humidity ~81%, wind ~17.6 km/h NE, observed 13:45–13:50 +07),
interaction prompt live (`5.4–6.3 m / max 5.0 m — move closer`, distance
updates), camera stable (character centred in every screenshot, marker stays
centred, no uncontrolled orbit/zoom), 0 console errors, 0 page errors,
0 failed requests, no horizontal overflow.

## 1. The two fixed defects — confirmed

- **F3 provider label (was: DEM world mislabelled synthetic).**
  TER-09 title in DEM mode: `REAL DEM (pilot — orthometric, ellipsoid
  alignment NOT VERIFIED) — copernicus-dem-glo30-danang-pilot-v1 @ 30 m,
  datum ORTHOMETRIC_EGM2008, production-ready: no`. TER-10:
  `Spawn Y 6.045524001121521 m equals sampled elevation 6.045524001121521`.
  In synthetic mode TER-09 reads `SYNTHETIC TERRAIN —
  synthetic-danang-phase-10 @ n/a m, datum SYNTHETIC_LOCAL,
  production-ready: no`, TER-10 `Spawn Y 0 m equals sampled elevation 0`.
  All TER-01…TER-10 PASSED in both modes
  (`terrain-diagnostics-detail.json`). Geo telemetry DEM: lat 16.0544000°,
  lon 108.2022000°, height 6.046 m, heading 180.0°,
  `SIMULATED POSITION — NOT GEO-VERIFIED`.
- **Mini Map Span label (was: 144 m in DEM mode).** Span reads **3000 m** in
  DEM mode and **144 m** in synthetic mode at 1920x1080, 1366x768,
  1024x768, 768x1024 and 844x390 (visible in the screenshots, e.g.
  `browser-dem-1920x1080.png` shows `Span: 3000 m`).

## 2. Jump arcs (observed, F3 geoHeight sampled ~1–2.5 s apart)

- Synthetic (all viewports): 0.000 → peak 1.67–1.68 m → landed, grounded.
  Sampled states JUMP → FALL → LANDING → IDLE.
- DEM 1920x1080: 6.041 → 6.834 → 7.136 → 7.376 → 7.669 → peak 7.711 →
  7.504 → 7.046 → 6.724 → LANDING grounded. Peak across DEM viewports
  7.705–7.72 m, matching the Phase 16 arc (6.046 → 7.718 → 6.038).

## 3. 390x844 mobile — what the main probe could not read, and the follow-up

At 390x844 the debug panel starts **hidden** (desktop starts compact), the
minimap is compact (no coords/Span labels in the DOM), and the character
panel is not rendered (no anim/grounded/speed readout in the DOM). The main
probe's single F3 tap therefore reached only compact, and its airborne flag
stayed false (no grounded readout) even though the jump happened (geoHeight
arc 0.000 → 1.67 synthetic, 6.035 → 7.715 DEM, sampled after the probe's
multi-tap expand).

Follow-up run (`/tmp/qa-mobile-f3.mjs`, 390x844, both modes): F3 tap #1
hidden → compact (`Checks: 35/35`), tap #2 compact → expanded
(`Terrain checks: 10/10`, TER-09 present, geo 0.000 synthetic / 6.046 DEM),
tap #3 expanded → hidden, tap #4 hidden → compact. The toolbar **Debug**
button also expands the panel (compact → expanded, TER-09 present).
Conclusion: F3 diagnostics work on mobile; they need two taps from the
initial hidden state. Not a defect.

## 4. Interaction — live prompt, activation not exercised

The interaction prompt container is present in all 12 combos and shows a
live distance (`5.4–6.3 m / max 5.0 m — move closer`). No interactable is
within the 5.0 m range at spawn, so the E-activate path was **not exercised**
in this run. The prompt/distance system itself works.

## 5. Incident during this run: parallel rebuild broke the standalone server

At 06:24 UTC, while this QA was running, `.next/` was rebuilt (BUILD_ID
03:58 → 06:24) and `.next/standalone/` regenerated, which deleted the
manually copied `.next/standalone/.next/static/` directory. The running
standalone server then returned **HTTP 500 for every `/_next/static/...`
asset** (JS, CSS, fonts), so the page rendered only SSR HTML
(`Preparing 3D world…`, 0 canvases). The first two probe attempts measured
that broken state. Evidence:
`browser-synthetic-1920x1080-broken-server.png` and
`browser-synthetic-1920x1080-broken-server-f3.png`.
Fix applied (no source changes): re-copied `.next/static` + `public` into
`.next/standalone/` and restarted the server; root/JS/CSS/font all returned
200 and the world initialised in 3–9 s. The 06:24 rebuild output is
deterministic (same chunk names, HEAD unchanged at `f10d98c`, tree otherwise
clean), so the QA below ran against the same build. Lesson for future runs:
re-verify `/_next/static/...` returns 200 immediately before probing, and
coordinate builds with any parallel agent working in the same checkout.

## 6. Tooling notes (for the next QA run)

- `/opt/meta-chromium/chrome` refuses to start in this VM
  (`Hatch WebGL domain policy is required for browser startup`); the
  Playwright-bundled Chromium 141 works.
- `Runtime.evaluate` with `document.body.innerText` costs ~2 s per call
  under SwiftShader; `textContent` costs ~15 ms for light reads (the full
  state scrape is ~0.35–2.4 s depending on viewport).
- F3 cycles `compact → expanded → hidden → compact` (see
  `useWorldExplorer.ts` `toggle()`); a probe must tap until the desired state
  is observed, not assume one tap = expanded.
- The debug panel starts **hidden** at 390x844 and **compact** elsewhere.
- `grounded`/`anim`/`geoHeight` only exist in the DOM when their panels are
  open (character panel / F3-expanded debug panel); sampling the jump with
  F3 closed yields no data, not a failed jump.
- The standalone server must be restarted after any rebuild that regenerates
  `.next/standalone/`, and the static copy must be redone.

## Evidence files

- `browser-qa-2026-11-20.json` — per-combo machine-readable results (12 combos)
- `terrain-diagnostics-detail.json` — TER-01…TER-10 titles + geo telemetry, both modes
- `browser-<synthetic|dem>-<viewport>.png` (12) and `-f3.png` (12) screenshots
- `browser-synthetic-1920x1080-broken-server.png`, `browser-synthetic-1920x1080-broken-server-f3.png` — §5 incident
- `VERIFICATION_REPORT.md` — this report

---

# Full verification audit — all functions and phases (2026-11-20)

- **Date:** 2026-11-20, afternoon +07. **HEAD:** `f10d98c`. **Toolchain:** Node 22.23.5 / pnpm 12.14.0.
- **Scope:** source audit of Phases 01–20, all 8 quality gates re-run, browser re-QA above, stale-text fixes, standing-blocker re-probes. No commit, no push in this pass.

## Per-phase status

| Phase | Status | Evidence |
|---|---|---|
| 01–10 (simulation foundation) | **PARTIAL** | `PHASE_11_AUDIT_REPORT.md` §2 + `docs/migration/INTEGRATION_REPORT_2026_11_17.md`; core features PASS in-browser (this report, 12/12); pixel-perfect parity NOT VERIFIED; full collision/occlusion matrix NOT VERIFIED; rain/storm + day-sweep visual QA NOT VERIFIED; FPS 16–25 at 1920×1080 on earlier hardware, below the 60 target |
| 11 (audit) | **BLOCKED – NOT READY** (historical verdict) | `PHASE_11_AUDIT_REPORT.md:5`; its defects were later fixed in Phase 14, but the audit's own verdict stands as a historical record |
| 12 (geospatial core) | **PARTIAL** | `PHASE_12_IMPLEMENTATION_REPORT.md` §8; GEO-01–16 + tests PASS; Gemini Preview NOT VERIFIED |
| 13 (data source registry) | **PARTIAL** | `PHASE_13_IMPLEMENTATION_REPORT.md` §11; registry/validation/F3 delivered; no real dataset ingested at the time; Overpass unverified; `canRender` always refuses. Note: its "0 approved, 0 ingested" catalog was true 2026-11-18 and is superseded — Phase 16 moved `copernicus-dsm` to `approved-for-ingestion` and ingested the DEM pilot |
| 14 (satellite imagery alignment + stabilization) | **PARTIAL** | `PHASE_14_IMPLEMENTATION_REPORT.md` + `PHASE_14_COMPLETION_REPORT.md`; alignment/inspector/stabilization verified; no real satellite imagery / GCPs / legal approval; standalone 127.0.0.1 loop FAIL (re-verified today, see below); FPS 60 / device / Docker / GPU NOT VERIFIED |
| 15 (terrain provider architecture) | **PARTIAL** (product); implementation complete, **PUSHED** `b0722d87` + `5fc908a` | `PHASE_15_IMPLEMENTATION_REPORT.md` §18: 18/20 PASS, 2 PARTIAL |
| 16 (real terrain & DEM) | **PARTIAL**; implementation complete, **PUSHED** `f10d98c` | `PHASE_16_IMPLEMENTATION_REPORT.md` §17 (corrected 2026-11-20): **18 PASS, 5 PARTIAL, 1 NOT VERIFIED (P16-19)**, 0 FAIL. P16-21 moved PARTIAL → PASS after this report's full 6-viewport re-QA |
| 17 | **NOT STARTED — no spec exists** | No Phase 17 prompt/spec/plan anywhere in the repo. De-facto candidate scope is Phase 16 §20 (GCPs/RMSE, geoid decision, mountain pilot + tiling/LOD, DEM colliders, FABDEM licence, asset delivery, dead-code cleanup) — a hint, not a spec |
| 18 | **NOT STARTED — no spec exists** | Nothing in the repo defines Phase 18 scope |
| 19 | **NOT STARTED — no spec exists** | Nothing in the repo defines Phase 19 scope |
| 20 | **NOT STARTED — no spec exists** | Nothing in the repo defines Phase 20 scope |

Migration milestones M0–M13 (distinct from Product Phases): M0 PASS, M1 PASS, M2 PARTIAL, M3 PARTIAL, M4 INTEGRATED, M5 INTEGRATED, M6 INTEGRATED, M7–10 NOT RUN fully, M11–13 NOT RUN fully (`docs/PHASE_STATUS.md`).

## Per-function verification summary (2026-11-20)

| Function | Result | Evidence |
|---|---|---|
| World init / rendering (both modes, 6 viewports) | PASS 12/12 | This report, §Results; 2 canvases, 0 console errors |
| Character move / jump / grounding (synthetic + DEM) | PASS | Jump arcs 0.000→1.68→land; DEM 6.041→7.711→land; spawn DEM 6.0455 m |
| Camera (third-person, follow, orbit/zoom) | PASS | Distance constant 5.40 m; character centred in all screenshots |
| Collision | PARTIAL | Terrain grounding verified; DEM collision is terrain-only (no platform/rock/tree colliders in DEM mode); full collision/occlusion matrix NOT VERIFIED |
| Mini Map | PASS | Marker tracks character; Span 3000 m DEM / 144 m synthetic at 5 viewports (compact at 390×844, no Span label rendered there) |
| HUD / F3 diagnostics | PASS | Checks 35/35, Terrain checks 10/10, TER-01…10 PASS both modes; 2 earlier defects confirmed fixed |
| Weather (live) | PASS (today) | BFF `/api/weather` HTTP 200, 26 °C drizzle WMO #51; direct Open-Meteo HTTP 200, 26.5 °C. Quota reset since 2026-11-19; 429 handling unchanged |
| Interaction prompt | PARTIAL | Prompt live with live distance in all 12 combos; E-activate path NOT exercised (no interactable within 5.0 m of spawn) |
| WebGL context loss/restore | PASS | Verified in all 12 combos |
| i18n (en/vi), Health, SEO, API BFF | PASS | Gates + build 14 pages; no regression in 53-file test suite |
| Standalone server, `HOSTNAME=localhost` | PASS | This report's runs; static copy step required (see §5 incident) |
| Standalone server, `127.0.0.1` | **FAIL** | Re-probed today: `/` and `/en` both 307 → `Location: /` (loop to itself), Next 16.4.6; see `standalone-127-probe-2026-11-20.txt` |
| FPS 60 | NOT VERIFIED / NOT_APPLICABLE here | SwiftShader rAF 0.6–2.6 fps; no GPU/Docker in this VM |

## Gates (re-run 2026-11-20, HEAD `f10d98c`)

All 8 exit 0. Log: `gates-2026-11-20.log`; storybook full log: `build-storybook-2026-11-20.log`.

| Gate | Exit | Result |
|---|---|---|
| `pnpm lint` | 0 | 438 files, no diagnostics |
| `pnpm format:check` | 0 | 437 files |
| `pnpm type-check` | 0 | clean |
| `pnpm test` | 0 | **53 files / 302 tests, all passing** |
| `pnpm test:coverage` | 0 | **78.67% statements / 69.18% branches / 63.72% functions / 80.52% lines** (first re-measurement since Phase 15: 77.83/67.3/63.03/79.64) |
| `pnpm build` | 0 | 14/14 static pages |
| `pnpm build-storybook` | 0 | 31.07 s, **0 PLUGIN_TIMINGS** |
| `pnpm audit --prod` | 0 | No known vulnerabilities |

## Gaps FIXED in this pass

1. **Phase 16 "NOT pushed" falsehoods** — `docs/PHASE_STATUS.md` Phase 16 paragraph (NOT pushed, 52/298, browser QA not run) → PUSHED `f10d98c`, 53/302, coverage re-measured, browser re-QA 12/12, weather live; header date 2026-11-19 → 2026-11-20; Phase 13 catalog superseded note added.
2. **Phase 16 report stale post-push text** — header status, §15 opening, §18 heading, §19 rollback (was a dangerous `git checkout -- .` instruction; now `git revert f10d98c`), §20 items 1 and 7, §21 push authorisation — all corrected with dated notes, history preserved.
3. **Phase 16 acceptance P16-21** — PARTIAL → PASS after this report's full 6-viewport re-QA; tally now 18 PASS / 5 PARTIAL / 1 NOT VERIFIED. Report §7 bbox discrepancy clarified (source-window vs resampled-grid extent) and §10 spawn corrected to the measured 6.045524001121521 m.
4. **Phase 16 audit docs** — `KNOWN_ISSUES.md` (fixed-defects note, open item 1, rollback) and `BASELINE_REPORT.md` (browser QA done, coverage re-measured); `PERFORMANCE_REPORT.md` (browser frame cost measured on SwiftShader, weather live).
5. **Phase 15 report missed spots** — lines ~347 and ~384 ("local only, unpushed" / "nothing was committed") now carry dated 2026-11-20 correction notes pointing at `b0722d87` + `5fc908a`.
6. **README.md** — front-door status now mentions Phase 15 (Terrain Provider) and Phase 16 (real DEM pilot, `?terrain=dem`).
7. **Coverage re-measurement closed** — 78.67/69.18/63.72/80.52, recorded in the report, `PHASE_STATUS.md` and `PERFORMANCE_REPORT.md`.
8. **Weather live observation closed for today** — BFF 200 + direct Open-Meteo 200 (26 °C), recorded with date; the 429 was a daily-quota reset, not a code fix.

## Gaps NOT fixable in this VM — what the USER must provide/do

| # | Gap | Why it cannot be done here | What the user must provide/do | What happens once provided |
|---|---|---|---|---|
| 1 | Real satellite imagery + legal approval (Phases 14, 01–10 pixel parity) | No licensed imagery exists in the repo; downloading/using imagery without a licence would be unauthorised | Provide licensed satellite imagery for Da Nang (source, licence terms, attribution, coverage, capture date) or written approval to use a specific source | Phase 14 can ingest it through the Phase 13 registry, run the alignment inspector against it, and certify pixel parity |
| 2 | Surveyed GCPs / independent elevation checkpoints + RMSE (P16-19, Phase 14) | No ground-truth data exists; asset checkpoints are self-consistency only | Provide surveyed ground control points (lat/lon/height, datum, survey method/date) or an independent authoritative dataset (e.g. a second DEM) for Da Nang | RMSE / max / mean residual can be measured; P16-19 and Phase 14 geographic certification can move to PASS |
| 3 | EGM2008 geoid conversion / ellipsoid alignment decision | No verified undulation value for Da Nang was sourced; inventing an offset is forbidden | Provide a verified EGM2008 undulation value for the pilot area, or formally approve staying orthometric (world Y = EGM2008 height) as the production decision | The DEM can be labelled production-ready (`isProductionReady`) or stay a labelled pilot with a documented decision |
| 4 | FPS 60, physical-device QA, Docker build, GPU profiling | This VM has no Docker, no GPU (`/dev/dri` absent), no physical device; SwiftShader gives 0.6–2.6 fps | Provide a real-GPU machine / Docker host / physical device (or run the repo's `fps-probe.mjs` + `DOCKER_CHECKLIST.md` + `PHYSICAL_DEVICE_CHECKLIST.md` there) and share the results | FPS 60 and long-term GPU profiling can be measured and certified |
| 5 | Next.js standalone `127.0.0.1` redirect loop (#94745) | Upstream bug; latest stable Next is still 16.4.6 with no fix; PR #95917 state unverifiable today (GitHub API 403 rate limit) | Nothing to provide — wait for the fix to land in a stable Next release, or approve testing a canary (currently 16.5.0-canary.57) | Upgrade Next, re-run `standalone-127-probe`, and the FAIL can close; until then keep `HOSTNAME=localhost` / `0.0.0.0` |
| 6 | DEM collision objects (platforms/rocks/trees) in DEM mode | Requires a design decision + placement work from DEM heights, not yet specified | Approve the Phase 17 scope item (re-place colliders from DEM heights) or accept terrain-only collision as the documented limit | DEM mode gains full collision parity with synthetic mode |
| 7 | E-activate interaction path | No interactable within 5.0 m of spawn in either mode | No provision needed — a QA task: place/move an interactable within range (or a test spawn) so the E path can be exercised | Interaction activation can be verified end-to-end |
| 8 | Phases 17–20 specs | No spec exists anywhere in the repo; the old roadmap hints are obsolete (Phase 16 was terrain, not roads) | Send the Phase 17 spec (scope + P17-xx acceptance criteria, datasets/licences, browser-QA matrix, certification method) — and likewise for 18–20 when ready | Phases 17–20 can be implemented and verified the same way as 15–16 |
| 9 | Larger-area DEM / mountain pilot / tiling-LOD | Needs a dataset + asset-delivery decision for assets larger than the 40 KB pilot (no Git LFS without approval) | Approve a larger DEM area and the asset delivery mechanism (repo vs approved static hosting) | A mountain/steep-slope pilot and tiling/LOD can be built (Phase 17 candidate scope) |
| 10 | Official Vietnamese / Da Nang high-resolution DEM | No public download route found; MONRE/DONRE data is not openly licensed | Make a formal MONRE / Da Nang DONRE data request, or supply a licensed high-resolution dataset | The 30 m Copernicus pilot can be replaced/cross-checked with authoritative local data |

## Overall verdict

**PARTIAL.** Everything that can be verified in this VM is verified: all 8 gates exit 0, 53/302 tests pass, the world works in both modes at all 6 viewports, the real DEM pilot is live behind `?terrain=dem`, and every stale status found in this audit has been corrected with dated notes. What remains is genuinely external: real imagery/GCPs, a geoid decision, a GPU/Docker/physical device, the upstream Next.js fix, and the Phase 17–20 specs — all listed above with exactly what the user must provide.
