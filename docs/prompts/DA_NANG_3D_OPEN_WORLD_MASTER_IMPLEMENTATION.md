# DA NANG 3D OPEN WORLD
# MASTER PROJECT IMPLEMENTATION SPECIFICATION
## Next.js Source Foundation · Reusable 3D World Architecture · Geospatial Accuracy · Realistic Rendering · AI Agent Engineering

**Document Type:** Master Engineering Specification  
**Project:** DA NANG 3D OPEN WORLD  
**Project Scope:** Da Nang City, Vietnam  
**Primary Framework:** Next.js App Router  
**3D Engine:** Three.js  
**Primary AI Coding Environments:** Claude Code and OpenAI Codex  
**Additional Supported Environment:** Google Gemini CLI / Antigravity  
**Implementation Mode:** One active AI coding environment at a time  
**Document Authority:** Project Owner-approved master specification

---

# PART I — PROJECT MISSION AND NON-NEGOTIABLE DECISIONS

## 1. PROJECT OWNER DIRECTIVE

You are working on DA NANG 3D OPEN WORLD, an ambitious realistic 3D city exploration platform dedicated to Da Nang, Vietnam.

The project allows visitors to explore the city through an immersive browser-based 3D environment, with first-person and third-person navigation.

The project previously completed PHASE 1 through PHASE 10 using a React, TypeScript and Three.js prototype implemented in a large TSX file.

The project owner has now imported a professional Next.js frontend boilerplate.

Your responsibility is to transform this prototype into a professional, scalable, reusable and maintainable software foundation.

This is not simply a frontend refactoring task.

It is the foundation of a future city-scale 3D world platform.

You must approach this project as a combination of:

- A professional website.
- A real-time 3D rendering application.
- A geographic information system.
- A digital city visualization platform.
- A reusable 3D asset and environment framework.
- A scalable interactive world simulation.

The long-term objective is to create a highly realistic and geographically accurate representation of Da Nang, not merely a visually attractive fictional city.

**The project must prioritize both visual realism and geographical correctness.**

## 2. AUTHORITATIVE PROJECT SOURCES

### 2.1. Next.js boilerplate

GitHub:

https://github.com/PhanHoangQuocTu/nextjs-frontend-boilerplate

This repository is the authoritative source of the frontend engineering patterns.

Preserve and reuse its existing conventions, libraries, configuration and architecture.

Do not replace it with a newly generated Next.js application.

### 2.2. Original Phase 1–10 implementation

Required source:

`da_nang_3d_open_world_simulation_phase_10.tsx`

This is the behavioral reference for the existing simulation.

### 2.3. Original project handover

Required source:

`da_nang_3d_open_world_master_handover_context_transfer_phase_1_to_10.md`

This is the historical source for previous product decisions, implementation details, constraints and completed phases.

### 2.4. Project instructions

Inspect:

- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `.claude/agents/`
- Existing Skills.
- Existing MCP configurations.
- Existing Plugins.
- CodeGraph configuration.

The current repository and its Git history must also be inspected.

### 2.5. Source-of-truth priority

When information conflicts, use this priority:

1. Explicit project owner decisions in the current task.
2. Current repository source and verified configuration.
3. Original Phase 1–10 implementation and handover.
4. Existing boilerplate conventions.
5. Approved architecture decisions.
6. Current official technical documentation.
7. External recommendations and assumptions.

Never silently replace a verified project decision with a generic architectural preference.

---

# 3. FINAL ARCHITECTURAL DECISIONS

These decisions are mandatory.

## 3.1. One Next.js application

The entire project uses the imported Next.js frontend boilerplate.

There is no separate NestJS or Express backend.

Do not introduce:

- NestJS.
- ExpressJS.
- Standalone backend services.
- Microservices.
- Separate backend applications.
- Database infrastructure.
- ORM.
- Redis.
- Unrequested authentication.

However, this does NOT mean that the application must avoid all server-side capabilities.

Use Next.js to its full potential.

## 3.2. Next.js server-side capabilities are allowed

Preserve and utilize:

- Server Components.
- Client Components.
- SSR.
- SSG.
- ISR where appropriate.
- Route Handlers.
- API Proxy/BFF patterns.
- Server-side external API integration.
- Server-side caching and revalidation.
- Metadata API.
- Sitemap.
- Robots.
- Image optimization.
- Font optimization.
- Streaming and Suspense.
- Health checks.

These capabilities are part of the Next.js application.

They do not authorize creating a separate backend.

## 3.3. Preserve the Health endpoint

**DO NOT REMOVE THE EXISTING HEALTH FUNCTIONALITY.**

Inspect the current `/api/health` implementation and Docker health-check dependencies.

Preserve or improve it without breaking existing infrastructure.

Requirements:

- Return meaningful health information.
- Maintain compatibility with Docker liveness checks.
- Avoid external dependency calls in a basic liveness check.
- Avoid leaking secrets or sensitive infrastructure details.
- Distinguish liveness from dependency readiness when both are needed.
- Keep the implementation lightweight.

Health is an operational capability, not a separate backend business module.

## 3.4. Next.js API Proxy and Route Handlers

Use Next.js Route Handlers when appropriate for:

- External weather APIs.
- Public geographic data services.
- Protected upstream credentials.
- External data normalization.
- CORS workarounds where legally and technically permitted.
- Rate limiting.
- Controlled caching.
- API response validation.
- Provider-specific adapters.

Do not create an unrestricted generic proxy.

Every upstream integration must use an explicit allowlist of providers and paths.

Validate all incoming parameters.

Use timeouts, error handling and response-size limits.

Never expose server-only credentials.

### Important distinction

In Next.js 16, `src/proxy.ts` is the request interception mechanism previously called Middleware.

It is not the same thing as an API proxy.

Preserve its existing responsibilities, particularly locale routing.

Do not use `src/proxy.ts` for slow network requests or expensive data retrieval.

Use Route Handlers or Server Components for supported data fetching and caching.

Inspect the installed Next.js version and follow its actual caching behavior.

## 3.5. One active AI coding environment

The repository must independently support:

- Claude Code.
- OpenAI Codex.
- Gemini CLI.
- Antigravity.

These environments operate independently.

The project owner selects one tool at a time.

Never launch multiple external AI coding products to edit the same repository concurrently.

All environments must follow the same canonical architecture and engineering standards.

---

# PART II — GEOGRAPHIC SCOPE AND PRODUCT ACCURACY

# 4. GEOGRAPHIC SCOPE: DA NANG CITY ONLY

This project is dedicated to **Da Nang City, Vietnam**.

The current geographic scope is strictly limited to Da Nang.

Do not independently expand the project to:

- Hue.
- Quang Ngai.
- Other provinces.
- Other cities.
- Unrelated geographic regions.

### 4.1. Administrative boundary

Use the legally effective and verified administrative boundary of Da Nang at the time the geographic dataset is prepared.

Important:

- Do not blindly reuse obsolete administrative boundary data.
- Do not hardcode the historical city boundary without checking.
- Do not assume a previous administrative map is still authoritative.
- Do not automatically expand detailed 3D construction to every newly incorporated area.
- Distinguish the official city boundary from the actual currently developed playable zones.

If administrative boundary changes affect the project scope, document the difference and request project owner approval before expanding detailed world coverage.

### 4.2. Initial development coverage

The initial playable environment may cover a smaller number of approved areas.

The architecture must support progressive expansion within Da Nang.

The following are examples of possible future development areas, not authorization to fabricate or implement them immediately:

- Hai Chau.
- Son Tra.
- Ngu Hanh Son.
- Thanh Khe.
- Lien Chieu.
- Cam Le.
- Hoa Vang.
- Other verified areas within Da Nang.

All geographic boundaries and names must be checked against current authoritative sources.

### 4.3. Geographic scope configuration

Establish a centralized geographic configuration.

It should describe:

- Project identity.
- City identity.
- Authoritative boundary dataset.
- Boundary version.
- Coordinate reference system.
- Vertical reference.
- Data snapshot.
- Supported regions.
- Active development zones.

Do not scatter city-specific constants across the engine.

### 4.4. City data must reflect actual conditions

The objective is to reconstruct Da Nang as accurately as available data permits.

Prioritize:

- Real road networks.
- Real road geometry.
- Real building footprints.
- Real building heights when available.
- Real rivers.
- Real coastline.
- Real terrain.
- Real bridges.
- Real landmarks.
- Real parks.
- Real public spaces.
- Real vegetation distribution when supported by data.
- Real POI locations.
- Actual geographic relationships between elements.

Do not invent the geographical layout.

