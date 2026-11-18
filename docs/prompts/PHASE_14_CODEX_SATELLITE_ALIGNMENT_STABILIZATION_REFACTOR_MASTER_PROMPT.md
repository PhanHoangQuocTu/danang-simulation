# PHASE 14 — CODEX MASTER IMPLEMENTATION PROMPT
## DA NANG 3D OPEN WORLD — SATELLITE IMAGERY ALIGNMENT & VALIDATION + REPOSITORY STABILIZATION & ARCHITECTURE REFACTOR

> **EXECUTION MODE: CODING AGENT IN A REAL REPOSITORY. IMPLEMENT, REFACTOR, FIX, TEST, VERIFY, DOCUMENT.**
> This Markdown is an implementation contract for Codex CLI / Codex IDE, **not** a Gemini-only prompt and **not** a request to write another plan. The agent must inspect the live worktree, make actual code changes, run actual tests and browser checks, and report observed results. No false PASS and no silent replacement of real geographic content with fabricated content.
>
> **PROJECT:** `https://github.com/PhanHoangQuocTu/danang-simulation`.
> **PRIMARY LANGUAGE:** Vietnamese for progress, decisions, comments requiring explanation and reports; keep code identifiers, commit conventions and standard technical terms in English.
> **MISSION:** Deliver Phase 14 as a production-quality, secure, auditable geographic imagery alignment foundation **while repairing verified inherited defects and carefully refactoring the existing Next.js codebase**. Preserve behavior from previous phases and reusable boilerplate infrastructure. Work autonomously inside the provided workspace; do not stop after analysis.

---

## 00 — NON-NEGOTIABLE OUTCOME

Codex must produce, to the extent supported by actual sources and available environment:

1. A functioning **Satellite Imagery Alignment & Validation** subsystem, integrated with the **real Phase 12 Geospatial Core** and **Phase 13 Data Source Registry if present**. It must validate imagery provenance, license, CRS, footprint, geographic-to-pixel transforms, control points and positioning before an imagery asset is eligible for display.
2. A minimal, reversible, user-friendly **imagery/alignment inspection capability** that works without disrupting the existing 3D explorer. The ordinary explorer must remain functional even when no eligible real satellite imagery exists.
3. An audited **zero-known-actionable-error** repository: reproduce, triage and repair inherited application exceptions, HUD bugs, TypeScript/build/test failures, CI/build warnings, broken visuals, resource leaks, dangerous data paths and regressions found during Phase 14. Do not merely suppress warnings or claim an environmental/tool limitation is a fixed application defect.
4. Controlled **professional refactoring** of style organization, design tokens, configuration ownership, reusable business logic, engine/world boundaries and test structure, without creating a monolithic `config.ts`, `styles.css` or unnecessary abstraction layers.
5. Measured before/after evidence: source/architecture map, regression tests, raster alignment numerical tests, browser screenshots and console/network checks, performance/CPU/GPU metrics where observable, and a truthful acceptance report.
6. Zero new feature scope from Phase 15+ (terrain/coastline mesh generation, road network, buildings, realistic destination content, streaming, detailed world generation). Do not disguise later-phase deliverables as Phase 14.

**Important interpretation of “fix all errors and warnings”:** Investigate every reproducible warning/error in scope, fix the cause if under project control, and document irreducible platform/tool/vendor limitations with evidence. No fabricated unconditional guarantee of perfect stability across untested devices/hardware.

---

## 01 — MULTI-ROLE ENGINEERING PANEL (INTERNAL REVIEW PERSONAS)

Act as a coordinated panel; each role must contribute explicit review findings, not merely be listed:

| Role | Ownership and mandatory checks |
|---|---|
| 01 Principal Software Architect / Technical Lead | Source-of-truth arbitration, boundaries, DRY vs overengineering, migration/rollback strategy, approval of structural refactor |
| 02 Senior Next.js App Router Engineer | Server/client boundaries, CSS import constraints, data fetching, static asset handling, routing, metadata/SEO, Docker/standalone build |
| 03 Senior TypeScript & Code Quality Engineer | Strict typing, Zod validations, pure functions, safe refactors, API ergonomics, dependency cycles |
| 04 GIS & Geodesy Engineer | WGS84/ECEF/ENU, native raster CRS, EPSG metadata, axis order, datum, geotransform, error budget |
| 05 Remote Sensing / Satellite Imagery Engineer | Georeferenced raster interpretation, footprint, GCPs, pixel resolution, capture timestamp, cloud/no-data masks, orthorectification limits |
| 06 Three.js / WebGL Engineer | Single renderer constraint, camera/minimap integration, textures, anisotropy, tile disposal, context restoration, GPU budgets |
| 07 UI/UX & Responsive Engineer | Non-invasive overlay controls, understandable source/accuracy warnings, mobile orientation, HUD overlap, accessibility, keyboard/touch |
| 08 CSS / Design System Engineer | Global tokens vs feature-owned rules, cascade, responsive tokens, Tailwind v4, unused CSS, naming, variable conflicts |
| 09 Configuration / Platform Engineer | Typed app/world/provider configs, env isolation, secrets, browser/server ownership, deployment parity |
| 10 Reliability / Bug-Fixing Engineer | Root-cause analysis for regressions, pointer capture, cooldown, StrictMode lifecycle, error boundaries, fallbacks |
| 11 Performance Engineer | Frame timings, frame budget, draw calls, texture memory, terrain-independent overlay, loading concurrency, caching |
| 12 Security & Data Compliance Engineer | Geographic imagery licenses, legal attribution, SSRF, hosts, ZIP bombs, oversized raster, supply chain, CSP/security controls |
| 13 QA Automation / Browser Test Engineer | Unit/integration/e2e, before/after browser evidence, regression matrix, automated visual/layout assertions |
| 14 Build/CI & Developer Experience Engineer | Node/pnpm reproduction, Storybook warnings, lint/format/type/build/CI, deterministic scripts, dev ergonomics |
| 15 Technical Writer / Product QA | Truthful metadata, sources, limitations, ADR, changelog/implementation report, future-phase handoff |

Prioritization: **correctness and licensed data > current user functionality > reliability > regression safety > maintainability > performance > attractive UI**. Never sacrifice proven behavior to satisfy an aesthetically neat folder tree.

---

## 02 — LIVE REPOSITORY IS THE ONLY EXECUTION SOURCE OF TRUTH

### 02.1 First operations (before any edit)

- Check `pwd`, `git status --short`, `git branch --show-current`, `git log -1 --oneline`, `git diff --stat`, `node -v`, `pnpm -v`, `package.json`, lockfile and available tools.
- **Never discard or overwrite existing uncommitted edits, untracked files or local Phase 13 work.** If you find local changes, inspect/partition them and preserve them. No `git reset --hard`, `git clean -fdx`, destructive `git checkout`, branch force update or broad rebase.
- Read root `AGENTS.md`, any narrower `AGENTS.md` along affected paths, `.codex` config if relevant, and repo-provided instructions. Follow the repository's rules unless the owner’s Phase 14 directive explicitly extends the work scope.
- Read `PHASE_11_AUDIT_REPORT.md`, `PHASE_12_IMPLEMENTATION_REPORT.md`, **the actual Phase 13 report if it exists**, `docs/PHASE_STATUS.md`, architecture documents, `docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md`, applicable ADRs and `docs/prompts/`.
- Trace actual entrypoint and data flow: `src/app/[locale]/page.tsx` → `src/modules/WorldExplorer/` → runtime → `src/engine/` → `src/world-core/` → `src/worlds/danang/`. Verify these paths rather than assuming they remain unchanged.
- Locate current Phase 13 Data Source Registry, source manifest, asset processing and license rules **by repository search**, including files not committed on remote `main`.
- Inspect style/config import graph, provider boundaries, asset references and all tests. Do not blindly trust stale README or phase checklists.
- Compare active runtime behavior and package scripts against `AGENTS.md` and actual local versions. If the repo was upgraded, use current compatible official docs rather than old assumptions.

### 02.2 Known remote-main observations, NOT an assertion about this workspace

The last publicly inspected GitHub `main` snapshot (2026-11-18 check; commit `d7b29c851db40dc26a527c801154b5f0160a0892`) contained:

- Next.js App Router 16.x, React 19, TypeScript strict, Three.js, Tailwind v4, next-intl, Vitest, Biome, Storybook, pnpm 12 and a Node 22 target.
- `src/engine/geospatial/core.ts`, `type.ts`; `src/worlds/danang/georeference.ts`; `src/world-core/schemas/manifest.ts`; `src/world-core/registries/prefabs.ts`; synthetic world and player code.
- `src/styles/globals.css` and `src/modules/WorldExplorer/styles/world.css` with substantial local design tokens and HUD CSS.
- `src/config/site.ts`, `src/config/fonts.ts`, `src/constants/env.ts`, `src/worlds/danang/const.ts`, `src/engine/core/const.ts` — these are **different bounded configuration domains**, not necessarily mistakes merely because they are in different folders.
- Historical Phase 11 audit marked `BLOCKED` and Phase 12 implementation marked `PARTIAL`.
- Phase 13 source/report was not visible on **remote main** at that moment. A local Codex worktree may contain complete Phase 13 implementation. **Inspect it first; do not infer Phase 13 is absent from the current worktree.**

### 02.3 Provenance precedence

1. Real working tree and executable code.
2. Local tests, direct browser measurements, `git diff`.
3. Local Phase 13 artifacts and newer reports **whose evidence can be verified**.
4. Existing root instructions and explicit architectural decisions.
5. Historical Phase 11–12 reports and older handover.
6. This directive as the **scope and acceptance contract**, not as evidence code already works.

If a reported bug is no longer reproducible, record reproduction attempt and observed code fix; do not reintroduce a “fix” just because the old report listed it.

---

## 03 — PHASE 14 BOUNDARY AND DELIVERABLE DEFINITION

### Phase 14 IN SCOPE

- Satellite/raster **metadata-to-world alignment** and validation: mapping a real raster’s pixel grid to its declared geographic/projected coordinates, verifying geographic footprints and converting approved points into local world meters.
- Reusable typed contracts for raster dimensions, bands/asset metadata where required, affine geotransform, source CRS, bounding geometry, pixel orientation, ground sample distance (GSD), ground control points (GCP), verification status and registration quality.
- Accurate raster registration validation: independent control/check points, geometric residuals, RMSE/max error, source confidence, no-data, overlap/seam continuity, stale/ambiguous geometry rejection.
- License- and provenance-gated imagery asset selection from Phase 13 registry **if present**; metadata-only implementation where no approved imagery is available.
- A **diagnostic alignment preview** or optional overlay that does not overwrite synthetic scene geometry or affect collisions/player/georeference. Real imagery may appear only if actual licensed data and metadata have been verified.
- Quality-focused refactor, warnings/bugs repair and full prior phase regression.

### Phase 14 OUT OF SCOPE

- Generating terrain/DEM meshes (Phase 15), roads/buildings, ocean physics, building heights from satellite colors, city-scale 3D reconstruction, photogrammetry from unlicensed images, automatic “real city” world replacement, city streaming.
- Replacing the current synthetic world with undocumented geographic placements.
- Inventing survey ground truth, aerial GCPs or corrected coastlines.
- Scraping Google Maps, Google Earth, commercial satellite tile endpoints, or bypassing authentication, rate limits, billing, watermarks or redistribution terms.
- Adding speculative backend services, database, queues, serverless functions or remote providers without a demonstrated need.
- Deleting Health, i18n, SEO, route handlers, Storybook, existing reusable boilerplate patterns, weather BFF or previous phase functionality.

### Success state

- Imagery alignment is implemented as an **audited capability**, not a false claim of surveyed Đà Nẵng coverage.
- With no compliant actual imagery, the product still demonstrates validation of synthetic **test fixtures**, but labels such fixtures clearly **TEST DATA / NOT SATELLITE IMAGERY** and never renders them as city geographic ground truth.
- With an approved raster asset, the pipeline can correctly place/verify it using declared CRS/GCP and render a *gated* preview without manipulating physics or the original scene.

---

## 04 — REQUIRED DISCOVERY, BASELINE AND WORK PLAN

Perform a lightweight, executable plan and immediately implement its stages. Recommended output `docs/audit/phase-14/BASELINE_AND_PLAN.md`, but reuse existing planning conventions; do not create duplicate plans.

### 04.1 Record reproducible baseline

1. Capture exact OS/runtime, Node target (`.nvmrc`), pnpm version, package scripts, supported browsers and Git revision/worktree dirty state.
2. Run **without modifying source**: `pnpm lint`, `pnpm format:check`, `pnpm type-check`, `pnpm test`, `pnpm build`, `pnpm build-storybook` using the repository's supported Node 22 whenever available.
3. Record commands, exit code, date, stderr/stdout log, warnings, test counts; distinguish expected test-negative logs from unexpected normal-operation warnings.
4. Start application using documented commands and browser harness if possible; test `/`, `/vi`, `/health`, `/api/health` and `WorldExplorer`/F3.
5. Snapshot relevant desktop/mobile screenshots, browser console, network, WebGL context/device capability, textures/geometry counts, FPS/frame times.
6. Build `defect → reproduction → root cause hypothesis → owner → fix → test → verified status` ledger. Track P0/P1/P2/P3 and environmental blockers separately.
7. Classify source areas: keep, merge, move, simplify, delete only if proven unused. Inspect references before every deletion.
8. Record **before** performance; only claim improvements when comparable **after** measurement exists on same machine/browser/viewport and similar load conditions.

Do not skip baseline because prior reports have measurements. Historical measurements are context, not a controlled before sample.

### 04.2 Execution order (mandatory dependency ordering)

- **Gate A**: protect worktree, inspect Phase 13 readiness, audit source-of-truth, baseline.
- **Gate B**: repair reproducible startup/runtime/control/HUD and build blockers that prevent reliable QA.
- **Gate C**: implement pure raster alignment math and validation with deterministic tests.
- **Gate D**: license-gated source integration + non-invasive optional preview/diagnostics.
- **Gate E**: incremental style/config/shared logic refactor (or interleave only when tests are green at each slice).
- **Gate F**: full regression, security/license QA, performance comparison, build/Storybook/CI/browser validation and reports.

A quality gate failure is a task to triage/fix/retest. If truly blocked by tool/device/license, produce a truthful `BLOCKED` or `PARTIAL` decision with specific missing inputs; never silently downgrade requirements.

---

## 05 — INHERITED DEFECTS: MUST REPRODUCE / FIX OR DISPROVE

These items originate from Phase 11/12 repo reports, not from a new live test in this prompt. Test them on the **current worktree**.

### DEF-01 Pointer lock + second click → `InvalidStateError` on `setPointerCapture`

- Reproduce: enter pointer lock, click the 3D canvas again, observe whether pointer capture is requested in an invalid state.
- Repair at the input controller ownership boundary: do not call setPointerCapture when pointer lock/current pointer state preconditions prohibit it; guard release lifecycle and lostpointercapture.
- Tests: pointer lock supported/not supported, repeated click, mouse drag, touch pointer, Escape, blur, overlay focus, unmount; assert **no uncaught browser exception**.
- No broad `try/catch` silently swallowing everything. Make the event state machine deterministic.

### DEF-02 Interaction cooldown erroneously toggles Env/HUD panel

- Reproduce rapid `E` after fixture activation, compare world state and Env panel visibility before/after.
- Prevent fallback hotkey handling when an interaction was recognized but temporarily rejected by cooldown. Input routing and action acknowledgement must be explicit, not dependent on ambiguous return booleans.
- Test valid E, repeated E, Shift+E, dialog focus, disabled fixture, range/occlusion, active HUD controls, keyboard repeat, mobile tap. Avoid two systems claiming the same key.

### DEF-03 Responsive HUD overlap and inaccessible controls

- Inspect 1920×1080, 1366×768, 1024×768, 768×1024, 390×844, 844×390, optionally 320px width and browser zoom 200%.
- Use hit-testing and screenshots to catch guide/controls overlapping buttons. Include device safe areas, `100dvh`, landscape tablet/mobile, overlay stacking, pointer-events, scroll and keyboard navigation.
- Fix **layout/collision of UI regions** using responsive design and minimal additional wrappers; do not hide essential controls arbitrarily.
- Ensure compact widget of time/weather remains discoverable, Mini Map works, H/F/M/F3/ESC and virtual joystick remain available.

### DEF-04 Storybook build warnings; Node runtime mismatch

- Re-run under supported Node 22 and actual repository package manager first. Earlier Node 26 generated `DEP0205` and Vite `PLUGIN_TIMINGS` warnings.
- Determine whether warnings occur only on unsupported runtime, from user config or from vendor packages. Fix root cause by compatible supported versions/config **only if justified**. Do not globally suppress warning streams, disable loggers, unconditionally ignore `DEP0205`, or claim vendor code was fixed.
- All new/changed components must have valid stories per `AGENTS.md`. Verify `pnpm build-storybook` with zero unexpected diagnostics under supported configuration.

