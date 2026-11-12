# Engineering report — batch foundation, 2026-11-12

## Kết luận và phạm vi

**Chưa hoàn tất master specification.** Batch này tạo nền tảng source có tests để review; không chứng nhận foundation sản phẩm end-to-end. Không có Phase 11 mới. Không commit/push; không chạy AI coding tool khác. User sources bảo toàn theo SHA-256 trong BASELINE_REPORT.

## A. Repository audit

Giữ nguyên boilerplate, Health, Docker, CI, locale proxy, metadata và providers. Thêm Three.js 0.186.0 và @types/three 0.186.0; lockfile thêm 53 dòng, không nâng dependencies cũ. Chỉ sửa config checks để loại `history/` archive. `src/` vẫn strict TypeScript/Biome. Baseline ban đầu 56 tests; archive gây 255 lint errors/17 warnings, format/type/build fail. Xem BASELINE_REPORT.

## B. Kiến trúc source thực tế

Engine generic không import city data, React hoặc Next. Controller nhận terrain/collision callbacks. Weather/provider và clock/solar types tách khỏi engine. World Core dùng Zod nhưng không phụ thuộc Three. Catalog sở hữu shared geometry/material; instance chỉ remove mesh. Site hiện tại chưa import engine nên bundle 3D chưa đi vào trang chủ.

Các source mới:

```text
src/engine/character/__tests__/controller.test.ts
src/engine/character/controller.ts
src/engine/character/humanoid.ts
src/engine/controls/input.ts
src/engine/core/__tests__/runtime.test.ts
src/engine/core/const.ts
src/engine/core/resources.ts
src/engine/core/runtime.ts
src/engine/core/type.ts
src/engine/environment/dust.ts
src/engine/interactions/registry.ts
src/engine/materials/textures.ts
src/engine/renderer/type.ts
src/engine/renderer/webgl.ts
src/engine/spatial/minimap.ts
src/world-core/__tests__/prefabs.test.ts
src/world-core/registries/prefabs.ts
src/world-core/schemas/manifest.ts
src/world-assets/catalog/synthetic-rock.ts
src/worlds/danang/const.ts
src/worlds/danang/environment/solar.ts
src/worlds/danang/environment/type.ts
src/worlds/danang/zones/fixtures.ts
src/worlds/danang/zones/synthetic.ts
src/integrations/weather/mapper.ts
src/integrations/weather/service.ts
src/integrations/weather/type.ts
src/modules/WorldExplorer/__tests__/phase-regression.test.ts
src/modules/WorldExplorer/controls.ts
src/modules/WorldExplorer/diagnostics.ts
src/modules/WorldExplorer/type.ts
src/api/health/__tests__/route.test.ts
```

## C. Phase 1–10 migration

Đã extract: config/types, clock/solar, WMO/weather helpers, device/input/joystick, minimap math, interaction registry/fixtures, synthetic colliders/terrain, character rig/animation/dust/textures, controls data và diagnostics. Character controller tách khỏi animate, inject world callbacks. Xem PHASE_1_TO_10_MIGRATION_MAP.

DIAG-01–09 PASS trong Vitest/jsdom, không cần WebGL context. Regression so với source gốc: WMO codes -1..100, clock/solar 3 timestamps, joystick boundaries và minimap positions/headings. Đây là **helper parity**, không phải gameplay parity. Chưa migrate App/render loop/HUD, touch event lifecycle, dialogs hoặc mini map render pass. First-person không có trong Phase 10 source; chưa thêm.

## D. Reusable world proof

Zod schemas validate provenance, finite transforms, bounds, duplicate IDs và asset/prefab/source references. PrefabRegistry tạo zone với rollback khi factory lỗi; unload idempotent. Synthetic rock catalog chứng minh 2 zones/2 instances dùng geometry/material chung, transform/metadata độc lập; unload một zone không dispose geometry zone khác. Thêm prefab bằng registry không sửa engine.

