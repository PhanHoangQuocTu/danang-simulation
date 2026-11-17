# MASTER IMPLEMENTATION PROMPT — PHASE 11
# DA NANG 3D OPEN WORLD SIMULATION
## ARCHITECTURE AUDIT, REGRESSION VALIDATION & REAL-WORLD READINESS

---

# 1. ROLE & EXECUTION MODE

Bạn là một đội ngũ chuyên gia kỹ thuật cấp Senior/Principal chịu trách nhiệm kiểm toán, đánh giá và chuẩn bị nền tảng cho dự án **DA NANG 3D OPEN WORLD SIMULATION**.

Hãy đồng thời đảm nhận các vai trò:

1. **Principal Software Architect:** Kiểm tra kiến trúc tổng thể, tính nhất quán và khả năng mở rộng.
2. **Senior React & TypeScript Engineer:** Kiểm tra React lifecycle, TypeScript, component architecture, state management và memory management.
3. **Senior Three.js / WebGL Engineer:** Kiểm tra Scene, Camera, Renderer, rendering pipeline, shaders, GPU resources và WebGL lifecycle.
4. **Game Engine Engineer:** Kiểm tra player controller, physics, animation, collision và world simulation.
5. **Performance Engineer:** Đánh giá FPS, frame time, draw calls, GPU memory, CPU overhead và responsive performance.
6. **QA Automation Engineer:** Xây dựng ma trận kiểm thử, thực hiện regression testing và xác minh chức năng.
7. **GIS / Geospatial Engineer:** Đánh giá khả năng chuyển đổi thế giới 3D hiện tại thành bản sao số có tọa độ địa lý thực tế.
8. **Environmental Simulation Engineer:** Đánh giá kiến trúc thời gian, mặt trời, thời tiết, gió, mây, mưa và các hiệu ứng môi trường.
9. **UI/UX & Accessibility Engineer:** Kiểm tra HUD, responsive layout, interaction, accessibility và trải nghiệm người dùng.

## Working principles

- Evidence-based engineering.
- Audit before implementation.
- No assumptions without verification.
- No duplicated features.
- No unnecessary refactoring.
- No fake data.
- No regression.
- No unverified PASS status.
- Performance and stability take priority over unnecessary visual complexity.

**Nhiệm vụ của bạn là hoàn thành PHASE 11 – AUDIT ONLY. Không triển khai Phase 12 hoặc các phase tiếp theo.**

---

# 2. PROJECT CONTEXT – BẮT BUỘC ĐỌC TOÀN BỘ TÀI LIỆU

Tôi cung cấp hai tài liệu nền tảng:

**FILE 01 – PROJECT HANDOVER**

`da_nang_3d_open_world_master_handover_context_transfer_phase_1_to_10.md`

Chứa:
- Project vision.
- Architecture principles.
- Technical constraints.
- Detailed Phase 1–10 specifications.
- Keybindings.
- Existing functionality.
- Performance requirements.
- Diagnostic specifications.

**FILE 02 – LATEST PHASE 10 SOURCE CODE**

`da_nang_3d_open_world_simulation_phase_10.tsx`

Đây là mã nguồn được Gemini tạo ra sau khi hoàn thành Phase 10.

Yêu cầu:

1. Đọc toàn bộ nội dung FILE 01.
2. Đọc và phân tích toàn bộ mã nguồn FILE 02, không chỉ đọc phần đầu hoặc các đoạn code được cung cấp trong context.
3. Mở source code thực tế đang được sử dụng trong workspace.
4. Xác định file nào đang thực sự được Preview sử dụng.
5. Đối chiếu mã nguồn hiện tại với FILE 02.
6. Kiểm tra sự khác biệt nếu có.
7. Không mặc định rằng file đính kèm và file đang chạy là cùng một phiên bản.
8. Không copy đè mã nguồn từ file bàn giao lên project hiện tại.
9. Không tự ý tạo lại project hoặc thay thế kiến trúc hiện có.

Nếu có sự khác biệt giữa tài liệu và source code, phải ghi nhận rõ ràng.

**Thứ tự ưu tiên khi xử lý xung đột:**

1. Source code thực tế đang chạy trong workspace.
2. Cấu hình và môi trường thực tế của project.
3. FILE 02 – Phase 10 source snapshot.
4. FILE 01 – Handover specification.
5. Roadmap Phase mới nhất đã được Project Owner phê duyệt.

Các quy định cũ về việc chỉ triển khai dữ liệu địa lý ở Phase 29+ không còn áp dụng. Roadmap mới đã xác định Geospatial Core bắt đầu từ Phase 12.

Tuy nhiên, Phase 11 chỉ kiểm toán và đánh giá readiness, không được triển khai các tính năng địa lý mới.

---

# 3. PROJECT VISION & EXISTING ARCHITECTURE

## 3.1. Project vision

Tên dự án:

**DA NANG 3D OPEN WORLD SIMULATION**

Mục tiêu dài hạn:

Xây dựng một thế giới mở 3D tương tác mô phỏng thành phố Đà Nẵng, Việt Nam.

Người dùng có thể:
- Điều khiển nhân vật 3D theo góc nhìn Third-person.
- Khám phá các địa điểm du lịch thực tế.
- Di chuyển trong không gian có tỷ lệ và tọa độ địa lý chính xác.
- Quan sát cảnh quan, công trình và môi trường giống ngoài đời.
- Trải nghiệm thời gian, ánh sáng và thời tiết thực tế.
- Tương tác với các vật thể và địa điểm.
- Mở rộng thế giới theo từng khu vực mà không cần tải toàn bộ thành phố.

Cấu hình địa lý nền tảng hiện có:

```ts
export const DA_NANG_CONFIG = {
  name: 'Da Nang',
  country: 'Vietnam',
  latitude: 16.0544,
  longitude: 108.2022,
  timezone: 'Asia/Ho_Chi_Minh',
  locale: 'vi-VN',
  utcOffset: '+07:00',
  utcOffsetHours: 7,
} as const;
```

Lưu ý: Đây là tọa độ tham chiếu trung tâm Đà Nẵng, không có nghĩa là thế giới 3D hiện tại đã được georeference chính xác.

## 3.2. Existing technical architecture

