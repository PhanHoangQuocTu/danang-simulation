# Phase 11: geospatial and environmental audit

## Evidence scope

This is a static source audit of the current application, not the archived Phase 10 application. CodeGraph returned current line-numbered source; direct reads filled only omitted anonymous runtime sections. No runtime, browser, live provider, test, or performance PASS is claimed here. The coordinating report owns executed checks and browser observations. No application source, dependency, configuration, or historical file was changed by this audit.

## Source of truth and current world

The application composes `createWorldRuntime` in `src/modules/WorldExplorer/runtime/world.ts:86`; it creates the renderer, `createDaNangScene`, and `createEnvironmentSystem` at lines 112–115. The engine controller receives the synthetic elevation/support/collision functions at lines 138–145. Generic engine code receives these world policies as dependencies.

| Current item | Actual representation | Evidence |
|---|---|---|
| World origin | Synthetic plaza at `[0,0,0]`, not a surveyed geographic origin | `src/worlds/danang/zones/manifest.ts:37–39`; `src/worlds/danang/scene.ts:283–305` |
| Local X/Z and scale | Local meter convention; X east and negative Z north in sun/wind direction mappings | `src/worlds/danang/environment/solar.ts:163–168`; `src/worlds/danang/environment/simulation.ts:246–249`; `src/world-core/schemas/manifest.ts:25,53` |
| Terrain elevation | Trigonometric hills, flattened spawn, synthetic outer rim | `src/worlds/danang/zones/synthetic.ts:getTerrainElevation`, lines 43–48 |
| Terrain mesh | 180 m square, 128 segments per side; vertices sample the synthetic function | `src/worlds/danang/scene.ts:223–240` |
| Boundary | 68 m radius passed to character controller | `src/engine/core/const.ts:44`; `runtime/world.ts:138–142` |
| Plaza and trail | Procedural cylinders/rings and sine-path stepping stones | `scene.ts:283–325` |
| Buildings/structures | Five synthetic stepped box platforms and origin fixtures; no city buildings inferred | `zones/synthetic.ts:3–9`; `scene.ts:382–411,534` |
| Trees and vegetation | Fixed collider positions, procedural crowns, shrubs and instanced grass | `zones/synthetic.ts:22–41`; `scene.ts:419–531`; `environment/simulation.ts:331–357` |
| Colliders | Boxes and cylinders in local meters; synthetic support height | `zones/synthetic.ts:51–109` |
| Player position | Mutable Three.js local Vector3, emitted as x/y/z snapshot | `runtime/world.ts:30–35,433–445` |
| Mini Map | Orthographic local scene overview with local x/z projection, zoom and follow center | `runtime/world.ts:251–281,352–391`; `src/engine/core/const.ts:46–57` |
| Real-world references | Fixed Da Nang latitude 16.0544, longitude 108.2022, time zone; used for solar/weather queries | `src/worlds/danang/const.ts:1–10`; `weather/service.ts:6–31`; `environment/solar.ts:128–130` |
| Verified geographic assets | None established by this evidence. The one manifest source explicitly has confidence S and null CRS/datum/date/accuracy | `zones/manifest.ts:5–18` |

The city's name and weather location do not georeference any terrain, collider, road, fixture, or vegetation object.

## Geographic readiness

