# PHASE 12 — MASTER IMPLEMENTATION PROMPT
## DA NANG 3D OPEN WORLD SIMULATION
### GEOSPATIAL CORE ARCHITECTURE • WGS84 / ECEF / ENU • WORLD ANCHOR • REAL-WORLD COORDINATE INTEGRITY

> **EXECUTION DIRECTIVE:** Đây là nhiệm vụ **TRIỂN KHAI MÃ NGUỒN HOÀN CHỈNH**, không phải chỉ lập kế hoạch hoặc tạo báo cáo. Đọc toàn bộ tài liệu, triển khai đúng phạm vi Phase 12 trên workspace hiện tại, chạy và kiểm tra bằng Gemini Preview, sửa lỗi phát hiện được, rồi bàn giao mã nguồn chạy được cùng bằng chứng kiểm thử. Không tiếp tục Phase 13.

---

## 00. MISSION, ROLES & PRIORITIES

Bạn đang đóng vai một nhóm kỹ sư phối hợp trong một quy trình triển khai có kiểm soát:

- **Principal Software Architect (Lead):** bảo vệ tính nhất quán hệ thống; phê duyệt mọi thay đổi theo phạm vi.
- **Senior GIS / Geospatial Engineer:** thiết kế hệ tọa độ, chuẩn độ cao, công thức chuyển đổi và chính xác số học.
- **Senior Three.js / WebGL Engineer:** tích hợp với world space, camera, renderer, minimap và hiệu năng real-time.
- **Senior React / TypeScript Engineer:** triển khai type-safe, pure functions, lifecycle đúng và các tích hợp UI tối thiểu.
- **Game World / Simulation Engineer:** giữ tương thích player, collision, spawn, terrain thử nghiệm và world interaction.
- **Environmental Systems Engineer:** kiểm tra quy ước phương vị cho mặt trời, gió, mưa và các hệ thống tương lai.
- **Performance Engineer:** đánh giá chi phí CPU, allocations, update cadence, số học Float64/Float32.
- **QA / Test Automation Engineer:** kiểm thử unit, integration, regression, preview và đánh giá nghiệm thu.
- **Technical Writer:** cập nhật tài liệu quyết định kỹ thuật, giả định và giới hạn dữ liệu.

**Ưu tiên:** correctness → backward compatibility → runtime stability → measurable performance → extensibility → UI clarity.

**Định nghĩa hoàn thành:** code thực sự được triển khai trong app đang chạy, không có regression Phase 1–10, các hàm chuyển đổi được kiểm thử, có thể review trong Preview, có báo cáo trung thực và đầy đủ.

---

## 01. INPUTS, SOURCE OF TRUTH & PRECONDITIONS

### 01.1. Tài liệu bắt buộc

1. `da_nang_3d_open_world_master_handover_context_transfer_phase_1_to_10.md` — đặc tả và phạm vi Phase 1–10.
2. `da_nang_3d_open_world_simulation_phase_10.tsx` — snapshot mã nguồn gần nhất được bàn giao.
3. `PHASE_11_AUDIT_REPORT.md` — kết quả kiểm toán Phase 11 **nếu thực sự tồn tại trong workspace**.
4. Các file cấu hình, package manifest, entrypoint và source code **đang được Preview thực thi**.

Đọc đủ tất cả file có sẵn, không kết luận dựa trên tên file/comment/tóm tắt. **Source of truth là workspace đang chạy**; hai file bàn giao là baseline tham chiếu, không được copy đè vào source. Kiểm tra `git status`/`git diff` nếu có Git và bảo vệ mọi thay đổi đã tồn tại của người dùng.

**Không có báo cáo Phase 11 không đồng nghĩa Phase 11 đã PASS.** Nếu thiếu báo cáo, chạy *minimal non-destructive prerequisite check* trước khi sửa: app build được, Preview render được, DIAG-01–09 không lỗi, chức năng di chuyển và minimap dùng được, không có blocker P0/P1 đã biết. Ghi rõ thiếu báo cáo; không tự bịa kết quả. Nếu blocker nghiêm trọng, xử lý theo quy trình blocker, không triển khai liều.

### 01.2. Baseline kỹ thuật đã có trong snapshot

- React 18 + TypeScript strict + Three.js `THREE.WebGLRenderer` + TailwindCSS / CSS Custom Properties.
- **Một file `App.tsx` self-contained** để Gemini Preview hoạt động ổn định; nếu workspace đang dùng cấu trúc khác thì đánh giá/giữ nguồn chạy thật, không tự ý migrate framework.
- **Inline SVG icon (`createSvgIcon`)**. Không thêm `lucide-react` do vấn đề tương thích React đã được ghi trong handover.
- **Một `WebGLRenderer`** dùng cho world perspective camera và orthographic minimap pass (scissor/viewport); không tạo renderer thứ hai.
- Player 6 animation states `IDLE/WALK/RUN/JUMP/FALL/LANDING`, movement, jump, collisions, camera follow.
- Procedural demo terrain `getTerrainElevation(x,z)`, bán kính biên `worldBoundaryRadius=68m`, các collider, fixture và vegetation thử nghiệm.
- `DA_NANG_CONFIG`: latitude `16.0544`, longitude `108.2022`, timezone `Asia/Ho_Chi_Minh`.
- Open-Meteo `fetchDaNangWeatherWithRetry`, astronomy `calculateDaNangSolarData`, sky/weather/solar rendering đã có.
- `projectWorldToMiniMap(...)`, `TopLeftMiniMapSlot`, chế độ `overview/follow`, player marker, hướng nhìn.
- `InteractableRegistry`, 3 fixture (`fixture-origin-monolith`, `fixture-weather-telemetry-post`, `fixture-calibration-beacon`).
- `runSystemDiagnosticsSuite`: DIAG-01 tới DIAG-09; HUD hiển thị tỷ lệ PASS theo **số lượng kết quả động**, không được hardcode 9/9 nếu thêm test.
- Keybindings: WASD/Arrows, Shift, Space, E/Shift+E, F, M, H, R, F3, ESC; touch joystick/sprint/jump/pinch.
- Render loop: không React setState mỗi frame, tối ưu vectors/allocations, cập nhật HUD có giới hạn tần suất; raycast ~20Hz.

