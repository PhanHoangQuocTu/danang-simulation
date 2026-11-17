# PHASE 13 — CODEX MASTER IMPLEMENTATION PROMPT
## DA NANG 3D OPEN WORLD — REAL-WORLD DATA SOURCES, PROVENANCE REGISTRY & CONTROLLED ARCHITECTURAL REFACTOR

**Execution mode:** IMPLEMENT + REFACTOR + TEST + VERIFY + DOCUMENT.  
**Target AI:** OpenAI Codex (CLI / IDE / coding agent working **inside the actual repository**).  
**Repository:** `PhanHoangQuocTu/danang-simulation` — use the currently checked-out local workspace as source of truth, **not** a remote snapshot or historical Gemini preview.  
**Phase:** Product Phase 13, directly following Phase 12 Geospatial Core.  
**Output:** working code, minimized professional project structure, real-world data source governance and an auditable Phase 13 implementation report.  
**Language:** source naming/code English; user-facing content properly translated `en`/`vi`; progress and report may use Vietnamese.  
**Directive:** **ĐỌC HẾT PROMPT. SAU ĐÓ TỰ TIẾN HÀNH TRIỂN KHAI. KHÔNG DỪNG Ở PHÂN TÍCH, GỢI Ý KIẾN TRÚC HAY TODO.**

> **Nhiệm vụ chính:** Xây dựng nền tảng nhận diện, đăng ký, thẩm định, chuẩn hóa, truy xuất và kiểm soát quyền sử dụng các **nguồn dữ liệu địa lý thật** cho Đà Nẵng; đồng thời **refactor có bằng chứng** các module liên quan để loại bỏ code dư thừa, thống nhất responsibility và giữ project structure sạch, gọn, dễ tái sử dụng. Phase 13 **không** dựng thành phố địa lý thật, không tự chuyển địa hình synthetic sang dữ liệu thật, không triển khai satellite alignment hoặc terrain/city mesh của Phase 14–17.

---

## 00. NON-NEGOTIABLE RULES — QUY TẮC TUYỆT ĐỐI

1. **Read before edit.** Đọc `AGENTS.md` tại repo root, `CLAUDE.md` nếu có tham chiếu, tài liệu kiến trúc, source đang chạy, `PHASE_11_AUDIT_REPORT.md`, `PHASE_12_IMPLEMENTATION_REPORT.md`, `docs/prompts/PHASE_12_GEOSPATIAL_CORE_MASTER_PROMPT.md`, tài liệu nghiên cứu GIS và tests hiện hữu. Kiểm tra chính xác tình trạng trước khi suy luận.
2. **AGENTS.md là quy tắc chính thức** cho Codex. Không viết bộ rule song song, không sửa AGENTS/CLAUDE để hợp thức hóa việc bỏ qua quality gate. Đọc tài liệu Next.js **tại `node_modules/next/dist/docs/`** theo AGENTS trước khi sửa các API Next đang dùng.
3. **Project workspace là source of truth.** Snapshot Gemini `history/` là tài liệu lịch sử; không copy `App.tsx` vào `src/`, không migrate về React 18/Vite, không đổi Next.js/React/Three.js chỉ vì bản prompt cũ mô tả vậy.
4. **Implement, not just describe.** Tạo mã nguồn thật, nối những phần cần nối với ứng dụng, viết tests, chạy được và đưa evidence. Không tạo một loạt type/interface mà chưa có consumer hoặc kiểm thử.
5. **Không giả dữ liệu địa lý:** source chưa xác minh phải ghi `candidate`/`blocked`, data không được xác thực phải hiển thị `unverified`, không tự tạo OSM ID, giấy phép, ảnh vệ tinh, đường sá, POI, địa hình hoặc survey control point để đạt checklist.
6. **Bảo vệ Phase 1–12.** Không làm mất player/controller, physics/collision, HUD, Mini Map, 3 interactable fixtures, 9 diagnostic cũ, 16 GEO diagnostics, thời tiết Open-Meteo, solar/day-night, Health, i18n, SEO, App Router, Storybook, CI và boilerplate patterns hữu ích.
7. **One renderer.** Không tạo WebGLRenderer/canvas 3D mới; Mini Map tiếp tục dùng renderer/scissor đã có. Không tạo vòng lặp API hoặc phép chuyển đổi tọa độ trên mỗi frame.
8. **No speculative deletion.** Chỉ xóa/di chuyển code sau khi chứng minh không còn reference hoặc đã migrate toàn bộ import/tests. Không tự xóa `.agents/`, `.claude/`, `.codex/`, Codegraph, cấu hình CI, shadcn components, reusable boilerplate, sample Health và `history/`.
9. **Least change, high cohesion.** Ưu tiên tái sử dụng Zod, TypeScript, Vitest, `src/world-core/schemas/manifest.ts`, `src/engine/geospatial/core.ts`, existing resource ownership, i18n và BFF. Không sinh thêm kiến trúc framework/abstraction cho tương lai không cần ở Phase 13.
10. **No surprises in Git.** Bắt đầu với `git status --short`, xác định thay đổi sẵn có của chủ repo, không reset/stash/overwrite chúng; không commit, push, merge, deploy hoặc chạm `legacy-main`/remote `gitlab` nếu chủ repo chưa yêu cầu.
11. **Dependencies minimal.** Không thêm package nếu built-in `fetch`, Web Crypto/Node crypto, Zod, `pnpm`, TS, Vitest đã đủ; không thêm database, ORM, NestJS, Mapbox/Cesium/Google SDK hoặc GIS engine nặng để giải quyết một registry nhỏ.
12. **Respect licensing and access.** Không crawl/scrape Google Maps/Earth/3D Tiles, bản đồ thương mại, ảnh vệ tinh; không tải hàng loạt tiles `tile.openstreetmap.org`; không proxy lách hạn mức/khóa/robots/ToS; không gán giấy phép giả hoặc tái phân phối dữ liệu không được phép.
13. **Fail closed for trust.** Unknown license, CRS, vertical datum, extent, missing provenance, broken checksum hoặc restricted source **không** được gắn `approvedForUse=true`. Vẫn có thể lưu metadata ứng viên để review, nhưng không đưa dữ liệu vào scene hoặc production data layer.
14. **No fabricated verification.** Chỉ ghi PASS nếu đã thực sự chạy command/browser scenario và thấy output. Nếu không có internet, quyền file, browser, Node 22 hoặc nguồn thật: triển khai phần offline có thể kiểm chứng, ghi chính xác `BLOCKED`/`NOT VERIFIED` chứ không bịa kết quả.
15. **Stop at Phase 13.** Phase 14 mới xử lý alignment imagery, Phase 15 terrain/coast, Phase 16 roads, Phase 17 landmarks. Không đi trước roadmap.

---

## 01. VIRTUAL EXPERT TEAM — ROLES (SINGLE CODEX, MULTIPLE REVIEW HATS)

Khi làm việc, tự đóng vai lần lượt các chuyên gia dưới đây. Không giả định có khả năng tạo sub-agent song song nếu môi trường Codex không hỗ trợ. Ở mỗi quality gate, ghi rõ vai trò nào đã review và phát hiện gì.