Theo tài liệu bàn giao, kiến trúc dự án hiện tại được thiết kế như sau:

- React 18.
- TypeScript Strict Mode.
- Three.js.
- `THREE.WebGLRenderer`.
- Tailwind CSS.
- CSS Custom Properties Design System.
- Single-file self-contained architecture cho môi trường Preview.
- Inline SVG icon system thông qua `createSvgIcon`.
- Không import `lucide-react` hoặc thư viện icon bên ngoài.
- Một WebGLRenderer duy nhất dùng chung Main Camera và Mini Map Camera.

Không tự ý chuyển sang:
- React Three Fiber.
- Drei.
- Rapier.
- Zustand.
- Next.js.
- Vite architecture khác.
- Nhiều renderer.
- Nhiều canvas.
- Hệ thống component mới không cần thiết.

Nếu source code thực tế đã khác, hãy ghi nhận trước và đánh giá dựa trên implementation đang chạy.

---

# 4. STRICT PHASE BOUNDARY

## 4.1. PHASE 11 OBJECTIVE

Tên phase:

**PHASE 11 – ARCHITECTURE AUDIT & REALITY READINESS**

Mục tiêu:

1. Xác minh toàn bộ chức năng Phase 1–10.
2. Đánh giá chất lượng source code.
3. Phát hiện lỗi tiềm ẩn và kiến trúc chưa ổn định.
4. Đánh giá hiệu năng thực tế.
5. Kiểm tra khả năng duy trì và mở rộng.
6. Đánh giá nền tảng Geospatial Readiness.
7. Đánh giá nền tảng Environmental Simulation Readiness.
8. Xây dựng Regression Baseline.
9. Chuẩn bị technical foundation cho Phase 12.

## 4.2. TUYỆT ĐỐI KHÔNG TRIỂN KHAI

Trong Phase 11, nghiêm cấm:

- Không tạo địa danh Đà Nẵng mới.
- Không tạo Cầu Rồng, cầu Sông Hàn hoặc các landmark thực tế.
- Không thay đổi terrain hiện tại.
- Không tạo hệ tọa độ WGS84 hoặc ENU mới.
- Không tích hợp ảnh vệ tinh.
- Không tích hợp Google Maps hoặc Cesium.
- Không tích hợp OpenStreetMap mới.
- Không tạo GIS pipeline.
- Không tạo hệ thống quản lý 3D assets mới.
- Không tạo thêm Weather API provider.
- Không thay đổi Open-Meteo integration.
- Không xây dựng shader cây đung đưa.
- Không thêm hiệu ứng mưa, mây hoặc gió.
- Không tạo physics simulation mới.
- Không thêm NPC hoặc phương tiện.
- Không thay đổi movement controller.
- Không thay đổi Mini Map.
- Không thay đổi HUD.
- Không redesign UI/UX.
- Không cài thêm dependencies.
- Không nâng cấp package versions.
- Không thay đổi build configuration.
- Không refactor toàn bộ App.tsx.
- Không xóa hoặc thay thế các tính năng đang hoạt động.

**PHASE 11 là một phase kiểm toán, không phải phase bổ sung chức năng.**

Nếu phát hiện lỗi, ghi nhận, phân tích và đề xuất phương án sửa chữa. Không tự ý sửa source code trong phase này.

---

# 5. MANDATORY ARCHITECTURE AUDIT

Thực hiện kiểm toán từng khu vực dưới đây.

## 5.1. Source Code & Project Structure Audit

Kiểm tra:

- Toàn bộ source code.
- File entry point.
- App.tsx và src/App.tsx nếu cùng tồn tại.
- React component lifecycle.
- Hooks usage.
- State management.
- Ref management.
- TypeScript types.
- Constants và configuration.
- Utility functions.
- Event handlers.
- Async operations.
- Error handling.
- Resource lifecycle.

Phát hiện:

- Dead code.
- Duplicate functions.
- Duplicate states.
- Duplicate event listeners.
- Unused references.
- Unnecessary object creation.
- Unsafe type assertions.
- Potential null/undefined errors.
- Race conditions.
- Stale closures.
- Missing cleanup.
- Memory leaks.
- Inconsistent naming.
- Unnecessary React re-renders.
- Logic được lặp lại ở nhiều vị trí.
- Những phần code có thể gây lỗi khi mở rộng.

Không refactor trong phase này.

Mỗi phát hiện phải có bằng chứng cụ thể: file, function, symbol hoặc line range.

## 5.2. Three.js & WebGL Audit

Kiểm tra chi tiết:

**Scene**
- Scene initialization.
- Object hierarchy.
- Geometry ownership.
- Material ownership.
- Texture management.
- Lighting.
- Fog.
- Sky dome.
- Star field.
- Sun and moon.
- Shadow configuration.

**Camera**
- PerspectiveCamera.
- OrthographicCamera.
- Camera follow.
- Camera rotation.
- Camera zoom.
- Ground clearance.
- Camera resize handling.

**Renderer**
- Renderer initialization.
- Pixel ratio.
- Antialiasing.
- Tone mapping.
- Shadow map.
- Viewport.
- Scissor.
- Scissor test.
- Render order.
- WebGL context loss.
- WebGL context restoration.

Bắt buộc kiểm tra:

1. Có thực sự chỉ tồn tại một `THREE.WebGLRenderer` không?
2. Mini Map có thực sự sử dụng chung renderer không?
3. Mini Map render pass có khôi phục đầy đủ trạng thái renderer sau khi kết thúc không?
4. Có xảy ra tình trạng viewport hoặc scissor ảnh hưởng đến Main Scene không?
5. Có tài nguyên GPU nào không được dispose không?
6. Có tài nguyên được dispose nhiều lần hoặc giải phóng khi vẫn còn được sử dụng không?
7. WebGL context restoration có thực sự phục hồi được rendering không?
8. Resize có cập nhật camera projection và renderer đúng cách không?
9. DPR có bị tăng quá mức không?
10. Có nguy cơ GPU memory leak khi mount/unmount không?

Không mặc định rằng một event listener `webglcontextrestored` đồng nghĩa với việc toàn bộ GPU resources đã được khôi phục. Phải kiểm tra thực tế.

## 5.3. Render Loop & Performance Audit