| Category | Existing capability | Missing prerequisite / risk | Assessment |
|---|---|---|---|
| Coordinate System / WGS84 | Latitude/longitude constants for weather and sun | No WGS84-to-ECEF-to-ENU or inverse contract; no altitude datum or geographic origin record | Missing geospatial core |
| Local ENU / origin | Meter convention, Y up, north aligned to negative Z in atmosphere | No typed ENU space, explicit render mapping, origin version, zone transform or rebasing protocol | Partial foundation |
| Scale | Manifest assets specify meters; speeds and dimensions use local meter convention | No imported-asset normalization or survey calibration proof | Implemented convention; external accuracy NOT VERIFIED |
| Elevation | Shared height callback used by mesh, player and camera | No DEM sampling, nodata policy, resolution, vertical datum or height interpolation contract | Synthetic only |
| Terrain | Height function can be supplied to the controller | City scene and camera still import concrete synthetic sampling; no tiled surface provider or datum integration | Partial seam, not real terrain ready |
| Buildings | Prefab/element transform schema and factory seam | No footprints, polygon holes, semantic height, levels, roof, source CRS or building dataset | Missing |
| Roads | Synthetic footpath | No GIS centerlines, topology, widths, grade, intersection or bridge elevation policies | Missing |
| Coastline / rivers / bridges | No georeferenced representation established | Survey/source data, hydrography, water level datum, bridge support and clearance | Missing |
| Landmarks / POIs | Interactable test fixtures | No verified landmark assets or geographic POI identifiers and placement | Missing |
| Vegetation | Procedural trees and grass | No geographically referenced species/placement dataset or accuracy record | Synthetic only |
| Satellite | Procedural grass/stone textures | No georeferenced imagery, CRS, pixel resolution, acquisition/coverage metadata, ground control points or alignment verification | Missing |
| Streaming | `PrefabRegistry.loadZone` validates and returns disposable instance handles with rollback | Synchronous eager zone creation only; no spatial loading policy, async cancellation, budgets, eviction or origin transforms | Partial foundation |
| Accuracy | Provenance supports nullable accuracy/confidence/verification dates | Current source has null accuracy and verification; no control-point residual or dimension audit | Not established |
| Provenance | Strict source/license/CRS/datum/date/confidence schema with referential integrity | Coverage currently only synthetic rock instances; remaining procedural scene lacks manifest provenance; asset URI is not proof of a loaded or licensed asset | Partial foundation |

Schema evidence: `src/world-core/schemas/manifest.ts:6–26,39–98`. Zone creation/rollback/disposal evidence: `src/world-core/registries/prefabs.ts:18–52`. Current zone selection is eager at `scene.ts:414–417`.

Technology compatibility is prospective: OSM can provide road/building inputs after license and transform rules; licensed imagery needs georeferencing and permitted delivery; Copernicus DEM needs sampling/nodata/vertical-datum decisions; Cesium terrain/3D Tiles needs a format/coordinate/streaming adapter and memory budget; photogrammetry/LiDAR needs source CRS, survey control, scale and decimation; GLB needs units, axis, transform, compression and ownership policies. None is installed or integrated by this audit. A later phase must select data and tools explicitly.

## Environmental coupling

Every implemented row below is source-inspected only. “Implemented but Not Verified” means runtime visual behavior and physical accuracy were not verified here.

