# Phase 16 — Baseline Report

Date: 2026-11-20. Local HEAD `9170689` (`docs(audit): consolidate phase evidence and companion reports (Option A)`), tree clean before Phase 16 edits. Toolchain: Node 22.23.5 / pnpm 12.14.0 from `~/workspace/danang-simulation-work/tools/node-v22.23.5-linux-x64/bin`.

## Baseline gates (all exit 0, run before any Phase 16 edit)

| Gate | Command | Result |
| --- | --- | --- |
| Lint | `pnpm lint` | exit 0, 424 files |
| Format | `pnpm format:check` | exit 0, 423 files |
| Type-check | `pnpm type-check` | exit 0 |
| Test | `pnpm test` | exit 0, **47 files / 280 tests**, 66.08 s |
| Build | `pnpm build` | exit 0, 7.2 s, 14 static pages |
| Storybook | `pnpm build-storybook` | exit 0, 12.12 s, 0 PLUGIN_TIMINGS |
| Audit | `pnpm audit --prod` | exit 0, no known vulnerabilities |

## Final gates (after all Phase 16 edits, same toolchain)

| Gate | Command | Result | Evidence |
| --- | --- | --- | --- |
| Lint | `pnpm lint` | exit 0 | `evidence/lint.log` |
| Format | `pnpm format:check` | exit 0 | `evidence/format-check.log` |
| Type-check | `pnpm type-check` | exit 0 | `evidence/type-check.log` |
| Test | `pnpm test` | exit 0, **52 files / 298 tests** | `evidence/test.log` |
| Build | `pnpm build` | exit 0, 14 static pages | `evidence/build.log` |
| Storybook | `pnpm build-storybook` | exit 0, 0 PLUGIN_TIMINGS | `evidence/build-storybook.log` |
| Audit | `pnpm audit --prod` | exit 0, no known vulnerabilities | `evidence/audit-prod.log` |

Test delta: +5 files / +18 tests. 16 are new Phase 16 tests (pilot asset 6, terrain mode 2, terrain mesh 2, DEM grounding 3, DEM scene/runtime 3); 2 are the TER-09/TER-10 diagnostics tests added with the diagnostics extension. No existing test was weakened except two deliberate rule changes, recorded in the implementation report §6: orthometric datum acceptance (validation/grid tests) and `copernicus-dsm` ingestion approval (data-sources DS-01/10/25). Both reflect a documented rule change, not a lowered bar.

## Gate failures encountered and fixed during the work

1. `pnpm lint` exit 1: unused imports in `dem-grounding.test.ts` (removed), `noNestedTernary` in `terrain-diagnostics.ts` (rewritten as if/else) and in the base64 decoder in `danang-dem-pilot.ts` (rewritten as if/else).
2. `pnpm format:check` exit 1: 7 files reformatted with Biome (`biome format --write`).
3. `pnpm type-check` exit 1: `sampleSupportSurface` needs 4 arguments (`x, z, currentY, playerRadius`); the grounding test passed 2. Fixed at the call site; no product code changed.

Each failure was fixed and the gate re-run to exit 0. No gate was skipped, no warning suppressed.

## What the baseline did NOT include

- No browser verification was run in this session (see `PERFORMANCE_REPORT.md` and `KNOWN_ISSUES.md`): the subagent that did this work has no live-browser capability. The production build exists (`.next/`), and the browser procedure is documented so the parent agent can run it.
- Coverage numbers were not re-measured in the final run; the baseline coverage (77.83% / 67.3% / 63.03% / 79.64%) is from Phase 15. The full test suite passes; coverage re-measurement is a follow-up, not a gate in this phase.
