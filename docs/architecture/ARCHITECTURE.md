# Kiến trúc migration

Giữ nguyên Next App Router, `/api/health`, locale proxy, API examples, providers, Storybook, Docker, CI. Không backend/database mới.

Dependency direction: website module -> engine + world-core + world-assets + worlds/danang. Engine không import `worlds/` hay React. World-core giữ schemas và manifests, không import Three hoặc Next. World-assets khai báo prefab dùng lại; city content giữ placements/provenance. UI client khởi tạo renderer sau dynamic import; Server Components giữ metadata/content. Runtime simulation state mutable; React nhận snapshot giới hạn tần số.

Forward: bổ sung modules độc lập, test trước nối route. Rollback: bỏ import consumer mới; history nguyên vẹn. Không xóa Health hoặc đổi proxy. Source hiện tại chưa có explore runtime; kiến trúc là đích migration, không tuyên bố đã hoàn tất.

API weather dự kiến fixed upstream Open-Meteo, không nhận URL; timeout 10s, body limit, schema validation, cache explicit 15 phút; client giữ stale sau lỗi. Không tạo route giả khi chưa nối integration. Heavy tiles dùng provider/CDN được cấp phép.
