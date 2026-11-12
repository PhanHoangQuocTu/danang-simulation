# ADR 0001 — Bảo toàn boilerplate và WebGL

Status: accepted cho migration foundation theo owner directive.
Giữ Three WebGL2, không thêm R3F/Cesium/MapLibre runtime. Tách engine/world/UI trước nâng renderer. Chi phí: cần loader/geodesy riêng; lợi ích: giữ hành vi Phase 1–10. WebGPU/tiles chỉ POC sau QA. Không có benchmark chứng minh đổi backend.

Archive `history/` bị root TypeScript glob kéo vào build; loại archive khỏi checks thay vì sửa user reference hoặc nới rules `src/`. Chỉ modules migrated mới thuộc production checks.
