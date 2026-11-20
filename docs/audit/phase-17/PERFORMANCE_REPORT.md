# Phase 17 — Performance Report

**Measured:** 2026-11-20, in Vitest (jsdom) via `buildGisLayer` on the
real DEM provider — geometry construction cost, not frame rate.
**Not measured:** FPS 60 on a real GPU (standing blocker, no GPU in
this VM; SwiftShader FPS is NOT_APPLICABLE).

## Layer cost (one build of the full pilot)

| Item | Value |
| --- | --- |
| Road ribbon triangles | 42,966 |
| Junction disc triangles | 10,500 (525 discs x 20 segments) |
| Extruded building triangles | 160 (8 buildings) |
| Footprint triangles | 1,554 (410 buildings) |
| **Total GIS triangles** | **55,180** |
| **GIS draw calls** | **4** (roads, junctions, buildings, footprints — merged) |
| GIS meshes | 4 |
| Asset file | 209,657 bytes (`danang-gis-pilot.ts`; JSON payload 192,783 bytes) |
| Asset decode (test) | ~0.4–0.6 s in the decode test run (includes Zod validation of 2,248 features) |

## Context

- The synthetic terrain mesh is 16,641 vertices (128x128 segments);
  the DEM mesh is 10,000 vertices. The GIS layer (55,180 triangles)
  is the largest single triangle contributor in GIS mode, but it is
  4 draw calls, not 2,248 — merging is what keeps it cheap.
- Road ribbons dominate (78% of GIS triangles) because centrelines
  are subdivided to ≤ 10 m for terrain draping: 178,315 m of road at
  10 m steps is ~17,800 segments x 2 triangles.
- Junction discs are the second cost (19%). A 20-segment disc is
  generous; 12 segments would cut this by 40% if ever needed.
- Extruded buildings are negligible (160 triangles) because only 8 of
  418 buildings have any height. If heights were ever sourced for all
  buildings, this number would grow roughly 100x — a future perf
  review would be needed then, not now.

## What is NOT claimed

- No FPS, frame-time, draw-call, or memory measurement in a browser:
  browser QA ran 2026-11-20 (`BROWSER_QA_REPORT.md`, P17-19 PARTIAL —
  jump arc and context-loss restore unverified). The
  numbers above are construction-time geometry counts.
- No long-session / GPU memory profiling (standing blocker).
- The 209,657-byte asset exceeds the < 200 KB target by ~5%: the
  target was set before the pilot's real size was known (1,830 runs /
  418 buildings). The payload itself is 192,783 bytes; the rest is the
  TS header/provenance and formatting. No data was dropped to hit the
  number.