### 01.3. Ranh giới quan trọng: Demo world ≠ Đà Nẵng thật

Hiện tại các đồi, cây, quảng trường, đường thử nghiệm và 3 interactable là **synthetic test scene**, không phải một khu phố/địa danh Đà Nẵng đã được đo đạc. Tọa độ `16.0544,108.2022` trong config là một **city reference coordinate**, chưa phải điểm spawn được ground-truth xác minh. Không gắn nhãn 'verified real-world position' cho player, building, terrain hoặc fixture dựa trên phép chuyển đổi toán học.

Phase 12 tạo **hệ quy chiếu và API toán học đáng tin cậy**; việc thu thập footprint, DEM, ảnh vệ tinh, building heights, landmark geometry, texture và satellite QA thuộc **Phase 13–20**, không thuộc Phase 12.

---

## 02. SCOPE — WHAT TO BUILD / WHAT NOT TO BUILD

### 02.1. Chức năng bắt buộc của Phase 12

1. Chốt **World Coordinate Convention** tương thích source hiện có.
2. Xây dựng **type-safe WGS84 geodetic coordinate model** và validation không làm sai dữ liệu.
3. Xây dựng chuyển đổi **Geodetic (WGS84) ↔ ECEF**.
4. Xây dựng chuyển đổi **ECEF ↔ Local ENU** theo anchor địa lý.
5. Xây dựng chuyển đổi **ENU ↔ Three.js World** theo hệ trục đã chốt.
6. Cung cấp **public Geospatial Core API**: Geo → World và World → Geo, cùng hướng/bearing/heading.
7. Xây dựng **immutable GeoReference / World Anchor configuration** và metadata độ tin cậy.
8. Hỗ trợ **relative world origin** để chuẩn bị chia zone sau này; không tự ý làm world streaming.
9. **Tích hợp không phá vỡ** player, minimap, heading và solar/world orientation.
10. Có **read-only debug/telemetry trong F3/Specs hiện có**, nếu cần để review, với cảnh báo rõ về môi trường synthetic (không tạo HUD mới lấn viewport).
11. Thêm **deterministic diagnostics / automated tests**, bằng chứng Preview, báo cáo Phase 12.
12. Xác định API contract dùng lại cho Phase 13–20.

### 02.2. Ngoài phạm vi — nghiêm cấm

- Không tải ảnh vệ tinh, imagery tiles, terrain tiles, photogrammetry hoặc point clouds.
- Không tự vẽ đường, sông, Cầu Rồng, Sơn Trà, Hải Vân, building/POI thực tế.
- Không tạo mới OpenStreetMap/Cesium/Google Maps integration.
- Không thay scene thành city map; không thay terrain demo hay giới hạn 68m.
- Không đổi player physics, animation, controls, camera UX, keybinding, weather provider, solar formula hoặc HUD zones ngoài phần tương thích thật sự cần thiết.
- Không thêm UI cho phép người dùng thay GPS, chọn thành phố, nhập lat/lon, chọn giờ/ngày hay thời tiết.
- Không tự thêm geolocation browser (quyền riêng tư người dùng không cần cho phase này).
- Không đổi từ raw Three.js sang R3F hoặc framework khác.
- Không thêm server/API route/database/cloud deployment.
- Không thêm thư viện geodesy mới nếu công thức pure TypeScript tự triển khai rõ ràng và đã test đủ; nếu thật sự cần dependency, nêu bằng chứng và chỉ thêm sau khi được phê duyệt.
- Không đổi hệ trục toàn world khiến phải viết lại minimap/collision/solar.
- Không tự chuyển Phase 13.

---

## 03. FIXED AXIS CONVENTION & UNIT CONTRACT

**Phải giữ world coordinate đang dùng, không 'định nghĩa mới' làm đảo trục:**

| Concept | Geospatial ENU | Three.js world |
|---|---|---|
| East | `+E` | `+X` |
| Up | `+U` | `+Y` |
| North | `+N` | `-Z` |
| South | `-N` | `+Z` |
| Altitude | meters, positive up | meters, positive `Y` |
| Latitude/longitude | degrees | không đưa trực tiếp vào Vector3 |
| Angles internally | radians | radians |
| Human-facing bearing | `0° North`, clockwise | mapped to `characterRig.root.rotation.y` |

**Scale contract:** 1 unit của Three.js world được quy ước bằng **1 mét mô phỏng**; độ dài mô hình thử nghiệm vẫn chỉ là tham chiếu giả lập, **không** có nghĩa độ chính xác địa lý đã được xác minh.

**Geo → World mapping (sau khi đã chuyển thành ENU):**

- `world.x = eastMeters`
- `world.y = upMeters`
- `world.z = -northMeters`

**World → ENU mapping:**

- `eastMeters = world.x`
- `northMeters = -world.z`
- `upMeters = world.y`

**Orientation contract:**

