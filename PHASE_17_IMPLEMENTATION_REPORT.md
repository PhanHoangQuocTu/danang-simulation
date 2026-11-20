# Phase 17 — Real GIS Roads & Buildings — Implementation Report

**Status: IMPLEMENTED — PUSHED to `main` on 2026-11-20 (this commit).** *(Pre-push draft status was "IMPLEMENTED, UNCOMMITTED — push authorisation pending"; corrected in the push commit after the owner authorized the push on 2026-11-20, with the P17-19 correction below.)*
**Date:** 2026-11-20. **Local HEAD at implementation time:** `986baab`.
**Branch:** local `master`, tree had uncommitted Phase 17 work only at
that time. **Toolchain:** Node 22.23.5 / pnpm 12.14.0.
**Overall verdict: PARTIAL** — real OSM roads and buildings are
acquired, ingested and integrated behind an explicit opt-in, with all
gates passing; browser verification, geographic accuracy certification
and height/width measurement remain NOT VERIFIED.

## 1. Executive summary

Phase 17 adds the first real vector geography to the Da Nang 3D Open
World: OpenStreetMap roads and buildings for the same 3 km × 3 km
pilot window as the Phase 16 DEM (lat 16.0544, lon 108.2022). The data
was retrieved via the official OSM API map call (the Overpass API
times out from this VM), SHA-256-recorded, parsed by a deterministic
offline ingest script, and embedded as a compact 209,657-byte asset
(`src/worlds/danang/data/danang-gis-pilot.ts`).

The layer renders **1,830 road runs (178,315 m of centreline, 525
junctions)** and **418 buildings (8 extruded, 410 footprint-only)** in
**4 draw calls / 55,180 triangles**, draped on the active terrain
provider, behind `?terrain=dem&gis=real`. The synthetic world is the
unchanged default; `?gis=real` without `?terrain=dem` is a documented
no-op. F3 diagnostics gain GIS-01..GIS-08 and the checks chip moves
35/35 → 43/43.

All gates pass: lint, format:check, type-check, test (**63 files /
343 tests**, baseline 55 / 313), build (14 pages), build-storybook,
`pnpm audit --prod` (0 vulnerabilities).

**Not done / not verified (see §17):** browser QA sub-items (P17-19 NOT VERIFIED — primary QA run did not establish init at 844×390, weather live at 390×844, jump arc, or context-loss restore; see `BROWSER_QA_REPORT.md`); geographic accuracy
certification (no GCPs/RMSE); real measured widths (0 of 1,830) and
heights (1 known of 418); FPS 60 / physical device / Docker / GPU
(standing blockers).

## 2. Phase 15/16 prerequisite audit

Verdict: **SUFFICIENT as architecture / PARTIAL as product** (verified
from source before any Phase 17 edit). Full audit in
`docs/audit/phase-17/BASELINE_REPORT.md`.

Key finding: the scene contains **no synthetic buildings or roads** —
only plaza, platforms, rocks, trees, bushes, grass and fixtures. The
GIS layer is therefore purely additive by construction: nothing from
Phases 1–10 is hidden, removed or altered when GIS is on. In DEM mode
the synthetic rocks/trees/platforms were already omitted (Phase 16);
bushes, grass and fixtures stay in GIS mode exactly as in DEM mode.

## 3. Baseline

HEAD `986baab`, tree clean. Baseline test run at the start of this
phase: **55 files / 313 tests, all pass**. (Lint/format/type-check/
build/storybook/audit were passing at HEAD per the 2026-11-20
follow-up record.) Full report: `docs/audit/phase-17/BASELINE_REPORT.md`.

## 4. GIS source research

Researched live 2026-11-20. Full comparison:
`docs/audit/phase-17/GIS_SOURCE_RESEARCH.md`.

| Candidate | Verdict |
| --- | --- |
| **OpenStreetMap (ODbL-1.0)** | **Selected** — only licensable, anonymously retrievable vector source; attribution "© OpenStreetMap contributors", share-alike |
| Overpass API | Rejected as transport — times out from this VM (curl HTTP 000) |
| MONRE / DONRE official data | No public download route found (request/fee-based, in-person); formal request remains the route for authoritative geometry |
| Da Nang GIS portal / national portal (VNSDI) | No usable dataset/license metadata found (already `blocked`/candidate in the registry) |

