# Phase 13 — Data Source Registry Implementation Report

Ngày: **2026-11-18, Asia/Bangkok**. Quyết định: **PARTIAL**.

Registry, catalog, ingestion validation, Node transport và consumer F3 đã được triển khai. Không ingest dataset địa lý thật. Quyền truy cập Overpass hiện chưa xác minh được; mọi nguồn production đều bị từ chối ingestion. Không có hình học địa lý thật được tải vào scene. Phase 14 **NOT STARTED**.

## 1. Source authority và preflight

- Branch `main`; baseline HEAD `d7b29c8` (`feat(geo): add phase 12 geospatial core`). Sau triển khai vẫn là uncommitted diff; không commit/push/merge/deploy.
- Thay đổi có sẵn: prompt Phase 13 chưa tracked. File đó được đọc và giữ nguyên.
- Host Windows; Node **26.13.1**, pnpm **12.14.0**, Next **16.4.2**, React **19.3.1**. Chưa chạy trên Node 22 được yêu cầu bởi repository.
- Đã đọc AGENTS/CLAUDE, toàn bộ prompt Phase 13, báo cáo Phase 11/12, prompt Phase 12, tài liệu architecture/research/status, source owners và tests liên quan. Dùng CodeGraph trước exploration; dùng direct reads cho docs/config hoặc source không được index trả đủ. Không rebuild index.
- Không tuyên bố đã audit từng dòng toàn bộ boilerplate/historical snapshot. Phạm vi audit gồm provenance, prefab ownership, geospatial core/reference, runtime integration, HUD/diagnostics, weather và các boundary liên quan.
- RTK executable bị sandbox từ chối. Dùng native executable qua PowerShell; `pnpm.cmd` thay shim `.ps1` bị execution policy chặn. Git báo không đọc được global ignore và CRLF notices; không sửa global config.

Checklist được thực hiện: audit/baseline; contracts/tests; city catalog/research; bounded ingestion; F3 integration; review và regression; sáu gates; Chrome; report. Không mở vòng phê duyệt thiết kế vì chủ repo yêu cầu triển khai ngay.

### Baseline thực tế

| Check | Kết quả |
|---|---|
| Lint / format | Exit 0 |
| Tests | **33 files / 151 tests PASS** |
| Types | Sandbox bị lỗi SWC native cache; retry cấp quyền exit 0 |
| Build | Ban đầu SWC bị chặn; tiếp theo standalone copy lỗi ENOENT/EEXIST; một lượt baseline build thành công |
| Storybook | Sandbox SWC chặn; retry build thành công nhưng warnings còn tồn tại |
| Browser baseline | Chrome/CDP sandbox timeout `Page.enable`; retry cấp quyền chạy 4 scenario PASS, không console event |

Raw evidence: [evidence directory](docs/audit/phase-13/evidence/), đặc biệt `baseline-*.txt` và [baseline-browser.json](docs/audit/phase-13/evidence/baseline-browser.json). Browser baseline thành công được lấy trước build chứa UI Phase 13. Lỗi CDP đầu tiên được quan sát trong tool output; retry ghi đè tên baseline JSON, nên không có artifact JSON riêng cho lần timeout đầu.

## 2. Prerequisite truth

Phase 11 vẫn **BLOCKED – NOT READY**. Phase 12 vẫn **PARTIAL**. Triển khai này không đổi nhãn nghiệm thu của hai phase trước.

- Cooldown/Env regression: tái hiện lại trong [stabilization-browser.json](docs/audit/phase-13/evidence/stabilization-browser.json). Sau E thứ hai trong cooldown, Env chuyển từ compact sang hidden. **FAIL, kế thừa**.
- Pointer-capture second-click: source cũ giữ nguyên. Probe mới không lấy được pointer lock và timeout ở prerequisite; **NOT VERIFIED**, không kết luận bug đã hết. Kết quả FAIL của harness không phải bằng chứng DOMException mới.
- HUD overlap cũ: vẫn chưa có chứng nhận toàn bộ; F3 mới bounded/scrollable, không horizontal overflow ở matrix đã chạy.
- Storybook: warning Node 26 `DEP0205` vẫn xuất hiện. Các lượt trước còn `PLUGIN_TIMINGS`. Không suppress warning.
- Physical devices, Gemini Preview, full collision/occlusion matrix, long-session GPU/heap và Node 22 vẫn chưa được xác minh trong phase này.