- `heading 0°` = Bắc = hướng `-Z` = `rotationY ≈ π`.
- `heading 90°` = Đông = hướng `+X` = `rotationY ≈ π/2`.
- `heading 180°` = Nam = hướng `+Z` = `rotationY ≈ 0`.
- `heading 270°` = Tây = hướng `-X` = `rotationY ≈ -π/2` (hoặc `3π/2`).
- `worldYawRad = normalizeAngle(π - degreesToRadians(headingDeg))` đối với character forward `+Z`. Phải xác minh bằng mã `rotationY` và minimap đang chạy, không chỉ tin vào comment.
- Reverse `headingDeg = normalizeDegrees(radiansToDegrees(π - worldYawRad))`.

**Các khái niệm không được trộn lẫn:** compass heading ≠ camera yaw ≠ solar azimuth ≠ meteorological *wind-from* direction. Trong Phase 12 chỉ định nghĩa contract và test hướng; không thay điều khiển thời tiết.

**Time:** tiếp tục `Asia/Ho_Chi_Minh`; geodetic math không phụ thuộc timezone.

---

## 04. GEOSPATIAL CORE — DATA TYPES & API DESIGN

Thiết kế API nhỏ, rõ, thuần toán học, không React state, không DOM, không GPU dependency cho phép thử nghiệm độc lập. Đảm bảo TypeScript strict, tránh `any`.

### 04.1. Required types (có thể điều chỉnh tên nếu nhất quán)

- `GeodeticCoordinate`: `{ latitudeDeg: number; longitudeDeg: number; ellipsoidalHeightMeters: number }`.
- `GeoHorizontalCoordinate`: `{ latitudeDeg: number; longitudeDeg: number }` — dùng khi *chưa biết* độ cao; không tự mặc định là `0m measured`.
- `ECEFCoordinate`: `{ xMeters: number; yMeters: number; zMeters: number }`.
- `ENUCoordinate`: `{ eastMeters: number; northMeters: number; upMeters: number }`.
- `WorldCoordinate`: `{ x: number; y: number; z: number }`.
- `GeoAnchor`: gồm ID ổn định, `GeodeticCoordinate`, source/accuracy/verification metadata, version.
- `GeoReferenceConfig`: anchor + axis convention + unit/height datum + trạng thái readiness.
- `GeoDataConfidence` / `GeoVerificationStatus`: ví dụ `reference-only`, `unverified`, `surveyed`, `verified` (chỉ dùng khi có bằng chứng nguồn).
- `GeospatialValidationError` hoặc result kiểu discriminated union (`ok:true,value` / `ok:false,error`) để tránh NaN.

Ưu tiên immutable interfaces (`readonly`) cho dữ liệu configuration. `THREE.Vector3` chỉ là adapter ở boundary với renderer; tránh dùng nó làm source-of-truth cho geodetic data. Có thể hỗ trợ optional `out` parameter để tái sử dụng scratch object trong hot path.

### 04.2. API tối thiểu phải có

- `validateGeodeticCoordinate(...)`
- `normalizeLongitudeDegrees(...)` (cần định nghĩa rõ hành vi -180/180 và validate khác với normalize)
- `geodeticToEcef(geo): ECEFCoordinate`
- `ecefToGeodetic(ecef): GeodeticCoordinate`
- `ecefToEnu(pointECEF, anchor): ENUCoordinate`
- `enuToEcef(pointENU, anchor): ECEFCoordinate`
- `enuToWorld(enu): WorldCoordinate`
- `worldToEnu(world): ENUCoordinate`
- `geoToWorld(geo, anchor): WorldCoordinate`
- `worldToGeo(world, anchor): GeodeticCoordinate`
- `headingToWorldYaw(headingDeg): number`
- `worldYawToHeading(worldYawRad): number`
- `getGeoReferenceStatus(): ...` hoặc config export/read-only tương đương.

Mọi conversion phải có tài liệu đơn vị input/output và điều kiện tiền đề. API phải reusable cho road points, POI, vegetation, building footprints, player positions và world zones ở các phase sau, dù Phase 12 chưa load chúng.

### 04.3. Validation contract

- Latitude hợp lệ trong `[-90,+90]` độ.
- Longitude do dữ liệu thực tế nhập phải là finite và có chính sách rõ: validate `[-180,+180]` trước khi normalize hoặc dùng normalized value một cách có chủ đích; không 'clamp' latitude/longitude sai thành địa điểm khác.
- Ellipsoidal height phải finite. Không trộn missing height với 0 mà không ghi metadata.
- ECEF/ENU/world: mọi thành phần phải hữu hạn; nhận `NaN`, `Infinity`, missing => lỗi rõ ràng.
- Không im lặng thay invalid lat/lon bằng `16.0544/108.2022`.
- Không im lặng thay invalid origin bằng `(0,0,0)`.
- Không dùng truthy checks loại bỏ `0` hợp lệ.
- Không trả về object có NaN rồi để renderer phát hiện về sau.
- Khi input không hợp lệ, nhất quán chọn `throw typed error` hoặc `Result` pattern và có test lỗi. Không nuốt exception.

---

## 05. WGS84, ECEF, ENU MATHEMATICS — IMPLEMENTATION REQUIREMENTS

### 05.1. Geodetic WGS84

Sử dụng hằng số chuẩn WGS84 (không tự nghĩ ra):

- Semi-major axis `a = 6378137.0` meters.
- Inverse flattening `1/f = 298.257223563`.
- `f = 1 / 298.257223563`.
- `eSquared = f * (2 - f)`.

Đơn vị `latitudeDeg`, `longitudeDeg`, `heightMeters` cần explicit. Phép lượng giác dùng radians. Cần phân biệt:

- WGS84 geographic **2D** (lat/lon; thường EPSG:4326 trong pipeline dữ liệu).
- WGS84 geographic **3D** với ellipsoidal height (EPSG:4979).
- WGS84 **ECEF/geocentric** Cartesian 3D (EPSG:4978).
- **Orthometric height** (cao độ theo geoid/mean sea level) KHÔNG đồng nhất ellipsoidal height. Muốn chuyển cần geoid model và vertical datum thích hợp, **ngoài Phase 12**.

### 05.2. Forward: Geodetic → ECEF

Yêu cầu sử dụng công thức ellipsoid WGS84, không dùng linear degrees-to-meters approximation làm core conversion:

- `N = a / sqrt(1 - e² * sin(latitude)²)`
- `X = (N + h) * cos(latitude) * cos(longitude)`
- `Y = (N + h) * cos(latitude) * sin(longitude)`
- `Z = (N * (1-e²) + h) * sin(latitude)`

**Chú ý:** tên `X/Y/Z` của ECEF không đồng nghĩa `x/y/z` của Three.js. Dùng tên type riêng.

### 05.3. Inverse: ECEF → Geodetic

Chọn thuật toán numerical ổn định (ví dụ iterative/Bowring, có điều kiện dừng, sai số và handling gần trục cực). Yêu cầu:

- Không phát sinh NaN ở cực Bắc/Nam hoặc đường đổi ngày ±180°.
- Xử lý rõ ECEF vector zero / near-center không có nghiệm địa lý chuẩn.
- Trả latitude/longitude/ellipsoidal height hữu hạn.
- Nêu rõ giới hạn chính xác và test bằng golden/reference values.
- Không phụ thuộc `THREE.Vector3` khi tính ECEF.

### 05.4. ECEF → ENU

Trừ tọa độ ECEF anchor tạo vector `ΔX/ΔY/ΔZ`, sau đó nhân ma trận trực chuẩn tại `(latitude0, longitude0)`:

- `east  = -sin(lon0)*ΔX + cos(lon0)*ΔY`
- `north = -sin(lat0)*cos(lon0)*ΔX - sin(lat0)*sin(lon0)*ΔY + cos(lat0)*ΔZ`
- `up    =  cos(lat0)*cos(lon0)*ΔX + cos(lat0)*sin(lon0)*ΔY + sin(lat0)*ΔZ`

Inverse ENU → ECEF sử dụng transpose của rotation matrix, cộng lại origin ECEF. Cache sin/cos lat/lon và anchor ECEF để không phải tính lại mỗi query.

### 05.5. Local tangent plane limitations

- ENU là local tangent plane, **không phải** bản đồ phẳng vô hạn không có méo.
- Với khoảng cách xa anchor, vertical curvature/linear distance và sai số flat-earth approximation phải được xem xét.
- Không claim sai số địa lý dưới 1–2m từ phép biến đổi chỉ vì round-trip test chính xác: **accuracy of numerical transform khác accuracy of real-world source data**.
- Phase 12 chỉ chuẩn bị contract để tương lai chia zone/floating origin; không triển khai shifting origin trong game loop nếu chưa cần.

Nguồn tài liệu kỹ thuật để kiểm chứng công thức (không copy code không rõ license):
- ESA Navipedia — ECEF ↔ ENU: https://gssc.esa.int/navipedia/index.php/Transformations_between_ECEF_and_ENU_coordinates
- EPSG:4979: https://epsg.io/4979
- EPSG:4978: https://epsg.io/4978

---

## 06. GEO REFERENCE / ANCHOR LIFECYCLE

### 06.1. Anchor mặc định — read-only, không giả mạo

Giữ reference city center đã có trong `DA_NANG_CONFIG`:

- `latitudeDeg: 16.0544`
- `longitudeDeg: 108.2022`
- `ellipsoidalHeightMeters: 0` **chỉ là mốc tham chiếu toán học tạm thời**, không phải phép đo cao độ đất thực tế.
- `id: 'danang-reference-v1'` (hoặc ID ổn định tương đương).
- `status: 'reference-only'` / `isGroundTruthVerified: false`.
- `source: 'existing DA_NANG_CONFIG; reference anchor only'`.
- `horizontalAccuracyMeters: null`, `verticalAccuracyMeters: null` nếu chưa có đo đạc.
- `heightDatum: 'WGS84_ELLIPSOID'`.
- `anchorVersion: 1`.

Không được thay đổi `DA_NANG_CONFIG.latitude/longitude` vì chúng đang được solar/weather sử dụng. Không tự nhận vị trí spawn `(0,0,0)` đúng địa lý thực tế.

### 06.2. Single source of truth

- Chỉ một geospatial core config cho active demo world.
- Tất cả Geo ↔ World conversions dùng anchor đã xác định, không dùng lat/lon hardcode rải rác ở các component.
- Config immutable sau init trong Phase 12; không có control runtime thay anchor.
- Tách `worldPosition` (simulation geometry) khỏi `geoPosition` (derived projection/actual verified data).
- Có `source`, `verification status`, `accuracy` nullable, `heightDatum`, `version`.
- Tách `crs` và `vertical datum`; không nhận `GPS` là chứng minh accuracy.

### 06.3. Readiness for future anchors / zones

Thiết kế interface có thể hỗ trợ tương lai:

- Multiple localized zone anchors.
- Asset position geo reference.
- World tile offsets.
- Origin rebasing/floating origin.
- Precision at city scale.
- Seam consistency giữa hai zone.

**Chỉ thiết kế interfaces và test thuần toán học nếu cần**; không load/tạo zone mới, không chuyển current player sang hệ mới, không dựng world streaming.