| Role | Trách nhiệm và tiêu chí thành công |
|---|---|
| **Principal Software Architect / Tech Lead** | Xác định module boundary, dependency direction, dedup strategy, trade-off, quyết định refactor nào được phép; tránh speculative abstraction |
| **Senior Next.js / React Engineer** | App Router, client/server boundaries, SSR/SEO, BFF, tránh hydration warnings, giữ trang chủ và Health ổn định |
| **Senior TypeScript / Zod Engineer** | Strongly-typed source contracts, runtime strict validation, discriminated status, schema reuse, no `any`, serialization safety |
| **GIS / Geodesy Engineer** | OSM, WGS84 EPSG:4326/4979, ECEF EPSG:4978, ENU, vertical datums, quality, source extent, no map/geospatial fabrication |
| **Open Data / Licensing Reviewer** | ODbL/attribution, provider ToS, imagery DEM/ground photos, legal status gates, source provenance, redistribution limitations |
| **Data Platform / ETL Engineer** | Bounded source extraction, raw→validated→normalized pipeline, snapshot/checksum/version, repeatability, offline fallback |
| **Three.js / Simulation Engineer** | Ensure data registry is decoupled from render loop, preserve world composition, resource ownership, minimap, collision |
| **Application Security Engineer** | HTTPS/allowlist, SSRF, rate limits, timeout, maximum bytes, injection, secrets, data poisoning, safe API errors |
| **Performance Engineer** | Dependency footprint, bundle size, CPU/memory allocation, no extra renderer/no data fetch per frame, latency baseline |
| **QA Automation / Browser Engineer** | Baseline, unit/integration/contract/regression, desktop/mobile, zero errors, actual pass/fail evidence |
| **Accessibility / UI Engineer** | Minimal factual provenance status in existing F3/diagnostics (only if useful), accessible/mobile-safe/i18n |
| **Technical Writer / Release Reviewer** | Architecture map, migration log, source catalog, test evidence, remaining blockers, scope statement |

Thứ tự ưu tiên khi xung đột: **data truth/license/security → existing runtime correctness → backward compatibility → maintainability → performance → optional UX**.

---

## 02. VERIFIED REPOSITORY CONTEXT — STARTING REFERENCE, MUST RECHECK

Ở thời điểm chuẩn bị prompt, nhánh mặc định của repo công khai thể hiện:

- Next.js 16 App Router, React 19, TypeScript strict, Three.js WebGL, Tailwind v4, next-intl, Zod 4, Vitest, Biome, pnpm 12; **không dùng NestJS**.
- `src/app/`: routes and route handlers; homepage đi qua `src/modules/WorldExplorer/`.
- `src/engine/`: runtime, renderer, controls, environment, interactions, spatial và `geospatial/`.
- `src/world-core/`: `schemas/manifest.ts` chứa provenance/asset/prefab/zone schemas; `registries/prefabs.ts` giữ prefab registry.
- `src/world-assets/`: shared procedural asset catalogs.
- `src/worlds/danang/`: scene composition, `georeference.ts`, `zones/manifest.ts`, `zones/synthetic.ts` và fixtures.
- `src/integrations/weather/`: upstream weather validation/client/cache, cùng BFF `/api/weather`; phải giữ nguyên hành vi.
- `src/messages/en/`, `src/messages/vi/`: translations và namespace validation.
- `src/modules/WorldExplorer/geospatial-diagnostics.ts` cung cấp GEO-01..16 và F3 status.
- `src/engine/geospatial/core.ts` là pure TS, `createGeoReference`, `geoToWorld`, `worldToGeo`, WGS84/ECEF/ENU; **reuse nguyên hệ tọa độ**, không viết công thức song song trong data source module.
- `src/worlds/danang/georeference.ts`: anchor `latitude=16.0544`, `longitude=108.2022`, **ellipsoidal height = 0m assumption**, `reference-only`; không phải surveyed terrain origin.
- `docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md`: nghiên cứu ban đầu, nhiều nguồn còn bị BLOCKED.
- `PHASE_11_AUDIT_REPORT.md`: Phase 11 kết luận `BLOCKED – NOT READY` tại thời điểm audit. Tồn tại vấn đề pointer capture khi click lần hai, tương tác cooldown, HUD overlap và Storybook warnings.
- `PHASE_12_IMPLEMENTATION_REPORT.md`: Phase 12 có code và GEO tests, nhưng **`PARTIAL`**, chưa chứng thực một số acceptance gates (đặc biệt Gemini Preview, physical devices, Node 22, Storybook warning); không đổi nhãn thành PASS.

**Bắt buộc dùng code đang checkout để xác nhận hoặc điều chỉnh danh sách trên.** Nếu một đường dẫn đã đổi tên, truy ra owner mới, tuyệt đối không tạo bản sao chỉ vì prompt nhắc đường dẫn cũ.

### 02.1. Truth taxonomy quan trọng

- **SIMULATED:** synthetic world geometry/fixtures; không phải dữ liệu địa lý đo đạc.
- **REFERENCE-ONLY:** phép chiếu tọa độ dựa trên anchor giả định; chính xác số học nhưng không xác nhận placement thật.
- **CANDIDATE:** tên nguồn/URL/dataset được xác định, chưa đủ bằng chứng giấy phép/CRS/phạm vi/quality để dùng.
- **VERIFIED METADATA:** metadata được đối chiếu nguồn gốc; **chưa** đồng nghĩa quyền tái sử dụng hoặc phù hợp geospatial accuracy.
- **APPROVED FOR INGESTION:** đã có bằng chứng license, permitted use, coverage, CRS, vertical datum applicability và reviewer decision rõ ràng.
- **INGESTED/VALIDATED:** snapshot thật đã được tải hợp lệ, có source ID + version + checksum + feature counts và validator pass.
- **REJECTED/BLOCKED:** không có quyền, không đạt quality/security hoặc không thể truy cập.

Không đánh đồng “nguồn công khai” = “public domain” = “được phép tải hàng loạt” = “độ chính xác phù hợp”.

---

## 03. TARGET OUTCOME — KẾT QUẢ CẦN CÓ Ở CUỐI PHASE 13

Hệ thống phải có **một Data Source Registry đáng tin cậy**, hỗ trợ tái sử dụng cho nhiều thành phố trong tương lai, với dữ liệu Đà Nẵng tách khỏi engine. Tất cả trường quan trọng được validate ở runtime, có inventory, decision status, source lineage và attribution. Các source chưa được phép chỉ nằm ở dạng `candidate`; không có đường dẫn tắt để render thành “real Đà Nẵng”.

Deliverables **bắt buộc**:

1. Inventory và **baseline audit** source hiện có, duplicate/dead code, import graph, Git status, các bug đã biết và quality gates.
2. Một **source metadata contract** tối thiểu, có status chính xác, license, nguồn, CRS, độ cao, spatial coverage, resolution, update time, quality/accuracy, required attribution, intended usage và provenance.
3. Một **registry được dùng thật** với API typed để register/list/get/filter/assert eligibility, reject duplicate/invalid, không mutable ngoài dự kiến.
4. **Da Nang source catalog** bao gồm ít nhất các nhóm: OSM vector, elevation (DEM/DSM), satellite/ortho imagery và ground/reference imagery (ứng viên nếu chưa được duyệt). Mỗi source có đúng mức độ xác minh, không gán phép cho dữ liệu chưa đọc.
5. **Ingestion readiness path:** adapter/validator/snapshot cho **một dataset nhỏ, hợp lệ** nếu network/license cho phép. Nếu không thể lấy dữ liệu thật, phải có deterministic test fixture rõ `TEST-ONLY`, pipeline tested offline, và production registry không được công bố đã ingest dữ liệu thật.
6. **Explicit source→dataset→feature lineage:** version, capture/retrieval dates, origin, processing steps, hash, checksum verification, isolated errors, basic dedup; không tạo artifact không truy vết.
7. **GeoReference compatibility:** EPSG:4326 lon/lat, EPSG:4979 3D ellipsoid, EPSG:4978 ECEF; deterministic transform qua Phase 12 khi thực sự cần. Không dùng kinh/vĩ độ làm mét hoặc ép height ở sai datum.
8. **Minimal diagnostics/read model** để reviewer kiểm tra catalog/candidate/approved/blocked với bằng chứng; không tạo dashboard mới hoặc network polling chỉ để trình diễn.
9. **Refactor có kiểm soát:** loại bỏ duplicated helpers/schema/data declarations và unnecessary indirection; đơn giản hóa cây thư mục, references, exports/imports, doc, nhưng không phá public API cũ.
10. **Tests và browser verification** tập trung chức năng mới + Phase 1–12, báo cáo metrics thực tế, giới hạn, blockers; files đã format và có thể review.