### DEF-05 Low observed FPS and potential resource/performance defects

- Phase 11/12 headless 1920×1080 observations were below 60FPS, on specific test hardware. **Do not call these universal device FPS.**
- Profile hotspots before optimizing: DPR caps, shadow maps, shader/material count, transparent layers, geometries, draw calls, minimap pass, excess React updates, per-frame allocations, texture uploads, camera resizing, weather/rain overhead.
- Avoid replacing visual design with a degraded scene without a baseline comparison or user-centric adaptive quality. Honor one WebGLRenderer; existing 2D map canvas may coexist.
- Add imagery overlay only when it satisfies a measurable frame/GPU memory budget; disable/defer expensive assets if needed.
- Document target desktop ~60 FPS and mobile ~30 FPS as performance **targets**, not invented PASS requirements in an uncontrolled test environment.

### DEF-06 Phase 12 acceptance gaps

- Read and re-run applicable geospatial unit/diagnostic suite (GEO-01–16); verify WGS84/ENU axes, reference-only status, F3 read-only telemetry and Mini Map orientation.
- Investigate fixture/timing failure reported in the broader browser sequence, no imaginary conclusion from isolated passing reruns.
- Do not mark historical Gemini Preview/physical device checks PASS without access; local browser evidence may substitute only for clearly scoped browser scenarios, not for a different platform.

### DEF-07 Other defects found by the fresh audit

- Fix deterministic runtime warnings/console errors, hydration mismatches, invalid DOM, timer leaks, duplicate subscriptions, stale async state, uncancelled fetches, unauthorized asset loading, SSR import of browser APIs, incorrect color/position datums, focus traps, unhandled provider failures.
- Add narrow regression tests **first when practical**, then fix and re-run.
- Separate real failures from intentional negative-test logs, browser extension noise, CI host quirks and known unsupported runtime features.

**End condition for all DEF items:** fixed and evidenced, or clearly NOT REPRODUCED / ENVIRONMENTAL / BLOCKED with precise repeatable proof; unresolved actionable in-scope P0/P1/P2 means overall acceptance cannot be PASS.

---

## 06 — ARCHITECTURE REFACTOR: CLEAN, SIMPLE, REUSABLE, NOT A MEGA-FOLDER

### 06.1 Centralized CSS — owner request, interpreted professionally

The owner asks why styles are scattered and whether all styles can live in one large folder. **Yes, a discoverable central style layer is beneficial for global foundations and design tokens; no, moving every feature-scoped stylesheet into one giant file is not inherently maintainable.** Refactor based on responsibility and import graph rather than file count aesthetics.

Current remote baseline contains `src/styles/globals.css` and `src/modules/WorldExplorer/styles/world.css`. Audit actual use and imports in current worktree.

Preferred **illustrative** design, adapt to current code rather than blindly recreate:

```text
src/styles/
  globals.css            # Tailwind v4 entry; base and global resets; imported only from approved root
  tokens.css             # app-wide semantic typography/color/spacing/z-index/motion design tokens
  world-explorer.css     # optional: world-shell layout and reusable world HUD primitives, scoped to .world-explorer
  utilities.css          # only if meaningful cross-feature styling, otherwise omit
```

OR use a colocated `*.module.css` for true feature-only styles and import it directly in its component. Choose one coherent pattern; avoid a central duplicate alongside old CSS.

Rules:

- All global foundations should have one source of truth; do not re-declare generic fonts/colors/radii under conflicting names without an explicit scoped mapping.
- Keep `.world-explorer` scope for world-specific dark UI and HUD. Avoid bleeding world CSS into Health, shadcn/ui, SEO or other routes.
- Use `@theme`/CSS custom properties correctly for Tailwind v4. Respect `@custom-variant dark`, cascade order, CSS layers and build import semantics.
- Tailwind/shadcn component styles stay compatible with documented generation/override conventions. Do not hand-edit generated `src/components/ui/` to hide an app-owned problem.
- Consolidate repeated tokens and duplicate selectors only after checking computed styles, specificity, responsive behavior and contrast. Visual diff after each CSS move.
- Prefer CSS variables for runtime theme values and design tokens; do not introduce inline style objects merely to simplify file paths.
- CSS Modules remain co-located if local isolation benefits outweigh centralized navigation; add a concise `docs/architecture/STYLE_ARCHITECTURE.md` naming the criteria.
- Do not introduce Sass/PostCSS plugins/styled-components purely to centralize files. Existing Tailwind/PostCSS stack may already be sufficient.
- Do not create a 5,000-line mega-stylesheet or a separate CSS file per selector. Reduce complexity and line duplication, not just filenames.
- Preserve accessibility: focus-visible, reduced motion, 44px-ish mobile touch targets where feasible, contrast, keyboard order, safe-area and scroll lock.

### 06.2 Centralized configuration — discoverable but domain-owned

Do **not** consolidate all settings, secrets, app metadata, world physics, weather and imagery configs into a single massive `src/config.ts`. That invites coupling, accidental client-side secret leakage and uncontrolled imports. Instead make configuration discoverable, typed, logically grouped, with a small public API and explicit import discipline.

Example target **only when supported by actual current owners**:

```text
src/config/
  site.ts                 # app/site facts and SEO-related static config
  fonts.ts                # Next font ownership (keep server-safe module boundary)
  world.ts                # immutable generic world/runtime knobs, if multiple owners exist
  imagery.ts              # alignment tolerances, raster safety budgets, default feature flags
  environment.ts          # weather display constants only if appropriate; no duplicate weather provider config
  index.ts                # OPTIONAL safe client-friendly exports only; no wildcard into server-only modules
src/constants/
  env.ts                  # keep existing validated env owner unless safe migration is justified
src/worlds/danang/
  const.ts, georeference.ts # city-specific data remains city-owned, not global app-wide
src/engine/core/
  const.ts                # generic reusable engine defaults if engine still owns them
```

Rules:

- Centralize **ownership** and **discoverability**, not necessarily every value's physical directory. A city-specific georeference should not become a universal engine constant.
- Never merge server-only secret/environment clients with client-exported config barrels; prove bundle boundaries and runtime behavior.
- Prefer `as const`, `satisfies`, Zod/typed schemas where runtime input is untrusted; do not validate static module literals redundantly on each frame.
- Avoid circular imports (`config -> engine -> config`, `world -> app -> world`); use dependency graph and import tests.
- Preserve existing semantic defaults for player physics, camera/minimap, wind, solar, weather refresh, locale, SEO and route behavior.
- Migrate imports atomically with IDE-aware path refactor and tests. Do not leave deprecated twin copies/forked configs. Keep compatibility re-export temporarily only if downstream code requires it; document removal.
- Keep `src/constants/env.ts` and root `AGENTS.md` contracts consistent if moved. Any update to `AGENTS.md` must retain the same governing rules for Codex/Claude.

### 06.3 DRY / shared code extraction

Find duplicate implementations of:

- Coordinate validation and transforms; **reuse Phase 12 `src/engine/geospatial/core.ts`** instead of writing another WGS84 converter.
- Source/data license/provenance/metadata validation; **reuse Phase 13 registry** if present. Phase 14 builds an adapter or extension, not a new registry clone.
- Polygon/bounds/affine transforms used across imagery, map and world, when abstraction makes sense.
- Error/result handling, schema parsing, resource cleanup, cancellation, buffer validation and async request lifecycle.
- CSS tokens/palette, UI controls, icon/color primitives and translated warnings.
- Shared constants for GCP residual thresholds, texture safety/limits and runtime feature flags.

Do not combine unrelated business logic merely because function names look similar. Pure reusable engine/GIS code must not import Next.js, React, UI components or Đà Nẵng content. `worlds/danang` configures instances, not generic algorithms.

### 06.4 Structural refactor quality bar

