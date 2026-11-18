# Phase 14 — IMG-01–IMG-72

Ngày 2026-11-18, Asia/Bangkok. Không đồng nhất unit fixture với dữ liệu satellite thật.
AUTOMATED_PASS chỉ áp dụng input/assumptions được test. BROWSER_PASS là Chrome headless
trên Windows/Intel, không chứng nhận thiết bị thật. Một row có thể ghi giới hạn nhỏ hơn full acceptance.

Evidence aliases:

- A: `src/engine/imagery/__tests__/alignment.test.ts`, `evidence/review-green.txt`.
- R: `src/world-core/registries/__tests__/imagery.test.ts`, `evidence/trust-preview-latest.txt`.
- T: `src/modules/WorldExplorer/__tests__/imagery-preview.test.ts` (decoder mocked; không ảnh thật).
- C: `imagery.test.tsx`, `imagery-lifecycle.test.tsx`, `evidence/stale-preview-green.txt`.
- B: `evidence/after-browser.json`, production build Next 16.4.5; scenario names ở từng row.
- S: `evidence/storybook-browser.json`, ba story scenarios.
- G: `evidence/final-*.txt`, `evidence/coverage-retry.txt`; xem report cho command/exit và warnings.

| ID | Status | Phép kiểm và evidence / giới hạn |
|---|---|---|
| IMG-01 | AUTOMATED_PASS | A/R: metadata hợp lệ với source/legal fixture được chấp nhận; không có real asset |
| IMG-02 | AUTOMATED_PASS | A: zero/negative/fractional/nonfinite/over-limit dimensions |
| IMG-03 | AUTOMATED_PASS | A: NaN/Infinity coefficients |
| IMG-04 | AUTOMATED_PASS | A: singular và near-singular matrix; condition limit |
| IMG-05 | AUTOMATED_PASS | A: identity forward/inverse independently fixed vector |
| IMG-06 | AUTOMATED_PASS | A: negative row Y north-up corner; explicit floating tolerance |
| IMG-07 | AUTOMATED_PASS | A: rotated affine with signed off-diagonals |
| IMG-08 | AUTOMATED_PASS | A: shear inverse ở projected-like large numeric magnitudes; không phải supported projected CRS |
| IMG-09 | AUTOMATED_PASS | A: exact half-pixel center/edge normalization |
| IMG-10 | AUTOMATED_PASS | A: TL/TR/BR/BL/TL edge footprint |
| IMG-11 | AUTOMATED_PASS | A: missing/unknown CRS fails closed |
| IMG-12 | AUTOMATED_PASS | A: lon/lat orientation, height separate; inverted input rejected |
| IMG-13 | AUTOMATED_PASS | A: projected CRS unsupported fails explicitly; không real approved projected asset cần transform |
| IMG-14 | AUTOMATED_PASS | A/C: East-right/North-up, nonzero origin applied once |
| IMG-15 | AUTOMATED_PASS | A: pixel→world→pixel error <1e-6 px under explicit common ellipsoid height |
| IMG-16 | AUTOMATED_PASS | A: bow-tie/order/range/affine footprint mismatch |
| IMG-17 | AUTOMATED_PASS | A: wrapping/polar unsupported extents rejected |
| IMG-18 | AUTOMATED_PASS | A: mirror/upside-down rejected by documented orientation policy |
| IMG-19 | AUTOMATED_PASS | A: extent/GSD mismatch/resource policy |
| IMG-20 | AUTOMATED_PASS | A: no-data marker including zero, nonfinite sample unavailable; no manufactured content |
| IMG-21 | AUTOMATED_PASS | A/C: no implicit altitude, immutable reference, no physics writeback |
| IMG-22 | BROWSER_PASS | B F3-diagnostics: GEO-01–16 + DIAG-01–09; unchanged meanings, full suite G |
| IMG-23 | AUTOMATED_PASS | R: approved display/redistribution legal fixture; real permission BLOCKED |
| IMG-24 | AUTOMATED_PASS | R/T: unknown/rejected/missing rights; no fetch on denial |
| IMG-25 | AUTOMATED_PASS | R/C: attribution preserved; successful mocked preview displays accessible link |
| IMG-26 | AUTOMATED_PASS | A/R/T: source/asset/version checks, GCP version mismatch, content-addressed hash path; no cache |
| IMG-27 | AUTOMATED_PASS | R/T: arbitrary URL, encoded traversal and non-approved local paths blocked |
| IMG-28 | AUTOMATED_PASS | R: malformed record, missing provenance/unknown source |
| IMG-29 | AUTOMATED_PASS | A: three non-collinear matched fixture points accepted, authority false remains unverified |
| IMG-30 | AUTOMATED_PASS | A: duplicate/collinear/near-collinear/clustered/out-of-bounds/wrong-version controls |
| IMG-31 | AUTOMATED_PASS | A: calibration kept separate; calibration-only has zero holdout and no certification |
| IMG-32 | AUTOMATED_PASS | A: known offset RMSE/max; distant-anchor regression fails then passes after local residual fix |
| IMG-33 | AUTOMATED_PASS | A: outlier remains in max and RMSE, no smoothing |
| IMG-34 | AUTOMATED_PASS | A/R: source-record thresholds change decision; UI keeps accuracy caveat |
| IMG-35 | AUTOMATED_PASS | A/C: absent or nonauthoritative holdout remains NOT VERIFIED |
| IMG-36 | AUTOMATED_PASS | A: unavailable CRS/datum pipeline fails closed, no approximate VN-2000/UTM |
| IMG-37 | AUTOMATED_PASS | R: capture date null preserved |
| IMG-38 | AUTOMATED_PASS | R/C: candidate/blocked/rejected source denied; stale canvas cleared on rejection/retry |
| IMG-39 | AUTOMATED_PASS | R/T: checksum/header/decoded dimensions and corrupt/truncated asset checks; PNG decoder mocked |
| IMG-40 | AUTOMATED_PASS | R: deterministic adapter and immutable registry, no duplicate catalog on retry |
| IMG-41 | BROWSER_PASS | B production-render: real synthetic WebGL scene; no satellite bytes/provider fetch |
| IMG-42 | BROWSER_PASS | B imagery-inspector + S: reversible labeled fixture footprint; real raster preview BLOCKED by missing asset |
| IMG-43 | AUTOMATED_PASS | C/A: pure read-only preview geometry; no terrain/controller dependency or scene mutation |
| IMG-44 | BROWSER_PASS | B imagery-inspector/production-render: original two canvases, one WebGL renderer; Mini Map retained |
| IMG-45 | AUTOMATED_PASS | T/C: cancellation/bitmap close/unmount/retry; no textures/materials allocated by 2D harness |
| IMG-46 | AUTOMATED_PASS | T/C + S rejected-asset: offline/MIME/404/corrupt fallback localized, no uncaught stack trace |
| IMG-47 | BROWSER_PASS | B context-loss-restore: native extension, ready recovery, GL error=0; real raster restoration unavailable |
| IMG-48 | BROWSER_PASS | B known-pointer-lock-second-click + events.test.ts: native lock, second click, Escape; touch/drag covered separately |
| IMG-49 | BROWSER_PASS | B known-interaction-cooldown + runtime/hook tests: repeat E consumed, Shift+E intentional route preserved |
| IMG-50 | BROWSER_PASS | B focus-dialog-reduced-motion, fixture dialogs; input lifecycle tests block focus/repeat/modifiers |
| IMG-51 | BROWSER_PASS | B hud-hit-1920x1080/hud-hit-1366x768: every visible button scroll/hit-tested |
| IMG-52 | BROWSER_PASS | B hud-hit-1024x768/hud-hit-768x1024: shared touch column, no guide occlusion |
| IMG-53 | BROWSER_PASS | B hud-hit-390x844/hud-hit-844x390: touch targets reachable; emulation only |
| IMG-54 | BROWSER_PASS | B vietnamese-F3; translation parity/placeholders in full suite G; source catalog en/vi |
| IMG-55 | NOT_VERIFIED | Reduced motion/focus labels tested; physical screen reader, actual 200% browser zoom, cutouts not fully verified |
| IMG-56 | BROWSER_PASS | B health-pages-and-root/health-route/weather-real-failure; metadata helpers/API/locale tests G; no exhaustive SEO crawl |
| IMG-57 | BROWSER_PASS | B: zero unexpected console warnings/exceptions; three blocked weather requests and two context lifecycle logs separated |
| IMG-58 | NOT_VERIFIED | Before/after short samples present; NOT COMPARABLE for causal performance claim; 60 FPS target not reached |
| IMG-59 | MANUAL_PASS | STYLE_ARCHITECTURE.md, unchanged token values/scoped names; B Health routes + screenshot review |
| IMG-60 | BROWSER_PASS | G Next/Storybook compile split CSS; B actual rendered scene and Health |
| IMG-61 | MANUAL_PASS | CONFIG_OWNERSHIP.md; one raster safety owner and per-asset accuracy thresholds; no monolithic config |
| IMG-62 | MANUAL_PASS | No new env/secret/server transport in client imports; browser network inspected; not universal secret scanning certification |
| IMG-63 | MANUAL_PASS | Independent review/import trace: engine/world-core have no React/Next/city imports; same source registry |
| IMG-64 | AUTOMATED_PASS | R/T: local content-addressed path, no redirects/credentials/proxy, timeout and bounded stream |
| IMG-65 | AUTOMATED_PASS | A/R/T: huge metadata/pixels/bytes, invalid PNG header and truncated/corrupt stream |
| IMG-66 | AUTOMATED_PASS | T: PNG-only exact path/content type/header/hash/dimensions; no persistent cache |
| IMG-67 | MANUAL_PASS | Dependency diff: security patches only; no warning suppression/new runtime framework; residual vendor issues reported |
| IMG-68 | AUTOMATED_PASS | Final lint/format evidence; zero diagnostic requirement read from output, not exit alone |
| IMG-69 | AUTOMATED_PASS | G strict types, 236 tests/41 files, full V8 coverage rerun exit 0 |
| IMG-70 | FAIL | Next production build exit 0; Storybook exit 0 but PLUGIN_TIMINGS persists on Node 22 |
| IMG-71 | BLOCKED | Frozen lockfile validated; Node 22 gates exercised. Docker client exists, daemon unavailable; Linux CI image not run |
| IMG-72 | MANUAL_PASS | Report/inventory/limitations match logs; Phase 15 not implemented, no commit/push |

Overall **PARTIAL**. Source bytes, real legal approval, authoritative GCPs, physical-device QA,
unpublished dependency fix, warning-free Storybook and available Docker daemon remain prerequisites.
