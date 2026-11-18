# Imagery alignment — Phase 14

## Luồng dữ liệu và ownership

`worlds/danang/data-sources.ts` → registry Phase 13 → `validateImageryAsset`
→ raster schema/affine/GCP → bounded local PNG loader → canvas 2D trong F3.
Không có catalog nguồn thứ hai, imagery provider, proxy URL, streaming hoặc terrain mesh.
City catalog hiện chưa có source imagery được duyệt. Inspector mặc định chỉ hiển thị
trạng thái thiếu dữ liệu và footprint **TEST DATA / NOT SATELLITE IMAGERY**.

`engine/imagery/alignment.ts` chứa toán và schema thuần; không import React, Next hoặc city.
`world-core/registries/imagery.ts` kết hợp schema đó với governance hiện hữu.
`modules/WorldExplorer/imagery-preview.ts` sở hữu browser fetch/decode;
`ImageryInspector.tsx` sở hữu cancellation, bitmap và canvas. Không thêm WebGLRenderer.

## Hệ tọa độ và pixel

- Native CRS duy nhất: EPSG:4326 2D, API `x=longitude`, `y=latitude`, đơn vị degree.
- Raster phải orthorectified/preprocessed. UTM/VN-2000, datum grid, geoid và raw GeoTIFF
  chưa hỗ trợ; fail closed thay vì viết projection xấp xỉ.
- GDAL affine: `x=GT0+column*GT1+row*GT2`, `y=GT3+column*GT4+row*GT5`.
- Public pixel coordinates luôn là pixel-edge coordinates; tâm pixel đầu là `(0.5,0.5)`.
  Nếu affine đầu vào tham chiếu tâm, trừ `0.5` ở cả hai trục trước forward,
  cộng lại khi inverse. GDAL GeoTransform đã chuẩn hóa edge phải khai báo `pixel-corner`,
  kể cả GeoTIFF có PixelIsPoint. Không chuyển PixelIsPoint hai lần.
- Footprint gồm TL/TR/BR/BL/TL, đi theo ranh giới pixel, kiểm khớp affine trong `1e-8°`.
  Ring tùy ý, crossing, mirror/upside-down, dateline, latitude ngoài ±85° bị từ chối.
- Hỗ trợ rotation/shear có East-right/North-up; không tuyên bố hỗ trợ mọi orientation.
  Condition estimate infinity norm tối đa `1e8`, độc lập scale.
- Chỉ dùng Phase 12 WGS84 → ECEF → ENU → world: `+X East,+Y Up,-Z North`.
  World origin áp dụng đúng một lần. Height ellipsoid phải do caller chỉ định;
  không đọc elevation từ màu/no-data, không đổi collision hay terrain.
- `worldToPixel` là inverse của một điểm 3D đã có height, không phải terrain raycast.

## Accuracy và giới hạn

GCP có ID/source/asset/version, pixel, lon/lat, provenance, collection date, uncertainty,
role và khai báo authority. Tối đa 100 points; mỗi role có dữ liệu cần ≥3 points,
không trùng, không collinear và tam giác lớn nhất ≥2% raster area.
Calibration không được tính vào thống kê holdout. Không có fitting hoặc tự sửa affine.

Horizontal residual đo trong tangent frame tại predicted point, tránh giảm sai số khi
world anchor ở xa. Ground coordinate cách predicted point quá 1° trên một trục bị từ chối.
Hai điểm dùng cùng ellipsoid height giả định; đây là phép kiểm ngang, không survey height.
Trả từng residual mét/pixel và n/mean/median/RMSE/max/nearest-rank p95 riêng từng role.
Ngưỡng do dataset record khai báo; không có ngưỡng chứng nhận toàn thành phố mặc định.

`unverified` = metadata registered nhưng chưa có holdout authoritative đủ điều kiện;
`checkpoint-validated` = holdout đủ điểm và dưới ngưỡng; `rejected` = vượt ngưỡng.
Authority/provenance là evidence do chủ dữ liệu/reviewer cung cấp, không xác thực danh tính
người khảo sát bằng phần mềm. Round-trip nhỏ không chứng minh geographic accuracy.
Điểm neo Đà Nẵng vẫn `reference-only`, không biến thành surveyed origin.

## Asset trust và preview

Source phải qua schema Phase 13, đúng imagery category, CRS, bounds/capture date và quyền
display **và redistribute**. Adapter dùng chung `dataUseDenials`; vector ingestion vẫn
giữ eligibility riêng và không chấp nhận imagery như OSM snapshot.
Record imagery cần dataset/asset/version, input artifact, origin URL cùng provider origin,
retrieval time, asset-specific legal review, processing history, masked PNG và SHA-256.
Legal review của asset không được trước retrieval; GCP không được sau retrieval.
Unknown date giữ null. Source permission không được suy ra từ HTTP 200.

Chỉ tải `/imagery/<assetId>/<sha256>.png`, không query/protocol/encoded traversal.
Không redirect, credentials hoặc cache. Timeout 8 giây; tối đa 8 MiB encoded,
4096 trên mỗi chiều, tổng 4,194,304 pixels. Byte stream bị cắt ngay khi vượt record budget.
PNG signature/IHDR dimensions và SHA-256 được kiểm trước decoder; decoded dimensions kiểm lại.
Nguồn được revalidate sau fetch. Toggle/unmount abort request và close ImageBitmap.
Đổi nguồn hoặc lỗi xóa canvas và attribution cũ. Browser cache không cấp quyền lại.

Preview là planar tangent diagnostic riêng, không phải map/terrain replacement.
Biến đổi canvas dùng ba corners, kiểm corner thứ tư lệch không quá nửa GSD;
quá ngưỡng cần preprocess vùng nhỏ hơn. Không nội suy địa hình hay che sai số warp.
PNG alpha phải chứa mask do offline preprocessing khai báo; không tự chế missing pixels.
Không có raster thật trong repository nên legal, pixel appearance và surveyed alignment thật
chưa được xác minh. Xem report và IMG matrix để biết phạm vi proof.

## Tham khảo kiểm tra

GDAL Raster Data Model và GeoTIFF, Copernicus terms/Sentinel-2 và OGC STAC trả HTTP 200
trong lượt kiểm ngày 2026-11-18 Asia/Bangkok; USGS citation trả 403.
URL, thời gian và trích đoạn trong `docs/audit/phase-14/evidence/references.json`.
Không có dataset-specific license approval được suy ra từ các trang này.