Out of scope: rendering real city, satellite stitching/tiling, DEM terrain mesh, real roads/buildings, dynamic world streaming, commercial map SDK, new authentication/database/backend service, update weather provider.

---

## 04. PRE-FLIGHT & BASELINE — DO NOT SKIP

### 04.1. Kiểm tra workspace

Thực thi hoặc điều chỉnh đúng môi trường OS:

```bash
pwd
git status --short
git branch --show-current
git log -1 --oneline
node --version
pnpm --version
cat package.json
```

- Xác nhận branch/repo, pre-existing dirty changes và ownership.
- Đọc `AGENTS.md`, `docs/architecture/*`, `docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md`, `docs/PHASE_STATUS.md`, Phase 11/12 reports và tests liên quan.
- Đọc file đầy đủ theo từng phần, không phụ thuộc `rg` snippet hay tóm tắt tự động.
- Tạo **runtime ownership map**: homepage → module WorldExplorer → runtime → scene → world-core → georeference; weather BFF; F3 diagnostics; Health.
- Inventory bằng `rg` / dependency edges: `provenanceSchema`, `manifestSchema`, `DANANG_GEO_REFERENCE`, `geoToWorld`, `worldToGeo`, `syntheticManifest`, `PrefabRegistry`, các nguồn OSM/DEM/imagery và mọi geo-utility hiện hữu.
- Kiểm tra current use của `src/api/`, `src/integrations/`, `src/world-core`, `src/worlds/danang`; tránh tạo second registry hoặc second metadata schema.

### 04.2. Baseline commands (capture exit codes, actual counts)

```bash
pnpm lint
pnpm format:check
pnpm type-check
pnpm test
pnpm build
pnpm build-storybook
```

Dùng đúng script trong repo. Windows có thể dùng `pnpm.cmd` nếu PowerShell chặn `.ps1`. Không coi stderr wrapper là exit code; đọc process exit thực. Nếu Node không đúng major hỗ trợ, báo rõ host limitation. Ghi warnings existing riêng, không nuốt warnings và không biến warning thành PASS.

### 04.3. Baseline interactive QA

- Tải `/` (English) và `/vi` (Vietnamese) trên desktop; xác nhận 3D world, HUD, weather status, Mini Map, player controls, F3, Health.
- Test target desktop `1920×1080`, `1366×768`, tablet `768×1024`, `1024×768`, mobile `390×844`, `844×390` nếu browser harness sẵn có.
- Kiểm tra **second-click pointer lock**, **interaction cooldown** và **HUD overlap** đã biết; không tự ghi đã sửa từ Phase 11.
- Nếu phát hiện critical lỗi làm mất scene: phân loại severity, nếu trong phạm vi chỉnh sửa an toàn thì repair + regression; nếu rộng hơn, ghi blocker/risk, không phá scope.
- Chụp/đo được trạng thái trước refactor để so sánh sau. Không thêm screenshot giả trong evidence.

### 04.4. Preflight artifact

Tạo mục preflight trong report hoặc `docs/audit/phase-13/BASELINE.md` **chỉ nếu cần evidence tách riêng**: actual SHA, Node/OS, test counts, paths, known blockers, source catalog hiện có, potential duplication, before metrics. Không tạo thư mục báo cáo lớn nếu chỉ cần một file.

---

## 05. PHASE 13 ARCHITECTURE — MINIMAL, REUSABLE & COHESIVE

### 05.1. Dependency direction

```text
app / BFF (optional thin access boundary)
        ↓
modules/WorldExplorer (read-only status / UI consumer, optional)
        ↓
worlds/danang (city-specific manifest + source selection)
        ↓
world-core (generic data registry, validation, eligibility, provenance)
        ↓
engine/geospatial (existing pure math API; used by geo adapters as needed)

integrations/geodata (optional server-only ingestion boundary)
        ↓
world-core contracts + vetted provider definitions

engine/core and renderer ← MUST NOT import city registries, network providers, Next/React
```

**Không ép registry phụ thuộc trực tiếp vào Three.js.** Registry mô tả dữ liệu; world composition quyết định có dùng dữ liệu hợp lệ hay không. Không import `src/worlds/danang` vào shared `world-core` hoặc `engine`; không tạo circular imports.

### 05.2. Recommended *candidate* file layout (not a forced scaffold)

```text
src/
  engine/
    geospatial/                      # KEEP existing Phase 12 conversions
      core.ts
      type.ts
  world-core/
    schemas/
      manifest.ts                     # REUSE existing provenance schema
    registries/
      prefabs.ts                      # KEEP existing prefab registry
      data-sources.ts                 # NEW only if justified: registry + operations
    data-sources/
      schema.ts                       # NEW only when extending existing schema cleanly
      type.ts                         # OPTIONAL if types cannot live near schema
  worlds/
    danang/
      georeference.ts                 # KEEP single anchor
      data-sources.ts                 # NEW one city-owned source catalog
      zones/manifest.ts              # EXISTING synthetic world remains synthetic
  integrations/
    geodata/                          # OPTIONAL; create only if REAL ingestion is implemented
      ingest.ts                       # bounded server-only adapters/validation
  modules/
    WorldExplorer/                     # tiny read-only source summary if useful
      ...
  messages/
    en/worldExplorer.json
    vi/worldExplorer.json
  ...

docs/
  architecture/WORLD_ARCHITECTURE.md  # UPDATE
  research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md # UPDATE with findings and license evidence
  audit/phase-13/                     # MINIMAL raw evidence only when genuinely produced
PHASE_13_IMPLEMENTATION_REPORT.md
```

**Rất quan trọng:** Đây là gợi ý về **ownership**, không phải checklist tạo folder/file. Nếu dữ liệu nguồn + validation nhỏ, có thể gộp schema/type/registry vào `src/world-core/registries/data-sources.ts` và dùng `provenanceSchema` có sẵn. Không tạo `factory.ts`, `manager.ts`, `service.ts`, `repository.ts`, `provider.ts`, `adapter.ts`, `index.ts` trống hoặc mỗi file vài dòng. Ưu tiên **1 owner cho 1 concern**, cohesive, ít level folder. Không tạo barrel chỉ để re-export 1 symbol. Đặt tests trong `__tests__` liền kề owner.

### 05.3. Ownership of shared code

- Generic: metadata validation, source ID normalization, status transitions, immutable read API, eligibility policy, conflict resolution.
- City-specific: Đà Nẵng geographic scope, candidate source configs, selected local snapshot provenance, trust decisions.
- Network-provider-specific: external URL/query, retries, response parsing, timeouts, headers, ToS; **server-only**, lazy/opt-in.
- Existing math: Phase 12 `src/engine/geospatial/core.ts`; không duplicate.
- Existing simulation: unchanged `src/worlds/danang/scene.ts`, `zones/synthetic.ts` unless minimal consumer integration justified.
- Tests: co-located, no identical test suite copied in multiple folders.

### 05.4. Refactor restrictions

