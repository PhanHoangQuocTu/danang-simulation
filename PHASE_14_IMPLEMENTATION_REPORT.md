# Phase 14 — Satellite Imagery Alignment & Repository Stabilization

Ngày: **2026-11-18, Asia/Bangkok**. Raw timestamps trong evidence dùng UTC.

## Verdict: PARTIAL

Đã triển khai raster alignment, validation, GCP/RMSE, source/legal gate, bounded PNG
preview loader và inspector tích hợp F3. Đã sửa input/cooldown, HUD overlap và hai lỗi
được reviewer độc lập phát hiện. Đã refactor CSS ownership và cập nhật bản vá security.

**Không có ảnh satellite thật, dataset-specific legal approval hoặc authoritative GCPs.**
Inspector hiện chỉ có trạng thái thiếu ảnh và footprint **TEST DATA / NOT SATELLITE IMAGERY**.
Không dựng lại địa hình, không thay synthetic world, không triển khai Phase 15.

Chưa đạt full acceptance: Storybook còn vendor timing warning; một dependency advisory high
chưa có bản vá công bố; Docker daemon không hoạt động; physical-device/high-zoom/long-session
QA chưa đầy đủ. Standalone bind IP cụ thể còn default-locale redirect limitation dưới đây.
Không tuyên bố repository bug-free hoặc tất cả 72 mục PASS.

## Worktree, môi trường và source authority

- Baseline HEAD `1296e6f`, branch `main`. Local change ban đầu duy nhất là prompt Phase 14
  chưa tracked; giữ nguyên. Implementation batch không reset/clean, commit, push, amend, deploy
  hoặc rebuild CodeGraph. Git integration sau báo cáo chỉ thực hiện theo yêu cầu rõ ràng của owner.
- Đọc AGENTS/instructions, spec, Phase 11–13 reports/status/research và architecture owners.
  Dùng CodeGraph trước indexed code exploration; đọc trực tiếp docs/config/new files.
- Phase 13 có thật: registry, strict source schema, immutable source catalog, bounded OSM
  snapshot validator và F3 consumer. Sáu city sources vẫn 5 candidate/1 blocked, zero approved/ingested.
  Không viết lại registry hoặc giả định Phase 13 vắng mặt.
- Windows; pnpm **12.14.0**. Baseline Node **26.13.1**, target `.nvmrc` là 22.
  Verification dùng Node **22.23.5** portable trong ignored `node_modules/.cache`.
  Archive chính thức nodejs.org được kiểm SHA-256:
  `4a191082e9706866830379d577d2cc8a50c776fcd9436a8d061b063ed0d9a0e3`.
  Không thay Node toàn máy hoặc thêm env variable ứng dụng.
- RTK executable bị sandbox từ chối. Dùng git.exe/rg.exe/pnpm.cmd; shim pnpm.ps1 không được
  execution policy cho phép. Git còn báo không đọc được global ignore và CRLF notices;
  không sửa global Git config để che các thông báo máy.
- SWC native-cache và pnpm store lock cần tool escalation; log lần thất bại và retry được giữ.
  Không tắt cache-security, TLS hoặc install supply-chain policy.

## Baseline và defect ledger

Baseline source chưa sửa: lint/format exit 0; **36 files/176 tests** đạt. Types/build/Storybook
bị sandbox SWC chặn; retry ngoài sandbox types/build exit 0. Storybook exit 0 nhưng Node 26
DEP0205 và Vite PLUGIN_TIMINGS. Raw logs: `docs/audit/phase-14/evidence/baseline-*.txt`.

`baseline-browser.json`: bốn checks render/performance/F3/movement đạt; WebGL thật, 25 diagnostics.
`baseline-ui-browser.json`: desktop/mobile portrait/tablet portrait đạt hit-tests;
**1024×768 và 844×390 FAIL** do guide che toolbar. Screenshots được giữ.
Cooldown được tái hiện trước sửa: compact Env từ true thành false sau E thứ hai.
Pointer-lock baseline driver không acquire lock nên không coi đó là DOMException reproduction mới;
fresh failing unit test xác nhận capture sai precondition. Historical Phase 11 vẫn giữ native exception evidence.

