# Evidence Log — docs/audit/phase-14/evidence

Consolidated from 76 text log files in `docs/audit/phase-14/evidence` on 2026-11-20 as part of Option A docs consolidation. Each section preserves one original file verbatim (UTF-16 files decoded to UTF-8, CRLF normalized to LF). The original `*.txt` files were removed; `*.cjs.txt` files (executable script copies) were kept in place. PNG, JSON and other non-txt evidence files are unchanged.
## Index

- [after-server.txt](#after-servertxt) — 146 bytes, UTF-8
- [alignment-first.txt](#alignment-firsttxt) — 3082 bytes, UTF-16LE with BOM
- [alignment-red.txt](#alignment-redtxt) — 5218 bytes, UTF-16LE with BOM
- [alignment-trust.txt](#alignment-trusttxt) — 478 bytes, UTF-16LE with BOM
- [baseline-build-storybook.txt](#baseline-build-storybooktxt) — 3640 bytes, UTF-16LE with BOM
- [baseline-build.txt](#baseline-buildtxt) — 5494 bytes, UTF-16LE with BOM
- [baseline-format-check.txt](#baseline-format-checktxt) — 798 bytes, UTF-16LE with BOM
- [baseline-lint.txt](#baseline-linttxt) — 790 bytes, UTF-16LE with BOM
- [baseline-retry-build-storybook.txt](#baseline-retry-build-storybooktxt) — 30550 bytes, UTF-16LE with BOM
- [baseline-retry-build.txt](#baseline-retry-buildtxt) — 2932 bytes, UTF-16LE with BOM
- [baseline-retry-type-check.txt](#baseline-retry-type-checktxt) — 924 bytes, UTF-16LE with BOM
- [baseline-server.txt](#baseline-servertxt) — 146 bytes, UTF-8
- [baseline-test.txt](#baseline-testtxt) — 1778 bytes, UTF-16LE with BOM
- [baseline-type-check.txt](#baseline-type-checktxt) — 5432 bytes, UTF-16LE with BOM
- [baseline-ui-server.txt](#baseline-ui-servertxt) — 146 bytes, UTF-8
- [canvas-cleanup.txt](#canvas-cleanuptxt) — 474 bytes, UTF-16LE with BOM
- [clean-coverage.txt](#clean-coveragetxt) — 27062 bytes, UTF-16LE with BOM
- [clean-test.txt](#clean-testtxt) — 1778 bytes, UTF-16LE with BOM
- [coverage-retry.txt](#coverage-retrytxt) — 27262 bytes, UTF-16LE with BOM
- [dependencies-diff.txt](#dependencies-difftxt) — 34496 bytes, UTF-16LE with BOM
- [dependency-audit-after.json.txt](#dependency-audit-afterjsontxt) — 2036 bytes, UTF-16LE with BOM
- [dependency-audit.json.txt](#dependency-auditjsontxt) — 6572 bytes, UTF-16LE with BOM
- [diff-check.txt](#diff-checktxt) — 5072 bytes, UTF-16LE with BOM
- [docker.txt](#dockertxt) — 1906 bytes, UTF-16LE with BOM
- [document-lint.txt](#document-linttxt) — 790 bytes, UTF-16LE with BOM
- [file-inventory.txt](#file-inventorytxt) — 9511 bytes, UTF-8 with BOM
- [final-build-storybook.txt](#final-build-storybooktxt) — 30368 bytes, UTF-16LE with BOM
- [final-build.txt](#final-buildtxt) — 2934 bytes, UTF-16LE with BOM
- [final-coverage.txt](#final-coveragetxt) — 4662 bytes, UTF-16LE with BOM
- [final-document-format.txt](#final-document-formattxt) — 798 bytes, UTF-16LE with BOM
- [final-document-lint.txt](#final-document-linttxt) — 790 bytes, UTF-16LE with BOM
- [final-format-check.txt](#final-format-checktxt) — 798 bytes, UTF-16LE with BOM
- [final-lint.txt](#final-linttxt) — 2758 bytes, UTF-16LE with BOM
- [final-test.txt](#final-testtxt) — 2386 bytes, UTF-16LE with BOM
- [final-type-check.txt](#final-type-checktxt) — 922 bytes, UTF-16LE with BOM
- [focused.txt](#focusedtxt) — 7016 bytes, UTF-16LE with BOM
- [frozen-lockfile-retry.txt](#frozen-lockfile-retrytxt) — 188 bytes, UTF-16LE with BOM
- [frozen-lockfile.txt](#frozen-lockfiletxt) — 1194 bytes, UTF-16LE with BOM
- [git-platform-notices.txt](#git-platform-noticestxt) — 5912 bytes, UTF-16LE with BOM
- [input-green.txt](#input-greentxt) — 478 bytes, UTF-16LE with BOM
- [input-red.txt](#input-redtxt) — 6478 bytes, UTF-16LE with BOM
- [inspector-first.txt](#inspector-firsttxt) — 476 bytes, UTF-16LE with BOM
- [inspector-green.txt](#inspector-greentxt) — 476 bytes, UTF-16LE with BOM
- [iteration-lint.txt](#iteration-linttxt) — 790 bytes, UTF-16LE with BOM
- [next-security-update.txt](#next-security-updatetxt) — 3238 bytes, UTF-16LE with BOM
- [node22-build-retry.txt](#node22-build-retrytxt) — 2928 bytes, UTF-16LE with BOM
- [node22-build-storybook.txt](#node22-build-storybooktxt) — 30368 bytes, UTF-16LE with BOM
- [node22-build.txt](#node22-buildtxt) — 2810 bytes, UTF-16LE with BOM
- [node22-format-check.txt](#node22-format-checktxt) — 22052 bytes, UTF-16LE with BOM
- [node22-lint.txt](#node22-linttxt) — 2758 bytes, UTF-16LE with BOM
- [node22-test.txt](#node22-testtxt) — 1780 bytes, UTF-16LE with BOM
- [node22-type-check.txt](#node22-type-checktxt) — 924 bytes, UTF-16LE with BOM
- [peer-dependencies.txt](#peer-dependenciestxt) — 262 bytes, UTF-16LE with BOM
- [picomatch-paths.txt](#picomatch-pathstxt) — 3586 bytes, UTF-16LE with BOM
- [preview-transport.txt](#preview-transporttxt) — 474 bytes, UTF-16LE with BOM
- [process-cleanup.txt](#process-cleanuptxt) — 224 bytes, UTF-16LE with BOM
- [redirect-security-update.txt](#redirect-security-updatetxt) — 756 bytes, UTF-16LE with BOM
- [release-build-storybook.txt](#release-build-storybooktxt) — 30368 bytes, UTF-16LE with BOM
- [release-build.txt](#release-buildtxt) — 2932 bytes, UTF-16LE with BOM
- [release-format-check.txt](#release-format-checktxt) — 17406 bytes, UTF-16LE with BOM
- [release-format-retry.txt](#release-format-retrytxt) — 798 bytes, UTF-16LE with BOM
- [release-host-mismatch-server.txt](#release-host-mismatch-servertxt) — 148 bytes, UTF-8
- [release-lint.txt](#release-linttxt) — 790 bytes, UTF-16LE with BOM
- [release-server.txt](#release-servertxt) — 146 bytes, UTF-8
- [release-test.txt](#release-testtxt) — 1982 bytes, UTF-16LE with BOM
- [release-type-check.txt](#release-type-checktxt) — 924 bytes, UTF-16LE with BOM
- [review-gcp-red.txt](#review-gcp-redtxt) — 3074 bytes, UTF-16LE with BOM
- [review-green.txt](#review-greentxt) — 478 bytes, UTF-16LE with BOM
- [runtime-coverage-retry.txt](#runtime-coverage-retrytxt) — 2180 bytes, UTF-16LE with BOM
- [runtime-interaction.txt](#runtime-interactiontxt) — 454 bytes, UTF-16LE with BOM
- [stabilization-server.txt](#stabilization-servertxt) — 146 bytes, UTF-8
- [stale-preview-green.txt](#stale-preview-greentxt) — 476 bytes, UTF-16LE with BOM
- [storybook-server.txt](#storybook-servertxt) — 0 bytes, ASCII
- [trust-preview-latest.txt](#trust-preview-latesttxt) — 10186 bytes, UTF-16LE with BOM
- [trust-red.txt](#trust-redtxt) — 5176 bytes, UTF-16LE with BOM
- [types-iteration.txt](#types-iterationtxt) — 0 bytes, ASCII

## after-server.txt

- Original file: `after-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.5
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 42ms
```

## alignment-first.txt

- Original file: `alignment-first.txt`
- Original size: 3082 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

 ❯ src/engine/imagery/__tests__/alignment.test.ts (35 tests | 1 failed) 41ms
   ❯ raster alignment (35)
     × IMG-06 north-up corner has negative row Y 7ms
pnpm.cmd : 
At line:2 char:1
+ pnpm.cmd exec vitest run src/engine/imagery/__tests__/alignment.test. ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/engine/imagery/__tests__/alignment.test.ts > raster alignment > IMG-06 north-up corner has negative row Y
AssertionError: expected { x: 108.20100000000001, …(1) } to deeply equal { x: 108.201, y: 16.058999999999997 }

- Expected
+ Received

  {
-   "x": 108.201,
+   "x": 108.20100000000001,
    "y": 16.058999999999997,
  }

 ❯ src/engine/imagery/__tests__/alignment.test.ts:45:78
     43|   });
     44|   it('IMG-06 north-up corner has negative row Y', () => {
     45|     expect(pixelToNativeCoordinate({column:100,row:100}, valid().trans…
       |                                                                              ^
     46|   });
     47|   it('IMG-07 rotated signed off-diagonal forward vector', () => {

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 34 passed (35)
   Start at  03:12:08
   Duration  2.12s (environment 65%, setup 17%, import 9%, transform 5%, tests 2%, worker 1%)
```

## alignment-red.txt

- Original file: `alignment-red.txt`
- Original size: 5218 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

 ❯ src/engine/imagery/__tests__/alignment.test.ts (0 test)
pnpm.cmd : 
At line:2 char:1
+ pnpm.cmd exec vitest run src/engine/imagery/__tests__/alignment.test. ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/engine/imagery/__tests__/alignment.test.ts [ src/engine/imagery/__tests__/alignment.test.ts ]
Error: Failed to resolve import "../alignment" from "src/engine/imagery/__tests__/alignment.test.ts". Does the file 
exist?
  Plugin: vite:import-analysis
  File: C:/Workspace/Personnel/danang-simulation/src/engine/imagery/__tests__/alignment.test.ts:8:7
  2  |  import { createGeoReference } from "@/engine/geospatial/core";
  3  |  import { runGeospatialDiagnosticsSuite } from "@/modules/WorldExplorer/geospatial-diagnostics";
  4  |  ...RasterRegistration, evaluateControlPoints, isNoData } from "../alignment";
     |                                                                 ^
  5  |  // TEST DATA only: invented grid, never satellite observations or survey control.
  6  |  export const rasterFixture = {
 ❯ TransformPluginContext._formatLog node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/no
de_modules/vite/dist/node/chunks/node.js:8766:39
 ❯ TransformPluginContext.error node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_mo
dules/vite/dist/node/chunks/node.js:8763:14
 ❯ normalizeUrl node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_modules/vite/dist/
node/chunks/node.js:26632:18
 ❯ node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_modules/vite/dist/node/chunks/n
ode.js:26702:30
 ❯ TransformPluginContext.transform node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/nod
e_modules/vite/dist/node/chunks/node.js:26668:4
 ❯ EnvironmentPluginContainer.transform node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6
/node_modules/vite/dist/node/chunks/node.js:8545:14
 ❯ loadAndTransform node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_modules/vite/d
ist/node/chunks/node.js:20184:26

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  no tests
   Start at  03:11:51
   Duration  1.66s (environment 68%, setup 30%, worker 1%, transform 1%)
```

## alignment-trust.txt

- Original file: `alignment-trust.txt`
- Original size: 478 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  3 passed (3)
      Tests  57 passed (57)
   Start at  03:14:19
   Duration  2.62s (environment 68%, setup 16%, import 10%, transform 3%, tests 2%, worker 1%)
```

## baseline-build-storybook.txt

- Original file: `baseline-build-storybook.txt`
- Original size: 3640 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:2 char:149
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:16824) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
|
o  Loading presets
|
o  Building manager..
|
•  Building open services..
|
•  Building preview..
|
x  Failed to build the preview
|
x  [38;2;241;97;97mError: Failed to load native binding[39m
|  at Object.<anonymous>
|  (.\node_modules\.pnpm\@swc+core@1.16.18_@swc+helpers@0.5.23\node_modules\@swc\core\binding.js:345:11)
|  at Module._compile (node:internal/modules/cjs/loader:1968:14)
|  at node:internal/modules/cjs/loader:2108:10
|  at require.extensions..js
|  (.\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c852c7e4a\node_modules\next\dist\build\next-config-ts\require-hook.js:49:20)
|  at Module.load (node:internal/modules/cjs/loader:1690:32)
|  at Module._load (node:internal/modules/cjs/loader:1480:12)
|  at wrapModuleLoad (node:internal/modules/cjs/loader:261:19)
|  at Module.<anonymous> (node:internal/modules/cjs/loader:1713:12)
|  at mod.require
|  (.\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c852c7e4a\node_modules\next\dist\server\require-hook.js:79:28)
|  at require (node:internal/modules/helpers:318:16)
|
—  Storybook exited with an error

[ELIFECYCLE] Command failed with exit code 1.
```

## baseline-build.txt

- Original file: `baseline-build.txt`
- Original size: 5494 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:2 char:149
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
⨯ Failed to load next.config.ts, see more info here https://nextjs.org/docs/messages/next-config-error

> Build error occurred
Error: Failed to load native binding
    at ignore-listed frames {
  [cause]: [
    Error: Cannot find module './swc.win32-x64-msvc.node'
    Require stack:
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\@swc+core@1.16.18_@swc+helpers@0.5.23\node_modules\@s
wc\core\binding.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\@swc+core@1.16.18_@swc+helpers@0.5.23\node_modules\@s
wc\core\index.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next-intl@4.14.9_@swc+helpe_322b7055cfa30f3b1609a1f61
94c2317\node_modules\next-intl\dist\cjs\development\plugin.cjs
    - C:\Workspace\Personnel\danang-simulation\next.config.compiled.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\build\next-config-ts\transpile-config.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\server\config.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\cli\next-test.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\bin\next
        at ignore-listed frames {
      code: 'MODULE_NOT_FOUND',
      requireStack: [Array]
    },
    Error: SWC native addon: user cache failed: validate cache root C:\Users\USER\AppData\Local\swc: cache ancestor 
C:\Users\USER\AppData\Local\swc has untrusted owner SID S-1-5-21-3755296832-436628576-2309662567-1001; fallback cache 
failed: create cache root C:\Users\USER\.swc-cache: Access is denied. (os error 5); set SWC_NATIVE_BINDING_CACHE to a 
safe absolute directory owned by your user whose ancestors do not grant other users replacement rights. Reinstall the 
native package if its payload is damaged; check SWC_NATIVE_BINDING_CACHE and directory permissions for materialization 
failures.
        at ignore-listed frames {
      code: 'ERR_SWC_NATIVE_CACHE'
    }
  ]
}
[ELIFECYCLE] Command failed with exit code 1.
```

## baseline-format-check.txt

- Original file: `baseline-format-check.txt`
- Original size: 798 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:2 char:149
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 372 files in 161ms. No fixes applied.
```

## baseline-lint.txt

- Original file: `baseline-lint.txt`
- Original size: 790 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:2 char:149
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 373 files in 341ms. No fixes applied.
```

## baseline-retry-build-storybook.txt

- Original file: `baseline-retry-build-storybook.txt`
- Original size: 30550 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:2 char:120
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:15152) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
|
o  Loading presets
|
o  Building manager..
|
•  Building open services..
|
•  Building preview..
|
•  Copying static files: public at storybook-static
|  Vite vite v8.3.4 building client environment for production...
transforming...
✓ 4807 modules transformed.
rendering chunks...
computing gzip size...
|  Vite storybook-static/iframe.html
|  20.52 kB │ gzip:   5.60 kB
|  storybook-static/assets/world-CZmdgin0.css
|  19.83 kB │ gzip:   4.71 kB
|  storybook-static/assets/iframe-BaSE0WOI.css
|  206.47 kB │ gzip:  30.87 kB
|  storybook-static/assets/iframe-BnpeCcBm.js
|  0.04 kB │ gzip:   0.06 kB
|  storybook-static/assets/dist-BpWrIoGY.js
|  0.22 kB │ gzip:   0.19 kB
|  storybook-static/assets/chunk-242VQQM5-CJ9i1iaj.js
|  0.24 kB │ gzip:   0.20 kB
|  storybook-static/assets/dist-Bgc6TXR4.js
|  0.24 kB │ gzip:   0.21 kB
|  storybook-static/assets/check-C4l0qdMD.js
|  0.26 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-down-Db-YoaoO.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/chevron-left-Cd9RGiHq.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-right-D1L19B_Q.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/circle-DWuLk5md.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/x-B1sqVEY7.js
|  0.29 kB │ gzip:   0.24 kB
|  storybook-static/assets/formatter-L2YTDE3Q-DqPs7d2n.js
|  0.30 kB │ gzip:   0.24 kB
|  storybook-static/assets/loader-circle-CSUbcJrl.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/search-B43BJUb4.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/chunk-QQBDHPVZ-BJU3Mk0_.js
|  0.32 kB │ gzip:   0.19 kB
|  storybook-static/assets/info-CSIANWNH.js
|  0.34 kB │ gzip:   0.26 kB
|  storybook-static/assets/ellipsis-Dfn6svcK.js
|  0.39 kB │ gzip:   0.27 kB
|  storybook-static/assets/skeleton-BnsNpVbF.js
|  0.41 kB │ gzip:   0.29 kB
|  storybook-static/assets/dist-BOqIPbtB.js
|  0.42 kB │ gzip:   0.31 kB
|  storybook-static/assets/use-mobile-BB6e8wyp.js
|  0.42 kB │ gzip:   0.29 kB
|  storybook-static/assets/inbox-CbvC1Bd7.js
|  0.43 kB │ gzip:   0.32 kB
|  storybook-static/assets/jsx-runtime-BxfXuubT.js
|  0.43 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-C9t7Cshp.js
|  0.44 kB │ gzip:   0.32 kB
|  storybook-static/assets/WorldExplorerClient.stories-BQ1HMTcQ.js
|  0.45 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-P5aEaGBE.js
|  0.49 kB │ gzip:   0.33 kB
|  storybook-static/assets/react-CubzI6CK.js
|  0.58 kB │ gzip:   0.34 kB
|  storybook-static/assets/dist-BDazaY1u.js
|  0.64 kB │ gzip:   0.43 kB
|  storybook-static/assets/textarea.stories-CNc698vf.js
|  0.65 kB │ gzip:   0.38 kB
|  storybook-static/assets/chunk-UAWMPV5J-Dsq9DvcU.js
|  0.74 kB │ gzip:   0.45 kB
|  storybook-static/assets/dist-BNjw8BE7.js
|  0.75 kB │ gzip:   0.45 kB
|  storybook-static/assets/enum-CwrLEL0d.js
|  0.78 kB │ gzip:   0.45 kB
|  storybook-static/assets/toggle.stories-Q84BqJ2J.js
|  0.78 kB │ gzip:   0.44 kB
|  storybook-static/assets/checkbox.stories-DIHgK8RS.js
|  0.80 kB │ gzip:   0.37 kB
|  storybook-static/assets/Icons.stories-DDEyaz2J.js
|  0.80 kB │ gzip:   0.50 kB
|  storybook-static/assets/textarea-BbLnRPqe.js
|  0.83 kB │ gzip:   0.50 kB
|  storybook-static/assets/label.stories-9eKD3mf9.js
|  0.83 kB │ gzip:   0.48 kB
|  storybook-static/assets/dist-Ch4r59Bc.js
|  0.85 kB │ gzip:   0.50 kB
|  storybook-static/assets/dist-B0agaa99.js
|  0.85 kB │ gzip:   0.54 kB
|  storybook-static/assets/shim-C5Xie9xJ.js
|  0.85 kB │ gzip:   0.46 kB
|  storybook-static/assets/tooltip.stories-D-Ah9nw-.js
|  0.87 kB │ gzip:   0.49 kB
|  storybook-static/assets/spinner.stories-Bb7RuOmR.js
|  0.93 kB │ gzip:   0.51 kB
|  storybook-static/assets/skeleton.stories-DSUtaA88.js
|  0.94 kB │ gzip:   0.47 kB
|  storybook-static/assets/with-selector-yh4Qcx8N.js
|  0.94 kB │ gzip:   0.53 kB
|  storybook-static/assets/input-CsO9Atno.js
|  1.01 kB │ gzip:   0.56 kB
|  storybook-static/assets/switch.stories-PtLs2fuF.js
|  1.02 kB │ gzip:   0.54 kB
|  storybook-static/assets/dist-r86zl3cz.js
|  1.03 kB │ gzip:   0.55 kB
|  storybook-static/assets/label-BeO5gq6m.js
|  1.04 kB │ gzip:   0.62 kB
|  storybook-static/assets/input.stories-SMUNiHJP.js
|  1.18 kB │ gzip:   0.53 kB
|  storybook-static/assets/select.stories-GJ1qLA9c.js
|  1.23 kB │ gzip:   0.60 kB
|  storybook-static/assets/rolldown-runtime-2s6bX4vc.js
|  1.26 kB │ gzip:   0.69 kB
|  storybook-static/assets/separator.stories-BU_xmlNe.js
|  1.26 kB │ gzip:   0.55 kB
|  storybook-static/assets/StatusBadge.stories-C_8eplXH.js
|  1.36 kB │ gzip:   0.73 kB
|  storybook-static/assets/input-group.stories-BdISNErZ.js
|  1.36 kB │ gzip:   0.55 kB
|  storybook-static/assets/separator-Azq44eiO.js
|  1.39 kB │ gzip:   0.70 kB
|  storybook-static/assets/card.stories-BLaUhodb.js
|  1.43 kB │ gzip:   0.65 kB
|  storybook-static/assets/badge.stories-BPrM91fh.js
|  1.44 kB │ gzip:   0.66 kB
|  storybook-static/assets/dialog.stories-D_jEOpQA.js
|  1.49 kB │ gzip:   0.66 kB
|  storybook-static/assets/aspect-ratio.stories-fRsWVF3w.js
|  1.55 kB │ gzip:   0.82 kB
|  storybook-static/assets/alert.stories-D_dJ3KQy.js
|  1.55 kB │ gzip:   0.66 kB
|  storybook-static/assets/collapsible.stories-CrpfVjuU.js
|  1.57 kB │ gzip:   0.68 kB
|  storybook-static/assets/kbd.stories-BGpjJOyb.js
|  1.59 kB │ gzip:   0.74 kB
|  storybook-static/assets/preload-helper-0TbE23ZY.js
|  1.64 kB │ gzip:   0.87 kB
|  storybook-static/assets/chunk-IMSF75WX-mRJxbqao.js
|  1.67 kB │ gzip:   0.90 kB
|  storybook-static/assets/dropdown-menu.stories-r32spgcz.js
|  1.69 kB │ gzip:   0.70 kB
|  storybook-static/assets/badge-B3Q-jtvj.js
|  1.73 kB │ gzip:   0.82 kB
|  storybook-static/assets/ThemeProvider-4_Xyiqq5.js
|  1.75 kB │ gzip:   0.95 kB
|  storybook-static/assets/alert-B0jXkKKh.js
|  1.78 kB │ gzip:   0.82 kB
|  storybook-static/assets/card-95wFGgDq.js
|  1.85 kB │ gzip:   0.62 kB
|  storybook-static/assets/dist-Cp023XQn.js
|  1.89 kB │ gzip:   0.83 kB
|  storybook-static/assets/dist-B0_5lTDF.js
|  1.90 kB │ gzip:   0.93 kB
|  storybook-static/assets/form.stories-DD8l7Bpm.js
|  2.10 kB │ gzip:   0.99 kB
|  storybook-static/assets/sheet.stories-BFq77P63.js
|  2.13 kB │ gzip:   0.72 kB
|  storybook-static/assets/toggle-Bqk6sclz.js
|  2.29 kB │ gzip:   1.19 kB
|  storybook-static/assets/button-D2c_9SLl.js
|  2.29 kB │ gzip:   0.99 kB
|  storybook-static/assets/button-group.stories-CkehHyLh.js
|  2.36 kB │ gzip:   0.99 kB
|  storybook-static/assets/native-select.stories-G06xPHfK.js
|  2.56 kB │ gzip:   1.12 kB
|  storybook-static/assets/dist-Cq2hqxqm.js
|  2.83 kB │ gzip:   1.21 kB
|  storybook-static/assets/dist-D3CacQlx.js
|  2.85 kB │ gzip:   1.25 kB
|  storybook-static/assets/progress.stories-C39zBAS-.js
|  2.95 kB │ gzip:   1.43 kB
|  storybook-static/assets/breadcrumb.stories-uV-y4MKs.js
|  2.96 kB │ gzip:   1.02 kB
|  storybook-static/assets/empty.stories-CJA8KERW.js
|  3.18 kB │ gzip:   1.17 kB
|  storybook-static/assets/button.stories-gM96yru6.js
|  3.23 kB │ gzip:   1.18 kB
|  storybook-static/assets/dist-D_OpuV9i.js
|  3.30 kB │ gzip:   1.50 kB
|  storybook-static/assets/chunk-DRQKCCAG-PeJgrGxi.js
|  3.37 kB │ gzip:   1.40 kB
|  storybook-static/assets/sheet-DSdqGTO5.js
|  3.58 kB │ gzip:   1.18 kB
|  storybook-static/assets/pagination.stories-DXkSRfQF.js
|  3.59 kB │ gzip:   1.19 kB
|  storybook-static/assets/dialog-DXsGNYZJ.js
|  3.60 kB │ gzip:   1.21 kB
|  storybook-static/assets/createLucideIcon-DTc4q1oi.js
|  3.66 kB │ gzip:   1.68 kB
|  storybook-static/assets/react-dom-qBXZUrFy.js
|  3.92 kB │ gzip:   1.44 kB
|  storybook-static/assets/input-group-BIEe3yAv.js
|  4.02 kB │ gzip:   1.41 kB
|  storybook-static/assets/common.stories-CJ8YSN8U.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-DX3jJFDb.js
|  4.69 kB │ gzip:   1.98 kB
|  storybook-static/assets/dist-C2PcoYQl.js
|  4.83 kB │ gzip:   2.10 kB
|  storybook-static/assets/dist-BtnfnuYA.js
|  5.09 kB │ gzip:   2.21 kB
|  storybook-static/assets/chunk-7PIQR4A3-BRrgxE8n.js
|  5.14 kB │ gzip:   1.93 kB
|  storybook-static/assets/field.stories-Dg4v51hb.js
|  5.30 kB │ gzip:   1.86 kB
|  storybook-static/assets/switch-DPVChe7p.js
|  5.34 kB │ gzip:   2.23 kB
|  storybook-static/assets/checkbox-CEzcDVsg.js
|  5.36 kB │ gzip:   2.25 kB
|  storybook-static/assets/dist-DM7xvX2L.js
|  5.64 kB │ gzip:   2.03 kB
|  storybook-static/assets/dist-BPgTGWBw.js
|  5.65 kB │ gzip:   2.58 kB
|  storybook-static/assets/avatar.stories-snzB4nyn.js
|  5.79 kB │ gzip:   2.12 kB
|  storybook-static/assets/dist-DGExwuT-.js
|  5.85 kB │ gzip:   2.17 kB
|  storybook-static/assets/ClientBoundary.stories-COtuKjdG.js
|  6.03 kB │ gzip:   2.63 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-B-__UBT7.js
|  6.49 kB │ gzip:   2.57 kB
|  storybook-static/assets/hover-card.stories-Bh0ICGy-.js
|  6.97 kB │ gzip:   2.63 kB
|  storybook-static/assets/dropdown-menu-BchuS8Fg.js
|  7.06 kB │ gzip:   2.41 kB
|  storybook-static/assets/tabs.stories-C47bhjuJ.js
|  7.27 kB │ gzip:   2.60 kB
|  storybook-static/assets/accordion.stories-fo5SQ1Bu.js
|  7.50 kB │ gzip:   2.78 kB
|  storybook-static/assets/context-menu.stories-DUIbkTb2.js
|  7.56 kB │ gzip:   2.73 kB
|  storybook-static/assets/alert-dialog.stories-e4OqrUPg.js
|  7.61 kB │ gzip:   2.20 kB
|  storybook-static/assets/react-C7Icd8fu.js
|  7.90 kB │ gzip:   3.03 kB
|  storybook-static/assets/popover.stories-Cy1nz5tz.js
|  7.98 kB │ gzip:   3.03 kB
|  storybook-static/assets/radio-group.stories-DAgnv6kU.js
|  8.07 kB │ gzip:   3.17 kB
|  storybook-static/assets/Icons-BdTGl1wp.js
|  8.49 kB │ gzip:   2.17 kB
|  storybook-static/assets/dist-ZpFVeXSN.js
|  8.67 kB │ gzip:   3.04 kB
|  storybook-static/assets/form-field.stories-ia_uxvSY.js
|  8.72 kB │ gzip:   2.43 kB
|  storybook-static/assets/menubar.stories-BSKf86iT.js
|  10.19 kB │ gzip:   3.58 kB
|  storybook-static/assets/input-otp.stories-ngCTD5Oe.js
|  12.77 kB │ gzip:   4.94 kB
|  storybook-static/assets/slider.stories-DMrVLFUF.js
|  13.05 kB │ gzip:   5.02 kB
|  storybook-static/assets/sidebar.stories-jKgQBodo.js
|  13.47 kB │ gzip:   4.20 kB
|  storybook-static/assets/es2015-C53hGp5h.js
|  14.52 kB │ gzip:   5.58 kB
|  storybook-static/assets/dist-DRfj0K7B.js
|  14.59 kB │ gzip:   4.93 kB
|  storybook-static/assets/scroll-area.stories-3KNE10P2.js
|  16.08 kB │ gzip:   5.17 kB
|  storybook-static/assets/command.stories-13DTrfcO.js
|  16.62 kB │ gzip:   6.15 kB
|  storybook-static/assets/navigation-menu.stories-BLnzNUVz.js
|  19.93 kB │ gzip:   6.22 kB
|  storybook-static/assets/floating-ui.react-dom-BDsy8TX8.js
|  22.18 kB │ gzip:   8.65 kB
|  storybook-static/assets/chunk-W22LQPXL-DLbOLb-b.js
|  22.67 kB │ gzip:   7.55 kB
|  storybook-static/assets/carousel.stories-XycxZHWD.js
|  24.85 kB │ gzip:   9.57 kB
|  storybook-static/assets/select-BGMpPeXN.js
|  25.93 kB │ gzip:   8.67 kB
|  storybook-static/vite-inject-mocker-entry.js
|  27.81 kB │ gzip:   9.67 kB
|  storybook-static/assets/utils-DcZBOCDd.js
|  27.98 kB │ gzip:   8.99 kB
|  storybook-static/assets/matchers-JIUQ3HVY-DWxIgmlT.js
|  28.79 kB │ gzip:   9.68 kB
|  storybook-static/assets/hooks-CnGoNT_V.js
|  29.87 kB │ gzip:  12.61 kB
|  storybook-static/assets/Color-6AOWCN3U-BHliv8P4.js
|  30.40 kB │ gzip:  11.49 kB
|  storybook-static/assets/WithTooltip-CDUNV5IS-PZG7aayt.js
|  32.72 kB │ gzip:  11.46 kB
|  storybook-static/assets/drawer.stories-1ht9Ezfp.js
|  33.65 kB │ gzip:   9.90 kB
|  storybook-static/assets/sonner.stories-C3oLH7YH.js
|  36.83 kB │ gzip:  10.65 kB
|  storybook-static/assets/form-TDM4j5Az.js
|  42.87 kB │ gzip:  14.86 kB
|  storybook-static/assets/resizable.stories-CXJJ3mua.js
|  46.12 kB │ gzip:  14.97 kB
|  storybook-static/assets/theming-K8zzODLs.js
|  55.39 kB │ gzip:  21.34 kB
|  storybook-static/assets/esm-C2oGAgJS.js
|  57.43 kB │ gzip:  16.68 kB
|  storybook-static/assets/WorldExplorerClient-BzU-gwhF.js
|  71.94 kB │ gzip:  26.42 kB
|  storybook-static/assets/syntaxhighlighter-4REYKNEV-BMUJTQLL.js
|  75.83 kB │ gzip:  27.23 kB
|  storybook-static/assets/calendar.stories-D4SJ_MSG.js
|  80.74 kB │ gzip:  23.91 kB
|  storybook-static/assets/schemas-PsOTFIsQ.js
|  95.32 kB │ gzip:  27.27 kB
|  storybook-static/assets/combobox.stories-BeGpeZiQ.js
|  122.42 kB │ gzip:  42.54 kB
|  storybook-static/assets/utilities.stories-CeDM8hSz.js
|  153.38 kB │ gzip:  50.64 kB
|  storybook-static/assets/DocsRenderer-JROSPFPF-BGvrobzq.js
|  191.34 kB │ gzip:  60.31 kB
|  storybook-static/assets/react-18-mQvaX4pw.js
|  208.00 kB │ gzip:  65.28 kB
|  storybook-static/assets/chart.stories-DTwielht.js
|  394.73 kB │ gzip: 116.74 kB
|  storybook-static/assets/components-CJRtydrz.js
|  556.90 kB │ gzip: 176.49 kB
|  storybook-static/assets/axe-C7pk9Kxd.js
|  659.32 kB │ gzip: 187.87 kB
|  storybook-static/assets/world-Kj5QEi1e.js
|  665.56 kB │ gzip: 176.93 kB
|  storybook-static/assets/iframe-De4Yziln.js
|  1,390.06 kB │ gzip: 393.36 kB

|  Vite ✓ built in 13.55s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 10.8s of this 13.4s
|  build (81%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (38%, 5.1s, 4807
|  calls)
|  - plugin storybook:rollup-plugin-webpack-stats moduleParsed (8%, 1.1s,
|  4806 calls)
|  Additional callback time came from the callbacks below and from
|  callbacks under 1s.
|  3 callbacks are listed without a time. Their calls overlapped, so the
|  time inside one call includes work from other calls. To find their
|  cost, profile the build with `node --cpu-prof`:
|  - plugin vite-plugin-storybook-nextjs-swc transform (4807 calls)
|  - plugin plugin-csf transform (4807 calls)
|  - plugin vite:css transform (3 calls)
|  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
|  for more details.

|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully
```

## baseline-retry-build.txt

- Original file: `baseline-retry-build.txt`
- Original size: 2932 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:2 char:120
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 144ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 3.0s
  Running TypeScript ...
  Finished TypeScript in 3.5s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1355ms
  Finalizing page optimization ...

Route (app)
┌ ○ /_not-found
├   /[locale]
│ ├ ● /en
│ └ ● /vi
├ ƒ /[locale]/[...rest]
├   /[locale]/health
│ ├ ● /en/health
│ └ ● /vi/health
├ ƒ /api/health
├ ƒ /api/weather
├ ○ /apple-icon
├ ○ /icon.svg
├ ○ /manifest.webmanifest
├ ○ /opengraph-image
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /twitter-image


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

## baseline-retry-type-check.txt

- Original file: `baseline-retry-type-check.txt`
- Original size: 924 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:2 char:120
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
```

## baseline-server.txt

- Original file: `baseline-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 60ms
```

## baseline-test.txt

- Original file: `baseline-test.txt`
- Original size: 1778 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:2 char:149
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  36 passed (36)
      Tests  176 passed (176)
   Start at  03:04:28
   Duration  24.99s (environment 66%, setup 20%, import 7%, tests 5%, transform 1%, worker 1%)

Environment  jsdom was created 36 times · 97.39s total, 66% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## baseline-type-check.txt

- Original file: `baseline-type-check.txt`
- Original size: 5432 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:2 char:149
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/baseli ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

> Unexpected error while generating route types. Original error:

Error: Failed to load native binding
    at ignore-listed frames {
  [cause]: [
    Error: Cannot find module './swc.win32-x64-msvc.node'
    Require stack:
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\@swc+core@1.16.18_@swc+helpers@0.5.23\node_modules\@s
wc\core\binding.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\@swc+core@1.16.18_@swc+helpers@0.5.23\node_modules\@s
wc\core\index.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next-intl@4.14.9_@swc+helpe_322b7055cfa30f3b1609a1f61
94c2317\node_modules\next-intl\dist\cjs\development\plugin.cjs
    - C:\Workspace\Personnel\danang-simulation\next.config.compiled.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\build\next-config-ts\transpile-config.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\server\config.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\cli\next-test.js
    - C:\Workspace\Personnel\danang-simulation\node_modules\.pnpm\next@16.4.2_@babel+core@7.2_67190dee01d785d223e4a89c8
52c7e4a\node_modules\next\dist\bin\next
        at ignore-listed frames {
      code: 'MODULE_NOT_FOUND',
      requireStack: [Array]
    },
    Error: SWC native addon: user cache failed: validate cache root C:\Users\USER\AppData\Local\swc: cache ancestor 
C:\Users\USER\AppData\Local\swc has untrusted owner SID S-1-5-21-3755296832-436628576-2309662567-1001; fallback cache 
failed: create cache root C:\Users\USER\.swc-cache: Access is denied. (os error 5); set SWC_NATIVE_BINDING_CACHE to a 
safe absolute directory owned by your user whose ancestors do not grant other users replacement rights. Reinstall the 
native package if its payload is damaged; check SWC_NATIVE_BINDING_CACHE and directory permissions for materialization 
failures.
        at ignore-listed frames {
      code: 'ERR_SWC_NATIVE_CACHE'
    }
  ]
}
[ELIFECYCLE] Command failed with exit code 1.
```

## baseline-ui-server.txt

- Original file: `baseline-ui-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 45ms
```

## canvas-cleanup.txt

- Original file: `canvas-cleanup.txt`
- Original size: 474 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  03:52:21
   Duration  1.98s (environment 54%, setup 17%, tests 14%, import 9%, transform 5%, worker 1%)
```

## clean-coverage.txt

- Original file: `clean-coverage.txt`
- Original size: 27062 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ vitest run --coverage --maxWorkers=2
At line:2 char:199
+ ... TEXITCODE"; pnpm.cmd test:coverage --maxWorkers=2 *> docs/audit/phase ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run --coverage --maxWorkers=2:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8


 Test Files  41 passed (41)
      Tests  236 passed (236)
   Start at  03:55:45
   Duration  68.74s (environment 65%, setup 19%, tests 7%, import 5%, worker 2%, transform 1%)

Environment  jsdom was created 41 times · 78.59s total, 65% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   76.71 |    64.68 |   61.26 |   78.51 |                   
 src               |       0 |      100 |     100 |       0 |                   
  proxy.ts         |       0 |      100 |     100 |       0 | 23                
 src/api           |   89.47 |    78.12 |   83.33 |   92.15 |                   
  axios.ts         |   81.81 |    33.33 |      50 |   88.88 | 31                
  interceptors.ts  |    91.3 |    88.46 |      90 |   92.85 | 45-46,78          
 src/api/health    |       0 |        0 |       0 |       0 |                   
  keys.ts          |       0 |      100 |     100 |       0 | 2-6               
  queries.ts       |       0 |        0 |       0 |       0 | 10-11             
  requests.ts      |       0 |      100 |       0 |       0 | 5-9               
 ...ponents/common |       0 |        0 |       0 |       0 |                   
  CopyButton.tsx   |       0 |        0 |       0 |       0 | 1-12              
  ErrorState.tsx   |       0 |        0 |       0 |       0 | 12-13             
  PageHeader.tsx   |       0 |        0 |       0 |       0 | 12-13             
 ...nts/form-field |       0 |        0 |       0 |       0 |                   
  ...kboxField.tsx |       0 |        0 |       0 |       0 | 1-28              
  SelectField.tsx  |       0 |        0 |       0 |       0 | 1-52              
  SwitchField.tsx  |       0 |        0 |       0 |       0 | 1-28              
  ...AreaField.tsx |       0 |        0 |       0 |       0 | 1-28              
  TextField.tsx    |       0 |        0 |       0 |       0 | 1-43              
 ...onents/layouts |       0 |        0 |       0 |       0 |                   
  Footer.tsx       |       0 |      100 |       0 |       0 | 3-6               
  Header.tsx       |       0 |      100 |       0 |       0 | 8-11              
  ...eSwitcher.tsx |       0 |        0 |       0 |       0 | 1-48              
  MainLayout.tsx   |       0 |      100 |       0 |       0 | 6-7               
  ...eSwitcher.tsx |       0 |      100 |       0 |       0 | 1-36              
 ...ents/providers |   73.33 |       25 |    62.5 |   74.35 |                   
  ...tProvider.tsx |       0 |        0 |       0 |       0 | 1-39              
  ...eProvider.tsx |   94.28 |       50 |   83.33 |   96.66 | 19                
 ...components/seo |       0 |      100 |       0 |       0 |                   
  JsonLd.tsx       |       0 |      100 |       0 |       0 | 6-7               
 ...ents/utilities |       0 |        0 |       0 |       0 |                   
  FadeIn.tsx       |       0 |        0 |       0 |       0 | 1-19              
  h-stack.tsx      |       0 |        0 |       0 |       0 | 7-66              
  show.tsx         |       0 |        0 |       0 |       0 | 3-4               
  ...opagation.tsx |       0 |      100 |       0 |       0 | 7-12              
  v-stack.tsx      |       0 |        0 |       0 |       0 | 7-66              
 src/config        |       0 |      100 |     100 |       0 |                   
  fonts.ts         |       0 |      100 |     100 |       0 | 3-9               
  site.ts          |       0 |      100 |     100 |       0 | 11                
 src/constants     |   77.77 |    33.33 |      25 |   76.92 |                   
  env.ts           |    87.5 |       50 |      50 |   85.71 | 15                
  routes.ts        |       0 |        0 |       0 |       0 | 1-15              
 ...gine/character |   84.94 |    77.23 |     100 |   85.49 |                   
  controller.ts    |   88.46 |     87.5 |     100 |   90.81 | ...31-133,145-146 
  humanoid.ts      |   83.68 |    51.42 |     100 |   83.68 | 347-397           
 ...ngine/controls |    69.8 |    58.37 |   76.19 |   72.92 |                   
  events.ts        |   67.91 |    56.98 |   72.22 |   72.17 | ...84-196,207-208 
  input.ts         |   73.52 |    59.78 |     100 |   74.24 | ...82,85-86,88-89 
 src/engine/core   |   90.27 |    88.57 |     100 |   91.66 |                   
  resources.ts     |   82.35 |    66.66 |     100 |   92.85 | 24                
  runtime.ts       |   92.59 |     93.1 |     100 |   91.11 | 25,63-65          
 ...ine/geospatial |   98.97 |    96.55 |     100 |     100 |                   
  core.ts          |   98.97 |    96.55 |     100 |     100 | 100               
 ...engine/imagery |    95.3 |    92.55 |     100 |   95.45 |                   
  alignment.ts     |   95.27 |    92.55 |     100 |   95.41 | ...45,250,258,313 
 ...e/interactions |   88.63 |    72.46 |   94.73 |   91.66 |                   
  registry.ts      |   88.63 |    72.46 |   94.73 |   91.66 | 13,28,145-148,173 
 ...gine/materials |     100 |       80 |     100 |     100 |                   
  textures.ts      |     100 |       80 |     100 |     100 | 7,34              
 ...ngine/renderer |   90.76 |    72.72 |    87.5 |   96.42 |                   
  webgl.ts         |   90.76 |    72.72 |    87.5 |   96.42 | 24,61             
 ...engine/spatial |     100 |    81.48 |     100 |     100 |                   
  minimap.ts       |     100 |    81.48 |     100 |     100 | 38-39,49-59       
 src/hooks         |     7.6 |     5.55 |   11.11 |    6.94 |                   
  use-mobile.ts    |       0 |      100 |       0 |       0 | 3-18              
  ...ickOutside.ts |       0 |        0 |       0 |       0 | 1-20              
  useCopy.ts       |       0 |        0 |       0 |       0 | 1-45              
  useCountdown.ts  |       0 |      100 |       0 |       0 | 1-18              
  ...niteScroll.ts |       0 |        0 |       0 |       0 | 1-24              
  useInterval.ts   |       0 |        0 |       0 |       0 | 1-17              
  ...calStorage.ts |       0 |        0 |       0 |       0 | 1-36              
  useMediaQuery.ts |       0 |        0 |       0 |       0 | 1-18              
  useModal.ts      |       0 |        0 |       0 |       0 | 1-18              
  useMounted.ts    |       0 |      100 |       0 |       0 | 1-11              
  usePagination.ts |       0 |        0 |       0 |       0 | 1-82              
  usePrevious.ts   |       0 |      100 |       0 |       0 | 1-12              
  useScroll.ts     |       0 |        0 |       0 |       0 | 1-16              
  ...chLanguage.ts |       0 |        0 |       0 |       0 | 1-34              
  useThrottle.ts   |       0 |        0 |       0 |       0 | 1-23              
  ...ionsServer.ts |       0 |        0 |       0 |       0 | 26-29             
  ...archParams.ts |       0 |        0 |       0 |       0 | 1-29              
  useWindowSize.ts |       0 |        0 |       0 |       0 | 1-33              
 src/i18n          |   84.61 |    66.66 |      50 |   83.33 |                   
  navigation.ts    |       0 |      100 |     100 |       0 | 5                 
  routing.ts       |   85.71 |        0 |       0 |   85.71 | 27                
 ...ations/geodata |   98.21 |    91.11 |     100 |   97.91 |                   
  ...ass.server.ts |   98.21 |    91.11 |     100 |   97.91 | 49                
 ...ations/weather |   78.04 |    89.07 |   72.22 |      80 |                   
  client.ts        |       0 |        0 |       0 |       0 | 6-36              
  mapper.ts        |     100 |    98.38 |     100 |     100 | 3                 
  provider.ts      |    90.9 |    72.72 |     100 |   96.55 | 18                
  service.ts       |      90 |    93.54 |      80 |   89.74 | 58,120-122        
 src/lib           |   83.01 |    88.46 |   78.26 |   80.85 |                   
  ...ie-storage.ts |   85.71 |      100 |      75 |   85.71 | 33                
  cookie.ts        |       0 |      100 |       0 |       0 | 3-12              
  og-image.tsx     |       0 |        0 |       0 |       0 | 11-12             
  seo.ts           |     100 |    94.44 |     100 |     100 | 26                
 ...lib/validation |       0 |        0 |       0 |       0 |                   
  regex.ts         |       0 |      100 |     100 |       0 | 1-5               
  ...n-messages.ts |       0 |        0 |       0 |       0 | 1-6               
 ...modules/Health |       0 |      100 |       0 |       0 |                   
  const.ts         |       0 |      100 |     100 |       0 | 2                 
  index.tsx        |       0 |      100 |       0 |       0 | 6-9               
 ...lth/components |       0 |        0 |       0 |       0 |                   
  ...tatusCard.tsx |       0 |        0 |       0 |       0 | 1-54              
  StatusBadge.tsx  |       0 |        0 |       0 |       0 | 10-11             
 .../WorldExplorer |   96.53 |    95.95 |   96.15 |   97.89 |                   
  ...iagnostics.ts |   98.48 |    94.73 |     100 |     100 | 111               
  ...iagnostics.ts |   95.65 |       50 |     100 |     100 | 49                
  ...ry-preview.ts |    92.1 |    90.47 |     100 |   94.11 | 26-27             
  index.tsx        |       0 |      100 |       0 |       0 | 6-7               
 ...rer/components |    52.1 |    21.11 |   31.39 |   53.45 |                   
  ...tBoundary.tsx |       0 |        0 |       0 |       0 | 1-31              
  ...Inspector.tsx |   89.47 |    86.48 |   93.33 |      92 | 48-50,159         
  ...rerClient.tsx |       0 |        0 |       0 |       0 | 1-18              
  WorldHud.tsx     |   21.36 |     10.9 |   18.03 |   20.95 | ...70-488,609-841 
 ...Explorer/hooks |   57.75 |    38.88 |   47.05 |   61.56 |                   
  ...ldExplorer.ts |   55.24 |    37.14 |   43.75 |   59.33 | ...39,344-379,418 
 ...plorer/runtime |   90.36 |     82.6 |   77.14 |   93.13 |                   
  world.ts         |   90.36 |     82.6 |   77.14 |   93.13 | ...30,552,566-569 
 src/stores        |   77.27 |       50 |   69.23 |   82.35 |                   
  modalStore.ts    |      60 |      100 |   33.33 |      50 | 15-16             
  sessionStore.ts  |   82.35 |       50 |      80 |    92.3 | 46                
 src/utils         |   70.25 |    76.86 |   73.17 |    74.4 |                   
  api-error.ts     |   93.75 |    89.47 |     100 |     100 | 6,16              
  array.ts         |       0 |        0 |       0 |       0 | 1-26              
  common.ts        |       0 |      100 |       0 |       0 | 1-10              
  date.ts          |   69.23 |    44.44 |   66.66 |   72.72 | 26-28,33-35       
  number.ts        |   89.13 |     92.3 |     100 |   94.44 | 22-23             
  object.ts        |   96.42 |       80 |     100 |     100 | 9,20              
  string.ts        |     100 |       90 |     100 |     100 | 1,8               
 ...assets/catalog |    93.1 |       75 |     100 |     100 |                   
  ...hetic-rock.ts |    93.1 |       75 |     100 |     100 | 15                
 ...ore/registries |   93.95 |    93.13 |   98.07 |   96.66 |                   
  data-sources.ts  |   97.84 |    95.91 |     100 |   99.13 | 209               
  imagery.ts       |    87.8 |    88.37 |   88.88 |   91.89 | 57,63,81          
  prefabs.ts       |   85.71 |    78.57 |     100 |   92.85 | 32,48             
 ...d-core/schemas |   91.89 |       60 |     100 |   96.66 |                   
  manifest.ts      |   91.89 |       60 |     100 |   96.66 | 84                
 ...ng/environment |    81.9 |    63.91 |     100 |   82.81 |                   
  simulation.ts    |   77.38 |    48.33 |     100 |   78.83 | ...16,279,285-322 
  solar.ts         |   90.47 |    89.18 |     100 |   90.19 | ...88-190,192-194 
 ...s/danang/zones |   77.08 |       32 |     100 |   78.72 |                   
  synthetic.ts     |   75.55 |       32 |     100 |   77.27 | 57,82-87,99-102   
-------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 76.71% ( 3246/4231 )
Branches     : 64.68% ( 1368/2115 )
Functions    : 61.26% ( 416/679 )
Lines        : 78.51% ( 3030/3859 )
================================================================================
```

## clean-test.txt

- Original file: `clean-test.txt`
- Original size: 1778 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ vitest run
At line:2 char:97
+ ... $env:PATH"; pnpm.cmd test *> docs/audit/phase-14/evidence/clean-test. ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  41 passed (41)
      Tests  236 passed (236)
   Start at  03:54:55
   Duration  47.98s (environment 70%, setup 17%, import 6%, tests 5%, worker 1%, transform 1%)

Environment  jsdom was created 41 times · 203.88s total, 70% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## coverage-retry.txt

- Original file: `coverage-retry.txt`
- Original size: 27262 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ vitest run --coverage --maxWorkers=2
At line:2 char:97
+ ... $env:PATH"; pnpm.cmd test:coverage --maxWorkers=2 *> docs/audit/phase ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run --coverage --maxWorkers=2:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8

Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package

 Test Files  41 passed (41)
      Tests  236 passed (236)
   Start at  03:43:12
   Duration  79.12s (environment 65%, setup 20%, tests 6%, import 5%, worker 3%, transform 1%)

Environment  jsdom was created 41 times · 88.75s total, 65% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   76.71 |    64.68 |   61.26 |   78.51 |                   
 src               |       0 |      100 |     100 |       0 |                   
  proxy.ts         |       0 |      100 |     100 |       0 | 23                
 src/api           |   89.47 |    78.12 |   83.33 |   92.15 |                   
  axios.ts         |   81.81 |    33.33 |      50 |   88.88 | 31                
  interceptors.ts  |    91.3 |    88.46 |      90 |   92.85 | 45-46,78          
 src/api/health    |       0 |        0 |       0 |       0 |                   
  keys.ts          |       0 |      100 |     100 |       0 | 2-6               
  queries.ts       |       0 |        0 |       0 |       0 | 10-11             
  requests.ts      |       0 |      100 |       0 |       0 | 5-9               
 ...ponents/common |       0 |        0 |       0 |       0 |                   
  CopyButton.tsx   |       0 |        0 |       0 |       0 | 1-12              
  ErrorState.tsx   |       0 |        0 |       0 |       0 | 12-13             
  PageHeader.tsx   |       0 |        0 |       0 |       0 | 12-13             
 ...nts/form-field |       0 |        0 |       0 |       0 |                   
  ...kboxField.tsx |       0 |        0 |       0 |       0 | 1-28              
  SelectField.tsx  |       0 |        0 |       0 |       0 | 1-52              
  SwitchField.tsx  |       0 |        0 |       0 |       0 | 1-28              
  ...AreaField.tsx |       0 |        0 |       0 |       0 | 1-28              
  TextField.tsx    |       0 |        0 |       0 |       0 | 1-43              
 ...onents/layouts |       0 |        0 |       0 |       0 |                   
  Footer.tsx       |       0 |      100 |       0 |       0 | 3-6               
  Header.tsx       |       0 |      100 |       0 |       0 | 8-11              
  ...eSwitcher.tsx |       0 |        0 |       0 |       0 | 1-48              
  MainLayout.tsx   |       0 |      100 |       0 |       0 | 6-7               
  ...eSwitcher.tsx |       0 |      100 |       0 |       0 | 1-36              
 ...ents/providers |   73.33 |       25 |    62.5 |   74.35 |                   
  ...tProvider.tsx |       0 |        0 |       0 |       0 | 1-39              
  ...eProvider.tsx |   94.28 |       50 |   83.33 |   96.66 | 19                
 ...components/seo |       0 |      100 |       0 |       0 |                   
  JsonLd.tsx       |       0 |      100 |       0 |       0 | 6-7               
 ...ents/utilities |       0 |        0 |       0 |       0 |                   
  FadeIn.tsx       |       0 |        0 |       0 |       0 | 1-19              
  h-stack.tsx      |       0 |        0 |       0 |       0 | 7-66              
  show.tsx         |       0 |        0 |       0 |       0 | 3-4               
  ...opagation.tsx |       0 |      100 |       0 |       0 | 7-12              
  v-stack.tsx      |       0 |        0 |       0 |       0 | 7-66              
 src/config        |       0 |      100 |     100 |       0 |                   
  fonts.ts         |       0 |      100 |     100 |       0 | 3-9               
  site.ts          |       0 |      100 |     100 |       0 | 11                
 src/constants     |   77.77 |    33.33 |      25 |   76.92 |                   
  env.ts           |    87.5 |       50 |      50 |   85.71 | 15                
  routes.ts        |       0 |        0 |       0 |       0 | 1-15              
 ...gine/character |   84.94 |    77.23 |     100 |   85.49 |                   
  controller.ts    |   88.46 |     87.5 |     100 |   90.81 | ...31-133,145-146 
  humanoid.ts      |   83.68 |    51.42 |     100 |   83.68 | 347-397           
 ...ngine/controls |    69.8 |    58.37 |   76.19 |   72.92 |                   
  events.ts        |   67.91 |    56.98 |   72.22 |   72.17 | ...84-196,207-208 
  input.ts         |   73.52 |    59.78 |     100 |   74.24 | ...82,85-86,88-89 
 src/engine/core   |   90.27 |    88.57 |     100 |   91.66 |                   
  resources.ts     |   82.35 |    66.66 |     100 |   92.85 | 24                
  runtime.ts       |   92.59 |     93.1 |     100 |   91.11 | 25,63-65          
 ...ine/geospatial |   98.97 |    96.55 |     100 |     100 |                   
  core.ts          |   98.97 |    96.55 |     100 |     100 | 100               
 ...engine/imagery |    95.3 |    92.55 |     100 |   95.45 |                   
  alignment.ts     |   95.27 |    92.55 |     100 |   95.41 | ...45,250,258,313 
 ...e/interactions |   88.63 |    72.46 |   94.73 |   91.66 |                   
  registry.ts      |   88.63 |    72.46 |   94.73 |   91.66 | 13,28,145-148,173 
 ...gine/materials |     100 |       80 |     100 |     100 |                   
  textures.ts      |     100 |       80 |     100 |     100 | 7,34              
 ...ngine/renderer |   90.76 |    72.72 |    87.5 |   96.42 |                   
  webgl.ts         |   90.76 |    72.72 |    87.5 |   96.42 | 24,61             
 ...engine/spatial |     100 |    81.48 |     100 |     100 |                   
  minimap.ts       |     100 |    81.48 |     100 |     100 | 38-39,49-59       
 src/hooks         |     7.6 |     5.55 |   11.11 |    6.94 |                   
  use-mobile.ts    |       0 |      100 |       0 |       0 | 3-18              
  ...ickOutside.ts |       0 |        0 |       0 |       0 | 1-20              
  useCopy.ts       |       0 |        0 |       0 |       0 | 1-45              
  useCountdown.ts  |       0 |      100 |       0 |       0 | 1-18              
  ...niteScroll.ts |       0 |        0 |       0 |       0 | 1-24              
  useInterval.ts   |       0 |        0 |       0 |       0 | 1-17              
  ...calStorage.ts |       0 |        0 |       0 |       0 | 1-36              
  useMediaQuery.ts |       0 |        0 |       0 |       0 | 1-18              
  useModal.ts      |       0 |        0 |       0 |       0 | 1-18              
  useMounted.ts    |       0 |      100 |       0 |       0 | 1-11              
  usePagination.ts |       0 |        0 |       0 |       0 | 1-82              
  usePrevious.ts   |       0 |      100 |       0 |       0 | 1-12              
  useScroll.ts     |       0 |        0 |       0 |       0 | 1-16              
  ...chLanguage.ts |       0 |        0 |       0 |       0 | 1-34              
  useThrottle.ts   |       0 |        0 |       0 |       0 | 1-23              
  ...ionsServer.ts |       0 |        0 |       0 |       0 | 26-29             
  ...archParams.ts |       0 |        0 |       0 |       0 | 1-29              
  useWindowSize.ts |       0 |        0 |       0 |       0 | 1-33              
 src/i18n          |   84.61 |    66.66 |      50 |   83.33 |                   
  navigation.ts    |       0 |      100 |     100 |       0 | 5                 
  routing.ts       |   85.71 |        0 |       0 |   85.71 | 27                
 ...ations/geodata |   98.21 |    91.11 |     100 |   97.91 |                   
  ...ass.server.ts |   98.21 |    91.11 |     100 |   97.91 | 49                
 ...ations/weather |   78.04 |    89.07 |   72.22 |      80 |                   
  client.ts        |       0 |        0 |       0 |       0 | 6-36              
  mapper.ts        |     100 |    98.38 |     100 |     100 | 3                 
  provider.ts      |    90.9 |    72.72 |     100 |   96.55 | 18                
  service.ts       |      90 |    93.54 |      80 |   89.74 | 58,120-122        
 src/lib           |   83.01 |    88.46 |   78.26 |   80.85 |                   
  ...ie-storage.ts |   85.71 |      100 |      75 |   85.71 | 33                
  cookie.ts        |       0 |      100 |       0 |       0 | 3-12              
  og-image.tsx     |       0 |        0 |       0 |       0 | 11-12             
  seo.ts           |     100 |    94.44 |     100 |     100 | 26                
 ...lib/validation |       0 |        0 |       0 |       0 |                   
  regex.ts         |       0 |      100 |     100 |       0 | 1-5               
  ...n-messages.ts |       0 |        0 |       0 |       0 | 1-6               
 ...modules/Health |       0 |      100 |       0 |       0 |                   
  const.ts         |       0 |      100 |     100 |       0 | 2                 
  index.tsx        |       0 |      100 |       0 |       0 | 6-9               
 ...lth/components |       0 |        0 |       0 |       0 |                   
  ...tatusCard.tsx |       0 |        0 |       0 |       0 | 1-54              
  StatusBadge.tsx  |       0 |        0 |       0 |       0 | 10-11             
 .../WorldExplorer |   96.53 |    95.95 |   96.15 |   97.89 |                   
  ...iagnostics.ts |   98.48 |    94.73 |     100 |     100 | 111               
  ...iagnostics.ts |   95.65 |       50 |     100 |     100 | 49                
  ...ry-preview.ts |    92.1 |    90.47 |     100 |   94.11 | 26-27             
  index.tsx        |       0 |      100 |       0 |       0 | 6-7               
 ...rer/components |    52.1 |    21.11 |   31.39 |   53.45 |                   
  ...tBoundary.tsx |       0 |        0 |       0 |       0 | 1-31              
  ...Inspector.tsx |   89.47 |    86.48 |   93.33 |      92 | 48-50,159         
  ...rerClient.tsx |       0 |        0 |       0 |       0 | 1-18              
  WorldHud.tsx     |   21.36 |     10.9 |   18.03 |   20.95 | ...70-488,609-841 
 ...Explorer/hooks |   57.75 |    38.88 |   47.05 |   61.56 |                   
  ...ldExplorer.ts |   55.24 |    37.14 |   43.75 |   59.33 | ...39,344-379,418 
 ...plorer/runtime |   90.36 |     82.6 |   77.14 |   93.13 |                   
  world.ts         |   90.36 |     82.6 |   77.14 |   93.13 | ...30,552,566-569 
 src/stores        |   77.27 |       50 |   69.23 |   82.35 |                   
  modalStore.ts    |      60 |      100 |   33.33 |      50 | 15-16             
  sessionStore.ts  |   82.35 |       50 |      80 |    92.3 | 46                
 src/utils         |   70.25 |    76.86 |   73.17 |    74.4 |                   
  api-error.ts     |   93.75 |    89.47 |     100 |     100 | 6,16              
  array.ts         |       0 |        0 |       0 |       0 | 1-26              
  common.ts        |       0 |      100 |       0 |       0 | 1-10              
  date.ts          |   69.23 |    44.44 |   66.66 |   72.72 | 26-28,33-35       
  number.ts        |   89.13 |     92.3 |     100 |   94.44 | 22-23             
  object.ts        |   96.42 |       80 |     100 |     100 | 9,20              
  string.ts        |     100 |       90 |     100 |     100 | 1,8               
 ...assets/catalog |    93.1 |       75 |     100 |     100 |                   
  ...hetic-rock.ts |    93.1 |       75 |     100 |     100 | 15                
 ...ore/registries |   93.95 |    93.13 |   98.07 |   96.66 |                   
  data-sources.ts  |   97.84 |    95.91 |     100 |   99.13 | 209               
  imagery.ts       |    87.8 |    88.37 |   88.88 |   91.89 | 57,63,81          
  prefabs.ts       |   85.71 |    78.57 |     100 |   92.85 | 32,48             
 ...d-core/schemas |   91.89 |       60 |     100 |   96.66 |                   
  manifest.ts      |   91.89 |       60 |     100 |   96.66 | 84                
 ...ng/environment |    81.9 |    63.91 |     100 |   82.81 |                   
  simulation.ts    |   77.38 |    48.33 |     100 |   78.83 | ...16,279,285-322 
  solar.ts         |   90.47 |    89.18 |     100 |   90.19 | ...88-190,192-194 
 ...s/danang/zones |   77.08 |       32 |     100 |   78.72 |                   
  synthetic.ts     |   75.55 |       32 |     100 |   77.27 | 57,82-87,99-102   
-------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 76.71% ( 3246/4231 )
Branches     : 64.68% ( 1368/2115 )
Functions    : 61.26% ( 416/679 )
Lines        : 78.51% ( 3030/3859 )
================================================================================
```

## dependencies-diff.txt

- Original file: `dependencies-diff.txt`
- Original size: 34496 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
git.exe : warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
At line:2 char:443
+ ... TEXITCODE"; git.exe diff -- package.json pnpm-lock.yaml *> docs/audit ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (warning: in the... Git touches it:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
warning: in the working copy of 'pnpm-lock.yaml', LF will be replaced by CRLF the next time Git touches it
diff --git a/package.json b/package.json
index 3296330..7b3a8b5 100644
--- a/package.json
+++ b/package.json
@@ -44,7 +44,7 @@
     "input-otp": "^1.5.0",
     "js-cookie": "^3.0.8",
     "lucide-react": "1.60.0",
-    "next": "^16.4.2",
+    "next": "16.4.5",
     "next-intl": "^4.14.9",
     "radix-ui": "^1.8.1",
     "react": "19.3.1",
diff --git a/pnpm-lock.yaml b/pnpm-lock.yaml
index 3e87ef5..641ef4b 100644
--- a/pnpm-lock.yaml
+++ b/pnpm-lock.yaml
@@ -171,7 +171,7 @@ importers:
         version: 1.9.0(@date-fns/tz@1.5.0)(@types/react@19.3.0)(date-fns@4.4.0)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
       '@bprogress/next':
         specifier: ^3.2.12
-        version: 3.2.12(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
+        version: 3.2.12(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
       '@hookform/resolvers':
         specifier: ^6.0.0
         version: 6.0.0(@standard-schema/spec@1.1.0)(ajv@8.20.0)(react-hook-form@7.90.0(@types/react@19.3.0)(react@19.3.1))(zod@4.6.7)
@@ -221,11 +221,11 @@ importers:
         specifier: 1.60.0
         version: 1.60.0(@types/react@19.3.0)(react@19.3.1)
       next:
-        specifier: ^16.4.2
-        version: 16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
+        specifier: 16.4.5
+        version: 16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
       next-intl:
         specifier: ^4.14.9
-        version: 4.14.9(@swc/helpers@0.5.23)(@types/react@19.3.0)(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react@19.3.1)
+        version: 4.14.9(@swc/helpers@0.5.23)(@types/react@19.3.0)(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react@19.3.1)
       radix-ui:
         specifier: ^1.8.1
         version: 1.8.1(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
@@ -292,7 +292,7 @@ importers:
         version: 10.6.2(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))
       '@storybook/nextjs-vite':
         specifier: ^10.6.2
-        version: 10.6.2(@babel/core@7.29.7)(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))
+        version: 10.6.2(@babel/core@7.29.7)(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))
       '@tanstack/react-query-devtools':
         specifier: ^5.104.5
         version: 5.104.5(@tanstack/react-query@5.104.5(@types/react@19.3.0)(react@19.3.1))(@types/react@19.3.0)(csstype@3.2.3)(react@19.3.1)
@@ -1204,54 +1204,57 @@ packages:
   '@next/env@16.4.2':
     resolution: {integrity: sha512-nTUTFH7G5/J/fmpkjVLegOkqyKOP0CEsJcMsyO4UCYeN1su+YMW/MfaSErnJskL7XM+UDK6aTvslxsRCyya/sA==}
 
-  '@next/swc-darwin-arm64@16.4.2':
-    resolution: {integrity: sha512-ONkhFvZNFWlsEHOM/81AtxdyuJP2KRYKYR0JxPwvcu1AuPMMMgcL+wW2luldJvMtZwKtUxoSkCychW5wIeoYSw==}
+  '@next/env@16.4.5':
+    resolution: {integrity: sha512-JwSPwpdkZL5VMl2jA/q+JI8MZdweAL3xmw5/tb9y/TLtmS0YXZnmYDzSihwk8xTj1OL+WM53gTqaj96yuLp6Xw==}
+
+  '@next/swc-darwin-arm64@16.4.5':
+    resolution: {integrity: sha512-W5TniBzWKASbNNwHZ/S/f1MxQUXU/LdjklVMWA0Ujbfl7SZnUzFls45hO0i/sF7Bx1jJBWp7WWmoQajXtX/O8A==}
     engines: {node: '>= 10'}
     cpu: [arm64]
     os: [darwin]
 
-  '@next/swc-darwin-x64@16.4.2':
-    resolution: {integrity: sha512-luPCMbOsCoaF+kXJEUjmjmOZg1lC3BflhmUu+ZmW4tBu2vW/4AXak8JBFvePizGkxVmNiAw/r9ra+6UviCWtWQ==}
+  '@next/swc-darwin-x64@16.4.5':
+    resolution: {integrity: sha512-uWq4qkHapBDS1oFltWS4YxTb9pLHAtLNcpbuK6SmRsebLYZqpBML/j/C0op+50JYGTpZgVL/DWNt/6oWlamrrw==}
     engines: {node: '>= 10'}
     cpu: [x64]
     os: [darwin]
 
-  '@next/swc-linux-arm64-gnu@16.4.2':
-    resolution: {integrity: sha512-xhwFTAncJyaCNy5KqKKuKaIIdCy1/1ZV1s5S1G0hhT7wGMkDTlfJ6aQbfRFnIG/s3/kDrxQ8aycVe+c5QnP8ow==}
+  '@next/swc-linux-arm64-gnu@16.4.5':
+    resolution: {integrity: sha512-FdRcyOx5u5P51mlAqLB9EXdd8jZO5fsdHtk4BAQSkqOywCsbTNN/rmw+jO7pnmjNdAtu2AG46NzbCL2FPDrrgw==}
     engines: {node: '>= 10'}
     cpu: [arm64]
     os: [linux]
     libc: [glibc]
 
-  '@next/swc-linux-arm64-musl@16.4.2':
-    resolution: {integrity: sha512-T1PNmfbPcxr5ndtWUL/3wQtLXsz808lq6sc2GrNT5k2oquF7UyqZddHSuAewHVsWsGXe6nsl9HoN1YNriVjuSg==}
+  '@next/swc-linux-arm64-musl@16.4.5':
+    resolution: {integrity: sha512-cyvmmgtRXR8aGVT86wi9Py53IlfyCx7P2fZxuAXAoTummDnhKtUyjrMeXfapqp4qgD+gT5RqyGD/VfA16jEK7Q==}
     engines: {node: '>= 10'}
     cpu: [arm64]
     os: [linux]
     libc: [musl]
 
-  '@next/swc-linux-x64-gnu@16.4.2':
-    resolution: {integrity: sha512-N9cDUOCGtkJG5PNKDFZUF3xXndrJJcpLp121uAGjIGvO/U2p9tfdNOM9htj7+5f72l0m8rMw/cvYacUJBQoudg==}
+  '@next/swc-linux-x64-gnu@16.4.5':
+    resolution: {integrity: sha512-hPc+Fl+N22DAvqZHq559NmamXboOX5Lu8I5Wl0DezfrhTk1Zz21NQeYoZDmNI/NjTcrdsVxM72Fzn2lI+Q+vAw==}
     engines: {node: '>= 10'}
     cpu: [x64]
     os: [linux]
     libc: [glibc]
 
-  '@next/swc-linux-x64-musl@16.4.2':
-    resolution: {integrity: sha512-yY2uh1YhX6ufuYy2FCbw1dqblbhI57GLYAJfCkqD9auTv6pLrH67Uccjc3QMKBeCYAG6lkgu08ExmX1bbjejjQ==}
+  '@next/swc-linux-x64-musl@16.4.5':
+    resolution: {integrity: sha512-gbACYE8IP/jlprNTpiWXHb8N9CofOzpnEwH2SrIz1dUbiJf1FbDssDupCAPeP1Taxe8mgG20sGZamJI7KFOdZw==}
     engines: {node: '>= 10'}
     cpu: [x64]
     os: [linux]
     libc: [musl]
 
-  '@next/swc-win32-arm64-msvc@16.4.2':
-    resolution: {integrity: sha512-j/ArWRIHpMMB6wYLMhr2puTguBt70lNU/Cmjl9p6dTDE8DGknYJMP9PdwPk2dqpCNL/KIX9yfngDvIesxJPmsg==}
+  '@next/swc-win32-arm64-msvc@16.4.5':
+    resolution: {integrity: sha512-+8gj++ZMo8H20Xh2ijjNqyFk5LPLw0AC4Fs4Tq/G94rjjQXhOjN4jgSWsWKPFsyY26hfIeemJIwKtMxOsp5GBA==}
     engines: {node: '>= 10'}
     cpu: [arm64]
     os: [win32]
 
-  '@next/swc-win32-x64-msvc@16.4.2':
-    resolution: {integrity: sha512-AA4edyWHDko3NCSo0x6GomsdgFb0oR1J3MXU1b5xt6FRFg4AucrMPW3S0hCe/9onU0O1BbpGQBsqo1r0Gneu1g==}
+  '@next/swc-win32-x64-msvc@16.4.5':
+    resolution: {integrity: sha512-qNZj66pYXnaWLiF9R9GUbfBdrCv7kC6TaZfIwB2KH5WPc/8pEM3nVOj8hpQhWJU8S94rlH5MPDcX15+RrgUhiw==}
     engines: {node: '>= 10'}
     cpu: [x64]
     os: [win32]
@@ -3531,8 +3534,8 @@ packages:
   fflate@0.8.3:
     resolution: {integrity: sha512-tbZNuJrLwGUp3zshBtdy4W+ORxZuIh8a5ilyIEQDC5rY1f3U20JMry0Ll3WBzU58EZKsEuJFXhb5gwv8CsPvgA==}
 
-  follow-redirects@1.16.1:
-    resolution: {integrity: sha512-FNvFGzoMLWmE6Yj9spb/zjd7yiNCHiAW9/Tg9CXrQ8wuu32HtlJOwWO11OJafl5FfY3DxTdQ0vj42zU1kvv5jg==}
+  follow-redirects@1.16.3:
+    resolution: {integrity: sha512-toOSoqN6d51Wjf1aOFJYcoVv1aND9rj/CwjLU0Vz40oDuSpWDayCeKe4JpL5NL0WdFvoOOCI3BRo69HahjbR1A==}
     engines: {node: '>=4.0'}
     peerDependencies:
       debug: '*'
@@ -4017,8 +4020,8 @@ packages:
       '@types/react':
         optional: true
 
-  next@16.4.2:
-    resolution: {integrity: sha512-r+oBJojfefUjOiWkBhXgLS+igxX/7BWyK59uHnyOyplMSLtBZ+QLP3okrdYTbrfrbrmNTVWLBPaHDX9KRaIt3w==}
+  next@16.4.5:
+    resolution: {integrity: sha512-rmdfsWosjTUO+6R0S3KokoIk6Kj0sWDRTe86tZHdqaWH/oXq/udX3/4xb+YQi7aWbyEFoglDU54kaifLCdXbBw==}
     engines: {node: '>=20.9.0'}
     hasBin: true
     peerDependencies:
@@ -4957,11 +4960,11 @@ snapshots:
 
   '@bprogress/core@1.3.4': {}
 
-  '@bprogress/next@3.2.12(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)':
+  '@bprogress/next@3.2.12(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)':
     dependencies:
       '@bprogress/core': 1.3.4
       '@bprogress/react': 1.2.7(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
-      next: 16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
+      next: 16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
       react: 19.3.1
       react-dom: 19.3.1(react@19.3.1)
 
@@ -5478,28 +5481,30 @@ snapshots:
 
   '@next/env@16.4.2': {}
 
-  '@next/swc-darwin-arm64@16.4.2':
+  '@next/env@16.4.5': {}
+
+  '@next/swc-darwin-arm64@16.4.5':
     optional: true
 
-  '@next/swc-darwin-x64@16.4.2':
+  '@next/swc-darwin-x64@16.4.5':
     optional: true
 
-  '@next/swc-linux-arm64-gnu@16.4.2':
+  '@next/swc-linux-arm64-gnu@16.4.5':
     optional: true
 
-  '@next/swc-linux-arm64-musl@16.4.2':
+  '@next/swc-linux-arm64-musl@16.4.5':
     optional: true
 
-  '@next/swc-linux-x64-gnu@16.4.2':
+  '@next/swc-linux-x64-gnu@16.4.5':
     optional: true
 
-  '@next/swc-linux-x64-musl@16.4.2':
+  '@next/swc-linux-x64-musl@16.4.5':
     optional: true
 
-  '@next/swc-win32-arm64-msvc@16.4.2':
+  '@next/swc-win32-arm64-msvc@16.4.5':
     optional: true
 
-  '@next/swc-win32-x64-msvc@16.4.2':
+  '@next/swc-win32-x64-msvc@16.4.5':
     optional: true
 
   '@oxc-parser/binding-android-arm-eabi@0.127.0':
@@ -6627,18 +6632,18 @@ snapshots:
     dependencies:
       react: 19.3.1
 
-  '@storybook/nextjs-vite@10.6.2(@babel/core@7.29.7)(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))':
+  '@storybook/nextjs-vite@10.6.2(@babel/core@7.29.7)(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react-dom@19.3.1(react@19.3.1))(react@19.3.1)(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))':
     dependencies:
       '@storybook/builder-vite': 10.6.2(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))
       '@storybook/react': 10.6.2(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)
       '@storybook/react-vite': 10.6.2(@types/react-dom@19.3.0(@types/react@19.3.0))(@types/react@19.3.0)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))
-      next: 16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
+      next: 16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
       react: 19.3.1
       react-dom: 19.3.1(react@19.3.1)
       storybook: 10.6.2(@types/react@19.3.0)(react@19.3.1)
       styled-jsx: 5.1.6(@babel/core@7.29.7)(react@19.3.1)
       vite: 8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1)
-      vite-plugin-storybook-nextjs: 10.6.2(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))
+      vite-plugin-storybook-nextjs: 10.6.2(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1))
     optionalDependencies:
       '@types/react': 19.3.0
       '@types/react-dom': 19.3.0(@types/react@19.3.0)
@@ -7191,7 +7196,7 @@ snapshots:
 
   axios@1.20.0(debug@4.4.3):
     dependencies:
-      follow-redirects: 1.16.1(debug@4.4.3)
+      follow-redirects: 1.16.3(debug@4.4.3)
       form-data: 4.0.6
       https-proxy-agent: 5.0.1
       proxy-from-env: 2.1.0
@@ -7516,7 +7521,7 @@ snapshots:
 
   fflate@0.8.3: {}
 
-  follow-redirects@1.16.1(debug@4.4.3):
+  follow-redirects@1.16.3(debug@4.4.3):
     optionalDependencies:
       debug: 4.4.3
 
@@ -7907,7 +7912,7 @@ snapshots:
 
   next-intl-swc-plugin-extractor@4.14.9: {}
 
-  next-intl@4.14.9(@swc/helpers@0.5.23)(@types/react@19.3.0)(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react@19.3.1):
+  next-intl@4.14.9(@swc/helpers@0.5.23)(@types/react@19.3.0)(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(react@19.3.1):
     dependencies:
       '@eloqnt/config': 0.1.1
       '@eloqnt/format-json': 0.1.0
@@ -7917,7 +7922,7 @@ snapshots:
       '@swc/core': 1.16.18(@swc/helpers@0.5.23)
       icu-minify: 4.14.9
       negotiator: 1.1.0
-      next: 16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
+      next: 16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
       next-intl-swc-plugin-extractor: 4.14.9
       react: 19.3.1
       use-intl: 4.14.9(@types/react@19.3.0)(react@19.3.1)
@@ -7926,9 +7931,9 @@ snapshots:
     transitivePeerDependencies:
       - '@swc/helpers'
 
-  next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1):
+  next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1):
     dependencies:
-      '@next/env': 16.4.2
+      '@next/env': 16.4.5
       '@swc/helpers': 0.5.23
       baseline-browser-mapping: 2.11.30
       caniuse-lite: 1.0.30001816
@@ -7937,14 +7942,14 @@ snapshots:
       react-dom: 19.3.1(react@19.3.1)
       styled-jsx: 5.1.6(@babel/core@7.29.7)(react@19.3.1)
     optionalDependencies:
-      '@next/swc-darwin-arm64': 16.4.2
-      '@next/swc-darwin-x64': 16.4.2
-      '@next/swc-linux-arm64-gnu': 16.4.2
-      '@next/swc-linux-arm64-musl': 16.4.2
-      '@next/swc-linux-x64-gnu': 16.4.2
-      '@next/swc-linux-x64-musl': 16.4.2
-      '@next/swc-win32-arm64-msvc': 16.4.2
-      '@next/swc-win32-x64-msvc': 16.4.2
+      '@next/swc-darwin-arm64': 16.4.5
+      '@next/swc-darwin-x64': 16.4.5
+      '@next/swc-linux-arm64-gnu': 16.4.5
+      '@next/swc-linux-arm64-musl': 16.4.5
+      '@next/swc-linux-x64-gnu': 16.4.5
+      '@next/swc-linux-x64-musl': 16.4.5
+      '@next/swc-win32-arm64-msvc': 16.4.5
+      '@next/swc-win32-x64-msvc': 16.4.5
       sharp: 0.35.5(@types/node@22.20.5)
     transitivePeerDependencies:
       - '@babel/core'
@@ -8610,13 +8615,13 @@ snapshots:
       d3-time: 3.1.0
       d3-timer: 3.0.1
 
-  vite-plugin-storybook-nextjs@10.6.2(next@16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1)):
+  vite-plugin-storybook-nextjs@10.6.2(next@16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1))(storybook@10.6.2(@types/react@19.3.0)(react@19.3.1))(typescript@7.0.2)(vite@8.3.4(@types/node@22.20.5)(esbuild@0.28.2)(jiti@2.7.0)(yaml@2.9.1)):
     dependencies:
       '@next/env': 16.4.2
       '@rollup/pluginutils': 5.4.0
       magic-string: 0.30.21
       module-alias: 2.3.4
-      next: 16.4.2(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
+      next: 16.4.5(@babel/core@7.29.7)(@types/node@22.20.5)(react-dom@19.3.1(react@19.3.1))(react@19.3.1)
       pathe: 2.0.3
       probe-image-size: 7.4.0
       semver: 7.8.5
```

## dependency-audit-after.json.txt

- Original file: `dependency-audit-after.json.txt`
- Original size: 2036 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
{
  "advisories": {
    "1247710": {
      "findings": [
        {
          "version": "4.0.7",
          "paths": [
            ".>next-intl>@parcel/watcher>picomatch"
          ],
          "dev": false,
          "optional": false,
          "bundled": false
        }
      ],
      "id": 1247710,
      "title": "picomatch vulnerable to ReDoS through single-branch repeated extglobs",
      "module_name": "picomatch",
      "vulnerable_versions": "<=4.0.7",
      "patched_versions": null,
      "patched_versions_unpublished": true,
      "severity": "high",
      "cwe": "CWE-1333",
      "github_advisory_id": "GHSA-fc5q-39xc-vjpf",
      "url": "https://github.com/advisories/GHSA-fc5q-39xc-vjpf"
    }
  },
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 0,
      "high": 1,
      "critical": 0
    },
    "dependencies": 239,
    "devDependencies": 0,
    "optionalDependencies": 130,
    "totalDependencies": 369
  }
}
```

## dependency-audit.json.txt

- Original file: `dependency-audit.json.txt`
- Original size: 6572 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
{
  "advisories": {
    "1244003": {
      "findings": [
        {
          "version": "1.16.1",
          "paths": [
            ".>axios>follow-redirects"
          ],
          "dev": false,
          "optional": false,
          "bundled": false
        }
      ],
      "id": 1244003,
      "title": "follow-redirects: Cross-realm sensitiveHeaders arrays are discarded and custom credentials can follow redirects",
      "module_name": "follow-redirects",
      "vulnerable_versions": ">=1.16.0 <=1.16.1",
      "patched_versions": ">=1.16.2",
      "severity": "high",
      "cwe": "CWE-201",
      "github_advisory_id": "GHSA-mrwp-f3q8-3g9p",
      "url": "https://github.com/advisories/GHSA-mrwp-f3q8-3g9p"
    },
    "1247486": {
      "findings": [
        {
          "version": "16.4.2",
          "paths": [
            ".>next-intl>next",
            ".>@bprogress/next>next",
            ".>next"
          ],
          "dev": false,
          "optional": false,
          "bundled": false
        }
      ],
      "id": 1247486,
      "title": "Next.js: Information disclosure across root params when a 'use cache' function is called through unstable_cache()",
      "module_name": "next",
      "vulnerable_versions": ">=16.3.0 <=16.4.4",
      "patched_versions": ">=16.4.5",
      "severity": "moderate",
      "cwe": "CWE-362",
      "github_advisory_id": "GHSA-mfr8-8qww-v76h",
      "url": "https://github.com/advisories/GHSA-mfr8-8qww-v76h"
    },
    "1247710": {
      "findings": [
        {
          "version": "4.0.7",
          "paths": [
            ".>next-intl>@parcel/watcher>picomatch"
          ],
          "dev": false,
          "optional": false,
          "bundled": false
        }
      ],
      "id": 1247710,
      "title": "picomatch vulnerable to ReDoS through single-branch repeated extglobs",
      "module_name": "picomatch",
      "vulnerable_versions": "<=4.0.7",
      "patched_versions": null,
      "patched_versions_unpublished": true,
      "severity": "high",
      "cwe": "CWE-1333",
      "github_advisory_id": "GHSA-fc5q-39xc-vjpf",
      "url": "https://github.com/advisories/GHSA-fc5q-39xc-vjpf"
    },
    "1247712": {
      "findings": [
        {
          "version": "16.4.2",
          "paths": [
            ".>next-intl>next",
            ".>@bprogress/next>next",
            ".>next"
          ],
          "dev": false,
          "optional": false,
          "bundled": false
        }
      ],
      "id": 1247712,
      "title": "Next.js: Cache leak across root param values in nested 'use cache' functions via delayed inner stream metadata",
      "module_name": "next",
      "vulnerable_versions": ">=16.2.0 <=16.4.4",
      "patched_versions": ">=16.4.5",
      "severity": "moderate",
      "cwe": "CWE-362",
      "github_advisory_id": "GHSA-vc7v-qv4w-wrv8",
      "url": "https://github.com/advisories/GHSA-vc7v-qv4w-wrv8"
    }
  },
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 2,
      "high": 2,
      "critical": 0
    },
    "dependencies": 239,
    "devDependencies": 0,
    "optionalDependencies": 130,
    "totalDependencies": 369
  }
}
```

## diff-check.txt

- Original file: `diff-check.txt`
- Original size: 5072 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
git.exe : warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
At line:2 char:196
+ ... leanup.txt; git.exe diff --check *> docs/audit/phase-14/evidence/diff ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (warning: in the... Git touches it:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
warning: in the working copy of 'pnpm-lock.yaml', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/engine/controls/__tests__/events.test.ts', LF will be replaced by CRLF the next 
time Git touches it
warning: in the working copy of 'src/engine/controls/events.ts', LF will be replaced by CRLF the next time Git touches 
it
warning: in the working copy of 'src/messages/en/worldExplorer.json', LF will be replaced by CRLF the next time Git 
touches it
warning: in the working copy of 'src/messages/vi/worldExplorer.json', LF will be replaced by CRLF the next time Git 
touches it
warning: in the working copy of 'src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/__tests__/world.test.ts', LF will be replaced by CRLF the 
next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/components/WorldExplorerClient.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/components/WorldHud.stories.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/components/WorldHud.tsx', LF will be replaced by CRLF the 
next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/hooks/useWorldExplorer.ts', LF will be replaced by CRLF the 
next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/runtime/world.ts', LF will be replaced by CRLF the next 
time Git touches it
warning: in the working copy of 'src/styles/globals.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/world-core/registries/data-sources.ts', LF will be replaced by CRLF the next time 
Git touches it
```

## docker.txt

- Original file: `docker.txt`
- Original size: 1906 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
docker.exe : WARNING: Error loading config file: open C:\Users\USER\.docker\config.json: Access is denied.
At line:2 char:338
+ ... t -Tail 35; docker.exe version *> docs/audit/phase-14/evidence/docker ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (WARNING: Error ...cess is denied.:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Client:
 Version:           28.3.2
 API version:       1.51
 Go version:        go1.24.5
 Git commit:        578ccf6
 Built:             Wed Jul  9 16:12:31 2025
 OS/Arch:           windows/amd64
 Context:           default
error during connect: in the default daemon configuration on Windows, the docker client must be run with elevated 
privileges to connect: Get "http://%2F%2F.%2Fpipe%2Fdocker_engine/v1.51/version": open //./pipe/docker_engine: The 
system cannot find the file specified.
```

## document-lint.txt

- Original file: `document-lint.txt`
- Original size: 790 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome lint .
At line:2 char:393
+ ...  -First 12; pnpm.cmd lint *> docs/audit/phase-14/evidence/document-li ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 397 files in 573ms. No fixes applied.
```

## file-inventory.txt

- Original file: `file-inventory.txt`
- Original size: 9511 bytes
- Original encoding: UTF-8 with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
M	AGENTS.md
M	README.md
M	docs/PHASE_STATUS.md
M	docs/architecture/ARCHITECTURE.md
M	package.json
M	pnpm-lock.yaml
M	src/engine/controls/__tests__/events.test.ts
M	src/engine/controls/events.ts
M	src/messages/en/worldExplorer.json
M	src/messages/vi/worldExplorer.json
M	src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx
M	src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx
M	src/modules/WorldExplorer/__tests__/world.test.ts
M	src/modules/WorldExplorer/components/WorldExplorerClient.tsx
M	src/modules/WorldExplorer/components/WorldHud.stories.tsx
M	src/modules/WorldExplorer/components/WorldHud.tsx
M	src/modules/WorldExplorer/hooks/useWorldExplorer.ts
M	src/modules/WorldExplorer/runtime/world.ts
D	src/modules/WorldExplorer/styles/world.css
M	src/styles/globals.css
M	src/world-core/registries/data-sources.ts
PHASE_14_IMPLEMENTATION_REPORT.md
docs/architecture/CONFIG_OWNERSHIP.md
docs/architecture/IMAGERY_ALIGNMENT.md
docs/architecture/STYLE_ARCHITECTURE.md
docs/audit/phase-14/BASELINE_AND_PLAN.md
docs/audit/phase-14/TEST_MATRIX.md
docs/audit/phase-14/browser-driver.cjs.txt
docs/audit/phase-14/check-references.mjs
docs/audit/phase-14/evidence/after-1024x768-debug.png
docs/audit/phase-14/evidence/after-1366x768-debug.png
docs/audit/phase-14/evidence/after-1920x1080.png
docs/audit/phase-14/evidence/after-390x844-debug.png
docs/audit/phase-14/evidence/after-768x1024-debug.png
docs/audit/phase-14/evidence/after-844x390-debug.png
docs/audit/phase-14/evidence/after-browser.json
docs/audit/phase-14/evidence/after-context-restored.png
docs/audit/phase-14/evidence/after-debug.png
docs/audit/phase-14/evidence/after-hud-1024x768.png
docs/audit/phase-14/evidence/after-hud-1366x768.png
docs/audit/phase-14/evidence/after-hud-1920x1080.png
docs/audit/phase-14/evidence/after-hud-390x844.png
docs/audit/phase-14/evidence/after-hud-768x1024.png
docs/audit/phase-14/evidence/after-hud-844x390.png
docs/audit/phase-14/evidence/after-imagery-inspector.png
docs/audit/phase-14/evidence/after-server.txt
docs/audit/phase-14/evidence/after-source-registry.png
docs/audit/phase-14/evidence/after-vi-debug.png
docs/audit/phase-14/evidence/alignment-first.txt
docs/audit/phase-14/evidence/alignment-red.txt
docs/audit/phase-14/evidence/alignment-trust.txt
docs/audit/phase-14/evidence/baseline-1920x1080.png
docs/audit/phase-14/evidence/baseline-browser.json
docs/audit/phase-14/evidence/baseline-build-storybook.txt
docs/audit/phase-14/evidence/baseline-build.txt
docs/audit/phase-14/evidence/baseline-debug.png
docs/audit/phase-14/evidence/baseline-format-check.txt
docs/audit/phase-14/evidence/baseline-lint.txt
docs/audit/phase-14/evidence/baseline-retry-build-storybook.txt
docs/audit/phase-14/evidence/baseline-retry-build.txt
docs/audit/phase-14/evidence/baseline-retry-type-check.txt
docs/audit/phase-14/evidence/baseline-server.txt
docs/audit/phase-14/evidence/baseline-test.txt
docs/audit/phase-14/evidence/baseline-type-check.txt
docs/audit/phase-14/evidence/baseline-ui-browser.json
docs/audit/phase-14/evidence/baseline-ui-hud-1024x768.png
docs/audit/phase-14/evidence/baseline-ui-hud-1366x768.png
docs/audit/phase-14/evidence/baseline-ui-hud-1920x1080.png
docs/audit/phase-14/evidence/baseline-ui-hud-390x844.png
docs/audit/phase-14/evidence/baseline-ui-hud-768x1024.png
docs/audit/phase-14/evidence/baseline-ui-hud-844x390.png
docs/audit/phase-14/evidence/baseline-ui-server.txt
docs/audit/phase-14/evidence/canvas-cleanup.txt
docs/audit/phase-14/evidence/clean-coverage.txt
docs/audit/phase-14/evidence/clean-test.txt
docs/audit/phase-14/evidence/coverage-retry.txt
docs/audit/phase-14/evidence/dependencies-diff.txt
docs/audit/phase-14/evidence/dependency-audit-after.json.txt
docs/audit/phase-14/evidence/dependency-audit.json.txt
docs/audit/phase-14/evidence/diff-check.txt
docs/audit/phase-14/evidence/docker.txt
docs/audit/phase-14/evidence/document-lint.txt
docs/audit/phase-14/evidence/file-inventory.txt
docs/audit/phase-14/evidence/final-build-storybook.txt
docs/audit/phase-14/evidence/final-build.txt
docs/audit/phase-14/evidence/final-coverage.txt
docs/audit/phase-14/evidence/final-document-format.txt
docs/audit/phase-14/evidence/final-document-lint.txt
docs/audit/phase-14/evidence/final-format-check.txt
docs/audit/phase-14/evidence/final-lint.txt
docs/audit/phase-14/evidence/final-test.txt
docs/audit/phase-14/evidence/final-type-check.txt
docs/audit/phase-14/evidence/first-production-browser.json
docs/audit/phase-14/evidence/focused.txt
docs/audit/phase-14/evidence/frozen-lockfile-retry.txt
docs/audit/phase-14/evidence/frozen-lockfile.txt
docs/audit/phase-14/evidence/git-platform-notices.txt
docs/audit/phase-14/evidence/host-probe.json
docs/audit/phase-14/evidence/input-green.txt
docs/audit/phase-14/evidence/input-red.txt
docs/audit/phase-14/evidence/inspector-first.txt
docs/audit/phase-14/evidence/inspector-green.txt
docs/audit/phase-14/evidence/iteration-lint.txt
docs/audit/phase-14/evidence/next-security-update.txt
docs/audit/phase-14/evidence/node22-build-retry.txt
docs/audit/phase-14/evidence/node22-build-storybook.txt
docs/audit/phase-14/evidence/node22-build.txt
docs/audit/phase-14/evidence/node22-format-check.txt
docs/audit/phase-14/evidence/node22-lint.txt
docs/audit/phase-14/evidence/node22-test.txt
docs/audit/phase-14/evidence/node22-type-check.txt
docs/audit/phase-14/evidence/peer-dependencies.txt
docs/audit/phase-14/evidence/picomatch-paths.txt
docs/audit/phase-14/evidence/preview-transport.txt
docs/audit/phase-14/evidence/process-cleanup.txt
docs/audit/phase-14/evidence/redirect-security-update.txt
docs/audit/phase-14/evidence/references.json
docs/audit/phase-14/evidence/release-1920x1080.png
docs/audit/phase-14/evidence/release-320-debug.png
docs/audit/phase-14/evidence/release-browser.json
docs/audit/phase-14/evidence/release-build-storybook.txt
docs/audit/phase-14/evidence/release-build.txt
docs/audit/phase-14/evidence/release-cpu.cpuprofile
docs/audit/phase-14/evidence/release-format-check.txt
docs/audit/phase-14/evidence/release-format-retry.txt
docs/audit/phase-14/evidence/release-health-1366.png
docs/audit/phase-14/evidence/release-health-390.png
docs/audit/phase-14/evidence/release-host-mismatch-browser.json
docs/audit/phase-14/evidence/release-host-mismatch-server.txt
docs/audit/phase-14/evidence/release-hud-1024x768.png
docs/audit/phase-14/evidence/release-hud-844x390.png
docs/audit/phase-14/evidence/release-imagery-inspector.png
docs/audit/phase-14/evidence/release-ip-host-browser.json
docs/audit/phase-14/evidence/release-lint.txt
docs/audit/phase-14/evidence/release-server.txt
docs/audit/phase-14/evidence/release-test.txt
docs/audit/phase-14/evidence/release-type-check.txt
docs/audit/phase-14/evidence/review-gcp-red.txt
docs/audit/phase-14/evidence/review-green.txt
docs/audit/phase-14/evidence/runtime-coverage-retry.txt
docs/audit/phase-14/evidence/runtime-interaction.txt
docs/audit/phase-14/evidence/stabilization-1024x768-debug.png
docs/audit/phase-14/evidence/stabilization-1366x768-debug.png
docs/audit/phase-14/evidence/stabilization-1920x1080.png
docs/audit/phase-14/evidence/stabilization-390x844-debug.png
docs/audit/phase-14/evidence/stabilization-768x1024-debug.png
docs/audit/phase-14/evidence/stabilization-844x390-debug.png
docs/audit/phase-14/evidence/stabilization-browser.json
docs/audit/phase-14/evidence/stabilization-context-restored.png
docs/audit/phase-14/evidence/stabilization-debug.png
docs/audit/phase-14/evidence/stabilization-hud-1024x768.png
docs/audit/phase-14/evidence/stabilization-hud-1366x768.png
docs/audit/phase-14/evidence/stabilization-hud-1920x1080.png
docs/audit/phase-14/evidence/stabilization-hud-390x844.png
docs/audit/phase-14/evidence/stabilization-hud-768x1024.png
docs/audit/phase-14/evidence/stabilization-hud-844x390.png
docs/audit/phase-14/evidence/stabilization-imagery-inspector.png
docs/audit/phase-14/evidence/stabilization-server.txt
docs/audit/phase-14/evidence/stale-preview-green.txt
docs/audit/phase-14/evidence/storybook-browser.json
docs/audit/phase-14/evidence/storybook-first-browser.json
docs/audit/phase-14/evidence/storybook-no-approved-imagery-1366.png
docs/audit/phase-14/evidence/storybook-no-approved-imagery-390.png
docs/audit/phase-14/evidence/storybook-rejected-asset-390.png
docs/audit/phase-14/evidence/storybook-server.txt
docs/audit/phase-14/evidence/summary.json
docs/audit/phase-14/evidence/trust-preview-latest.txt
docs/audit/phase-14/evidence/trust-red.txt
docs/audit/phase-14/evidence/types-iteration.txt
docs/audit/phase-14/serve-storybook.cjs.txt
docs/audit/phase-14/summarize-evidence.mjs
docs/prompts/PHASE_14_CODEX_SATELLITE_ALIGNMENT_STABILIZATION_REFACTOR_MASTER_PROMPT.md
src/engine/imagery/__tests__/alignment.test.ts
src/engine/imagery/__tests__/fixtures.ts
src/engine/imagery/alignment.ts
src/engine/imagery/const.ts
src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx
src/modules/WorldExplorer/__tests__/imagery-preview.test.ts
src/modules/WorldExplorer/__tests__/imagery.test.tsx
src/modules/WorldExplorer/components/ImageryInspector.stories.tsx
src/modules/WorldExplorer/components/ImageryInspector.tsx
src/modules/WorldExplorer/imagery-diagnostics.ts
src/modules/WorldExplorer/imagery-preview.ts
src/styles/tokens.css
src/styles/world-explorer.css
src/styles/world-tokens.css
src/world-core/registries/__tests__/imagery.test.ts
src/world-core/registries/imagery.ts
PREEXISTING PRESERVED: docs/prompts/PHASE_14_CODEX_SATELLITE_ALIGNMENT_STABILIZATION_REFACTOR_MASTER_PROMPT.md
```

## final-build-storybook.txt

- Original file: `final-build-storybook.txt`
- Original size: 30368 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ storybook build
At line:2 char:346
+ ... TEXITCODE"; pnpm.cmd build-storybook *> docs/audit/phase-14/evidence/ ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
|
o  Loading presets
|
o  Building manager..
|
•  Building open services..
|
•  Building preview..
|
•  Copying static files: public at storybook-static
|  Vite vite v8.3.4 building client environment for production...
transforming...
✓ 4809 modules transformed.
rendering chunks...
computing gzip size...
|  Vite storybook-static/iframe.html
|  20.52 kB │ gzip:   5.60 kB
|  storybook-static/assets/world-explorer-CEIpG_M-.css
|  20.68 kB │ gzip:   4.90 kB
|  storybook-static/assets/iframe-BaSE0WOI.css
|  206.47 kB │ gzip:  30.87 kB
|  storybook-static/assets/iframe-MWIh6b5C.js
|  0.04 kB │ gzip:   0.06 kB
|  storybook-static/assets/dist-BpWrIoGY.js
|  0.22 kB │ gzip:   0.19 kB
|  storybook-static/assets/chunk-242VQQM5-CJ9i1iaj.js
|  0.24 kB │ gzip:   0.20 kB
|  storybook-static/assets/dist-Bgc6TXR4.js
|  0.24 kB │ gzip:   0.21 kB
|  storybook-static/assets/check-C4l0qdMD.js
|  0.26 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-down-Db-YoaoO.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/chevron-left-Cd9RGiHq.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-right-D1L19B_Q.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/circle-DWuLk5md.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/x-B1sqVEY7.js
|  0.29 kB │ gzip:   0.24 kB
|  storybook-static/assets/formatter-L2YTDE3Q-DqPs7d2n.js
|  0.30 kB │ gzip:   0.24 kB
|  storybook-static/assets/loader-circle-CSUbcJrl.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/search-B43BJUb4.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/chunk-QQBDHPVZ-BJU3Mk0_.js
|  0.32 kB │ gzip:   0.19 kB
|  storybook-static/assets/info-CSIANWNH.js
|  0.34 kB │ gzip:   0.26 kB
|  storybook-static/assets/ellipsis-Dfn6svcK.js
|  0.39 kB │ gzip:   0.27 kB
|  storybook-static/assets/skeleton-BnsNpVbF.js
|  0.41 kB │ gzip:   0.29 kB
|  storybook-static/assets/dist-BOqIPbtB.js
|  0.42 kB │ gzip:   0.31 kB
|  storybook-static/assets/use-mobile-BB6e8wyp.js
|  0.42 kB │ gzip:   0.29 kB
|  storybook-static/assets/inbox-CbvC1Bd7.js
|  0.43 kB │ gzip:   0.32 kB
|  storybook-static/assets/jsx-runtime-BxfXuubT.js
|  0.43 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-C9t7Cshp.js
|  0.44 kB │ gzip:   0.32 kB
|  storybook-static/assets/WorldExplorerClient.stories-A35j2-Vr.js
|  0.45 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-P5aEaGBE.js
|  0.49 kB │ gzip:   0.33 kB
|  storybook-static/assets/react-CubzI6CK.js
|  0.58 kB │ gzip:   0.34 kB
|  storybook-static/assets/dist-BDazaY1u.js
|  0.64 kB │ gzip:   0.43 kB
|  storybook-static/assets/textarea.stories-CNc698vf.js
|  0.65 kB │ gzip:   0.38 kB
|  storybook-static/assets/chunk-UAWMPV5J-Dsq9DvcU.js
|  0.74 kB │ gzip:   0.45 kB
|  storybook-static/assets/dist-BNjw8BE7.js
|  0.75 kB │ gzip:   0.45 kB
|  storybook-static/assets/enum-CwrLEL0d.js
|  0.78 kB │ gzip:   0.45 kB
|  storybook-static/assets/toggle.stories-Q84BqJ2J.js
|  0.78 kB │ gzip:   0.44 kB
|  storybook-static/assets/checkbox.stories-DIHgK8RS.js
|  0.80 kB │ gzip:   0.37 kB
|  storybook-static/assets/Icons.stories-DDEyaz2J.js
|  0.80 kB │ gzip:   0.50 kB
|  storybook-static/assets/textarea-BbLnRPqe.js
|  0.83 kB │ gzip:   0.50 kB
|  storybook-static/assets/label.stories-9eKD3mf9.js
|  0.83 kB │ gzip:   0.48 kB
|  storybook-static/assets/dist-Ch4r59Bc.js
|  0.85 kB │ gzip:   0.50 kB
|  storybook-static/assets/dist-B0agaa99.js
|  0.85 kB │ gzip:   0.54 kB
|  storybook-static/assets/shim-C5Xie9xJ.js
|  0.85 kB │ gzip:   0.46 kB
|  storybook-static/assets/tooltip.stories-CLeE2gae.js
|  0.87 kB │ gzip:   0.49 kB
|  storybook-static/assets/ImageryInspector.stories-wp-xPtmv.js
|  0.89 kB │ gzip:   0.49 kB
|  storybook-static/assets/spinner.stories-Bb7RuOmR.js
|  0.93 kB │ gzip:   0.51 kB
|  storybook-static/assets/skeleton.stories-DSUtaA88.js
|  0.94 kB │ gzip:   0.47 kB
|  storybook-static/assets/with-selector-yh4Qcx8N.js
|  0.94 kB │ gzip:   0.53 kB
|  storybook-static/assets/input-CsO9Atno.js
|  1.01 kB │ gzip:   0.56 kB
|  storybook-static/assets/switch.stories-PtLs2fuF.js
|  1.02 kB │ gzip:   0.54 kB
|  storybook-static/assets/dist-r86zl3cz.js
|  1.03 kB │ gzip:   0.55 kB
|  storybook-static/assets/label-BeO5gq6m.js
|  1.04 kB │ gzip:   0.62 kB
|  storybook-static/assets/input.stories-SMUNiHJP.js
|  1.18 kB │ gzip:   0.53 kB
|  storybook-static/assets/select.stories-GJ1qLA9c.js
|  1.23 kB │ gzip:   0.60 kB
|  storybook-static/assets/rolldown-runtime-2s6bX4vc.js
|  1.26 kB │ gzip:   0.69 kB
|  storybook-static/assets/separator.stories-BU_xmlNe.js
|  1.26 kB │ gzip:   0.55 kB
|  storybook-static/assets/StatusBadge.stories-C_8eplXH.js
|  1.36 kB │ gzip:   0.73 kB
|  storybook-static/assets/input-group.stories-BdISNErZ.js
|  1.36 kB │ gzip:   0.55 kB
|  storybook-static/assets/separator-Azq44eiO.js
|  1.39 kB │ gzip:   0.70 kB
|  storybook-static/assets/card.stories-BLaUhodb.js
|  1.43 kB │ gzip:   0.65 kB
|  storybook-static/assets/badge.stories-BPrM91fh.js
|  1.44 kB │ gzip:   0.66 kB
|  storybook-static/assets/dialog.stories-D_jEOpQA.js
|  1.49 kB │ gzip:   0.66 kB
|  storybook-static/assets/aspect-ratio.stories-fRsWVF3w.js
|  1.55 kB │ gzip:   0.82 kB
|  storybook-static/assets/alert.stories-D_dJ3KQy.js
|  1.55 kB │ gzip:   0.66 kB
|  storybook-static/assets/collapsible.stories-CrpfVjuU.js
|  1.57 kB │ gzip:   0.68 kB
|  storybook-static/assets/kbd.stories-BGpjJOyb.js
|  1.59 kB │ gzip:   0.74 kB
|  storybook-static/assets/preload-helper-0TbE23ZY.js
|  1.64 kB │ gzip:   0.87 kB
|  storybook-static/assets/chunk-IMSF75WX-mRJxbqao.js
|  1.67 kB │ gzip:   0.90 kB
|  storybook-static/assets/dropdown-menu.stories-r32spgcz.js
|  1.69 kB │ gzip:   0.70 kB
|  storybook-static/assets/badge-B3Q-jtvj.js
|  1.73 kB │ gzip:   0.82 kB
|  storybook-static/assets/ThemeProvider-4_Xyiqq5.js
|  1.75 kB │ gzip:   0.95 kB
|  storybook-static/assets/alert-B0jXkKKh.js
|  1.78 kB │ gzip:   0.82 kB
|  storybook-static/assets/card-95wFGgDq.js
|  1.85 kB │ gzip:   0.62 kB
|  storybook-static/assets/dist-Cp023XQn.js
|  1.89 kB │ gzip:   0.83 kB
|  storybook-static/assets/dist-B0_5lTDF.js
|  1.90 kB │ gzip:   0.93 kB
|  storybook-static/assets/form.stories-CxwjRHLe.js
|  2.10 kB │ gzip:   0.99 kB
|  storybook-static/assets/sheet.stories-BFq77P63.js
|  2.13 kB │ gzip:   0.72 kB
|  storybook-static/assets/toggle-Bqk6sclz.js
|  2.29 kB │ gzip:   1.19 kB
|  storybook-static/assets/button-D2c_9SLl.js
|  2.29 kB │ gzip:   0.99 kB
|  storybook-static/assets/button-group.stories-CkehHyLh.js
|  2.36 kB │ gzip:   0.99 kB
|  storybook-static/assets/native-select.stories-G06xPHfK.js
|  2.56 kB │ gzip:   1.12 kB
|  storybook-static/assets/dist-Cq2hqxqm.js
|  2.83 kB │ gzip:   1.21 kB
|  storybook-static/assets/dist-D3CacQlx.js
|  2.85 kB │ gzip:   1.25 kB
|  storybook-static/assets/progress.stories-C39zBAS-.js
|  2.95 kB │ gzip:   1.43 kB
|  storybook-static/assets/breadcrumb.stories-uV-y4MKs.js
|  2.96 kB │ gzip:   1.02 kB
|  storybook-static/assets/empty.stories-CJA8KERW.js
|  3.18 kB │ gzip:   1.17 kB
|  storybook-static/assets/button.stories-gM96yru6.js
|  3.23 kB │ gzip:   1.18 kB
|  storybook-static/assets/dist-D_OpuV9i.js
|  3.30 kB │ gzip:   1.50 kB
|  storybook-static/assets/chunk-DRQKCCAG-PeJgrGxi.js
|  3.37 kB │ gzip:   1.40 kB
|  storybook-static/assets/sheet-DSdqGTO5.js
|  3.58 kB │ gzip:   1.18 kB
|  storybook-static/assets/pagination.stories-DXkSRfQF.js
|  3.59 kB │ gzip:   1.19 kB
|  storybook-static/assets/dialog-DXsGNYZJ.js
|  3.60 kB │ gzip:   1.21 kB
|  storybook-static/assets/createLucideIcon-DTc4q1oi.js
|  3.66 kB │ gzip:   1.68 kB
|  storybook-static/assets/react-dom-qBXZUrFy.js
|  3.92 kB │ gzip:   1.44 kB
|  storybook-static/assets/input-group-BIEe3yAv.js
|  4.02 kB │ gzip:   1.41 kB
|  storybook-static/assets/common.stories-DTVdHyxK.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-CRHtwIsm.js
|  4.69 kB │ gzip:   1.97 kB
|  storybook-static/assets/dist-C2PcoYQl.js
|  4.83 kB │ gzip:   2.10 kB
|  storybook-static/assets/dist-BtnfnuYA.js
|  5.09 kB │ gzip:   2.21 kB
|  storybook-static/assets/chunk-7PIQR4A3-BRrgxE8n.js
|  5.14 kB │ gzip:   1.93 kB
|  storybook-static/assets/field.stories-Dg4v51hb.js
|  5.30 kB │ gzip:   1.86 kB
|  storybook-static/assets/switch-DPVChe7p.js
|  5.34 kB │ gzip:   2.23 kB
|  storybook-static/assets/checkbox-CEzcDVsg.js
|  5.36 kB │ gzip:   2.25 kB
|  storybook-static/assets/dist-DM7xvX2L.js
|  5.64 kB │ gzip:   2.03 kB
|  storybook-static/assets/dist-BPgTGWBw.js
|  5.65 kB │ gzip:   2.58 kB
|  storybook-static/assets/avatar.stories-snzB4nyn.js
|  5.79 kB │ gzip:   2.12 kB
|  storybook-static/assets/dist-DGExwuT-.js
|  5.85 kB │ gzip:   2.17 kB
|  storybook-static/assets/ClientBoundary.stories-BSVpfDws.js
|  6.08 kB │ gzip:   2.65 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-CxEKuf4X.js
|  6.53 kB │ gzip:   2.59 kB
|  storybook-static/assets/hover-card.stories-Bh0ICGy-.js
|  6.97 kB │ gzip:   2.63 kB
|  storybook-static/assets/dropdown-menu-BchuS8Fg.js
|  7.06 kB │ gzip:   2.41 kB
|  storybook-static/assets/tabs.stories-C47bhjuJ.js
|  7.27 kB │ gzip:   2.60 kB
|  storybook-static/assets/accordion.stories-fo5SQ1Bu.js
|  7.50 kB │ gzip:   2.78 kB
|  storybook-static/assets/context-menu.stories-DUIbkTb2.js
|  7.56 kB │ gzip:   2.73 kB
|  storybook-static/assets/alert-dialog.stories-e4OqrUPg.js
|  7.61 kB │ gzip:   2.20 kB
|  storybook-static/assets/react-C7Icd8fu.js
|  7.90 kB │ gzip:   3.03 kB
|  storybook-static/assets/popover.stories-Cy1nz5tz.js
|  7.98 kB │ gzip:   3.03 kB
|  storybook-static/assets/radio-group.stories-DAgnv6kU.js
|  8.07 kB │ gzip:   3.17 kB
|  storybook-static/assets/Icons-BdTGl1wp.js
|  8.49 kB │ gzip:   2.17 kB
|  storybook-static/assets/dist-ZpFVeXSN.js
|  8.67 kB │ gzip:   3.04 kB
|  storybook-static/assets/form-field.stories-Dsdw8o9t.js
|  8.72 kB │ gzip:   2.43 kB
|  storybook-static/assets/menubar.stories-BSKf86iT.js
|  10.19 kB │ gzip:   3.58 kB
|  storybook-static/assets/input-otp.stories-ngCTD5Oe.js
|  12.77 kB │ gzip:   4.94 kB
|  storybook-static/assets/slider.stories-DMrVLFUF.js
|  13.05 kB │ gzip:   5.02 kB
|  storybook-static/assets/sidebar.stories-D4Ahee41.js
|  13.47 kB │ gzip:   4.20 kB
|  storybook-static/assets/es2015-C53hGp5h.js
|  14.52 kB │ gzip:   5.58 kB
|  storybook-static/assets/dist-DRfj0K7B.js
|  14.59 kB │ gzip:   4.93 kB
|  storybook-static/assets/scroll-area.stories-3KNE10P2.js
|  16.08 kB │ gzip:   5.17 kB
|  storybook-static/assets/command.stories-13DTrfcO.js
|  16.62 kB │ gzip:   6.15 kB
|  storybook-static/assets/navigation-menu.stories-BLnzNUVz.js
|  19.93 kB │ gzip:   6.22 kB
|  storybook-static/assets/floating-ui.react-dom-BDsy8TX8.js
|  22.18 kB │ gzip:   8.65 kB
|  storybook-static/assets/chunk-W22LQPXL-DLbOLb-b.js
|  22.67 kB │ gzip:   7.55 kB
|  storybook-static/assets/carousel.stories-XycxZHWD.js
|  24.85 kB │ gzip:   9.57 kB
|  storybook-static/assets/select-BGMpPeXN.js
|  25.93 kB │ gzip:   8.67 kB
|  storybook-static/vite-inject-mocker-entry.js
|  27.81 kB │ gzip:   9.67 kB
|  storybook-static/assets/utils-DcZBOCDd.js
|  27.98 kB │ gzip:   8.99 kB
|  storybook-static/assets/matchers-JIUQ3HVY-DWxIgmlT.js
|  28.79 kB │ gzip:   9.68 kB
|  storybook-static/assets/hooks--q80tfyT.js
|  29.87 kB │ gzip:  12.61 kB
|  storybook-static/assets/Color-6AOWCN3U-BHliv8P4.js
|  30.40 kB │ gzip:  11.49 kB
|  storybook-static/assets/world-explorer-gSPaRTyu.js
|  32.51 kB │ gzip:  11.79 kB
|  storybook-static/assets/WithTooltip-CDUNV5IS-PZG7aayt.js
|  32.72 kB │ gzip:  11.46 kB
|  storybook-static/assets/drawer.stories-1ht9Ezfp.js
|  33.65 kB │ gzip:   9.90 kB
|  storybook-static/assets/sonner.stories-C3oLH7YH.js
|  36.83 kB │ gzip:  10.65 kB
|  storybook-static/assets/form-TDM4j5Az.js
|  42.87 kB │ gzip:  14.86 kB
|  storybook-static/assets/resizable.stories-CXJJ3mua.js
|  46.12 kB │ gzip:  14.97 kB
|  storybook-static/assets/theming-K8zzODLs.js
|  55.39 kB │ gzip:  21.34 kB
|  storybook-static/assets/esm-C2oGAgJS.js
|  57.43 kB │ gzip:  16.68 kB
|  storybook-static/assets/WorldExplorerClient-D1GsxN0D.js
|  72.05 kB │ gzip:  26.47 kB
|  storybook-static/assets/syntaxhighlighter-4REYKNEV-BMUJTQLL.js
|  75.83 kB │ gzip:  27.23 kB
|  storybook-static/assets/calendar.stories-D4SJ_MSG.js
|  80.74 kB │ gzip:  23.91 kB
|  storybook-static/assets/schemas-BlgLiO46.js
|  95.33 kB │ gzip:  27.28 kB
|  storybook-static/assets/combobox.stories-BeGpeZiQ.js
|  122.42 kB │ gzip:  42.54 kB
|  storybook-static/assets/utilities.stories-CeDM8hSz.js
|  153.38 kB │ gzip:  50.64 kB
|  storybook-static/assets/DocsRenderer-JROSPFPF-BGvrobzq.js
|  191.34 kB │ gzip:  60.31 kB
|  storybook-static/assets/react-18-mQvaX4pw.js
|  208.00 kB │ gzip:  65.28 kB
|  storybook-static/assets/chart.stories-DTwielht.js
|  394.73 kB │ gzip: 116.74 kB
|  storybook-static/assets/components-CJRtydrz.js
|  556.90 kB │ gzip: 176.49 kB
|  storybook-static/assets/WorldHud-B9F8iDMj.js
|  650.07 kB │ gzip: 171.29 kB
|  storybook-static/assets/axe-C7pk9Kxd.js
|  659.32 kB │ gzip: 187.87 kB
|  storybook-static/assets/iframe-CJBlOjdB.js
|  1,359.53 kB │ gzip: 389.22 kB

|  Vite ✓ built in 12.61s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 10.3s of this 12.5s
|  build (83%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (38%, 4.8s, 4809
|  calls)
|  Additional callback time came from the callbacks below and from
|  callbacks under 1s.
|  3 callbacks are listed without a time. Their calls overlapped, so the
|  time inside one call includes work from other calls. To find their
|  cost, profile the build with `node --cpu-prof`:
|  - plugin plugin-csf transform (4809 calls)
|  - plugin vite-plugin-storybook-nextjs-swc transform (4809 calls)
|  - plugin vite:css transform (3 calls)
|  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
|  for more details.

|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully
```

## final-build.txt

- Original file: `final-build.txt`
- Original size: 2934 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next build
At line:2 char:241
+ ... TEXITCODE"; pnpm.cmd build *> docs/audit/phase-14/evidence/final-buil ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.5 (Turbopack)
✓ Running next.config.ts took 163ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 15.1s
  Running TypeScript ...
  Finished TypeScript in 6.1s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1501ms
  Finalizing page optimization ...

Route (app)
┌ ○ /_not-found
├   /[locale]
│ ├ ● /en
│ └ ● /vi
├ ƒ /[locale]/[...rest]
├   /[locale]/health
│ ├ ● /en/health
│ └ ● /vi/health
├ ƒ /api/health
├ ƒ /api/weather
├ ○ /apple-icon
├ ○ /icon.svg
├ ○ /manifest.webmanifest
├ ○ /opengraph-image
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /twitter-image


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

## final-coverage.txt

- Original file: `final-coverage.txt`
- Original size: 4662 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ vitest run --coverage --maxWorkers=2
At line:2 char:97
+ ... $env:PATH"; pnpm.cmd test:coverage --maxWorkers=2 *> docs/audit/phase ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run --coverage --maxWorkers=2:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8

Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
 ❯ src/modules/WorldExplorer/__tests__/world.test.ts (3 tests | 1 failed) 8373ms
   ❯ scene composition and browser runtime (3)
     × owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources 7536ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/modules/WorldExplorer/__tests__/world.test.ts > scene composition and browser runtime > owns one loop, 
resizes camera, clears input on hidden context, and disposes listeners/resources
Error: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".
 ❯ src/modules/WorldExplorer/__tests__/world.test.ts:57:3
     55|     expect(rocks[0].parent).toBeNull();
     56|   });
     57|   it('owns one loop, resizes camera, clears input on hidden context, a…
       |   ^
     58|     canvasContext();
     59|     const queue = new Map<number, FrameRequestCallback>();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed | 40 passed (41)
      Tests  1 failed | 235 passed (236)
   Start at  03:40:42
   Duration  82.25s (environment 60%, setup 18%, tests 10%, import 7%, worker 2%, transform 2%)

Environment  jsdom was created 41 times · 88.56s total, 60% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

[ELIFECYCLE] Command failed with exit code 1.
```

## final-document-format.txt

- Original file: `final-document-format.txt`
- Original size: 798 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome format .
At line:2 char:321
+ ... TEXITCODE"; pnpm.cmd format:check *> docs/audit/phase-14/evidence/fin ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 402 files in 168ms. No fixes applied.
```

## final-document-lint.txt

- Original file: `final-document-lint.txt`
- Original size: 790 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome lint .
At line:2 char:210
+ ... mmary.json; pnpm.cmd lint *> docs/audit/phase-14/evidence/final-docum ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 403 files in 395ms. No fixes applied.
```

## final-format-check.txt

- Original file: `final-format-check.txt`
- Original size: 798 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome format .
At line:2 char:638
+ ... TEXITCODE"; pnpm.cmd format:check *> docs/audit/phase-14/evidence/fin ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 393 files in 190ms. No fixes applied.
```

## final-lint.txt

- Original file: `final-lint.txt`
- Original size: 2758 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome lint .
At line:2 char:536
+ ... rences.mjs; pnpm.cmd lint *> docs/audit/phase-14/evidence/final-lint. ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
src\styles\world-explorer.css:1148:1 lint/style/noDescendingSpecificity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! Descending specificity selector found. This selector specificity is (0, 1, 0)
  
    1147 │ /* Environment panels follow the actual map height in both display modes. */
  > 1148 │ .world-top-left {
         │ ^^^^^^^^^^^^^^^
    1149 │   display: flex;
    1150 │   flex-direction: column;
  
  i This selector specificity is (0, 2, 0)
  
    868 │ /* A shared touch column gives the guide and toolbar one layout budget. All controls remain 
scroll-reachable. */
  > 869 │ .world-touch .world-top-left {
        │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    870 │   max-height: calc(100dvh - 160px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    871 │   max-width: calc(100vw - 24px);
  
  i Descending specificity selector may not be applied. Consider rearranging the order of the selectors. See MDN web 
docs for more details.
  

Checked 394 files in 467ms. No fixes applied.
Found 1 warning.
```

## final-test.txt

- Original file: `final-test.txt`
- Original size: 2386 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ vitest run
At line:2 char:758
+ ... TEXITCODE"; pnpm.cmd test *> docs/audit/phase-14/evidence/final-test. ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package
Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package

 Test Files  41 passed (41)
      Tests  236 passed (236)
   Start at  03:34:58
   Duration  44.64s (environment 67%, setup 19%, import 6%, tests 4%, transform 3%, worker 1%)

Environment  jsdom was created 41 times · 182.97s total, 67% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## final-type-check.txt

- Original file: `final-type-check.txt`
- Original size: 922 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next typegen && tsc --noEmit --incremental false
At line:2 char:97
+ ... $env:PATH"; pnpm.cmd type-check *> docs/audit/phase-14/evidence/final ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
```

## focused.txt

- Original file: `focused.txt`
- Original size: 7016 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

 ❯ src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx (5 tests | 1 failed) 456ms
   ❯ HUD button semantics (5)
     × shows read-only geographic confidence and height assumption in expanded F3 118ms
pnpm.cmd : 
At line:2 char:287
+ ... Client.tsx; pnpm.cmd exec vitest run src/engine/imagery src/world-cor ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx > HUD button semantics > shows read-only geographic 
confidence and height assumption in expanded F3
Error: Failed to call `useTranslations` because the context from `NextIntlClientProvider` was not found.

This can happen because:
1) You intended to render this component as a Server Component, the render
   failed, and therefore React attempted to render the component on the client
   instead. If this is the case, check the console for server errors.
2) You intended to render this component on the client side, but no context was found.
   Learn more about this error here: https://next-intl.dev/docs/environments/server-client-components#missing-context
 ❯ node_modules/.pnpm/next-intl@4.14.9_@swc+helpe_322b7055cfa30f3b1609a1f6194c2317/node_modules/next-intl/dist/esm/deve
lopment/react-client/index.js:20:13
 ❯ useTranslations src/hooks/useTranslations.ts:22:13
     20| export function useTranslations<NS extends Namespace>(namespace: NS): …
     21| export function useTranslations(namespace?: Namespace): { t: any; loca…
     22|   const t = useNextIntlTranslations(namespace as never);
       |             ^
     23|   const locale = useLocale() as Locale;
     24|
 ❯ ImageryInspector src/modules/WorldExplorer/components/ImageryInspector.tsx:27:17
 ❯ Object.react_stack_bottom_frame 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:28571:20
 ❯ renderWithHooks 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:8030:22
 ❯ updateFunctionComponent 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:10569:19
 ❯ beginWork 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:12205:18
 ❯ runWithFiberInDEV 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:1048:13
 ❯ performUnitOfWork 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:19176:22
 ❯ workLoopSync 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:19004:41

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed | 12 passed (13)
      Tests  1 failed | 111 passed (112)
   Start at  03:20:35
   Duration  9.66s (environment 55%, setup 18%, import 13%, tests 11%, transform 3%, worker 1%)

Environment  jsdom was created 13 times · 29.47s total, 55% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## frozen-lockfile-retry.txt

- Original file: `frozen-lockfile-retry.txt`
- Original size: 188 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
✓ Lockfile passes supply-chain policies (verified 9m ago)
Done in 72ms using pnpm v12.14.0
```

## frozen-lockfile.txt

- Original file: `frozen-lockfile.txt`
- Original size: 1194 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : Error: ERR_PNPM_STORE_DIR_OPEN_OPERATION_LOCK
At line:2 char:1
+ pnpm.cmd install --lockfile-only --frozen-lockfile --ignore-scripts * ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (Error: ERR_PNPM..._OPERATION_LOCK:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

  × installing dependencies
  ╰─▶ Failed to open the store operation lock at "C:\\Users\\USER\\AppData\
      \Local\\pnpm-store-operation-locks\\all-stores.lock": Access is denied.
      (os error 5)
```

## git-platform-notices.txt

- Original file: `git-platform-notices.txt`
- Original size: 5912 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
git.exe : warning: in the working copy of 'package.json', LF will be replaced by CRLF the next time Git touches it
At line:2 char:1
+ git.exe diff --name-status 2> docs/audit/phase-14/evidence/git-platfo ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (warning: in the... Git touches it:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
warning: in the working copy of 'pnpm-lock.yaml', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/engine/controls/__tests__/events.test.ts', LF will be replaced by CRLF the next 
time Git touches it
warning: in the working copy of 'src/engine/controls/events.ts', LF will be replaced by CRLF the next time Git touches 
it
warning: in the working copy of 'src/messages/en/worldExplorer.json', LF will be replaced by CRLF the next time Git 
touches it
warning: in the working copy of 'src/messages/vi/worldExplorer.json', LF will be replaced by CRLF the next time Git 
touches it
warning: in the working copy of 'src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/__tests__/world.test.ts', LF will be replaced by CRLF the 
next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/components/WorldExplorerClient.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/components/WorldHud.stories.tsx', LF will be replaced by 
CRLF the next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/components/WorldHud.tsx', LF will be replaced by CRLF the 
next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/hooks/useWorldExplorer.ts', LF will be replaced by CRLF the 
next time Git touches it
warning: in the working copy of 'src/modules/WorldExplorer/runtime/world.ts', LF will be replaced by CRLF the next 
time Git touches it
warning: in the working copy of 'src/styles/globals.css', LF will be replaced by CRLF the next time Git touches it
warning: in the working copy of 'src/world-core/registries/data-sources.ts', LF will be replaced by CRLF the next time 
Git touches it
git.exe : warning: unable to access 'C:\Users\USER/.config/git/ignore': Permission denied
At line:2 char:163
+ ... entory.txt; git.exe ls-files --others --exclude-standard 2>> docs/aud ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (warning: unable...rmission denied:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
```

## input-green.txt

- Original file: `input-green.txt`
- Original size: 478 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  2 passed (2)
      Tests  16 passed (16)
   Start at  03:08:59
   Duration  7.71s (environment 63%, setup 14%, tests 11%, import 7%, transform 4%, worker 1%)
```

## input-red.txt

- Original file: `input-red.txt`
- Original size: 6478 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

 ❯ src/engine/controls/__tests__/events.test.ts (12 tests | 1 failed) 239ms
   ❯ input lifecycle (12)
     × IMG-48 skips capture on a locked second click and releases mouse drag on blur 171ms
 ❯ src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx (4 tests | 1 failed) 420ms
   ❯ runtime retry lifecycle (4)
     × IMG-49 consumes a cooldown rejection without toggling Env 85ms
pnpm.cmd : 
At line:2 char:1
+ pnpm.cmd exec vitest run src/engine/controls/__tests__/events.test.ts ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 2 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/engine/controls/__tests__/events.test.ts > input lifecycle > IMG-48 skips capture on a locked second click 
and releases mouse drag on blur
AssertionError: expected "vi.fn()" to not be called at all, but actually been called 1 times

Received:

  1st vi.fn() call:

    Array [
      1,
    ]


Number of calls: 1

 ❯ src/engine/controls/__tests__/events.test.ts:62:25
     60|     Object.defineProperty(document, 'pointerLockElement', { configurab…
     61|     down();
     62|     expect(capture).not.toHaveBeenCalled();
       |                         ^
     63|     Reflect.deleteProperty(document, 'pointerLockElement');
     64|     down();

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/3]⎯

 FAIL  src/engine/controls/__tests__/events.test.ts > input lifecycle > IMG-48 skips capture on a locked second click 
and releases mouse drag on blur
TypeError: document.exitPointerLock is not a function
 ❯ Object.dispose src/engine/controls/events.ts:213:60
    211|       release();
    212|       for (const remove of listeners.reverse()) remove();
    213|       if (document.pointerLockElement === canvas) document.exitPointer…
       |                                                            ^
    214|     },
    215|   };
 ❯ src/engine/controls/__tests__/events.test.ts:28:31
 ❯ src/engine/controls/__tests__/events.test.ts:7:45

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/3]⎯

 FAIL  src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx > runtime retry lifecycle > IMG-49 consumes a 
cooldown rejection without toggling Env
Error: expect(element).toHaveTextContent()

Expected element to have text content:
  false
Received:
  true
 ❯ src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx:71:47
     69|     act(() => (mocks.create.mock.calls[0][0] as WorldBindings).command…
     70|     expect(screen.getByTestId('env-mode')).toHaveTextContent(before!);
     71|     expect(screen.getByTestId('dialog-open')).toHaveTextContent('false…
       |                                               ^
     72|     act(() => (mocks.create.mock.calls[0][0] as WorldBindings).command…
     73|     expect(screen.getByTestId('env-mode').textContent).not.toBe(before…

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/3]⎯


 Test Files  2 failed (2)
      Tests  2 failed | 14 passed (16)
   Start at  03:08:00
   Duration  2.57s (environment 54%, setup 16%, tests 14%, import 11%, transform 4%, worker 1%)
```

## inspector-first.txt

- Original file: `inspector-first.txt`
- Original size: 476 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  03:17:37
   Duration  2.00s (environment 57%, setup 14%, import 11%, tests 11%, transform 7%, worker 1%)
```

## inspector-green.txt

- Original file: `inspector-green.txt`
- Original size: 476 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  2 passed (2)
      Tests  8 passed (8)
   Start at  03:22:15
   Duration  3.35s (environment 46%, import 25%, setup 14%, tests 10%, transform 4%, worker 1%)
```

## iteration-lint.txt

- Original file: `iteration-lint.txt`
- Original size: 790 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome lint .
At line:2 char:193
+ ... ormat-List; pnpm.cmd lint *> docs/audit/phase-14/evidence/iteration-l ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 390 files in 564ms. No fixes applied.
```

## next-security-update.txt

- Original file: `next-security-update.txt`
- Original size: 3238 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
✓ Lockfile passes supply-chain policies (verified 1d ago)
Downloading next@16.4.5: 0.00 B/43.65 MB
Update available! 12.14.0 → 12.21.0.
Changelog: https://pnpm.io/v/12.21.0
To update, run: Invoke-WebRequest https://get.pnpm.io/install.ps1 -UseBasicParsing | Invoke-Expression
Downloading @next/swc-win32-x64-msvc@16.4.5: 0.00 B/36.16 MB
Progress: resolved 0, reused 36, downloaded 2, added 0
[WARN] 1 deprecated subdependencies found: tsconfck@3.1.6
Progress: resolved 5, reused 81, downloaded 3, added 3
Downloading @next/swc-win32-x64-msvc@16.4.5: 20.80 MB/36.16 MB
Downloading @next/swc-win32-x64-msvc@16.4.5: 31.93 MB/36.16 MB
Downloading next@16.4.5: 4.59 MB/43.65 MB
Downloading next@16.4.5: 5.08 MB/43.65 MB
Downloading next@16.4.5: 5.57 MB/43.65 MB
Downloading next@16.4.5: 6.02 MB/43.65 MB
Downloading next@16.4.5: 6.47 MB/43.65 MB
Downloading next@16.4.5: 6.88 MB/43.65 MB
Downloading next@16.4.5: 7.36 MB/43.65 MB
Downloading next@16.4.5: 8.59 MB/43.65 MB
Downloading next@16.4.5: 10.27 MB/43.65 MB
Downloading next@16.4.5: 12.73 MB/43.65 MB
Downloading next@16.4.5: 16.52 MB/43.65 MB
Downloading next@16.4.5: 22.12 MB/43.65 MB
Downloading next@16.4.5: 28.20 MB/43.65 MB
Downloading next@16.4.5: 35.15 MB/43.65 MB
Downloading next@16.4.5: 41.11 MB/43.65 MB
Progress: resolved 7, reused 81, downloaded 5, added 7
Packages: +7 -13
+++++++-------------
Progress: resolved 7, reused 81, downloaded 5, added 7, done
[WARN] Issues with peer dependencies found. Run "pnpm peers check" to list them.

dependencies:
- next 16.4.2
+ next 16.4.5

Done in 25.6s using pnpm v12.14.0
```

## node22-build-retry.txt

- Original file: `node22-build-retry.txt`
- Original size: 2928 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next build
At line:2 char:161
+ ... L_SIZE='1'; pnpm.cmd build *> docs/audit/phase-14/evidence/node22-bui ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 193ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 2.4s
  Running TypeScript ...
  Finished TypeScript in 2.9s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 2.3s
  Finalizing page optimization ...

Route (app)
┌ ○ /_not-found
├   /[locale]
│ ├ ● /en
│ └ ● /vi
├ ƒ /[locale]/[...rest]
├   /[locale]/health
│ ├ ● /en/health
│ └ ● /vi/health
├ ƒ /api/health
├ ƒ /api/weather
├ ○ /apple-icon
├ ○ /icon.svg
├ ○ /manifest.webmanifest
├ ○ /opengraph-image
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /twitter-image


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

## node22-build-storybook.txt

- Original file: `node22-build-storybook.txt`
- Original size: 30368 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:2 char:285
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/node22 ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
|
o  Loading presets
|
o  Building manager..
|
•  Building open services..
|
•  Building preview..
|
•  Copying static files: public at storybook-static
|  Vite vite v8.3.4 building client environment for production...
transforming...
✓ 4814 modules transformed.
rendering chunks...
computing gzip size...
|  Vite storybook-static/iframe.html
|  20.52 kB │ gzip:   5.60 kB
|  storybook-static/assets/world-explorer-CEIpG_M-.css
|  20.68 kB │ gzip:   4.90 kB
|  storybook-static/assets/iframe-BaSE0WOI.css
|  206.47 kB │ gzip:  30.87 kB
|  storybook-static/assets/iframe-DdU69-Za.js
|  0.04 kB │ gzip:   0.06 kB
|  storybook-static/assets/dist-BpWrIoGY.js
|  0.22 kB │ gzip:   0.19 kB
|  storybook-static/assets/chunk-242VQQM5-CJ9i1iaj.js
|  0.24 kB │ gzip:   0.20 kB
|  storybook-static/assets/dist-Bgc6TXR4.js
|  0.24 kB │ gzip:   0.21 kB
|  storybook-static/assets/check-C4l0qdMD.js
|  0.26 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-down-Db-YoaoO.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/chevron-left-Cd9RGiHq.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-right-D1L19B_Q.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/circle-DWuLk5md.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/x-B1sqVEY7.js
|  0.29 kB │ gzip:   0.24 kB
|  storybook-static/assets/formatter-L2YTDE3Q-DqPs7d2n.js
|  0.30 kB │ gzip:   0.24 kB
|  storybook-static/assets/loader-circle-CSUbcJrl.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/search-B43BJUb4.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/chunk-QQBDHPVZ-BJU3Mk0_.js
|  0.32 kB │ gzip:   0.19 kB
|  storybook-static/assets/info-CSIANWNH.js
|  0.34 kB │ gzip:   0.26 kB
|  storybook-static/assets/ellipsis-Dfn6svcK.js
|  0.39 kB │ gzip:   0.27 kB
|  storybook-static/assets/skeleton-BnsNpVbF.js
|  0.41 kB │ gzip:   0.29 kB
|  storybook-static/assets/dist-BOqIPbtB.js
|  0.42 kB │ gzip:   0.31 kB
|  storybook-static/assets/use-mobile-BB6e8wyp.js
|  0.42 kB │ gzip:   0.29 kB
|  storybook-static/assets/inbox-CbvC1Bd7.js
|  0.43 kB │ gzip:   0.32 kB
|  storybook-static/assets/jsx-runtime-BxfXuubT.js
|  0.43 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-C9t7Cshp.js
|  0.44 kB │ gzip:   0.32 kB
|  storybook-static/assets/WorldExplorerClient.stories-DGmmHSW8.js
|  0.45 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-P5aEaGBE.js
|  0.49 kB │ gzip:   0.33 kB
|  storybook-static/assets/react-CubzI6CK.js
|  0.58 kB │ gzip:   0.34 kB
|  storybook-static/assets/dist-BDazaY1u.js
|  0.64 kB │ gzip:   0.43 kB
|  storybook-static/assets/textarea.stories-CNc698vf.js
|  0.65 kB │ gzip:   0.38 kB
|  storybook-static/assets/chunk-UAWMPV5J-Dsq9DvcU.js
|  0.74 kB │ gzip:   0.45 kB
|  storybook-static/assets/dist-BNjw8BE7.js
|  0.75 kB │ gzip:   0.45 kB
|  storybook-static/assets/enum-CwrLEL0d.js
|  0.78 kB │ gzip:   0.45 kB
|  storybook-static/assets/toggle.stories-Q84BqJ2J.js
|  0.78 kB │ gzip:   0.44 kB
|  storybook-static/assets/checkbox.stories-DIHgK8RS.js
|  0.80 kB │ gzip:   0.37 kB
|  storybook-static/assets/Icons.stories-DDEyaz2J.js
|  0.80 kB │ gzip:   0.50 kB
|  storybook-static/assets/textarea-BbLnRPqe.js
|  0.83 kB │ gzip:   0.50 kB
|  storybook-static/assets/label.stories-9eKD3mf9.js
|  0.83 kB │ gzip:   0.48 kB
|  storybook-static/assets/dist-Ch4r59Bc.js
|  0.85 kB │ gzip:   0.50 kB
|  storybook-static/assets/dist-B0agaa99.js
|  0.85 kB │ gzip:   0.54 kB
|  storybook-static/assets/shim-C5Xie9xJ.js
|  0.85 kB │ gzip:   0.46 kB
|  storybook-static/assets/tooltip.stories-DFFSrpEW.js
|  0.87 kB │ gzip:   0.49 kB
|  storybook-static/assets/ImageryInspector.stories-CYvGELrg.js
|  0.89 kB │ gzip:   0.49 kB
|  storybook-static/assets/spinner.stories-Bb7RuOmR.js
|  0.93 kB │ gzip:   0.51 kB
|  storybook-static/assets/skeleton.stories-DSUtaA88.js
|  0.94 kB │ gzip:   0.47 kB
|  storybook-static/assets/with-selector-yh4Qcx8N.js
|  0.94 kB │ gzip:   0.53 kB
|  storybook-static/assets/input-CsO9Atno.js
|  1.01 kB │ gzip:   0.56 kB
|  storybook-static/assets/switch.stories-PtLs2fuF.js
|  1.02 kB │ gzip:   0.54 kB
|  storybook-static/assets/dist-r86zl3cz.js
|  1.03 kB │ gzip:   0.55 kB
|  storybook-static/assets/label-BeO5gq6m.js
|  1.04 kB │ gzip:   0.62 kB
|  storybook-static/assets/input.stories-SMUNiHJP.js
|  1.18 kB │ gzip:   0.53 kB
|  storybook-static/assets/select.stories-GJ1qLA9c.js
|  1.23 kB │ gzip:   0.60 kB
|  storybook-static/assets/rolldown-runtime-2s6bX4vc.js
|  1.26 kB │ gzip:   0.69 kB
|  storybook-static/assets/separator.stories-BU_xmlNe.js
|  1.26 kB │ gzip:   0.55 kB
|  storybook-static/assets/StatusBadge.stories-C_8eplXH.js
|  1.36 kB │ gzip:   0.73 kB
|  storybook-static/assets/input-group.stories-BdISNErZ.js
|  1.36 kB │ gzip:   0.55 kB
|  storybook-static/assets/separator-Azq44eiO.js
|  1.39 kB │ gzip:   0.70 kB
|  storybook-static/assets/card.stories-BLaUhodb.js
|  1.43 kB │ gzip:   0.65 kB
|  storybook-static/assets/badge.stories-BPrM91fh.js
|  1.44 kB │ gzip:   0.66 kB
|  storybook-static/assets/dialog.stories-D_jEOpQA.js
|  1.49 kB │ gzip:   0.66 kB
|  storybook-static/assets/aspect-ratio.stories-fRsWVF3w.js
|  1.55 kB │ gzip:   0.82 kB
|  storybook-static/assets/alert.stories-D_dJ3KQy.js
|  1.55 kB │ gzip:   0.66 kB
|  storybook-static/assets/collapsible.stories-CrpfVjuU.js
|  1.57 kB │ gzip:   0.68 kB
|  storybook-static/assets/kbd.stories-BGpjJOyb.js
|  1.59 kB │ gzip:   0.74 kB
|  storybook-static/assets/preload-helper-0TbE23ZY.js
|  1.64 kB │ gzip:   0.87 kB
|  storybook-static/assets/chunk-IMSF75WX-mRJxbqao.js
|  1.67 kB │ gzip:   0.90 kB
|  storybook-static/assets/dropdown-menu.stories-r32spgcz.js
|  1.69 kB │ gzip:   0.70 kB
|  storybook-static/assets/badge-B3Q-jtvj.js
|  1.73 kB │ gzip:   0.82 kB
|  storybook-static/assets/ThemeProvider-4_Xyiqq5.js
|  1.75 kB │ gzip:   0.95 kB
|  storybook-static/assets/alert-B0jXkKKh.js
|  1.78 kB │ gzip:   0.82 kB
|  storybook-static/assets/card-95wFGgDq.js
|  1.85 kB │ gzip:   0.62 kB
|  storybook-static/assets/dist-Cp023XQn.js
|  1.89 kB │ gzip:   0.83 kB
|  storybook-static/assets/dist-B0_5lTDF.js
|  1.90 kB │ gzip:   0.93 kB
|  storybook-static/assets/form.stories-CxwjRHLe.js
|  2.10 kB │ gzip:   0.99 kB
|  storybook-static/assets/sheet.stories-BFq77P63.js
|  2.13 kB │ gzip:   0.72 kB
|  storybook-static/assets/toggle-Bqk6sclz.js
|  2.29 kB │ gzip:   1.19 kB
|  storybook-static/assets/button-D2c_9SLl.js
|  2.29 kB │ gzip:   0.99 kB
|  storybook-static/assets/button-group.stories-CkehHyLh.js
|  2.36 kB │ gzip:   0.99 kB
|  storybook-static/assets/native-select.stories-G06xPHfK.js
|  2.56 kB │ gzip:   1.12 kB
|  storybook-static/assets/dist-Cq2hqxqm.js
|  2.83 kB │ gzip:   1.21 kB
|  storybook-static/assets/dist-D3CacQlx.js
|  2.85 kB │ gzip:   1.25 kB
|  storybook-static/assets/progress.stories-C39zBAS-.js
|  2.95 kB │ gzip:   1.43 kB
|  storybook-static/assets/breadcrumb.stories-uV-y4MKs.js
|  2.96 kB │ gzip:   1.02 kB
|  storybook-static/assets/empty.stories-CJA8KERW.js
|  3.18 kB │ gzip:   1.17 kB
|  storybook-static/assets/button.stories-gM96yru6.js
|  3.23 kB │ gzip:   1.18 kB
|  storybook-static/assets/dist-D_OpuV9i.js
|  3.30 kB │ gzip:   1.50 kB
|  storybook-static/assets/chunk-DRQKCCAG-PeJgrGxi.js
|  3.37 kB │ gzip:   1.40 kB
|  storybook-static/assets/sheet-DSdqGTO5.js
|  3.58 kB │ gzip:   1.18 kB
|  storybook-static/assets/pagination.stories-DXkSRfQF.js
|  3.59 kB │ gzip:   1.19 kB
|  storybook-static/assets/dialog-DXsGNYZJ.js
|  3.60 kB │ gzip:   1.21 kB
|  storybook-static/assets/createLucideIcon-DTc4q1oi.js
|  3.66 kB │ gzip:   1.68 kB
|  storybook-static/assets/react-dom-qBXZUrFy.js
|  3.92 kB │ gzip:   1.44 kB
|  storybook-static/assets/input-group-BIEe3yAv.js
|  4.02 kB │ gzip:   1.41 kB
|  storybook-static/assets/common.stories-BeNplILC.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-yNDalnet.js
|  4.69 kB │ gzip:   1.98 kB
|  storybook-static/assets/dist-C2PcoYQl.js
|  4.83 kB │ gzip:   2.10 kB
|  storybook-static/assets/dist-BtnfnuYA.js
|  5.09 kB │ gzip:   2.21 kB
|  storybook-static/assets/chunk-7PIQR4A3-BRrgxE8n.js
|  5.14 kB │ gzip:   1.93 kB
|  storybook-static/assets/field.stories-Dg4v51hb.js
|  5.30 kB │ gzip:   1.86 kB
|  storybook-static/assets/switch-DPVChe7p.js
|  5.34 kB │ gzip:   2.23 kB
|  storybook-static/assets/checkbox-CEzcDVsg.js
|  5.36 kB │ gzip:   2.25 kB
|  storybook-static/assets/dist-DM7xvX2L.js
|  5.64 kB │ gzip:   2.03 kB
|  storybook-static/assets/dist-BPgTGWBw.js
|  5.65 kB │ gzip:   2.58 kB
|  storybook-static/assets/avatar.stories-snzB4nyn.js
|  5.79 kB │ gzip:   2.12 kB
|  storybook-static/assets/dist-DGExwuT-.js
|  5.85 kB │ gzip:   2.17 kB
|  storybook-static/assets/ClientBoundary.stories-BDOGLMAq.js
|  6.08 kB │ gzip:   2.65 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-B-LN-9Vs.js
|  6.53 kB │ gzip:   2.59 kB
|  storybook-static/assets/hover-card.stories-Bh0ICGy-.js
|  6.97 kB │ gzip:   2.63 kB
|  storybook-static/assets/dropdown-menu-BchuS8Fg.js
|  7.06 kB │ gzip:   2.41 kB
|  storybook-static/assets/tabs.stories-C47bhjuJ.js
|  7.27 kB │ gzip:   2.60 kB
|  storybook-static/assets/accordion.stories-fo5SQ1Bu.js
|  7.50 kB │ gzip:   2.78 kB
|  storybook-static/assets/context-menu.stories-DUIbkTb2.js
|  7.56 kB │ gzip:   2.73 kB
|  storybook-static/assets/alert-dialog.stories-e4OqrUPg.js
|  7.61 kB │ gzip:   2.20 kB
|  storybook-static/assets/react-C7Icd8fu.js
|  7.90 kB │ gzip:   3.03 kB
|  storybook-static/assets/popover.stories-Cy1nz5tz.js
|  7.98 kB │ gzip:   3.03 kB
|  storybook-static/assets/radio-group.stories-DAgnv6kU.js
|  8.07 kB │ gzip:   3.17 kB
|  storybook-static/assets/Icons-BdTGl1wp.js
|  8.49 kB │ gzip:   2.17 kB
|  storybook-static/assets/dist-ZpFVeXSN.js
|  8.67 kB │ gzip:   3.04 kB
|  storybook-static/assets/form-field.stories-Dsdw8o9t.js
|  8.72 kB │ gzip:   2.43 kB
|  storybook-static/assets/menubar.stories-BSKf86iT.js
|  10.19 kB │ gzip:   3.58 kB
|  storybook-static/assets/input-otp.stories-ngCTD5Oe.js
|  12.77 kB │ gzip:   4.94 kB
|  storybook-static/assets/slider.stories-DMrVLFUF.js
|  13.05 kB │ gzip:   5.02 kB
|  storybook-static/assets/sidebar.stories-CYtiwFzA.js
|  13.47 kB │ gzip:   4.20 kB
|  storybook-static/assets/es2015-C53hGp5h.js
|  14.52 kB │ gzip:   5.58 kB
|  storybook-static/assets/dist-DRfj0K7B.js
|  14.59 kB │ gzip:   4.93 kB
|  storybook-static/assets/scroll-area.stories-3KNE10P2.js
|  16.08 kB │ gzip:   5.17 kB
|  storybook-static/assets/command.stories-13DTrfcO.js
|  16.62 kB │ gzip:   6.15 kB
|  storybook-static/assets/navigation-menu.stories-BLnzNUVz.js
|  19.93 kB │ gzip:   6.22 kB
|  storybook-static/assets/floating-ui.react-dom-BDsy8TX8.js
|  22.18 kB │ gzip:   8.65 kB
|  storybook-static/assets/chunk-W22LQPXL-DLbOLb-b.js
|  22.67 kB │ gzip:   7.55 kB
|  storybook-static/assets/carousel.stories-XycxZHWD.js
|  24.85 kB │ gzip:   9.57 kB
|  storybook-static/assets/select-BGMpPeXN.js
|  25.93 kB │ gzip:   8.67 kB
|  storybook-static/vite-inject-mocker-entry.js
|  27.81 kB │ gzip:   9.67 kB
|  storybook-static/assets/utils-DcZBOCDd.js
|  27.98 kB │ gzip:   8.99 kB
|  storybook-static/assets/matchers-JIUQ3HVY-DWxIgmlT.js
|  28.79 kB │ gzip:   9.68 kB
|  storybook-static/assets/hooks-WiavxYUU.js
|  29.87 kB │ gzip:  12.61 kB
|  storybook-static/assets/Color-6AOWCN3U-BHliv8P4.js
|  30.40 kB │ gzip:  11.49 kB
|  storybook-static/assets/world-explorer-DsA4FywB.js
|  30.65 kB │ gzip:  11.34 kB
|  storybook-static/assets/WithTooltip-CDUNV5IS-PZG7aayt.js
|  32.72 kB │ gzip:  11.46 kB
|  storybook-static/assets/drawer.stories-1ht9Ezfp.js
|  33.65 kB │ gzip:   9.90 kB
|  storybook-static/assets/sonner.stories-C3oLH7YH.js
|  36.83 kB │ gzip:  10.65 kB
|  storybook-static/assets/form-TDM4j5Az.js
|  42.87 kB │ gzip:  14.86 kB
|  storybook-static/assets/resizable.stories-CXJJ3mua.js
|  46.12 kB │ gzip:  14.97 kB
|  storybook-static/assets/theming-K8zzODLs.js
|  55.39 kB │ gzip:  21.34 kB
|  storybook-static/assets/esm-C2oGAgJS.js
|  57.43 kB │ gzip:  16.68 kB
|  storybook-static/assets/WorldExplorerClient-B9YVKpCy.js
|  72.05 kB │ gzip:  26.47 kB
|  storybook-static/assets/syntaxhighlighter-4REYKNEV-BMUJTQLL.js
|  75.83 kB │ gzip:  27.23 kB
|  storybook-static/assets/calendar.stories-D4SJ_MSG.js
|  80.74 kB │ gzip:  23.91 kB
|  storybook-static/assets/schemas-BlgLiO46.js
|  95.33 kB │ gzip:  27.28 kB
|  storybook-static/assets/combobox.stories-BeGpeZiQ.js
|  122.42 kB │ gzip:  42.54 kB
|  storybook-static/assets/utilities.stories-CeDM8hSz.js
|  153.38 kB │ gzip:  50.64 kB
|  storybook-static/assets/DocsRenderer-JROSPFPF-BGvrobzq.js
|  191.34 kB │ gzip:  60.31 kB
|  storybook-static/assets/react-18-mQvaX4pw.js
|  208.00 kB │ gzip:  65.28 kB
|  storybook-static/assets/chart.stories-DTwielht.js
|  394.73 kB │ gzip: 116.74 kB
|  storybook-static/assets/components-CJRtydrz.js
|  556.90 kB │ gzip: 176.49 kB
|  storybook-static/assets/WorldHud-BZEgf0Qh.js
|  650.07 kB │ gzip: 171.29 kB
|  storybook-static/assets/axe-C7pk9Kxd.js
|  659.32 kB │ gzip: 187.87 kB
|  storybook-static/assets/iframe-CxxruOt_.js
|  1,392.36 kB │ gzip: 394.20 kB

|  Vite ✓ built in 17.41s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 13.9s of this 17.3s
|  build (80%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (39%, 6.8s, 4814
|  calls)
|  Additional callback time came from the callbacks below and from
|  callbacks under 1s.
|  3 callbacks are listed without a time. Their calls overlapped, so the
|  time inside one call includes work from other calls. To find their
|  cost, profile the build with `node --cpu-prof`:
|  - plugin vite-plugin-storybook-nextjs-swc transform (4814 calls)
|  - plugin plugin-csf transform (4814 calls)
|  - plugin vite:css transform (3 calls)
|  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
|  for more details.

|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully
```

## node22-build.txt

- Original file: `node22-build.txt`
- Original size: 2810 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:2 char:285
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/node22 ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 236ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 8.7s
  Running TypeScript ...
  Finished TypeScript in 4.6s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 2.2s
  Finalizing page optimization ...

> Build error occurred
Error: ENOTDIR: not a directory, mkdir 
'C:\Workspace\Personnel\danang-simulation\.next\standalone\node_modules\.pnpm\react@19.3.1\node_modules\react'
    at ignore-listed frames {
  errno: -4052,
  code: 'ENOTDIR',
  syscall: 'mkdir',
  path: 'C:\\Workspace\\Personnel\\danang-simulation\\.next\\standalone\\node_modules\\.pnpm\\react@19.3.1\\node_module
s\\react'
}
[ELIFECYCLE] Command failed with exit code 1.
```

## node22-format-check.txt

- Original file: `node22-format-check.txt`
- Original size: 22052 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:2 char:285
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/node22 ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
docs\audit\phase-14\evidence\baseline-browser.json format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
    390 390 │       }
    391 391 │     ],
    392     │ - ··"screenshots":·[
    393     │ - ····"baseline-1920x1080.png",
    394     │ - ····"baseline-debug.png"
    395     │ - ··],
        392 │ + ··"screenshots":·["baseline-1920x1080.png",·"baseline-debug.png"],
    396 393 │     "finished": "2026-11-17T20:07:42.957Z"
    397 394 │   }
  

docs\audit\phase-14\evidence\baseline-ui-browser.json format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
      10   10 │           {
      11   11 │             "name": "Collapse Mini Map",
      12      │ - ··········"rect":·[
      13      │ - ············249,
      14      │ - ············29,
      15      │ - ············32,
      16      │ - ············26
      17      │ - ··········],
           12 │ + ··········"rect":·[249,·29,·32,·26],
      18   13 │             "hit": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 
24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-lin",
      19   14 │             "reachable": true
    ········· │ 
      21   16 │           {
      22   17 │             "name": "PLAYER FOLLOW",
      23      │ - ··········"rect":·[
      24      │ - ············208.296875,
      25      │ - ············87,
      26      │ - ············48.890625,
      27      │ - ············27
      28      │ - ··········],
           18 │ + ··········"rect":·[208.296875,·87,·48.890625,·27],
      29   19 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"PLAYER 
FOLLOW\" title=\"PLAYER FOLLOW\" aria-pressed=\"false\">STATIC</button>",
      30   20 │             "reachable": true
    ········· │ 
      32   22 │           {
      33   23 │             "name": "Zoom in",
      34      │ - ··········"rect":·[
      35      │ - ············179,
      36      │ - ············201,
      37      │ - ············24.953125,
      38      │ - ············27
      39      │ - ··········],
           24 │ + ··········"rect":·[179,·201,·24.953125,·27],
      40   25 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"Zoom in\" 
title=\"Zoom in\">+</button>",
      41   26 │             "reachable": true
    ········· │ 
      43   28 │           {
      44   29 │             "name": "Zoom out",
      45      │ - ··········"rect":·[
      46      │ - ············231.046875,
      47      │ - ············201,
      48      │ - ············24.953125,
      49      │ - ············27
      50      │ - ··········],
           30 │ + ··········"rect":·[231.046875,·201,·24.953125,·27],
      51   31 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"Zoom out\" 
title=\"Zoom out\">−</button>",
      52   32 │             "reachable": true
    ········· │ 
      54   34 │           {
      55   35 │             "name": "Reset 1×",
      56      │ - ··········"rect":·[
      57      │ - ············179,
      58      │ - ············234,
      59      │ - ············77,
      60      │ - ············27
      61      │ - ··········],
           36 │ + ··········"rect":·[179,·234,·77,·27],
      62   37 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" disabled=\"\">Reset 
1×</button>",
      63   38 │             "reachable": true
    ········· │ 
      65   40 │           {
      66   41 │             "name": "Reset (R)",
      67      │ - ··········"rect":·[
      68      │ - ············16,
      69      │ - ············292,
      70      │ - ············60.515625,
      71      │ - ············27
      72      │ - ··········],
           42 │ + ··········"rect":·[16,·292,·60.515625,·27],
      73   43 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"Reset (R)\" 
title=\"Reset (R)\"><svg aria-hidden=\"true\" xmlns=\"http://www.w3.org",
      74   44 │             "reachable": true
    ········· │ 
      76   46 │           {
      77   47 │             "name": "Env",
      78      │ - ··········"rect":·[
      79      │ - ············80.515625,
      80      │ - ············292,
      81      │ - ············52.09375,
      82      │ - ············27
      83      │ - ··········],
           48 │ + ··········"rect":·[80.515625,·292,·52.09375,·27],
      84   49 │             "hit": "<button type=\"button\" class=\"ds-btn world-button world-active\" 
aria-pressed=\"true\"><svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg",
      85   50 │             "reachable": true
    ········· │ 
      87   52 │           {
      88   53 │             "name": "Debug",
      89      │ - ··········"rect":·[
      90      │ - ············136.609375,
      91      │ - ············292,
      92      │ - ············66.375,
      93      │ - ············27
      94      │ - ··········],
           54 │ + ··········"rect":·[136.609375,·292,·66.375,·27],
      95   55 │             "hit": "<button type=\"button\" class=\"ds-btn world-button world-active\" 
aria-pressed=\"true\"><svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg",
      96   56 │             "reachable": true
    ········· │ 
      98   58 │           {
      99   59 │             "name": "Specs",
     100      │ - ··········"rect":·[
     101      │ - ············206.984375,
     102      │ - ············292,
     103      │ - ············61.796875,
     104      │ - ············27
     105      │ - ··········],
           60 │ + ··········"rect":·[206.984375,·292,·61.796875,·27],
     106   61 │             "hit": "<span class=\"world-desktop-label\">Specs</span>",
     107   62 │             "reachable": true
    ········· │ 
     109   64 │           {
     110   65 │             "name": "Fullscreen",
     111      │ - ··········"rect":·[
     112      │ - ············16,
     113      │ - ············323,
     114      │ - ············32,
     115      │ - ············26
     116      │ - ··········],
           66 │ + ··········"rect":·[16,·323,·32,·26],
     117   67 │             "hit": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 
24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-lin",
     118   68 │             "reachable": true
    ········· │ 
     120   70 │           {
     121   71 │             "name": "Elevation: 0.00 m",
     122      │ - ··········"rect":·[
     123      │ - ············16,
     124      │ - ············357,
     125      │ - ············99.125,
     126      │ - ············27
     127      │ - ··········],
           72 │ + ··········"rect":·[16,·357,·99.125,·27],
     128   73 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" 
aria-expanded=\"false\">Elevation: 0.00 m</button>",
     129   74 │             "reachable": true
    ········· │ 
     131   76 │           {
     132   77 │             "name": "Solar altitude: -36.3°",
     133      │ - ··········"rect":·[
     134      │ - ············121.125,
     135      │ - ············357,
     136      │ - ············114.640625,
     137      │ - ············27
     138      │ - ··········],
           78 │ + ··········"rect":·[121.125,·357,·114.640625,·27],
     139   79 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" 
aria-expanded=\"false\">Solar altitude: -36.3°</button>",
     140   80 │             "reachable": true
    ········· │ 
     142   82 │           {
     143   83 │             "name": "Hide Env",
     144      │ - ··········"rect":·[
     145      │ - ············241.765625,
     146      │ - ············357.5,
     147      │ - ············36,
     148      │ - ············26
     149      │ - ··········],
           84 │ + ··········"rect":·[241.765625,·357.5,·36,·26],
     150   85 │             "hit": "<path d=\"m6 6 12 12\"></path>",
     151   86 │             "reachable": true
    ········· │ 
     153   88 │           {
     154   89 │             "name": "FPS: 19",
     155      │ - ··········"rect":·[
     156      │ - ············338,
     157      │ - ············16,
     158      │ - ············53.109375,
     159      │ - ············27
  730 more lines truncated
  

docs\audit\phase-14\evidence\stabilization-browser.json format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
      8   8 │         "status": "PASS",
      9   9 │         "result": {
     10     │ - ········"viewport":·[
     11     │ - ··········1024,
     12     │ - ··········768
     13     │ - ········],
     14     │ - ········"debug":·[
     15     │ - ··········352,
     16     │ - ··········80,
     17     │ - ··········320,
     18     │ - ··········353.265625
     19     │ - ········],
         10 │ + ········"viewport":·[1024,·768],
         11 │ + ········"debug":·[352,·80,·320,·353.265625],
     20  12 │           "overflow": false,
     21  13 │           "scrollable": true,
    ······· │ 
     27  19 │         "status": "PASS",
     28  20 │         "result": {
     29     │ - ········"viewport":·[
     30     │ - ··········844,
     31     │ - ··········390
     32     │ - ········],
     33     │ - ········"debug":·[
     34     │ - ··········102,
     35     │ - ··········80,
     36     │ - ··········320,
     37     │ - ··········179.390625
     38     │ - ········],
         21 │ + ········"viewport":·[844,·390],
         22 │ + ········"debug":·[102,·80,·320,·179.390625],
     39  23 │           "overflow": false,
     40  24 │           "scrollable": true,
    ······· │ 
    680 664 │       }
    681 665 │     ],
    682     │ - ··"screenshots":·[
    683     │ - ····"stabilization-1024x768-debug.png",
    684     │ - ····"stabilization-844x390-debug.png"
    685     │ - ··],
        666 │ + ··"screenshots":·["stabilization-1024x768-debug.png",·"stabilization-844x390-debug.png"],
    686 667 │     "cooldown": {
    687 668 │       "before": {
  

Checked 389 files in 287ms. No fixes applied.
Found 3 errors.
format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.
  

[ELIFECYCLE] Command failed with exit code 1.
```

## node22-lint.txt

- Original file: `node22-lint.txt`
- Original size: 2758 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:2 char:285
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/node22 ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
src\styles\world-explorer.css:1148:1 lint/style/noDescendingSpecificity ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! Descending specificity selector found. This selector specificity is (0, 1, 0)
  
    1147 │ /* Environment panels follow the actual map height in both display modes. */
  > 1148 │ .world-top-left {
         │ ^^^^^^^^^^^^^^^
    1149 │   display: flex;
    1150 │   flex-direction: column;
  
  i This selector specificity is (0, 2, 0)
  
    868 │ /* A shared touch column gives the guide and toolbar one layout budget. All controls remain 
scroll-reachable. */
  > 869 │ .world-touch .world-top-left {
        │ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    870 │   max-height: calc(100dvh - 160px - env(safe-area-inset-top) - env(safe-area-inset-bottom));
    871 │   max-width: calc(100vw - 24px);
  
  i Descending specificity selector may not be applied. Consider rearranging the order of the selectors. See MDN web 
docs for more details.
  

Checked 390 files in 588ms. No fixes applied.
Found 1 warning.
```

## node22-test.txt

- Original file: `node22-test.txt`
- Original size: 1780 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:2 char:285
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/node22 ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  40 passed (40)
      Tests  234 passed (234)
   Start at  03:23:25
   Duration  47.89s (environment 69%, setup 18%, import 6%, tests 5%, transform 1%, worker 1%)

Environment  jsdom was created 40 times · 197.23s total, 69% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## node22-type-check.txt

- Original file: `node22-type-check.txt`
- Original size: 924 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:2 char:285
+ ... e(':','-'); & pnpm.cmd $check *> "docs/audit/phase-14/evidence/node22 ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
```

## peer-dependencies.txt

- Original file: `peer-dependencies.txt`
- Original size: 262 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
Issues with peer dependencies found

✕ unmet peer typescript
  Installed: 7.0.2
  Wanted:
    ^5.0.0:
      tsconfck@3.1.6
```

## picomatch-paths.txt

- Original file: `picomatch-paths.txt`
- Original size: 3586 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
picomatch@4.0.7
├─┬ @parcel/watcher@2.6.0
│ └─┬ next-intl@4.14.9
│   └── frontend-boilerplate@0.1.0 (dependencies)
├─┬ @rollup/pluginutils@5.4.0
│ ├─┬ @storybook/react-vite@10.6.2
│ │ └─┬ @storybook/nextjs-vite@10.6.2
│ │   └── frontend-boilerplate@0.1.0 (devDependencies)
│ └─┬ vite-plugin-storybook-nextjs@10.6.2
│   └── @storybook/nextjs-vite@10.6.2 [deduped]
├─┬ fdir@6.5.0
│ └─┬ tinyglobby@0.2.17
│   ├─┬ vite@8.3.4
│   │ ├─┬ @joshwooding/vite-plugin-react-docgen-typescript@0.7.0
│   │ │ └── @storybook/react-vite@10.6.2 [deduped]
│   │ ├─┬ @storybook/builder-vite@10.6.2
│   │ │ ├── @storybook/nextjs-vite@10.6.2 [deduped]
│   │ │ └── @storybook/react-vite@10.6.2 [deduped]
│   │ ├── @storybook/nextjs-vite@10.6.2 [deduped]
│   │ ├── @storybook/react-vite@10.6.2 [deduped]
│   │ ├─┬ @vitejs/plugin-react@6.1.2
│   │ │ └── frontend-boilerplate@0.1.0 (devDependencies)
│   │ ├─┬ @vitest/mocker@5.0.5
│   │ │ └─┬ vitest@5.0.5
│   │ │   ├─┬ @testing-library/jest-dom@7.0.1
│   │ │   │ └── frontend-boilerplate@0.1.0 (devDependencies)
│   │ │   ├─┬ @vitest/coverage-v8@5.0.5
│   │ │   │ ├── frontend-boilerplate@0.1.0 (devDependencies)
│   │ │   │ └── vitest@5.0.5 [circular]
│   │ │   └── frontend-boilerplate@0.1.0 (devDependencies)
│   │ ├── vite-plugin-storybook-nextjs@10.6.2 [deduped]
│   │ ├─┬ vite-tsconfig-paths@5.1.4
│   │ │ └── vite-plugin-storybook-nextjs@10.6.2 [deduped]
│   │ └── vitest@5.0.5 [deduped]
│   └── vitest@5.0.5 [deduped]
├─┬ lint-staged@17.6.0
│ └── frontend-boilerplate@0.1.0 (devDependencies)
├── tinyglobby@0.2.17 [deduped]
├─┬ unplugin@2.3.11
│ └─┬ @storybook/addon-docs@10.6.2
│   └── frontend-boilerplate@0.1.0 (devDependencies)
├── vite@8.3.4 [deduped]
└── vitest@5.0.5 [deduped]

Found 1 version of picomatch
```

## preview-transport.txt

- Original file: `preview-transport.txt`
- Original size: 474 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  1 passed (1)
      Tests  6 passed (6)
   Start at  03:19:22
   Duration  2.15s (environment 59%, setup 16%, import 11%, transform 9%, tests 5%, worker 1%)
```

## process-cleanup.txt

- Original file: `process-cleanup.txt`
- Original size: 224 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
[{"port":3192,"status":"CLOSED","code":"ECONNREFUSED"},{"port":9342,"status":"CLOSED","code":"ECONNREFUSED"}]
```

## redirect-security-update.txt

- Original file: `redirect-security-update.txt`
- Original size: 756 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
✓ Lockfile passes supply-chain policies (verified 454ms ago)
Progress: resolved 0, reused 89, downloaded 1, added 0
[WARN] 1 deprecated subdependencies found: tsconfck@3.1.6
Packages: +2 -1
++-
Progress: resolved 2, reused 98, downloaded 1, added 2, done
[WARN] Issues with peer dependencies found. Run "pnpm peers check" to list them.
Done in 2.6s using pnpm v12.14.0
```

## release-build-storybook.txt

- Original file: `release-build-storybook.txt`
- Original size: 30368 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ storybook build
At line:2 char:680
+ ... TEXITCODE"; pnpm.cmd build-storybook *> docs/audit/phase-14/evidence/ ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
|
o  Loading presets
|
o  Building manager..
|
•  Building open services..
|
•  Building preview..
|
•  Copying static files: public at storybook-static
|  Vite vite v8.3.4 building client environment for production...
transforming...
✓ 4809 modules transformed.
rendering chunks...
computing gzip size...
|  Vite storybook-static/iframe.html
|  20.52 kB │ gzip:   5.60 kB
|  storybook-static/assets/world-explorer-mFnqljx_.css
|  20.68 kB │ gzip:   4.90 kB
|  storybook-static/assets/iframe-BaSE0WOI.css
|  206.47 kB │ gzip:  30.87 kB
|  storybook-static/assets/iframe-CJioaz_d.js
|  0.04 kB │ gzip:   0.06 kB
|  storybook-static/assets/dist-BpWrIoGY.js
|  0.22 kB │ gzip:   0.19 kB
|  storybook-static/assets/chunk-242VQQM5-CJ9i1iaj.js
|  0.24 kB │ gzip:   0.20 kB
|  storybook-static/assets/dist-Bgc6TXR4.js
|  0.24 kB │ gzip:   0.21 kB
|  storybook-static/assets/check-C4l0qdMD.js
|  0.26 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-down-Db-YoaoO.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/chevron-left-Cd9RGiHq.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/chevron-right-D1L19B_Q.js
|  0.27 kB │ gzip:   0.23 kB
|  storybook-static/assets/circle-DWuLk5md.js
|  0.27 kB │ gzip:   0.22 kB
|  storybook-static/assets/x-B1sqVEY7.js
|  0.29 kB │ gzip:   0.24 kB
|  storybook-static/assets/formatter-L2YTDE3Q-DqPs7d2n.js
|  0.30 kB │ gzip:   0.24 kB
|  storybook-static/assets/loader-circle-CSUbcJrl.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/search-B43BJUb4.js
|  0.31 kB │ gzip:   0.25 kB
|  storybook-static/assets/chunk-QQBDHPVZ-BJU3Mk0_.js
|  0.32 kB │ gzip:   0.19 kB
|  storybook-static/assets/info-CSIANWNH.js
|  0.34 kB │ gzip:   0.26 kB
|  storybook-static/assets/ellipsis-Dfn6svcK.js
|  0.39 kB │ gzip:   0.27 kB
|  storybook-static/assets/skeleton-BnsNpVbF.js
|  0.41 kB │ gzip:   0.29 kB
|  storybook-static/assets/dist-BOqIPbtB.js
|  0.42 kB │ gzip:   0.31 kB
|  storybook-static/assets/use-mobile-BB6e8wyp.js
|  0.42 kB │ gzip:   0.29 kB
|  storybook-static/assets/inbox-CbvC1Bd7.js
|  0.43 kB │ gzip:   0.32 kB
|  storybook-static/assets/jsx-runtime-BxfXuubT.js
|  0.43 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-C9t7Cshp.js
|  0.44 kB │ gzip:   0.32 kB
|  storybook-static/assets/WorldExplorerClient.stories-Dsn9tW4y.js
|  0.45 kB │ gzip:   0.30 kB
|  storybook-static/assets/dist-P5aEaGBE.js
|  0.49 kB │ gzip:   0.33 kB
|  storybook-static/assets/react-CubzI6CK.js
|  0.58 kB │ gzip:   0.34 kB
|  storybook-static/assets/dist-BDazaY1u.js
|  0.64 kB │ gzip:   0.43 kB
|  storybook-static/assets/textarea.stories-CNc698vf.js
|  0.65 kB │ gzip:   0.38 kB
|  storybook-static/assets/chunk-UAWMPV5J-Dsq9DvcU.js
|  0.74 kB │ gzip:   0.45 kB
|  storybook-static/assets/dist-BNjw8BE7.js
|  0.75 kB │ gzip:   0.45 kB
|  storybook-static/assets/enum-CwrLEL0d.js
|  0.78 kB │ gzip:   0.45 kB
|  storybook-static/assets/toggle.stories-Q84BqJ2J.js
|  0.78 kB │ gzip:   0.44 kB
|  storybook-static/assets/checkbox.stories-DIHgK8RS.js
|  0.80 kB │ gzip:   0.37 kB
|  storybook-static/assets/Icons.stories-DDEyaz2J.js
|  0.80 kB │ gzip:   0.50 kB
|  storybook-static/assets/textarea-BbLnRPqe.js
|  0.83 kB │ gzip:   0.50 kB
|  storybook-static/assets/label.stories-9eKD3mf9.js
|  0.83 kB │ gzip:   0.48 kB
|  storybook-static/assets/dist-Ch4r59Bc.js
|  0.85 kB │ gzip:   0.50 kB
|  storybook-static/assets/dist-B0agaa99.js
|  0.85 kB │ gzip:   0.54 kB
|  storybook-static/assets/shim-C5Xie9xJ.js
|  0.85 kB │ gzip:   0.46 kB
|  storybook-static/assets/tooltip.stories-CzHfsigv.js
|  0.87 kB │ gzip:   0.49 kB
|  storybook-static/assets/ImageryInspector.stories-B1FUhl9R.js
|  0.89 kB │ gzip:   0.49 kB
|  storybook-static/assets/spinner.stories-Bb7RuOmR.js
|  0.93 kB │ gzip:   0.51 kB
|  storybook-static/assets/skeleton.stories-DSUtaA88.js
|  0.94 kB │ gzip:   0.47 kB
|  storybook-static/assets/with-selector-yh4Qcx8N.js
|  0.94 kB │ gzip:   0.53 kB
|  storybook-static/assets/input-CsO9Atno.js
|  1.01 kB │ gzip:   0.56 kB
|  storybook-static/assets/switch.stories-PtLs2fuF.js
|  1.02 kB │ gzip:   0.54 kB
|  storybook-static/assets/dist-r86zl3cz.js
|  1.03 kB │ gzip:   0.55 kB
|  storybook-static/assets/label-BeO5gq6m.js
|  1.04 kB │ gzip:   0.62 kB
|  storybook-static/assets/input.stories-SMUNiHJP.js
|  1.18 kB │ gzip:   0.53 kB
|  storybook-static/assets/select.stories-GJ1qLA9c.js
|  1.23 kB │ gzip:   0.60 kB
|  storybook-static/assets/rolldown-runtime-2s6bX4vc.js
|  1.26 kB │ gzip:   0.69 kB
|  storybook-static/assets/separator.stories-BU_xmlNe.js
|  1.26 kB │ gzip:   0.55 kB
|  storybook-static/assets/StatusBadge.stories-C_8eplXH.js
|  1.36 kB │ gzip:   0.73 kB
|  storybook-static/assets/input-group.stories-BdISNErZ.js
|  1.36 kB │ gzip:   0.55 kB
|  storybook-static/assets/separator-Azq44eiO.js
|  1.39 kB │ gzip:   0.70 kB
|  storybook-static/assets/card.stories-BLaUhodb.js
|  1.43 kB │ gzip:   0.65 kB
|  storybook-static/assets/badge.stories-BPrM91fh.js
|  1.44 kB │ gzip:   0.66 kB
|  storybook-static/assets/dialog.stories-D_jEOpQA.js
|  1.49 kB │ gzip:   0.66 kB
|  storybook-static/assets/aspect-ratio.stories-fRsWVF3w.js
|  1.55 kB │ gzip:   0.82 kB
|  storybook-static/assets/alert.stories-D_dJ3KQy.js
|  1.55 kB │ gzip:   0.66 kB
|  storybook-static/assets/collapsible.stories-CrpfVjuU.js
|  1.57 kB │ gzip:   0.68 kB
|  storybook-static/assets/kbd.stories-BGpjJOyb.js
|  1.59 kB │ gzip:   0.74 kB
|  storybook-static/assets/preload-helper-0TbE23ZY.js
|  1.64 kB │ gzip:   0.87 kB
|  storybook-static/assets/chunk-IMSF75WX-mRJxbqao.js
|  1.67 kB │ gzip:   0.90 kB
|  storybook-static/assets/dropdown-menu.stories-r32spgcz.js
|  1.69 kB │ gzip:   0.70 kB
|  storybook-static/assets/badge-B3Q-jtvj.js
|  1.73 kB │ gzip:   0.82 kB
|  storybook-static/assets/ThemeProvider-4_Xyiqq5.js
|  1.75 kB │ gzip:   0.95 kB
|  storybook-static/assets/alert-B0jXkKKh.js
|  1.78 kB │ gzip:   0.82 kB
|  storybook-static/assets/card-95wFGgDq.js
|  1.85 kB │ gzip:   0.62 kB
|  storybook-static/assets/dist-Cp023XQn.js
|  1.89 kB │ gzip:   0.83 kB
|  storybook-static/assets/dist-B0_5lTDF.js
|  1.90 kB │ gzip:   0.93 kB
|  storybook-static/assets/form.stories-CxwjRHLe.js
|  2.10 kB │ gzip:   0.99 kB
|  storybook-static/assets/sheet.stories-BFq77P63.js
|  2.13 kB │ gzip:   0.72 kB
|  storybook-static/assets/toggle-Bqk6sclz.js
|  2.29 kB │ gzip:   1.19 kB
|  storybook-static/assets/button-D2c_9SLl.js
|  2.29 kB │ gzip:   0.99 kB
|  storybook-static/assets/button-group.stories-CkehHyLh.js
|  2.36 kB │ gzip:   0.99 kB
|  storybook-static/assets/native-select.stories-G06xPHfK.js
|  2.56 kB │ gzip:   1.12 kB
|  storybook-static/assets/dist-Cq2hqxqm.js
|  2.83 kB │ gzip:   1.21 kB
|  storybook-static/assets/dist-D3CacQlx.js
|  2.85 kB │ gzip:   1.25 kB
|  storybook-static/assets/progress.stories-C39zBAS-.js
|  2.95 kB │ gzip:   1.43 kB
|  storybook-static/assets/breadcrumb.stories-uV-y4MKs.js
|  2.96 kB │ gzip:   1.02 kB
|  storybook-static/assets/empty.stories-CJA8KERW.js
|  3.18 kB │ gzip:   1.17 kB
|  storybook-static/assets/button.stories-gM96yru6.js
|  3.23 kB │ gzip:   1.18 kB
|  storybook-static/assets/dist-D_OpuV9i.js
|  3.30 kB │ gzip:   1.50 kB
|  storybook-static/assets/chunk-DRQKCCAG-PeJgrGxi.js
|  3.37 kB │ gzip:   1.40 kB
|  storybook-static/assets/sheet-DSdqGTO5.js
|  3.58 kB │ gzip:   1.18 kB
|  storybook-static/assets/pagination.stories-DXkSRfQF.js
|  3.59 kB │ gzip:   1.19 kB
|  storybook-static/assets/dialog-DXsGNYZJ.js
|  3.60 kB │ gzip:   1.21 kB
|  storybook-static/assets/createLucideIcon-DTc4q1oi.js
|  3.66 kB │ gzip:   1.68 kB
|  storybook-static/assets/react-dom-qBXZUrFy.js
|  3.92 kB │ gzip:   1.44 kB
|  storybook-static/assets/input-group-BIEe3yAv.js
|  4.02 kB │ gzip:   1.41 kB
|  storybook-static/assets/common.stories-CB44Xjzj.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-FGgaBRrC.js
|  4.69 kB │ gzip:   1.98 kB
|  storybook-static/assets/dist-C2PcoYQl.js
|  4.83 kB │ gzip:   2.10 kB
|  storybook-static/assets/dist-BtnfnuYA.js
|  5.09 kB │ gzip:   2.21 kB
|  storybook-static/assets/chunk-7PIQR4A3-BRrgxE8n.js
|  5.14 kB │ gzip:   1.93 kB
|  storybook-static/assets/field.stories-Dg4v51hb.js
|  5.30 kB │ gzip:   1.86 kB
|  storybook-static/assets/switch-DPVChe7p.js
|  5.34 kB │ gzip:   2.23 kB
|  storybook-static/assets/checkbox-CEzcDVsg.js
|  5.36 kB │ gzip:   2.25 kB
|  storybook-static/assets/dist-DM7xvX2L.js
|  5.64 kB │ gzip:   2.03 kB
|  storybook-static/assets/dist-BPgTGWBw.js
|  5.65 kB │ gzip:   2.58 kB
|  storybook-static/assets/avatar.stories-snzB4nyn.js
|  5.79 kB │ gzip:   2.12 kB
|  storybook-static/assets/dist-DGExwuT-.js
|  5.85 kB │ gzip:   2.17 kB
|  storybook-static/assets/ClientBoundary.stories-BrKaRAqa.js
|  6.08 kB │ gzip:   2.65 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-BCe4Uf8o.js
|  6.53 kB │ gzip:   2.59 kB
|  storybook-static/assets/hover-card.stories-Bh0ICGy-.js
|  6.97 kB │ gzip:   2.63 kB
|  storybook-static/assets/dropdown-menu-BchuS8Fg.js
|  7.06 kB │ gzip:   2.41 kB
|  storybook-static/assets/tabs.stories-C47bhjuJ.js
|  7.27 kB │ gzip:   2.60 kB
|  storybook-static/assets/accordion.stories-fo5SQ1Bu.js
|  7.50 kB │ gzip:   2.78 kB
|  storybook-static/assets/context-menu.stories-DUIbkTb2.js
|  7.56 kB │ gzip:   2.73 kB
|  storybook-static/assets/alert-dialog.stories-e4OqrUPg.js
|  7.61 kB │ gzip:   2.20 kB
|  storybook-static/assets/react-C7Icd8fu.js
|  7.90 kB │ gzip:   3.03 kB
|  storybook-static/assets/popover.stories-Cy1nz5tz.js
|  7.98 kB │ gzip:   3.03 kB
|  storybook-static/assets/radio-group.stories-DAgnv6kU.js
|  8.07 kB │ gzip:   3.17 kB
|  storybook-static/assets/Icons-BdTGl1wp.js
|  8.49 kB │ gzip:   2.17 kB
|  storybook-static/assets/dist-ZpFVeXSN.js
|  8.67 kB │ gzip:   3.04 kB
|  storybook-static/assets/form-field.stories-Dsdw8o9t.js
|  8.72 kB │ gzip:   2.43 kB
|  storybook-static/assets/menubar.stories-BSKf86iT.js
|  10.19 kB │ gzip:   3.58 kB
|  storybook-static/assets/input-otp.stories-ngCTD5Oe.js
|  12.77 kB │ gzip:   4.94 kB
|  storybook-static/assets/slider.stories-DMrVLFUF.js
|  13.05 kB │ gzip:   5.02 kB
|  storybook-static/assets/sidebar.stories-CI0l5cZj.js
|  13.47 kB │ gzip:   4.20 kB
|  storybook-static/assets/es2015-C53hGp5h.js
|  14.52 kB │ gzip:   5.58 kB
|  storybook-static/assets/dist-DRfj0K7B.js
|  14.59 kB │ gzip:   4.93 kB
|  storybook-static/assets/scroll-area.stories-3KNE10P2.js
|  16.08 kB │ gzip:   5.17 kB
|  storybook-static/assets/command.stories-13DTrfcO.js
|  16.62 kB │ gzip:   6.15 kB
|  storybook-static/assets/navigation-menu.stories-BLnzNUVz.js
|  19.93 kB │ gzip:   6.22 kB
|  storybook-static/assets/floating-ui.react-dom-BDsy8TX8.js
|  22.18 kB │ gzip:   8.65 kB
|  storybook-static/assets/chunk-W22LQPXL-DLbOLb-b.js
|  22.67 kB │ gzip:   7.55 kB
|  storybook-static/assets/carousel.stories-XycxZHWD.js
|  24.85 kB │ gzip:   9.57 kB
|  storybook-static/assets/select-BGMpPeXN.js
|  25.93 kB │ gzip:   8.67 kB
|  storybook-static/vite-inject-mocker-entry.js
|  27.81 kB │ gzip:   9.67 kB
|  storybook-static/assets/utils-DcZBOCDd.js
|  27.98 kB │ gzip:   8.99 kB
|  storybook-static/assets/matchers-JIUQ3HVY-DWxIgmlT.js
|  28.79 kB │ gzip:   9.68 kB
|  storybook-static/assets/hooks-B2tZX3bU.js
|  29.87 kB │ gzip:  12.60 kB
|  storybook-static/assets/Color-6AOWCN3U-BHliv8P4.js
|  30.40 kB │ gzip:  11.49 kB
|  storybook-static/assets/world-explorer-DhiSeke1.js
|  32.51 kB │ gzip:  11.79 kB
|  storybook-static/assets/WithTooltip-CDUNV5IS-PZG7aayt.js
|  32.72 kB │ gzip:  11.46 kB
|  storybook-static/assets/drawer.stories-1ht9Ezfp.js
|  33.65 kB │ gzip:   9.90 kB
|  storybook-static/assets/sonner.stories-C3oLH7YH.js
|  36.83 kB │ gzip:  10.65 kB
|  storybook-static/assets/form-TDM4j5Az.js
|  42.87 kB │ gzip:  14.86 kB
|  storybook-static/assets/resizable.stories-CXJJ3mua.js
|  46.12 kB │ gzip:  14.97 kB
|  storybook-static/assets/theming-K8zzODLs.js
|  55.39 kB │ gzip:  21.34 kB
|  storybook-static/assets/esm-C2oGAgJS.js
|  57.43 kB │ gzip:  16.68 kB
|  storybook-static/assets/WorldExplorerClient-CHRMbhos.js
|  72.05 kB │ gzip:  26.47 kB
|  storybook-static/assets/syntaxhighlighter-4REYKNEV-BMUJTQLL.js
|  75.83 kB │ gzip:  27.23 kB
|  storybook-static/assets/calendar.stories-D4SJ_MSG.js
|  80.74 kB │ gzip:  23.91 kB
|  storybook-static/assets/schemas-BlgLiO46.js
|  95.33 kB │ gzip:  27.28 kB
|  storybook-static/assets/combobox.stories-BeGpeZiQ.js
|  122.42 kB │ gzip:  42.54 kB
|  storybook-static/assets/utilities.stories-CeDM8hSz.js
|  153.38 kB │ gzip:  50.64 kB
|  storybook-static/assets/DocsRenderer-JROSPFPF-BGvrobzq.js
|  191.34 kB │ gzip:  60.31 kB
|  storybook-static/assets/react-18-mQvaX4pw.js
|  208.00 kB │ gzip:  65.28 kB
|  storybook-static/assets/chart.stories-DTwielht.js
|  394.73 kB │ gzip: 116.74 kB
|  storybook-static/assets/components-CJRtydrz.js
|  556.90 kB │ gzip: 176.49 kB
|  storybook-static/assets/WorldHud-CwB7UK_x.js
|  650.07 kB │ gzip: 171.29 kB
|  storybook-static/assets/axe-C7pk9Kxd.js
|  659.32 kB │ gzip: 187.87 kB
|  storybook-static/assets/iframe-B0d2Xn--.js
|  1,359.53 kB │ gzip: 389.22 kB

|  Vite ✓ built in 14.99s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 12.6s of this 14.9s
|  build (85%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (38%, 5.7s, 4809
|  calls)
|  Additional callback time came from the callbacks below and from
|  callbacks under 1s.
|  3 callbacks are listed without a time. Their calls overlapped, so the
|  time inside one call includes work from other calls. To find their
|  cost, profile the build with `node --cpu-prof`:
|  - plugin vite-plugin-storybook-nextjs-swc transform (4809 calls)
|  - plugin plugin-csf transform (4809 calls)
|  - plugin vite:css transform (3 calls)
|  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
|  for more details.

|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully
```

## release-build.txt

- Original file: `release-build.txt`
- Original size: 2932 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next build
At line:2 char:573
+ ... TEXITCODE"; pnpm.cmd build *> docs/audit/phase-14/evidence/release-bu ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.5 (Turbopack)
✓ Running next.config.ts took 153ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 2.8s
  Running TypeScript ...
  Finished TypeScript in 3.1s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1715ms
  Finalizing page optimization ...

Route (app)
┌ ○ /_not-found
├   /[locale]
│ ├ ● /en
│ └ ● /vi
├ ƒ /[locale]/[...rest]
├   /[locale]/health
│ ├ ● /en/health
│ └ ● /vi/health
├ ƒ /api/health
├ ƒ /api/weather
├ ○ /apple-icon
├ ○ /icon.svg
├ ○ /manifest.webmanifest
├ ○ /opengraph-image
├ ○ /robots.txt
├ ○ /sitemap.xml
└ ○ /twitter-image


ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

## release-format-check.txt

- Original file: `release-format-check.txt`
- Original size: 17406 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome format .
At line:2 char:230
+ ... TEXITCODE"; pnpm.cmd format:check *> docs/audit/phase-14/evidence/rel ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
docs\audit\phase-14\evidence\after-browser.json format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
     264  264 │           {
     265  265 │             "name": "Collapse Mini Map",
     266      │ - ··········"rect":·[
     267      │ - ············249,
     268      │ - ············29,
     269      │ - ············32,
     270      │ - ············26
     271      │ - ··········],
          266 │ + ··········"rect":·[249,·29,·32,·26],
     272  267 │             "hit": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 
24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-lin",
     273  268 │             "reachable": true
    ········· │ 
     275  270 │           {
     276  271 │             "name": "PLAYER FOLLOW",
     277      │ - ··········"rect":·[
     278      │ - ············208.296875,
     279      │ - ············87,
     280      │ - ············48.890625,
     281      │ - ············27
     282      │ - ··········],
          272 │ + ··········"rect":·[208.296875,·87,·48.890625,·27],
     283  273 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"PLAYER 
FOLLOW\" title=\"PLAYER FOLLOW\" aria-pressed=\"false\">STATIC</button>",
     284  274 │             "reachable": true
    ········· │ 
     286  276 │           {
     287  277 │             "name": "Zoom in",
     288      │ - ··········"rect":·[
     289      │ - ············179,
     290      │ - ············201,
     291      │ - ············24.953125,
     292      │ - ············27
     293      │ - ··········],
          278 │ + ··········"rect":·[179,·201,·24.953125,·27],
     294  279 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"Zoom in\" 
title=\"Zoom in\">+</button>",
     295  280 │             "reachable": true
    ········· │ 
     297  282 │           {
     298  283 │             "name": "Zoom out",
     299      │ - ··········"rect":·[
     300      │ - ············231.046875,
     301      │ - ············201,
     302      │ - ············24.953125,
     303      │ - ············27
     304      │ - ··········],
          284 │ + ··········"rect":·[231.046875,·201,·24.953125,·27],
     305  285 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"Zoom out\" 
title=\"Zoom out\">−</button>",
     306  286 │             "reachable": true
    ········· │ 
     308  288 │           {
     309  289 │             "name": "Reset 1×",
     310      │ - ··········"rect":·[
     311      │ - ············179,
     312      │ - ············234,
     313      │ - ············77,
     314      │ - ············27
     315      │ - ··········],
          290 │ + ··········"rect":·[179,·234,·77,·27],
     316  291 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" disabled=\"\">Reset 
1×</button>",
     317  292 │             "reachable": true
    ········· │ 
     319  294 │           {
     320  295 │             "name": "Reset (R)",
     321      │ - ··········"rect":·[
     322      │ - ············16,
     323      │ - ············292,
     324      │ - ············60.515625,
     325      │ - ············27
     326      │ - ··········],
          296 │ + ··········"rect":·[16,·292,·60.515625,·27],
     327  297 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" aria-label=\"Reset (R)\" 
title=\"Reset (R)\"><svg aria-hidden=\"true\" xmlns=\"http://www.w3.org",
     328  298 │             "reachable": true
    ········· │ 
     330  300 │           {
     331  301 │             "name": "Env",
     332      │ - ··········"rect":·[
     333      │ - ············80.515625,
     334      │ - ············292,
     335      │ - ············52.09375,
     336      │ - ············27
     337      │ - ··········],
          302 │ + ··········"rect":·[80.515625,·292,·52.09375,·27],
     338  303 │             "hit": "<button type=\"button\" class=\"ds-btn world-button world-active\" 
aria-pressed=\"true\"><svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg",
     339  304 │             "reachable": true
    ········· │ 
     341  306 │           {
     342  307 │             "name": "Debug",
     343      │ - ··········"rect":·[
     344      │ - ············136.609375,
     345      │ - ············292,
     346      │ - ············66.375,
     347      │ - ············27
     348      │ - ··········],
          308 │ + ··········"rect":·[136.609375,·292,·66.375,·27],
     349  309 │             "hit": "<button type=\"button\" class=\"ds-btn world-button world-active\" 
aria-pressed=\"true\"><svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg",
     350  310 │             "reachable": true
    ········· │ 
     352  312 │           {
     353  313 │             "name": "Specs",
     354      │ - ··········"rect":·[
     355      │ - ············206.984375,
     356      │ - ············292,
     357      │ - ············61.796875,
     358      │ - ············27
     359      │ - ··········],
          314 │ + ··········"rect":·[206.984375,·292,·61.796875,·27],
     360  315 │             "hit": "<span class=\"world-desktop-label\">Specs</span>",
     361  316 │             "reachable": true
    ········· │ 
     363  318 │           {
     364  319 │             "name": "Fullscreen",
     365      │ - ··········"rect":·[
     366      │ - ············16,
     367      │ - ············323,
     368      │ - ············32,
     369      │ - ············26
     370      │ - ··········],
          320 │ + ··········"rect":·[16,·323,·32,·26],
     371  321 │             "hit": "<svg aria-hidden=\"true\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 
24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-lin",
     372  322 │             "reachable": true
    ········· │ 
     374  324 │           {
     375  325 │             "name": "Elevation: 0.00 m",
     376      │ - ··········"rect":·[
     377      │ - ············16,
     378      │ - ············357,
     379      │ - ············99.125,
     380      │ - ············27
     381      │ - ··········],
          326 │ + ··········"rect":·[16,·357,·99.125,·27],
     382  327 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" 
aria-expanded=\"false\">Elevation: 0.00 m</button>",
     383  328 │             "reachable": true
    ········· │ 
     385  330 │           {
     386  331 │             "name": "Solar altitude: -31.4°",
     387      │ - ··········"rect":·[
     388      │ - ············121.125,
     389      │ - ············357,
     390      │ - ············113.296875,
     391      │ - ············27
     392      │ - ··········],
          332 │ + ··········"rect":·[121.125,·357,·113.296875,·27],
     393  333 │             "hit": "<button type=\"button\" class=\"ds-btn world-button \" 
aria-expanded=\"false\">Solar altitude: -31.4°</button>",
     394  334 │             "reachable": true
    ········· │ 
     396  336 │           {
     397  337 │             "name": "Hide Env",
     398      │ - ··········"rect":·[
     399      │ - ············240.421875,
     400      │ - ············357.5,
     401      │ - ············36,
     402      │ - ············26
     403      │ - ··········],
          338 │ + ··········"rect":·[240.421875,·357.5,·36,·26],
     404  339 │             "hit": "<path d=\"m6 6 12 12\"></path>",
     405  340 │             "reachable": true
    ········· │ 
     407  342 │           {
     408  343 │             "name": "FPS: 19",
     409      │ - ··········"rect":·[
     410      │ - ············338,
     411      │ - ············16,
     412      │ - ············53.109375,
     413      │ - ············27
  1226 more lines truncated
  

Checked 395 files in 221ms. No fixes applied.
Found 1 error.
format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.
  

[ELIFECYCLE] Command failed with exit code 1.
```

## release-format-retry.txt

- Original file: `release-format-retry.txt`
- Original size: 798 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome format .
At line:2 char:316
+ ... 4/evidence; pnpm.cmd format:check *> docs/audit/phase-14/evidence/rel ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 395 files in 291ms. No fixes applied.
```

## release-host-mismatch-server.txt

- Original file: `release-host-mismatch-server.txt`
- Original size: 148 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.5
- Local:         http://127.0.0.1:3192
- Network:       http://127.0.0.1:3192
✓ Ready in 0ms
✓ Running next.config took 30ms
```

## release-lint.txt

- Original file: `release-lint.txt`
- Original size: 790 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome lint .
At line:2 char:126
+ ... L_SIZE='1'; pnpm.cmd lint *> docs/audit/phase-14/evidence/release-lin ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 396 files in 435ms. No fixes applied.
```

## release-server.txt

- Original file: `release-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.5
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 39ms
```

## release-test.txt

- Original file: `release-test.txt`
- Original size: 1982 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ vitest run
At line:2 char:469
+ ... TEXITCODE"; pnpm.cmd test *> docs/audit/phase-14/evidence/release-tes ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

Not implemented: HTMLCanvasElement's getContext() method: without installing the canvas npm package

 Test Files  41 passed (41)
      Tests  236 passed (236)
   Start at  03:46:47
   Duration  38.98s (environment 68%, setup 19%, import 6%, tests 5%, worker 1%, transform 1%)

Environment  jsdom was created 41 times · 161.77s total, 68% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## release-type-check.txt

- Original file: `release-type-check.txt`
- Original size: 924 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next typegen && tsc --noEmit --incremental false
At line:2 char:352
+ ... TEXITCODE"; pnpm.cmd type-check *> docs/audit/phase-14/evidence/relea ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
```

## review-gcp-red.txt

- Original file: `review-gcp-red.txt`
- Original size: 3074 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

 ❯ src/engine/imagery/__tests__/alignment.test.ts (36 tests | 1 failed) 63ms
   ❯ raster alignment (36)
     × IMG-32 measures GCP errors locally even when the caller world anchor is distant 13ms
pnpm.cmd : 
At line:2 char:1
+ pnpm.cmd exec vitest run src/engine/imagery/__tests__/alignment.test. ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/engine/imagery/__tests__/alignment.test.ts > raster alignment > IMG-32 measures GCP errors locally even 
when the caller world anchor is distant
AssertionError: expected 'checkpoint-validated' to be 'rejected' // Object.is equality

Expected: "rejected"
Received: "checkpoint-validated"

 ❯ src/engine/imagery/__tests__/alignment.test.ts:214:27
    212|       ground:{...p.ground,longitudeDeg:p.ground.longitudeDeg-90+.0001}…
    213|     const result=evaluateControlPoints(raster,controls,ref,{rmseMeters…
    214|     expect(result.status).toBe('rejected');
       |                           ^
    215|     expect(result.independent.rmseMeters).toBeGreaterThan(10);
    216|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  1 failed | 35 passed (36)
   Start at  03:25:54
   Duration  1.67s (environment 61%, setup 18%, import 11%, transform 5%, tests 4%, worker 1%)
```

## review-green.txt

- Original file: `review-green.txt`
- Original size: 478 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  2 passed (2)
      Tests  37 passed (37)
   Start at  03:26:36
   Duration  2.47s (environment 59%, setup 16%, import 12%, tests 6%, transform 6%, worker 1%)
```

## runtime-coverage-retry.txt

- Original file: `runtime-coverage-retry.txt`
- Original size: 2180 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8


 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  03:42:46
   Duration  6.49s (tests 66%, environment 15%, setup 7%, import 6%, transform 5%, worker 1%)

 % Coverage report from v8
----------|---------|----------|---------|---------|----------------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s          
----------|---------|----------|---------|---------|----------------------------
All files |   90.36 |     82.6 |   77.14 |   93.13 |                            
 world.ts |   90.36 |     82.6 |   77.14 |   93.13 | ...510-518,530,552,566-569 
----------|---------|----------|---------|---------|----------------------------

=============================== Coverage summary ===============================
Statements   : 90.36% ( 300/332 )
Branches     : 82.6% ( 95/115 )
Functions    : 77.14% ( 27/35 )
Lines        : 93.13% ( 285/306 )
================================================================================
```

## runtime-interaction.txt

- Original file: `runtime-interaction.txt`
- Original size: 454 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  1 passed (1)
      Tests  3 passed (3)
   Start at  03:23:33
   Duration  10.02s (environment 50%, tests 25%, setup 11%, transform 7%, import 7%)
```

## stabilization-server.txt

- Original file: `stabilization-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 27ms
```

## stale-preview-green.txt

- Original file: `stale-preview-green.txt`
- Original size: 476 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  03:33:41
   Duration  2.81s (environment 52%, setup 16%, tests 12%, import 12%, transform 7%, worker 1%)
```

## storybook-server.txt

- Original file: `storybook-server.txt`
- Original size: 0 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

(empty file)

## trust-preview-latest.txt

- Original file: `trust-preview-latest.txt`
- Original size: 10186 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

pnpm.cmd : stderr | src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx > imagery canvas lifecycle > 
IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates
At line:2 char:329
+ ... ew.test.ts; pnpm.cmd exec vitest run src/world-core/registries/__test ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (stderr | src/mo...try revalidates:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
An error occurred in the <ImageryInspector> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.


 ❯ src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx (1 test | 1 failed) 1312ms
   ❯ imagery canvas lifecycle (1)
     × IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates 1306ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx > imagery canvas lifecycle > IMG-38/45 removes 
pixels and attribution after rights rejection; retry revalidates
TestingLibraryElementError: Unable to find role="link" and name "TEST attribution"

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div />[39m
[36m</body>[39m

Ignored nodes: comments, script, style
[36m<body>[39m
  [36m<div />[39m
[36m</body>[39m
 ❯ waitForWrapper 
node_modules/.pnpm/@testing-library+dom@10.4.2/node_modules/@testing-library/dom/dist/wait-for.js:163:27
 ❯ node_modules/.pnpm/@testing-library+dom@10.4.2/node_modules/@testing-library/dom/dist/query-helpers.js:86:33
 ❯ src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx:45:18
     43|     (screen.getByTestId('imagery-inspector') as HTMLDetailsElement).op…
     44|     fireEvent.click(screen.getByRole('button', { name: 'Show alignment…
     45|     await screen.findByRole('link', { name: 'TEST attribution' });
       |                  ^
     46|     expect(draw).toHaveBeenCalledOnce();
     47|     mocks.load.mockRejectedValue(new Error('rights revoked'));

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯

⎯⎯⎯⎯⎯⎯ Unhandled Errors ⎯⎯⎯⎯⎯⎯

Vitest caught 1 unhandled error during the test run.
This might cause false positive tests. Resolve unhandled errors to make sure your tests are not affected.

⎯⎯⎯⎯⎯ Uncaught Exception ⎯⎯⎯⎯⎯
TypeError: Cannot read properties of undefined (reading 'n')
 ❯ ImageryInspector src/modules/WorldExplorer/components/ImageryInspector.tsx:148:53
    146|                 <p>
    147|                   {t('imageryControlStats', {
    148|                     n: metadata.quality.independent.n,
       |                                                     ^
    149|                     rmse: metadata.quality.independent.rmseMeters?.toF…
    150|                     max: metadata.quality.independent.maxMeters?.toFix…
 ❯ Object.react_stack_bottom_frame 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:28571:20
 ❯ renderWithHooks 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:8030:22
 ❯ updateFunctionComponent 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:10569:19
 ❯ beginWork 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:12205:18
 ❯ runWithFiberInDEV 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:1048:13
 ❯ performUnitOfWork 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:19176:22
 ❯ workLoopSync 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:19004:41
 ❯ renderRootSync 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:18985:11
 ❯ performWorkOnRoot 
node_modules/.pnpm/react-dom@19.3.1_react@19.3.1/node_modules/react-dom/cjs/react-dom-client.development.js:18094:35

This error originated in "src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx" test file. It doesn't mean 
the error was thrown inside the file itself, but while it was running.
The last test to run before this error was "IMG-38/45 removes pixels and attribution after rights rejection; retry 
revalidates". This means either:
- the error was thrown while Vitest was running this test, or
- the error was thrown after the test completed, and this was the most recent test at that point.
⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯


 Test Files  1 failed | 2 passed (3)
      Tests  1 failed | 18 passed (19)
     Errors  1 error
   Start at  03:30:54
   Duration  6.72s (environment 59%, setup 17%, tests 10%, import 10%, transform 3%, worker 1%)
```

## trust-red.txt

- Original file: `trust-red.txt`
- Original size: 5176 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation

 ❯ src/world-core/registries/__tests__/imagery.test.ts (0 test)
pnpm.cmd : 
At line:2 char:1
+ pnpm.cmd exec vitest run src/world-core/registries/__tests__/imagery. ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: (:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
⎯⎯⎯⎯⎯⎯ Failed Suites 1 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/world-core/registries/__tests__/imagery.test.ts [ src/world-core/registries/__tests__/imagery.test.ts ]
Error: Failed to resolve import "../imagery" from "src/world-core/registries/__tests__/imagery.test.ts". Does the file 
exist?
  Plugin: vite:import-analysis
  File: C:/Workspace/Personnel/danang-simulation/src/world-core/registries/__tests__/imagery.test.ts:4:57
  2  |  import { createDataSourceRegistry } from "../data-sources";
  3  |  import { testSource } from "./fixtures";
  4  |  import { validateImageryAsset, verifyImageryBytes } from "../imagery";
     |                                                            ^
  5  |  import { rasterFixture } from "@/engine/imagery/__tests__/alignment.test";
  6  |  import { createGeoReference } from "@/engine/geospatial/core";
 ❯ TransformPluginContext._formatLog node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/no
de_modules/vite/dist/node/chunks/node.js:8766:39
 ❯ TransformPluginContext.error node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_mo
dules/vite/dist/node/chunks/node.js:8763:14
 ❯ normalizeUrl node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_modules/vite/dist/
node/chunks/node.js:26632:18
 ❯ node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_modules/vite/dist/node/chunks/n
ode.js:26702:30
 ❯ TransformPluginContext.transform node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/nod
e_modules/vite/dist/node/chunks/node.js:26668:4
 ❯ EnvironmentPluginContainer.transform node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6
/node_modules/vite/dist/node/chunks/node.js:8545:14
 ❯ loadAndTransform node_modules/.pnpm/vite@8.3.4_@types+node@22.2_37285a407b6909e4aebad21b045269f6/node_modules/vite/d
ist/node/chunks/node.js:20184:26

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯


 Test Files  1 failed (1)
      Tests  no tests
   Start at  03:13:09
   Duration  1.39s (environment 74%, setup 24%, worker 1%, transform 1%)
```

## types-iteration.txt

- Original file: `types-iteration.txt`
- Original size: 0 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

(empty file)