- **Functional refactor**, not mass rename. Trình bày `before path → after path → reason → imports updated → tests` cho mỗi module moved/deleted.
- If different modules contain identical code (e.g. source validators, normalization, IDs, status labels), consolidate into the **lowest reusable layer** allowed by dependencies.
- Avoid unjustified `utils/common.ts` dumping ground. Prefer domain-named cohesive owner (`world-core/...`) over mega utility.
- Keep archived `history` files byte-for-byte unchanged.
- Avoid broad reformat; format only touched sources, commit no unrelated churn.
- Where public module API may have consumers, preserve a thin compatibility export temporarily if necessary and measured. Do not add a compatibility export blindly.

---

## 06. SOURCE CONTRACT — STRONGLY TYPED, TRUST AWARE

Build on current Zod `provenanceSchema` rather than duplicate fields under different names. Design **clear entity boundaries**:

- `SourceDefinition`: provider/source type + provider documentation/official URL + intended dataset purpose + access policy + default attribution/license reference.
- `DatasetRecord`: concrete dataset/product/version/coverage/CRS/resolution/vertical datum/checksum/acquisition timestamp/processing chain; may be absent for candidate sources.
- `SourceDecision` / eligibility: independently reviewed permission and quality decisions for specific use case (internal metadata, raw download, display, redistribute, derived geometry, etc.).
- `SourceRegistry`: immutable view and typed query APIs, not network transport.

**Do not over-model.** Combine `SourceDefinition` and dataset fields if there is only one concrete dataset and no ambiguity. The principle is preventing false inference, not maximizing interface count.

### 06.1. Required metadata fields

Minimum logical contract (group objects logically rather than all at top level):

1. `id`: stable unique lower-kebab or namespaced string; no whitespace ambiguity; immutable after registration.
2. `providerName`, `officialUrl`, `datasetUrl`/identifier if known, `datasetName`, `sourceCategory` (`vector-osm`, `dem`, `dsm`, `ortho-imagery`, `satellite-imagery`, `ground-reference`, `control-point`, or well-defined minimal alternatives).
3. `reviewStatus`: `candidate | metadata-verified | approved-for-ingestion | ingested | blocked | rejected` (or strongly typed equivalent); **status describes what was actually checked**.
4. `rights`: license identifier/text/URL, attribution text and URL, source copyright holder, intended permitted usages, whether redistribution is allowed, known restrictions, review decision + evidence URL + reviewedAt. Unknown information is explicit nullable/unknown, never empty string masquerading approval.
5. `geographic`: source horizontal CRS (e.g., EPSG:4326), optional vertical datum (nullable), bounds with coordinate order/units, precision and accuracy, coverage completeness/extent and validation source. Validate min≤max and valid latitude/longitude.
6. `temporal`: capture/acquisition date if sourced, retrieval timestamp, provider update cadence if documented, source version/snapshot date; no fabricated capture date.
7. `quality`: resolution, estimated error and provenance, measured/control-point status; avoid conflating resolution with positional accuracy.
8. `provenance`: source URL, provider, transformation history, snapshot digest SHA-256 if present, deterministic artifact ID, processing tool/version if known.
9. `capabilities`: supports download/API/view; legal/technical limits of each (not automatically enabled).
10. `readiness/notes`: human-readable blocking reasons, what must be approved, last verified date of documentation.

### 06.2. Schema validation

- Zod strict objects to reject unexpected provider payloads unless a boundary intentionally sanitizes them.
- Reject invalid IDs, duplicate sources, duplicate datasets, invalid URLs/schemes, nonfinite numeric values, inverted bbox, impossible lat/lon, negative resolution, impossible time intervals, missing required attribution for selected license.
- Reject ambiguous `lat,lng` vs `lng,lat` silently reordered; GeoJSON coordinates strictly `[longitude, latitude, optional altitude]`.
- Empty/null/unknown `verticalDatum` must not be read as WGS84/EGM96/EGM2008/MSL.
- `EPSG:4326` 2D coordinates do **not** imply 3D EPSG:4979 height; no 0m fake real altitude.
- `contentUrl` is not an instruction to fetch; define **explicit allowed host/protocol and server-only transport** if ingest is enabled.
- source IDs and paths must be normalized and traversal-safe. Disallow `../`, file URIs, local host and untrusted endpoints on remote ingestion paths.
- Optional user-provided metadata is `unknown` until parsed, never blindly trusted with `as`.
- Status transitions must enforce permissions (e.g. candidate cannot jump to ingested without approved evidence, normalization, checksum, validation); if implementation uses immutable records instead of mutable state, enforce with constructors/predicates.

### 06.3. API contract to implement (adapt exact names to project naming)

Propose a minimal typed API like:

```ts
// Public behavior — illustrative signatures, NOT a requirement to copy blindly.
createDataSourceRegistry(validatedDefinitions)
registry.getSource(id)
registry.listSources({ category?, status? })
registry.getDataset(id)
registry.getAttributionFor(datasetIds)
registry.canIngest(sourceId, useCase)
registry.canRender(datasetId, useCase)
registry.getReadinessSummary()
```

Rules:

- No mutation leaks: preserve immutable or defensive-copy behavior for callers, and never expose mutable internal Maps/arrays.
- Deterministic ordering, stable dedupe, no hidden network I/O, no browser state, no wall clock reading from pure registry constructor.
- Failed validation must be atomic: one invalid source cannot partially register previous definitions.
- `canIngest`/`canRender` must return structured denial reasons, not ambiguous boolean in place of legal proof.
- Make approval a **record of evidence**, not an automatic side effect of URL being HTTPS or metadata existing.
- Existing `provenanceSchema` may need a **backward-compatible extension**; coordinate this with `syntheticManifest`. Preserve `confidence: 'S'` meaning synthetic, never treat it as high GIS confidence.

---

## 07. REQUIRED DA NANG SOURCE CATALOG

Build one coherent catalog with **truthful** candidate definitions, provider documentation, current access/license evidence, and intended Phase 14+ purposes. At least these classes:

### 07.1. OpenStreetMap vector data

- OpenStreetMap geographic vector roads/building footprints/POIs/landuse/waterways as **possible source**.
- Official license: **ODbL** with required attribution; note share-alike obligations of derived databases, legal obligations must be evaluated for the planned redistribution strategy.
- Geofabrik Vietnam extract may be used as an approved **provider for extract discovery**, but do not download entire Vietnam PBF into repo; source/extract download terms must be checked.
- Public Overpass endpoints exist for **small exploratory queries**, not production traffic. Use only small, bounded, cached, respectful requests and publicly documented policies, never fetch each visitor session. Production strategy should use licensed/approved batch snapshot or suitable provider.
- OSM tags do not guarantee surveyed building height, lane geometry, timestamp accuracy or coastal elevation. Any missing dimension remains unknown.

### 07.2. Terrain elevation: DEM / DSM

- Copernicus DEM GLO-30/GLO-90 are candidates subject to dataset/service-specific terms and available access in 2026; **do not assume the GLO-30 View Service is universally open**.
- Distinguish **DSM** (surface including building/vegetation influence) versus bare-earth DTM. Do not use DSM as ground elevation without analysis.
- Record native resolution, voids, unit, vertical reference (from actual dataset metadata), access restrictions and quality.
- **Do not implement terrain mesh or arbitrary datum conversion in Phase 13.**

### 07.3. Satellite / orthophoto imagery

- Identify candidate imagery/ortho data; every dataset's **visual display, derivative model, caching, download, redistribution, attribution and geographic use** must be explicitly authorized.
- Commercial APIs and screenshots are not free data merely because accessible in a browser. No Google Maps/Earth scraping or 3D tile extraction.
- Store candidate metadata only if license cannot be verified. Do not bundle satellite tiles, request third-party tiles from client or render a false satellite layer.