Do not randomly position landmarks.

Do not place buildings using arbitrary procedural coordinates and present them as real buildings.

If accurate data is unavailable, clearly label the result as approximate, procedural or synthetic.

---

# 5. TWO INDEPENDENT QUALITY DIMENSIONS

These dimensions are equally important.

## 5.1. DIMENSION A — VISUAL REALISM

The world should look convincing and immersive.

Requirements:

- Physically based materials.
- Realistic daylight.
- Natural shadows.
- Accurate material response.
- Realistic water.
- Natural vegetation.
- Detailed building facades.
- Appropriate environmental lighting.
- Realistic weather.
- Natural atmospheric effects.
- High-quality textures.
- Consistent model scale.
- Realistic object proportions.
- Appropriate LOD transitions.
- Smooth animation.
- No visible asset popping where avoidable.

## 5.2. DIMENSION B — GEOGRAPHIC ACCURACY

The world must represent real Da Nang geography.

Requirements:

- Accurate geographic coordinates.
- Accurate building footprints.
- Accurate road geometry.
- Accurate terrain.
- Accurate landmark positions.
- Accurate river and coastline geometry.
- Appropriate height references.
- Traceable source data.
- Recorded data capture dates.
- Documented accuracy levels.
- Verified geographic relationships.

## 5.3. Accuracy must never be sacrificed for visual appearance

A beautiful but incorrectly positioned building is not a successful reconstruction.

A realistic-looking road that does not follow the actual road network is not geographically accurate.

The engine must support different levels of detail and confidence without presenting approximations as verified real-world geometry.

## 5.4. Accuracy classification

Introduce a consistent data confidence classification.

Suggested classes:

| Class | Source quality |
|---|---|
| A | Verified survey, LiDAR or authoritative as-built data |
| B | Official geographic or planning data |
| C | Licensed and documented high-quality provider data |
| D | Community geographic data such as OSM |
| E | Estimated or procedurally generated geometry |
| S | Synthetic test content |

The classification must be tied to actual provenance.

Do not assign Class A simply because an asset looks realistic.

Store:

- Source ID.
- Source URL or reference.
- Data provider.
- Capture date.
- Last verified date.
- Horizontal CRS.
- Vertical datum.
- Known accuracy.
- License.
- Processing history.
- Confidence class.

Unknown information must remain unknown.

---

# PART III — REQUIRED ENGINEERING ROLES

# 6. MULTIDISCIPLINARY EXPERT TEAM

Act as a coordinated senior engineering and digital-world production team.

Every role has explicit responsibilities and expected outputs.

## ROLE 1 — Chief Technology Officer / Principal Software Architect

Responsibilities:

- Own the overall technical architecture.
- Establish engineering standards.
- Evaluate technical trade-offs.
- Prevent unnecessary dependencies.
- Define module boundaries.
- Maintain long-term scalability.
- Approve architecture changes.
- Prevent monolithic code.
- Ensure consistency across AI tools.

Deliverables:

- Architecture overview.
- Architecture decision records.
- Module dependency rules.
- Technical risk register.
- Implementation roadmap.

## ROLE 2 — Senior Next.js Platform Architect

Responsibilities:

- Master the imported Next.js boilerplate.
- Maintain App Router architecture.
- Design Server/Client boundaries.
- Optimize SSR, SSG and caching.
- Use Route Handlers appropriately.
- Preserve health endpoints.
- Maintain i18n.
- Maintain SEO.
- Design external API integrations.
- Optimize website performance.

Deliverables:

- Website architecture.
- API integration architecture.
- Rendering strategy.
- SEO implementation.
- Route documentation.

## ROLE 3 — Senior Three.js Graphics Engineer

Responsibilities:

- Design the rendering pipeline.
- Maintain renderer lifecycle.
- Manage scenes and cameras.
- Implement PBR.
- Optimize lighting and shadows.
- Manage materials and shaders.
- Evaluate WebGPU.
- Maintain WebGL compatibility.
- Optimize draw calls.
- Manage GPU resources.

Deliverables:

- Rendering architecture.
- Material and lighting standards.
- Renderer abstraction.
- Performance benchmark reports.
- GPU resource policy.

## ROLE 4 — Game Engine Architect

Responsibilities:

- Design the reusable 3D engine.
- Separate engine logic from UI.
- Manage game loops.
- Implement entity and system lifecycles.
- Manage character movement.
- Manage physics.
- Manage collisions.
- Manage input.
- Manage interactions.
- Manage simulation state.
- Implement world streaming.

Deliverables:

- Engine module architecture.
- Runtime lifecycle.
- Entity/component composition strategy.
- Interaction architecture.
- Simulation test strategy.

## ROLE 5 — GIS / Geospatial Engineering Specialist

Responsibilities:

- Inspect real geographic datasets.
- Analyze road networks.
- Analyze building footprints.
- Process geographic boundaries.
- Process rivers and coastlines.
- Handle GeoJSON and vector data.
- Evaluate 3D Tiles.
- Evaluate vector tiles.
- Design geographic data ingestion.
- Maintain spatial accuracy.

Deliverables:

- GIS source inventory.
- Geographic data pipeline.
- Coordinate system documentation.
- Geographic validation report.
- Spatial data manifests.

## ROLE 6 — Geodesy / Coordinate Systems Specialist

Responsibilities:

- Understand WGS84.
- Evaluate projected coordinate systems.
- Handle vertical datums.
- Design geographic-to-engine coordinate transforms.
- Maintain numerical precision.
- Handle local coordinate frames.
- Prevent floating-point instability.
- Validate real-world distances and elevations.

Deliverables:

- Coordinate reference specification.
- Transformation utilities.
- Known-point validation tests.
- Floating-origin strategy.

## ROLE 7 — Digital Twin / Urban Modeling Specialist

Responsibilities:

- Translate verified city data into digital world representations.
- Establish urban geometry conventions.
- Organize geographic zones.
- Validate urban structure.
- Distinguish real geometry from approximations.
- Maintain current-world representation.
- Design progressive geographic reconstruction.

Deliverables:

- City modeling specification.
- Region/zone model.
- Building and road data requirements.
- Accuracy assessment.

## ROLE 8 — Senior 3D Technical Artist

Responsibilities:

- Design reusable 3D prefabs.
- Establish model conventions.
- Manage materials.
- Manage texture atlases.
- Manage LOD assets.
- Manage collision proxies.
- Optimize GLB assets.
- Maintain asset naming.
- Coordinate Blender workflows.
- Ensure consistent visual quality.

Deliverables:

- Asset production standard.
- Prefab catalog.
- GLB optimization policy.
- Asset QA checklist.

## ROLE 9 — Environment and Architectural Visualization Artist

Responsibilities:

- Create realistic urban environments.
- Design architectural elements.
- Reconstruct verified landmarks.
- Create natural vegetation.
- Design roads and sidewalks.
- Create water and environmental materials.
- Maintain visual consistency with real Da Nang.

Deliverables:

- Environment asset specifications.
- Material library.
- Landmark modeling standards.
- Visual QA references.

## ROLE 10 — Geospatial and Asset Data Engineer

Responsibilities:

- Design data ingestion.
- Normalize external datasets.
- Manage data versioning.
- Validate schemas.
- Maintain provenance.
- Process GIS and 3D assets.
- Generate manifests.
- Detect data inconsistencies.
- Prepare optimized runtime data.

Deliverables:

- Data ingestion pipeline.
- Asset manifest.
- Data source registry.
- Data quality reports.

## ROLE 11 — Performance and GPU Optimization Engineer

Responsibilities:

- Profile frame time.
- Optimize GPU workload.
- Optimize CPU workload.
- Optimize memory.
- Optimize draw calls.
- Optimize tile streaming.
- Design adaptive quality.
- Benchmark multiple device classes.
- Detect memory leaks.

Deliverables:

- Performance budgets.
- Benchmark scenarios.
- Profiling reports.
- Optimization recommendations.

## ROLE 12 — UI/UX and Interaction Designer

Responsibilities:

- Maintain professional website design.
- Maintain existing HUD.
- Design responsive exploration interfaces.
- Design contextual interactions.
- Design loading and error states.
- Ensure accessibility.
- Maintain visual consistency.

Deliverables:

- Design system integration.
- Responsive UI specifications.
- Component interaction guidelines.

## ROLE 13 — SEO and Web Performance Engineer

Responsibilities:

- Implement indexable content.
- Optimize metadata.
- Implement structured data.
- Maintain canonical URLs.
- Maintain hreflang.
- Optimize initial rendering.
- Maintain Core Web Vitals.
- Ensure 3D canvas does not block SEO.

