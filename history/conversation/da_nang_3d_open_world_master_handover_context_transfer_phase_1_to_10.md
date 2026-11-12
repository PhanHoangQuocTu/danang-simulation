# DA NANG 3D OPEN WORLD SIMULATION — TÀI LIỆU BÀN GIAO NGỮ CẢNH TOÀN DIỆN (MASTER CONTEXT TRANSFER: PHASE 1 – PHASE 10)

> **HƯỚNG DẪN SỬ DỤNG CHO CUỘC TRÒ CHUYỆN MỚI:**
> Khi bắt đầu cuộc hội thoại mới, bạn chỉ cần:
> 1. **Copy toàn bộ nội dung file `PROJECT_HANDOVER_SPECIFICATION.md` này** dán vào tin nhắn đầu tiên.
> 2. **Copy kèm nội dung file code `App.tsx` mới nhất** (đang nằm ở tab `App.tsx` / `src/App.tsx` bên cạnh) hoặc đính kèm file đó vào cuộc hội thoại mới.
> 3. Yêu cầu AI tiếp tục triển khai **Phase 11** (hoặc bất kỳ Phase tiếp theo nào trong lộ trình của bạn).

---

## 1. TỔNG QUAN DỰ ÁN & NGUYÊN TẮC KIẾN TRÚC BẮT BUỘC (STRICT RULES)

### 1.1. Tầm nhìn Dự án (Project Vision)
- **Tên dự án**: **DA NANG 3D OPEN WORLD SIMULATION**
- **Mục tiêu dài hạn**: Xây dựng thế giới mở 3D tương tác mô phỏng thành phố Đà Nẵng, Việt Nam với góc nhìn thứ ba (Third-Person Perspective), nơi người dùng điều khiển nhân vật 3D con người khám phá môi trường, đồng bộ thời gian thực, vị trí mặt trời thiên văn và thời tiết thực tế tại Đà Nẵng.
- **Tọa độ & Múi giờ chuẩn cố định (`DA_NANG_CONFIG`)**:
  - Thành phố: `Da Nang, Vietnam`
  - Vĩ độ (`latitude`): `16.0544° N`
  - Kinh độ (`longitude`): `108.2022° E`
  - Múi giờ (`timezone`): `'Asia/Ho_Chi_Minh'` (`GMT+7`, `utcOffsetHours: 7`)
  - Ngôn ngữ/Locale: `'vi-VN'`

### 1.2. Quy tắc Kỹ thuật & Kiến trúc Cốt lõi (Mandatory Engineering Rules)
1. **Kiến trúc Single-File Self-Contained cho Môi trường Preview (`App.tsx`)**:
   - Toàn bộ ứng dụng được đóng gói trong file `App.tsx` (đồng bộ với `src/App.tsx`) sử dụng **React 18 + TypeScript (Strict Mode) + Three.js (`THREE.WebGLRenderer`) + TailwindCSS + CSS Custom Properties Design System**.
   - **Hệ thống Icon SVG Nội tuyến (`createSvgIcon`)**: Tuyệt đối **KHÔNG** import `lucide-react` hay thư viện icon bên ngoài để tránh lỗi xung đột hai phiên bản React (`Objects are not valid as a React child` do lệch Symbol `$$typeof`). Mọi icon đều được định nghĩa bằng inline SVG component ở đầu file.
2. **Không Tự ý Vượt Ranh giới Phase (Strict Phase Boundary)**:
   - Chỉ triển khai đúng phạm vi của Phase được yêu cầu.
   - Chưa tự ý tạo địa danh Đà Nẵng giả (như Cầu Rồng, Sông Hàn, đường phố thực tế, NPC, xe cộ, hệ thống nhiệm vụ) cho đến khi đến đúng Phase xây dựng hệ tọa độ địa lý (Phase 29+) và đô thị (Phase 30+).
3. **Vận hành Tự động 100% Theo Dữ liệu Thực tế (Zero Fake Controls / Zero Fake Data)**:
   - **KHÔNG** tạo nút chuyển Ngày/Đêm, **KHÔNG** tạo slider chỉnh giờ, **KHÔNG** tạo dropdown chọn thời tiết Nắng/Mưa.
   - Đồng hồ luôn lấy giờ `Asia/Ho_Chi_Minh` qua `Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false }).formatToParts()`, tuyệt đối không dùng `.getHours()` theo giờ máy tính cá nhân.
   - Thời tiết lấy trực tiếp từ **Open-Meteo Forecast API**, nếu mất mạng hoặc lỗi API thì giữ dữ liệu `stale` hoặc dùng hiệu ứng trung tính (`neutralUnavailableEffects`), tuyệt đối không tự chuyển sang trời nắng giả tạo.
