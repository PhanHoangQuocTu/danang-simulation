# Phase 14 Completion — Unfinished Items from Phases 1–14

Ngày: **2026-11-19, Asia/Saigon**. Base HEAD: `d7fae0c9`
(`feat(imagery): add phase 14 alignment foundation`, 2026-11-18).
Thực hiện theo yêu cầu của owner ngày 19/11/2026: hoàn thiện các phase
trước chưa xong, rồi push thẳng lên `main`.

## Verdict: PARTIAL (vẫn PARTIAL, không tuyên bố full PASS)

Đã hoàn thiện bằng code và kiểm chứng thật các mục ở §2–§3. Các mục ở §4
**không thể** hoàn thiện bằng code trong phiên này (cần dữ liệu thật,
quyền phê duyệt, thiết bị thật, hoặc bản vá của vendor) và được ghi rõ là
BLOCKED / NOT VERIFIED, không đánh PASS. Không tuyên bố repository
bug-free, không tuyên bố 60 FPS, không tuyên bố pixel-perfect parity.

Môi trường kiểm chứng trong phiên này: Linux, Node **22.23.5** (tải từ
nodejs.org, SHA-256 `cdeb8670a0c81f51b4dc4ac61919f9b1ad917b304bf8221eb939570663d240f8`
khớp `SHASUMS256.txt`), pnpm **12.14.0**, Playwright Chromium Headless
Shell **141.0.7390.37** (SwiftShader, không có GPU thật). Chrome có sẵn
trong VM (`/opt/meta-chromium`) bị chặn khởi động bởi Hatch WebGL domain
policy nên không dùng được; đã cài Chromium riêng qua Playwright để kiểm
chứng browser thật. Mọi lệnh dưới đây đều chạy thật; exit code được ghi rõ.

## 1. Inventory các phase trước (trạng thái trước phiên này)

| Phase | Trạng thái trước phiên | Mục chưa xong chính |
| --- | --- | --- |
| 1–10 | PARTIAL (audit Phase 11) | Pixel parity chưa chứng nhận; collision/occlusion chưa đủ ma trận; rain/storm, day-sweep chưa chạy runtime thật; FPS desktop 16–25 < 60 |
| 11 | BLOCKED – NOT READY | Pointer-capture second click, cooldown đổi Env, Storybook warnings, HUD overlap |
| 12 | PARTIAL | Gemini Preview NOT VERIFIED; Storybook warnings; Node 22 rerun NOT VERIFIED |
| 13 | PARTIAL | Không ingest dataset thật; Overpass chưa xác minh; `canRender` luôn từ chối; 6 sources 5 candidate/1 blocked/0 approved |
| 14 | PARTIAL | Không ảnh vệ tinh thật/GCP chuẩn/legal approval; Storybook PLUGIN_TIMINGS FAIL; 1 advisory high picomatch; Docker daemon; physical-device/high-zoom/long-session QA; standalone bind 127.0.0.1 redirect loop |

Chi tiết: `PHASE_11_AUDIT_REPORT.md`, `PHASE_12_IMPLEMENTATION_REPORT.md`,
`PHASE_13_IMPLEMENTATION_REPORT.md`, `PHASE_14_IMPLEMENTATION_REPORT.md`,
`docs/PHASE_STATUS.md`.

## 2. Baseline trước khi sửa (Node 22.23.5, pnpm 12.14.0, HEAD d7fae0c9)

