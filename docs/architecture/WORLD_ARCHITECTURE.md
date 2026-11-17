# World Core

World -> region -> zone -> tile -> layer -> element -> prefab -> asset. Stable IDs, versions và provenance bắt buộc trước ingest. Chỉ synthetic fixtures hiện có; geographic boundary unknown.

Integration hiện tại: `src/worlds/danang/scene.ts` compose scene gốc Phase 10, dùng `zones/manifest.ts` và shared rock prefab catalog. Runtime consumer ở `src/modules/WorldExplorer/runtime/world.ts`. Các placements còn lại giữ synthetic constants của prototype, không chuyển chúng thành GIS data. Loader hiện tại là synchronous registry/rollback; cancel/retry/prefetch city streaming bên dưới vẫn là kiến trúc tương lai.

Zone loader quản lý load/unload/cancel/retry, ownership và disposal; loader nhận manifest đã validate. Không download toàn thành phố. Bounds/origin phải kèm CRS và vertical reference. Shared assets có chủ sở hữu cache; element chỉ dispose tài nguyên riêng. Prefetch chưa được coi là implemented nếu chỉ có interfaces.

Geospatial interchange longitude/latitude EPSG:4326; 3D ellipsoidal coordinates EPSG:4979, ECEF EPSG:4978. Local ENU mapping engine X=east,Y=up,Z=-north, 1 unit=1m. Projected CRS VN-2000/UTM chỉ chọn theo metadata nguồn. Không tự đổi vertical datum. Floating origin dùng translation cùng frame, không thay geographic anchors; mọi camera/physics/interaction dịch cùng transaction.

## Phase 13 data governance

`src/world-core/registries/data-sources.ts` extends the existing manifest provenance schema and owns strict source/dataset validation, eligibility, immutable registry reads, SHA-256 validation and node snapshot normalization. The city catalog lives in `src/worlds/danang/data-sources.ts`; F3 reads its static registry without GIS network access. The engine, georeference, synthetic scene and PrefabRegistry retain their existing ownership.

`src/integrations/geodata/overpass.server.ts` is an opt-in Node transport with one fixed HTTPS endpoint, no redirects/retries, a 10-second deadline, 256 KiB cap, 100-node cap and reviewed bounding box no wider/taller than 0.002 degrees. It requires approved source rights before any request. No route, job, visitor fetch or mesh consumer exists. Node built-ins keep this transport outside browser bundles.

Only EPSG:4326 two-dimensional OSM nodes are normalized. Missing height stays absent. EPSG:4979/ECEF conversions remain exclusively in Phase 12; other CRS require conversion and cannot enter this slice. Geographic bounds here explicitly use WGS84 longitude/latitude degrees and reject wrapping boxes. No polygon/terrain adapter is implied.

Production dataset registration requires an immutable record returned by `validateSnapshot` in the same process, plus approved source evidence. Reloaded records must revalidate their stored raw bytes. A declared checksum or `ingested` status alone cannot bypass validation. TEST-ONLY snapshots are prohibited in the production registry. `canRender` always denies because real scene integration is outside Phase 13. Documentation checks are distinct from metadata verification and rights approval.

The six city catalog entries contain no approved or ingested dataset. See `PHASE_13_IMPLEMENTATION_REPORT.md` for evidence and remaining gates. This does not establish surveyed geography or authorize Phase 14.