- Respect current architecture (`src/app` thin routes, `src/modules` page/UI, `src/engine` generic 3D, `src/world-core` schemas/registries, `src/worlds/danang` city composition, `src/integrations` provider adapters, `src/config` config ownership, `src/styles` global tokens).
- Before adding a folder/file, justify its only responsibility and identify reuse consumers. Prefer short cohesive modules over folder nesting for its own sake.
- Remove proven-unused dead code, duplicate utilities and stale exports; retain historical `history/` archive and existing assets unless authorized.
- Avoid deeply chained barrels, circular dependencies and two-way imports between engine and app. Keep tree-shaking and SSR boundaries intact.
- Preserve existing `Health` routes, locale messages, server component conventions, `getApiRequestClient`/BFF patterns, SEO and Docker/CI config.
- Prove refactor with semantic tests and before/after screenshots. Commit boundaries are useful conceptually, but **do not commit/push unless expressly requested**.

---

## 07 — GEOSPATIAL FOUNDATION CONTRACT: INTEGRATE, NEVER REWRITE

Read the implementation of Phase 12 before any GIS code change. Expected existing concepts:

- `geodeticToEcef`, `ecefToGeodetic`, `ecefToEnu`, `enuToEcef`, `geoToWorld`, `worldToGeo`.
- WGS84 ellipsoid and explicit ellipsoid height (not assumed mean sea level).
- `DANANG_GEO_REFERENCE` with `status='reference-only'`; coordinates 16.0544 N, 108.2022 E; height 0m is a mathematical assumption, not a surveyed altitude.
- World orientation `+X East, +Y Up, -Z North`, meters-per-unit 1; Mini Map East right, North up.
- Original scene/physics/collisions remain synthetic local coordinates. Derived global coordinates are for reference display only.

**Integration rules:**

1. Do not modify the Phase 12 core mathematical invariants to force raster imagery alignment.
2. Dataset native raster CRS is separate from geospatial engine CRS. Implement explicit source CRS -> geographic WGS84 (and vertical if relevant) -> local ENU/World conversion using validated transforms.
3. Do not use raw `(longitude - anchorLongitude) * magicScale` or `(lat - anchorLat) * magicScale` to align imagery.
4. Do not swap latitude and longitude or silently assume projected CRS units are degrees.
5. **Horizontal-only imagery must not infer elevation.** Phase 14 imagery overlay is visualization/registration, not validated terrain altitude.
6. Distinguish EPSG:4326 2D lat/lon, EPSG:4979 3D geodetic WGS84 heights, EPSG:4978 ECEF and source-native projected CRS. Never state that EPSG:4326 includes ellipsoidal height.
7. If a datum transformation needs a grid/geoid/control parameters unavailable locally, fail closed or mark not transformable. Do not silently treat VN-2000 or orthometric/EGM heights as identical to WGS84 ellipsoidal values.
8. For geographic rasters crossing antimeridian or polar regions, validate bounds and fail clearly if the supported Phase 14 algorithm cannot handle them; do not produce flipped imagery.
9. Keep double-precision CPU coordinates during registration; only convert to Float32 for GPU-local rendering near a stable origin.
10. If calibration requires a different world anchor, changing it is a versioned explicit migration with full scene/physics/map consistency checks, not an implicit change hidden in a raster loader.

---

## 08 — PHASE 13 DATA SOURCE REGISTRY: HARD COMPATIBILITY REQUIREMENT

### 08.1 Discover local Phase 13 first

Search for `PHASE_13_IMPLEMENTATION_REPORT.md`, relevant `src/world-core` and `src/integrations` modules, source registry schemas, dataset records, asset versions, license checks, asset validation and tests.

- If Phase 13 exists and passes its own focused tests, **reuse it** and extend only contract fields genuinely needed for Phase 14.
- If Phase 13 is partial, repair the minimum blocking registry/data-trust paths before consuming assets; mark Phase 13 residual limitations honestly.
- If no Phase 13 implementation is available, create **only a minimal reusable adapter/source-validation gate** sufficient to validate Phase 14 metadata and deterministic fixtures; do not pretend to implement the full missing Phase 13 roadmap. List unresolved Phase 13 work as a prerequisite for actual imagery deployment.
- Never duplicate source-of-truth catalogs for one dataset across `/public`, frontend constants and server registry. Use a single validated manifest/registry with stable IDs and versioning.

### 08.2 Asset trust contract

A raster source is **ineligible** for production display unless it has:

- Stable unique source/dataset/asset IDs and version.
- Provider, authoritative landing page, retrieval method and traceable input artifact location.
- Explicit license grant and permitted uses (view, cache, derivative, redistribute) or documented owner approval. Attribution string must be renderable in UI when required.
- Acquisition/capture timestamp where available; absence explicitly `unknown`.
- Geographic footprint/bbox with CRS and unit information; raster width/height and pixel/GSD metadata.
- Native spatial referencing (affine transform/GCP), coordinate reference system, supported transformation parameters.
- Processing history, checksum/hash where appropriate, and quality status `candidate`, `validated`, `rejected`, `blocked` or equivalent.
- Cloud/no-data coverage indicators where present and actual provenance/resolution limits.

**Availability is not permission:** A reachable tile URL is not proof a provider allows copying, caching, redistribution, texture baking or bulk fetching.

### 08.3 Sources for research and policy checks

Use official materials; verify terms per chosen dataset, date and product, and record the actual decision:

- Copernicus Data Space Ecosystem terms and Sentinel data legal notice: `https://dataspace.copernicus.eu/terms-and-conditions`.
- Sentinel-2 product overview: `https://dataspace.copernicus.eu/data-collections/copernicus-sentinel-missions/sentinel-2`.
- USGS public-domain guidance / Landsat dataset restrictions: `https://www.usgs.gov/centers/eros/data-citation`.
- OSM attribution/ODbL: `https://www.openstreetmap.org/copyright` (OSM data is mostly vector context, **not** permission to redistribute arbitrary aerial imagery).
- OGC STAC specification: `https://www.ogc.org/standards/stac/`.
- GDAL georeference model: `https://gdal.org/en/stable/user/raster_data_model.html` and GeoTIFF driver: `https://gdal.org/en/stable/drivers/raster/gtiff.html`.

**Resolution honesty:** Sentinel-2/Landsat imagery may be useful for macro geographic/coastline context; do not claim it is street-level ortho-imagery or enough to model individual doors/buildings. Do not assume current access/auth/coverage without a successful verified request. If no qualified asset is accessible, operate in metadata/test-fixture mode.

---

## 09 — IMAGERY REGISTRATION DATA MODEL & VALIDATION

Design a small, modular, strict TypeScript interface/schema; adjust names to existing code. All external inputs enter through a validator and runtime schema. Suggested conceptual contract:

```ts
// EXAMPLE CONTRACT; adapt to real Phase 13 types and avoid schema duplication.
type RasterSourceId = string;
type NativeCrs = string; // e.g. EPSG:4326, EPSG:32649 only if actually present in metadata

type RasterGeoTransform = readonly [number, number, number, number, number, number];
// x_geo = GT0 + column * GT1 + row * GT2
// y_geo = GT3 + column * GT4 + row * GT5

type RasterRegistration = {
  assetId: string;
  sourceId: RasterSourceId;
  width: number;
  height: number;
  nativeCrs: NativeCrs;
  transform: RasterGeoTransform;
  pixelReference: 'pixel-corner' | 'pixel-center';
  noData?: number | null;
  captureDate?: string | null;
  groundSampleDistanceMeters?: number | null;
  footprintWgs84?: ReadonlyArray<readonly [number, number]>;
  licenseDecision: 'approved' | 'pending' | 'rejected';
  sourceTrust: 'verified' | 'unverified';
};
```

Do not blindly adopt this shape; derive exact representations from existing types and approved asset metadata. Decide whether `pixelReference` is needed in the API or normalized once on ingest; either choice must be tested and documented.

### 09.1 Mandatory invariants

- Positive integer raster width/height, within configurable safe dimensional/pixel/bytes limits.
- Finite affine coefficients; non-singular 2×2 matrix; numerical condition estimate or rejection for degenerate/sheared extremes.
- Correct pixel corner/center mapping; document raster extent as pixel-edge boundaries, not center points.
- Standard GDAL affine convention with optional rotations/shears; do not assume north-up `GT2 = GT4 = 0` in every case.
- Explicit CRS ID and verified transform availability; do not accept undefined CRS as WGS84.
- Explicit numerical bounds for latitude/longitude, projected easting/northing and geographic area size; reject NaN/Infinity and absurd/mismatched extents.
- Geometry footprint simple and valid (winding/order where applicable, polygons closed/repair policy, no self-intersections); use a tested library only if genuinely required.
- Reject duplicate/conflicting IDs, unknown license, invalid source state, unsigned/untrusted URL or unapproved redistribution action.
- No silently assumed vertical datum, survey accuracy, meter scale, capture date or alignment status.
- Distinguish parse/metadata validity, geographic transform validity, alignment accuracy, display eligibility and actual visual correctness.