Deliverables:

- SEO strategy.
- SEO validation report.
- Rendering and indexing report.

## ROLE 14 — QA Automation and Simulation Testing Engineer

Responsibilities:

- Regression test Phase 1–10.
- Verify engine lifecycle.
- Test character movement.
- Test input.
- Test rendering.
- Test geographic transforms.
- Test asset loading.
- Test zone loading/unloading.
- Test resource cleanup.
- Test browser compatibility.

Deliverables:

- Unit tests.
- Integration tests.
- Browser tests.
- Simulation diagnostics.
- Regression report.

## ROLE 15 — Security and Licensing Specialist

Responsibilities:

- Audit dependencies.
- Audit external API access.
- Review data licenses.
- Review map provider terms.
- Protect API keys.
- Prevent SSRF.
- Review external assets.
- Maintain attribution.
- Review MCP and Plugin permissions.

Deliverables:

- Security report.
- Data license register.
- Third-party attribution policy.
- External service risk register.

## ROLE 16 — DevOps and Delivery Engineer

Responsibilities:

- Preserve Docker.
- Preserve Nginx.
- Maintain CI/CD.
- Optimize static asset delivery.
- Configure compression.
- Configure cache headers.
- Manage environment variables.
- Prepare CDN/object storage integration.
- Maintain deployment reliability.

Deliverables:

- Deployment architecture.
- Asset delivery strategy.
- Infrastructure documentation.

## ROLE 17 — AI Developer Experience Engineer

Responsibilities:

- Maintain AGENTS.md.
- Maintain CLAUDE.md.
- Maintain GEMINI.md.
- Configure Skills.
- Configure MCP.
- Evaluate Plugins.
- Integrate CodeGraph.
- Maintain cross-agent compatibility.
- Maintain development handoff.

Deliverables:

- AI tooling architecture.
- Skill registry.
- MCP registry.
- Agent compatibility matrix.
- Session handoff protocol.

## ROLE 18 — Technical Documentation Architect

Responsibilities:

- Maintain README.
- Maintain architecture documentation.
- Document GIS data.
- Document rendering.
- Document assets.
- Document phase status.
- Document operational workflows.
- Ensure documentation reflects actual code.

Deliverables:

- Complete project documentation.
- Developer onboarding guide.
- Technical handover.

---

# PART IV — REUSABLE WORLD ARCHITECTURE

# 7. CORE ARCHITECTURAL PRINCIPLE

**Build the engine once. Build reusable elements once. Compose the Da Nang world using data and reusable prefabs.**

Do not write a new implementation for every building, tree, road, lamp post or tourist object.

Do not couple geographic content to the rendering engine.

Do not couple Three.js objects to React components unnecessarily.

The architecture must separate:

1. Generic engine.
2. Generic world core.
3. Reusable element and prefab catalog.
4. Da Nang-specific world data.
5. Website and presentation layer.

## 7.1. Generic engine

The engine must not contain hardcoded Da Nang-specific building positions, road layouts or landmark geometry.

It owns reusable capabilities:

- Renderer.
- Scene.
- Camera.
- Character.
- Physics.
- Collision.
- Input.
- Lighting.
- Materials.
- Asset loading.
- Prefab instantiation.
- Entity lifecycle.
- World streaming.
- Spatial indexing.
- Interactions.
- Environment simulation.
- Performance monitoring.
- Diagnostics.

## 7.2. World Core

World Core owns reusable world abstractions:

- World definitions.
- World manifests.
- Region definitions.
- Zone definitions.
- Tile definitions.
- Element definitions.
- Prefab definitions.
- Asset references.
- Spatial metadata.
- Entity registries.
- World loaders.
- World providers.
- Data validation.

World Core must be independent of any one city's content.

## 7.3. Da Nang World Content

The actual geographic and environmental content must be isolated.

Suggested:

`src/worlds/danang/`

It owns:

- Da Nang boundary.
- Geographic configuration.
- Region manifests.
- Zone manifests.
- Road data.
- Building data.
- Terrain.
- Rivers.
- Coastline.
- Vegetation distribution.
- Landmark metadata.
- POIs.
- Local environment configuration.
- City-specific asset references.
- Data provenance.

Do not place Da Nang-specific coordinates in generic engine modules.

## 7.4. Reusable asset library

Suggested:

`src/world-assets/`

It owns:

- Shared prefab definitions.
- Building kits.
- Road elements.
- Sidewalk elements.
- Street furniture.
- Trees.
- Plants.
- Rocks.
- Signs.
- Street lights.
- Benches.
- Traffic infrastructure.
- Material presets.
- Texture references.
- LOD definitions.
- Collision profiles.

Asset binaries should be stored in the appropriate asset storage, not embedded inside TypeScript source files.

## 7.5. Future extensibility

The architecture must allow another geographic world to implement the same world contracts in the future.

However:

- Do not implement another city now.
- Do not create fake sample cities.
- Do not create unnecessary multi-city UI.
- Do not build a complex multi-tenant system.
- Do not duplicate the engine for another location.

The current actual geographic content is Da Nang only.

---

# 8. WORLD HIERARCHY

Establish a clear hierarchical structure.

```text
WORLD
│
└── REGION
    │
    └── ZONE
        │
        └── SPATIAL TILE
            │
            └── LAYER
                │
                └── ELEMENT INSTANCE
                    │
                    └── PREFAB / ASSET
```

Definitions:

### World

The complete geographic environment of Da Nang.

### Region

A logical geographic subdivision within Da Nang.

### Zone

A manageable area for streaming, asset loading and development.

### Spatial Tile

A unit of spatial data and runtime streaming.

### Layer

A logical content group, such as:

- Terrain.
- Roads.
- Buildings.
- Vegetation.
- Water.
- Street furniture.
- Landmarks.
- POIs.
- Interactions.

### Element Instance

One actual placed object in the world.

### Prefab

A reusable definition from which element instances are created.

## 8.1. Zone responsibilities

Every zone should support:

- Stable zone ID.
- Geographic bounds.
- Local origin.
- Required assets.
- Required data layers.
- LOD policy.
- Streaming priority.
- Memory budget.
- Collision data.
- Interaction registry.
- Loading state.
- Unloading lifecycle.

The zone system must support:

- Load.
- Unload.
- Reload.
- Prefetch.
- Cancel.
- Retry.
- Error reporting.

Do not load the entire city into memory.

## 8.2. Spatial partitioning

Evaluate appropriate spatial indexing:

- Quadtree.
- Octree.
- Bounding Volume Hierarchy.
- Grid-based spatial partitions.
- R-tree for geographic/vector data.

Select the correct structure for each use case.

Do not use an Octree for every system merely because it is a common 3D structure.

Document the decision.

---

# 9. REUSABLE ELEMENT AND PREFAB SYSTEM

This is a critical requirement.

## 9.1. Element definition versus element instance

Separate reusable definitions from actual placements.

Example conceptual model:

```ts
interface PrefabDefinition {
  id: string;
  version: number;
  category: string;
  assetReferences: string[];
  materialProfile?: string;
  lodProfile?: string;
  collisionProfile?: string;
  interactionProfile?: string;
  instancingPolicy?: 'instance' | 'batch' | 'individual';
}

interface ElementInstance {
  id: string;
  prefabId: string;
  zoneId: string;
  transform: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
  properties: Record<string, unknown>;
  sourceReference?: string;
}
```

This is a conceptual example.

Design the actual TypeScript types and Zod schemas based on real domain requirements.

Avoid unvalidated arbitrary properties at runtime.

## 9.2. Prefab categories

Create a scalable catalog for:

### A. Buildings

- Residential.
- Commercial.
- Office.
- Hotel.
- Public buildings.
- Religious architecture.
- Industrial.
- Landmark.
- Low-rise.
- High-rise.

Building definitions should support:

- Footprint.
- Height.
- Number of floors.
- Roof type.
- Facade type.
- Material slots.
- Window configuration.
- Balcony configuration.
- LOD.
- Collision proxy.
- Geographic provenance.

Generic procedural buildings may be used for approximate areas only.

Never present them as exact real-world buildings.

### B. Roads

Reusable road systems:

- Road surface.
- Lane markings.
- Sidewalk.
- Curbs.
- Crosswalk.
- Junction.
- Roundabout.
- Median.
- Drainage.
- Road signs.
- Street markings.

Road geometry must derive from verified geographic road data.

### C. Vegetation

Reusable vegetation:

- Trees.
- Bushes.
- Grass.
- Palm trees.
- Coastal vegetation.
- Decorative plants.

Support:

- Species.
- Model variants.
- Scale variation.
- Seasonal variation when supported.
- Wind response.
- Density.
- LOD.
- Instancing.

Do not randomly distribute vegetation where actual geographic information is available.

### D. Street furniture

- Street lamps.
- Benches.
- Trash bins.
- Traffic lights.
- Traffic signs.
- Utility poles.
- Bus stops.
- Public fixtures.

### E. Water

- River.
- Sea.
- Lake.
- Pond.
- Canal.

Each water body must have a geographic source.

### F. Landmarks

Important landmarks may require custom high-quality assets.

Use unique models where accuracy requires them.

Do not force every landmark into an overly generic procedural building.

## 9.3. Composition over inheritance

Prefer composition and typed factories.

Avoid deep inheritance trees.

Use a registry or factory mechanism for reusable prefab creation.

Example conceptual flow:

```text
Element Registry
      |
      v
Prefab Definition
      |
      v
Asset Resolver
      |
      v
Material Resolver
      |
      v
Geometry / GLB Factory
      |
      v
Collision Profile
      |
      v
Interaction Profile
      |
      v
World Instance
```

Do not build a giant switch statement containing every city element.

Do not build a complex Entity Component System unless actual project complexity justifies it.

## 9.4. Rendering repeated elements

Use the appropriate optimization:

- `InstancedMesh`.
- `BatchedMesh`.
- Geometry merging.
- Material sharing.
- Texture atlases.
- Spatial batching.

Examples:

Thousands of identical street lamps must not become thousands of completely independent render pipelines.

However, instancing must respect:

- Different materials.
- Different LODs.
- Visibility.
- Interaction requirements.
- Collision requirements.
- Shadow settings.

Do not sacrifice correctness to force everything into one batch.

## 9.5. Reusability acceptance test

The architecture must prove that:

1. One prefab can create multiple independent instances.
2. Instances can have different transforms.
3. Instances can have controlled variants.
4. Instances can share geometry and materials safely.
5. Instances can have independent metadata.
6. Instances can have collision and interaction profiles.
7. One zone can reference multiple prefabs.
8. Another zone can reuse the same prefabs.
9. A new prefab can be added without rewriting the engine.
10. A new zone can be added primarily through data and manifests.

These are mandatory tests.

---

# PART V — GEOSPATIAL DATA AND ACCURACY

# 10. COORDINATE SYSTEM ARCHITECTURE

Geographical correctness requires a carefully designed coordinate system.

Do not use latitude and longitude directly as Three.js world coordinates.

## 10.1. Geographic source format

Support WGS84 longitude and latitude:

`EPSG:4326`

This is the interchange reference for geographic source data where appropriate.

## 10.2. Projected coordinate systems

Inspect the CRS of every incoming dataset.

Do not assume that every Vietnamese geographic dataset uses the same projection.

Determine:

- Horizontal CRS.
- Projection.
- Datum.
- Units.
- Axis order.
- Vertical datum.
- Coordinate transformation requirements.

Select an appropriate local projected CRS for metric spatial operations based on authoritative dataset metadata and the project area.

Do not blindly hardcode a UTM zone or VN-2000 central meridian.

## 10.3. Engine coordinate system

Use a documented local coordinate frame for the active zone.

Recommended principles:

- One engine unit represents one meter.
- Consistent right-handed coordinate system.
- Consistent Y-up convention for Three.js.
- Explicit east/north/up mapping.
- Double precision for geographic transformations.
- Local floating-point coordinates for rendering.

## 10.4. Floating origin

For large geographic worlds:

- Keep coordinates close to the active camera/player.
- Rebase world origins when appropriate.
- Preserve relative object positions.
- Avoid float precision degradation.
- Maintain consistency between physics, camera, interaction and rendering.
- Ensure tiles remain correctly aligned during origin shifts.

## 10.5. Elevation

Do not mix incompatible vertical datums.

Record:

- Elevation source.
- Vertical reference.
- Geoid model if applicable.
- Units.
- Conversion process.
- Accuracy.

Validate road and building elevations against terrain.

## 10.6. Coordinate tests

Create tests for:

- WGS84 to local coordinates.
- Local coordinates to geographic coordinates.
- Distance calculations.
- Heading.
- Elevation.
- Tile bounds.
- Known control points.
- Floating-origin rebasing.

Use verified control points from Da Nang.

Do not invent test coordinates.

---

# 11. GEOGRAPHIC DATA SOURCES

Before constructing actual city content, conduct a data-source audit.

Prioritize authoritative sources.

Potential sources to investigate:

### 11.1. Da Nang GIS Portal

https://gisportal.danang.gov.vn/sxd/

Inspect:

- Availability.
- Current administrative boundaries.
- Urban planning layers.
- Building data.
- Road data.
- Geographic service endpoints.
- API documentation.
- Download formats.
- Usage permissions.

Do not assume all information is public or downloadable.

### 11.2. Vietnam National Geographic Data Portal

https://dosm.vnsdi.gov.vn/

Inspect:

- Base maps.
- Geographic datasets.
- Map services.
- Integration documentation.
- WMS.
- WMTS.
- WFS or equivalent services where available.
- Data access restrictions.

### 11.3. OpenStreetMap

https://www.openstreetmap.org/

https://download.geofabrik.de/asia/vietnam.html

Potential use:

- Roads.
- Building footprints.
- POIs.
- Land use.
- Waterways.
- Street infrastructure.

OSM is community-maintained data, not an authoritative survey.

Respect ODbL and attribution obligations.

Do not use OSM data without documenting the license and applicable share-alike requirements.

### 11.4. Copernicus DEM

https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM

Evaluate:

- GLO-30.
- GLO-90.
- Coverage.
- Resolution.
- Vertical accuracy.
- Acquisition date.
- Licensing.

Important:

Copernicus GLO-30 is a 30-meter Digital Surface Model.

It is useful for broad terrain representation but is insufficient by itself for detailed street-level elevation and building reconstruction.

Do not claim survey-grade precision.

### 11.5. Photogrammetry and LiDAR

Evaluate:

- Authorized drone imagery.
- Ground-based photogrammetry.
- Licensed aerial imagery.
- LiDAR.
- Official 3D building models.
- Existing city digital twin datasets.

Every dataset must have permission for its intended use.

### 11.6. Google Photorealistic 3D Tiles

https://developers.google.com/maps/documentation/tile/3d-tiles

Evaluate only if the provider's coverage includes the required Da Nang areas and the licensing is compatible with the product.

Important restrictions:

- Required attribution.
- Google logo display.
- Provider-specific caching limitations.
- No unauthorized data extraction.
- No deriving independent 3D assets from protected tiles.
- No generating collision meshes from restricted source data.
- No unauthorized offline storage.

Do not use Google photogrammetry as an asset extraction source.

If Google tiles are used, follow the official provider renderer and display requirements.

### 11.7. Source prioritization

Use this priority:

1. Official surveyed or authoritative city data.
2. Licensed high-accuracy geographic data.
3. Official national geographic datasets.
4. Verified community datasets.
5. Clearly labeled estimates.
6. Synthetic test data.

Do not invent missing data.

If a source is unavailable, report it.

---

# 12. DATA PROVENANCE AND VERSIONING

Create a centralized geographic source registry.

Suggested:

`src/worlds/danang/provenance/`

Every dataset must have a record describing:

```text
Dataset ID
Dataset name
Provider
Source URL
Geographic coverage
Data format
Horizontal CRS
Vertical datum
Capture date
Publication date
Last verified date
Known accuracy
License
Attribution
Processing steps
Output asset references
Version
```

Establish a consistent data quality lifecycle:

```text
RAW SOURCE
    |
    v
SOURCE VALIDATION
    |
    v
COORDINATE NORMALIZATION
    |
    v
GEOMETRY VALIDATION
    |
    v
DATA ENRICHMENT
    |
    v
ASSET / TILE GENERATION
    |
    v
OPTIMIZATION
    |
    v
RUNTIME MANIFEST
    |
    v
WORLD STREAMING
```

Keep raw source data separate from optimized runtime assets.

Never overwrite original source datasets.

Support versioned updates.

Detect:

- Missing geometry.
- Invalid polygons.
- Self-intersections.
- Duplicate features.
- Incorrect coordinates.
- Invalid elevation.
- Broken asset references.
- Inconsistent IDs.
- Missing provenance.
- Unsupported licensing.

---

# PART VI — RENDERING TECHNOLOGY AND PERFORMANCE

