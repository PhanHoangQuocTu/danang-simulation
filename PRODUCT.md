# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

- Primary: visitors and potential travelers exploring Da Nang, Vietnam.
- Secondary: stakeholders and developers evaluating the interactive 3D experience.
- The intended first action is to smoothly orbit, navigate, and inspect recognizable Da Nang landmarks, including bridges, coastline, and skyline, immediately upon loading. Clear visual cues and minimal friction are required.

## Product Purpose

Da Nang 3D Open World is a browser-based city exploration experience. Its long-term vision is a realistic, geographically accurate digital twin of Da Nang.

The current synthetic scene is an early-stage prototype for evaluating navigation, rendering, environmental simulation, and interactions. It is not a surveyed representation of the city. Landmark exploration is the intended product experience, not a claim that accurate landmarks are already implemented.

Success means visitors can begin exploring immediately, understand how to move and inspect places, and maintain a clear view of the world while doing so.

## Positioning

The confirmed direction combines interactive spatial exploration of Da Nang with local time, astronomical sunlight, and live weather. Geographic correctness and visual realism are long-term requirements. Competitive differentiation beyond this direction remains undecided.

## Operating Context

- The experience runs in a web browser, with keyboard and mouse, touch, and hybrid input support.
- Current workflows include third-person movement, camera orbit and zoom, a mini map, inspecting synthetic fixtures, and viewing time and weather.
- Visitors need clear navigation cues; stakeholders and developers also use diagnostics to evaluate runtime behavior.
- English and Vietnamese are supported. Da Nang time uses `Asia/Ho_Chi_Minh`.

## Capabilities and Constraints

- Preserve the existing Next.js App Router, React, TypeScript, and Three.js foundation and repository conventions.
- Prioritize real-time WebGL rendering performance, targeting smooth 60 fps. This is a target, not a verified performance claim.
- Keep spatial UI overlays restrained so they do not obstruct the 3D viewport or interfere with camera and movement input.
- Preserve modular architecture so synthetic assets can later be replaced by GIS or photogrammetry data.
- Current terrain and interaction fixtures use synthetic local coordinates. Do not label them as verified geographic data.
- The prototype includes third-person navigation, camera controls, time and solar simulation, live weather with freshness and failure states, and synthetic object interactions.
- First-person navigation is part of the master specification's intended experience; current support must be verified before being presented as available.
- Geographic data sources, accuracy thresholds, asset licensing, supported device performance tiers, and a landmark delivery sequence remain open decisions.

## Brand Commitments

The existing product name is Da Nang 3D Open World; the short name is Da Nang 3D. Preserve the focus on Da Nang, Vietnam. No additional binding voice or visual identity choices were established during init.

## Evidence on Hand

- `docs/prompts/DA_NANG_3D_OPEN_WORLD_MASTER_IMPLEMENTATION.md`: long-term mission and engineering requirements.
- `src/modules/WorldExplorer/`: current explorer interface and runtime integration.
- `src/messages/en/worldExplorer.json` and `src/messages/vi/worldExplorer.json`: localized product copy, controls, and explicit synthetic-scene disclosures.
- `src/worlds/danang/` and `src/world-assets/`: current world and asset implementation.
- `history/code/da_nang_3d_open_world_simulation_phase_10.tsx`: historical behavioral reference.
- `docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md`: geographic data research, not proof of verified city coverage.
- Older boilerplate and progress documentation can lag behind the implementation. Verify current capabilities against source and runtime before making public claims.

No verified city-scale geography, photogrammetry coverage, or sustained 60 fps benchmark was established during init. Do not fabricate coverage or performance evidence.

## Product Principles

1. Make exploration immediate: visitors should understand and begin navigation with minimal friction.
2. Keep the world visible: overlays support spatial exploration without obstructing it.
3. Protect interaction performance: evaluate changes against the smooth 60 fps target.
4. State geographic truth clearly: distinguish synthetic prototype content from verified city data.
5. Build for replacement: isolate world data and assets so accurate geographic content can replace synthetic fixtures.

## Accessibility & Inclusion

Preserve English and Vietnamese parity and support keyboard, mouse, and touch input. Navigation cues must remain clear across input methods. Additional product-specific accessibility requirements and a formal conformance target remain undecided.