| Gate | Kết quả | Evidence |
| --- | --- | --- |
| `pnpm lint` | PASS, exit 0, 403 files | `docs/audit/phase-14-completion/evidence/lint.txt` |
| `pnpm format:check` | PASS, exit 0, 402 files | `evidence/format.txt` |
| `pnpm type-check` | PASS, exit 0 | `evidence/type-check.txt` |
| `pnpm test` | PASS, exit 0, 41 files / 236 tests | `evidence/test-coverage-before-timeout-fix.txt` (235 passed + 1 failed = 236 total, trước khi sửa timeout) |
| `pnpm build` | PASS, exit 0, 14 static pages | `evidence/build.txt` |
| `pnpm build-storybook` | exit 0 nhưng **FAIL zero-warning gate**: Vite PLUGIN_TIMINGS (react-docgen transform 38%, 6.2s, 4809 calls) | `evidence/build-storybook-before.txt` |
| `pnpm test:coverage --maxWorkers=2` | **FAIL, exit 1**: 1 test timeout (xem §3.4) | `evidence/test-coverage-before-timeout-fix.txt` |
| `pnpm audit --prod` | PASS, exit 0, 0 vulnerabilities | `evidence/audit-prod.txt` |
| `pnpm audit` (full) | exit 1: 2 moderate, dev-only (glob, minimatch) | `evidence/audit-all.json` |
| `pnpm peers check` | exit 1: tsconfck@3.1.6 muốn TypeScript ^5, repo dùng 7.0.2 | §4.5 |
| Standalone bind 127.0.0.1 | **FAIL**: `/` và `/health` 307 loop về chính nó (5 redirects vẫn 307); `/vi` 200 | `evidence/redirect-probe.txt` |
| Standalone bind localhost / 0.0.0.0 | PASS: `/` 200, `/health` 200, `/en` một 307 đúng về `/` | `evidence/redirect-probe.txt` |
| Browser HUD hit-test (trước sửa) | **FAIL**: 1024×768 17/21 pass, 4 covered; 844×390 9/18 pass, 9 covered; 390×844 14/21 pass, 7 covered; 1920×1080 21/21 | `evidence/hud-probe-before.json` |

Việc này xác minh lại trên Node 22 các gate của Phase 11/12/13: lint,
type-check, test và build trên Node 22 — trước đây là NOT VERIFIED —
nay là **PASS có bằng chứng**.

## 3. Đã hoàn thiện (có bằng chứng chạy thật)

### 3.1 Storybook zero-warning gate — PASS

Nguyên nhân PLUGIN_TIMINGS: plugin `storybook:react-docgen-plugin`
transform 4809 lần / 6.2s. Đổi `.storybook/main.ts`:
`typescript: { reactDocgen: 'react-docgen' }` → `reactDocgen: false`,
ghi rõ trade-off trong comment: Docs mất bảng prop tự động
(argTypes); stories không đổi. Đây là thay đổi cấu hình thật, không phải
tắt log hay nâng ngưỡng warning.

- Sau sửa: `pnpm build-storybook` exit 0, Vite built in **12.85s**,
  **0 lần xuất hiện PLUGIN_TIMINGS** (grep = 0).
- Evidence: `evidence/build-storybook.txt`.

### 3.2 Nâng cấp patch/minor an toàn — PASS

`next` 16.4.5 → **16.4.6**, `next-intl` 4.14.9 → **4.15.1**,
Storybook 10.6.2 → **10.6.7** (gồm `@storybook/*`). `src/i18n/request.ts`
dùng param `locale`, không dùng `requestLocale` đã deprecated ở 4.15 nên
tương thích. Sau nâng cấp: lint, format, type-check, test 236/236,
build đều exit 0 trước khi sửa HUD; xem §5.

### 3.3 Advisory picomatch — CLOSED (do vendor rút lại, không phải do code)

`GHSA-fc5q-39xc-vjpf` (picomatch@4.0.7, high) đã bị GitHub
**withdrawn ngày 2026-11-18T15:38:56Z** (kiểm chứng qua
`api.github.com/advisories/GHSA-fc5q-39xc-vjpf`). `picomatch` latest
vẫn là 4.0.7, không có bản vá mới. `pnpm audit --prod` nay exit 0,
**0 vulnerabilities**. Không dùng override/downgrade/patch vendor.

### 3.4 Coverage timeout — PASS (đã sửa, đã rerun)