## 5. Acquisition

- **Route:** official OSM API map call —
  `GET https://api.openstreetmap.org/api/0.6/map?bbox=108.188181,16.040844,108.216217,16.067955`
  (0.028 × 0.027 deg, well under the 0.25 deg² API limit).
- **Result:** HTTP 200, 4,128,354 bytes, SHA-256
  `b4bf752fab45898631449b837e329c5d0b64d38addfc81671c190f634848d94d`,
  14,176 nodes / 2,740 ways / 126 relations. Record:
  `docs/audit/phase-17/evidence/raw-response-record.md`.
- **No other remote fetch** was introduced. The raw 4.1 MB XML stays
  outside the repo (`/tmp/osm17/`); the deterministic ingest script
  (`evidence/ingest_osm.py`, Python stdlib only) and the asset
  generator (`evidence/generate_asset.py`) are committed as evidence.

## 6. Licence and provenance

- Licence: **ODbL-1.0**, attribution "© OpenStreetMap contributors"
  (`https://www.openstreetmap.org/copyright`); derived-database
  share-alike applies to redistribution of the derived asset.
- Registry: `osm-vector` moved `candidate` →
  `approved-for-ingestion` in `src/worlds/danang/data-sources.ts`
  with `metadataReview` (reviewer "Phase 17 GIS research (live
  verification 2026-11-20)", evidence URL the OSM copyright page),
  licence, CRS EPSG:4326, capture/verified date 2026-11-20, geographic
  bounds and coverage evidence, `capabilities.download: true`,
  permitted uses `download, display, derived-geometry`.
- The attribution travels with the data: asset header, registry entry,
  and the existing F3 source catalog.

## 7. Ingest pipeline

`ingest_osm.py` (deterministic, no network, stdlib only):

1. Parse the raw XML; index nodes; classify ways (highway / building)
   and `type=multipolygon` building relations.
2. Project lon/lat → world metres with the WGS84 math of
   `src/engine/geospatial/core.ts` (verified against it, §9).
3. Clip roads (Liang-Barsky) and building rings (Sutherland–Hodgman)
   to the pilot ENU rectangle.
4. Validate: dedupe, invalid coords, empty/invalid polygons,
   self-intersection (reject, never repair), holes, multipolygons,
   ring orientation (outer CCW, holes CW), out-of-bounds policy
   (buildings < 25% of original area after clipping are rejected).
5. Quantize to integer decimetres **then** dedupe (distinct metre
   vertices can collapse to one cell — found and fixed during this
   phase), delta-encode per feature.
6. Emit the compact asset + `ingest-report.json` with counts, tag
   coverage and every rejection with its reason.

**Rejected (5, all recorded):** 2 × `highway=proposed` (not built);
3 × buildings whose clipped area fell below 25% of the original
(OSM ids 1330673710, 1394803648, 1561346721).

## 8. Data — roads

Full report: `docs/audit/phase-17/ROAD_DATA_REPORT.md`.

- **1,830 runs from 1,827 highway ways** (3 ways split by clipping),
  **178,315 m** of centreline, 328 distinct names.
- By class: service 772, residential 619, footway 173, tertiary 97,
  primary 96, primary_link 25, secondary 21, steps 8, unclassified 5,
  tertiary_link 5, living_street 3, track 3, secondary_link 1,
  pedestrian 1, path 1.
- Tag coverage: name 685, surface 956 (asphalt 546, concrete 400),
  oneway 257 (yes 215, no 42), lanes 251, bridge 20, tunnel 2,
  maxspeed 162 (recorded, not stored), **width 0, ref 0**.
- **Widths: source 0 / estimated 1,830.** Every width is a documented
  class default (`ROAD_WIDTH_DEFAULTS_M`); the schema enforces
  `estimated ⇒ width == class default` and the decode test asserts it
  for all 1,830 runs.

## 9. Data — buildings

Full report: `docs/audit/phase-17/BUILDING_DATA_REPORT.md`.

- **418 buildings** (417 ways + 1 multipolygon), total footprint
  249,686 m². Largest: Nhà ga Quốc tế T2 (24,346 m²), Nhà ga Quốc nội
  T1 (15,830 m²), AEON Mall Đà Nẵng (9,473 m²).
- By kind: yes 366, temple 11, roof 7, residential 6, apartments 5,
  university 4, hospital 3, others ≤ 2.
