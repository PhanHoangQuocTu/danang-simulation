# Browser QA — Phase 17 Real GIS Roads & Buildings

- **Date:** 2026-11-20. **Head:** `986baab` + Phase 17 uncommitted work. **Tool:** Playwright headless Chromium (bundled Chromium 1194, SwiftShader).
- **Server:** standalone, `.next` re-synced into `.next/standalone/` (see §5 incident), `HOSTNAME=localhost`, port 3100/3000. Static assets verified 200 before probing.
- **Modes:** synthetic default (`/`) and GIS (`/?terrain=dem&gis=real`). `?gis=real` alone verified as a no-op (synthetic provider stays active).

## 1. Result matrix (12 combos)

| Viewport | Synthetic | GIS (`?terrain=dem&gis=real`) |
|---|---|---|
| 1920×1080 | PASS | PASS |
| 1366×768 | PASS | PASS |
| 1024×768 | PASS | PASS |
| 768×1024 | PASS | PASS |
| 390×844 | PASS | PASS |
| 844×390 | PASS | PASS (parent re-probe; see §3) |

PASS here means: world initialised, 2 canvases, checks chip 43/43, walk + camera work, 0 page errors, 0 failed requests, 0 console errors — except the two observations in §4.

Machine-readable results: `evidence/browser-qa-2026-11-20.json` (QA agent run, 12 combos).
Parent re-probe: `evidence/verify-parent-2026-11-20.json` + `verify-gis-*.png`.

## 2. What was observed