`pnpm test:coverage --maxWorkers=2` fail 2 lần liên tiếp ở cùng 1 test
`world.test.ts` — "owns one loop, resizes camera…": timeout 5000ms,
test chạy 7078ms và 7684ms dưới coverage. Chạy riêng file đó không
coverage: test chạy **789ms** và pass. Nguyên nhân: v8 coverage làm
chậm ~10 lần test lái ~200 frame đồng bộ. Sửa: tăng timeout riêng của
test đó lên 10000ms (`it(..., 10000)`), kèm comment giải thích;
không giảm số frame, không bỏ assertion nào.

- Sau sửa: `pnpm test:coverage --maxWorkers=2` exit 0, **41 files /
  237 tests pass**, coverage 76.81% statements / 65.12% branches /
  61.26% functions / 78.62% lines (Phase 14: 76.71 / 64.68 / 61.26 / 78.51).
- Evidence: `evidence/test-coverage.txt`.

### 3.5 HUD overlap ở viewport thấp/hẹp — PASS (browser thật, trước/sau)

Phát hiện bằng Playwright Chromium Headless Shell 141, phương pháp
giống Phase 14 (scroll-to-nearest rồi hit-test tâm nút; console và
page errors được ghi lại):

**Trước sửa** (`evidence/hud-probe-before.json`, `evidence/hud-probe2-before.json`):

| Viewport | Pass | Covered | Ghi chú |
| --- | --- | --- | --- |
| 1920×1080 | 21/21 | 0 | — |
| 1024×768 | 17/21 | 4 | Guide đè lên FPS / Frame / Checks / Hide Debug |
| 844×390 | 9/18 | 9 | Guide đè toolbar Reset/Env/Debug/Specs và debug chips |
| 390×844 | 14/21 | 7 | Weather panel mở rộng đè minimap/toolbar |

Nguyên nhân thật (debug bằng `elementFromPoint` + chuỗi ancestor):
`.world-bottom-left` là `position: fixed; bottom: 16px` nên guide đè
lên cột top-left khi viewport thấp; ở 390px, panels mặc định expanded
vì `formFactor` chỉ là `mobile` khi có touch — cửa sổ desktop hẹp
không touch vẫn mở expanded nên weather 280px đè minimap 224px.
Kết luận này **mâu thuẫn với claim 6/6 hit-test PASS của Phase 14**;
claim đó không được giữ lại cho trạng thái mặc định ở các viewport này.

**Sửa:**

1. `src/styles/world-explorer.css`: thêm `@media (max-height: 1000px)`
   — xếp guide vào cùng cột trái cuộn được như touch đã làm
   (`.world-top-left` max-height `calc(100dvh - 32px)`, overflow-y auto;
   `.world-bottom-left` position static). Desktop cao >1000px giữ guide
   neo dưới như cũ.
2. `src/modules/WorldExplorer/hooks/useWorldExplorer.ts`: cửa sổ hẹp
   `< 600px` thì panels mặc định như mobile (minimap/weather compact,
   guide collapsed, secondaryInfo hidden, playerStatus compact).
3. Test hồi quy mới trong
   `src/modules/WorldExplorer/__tests__/hud-state.test.tsx`:
   "starts with compact panels on a narrow mouse-only window" —
   đặt `window.innerWidth = 390`, kiểm tra đúng 5 trạng thái panel trên.

**Sau sửa** (`evidence/hud-probe-after.json`, screenshots đã xem trực
tiếp):

| Viewport | Pass | Covered | Offscreen |
| --- | --- | --- | --- |
| 1920×1080 | 21/21 | 0 | 0 |
| 1024×768 | 21/21 | 0 | 0 |
| 844×390 | 18/18 | 0 | 0 |
| 390×844 | 16/16 | 0 | 0 |