| Defect | Root cause và thay đổi | Regression / verification |
|---|---|---|
| DEF-01 | `engine/controls/events.ts` capture vô điều kiện khi lock; bỏ capture khi document đang lock, release mouse capture và input khi lock đổi | `input-red.txt` → `input-green.txt`; events.test.ts IMG-48; B known-pointer-lock-second-click đạt native lock/second click/escape |
| DEF-02 | Runtime trả null cho cả no-target/cooldown; hook null đổi Env. Trả discriminated executed/rejected/no-target; chỉ no-target giữ fallback | retry-lifecycle.test.tsx IMG-49, world.test.ts actual executed→cooldown; B known-interaction-cooldown đạt; Shift+E giữ command riêng |
| DEF-03 | Guide/toolbar dùng fixed corner không chung budget | Chuyển touch guide vào cùng left column, scroll budget; desktop giữ lower-left. B sáu hud-hit scenarios đều đạt |
| Review-01 | Canvas giữ pixels khi revalidation thất bại, attribution đã mất | Clear trước load, khi lỗi và cleanup; close bitmap. imagery-lifecycle.test.tsx load→reject→retry đạt |
| Review-02 | Horizontal RMSE tính trong world ENU ở xa làm giảm sai số | Tangent frame tại predicted GCP, reject disagreement ngoài 1°; `review-gcp-red.txt` chứng minh >10m bị nhận nhầm dưới 3m, `review-green.txt` đạt |
| CSS diagnostic | Selector shared touch được đặt trước base declaration gây descending-specificity warning | Đổi thứ tự declarations, không suppress; release lint không warning |
| QA diagnostics | Canvas mock bị restore trước unmount; coverage test chạy nhiều follow frames dư thừa | Explicit unmount trước restore; giảm đoạn follow không có assertion riêng, giữ mọi assertions/5000ms timeout; clean focused test và full suite/coverage rerun |
| Security | Next cache disclosure và follow-redirects credentials advisory | Minimal package patches, audit 4 advisories → còn 1; xem dependencies |

Không tuyên bố mọi historical defect đã được sửa: low desktop FPS vẫn dưới target;
full collision/occlusion, storm weather, real background-tab/device behavior và long-run GPU profiling
không được chứng nhận bằng các smoke scenarios này.

## Pipeline imagery thực tế

1. `engine/imagery/alignment.ts`: strict raster schema, finite/condition guards, forward/inverse affine,
   corner/center normalization, ordered edge footprint, CRS adapter, pixel/world inverse và no-data.
2. Chỉ EPSG:4326 lon/lat 2D, orthorectified/preprocessed grid; rotation/shear East-right/North-up.
   Unsupported CRS/datum/orientation/dateline/polar/large extent fail closed.
3. Chỉ dùng Phase 12 WGS84/ECEF/ENU/world functions; không magic degree-to-meter scale,
   không đổi anchor/height/physics. Height ellipsoid caller cung cấp rõ ràng.
4. GCP có source/asset/version, role, provenance/date/uncertainty/authority; duplicate, clustered,
   collinear và out-of-bounds bị từ chối. Calibration và holdout có statistics riêng:
   n/mean/median/RMSE/max/nearest-rank p95, từng horizontal/pixel residual.
5. `world-core/registries/imagery.ts` đọc source hiện hữu, dùng chung governance; yêu cầu quyền
   display và redistribute, asset-specific legal review, input artifact, provider origin, chronology,
   footprint/source match, processing history và content-addressed PNG/SHA-256.
   Phase 13 vector ingestion vẫn giữ adapter eligibility; generic geometry canRender vẫn đóng.
6. `imagery-preview.ts`: exact local path, no redirect/credentials/cache, timeout 8s, bounded stream,
   PNG header/dimensions/hash trước decode, dimensions sau decode, revalidation sau request.
   Tối đa 4096 mỗi chiều, 4,194,304 pixels và 8 MiB encoded; PNG alpha do preprocessing giữ mask.
