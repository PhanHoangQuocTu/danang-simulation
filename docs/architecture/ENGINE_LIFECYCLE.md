# Engine lifecycle — foundation hiện có

`EngineRuntime` nhận FrameScheduler và RuntimeSystem[]; start idempotent, stop cancel RAF, restart reset time, delta tối đa 0.05s. Update failure dừng loop và gửi onError. Dispose ngược thứ tự, cố dọn tất cả systems, gọi lỗi sau cleanup. API chưa tự xử lý visibility/context loss hoặc khởi tạo scene; client controller phải nối các việc này.

`ResourceScope` chỉ nhận resource sở hữu, deduplicate identity và dispose đúng một lần; borrowed shared resources không đăng ký vào scope con. `createSyntheticRockCatalog` sở hữu geometry/material. Element handles chỉ remove mesh. Zone rollback dọn instances đã tạo nếu factory sau lỗi.

Renderer adapter `createWebGlRenderer` giữ WebGL2, ACES và shadow settings gốc. Chưa expose viewport/scissor để migrate minimap; không coi adapter đã tương thích hoàn toàn loop gốc. Không có FPS đo cho adapter này.

Rollback migration: gỡ consumers mới; archive và route boilerplate vẫn nguyên. Không chỉnh history để tạo regression oracle.
