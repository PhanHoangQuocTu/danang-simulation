# Evidence Log — docs/audit/phase-13/evidence

Consolidated from 50 text log files in `docs/audit/phase-13/evidence` on 2026-11-20 as part of Option A docs consolidation. Each section preserves one original file verbatim (UTF-16 files decoded to UTF-8, CRLF normalized to LF). The original `*.txt` files were removed; `*.cjs.txt` files (executable script copies) were kept in place. PNG, JSON and other non-txt evidence files are unchanged.
## Index

- [accepted-build-storybook.txt](#accepted-build-storybooktxt) — 15054 bytes, UTF-8
- [accepted-format-check.txt](#accepted-format-checktxt) — 1225 bytes, UTF-8
- [accepted-lint.txt](#accepted-linttxt) — 300 bytes, ASCII
- [accepted-test.txt](#accepted-testtxt) — 784 bytes, UTF-8
- [accepted-type-check.txt](#accepted-type-checktxt) — 368 bytes, UTF-8
- [after-server.txt](#after-servertxt) — 146 bytes, UTF-8
- [baseline-build-clean-standalone.txt](#baseline-build-clean-standalonetxt) — 1505 bytes, UTF-8
- [baseline-build-retry.txt](#baseline-build-retrytxt) — 1393 bytes, UTF-8
- [baseline-build-sequential.txt](#baseline-build-sequentialtxt) — 1391 bytes, UTF-8
- [baseline-build-storybook.txt](#baseline-build-storybooktxt) — 1697 bytes, UTF-8
- [baseline-build.txt](#baseline-buildtxt) — 2617 bytes, UTF-8
- [baseline-format-check.txt](#baseline-format-checktxt) — 304 bytes, ASCII
- [baseline-lint.txt](#baseline-linttxt) — 300 bytes, ASCII
- [baseline-server.txt](#baseline-servertxt) — 146 bytes, UTF-8
- [baseline-test.txt](#baseline-testtxt) — 784 bytes, UTF-8
- [baseline-type-check-retry.txt](#baseline-type-check-retrytxt) — 456 bytes, UTF-8
- [baseline-type-check.txt](#baseline-type-checktxt) — 2583 bytes, ASCII
- [build-threadpool-one.txt](#build-threadpool-onetxt) — 1503 bytes, UTF-8
- [bundle-baseline.txt](#bundle-baselinetxt) — 90 bytes, ASCII
- [catalog-server.txt](#catalog-servertxt) — 146 bytes, UTF-8
- [change-inventory.txt](#change-inventorytxt) — 4850 bytes, UTF-8 with BOM
- [coverage-final.txt](#coverage-finaltxt) — 1323 bytes, ASCII
- [coverage-focused.txt](#coverage-focusedtxt) — 1325 bytes, ASCII
- [coverage-retry.txt](#coverage-retrytxt) — 2076 bytes, UTF-8
- [final-build-storybook.txt](#final-build-storybooktxt) — 15063 bytes, UTF-8
- [final-build.txt](#final-buildtxt) — 1297 bytes, UTF-8
- [final-format-check.txt](#final-format-checktxt) — 1348 bytes, UTF-8
- [final-lint.txt](#final-linttxt) — 300 bytes, ASCII
- [final-test-coverage.txt](#final-test-coveragetxt) — 1959 bytes, UTF-8
- [final-test.txt](#final-testtxt) — 783 bytes, UTF-8
- [final-type-check.txt](#final-type-checktxt) — 368 bytes, UTF-8
- [handoff-format.txt](#handoff-formattxt) — 804 bytes, UTF-16LE with BOM
- [handoff-lint.txt](#handoff-linttxt) — 760 bytes, UTF-16LE with BOM
- [health-retry-server.txt](#health-retry-servertxt) — 146 bytes, UTF-8
- [health-server.txt](#health-servertxt) — 146 bytes, UTF-8
- [release-build-storybook.txt](#release-build-storybooktxt) — 14133 bytes, UTF-8
- [release-build.txt](#release-buildtxt) — 1418 bytes, UTF-8
- [release-format-check.txt](#release-format-checktxt) — 308 bytes, ASCII
- [release-lint.txt](#release-linttxt) — 304 bytes, ASCII
- [release-server.txt](#release-servertxt) — 146 bytes, UTF-8
- [release-test.txt](#release-testtxt) — 788 bytes, UTF-8
- [release-type-check.txt](#release-type-checktxt) — 372 bytes, UTF-8
- [stabilization-server.txt](#stabilization-servertxt) — 146 bytes, UTF-8
- [storybook.txt](#storybooktxt) — 15140 bytes, UTF-8
- [verified-build-storybook.txt](#verified-build-storybooktxt) — 15067 bytes, UTF-8
- [verified-build.txt](#verified-buildtxt) — 1298 bytes, UTF-8
- [verified-format-check.txt](#verified-format-checktxt) — 305 bytes, ASCII
- [verified-lint.txt](#verified-linttxt) — 1488 bytes, UTF-8
- [verified-test.txt](#verified-testtxt) — 784 bytes, UTF-8
- [verified-type-check.txt](#verified-type-checktxt) — 369 bytes, UTF-8

## accepted-build-storybook.txt

- Original file: `accepted-build-storybook.txt`
- Original size: 15054 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:7108) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
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
|  storybook-static/assets/iframe-B2LDjb9J.css
|  206.30 kB │ gzip:  30.85 kB
|  storybook-static/assets/iframe-DYq77sCN.js
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
|  storybook-static/assets/WorldExplorerClient.stories-CbAveWSX.js
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
|  storybook-static/assets/tooltip.stories-C40q5tnw.js
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
|  storybook-static/assets/common.stories-DQRB1hpz.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-OUYm6q29.js
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
|  storybook-static/assets/ClientBoundary.stories-DhDHWECC.js
|  6.03 kB │ gzip:   2.63 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-aWSBrPv8.js
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
|  storybook-static/assets/sidebar.stories-CewyYfIw.js
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
|  storybook-static/assets/hooks-DDgqJ2Tq.js
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
|  storybook-static/assets/WorldExplorerClient-rIneMH4m.js
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
|  storybook-static/assets/world-Dj876eCB.js
|  665.56 kB │ gzip: 176.94 kB
|  storybook-static/assets/iframe-rYtuT_PP.js
|  1,390.06 kB │ gzip: 393.36 kB

|  Vite ✓ built in 19.29s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 15.3s of this 19.0s
|  build (81%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (42%, 8.0s, 4807
|  calls)
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

EXIT_CODE=0
```

## accepted-format-check.txt

- Original file: `accepted-format-check.txt`
- Original size: 1225 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
docs\audit\phase-13\evidence\after-browser.json format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
    165 165 │       }
    166 166 │     ],
    167     │ - ··"screenshots":·[
    168     │ - ····"after-1920x1080.png"
    169     │ - ··]
        167 │ + ··"screenshots":·["after-1920x1080.png"]
    170 168 │   }
    171 169 │   
  

Checked 367 files in 157ms. No fixes applied.
Found 1 error.
format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.
  

[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## accepted-lint.txt

- Original file: `accepted-lint.txt`
- Original size: 300 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 368 files in 398ms. No fixes applied.
EXIT_CODE=0
```

## accepted-test.txt

- Original file: `accepted-test.txt`
- Original size: 784 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  36 passed (36)
      Tests  171 passed (171)
   Start at  02:38:49
   Duration  40.95s (environment 64%, setup 19%, import 9%, tests 5%, transform 1%, worker 1%)

Environment  jsdom was created 36 times · 153.55s total, 64% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

EXIT_CODE=0
```

## accepted-type-check.txt

- Original file: `accepted-type-check.txt`
- Original size: 368 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
EXIT_CODE=0
```

## after-server.txt

- Original file: `after-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 39ms
```

## baseline-build-clean-standalone.txt

- Original file: `baseline-build-clean-standalone.txt`
- Original size: 1505 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next build
At line:8 char:1
+ pnpm.cmd build *> docs/audit/phase-13/evidence/baseline-build-clean-s ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 134ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 1447ms
  Running TypeScript ...
  Finished TypeScript in 1593ms ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 859ms
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

EXIT_CODE=0
```

## baseline-build-retry.txt

- Original file: `baseline-build-retry.txt`
- Original size: 1393 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next build
At line:4 char:1
+ pnpm.cmd build *> docs/audit/phase-13/evidence/baseline-build-retry.t ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 148ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 2.0s
  Running TypeScript ...
  Finished TypeScript in 1966ms ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1233ms
  Finalizing page optimization ...

> Build error occurred
Error: ENOENT: no such file or directory, mkdir 
'C:\Workspace\Personnel\danang-simulation\.next\standalone\node_modules\.pnpm\react@19.3.1\node_modules\react'
    at ignore-listed frames {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'mkdir',
  path: 'C:\\Workspace\\Personnel\\danang-simulation\\.next\\standalone\\node_modules\\.pnpm\\react@19.3.1\\node_module
s\\react'
}
[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## baseline-build-sequential.txt

- Original file: `baseline-build-sequential.txt`
- Original size: 1391 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next build
At line:2 char:1
+ pnpm.cmd build *> docs/audit/phase-13/evidence/baseline-build-sequent ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 248ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 3.5s
  Running TypeScript ...
  Finished TypeScript in 2.6s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1215ms
  Finalizing page optimization ...

> Build error occurred
Error: ENOENT: no such file or directory, mkdir 
'C:\Workspace\Personnel\danang-simulation\.next\standalone\node_modules\.pnpm\react@19.3.1\node_modules\react'
    at ignore-listed frames {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'mkdir',
  path: 'C:\\Workspace\\Personnel\\danang-simulation\\.next\\standalone\\node_modules\\.pnpm\\react@19.3.1\\node_module
s\\react'
}
[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## baseline-build-storybook.txt

- Original file: `baseline-build-storybook.txt`
- Original size: 1697 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:16832) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
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
EXIT_CODE=1
```

## baseline-build.txt

- Original file: `baseline-build.txt`
- Original size: 2617 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
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
EXIT_CODE=1
```

## baseline-format-check.txt

- Original file: `baseline-format-check.txt`
- Original size: 304 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 356 files in 329ms. No fixes applied.
EXIT_CODE=0
```

## baseline-lint.txt

- Original file: `baseline-lint.txt`
- Original size: 300 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 357 files in 633ms. No fixes applied.
EXIT_CODE=0
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
✓ Running next.config took 44ms
```

## baseline-test.txt

- Original file: `baseline-test.txt`
- Original size: 784 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  33 passed (33)
      Tests  151 passed (151)
   Start at  02:16:25
   Duration  33.39s (environment 69%, setup 19%, import 6%, tests 4%, transform 1%, worker 1%)

Environment  jsdom was created 33 times · 129.81s total, 69% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

EXIT_CODE=0
```

## baseline-type-check-retry.txt

- Original file: `baseline-type-check-retry.txt`
- Original size: 456 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next typegen && tsc --noEmit --incremental false
At line:2 char:1
+ pnpm.cmd type-check *> docs/audit/phase-13/evidence/baseline-type-che ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
EXIT_CODE=0
```

## baseline-type-check.txt

- Original file: `baseline-type-check.txt`
- Original size: 2583 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:6 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
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
EXIT_CODE=1
```

## build-threadpool-one.txt

- Original file: `build-threadpool-one.txt`
- Original size: 1503 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ next build
At line:5 char:3
+   pnpm.cmd build *> docs/audit/phase-13/evidence/build-threadpool-one ...
+   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 179ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 1529ms
  Running TypeScript ...
  Finished TypeScript in 2.5s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 948ms
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

EXIT_CODE=0
```

## bundle-baseline.txt

- Original file: `bundle-baseline.txt`
- Original size: 90 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
Baseline top-level chunks: 26 files; 2019866 bytes; aggregate uncompressed, not per-route
```

## catalog-server.txt

- Original file: `catalog-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 40ms
```

## change-inventory.txt

- Original file: `change-inventory.txt`
- Original size: 4850 bytes
- Original encoding: UTF-8 with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
 M docs/PHASE_STATUS.md
 M docs/architecture/WORLD_ARCHITECTURE.md
 M docs/research/GEOSPATIAL_DATA_SOURCE_RESEARCH.md
 M src/messages/en/worldExplorer.json
 M src/messages/vi/worldExplorer.json
 M src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx
 M src/modules/WorldExplorer/components/WorldHud.tsx
?? PHASE_13_IMPLEMENTATION_REPORT.md
?? docs/audit/phase-13/browser-driver.cjs.txt
?? docs/audit/phase-13/check-metadata.mjs
?? docs/audit/phase-13/evidence/accepted-build-storybook.txt
?? docs/audit/phase-13/evidence/accepted-format-check.txt
?? docs/audit/phase-13/evidence/accepted-lint.txt
?? docs/audit/phase-13/evidence/accepted-test.txt
?? docs/audit/phase-13/evidence/accepted-type-check.txt
?? docs/audit/phase-13/evidence/after-1024x768-debug.png
?? docs/audit/phase-13/evidence/after-1366x768-debug.png
?? docs/audit/phase-13/evidence/after-1920x1080.png
?? docs/audit/phase-13/evidence/after-390x844-debug.png
?? docs/audit/phase-13/evidence/after-768x1024-debug.png
?? docs/audit/phase-13/evidence/after-844x390-debug.png
?? docs/audit/phase-13/evidence/after-browser.json
?? docs/audit/phase-13/evidence/after-debug.png
?? docs/audit/phase-13/evidence/after-server.txt
?? docs/audit/phase-13/evidence/after-source-registry.png
?? docs/audit/phase-13/evidence/after-vi-debug.png
?? docs/audit/phase-13/evidence/baseline-1920x1080.png
?? docs/audit/phase-13/evidence/baseline-browser.json
?? docs/audit/phase-13/evidence/baseline-build-clean-standalone.txt
?? docs/audit/phase-13/evidence/baseline-build-retry.txt
?? docs/audit/phase-13/evidence/baseline-build-sequential.txt
?? docs/audit/phase-13/evidence/baseline-build-storybook.txt
?? docs/audit/phase-13/evidence/baseline-build.txt
?? docs/audit/phase-13/evidence/baseline-debug.png
?? docs/audit/phase-13/evidence/baseline-format-check.txt
?? docs/audit/phase-13/evidence/baseline-lint.txt
?? docs/audit/phase-13/evidence/baseline-server.txt
?? docs/audit/phase-13/evidence/baseline-test.txt
?? docs/audit/phase-13/evidence/baseline-type-check-retry.txt
?? docs/audit/phase-13/evidence/baseline-type-check.txt
?? docs/audit/phase-13/evidence/build-threadpool-one.txt
?? docs/audit/phase-13/evidence/bundle-baseline.txt
?? docs/audit/phase-13/evidence/catalog-browser.json
?? docs/audit/phase-13/evidence/catalog-server.txt
?? docs/audit/phase-13/evidence/catalog-vi-debug.png
?? docs/audit/phase-13/evidence/change-inventory.txt
?? docs/audit/phase-13/evidence/coverage-final.txt
?? docs/audit/phase-13/evidence/coverage-focused.txt
?? docs/audit/phase-13/evidence/coverage-retry.txt
?? docs/audit/phase-13/evidence/final-build-storybook.txt
?? docs/audit/phase-13/evidence/final-build.txt
?? docs/audit/phase-13/evidence/final-format-check.txt
?? docs/audit/phase-13/evidence/final-lint.txt
?? docs/audit/phase-13/evidence/final-test-coverage.txt
?? docs/audit/phase-13/evidence/final-test.txt
?? docs/audit/phase-13/evidence/final-type-check.txt
?? docs/audit/phase-13/evidence/handoff-format.txt
?? docs/audit/phase-13/evidence/handoff-lint.txt
?? docs/audit/phase-13/evidence/health-browser.json
?? docs/audit/phase-13/evidence/health-retry-browser.json
?? docs/audit/phase-13/evidence/health-retry-server.txt
?? docs/audit/phase-13/evidence/health-server.txt
?? docs/audit/phase-13/evidence/metadata.json
?? docs/audit/phase-13/evidence/release-1920x1080.png
?? docs/audit/phase-13/evidence/release-browser.json
?? docs/audit/phase-13/evidence/release-build-storybook.txt
?? docs/audit/phase-13/evidence/release-build.txt
?? docs/audit/phase-13/evidence/release-debug.png
?? docs/audit/phase-13/evidence/release-format-check.txt
?? docs/audit/phase-13/evidence/release-lint.txt
?? docs/audit/phase-13/evidence/release-server.txt
?? docs/audit/phase-13/evidence/release-source-registry.png
?? docs/audit/phase-13/evidence/release-test.txt
?? docs/audit/phase-13/evidence/release-type-check.txt
?? docs/audit/phase-13/evidence/release-vi-debug.png
?? docs/audit/phase-13/evidence/stabilization-browser.json
?? docs/audit/phase-13/evidence/stabilization-server.txt
?? docs/audit/phase-13/evidence/storybook.txt
?? docs/audit/phase-13/evidence/verified-build-storybook.txt
?? docs/audit/phase-13/evidence/verified-build.txt
?? docs/audit/phase-13/evidence/verified-format-check.txt
?? docs/audit/phase-13/evidence/verified-lint.txt
?? docs/audit/phase-13/evidence/verified-test.txt
?? docs/audit/phase-13/evidence/verified-type-check.txt
?? docs/prompts/PHASE_13_CODEX_DATA_SOURCE_REGISTRY_REFACTOR_MASTER_PROMPT.md
?? src/integrations/geodata/__tests__/overpass.test.ts
?? src/integrations/geodata/overpass.server.ts
?? src/world-core/registries/__tests__/data-sources.test.ts
?? src/world-core/registries/__tests__/fixtures.ts
?? src/world-core/registries/__tests__/snapshot.test.ts
?? src/world-core/registries/data-sources.ts
?? src/worlds/danang/data-sources.ts
```

## coverage-final.txt

- Original file: `coverage-final.txt`
- Original size: 1323 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8


 Test Files  3 passed (3)
      Tests  25 passed (25)
   Start at  02:42:20
   Duration  2.71s (environment 34%, setup 33%, import 17%, transform 6%, tests 6%, worker 4%)

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   97.91 |    94.68 |     100 |   98.75 |                   
 ...ations/geodata |   98.21 |    91.11 |     100 |   97.91 |                   
  ...ass.server.ts |   98.21 |    91.11 |     100 |   97.91 | 49                
 ...ore/registries |   97.79 |     95.8 |     100 |    99.1 |                   
  data-sources.ts  |   97.79 |     95.8 |     100 |    99.1 | 202               
-------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 97.91% ( 188/192 )
Branches     : 94.68% ( 178/188 )
Functions    : 100% ( 41/41 )
Lines        : 98.75% ( 158/160 )
================================================================================
EXIT_CODE=0
```

## coverage-focused.txt

- Original file: `coverage-focused.txt`
- Original size: 1325 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8


 Test Files  3 passed (3)
      Tests  20 passed (20)
   Start at  02:37:56
   Duration  2.25s (environment 37%, setup 34%, import 16%, tests 6%, worker 4%, transform 3%)

 % Coverage report from v8
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   96.29 |    93.95 |   95.12 |   98.08 |                   
 ...ations/geodata |   92.72 |    88.88 |      50 |   95.74 |                   
  ...ass.server.ts |   92.72 |    88.88 |      50 |   95.74 | 49,80             
 ...ore/registries |   97.76 |    95.62 |     100 |   99.09 |                   
  data-sources.ts  |   97.76 |    95.62 |     100 |   99.09 | 202               
-------------------|---------|----------|---------|---------|-------------------

=============================== Coverage summary ===============================
Statements   : 96.29% ( 182/189 )
Branches     : 93.95% ( 171/182 )
Functions    : 95.12% ( 39/41 )
Lines        : 98.08% ( 154/157 )
================================================================================
EXIT_CODE=0
```

## coverage-retry.txt

- Original file: `coverage-retry.txt`
- Original size: 2076 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ vitest run --coverage --maxWorkers=2
At line:2 char:1
+ pnpm.cmd test:coverage --maxWorkers=2 *> docs/audit/phase-13/evidence ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run --coverage --maxWorkers=2:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8

 ❯ src/modules/WorldExplorer/__tests__/world.test.ts (3 tests | 1 failed) 9118ms
   ❯ scene composition and browser runtime (3)
     × owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources 8372ms

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


 Test Files  1 failed | 35 passed (36)
      Tests  1 failed | 170 passed (171)
   Start at  02:35:38
   Duration  65.95s (environment 56%, setup 20%, tests 12%, import 8%, worker 3%, transform 1%)

Environment  jsdom was created 36 times · 64.10s total, 56% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## final-build-storybook.txt

- Original file: `final-build-storybook.txt`
- Original size: 15063 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:7 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:936) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
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
|  storybook-static/assets/iframe-B2LDjb9J.css
|  206.30 kB │ gzip:  30.85 kB
|  storybook-static/assets/iframe-ChzOiax-.js
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
|  storybook-static/assets/WorldExplorerClient.stories-NeUcUFLc.js
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
|  storybook-static/assets/tooltip.stories-D-pSEGoU.js
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
|  storybook-static/assets/common.stories-Br_6vwZE.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-wqykUFue.js
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
|  storybook-static/assets/ClientBoundary.stories-C4lzjq2Z.js
|  6.03 kB │ gzip:   2.63 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-bRc_34FI.js
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
|  storybook-static/assets/sidebar.stories-CHBkihhk.js
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
|  storybook-static/assets/hooks-CWEMu4xq.js
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
|  storybook-static/assets/WorldExplorerClient-BDi8KVf6.js
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
|  storybook-static/assets/world-CWsFVbYf.js
|  665.46 kB │ gzip: 176.92 kB
|  storybook-static/assets/iframe-CrmOfUc5.js
|  1,390.06 kB │ gzip: 393.36 kB

|  Vite ✓ built in 12.20s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 9.9s of this 11.9s
|  build (83%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (40%, 4.8s, 4807
|  calls)
|  - plugin vite:css transform (18%, 2.2s, 3 calls)
|  Additional callback time came from the callbacks below and from
|  callbacks under 1s.
|  2 callbacks are listed without a time. Their calls overlapped, so the
|  time inside one call includes work from other calls. To find their
|  cost, profile the build with `node --cpu-prof`:
|  - plugin vite-plugin-storybook-nextjs-swc transform (4807 calls)
|  - plugin plugin-csf transform (4807 calls)
|  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
|  for more details.

|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully

EXIT_CODE=0
```

## final-build.txt

- Original file: `final-build.txt`
- Original size: 1297 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:7 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 133ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 5.3s
  Running TypeScript ...
  Finished TypeScript in 3.9s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1022ms
  Finalizing page optimization ...

> Build error occurred
Error: EEXIST: file already exists, mkdir 
'C:\Workspace\Personnel\danang-simulation\.next\standalone\node_modules\.pnpm\react@19.3.1\node_modules\react'
    at ignore-listed frames {
  errno: -4075,
  code: 'EEXIST',
  syscall: 'mkdir',
  path: 'C:\\Workspace\\Personnel\\danang-simulation\\.next\\standalone\\node_modules\\.pnpm\\react@19.3.1\\node_module
s\\react'
}
[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## final-format-check.txt

- Original file: `final-format-check.txt`
- Original size: 1348 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:7 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
docs\audit\phase-13\evidence\baseline-browser.json format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:
  
    260 260 │     ],
    261 261 │     "events": [],
    262     │ - ··"screenshots":·[
    263     │ - ····"baseline-1920x1080.png",
    264     │ - ····"baseline-debug.png"
    265     │ - ··],
        262 │ + ··"screenshots":·["baseline-1920x1080.png",·"baseline-debug.png"],
    266 263 │     "finished": "2026-11-17T19:27:57.226Z"
    267 264 │   }
  

Checked 366 files in 262ms. No fixes applied.
Found 1 error.
format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.
  

[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## final-lint.txt

- Original file: `final-lint.txt`
- Original size: 300 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:7 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 367 files in 337ms. No fixes applied.
EXIT_CODE=0
```

## final-test-coverage.txt

- Original file: `final-test-coverage.txt`
- Original size: 1959 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run --coverage
At line:7 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run --coverage:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation
      Coverage enabled with v8

 ❯ src/modules/WorldExplorer/__tests__/world.test.ts (3 tests | 1 failed) 10738ms
   ❯ scene composition and browser runtime (3)
     × owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources 9661ms

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


 Test Files  1 failed | 35 passed (36)
      Tests  1 failed | 170 passed (171)
   Start at  02:33:22
   Duration  28.47s (environment 57%, setup 19%, tests 10%, import 8%, transform 3%, worker 3%)

Environment  jsdom was created 36 times · 93.91s total, 57% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## final-test.txt

- Original file: `final-test.txt`
- Original size: 783 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:7 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  36 passed (36)
      Tests  171 passed (171)
   Start at  02:32:23
   Duration  24.97s (environment 66%, setup 21%, import 7%, tests 4%, transform 1%, worker 1%)

Environment  jsdom was created 36 times · 99.13s total, 66% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

EXIT_CODE=0
```

## final-type-check.txt

- Original file: `final-type-check.txt`
- Original size: 368 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:7 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
EXIT_CODE=0
```

## handoff-format.txt

- Original file: `handoff-format.txt`
- Original size: 804 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome format .
At line:5 char:1
+ pnpm.cmd format:check *> docs/audit/phase-13/evidence/handoff-format. ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 372 files in 287ms. No fixes applied.
EXIT_CODE=0
```

## handoff-lint.txt

- Original file: `handoff-lint.txt`
- Original size: 760 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ biome lint .
At line:3 char:1
+ pnpm.cmd lint *> docs/audit/phase-13/evidence/handoff-lint.txt
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 373 files in 538ms. No fixes applied.
EXIT_CODE=0
```

## health-retry-server.txt

- Original file: `health-retry-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 31ms
```

## health-server.txt

- Original file: `health-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 93ms
```

## release-build-storybook.txt

- Original file: `release-build-storybook.txt`
- Original size: 14133 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:7 char:5
+     & pnpm.cmd $check *> $log
+     ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:15216) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
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
|  storybook-static/assets/iframe-B2LDjb9J.css
|  206.30 kB │ gzip:  30.85 kB
|  storybook-static/assets/iframe-DYq77sCN.js
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
|  storybook-static/assets/WorldExplorerClient.stories-CbAveWSX.js
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
|  storybook-static/assets/tooltip.stories-C40q5tnw.js
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
|  storybook-static/assets/common.stories-DQRB1hpz.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-OUYm6q29.js
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
|  storybook-static/assets/ClientBoundary.stories-DhDHWECC.js
|  6.03 kB │ gzip:   2.63 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-aWSBrPv8.js
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
|  storybook-static/assets/sidebar.stories-CewyYfIw.js
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
|  storybook-static/assets/hooks-DDgqJ2Tq.js
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
|  storybook-static/assets/WorldExplorerClient-rIneMH4m.js
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
|  storybook-static/assets/world-Dj876eCB.js
|  665.56 kB │ gzip: 176.94 kB
|  storybook-static/assets/iframe-rYtuT_PP.js
|  1,390.06 kB │ gzip: 393.36 kB

|  Vite ✓ built in 14.14s
|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully

EXIT_CODE=0
```

## release-build.txt

- Original file: `release-build.txt`
- Original size: 1418 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:7 char:5
+     & pnpm.cmd $check *> $log
+     ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 141ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 3.8s
  Running TypeScript ...
  Finished TypeScript in 2.9s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1129ms
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

EXIT_CODE=0
```

## release-format-check.txt

- Original file: `release-format-check.txt`
- Original size: 308 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:7 char:5
+     & pnpm.cmd $check *> $log
+     ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 367 files in 220ms. No fixes applied.
EXIT_CODE=0
```

## release-lint.txt

- Original file: `release-lint.txt`
- Original size: 304 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:7 char:5
+     & pnpm.cmd $check *> $log
+     ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 368 files in 497ms. No fixes applied.
EXIT_CODE=0
```

## release-server.txt

- Original file: `release-server.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3192
- Network:       http://0.0.0.0:3192
✓ Ready in 0ms
✓ Running next.config took 24ms
```

## release-test.txt

- Original file: `release-test.txt`
- Original size: 788 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:7 char:5
+     & pnpm.cmd $check *> $log
+     ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  36 passed (36)
      Tests  176 passed (176)
   Start at  02:42:33
   Duration  20.76s (environment 63%, setup 20%, import 10%, tests 6%, transform 1%, worker 1%)

Environment  jsdom was created 36 times · 78.53s total, 63% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

EXIT_CODE=0
```

## release-type-check.txt

- Original file: `release-type-check.txt`
- Original size: 372 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:7 char:5
+     & pnpm.cmd $check *> $log
+     ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
EXIT_CODE=0
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
✓ Running next.config took 55ms
```

## storybook.txt

- Original file: `storybook.txt`
- Original size: 15140 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.cmd : $ storybook build
At line:2 char:1
+ pnpm.cmd build-storybook *> docs/audit/phase-13/evidence/storybook.tx ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:16984) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
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
|  storybook-static/assets/iframe-B2LDjb9J.css
|  206.30 kB │ gzip:  30.85 kB
|  storybook-static/assets/iframe-eiB35472.js
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
|  storybook-static/assets/WorldExplorerClient.stories-BaAT4EQf.js
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
|  storybook-static/assets/tooltip.stories-CwUm9ZaW.js
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
|  storybook-static/assets/common.stories-CRL1F17b.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-DfdmM01K.js
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
|  storybook-static/assets/ClientBoundary.stories-DBmWJijI.js
|  6.03 kB │ gzip:   2.63 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-BDut6rdd.js
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
|  storybook-static/assets/sidebar.stories-BH2sHZOO.js
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
|  storybook-static/assets/hooks-C5YiVpl1.js
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
|  storybook-static/assets/WorldExplorerClient-BsXvDpCn.js
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
|  storybook-static/assets/world-zkWEzedS.js
|  664.39 kB │ gzip: 176.55 kB
|  storybook-static/assets/iframe-3crq1ZFk.js
|  1,390.06 kB │ gzip: 393.36 kB

|  Vite ✓ built in 9.44s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 7.9s of this 9.3s
|  build (84%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (43%, 4.1s, 4807
|  calls)
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

EXIT_CODE=0
```

## verified-build-storybook.txt

- Original file: `verified-build-storybook.txt`
- Original size: 15067 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:12 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:15392) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
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
|  storybook-static/assets/iframe-B2LDjb9J.css
|  206.30 kB │ gzip:  30.85 kB
|  storybook-static/assets/iframe-DYq77sCN.js
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
|  storybook-static/assets/WorldExplorerClient.stories-CbAveWSX.js
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
|  storybook-static/assets/tooltip.stories-C40q5tnw.js
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
|  storybook-static/assets/common.stories-DQRB1hpz.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-OUYm6q29.js
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
|  storybook-static/assets/ClientBoundary.stories-DhDHWECC.js
|  6.03 kB │ gzip:   2.63 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-aWSBrPv8.js
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
|  storybook-static/assets/sidebar.stories-CewyYfIw.js
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
|  storybook-static/assets/hooks-DDgqJ2Tq.js
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
|  storybook-static/assets/WorldExplorerClient-rIneMH4m.js
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
|  storybook-static/assets/world-Dj876eCB.js
|  665.56 kB │ gzip: 176.94 kB
|  storybook-static/assets/iframe-rYtuT_PP.js
|  1,390.06 kB │ gzip: 393.36 kB

|  Vite ✓ built in 18.47s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 15.1s of this 18.2s
|  build (83%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (42%, 7.6s, 4807
|  calls)
|  - plugin vite:css transform (35%, 6.3s, 3 calls)
|  Additional callback time came from the callbacks below and from
|  callbacks under 1s.
|  2 callbacks are listed without a time. Their calls overlapped, so the
|  time inside one call includes work from other calls. To find their
|  cost, profile the build with `node --cpu-prof`:
|  - plugin vite-plugin-storybook-nextjs-swc transform (4807 calls)
|  - plugin plugin-csf transform (4807 calls)
|  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
|  for more details.

|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully

EXIT_CODE=0
```

## verified-build.txt

- Original file: `verified-build.txt`
- Original size: 1298 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:12 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 153ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 3.4s
  Running TypeScript ...
  Finished TypeScript in 5.2s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1933ms
  Finalizing page optimization ...

> Build error occurred
Error: EEXIST: file already exists, mkdir 
'C:\Workspace\Personnel\danang-simulation\.next\standalone\node_modules\.pnpm\react@19.3.1\node_modules\react'
    at ignore-listed frames {
  errno: -4075,
  code: 'EEXIST',
  syscall: 'mkdir',
  path: 'C:\\Workspace\\Personnel\\danang-simulation\\.next\\standalone\\node_modules\\.pnpm\\react@19.3.1\\node_module
s\\react'
}
[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## verified-format-check.txt

- Original file: `verified-format-check.txt`
- Original size: 305 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:12 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 366 files in 168ms. No fixes applied.
EXIT_CODE=0
```

## verified-lint.txt

- Original file: `verified-lint.txt`
- Original size: 1488 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:12 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
src\world-core\registries\data-sources.ts:218:91 lint/style/noNestedTernary ━━━━━━━━━━━━━━━━━━━━━━━━

  × Do not nest ternary expressions.
  
    216 │     const canonical = {
    217 │       ...node,
  > 218 │       tags: Object.fromEntries(Object.entries(node.tags).sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))),
        │                                                                                           ^^^^^^^^^^^^^
    219 │     };
    220 │     const previous = nodes.get(node.id);
  
  i Nesting ternary expressions can make code more difficult to understand.
  
  i Convert nested ternary expression into if-else statements or separate the conditions to make the logic easier to 
understand.
  

Checked 367 files in 537ms. No fixes applied.
Found 1 error.
lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.
  

[ELIFECYCLE] Command failed with exit code 1.
EXIT_CODE=1
```

## verified-test.txt

- Original file: `verified-test.txt`
- Original size: 784 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:12 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  36 passed (36)
      Tests  171 passed (171)
   Start at  02:35:28
   Duration  25.37s (environment 66%, setup 20%, import 7%, tests 5%, transform 1%, worker 1%)

Environment  jsdom was created 36 times · 97.00s total, 66% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments

EXIT_CODE=0
```

## verified-type-check.txt

- Original file: `verified-type-check.txt`
- Original size: 369 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:12 char:3
+   & pnpm.cmd $check *> $log
+   ~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
EXIT_CODE=0
```