- **Heights: known 1 (21 m, explicit `height` tag), estimated 7
  (`building:levels` × 3.0 m/level — a documented assumption, not a
  measurement; tallest is the 28-level Hoàng Anh Gia Lai apartment at
  84 m estimated), unknown 410 = footprint-only, rendered flat, never
  extruded at an invented height.** Of the 9 `building:levels` tags:
  1 superseded by the explicit height, 1 on a rejected building, 7 used.
- 1 building has a hole (preserved). `min_height` / `roof:shape`: 0
  buildings carry either tag; all roofs render flat.

## 10. Georeferencing

Full report: `docs/audit/phase-17/GEOREFERENCING_REPORT.md`.

- Source EPSG:4326 → EPSG:4979/4978 → ENU → world, anchor
  16.0544 / 108.2022. No duplicate transform: the runtime never
  converts lon/lat; projection happened once at ingest.
- Verified by 4 checkpoints (anchor, bbox NW/SE, node 420248139)
  against `geoToWorld` in the decode test, ±1 mm — **math
  consistency, not ground-truth certification** (no GCPs).
- Clip extends ≤ 0.21 m beyond DEM coverage on the west edge; the GIS
  sampler clamps into coverage (sub-cell shift vs 30 m cells). 0
  features skipped for missing elevation.

## 11. Architecture

| Piece | Location | Notes |
| --- | --- | --- |
| Types + width table | `src/engine/gis/type.ts` | Pure data; `ROAD_WIDTH_DEFAULTS_M`, `METERS_PER_LEVEL = 3` |
| Zod schemas | `src/engine/gis/schema.ts` | Strict; width/height provenance enforced |
| Compact decoder | `src/engine/gis/decode.ts` | Delta-encoded dm tuples → validated features |
| Normalization | `src/engine/gis/normalize.ts` | Dedupe, self-intersection, junctions, stats |
| Geometry | `src/engine/gis/geometry.ts` | Ribbon draping, junction discs, extrusion, merge |
| Asset | `src/worlds/danang/data/danang-gis-pilot.ts` | 209,657 bytes; 1,830 + 418 tuples |
| Mode | `src/worlds/danang/gis-mode.ts` | `?gis=real` exact opt-in |
| Layer | `src/worlds/danang/gis-layer.ts` | 4 merged meshes, scope-owned |
| Scene wiring | `src/worlds/danang/scene.ts` | Builds layer only when `gisEnabled && terrain.isGeographic` |
| Runtime | `src/modules/WorldExplorer/runtime/world.ts` | `gisMode` option; `getActiveGisLayer()` / `getActiveGisMode()` |
| Hook | `src/modules/WorldExplorer/hooks/useWorldExplorer.ts` | Passes `resolveGisMode(window.location.search)` |
| Diagnostics | `src/modules/WorldExplorer/gis-diagnostics.ts` | GIS-01..GIS-08 |
| HUD | `src/modules/WorldExplorer/components/WorldHud.tsx` | GIS details block; checks chip 43/43 |

Geometry policies (all documented in code): road ribbons +0.08 m
above sampled terrain, junction discs +0.09 m, footprints +0.05 m;
centreline subdivided to ≤ 10 m for draping; building foundation =
minimum sampled elevation under the footprint; junction discs at
coincident endpoints with radius = widest incident half-width
(T-junctions need no disc — the crossing ribbons already close the
gap); merged geometries give 4 draw calls for the whole pilot.

## 12. F3 diagnostics

GIS-01 mode (pass when the layer state matches the request — a
requested-but-not-built layer **fails**), GIS-02 asset decoded
(1,830 / 418), GIS-03 runtime normalization clean (0 newly rejected),
GIS-04 junctions (525), GIS-05 roads draped (1,830/1,830), GIS-06
buildings placed (418/418), GIS-07 height provenance (known 1 /
estimated 7 / unknown 410, footprint-only 410), GIS-08 width
provenance (source 0 / estimated 1,830). When GIS is off, GIS-02..08
pass vacuously as "not applicable" (the established TER-09 pattern),
so the default world never reports GIS failures for a layer nobody
asked for.

## 13. Gates