### 09.2 Raster math, fully implemented

Create pure, deterministic, unit-tested functions (names flexible):

1. `pixelToNativeCoordinate({column,row}, affine)` (pixel corner/reference semantics explicit).
2. `nativeCoordinateToPixel({x,y}, affine)` via determinant/inverse; guard singular/near-singular matrices.
3. `nativeCoordinateToGeodetic(...)` using configured CRS pipeline (not ad-hoc scaling).
4. `geodeticToNativeCoordinate(...)` only where inverse is supported and verified.
5. `pixelToWorld(...)` chaining validated source transform → geographic → Phase 12 reference → ENU world; **height handling explicit**.
6. `worldToPixel(...)` only where world elevation/reference policy is meaningful; never claim 3D terrain inverse without valid surface elevation.
7. `rasterPixelFootprint(...)`: map corners correctly and calculate actual footprint extent.
8. `validateRasterRegistration(...)`: error typed, actionable and fail-closed.
9. `evaluateControlPoints(...)`: residuals and quality thresholds as described below.

Use `Number` (double precision) for geospatial math. Do not use `bignumber.js` merely because it exists; geodetic trigonometry depends on IEEE-754 double and domain-specific error budgets. Use typed `Result` only if current project has such a convention; avoid generic “Result utility” proliferation.

### 09.3 Native CRS support must be truthful

Minimum viable supported capabilities can be explicit: `EPSG:4326` longitude/latitude with correct GIS axis order, and one documented projected system **only when used by a real approved asset** and backed by a verified projection library/transform.

- The geographic WGS84 input order for app APIs should be explicit (e.g. `{longitudeDeg, latitudeDeg}`), not an ambiguous raw tuple.
- OGC/WMS/EPSG axis ordering can differ from app `lon,lat`; the adapter must normalize and test.
- Do not write an unverified UTM or VN-2000 approximation for production. A tested projection library or preprocessed offline raster can be used when justified.
- If dependency necessary (`proj4`, GeoTIFF reader, GDAL CLI offline, image resampling tool), compare available alternatives, verify current API/license and record why it is needed; see dependency policy.
- For orthorectified imagery, preserve ground referencing. For **non-orthorectified raw satellite photos**, do not claim pixel-to-ground precision solely from a simple affine. Clearly reject or mark quality limited.

---

## 10 — CONTROL POINTS, ACCURACY, ALIGNMENT QUALITY & APPROVAL

### 10.1 GCP/check point model

- Stable ID, source asset/version, measured pixel coordinate, geographic ground coordinate (CRS and height if relevant), provenance, collection date, uncertainty, and role: `calibration` or `independent-validation`.
- Do not invent geodetic ground truth from the synthetic scene/Phase12 assumed anchor or from the image alone.
- Three non-collinear matched points are a mathematical minimum for a 2D affine; **more independent control/check points are recommended** for real validation.
- Use well-distributed points across scene/footprint; avoid 3 points in one corner. Reject collinear/near-collinear, duplicate, out-of-bounds and inconsistent-CRS points.
- If an already georeferenced raster is used, control points are for **validation** unless a separately documented calibration feature is necessary. Do not silently mutate verified transform to “match appearance.”

### 10.2 Quantitative checks

- Compute predicted geographic/local world positions for every check point.
- Compute per-point horizontal residual in meters (and separate pixel residual where useful), Euclidean distance in local ENU if appropriate.
- Report `n`, mean, median, RMSE, maximum, 95th percentile where meaningful, spatial distribution, and thresholds.
- Define tolerance based on source resolution/accuracy and project acceptance config, not a universal arbitrary “always <= 1m”.
- **Round-trip precision != geographic registration accuracy.** Report numeric algorithm residual separately from real-world GCP residual.
- Keep withheld independent validation points distinct from calibration points; never certify fit by measuring the same points used to optimize the fit.
- If no authoritative GCPs exist, report `NOT VERIFIED` real-world accuracy, even if algebra tests all pass.
- Detect rotation, shear, upside-down imagery, mirror/axis inversion, ground extents outside expected city bbox, unrealistic scale/GSD.
- Provide clear rejection reasons; no smoothing/hiding large residuals in final UI.

### 10.3 Registration modes

- **Mode A — Metadata validated:** geotransform/CRS/source/license valid; no independent accuracy proof. Show `REGISTERED / REAL-WORLD ACCURACY UNVERIFIED` or locale equivalent.
- **Mode B — Checkpoint validated:** independent trustworthy check-point residuals within declared dataset-specific thresholds; list evidence and limitations.
- **Mode C — Rejected / blocked:** invalid CRS, missing geotransform, unknown license, failed check points, missing transform, incorrect footprint/axis or unavailable asset.
- **Test fixture mode:** synthetic deterministic raster/point fixtures in tests or developer tools only, prominently labeled; never shown as real satellite imagery.

Do not collapse A and B into one green “verified” badge. Truthfulness about data trust is a core product requirement.

---

## 11 — OPTIONAL REAL IMAGERY PREVIEW / WORLD ALIGNMENT VISUALIZATION

### 11.1 User-facing intent

The user should be able to inspect whether a legitimate raster aligns with the city geographic anchor **without breaking exploration controls**. Prefer integration into existing debug/Mini Map workflows rather than creating a new entire site or editor UI.

If an approved imagery asset exists:

- Provide an explicit `Imagery`/`Alignment` toggle (feature gated if appropriate) using existing UI controls and locale messages.
- Display asset/provider/capture date/license and geographic validity state; indicate inferred/reference-only anchor confidence separately.
- Choose **one appropriate preview strategy** based on actual renderer and asset geometry: e.g. a 2D map diagnostic overlay aligned to geographic footprint, or a small controlled planar ground overlay for visual inspection. Do not use both merely to look advanced.
- Keep visual overlays separate from solid collision/physics/terrain data. Synthetic world remains the active walkable test environment.
- Keep a single Three.WebGLRenderer for the world/minimap render pass; any existing 2D map canvas follows current architecture. Do not spawn a second WebGL renderer.
- Ensure texture transform/orientation and UV mapping match world axis conventions; verify using corner, compass and control-point markers.
- Handle loading, errors, cancellation, retry, unmount, disabled assets and WebGL context-loss restoration. Dispose textures/materials/geometry with owner-aware resource scope.
- Do not bypass cross-origin/security or generate invisible errors on imagery absence. No remote secret/API token in browser config.
- Control resolution/LOD/texture size for mobile; create no runaway render loop, no persistent huge Base64 state and no per-frame geospatial reprojecting.

If **no approved asset** exists:

- Ordinary UI remains unchanged or shows a discreet `No verified imagery available` informational state.
- Alignment math, validation and deterministic preview harness must still be demonstrable in tests/debug using fixtures clearly labeled TEST DATA.
- Do **not** display web-scraped screenshot, generic map art, approximate “satellite-like texture”, or unknown-provenance tiles as actual Đà Nẵng satellite imagery.
- Report the missing upstream licensed imagery/ground-truth as an explicit blocked integration, not fake success.

### 11.2 UI QA

- No new full-screen modal interrupting movement by default.
- Reticle, 3 interaction fixtures, input state, joystick, weather widget, Mini Map and F3 preserved.
- User can inspect metadata, quality state, attribution (with accessible link) and turn preview off.
- Touch/keyboard controls work; buttons have names, logical focus order and reduced-motion behavior.
- No text overflow and HUD occlusion at specified viewports. Locale English/Vietnamese parity.
- If imagery is unavailable, display trust state without technical stack traces or meaningless dead controls.

---

## 12 — SECURITY, LEGAL AND NETWORK BOUNDARIES

Implement only needed secure pathways; no arbitrary web fetch/proxy.