4. **Hiệu năng Render Loop 60Hz & Quản lý Bộ nhớ GPU**:
   - **Zero Per-Frame Object Allocation**: Toàn bộ `THREE.Vector3`, `THREE.Vector2`, `THREE.Vector4`, `THREE.Color`, `THREE.Raycaster` dùng trong vòng lặp `animate()` đều được cấp phát tĩnh bên ngoài vòng lặp.
   - **Zero Per-Frame React Re-render**: Không bao giờ gọi `setState` mỗi frame. Vị trí nhân vật (`playerStateRef`), trạng thái bàn phím (`keyboardInputRef`), joystick (`joystickInputRef`) và vị trí mũi tên trên Mini Map (`miniMapMarkerDomRef`, `miniMapConeDomRef`) được cập nhật trực tiếp qua `useRef` và DOM style transform ở 60Hz. Dữ liệu Telemetry trên HUD chỉ lấy mẫu ở tần số `10Hz` (`100ms`), đồng hồ & mặt trời cập nhật ở `1Hz` (`1000ms`), và Raycasting tương tác chạy ở `20Hz` (`50ms`).
   - **Tái sử dụng duy nhất 1 `THREE.WebGLRenderer`**: Cả cảnh 3D chính (`PerspectiveCamera`) và bản đồ thu nhỏ (`OrthographicCamera`) đều dùng chung một `WebGLRenderer` thông qua cơ chế cắt khung nhìn độc lập (`renderMiniMapOverviewPass` với `setViewport` / `setScissor`).

---

## 2. TỔNG HỢP CHI TIẾT 10 PHASE ĐÃ HOÀN THÀNH (PHASE 1 – PHASE 10)

### PHASE 1: 3D HUMAN CHARACTER, THIRD-PERSON MOVEMENT & TEST ENVIRONMENT
- **Nhân vật 3D Con người ("Casual Explorer" — `createCasualExplorerRig`)**:
  - Phân cấp 22 nhóm khớp xương `THREE.Group`: `root` -> `hips` -> `waist` -> `body` -> `chest` -> `neck` -> `head` (đầy đủ mắt, lông mày, mũi, miệng, tai, tóc nhiều lớp), ba lô du lịch sau lưng, cùng chuỗi khớp `left/rightShoulder` -> `Arm` -> `Elbow` -> `Hand` và `left/rightHip` -> `Leg` -> `Knee` -> `Foot` (giày thể thao đế trắng).
- **Hệ thống Vật lý & Điều khiển Nhân vật (`GAME_CONFIG.physics`)**:
  - Tốc độ đi bộ: `4.5 m/s`, tốc độ chạy (`Sprint`): `8.6 m/s`, gia tốc: `15.0`, giảm tốc: `18.0`, kiểm soát trên không: `0.48`, trọng lực: `-25.0 m/s²`, vận tốc nhảy: `9.8 m/s`, bán kính va chạm ngang: `0.38m`, giới hạn `maxDeltaTime: 0.05s`.
  - Di chuyển tương đối theo góc ngang của Camera (`cameraYaw`), chuẩn hóa vector đi chéo (`moveDir.normalize()`), xoay mặt mượt theo hướng di chuyển (`dampAngle`).
- **Hệ thống Hoạt ảnh 6 Trạng thái (`updateHumanoidAnimation`)**:
  - Tự động chuyển đổi mượt giữa `IDLE` (thở nhẹ), `WALK`, `RUN`, `JUMP`, `FALL`, `LANDING` kèm hệ thống hạt bụi bước chân (`createFootstepParticleSystem` với Object Pool 24 hạt).
- **Môi trường 3D Thử nghiệm & Địa hình (`180m × 180m`)**:
  - Hàm địa hình toán học `getTerrainElevation(x, z)` làm phẳng vùng quảng trường xuất phát ở tâm `(0, 0)` và tạo đồi thoải xung quanh, giới hạn bán kính di chuyển `worldBoundaryRadius = 68m`.
  - Bao gồm: Quảng trường đá trung tâm, đường mòn lát đá hình sin, 5 bậc thềm đá nhảy (`PLATFORM_COLLIDERS` cao từ `+0.45m` đến `+2.75m`), 8 tảng đá lớn (`ROCK_COLLIDERS`), 18 cây thông và sồi nhiều tầng lá (`TREE_COLLIDERS`), 48 bụi cây và 2.600 bụi cỏ (`THREE.InstancedMesh`).