# 13. TECHNOLOGY RESEARCH BEFORE IMPLEMENTATION

Do not select a rendering technology based on popularity or marketing.

Research current documentation and test compatibility with the existing source.

Create:

`docs/RESEARCH/3D_RENDERING_TECHNOLOGY_EVALUATION.md`

Compare:

1. Raw Three.js.
2. Three.js WebGPURenderer.
3. Three.js + 3D Tiles.
4. NASA-AMMOS 3DTilesRendererJS.
5. CesiumJS.
6. MapLibre GL JS.
7. Other relevant geospatial rendering technologies only when justified.

Evaluate:

- Existing engine compatibility.
- Rendering quality.
- Geospatial support.
- Streaming.
- LOD.
- GPU performance.
- Memory usage.
- Mobile compatibility.
- Custom shaders.
- Physics integration.
- Interaction support.
- Licensing.
- Maintenance.
- Bundle size.
- Learning and migration cost.

Provide a scored comparison and evidence.

Do not integrate every candidate into the final runtime.

## 13.1. Primary engine: Three.js

Continue using Three.js as the main interactive engine.

Reasons:

- Existing Phase 1–10 code already uses it.
- Character movement is implemented.
- Physics is implemented.
- Input is implemented.
- Mini Map is implemented.
- Interaction registry is implemented.
- Existing renderer architecture is already established.

Do not discard existing functionality to adopt another engine without strong technical evidence.

## 13.2. WebGL 2 baseline

Maintain a stable WebGL 2 rendering path.

Preserve the current renderer until a replacement is verified.

## 13.3. WebGPU evaluation

Evaluate:

- `THREE.WebGPURenderer`.
- TSL.
- Node materials.
- WebGPU compute where genuinely useful.

Create a renderer abstraction so future renderer migration does not require rewriting all game systems.

However:

- Do not replace WebGL 2 immediately.
- Check current WebGPU browser support.
- Check shader compatibility.
- Check post-processing compatibility.
- Check Three.js release status.
- Benchmark on actual target devices.
- Preserve a reliable fallback.

If WebGPU is not suitable, keep it as a documented future option.

## 13.4. 3D Tiles

Evaluate OGC 3D Tiles 1.1.

Potential integration:

https://github.com/NASA-AMMOS/3DTilesRendererJS

Use a proof-of-concept before full integration.

Test:

- Tileset loading.
- Camera synchronization.
- Tile selection.
- Screen-space error.
- LOD transitions.
- Tile prioritization.
- Request cancellation.
- Cache eviction.
- GPU disposal.
- Coordinate transformation.
- Memory limits.
- Attribution.

Important:

The renderer has incomplete specification coverage and cache limits.

Do not assume that every 3D Tiles dataset or extension will work.

Monitor cache usage and loading behavior.

## 13.5. CesiumJS

Evaluate CesiumJS as an alternative when the requirements for geographic globe rendering, large-scale terrain and photogrammetry streaming exceed the practical capabilities of the current Three.js integration.

Do not embed CesiumJS and Three.js as two competing primary game engines.

Only adopt it after a documented comparison and proof-of-concept.

## 13.6. MapLibre GL JS

Evaluate MapLibre for:

- 2D geographic map.
- Road overlays.
- POIs.
- Location search.
- Zone overview.
- Navigation context.
- Vector tile visualization.

Do not use MapLibre as a replacement for the existing first-person/third-person Three.js engine.

---

# 14. REALISTIC RENDERING PIPELINE

Build visual realism through a controlled graphics pipeline.

## 14.1. Materials

Establish reusable PBR material presets.

Use appropriate:

- Base color.
- Roughness.
- Metalness.
- Normal maps.
- Ambient occlusion.
- Emissive maps.
- Opacity.
- UV mapping.

Materials must have consistent color-space and texture handling.

Avoid arbitrary material values.

## 14.2. Lighting

Implement and optimize:

- Physical sunlight.
- Environment lighting.
- HDR environments.
- PMREM.
- Shadow maps.
- Ambient occlusion.
- Time-dependent lighting.
- Night illumination.

Sun position must be based on Da Nang's actual geographic location and date/time.

Avoid physically implausible light intensities.

## 14.3. Atmosphere

Evaluate:

- Sky rendering.
- Atmospheric scattering.
- Fog.
- Cloud layers.
- Rain.
- Wind.
- Humidity-related visual effects.
- Lightning.
- Environmental color response.

Effects must reflect actual environmental data where available.

## 14.4. Water

Water must support:

- Real geographic geometry.
- Surface normals.
- Reflection.
- Refraction when affordable.
- Wave motion.
- Fresnel.
- Shoreline blending.
- Appropriate material response.

Do not use an expensive water shader everywhere.

Use quality tiers.

Do not invent river depth, tide or current data.

## 14.5. Vegetation

Use reusable vegetation assets.

Support:

- Instancing.
- Wind animation.
- LOD.
- Distance-based density.
- Shadow optimization.
- Species variations.

Use actual vegetation data when available.

## 14.6. Building realism

Use modular architecture:

- Facade modules.
- Windows.
- Doors.
- Balconies.
- Roofs.
- Structural details.
- Materials.

Procedural generation is permitted for reusable architecture templates, but actual placement and dimensions must come from verified data when representing real buildings.

Use custom models for important landmarks where needed.

## 14.7. Post-processing

Evaluate:

- Tone mapping.
- Color grading.
- Ambient occlusion.
- Bloom.
- Depth of field.
- Screen-space reflections.
- Anti-aliasing.

Do not enable every effect simultaneously.

Avoid post-processing that creates excessive GPU cost or obscures actual geographic geometry.

---

# 15. 3D ASSET PIPELINE

Establish a repeatable asset production pipeline.

## 15.1. Authoring

Primary authoring tool:

Blender.

Potential source formats:

- `.blend`.
- `.glb`.
- `.gltf`.

Runtime format:

Prefer optimized `.glb` where suitable.

## 15.2. Optimization

Evaluate and use when appropriate:

- glTF Transform.
- Meshopt.
- Draco.
- KTX2/Basis Universal.
- Texture atlases.
- Geometry merging.
- LOD generation.
- Material consolidation.

Do not add multiple compression systems without a clear reason.

Validate compatibility with the actual runtime loaders.

## 15.3. Asset requirements

Every asset must have:

- Stable ID.
- Name.
- Category.
- Version.
- Source.
- License.
- Dimensions.
- Origin/pivot.
- Units.
- Materials.
- Texture references.
- LODs.
- Collision profile.
- Interaction profile if applicable.
- Preview image where useful.

## 15.4. Asset validation

Check:

- Correct scale.
- Correct orientation.
- Correct pivot.
- Missing textures.
- Invalid materials.
- Broken normals.
- Excessive polygons.
- Excessive texture memory.
- Missing LOD.
- Invalid GLB.
- Unlicensed content.

## 15.5. Asset storage

Do not commit huge raw datasets or unnecessarily large binary assets into Git.

Evaluate:

- Git LFS.
- Object storage.
- CDN.
- Versioned asset hosting.

Keep source code, manifests and essential small assets in the repository.

Keep heavy data and optimized tiles in an appropriate storage layer.

---

# PART VII — PERFORMANCE AND WORLD STREAMING

# 16. CITY-SCALE PERFORMANCE ARCHITECTURE

The application must not attempt to render the entire city at maximum quality simultaneously.

## 16.1. Progressive loading

Use:

- Geographic zones.
- Spatial tiles.
- LOD.
- HLOD.
- Frustum culling.
- Distance culling.
- Occlusion culling where appropriate.
- Request prioritization.
- Asset caching.
- Streaming.
- Background parsing where supported.

## 16.2. Tile loading lifecycle

Each tile must support:

- Unloaded.
- Queued.
- Loading.
- Parsing.
- Ready.
- Visible.
- Evictable.
- Unloading.
- Failed.

Handle:

- Request cancellation.
- Retry.
- Backoff.
- Timeout.
- Cache eviction.
- Partial failures.
- Fallback LOD.

## 16.3. Memory budgets

Define budgets for:

- CPU memory.
- GPU memory.
- Geometry.
- Textures.
- Render targets.
- Active tiles.
- Prefetch tiles.
- Asset caches.

Budgets must be configurable per device profile.

Do not invent a universal GPU memory limit.

Measure on actual target hardware.

## 16.4. Device quality profiles

Create:

### High

- High-resolution textures.
- Higher LOD.
- Advanced shadows.
- Higher draw distance.
- More environmental effects.

### Medium