7. F3 `ImageryInspector` có attribution, capture/CRS/GSD/identity/quality/thresholds/residuals khi có
   approved asset; toggle/retry/cancel/close ImageBitmap. Preview 2D độc lập, không WebGL renderer mới.
   Planar preview từ chối corner warp > nửa GSD; cần preprocess vùng nhỏ hơn.

Mode metadata registered không đồng nghĩa checkpoint-validated. Không có independent authoritative
controls thì real-world accuracy **NOT VERIFIED**, dù số học round-trip nhỏ.
Authority/legal review là evidence do reviewer có thẩm quyền cung cấp; phần mềm không xác minh
danh tính người khảo sát hoặc thay legal review.

Current no-data path đã chạy trong app và Storybook. Loader positive path được test bằng invented
metadata/PNG-like header và mocked browser decoder; **không phải real-image visual validation**.
Không đưa test source approvals vào city catalog hoặc public imagery assets.

Chi tiết API/invariants: [IMAGERY_ALIGNMENT.md](docs/architecture/IMAGERY_ALIGNMENT.md).

## Geographic truth và nguồn pháp lý

Không có exact real dataset/asset ID để công bố vì không acquire ảnh thật. Sáu discovery entries
Phase 13 vẫn giữ unknown rights/dates/accuracy khi chưa có evidence. Không scrape Google tiles,
không OAuth/payment bypass, không mới API key/env/backend/proxy.

Fresh documentation check: GDAL raster model/GeoTIFF, Copernicus terms/Sentinel-2 và OGC STAC HTTP 200;
USGS citation HTTP 403. URL/time/excerpts: `evidence/references.json` và script `check-references.mjs`.
HTTP 200 không tạo dataset permission. Projected CRS library không được cài khi chưa có asset cần nó.

## Refactor và file inventory

| Before | After / ownership | Lý do |
|---|---|---|
| globals.css chứa semantic values + theme + base | globals.css import tokens.css; base/entry giữ nguyên | Một owner cho app light/dark tokens; không đổi Health values |
| WorldExplorer/styles/world.css (1275 lines) | src/styles/world-explorer.css + world-tokens.css | Tách scoped palette/scale/motion khỏi HUD layout; hai consumer cũ migrate cùng lúc, không twin copy |
| Source governance lẫn vector format restrictions | Shared dataUseDenials + vector ingestion restrictions riêng + imagery adapter | Reuse rights/metadata validation, giữ OSM behavior, không clone registry |
| Null interaction result mơ hồ | Discriminated runtime result và hook routing | Đúng owner cho cooldown acknowledgement |
| Test runtime follow interval lặp 5.35s | Interval đủ để establish cùng trạng thái map | Giữ assertions/timeout; full coverage có thể chạy, không mock bỏ runtime |

Generic safety config thuộc `engine/imagery/const.ts`; thresholds thuộc asset record, city data
giữ `worlds/danang`. Không tạo giant config.ts, utility dump, extra service/interface hoặc config barrel.
Không có duplicate domain config cần gom trong các owner tác động. Không xóa boilerplate/history/assets.

Source quan trọng: engine/imagery/{alignment,const}.ts; world-core/registries/{data-sources,imagery}.ts;
WorldExplorer/{imagery-diagnostics,imagery-preview}.ts; ImageryInspector và story;
input/runtime/hook, HUD integration, styles, en/vi messages và regression tests tương ứng.
README/AGENTS/PHASE_STATUS/architecture được sửa stale status, không đổi historical reports.
Full diff/new-file inventory: `docs/audit/phase-14/evidence/file-inventory.txt`.
CSS/config mapping: [STYLE_ARCHITECTURE](docs/architecture/STYLE_ARCHITECTURE.md),
[CONFIG_OWNERSHIP](docs/architecture/CONFIG_OWNERSHIP.md).

## Dependencies, compatibility và security

| Package | Before → after | Rationale |
|---|---|---|
| next | 16.4.2 → **16.4.5**, direct exact pin | Hai moderate cache/root-param disclosure advisories, patched >=16.4.5 |
| follow-redirects | 1.16.1 → **1.16.3**, existing Axios transitive range | High credentials-forwarding advisory; không thêm direct dependency |
| @next/env + platform SWC | Matching 16.4.5 transitives | Đi cùng Next patch; không app capability mới |