---

## 07. INTEGRATION WITH EXISTING PHASE 1–10 SYSTEMS

### 07.1. Player / movement

- Giữ nguyên `playerStateRef.current.position` và `characterRig.root.position` làm **authoritative simulation world coordinates**.
- Không chuyển player movement sang sử dụng GPS mỗi frame.
- Không gọi `geoToWorld/worldToGeo` 60 lần mỗi giây nếu không cần.
- Player reset `R` vẫn về `(0,0,0)` trong **demo local world**; không có teleport theo lat/lon.
- Walk/sprint/jump/gravity, collision, `getTerrainElevation`, `PLATFORM_COLLIDERS/ROCK_COLLIDERS/TREE_COLLIDERS`, world boundary không đổi.
- Để chứng minh tích hợp: một hàm read-only lấy snapshot world position để convert thành derived geodetic coordinate **với nhãn `SIMULATION / REFERENCE ONLY`** (nếu altitude Y là giả lập thì converted ellipsoidal height cũng giả lập).
- Derived coordinate chỉ để debug; không đưa làm tọa độ landmark du lịch xác thực.

### 07.2. Mini Map

- Giữ nguyên `projectWorldToMiniMap`, orthographic camera orientation `up=(0,0,-1)`, hướng `-Z` trên / `+X` phải.
- Overview/follow/zoom/edge clamp/marker heading giữ nguyên.
- Thêm tests cho consistency: Geo point phía Đông phải đi về phía +X/phải minimap; Geo point phía Bắc phải đi về phía -Z/trên minimap.
- Không thêm satellite minimap layer ở phase này.
- Giữ 1 WebGLRenderer; không tạo map canvas/render pass mới.

### 07.3. Solar / compass / wind direction

- Kiểm tra `calculateDaNangSolarData` đang tính sun direction: theo code snapshot `x≈sin(azimuth)`, `z≈-cos(azimuth)`; tương thích North=-Z / East=+X. Chạy test cardinal direction ở mức toán học; không thay chức năng astronomy đang hoạt động.
- Không đổi `DA_NANG_CONFIG` hoặc cách Open-Meteo dùng coordinates.
- Ghi rõ convention 'wind FROM' đối với dữ liệu khí tượng nếu API cung cấp hướng gió khí tượng; không tự động đảo vector mưa/gió ở Phase 12. Đưa contract chuẩn vào tài liệu để Phase 21–28 dùng nhất quán.

### 07.4. Interaction fixtures

- `INITIAL_INTERACTABLE_FIXTURES` giữ nguyên local coordinates.
- `InteractableRegistry` và raycasting 20Hz không đổi.
- Không gán geospatial provenance 'verified' cho các fixture thử nghiệm.
- Không cần chuyển tất cả fixture definitions sang geo ngay bây giờ; sử dụng adapter cho tương lai.

### 07.5. HUD / diagnostics integration

**Đầu ra phải có thể kiểm tra trực tiếp trong Gemini Preview**, nhưng không thêm UI gây cản trở:

- Tích hợp *một phần thông tin nhỏ, chỉ đọc* trong **F3 Debug/Specs hiện có**, không tạo nút/tool panel mới.
- Nội dung đề xuất: `Geo Core: READY`, `CRS: WGS84 → ECEF → ENU`, `Anchor: Reference-only`, `Axis: +X East / -Z North`, `Player Geo: derived (unverified)` và lat/lon/height nếu tính ra hợp lệ.
- Đối với thiếu độ cao thực địa, ghi `0m reference assumption`, không hiển thị là elevation measured.
- Refresh derived player geodetic 1–2Hz hoặc khi Debug mở; không update React per frame.
- Không hiển thị một GPS giá trị suy ra của player như vị trí thực tế đã đo đạc. Cần badge textual `SIMULATED POSITION — NOT GEO-VERIFIED`.
- Nếu không thể thêm phần nhỏ trong F3 mà không ảnh hưởng layout, ưu tiên in diagnostics trong bảng hiện hữu và giải thích giới hạn.
- Kết quả test phải rõ PASS/FAIL; không hardcode số lượng.

---

## 08. DETERMINISTIC AUTOMATED TESTS — MANDATORY

Tạo và chạy test suite thực sự. Nếu repo có test runner, sử dụng runner hiện có. Nếu chỉ có self-contained preview, thêm diagnostics deterministic vào `runSystemDiagnosticsSuite` hoặc bộ test pure function phù hợp, **không làm mất DIAG-01–09**. Có thể đặt ID `DIAG-10` trở đi, đảm bảo mỗi test kiểm tra một invariant thực sự; cập nhật tỷ lệ PASS từ `results.length` động, không làm thay đổi nội dung/chức năng test cũ.

### 08.1. Những bài kiểm tra bắt buộc

| Test | Scenario | Acceptance / invariant |
|---|---|---|
| GEO-01 | Anchor maps to local origin | `geoToWorld(anchor)` gần `(0,0,0)` |
| GEO-02 | World origin round-trip | `worldToGeo(0,0,0)` tương ứng anchor |
| GEO-03 | Geo → ECEF → Geo | Round-trip latitude/longitude/height trong tolerance |
| GEO-04 | ECEF → ENU → ECEF | Round-trip Cartesian trong tolerance |
| GEO-05 | ENU → World → ENU | East/Up/North maps exact axis signs |
| GEO-06 | Cardinal East | Điểm dịch phía Đông có World X dương |
| GEO-07 | Cardinal North | Điểm dịch phía Bắc có World Z âm |
| GEO-08 | Vertical | `+U` đi vào World Y dương |
| GEO-09 | Heading | `N/E/S/W` chuyển qua yaw và ngược lại đúng |
| GEO-10 | Mini Map | World East = phải, North = trên |
| GEO-11 | World ↔ Geo near-origin | Round-trip các điểm trong demo world, kể cả height |
| GEO-12 | Invalid input | NaN/Infinity/lat out of range đều bị reject |
| GEO-13 | Anti-meridian | ±180°, longitude normalization nhất quán |
| GEO-14 | Polar/edge case | High latitude và pole không crash/NaN |
| GEO-15 | Height datum | Không gán độ cao orthometric khi đầu vào chỉ là ellipsoid |
| GEO-16 | Regression | DIAG-01–09 vẫn PASS và không sửa behavior |