### 07.4. Ground photos / landmarks reference

- Include official tourism/public documentation or openly licensed photo datasets as metadata candidates only where actual license and provenance are verifiable.
- Avoid EXIF/location leakage, faces/people-related privacy issues, unverifiable camera location and copyrighted third-party photographs.
- Ground photo does not directly establish surveyed 3D location or mesh accuracy.

### 07.5. Vietnamese / Da Nang government GIS

- Consider official local or national portals as **candidates** when accessible, but do not infer open license or coverage from a portal's existence.
- Specific archived research had the official portals blocked/unavailable; Codex must attempt **nonintrusive metadata verification**, label inaccessible source `blocked` or `candidate`, and document evidence.
- Do not invent current administrative boundaries. Only use an official/validated dataset of suitable date and CRS for future geographic boundaries.

### 07.6. Honest catalog behavior

Registry may contain multiple candidates where `canIngest=false`, but they must not appear as available loaded data. Even if one tiny OSM snapshot is ingested, it remains exploratory and not authoritative full-city coverage. Do **not** update `DANANG_GEO_REFERENCE.anchor.status` to surveyed/verified unless genuinely measured reliable control points exist. Do not flip `isGroundTruthVerified` to true based solely on CRS conversion working.

---

## 08. DATA INGESTION VERTICAL SLICE — REAL DATA WHEN PERMITTED, OFFLINE GUARANTEE

Phase 13 is **both implementation and integration**. Registry-only interfaces without a testable ingestion/validation path are insufficient; however legality and provenance take precedence over a demo.

### 08.1. Preferred real-source vertical slice: tiny bounded OSM metadata/vector sample

If environment network access and source license/usage rules permit, create **one reproducible small geographic snapshot**:

1. Choose a **small bounded bbox** in the vicinity of the project's reference-only Đà Nẵng anchor, clearly named `exploratory`, **not** administrative city extent. Do not infer the whole city from this box.
2. Retrieve **minimum necessary** OSM features through a documented, rate-limited, bounded data source (e.g. a single small Overpass query), honoring provider status codes, limits and service health. Prefer official provider documentation over assumptions.
3. Use `timeout`, `AbortSignal`, byte cap and feature cap; no retry flood. If denied/429, stop and document — do not rotate endpoints to evade policy.
4. Validate JSON envelope/tags, geometry coordinate order/ranges, IDs and bounds. Reject malformed/empty/unexpected payloads safely; never trust remote tags as HTML or executable instructions.
5. Normalize to small **typed, structured metadata / GeoJSON-like record** (if justified). Keep original provider identifiers and source tags; do not estimate missing building heights, roads, ground elevations or geolocation accuracy.
6. Record source URL/provider, request bbox, query and retrieval date, dataset snapshot version, feature count, numeric CRS and SHA-256 checksum of stable serialized content. Store a **small checked-in dataset only if redistribution conditions are satisfied** and artifact size is appropriate; otherwise store metadata/checksum and a reproducible opt-in fetch script.
7. Provide attribution at the point of future data use (and in source catalog/report now). Mark spatial quality unknown unless measured independently.
8. Run offline parser and registry tests from the stored fixture/snapshot; **default app startup and `pnpm test` must work without external network**.
9. Do **not** place the snapshot into runtime scene meshes or claim geographic visual integration. Existing Phase 10 synthetic scene stays visibly and explicitly synthetic.

If bounded real ingestion fails due to internet/429/ToS/permission: **do not forge it**. Implement pure ingestion interfaces/validators/transform tests against a clearly labeled synthetic **test-only fixture**. Deliver working code, catalog, diagnostics and documented `REAL_DATA_INGESTION: BLOCKED/NOT VERIFIED`, with exact reason and safe follow-up. Never label this full Phase 13 PASS.

### 08.2. Adapter design

- Only create `src/integrations/geodata` if actual ingestion logic exists; do not add 5 empty provider classes.
- Separate `fetch`/I/O from pure validation/normalization/registry construction; test pure core deterministically.
- Server-only import guard if code can include runtime secrets/network; keep provider URLs fixed/allowlisted.
- No browser direct call to public Overpass API, no key exposure, no runtime bulk fetch.
- No new route handler unless the existing website **actually consumes** a bounded read-only catalog endpoint. If created, follow `src/app/api` patterns and prevent arbitrary URL proxying; health/weather handlers remain untouched.
- HTTP errors should be normalized, bounded and non-sensitive. Never log secrets, raw API keys, personal data or huge provider payloads.

### 08.3. Expected operation/result design

- `discover`/`register` can run without network; status clearly differentiates source metadata from loaded data.
- `validateSnapshot` pure and testable; rejects missing source ID/digest/rights or inconsistent CRS.
- `ingestSnapshot` may be CLI/one-off server-only procedure; no implicit execution when rendering homepage.
- `list/get` cheap synchronous operations; no new polling, no React rerender per frame, no repeated `fetch` on UI mount.
- If snapshot is cached, content digest/source version must survive restarts and be deterministic; if remote source changes, detect not silently replace provenance.

---

## 09. GEOSPATIAL INTEGRATION & ACCURACY CONTRACT

**Absolute rule:** Existing Phase 12 Geospatial Core remains the only implementation for WGS84/ECEF/ENU↔world transforms.

1. Geospatial source 2D points must declare coordinate order `[longitude,latitude]`, horizontal CRS/units. `EPSG:4326` has no implicit real height.
2. 3D position may pass to `geoToWorld` only when an authentic ellipsoidal height is known **or** the result is explicitly marked `reference-only`/`height-unverified`, never represented as a real ground point.
3. WGS84 geodetic `EPSG:4979` and ECEF `EPSG:4978`; world `+X East, +Y Up, -Z North`, 1 world unit = 1m. No axis swap, east/west reflection or degree-as-meter bug.
4. For external `EPSG:3857`, VN-2000, UTM, EGM-based heights etc: require explicit conversion supported by verified metadata/tool; do not pretend conversion is implemented if it isn't. Preserve source CRS as-is with `requiresConversion=true` when necessary.
5. No silent elevation 0 from absent OSM geometry Z; no mixing DSM heights/ellipsoid/MSL.
6. Dates are acquisition vs last modified vs retrieval — not interchangeable. Provider timestamps and confidence remain explicit.
7. Validate normalized geometry for bounds, coordinate ranges, antimeridian cases, polygon closure/order if polygon support is in scope; avoid a full GIS topology engine without need.
8. Any new map projection/registry metrics must not affect renderer or minimap per-frame update path.
9. Keep `DANANG_GEO_REFERENCE` `reference-only` with unchanged anchor and 0m assumption unless survey proofs exist — **no silent rewrite**.
10. Do not make geospatial source status transition modify weather, astronomy or physics.

---

## 10. COMPREHENSIVE REFACTOR — SYSTEM CLEANUP WITH GUARANTEES

Refactor here is a first-class deliverable, but bounded by **semantic preservation**. Do not rewrite the entire application for aesthetics. Refactor design must be informed by actual call graph and tests.

### 10.1. Codebase audit categories

Search and classify each candidate:

- Duplicate schema/type for source license, provenance, bbox, vector, coordinate, status or attribution.
- Duplicate validation helpers, ID/URL normalization, error mapping, snapshot parsing or CRS constants.
- City-specific constants accidentally inside generic `engine`/`world-core`.
- Generic helpers accidentally implemented only inside `WorldExplorer` that already have reusable owner.
- Dead exports, unused components, orphan hooks, redundant index barrels, circular dependencies, unnecessary wrappers.
- Large module responsibilities with reason to separate vs many tiny single-export files that can be consolidated.
- UI strings/hardcoded language duplicates vs existing i18n keys.
- Runtime code that unnecessarily imports server-only modules, React code inside world-core, Three.js math reimplemented in another layer.
- Source metadata repeated across `manifest.ts`, city config, docs or runtime (avoid multiple sources of truth).