Giới hạn: loader đồng bộ, chưa async cancellation/prefetch/backoff/cache eviction; chưa GLB loader hoặc profile resolvers. Schema có profile IDs nhưng chưa validate các profile ID bằng catalog. URI asset chưa chứng minh file tồn tại. Không gọi synchronous disposal là city streaming hoàn chỉnh.

## E. Geographic report

Chưa ingest GIS, chưa có boundary hiện hành hoặc verified Da Nang control points. Portal thành phố timeout; national portal không cho metadata đọc được trong research. Không đưa historical weather coordinate vào survey origin. Chưa triển khai WGS84/local/floating-origin utilities; kiến trúc dự kiến ở WORLD_ARCHITECTURE. Không có real-world road/building/water geometry. Fixtures synthetic, confidence S, không tuyên bố tọa độ thực. License source prototype cần owner review trước redistribution. OSM/Copernicus/Google mới research, không có imported assets.

## F. Renderer decision và đo hiệu năng

Giữ WebGL2 vì compatibility với prototype; adapter mới dùng settings gốc. WebGPU/3D Tiles/Cesium/MapLibre đã đọc docs, chưa GPU POC. Không có evidence để đổi primary renderer. ShaderMaterial sky và minimap viewport/scissor còn migration work. Benchmark plan có, **render FPS/GPU memory/loading metrics NOT RUN**. 55–60/30 FPS là targets, không kết quả.

Actual QA timings trên host Node 22.22.3: unit suite 2.68s (74 tests); xem logs build/Storybook cho timings compiler. Các số này không đo performance simulation. Chưa có target GPU/mobile profile.

## G. Next.js

Routes hiện có vẫn `/`, `/health`, locale `vi`, `/api/health`, `/api/posts`, `/api/posts/[id]`; không tạo Home/Explore/About/Places mới. Health giữ `force-dynamic`, `no-store`, không external fetch; regression test kiểm tra contract này. Không thêm API proxy generic, credentials hoặc env variables. Weather service extract vẫn direct upstream như prototype và chưa nối browser. Cần chuyển sang dedicated Route Handler/BFF trước integration. Metadata/canonical/hreflang/noindex hiện tại được giữ; branding và website SEO mới chưa làm.

## H. Tooling sử dụng thực tế

| Environment | Instructions | Skills | MCP/Plugins | Verification |
|---|---|---|---|---|
| Codex | Root AGENTS đã đọc | migration, investigate-first, webapp-testing; caveman cho chat | CodeGraph trước/sau; Context7 Three/Next; Web official docs; plugin search GIS trả rỗng | PASS trong phiên |
| Claude Code | CLAUDE import @AGENTS | catalog local có; chưa chạy trong Claude | không xác nhận runtime config | NOT RUN |
| Gemini CLI | GEMINI.md chưa tồn tại | chưa xác nhận | chưa xác nhận | NOT RUN |
| Antigravity | chưa tìm thấy workspace rules | chưa xác nhận | chưa xác nhận | NOT RUN |

Plugin-management skill đã đọc; không cài plugin. GIS plugin search không có kết quả. Không có Playwright MCP/Python package; đã dùng installed Chrome + CDP làm browser alternative, lifecycle qua with_server.py của webapp-testing. Không cài global tools. VS Code recommended extensions không phải chứng cứ extensions đã cài.

Context7 Next docs v16.4.5 gần installed 16.4.2; chỉ dùng semantics dynamic boundary/GET caching, không nâng Next. npm registry báo Three latest 0.187.0; chọn r186 matching reference docs, không tự tích hợp bản mới nhất. pnpm peer check phát hiện tsconfck^5 vs TS7 có trước migration; không suppress warnings bằng thay rules hoặc downgrade TS.

## I. Acceptance evidence

