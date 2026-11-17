# Nguồn geographic — 2026-11-12

| Nguồn | Quan sát thực tế | Quyết định |
|---|---|---|
| https://gisportal.danang.gov.vn/sxd/ | Web fetch timeout | BLOCKED dataset/license/CRS |
| https://dosm.vnsdi.gov.vn/ | Không có metadata đọc được | BLOCKED download và quyền dùng |
| https://www.openstreetmap.org/copyright | Đọc được ODbL/attribution | candidate class D; chưa ingest |
| https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM | Đọc được DSM GLO-30/GLO-90 | broad terrain, không survey |
| https://developers.google.com/maps/documentation/tile/3d-tiles | Đọc được hướng dẫn billing/key/attribution | chưa xác nhận coverage Đà Nẵng; không tích hợp |

Copernicus DSM chứa bề mặt vegetation/buildings; cần xem metadata vertical datum/capture cho từng tile. Không suy ra street elevation từ DSM. OSM cần attribution và đánh giá ODbL share-alike. Không trích mesh/collision từ Google tiles.

Chưa có authoritative boundary snapshot, control points Đà Nẵng hoặc geographic license được chấp thuận. Không gán tọa độ prototype thành survey origin. Chỉ dùng source historical cho weather/astronomy, confidence unknown. Không mở rộng coverage theo tên district cũ hoặc boundary suy đoán. Cần dataset hiện hành và chủ dự án duyệt trước mở rộng vùng chi tiết.

## Phase 13 documentation check — 2026-11-18, Asia/Bangkok

Reproduction: `node --use-system-ca docs/audit/phase-13/check-metadata.mjs`. The script reads bounded documentation HTML only. Actual HTTP results and excerpts are in `docs/audit/phase-13/evidence/metadata.json`. HTTP 200 establishes document access, not dataset approval.

| Source | Fresh observation | Decision |
|---|---|---|
| OSM copyright | Fetch failed | Candidate; no current copyright-page verification |
| OSMF Attribution Guidelines | HTTP 200; explicitly states ODbL, attribution and linked copyright information | ODbL reference retained; no use-specific rights approval |
| OSMF raster/vector tile policies | Both HTTP 200; attribution/service-use restrictions | No tiles requested, prefetched or cached |
| Overpass API documentation | Fetch failed | Public endpoint policy unverified; no real query attempted |
| Geofabrik Vietnam | HTTP 200; page identifies OSM contributors and ODbL 1.0 | Discovery only; no PBF download |
| Copernicus DEM product | HTTP 200; DSM includes buildings/vegetation; products have distinct access conditions | Candidate DSM, not bare-earth terrain; no dataset-specific CRS/datum asserted |
| Copernicus 2026-08-25 access notice | HTTP 200; GLO-30 View Service restricted to authorized user categories with CCM registration | No universal open-view-service assumption |
| Da Nang GIS | 8-second timeout | Blocked; license, dataset and CRS unknown |
| Vietnam national spatial portal | HTTP 200; no usable dataset/license excerpts | Candidate; permission unknown |
| Sentinel-2 and Wikimedia Commons photo discovery | Individual products/images not checked | Candidate metadata only; no imagery/photo acquired |

Executable city metadata is owned by `src/worlds/danang/data-sources.ts`. This document records research evidence, not a second executable catalog. Candidate CRS/extent/resolution/datum/capture dates remain unknown unless specifically supported; OSM vector interchange is EPSG:4326, with no real height implied. A per-image Commons license and privacy review is required before downloading reference photos. No government boundary, OSM ID, control point or DEM tile was invented.

REAL_DATA_INGESTION: BLOCKED pending readable current provider policy and dataset-specific approval. An explicitly invented TEST-ONLY fixture exercises the offline pipeline. It is not a substitute for a licensed real dataset or Phase 13 full acceptance.