- Allowlist approved provider origins and exact approved paths or preprocessed local assets; never create `/api/fetch?url=<arbitrary>` SSRF endpoint.
- Keep external URLs untrusted. Validate protocol, hostname, redirect rules (including redirect target), MIME/content-type, declared dimensions, decompressed size and timeout.
- Handle malformed GeoTIFF metadata, huge dimensions, pixel bombs, invalid transforms, hostile JSON, invalid projection identifiers, enormous polygons and stale/corrupt cached resources.
- Do not commit API tokens, proprietary imagery files, private keys or copyrighted assets without rights.
- Understand product-specific Copernicus/USGS/OSM and third-party providers' attribution and redistribution rules; check actual terms, not just a generic open-license banner.
- Add human-readable source attribution as required; storage/caching/derivative permissions tracked separately.
- For source access needing OAuth/payment/API key, do not bypass; use documented, consented configuration only. No new environment variable unless there is a verified technical need and explicit owner approval required by repo instructions.
- Prefer build-time/offline preprocessing for large rasters. Do not ship massive geospatial processing libraries to the browser by default.
- Check dependency security with existing tooling and advisories where environment permits; do not run unsafe `curl | sh` installs.
- Ensure errors are typed and sanitized; users see actionable, non-sensitive messages, while details go to existing diagnostic logging.

---

## 13 — DEPENDENCY POLICY (INSTALL ONLY WHEN NECESSARY)

Owner explicitly allows package installation if it improves the project. That is permission to add **justified minimal dependencies**, not to upgrade everything.

Before each new dependency:

1. Identify concrete missing capability (e.g., reliable EPSG reprojection or GeoTIFF parsing, not merely nicer syntax).
2. Check existing `package.json` and installed packages, built-in APIs, platform tooling and current license.
3. Compare at least two options or explain why one solution is clearly appropriate; consider browser bundle, native binary portability, SSR, maintenance, security and Node 22/pnpm 12 compatibility.
4. Prefer pure TS utilities for affine math and schemas, tested industry libraries for nontrivial projection, and offline tooling for large datasets.
5. Install with `pnpm add <pkg>` / `pnpm add -D <pkg>`, update lockfile and any `pnpm-workspace.yaml` build permission only if required.
6. Verify install logs, TypeScript types, licensing, tests, output chunks and build. Remove unused candidate dependencies instead of leaving them dormant.
7. Avoid duplicate CSS frameworks, multiple projection packages, two state libraries, two test frameworks, new backend or UI kits unless proven essential.
8. Do not perform broad version upgrades/major dependency migration to silence unrelated warnings without compatibility and rollback analysis.

Document each package addition: **why**, alternatives, files that import it, bundle/performance cost, what was tested and rollback approach.

---

## 14 — EXECUTION WORK PACKAGES WITH ACCEPTANCE CHECKS

### WP-00 Repository bootstrap & risk baseline

- Reconcile branch, dirty worktree, Phase 13 state, local instructions, environment and test baseline.
- Output: concise architecture inventory + baseline warnings/failures + Git protection statement.
- Accept when baseline log is reproducible and no user's changes were overwritten.

### WP-01 Defect regression tests before repair

- Write focused tests reproducing verified DEF-01, DEF-02, DEF-03 and other high-impact actionable bugs where test infrastructure allows.
- For browser-only issues, add reproducible script/evidence and independent assertion.
- Accept when failing tests demonstrate bugs (where reproducible), and subsequent implementation turns them green.

### WP-02 Stabilize controls, overlays, lifecycle

- Fix validated runtime exceptions, cooldown routing, HUD overlap, cleanup and input conflicts.
- Review one-renderer invariant and WebGL lifecycle; preserve existing 3D controls.
- Accept with browser and tests, not just type-check.

### WP-03 Raster metadata schema & trust adapter

- Reuse Phase 13 registry; extend only necessary fields or write the minimal adapter if absent.
- Build strict validation and typed actionable errors; versioned asset trust decisions.
- Accept metadata validation tests with malformed cases and license rejection.

### WP-04 Affine pixel/native math

- Implement forward/inverse affine with rotated/sheared transforms, corner/center policy, edge footprints, singular rejection, numeric tests.
- Accept against independent fixed mathematical examples and inverse residual threshold at realistic coordinate magnitudes.

### WP-05 Source CRS/geographic/world adapter

- Reuse Phase 12 Geospatial Core, validate axis ordering and horizontal-only altitude policy. Add projection dependency only when justified.
- Accept East/right, North/up, corners, lengths, heading and dateline/error handling tests.

### WP-06 Registration evaluator

- Implement GCP/checkpoint parsing, distinct calibration vs independent validation, non-collinearity, residuals, RMSE/max/percentile, threshold interpretation and transparent state labels.
- Accept controls/test points, skew/mirror/offset rejection and no fake confidence.

### WP-07 Preview integration

- Build minimally invasive toggle/metadata/attribution/overlay using existing HUD or Mini Map integration. Gate real imagery by license & source trust.
- Accept disabled/no-asset path, approved-asset path when available, web console, cleanup, localization, responsive checks.

### WP-08 CSS system cleanup

- Audit selectors and imports; centralize shared global tokens and decide on world scope. De-duplicate and eliminate unused style code by proof.
- Accept Health/World visual parity or intentional documented improvements, no cascade leaks, 0 horizontal overflow and accessibility checks.

### WP-09 Typed config ownership cleanup

- Map existing config consumers, consolidate genuine duplicates with domain boundaries, remove stale twin values and test import graph/SSR.
- Accept one source of truth per value, no leaked env, no cycles and unchanged product behavior.

### WP-10 Engine/world/shared code refactor

- Extract shared only where there are multiple actual consumers, reduce file bloat and duplicate validation, keep domain separation; keep public APIs stable or migrate consumers.
- Accept unchanged physics, geospatial math, weather/solar, resource ownership, Mini Map and fixtures.

### WP-11 Production quality and warning cleanup

- Run supported runtime, check lint/type/build/tests/storybook, diagnose warnings and failed checks, repair in-scope causes rather than silencing.
- Accept genuine zero unexpected warnings/errors in exercised supported setup; blocked externals explicitly recorded.

### WP-12 Integration, browser and mobile QA

- Test current real app production build and dev mode with multiple viewports, actual interactions, console/network and screenshot evidence.
- Accept named scenarios; don't declare physical device verification from emulation.

### WP-13 Performance & long lifecycle QA

- Compare before/after same-machine metrics, loading/unloading imagery, GPU dispose, repeated mount/unmount, context loss, network offline, fallback assets.
- Accept no measured material regression for comparable samples; document remaining FPS gaps.

### WP-14 Documentation & project governance

- Update architecture diagrams/text, `README.md` only where reality changed, test evidence, source attribution guidance, `AGENTS.md` only if paths/commands changed, exact Phase 14 report.
- Accept docs match actual source and no outdated “phase unstarted” claims for implemented features.

**After every WP with source edits:** run focused tests and type/lint checks, inspect `git diff` for accidental scope expansion, rerun relevant browser checks before proceeding.

---

## 15 — DETERMINISTIC TEST MATRIX: REQUIRED PHASE 14 TESTS

Test names/IDs may follow existing conventions, but preserve full traceability. Do not artificially hardcode PASS in diagnostics. Add meaningful tests, not only presence-of-function assertions.

### Raster and CRS tests (IMG-01 through IMG-22)

- **IMG-01:** valid raster metadata accepted with known license, source and CRS.
- **IMG-02:** invalid width/height, negative/non-integer dimensions rejected.
- **IMG-03:** NaN/Infinity affine coefficients rejected.
- **IMG-04:** singular and near-singular affine rejected with typed error.
- **IMG-05:** identity affine pixel-to-native and inverse.
- **IMG-06:** north-up GeoTransform with negative row Y scale maps corners correctly.
- **IMG-07:** rotated affine with positive/negative off-diagonal terms maps correctly.
- **IMG-08:** sheared affine inverse correctly reconstructs representative pixel coordinates.
- **IMG-09:** pixel corners versus centers differ exactly as specified and do not shift by a half pixel unexpectedly.
- **IMG-10:** transformed raster 4 corners yield footprint in correct order and extents.
- **IMG-11:** missing/unknown native CRS fails closed; never defaults to EPSG:4326.
- **IMG-12:** EPSG:4326 longitude/latitude orientation and 2D-vs-3D contract.
- **IMG-13:** supported projected CRS yields independently checked vector; unsupported CRS fails explicitly.
- **IMG-14:** WGS84 geographic→ENU→world expected signed directions and origin usage exactly once.
- **IMG-15:** raster-to-world-to-raster numeric residual within documented computational precision under supported assumptions.
- **IMG-16:** invalid bounding polygon/self-intersection/invalid geographical range rejected (as supported).
- **IMG-17:** dateline/anti-meridian unsupported case fails clearly instead of wrapping silently.
- **IMG-18:** incorrect axis, mirrored or upside-down transform flagged in fixture.
- **IMG-19:** large/unrealistic raster extent/GSD fails configurable policy appropriately.
- **IMG-20:** no-data/mask metadata interpreted as unavailable pixels, not manufactured content.
- **IMG-21:** no height data must not imply surveyed altitude or terrain/collision changes.
- **IMG-22:** old GEO-01–16 + original DIAG-01–09 still pass without modification to their meaning.