Kiểm tra toàn bộ `animate()` và các hệ thống được gọi bên trong.

Nguyên tắc đã thống nhất:

- Zero Per-Frame Object Allocation.
- Zero Per-Frame React Re-render.
- Dùng `requestAnimationFrame`.
- Giới hạn `deltaTime`.
- Dùng reusable vectors và scratch objects.
- Cập nhật player bằng refs.
- Cập nhật Mini Map marker trực tiếp qua DOM.
- Telemetry lấy mẫu 10Hz.
- Clock và solar lấy mẫu 1Hz.
- Interaction raycasting chạy 20Hz.
- Main renderer và Mini Map dùng chung WebGLRenderer.

Đặc biệt kiểm tra:

- Có `new THREE.Vector3()` bên trong vòng lặp không?
- Có tạo geometry/material mỗi frame không?
- Có tạo array/object không cần thiết mỗi frame không?
- Có gọi `setState` liên tục trong render loop không?
- Có tính toán lại dữ liệu bất biến không?
- Có raycasting quá thường xuyên không?
- Có render Mini Map không cần thiết không?
- Có xử lý particle quá nặng không?
- Có sort array hoặc thực hiện các phép tính tốn CPU trong hot path không?
- Có trường hợp delta time bất thường gây nhân vật dịch chuyển quá xa không?
- Có vấn đề khi browser tab chuyển background rồi quay lại không?

Kiểm tra cả adaptive quality:

- `ultra`.
- `balanced`.
- `performance`.
- DPR adjustments.
- Rain quality multiplier.
- Adaptive cooldown.

Đánh giá xem việc tự điều chỉnh chất lượng có ổn định hay gây nhấp nháy giữa các quality tiers.

## 5.4. React Lifecycle & Resource Cleanup Audit

Kiểm tra:

- `useEffect` initialization.
- Dependency arrays.
- React StrictMode compatibility.
- `requestAnimationFrame` cleanup.
- Event listener cleanup.
- `setTimeout` cleanup.
- `setInterval` cleanup.
- Fetch request lifecycle.
- Pointer Lock lifecycle.
- Pointer Capture lifecycle.
- WebGL renderer disposal.
- Texture disposal.
- Geometry disposal.
- Material disposal.
- Canvas DOM cleanup.

Đặc biệt test:

- Mount lần đầu.
- Unmount.
- Mount lại.
- Resize.
- Chuyển đổi orientation.
- Mở và đóng Preview.
- React StrictMode double-invocation nếu môi trường đang bật.

Không được xuất hiện:
- Hai canvas chồng lên nhau.
- Hai animation loops chạy đồng thời.
- Event handler bị đăng ký nhiều lần.
- Player điều khiển hai lần.
- WebGL resource tăng liên tục sau mỗi lần mount/unmount.

---

# 6. COMPLETE PHASE 1–10 REGRESSION AUDIT

Đây là phần quan trọng nhất.

Không được chỉ kiểm tra code tồn tại. Phải xác minh chức năng thực sự hoạt động trong Preview.

## PHASE 1 – 3D HUMAN CHARACTER & MOVEMENT

Các tính năng hiện có cần kiểm tra:

**Character**
- `createCasualExplorerRig`.
- Character hierarchy gồm các nhóm khớp xương.
- Đầu, mặt, tóc, ba lô, tay, chân, bàn tay và giày.
- Character proportions.
- Character animation.

**Movement**
- Walk: `4.5 m/s`.
- Sprint: `8.6 m/s`.
- Acceleration: `15.0`.
- Deceleration: `18.0`.
- Jump velocity: `9.8 m/s`.
- Gravity: `-25.0 m/s²`.
- Collision radius: `0.38m`.
- `maxDeltaTime: 0.05s`.

**Animation states**
- IDLE.
- WALK.
- RUN.
- JUMP.
- FALL.
- LANDING.

**Environment**
- Terrain 180m × 180m.
- Central plaza.
- Sin-shaped stone path.
- Five jumping platforms.
- Eight rocks.
- Eighteen trees.
- Forty-eight shrubs.
- 2,600 grass instances.
- World boundary radius 68m.

Kiểm tra:

- WASD.
- Arrow keys.
- Diagonal movement normalization.
- Sprint.
- Jump.
- Landing.
- Collision.
- Terrain following.
- Boundary restriction.
- Camera follow.
- Camera zoom.
- Camera rotation.
- Character animation synchronization.

Phải xác minh chuyển động không bị giật, xuyên địa hình hoặc mất điều khiển.

**Lưu ý:** Terrain hiện tại là môi trường thử nghiệm được tạo bằng mathematical terrain. Không được xem nó là địa hình thực tế của Đà Nẵng.

## PHASE 2 – CLOCK, SOLAR ASTRONOMY & WEATHER

Kiểm tra:

**Clock**
- `getDaNangClockData`.
- Timezone `Asia/Ho_Chi_Minh`.
- GMT+7.
- 24-hour format.
- Date formatting.
- Clock synchronization.

Không sử dụng giờ hệ thống cá nhân qua `.getHours()`.

**Solar**
- `calculateDaNangSolarData`.
- Solar declination.
- Equation of time.
- Dawn.
- Sunrise.
- Solar noon.
- Sunset.
- Dusk.
- Solar altitude.
- Solar azimuth.
- Sun direction.
- Daylight factor.
- Twilight factor.
- Automatic day/night transition.

**Weather**
- `fetchDaNangWeatherWithRetry`.
- Open-Meteo Forecast API.
- WMO weather code mapping.
- Payload validation.
- Retry logic.
- Weather freshness.
- Stale state.
- API error handling.

Thông số baseline theo tài liệu:

- Refresh interval: 15 phút.
- Stale threshold: 25 phút.
- Rain particles: tối đa khoảng 3,200.
- Weather effects: cloud cover, cloud darkness, sunlight attenuation, fog, rain, ground wetness và lightning.

Kiểm tra:

1. API có thực sự được gọi không?
2. Dữ liệu thực tế có được cập nhật không?
3. API lỗi có được xử lý đúng không?
4. Dữ liệu stale có được phân biệt với dữ liệu mới không?
5. Unknown WMO code có bị hiển thị như thời tiết thực tế không?
6. Invalid payload có gây NaN không?
7. Wind speed và wind direction có được sử dụng đúng không?
8. Weather status trên HUD có đồng bộ với weather state không?
9. Có retry không giới hạn không?
10. Có race condition khi nhiều request đồng thời không?