- **Camera Góc nhìn Thứ ba (`GAME_CONFIG.camera`)**:
  - Khoảng cách mặc định `5.4m` (`min: 2.3m`, `max: 12.5m`), góc nhìn dọc `minPitch: -0.18 rad`, `maxPitch: 1.25 rad`, chống xuyên sàn (`groundClearance: 0.42m`), hỗ trợ Pointer Lock và kéo chuột/cảm ứng.

### PHASE 2: REAL-TIME DA NANG CLOCK, ASTRONOMY & OPEN-METEO WEATHER SYSTEM
- **Đồng hồ Thời gian thực Đà Nẵng (`getDaNangClockData`)**:
  - Định dạng chính xác theo `Asia/Ho_Chi_Minh` (`GMT+7`): trả về `timeString` (`HH:MM:SS`), `timeShortString` (`HH:MM`), `dateStringVi`, `dateStringEn`, và `fractionalHours`.
- **Tính toán Thiên văn Mặt trời (`calculateDaNangSolarData`)**:
  - Tính góc lệch mặt trời (`declRad`), phương trình thời gian (`eqTimeMinutes`), giờ Bình minh (`dawnHours`), Mặt trời mọc (`sunriseHours`), Giữa trưa (`solarNoonHours`), Mặt trời lặn (`sunsetHours`), Chạng vạng (`duskHours`), góc cao độ (`altitudeDeg`) và góc phương vị (`azimuthDeg`).
  - Tự động phân loại 6 giai đoạn trong ngày dựa trên vị trí mặt trời thực tế: `DAWN` (Bình minh), `MORNING` (Buổi sáng), `NOON` (Buổi trưa), `AFTERNOON` (Buổi chiều), `SUNSET` (Hoàng hôn), `NIGHT` (Ban đêm).
  - Quy đổi sang vector 3D `sunDirection` điều khiển trực tiếp vị trí `mainDirLight`, `sunOrb`, `moonOrb`, bầu trời sao (`starField`) và 6 cột đèn đường tự động bật sáng khi trời tối.
- **Tích hợp Thời tiết Thực tế Open-Meteo (`fetchDaNangWeatherWithRetry` & `mapWmoWeatherCode`)**:
  - Tự động gọi API khi khởi động và làm mới mỗi 15 phút (`weatherRefreshIntervalMs`), đánh dấu `stale` sau 25 phút (`weatherStaleThresholdMs`), kiểmia tính hợp lệ và giới hạn an toàn qua `validateAndNormalizeWeatherPayload`.
  - Ánh xạ đầy đủ bảng mã WMO (`0` đến `99`) sang 11 trạng thái `WeatherCondition` và cấu hình hiệu ứng 3D (`WeatherEffectConfig`): mật độ mây, độ tối của mây, suy hao nắng, mật độ sương mù, số lượng hạt mưa (`LineSegments` tối đa 3.200 hạt bay nghiêng theo hướng và tốc độ gió thực tế), độ ướt bóng loáng của mặt đất (`groundWetness`) và chớp giông bão (`hasLightning`).

### PHASE 3: ADAPTIVE INPUT SYSTEM – DESKTOP, MOBILE & TABLET
- **Nhận diện Thiết bị & Phương thức Nhập liệu Tự động (`evaluateAdaptiveDeviceProfile`)**:
  - Kết hợp CSS Media Queries (`(pointer: coarse)`, `(pointer: fine)`, `(hover: none)`), `navigator.maxTouchPoints`, tỷ lệ màn hình và sự kiện thực tế để phân loại `desktop` | `tablet` | `mobile` và `keyboard-mouse` | `touch` | `hybrid`.
- **Quản lý Tiêu điểm & Cô lập Bàn phím (`isInteractiveInputElement`)**:
  - Tự động vô hiệu hóa phím di chuyển game khi người dùng đang gõ vào `<input>`, `<textarea>`, `<select>`, `[contenteditable]` hoặc đang mở hộp thoại.