### 10.2. Refactor in this order

**R1 — Map dependencies.** Produce concise ownership table and `affected imports` list; identify quick low-risk consolidation targets with file/line evidence.

**R2 — Establish canonical contracts.** Extend existing provenance schema or design a compatible registry schema referencing it. One source of truth for IDs/status and source rights.

**R3 — Move/reuse shared helpers.** Only move when there are ≥2 genuine consumers or strong layering reason. Prefer single domain file to a generic utils megafile; update all imports in one controlled change.

**R4 — Remove proven dead/redundant code.** Use `rg` and tests to verify; no deletion of boilerplate just because unused by homepage, no deleting historical sources. No duplicate `geoToWorld` math.

**R5 — Integrate registry.** Wire catalog to read API/diagnostics and optional ingest. Keep city composition in `src/worlds/danang`.

**R6 — Stabilize known errors when safely adjacent.** Target documented pointer-capture second-click exception, interaction cooldown unintentional state change, responsive HUD overlap where reproducible and fixable without broad feature rewrite. Add a failing reproduction test first; preserve key/touch behavior. Classify out-of-scope issues separately rather than hiding them.

**R7 — Re-run complete regression and eliminate accidental surface changes.** Compare diff size/import graph, remove unwanted formatting churn, docs reflect actual paths.

### 10.3. Constraints on cleanup

- Do not rename all folders to a new architecture without measurable benefit.
- Do not migrate `src/api/` reusable health/weather patterns, shadcn components, SEO, translations, Docker, CI or provider infrastructure just to reduce file count.
- Avoid adding empty folders (`core`, `shared`, `common`) or extra tests identical to existing ones.
- Do not bundle `src/world-core` into a monolithic file to reduce file count at expense of readability; **cohesion** matters more than minimum count.
- Avoid creating new global state/Zustand store for static source registry.
- Do not create a generic geospatial provider factory for providers not used.
- No churn in `pnpm-lock.yaml` or dependency updates if no new package required.
- Keep public TypeScript API stable where used; deprecate only with explicit migration proof.
- Stay strict with `noUnused`/Biome where configured; no unused `TODO`, commented-out code or `console.log` left in production.

### 10.4. Refactor evidence

Report table must include `BEFORE | AFTER | WHY | RISK | TEST | RESULT`, including every deleted/moved source, plus actual duplicate removal examples and final number of files/lines touched. Do not claim complexity reduction without specific examples. If no safe duplication is found, **say so** rather than invent a major refactor.

---

## 11. INTEGRATION INTO THE REAL WEBSITE — MINIMAL, VISIBLE, HONEST

The registry must be exercised by at least one real consumer in the running app or by a reproducible executable server-only artifact, preferably both when low cost.

### 11.1. Minimal preferred UI

- Reuse existing **F3 Debug** panel or its semantic diagnostics subsection to expose read-only source summary: total sources, metadata verified, approved/ingested, blocked, `real geometry loaded: no` when none.
- If user clicks/expands, show source/provider, dataset/status, CRS, coverage, license/attribution, validation note. Render lightweight static text; **do not** create heavy map widget, nested canvases, dashboard route or polling.
- Clearly distinguish registry entries from loaded/visible geographic features. Keep `reference-only` origin warning intact. Never display `Real Da Nang loaded` without actual geo source in scene.
- Keep F3 compatible with existing DIAG-01..09 and GEO-01..16; totals dynamic and unchanged semantics.
- Translate any visible strings across `en` and `vi` with existing `worldExplorer` namespace and typed hooks. Tests must prove locale parity, no missing keys, correct status.
- Mobile F3 bounded scroll, accessibility keyboard/screen reader labels, proper `aria` and touch interactions, no overlap; no new persistent overlay obstructing gameplay.
- F3 source read must not trigger external HTTP or worker.

If adding F3 status would add disproportionate complexity, use **one inspectable CLI/report output** plus unit/integration consumer and explain why no UI was added. **Do not create decorative UI purely to claim integration.**

### 11.2. Data attribution

- Always provide required OSM attribution when actual OSM-derived content is displayed/used, with a discoverable correct link.
- In Phase 13, source catalog docs show license/attribution for candidate sources; if app does not render that data, avoid misrepresenting attribution as proof real map content is present.
- Links must be validated and not expose arbitrary HTML/injected provider content.

### 11.3. Website smoke tests

Maintain existing homepage SSR semantics, `WorldExplorer` client boundary and Health route. Ensure no runtime import of `fs`/`node:crypto` in client bundle, no additional network activity on each gameplay frame or F3 open, and no layout shift requiring new application shell.

---

## 12. SECURITY, LICENSING, DATA ETHICS & OPERATIONS

### 12.1. Official policy sources — verify latest when online

At minimum inspect relevant current primary sources and record check date:

- OSM copyright/license: https://www.openstreetmap.org/copyright
- OSMF attribution guidance: https://osmfoundation.org/wiki/Licence/Attribution_Guidelines
- OSMF raster tile usage: https://operations.osmfoundation.org/policies/tiles/
- OSMF vector tile usage: https://operations.osmfoundation.org/policies/vector/
- Overpass public API background: https://wiki.openstreetmap.org/wiki/Overpass_API
- Geofabrik Vietnam extract metadata: https://download.geofabrik.de/asia/vietnam.html
- Copernicus DEM product: https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM
- Copernicus DEM GLO-30 access update (2026): https://dataspace.copernicus.eu/news/2026-8-25-copernicus-dem-30m-view-service-update

Do not copy assumptions from these links without actually fetching source when internet is available; if unavailable, mark `needsVerification=true` with last known reference. Licensing analysis is engineering risk control, not a legal opinion or automatic authorization.

### 12.2. Data governance boundaries

- No API key/browser credentials in source or `NEXT_PUBLIC_*` unless explicitly required and reviewed.
- No arbitrary URL forwarder (SSRF), open proxy or default pass-through `fetch(urlFromRequest)`.
- Allowlist host, HTTPS, response size and content type; enforce meaningful timeout; handle 403/404/429/5xx; respect Retry-After if retry appropriate; log bounded error metadata.
- No third-party CORS workaround, mass extraction, tile cache prefetch or source scraping to evade provider limits.
- Never download entire Vietnam dataset during test/install/build/startup; do not query upstream at every render or CI run.
- If imagery/ground photos are researched, store metadata not copied copyrighted images; no embedded face/EXIF data without explicit permission.
- Resource integrity: checksum and size cap for downloaded/normalized snapshot, immutable or versioned local outputs, no silently overwritten dataset hash.
- Explicit `offline` safe mode and tests with mocked network/fixtures; third-party outages cannot block homepage/Health.
- Keep data source catalog auditable (provider URL, license URL, checked date, approval decision and reviewer). `UNKNOWN` means reject ingestion.

---

## 13. TEST STRATEGY — RED/GREEN/REFACTOR + QUALITY GATES

**Process:** baseline → add focused failing tests for each contract/bug → implement minimal code → tests green → refactor without changing behavior → full suite → real browser QA → report. Never claim test coverage from code reading alone.

### 13.1. Deterministic data source tests: `DS-01 .. DS-28`