## 3. Implementation và ownership

| Owner | Trách nhiệm thực tế |
|---|---|
| `src/world-core/schemas/manifest.ts` | Provenance gốc, giữ API và synthetic semantics |
| `src/world-core/registries/data-sources.ts` | Source schema mở rộng provenance; dataset schema; policy; immutable registry; bounded snapshot validation; SHA-256; deterministic node normalization |
| `src/worlds/danang/data-sources.ts` | Sáu nguồn Đà Nẵng, evidence attempt dates và decisions; không nằm trong engine |
| `src/integrations/geodata/overpass.server.ts` | Opt-in Node I/O với endpoint cố định; không route/job/polling |
| `WorldHud.tsx` | Consumer đọc catalog tĩnh trong native F3 disclosure; i18n en/vi |
| `src/engine/geospatial/` | Toàn bộ WGS84/ECEF/ENU/world math hiện hữu; không viết công thức mới |

Homepage vẫn đi qua App Router → WorldExplorer server module → ClientBoundary → WorldExplorerClient → hook/runtime → city scene. WorldHud đọc city registry → generic world-core. Node ingestion đi vào cùng contract/validator đó. Không có import ngược từ engine/world-core vào city, React hoặc Next. Health và weather BFF không đổi.

API có consumer/tests thực tế:

- `createDataSourceRegistry(rawSources, validatedDatasets?)`: parse atomically; duplicate source/dataset IDs lỗi; deterministic ordering; defensive copies.
- `getSource`, `listSources({category?,status?})`, `getDataset`, `getAttributionFor`, `getReadinessSummary`.
- `canIngest(sourceId,useCase)`: structured denial reasons; unknown rights/license/CRS/extent/review hoặc unsupported kind không thể được approved.
- `canRender(datasetId,useCase)`: luôn từ chối, lý do `scene-integration-not-implemented`. Phase 13 không xây consumer hình học thật.
- `validateSnapshot(record,rawBody)`: verify raw digest, strict envelope, bounds, IDs/tags, chronology, count, conflicts/dedup, canonical tag order và normalized digest.
- `fetchExploratoryNodes(registry,sourceId,bounds)`: permission check trước network; trả validated result cùng **rawBody** để lưu và revalidate sau restart. Không tự ghi filesystem/cache.

Source status `ingested` cần dataset đã validate. Constructor không tin serialized checksum metadata: chỉ nhận immutable record đã qua validator trong process hiện tại. Sau restart phải đưa raw bytes qua validator lại. TEST-ONLY snapshot không được đăng ký production. Approval là evidence do reviewer có thẩm quyền cung cấp; hệ thống không xác thực danh tính reviewer hay thay thế legal review.

## 4. Source catalog và licensing

Catalog hiện có **6 sources: 5 candidate, 1 blocked, 0 metadata-verified, 0 approved, 0 ingested**. Accuracy, coverage, capture time và vertical datum chưa biết đều để null; geographic bounds không được suy đoán từ tên thành phố.

