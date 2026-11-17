# Phase 10 Integration Verification and Completion Plan

> **For agentic workers:** Use superpowers:executing-plans to execute the remaining work inline. Preserve existing uncommitted changes. Do not commit or push.

**Goal:** Complete and verify the existing browser integration requested in Prompt 01, preserving the original synthetic simulation and reusable frontend foundation.

**Architecture:** The homepage already renders the server WorldExplorer module, which owns semantic copy and a client dynamic boundary. The client hook owns browser lifecycle and sampled HUD state; the Three.js runtime composes generic engine services with Da Nang synthetic content. Extend the responsible owner only when verification exposes a gap.

**Tech Stack:** Existing Next.js 16, React 19, Three.js WebGL2, typed next-intl messages, Vitest and native Chrome DevTools Protocol. No new dependencies.

**Spec:** The owner's Prompt 01 in this session; `docs/prompts/DA_NANG_3D_OPEN_WORLD_MASTER_IMPLEMENTATION.md`, with current-task restrictions taking precedence.

## Global Constraints

- Preserve `history/` as the behavioral oracle, all user changes, Health, API infrastructure, locale proxy, providers, SEO, Docker and CI.
- One renderer and one controlled animation loop. Shared assets have exactly one owner. React snapshots run at controlled cadence.
- Synthetic meters only; no GIS ingestion, new geography, first-person mode or Product Phase 11.
- Fixed weather upstream, 10-second timeout, validation and 15-minute valid-observation cache; retain stale observations after failures.
- Preserve English/Vietnamese translation key and ICU parity. No dependency or public environment changes.

## Migration and Rollback

Readers: the homepage Server Component and WorldExplorer client boundary. Writers: mutable runtime state, sampled hook state and weather observation cache. No persisted user data changes. Runtime instances are isolated and disposed on unmount; deployments do not share browser state. The weather contract remains compatible. Roll back task-specific source changes without touching prior user changes; keep archive and operational routes unchanged. Authorized contraction is limited to the already removed demo feature.

## Review Focus

- Keyboard focus and modifier changes must not leave movement stuck.
- Context loss, hidden documents, failed initialization and repeated mounts must stop loops and release owned resources.
- Multitouch must preserve independent movement, sprint, jump and camera pointer identities.
- Failed weather requests must never appear as valid observations; distinguish controlled test data from live provider evidence.
- HUD controls, dialogs and mobile layouts must remain operable over the scene.

## Tasks

- [x] Inspect Git status and CodeGraph dependencies; identify existing integration and user changes.
- [x] Read existing migration/architecture documents and establish baseline lint, format, type and unit checks.
- [x] Open actual homepage in Chrome and inspect rendered scene, HUD, movement and console/network failures.
- [x] Audit original scene, behavior, lifecycle and HUD against current code; record exact missing responsibilities.
- [x] Add regression tests before correcting confirmed defects at their responsible owner.
- [x] Verify desktop camera, jump/landing, minimap, interactions, dialogs, fullscreen and keyboard isolation.
- [x] Verify `/vi`, touch controls, mobile layout, WebGL recovery/failure, repeated mounts, and Health routes.
- [x] Confirm Posts/Proxy demo cleanup and preservation of generic API infrastructure.
- [x] Run required lint, format, type, unit, production and Storybook checks; record host limitations honestly.
- [x] Replace stale migration/phase/lifecycle claims with current source paths, evidence and remaining limitations.

## Final Evidence

All required quality gates passed using Node 22.22.3: lint, format, types, 31 unit files / 124 tests, isolated production build and Storybook. Final desktop/mobile, focused lifecycle/dialog/minimap and actual-live-weather browser runs recorded zero console warnings/errors. See `docs/migration/INTEGRATION_REPORT_2026_11_17.md` and dated evidence. The original TSX, handover and master specification were read completely by the read-only reviewer. Remaining limitations are explicitly documented; Product Phase 11 is unstarted.

Ruling: reuse the already integrated homepage and fix verified defects instead of recreating extracted foundations. The current source is ahead of the old migration report.

Ruling: preserve the owner's running processes and use an isolated build copy. Root build output is locked by the owner's Chrome profile; the temporary source copy and QA server were removed afterward.

Ruling: use installed Three.js `resetState()` before renderer disposal to restore GL texture-upload state on Retry. Browser evidence confirmed retained unpack flags were the warning source; TLS verification and lint rules were never disabled.

## Initial Evidence

`pnpm.cmd lint`: passed. `pnpm.cmd test`: 30 files, 121 tests passed. `pnpm.cmd type-check`: passed outside the sandbox, where SWC can access its native cache. Format baseline fails on Windows CRLF checkouts (322 reported files). Existing user dev server uses port 3001; this task does not own or stop that process. First Chrome capture confirms a real scene, character, terrain, fixtures, minimap and HUD; observed walking approximately 4.5 m/s and sprint approximately 8.6 m/s. Live `/api/weather` returned 502; no observation was fabricated.