Không thêm projection/raster/UI/testing/runtime dependency. Package/lockfile thay đổi cùng nhau;
`pnpm install --lockfile-only --frozen-lockfile --ignore-scripts` exit 0 sau store-lock escalation.
Không thêm build permission hoặc chạy arbitrary install script.

`pnpm audit --prod --json`: ban đầu 4 advisories (2 high/2 moderate), sau patch còn **1 high**:
`picomatch@4.0.7`, GHSA-fc5q-39xc-vjpf, đường `next-intl > @parcel/watcher > picomatch`.
Registry báo `patched_versions: null`, `patched_versions_unpublished: true`; latest kiểm được là 4.0.7.
Không downgrade/override/patch vendor để giả audit sạch. App không thêm untrusted glob input;
điều này không xóa advisory. Cần vendor patched release rồi audit/build/test lại.

Install vẫn báo deprecated `tsconfck@3.1.6`; `pnpm peers check` exit 1 vì peer TypeScript ^5
trong khi project dùng 7.0.2. Đây là chuỗi Storybook hiện hữu; JS docgen configuration giữ nguyên,
không giả nhận compatibility bằng override. Logs: security-update, dependency-audit-after,
peer-dependencies và dependencies-diff trong evidence.

Không đổi broad remotePatterns của Next vì Phase 14 không sử dụng next/image remote loader;
imagery pathway chỉ nhận local content-addressed PNG. Không tuyên bố đã security-audit mọi vendor API.

## Test commands và gates

Các lệnh pnpm dùng `.cmd` trên host; PATH trỏ Node 22.23.5.

| Command | Kết quả | Evidence |
|---|---|---|
| pnpm lint | Exit 0, zero diagnostics ở final source/docs | final-document-lint.txt |
| pnpm format:check | Exit 0 sau format generated JSON, không suppress | final-document-format.txt |
| pnpm type-check | Exit 0; Next route typegen + TS strict | final-type-check.txt |
| pnpm test | **41 files / 236 tests**, thêm 60 test cases so với baseline; final không canvas diagnostic | clean-test.txt |
| pnpm test:coverage --maxWorkers=2 | Full suite exit 0 sau giảm test frames dư; không tăng timeout | clean-coverage.txt; lần fail trước ở final-coverage.txt |
| pnpm build | Exit 0, Next 16.4.5/14 static pages/standalone | release-build.txt |
| pnpm build-storybook | Exit 0, **zero-warning gate FAIL**: PLUGIN_TIMINGS | release-build-storybook.txt |
| pnpm audit --prod --json | Exit 1; còn 1 unpublished high advisory | dependency-audit-after.json.txt |
| pnpm peers check | Exit 1; tsconfck TypeScript ^5 mismatch | peer-dependencies.txt |
| docker version | Exit 1; client 28.3.2, không có docker_engine pipe/daemon | docker.txt |

Next standalone Windows copy từng lỗi ENOTDIR ở React target; không sửa vendor hoặc disable standalone.
Lượt build Node 22 với `UV_THREADPOOL_SIZE=1` thành công; đây là process-only workaround cho
concurrent filesystem copy, **không chứng minh root cause đã được vá** hoặc mọi Windows host sẽ sạch.
Node 22 loại được DEP0205 của Node 26; PLUGIN_TIMINGS vẫn chỉ ra Storybook react-docgen/plugin callbacks.
Không tắt logging, không đổi warning limits/filter, không nâng hàng loạt package để che timing warning.

Matrix đầy đủ 72 IDs, từng phương pháp/kết quả/giới hạn:
[TEST_MATRIX.md](docs/audit/phase-14/TEST_MATRIX.md).

## Browser, responsive và lifecycle evidence

Chrome **132.0.6834.110** headless, Windows, WebGL2 Intel UHD Graphics / ANGLE D3D11.
Native CDP, không dependency browser mới, không mock weather/scene trong browser.
Driver spawn ẩn và dừng server/Chrome trong finalizer. `after-browser.json` có **32/32 checks PASS**:

- Actual scene, DIAG-01–09/GEO-01–16, east/north/sprint/jump/reset, camera orbit/zoom.
- Mini Map follow/zoom, cả ba fixtures, 12 F3 toggles, source catalog, imagery TEST footprint toggle.
- Six viewport hit-target QA: 1920×1080, 1366×768, 1024×768, 768×1024, 390×844, 844×390.
  Mỗi visible button scroll-to-nearest rồi center hit-test; không coi clipped/offscreen là reachable mặc định.
- Touch joystick/pinch/sprint/jump; English/Vietnamese; focus isolation và reduced motion.
- Health routes/API/metadata, actual weather request block/unavailable và recovery path hiện hữu.
- Native context loss/restore, GL error=0; ba SPA Health/world cycles, canvases 0→2,
  geometry/texture snapshots không tăng qua ba cycles.
- Cooldown lặp E không đổi Env; pointer lock thực lấy được, second click không DOMException và Escape release.

Normal run không có unexpected console warning/exception. Ba Network.loadingFailed là weather-block
negative test; hai console logs là native context lost/restored trong interval ghi rõ. Không suppress chúng.
Storybook browser: no-approved-imagery desktop/mobile và rejected-asset fallback đều chạy thật.
First story audit có favicon 404 vì direct iframe/static server; harness sau đó phục vụ generated
Storybook favicon.svg tại conventional favicon URL, không tắt console/network logging.

Các driver failures được giữ: stale navigation/focus prerequisites, UTF-8 expected strings và
pointer-lock acquisition lần đầu. Đã sửa harness và rerun; không tính failed driver thành app PASS.
Một baseline stabilization JSON bị ghi đè do reuse tên mode; fresh before cooldown observation còn
trong tool transcript và regression-red evidence, không tuyên bố giữ full raw JSON của lượt đó.

Extra release smoke/screenshot/profile nằm trong `release-browser.json`. Thử bind server 127.0.0.1
gây default-locale redirect loop ngay cả URL host khớp; `/vi` trả 200. `host-probe.json` phân biệt rõ:
HOSTNAME=0.0.0.0 + localhost (cấu hình QA/Docker hiện hữu) trả 200. Giữ log failed probes;
không sửa proxy/host trust hoặc claim giới hạn vendor/integration này đã hết.

Final release smoke: **7/7 checks PASS**, gồm hai viewport từng lỗi, 320px, Health desktop/mobile
và CPU profiling. Storybook rerun: **3/3 checks PASS, zero console/network events** sau favicon fix
của audit static server. Hai failed host probes không được tính vào các PASS này.

Đã xem trực tiếp ảnh scene/F3, tablet landscape, mobile/Storybook và Health khi artifacts có sẵn.
Screenshot comparison là visual smoke; không tuyên bố pixel-perfect parity hoặc thiết bị thật.

## Performance và bundle

Fresh baseline 1920×1080: **16.78 FPS**, mean **59.58 ms**, p95 **80.10 ms**.
After 1920×1080: **20.89 FPS**, mean **47.87 ms**, p95 **70.00 ms**;
expanded F3 **19.28 FPS**, mean **51.86 ms**, p95 **70.10 ms**.
Imagery footprint sample ở 844×390: **81.89 FPS**, mean **12.21 ms**, p95 **20 ms**.

**NOT COMPARABLE cho causal improvement/regression:** Node/Next đã đổi, load/time/quality state
không controlled; mobile sample khác viewport. Không tính phần trăm cải thiện và không chứng nhận
60 FPS desktop/30 FPS physical mobile. Extra CPU profile ghi workload đang chạy QA gates nếu trùng;
không dùng nó làm benchmark vật lý hoặc lý do tối ưu suy đoán.

Initial geometry/textures giữ **152/5** trước/sau; preview fixture không thêm canvas/WebGL resource.
Ba SPA cycles là smoke leak check, không thay GPU heap profiling dài hạn. Full-frame GPU time,
driver version, physical device memory và long-session leak/stress chưa đo đầy đủ.
Aggregate bundle artifact hiện tại có trong evidence summary; không có fresh pre-edit chunk byte
aggregate nên không công bố bundle delta hoặc dùng Phase 13 bytes làm controlled before sample.
Final JS chunks: **23 files / 1,821,168 bytes uncompressed**; không phải compressed route transfer.
`release-cpu.cpuprofile` có idle/program và Three triangle-intersection samples; minified symbols
và concurrent QA load không đủ chứng minh GPU/CPU bottleneck cụ thể. Không sửa engine suy đoán.
Full coverage sau cleanup: **76.71% statements / 64.68% branches / 61.26% functions / 78.51% lines**;
không tuyên bố full code coverage. `evidence/summary.json` tổng hợp số liệu và 72 unique matrix IDs.