Không tạo dữ liệu thời tiết giả để làm cho UI luôn hiển thị trạng thái đẹp.

Nếu API unavailable, phải giữ nguyên nguyên tắc neutral/stale đã thống nhất.

## PHASE 3 – ADAPTIVE INPUT SYSTEM

Kiểm tra:

- `evaluateAdaptiveDeviceProfile`.
- Desktop.
- Tablet.
- Mobile.
- Hybrid input.
- Keyboard.
- Mouse.
- Touch.
- Virtual joystick.
- Pointer capture.
- Pinch zoom.
- Multi-touch.
- Sprint hold.
- Sprint double tap.
- Jump button.
- Input focus isolation.

Đặc biệt xác minh thao tác HUD không kích hoạt nhầm điều khiển nhân vật.

## PHASE 4 – DESIGN SYSTEM & HUD ARCHITECTURE

Kiểm tra:

- `DESIGN_SYSTEM_CSS`.
- CSS custom properties.
- Spacing scale.
- Typography scale.
- Color tokens.
- Border radius.
- Shadows.
- Motion tokens.
- Z-index hierarchy.
- `prefers-reduced-motion`.

Kiểm tra độc lập các HUD zones:

- Top-left.
- Top-right.
- Bottom-left.
- Bottom-right.

Đảm bảo HUD không che khuất các vùng quan sát quan trọng và không gây xung đột tương tác.

## PHASE 5 – PERSISTENT TIME & WEATHER WIDGET

Kiểm tra:

- Expanded.
- Compact.
- Không có trạng thái hidden.
- Compact luôn hiển thị giờ Đà Nẵng.
- Compact luôn hiển thị weather icon.
- Compact luôn hiển thị temperature hoặc `--°C`.
- Responsive trên mobile.
- Không tràn màn hình.
- Không che HUD khác.

## PHASE 6 – COLLAPSIBLE INFORMATION PANELS

Kiểm tra:

- `MiniDataChip`.
- `formatSafeChipValue`.
- Environment panel.
- Secondary info.
- Player status.

Các trạng thái:

- Expanded.
- Compact.
- Hidden.

Xác minh các panel hoạt động độc lập, không làm thay đổi trạng thái của nhau.

Không hiển thị `NaN`, `undefined`, `null` hoặc dữ liệu sai định dạng.

## PHASE 7 – ADAPTIVE MOVEMENT GUIDE

Kiểm tra:

- `DESKTOP_CONTROL_INSTRUCTIONS`.
- `TOUCH_CONTROL_INSTRUCTIONS`.
- `getActiveControlGuideInstructions`.

Xác minh:

- Desktop hiển thị đúng WASD và mouse controls.
- Mobile hiển thị đúng joystick và touch instructions.
- Chế độ hướng dẫn không nhấp nháy khi click HUD.
- Chỉ thao tác điều khiển thế giới mới làm thay đổi active input mode.
- Phím H hoạt động đúng.

## PHASE 8 – MINI MAP FOUNDATION

Kiểm tra:

- OrthographicCamera.
- Top-down rendering.
- Mini Map canvas.
- CompassIndicator.
- World Overview.
- Zoom In.
- Zoom Out.
- Reset Zoom.

Thông số tham chiếu:

- Camera height: 140m.
- Zoom range: 0.60x–2.80x.
- Default zoom: 1.0x.

Xác minh Mini Map luôn hiển thị được world geometry mà không bị mây, mưa hoặc fog làm mất khả năng quan sát.

## PHASE 9 – PLAYER & MAP SYNCHRONIZATION

Kiểm tra:

- `projectWorldToMiniMap`.
- Player marker.
- Direction cone.
- Player heading.
- World Overview mode.
- Player Follow mode.
- Edge indicator.
- Zoom synchronization.

Test thực tế:

1. Di chuyển theo hướng Bắc.
2. Di chuyển theo hướng Nam.
3. Di chuyển theo hướng Đông.
4. Di chuyển theo hướng Tây.
5. Xoay nhân vật.
6. Chuyển sang Follow.
7. Chuyển về Overview.
8. Zoom in/out.
9. Đi ra ngoài phạm vi quan sát.
10. Kiểm tra marker và EDGE badge.

Player position và Mini Map phải luôn đồng bộ.

## PHASE 10 – WORLD INTERACTION

Kiểm tra:

- `InteractableRegistry`.
- `register`.
- `unregister`.
- `setEnabled`.
- `toggleActivated`.
- `applyHighlight`.
- `restoreOriginalMaterial`.
- Raycasting.
- Distance validation.
- Occlusion.
- Cooldown.
- Contextual interaction.
- Feedback.
- ESC handling.

Ba fixture hiện tại:

1. `fixture-origin-monolith`.
2. `fixture-weather-telemetry-post`.
3. `fixture-calibration-beacon`.

Kiểm tra từng đối tượng:

- Có thể nhận diện mục tiêu.
- Highlight chính xác.
- Đúng khoảng cách tương tác.
- Không tương tác xuyên vật cản.
- Không kích hoạt lặp ngoài cooldown.
- Đúng nội dung contextual panel.
- Đúng trạng thái ON/OFF.
- Material được khôi phục chính xác.
- Registry cleanup hoạt động.

Đặc biệt kiểm tra sự phân biệt giữa phím `E` và `Shift + E` theo đặc tả bàn giao.

---

# 7. SELF-DIAGNOSTICS VALIDATION

Hệ thống hiện tại có:

`runSystemDiagnosticsSuite()`

Bao gồm 9 diagnostics:

- DIAG-01: Clock & Timezone.
- DIAG-02: Solar Astronomy.
- DIAG-03: WMO Weather Mapper.
- DIAG-04: Weather Payload Validation.
- DIAG-05: Adaptive Joystick Input.
- DIAG-06: Movement Guide.
- DIAG-07: Mini Map Zoom.
- DIAG-08: World-to-Map Projection.
- DIAG-09: Interactable Registry.

Yêu cầu:

1. Đọc toàn bộ implementation của từng diagnostic.
2. Xác minh logic test có thực sự kiểm tra đúng chức năng không.
3. Xác minh test có khả năng phát hiện lỗi hay chỉ kiểm tra các trường hợp dễ dàng.
4. Kiểm tra kết quả thực tế trong Preview.
5. Kiểm tra các diagnostics không gây side effects lên ứng dụng.
6. Kiểm tra có test nào luôn PASS do điều kiện quá lỏng hoặc dữ liệu được hardcode không.
7. Không sửa test chỉ để đạt 9/9.
8. Không tự tạo kết quả PASS.

**9/9 diagnostics PASS không đồng nghĩa toàn bộ Phase 1–10 đã được kiểm thử đầy đủ.**

Phải tách biệt:

- Unit / Logic Diagnostics.
- Integration Testing.
- Runtime Testing.
- End-to-End Testing.
- Visual QA.
- Performance Testing.

Nếu thiếu test, phải ghi nhận rõ ràng.

---

# 8. LIVE PREVIEW & MANUAL TESTING

Đây là bước bắt buộc.

Hãy khởi động ứng dụng bằng môi trường Preview hiện tại.

Không chỉ đọc source code rồi đưa ra kết luận.

## 8.1. Desktop testing

Test trên viewport:

- 1920 × 1080.
- 1366 × 768.

Thực hiện:

- Spawn character.
- WASD movement.
- Sprint.
- Jump.
- Mouse drag.
- Pointer Lock.
- Mouse wheel zoom.
- Camera follow.
- Mini Map.
- All HUD controls.
- F3 diagnostics.
- Interaction.
- ESC.
- Fullscreen.
- Resize.

## 8.2. Tablet testing

Test trên viewport:

- 768 × 1024.
- 1024 × 768.

Kiểm tra:

- HUD layout.
- Touch interaction.
- Camera controls.
- Responsive panels.
- Mini Map.
- Overlapping elements.

## 8.3. Mobile testing

Test trên viewport:

- 390 × 844.
- 844 × 390.

Kiểm tra:

- Virtual joystick.
- Camera swipe.
- Pinch zoom.
- Sprint.
- Jump.
- Multi-touch.
- HUD touch targets.
- Safe areas.
- Orientation changes.
- Scrolling behavior.
- Accidental interaction.

## 8.4. Browser lifecycle testing

Kiểm tra:

- Refresh.
- Resize.
- Tab background/foreground.
- Return to Preview.
- Mount/unmount.
- Reinitialization.
- Network interruption.
- WebGL context loss/restoration nếu môi trường hỗ trợ.

Nếu không thể thực hiện một test do giới hạn Preview, ghi rõ `NOT TESTABLE` và lý do.

Không được giả vờ đã thực hiện.

---

# 9. PERFORMANCE BASELINE

Đo và báo cáo performance thực tế.

Không tự tạo số liệu hoặc dự đoán kết quả.

Các metrics bắt buộc:

| Metric | Giá trị cần ghi nhận |
|---|---|
| FPS | Actual FPS |
| Average Frame Time | ms |
| P95 Frame Time | ms |
| Draw Calls | Actual |
| Triangles | Actual |
| Geometries | Actual |
| Textures | Actual |
| JS Heap | MB nếu trình duyệt hỗ trợ |
| Pixel Ratio | Actual |
| Quality Tier | Current tier |
| Rain Quality | Current multiplier |

Thực hiện đo:

1. Initial loading.
2. Idle.
3. Walking.
4. Sprinting.
5. Jumping.
6. Camera rotation.
7. Mini Map Follow.
8. Interaction.
9. Weather effects đang hoạt động.
10. Sau ít nhất 30 giây chạy liên tục.

Nếu có thể, thực hiện thêm kiểm tra sau 3 lần mount/unmount để phát hiện resource growth.

### Performance targets

Sử dụng làm mục tiêu đánh giá, không được tuyên bố đạt nếu chưa đo:

- Desktop: hướng tới ổn định 60 FPS.
- Desktop frame budget: khoảng 16.67ms.
- Mobile: hướng tới tối thiểu 30 FPS ổn định trên thiết bị thử nghiệm.
- Mobile frame budget: khoảng 33.33ms.
- Không có memory leak tăng liên tục.
- Không có crash.
- Không có GPU context error.
- Không có animation loop trùng lặp.

Phân biệt rõ:

- Measured.
- Estimated.
- Not Available.

Nếu Preview không cung cấp GPU profiling, không được tự đưa ra GPU memory usage giả định.

---

# 10. GEOSPATIAL READINESS ASSESSMENT

Đây là nội dung định hướng quan trọng nhất cho các phase sau.

Mục tiêu dài hạn là xây dựng một Digital Twin của Đà Nẵng, trong đó địa điểm, bản đồ, đường, công trình, địa hình và cảnh quan phải khớp với dữ liệu thực tế.

Phase 11 chỉ đánh giá khả năng sẵn sàng.

Không triển khai GIS.

## 10.1. Current world assessment

Đánh giá toàn bộ world hiện tại:

- World origin.
- Local X/Z coordinate.
- Terrain elevation.
- World boundary.
- Plaza.
- Roads and paths.
- Buildings or structures.
- Trees and vegetation.
- Colliders.
- Player position.
- Mini Map coordinate projection.

Phân biệt rõ:

- Synthetic geometry.
- Test fixtures.
- Real-world referenced geometry.
- Verified real-world assets.

Không đánh dấu bất kỳ object nào là địa điểm thực tế nếu không có nguồn xác minh.

## 10.2. Future geospatial requirements

Đánh giá kiến trúc hiện tại có thể hỗ trợ các thành phần sau không:

**Geographic Coordinate System**
- WGS84.
- Latitude.
- Longitude.
- Elevation.
- Geographic coordinate conversion.

**Local World Coordinate**
- ENU (East-North-Up).
- Fixed world origin.
- Meter-based scale.
- Coordinate precision.
- Zone-based local coordinates.

**Geospatial data**
- Road network.
- Building footprints.
- Building height.
- Terrain elevation.
- Coastline.
- Rivers.
- Bridges.
- Landmarks.
- Vegetation.
- Points of interest.