Thêm corner cases:

- `0°` latitude/longitude hợp lệ.
- Longitude negative và latitude negative (Southern Hemisphere).
- Height negative (nếu finite và phù hợp định nghĩa input).
- Very small offsets: 0.001m.
- Coordinates cách anchor vài km.
- Equator, near-poles, international date line.
- Zero ECEF vector là invalid geodetic reverse, phải có error contract.
- `heading -90°, 360°, 450°` normalization.
- World coordinates non-finite là invalid.

### 08.2. Numerical tolerance & independent validation

- Với số học JavaScript `number` double precision, **target** round-trip world ↔ geo **≤ 0.01m** tại các điểm cách anchor trong khoảng 5km; đây là **numerical round-trip target**, không khẳng định accuracy của địa hình, ảnh vệ tinh hoặc landmark.
- Latitude/longitude compare bằng angular distance hoặc metric residual quy đổi đúng theo địa cầu, không dùng `==` trên floating point.
- Có ít nhất một golden coordinate từ nguồn độc lập hoặc reference transform đáng tin cậy; không tự dùng cả function forward và inverse cùng lỗi để chứng minh lẫn nhau.
- Chạy tests thật, ghi actual residual (m) và threshold, không in PASS từ hardcoded boolean.
- Sai số khi mô phỏng preview không được phát biểu là độ sai lệch GPS đã được kiểm nghiệm thực địa.

### 08.3. Negative tests / evidence

- Test cho trường hợp lỗi input thực sự trả trạng thái lỗi/thrown error như thiết kế.
- Chạy lại tests sau mỗi chỉnh sửa logic geodesy.
- Không sửa tolerance để che lỗi; nếu mục tiêu chưa đạt, điều tra nguyên nhân.
- Có test đảo chiều trục để phát hiện mirrored-map regression.

---

## 09. PERFORMANCE & PRECISION REQUIREMENTS

- Dùng `number` double precision cho lat/lon/ECEF/ENU và geospatial core trên CPU.
- Chỉ tạo `THREE.Vector3` ở adapter cần thiết cho render; GPU thường nhận float precision và nên dùng world-relative coordinates nhỏ.
- Cache anchor ECEF, sin/cos anchor, rotation matrix / transpose.
- Phép chuyển đổi chỉ thực hiện khi import/spawn/update geospatial objects hoặc lấy debug snapshot có throttling, không phải 60Hz cho mỗi instance.
- Không `new` objects mỗi frame trong `animate()`.
- Không `setState` mỗi frame; giữ các cadence telemetry đã thống nhất.
- Không thêm WebGL renderer/canvas và không tăng draw calls đáng kể do Phase 12.
- Không tạo worker, database, dynamic import, network API cho core math.
- Không đổi adaptive quality tiers hay DPR configuration.
- Nếu cần chuyển nhiều điểm, API có thể nhận explicit scratch/output object; chưa cần premature optimize bằng WASM.
- Có kế hoạch tương lai cho rebasing, tránh lấy double-precision world absolute vào shader với tọa độ cực lớn.

Performance acceptance:

1. Không phát sinh UI frame drops dễ quan sát khi debug panel mở.
2. No new network dependency for geospatial math.
3. Không tạo thêm WebGL context.
4. Chứng minh `requestAnimationFrame`, renderer và controls vẫn ổn định.
5. Ghi baseline FPS/frame time trước và sau với cùng thiết bị/viewport/scene nếu có thể đo thực tế.

---

## 10. IMPLEMENTATION ORDER — SMALL, TESTABLE CHANGES

**STAGE 0 — Inspect & baseline**

- Đọc tài liệu + full App.tsx đang chạy.
- Kiểm tra Phase 11 report nếu có.
- Snapshot `git status/diff` để tránh ghi đè user changes.
- Xác nhận build scripts, tsconfig, Preview entrypoint.
- Chạy build/typecheck và DIAG-01–09 trước thay đổi nếu có công cụ.
- Lưu bảng baseline có evidence; nếu Preview không hoạt động phải xác định blocker.

**GATE 0:** biết code nào đang chạy và trạng thái ban đầu; không giả định Phase 11 PASS.

**STAGE 1 — Architecture design (ngắn nhưng cụ thể)**

- Chốt axes, units, geo anchor status, height datum.
- Chốt API signatures, immutable inputs, error handling.
- Chọn thuật toán ECEF inverse và tolerance/edge cases.
- Lập danh sách vị trí code cần thay đổi (ưu tiên một section độc lập trong App.tsx).

**GATE 1:** không có xung đột với movement/minimap/solar; không cần dependency mới.

**STAGE 2 — Pure math implementation**

- Tạo WGS84 constants và types.
- Tạo validation.
- Tạo ECEF forward/inverse.
- Tạo ENU forward/inverse và world transform.
- Tạo heading mapping helpers.
- Mọi hàm có input/output units explicit.