## Independent review và panel findings

Reviewer độc lập tìm hai P2 (stale pixels và distant-frame RMSE); đều sửa và thêm regression proof.
Rerun review xác nhận hai findings đã hết, không thấy actionable regression mới trong scope;
**49 tests/3 files** của reviewer đạt. Browser/build proof vẫn do agent chính chịu trách nhiệm.

| Vai trò | Finding / quyết định thực tế |
|---|---|
| Architect | Reuse Phase 12/13; một registry, tách format adapter khỏi governance; không thêm service |
| Next.js | Client-only inspector; scoped CSS vì stylesheet tồn tại qua SPA; default-locale IP-bind limitation còn mở |
| TypeScript | Strict schemas/discriminated interaction result; unsupported metadata fail closed |
| GIS | Sửa residual frame; half-pixel, signed axes/nonzero origin có numerical proof |
| Remote sensing | Chỉ preprocessed orthorectified 2D; không có surveyed GCP/real satellite bytes |
| Three.js | Giữ một renderer; 2D preview không nhập terrain/collision; native context restore đạt |
| UI/UX | Tái hiện và sửa guide occlusion; sáu viewport hit targets đạt; physical/high-zoom chưa đủ |
| CSS | Token values bảo toàn, owners tách đúng domain; không duplicate stylesheet |
| Config/platform | Không giant config/env mới; Node 22 portable; Windows copy workaround chưa là vendor fix |
| Reliability | Explicit rejection acknowledgement, capture preconditions, stale canvas cleanup và retry có tests |
| Performance | Desktop target chưa đạt; không suy luận cải thiện từ samples khác điều kiện |
| Security/legal | Vá ba advisories có patch; fail-closed rights/bytes; còn unpublished picomatch high và thiếu real approval |
| QA | 236 tests + 72-row matrix + real WebGL/CDP; không gán PASS cho hardware/Docker/real imagery chưa chạy |
| Build/DX | Six gates được chạy; Storybook timing warning và tsconfck peer/deprecation chưa xử lý an toàn |
| Writer/product | Status PARTIAL, provenance unknown được giữ, không thay historical verdict hoặc mở Phase 15 |

## Remaining blockers, rollback và handoff

1. Cần licensed raster cụ thể: dataset/asset/version, input artifact/checksum, native CRS/affine,
   pixel reference, orthorectification, mask, capture date hoặc unknown, quyền display/redistribution
   và reviewer evidence; authoritative independent GCPs kèm uncertainty để chứng nhận alignment.
2. Chờ picomatch patched release; xử lý Storybook vendor timing/tsconfck compatibility upstream.
3. Xác minh Docker/Linux CI, actual 200% zoom/screen reader/safe areas, physical devices,
   background/foreground policies, long-session GPU/memory và comparable performance targets.
4. Windows standalone filesystem-copy và IP-bind/default-locale behavior còn giới hạn tái hiện;
   không tuyên bố đã sửa vendor hoặc supported mọi deployment topology.

Không có persisted-data migration. Rollback source theo imagery/input/style groups trong inventory,
migrate CSS imports và file moves cùng nhau; không khôi phục toàn worktree hoặc đụng prompt local.
Giữ security package/lockfile patches hoặc chọn patched version đã kiểm chứng thay thế; không
khuyến nghị downgrade vào advisory để rollback UI.

Phase 15 chỉ là handoff tương lai, **không triển khai hoặc deploy trong phiên này**.
Owner đã yêu cầu commit và push phần Phase 14 lên `main` sau implementation batch;
yêu cầu Git integration không thay đổi verdict **PARTIAL** hoặc cấp phép triển khai Phase 15.
