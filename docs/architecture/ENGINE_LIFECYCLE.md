# Engine lifecycle — browser integration

`EngineRuntime` nhận FrameScheduler và RuntimeSystem[]; start idempotent, stop cancel RAF, restart reset time, delta tối đa 0.05s. Update failure dừng loop và gửi onError. Dispose ngược thứ tự, cố dọn tất cả systems, gọi lỗi sau cleanup. `src/modules/WorldExplorer/runtime/world.ts` nối browser RAF, input, scene, camera, ResizeObserver, visibility, pagehide/pageshow và WebGL context events.

`ResourceScope` chỉ nhận resource sở hữu, deduplicate identity và dispose đúng một lần; borrowed shared resources không đăng ký vào scope con. `createSyntheticRockCatalog` sở hữu geometry/material. Element handles chỉ remove mesh. Zone rollback dọn instances đã tạo nếu factory sau lỗi. Instanced grass đăng ký cả mesh (instance buffer), geometry và material trước khi gắn vào scene.

Renderer adapter `createWebGlRenderer` giữ WebGL2, ACES, sRGB, shadow configuration và DPR tối đa 2. `captureOverview` dùng viewport/scissor của renderer chính, sao chép kết quả vào canvas 2D của Mini Map và khôi phục render target/viewport/scissor trong finally. Runtime tạm ẩn atmosphere/character, nâng ambient lighting cho map và luôn khôi phục visibility, fog và lights sau capture.

Khi dispose, adapter gọi Three.js `resetState()` trước `dispose()` trong try/finally. Retry tạo canvas mới theo generation. Adapter gom context release vào một microtask và chỉ gọi `forceContextLoss()` nếu không có renderer mới dùng lại canvas; cách này giữ React Strict Mode setup/cleanup/setup hoạt động đúng. Reset khôi phục texture unpack flags trước disposal. Mesh/catalog resources vẫn có owner riêng, không bị renderer dispose thay.

Loop cập nhật physics, rig/dust, camera, environment, targeting, map và main render. Targeting chạy 20 Hz, HUD 10 Hz, clock/solar 1 Hz; marker/cone dùng DOM refs. Frame-time quality sampling nằm trong runtime, không lưu per-frame state vào React. Runtime dừng và release inputs khi document hidden, pagehide hoặc context lost; restored context resize và restart một loop.

Adaptive DPR changes set a pending resize, applied before the next frame's map/main draw. Resizing the drawing buffer after drawing would clear the visible frame. Browser resource instrumentation across five retries returned to one active context and stable native buffer/texture/program counts; see the [browser QA report](../migration/evidence/PHASE_1_TO_10_BROWSER_QA_REPORT.md) for scope and measurements.

`useWorldExplorer` dispose runtime khi unmount hoặc Retry đổi generation. Retry áp dụng lại map, weather và blocked-dialog state. Reset giữ `perf` và `isPointerLocked`, tránh bất đồng với closure quality controller hoặc DOM pointer lock. Existing weather requests được abort khi unmount/superseded; stale observations không bị thay bằng fabricated defaults.

Regression: `src/modules/WorldExplorer/__tests__/world.test.ts`, `retry-lifecycle.test.tsx`, `src/engine/core/__tests__/runtime.test.ts`, `src/engine/controls/__tests__/events.test.ts`, và renderer/prefab tests. Browser evidence và giới hạn nằm trong `docs/migration/MIGRATION_REPORT.md`. Repeated mount/context recovery là smoke coverage, không thay GPU heap profiling dài hạn.