- **Hệ thống Điều khiển Cảm ứng Đa điểm (`Virtual Joystick` & `Touch Controls`)**:
  - Cần điều khiển ảo bên trái (`computeNormalizedJoystickInput` với `deadzone: 0.12`, biên độ analog `[0..1]`, hỗ trợ `setPointerCapture`), vuốt 1 ngón bên phải xoay camera, chụm 2 ngón (`Pinch`) để zoom camera, nút `SPRINT` (giữ hoặc chạm đúp để khóa chạy `RUN`) và nút `JUMP`.

### PHASE 4: SYSTEM AUDIT, PERFORMANCE, DESIGN SYSTEM, SEO & HUD ARCHITECTURE
- **Design System Tập trung (`DESIGN_SYSTEM_CSS`)**:
  - Chuẩn hóa biến CSS: thang khoảng cách 4px (`--space-0` đến `--space-24`), bo góc (`--radius-xs` đến `--radius-full`), chữ (`--text-xs` đến `--text-5xl`), màu ngữ nghĩa (`--color-*`), đổ bóng (`--shadow-*`), chuyển động (`--motion-*`, hỗ trợ `prefers-reduced-motion`) và lớp hiển thị (`--z-base` đến `--z-critical`).
- **Kiến trúc Các Vùng HUD Độc lập (`HUDPanelState` — Không có nút Hide All toàn cục)**:
  - **Top-Left Zone**: `TopLeftMiniMapSlot` + Thanh nút công cụ phụ trợ (`Reset`, `Env`, `Debug`, `Specs`, `Fullscreen`) + Bảng `World & Terrain Telemetry`.
  - **Top-Right Zone**: `DaNangTimeWeatherHUD` (Widget Thời gian & Thời tiết Đà Nẵng).
  - **Bottom-Left Zone**: `BottomLeftMovementGuideSlot` (Bảng hướng dẫn điều khiển thích ứng).
  - **Bottom-Right Zone**: `Character Locomotion Status` (`State` & `Velocity`) + Vùng bảo vệ nút cảm ứng `SPRINT` / `JUMP`.

### PHASE 5: PERSISTENT TIME & WEATHER STATUS WIDGET
- Widget Thời gian & Thời tiết ở góc trên bên phải chỉ hỗ trợ 2 chế độ: `'expanded'` và `'compact'` (**không bao giờ bị ẩn hoàn toàn**).
- Ở chế độ **`compact`**, cả 3 thông tin bắt buộc (**Giờ Đà Nẵng 24h**, **Biểu tượng Thời tiết**, và **Nhiệt độ hiện tại / `--°C`**) luôn hiển thị trên một thanh ngang gọn gàng trên mọi kích thước màn hình.

### PHASE 6: COLLAPSIBLE INFORMATION PANELS & MINI DATA CHIPS
- Xây dựng component tái sử dụng `MiniDataChip` (`metric` | `status` | `info` variants) có kiểm tra an toàn `formatSafeChipValue` (chống hiển thị `NaN`/`undefined`).
- Các bảng thông tin phụ (`environmentPanel`, `secondaryInfo`) hỗ trợ chuyển đổi độc lập 3 trạng thái: `expanded` ↔ `compact` (hiển thị dạng các `MiniDataChip`: `Elevation`, `Solar Alt`, `FPS`, `Frame ms`, `Checks 9/9`) ↔ `hidden` (khôi phục qua nút `Env` / `Debug` trên thanh công cụ).
- Bảng trạng thái chuyển động nhân vật (`playerStatus`) hỗ trợ thu nhỏ thành 2 `MiniDataChip` (`State` và `Speed m/s`).

### PHASE 7: ADAPTIVE MOVEMENT GUIDE SYSTEM
- Tách biệt hoàn toàn dữ liệu hướng dẫn (`DESKTOP_CONTROL_INSTRUCTIONS` và `TOUCH_CONTROL_INSTRUCTIONS`) khỏi tầng giao diện JSX.
- Tự động hiển thị cụm phím `W / A / S / D` trực quan khi dùng Bàn phím & Chuột, hoặc hướng dẫn cảm ứng đa điểm (`LEFT JOYSTICK`, `SWIPE / PINCH`, `HOLD / 2x TAP`, `TAP JUMP`, `MULTI-TOUCH`) khi dùng cảm ứng.
- Quy tắc chống nhấp nháy (Stability Rule): Click/chạm vào các nút trên HUD không làm đổi chế độ hướng dẫn; chỉ tương tác điều khiển trong vùng thế giới 3D mới chuyển chế độ. Hỗ trợ thu gọn thành nút `Controls` (`Phím H`).