Tại 390×844 tổng số nút giảm 21 → 16 vì panels nay compact/collapsed
như thiết kế. Ảnh sau sửa đã xem: chips FPS/Frame/Checks hiện rõ dưới
toolbar ở 1024×768; ở 390×844 weather compact, guide thu thành nút
"Controls H", không còn chồng lấn. Screenshots PNG giữ ở workspace
(không push lên repo vì GitHub snapshot push chỉ nhận file UTF-8).

**Console browser:** 0 page errors ở cả 4 viewport. Còn 3 console
error mỗi viewport, cả 3 đều là `502 /api/weather` (xem §4.1) — không
có lỗi console nào khác, không có failed request nào khác.

### 3.6 Node 22 rerun — PASS

§2 xác minh lại toàn bộ gate trên Node 22.23.5 (mục NOT VERIFIED của
Phase 11/12/13). Không còn tuyên bố "chưa chạy Node 22" cho các gate
này.

## 4. Chưa hoàn thiện — BLOCKED / NOT VERIFIED (không đánh PASS)

### 4.1 Standalone bind 127.0.0.1 redirect loop — FAIL, upstream blocker

Đã thử nâng cấp Next 16.4.6 + next-intl 4.15.1 rồi build lại và probe
lại: `/` và `/health` vẫn 307 loop về chính nó (follow 5 redirects vẫn
307), `/vi` 200. Root cause là upstream Next.js issue #94745:
middleware rewrite bị network-proxy khi bind `127.0.0.1`, vì NextURL
chuẩn hóa loopback thành `localhost` rồi rewrite lại trigger middleware.
Next 16.4.6 (latest stable 9/11/2026) không có fix cho issue này.
Không đổi `localePrefix` sang `always` (sẽ phá URL/canonical/SEO đã
công bố) và không sửa proxy/host trust để che lỗi.

- Workaround đã ghi vào README: chạy standalone với `HOSTNAME=localhost`
  hoặc `HOSTNAME=0.0.0.0` (Docker đã dùng `0.0.0.0`), không bind `127.0.0.1`.
- Docker path không bị ảnh hưởng. Cần bản vá upstream Next.js.

### 4.2 Ảnh vệ tinh thật / GCP chuẩn / legal approval / dữ liệu địa lý thật — BLOCKED

Không acquire, không ingest, không tải bất kỳ dataset thật nào trong
phiên này. Catalog 6 sources giữ nguyên 5 candidate / 1 blocked /
0 approved / 0 ingested. Imagery inspector vẫn chỉ có footprint
TEST DATA / NOT SATELLITE IMAGERY. Cần user cung cấp: dataset/asset/
version cụ thể, input artifact + checksum, native CRS/affine, quyền
display/redistribution, legal review, và GCP độc lập kèm uncertainty.

### 4.3 Overpass — NOT VERIFIED (server at capacity, không gửi query dữ liệu)

Kiểm tra chỉ đọc `GET https://overpass-api.de/api/status` ngày 19/11:
server trả lời thật nhưng báo **502 Gateway Timeout — server at
capacity, all query workers are busy**. Không gửi query dữ liệu nào,
không ingest. `osm.org` 200, Copernicus 200 tại cùng thời điểm.
Cần thử lại khi server rỗi và có phê duyệt policy trước khi query.

### 4.4 Weather live trong sandbox — NOT VERIFIED (upstream rate-limit)

`/api/weather` trả 502 `WEATHER_UNAVAILABLE` trong phiên này vì
Open-Meteo trực tiếp trả **429** qua egress proxy của sandbox. BFF xử
lý đúng thiết kế: không bịa quan trắc, UI hiện "Weather unavailable"
và giữ quan trắc cũ khi có. Đây không phải bug của app, nhưng quan trắc
live chưa được kiểm chứng lại trong phiên này; cần mạng không bị
rate-limit để kiểm chứng.

### 4.5 Dependency còn tồn — PARTIAL, không override để giả sạch