| Gate | Result |
| --- | --- |
| `pnpm lint` | exit 0 (461 files) |
| `pnpm format:check` | exit 0 (460 files) |
| `pnpm type-check` | exit 0 |
| `pnpm test` | exit 0 — **63 files / 343 tests** (baseline 55 / 313; +8 files / +30 tests) |
| `pnpm build` | exit 0 — 14 pages |
| `pnpm build-storybook` | exit 0 — completed successfully |
| `pnpm audit --prod` | exit 0 — 0 vulnerabilities |

Four existing tests were updated to the new state, none weakened
(see `docs/audit/phase-17/TEST_MATRIX.md`): checks chip 35/35 →
43/43 (2 files), registry `canIngest`/permittedUses + no-evidence
escalation source, overpass denial source.

## 14. Performance

Full report: `docs/audit/phase-17/PERFORMANCE_REPORT.md`. Layer
cost: roads 42,966 triangles, junctions 10,500, extruded buildings
160, footprints 1,554 — **55,180 triangles in 4 draw calls**.
Asset decode ~0.4–0.6 s in the test run (includes Zod validation of
2,248 features). No browser FPS measured (P17-18 PARTIAL). Browser QA ran 2026-11-20: 12/12 combos operationally PASS on error counts (P17-19 NOT VERIFIED — primary run: `worldInitialised=false` at 844×390 in both modes, `weatherLive=false` at 390×844 in both modes and at 844×390 in GIS mode, jump arc and context-loss restore not established; re-probe got checks 43/43 at 844×390 after 3.3 s — see `BROWSER_QA_REPORT.md`).
Asset is 209,657 bytes, ~5% over the < 200 KB target (payload
192,783 bytes; the rest is the TS provenance header and formatting)
— no data was dropped to hit the number.

## 15. What changed, file by file

New: `src/engine/gis/{type,schema,decode,normalize,geometry}.ts`
+ `__tests__/` (4 files); `src/worlds/danang/data/danang-gis-pilot.ts`;
`src/worlds/danang/{gis-mode,gis-layer}.ts` + `__tests__/` (2 files);
`src/modules/WorldExplorer/gis-diagnostics.ts` +
`__tests__/gis-diagnostics.test.ts` + `__tests__/gis-scene.test.ts`;
`docs/audit/phase-17/` (9 reports + `evidence/` with the ingest
script, asset generator, ingest report and raw-response record);
this report.

Modified: `src/worlds/danang/{scene,data-sources}.ts`,
`src/modules/WorldExplorer/{runtime/world,hooks/useWorldExplorer,components/WorldHud}.ts(x)`,
`src/messages/{en,vi}/worldExplorer.json` (8 GIS keys each),
4 existing test files (see §13), `docs/PHASE_STATUS.md` (Phase 17
only). No other files touched. No dependencies added (Three.js
`Shape`/`ExtrudeGeometry` triangulation is used; no earcut).

## 16. Known issues

See `docs/audit/phase-17/KNOWN_ISSUES.md`. Headline items: jump arc and context-loss restore unverified in browser QA; geographic accuracy not certified; all widths estimated;
410/418 buildings footprint-only; bridge/tunnel/oneway stored but not
behavioural; roofs flat; asset ~5% over the size target; standalone
127.0.0.1 loop still FAIL (upstream).

## 17. Acceptance matrix P17-01..P17-22

**Criterion texts:** taken verbatim from §23 of the Phase 17 master
prompt (P17-01..P17-22).