- Balanced texture quality.
- Moderate LOD.
- Reduced shadow quality.
- Moderate view distance.
- Controlled effects.

### Low

- Lower resolution.
- Aggressive LOD.
- Reduced draw distance.
- Simplified shadows.
- Reduced vegetation density.
- Minimal post-processing.

## 16.5. Dynamic quality

Monitor:

- FPS.
- Frame time.
- CPU frame time.
- GPU frame time where measurable.
- Memory.
- Draw calls.
- Triangles.
- Texture count.
- Active tiles.
- Cache utilization.

Adapt quality without abrupt visible degradation.

Do not change gameplay physics based on render quality.

## 16.6. Worker architecture

Evaluate Web Workers for:

- Heavy geometry processing.
- Geographic transformations.
- Data parsing.
- Asset preparation.
- Non-rendering computation.

Do not move the rendering loop into a Worker merely for architectural appearance.

Evaluate OffscreenCanvas only if the target browser and renderer architecture support it reliably.

## 16.7. Performance targets

Use the following as initial project targets, not fabricated guarantees:

- Desktop: target 55–60 FPS.
- Mobile/integrated GPU: target at least 30 FPS.
- No persistent memory growth during repeated zone loading/unloading.
- No uncontrolled asset requests.
- No unnecessary main-thread blocking.
- No per-frame React state updates.

Document the device, browser, scene complexity, resolution and test duration for every benchmark.

---

# PART VIII — NEXT.JS APPLICATION AND EXTERNAL SERVICES

# 17. NEXT.JS ARCHITECTURE

Preserve the imported boilerplate's actual patterns.

Expected technology foundation should be verified locally:

- Next.js App Router.
- React.
- TypeScript strict.
- Tailwind CSS.
- shadcn/ui.
- Zustand.
- TanStack Query.
- next-intl.
- Zod.
- Vitest.
- Testing Library.
- Biome.
- Storybook.
- Docker.
- Nginx.
- CI/CD.

Do not blindly upgrade dependencies.

## 17.1. Website routes

Establish:

- `/` — Home.
- `/explore` — 3D exploration.
- `/about` — Project information.
- `/places` — Verified destination directory.
- `/places/[slug]` — Verified destination details.

Preserve the existing English/Vietnamese locale routing.

## 17.2. Server Components

Use Server Components by default.

Use Client Components only where needed:

- WebGL.
- Interactive HUD.
- Browser APIs.
- Controls.
- Client state.
- Animation.
- Real-time UI.

Keep the 3D engine behind a clear client-only boundary.

## 17.3. Dynamic loading

The 3D engine must not block initial page rendering.

Use dynamic imports appropriately.

Provide:

- Loading screen.
- WebGL unsupported state.
- Network error state.
- Engine initialization error state.
- Retry mechanism.

## 17.4. Health

Preserve `/api/health`.

Verify Docker and deployment health checks.

Do not remove or rename without an explicit, verified migration.

## 17.5. API integrations

Create a centralized integration architecture.

Suggested conceptual structure:

```text
src/
├── integrations/
│   ├── weather/
│   │   ├── providers/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── types/
│   ├── geospatial/
│   └── assets/
│
├── app/
│   └── api/
│       ├── health/
│       ├── weather/
│       └── ...
```

Adapt to the existing boilerplate.

Do not create empty integrations.

## 17.6. External API proxy policy

Use a dedicated Next.js Route Handler only when beneficial.

Requirements:

- Fixed upstream allowlist.
- Input validation.
- Output validation.
- Timeout.
- Explicit cache strategy.
- Error normalization.
- Rate limiting where required.
- Request-size limits.
- No open proxy.
- No secret leakage.
- No arbitrary user-supplied URL fetching.

For weather, preserve the existing 15-minute refresh behavior and existing stale-data semantics.

For large 3D Tiles or asset files, prefer direct authorized CDN/provider streaming when possible.

Do not proxy every large binary request through Next.js by default.

## 17.7. Static and heavy asset delivery

Use appropriate delivery mechanisms:

- Next.js public assets for small static files.
- CDN for large assets.
- Versioned object storage for large world data.
- Explicit cache headers.
- Compression.
- Immutable asset URLs when content-addressed.

Avoid forcing huge world datasets into the Next.js application bundle.

---

# PART IX — SEO, BRANDING AND UX

# 18. SEO FOUNDATION

Use the existing boilerplate SEO system.

Preserve:

- Metadata helper.
- Canonical.
- hreflang.
- Open Graph.
- Twitter metadata.
- JSON-LD.
- Sitemap.
- Robots.
- Manifest.
- Development/staging noindex protection.

SEO pages must contain meaningful server-rendered content.

The canvas cannot be the only content.

Do not index:

- Empty destination pages.
- Debug pages.
- Internal testing routes.
- Placeholder content.

Use verified destination information.

## 18.1. Structured data

Use appropriate schema.org types:

- WebSite.
- WebApplication.
- WebPage.
- BreadcrumbList.
- Place.
- TouristAttraction.

Never fabricate ratings, reviews, coordinates, prices or opening hours.

## 18.2. Branding

Create a professional Da Nang Dragon Bridge-inspired identity.

Brand:

DA NANG 3D

Required assets:

```text
public/brand/
├── da-nang-3d-logo.svg
├── da-nang-3d-symbol.svg
├── da-nang-3d-logo-light.svg
├── da-nang-3d-logo-dark.svg
└── og-image.svg
```

Update Next.js favicon, Apple icon and social sharing images.

Preserve existing HUD design where possible.

---

# PART X — AI CODING ENVIRONMENT

# 19. SHARED AI INSTRUCTIONS

`AGENTS.md` is the canonical shared engineering instruction source.

`CLAUDE.md` must import or reference `AGENTS.md` using Claude Code's supported syntax.

Codex must discover root `AGENTS.md`.

`GEMINI.md` must reference the same engineering rules using Gemini's supported mechanism.

Antigravity must use its verified workspace rules and instruction discovery.

All agents must obey:

- Same architecture.
- Same code standards.
- Same scope.
- Same test requirements.
- Same source of truth.
- Same security policy.

## 19.1. Skills

Discover and use relevant installed Skills.

Prioritize:

- Next.js architecture.
- React architecture.
- Three.js engineering.
- Geospatial/GIS.
- 3D asset pipelines.
- Architecture migration.
- SEO.
- Browser QA.
- Performance.
- Security.
- Documentation.

Create project-specific Skills only where needed.

Shared Skills should use the Agent Skills-compatible format.

Avoid duplicated or contradictory instructions.

## 19.2. MCP

Inspect and use relevant MCP servers.

Priority:

1. CodeGraph.
2. Context7 or equivalent documentation MCP.
3. Playwright/browser automation.
4. GitHub MCP when needed.
5. GIS/data tools when actually available.
6. Other relevant research tools.

Use CodeGraph before and after important refactoring.

Use current official documentation when technical compatibility matters.

## 19.3. Plugins

Inspect available Plugins and extensions.

Evaluate:

- Official source.
- Skills.
- MCP dependencies.
- Permissions.
- Compatibility.
- Security.
- Actual benefit.

Do not install every available Plugin.

Ask for permission before installing external or global tools.

## 19.4. Tool compatibility

Maintain:

```text
docs/ai/
├── CORE_RULES.md
├── DEVELOPMENT_WORKFLOW.md
├── TOOLING_REGISTRY.md
├── AGENT_COMPATIBILITY.md
├── SESSION_HANDOFF.md
└── SECURITY_POLICY.md
```

Do not create three different architectures for three AI tools.

---

# PART XI — SOURCE STRUCTURE

# 20. RECOMMENDED TARGET STRUCTURE

Adapt to the existing boilerplate and do not move unrelated files unnecessarily.

