# Trạng thái implementation

Ngày: 2026-11-19. Đây là trạng thái theo source và kiểm chứng thực tế, không phải chứng nhận hoàn tất toàn bộ master specification.

Milestone (M0–M13) là các mốc migration của boilerplate/TSX lịch sử, khác với Product Phase 1–15 của mô phỏng (xem đoạn Product Phase bên dưới).

| Migration Milestone (M0–M13) | Trạng thái | Bằng chứng / phần còn lại |
|---|---|---|
| 0 | PASS audit repository | BASELINE_REPORT; nguồn gốc bảo toàn |
| 1 | PASS sau archive isolation | Suite chạy lại Node 22; xem MIGRATION_REPORT |
| 2 | PARTIAL | Đã research official docs; thiếu benchmark và data/license verification |
| 3 | PARTIAL | Boundary contracts/ADR có; streaming/performance chưa chứng minh |
| 4 | INTEGRATED | Migration map cập nhật actual paths; original TSX/handover được giữ nguyên |
| 5 | INTEGRATED; QA còn giới hạn | Scene, camera, renderer, lifecycle, controller, input, registries và resources đã nối vào homepage |
| 6 | INTEGRATED; không chứng nhận full parity | HUD, render loop, weather BFF, translations và homepage hoạt động; xem evidence và giới hạn ở báo cáo integration |
| 7–10 | NOT RUN đầy đủ | Có prefab/schema/reuse proof ban đầu; chưa kết luận hoàn thành các milestone |
| 11–13 | NOT RUN đầy đủ | Chưa cấu hình cross-tool hoặc final product QA |

Product Phase 11: audit delivered, BLOCKED – NOT READY. Product Phase 12: implementation delivered, PARTIAL. Product Phase 13: registry/ingestion implementation delivered, PARTIAL; see `PHASE_13_IMPLEMENTATION_REPORT.md` for historical evidence and acceptance. Product Phase 14: raster alignment/trust inspector và stabilization delivered, **PARTIAL**; see `PHASE_14_IMPLEMENTATION_REPORT.md`. Chưa có ảnh satellite/GCP thật được duyệt. (Storybook warning và advisory picomatch đã xử lý ngày 19/11 — xem đoạn Phase 14 completion bên dưới.) Milestone 11 tooling trong master là khái niệm khác. Phase 15: Terrain Provider Architecture & DEM Readiness implemented locally on 2026-11-19, **NOT pushed** (no push authorization; no local commit made) — see `PHASE_15_IMPLEMENTATION_REPORT.md`. Unified `TerrainProvider` contract in `src/engine/terrain/` (pure TS, no React/Next/Three), strict metadata/validation + grid DEM provider in `src/world-core/terrain/` (datum mandatory, no invented geoid), TEST-ONLY 5×5 fixture, synthetic terrain refactored into the provider with the Phase 1–10 formula preserved verbatim and still the production default; one elevation evaluation per character tick (was up to 3×). Gates exit 0: lint/format/type-check/test 47 files / 280 tests/coverage 77.83%/build 14 pages/build-storybook 0 PLUGIN_TIMINGS/audit --prod 0. Browser (headless, SwiftShader): world initializes with 2 canvases at six viewports, spawn (0,0), W moves, JUMP, F3 "Terrain checks: 8/8", checks chip 33/33, WebGL context loss/restore verified, 0 console errors. Root cause found for the earlier "0 canvases" headless result: the standalone server was started without copying `.next/static` + `public` into `.next/standalone/`, so all static subresources failed — a test-harness setup error, not an app defect. Still NOT VERIFIED: FPS 60 / physical device / Docker / GPU profiling, no real DEM exists, DEM-driven mesh sizing is Phase 16 work.

Phase 14 completion (2026-11-19, xem `PHASE_14_COMPLETION_REPORT.md`): vẫn **PARTIAL** tổng thể, nhưng đã hoàn thiện và kiểm chứng thật: Storybook zero-warning gate (tắt react-docgen, build 12.85s, 0 PLUGIN_TIMINGS), Node 22 rerun cho lint/type-check/test/build, coverage exit 0 (41 files / 237 tests), HUD overlap ở 1024×768 / 844×390 / 390×844 (browser hit-test thật: trước 17/21, 9/18, 14/21 → sau 21/21, 18/18, 16/16), advisory picomatch đã bị GitHub withdrawn nên `pnpm audit --prod` = 0. Còn BLOCKED / NOT VERIFIED: ảnh vệ tinh/GCP/legal approval/dữ liệu địa lý thật, Overpass (server at capacity), standalone bind 127.0.0.1 redirect loop (upstream Next.js #94745, dùng localhost hoặc 0.0.0.0), FPS 60, thiết bị vật lý, Docker daemon, GPU profiling dài hạn.

Verification 2026-11-19 (xem `docs/audit/verification-2026-11-19/VERIFICATION_REPORT.md`): standalone 127.0.0.1 vẫn **FAIL** 307 loop trên Next 16.4.6 (latest stable; PR sửa #95917 vẫn open, chưa có trong canary 16.5.0-canary.55) — giữ workaround localhost/0.0.0.0. Open-Meteo trực tiếp trả 429 "Daily API request limit exceeded" qua egress IP dùng chung; BFF đã thêm xử lý 429 riêng (trả 429 + `Retry-After`, client không retry vào 429) nhưng quan trắc live vẫn **NOT VERIFIED** vì quota IP dùng chung đã hết. FPS 60 / thiết bị vật lý / Docker / GPU dài hạn vẫn **NOT VERIFIED** (VM này không có Docker, không có GPU); đã thêm script probe FPS và checklist thiết bị/Docker để chạy trên máy thật.

Prompt 02 browser verification: [QA report](migration/evidence/PHASE_1_TO_10_BROWSER_QA_REPORT.md). Chrome and Edge exercised the actual simulation; six viewport screenshots include direct comparisons with the independently executed Phase 10 TSX. Retry resource ownership and adaptive-quality blank-frame defects were fixed. Physical devices, broader browser coverage, and production GPU performance remain unverified.

`/` và `/vi` render WorldExplorer thật với Three.js WebGL2, character, synthetic terrain, Mini Map, time/weather và interaction HUD. Không có Header/Footer boilerplate trên simulation. Health và locale negotiation vẫn được giữ. Demo Posts/ProxyExampleCard đã bị loại bỏ; reusable API infrastructure vẫn còn.

Geographic world data: chưa có authoritative snapshot hoặc verified control points. Tất cả spatial fixtures hiện tại là synthetic. Không tạo `/explore`, `/about`, `/places`, first-person hoặc Phase 11 trong batch này.

Bằng chứng và phạm vi QA hiện tại: [Integration report, 2026-11-17](migration/INTEGRATION_REPORT_2026_11_17.md). Live weather từng trả 502 do certificate store của Node trên host; đã kiểm tra observation live qua BFF và browser với Node `--use-system-ca`, vẫn giữ TLS verification. Các tests dùng fixture được ghi riêng. Chưa có pixel-perfect visual parity, kiểm thử thiết bị thật hoặc GPU memory profiling dài hạn.