### Trust, licensing & registration tests (IMG-23 through IMG-40)

- **IMG-23:** source license approved for viewing and display eligibility.
- **IMG-24:** unknown/missing/rejected license cannot render real imagery.
- **IMG-25:** attribution text/link preserved and visible where applicable.
- **IMG-26:** stable source/asset ID and version prevents mismatched metadata/cached assets.
- **IMG-27:** fake provider URL or unauthorized host is blocked.
- **IMG-28:** malformed metadata/unknown source/unknown asset rejected.
- **IMG-29:** three valid non-collinear mathematically matched points accepted for affine math without overclaiming survey accuracy.
- **IMG-30:** duplicate/collinear/near-collinear GCPs rejected.
- **IMG-31:** GCP calibration and independent hold-out checks stay separate.
- **IMG-32:** known pixel offset translates into expected horizontal residual, RMSE and max in meters.
- **IMG-33:** one large outlier is surfaced; not hidden by mean residual.
- **IMG-34:** source-specific threshold behavior and low-resolution caveat.
- **IMG-35:** no independent control points → `NOT VERIFIED` real-world accuracy.
- **IMG-36:** invalid datum or unavailable transform → `BLOCKED`, no approximate geographic alignment.
- **IMG-37:** source acquisition/capture date absent remains unknown; no invented timestamp.
- **IMG-38:** inactive/stale/rejected source cannot bypass trust gate via cached state.
- **IMG-39:** corrupted asset/dimension mismatch rejected without crashing app.
- **IMG-40:** deterministic ingest/metadata outputs and no duplicate catalog entries on retry.

### UX, bugs and lifecycle tests (IMG-41 through IMG-58)

- **IMG-41:** without approved imagery the 3D scene renders normally; no fake satellite image.
- **IMG-42:** approved asset (actual when available, deterministic test fixture otherwise) toggle is reversible.
- **IMG-43:** overlay never changes player physics, terrain, collision meshes, georeference or world boundary.
- **IMG-44:** one WebGL renderer preserved; existing Mini Map behavior unaffected.
- **IMG-45:** repeated toggles/unmounts dispose textures/materials/buffers and cancel requests.
- **IMG-46:** failed/deleted asset and network offline lead to localized fallback rather than uncaught errors.
- **IMG-47:** context loss/restoration causes no duplicate render loop and restores gated preview state safely.
- **IMG-48:** pointer-lock second-click has zero uncaught DOMException (if supported), mouse/touch drag intact.
- **IMG-49:** cooldown-repeated E has zero unintended Env toggle; Shift+E intentional behavior unchanged.
- **IMG-50:** keyboard focus / input fields / dialogs isolate world movement and key handling.
- **IMG-51:** desktop 1920×1080 and 1366×768 HUD hit targets are not occluded.
- **IMG-52:** tablet 1024×768 and 768×1024 HUD hit targets are not occluded.
- **IMG-53:** mobile 390×844 and 844×390 HUD touch targets are not occluded.
- **IMG-54:** locale `en` / `vi` message keys and attribution verified; no runtime missing keys.
- **IMG-55:** reduced motion, focus visibility, screen-reader labels and high-zoom layout.
- **IMG-56:** Health, route metadata, SEO/sitemap, language navigation and weather BFF intact.
- **IMG-57:** browser normal-run console zero unexpected warnings/exceptions; separate expected negative-test events.
- **IMG-58:** performance and memory before/after comparable measurements reported without fabricated improvement.

### Architecture, build, security tests (IMG-59 through IMG-72)

- **IMG-59:** global style tokens single ownership; world styles scoped; Health visual styles not leaked.
- **IMG-60:** moving CSS does not change Next import semantics or Tailwind v4 compilation.
- **IMG-61:** config values have singular owner, typed and consistent across runtime/Storybook/tests.
- **IMG-62:** server-only config/secrets never appear in client bundles.
- **IMG-63:** no cyclic imports engine/world/app or source registry clones.
- **IMG-64:** source URLs/payloads cannot create arbitrary SSRF, open redirects or unlimited downloads.
- **IMG-65:** oversized/hostile raster metadata and corrupt asset fail with bounded resource use.
- **IMG-66:** only approved authorized asset formats/paths are served or cached.
- **IMG-67:** no extra unused package/import, no hidden monkeypatch, no warning blanket suppression.
- **IMG-68:** lint and format pass with zero unexpected diagnostics.
- **IMG-69:** type-check and all unit/integration tests pass.
- **IMG-70:** production Next build and applicable Storybook build pass; vendor/environment warnings classified and addressed where feasible.
- **IMG-71:** Docker/CI/Node/pnpm scripts remain reproducible under supported runtime; package lock synchronized.
- **IMG-72:** documented phase status, exact provenance, worktree changes, tests and rejected limitations match reality.

**Test discipline:** Some IDs are best implemented as browser/e2e/manual evidence, not unit tests. Classify `AUTOMATED_PASS`, `BROWSER_PASS`, `MANUAL_PASS`, `FAIL`, `BLOCKED`, `NOT_VERIFIED`; never make all 72 checkboxes PASS by running a shallow function list.

---

## 16 — BROWSER / E2E REGRESSION CHECKLIST

Use a real installed browser or repository's already configured automation. If browser automation absent, add minimal, maintainable tooling **only with justified dependency cost**. Do not replace browser proof with jsdom.

### 16.1 Routes and runtime

- `/` and `/vi` load the actual 3D scene without hydration/runtime exception, one WebGLRenderer.
- `/health`, `/vi/health`, `/api/health` and weather BFF behavior preserved.
- SEO metadata, canonical/hreflang and root navigation not broken.
- Initial asset download/caching is bounded. No unapproved remote tile fetching.

### 16.2 Explorer basics (Phase 1–10)

- WASD/arrows, walk/run/jump/fall/landing, collision, reset and camera orbit/zoom.
- Pointer lock, touch virtual joystick and device detection. Focus input/editor isolation.
- Real Da Nang clock and real weather statuses (LIVE/STALE/UNAVAILABLE), retry handling, nighttime visuals and astronomy interface.
- Persistent mini time/weather widget, guide/help, fullscreen where applicable.
- Mini Map STATIC/FOLLOW, zoom, player orientation North up/East right and map compact mode.
- All three interactable fixtures, E/cooldown, Shift+E, ESC modal/hotkeys.
- F3 diagnostics DIAG-01–09, GEO-01–16 and new imagery diagnostics/report states.

### 16.3 Phase 11–14

- Known historical bugs DEF-01/02/03 and related startup warnings re-tested.
- Phase 12 WGS84 axes/height/confidence unchanged; F3 read-only geographic telemetry.
- Phase 13 registry/source governance validated if present.
- Phase 14 licensed imagery metadata/registration inspector and absent-data fallback tested.
- Browser console, network errors, layout overflow/hit-test, touch/keyboard accessibility and images captured.

### 16.4 Viewports and GPU behavior

Desktop: 1920×1080, 1366×768; tablet: 1024×768, 768×1024; mobile: 390×844, 844×390; add 320px/200% zoom if practical. Verify safe-area/notch assumptions explicitly. Test at least one normal reload, multi-toggle, resize/orientation change, tab background/foreground, SPA unmount/remount, WebGL context-loss/restore where supported. Compare screenshots after style migration.

### 16.5 Performance evidence

Include browser/OS/GPU/driver/runtime; frame-time mean and p95, min/p50/p95 FPS if measurable, render calls/draw calls, texture/geometry counts, DPR, viewport, overlay enabled/disabled, hot/cold load, heap if available. Mark any non-comparable before/after run `NOT COMPARABLE` rather than computing a fictitious percentage. Explain that headless emulation is not physical mobile benchmarking.

---

## 17 — QUALITY GATES AND STOP/REPAIR POLICY

### Gate 1: Worktree integrity

- All local user changes preserved; no arbitrary deletion of migrations, historic snapshots, package config, reusable boilerplate.
- Git diff contains only deliberate Phase 14/stabilization/refactor changes, with evidence why each file changed.

### Gate 2: Data truth and legality