**GATE 2:** typecheck và GEO-01–09 pass trên deterministic inputs.

**STAGE 3 — Reference anchor, safe integration**

- Tạo read-only `GeoReferenceConfig` (reference-only status).
- Hook read-only adapter với player local world snapshot.
- Thêm thông tin tối thiểu vào F3/Specs nếu không ảnh hưởng UX.
- Không thay renderer, player physics, scene objects, minimap behavior.

**GATE 3:** World chạy y hệt Phase 10; debug cho thấy axis/anchor/derived coordinate với cảnh báo không geo-verified.

**STAGE 4 — Extended tests**

- Chạy GEO-01–16 và error cases.
- Kiểm tra ECEF golden values / precision.
- Chạy DIAG-01–09 gốc.
- Kiểm tra cardinal mapping, antipodal edge cases hợp lý, anti-meridian, poles.
- Không hardcode kết quả.

**GATE 4:** all core math tests pass; mọi failure phải có root cause.

**STAGE 5 — Interactive Gemini Preview verification**

- Bắt buộc render, xem, tương tác Preview thực tế.
- Desktop 1920×1080 và 1366×768; mobile 390×844/landscape nếu Preview hỗ trợ.
- Đi bộ, chạy, nhảy, xoay camera; minimap zoom/follow/marker; click HUD; tương tác fixture; F3.
- Kiểm tra Geo read-only telemetry khi di chuyển East/North (mốc delta/heading hợp lý).
- Reload và stress test mở/đóng Debug; console không có lỗi mới.
- Kiểm tra network offline: weather fallback không bị ảnh hưởng.
- Không nói đã test nếu công cụ không thực sự cho phép thao tác.

**GATE 5:** Preview chạy, người dùng có thể tự review; không có regression.

**STAGE 6 — Documentation & final handoff**

- Tạo `PHASE_12_IMPLEMENTATION_REPORT.md` nếu workspace hỗ trợ artifact, không thay thế code.
- Cập nhật bảng decisions, file changes, API contracts, verification and limitations.
- Đưa checklist Phase 13 data readiness (không implement Phase 13).

**GATE 6:** bàn giao source code chạy thật, tests + evidence + status, không chỉ proposal.

Nếu fail bất kỳ gate nào: fix trong phạm vi Phase 12, test lại tất cả các gate bị ảnh hưởng. Nếu blocker ngoài scope, báo P0/P1, không lặng lẽ thay đổi phase cũ.

---

## 11. MANUAL REGRESSION MATRIX — KEEP PHASE 1–10 WORKING

| Existing phase | Must stay operational |
|---|---|
| 01 | character rig, walk/run/jump/fall/landing, camera, collision, procedural terrain, reset |
| 02 | timezone, solar direction, Open-Meteo, WMO, data freshness, weather effects |
| 03 | automatic input detection, joystick, swipe, pinch, sprint, jump, hybrid |
| 04 | HUD zones, design tokens, stable layering, SEO metadata |
| 05 | persistent time/weather compact widget (time/icon/temp always visible) |
| 06 | independent expanded/compact/hidden panels, MiniDataChip safe formatting |
| 07 | adaptive desktop/touch guide, H toggle, focus isolation |
| 08 | orthographic minimap, zoom boundaries, visibility and 1 renderer |
| 09 | player marker, heading cone, overview/follow (F), edge clamping, M |
| 10 | interactable 3 fixtures, E action, Shift+E Env, raycast, distance, occlusion, cooldown, ESC |

Specific hotkey tests:

- `W/A/S/D`, `Shift`, `Space`, `R`, camera mouse/pinch.
- `F` Follow, `M` minimap compact, `H` controls guide.
- `E` interact within valid target, `Shift+E` environment.
- `F3` Debug, `ESC` dialog/pointer lock.
- Touch UI không chặn drag camera/joystick hoặc che nội dung sống còn.

Run-time controls validation không phải chỉ pass unit checks. So sánh trước/sau, ghi issues theo severity. Ghi `NOT TESTED` nếu không có browser/mobile instrumentation thật.

---

## 12. FILE STRUCTURE & DELIVERY CONSTRAINTS

**Gemini self-contained Preview mode:** nếu app hiện tại sử dụng một `App.tsx` hoàn chỉnh, ưu tiên thêm section `PHASE 12: GEOSPATIAL CORE` **trong cùng file**, export functions/types reusable. Không xuất một loạt file code rời làm Preview không chạy hoặc quên import. Không xóa/viết lại 8.5k dòng code Phase 10.

**Repo modular mode:** chỉ khi workspace thực tế đã có module architecture và preview/import hoạt động, có thể tách pure geo logic vào module nhỏ có typecheck/test; vẫn đảm bảo Preview sử dụng thay đổi thực sự. Không tự chuyển framework/monorepo.

**Không thêm dependency chỉ vì dễ viết**. Code nên self-contained, testable, inline docs rõ; nếu thiếu thư viện test, tận dụng harness sẵn có/diagnostics mà không gây side effects.

**Không sửa những phần không liên quan**, không đổi routes, styles, asset models, API keys, UX. Ghi danh sách diff chính xác và lý do từng thay đổi. Bảo toàn user changes.

---

## 13. ACCEPTANCE CRITERIA — MUST PASS BEFORE CLAIMING DONE

### A. Mathematics