| Interaction | Status | Actual connection and limit | Evidence |
|---|---|---|---|
| Time → Sun | Implemented but Not Verified | Da Nang date/time feeds approximate solar equation, declination/hour angle, azimuth/altitude and direction; runtime refreshes solar at 1 s cadence | `environment/solar.ts:101–223`; `runtime/world.ts:299–302` |
| Sun → Lighting | Implemented but Not Verified | Daylight/twilight drive directional, hemisphere and ambient intensity/color; exponential dt interpolation | `environment/simulation.ts:90–123,184–212` |
| Sun → Shadows | Partially Implemented | Shadow-casting directional light follows solar direction and player target, but sun height is clamped to 0.14 and switches to approximate opposite-sun moon direction at night; fixed shadow extent is not city-scale coverage | `simulation.ts:141–171`; `scene.ts:205–218` |
| Cloud → Sunlight | Partially Implemented | Global cloud percentage/category attenuates directional intensity; individual cloud geometry does not occlude sunlight physically | `simulation.ts:93–97,184–189`; `scene.ts:115–158` |
| Wind → Rain | Implemented but Not Verified | Meteorological direction is reversed to travel direction; km/h becomes m/s; rain drift and streak tilt use horizontal components | `simulation.ts:242–249,277–322` |
| Wind → Vegetation | Implemented but Not Verified | Direction rotates tree crowns/grass; weighted mean/gust speeds determine wave amplitude/frequency | `simulation.ts:325–357` |
| Wind → Clouds | Implemented but Not Verified | Horizontal drift scaled from wind speed with 0.45 minimum, wrapped around player | `simulation.ts:260–274` |
| Rain → Ground | Partially Implemented | WMO effects interpolate only terrain material roughness/metalness. No accumulation/drying model, surface classification, rain terrain impact, or platform wetness. Precipitation fallback can start particles without changing category wetness | `simulation.ts:234–237,277–280,300–312`; `mapper.ts:12–20,121–129` |
| Rain → Water | Missing | No water surface/system exists in the audited current scene; no ripple, splash or hydrology coupling | `scene.ts:createDaNangScene`; `simulation.ts:createEnvironmentSystem` |
| Weather → Visibility | Partially Implemented | WMO category drives exponential fog density; no measured visibility field is requested or validated | `simulation.ts:214–222`; `weather/service.ts:10–23` |
| Weather → Lighting | Implemented but Not Verified | Category effects and cover drive sky color, intensity, stars, moon opacity and occasional lightning flashes | `simulation.ts:99–130,149–212` |

### Cadence, wind, rain and cost

- **Clock:** HUD wall clock ticks every second and refreshes on foreground; renderer computes a separate solar snapshot at most once per second. Both call the same clock/solar helpers, but there is no shared atomic snapshot (`hooks/useWorldExplorer.ts:46–47,178–190`; `runtime/world.ts:158,299–302`).
- **Weather data:** client polls every 15 minutes only while visible; foreground refresh checks fetch age. BFF caches validated observations for 900 seconds. First request, cache reuse and cache revalidation are data events, not new observations (`hooks/useWorldExplorer.ts:216–234`; `src/app/api/weather/route.ts:4–13`; `GAME_CONFIG:41–43`).
- **Weather animation:** `environment.update(dt, now, ...)` executes each render-loop update with the most recent observation. Hidden-page/context-loss runtime stop is handled separately. Frame updates do not refetch meteorological data (`runtime/world.ts:342,461–485`).
- **Wind vector:** horizontal travel vector is computed locally from meteorological bearing; there is no vertical wind, spatial field, turbulence or height profile (`simulation.ts:242–249`).
- **Gusts:** vegetation uses `0.7 * windSpeed + 0.3 * windGusts`; this is a visual mean/gust blend, not a time-varying observed gust event. Cloud/rain drift use mean speed (`simulation.ts:260,286–287,325–329`).
- **Clouds:** 24 procedural clusters with 4–6 puff meshes each; shared geometry/material. Player-relative wrapping is visual atmosphere, not meteorological advection volume (`scene.ts:115–158`; `simulation.ts:263–274`).
- **Rain:** one line-segment buffer preallocates 3,200 drops, category controls count/fall speed; quality reduces active count. CPU updates six float components per active drop each frame. Drop heights wrap relative to player instead of terrain, roofs or platforms (`scene.ts:160–195`; `simulation.ts:277–322`; `runtime/world.ts:416–423`).
- **Vegetation:** tree crowns update every frame; grass updates alternating batches inside 32 m and uploads instance matrices when changed (`simulation.ts:331–357`). Vegetation is visual; wind does not affect player motion or collision.
- **Wet surfaces:** terrain-only global roughness/metalness target changes smoothly using `1-exp(-3.5*dt)`. Wetness is category-derived, not measured soil moisture; no wet friction (`simulation.ts:115,234–237`).
- **Lighting:** colors/intensities interpolate at frame cadence. Light position and sun disc direction update from 1 s solar samples; low-sun clamp is an artistic stability approximation. Moon is the opposite sun direction with a minimum elevation, not a lunar ephemeris (`simulation.ts:132–171`).
- **Physics coupling:** controller receives terrain/collision policy and fixed physics constants, not weather. No wind force, precipitation friction, flooding or foliage collider deformation (`runtime/world.ts:138–145,303,342`; `src/engine/core/const.ts:3–17`). This is a missing future physical feature, not an established Phase 1–10 regression.
- **Performance cost:** bounded particle allocation, shared cloud resources and grass batching are visible optimizations. CPU/GPU time, draw calls attributable to environment, GPU memory, FPS and frame time are **NOT AVAILABLE** from static evidence. They must be measured in the coordinating runtime baseline.