- **GIS diagnostics:** F3 panel shows **GIS checks: 8/8**, GIS-01..GIS-08 all PASSED (mode `osm-vector-danang-pilot-v1`; 1830 road runs / 418 buildings decoded; 0 runtime rejections; 525 junctions merged; 1830/1830 roads draped; 418/418 buildings placed; heights known 1 / estimated 7 / unknown 410; widths source 0 / estimated 1830). Visually confirmed in screenshots at 1024×768 and 390×844.
- **Roads/buildings visible:** pixel counts over the GIS screenshots — road colour ≈ 12–14% of pixels, extruded-building colour ≈ 0.2–0.4%, footprint colour ≈ 0.4–0.6% (`evidence/gis-pixel-counts.json`). Screenshots show the blue road ring + ribbon around spawn, a grey extruded slab, trees, lamps, and the grounded character. Mini Map Span 3000 m in GIS mode (144 m synthetic).
- **Movement/camera:** W-walk changes position/heading in all combos (e.g. heading 180.0 → 270.6/315.6/338.0); camera distance constant 5.40 m at spawn, after walk and after jump; spawn geoHeight 6.046 m (DEM) / 0 m (synthetic); grounded throughout.
- **Weather:** LIVE during the QA run (25 °C, thunderstorm, WMO #95, observed 15:45–16:09).
- **E-activate:** prompt present in all combos ("6.5–6.9 m / max 5.0 m — move closer"); no interactable within 5.0 m of spawn, so the activation path itself was not exercised.
- **No-op check:** `?gis=real` alone keeps the synthetic provider (TER-09 synthetic) — documented behaviour confirmed.

## 3. Parent re-probe (resolves QA-agent anomalies)

The QA agent's JSON contained two values that looked like failures; the parent agent re-probed them with a corrected harness:

1. **`844x390 worldInitialised=false` (timeToInit ~49 s) — PROBE ARTIFACT, world is fine.** Re-probe: checks 43/43 after **3.3 s**, 2 canvases, 0 console/page/failed-request errors. The QA agent's init signal never arrived at that viewport, but checks 43/43, walk and camera all worked there in their own run too.
2. **`390x844` checks chip unreadable at spawn — UI BEHAVIOUR, not a defect.** At 390×844 the debug/chips UI starts hidden and only renders after the panel is opened at least once (same as Phase 16). The parent screenshot `verify-gis-390x844-f3.png` visibly shows the **Checks: 43/43** chip, Elevation 6.05 m and the grounded character on the GIS road ring.
3. **Context loss/restore — NOT VERIFIED (inconclusive, both probes).** The QA JSON records `loseContext.ok=true` but `restoreContext.ok=false` (reason `no-lose-context-ext`); `afterRestore` has position/geoHeight null, anim IDLE, 2 canvases persist. The earlier draft text saying "lose/restore both return ok" was incorrect — corrected 2026-11-20 after re-reading the JSON directly. Whether the world resumes rendering after restore is NOT established. Do not claim context-restore PASS.

## 4. Open observations (not defects of Phase 17 code)

- **Weather live — false in 3 of 12 combos in the primary run.** `weatherLive=false` at 390×844 in both modes and at 844×390 in GIS mode (the other 9 combos were LIVE, 25 °C thunderstorm WMO #95). The 390×844 runs show the weather widget as "-- °C" (unavailable), consistent with the known shared-IP Open-Meteo 429 pattern — stated as consistent-with, not proven. *(Correction 2026-11-20, pre-push: the draft §2 said only "Weather: LIVE during the QA run"; the per-combo `weatherLive` flags were not recorded there.)*
- **Jump arc on GIS terrain — NOT VERIFIED.** Neither probe captured an airborne phase (geoHeight flat ~6.04 m, grounded throughout). Root cause is the probe, not the code: bare keyboard Space does nothing unless the on-screen Jump button is focused (`useWorldExplorer.ts` binds Space/Enter to the button element). Jump code is unchanged from Phase 16, where the arc 6.046 → 7.718 → 6.038 m WAS captured. A follow-up probe should click the Jump button and sample the F3 geoHeight readout.
- **3 console errors in the parent 390×844 run (texts not captured).** The same run's screenshot shows the weather widget as "-- °C" (unavailable), consistent with the known shared-IP Open-Meteo 429 pattern (3× 429 per mode in the 2026-11-20 follow-up QA). Stated as consistent-with, not proven. The QA agent's full run at the same viewport recorded 0 console errors and LIVE weather.
- **FPS NOT_APPLICABLE on SwiftShader** (HUD chip shows FPS 0 / Frame 0.0 ms — a software-renderer artifact, same as Phases 15–16). No FPS figure is claimed.

## 5. Harness incidents (for the next QA run)

- **Parallel rebuild broke the standalone server (twice).** While a QA run was in progress, a `pnpm build` / `build-storybook` regenerated `.next/standalone/` and deleted the manually copied `.next/standalone/.next/` directory, so the running server returned HTTP 500 for every `/_next/static/...` asset (JS/CSS as `text/plain`, MIME refusals). Fix: re-sync `.next` into `.next/standalone/` (rsync, excluding cache) and restart the server; verify a real JS chunk returns 200 before probing. Lesson: never run a build while a standalone server is serving, and always re-verify `/_next/static/...` returns 200 immediately before probing.
- **QA agent process errored at the end** ("restart drain in progress") after writing all evidence but before writing this report; the JSON + screenshots were complete and were verified by the parent instead.
- **F3 expansion in headless Chromium is fragile.** Bare F3 key presses and Debug-button scans are slow/unreliable under SwiftShader (each `innerText` read costs ~2 s). The QA agent's script opened the panel reliably; the parent's re-probe could not reproduce the expansion and relied on the agent's screenshots + JSON for GIS panel content. Future probes should reuse the QA agent's script (`qa-phase17.mjs` approach) rather than a fresh one.

## Evidence files

- `evidence/browser-qa-2026-11-20.json` — per-combo machine-readable results (12 combos)
- `evidence/gis-pixel-counts.json` — road/extruded/footprint pixel counts per GIS screenshot
- `evidence/browser-<mode>-<viewport>.png` (12) and `-f3.png` / `-f3-gis.png` (24) screenshots
- `evidence/browser-gis-1024x768-context-before/lost/restored.png` — context-loss sequence (see §3.3: inconclusive)
- `evidence/browser-synthetic-1024x768-zoomed-out(-back).png`, `browser-gis-1024x768-lookaround-yaw/pitch.png` — look-around sequence (heading readout null in JSON; screenshots are the evidence)
- `evidence/verify-parent-2026-11-20.json`, `evidence/verify-gis-844x390.png`, `evidence/verify-gis-390x844-f3.png`, `evidence/verify-gis-1024x768-f3-gis.png` — parent re-probe
