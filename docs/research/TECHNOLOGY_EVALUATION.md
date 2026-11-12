# Đánh giá công nghệ — 2026-11-12

Đây là đánh giá compatibility từ source/documentation; không phải benchmark GPU. Registry trả Three.js 0.187.0; chọn 0.186.0 vì Context7 có tài liệu r186 và tránh bản mới chưa đánh giá. Chỉ thêm Three.js và types, không thêm engine khác.

Điểm 1–5 do kỹ sư đánh giá cho mục tiêu giữ Phase 1–10; không phải kết quả đo. Trọng số: compatibility 50%, geospatial 25%, migration cost thấp 25%.

| Candidate | Compatibility | Geospatial | Cost thấp | Tổng | Quyết định |
|---|---:|---:|---:|---:|---|
| Raw Three WebGL2 | 5 | 2 | 5 | 4.25 | baseline |
| Three WebGPU | 2 | 2 | 2 | 2.00 | POC, chưa thay runtime |
| Three + 3D Tiles | 4 | 4 | 3 | 3.75 | sau khi có tileset hợp lệ |
| CesiumJS | 1 | 5 | 1 | 2.00 | không thêm engine cạnh tranh |
| MapLibre | 1 | 4 | 2 | 2.00 | chỉ cân nhắc map overlay |

[Three WebGPU](https://threejs.org/docs/pages/WebGPURenderer.html) chọn WebGPU khi hỗ trợ, fallback WebGL2. Điều này không chứng minh ShaderMaterial GLSL hiện tại tương thích; phải kiểm tra sky shader và minimap viewport/scissor trước đổi.
[NASA-AMMOS](https://github.com/NASA-AMMOS/3DTilesRendererJS) là candidate tích hợp Three; cần kiểm tra extensions, cache, cancellation, dispose cho dataset cụ thể.
[CesiumJS](https://cesium.com/platform/cesiumjs/) có globe WGS84 và terrain/3D Tiles, Apache-2.0. Chi phí giữ controller hiện tại chưa đo.
[MapLibre docs](https://maplibre.org/maplibre-gl-js/docs/) phù hợp context bản đồ, không thay engine gameplay.
[glTF Transform](https://gltf-transform.dev/) cho pipeline offline GLB, dedup/simplify/meshopt/KTX2. Chưa cài vì chưa có asset được cấp phép để đo.

Spatial indexing: grid cho synthetic collision nhỏ; BVH chỉ khi có collision mesh phức tạp; quadtree cho geographic tiles. Chưa thêm library indexing.

Giới hạn: chưa đo bundle delta, CPU/GPU, mobile support thực tế; chưa chọn version cho candidates không cài. Không tuyên bố WebGPU nhanh hơn.