```text
src/
│
├── app/
│   ├── [locale]/
│   ├── api/
│   ├── icon.svg
│   ├── robots.ts
│   ├── sitemap.ts
│   └── manifest.ts
│
├── components/
│   ├── brand/
│   ├── layouts/
│   ├── navigation/
│   ├── seo/
│   └── ui/
│
├── modules/
│   ├── Home/
│   ├── WorldExplorer/
│   ├── Places/
│   └── About/
│
├── engine/
│   ├── core/
│   ├── renderer/
│   ├── scene/
│   ├── camera/
│   ├── controls/
│   ├── character/
│   ├── physics/
│   ├── assets/
│   ├── materials/
│   ├── lighting/
│   ├── elements/
│   ├── prefabs/
│   ├── spatial/
│   ├── streaming/
│   ├── geospatial/
│   ├── interactions/
│   ├── environment/
│   ├── performance/
│   └── diagnostics/
│
├── world-core/
│   ├── schemas/
│   ├── manifests/
│   ├── registries/
│   ├── loaders/
│   ├── providers/
│   └── types/
│
├── world-assets/
│   ├── catalog/
│   ├── prefabs/
│   ├── materials/
│   └── profiles/
│
├── worlds/
│   └── danang/
│       ├── manifest/
│       ├── boundary/
│       ├── regions/
│       ├── zones/
│       ├── terrain/
│       ├── roads/
│       ├── buildings/
│       ├── vegetation/
│       ├── water/
│       ├── landmarks/
│       ├── poi/
│       ├── provenance/
│       └── metadata/
│
├── integrations/
│   ├── weather/
│   ├── geospatial/
│   └── assets/
│
├── config/
├── constants/
├── hooks/
├── i18n/
├── lib/
├── messages/
├── stores/
├── styles/
├── types/
└── utils/

public/
├── brand/
└── assets/
    ├── shared/
    └── worlds/
        └── danang/

docs/
├── architecture/
├── decisions/
├── migration/
├── research/
├── ai/
└── ...
```

Do not create empty directories merely to match this tree.

Every directory must have a real responsibility.

Keep the imported boilerplate's established conventions.

---

# PART XII — IMPLEMENTATION MILESTONES

# 21. STRICT IMPLEMENTATION SEQUENCE

## MILESTONE 0 — COMPLETE REPOSITORY AUDIT

Before modifying source:

- Inspect the full Next.js repository.
- Inspect Git status.
- Inspect the current branch.
- Inspect the lockfile.
- Inspect all project instructions.
- Inspect all current dependencies.
- Inspect the complete original TSX.
- Inspect the complete Phase 1–10 handover.
- Inspect CodeGraph.
- Inspect Skills.
- Inspect MCP.
- Inspect Plugins.
- Inspect Docker.
- Inspect CI.
- Inspect testing.
- Inspect Storybook.

Identify user modifications and preserve them.

Deliver:

`docs/migration/BASELINE_REPORT.md`

## MILESTONE 1 — BASELINE TESTING

Run existing:

- Lint.
- Formatting.
- Type checking.
- Unit tests.
- Build.
- Storybook where relevant.

Record actual results.

Do not confuse pre-existing failures with newly introduced failures.

## MILESTONE 2 — TECHNICAL RESEARCH

Research current versions and official documentation.

Evaluate:

- Three.js.
- WebGPU.
- 3D Tiles.
- 3DTilesRendererJS.
- CesiumJS.
- MapLibre.
- GIS data tools.
- Asset optimization.
- Data sources.
- Licensing.
- Browser support.

Deliver:

- `docs/research/TECHNOLOGY_EVALUATION.md`
- `docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md`
- `docs/research/RENDERING_BENCHMARK_PLAN.md`

Do not install all candidates.

## MILESTONE 3 — ARCHITECTURE DESIGN

Design:

- Next.js application architecture.
- Engine architecture.
- World Core.
- Prefab system.
- Element registry.
- Asset catalog.
- Geographic data architecture.
- Zone and tile streaming.
- External API integration.
- Performance strategy.

Deliver:

- `docs/architecture/ARCHITECTURE.md`
- `docs/architecture/WORLD_ARCHITECTURE.md`
- `docs/architecture/REUSABLE_ELEMENT_SYSTEM.md`
- Relevant ADRs.

Get the architecture internally consistent before large-scale migration.

## MILESTONE 4 — ORIGINAL SOURCE MIGRATION MAPPING

Map every important original function, class, type and component.

Use CodeGraph where available.

Create:

`docs/migration/PHASE_1_TO_10_MIGRATION_MAP.md`

Identify:

- Original location.
- New location.
- Responsibility.
- Dependencies.
- Tests.
- Migration status.

## MILESTONE 5 — ENGINE AND WORLD CORE FOUNDATION

Implement reusable foundations:

- Engine lifecycle.
- Renderer interface.
- Scene management.
- Camera.
- Input.
- Physics.
- Asset loading.
- Prefab registry.
- Element factories.
- Spatial utilities.
- Interaction registry.
- Diagnostics.
- Cleanup.

Preserve the original working systems.

## MILESTONE 6 — PHASE 1–10 MIGRATION

Migrate in small groups.

After each group:

- Type check.
- Lint.
- Unit tests.
- Regression tests.
- Browser preview where appropriate.
- Inspect dependency graph.
- Verify resource cleanup.

Do not proceed while critical regressions remain.

## MILESTONE 7 — REUSABLE ELEMENT AND ASSET PIPELINE

Implement and test:

- Prefab definitions.
- Element instances.
- Asset manifests.
- Material profiles.
- LOD profiles.
- Collision profiles.
- Interaction profiles.
- Instancing.
- Asset validation.

Demonstrate reuse using the existing synthetic environment.

Do not invent real Da Nang buildings to satisfy this milestone.

## MILESTONE 8 — GEOSPATIAL FOUNDATION

Implement:

- Geographic schemas.
- Coordinate transformations.
- Local origin.
- Floating-origin strategy.
- Spatial bounds.
- Tile definitions.
- Data provenance.
- Geographic validation.
- Zone manifest loading.

Use verified datasets or controlled test fixtures.

If official data is unavailable, document the blocker rather than fabricating it.

## MILESTONE 9 — RENDERING PROOF OF CONCEPT

Create controlled experiments for:

- Current WebGL renderer.
- WebGPU candidate.
- 3D Tiles integration.
- Tile streaming.
- LOD.
- PBR materials.
- Lighting.
- Performance.

Benchmark on a documented environment.

Adopt a new technology only if the evidence supports it.

## MILESTONE 10 — NEXT.JS WEBSITE FOUNDATION

Implement:

- Home.
- Explore.
- About.
- Verified Places architecture.
- SEO.
- API integrations.
- Health.
- Loading.
- Error handling.
- Responsive design.
- Brand identity.

Preserve the existing boilerplate.

## MILESTONE 11 — AI TOOLING

Configure:

- AGENTS.md.
- CLAUDE.md.
- GEMINI.md.
- Shared Skills.
- MCP registry.
- Plugin registry.
- CodeGraph workflow.
- Agent compatibility.
- Session handoff.

## MILESTONE 12 — DOCUMENTATION

Complete all documentation.

## MILESTONE 13 — FINAL QA AND HANDOVER

Run the entire acceptance suite.

Do not start Phase 11 automatically.

Wait for project owner approval.

---

# PART XIII — DOCUMENTATION

# 22. REQUIRED DOCUMENTATION FILES

Write primary documentation in Vietnamese with standard English technical terminology.

## Root README.md

Include:

- Project introduction.
- Vision.
- Scope.
- Current status.
- Technology stack.
- Architecture.
- Source tree.
- Features.
- Geographic data strategy.
- 3D engine.
- Prefab system.
- Asset pipeline.
- SEO.
- API integrations.
- Health.
- Environment.
- Installation.
- Development commands.
- Testing.
- Storybook.
- Docker.
- Deployment.
- AI tooling.
- Roadmap.
- Known limitations.

## Architecture documents

```text
docs/architecture/
├── ARCHITECTURE.md
├── WORLD_ARCHITECTURE.md
├── REUSABLE_ELEMENT_SYSTEM.md
├── ENGINE_LIFECYCLE.md
├── GEOSPATIAL_ARCHITECTURE.md
├── WORLD_STREAMING.md
└── STATE_MANAGEMENT.md
```

## Research documents

```text
docs/research/
├── TECHNOLOGY_EVALUATION.md
├── GEOSPATIAL_DATA_SOURCE_RESEARCH.md
├── RENDERING_BENCHMARK_PLAN.md
├── WEBGPU_EVALUATION.md
└── DATA_LICENSE_REVIEW.md
```

## World data documents

```text
docs/world/
├── DANANG_WORLD_SCOPE.md
├── DATA_SOURCES.md
├── DATA_QUALITY.md
├── COORDINATE_SYSTEM.md
├── REGION_AND_ZONE_STANDARD.md
└── GEOGRAPHIC_VALIDATION.md
```

## Asset documents

```text
docs/assets/
├── ASSET_PIPELINE.md
├── PREFAB_STANDARD.md
├── MATERIAL_STANDARD.md
├── LOD_STANDARD.md
├── GLB_OPTIMIZATION.md
└── ASSET_LICENSES.md
```

## Rendering documents