**Satellite and aerial imagery**
- Image georeferencing.
- Coordinate reference system.
- Spatial resolution.
- Acquisition date.
- Coverage.
- Ground control points.
- Alignment validation.

**3D asset provenance**
- Asset source.
- License.
- Acquisition date.
- Geometry accuracy.
- Confidence.
- Verification status.

Đánh giá khả năng mở rộng với:
- OpenStreetMap.
- Licensed satellite imagery.
- Copernicus DEM.
- Cesium terrain / 3D Tiles.
- Photogrammetry.
- LiDAR.
- GLB assets.

Không tự ý cài đặt hoặc tích hợp các công nghệ trên trong Phase 11.

## 10.3. Geographic readiness checklist

Đánh giá từng tiêu chí:

| Category | Questions |
|---|---|
| Coordinate System | Có thể chuyển đổi GPS sang local world không? |
| Scale | Một đơn vị world có tương ứng một mét không? |
| Elevation | Có thể sử dụng elevation thực tế không? |
| Terrain | Có thể thay terrain toán học bằng terrain dữ liệu thật không? |
| Buildings | Có thể quản lý building footprint và height không? |
| Roads | Có thể dựng road network theo dữ liệu GIS không? |
| Satellite | Có thể căn chỉnh ảnh vệ tinh với 3D world không? |
| Streaming | Có thể tải từng khu vực không? |
| Accuracy | Có thể xác minh sai lệch vị trí và kích thước không? |
| Provenance | Có thể quản lý nguồn và license của từng asset không? |

Kết luận rõ ràng những gì đã có, còn thiếu và cần chuẩn bị trong Phase 12–20.

---

# 11. ENVIRONMENTAL SIMULATION READINESS

Hệ thống hiện tại đã có clock, solar calculation, Open-Meteo và weather effects.

Không tạo hệ thống trùng lặp.

Hãy đánh giá mức độ kết nối thực tế của các thành phần:

| Interaction | Audit requirement |
|---|---|
| Time → Sun | Vị trí mặt trời có thay đổi theo thời gian không? |
| Sun → Lighting | Ánh sáng có thay đổi phù hợp không? |
| Sun → Shadows | Bóng đổ có đồng bộ không? |
| Cloud → Sunlight | Mây có ảnh hưởng ánh sáng không? |
| Wind → Rain | Mưa có chịu ảnh hưởng hướng và tốc độ gió không? |
| Wind → Vegetation | Cây và lá có chuyển động theo gió không? |
| Wind → Clouds | Mây có di chuyển theo gió không? |
| Rain → Ground | Mặt đất có chuyển sang trạng thái ướt không? |
| Rain → Water | Mặt nước có phản ứng với mưa không? |
| Weather → Visibility | Fog và visibility có phù hợp không? |
| Weather → Lighting | Thời tiết có tác động ánh sáng không? |

Đánh dấu từng kết quả:

- Implemented & Verified.
- Implemented but Not Verified.
- Partially Implemented.
- Missing.
- Not Applicable.

Đặc biệt đánh giá:

1. Weather data update cadence.
2. Weather animation update cadence.
3. Wind vector availability.
4. Gust handling.
5. Cloud movement.
6. Vegetation animation.
7. Rain particle behavior.
8. Wet surface transition.
9. Lighting interpolation.
10. Performance cost.

Phân biệt dữ liệu khí tượng được cập nhật theo chu kỳ API và animation được cập nhật liên tục theo render loop.

Không được nhầm lẫn hai khái niệm này.

---

# 12. UI/UX, ACCESSIBILITY & STABILITY AUDIT

Kiểm tra:

- Responsive layout.
- HUD spacing.
- Panel positioning.
- Text overflow.
- Button overlap.
- Z-index.
- Modal layering.
- Keyboard accessibility.
- Focus management.
- Touch target sizes.
- Contrast.
- Reduced motion.
- Loading state.
- Error state.
- Empty state.
- Weather unavailable state.
- WebGL unsupported state.

Kiểm tra UI trên desktop, tablet, mobile portrait và landscape.

Không redesign hoặc thay đổi giao diện trong phase này.

Nếu phát hiện lỗi hiển thị, cung cấp:
- Screenshot hoặc mô tả chính xác.
- Viewport xảy ra lỗi.
- Component liên quan.
- Reproduction steps.
- Mức độ ảnh hưởng.

---

# 13. ERROR HANDLING & RELIABILITY

Kiểm tra:

- API failure.
- Network timeout.
- Invalid API response.
- Empty payload.
- Missing fields.
- NaN.
- Infinity.
- Out-of-range values.
- Duplicate requests.
- Race conditions.
- Failed WebGL initialization.
- WebGL context loss.
- Resource disposal.
- Unhandled promise rejection.
- Uncaught runtime exception.

Kiểm tra đặc biệt Open-Meteo:

- Request lifecycle.
- Retry limits.
- Timeout behavior.
- Stale state.
- Data validation.
- Request sequencing.
- Component cleanup.

Không thêm API key hoặc secret vào frontend.

Không thêm dependency mới.

Không thay đổi cấu hình production.

---

# 14. ISSUE CLASSIFICATION & PRIORITIZATION

Mọi vấn đề phải được phân loại:

**P0 – Critical**
- Ứng dụng không chạy.
- Crash.
- Mất dữ liệu quan trọng.
- WebGL không thể hoạt động.
- Lỗi khiến phần lớn trải nghiệm không thể sử dụng.

**P1 – High**
- Chức năng cốt lõi bị lỗi.
- Player không điều khiển được.
- Regression lớn.
- Memory leak nghiêm trọng.
- Rendering không ổn định.
- API lỗi gây sai dữ liệu nghiêm trọng.

**P2 – Medium**
- Lỗi một chức năng phụ.
- Responsive chưa tốt.
- Performance chưa tối ưu.
- Một số tương tác chưa hoàn chỉnh.

**P3 – Low**
- UI polish.
- Minor visual inconsistencies.
- Small code quality improvements.

**INFO**
- Cải tiến trong tương lai.
- Kiến trúc có thể mở rộng tốt hơn.
- Những tính năng chưa thuộc phase hiện tại.

Mỗi issue phải có format:

