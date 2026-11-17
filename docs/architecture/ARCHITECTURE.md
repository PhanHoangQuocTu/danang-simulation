# Kiến trúc migration

Giữ nguyên Next App Router, `/api/health`, locale proxy, API infrastructure, providers, Storybook, Docker và CI. Không có backend/database mới. Demo Posts và ProxyExampleCard đã được loại bỏ; Health vẫn hoạt động.

Dependency direction: website module -> engine + world-core + world-assets + worlds/danang. Engine không import `worlds/` hay React. World-core giữ schemas và manifests, không import Three hoặc Next. World-assets khai báo prefab dùng lại; city content giữ placements/provenance. UI client khởi tạo renderer sau dynamic import; Server Components giữ metadata/content. Runtime simulation state mutable; React nhận snapshot giới hạn tần số.

Trang chủ `src/app/[locale]/page.tsx` giữ `generateMetadata` và `buildMetadata`, render `src/modules/WorldExplorer/index.tsx` mà không dùng MainLayout. Module server giữ semantic copy và JSON-LD; `components/ClientBoundary.tsx` dùng dynamic import với `ssr: false`. `components/WorldExplorerClient.tsx` render canvas và HUD. `hooks/useWorldExplorer.ts` quản lý UI, weather polling và mount/unmount; `runtime/world.ts` nối engine với `src/worlds/danang/scene.ts` và `environment/simulation.ts`.

`/api/weather` dùng fixed Open-Meteo upstream, không nhận query parameters, timeout 10 giây, body limit 256 KiB và strict validation trước historical normalizer. Cache chỉ chứa observations hợp lệ trong 900 giây; browser giữ observation cũ dưới trạng thái stale nếu refresh lỗi. Xem `docs/API_INTEGRATIONS.md`.

Runtime retry tạo một generation mới, dispose instance cũ trước instance mới và áp dụng lại map, weather, dialog state. Reset chỉ đặt lại gameplay/camera; giữ pointer-lock và quality telemetry đồng bộ với browser và renderer.

Rollback các sửa đổi của batch này bằng diff theo file, không đụng user changes hay archive. Không có persisted-data migration. Browser instances độc lập giữa các deployments. Geographic streaming và Product Phase 11 chưa bắt đầu; không gọi nền tảng này là thành phố đã kiểm chứng địa lý.