- No imagery shown as real satellite data without approval/provenance/license and valid georeferencing.
- Source `reference-only` remains labelled correctly until actual survey/control points justify a higher confidence.
- No fake building/road/coastline accuracy claims.

### Gate 3: Geospatial correctness

- Pixel, affine, CRS, footprint, ENU and world signed axes tested; no double origin-offset, axis flip or silent altitude conversion.
- GCP RMSE reported distinctly from algebraic numerical accuracy.

### Gate 4: Reliability & bug regression

- Verified inherited in-scope P0/P1/P2 problems fixed and retested, or overall phase marked `PARTIAL/BLOCKED` with blocker evidence.
- No unhandled runtime error, pointer capture exception, cooldown mutation or HUD overlap in passed test scenarios.

### Gate 5: Code quality and repository structure

- Shared tokens and configs have obvious owners; type-safe import graph, no duplicated source registries, no giant misc helper dumps.
- CSS refactor preserves Tailwind/shadcn/Health compatibility and responsive UX.
- Architecture note explains why some styles/configs are centralized and some are feature-specific.

### Gate 6: Test/build/warning gates

On supported Node/pnpm/runtime, run and record exact commands:

```bash
pnpm lint
pnpm format:check
pnpm type-check
pnpm test
pnpm build
pnpm build-storybook
```

Additionally run targeted new suites and browser checks. If existing CI has separate commands, run relevant ones. **Exit 0 alone does not prove zero warnings.** Read console/stderr. If warning arises from Node 26 but supported Node 22 is clean, document both separately. Fix warnings in app-config ownership; vendor warnings may remain an explicit unresolved condition if not fixable safely, never silenced.

### Gate 7: Behavioral / visual parity

- All Phase 1–13 behavior actually present remains functional; before/after screenshots and comparisons available for modified pages.
- Browser tests cover actual 3D scene, not a mocked canvas-only React test.

### Gate 8: Performance & safety

- No obvious uncontrolled network, texture resource leak, render-loop duplicate, client bundle explosion or severe FPS regression.
- Third-party packages added only with documented reason/verification.

### Gate 9: Report credibility

- Actual test evidence paths, logs and screenshots; exact not-run scenarios and blockers identified.
- Phase result **PASS / PARTIAL / BLOCKED** backed by gates, not by optimism.

When a gate fails: reproduce → isolate owner → add failing test → implement smallest justified repair → run focused tests → rerun affected browser scenarios → full gates. Do not abandon after first failure; do not rewrite entire app to hide a defect.

---

## 18 — REQUIRED OUTPUT FILES, EVIDENCE & DOCUMENTATION

Integrate with existing docs structure. Do not write five duplicative reports with the same information. Suggested artifacts:

1. `PHASE_14_IMPLEMENTATION_REPORT.md` at repo root — single source of status.
2. `docs/audit/phase-14/BASELINE_AND_PLAN.md` — baseline/defect ledger, task order, owner/acceptance.
3. `docs/audit/phase-14/TEST_MATRIX.md` — IMG-01–72, method, actual result/evidence, blockers.
4. `docs/audit/phase-14/evidence/` — raw script outputs/screenshots/benchmark. Keep artifacts compact; do not commit huge binary raster/source data by default.
5. `docs/architecture/IMAGERY_ALIGNMENT.md` — geospatial data flow, CRS/datum, pixel reference, transforms, GCPs, data trust, optional preview.
6. `docs/architecture/STYLE_ARCHITECTURE.md` — CSS ownership, tokens, scoped rules and import diagram.
7. `docs/architecture/CONFIG_OWNERSHIP.md` — mapping config values→single owner, import boundaries, server/client safeguards.
8. Existing `docs/PHASE_STATUS.md` and `README.md` — update only if needed and factually supportable; remove stale claims without inventing full product completion.
9. Only **one** shared README or short code docs for reusable APIs; no redundant docs for every helper.

### `PHASE_14_IMPLEMENTATION_REPORT.md` minimum structure

```md
# Phase 14 — Satellite Imagery Alignment & Repository Stabilization

## Verdict: PASS | PARTIAL | BLOCKED
## Worktree / environment / package versions
## What was actually present from Phase 13
## Initial baseline: existing defects and warnings
## Fixed defects: root cause → code changes → test evidence
## Phase 14 imagery pipeline: registry → raster → CRS → GCP → alignment → preview
## Geographic truth and legal/source constraints
## Refactor review: style/config/engine before → after and why
## New packages and rationale, if any
## Test matrix and command log / exit codes
## Browser and responsive evidence with device/viewport
## Performance before/after and comparability notes
## Security and attribution checks
## Remaining limitations / blockers / cannot verify
## Git diff inventory and rollback strategy
## Handoff for Phase 15 (proposal only, no implementation)
```

Each bug fixed must show actual line/file owner and named regression proof, not only “fixed pointer issue”. Every claim “no warnings” must refer to exact environment and output log. Every new imagery source must include exact dataset ID/licensing evidence and whether asset bytes actually exist locally.

---

## 19 — FINAL SELF-REVIEW BY ALL ROLES

Have the role panel execute **one independent final review pass** over actual changed code and generated evidence:

- Architect: Is there a clear source of truth, correct boundaries and minimal file churn?
- GIS: Are CRS axis semantics, affine inverse, GCP residuals and height assumptions correct?
- Imagery expert: Is it legitimate to describe the alignment as ground-verified? Do not overstate source resolution.
- Security: Are provider domains, licenses, payload sizes, secrets and client URLs safe?
- Three.js engineer: Are renderer, textures and controls stable after preview toggles/context restoration?
- UI: Is the imagery trust state comprehensible and accessible; are no HUD controls obstructed?
- CSS: Did centralization reduce duplication without causing global style leakage?
- Config: Does each value have one owner, with client/server separation?
- QA: Can another developer reproduce every PASS? Which checks were NOT run?
- Performance: Is before/after genuinely comparable? Does new imagery hurt GPU budgets?
- DX: Do Node/pnpm/build/storybook/CI run without unexpected warnings under supported versions?
- Writer: Are documentation, Phase 13 presence and final status truthful?

If reviewers find actionable defects, fix and retest. If untestable, mark as NOT VERIFIED with concrete reason. Do not declare the entire repo universally bug-free from a finite test matrix.

---

## 20 — FINAL CODEX RESPONSE FORMAT

When work is done, respond concisely in Vietnamese with these sections:

1. **Kết quả Phase 14:** PASS/PARTIAL/BLOCKED, distinguishing implemented capability vs licensed imagery actually available.
2. **Các lỗi đã sửa:** specific before/after, evidence and remaining issues.
3. **Refactor:** old paths/new paths and net simplification; central styles/config reasoning.
4. **Tệp quan trọng:** paths to implementation and report.
5. **Test & verify:** exact commands, exit codes, browser scenarios, warnings and untested limitations.
6. **Dependencies:** exactly which packages were added/removed and why.
7. **Next step:** any owner-supplied licensed imagery/control points needed; no automatic Phase 15 execution.

**Do not** respond only with a design, a Markdown prompt, a pseudocode sketch or an “I can implement if you want” question. **Implement in the current worktree now**. Do not commit/push unless explicitly authorized. If a task is blocked by rights/source data or missing hardware, complete all safely implementable Phase 14 code and unrelated stabilization/refactor work, then report honest partial completion.

---

## 21 — OFFICIAL REFERENCES (CHECK CONTEMPORANEOUS DOCS WHEN IMPLEMENTING)

- OGC STAC: https://www.ogc.org/standards/stac/
- OGC STAC Community Standard: https://docs.ogc.org/cs/25-004/25-004.html
- GDAL raster model/GeoTransform: https://gdal.org/en/stable/user/raster_data_model.html
- GDAL GeoTIFF georeferencing: https://gdal.org/en/stable/drivers/raster/gtiff.html
- Copernicus Data Space terms: https://dataspace.copernicus.eu/terms-and-conditions
- Sentinel-2 collections: https://dataspace.copernicus.eu/data-collections/copernicus-sentinel-missions/sentinel-2
- USGS data citation/rights: https://www.usgs.gov/centers/eros/data-citation
- OpenStreetMap attribution/ODbL: https://www.openstreetmap.org/copyright
- Current local `node_modules/next/dist/docs/` and `AGENTS.md` Next.js notes take precedence over stale online Next examples.

**This is a Phase 14 implementation order, with code + stabilization + controlled refactor + verification. Start by inspecting the actual worktree and protecting owner changes, then continue all work packages through final evidence and report.**