## Weather trust boundary and lifecycle

| Concern | Static behavior / limit | Evidence |
|---|---|---|
| Fixed upstream / SSRF | Fixed HTTPS Open-Meteo URL, fixed Da Nang location/query; BFF rejects every query string; redirects rejected | `weather/service.ts:6–31`; `weather/provider.ts:5–15`; `api/weather/route.ts:6–11` |
| Secrets | This path needs no API key and accepts no credentials or user-selected backend | Same source |
| Timeout and payload bounds | Provider aborts after 10 s; checks content length and streamed 256 KiB bound; reader lock and timer cleaned | `weather/provider.ts:4,7–45` |
| Non-2xx / empty / invalid JSON | Throws; BFF returns 502 unavailable; no fabricated observation emitted | `provider.ts:16–43`; `route.ts:14–18` |
| Missing / NaN / Infinity / ranges | Zod requires all current numeric fields, finite numbers, explicit ranges, supported integral WMO codes and binary is_day before historical normalizer | `weather/validation.ts:4–39` |
| Optional sunrise/sunset | Optional arrays; missing values format as `--:--`; calculated sun remains separate | `validation.ts:28–30`; `service.ts:84–109` |
| Stale data | Age uses older of fetch and observation timestamp, threshold 25 minutes; failure retains previous reading but marks stale; 1 s clock effect also ages existing values | `weather/freshness.ts:4–9`; `hooks/useWorldExplorer.ts:199–213,235–245` |
| Cache timestamp integrity | Only normalized results cached; original fetch/observation timestamps survive cache reuse; HTTP response itself no-store | `route.ts:4–13` |
| Retry | Three attempts total, each 10 s, delays 1 s then 2 s, abort-aware wait; no status-specific retry distinction | `weather/client.ts:5–36` |
| Duplicate / race handling | Every refresh aborts previous controller; post-fetch/post-error abort checks suppress replaced result; unmount clears poll and aborts request | `hooks/useWorldExplorer.ts:191–234` |
| Renderer binding lifecycle | Runtime generation guard suppresses old snapshot/status callbacks; cleanup clears refs and disposes old instance | `hooks/useWorldExplorer.ts:132–177` |
| Weather unavailable UI | Null reading renders unavailable/loading label and the no-observation temperature placeholder; expanded widget exposes error/retry. Compact retains icon/time/temperature placeholder | `WorldHud.tsx:246–330` |
| WebGL lifecycle | Renderer context loss stops loop; restore resizes/restarts; runtime hook classifies initialization failure. Browser recovery and console cleanliness remain NOT VERIFIED here | `runtime/world.ts:461–485`; `hooks/useWorldExplorer.ts:162–167` |

Existing automated test source covers field rejection, stale timestamps, optional solar values, provider URL/redirect policy, streamed size cap and provider abort (`src/integrations/weather/__tests__/weather.test.ts:26–91`). Reading tests is not executing them. It does not prove browser fetch sequencing, production cache revalidation, current provider reachability or all lifecycle/error branches.

## Findings and remediation proposals

No P0/P1 defect is established by this static sub-audit. This is not a runtime stability claim.

### ENV-01 — BFF response has only partial client runtime validation

