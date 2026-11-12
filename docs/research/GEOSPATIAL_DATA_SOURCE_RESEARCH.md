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