### PHASE 8: MINI MAP FOUNDATION & STATIC WORLD OVERVIEW
- Khởi tạo `THREE.OrthographicCamera` độc lập tại độ cao `Y = 140m` nhìn thẳng xuống mặt phẳng `XZ` với vector `up = (0, 0, -1)` (hướng `-Z` ở phía trên, `+X` ở bên phải).
- Render góc nhìn từ trên xuống của địa hình 3D thực tế qua `renderMiniMapOverviewPass` (ẩn nhân vật, mây, mưa và sương mù trong lượt chụp bản đồ để bản đồ luôn rõ nét cả ban ngày lẫn ban đêm).
- Tích hợp chỉ báo hệ trục thế giới cục bộ (`CompassIndicator`: `-Z`, `+X`, `+Z`, `-X`) và các nút thu phóng độc lập `Zoom In (+)`, `Zoom Out (-)`, `Reset 1x` (`0.60x` – `2.80x`).

### PHASE 9: PLAYER POSITION & MAP SYNCHRONIZATION
- Hàm toán học không gian `projectWorldToMiniMap` chiếu tọa độ thực `(X, Z)` trên mặt phẳng `Y = 0` và hướng mặt nhân vật (`characterRig.root.rotation.y`) qua ma trận `miniMapCamera` sang tọa độ phần trăm `[0..100%]` và góc xoay màn hình `screenRotationDeg`.
- Cập nhật trực tiếp DOM 60Hz qua `miniMapMarkerDomRef` và `miniMapConeDomRef` (mũi tên điều hướng kèm nón tầm nhìn, không phụ thuộc góc quay của Main Camera). Nếu nhân vật đi ra ngoài vùng nhìn khi zoom lớn, Marker bám vào mép khung kèm nhãn `EDGE`.
- Hỗ trợ chuyển đổi giữa 2 chế độ bản đồ: **`STATIC` (`World Overview`)** và **`FOLLOW` (`Player Follow` — Phím `F`)**, cùng chế độ thu gọn Mini Map **`Expanded` / `Compact` (Phím `M`)**.

### PHASE 10: WORLD INTERACTION FOUNDATION & CONTEXTUAL INTERACTION SYSTEM
- **Interactable Object Registry (`InteractableRegistry`)**: Quản lý đăng ký (`register`), hủy đăng ký (`unregister`), bật/tắt (`setEnabled`), chuyển đổi trạng thái (`toggleActivated`), làm nổi bật (`applyHighlight`) và khôi phục vật liệu gốc (`restoreOriginalMaterial`).
- **3 Đối tượng Kiểm thử Tương tác Thực tế (`INITIAL_INTERACTABLE_FIXTURES`)** đặt quanh quảng trường trung tâm:
  1. `fixture-origin-monolith` (**`inspect`** — Tọa độ `[-3.2, 0, -4.5]`, tầm xa `4.6m`): Cột mốc tọa độ trung tâm.
  2. `fixture-weather-telemetry-post` (**`information`** — Tọa độ `[4.2, 0, -4.2]`, tầm xa `4.8m`): Trạm dữ liệu khí tượng thử nghiệm (hiển thị dữ liệu trực tiếp Đà Nẵng trong Contextual Dialog).
  3. `fixture-calibration-beacon` (**`activate`** — Tọa độ `[0.0, 0, -6.8]`, tầm xa `5.0m`): Đèn hiệu chuẩn năng lượng (bật/tắt trạng thái `ON/OFF`, đổi màu lõi sang xanh lục bảo và tăng tốc vòng xoay 3D).
- **Raycasting, Khoảng cách & Kiểm tra Vật cản (20Hz)**:
  - Quét tia từ tâm màn hình `NDC (0, 0)` của `camera` kết hợp kiểm tra góc lệch hình nón (`camForwardVec.dot`) trên danh sách mesh ứng viên (`registry.getCandidateMeshes()`), kiểm tra vật cản che khuất qua `occlusionRaycaster` và đo khoảng cách 3D thực tế từ `characterRig.root.position`.
  - Hiển thị tâm ngắm trung tâm (`Center Aim Reticle`), nút nhắc ngữ cảnh (`[ E ]` trên Desktop hoặc nút chạm `Tương tác` trên Mobile), bảo vệ chống kích hoạt lặp (`cooldownMs: 320ms`), thông báo kết quả (`actionFeedback`) và hộp thoại thông tin ngữ cảnh (`contextualPanelItem`, đóng bằng `ESC`).