- `pnpm audit` (full): 2 moderate, dev-only, qua
  `@storybook/react-vite > @joshwooding/vite-plugin-react-docgen-typescript > glob@13.0.6`
  (GHSA-3g3m-2fjr-6pw4, patched >=14.0.2) và `minimatch@10.2.6`
  (GHSA-g3hv-75wg-m249, patched >=11.0.1). Plugin pin `glob ^13`,
  Storybook 10.6.7 vẫn dùng plugin đó; plugin 0.9.x dùng tinyglobby
  thay glob nhưng nằm ngoài range `^0.7.0` của Storybook. Không dùng
  pnpm override — chưa chứng minh tương thích, và code path này không
  được dùng (config dùng `react-docgen` thường). Cần upstream cập nhật.
- `pnpm peers check` exit 1: `tsconfck@3.1.6` muốn TypeScript ^5,
  repo dùng 7.0.2. Upstream Storybook chưa tương thích TS 7.
- `pnpm audit --prod`: 0 vulnerabilities, exit 0.

### 4.6 Hiệu năng, thiết bị thật, QA dài hạn — NOT VERIFIED

- FPS 60 target: **NOT VERIFIED**. FPS đo trong headless SwiftShader
  (12–15 FPS ở 1024×768) không so sánh được với GPU thật; không tối ưu
  engine suy đoán, không tuyên bố cải thiện.
- Physical device, high-zoom (200%), screen reader, safe-area, chính
  sách background/foreground, long-session GPU/memory profiling, Docker
  daemon: **NOT VERIFIED** trong phiên này (không có thiết bị thật,
  không có Docker daemon trong VM này).
- Full collision/occlusion matrix, storm weather runtime, day/dawn/
  noon/sunset visual sweep đầy đủ: **NOT VERIFIED** (chỉ có unit test
  cho một số phần, chưa có browser visual sweep).
- Gemini Preview: **NOT VERIFIED** (không có kết nối Gemini Preview
  trong phiên này).

## 5. Gates cuối cùng (sau mọi sửa đổi, Node 22.23.5)

| Gate | Kết quả |
| --- | --- |
| `pnpm lint` | exit 0 |
| `pnpm format:check` | exit 0 |
| `pnpm type-check` | exit 0 |
| `pnpm test` | exit 0, 41 files / **237 tests** (236 + 1 test hồi quy mới) |
| `pnpm test:coverage --maxWorkers=2` | exit 0, 41 files / 237 tests, 76.81% stmts / 65.12% branches / 61.26% funcs / 78.62% lines |
| `pnpm build` | exit 0, 14 static pages |
| `pnpm build-storybook` | exit 0, Vite 12.85s, **0 PLUGIN_TIMINGS** |
| `pnpm audit --prod` | exit 0, 0 vulnerabilities |
| `pnpm audit` (full) | exit 1, 2 moderate dev-only (§4.5) |
| `pnpm peers check` | exit 1, tsconfck TS ^5 (§4.5) |
| Browser HUD hit-test (4 viewports) | PASS 21/21, 18/18, 16/16, 21/21; 0 page errors (§3.5) |
| Standalone bind 127.0.0.1 | **FAIL** (§4.1) |
| Standalone bind localhost / 0.0.0.0 | PASS (§2) |

## 6. File thay đổi trong commit này

| File | Thay đổi |
| --- | --- |
| `.storybook/main.ts` | Tắt react-docgen (§3.1) |
| `package.json`, `pnpm-lock.yaml` | Next 16.4.6, next-intl 4.15.1, Storybook 10.6.7 (§3.2) |
| `src/modules/WorldExplorer/__tests__/world.test.ts` | Timeout 10000ms cho test lái frame dưới coverage (§3.4) |
| `src/styles/world-explorer.css` | Media query max-height 1000px xếp guide vào cột trái (§3.5) |
| `src/modules/WorldExplorer/hooks/useWorldExplorer.ts` | Panels mặc định compact khi cửa sổ < 600px (§3.5) |
| `src/modules/WorldExplorer/__tests__/hud-state.test.tsx` | Test hồi quy panels cửa sổ hẹp (§3.5) |
| `PHASE_14_COMPLETION_REPORT.md` (mới) | Báo cáo này |
| `docs/PHASE_STATUS.md` | Cập nhật trạng thái sau phiên hoàn thiện |
| `README.md` | Phiên bản dependency, ghi chú bind standalone, trỏ tới báo cáo này |
| `docs/audit/phase-14-completion/evidence/` (mới) | Log text/JSON của các gate và probe (không chứa PNG) |

