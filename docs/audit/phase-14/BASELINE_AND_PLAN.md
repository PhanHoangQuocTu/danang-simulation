# Phase 14 — Baseline và kế hoạch thực thi

Ngày: 2026-11-18, Asia/Bangkok. HEAD ban đầu `1296e6f`, branch `main`.
Thay đổi ban đầu duy nhất: prompt Phase 14 chưa tracked; bảo toàn nguyên nội dung.

## Thiết kế và giới hạn

Thực thi trực tiếp theo master spec và yêu cầu triển khai ngay, không mở vòng duyệt lại.
Tái sử dụng Phase 12 WGS84/ECEF/ENU và Phase 13 registry. Chỉ hỗ trợ raster EPSG:4326
đã preprocess, affine GDAL, height ellipsoid do caller chỉ định. Không tự viết UTM/VN-2000.
Không có raster hoặc GCP thật được duyệt. F3 cung cấp inspector và preview footprint
TEST DATA riêng; không thay scene, camera, collision hoặc terrain.

Chọn pure TypeScript + Zod hiện hữu thay vì thêm proj4/GeoTIFF khi chưa có asset cần chúng.
Preview 2D tránh thêm renderer/GPU ownership. Local PNG đã kiểm checksum là định dạng
preview duy nhất; không thêm proxy hay provider fetch. Registry vẫn là nguồn quyền duy nhất.

## Baseline

Host Windows, Node 26.13.1, pnpm 12.14.0; target `.nvmrc` là 22.
RTK bị sandbox từ chối; dùng native executable. pnpm.ps1 bị execution policy chặn;
dùng pnpm.cmd. Không sửa chính sách máy hoặc global config.
Lint/format/test baseline exit 0. Type/build/Storybook sandbox bị SWC cache chặn;
retry ngoài sandbox lưu riêng. Log trong `evidence/baseline-*.txt`.

## Công việc và acceptance

- [x] Baseline: sáu gates, browser trước sửa, metrics cùng máy; ghi lỗi và giới hạn.
- [x] DEF-01: regression pointer lock/capture; sửa engine input; kiểm tra drag/touch/release.
- [x] DEF-02: regression cooldown; phân biệt recognized/rejected với no target; giữ Shift+E.
- [x] Raster: schema/limits, affine inverse, center/corner, footprint, CRS/world, no-data.
- [x] GCP: IDs/version/roles, distribution, independent residual statistics và thresholds.
- [x] Trust: dùng rights/source registry; checksum/dimension/local-path gate; không fetch tùy ý.
- [x] Inspector: F3, i18n, fixture label, reversible preview; story và component tests.
- [x] CSS: tách tokens về src/styles, scope world, sửa overlap có bằng chứng; không đổi Health.
- [x] Verify: focused proof, full gates, browser responsive/lifecycle, security/performance review.
- [x] Report: IMG-01–72 có evidence hoặc lý do NOT_VERIFIED/BLOCKED; inventory/rollback.

## Rủi ro phải kiểm tra

Near-singular affine và half-pixel; antimeridian/axis flip; GCP calibration bị nhầm holdout;
quyền nguồn thay đổi sau khi load; asset bị hỏng/oversized; stale async preview sau unmount.
Không coi round-trip là survey accuracy. Không coi headless là thiết bị thật.

## Defect ledger

Các bước thực thi đã hoàn thành; checkmarks không đồng nghĩa mọi acceptance gate PASS.
Verdict và blockers cuối nằm trong `PHASE_14_IMPLEMENTATION_REPORT.md` và IMG matrix.

| ID | Evidence ban đầu | Owner | Acceptance |
|---|---|---|---|
| DEF-01 | events.ts gọi setPointerCapture vô điều kiện trước mouse handling | engine/controls/events.ts | Không capture khi pointer lock; browser second click sạch |
| DEF-02 | runtime null cả cooldown; hook null đổi Env | runtime/world.ts + hook | Cooldown không đổi Env; no-target fallback giữ nguyên |
| DEF-03 | Phase 11 ghi guide che toolbar, cần tái hiện mới | world CSS/HUD | Center hit-test các controls ở sáu viewport |
| DEF-04 | Node 26/SWC cache, chưa phải lỗi app | Runtime/vendor | Phân loại output; không suppress |
| DEF-05 | FPS lịch sử thấp; chưa có sample mới | Renderer/runtime | Đo trước/sau; không tối ưu suy đoán |