- **Severity:** P2. **Category:** Technical Debt / reliability boundary gap. **Affected phase:** Current weather integration; not proven historical regression.
- **File / symbol / lines:** `src/integrations/weather/client.ts:fetchWeather:9–16`; consumers `WorldHud.tsx:72,262,347`; `environment/simulation.ts:93,96,242–249`.
- **Current behavior:** Client accepts a response if only temperature and fetch timestamp are finite and validationStatus is valid. It trusts all other fields, nested mapped/effects, timestamps and category through a TypeScript generic.
- **Expected behavior:** Any accepted serialized observation satisfies the complete normalized contract before HUD or renderer consumption.
- **Reproduction:** For a future authorized negative integration test, intercept the BFF response with the three checked fields but omit `mapped` or provide nonfinite wind data. The check admits it; consumers dereference `mapped.category`/effects or propagate invalid numbers. No such synthetic response was injected during this audit.
- **Root cause:** Server payload validation protects the provider boundary, while the client uses an unchecked nominal type for the distinct serialized BFF boundary.
- **Impact:** Contract drift, corrupted proxy/cache responses or a future route regression can break UI/rendering instead of reporting unavailable weather. Current valid BFF output is not shown to fail.
- **Recommended fix:** Reuse a shared complete normalized-observation validator without reintroducing historical fallback values; reject malformed nested data and preserve prior stale observation.
- **Proposed target phase:** Owner-approved maintenance before expanding provider contracts, or early subsequent reliability work. Do not implement during Phase 11.
- **Verification method:** Negative boundary tests for missing/nested/malformed fields, plus browser error-state and race tests. Current runtime manifestation: NOT VERIFIED.

### ENV-02 — Calendar dates are shape-checked, not strictly validated

- **Severity:** P3. **Category:** Technical Debt / validation gap. **Affected phase:** Current strict live validation.
- **File / symbol / lines:** `src/integrations/weather/validation.ts:localTime:8`, `normalizeLiveWeather:33–39`.
- **Current behavior:** Time regex accepts any two-digit calendar parts, then Date.parse checks finiteness and future time. JavaScript may normalize impossible dates such as February 30 into March. Daily times are only shape-checked and formatted by slicing.
- **Expected behavior:** Accepted observation date represents exactly the supplied local calendar timestamp; impossible daily times are rejected or explicitly unavailable.
- **Reproduction:** A future authorized validator test should use an impossible day for a past month with otherwise valid fields and compare parsed date components to input. No fixture response was created or served in this audit.
- **Root cause:** Regex validates shape; Date.parse is not a strict calendar round-trip validator.
- **Impact:** A malformed upstream timestamp can appear valid or have misleading freshness; no real upstream malformed date observed.
- **Recommended fix / target:** Strict component/calendar validation and timezone conversion tests in later reliability work; retain current failure behavior and do not fabricate a replacement date.
- **Verification method:** Leap/nonleap February, month/day/hour bounds, future tolerance and daily timestamp tests. Runtime occurrence: NOT VERIFIED.

### ENV-03 — Visual atmosphere is not a physical environmental model

- **Severity:** INFO. **Category:** Missing Feature / future enhancement. **Affected phase:** Future environment work, not a demonstrated Phase 1–10 bug.
- **File / symbol / lines:** `createEnvironmentSystem`, `simulation.ts:234–237,260,277–357`; `runtime/world.ts:138–145,303,342`.
- **Current behavior:** Ground wetness is category-based material interpolation; rain wraps relative to player; clouds have minimum drift; gust affects vegetation blend; no water/physics coupling.
- **Expected future behavior:** Clearly separate observed meteorology from visual policy and any validated physical dynamics.
- **Reproduction:** Static call/data-flow inspection demonstrates these limits; visual appearance, terrain penetration and cost still need runtime observation.
- **Root cause:** Current system is a bounded synthetic visual prototype.
- **Impact:** Unsuitable for claims of measured hydrology, soil wetness, building shelter or citywide meteorology.
- **Recommended fix / target:** Preserve current behavior, document fidelity, then scope terrain/roof rain contacts, wetness persistence and water response only after geospatial terrain and product requirements exist; proposed Phase 13–20 environmental follow-on.
- **Verification method:** Later acceptance scenarios with real observations, ground/roof geometry and physical-unit budgets. Current runtime status: NOT VERIFIED.

