# World Core

World -> region -> zone -> tile -> layer -> element -> prefab -> asset. Stable IDs, versions và provenance bắt buộc trước ingest. Chỉ synthetic fixtures hiện có; geographic boundary unknown.

Zone loader quản lý load/unload/cancel/retry, ownership và disposal; loader nhận manifest đã validate. Không download toàn thành phố. Bounds/origin phải kèm CRS và vertical reference. Shared assets có chủ sở hữu cache; element chỉ dispose tài nguyên riêng. Prefetch chưa được coi là implemented nếu chỉ có interfaces.

Geospatial interchange longitude/latitude EPSG:4326; 3D ellipsoidal coordinates EPSG:4979, ECEF EPSG:4978. Local ENU mapping engine X=east,Y=up,Z=-north, 1 unit=1m. Projected CRS VN-2000/UTM chỉ chọn theo metadata nguồn. Không tự đổi vertical datum. Floating origin dùng translation cùng frame, không thay geographic anchors; mọi camera/physics/interaction dịch cùng transaction.