| ID | Required assertion |
|---|---|
| DS-01 | Known source definitions parse through strict Zod; unknown fields rejected where contract requires strictness |
| DS-02 | Duplicate source IDs/dataset IDs fail atomically; no partial registry |
| DS-03 | Invalid IDs, unsafe URLs/schemes, invalid hostname/path rejected at correct trust boundary |
| DS-04 | Invalid bbox, reversed min/max, illegal latitude/longitude and coordinate-order errors rejected |
| DS-05 | Unknown license/rights/attribution cannot pass `canIngest` or `canRender` |
| DS-06 | Status candidate→verified/approved/ingested cannot be bypassed without corresponding evidence |
| DS-07 | Blocked/rejected source never becomes ingestable or rendered through fallback |
| DS-08 | Registry `get/list/filter` deterministic and idempotent; unknown ID handled predictably |
| DS-09 | Registry immutable/defensive copy: caller mutation cannot change authoritative record |
| DS-10 | Source category taxonomy and dataset typing distinguish vector/DEM/DSM/imagery/photo |
| DS-11 | Horizontal CRS and vertical datum are separate; missing datum remains unknown |
| DS-12 | EPSG:4326 GeoJSON `[lon,lat]` validation; never treat degrees as meters |
| DS-13 | 3D geospatial conversion reuses Phase 12 code; `+X East,+Y Up,-Z North` still holds |
| DS-14 | Missing height cannot silently map to real zero or be marked surveyed |
| DS-15 | Source reference anchor still `reference-only` with false verified flag |
| DS-16 | Provider update/acquisition/retrieval timestamps not conflated or fabricated |
| DS-17 | Provenance chain + source ID + dataset version + SHA-256 stable and round-trips |
| DS-18 | Corrupt snapshot/hash mismatch rejected; error contains no sensitive data |
| DS-19 | Normalization of an actual verified sample OR explicit TEST-ONLY fixture is deterministic |
| DS-20 | Malformed provider JSON, huge/oversized response and invalid coordinate rejected safely |
| DS-21 | Timeout, network failure, 429, 5xx do not result in uncaught UI exception or fake data |
| DS-22 | Requests respect allowlisted endpoint/HTTPS and cannot SSRF internal/private addresses |
| DS-23 | `pnpm test`/build/startup offline and do not call external GIS endpoints |
| DS-24 | Static UI read model/F3 source summary does not fetch or trigger per-frame rerenders |
| DS-25 | OSM attribution/license metadata retained and explain intended-use restrictions |
| DS-26 | New source records do not mutate synthetic world manifest or `PrefabRegistry` behavior |
| DS-27 | Existing DIAG-01..09 and GEO-01..16 results unchanged; no hidden denominator patch |
| DS-28 | Registry can be instantiated for another city without importing Da Nang, Three.js, React or Next |

If a requested test doesn't apply because an optional feature wasn't implemented, mark `N/A` with reason, not false PASS. Add additional tests for discovered bugs. Avoid testing private implementation details excessively; test contracts/observable behavior.

### 13.2. Refactor regression

- Before/after tests for any moved helper/registry/manifest; check import graph and absence of duplicate implementations.
- Verify `src/world-core` and `src/engine` remain reusable, no reverse dependency on `worlds/danang`.
- Catch direct server-only imports in Client Components.
- Test empty registry, missing record, malformed metadata, source unavailability, repeated register/dispose if relevant.
- If fixing pointer-capture/cooldown/overlap, add reproducer tests demonstrating failure before fix and success after, plus keyboard/touch regression.

### 13.3. Mandatory repository gates (actual commands)

```bash
pnpm lint
pnpm format:check
pnpm type-check
pnpm test
pnpm build
pnpm build-storybook
```

- All six must be attempted and output inspected. `pnpm build-storybook` remains mandatory per AGENTS even if no new story; warnings must be classified honestly. Do not suppress Node/Vite warnings solely to make report green.
- Run targeted `pnpm exec vitest run path/to/file.test.ts` during iteration; full `pnpm test` once final changes settle.
- Run `pnpm test:coverage` if coverage tool operates, but report coverage **only if actual output measured**. Do not invent percentage.
- For source-related UI updates, update/add Storybook stories as repo requires and perform browser console QA.
- Re-run final gates **after last code change**, not just before refactor.

### 13.4. Browser / integration acceptance

In real browser (not fabricated log):

1. `/` and `/vi`: homepage loads, WebGL scene visible, no new hydration/console error.
2. F3: DIAG-01..09 and GEO-01..16 preserved; source data status correctly labeled; screen usable.
3. Player controls: WASD/arrows, Shift sprint, Space jump, mouse drag/pointer lock, mobile joystick/jump if touch emulation available.
4. Mini Map: follow/static, zoom, player direction consistent, no second renderer.
5. Contextual interactions: 3 fixtures; interaction cooldown behavior and ESC handling.
6. Time/weather: proper timezone, live/stale/unavailable conditions, no fake observations; preserving BFF.
7. Responsive matrix desktop/tablet/mobile; check HUD overlap, F3 bounded scroll, no horizontal overflow.
8. Health routes and `/api/health`, SEO metadata/locale negotiation unaffected.
9. Data source registry: invalid/restricted not displayed as loaded; if approved verified snapshot exists, catalog read model provides truthful source/provenance counts.
10. Negative scenario: external GIS provider unavailable does not block initial render or force uncontrolled retry.

Performance measurements: FPS/frame-time before/after on same host/viewport/workload (if supported), draw calls, number of WebGL renderers, heap trends across mount/unmount, bundle size/load impact. **No fabricated targets achieved**; if GPU/physical device unavailable, explicitly mark. Avoid unbounded stress tests on public GIS services.

### 13.5. Acceptance matrix / release gates

| Gate | Condition |
|---|---|
| **G0 Source honesty** | No synthetic objects mislabeled as geographically verified; source candidate != approved |
| **G1 Security & legal** | No unauthorized imagery/tiles/scraping; attribution and license verified for actual used data |
| **G2 Registry** | Typed validated immutable catalog; real consumer and deterministic tests |
| **G3 Ingestion** | Bounded validated real source when permitted OR TEST-ONLY offline pipeline with explicit blocked real ingestion |
| **G4 Geo integrity** | Phase 12 transforms reused, CRS/vertical datum correct and no implicit height fabrication |
| **G5 Refactor quality** | Dedup with evidence, no new circular deps/boilerplate deletion or dead wrappers |
| **G6 Existing functionality** | Automated Phase1–12 regression, interactive browser smoke, no new P0/P1 |
| **G7 Toolchain** | Lint, formatting, typecheck, tests, production build and Storybook actual results recorded |
| **G8 UX/accessibility** | Translations `en`+`vi`, F3 correct, no new mobile obstruction |
| **G9 Evidence** | Source inventory, file changes, actual commands, blockers, source rights and next-phase handoff |

**Overall phase status**:

- `PASS` only when all mandatory G0–G9 verified, real ingestion requirement satisfied (if exact spec requires it), no unresolved mandatory blockers and reports match evidence.
- `PARTIAL` when substantial code delivered but e.g. licensed real snapshot unavailable or inherited Storybook/mobile issues unresolved.
- `BLOCKED` when core data licensing/security or functional product failures prevent trustworthy delivery.
- `NOT VERIFIED` for any scenario tool/host couldn't run; don't silently convert to PASS.

---

## 14. IMPLEMENTATION EXECUTION PLAN FOR CODEX — WORK THROUGH TASKS, NOT JUST PLAN

**Before editing**, make a concise file-specific execution checklist (actual paths, tests and risks). Then continue immediately to work; do not ask owner for confirmation except a truly blocking external permission/credential.

### Task A — Inspect & baseline