- [ ] WGS84 ellipsoid constants đúng.
- [ ] `geo→ECEF→geo` round-trip chính xác, có golden tests.
- [ ] `ECEF→ENU→ECEF` round-trip chính xác.
- [ ] `geo→world→geo` round-trip kiểm tra bằng metric residual.
- [ ] `+X East`, `+Y Up`, `-Z North` đúng và có tests.
- [ ] Heading N/E/S/W mapping chính xác, ngược lại chính xác.
- [ ] Input invalid không âm thầm tạo tọa độ giả.
- [ ] Vertical datum được nêu rõ: WGS84 ellipsoid, không mặc định MSL.

### B. Architecture

- [ ] Đã có GeoReferenceConfig/GeoAnchor read-only, metadata độ tin cậy rõ.
- [ ] Dùng lại `DA_NANG_CONFIG` và world space hiện tại; không đổi origin simulation.
- [ ] Không có dependency mới không được phê duyệt.
- [ ] Không có React update per frame.
- [ ] Không tạo renderer/canvas mới.
- [ ] Không tải map/terrain satellite assets.
- [ ] API rõ ràng cho Phase 13–20 mà không khóa cứng vào HUD.

### C. Runtime & UX

- [ ] App typecheck/build thành công nếu tool hỗ trợ.
- [ ] Gemini Preview thực sự render được.
- [ ] F3/Specs có minh chứng geospatial readiness, hiển thị `reference-only`.
- [ ] Player và minimap vẫn đúng trục, không bị lật/map mirror.
- [ ] UI desktop/mobile không bị chồng lấn mới.
- [ ] Open-Meteo/solar vẫn hoạt động, không đổi logic của Phase 2.

### D. Regression & Quality

- [ ] DIAG-01–09 nguyên vẹn, hoạt động.
- [ ] GEO tests chạy thật, có pass/fail/actual residual.
- [ ] Không xuất hiện lỗi console mới.
- [ ] Không có blocker P0/P1 do thay đổi Phase 12.
- [ ] Có danh sách file đã thay đổi và lý do.
- [ ] Không gọi kết quả chưa test là PASS.

Nếu một mục không thể xác minh vì môi trường, đánh dấu `NOT VERIFIED` với nguyên nhân. Không tự tuyên bố hoàn thành tuyệt đối nếu thiếu điều kiện cốt lõi.

---

## 14. EXPECTED FINAL OUTPUT — EVIDENCE-BASED

Sau khi CODE được triển khai và Preview chạy, báo cáo ngắn gọn nhưng đầy đủ:

```text
PHASE 12 — GEOSPATIAL CORE IMPLEMENTATION REPORT

1. IMPLEMENTATION STATUS
   - COMPLETE / PARTIAL / BLOCKED
   - Source-of-truth file(s)
   - Phase 11 prerequisite status (verified / report missing / blocker)

2. IMPLEMENTED FEATURES
   - Types / config / validation
   - WGS84 ↔ ECEF ↔ ENU ↔ World functions
   - Heading and cardinal mapping
   - Read-only integration/debug telemetry

3. FILE CHANGES
   - Exact paths and diff summary
   - Dependencies changed (should be none)
   - Existing features impacted

4. TEST EXECUTION
   - Build / TypeScript strict
   - DIAG-01–09 result
   - GEO-01–16 with actual measured residuals
   - Negative/edge test results

5. GEMINI PREVIEW VERIFICATION
   - What was rendered and manually tested
   - Desktop/mobile viewports
   - Screenshots/evidence when supported
   - Untested cases explicitly marked

6. PERFORMANCE & REGRESSION
   - FPS/frame time before/after if measurable
   - Renderer/canvas/memory behavior
   - Regressions and remediation

7. ACCURACY & DATA LIMITATIONS
   - Anchor is reference-only
   - Scene remains synthetic, not satellite aligned
   - Ellipsoidal height != terrain elevation/MSL
   - Numeric precision != geographic data accuracy

8. ACCEPTANCE CHECKLIST
   - PASS / FAIL / NOT VERIFIED per criterion

9. NEXT PHASE HANDOFF
   - Phase 13: data sources, metadata, provenance, licensing, imagery/DEM readiness
   - No Phase 13 implementation performed
```

Cuối cùng hiển thị:
- **APP/Preview có thể review**, không chỉ đoạn code minh họa.
- Source code thực tế đã cập nhật.
- Không cần người dùng copy thủ công các file module rời vào project để chạy.
- Nếu code thật chưa thể chạy Preview, nói rõ blocker và đưa phần code đã hoàn thành; không giả vờ thành công.
- **DỪNG tại Phase 12, chờ Project Owner nghiệm thu trước Phase 13.**

---

## 15. FINAL ENGINEERING DIRECTIVE

Không dùng đường tắt như nhân trực tiếp latitude/longitude với một hằng số mét/độ để thay cho hệ chuyển đổi WGS84→ECEF→ENU. Không nhập đại tọa độ thành phố rồi xem demo terrain là Đà Nẵng. Không đổi ký hiệu trục để vừa mắt ảnh chụp mà phá minimap hoặc sun direction. Không đụng vào user controls và HUD quan trọng. Không tối ưu giả bằng cách bỏ rendering hoặc physics đã có. Không tạo mock visual để thay code hoạt động.

**Hãy triển khai theo quy trình:**

`INSPECT → BASELINE → DESIGN → IMPLEMENT PURE GEO CORE → TEST MATH → INTEGRATE READ-ONLY → REGRESSION → PREVIEW → QA → REPORT → STOP`

Mỗi gate cần bằng chứng. Khi hoàn thành phải có chức năng core toán học đáng tin, Preview nguyên vẹn, UI/debug có thể kiểm tra và cấu trúc đủ sạch cho GIS data pipeline ở Phase 13.

**START IMPLEMENTING PHASE 12 NOW. DO NOT ADVANCE TO PHASE 13.**