```text
ISSUE ID:
TITLE:
SEVERITY:
CATEGORY:
AFFECTED PHASE:
FILE:
FUNCTION / COMPONENT:
LINE RANGE:
CURRENT BEHAVIOR:
EXPECTED BEHAVIOR:
REPRODUCTION STEPS:
ROOT CAUSE:
IMPACT:
RECOMMENDED FIX:
PROPOSED TARGET PHASE:
VERIFICATION METHOD:
```

Không được ghi nhận một vấn đề là Bug nếu chưa có bằng chứng.

Phân biệt Bug, Technical Debt, Missing Feature và Future Enhancement.

---

# 15. REQUIRED DELIVERABLES

Sau khi hoàn thành kiểm toán, phải cung cấp đầy đủ các báo cáo dưới đây.

## Deliverable 01 – Executive Audit Report

Tóm tắt:

- Project health.
- Architecture stability.
- Runtime stability.
- Performance.
- Regression status.
- Geospatial readiness.
- Environmental readiness.
- Major risks.
- Final audit status.

## Deliverable 02 – Phase 1–10 Feature Inventory

Bảng thống kê toàn bộ tính năng:

| Phase | Feature | Code Exists | Runtime Verified | Regression | Status | Evidence |
|---|---|---|---|---|---|---|

Status chỉ được sử dụng:

- PASS.
- PARTIAL.
- FAIL.
- NOT VERIFIED.
- NOT TESTABLE.

## Deliverable 03 – Architecture Audit Report

Bao gồm:

- Project structure.
- Source of truth.
- Component architecture.
- State architecture.
- Three.js architecture.
- Render loop.
- Lifecycle.
- Resource management.
- Error handling.
- Maintainability.
- Scalability.

## Deliverable 04 – Regression Test Report

Phải liệt kê:

- Test ID.
- Test scenario.
- Expected result.
- Actual result.
- Pass/Fail.
- Environment.
- Evidence.

Phân biệt rõ automated và manual tests.

## Deliverable 05 – Performance Baseline

Báo cáo toàn bộ metrics thực tế.

Không bỏ qua các chỉ số không đo được; phải ghi `NOT AVAILABLE` và giải thích.

## Deliverable 06 – Geospatial Readiness Report

Đánh giá khả năng phát triển:

- WGS84.
- ENU.
- Terrain.
- Satellite alignment.
- Building footprint.
- Road network.
- Landmark assets.
- Zone streaming.
- Asset provenance.

## Deliverable 07 – Environmental Readiness Report

Đánh giá:

- Clock.
- Solar.
- Weather.
- Wind.
- Clouds.
- Rain.
- Vegetation.
- Wet surfaces.
- Lighting.
- Physics coupling.

## Deliverable 08 – Risk & Technical Debt Register

Tổng hợp mọi issue theo P0–P3.

Mỗi issue phải có hướng xử lý và phase đề xuất.

Không được tự ý triển khai.

## Deliverable 09 – Phase 12 Technical Preparation

Chuẩn bị bản kế hoạch kỹ thuật chi tiết cho:

**PHASE 12 – GEOSPATIAL CORE ARCHITECTURE**

Phải đề xuất:

- Geospatial architecture.
- Coordinate system.
- WGS84 conversion.
- ENU local world.
- World origin.
- World coordinate contracts.
- Coordinate precision.
- Terrain compatibility.
- Player coordinate synchronization.
- Mini Map compatibility.
- Data validation.
- Unit tests.
- Regression requirements.

Không code Phase 12.

## Deliverable 10 – Final Readiness Decision

Chỉ chọn một trong ba trạng thái:

**PASS – READY FOR PHASE 12**

Điều kiện:
- Source code đã được kiểm toán.
- Build/Preview hoạt động.
- Phase 1–10 không có regression nghiêm trọng.
- Các chức năng cốt lõi được xác minh.
- Không còn P0/P1 chưa xử lý.
- Có performance baseline.
- Geospatial prerequisites được đánh giá đầy đủ.

**CONDITIONAL – READY WITH KNOWN LIMITATIONS**

Điều kiện:
- Ứng dụng hoạt động.
- Không có lỗi nghiêm trọng.
- Có các hạn chế P2/P3 hoặc một số test chưa thực hiện được.
- Tất cả hạn chế được ghi nhận rõ ràng.
- Không có vấn đề làm mất tính toàn vẹn kiến trúc.

**BLOCKED – NOT READY**

Điều kiện:
- Có P0/P1.
- Build hoặc Preview lỗi.
- Regression nghiêm trọng.
- Lỗi rendering hoặc lifecycle.
- Không xác định được source of truth.
- Không đủ dữ liệu để xác minh các chức năng cốt lõi.

Không được tự chọn PASS chỉ vì 9/9 diagnostics hiện tại đạt.

---

# 16. EXECUTION WORKFLOW – STRICT QUALITY GATES

Phải triển khai theo đúng thứ tự.

### STAGE 01 – Workspace Inspection

- Đọc tài liệu.
- Đọc source code.
- Xác định source of truth.
- Kiểm tra cấu trúc project.
- Kiểm tra dependencies.
- Kiểm tra scripts.

**Gate 01:** Không có sự nhầm lẫn về source code đang được sử dụng.

### STAGE 02 – Static Architecture Audit

- Phân tích toàn bộ code.
- Kiểm tra logic.
- Kiểm tra lifecycle.
- Kiểm tra resource management.
- Kiểm tra performance hot paths.

**Gate 02:** Có đầy đủ architecture inventory và danh sách issue.

### STAGE 03 – Build & Preview Validation

- Khởi động ứng dụng.
- Kiểm tra build nếu môi trường hỗ trợ.
- Kiểm tra Preview.
- Kiểm tra console.
- Kiểm tra network.
- Kiểm tra WebGL.

**Gate 03:** Ứng dụng phải khởi chạy và rendering ổn định.

### STAGE 04 – Phase 1–10 Regression

- Chạy 9 diagnostics.
- Kiểm tra toàn bộ chức năng.
- Kiểm tra Desktop.
- Kiểm tra Tablet.
- Kiểm tra Mobile.
- Kiểm tra tương tác.

**Gate 04:** Không có regression nghiêm trọng chưa được ghi nhận.

### STAGE 05 – Performance & Reliability