### GEO-01 — Synthetic coordinate contract cannot ingest geographic zones

- **Severity:** INFO. **Category:** Missing Feature / Phase 12 prerequisite.
- **File / symbol / lines:** `zoneSchema`, `src/world-core/schemas/manifest.ts:50–59`; `syntheticManifest`, `zones/manifest.ts:35–39`; terrain/controller references above.
- **Current behavior:** Schema permits only `synthetic-local-meters`; zone origin is metadata and loader passes element transforms directly to factories. No geographic conversion is called.
- **Expected future behavior:** Explicit coordinate and origin contracts translate validated geographic inputs to local rendering coordinates once.
- **Reproduction / root cause:** Static schema rejects a geographic coordinateSpace; loader iterates elements without applying origin (`registries/prefabs.ts:18–42`). Existing zero origin avoids a current placement defect.
- **Impact:** Geographic data cannot safely be inserted as lat/lon, ECEF coordinates or nonzero-origin zone data.
- **Recommended fix / target:** Phase 12 core design below; retain synthetic mode as a separate compatibility adapter.
- **Verification method:** Round-trip, axis, origin and nonzero-zone placement tests plus unchanged synthetic regression suite. No Phase 12 implementation performed.

## Proposed Phase 12 — Geospatial Core Architecture (design only)

### Scope and invariants

Build only coordinate contracts, pure conversions, origin records and adapters to the existing runtime. Keep synthetic Phase 1–10 placement and behavior. Do not acquire/render city datasets, add map engines, introduce a second weather/clock system, replace the controller, or implement streaming/terrain production in Phase 12. Owner approval is required before implementation.

### Architecture and coordinate decisions

1. Add a framework-independent geospatial core beside the existing world-core seams. Pure math must not import React, Next.js or Da Nang content. Da Nang composition selects its origin and supplies adapters.
2. Define distinct types for WGS84 geodetic degrees plus ellipsoid height in meters, ECEF meters, ENU meters, render-local meters and zone-local meters. Include origin ID/version where a coordinate depends on a frame. Reject ambiguous untagged tuples at public boundaries.
3. Use WGS84 ellipsoid constants explicitly: semi-major axis 6,378,137 m and flattening 1/298.257223563. Convert geodetic to ECEF, subtract origin ECEF in double precision, then rotate to ENU. Provide the inverse using a documented convergence/edge policy. Avoid flat degrees-to-meters approximations for the authoritative conversion.
4. Keep renderer axes compatible: render x = East, y = Up, z = -North. A named adapter owns this mapping; do not scatter sign changes across minimap, weather or controller code. Existing solar/wind signs must remain consistent.
5. Start with one fixed, versioned origin chosen and documented by the owner. The existing weather coordinate is only a candidate reference; do not claim it is surveyed or assign invented altitude. Record source, WGS84 latitude/longitude and ellipsoid height, CRS, vertical datum and validation date/confidence. If authoritative origin height is unavailable, label the mode unverified and keep real terrain ingestion blocked.
6. Use double precision for CPU geodetic/ECEF/ENU math; upload bounded local floats to GPU. Specify supported world extent and numeric error budget before implementation. Evaluate rebasing as a future design, not an automatic Phase 12 feature. Never write city-scale ECEF values directly to mesh Float32 buffers.
7. Evolve manifest coordinateSpace as a versioned discriminated contract preserving existing version-1 synthetic data. Geographic and ENU zones require matching origin IDs and explicit bounds; zone origin transforms apply exactly once. Maintain separate source/provenance metadata and runtime placement transforms.