- Read rules, Phase reports, existing geospatial/source contracts and source ownership.
- Run `git status`, record branch/hash, detect user changes.
- Run baseline commands + selected browser reproduction if available.
- Draw real import/call graph (source maps and tests), list safe refactor targets.
- **Acceptance A:** accurate current-state table with detected existing failures/warnings.

### Task B — Registry contracts and metadata truth

- Reuse current provenance schema; design minimal strict Zod source/dataset/rights contract, explicit nullable/unknown fields.
- Build immutable registry with actual queries and deny reasons; deterministic stable ID; status gates.
- Add focused tests DS-01..12 + DS-25/28 as relevant.
- **Acceptance B:** no duplicate contract owner, invalid or unlicensed source cannot be enabled.

### Task C — Da Nang catalog & provider research

- Verify current source documentation/ToS, mark OSM, DEM/DSM, imagery, ground photo and official GIS realistically.
- Write city-owned catalog data; no source initialized as approved merely because metadata exists.
- Record source URLs, reviewed date, license, CRS, status, use cases, blockers in research doc.
- **Acceptance C:** sources enumerable, meaningful audit metadata, no fabricated city coverage.

### Task D — Ingestion vertical slice

- Attempt only a small lawful/allowlisted OSM sample if online; no tile scraping or huge downloads.
- Normalize and verify bounded snapshot; checksum/source lineage and deterministic offline tests.
- If network unavailable, implement tested fixture path with explicit `TEST-ONLY` provenance and `REAL INGESTION NOT VERIFIED`; do not pretend same.
- **Acceptance D:** one real validated source if permitted OR explicitly partial offline implementation with safe failure.

### Task E — Integrate + refactor

- Add smallest useful consumer (F3 read-only or executable report) with no web request during render.
- Consolidate duplicates, fix import ownership, remove proven redundant code; keep project and bootstrap structure professional and simple.
- If relevant stabilize known interaction bugs with red/green tests; don't silently broaden work.
- Update i18n and stories only for touched UI.
- **Acceptance E:** no duplicate source of truth, no unnecessary files, existing simulation unchanged semantically.

### Task F — Verification and hardening

- Run all focused tests and full quality gates. Fix Phase 13 defects, rerun.
- Test negative/failure paths including unlicensed metadata, malformed snapshots, offline provider and invalid CRS.
- Browser QA screenshot/logs for desktop/tablet/mobile where available; document the actual device/tool limits.
- `git diff --check`, inspect `git diff --stat`, check for secrets, accidental lockfile churn/dead code.
- **Acceptance F:** actual evidence for every asserted PASS, no new regressions, report existing blockers.

### Task G — Final handoff

- Update `docs/architecture/WORLD_ARCHITECTURE.md`, `docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md` and other docs **only if facts changed**.
- Create `PHASE_13_IMPLEMENTATION_REPORT.md` (required content below).
- Summarize code changed, how to run, verified/blocked status and exact next Phase 14 prerequisites.
- **Acceptance G:** reviewer can reproduce data source validation offline and understand what was and was not implemented.

**Iteration requirement:** After each task, inspect diff/tests and resolve its own failures before proceeding. Continue working until all feasible Phase 13 changes are implemented and verified within session. Don't stop after Task A architecture report.

---

## 15. DELIVERABLES — REQUIRED REPORT FORMAT

Create or update `PHASE_13_IMPLEMENTATION_REPORT.md` with **actual verified content**:

1. **Executive decision:** `PASS | PARTIAL | BLOCKED`, date, commit SHA before/after (or uncommitted diff), working branch, tool/host versions, reasons.
2. **Prerequisite truth:** Phase 11 BLOCKED findings, Phase 12 PARTIAL gaps, explicitly whether repaired or still inherited; no retrospective promotion to PASS without tests.
3. **Scope and implementation:** feature inventory, what the code really does, concrete callable APIs, city catalog, whether real ingestion happened.
4. **Source catalog table:** provider, type, URI, dataset ID/version, CRS, vertical datum, license/attribution, permission and confidence, last verified, status, blockers.
5. **Data lineage:** request bounds (if any), origin, retrieval time, snapshot hash, number of records, validation results, accuracy claims/limits and copyright attribution.
6. **Architecture & refactor:** before→after file mapping, responsibility changes, duplication eliminated, dependency directions, risk and rollback.
7. **Security/rights review:** safe network behavior, bounded inputs/timeouts, source permission evidence, blocked sources and decisions.
8. **Tests:** DS-01..28 with PASS/FAIL/N/A and actual command outputs; baseline vs final counts; negative tests; regression DIAG/GEO.
9. **Browser QA:** exact browsers, OS/device, viewports, performed actions, screenshots/logs paths if generated, console errors and warnings; limitations explicitly stated.
10. **Performance:** measured before/after when possible, renderer count, bundle impact, attribution of regressions and unmeasured items.
11. **Quality gate matrix:** G0–G9 with acceptance decision, evidence and unresolved items.
12. **Remaining risks & honest next steps:** P0–P3 severity, owners, licensing/geodesy unknowns, Phase 14 readiness (alignment only), required external approvals.
13. **Reproduction steps:** exact `pnpm` commands, optional bounded data ingestion CLI with parameters and safe default offline behavior.
14. **Final git diff:** touched/deleted/moved paths, no commit/push confirmation, preexisting changes respected.

Do not generate fake logs, fake screenshots, fake OSM IDs, fake provenance or estimated numbers presented as measured.

---

## 16. DEFINITION OF DONE & FINAL RESPONSE CONTRACT

**Code Review Checklist (must explicitly self-review):**

- [ ] Source code is genuine runnable integration, not only docs.
- [ ] All existing AGENTS.md rules and architectural boundaries respected.
- [ ] Minimal registry; metadata/rights/status and explicit unsafe-path rejection.
- [ ] Data sources distinctly candidate/approved/ingested; no real-world exaggeration.
- [ ] OSM attribution/ODbL and DEM/imagery policies considered correctly.
- [ ] One responsible owner for each reusable function/schema; no dead or duplicate wrappers.
- [ ] No uncontrolled network, third-party image/tiles scraping or rendering of unknown licensed data.
- [ ] Existing Geospatial Core formulas/anchor/axes untouched or compatible.
- [ ] Original Phase1–12 UX and world behavior preserved, Health unaffected.
- [ ] Phase13 code/automated tests, actual errors/warnings and QA evidence documented.
- [ ] All six quality commands executed/recorded after last change.
- [ ] No accidental commits, pushes, dependency churn or destruction of user changes.
- [ ] Phase14 not implemented early.

Final response to owner **short, exact, audit-friendly**:

```text
PHASE 13 — IMPLEMENTATION + REFACTOR RESULT
Status: PASS / PARTIAL / BLOCKED

Implemented:
- [real code/files, notable features]

Refactored:
- [before -> after, actual dedup]

Verification:
- lint: ...
- format: ...
- type-check: ...
- test: ...
- build: ...
- Storybook: ...
- browser: ...
- GIS source/license: ...

Unresolved:
- [specific inherited blockers and new gaps]

Files/Report:
- PHASE_13_IMPLEMENTATION_REPORT.md
- [new code & test paths]

Next phase: 14 — imagery alignment, NOT STARTED.
```

**START NOW.** Từ thời điểm nhận prompt này, Codex phải: audit → implement → refactor → test → verify → report, liên tục theo yêu cầu. Không chuyển thành câu trả lời tổng quan hoặc xin phép triển khai những phần đã nằm trong phạm vi. Chỉ dừng khi có cản trở thật sự không thể vượt qua an toàn và báo cáo bằng chứng; tiếp tục hoàn thiện tất cả hạng mục còn khả thi. 