Không đổi: historical reports Phase 11–14, `history/`, scene/terrain/
physics, weather BFF, source catalog (không ingest, không đổi status),
không thêm dependency mới, không thêm env/secret, không commit
`.env.local` / `node_modules` / `.next` / `storybook-static`.

## 7. Cần user cung cấp tiếp (để hoàn thiện §4)

1. Ảnh vệ tinh / dataset địa lý thật + quyền + legal review + GCP chuẩn.
2. Thử lại Overpass khi server rỗi + phê duyệt policy trước khi query.
3. Thiết bị vật lý / Docker host để chạy QA thiết bị thật và Docker.
4. Quyết định có chấp nhận trade-off mất bảng prop tự động trong
   Storybook Docs (§3.1) hay muốn giữ react-docgen và chấp nhận
   PLUGIN_TIMINGS warning.
5. Kế hoạch Phase 15 (chưa có spec — không triển khai trong phiên này).

## 8. Verification 2026-11-19 — kiểm chứng lại các blocker (§4.1, §4.4, §4.6)

Xem chi tiết: `docs/audit/verification-2026-11-19/VERIFICATION_REPORT.md`.

- **Standalone 127.0.0.1 — vẫn FAIL.** Probe lại trên build mới
  (Next 16.4.6): `/` và `/health` 307 loop, `/vi` 200;
  `localhost` và `0.0.0.0` đều 200. Upstream #94745 vẫn open, PR sửa
  #95917 vẫn open chưa merge, latest stable vẫn 16.4.6, không có
  16.4.7 hay 16.5.0 stable. Không nâng cấp gì cho bug này.
- **Weather 429 — đã sửa code và kiểm chứng live.** BFF nay phân biệt
  429: `provider.ts` đọc `Retry-After`, `route.ts` trả 429
  `WEATHER_RATE_LIMITED` + header `Retry-After`, `client.ts` không
  retry vào 429 (5 test mới; tổng 42 files / 242 tests). Kiểm chứng
  live: `/api/weather` trả 429 `retry-after: 3600` trong khi Open-Meteo
  trực tiếp cũng 429 "Daily API request limit exceeded" (quota IP dùng
  chung đã hết). Quan trắc live vẫn **NOT VERIFIED** — cần mạng có
  quota riêng hoặc chờ quota reset.
- **FPS 60 / thiết bị vật lý / Docker / GPU — vẫn NOT VERIFIED.**
  VM này không có Docker, không có GPU; `/opt/meta-chromium` bị chặn
  khởi động; headless shell 141 thì world không khởi tạo (0 canvas sau
  8s, "Preparing 3D world…" — nguyên nhân chưa xác định, không tuyên
  bố). Đã thêm `fps-probe.mjs` (từ chối báo PASS giả: không canvas thì
  báo FAIL, SwiftShader thì NOT_APPLICABLE) cùng checklist thiết bị
  vật lý và Docker để chạy trên máy thật.
- **File mâu thuẫn đã sửa:** `docs/PHASE_STATUS.md` (ngày 17/11 →
  19/11, câu stale về Storybook/advisory, nhãn Migration Milestone),
  `package.json` (tên `da-nang-3d-open-world`), `src/app/icon.svg`,
  `LICENSE`, `src/lib/__tests__/seo.test.ts`, `README.md` (phiên bản
  next-intl/Storybook), và các citation sai trong §2 của báo cáo này.