### Terrain, player and map compatibility

- Introduce a narrow surface-sampling contract capable of `height`, validity/nodata, normal and source/frame metadata. Adapt the existing mathematical terrain first. Renderer, player support, camera clearance and placement must use the same sampling/frame conversion. No automatic elevation-zero fallback for missing DEM.
- Decide ellipsoid-versus-orthometric heights before importing any DEM. Require declared datum and an approved geoid transformation when needed. A terrain adapter may remain absent in Phase 12; coordinate compatibility does not mean surveyed terrain is available.
- Keep the controller authoritative in render-local meters. Derive geographic player coordinates from a versioned origin snapshot for display/integration; do not feed rounded geographic UI values back into physics each frame. Reset, teleport and future zone transfers must convert once, atomically.
- Preserve current orthographic Mini Map capture. Convert authoritative ENU positions into the same render frame before projecting. Validate four cardinal directions, heading, camera bounds, follow/overview, zoom and edge clipping. Future satellite alignment requires CRS/geotransform metadata and control points and remains separate.
- Define integration units for bearings, radians/degrees, elapsed seconds, km/h, m/s and heights. Keep the current weather provider fixed to its existing location in Phase 12 unless a separately authorized product change requires otherwise.

### Validation and test plan

| Test group | Required cases and evidence |
|---|---|
| Input boundary | Finite numeric values only; latitude [-90,90], explicit longitude wrap/reject policy, declared altitude units/datum, invalid/missing origin IDs, no unknown coordinate spaces |
| WGS84 ↔ ECEF | Independently sourced equator/pole/reference vectors; both hemispheres; date line; altitude extremes; inverse convergence and unsupported center-of-earth input |
| ECEF ↔ ENU | Origin maps to zero; orthonormal basis; positive east/north/up; inverse round trips; independently reviewed tolerances |
| Precision | Round-trip bounds across declared Da Nang extent, near origin and zone edges; assess CPU error and GPU local float precision separately |
| Render adapter | x=E/y=U/z=-N; heading and wind/solar cardinal signs; no double conversion |
| Zones | Nonzero zone origin, inter-zone continuity, mismatched origin versions, bounds and provenance validation; version-1 synthetic manifest unchanged |
| Terrain contract | Same height in render mesh, support, camera and placement; declared nodata behavior; datum mismatch rejection; seam continuity |
| Player | Spawn/reset, walk/run/jump/collision and teleport retain local behavior; geodetic readout round trip stays within explicit budget |
| Mini Map | Four cardinal paths, headings, overview/follow, default/min/max zoom, marker clipping and edge indicator use the same frame |
| Lifecycle | Remount/retry, disposed zone handles, aborted future input, context recovery; no extra RAF, timer, provider request or resource ownership regression |
| Regression gates | Full lint/format/types/tests; build and Storybook where required; real browser desktop/tablet/mobile, current nine diagnostics plus independent interactions/weather failure checks |
| Performance | Before/after capture on same device/scenario; coordinate conversions outside hot loops where possible; report measured FPS/frame time/draw calls/resources and unavailable GPU metrics honestly |

Acceptance requires independently reviewed numeric references/tolerances, explicit origin/datum and axis documentation, preserved synthetic compatibility, complete boundary validation, passing required checks with zero warnings, and measured browser regression evidence. No Phase 12 output is authorized by this proposal.

## Readiness conclusion for this scope

The architecture has useful seams: injected controller surface policies, disposable prefab zone instances, provenance schema, fixed weather BFF, strict upstream validation and bounded animation resources. It does not yet have a geospatial coordinate core or verified geographic assets. Environmental visuals are connected but physically approximate. Static findings do not establish P0/P1, and they do not satisfy runtime, live network, accuracy or performance gates. Final readiness remains dependent on the coordinating audit's measured evidence and explicit outstanding limitations.
