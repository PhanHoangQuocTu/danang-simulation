# Trạng thái implementation

Ngày: 2026-11-17. Đây là trạng thái theo source và kiểm chứng thực tế, không phải chứng nhận hoàn tất toàn bộ master specification.

| Milestone | Trạng thái | Bằng chứng / phần còn lại |
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

Product Phase 11: audit delivered, BLOCKED – NOT READY. Product Phase 12: implementation delivered, PARTIAL. Product Phase 13: registry/ingestion implementation delivered, PARTIAL; see `PHASE_13_IMPLEMENTATION_REPORT.md` for historical evidence and acceptance. Product Phase 14: raster alignment/trust inspector và stabilization delivered, **PARTIAL**; see `PHASE_14_IMPLEMENTATION_REPORT.md`. Chưa có ảnh satellite/GCP thật được duyệt; Storybook vendor warning và một security advisory chưa có bản vá vẫn còn. Milestone 11 tooling trong master là khái niệm khác. Phase 15 chưa triển khai.

Phase 14 completion (2026-11-19, xem `PHASE_14_COMPLETION_REPORT.md`): vẫn **PARTIAL** tổng thể, nhưng đã hoàn thiện và kiểm chứng thật: Storybook zero-warning gate (tắt react-docgen, build 12.85s, 0 PLUGIN_TIMINGS), Node 22 rerun cho lint/type-check/test/build, coverage exit 0 (41 files / 237 tests), HUD overlap ở 1024×768 / 844×390 / 390×844 (browser hit-test thật: trước 17/21, 9/18, 14/21 → sau 21/21, 18/18, 16/16), advisory picomatch đã bị GitHub withdrawn nên `pnpm audit --prod` = 0. Còn BLOCKED / NOT VERIFIED: ảnh vệ tinh/GCP/legal approval/dữ liệu địa lý thật, Overpass (server at capacity), standalone bind 127.0.0.1 redirect loop (upstream Next.js #94745, dùng localhost hoặc 0.0.0.0), FPS 60, thiết bị vật lý, Docker daemon, GPU profiling dài hạn.

Prompt 02 browser verification: [QA report](migration/evidence/PHASE_1_TO_10_BROWSER_QA_REPORT.md). Chrome and Edge exercised the actual simulation; six viewport screenshots include direct comparisons with the independently executed Phase 10 TSX. Retry resource ownership and adaptive-quality blank-frame defects were fixed. Physical devices, broader browser coverage, and production GPU performance remain unverified.

`/` và `/vi` render WorldExplorer thật với Three.js WebGL2, character, synthetic terrain, Mini Map, time/weather và interaction HUD. Không có Header/Footer boilerplate trên simulation. Health và locale negotiation vẫn được giữ. Demo Posts/ProxyExampleCard đã bị loại bỏ; reusable API infrastructure vẫn còn.

Geographic world data: chưa có authoritative snapshot hoặc verified control points. Tất cả spatial fixtures hiện tại là synthetic. Không tạo `/explore`, `/about`, `/places`, first-person hoặc Phase 11 trong batch này.

Bằng chứng và phạm vi QA hiện tại: [Integration report, 2026-11-17](migration/INTEGRATION_REPORT_2026_11_17.md). Live weather từng trả 502 do certificate store của Node trên host; đã kiểm tra observation live qua BFF và browser với Node `--use-system-ca`, vẫn giữ TLS verification. Các tests dùng fixture được ghi riêng. Chưa có pixel-perfect visual parity, kiểm thử thiết bị thật hoặc GPU memory profiling dài hạn.