| ID | Criterion | Status | Evidence |
| --- | --- | --- | --- |
| P17-01 | Phase 15/16 prerequisites audited | **PASS** | §2; `BASELINE_REPORT.md` — contracts verified from source; verdict SUFFICIENT as architecture / PARTIAL as product |
| P17-02 | GIS source research completed | **PASS** | §4; `GIS_SOURCE_RESEARCH.md` (OSM + official Vietnamese datasets, live sources) |
| P17-03 | Dataset license and attribution verified | **PASS** | §6; ODbL-1.0 verified live at openstreetmap.org/copyright; attribution in asset, registry and F3 catalog |
| P17-04 | Geographic pilot area established | **PASS** | §5/§10; pilot bbox lon 108.188181–108.216217, lat 16.040844–16.067955, same window as the DEM pilot |
| P17-05 | Road data schema implemented | **PASS** | §11; strict Zod road schema, width/provenance enforced; `schema.test.ts` |
| P17-06 | Building data schema implemented | **PASS** | §11; strict Zod building schema, height/provenance enforced; `schema.test.ts` |
| P17-07 | Geometry normalization implemented | **PASS** | §7/§11; dedupe, clipping, self-intersection rejection, multipolygons, orientation; `normalize.test.ts` |
| P17-08 | Coordinate transformations validated | **PASS** | §10; 4 checkpoints vs `geoToWorld` ±1 mm — math consistency, not ground-truth certification |
| P17-09 | Road geometry generated | **PASS** | §8/§11; 1,830 draped ribbons, 178,315 m, 0 skipped; `geometry.test.ts`, `gis-layer.test.ts` |
| P17-10 | Road intersections handled | **PASS** | §8/§11; 525 coincident-endpoint junctions merged into discs; T-junction coverage reasoned and documented |
| P17-11 | Road terrain alignment implemented | **PASS** | §11; ≤ 10 m subdivision + provider sampling + 0.08 m lift; 0 skipped on DEM |
| P17-12 | Building footprints rendered | **PASS** | §9/§11; 418 footprints, 1 hole preserved; 0 skipped |
| P17-13 | Building height provenance preserved | **PASS** | §9; known 1 / estimated 7 / unknown 410, enforced by schema and asserted by tests; no height invented |
| P17-14 | 3D building geometry implemented | **PASS** | §11; 8 extrusions (flat roofs, documented), 410 footprint-only |
| P17-15 | Building terrain alignment implemented | **PASS** | §11; foundation = min sampled elevation under footprint; 0 skipped on DEM |
| P17-16 | Three.js resource ownership correct | **PASS** | §11; all geometries/materials scope-owned, 4 merged meshes; disposed with the runtime scope; `gis-scene.test.ts` disposes |
| P17-17 | GIS diagnostics integrated | **PASS** | §12; GIS-01..GIS-08 in F3, checks chip 43/43; `gis-diagnostics.test.ts` |
| P17-18 | Performance evaluated | **PARTIAL** | §14; construction-time geometry cost measured (55,180 triangles, 4 draw calls); no browser FPS — no GPU in this VM |
| P17-19 | Browser QA completed | **NOT VERIFIED** | §14; `BROWSER_QA_REPORT.md` — 12/12 combos ran with 0 page errors, 0 failed requests, 0 console errors; GIS 8/8, checks 43/43, roads/buildings visible, weather LIVE at most viewports. But the primary run did NOT establish: init at 844×390 (`worldInitialised=false`, timeToInit ~49 s, both modes — a re-probe got checks 43/43 after 3.3 s, so the world does run there, but the primary run's init signal failed); weather live at 390×844 (`weatherLive=false`, both modes) and at 844×390 in GIS mode (likely Open-Meteo 429, consistent with the pattern, not proven); jump arc on GIS terrain (no airborne phase captured — bare Space does nothing unless the Jump button is focused); WebGL context-loss restore (`restoreContext.ok=false`, reason `no-lose-context-ext`, `afterRestore` position/geoHeight null). *(Correction 2026-11-20, pre-push: the draft marked this PARTIAL and said "lose/restore both return ok"; re-reading the QA JSON directly shows `restoreContext.ok=false`, so the criterion is NOT VERIFIED.)* |
| P17-20 | Phase 01–16 regression verified | **PASS** | §13; 63 files / 343 tests, exit 0; no test weakened; build + storybook pass |
| P17-21 | Security and licensing preserved | **PASS** | §6; only the OSM API was used (no scraping, no bypassed auth/payment); ODbL-1.0 + attribution; no new dependency; no secrets |
| P17-22 | Documentation completed | **PASS** | This report + `docs/audit/phase-17/` (9 reports + evidence, incl. `BROWSER_QA_REPORT.md`); `docs/PHASE_STATUS.md` updated (Phase 17 only) |

**Tally (P17-01..P17-22): 20 PASS, 1 PARTIAL, 1 NOT VERIFIED, 0 FAIL.** *(Correction 2026-11-20, pre-push: P17-19 was PARTIAL in the draft; re-reading `browser-qa-2026-11-20.json` directly showed `worldInitialised=false` at 844×390, `weatherLive=false` at 390×844, and `restoreContext.ok=false`, so P17-19 is NOT VERIFIED. The draft's "lose/restore both return ok" was incorrect.)*