```text
docs/rendering/
├── RENDERING_ARCHITECTURE.md
├── MATERIALS_AND_LIGHTING.md
├── PERFORMANCE_BUDGETS.md
├── DEVICE_PROFILES.md
└── BENCHMARK_RESULTS.md
```

## Other required documents

- `docs/SEO.md`
- `docs/API_INTEGRATIONS.md`
- `docs/PHASE_STATUS.md`
- `docs/migration/MIGRATION_REPORT.md`
- `docs/decisions/`
- `docs/ai/`

Do not generate documentation that claims unimplemented capabilities already exist.

---

# PART XIV — TESTING AND ACCEPTANCE CRITERIA

# 23. ARCHITECTURAL ACCEPTANCE

The foundation must prove:

- Generic engine is independent from Da Nang data.
- Da Nang content does not leak into generic engine logic.
- Prefabs can be reused.
- Multiple instances can share assets.
- Instances can have independent transforms.
- Zones can load and unload.
- Assets can be resolved from manifests.
- Data provenance is preserved.
- New geographic content does not require rewriting core engine systems.
- The system can support future world providers without implementing other cities now.

## 23.1. Phase 1–10 regression

Preserve all original functionality.

Verify:

- Character.
- Movement.
- Jump.
- Sprint.
- Collision.
- Camera.
- Keyboard.
- Touch.
- Weather.
- Astronomy.
- HUD.
- Mini Map.
- Player synchronization.
- Interactions.
- Dialogs.
- Diagnostics.

Re-run DIAG-01 through DIAG-09.

Expected baseline: 9/9 passed.

## 23.2. Geographic QA

Verify:

- City boundary.
- Coordinate reference systems.
- Transformations.
- Elevation.
- Known points.
- Road geometry.
- Building footprints.
- Water boundaries.
- Data provenance.
- Licensing.
- Source freshness.

No unverified geometry may be presented as exact.

## 23.3. Rendering QA

Verify:

- Renderer initialization.
- WebGL context.
- WebGPU fallback if evaluated.
- Asset loading.
- LOD.
- Tile streaming.
- Memory.
- Shadow quality.
- Materials.
- Cleanup.
- Resize.
- Context recovery.

## 23.4. Next.js QA

Verify:

- Build.
- Type checking.
- Lint.
- Unit tests.
- Route handlers.
- Health endpoint.
- Proxy behavior.
- Cache behavior.
- SSR.
- SSG.
- Metadata.
- i18n.
- Docker health checks.

## 23.5. Performance QA

Report actual measurements.

Use reproducible test scenes and documented device profiles.

Do not fabricate FPS, memory or loading metrics.

## 23.6. Security and licensing QA

Verify:

- No leaked secrets.
- No unrestricted proxy.
- No unsafe upstream URL fetching.
- No unlicensed assets.
- Correct OSM attribution.
- Correct Google attribution if applicable.
- Correct asset licenses.
- No unauthorized dataset extraction.

---

# PART XV — FINAL HANDOVER

# 24. REQUIRED ENGINEERING REPORT

At completion, produce:

## A. Repository audit

Describe the original boilerplate and the actual changes.

## B. Architecture

Show the real final source tree.

Explain the responsibilities of major modules.

## C. Phase 1–10 migration

List actual migrated components, functions, types and systems.

## D. Reusable world architecture

Demonstrate:

- Prefab definitions.
- Element instances.
- Asset registry.
- Zone manifests.
- Streaming.
- Reuse tests.

## E. Geospatial report

Include:

- Da Nang scope.
- Geographic boundary source.
- Coordinate reference.
- Data sources.
- Data freshness.
- Accuracy classes.
- Licensing.
- Missing data.

## F. Rendering technology decision

Explain:

- Current renderer.
- Evaluated alternatives.
- Benchmark evidence.
- Selected strategy.
- Deferred technologies.
- Known limitations.

## G. Next.js report

Include:

- Routes.
- Server/Client boundaries.
- Health endpoint.
- API integrations.
- Route Handlers.
- Proxy.
- Caching.
- SEO.

## H. AI tooling report

| Environment | Instructions | Skills | MCP | Plugins | Verification |
|---|---|---|---|---|---|
| Claude Code | Actual status | Actual status | Actual status | Actual status | PASS/NOT RUN |
| Codex | Actual status | Actual status | Actual status | Actual status | PASS/NOT RUN |
| Gemini CLI | Actual status | Actual status | Actual status | Actual status | PASS/NOT RUN |
| Antigravity | Actual status | Actual status | Actual status | Actual status | PASS/NOT RUN |

## I. Test report

| Test | Result | Evidence |
|---|---|---|
| Build | PASS/FAIL/NOT RUN/BLOCKED | Actual output |
| Type check | PASS/FAIL/NOT RUN/BLOCKED | Actual output |
| Lint | PASS/FAIL/NOT RUN/BLOCKED | Actual output |
| Unit tests | PASS/FAIL/NOT RUN/BLOCKED | Actual output |
| Phase diagnostics | PASS/FAIL/NOT RUN/BLOCKED | DIAG-01–09 |
| Browser QA | PASS/FAIL/NOT RUN/BLOCKED | Evidence |
| Geographic QA | PASS/FAIL/NOT RUN/BLOCKED | Evidence |
| Performance | PASS/FAIL/NOT RUN/BLOCKED | Benchmark |
| SEO | PASS/FAIL/NOT RUN/BLOCKED | HTML inspection |
| Health | PASS/FAIL/NOT RUN/BLOCKED | Endpoint |

Never report NOT RUN as PASS.

## J. Remaining issues

List all unresolved issues and limitations.

## K. Future readiness

Explain whether the architecture is ready for continued development of the Da Nang world.

Recommend the next phase, but do not implement it automatically.

---

# PART XVI — STRICT EXECUTION RULES

# 25. NON-NEGOTIABLE ENGINEERING RULES

1. Preserve the imported Next.js boilerplate.
2. Preserve the Health endpoint.
3. No separate backend.
4. Use Next.js Route Handlers when justified.
5. Keep Next.js `proxy.ts` responsibilities correct.
6. Preserve Phase 1–10 behavior.
7. Do not create a monolithic TSX file.
8. Do not create duplicated elements.
9. Build reusable prefabs.
10. Separate generic engine from Da Nang data.
11. Use verified geographic data.
12. Do not fabricate coordinates.
13. Do not fabricate building geometry.
14. Do not misrepresent estimated data.
15. Respect data licenses.
16. Maintain asset provenance.
17. Use geographic coordinate transformations correctly.
18. Avoid unnecessary dependencies.
19. Avoid unnecessary abstractions.
20. Avoid excessive React re-renders.
21. Manage GPU resources.
22. Optimize loading and memory.
23. Maintain responsive UX.
24. Maintain SEO.
25. Use current official documentation.
26. Use relevant Skills.
27. Use relevant MCP servers.
28. Evaluate Plugins before installation.
29. Use CodeGraph for architectural impact analysis.
30. Preserve Git user changes.
31. Do not automatically commit or push.
32. Never claim unverified results.
33. Document important architectural decisions.
34. Test before declaring completion.
35. Do not start Phase 11 without approval.

---

# 26. FINAL PROJECT SUCCESS DEFINITION

The project is successful when the repository becomes:

**A scalable Next.js-based 3D world platform with a reusable Three.js engine, a reusable element/prefab and asset architecture, a geographically accurate Da Nang world foundation, a professional SEO-ready website, a verified data and rendering pipeline, and a consistent engineering standard across Claude Code and Codex.**

The platform must be capable of expanding Da Nang progressively without repeatedly rewriting the engine or duplicating elements.

Every new road system, building type, tree, landmark, street object, material or interaction should follow established reusable contracts.

Every real-world element must have a traceable geographic and asset source.

Every optimization must be supported by measurements.

Every architectural decision must be documented.

The project must prioritize:

1. Geographic correctness.
2. Visual realism.
3. Reusability.
4. Performance.
5. Maintainability.
6. Scalability.
7. SEO.
8. Engineering quality.

**BEGIN WITH MILESTONE 0 — COMPLETE REPOSITORY AUDIT.**

Do not skip the audit.

Do not start by writing code blindly.

Understand the entire repository and original Phase 1–10 implementation.

Research technologies using current official documentation.

Use the most relevant Skills, MCP servers and Plugins available in the active AI environment.

Create an implementation plan based on actual source dependencies.

Then execute the milestones systematically.

The final source must be real, testable, maintainable and ready for the next approved development phase.

**THIS IS THE OFFICIAL MASTER ENGINEERING SPECIFICATION FOR DA NANG 3D OPEN WORLD.**