# API integrations

## Luồng gọi và cấu hình

Browser dùng `getApiRequestClient()` (hoặc `requestInternal` cho endpoint nội bộ) gọi `/api/<domain>`. Route Handler validate input, gọi backend bằng `request`, validate/normalize output và trả lỗi chuẩn. Server Components gọi backend trực tiếp bằng `request` hoặc hàm domain dùng `getApiRequestClient()`, không gọi vòng qua origin của website.

`NEXT_PUBLIC_API_URL` là HTTP(S) origin tùy chọn. Mặc định rỗng; direct backend client từ chối với `BACKEND_NOT_CONFIGURED` trước network. Rewrite `/proxy/:path*` chỉ tồn tại khi cấu hình backend. Không có third-party demo fallback. Không thêm secret vào biến `NEXT_PUBLIC_*`.

## Pattern domain tái sử dụng

| File | Trách nhiệm |
| --- | --- |
| `keys.ts` | Endpoint constants và query keys theo domain |
| `requests.ts` | Hàm request typed; chọn direct/BFF client theo ngữ cảnh |
| `queries.ts` | TanStack Query, cache keys và options |
| `mutations.ts` | Mutation hooks và invalidation khi domain có write |
| `type.ts` | Request/response/domain types |
| `index.ts` | Public exports của domain |
| `src/app/api/<domain>/route.ts` | Validate boundary, gọi fixed backend path, normalize output/error |

Chỉ tạo mutations khi có hành vi write thật. Health là ví dụ đang hoạt động cho queries và endpoint nội bộ; không tạo domain giả để thay demo đã xóa.

Giữ `attachInterceptors`, `normalizeApiError`, `request`, `requestInternal`, `getApiRequestClient`, shared `IApiError` và `src/utils/api-error.ts`. Token refresh opt-in qua `setRefreshTokenHandler`; không có auth provider mới. Lỗi caller dùng `status`, `message`, `code`, `details`; Route Handler không trả secrets hoặc thông tin upstream nội bộ.

## Weather

`GET /api/weather` chỉ phục vụ vị trí Đà Nẵng cố định và từ chối query parameters. Provider dùng `buildDaNangOpenMeteoUrl`, không theo redirect, timeout 10 giây và body tối đa 256 KiB kể cả thiếu Content-Length. Zod validate các quan trắc bắt buộc trước historical normalizer. Missing/non-finite/out-of-range values không trở thành số mặc định giả.

`unstable_cache` cache kết quả đã normalize trong 900 giây. Timestamp là lúc fetch/observation gốc, không stamp lại khi đọc cache. HTTP response `no-store` tránh thêm cache phía browser. Lỗi chuẩn HTTP 502, không lộ upstream details. Browser retry tối đa ba lần, backoff 1/2 giây, abort request cũ và giữ stale observation khi refresh lỗi.

## Health và locale proxy

`/api/health` vẫn là liveness nhẹ, HTTP 200 và `Cache-Control: no-store`, không phụ thuộc weather/backend. Dockerfile và Compose giữ healthcheck này. `/health` và `/vi/health` giữ HealthStatusCard và StatusBadge. `src/proxy.ts` là locale negotiation của Next.js 16, không phải BFF; giữ auth guard template nguyên vẹn.