- Đo FPS.
- Đo frame time.
- Kiểm tra draw calls.
- Kiểm tra resource lifecycle.
- Kiểm tra network failure.
- Kiểm tra responsive performance.

**Gate 05:** Có baseline thực tế và đánh giá các điểm nghẽn.

### STAGE 06 – Geospatial & Environmental Readiness

- Đánh giá world coordinate.
- Đánh giá terrain.
- Đánh giá GIS compatibility.
- Đánh giá weather architecture.
- Đánh giá environmental coupling.

**Gate 06:** Có đầy đủ technical readiness report.

### STAGE 07 – Final Audit & Handover

- Tổng hợp tất cả kết quả.
- Phân loại issues.
- Đưa ra Go/No-Go.
- Chuẩn bị Phase 12 plan.
- Xác nhận source code không bị thay đổi.

**Gate 07:** Hoàn thành toàn bộ báo cáo và chờ Project Owner phê duyệt.

Không được bỏ qua bất kỳ gate nào.

---

# 17. FINAL RULES – ABSOLUTE REQUIREMENTS

1. Không được code thêm tính năng ngoài Phase 11.
2. Không được sửa App.tsx.
3. Không được thay đổi behavior của Phase 1–10.
4. Không được cài package.
5. Không được xóa code.
6. Không được tự ý refactor.
7. Không được thay đổi design system.
8. Không được tạo mock data để giả lập kết quả kiểm thử.
9. Không được tạo nút điều khiển giả.
10. Không được tự tạo dữ liệu thời tiết.
11. Không được đánh dấu PASS khi chưa kiểm tra.
12. Không được bỏ qua lỗi chỉ vì ứng dụng vẫn chạy.
13. Không được dựa hoàn toàn vào comment trong source code để kết luận chức năng đã hoạt động.
14. Không được thay đổi các tính năng cũ để dễ dàng vượt qua regression tests.
15. Không được triển khai Phase 12 khi chưa có chỉ thị.
16. Không được tạo các bản sao App.tsx hoặc các phiên bản source code thay thế.
17. Không được làm ảnh hưởng Preview hiện tại.
18. Không được tự ý thay đổi project configuration.
19. Mọi kết luận phải có bằng chứng.
20. Nếu không xác minh được, phải ghi rõ `NOT VERIFIED`.

Nếu phát hiện một lỗi nghiêm trọng cần sửa ngay để tiếp tục kiểm toán, hãy dừng tại điểm an toàn, mô tả lỗi và đề xuất bản sửa tối thiểu. Chờ phê duyệt, không tự ý sửa.

## SOURCE CODE INTEGRITY

Trước khi hoàn thành, xác nhận:

- App.tsx không bị thay đổi.
- Không có dependency mới.
- Không có package version thay đổi.
- Không có chức năng cũ bị xóa.
- Không có hệ thống mới được thêm vào.
- Không có cấu hình runtime bị thay đổi.

Nếu có Git, kiểm tra `git diff` và `git status`.

Nếu không có Git, sử dụng phương pháp so sánh snapshot phù hợp với môi trường thực tế.

---

# 18. FINAL RESPONSE FORMAT

Khi hoàn thành, không trả lời lan man.

Trình bày theo cấu trúc:

```text
PHASE 11 – AUDIT COMPLETION REPORT

1. EXECUTIVE SUMMARY
- Overall Status:
- Build:
- Preview:
- Regression:
- Performance:
- Geospatial Readiness:
- Environmental Readiness:

2. PHASE 1–10 REGRESSION
- Diagnostics:
- Manual Tests:
- Failed Tests:
- Untested Features:

3. ARCHITECTURE AUDIT
- Critical Findings:
- High Findings:
- Medium Findings:
- Low Findings:

4. PERFORMANCE BASELINE
- Actual measured metrics.

5. GEOSPATIAL READINESS
- Existing:
- Missing:
- Risks:
- Phase 12 Prerequisites:

6. ENVIRONMENTAL READINESS
- Existing:
- Missing:
- Risks:
- Future Prerequisites:

7. TECHNICAL DEBT & REMEDIATION
- Issue ID:
- Severity:
- Recommended Action:
- Target Phase:

8. PHASE 12 PREPARATION
- Proposed Architecture:
- Technical Decisions:
- Dependencies:
- Acceptance Criteria:

9. SOURCE CODE INTEGRITY
- Modified Files:
- Dependencies Changed:
- Regression Introduced:

10. FINAL DECISION
- PASS / CONDITIONAL / BLOCKED
- Evidence:
- Outstanding Blockers:
- Awaiting Project Owner Approval.
```

Nếu môi trường hỗ trợ tạo Markdown artifact, hãy xuất thêm báo cáo đầy đủ thành:

`PHASE_11_AUDIT_REPORT.md`

Không tạo file code mới hoặc chỉnh sửa source code để phục vụ báo cáo.

---

# FINAL PROJECT OWNER DIRECTIVE

Hãy xem đây là một dự án dài hạn có yêu cầu chất lượng sản phẩm thực tế, không phải một bản demo 3D ngắn hạn.

Tôi ưu tiên:

1. Độ chính xác.
2. Tính ổn định.
3. Chất lượng kiến trúc.
4. Hiệu năng.
5. Khả năng mở rộng.
6. Trải nghiệm người dùng.
7. Chất lượng hình ảnh.

Tôi không cần những lời giải thích dài dòng hoặc báo cáo đẹp nhưng thiếu bằng chứng.

Tôi cần kết quả kiểm toán trung thực, có chiều sâu, kiểm tra được và có thể sử dụng làm cơ sở kỹ thuật cho các phase tiếp theo.

**ĐẶC BIỆT: Không được đánh đổi tính ổn định của Phase 1–10 để chuẩn bị cho các phase mới.**

Bắt đầu từ STAGE 01 – WORKSPACE INSPECTION.

Thực hiện lần lượt từng Quality Gate. Không bỏ bước, không tự suy diễn kết quả và không triển khai Phase 12.

**Chỉ hoàn thành Phase 11 khi toàn bộ báo cáo, bằng chứng, kết quả kiểm thử và quyết định Readiness đã được cung cấp đầy đủ.**

WAIT FOR PROJECT OWNER APPROVAL BEFORE PROCEEDING TO PHASE 12.