| ID / provider | Type / URI | Dataset/version, CRS/datum | Rights/attribution | Status và evidence |
|---|---|---|---|---|
| `osm-vector` / OpenStreetMap contributors | vector-osm; [copyright](https://www.openstreetmap.org/copyright) | Chưa acquired; EPSG:4326, datum null; không có height | ODbL-1.0 reference; © OpenStreetMap contributors; chưa duyệt download/display/redistribution | Candidate; copyright fetch failed; OSMF guideline đọc được ngày 2026-11-18 |
| `copernicus-dsm` / Copernicus Data Space | dsm; [COP-DEM](https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM) | Product discovery GLO-30/GLO-90; không tile/version/CRS/datum đã xác minh | UNKNOWN đối với dataset được chọn; no attribution invented | Candidate; product doc HTTP 200; 2026 access notice xác nhận GLO-30 View Service có hạn chế |
| `sentinel-imagery` / Copernicus Data Space | satellite-imagery; [Sentinel-2](https://dataspace.copernicus.eu/explore-data/data-collections/sentinel-data/sentinel-2) | Chưa chọn scene/product; CRS/datum unknown | UNKNOWN cho scene/use case; chưa tải ảnh | Candidate; chưa kiểm chứng từng dataset |
| `commons-ground-reference` / Wikimedia Commons | ground-reference; [category](https://commons.wikimedia.org/wiki/Category:Da_Nang) | Chưa chọn ảnh/version; vị trí/capture/CRS unknown | Cần license riêng từng ảnh và privacy review | Candidate; không tải ảnh/EXIF |
| `danang-official-gis` / Da Nang GIS portal | official-gis; [portal](https://gisportal.danang.gov.vn/sxd/) | Không dataset/version/CRS/datum | UNKNOWN | Blocked; fresh 8-second timeout |
| `vietnam-official-gis` / Vietnam national spatial portal | official-gis; [portal](https://dosm.vnsdi.gov.vn/) | Không dataset/version/CRS/datum đọc được | UNKNOWN | Candidate; HTTP 200 nhưng không có metadata sử dụng được |

`documentationCheckedAt` chỉ là ngày thử đọc tài liệu, không phải `verifiedDate` hay approval. Hai discovery entries chưa kiểm tra giữ check date null. Rights review, permitted uses và redistribution vẫn đóng ở mọi entry.

Research mới đọc OSMF attribution và hai tile policies, Geofabrik Vietnam, COP-DEM và access notice. Copyright/Overpass docs fetch thất bại. Chi tiết URL, timestamps, response status và trích đoạn thực trong [metadata.json](docs/audit/phase-13/evidence/metadata.json) và [research update](docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md). Không tải Vietnam PBF, tiles, imagery, government geometry hoặc gọi Overpass thật khi policy chưa xác minh.

## 5. Lineage và GIS contract

**REAL_DATA_INGESTION: BLOCKED.** Không có snapshot địa lý thật, retrieval date thật, real feature count hoặc real data hash để công bố.

Fixture trong `snapshot.test.ts` ghi rõ **TEST-ONLY**: hai node hoàn toàn tự tạo, không phải OSM observations. Bounds test `[108.2,16.05,108.21,16.06]` là hộp test, không phải administrative extent. Record `test-only-snapshot`, version `test-v1`, source ID `osm-vector`, giả định thời gian fixture `2026-11-18T00:00:00Z`, capture null. Các values đó chỉ phục vụ test, không phải metadata thu thập thật.

- Raw fixture: 203 UTF-8 bytes; SHA-256 `a8ebe16dae8a13eaedc7e0f9983666d9af5a36d74cf9a21502af58ce2d2b8a97`.
- Normalized fixture SHA-256 `ee69fc6f0c6264a26006eac96d93753ab73870478afc5ba0b34df39af0a28d3b`.
- Feature lineage giữ sourceId, datasetId, version ở dataset, provider ID `node/1` hoặc `node/2`, deterministic feature ID, literal tags và `[longitude,latitude]`.
- Provider update time lấy từ envelope, tách khỏi retrieval/capture. Update time sau retrieval bị từ chối. Duplicate giống nhau dedup; cùng provider ID nhưng khác content lỗi; corrupt checksum lỗi.
- Pure parser giới hạn 256 KiB / 1000 nodes. Transport giới hạn chặt hơn ở 100 nodes; request output 101 để phát hiện truncation/over-limit.
- Không có implicit altitude 0, không chuyển degree thành meter. Pipeline hiện chỉ nhận EPSG:4326 2D node; DEM/DSM/polygon/way/imagery/3D adapters chưa được triển khai. Other CRS trả `requires-conversion`; category chưa hỗ trợ trả denial.
- EPSG:4979 và EPSG:4978 vẫn do Phase 12 xử lý. Reference-only anchor và `isGroundTruthVerified=false` giữ nguyên; numerical precision không phải survey accuracy.

## 6. Refactor có kiểm soát

| Before | After | Why | Risk | Test / result |
|---|---|---|---|---|
| Chỉ có manifest provenance; chưa có source governance | `sourceSchema` extends cùng `provenanceSchema` | Một owner cho provenance; không copy metadata schema sang city/provider | Schema tightening chỉ áp dụng source registry mới | Source tests + existing manifest/prefab tests PASS |
| Các provider candidates chỉ tồn tại trong research prose | City-owned executable catalog dùng chung candidate builder | Dùng một declaration owner; không hardcode metadata trong UI/transport | Catalog mới không thay scene manifest | Catalog/immutability/synthetic regression PASS |
| Chưa có dataset validation/read model | Một generic owner cho contracts, evidence, policy và snapshot parser | Registry/transport/tests cùng dùng bbox và validator; không thêm factory/service/repository layers | New validation surface | Unit/integration/failure tests PASS |
| F3 chỉ có runtime/GEO | F3 đọc cùng registry qua disclosure | Không tạo dashboard/API/polling/renderer mới | Thêm nội dung scroll | HUD tests, existing stories và Chrome matrix PASS theo phạm vi đã nêu |

**Không tìm thấy duplicate implementation cũ đủ bằng chứng để xóa/move an toàn. Không có source file bị move/delete.** Không tuyên bố giảm tổng LOC hoặc refactor toàn bộ project. Thay đổi là mở rộng owner hiện hữu và tập trung ownership của chức năng mới; không rewrite boilerplate hay math. Existing public APIs không cần compatibility exports.

Source/test diff: **11 files**, gồm 7 file mới và 4 file sửa; **1076 added / 2 removed lines**. Docs/evidence được kê riêng trong change inventory. No dependency/lockfile/config/env/history/Health/scene/controller/weather change. Rollback: bỏ các file Phase 13 và hoàn nguyên hunk F3/translations/docs; không có database/data migration cần rollback.

## 7. Security, review và failure behavior

- Endpoint cố định HTTPS `overpass-api.de/api/interpreter`; không nhận URL từ caller, không arbitrary proxy, không redirects hoặc retry. Bbox phải nằm trong reviewed extent và mỗi chiều không quá 0.002°.
- 10-second timer bao gồm headers/body; stream cap áp dụng ngay cả khi không có content-length. JSON content type, content length, UTF-8 và strict node envelope đều được kiểm tra.
- Node built-ins trong `.server.ts` ngăn browser bundle dùng transport. Không secrets, env mới, API route hoặc request khi mở F3/startup/build/test.
- Remote tags là text; không HTML rendering. Network errors không lộ body/credentials/internal exception. 403/429/5xx/timeout/malformed/oversize đều fail; không fake defaults.
- HTTPS documentation URL chỉ dùng metadata/link; không phải fetch instruction. Không tuyên bố URL syntax validation thay thế DNS validation cho arbitrary transport, vì transport này không có arbitrary URL.
- Review độc lập theo skill `requesting-code-review` tìm hai P2: category/datum mismatch và locale-dependent canonical tag sort. Cả hai tái hiện RED, sửa, regression GREEN; reviewer xác nhận resolved. Các vai trò architecture/GIS/security/QA được self-review; reviewer không tự chạy toàn bộ gates.
- Chưa có persistence/cache/rate-limit service; transport chỉ là explicit server operation, không public endpoint. Caller tương lai phải lưu raw bytes/version và quản lý tần suất theo policy được duyệt.

## 8. Tests và DS acceptance

RED được quan sát khi module/API chưa có; F3 assertion thiếu source state; `UNKNOWN` license được duyệt sai; category/datum mismatch; Unicode ordering; thiếu raw-body/update-time return; chronology sai. Các lỗi đó đều được sửa và kiểm chứng lại. Initial missing-module failures là setup/API absence, không được gọi là assertion-level regression proof.

| ID | Status | Evidence / giới hạn |
|---|---|---|
| DS-01 | PASS | Strict source schema; unexpected field rejection |
| DS-02 | PASS | Duplicate source/dataset; atomic constructor; missing validation evidence |
| DS-03 | PASS | Invalid IDs, credentials/schemes/IP/local URL cases; fixed transport không nhận URL |
| DS-04 | PASS | Inverted bounds, out-of-extent/order errors, invalid coordinates |
| DS-05 | PASS | Unknown/missing license, attribution, review và permitted usage denied |
| DS-06 | PASS | Approval evidence required; ingested cần validated dataset; serialized proof bị từ chối |
| DS-07 | PASS | Candidate/blocked/rejected không được ingest/render |
| DS-08 | PASS | Filter/list/get, unknown IDs, empty registry |
| DS-09 | PASS | Defensive copies; immutable validation result |
| DS-10 | PASS | Category enum và city categories; unsupported adapters denied |
| DS-11 | PASS | Native CRS khác datum; unknown height không được nâng thành 3D |
| DS-12 | PASS | Literal `[lon,lat]` output; strict node coordinates |
| DS-13 | PASS | Existing Phase 12 transformations/cardinal tests; không thêm 3D adapter |
| DS-14 | PASS | Normalized points giữ đúng 2 phần tử; height không được invent |
| DS-15 | PASS | Anchor unverified/reference-only không đổi |
| DS-16 | PASS | Capture/update/retrieval tách biệt, chronology rejection |
| DS-17 | PASS | Source/dataset/provider IDs, digest, raw-body retention, stable round-trip |
| DS-18 | PASS | Corrupt bytes và forged record bị từ chối |
| DS-19 | PASS, TEST-ONLY | Deterministic fixture, dedup/conflict, ordinal Unicode tag ordering |
| DS-20 | PASS | Malformed JSON/envelope, byte/feature caps, invalid coordinate |
| DS-21 | PASS, mocked I/O | Timeout trước headers và stalled body, network/403/429/500; không chứng nhận upstream thật |
| DS-22 | PASS | Fixed HTTPS endpoint, redirect error, reviewed bbox; không SSRF URL input |
| DS-23 | PASS theo phạm vi | Default tests/build/app không gọi GIS; browser request inventory không có GIS host |
| DS-24 | PASS | F3 consumer static; browser mở catalog không fetch GIS; không timer mới |
| DS-25 | PASS metadata only | ODbL/attribution retained; actual legal ingestion chưa được duyệt |
| DS-26 | PASS | Synthetic manifest preservation và existing prefab tests |
| DS-27 | PASS | Existing DIAG-01–09/GEO-01–16, dynamic 25 denominator; Chrome 25 checks PASS |
| DS-28 | PASS | Generic registry test dùng independent TEST-ONLY provider; owner không import city/React/Next/Three |

Không có DS test nào được dùng để kết luận có real OSM data hoặc full product readiness.

### Final quality commands

Tất cả sáu script đã chạy sau lần sửa source cuối. Logs [release-*.txt](docs/audit/phase-13/evidence/) ghi actual process exit code. Command environment cuối dùng `UV_THREADPOOL_SIZE=1`; không lưu setting vào project.

| Gate | Final result |
|---|---|
| `pnpm.cmd lint` | PASS; 368 files, zero diagnostics |
| `pnpm.cmd format:check` | PASS; 367 files trước khi thêm report/final evidence; final formatting rerun riêng sau artifacts |
| `pnpm.cmd type-check` | PASS; Next route types + strict TS |
| `pnpm.cmd test` | **PASS; 36 files / 176 tests** (baseline 151, thêm 25 test cases) |
| `pnpm.cmd build` | PASS; compilation, types, 14 static pages, standalone output |
| `pnpm.cmd build-storybook` | Exit 0/output built; **zero-warning gate FAIL**, Node DEP0205 |

Build trên Windows/Node 26 có nhiều lượt ENOENT/EEXIST ở standalone React directory. Đã đọc Next copyTracedFiles: clean output, parallel directory copy và junction fallback. Di chuyển output cũ trong `.next` từng có một lượt thành công nhưng không khắc phục ổn định. Lượt `UV_THREADPOOL_SIZE=1` và final build thành công. Đây là workaround có bằng chứng, **chưa chứng minh root cause**, không sửa dependency/framework hoặc disable security. Backup output vẫn ở generated `.next`, ngoài source diff.

Full `pnpm.cmd test:coverage` đã thử hai lần; cả hai timeout tại existing `world.test.ts` / `owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources` với ngưỡng 5000ms. Không tăng timeout để đổi nhãn PASS. Normal full suite PASS. Focused V8 coverage trên **hai implementation owners** PASS: **97.91% statements, 94.68% branches, 100% functions, 98.75% lines**; đây không phải coverage toàn repo. Xem [`coverage-final.txt`](docs/audit/phase-13/evidence/EVIDENCE.md#coverage-finaltxt), [`final-test-coverage.txt`](docs/audit/phase-13/evidence/EVIDENCE.md#final-test-coveragetxt), [`coverage-retry.txt`](docs/audit/phase-13/evidence/EVIDENCE.md#coverage-retrytxt).

## 9. Browser QA

Chrome headless qua installed executable/CDP, Windows, production standalone build; không cài browser dependency. Có ảnh scene WebGL thật, input thật và live weather; negative weather scenario block request thật, không thay bằng payload giả. Driver spawn processes ẩn và kill server/Chrome trong finalizer.

- [after-browser.json](docs/audit/phase-13/evidence/after-browser.json): **19 named scenarios PASS** — scene/two canvases, DIAG/GEO, east/north walk/sprint/jump/reset, source registry, map follow/zoom/guide, 12 F3 toggles, keyboard camera, đủ ba fixture, touch joystick/pinch/sprint/jump, Vietnamese F3, weather unavailable, Health API.
- Viewports thực: **1920×1080, 1366×768, 768×1024, 1024×768, 390×844, 844×390**. Các resized F3 checks không horizontal overflow; panel scrollable và trong viewport. Không chứng nhận mọi overlay/physical device.
- [release-browser.json](docs/audit/phase-13/evidence/release-browser.json): build cuối smoke **5 checks PASS**, zero console/exception events; en scene/F3/catalog, vi F3 và Health API.
- [catalog-browser.json](docs/audit/phase-13/evidence/catalog-browser.json): localized catalog mở bằng click thật ở **390×844**, count 6/5 candidate/1 blocked, no-real-geometry warning. Ảnh được xem trực tiếp: desktop source registry, mobile F3, Vietnamese catalog.
- Normal broad run không có Runtime exception/warning; ba Network.loadingFailed thuộc weather-negative interval. Không áp dụng clean-console claim đó cho mọi input path.
- [stabilization-browser.json](docs/audit/phase-13/evidence/stabilization-browser.json): cooldown/Env **FAIL** được tái hiện; pointer-lock probe **NOT VERIFIED** vì không acquire lock. Không giấu hai failing harness checks.
- Health API được gọi thực. [health-retry-browser.json](docs/audit/phase-13/evidence/health-retry-browser.json) xác nhận `/en/health` canonicalize thành `/health`, `/vi/health` có heading/title/description đúng locale, và `/` trở về English world sau khi clear cookies; zero console events. Lần đầu harness đọc `document.documentElement.lang` trong khoảng navigation document còn null; [health-browser.json](docs/audit/phase-13/evidence/health-browser.json) giữ failure đó. Chỉ sửa null guard của harness rồi rerun, không sửa ứng dụng.
- Full SEO/structured-data audit, unsupported GPU/context loss, fullscreen/ESC matrix và pointer-lock lifecycle chưa được kiểm chứng đầy đủ trong lượt này; source và automated existing gates vẫn giữ nguyên.
- Negative GIS provider path: app không cần GIS endpoint ngay từ đầu; unit tests mock failures của transport. Không stress provider thật.

### Performance measurements

Các sample Chrome 1920×1080 kéo dài khoảng 3 giây trên cùng host:

| Workload | Baseline | After |
|---|---|---|
| Idle | 18.72 FPS; mean 53.41ms; p95 70.10ms | 21.64 FPS; mean 46.20ms; p95 70.10ms |
| Expanded F3 | 20.79 FPS; mean 48.09ms; p95 70.10ms | 17.07 FPS; mean 58.60ms; p95 79.90ms |

Đây không phải controlled benchmark: thời điểm/CPU contention của quality commands khác nhau. Không suy ra regression/improvement do registry từ các sample này, không chứng nhận 60 FPS. Source không thêm renderer/draw primitive; browser vẫn có hai canvas (WebGL world và map presentation), snapshot đầu đều 152 geometries / 5 textures. Không có fresh GPU heap/leak/stress measurement.

Aggregate top-level `.next/static/chunks` trước/sau: 26 files, **2,019,866 → 2,033,972 bytes**, tăng **14,106 bytes** không nén. Đây là tổng artifact, không phải route transfer hay gzip/brotli budget. Không có dependency mới. F3 đọc module-level catalog/readiness một lần; không fetch hoặc thêm per-frame conversion/timer.

Ảnh tham khảo: [desktop catalog](docs/audit/phase-13/evidence/after-source-registry.png), [mobile F3](docs/audit/phase-13/evidence/after-390x844-debug.png), [Vietnamese catalog](docs/audit/phase-13/evidence/catalog-vi-debug.png). Browser driver là adaptation của Phase 12 audit harness; historical driver/evidence không bị sửa.

## 10. Performance và giới hạn đo

| Sample 1920×1080 | Baseline | After |
|---|---|---|
| Idle | 18.72 FPS / 53.41ms average / 70.10ms p95 | 21.64 FPS / 46.20ms / 70.10ms |
| Expanded F3 | 20.79 FPS / 48.09ms / 70.10ms | 17.07 FPS / 58.60ms / 79.90ms |
| Initial resource snapshot | 152 geometries / 5 textures | 152 geometries / 5 textures |
| Top-level static chunk aggregate | 26 files / 2,019,866 bytes | 26 files / 2,033,972 bytes |

Chunk aggregate tăng **14,106 uncompressed bytes**; không phải per-route transfer hoặc gzip bundle size. FPS là short samples trên cùng host/viewport; background gates cũng chạy trong phần after nên CPU load không controlled. Không suy ra causal performance regression/improvement hoặc đạt 60 FPS. Không đo heap trends/GPU draw overhead dài hạn. Source không thêm renderer, draw primitive, geometry, per-frame conversion hay GIS fetch. Hai DOM canvases được quan sát; renderer ownership hiện hữu vẫn một WebGL renderer cùng Mini Map scissor/2D presentation.

## 11. Acceptance G0–G9

| Gate | Decision | Evidence / blocker |
|---|---|---|
| G0 Source honesty | PASS | Candidate/blocked tách dữ liệu loaded; TEST-ONLY không vào production |
| G1 Security/legal | PARTIAL | Fail-closed và no unauthorized download PASS; real source permission chưa có |
| G2 Registry | PASS | Real F3 consumer, strict/immutable API và tests |
| G3 Ingestion | PARTIAL | Offline validated pipeline PASS; **real ingestion BLOCKED** |
| G4 Geo integrity | PASS trong slice | 2D nodes only, no fake height; existing math/anchor unchanged |
| G5 Refactor | PASS theo phạm vi | Provenance reused, one new domain owner, no speculative deletion; không có major cleanup claim |
| G6 Existing functionality | PARTIAL | Automated regression và named browser checks PASS; inherited cooldown FAIL, remaining QA incomplete |
| G7 Toolchain | PARTIAL | Six commands chạy; Storybook warning FAIL; Node 22/full coverage chưa đạt |
| G8 UX/accessibility | PARTIAL | Native disclosure, locale parity, mobile bounded scroll và browser checked; chưa full assistive-tech/overlay audit |
| G9 Evidence | PASS | Source catalog, raw logs, screenshots, tests, review findings và limitations được bàn giao |

## 12. Risks và next phase

- **P2, existing interaction owner:** cooldown toggles Env; cần stabilization task riêng với input regression proof.
- **P2, existing controls owner:** known pointer-capture issue chưa được fresh lock scenario xác nhận/sửa; không release theo zero-error policy.
- **P2, tooling owner:** Storybook DEP0205 trên Node 26; chạy supported Node 22 và giải quyết warnings, xác minh standalone build không cần workaround.
- **P2, data/legal/GIS owners:** chưa có approved rights, actual source snapshot, coverage/datum/accuracy/control points. Không dùng metadata registry như real geography.
- **P3, QA owner:** full coverage timeout, physical devices/browser diversity/full SEO và long-session profiling chưa hoàn tất. Health locale smoke đã PASS, không phải exhaustive Health feature certification.

Không xác lập P0/P1 mới trong phạm vi được kiểm chứng. Đây không phải chứng nhận mọi untested path an toàn. Phase 14 chỉ được bắt đầu sau dataset-specific permissions, reproducible real snapshot, datum/coverage validation và acceptance của owner; chưa triển khai imagery alignment ở phase này.

## 13. Reproduction và final diff

```powershell
pnpm.cmd exec vitest run src/world-core/registries/__tests__ src/integrations/geodata/__tests__
pnpm.cmd lint
pnpm.cmd format:check
pnpm.cmd type-check
pnpm.cmd test
pnpm.cmd build
pnpm.cmd build-storybook
node --use-system-ca docs/audit/phase-13/check-metadata.mjs
node docs/audit/phase-13/browser-driver.cjs.txt after
```

Browser driver yêu cầu installed Chrome path trong file và build standalone có sẵn. Trên host này, nếu standalone copy tái hiện race, có thể dùng `$env:UV_THREADPOOL_SIZE='1'` cho một build rồi khôi phục giá trị trước đó. Không disable TLS hoặc SWC cache validation. Browser/Next native cache cần sandbox approval trên host này. Rerun formatter cho JSON evidence mới sinh trước final format check.

Không cung cấp CLI tự tải dataset chưa được duyệt. Server caller tương lai phải cung cấp registry có rights/bbox đã được reviewer duyệt cho `fetchExploratoryNodes`; catalog production hiện tại sẽ từ chối trước network. Default `pnpm test`, build và homepage hoạt động offline đối với GIS.

Source/test paths thay đổi: hai `data-sources.ts` owners, `overpass.server.ts`, ba test suites mới, một shared TEST-ONLY fixture, `WorldHud.tsx`, existing `hud-semantics.test.tsx`, hai `worldExplorer.json`. Docs thay đổi: `WORLD_ARCHITECTURE.md`, research, `PHASE_STATUS.md`, report này và audit evidence/harness mới. Xem [change-inventory.txt](docs/audit/phase-13/evidence/EVIDENCE.md#change-inventorytxt) cho toàn bộ paths. Không có file moved/deleted, không thay package/lock/env, không chạm history/legacy-main/gitlab, không commit/push. Prompt untracked ban đầu của owner được bảo toàn.

Tổng inventory của task: **91 paths**, gồm **75 text files và 16 PNG screenshots**, phần lớn là raw QA logs/retries/evidence; không tính prompt có sẵn của owner. LOC source/test được kê riêng ở mục 6 để không đánh đồng generated evidence với implementation complexity.

Self-review: runnable implementation, ownership, fail-closed permissions, provenance, CRS/height truth, network caps, i18n, unchanged scene/Health, actual gates, Git scope và no Phase 14 đều đã kiểm tra. Những gate chưa đạt được ghi PARTIAL/FAIL/NOT VERIFIED ở trên; **không tuyên bố full PASS**.
