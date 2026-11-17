# World Core

World -> region -> zone -> tile -> layer -> element -> prefab -> asset. Stable IDs, versions và provenance bắt buộc trước ingest. Chỉ synthetic fixtures hiện có; geographic boundary unknown.

Integration hiện tại: `src/worlds/danang/scene.ts` compose scene gốc Phase 10, dùng `zones/manifest.ts` và shared rock prefab catalog. Runtime consumer ở `src/modules/WorldExplorer/runtime/world.ts`. Các placements còn lại giữ synthetic constants của prototype, không chuyển chúng thành GIS data. Loader hiện tại là synchronous registry/rollback; cancel/retry/prefetch city streaming bên dưới vẫn là kiến trúc tương lai.

Zone loader quản lý load/unload/cancel/retry, ownership và disposal; loader nhận manifest đã validate. Không download toàn thành phố. Bounds/origin phải kèm CRS và vertical reference. Shared assets có chủ sở hữu cache; element chỉ dispose tài nguyên riêng. Prefetch chưa được coi là implemented nếu chỉ có interfaces.

Geospatial interchange longitude/latitude EPSG:4326; 3D ellipsoidal coordinates EPSG:4979, ECEF EPSG:4978. Local ENU mapping engine X=east,Y=up,Z=-north, 1 unit=1m. Projected CRS VN-2000/UTM chỉ chọn theo metadata nguồn. Không tự đổi vertical datum. Floating origin dùng translation cùng frame, không thay geographic anchors; mọi camera/physics/interaction dịch cùng transaction.