| Check | Kết quả | Evidence |
|---|---|---|
| pnpm lint | PASS | evidence/node22-lint.txt; zero warnings |
| pnpm format:check | PASS | evidence/node22-format.txt |
| pnpm type-check | PASS | evidence/node22-types.txt; next typegen + incremental false |
| pnpm test | PASS | 21 files, 74 tests; evidence/node22-tests.txt |
| pnpm build | PASS | evidence/node22-build.txt |
| pnpm build-storybook | PASS | evidence/node22-storybook.txt; zero warnings trên Node22 |
| DIAG-01–09 | PASS helper scope | phase-regression.test.ts |
| Existing page browser smoke | PASS trong observation window | Chrome/CDP; browser evidence bổ sung bên dưới |
| New engine browser gameplay | NOT RUN | chưa có consumer route |
| Geographic QA | BLOCKED data / NOT RUN transforms | chưa authoritative data, không fabricate |
| Rendering benchmark | NOT RUN | không có GPU measurements |
| New SEO / branding | NOT RUN | site vẫn boilerplate |
| Docker image execution | NOT RUN | chỉ review Dockerfile/Compose; không báo container PASS |
| Health | PASS | unit contract và HTTP 200/no-store |

Node26 Storybook từng có DEP0205 warning; rerun Node22 sạch. Không coi lần có warning là hoàn tất. Không đổi test pool để che performance hint của Vitest.

## J. Remaining risks

1. UI controls/fixture labels còn historical strings; đưa vào en/vi typed messages trước UI integration.
2. Weather sanitizer còn historical defaults; cần missing-data semantics rõ ràng trước live integration, không hiển thị estimated values như observations.
3. Full renderer loop chưa tích hợp adapter; sky/minimap/context loss/resize/cleanup cần browser regression.
4. Registry material highlight giữ behavior cũ; shared interactable materials cần per-instance isolation trước prefab integration.
5. Chưa geodesy transforms/control points, async streaming, asset validation thực tế, LOD proof hoặc real GIS provenance.
6. New renderer adapter, texture/rig/dust extraction type-check nhưng chưa visual QA. Existing smoke không chứng minh 3D hoạt động.
7. Milestones 7–13 và tài liệu chuyên đề đầy đủ còn chưa xong. Chưa cấu hình cross-tool mới hoặc thay README hoàn chỉnh.

## K. Handoff

Source này review được như **batch extraction/foundation đầu tiên**; chưa sẵn sàng tuyên bố hoàn tất master implementation. Bước tiếp: hoàn thiện engine scene/camera/input ownership, weather BFF + translated HUD, nối `/explore` client boundary, test keyboard/touch/minimap/dialogs, sau đó thực hiện các milestones còn lại theo specification. Giữ source archive làm oracle. Product Phase 11 vẫn chờ owner approval.

## Browser evidence bổ sung

`evidence/browser.json`: Chrome 157.0.8103.78, Linux headless; `/` en, `/vi` vi, `/health` en, `/vi/health` vi. Xóa cookies trước từng navigation. Không có console error/warning hoặc network error quan sát trong 3s mỗi route. Canonical localhost:3000 là APP_URL mặc định; QA server port3187 không đổi env. Health HTTP200, Cache-Control no-store. Driver CDP trong browser-driver.txt, log lifecycle browser.txt. Đây là smoke test, không interaction/accessibility/mobile/full network-idle proof.

Lệnh reproduce trong phiên: `python3 /home/phuonglt/.codex/skills/webapp-testing/scripts/with_server.py --server 'exec /home/phuonglt/.nvm/versions/node/v22.22.3/bin/node node_modules/next/dist/bin/next start --port 3187' --port 3187 -- /home/phuonglt/.nvm/versions/node/v22.22.3/bin/node /tmp/danang-browser.cjs`. Đường dẫn phụ thuộc host; driver artifact cần copy về /tmp hoặc sửa output paths trước chạy lại.

Cleanup audit: lần đầu helper qua pnpm để lại process con Node26 PID241354. Đã xác minh cwd/executable và dừng bằng SIGTERM đúng PID; không dùng pkill. Evidence cuối chạy fresh server Node22 trực tiếp bằng exec trên port3187, health uptime13s. Kiểm tra listeners 3100/3187/9227 sau cùng không còn QA server/browser.