- **Bộ Tự Kiểm tra Chẩn đoán Tự động (`runSystemDiagnosticsSuite`)**:
  - 9 bài test tự động từ `DIAG-01` đến `DIAG-09` đều đạt **`9/9 PASSED`** (hiển thị trực tiếp trong bảng Debug `F3`).

---

## 3. BẢNG PHÍM TẮT & ĐIỀU KHIỂN HIỆN TẠI (KEYBINDINGS MATRIX)

| Phím / Thao tác | Chức năng thực thi | Ghi chú Cô lập Tương tác |
| :--- | :--- | :--- |
| **`W, A, S, D` / `Arrow Keys`** | Di chuyển nhân vật 4 hướng theo góc nhìn Camera | Tự khóa khi đang gõ vào `<input>` hoặc mở hộp thoại |
| **`Shift` (Giữ)** | Chạy bứt tốc (`Sprint` — `8.6 m/s`) | Trên cảm ứng: giữ nút `SPRINT` hoặc chạm đúp để khóa chạy |
| **`Space`** | Nhảy (`Jump`) khi nhân vật đang `isGrounded` | Có `preventDefault()` chống cuộn trang |
| **`E` (`KeyE`)** | **Tương tác với đối tượng 3D** khi đang ngắm trúng mục tiêu trong tầm (`eligible`); nếu không có mục tiêu thì bật/tắt bảng `World Env` | Nhấn `Shift + E` hoặc nút `Env` trên HUD để luôn đổi chế độ bảng Môi trường |
| **`F` (`KeyF`)** | Chuyển đổi chế độ Mini Map: `STATIC (World Overview)` ↔ `FOLLOW (Player Follow)` | Chỉ tác động `miniMapCamera`, không ảnh hưởng Main Camera |
| **`M` (`KeyM`)** | Thu gọn / Mở rộng kích thước Mini Map (`Expanded` ↔ `Compact`) | Độc lập với các bảng HUD khác |
| **`H` (`KeyH`)** | Thu gọn / Mở rộng bảng Hướng dẫn điều khiển (`Movement Guide`) | Khi thu gọn hiển thị nút `Controls` ở góc dưới bên trái |
| **`R` (`KeyR`)** | Đưa nhân vật và góc nhìn về lại tâm xuất phát `(0, 0, 0)` | Đồng thời xóa trạng thái khóa chạy trên cảm ứng |
| **`F3`** | Chuyển đổi bảng `Debug Telemetry & Self-Diagnostics` (`Hidden` → `Compact` → `Expanded`) | Hiển thị FPS, Frame Time, Draw Calls và `9/9 PASSED` checks |
| **`ESC`** | Đóng bảng tương tác ngữ cảnh (`Contextual Panel`) / Đóng Modal `Specs` / Giải phóng `Pointer Lock` | Ưu tiên đóng hộp thoại đang mở trước |
| **Chuột / Cảm ứng** | Click vùng 3D để khóa chuột hoặc giữ kéo xoay 360°; lăn chuột / chụm 2 ngón để Zoom | Mọi thao tác trên HUD đều có `stopPropagation()` |

---

## 4. MẪU PROMPT ĐỂ BẠN COPY SANG CUỘC HỘI THOẠI MỚI

Bạn có thể copy đoạn dưới đây kèm theo code trong tab `App.tsx` khi mở cuộc trò chuyện mới:

```text
Tôi đang phát triển dự án DA NANG 3D OPEN WORLD SIMULATION (React + TypeScript + Three.js + TailwindCSS trong một file App.tsx duy nhất).
Dự án đã hoàn thành trọn vẹn từ Phase 1 đến Phase 10 (9/9 Self-Diagnostics PASSED).
Dưới đây là toàn bộ Tài liệu Đặc tả Bàn giao (PROJECT_HANDOVER_SPECIFICATION.md) và toàn bộ mã nguồn thực tế mới nhất của file App.tsx.
Hãy đọc kỹ, nắm vững toàn bộ kiến trúc hiện có, giữ nguyên 100% các chức năng từ Phase 1 đến Phase 10 và sẵn sàng chờ chỉ thị triển khai Phase tiếp theo từ tôi.
```