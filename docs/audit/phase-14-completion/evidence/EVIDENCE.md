# Evidence Log — docs/audit/phase-14-completion/evidence

Consolidated from 11 text log files in `docs/audit/phase-14-completion/evidence` on 2026-11-20 as part of Option A docs consolidation. Each section preserves one original file verbatim (UTF-16 files decoded to UTF-8, CRLF normalized to LF). The original `*.txt` files were removed; `*.cjs.txt` files (executable script copies) were kept in place. PNG, JSON and other non-txt evidence files are unchanged.
## Index

- [audit-prod.txt](#audit-prodtxt) — 208 bytes, ASCII
- [build-storybook-before.txt](#build-storybook-beforetxt) — 16260 bytes, UTF-8
- [build-storybook.txt](#build-storybooktxt) — 15139 bytes, UTF-8
- [build.txt](#buildtxt) — 2632 bytes, UTF-8
- [format.txt](#formattxt) — 419 bytes, ASCII
- [lint.txt](#linttxt) — 418 bytes, ASCII
- [redirect-probe.txt](#redirect-probetxt) — 1425 bytes, UTF-8
- [test-coverage-before-timeout-fix.txt](#test-coverage-before-timeout-fixtxt) — 18060 bytes, UTF-8
- [test-coverage.txt](#test-coveragetxt) — 32802 bytes, UTF-8
- [test.txt](#testtxt) — 16814 bytes, UTF-8
- [type-check.txt](#type-checktxt) — 644 bytes, UTF-8

## audit-prod.txt

- Original file: `audit-prod.txt`
- Original size: 208 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:8139) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
No known vulnerabilities found
```

## build-storybook-before.txt

- Original file: `build-storybook-before.txt`
- Original size: 16260 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:7574) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ storybook build
(node:7605) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

┌  Building storybook v10.6.2
(node:7605) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
│
◇  Cleaning outputDir: storybook-static
│
◇  Loading presets
│
◇  Building manager..
│
●  Building open services..
│
●  Building preview..
│
●  Copying static files: public at storybook-static
│  Vite vite v8.3.4 building client environment for production...
(node:7605) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
transforming...
✓ 4809 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  20.50 kB │ gzip:   5.61 kB
│  storybook-static/assets/world-explorer-mFnqljx_.css
│  20.68 kB │ gzip:   4.90 kB
│  storybook-static/assets/iframe-BaSE0WOI.css
│  206.47 kB │ gzip:  30.87 kB
│  storybook-static/assets/iframe-D46JSqEz.js
│  0.04 kB │ gzip:   0.06 kB
│  storybook-static/assets/dist-BpWrIoGY.js
│  0.22 kB │ gzip:   0.19 kB
│  storybook-static/assets/chunk-242VQQM5-CJ9i1iaj.js
│  0.24 kB │ gzip:   0.20 kB
│  storybook-static/assets/dist-Bgc6TXR4.js
│  0.24 kB │ gzip:   0.21 kB
│  storybook-static/assets/check-C4l0qdMD.js
│  0.26 kB │ gzip:   0.23 kB
│  storybook-static/assets/chevron-down-Db-YoaoO.js
│  0.27 kB │ gzip:   0.22 kB
│  storybook-static/assets/chevron-left-Cd9RGiHq.js
│  0.27 kB │ gzip:   0.23 kB
│  storybook-static/assets/chevron-right-D1L19B_Q.js
│  0.27 kB │ gzip:   0.23 kB
│  storybook-static/assets/circle-DWuLk5md.js
│  0.27 kB │ gzip:   0.22 kB
│  storybook-static/assets/x-B1sqVEY7.js
│  0.29 kB │ gzip:   0.24 kB
│  storybook-static/assets/formatter-L2YTDE3Q-DqPs7d2n.js
│  0.30 kB │ gzip:   0.24 kB
│  storybook-static/assets/loader-circle-CSUbcJrl.js
│  0.31 kB │ gzip:   0.25 kB
│  storybook-static/assets/search-B43BJUb4.js
│  0.31 kB │ gzip:   0.25 kB
│  storybook-static/assets/chunk-QQBDHPVZ-BJU3Mk0_.js
│  0.32 kB │ gzip:   0.19 kB
│  storybook-static/assets/info-CSIANWNH.js
│  0.34 kB │ gzip:   0.26 kB
│  storybook-static/assets/ellipsis-Dfn6svcK.js
│  0.39 kB │ gzip:   0.27 kB
│  storybook-static/assets/skeleton-BnsNpVbF.js
│  0.41 kB │ gzip:   0.29 kB
│  storybook-static/assets/dist-BOqIPbtB.js
│  0.42 kB │ gzip:   0.31 kB
│  storybook-static/assets/use-mobile-BB6e8wyp.js
│  0.42 kB │ gzip:   0.29 kB
│  storybook-static/assets/inbox-CbvC1Bd7.js
│  0.43 kB │ gzip:   0.32 kB
│  storybook-static/assets/jsx-runtime-BxfXuubT.js
│  0.43 kB │ gzip:   0.30 kB
│  storybook-static/assets/dist-C9t7Cshp.js
│  0.44 kB │ gzip:   0.32 kB
│  storybook-static/assets/WorldExplorerClient.stories-B4UKuA9z.js
│  0.45 kB │ gzip:   0.30 kB
│  storybook-static/assets/dist-P5aEaGBE.js
│  0.49 kB │ gzip:   0.33 kB
│  storybook-static/assets/react-CubzI6CK.js
│  0.58 kB │ gzip:   0.34 kB
│  storybook-static/assets/dist-BDazaY1u.js
│  0.64 kB │ gzip:   0.43 kB
│  storybook-static/assets/textarea.stories-CNc698vf.js
│  0.65 kB │ gzip:   0.38 kB
│  storybook-static/assets/chunk-UAWMPV5J-Dsq9DvcU.js
│  0.74 kB │ gzip:   0.45 kB
│  storybook-static/assets/dist-BNjw8BE7.js
│  0.75 kB │ gzip:   0.45 kB
│  storybook-static/assets/enum-CwrLEL0d.js
│  0.78 kB │ gzip:   0.45 kB
│  storybook-static/assets/toggle.stories-Q84BqJ2J.js
│  0.78 kB │ gzip:   0.44 kB
│  storybook-static/assets/Icons.stories-D3mNpMnW.js
│  0.80 kB │ gzip:   0.50 kB
│  storybook-static/assets/checkbox.stories-DIHgK8RS.js
│  0.80 kB │ gzip:   0.37 kB
│  storybook-static/assets/label.stories-CSjRb9C2.js
│  0.82 kB │ gzip:   0.48 kB
│  storybook-static/assets/textarea-BbLnRPqe.js
│  0.83 kB │ gzip:   0.50 kB
│  storybook-static/assets/dist-Ch4r59Bc.js
│  0.85 kB │ gzip:   0.50 kB
│  storybook-static/assets/dist-B0agaa99.js
│  0.85 kB │ gzip:   0.54 kB
│  storybook-static/assets/shim-C5Xie9xJ.js
│  0.85 kB │ gzip:   0.46 kB
│  storybook-static/assets/tooltip.stories-xhGSEX8o.js
│  0.86 kB │ gzip:   0.49 kB
│  storybook-static/assets/ImageryInspector.stories-CAm4nMa0.js
│  0.89 kB │ gzip:   0.49 kB
│  storybook-static/assets/skeleton.stories-DuQHr2Bk.js
│  0.92 kB │ gzip:   0.46 kB
│  storybook-static/assets/spinner.stories-Bb7RuOmR.js
│  0.93 kB │ gzip:   0.51 kB
│  storybook-static/assets/with-selector-yh4Qcx8N.js
│  0.94 kB │ gzip:   0.53 kB
│  storybook-static/assets/input-CsO9Atno.js
│  1.01 kB │ gzip:   0.56 kB
│  storybook-static/assets/switch.stories-rK9Id8up.js
│  1.01 kB │ gzip:   0.54 kB
│  storybook-static/assets/dist-r86zl3cz.js
│  1.03 kB │ gzip:   0.55 kB
│  storybook-static/assets/label-BeO5gq6m.js
│  1.04 kB │ gzip:   0.62 kB
│  storybook-static/assets/input.stories-SMUNiHJP.js
│  1.18 kB │ gzip:   0.53 kB
│  storybook-static/assets/select.stories-jlJ0Uvgo.js
│  1.20 kB │ gzip:   0.60 kB
│  storybook-static/assets/separator.stories-CyPwTXOY.js
│  1.25 kB │ gzip:   0.55 kB
│  storybook-static/assets/rolldown-runtime-2s6bX4vc.js
│  1.26 kB │ gzip:   0.69 kB
│  storybook-static/assets/input-group.stories-BXpPxhHX.js
│  1.34 kB │ gzip:   0.55 kB
│  storybook-static/assets/StatusBadge.stories-C_8eplXH.js
│  1.36 kB │ gzip:   0.73 kB
│  storybook-static/assets/separator-Azq44eiO.js
│  1.39 kB │ gzip:   0.70 kB
│  storybook-static/assets/card.stories-Cyduy3VM.js
│  1.40 kB │ gzip:   0.65 kB
│  storybook-static/assets/badge.stories-8A2AVjTk.js
│  1.43 kB │ gzip:   0.66 kB
│  storybook-static/assets/dialog.stories-CV7-rZZi.js
│  1.46 kB │ gzip:   0.66 kB
│  storybook-static/assets/alert.stories-C_rr9uaV.js
│  1.54 kB │ gzip:   0.65 kB
│  storybook-static/assets/aspect-ratio.stories-uFYkMJs8.js
│  1.54 kB │ gzip:   0.82 kB
│  storybook-static/assets/collapsible.stories--Wc5W_LQ.js
│  1.56 kB │ gzip:   0.68 kB
│  storybook-static/assets/kbd.stories-BCAE0A-g.js
│  1.59 kB │ gzip:   0.74 kB
│  storybook-static/assets/preload-helper-0TbE23ZY.js
│  1.64 kB │ gzip:   0.87 kB
│  storybook-static/assets/dropdown-menu.stories-D49OEoJo.js
│  1.66 kB │ gzip:   0.70 kB
│  storybook-static/assets/chunk-IMSF75WX-mRJxbqao.js
│  1.67 kB │ gzip:   0.90 kB
│  storybook-static/assets/badge-B3Q-jtvj.js
│  1.73 kB │ gzip:   0.82 kB
│  storybook-static/assets/ThemeProvider-4_Xyiqq5.js
│  1.75 kB │ gzip:   0.95 kB
│  storybook-static/assets/alert-B0jXkKKh.js
│  1.78 kB │ gzip:   0.82 kB
│  storybook-static/assets/card-95wFGgDq.js
│  1.85 kB │ gzip:   0.62 kB
│  storybook-static/assets/dist-Cp023XQn.js
│  1.89 kB │ gzip:   0.83 kB
│  storybook-static/assets/dist-B0_5lTDF.js
│  1.90 kB │ gzip:   0.93 kB
│  storybook-static/assets/form.stories-BdTPOgKz.js
│  2.08 kB │ gzip:   0.98 kB
│  storybook-static/assets/sheet.stories-DJhTHyO3.js
│  2.09 kB │ gzip:   0.72 kB
│  storybook-static/assets/toggle-Bqk6sclz.js
│  2.29 kB │ gzip:   1.19 kB
│  storybook-static/assets/button-D2c_9SLl.js
│  2.29 kB │ gzip:   0.99 kB
│  storybook-static/assets/button-group.stories-kzy0_msE.js
│  2.35 kB │ gzip:   0.99 kB
│  storybook-static/assets/native-select.stories-ex9eOviq.js
│  2.55 kB │ gzip:   1.12 kB
│  storybook-static/assets/dist-Cq2hqxqm.js
│  2.83 kB │ gzip:   1.21 kB
│  storybook-static/assets/dist-D3CacQlx.js
│  2.85 kB │ gzip:   1.25 kB
│  storybook-static/assets/breadcrumb.stories-DWGxxlOg.js
│  2.93 kB │ gzip:   1.02 kB
│  storybook-static/assets/progress.stories-C39zBAS-.js
│  2.95 kB │ gzip:   1.43 kB
│  storybook-static/assets/empty.stories-DUf99nMG.js
│  3.16 kB │ gzip:   1.16 kB
│  storybook-static/assets/button.stories-BlAUE0sc.js
│  3.20 kB │ gzip:   1.18 kB
│  storybook-static/assets/dist-D_OpuV9i.js
│  3.30 kB │ gzip:   1.50 kB
│  storybook-static/assets/chunk-DRQKCCAG-PeJgrGxi.js
│  3.37 kB │ gzip:   1.40 kB
│  storybook-static/assets/pagination.stories-68zvIpsV.js
│  3.56 kB │ gzip:   1.19 kB
│  storybook-static/assets/sheet-DSdqGTO5.js
│  3.58 kB │ gzip:   1.18 kB
│  storybook-static/assets/dialog-DXsGNYZJ.js
│  3.60 kB │ gzip:   1.21 kB
│  storybook-static/assets/createLucideIcon-DTc4q1oi.js
│  3.66 kB │ gzip:   1.68 kB
│  storybook-static/assets/react-dom-qBXZUrFy.js
│  3.92 kB │ gzip:   1.44 kB
│  storybook-static/assets/input-group-BIEe3yAv.js
│  4.02 kB │ gzip:   1.41 kB
│  storybook-static/assets/table.stories-Drbat35k.js
│  4.34 kB │ gzip:   1.34 kB
│  storybook-static/assets/common.stories-BX5CRZ6T.js
│  4.36 kB │ gzip:   1.61 kB
│  storybook-static/assets/item.stories-D-yqEGI-.js
│  4.56 kB │ gzip:   1.76 kB
│  storybook-static/assets/layouts.stories-D9OcTS9e.js
│  4.69 kB │ gzip:   1.98 kB
│  storybook-static/assets/dist-C2PcoYQl.js
│  4.83 kB │ gzip:   2.10 kB
│  storybook-static/assets/dist-BtnfnuYA.js
│  5.09 kB │ gzip:   2.21 kB
│  storybook-static/assets/chunk-7PIQR4A3-BRrgxE8n.js
│  5.14 kB │ gzip:   1.93 kB
│  storybook-static/assets/field.stories-BcPiiY55.js
│  5.28 kB │ gzip:   1.86 kB
│  storybook-static/assets/switch-DPVChe7p.js
│  5.34 kB │ gzip:   2.23 kB
│  storybook-static/assets/checkbox-CEzcDVsg.js
│  5.36 kB │ gzip:   2.25 kB
│  storybook-static/assets/dist-DM7xvX2L.js
│  5.64 kB │ gzip:   2.03 kB
│  storybook-static/assets/dist-BPgTGWBw.js
│  5.65 kB │ gzip:   2.58 kB
│  storybook-static/assets/avatar.stories-CIwf17x0.js
│  5.77 kB │ gzip:   2.11 kB
│  storybook-static/assets/dist-DGExwuT-.js
│  5.85 kB │ gzip:   2.17 kB
│  storybook-static/assets/ClientBoundary.stories-Dcpx83yA.js
│  6.08 kB │ gzip:   2.65 kB
│  storybook-static/assets/toggle-group.stories-BOFLujKZ.js
│  6.40 kB │ gzip:   2.43 kB
│  storybook-static/assets/WorldHud.stories-JAD3FBrU.js
│  6.52 kB │ gzip:   2.59 kB
│  storybook-static/assets/hover-card.stories-fkuPRcKC.js
│  6.96 kB │ gzip:   2.62 kB
│  storybook-static/assets/dropdown-menu-BchuS8Fg.js
│  7.06 kB │ gzip:   2.41 kB
│  storybook-static/assets/tabs.stories-DnpO53zJ.js
│  7.26 kB │ gzip:   2.60 kB
│  storybook-static/assets/accordion.stories-cMQ9LZ8K.js
│  7.48 kB │ gzip:   2.78 kB
│  storybook-static/assets/context-menu.stories-1sao-aRf.js
│  7.54 kB │ gzip:   2.73 kB
│  storybook-static/assets/alert-dialog.stories-BIwNdgPe.js
│  7.58 kB │ gzip:   2.20 kB
│  storybook-static/assets/react-C7Icd8fu.js
│  7.90 kB │ gzip:   3.03 kB
│  storybook-static/assets/popover.stories-ax7OYovT.js
│  7.97 kB │ gzip:   3.03 kB
│  storybook-static/assets/radio-group.stories-Rbtvs54F.js
│  8.06 kB │ gzip:   3.17 kB
│  storybook-static/assets/Icons-BdTGl1wp.js
│  8.49 kB │ gzip:   2.17 kB
│  storybook-static/assets/dist-ZpFVeXSN.js
│  8.67 kB │ gzip:   3.04 kB
│  storybook-static/assets/form-field.stories-CApTagzS.js
│  8.70 kB │ gzip:   2.43 kB
│  storybook-static/assets/menubar.stories-Cpl1vnX6.js
│  10.15 kB │ gzip:   3.58 kB
│  storybook-static/assets/input-otp.stories-aKDGqvtW.js
│  12.75 kB │ gzip:   4.94 kB
│  storybook-static/assets/slider.stories-DMrVLFUF.js
│  13.05 kB │ gzip:   5.02 kB
│  storybook-static/assets/sidebar.stories-B6VgKdMq.js
│  13.42 kB │ gzip:   4.20 kB
│  storybook-static/assets/es2015-C53hGp5h.js
│  14.52 kB │ gzip:   5.58 kB
│  storybook-static/assets/dist-DRfj0K7B.js
│  14.59 kB │ gzip:   4.93 kB
│  storybook-static/assets/scroll-area.stories-DcE21ohZ.js
│  16.07 kB │ gzip:   5.16 kB
│  storybook-static/assets/command.stories-BvPZCyFV.js
│  16.58 kB │ gzip:   6.15 kB
│  storybook-static/assets/navigation-menu.stories-D56YLvic.js
│  19.89 kB │ gzip:   6.22 kB
│  storybook-static/assets/floating-ui.react-dom-BDsy8TX8.js
│  22.18 kB │ gzip:   8.65 kB
│  storybook-static/assets/chunk-W22LQPXL-DLbOLb-b.js
│  22.67 kB │ gzip:   7.55 kB
│  storybook-static/assets/carousel.stories-5m2uC8Tx.js
│  24.82 kB │ gzip:   9.57 kB
│  storybook-static/assets/select-BGMpPeXN.js
│  25.93 kB │ gzip:   8.67 kB
│  storybook-static/vite-inject-mocker-entry.js
│  27.81 kB │ gzip:   9.67 kB
│  storybook-static/assets/utils-DcZBOCDd.js
│  27.98 kB │ gzip:   8.99 kB
│  storybook-static/assets/matchers-JIUQ3HVY-DWxIgmlT.js
│  28.79 kB │ gzip:   9.68 kB
│  storybook-static/assets/hooks-B0OOjl1_.js
│  29.87 kB │ gzip:  12.61 kB
│  storybook-static/assets/Color-6AOWCN3U-BHliv8P4.js
│  30.40 kB │ gzip:  11.49 kB
│  storybook-static/assets/world-explorer-CaRsTSNZ.js
│  32.51 kB │ gzip:  11.79 kB
│  storybook-static/assets/WithTooltip-CDUNV5IS-PZG7aayt.js
│  32.72 kB │ gzip:  11.46 kB
│  storybook-static/assets/drawer.stories-B2GXrpZz.js
│  33.62 kB │ gzip:   9.89 kB
│  storybook-static/assets/sonner.stories-C6uZyasg.js
│  36.80 kB │ gzip:  10.65 kB
│  storybook-static/assets/form-TDM4j5Az.js
│  42.87 kB │ gzip:  14.86 kB
│  storybook-static/assets/resizable.stories-DPEz-nXm.js
│  46.11 kB │ gzip:  14.97 kB
│  storybook-static/assets/theming-K8zzODLs.js
│  55.39 kB │ gzip:  21.34 kB
│  storybook-static/assets/esm-C2oGAgJS.js
│  57.43 kB │ gzip:  16.68 kB
│  storybook-static/assets/WorldExplorerClient-D3VX7W_X.js
│  72.02 kB │ gzip:  26.46 kB
│  storybook-static/assets/syntaxhighlighter-4REYKNEV-BMUJTQLL.js
│  75.83 kB │ gzip:  27.23 kB
│  storybook-static/assets/calendar.stories-D4SJ_MSG.js
│  80.74 kB │ gzip:  23.91 kB
│  storybook-static/assets/schemas-BlgLiO46.js
│  95.33 kB │ gzip:  27.28 kB
│  storybook-static/assets/combobox.stories-DL8-2_tP.js
│  122.40 kB │ gzip:  42.53 kB
│  storybook-static/assets/utilities.stories-DhtHJ4-L.js
│  153.35 kB │ gzip:  50.64 kB
│  storybook-static/assets/DocsRenderer-JROSPFPF-BGvrobzq.js
│  191.34 kB │ gzip:  60.31 kB
│  storybook-static/assets/react-18-mQvaX4pw.js
│  208.00 kB │ gzip:  65.28 kB
│  storybook-static/assets/chart.stories-BIrIcgWw.js
│  394.71 kB │ gzip: 116.73 kB
│  storybook-static/assets/components-CJRtydrz.js
│  556.90 kB │ gzip: 176.49 kB
│  storybook-static/assets/WorldHud-B2zhfflA.js
│  650.07 kB │ gzip: 171.29 kB
│  storybook-static/assets/axe-C7pk9Kxd.js
│  659.32 kB │ gzip: 187.87 kB
│  storybook-static/assets/iframe--75BzT8L.js
│  1,359.53 kB │ gzip: 389.24 kB

│  Vite ✓ built in 16.71s
│
▲  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 13.8s of this 16.4s
│  build (84%).
│  The slowest callbacks, timed inside each callback (the wait before a
│  callback starts is excluded, the time it awaits is included):
│  - plugin storybook:react-docgen-plugin transform (38%, 6.2s, 4809
│  calls)
│  Additional callback time came from the callbacks below and from
│  callbacks under 1s.
│  3 callbacks are listed without a time. Their calls overlapped, so the
│  time inside one call includes work from other calls. To find their
│  cost, profile the build with `node --cpu-prof`:
│  - plugin vite-plugin-storybook-nextjs-swc transform (4809 calls)
│  - plugin plugin-csf transform (4809 calls)
│  - plugin vite:css transform (3 calls)
│  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
│  for more details.

│
◇  Output directory:
│  /home/hatch/workspace/danang-simulation-work/danang-simulation-main/storybook-static
│
└  Storybook build completed successfully
```

## build-storybook.txt

- Original file: `build-storybook.txt`
- Original size: 15139 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:15909) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ storybook build
(node:15940) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

┌  Building storybook v10.6.7
(node:15940) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
│
◇  Cleaning outputDir: storybook-static
│
◇  Loading presets
│
◇  Building manager..
│
●  Building open services..
│
●  Building preview..
│
●  Copying static files: public at storybook-static
│  Vite vite v8.3.4 building client environment for production...
(node:15940) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
transforming...
✓ 4809 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  20.50 kB │ gzip:   5.60 kB
│  storybook-static/assets/world-explorer-BqispFX7.css
│  20.87 kB │ gzip:   4.92 kB
│  storybook-static/assets/iframe-BaSE0WOI.css
│  206.47 kB │ gzip:  30.87 kB
│  storybook-static/assets/iframe-B191p8nA.js
│  0.04 kB │ gzip:   0.06 kB
│  storybook-static/assets/dist-BpWrIoGY.js
│  0.22 kB │ gzip:   0.19 kB
│  storybook-static/assets/chunk-242VQQM5-CJ9i1iaj.js
│  0.24 kB │ gzip:   0.20 kB
│  storybook-static/assets/dist-Bgc6TXR4.js
│  0.24 kB │ gzip:   0.21 kB
│  storybook-static/assets/check-C4l0qdMD.js
│  0.26 kB │ gzip:   0.23 kB
│  storybook-static/assets/chevron-down-Db-YoaoO.js
│  0.27 kB │ gzip:   0.22 kB
│  storybook-static/assets/chevron-left-Cd9RGiHq.js
│  0.27 kB │ gzip:   0.23 kB
│  storybook-static/assets/chevron-right-D1L19B_Q.js
│  0.27 kB │ gzip:   0.23 kB
│  storybook-static/assets/x-B1sqVEY7.js
│  0.29 kB │ gzip:   0.24 kB
│  storybook-static/assets/formatter-L2YTDE3Q-DqPs7d2n.js
│  0.30 kB │ gzip:   0.24 kB
│  storybook-static/assets/loader-circle-CSUbcJrl.js
│  0.31 kB │ gzip:   0.25 kB
│  storybook-static/assets/search-B43BJUb4.js
│  0.31 kB │ gzip:   0.25 kB
│  storybook-static/assets/chunk-QQBDHPVZ-BJU3Mk0_.js
│  0.32 kB │ gzip:   0.19 kB
│  storybook-static/assets/skeleton-Cb3RZSCi.js
│  0.34 kB │ gzip:   0.25 kB
│  storybook-static/assets/info-CSIANWNH.js
│  0.34 kB │ gzip:   0.26 kB
│  storybook-static/assets/dist-BOqIPbtB.js
│  0.42 kB │ gzip:   0.31 kB
│  storybook-static/assets/use-mobile-BB6e8wyp.js
│  0.42 kB │ gzip:   0.29 kB
│  storybook-static/assets/inbox-CbvC1Bd7.js
│  0.43 kB │ gzip:   0.32 kB
│  storybook-static/assets/jsx-runtime-BxfXuubT.js
│  0.43 kB │ gzip:   0.30 kB
│  storybook-static/assets/dist-C9t7Cshp.js
│  0.44 kB │ gzip:   0.32 kB
│  storybook-static/assets/WorldExplorerClient.stories-DNqVih0o.js
│  0.45 kB │ gzip:   0.30 kB
│  storybook-static/assets/dist-P5aEaGBE.js
│  0.49 kB │ gzip:   0.33 kB
│  storybook-static/assets/ThemeProvider-DKYqQFyE.js
│  0.52 kB │ gzip:   0.33 kB
│  storybook-static/assets/react-CubzI6CK.js
│  0.58 kB │ gzip:   0.34 kB
│  storybook-static/assets/dist-BDazaY1u.js
│  0.64 kB │ gzip:   0.43 kB
│  storybook-static/assets/textarea.stories-D-6zsk9y.js
│  0.65 kB │ gzip:   0.38 kB
│  storybook-static/assets/chunk-UAWMPV5J-Dsq9DvcU.js
│  0.74 kB │ gzip:   0.45 kB
│  storybook-static/assets/dist-BNjw8BE7.js
│  0.75 kB │ gzip:   0.45 kB
│  storybook-static/assets/textarea-vwwm3XwJ.js
│  0.76 kB │ gzip:   0.45 kB
│  storybook-static/assets/enum-CwrLEL0d.js
│  0.78 kB │ gzip:   0.45 kB
│  storybook-static/assets/toggle.stories-BxQ6Xd-M.js
│  0.78 kB │ gzip:   0.44 kB
│  storybook-static/assets/Icons.stories-D3mNpMnW.js
│  0.80 kB │ gzip:   0.50 kB
│  storybook-static/assets/checkbox.stories-B3Mz1vpZ.js
│  0.80 kB │ gzip:   0.37 kB
│  storybook-static/assets/label.stories-B7khtkkP.js
│  0.82 kB │ gzip:   0.48 kB
│  storybook-static/assets/dist-Ch4r59Bc.js
│  0.85 kB │ gzip:   0.50 kB
│  storybook-static/assets/dist-B0agaa99.js
│  0.85 kB │ gzip:   0.54 kB
│  storybook-static/assets/shim-C5Xie9xJ.js
│  0.85 kB │ gzip:   0.46 kB
│  storybook-static/assets/tooltip.stories-C1cHl1Gu.js
│  0.86 kB │ gzip:   0.48 kB
│  storybook-static/assets/spinner.stories-BbO4ZAVA.js
│  0.87 kB │ gzip:   0.47 kB
│  storybook-static/assets/ImageryInspector.stories-DCSU8H3x.js
│  0.89 kB │ gzip:   0.49 kB
│  storybook-static/assets/skeleton.stories-ClZ8kcXp.js
│  0.92 kB │ gzip:   0.46 kB
│  storybook-static/assets/with-selector-yh4Qcx8N.js
│  0.94 kB │ gzip:   0.53 kB
│  storybook-static/assets/input-BxoT0O8d.js
│  0.95 kB │ gzip:   0.51 kB
│  storybook-static/assets/label-Z8kZMf1B.js
│  0.98 kB │ gzip:   0.58 kB
│  storybook-static/assets/switch.stories-BArh8Zn1.js
│  1.01 kB │ gzip:   0.54 kB
│  storybook-static/assets/dist-r86zl3cz.js
│  1.03 kB │ gzip:   0.55 kB
│  storybook-static/assets/StatusBadge.stories-qnbazIQq.js
│  1.09 kB │ gzip:   0.60 kB
│  storybook-static/assets/separator-CJFqtCn_.js
│  1.17 kB │ gzip:   0.61 kB
│  storybook-static/assets/input.stories-C2PPrs4p.js
│  1.18 kB │ gzip:   0.53 kB
│  storybook-static/assets/select.stories-CHI76FHW.js
│  1.20 kB │ gzip:   0.60 kB
│  storybook-static/assets/separator.stories-C6Vyb7Cy.js
│  1.25 kB │ gzip:   0.55 kB
│  storybook-static/assets/rolldown-runtime-2s6bX4vc.js
│  1.26 kB │ gzip:   0.69 kB
│  storybook-static/assets/collapsible.stories-B1rCFJOa.js
│  1.34 kB │ gzip:   0.63 kB
│  storybook-static/assets/input-group.stories-DFm6t-1E.js
│  1.34 kB │ gzip:   0.55 kB
│  storybook-static/assets/card-B_Q_BIDu.js
│  1.37 kB │ gzip:   0.53 kB
│  storybook-static/assets/card.stories-C310OLja.js
│  1.40 kB │ gzip:   0.65 kB
│  storybook-static/assets/badge.stories-DH9j04TB.js
│  1.43 kB │ gzip:   0.66 kB
│  storybook-static/assets/kbd.stories-6EIhy1Fi.js
│  1.46 kB │ gzip:   0.69 kB
│  storybook-static/assets/dialog.stories-D7rszhN8.js
│  1.46 kB │ gzip:   0.66 kB
│  storybook-static/assets/aspect-ratio.stories-DY-NxRyF.js
│  1.48 kB │ gzip:   0.78 kB
│  storybook-static/assets/badge-Dh_cQJEl.js
│  1.49 kB │ gzip:   0.70 kB
│  storybook-static/assets/alert.stories-CqZMGKkJ.js
│  1.54 kB │ gzip:   0.65 kB
│  storybook-static/assets/alert-BT4I7lva.js
│  1.58 kB │ gzip:   0.77 kB
│  storybook-static/assets/preload-helper-0TbE23ZY.js
│  1.64 kB │ gzip:   0.87 kB
│  storybook-static/assets/dropdown-menu.stories-Bt8Keck4.js
│  1.66 kB │ gzip:   0.70 kB
│  storybook-static/assets/chunk-IMSF75WX-mRJxbqao.js
│  1.67 kB │ gzip:   0.90 kB
│  storybook-static/assets/dist-Cp023XQn.js
│  1.89 kB │ gzip:   0.83 kB
│  storybook-static/assets/dist-B0_5lTDF.js
│  1.90 kB │ gzip:   0.93 kB
│  storybook-static/assets/button-D6lByyzp.js
│  1.99 kB │ gzip:   0.87 kB
│  storybook-static/assets/form.stories-DBqQpyT5.js
│  2.08 kB │ gzip:   0.98 kB
│  storybook-static/assets/button-group.stories-mN1NN1pd.js
│  2.09 kB │ gzip:   0.90 kB
│  storybook-static/assets/sheet.stories-xyawwZ7k.js
│  2.09 kB │ gzip:   0.72 kB
│  storybook-static/assets/native-select.stories-CK72UBnq.js
│  2.20 kB │ gzip:   0.98 kB
│  storybook-static/assets/toggle-xyBEO0tJ.js
│  2.23 kB │ gzip:   1.15 kB
│  storybook-static/assets/breadcrumb.stories-B60gs5Zl.js
│  2.38 kB │ gzip:   0.88 kB
│  storybook-static/assets/empty.stories-Dwk9p_lE.js
│  2.68 kB │ gzip:   1.06 kB
│  storybook-static/assets/sheet-C9c7w9O6.js
│  2.70 kB │ gzip:   0.96 kB
│  storybook-static/assets/dialog-BVfy-1Uv.js
│  2.73 kB │ gzip:   1.04 kB
│  storybook-static/assets/dist-Cq2hqxqm.js
│  2.83 kB │ gzip:   1.21 kB
│  storybook-static/assets/dist-D3CacQlx.js
│  2.85 kB │ gzip:   1.25 kB
│  storybook-static/assets/progress.stories-BQ-xUEKR.js
│  2.88 kB │ gzip:   1.39 kB
│  storybook-static/assets/pagination.stories-ymmEDdDw.js
│  3.19 kB │ gzip:   1.17 kB
│  storybook-static/assets/button.stories-D8h0jJKz.js
│  3.20 kB │ gzip:   1.18 kB
│  storybook-static/assets/dist-D_OpuV9i.js
│  3.30 kB │ gzip:   1.50 kB
│  storybook-static/assets/chunk-DRQKCCAG-PeJgrGxi.js
│  3.37 kB │ gzip:   1.40 kB
│  storybook-static/assets/input-group-Dfow0zX6.js
│  3.39 kB │ gzip:   1.26 kB
│  storybook-static/assets/common.stories-CzavCDTI.js
│  3.53 kB │ gzip:   1.46 kB
│  storybook-static/assets/createLucideIcon-DTc4q1oi.js
│  3.66 kB │ gzip:   1.68 kB
│  storybook-static/assets/table.stories-2_pBIDMb.js
│  3.80 kB │ gzip:   1.25 kB
│  storybook-static/assets/item.stories-DFbhpR30.js
│  3.83 kB │ gzip:   1.61 kB
│  storybook-static/assets/react-dom-qBXZUrFy.js
│  3.92 kB │ gzip:   1.44 kB
│  storybook-static/assets/layouts.stories-BgvsZYej.js
│  3.94 kB │ gzip:   1.72 kB
│  storybook-static/assets/field.stories-C0SS4NC7.js
│  4.45 kB │ gzip:   1.63 kB
│  storybook-static/assets/dist-C2PcoYQl.js
│  4.83 kB │ gzip:   2.10 kB
│  storybook-static/assets/switch-gwxtLajo.js
│  5.07 kB │ gzip:   2.10 kB
│  storybook-static/assets/dist-BtnfnuYA.js
│  5.09 kB │ gzip:   2.21 kB
│  storybook-static/assets/chunk-7PIQR4A3-BRrgxE8n.js
│  5.14 kB │ gzip:   1.93 kB
│  storybook-static/assets/avatar.stories-BywS8Fzs.js
│  5.17 kB │ gzip:   1.94 kB
│  storybook-static/assets/checkbox-CuNQLyH-.js
│  5.29 kB │ gzip:   2.21 kB
│  storybook-static/assets/form-field.stories-s0UgqQiW.js
│  5.62 kB │ gzip:   2.02 kB
│  storybook-static/assets/dist-DM7xvX2L.js
│  5.64 kB │ gzip:   2.03 kB
│  storybook-static/assets/dist-BPgTGWBw.js
│  5.65 kB │ gzip:   2.58 kB
│  storybook-static/assets/dist-DGExwuT-.js
│  5.85 kB │ gzip:   2.17 kB
│  storybook-static/assets/dropdown-menu-DYBeeSxQ.js
│  5.89 kB │ gzip:   2.12 kB
│  storybook-static/assets/ClientBoundary.stories-CsrQXrtQ.js
│  6.00 kB │ gzip:   2.60 kB
│  storybook-static/assets/toggle-group.stories-C0oB8Ijo.js
│  6.16 kB │ gzip:   2.33 kB
│  storybook-static/assets/alert-dialog.stories-Cf2tvcxR.js
│  6.27 kB │ gzip:   1.97 kB
│  storybook-static/assets/WorldHud.stories-BvgYVD8j.js
│  6.52 kB │ gzip:   2.59 kB
│  storybook-static/assets/hover-card.stories-a6-N3rSh.js
│  6.61 kB │ gzip:   2.52 kB
│  storybook-static/assets/context-menu.stories-CcgelUpo.js
│  6.66 kB │ gzip:   2.48 kB
│  storybook-static/assets/tabs.stories-BcAd2G_s.js
│  6.83 kB │ gzip:   2.49 kB
│  storybook-static/assets/accordion.stories-DTmW4xWK.js
│  7.20 kB │ gzip:   2.71 kB
│  storybook-static/assets/popover.stories-Cocht3Kn.js
│  7.62 kB │ gzip:   2.93 kB
│  storybook-static/assets/react-C7Icd8fu.js
│  7.90 kB │ gzip:   3.03 kB
│  storybook-static/assets/radio-group.stories-BFb3qG_M.js
│  8.08 kB │ gzip:   3.21 kB
│  storybook-static/assets/Icons-BdTGl1wp.js
│  8.49 kB │ gzip:   2.17 kB
│  storybook-static/assets/dist-ZpFVeXSN.js
│  8.67 kB │ gzip:   3.04 kB
│  storybook-static/assets/menubar.stories-DQq49aEy.js
│  8.95 kB │ gzip:   3.27 kB
│  storybook-static/assets/dist-Shf9mcsH.js
│  10.06 kB │ gzip:   3.79 kB
│  storybook-static/assets/sidebar.stories-CdHgkpPh.js
│  10.91 kB │ gzip:   3.73 kB
│  storybook-static/assets/input-otp.stories-BNZe0DaU.js
│  12.32 kB │ gzip:   4.83 kB
│  storybook-static/assets/slider.stories-BBSqSe9o.js
│  12.87 kB │ gzip:   4.94 kB
│  storybook-static/assets/es2015-C53hGp5h.js
│  14.52 kB │ gzip:   5.58 kB
│  storybook-static/assets/scroll-area.stories-Br6zA_BO.js
│  15.85 kB │ gzip:   5.08 kB
│  storybook-static/assets/command.stories-Ccvrovv0.js
│  16.01 kB │ gzip:   6.05 kB
│  storybook-static/assets/navigation-menu.stories-Ct5ab4wm.js
│  19.24 kB │ gzip:   6.08 kB
│  storybook-static/assets/floating-ui.react-dom-BDsy8TX8.js
│  22.18 kB │ gzip:   8.65 kB
│  storybook-static/assets/chunk-W22LQPXL-DLbOLb-b.js
│  22.67 kB │ gzip:   7.55 kB
│  storybook-static/assets/carousel.stories-D8atIufz.js
│  23.53 kB │ gzip:   9.26 kB
│  storybook-static/assets/select-Dw-xRVdo.js
│  24.93 kB │ gzip:   8.45 kB
│  storybook-static/vite-inject-mocker-entry.js
│  27.81 kB │ gzip:   9.67 kB
│  storybook-static/assets/utils-DcZBOCDd.js
│  27.98 kB │ gzip:   8.99 kB
│  storybook-static/assets/matchers-JIUQ3HVY-DWxIgmlT.js
│  28.79 kB │ gzip:   9.68 kB
│  storybook-static/assets/hooks-B3sFK8hR.js
│  29.59 kB │ gzip:  12.46 kB
│  storybook-static/assets/Color-6AOWCN3U-Drme6BgZ.js
│  30.40 kB │ gzip:  11.49 kB
│  storybook-static/assets/world-explorer-CrMDim5c.js
│  32.12 kB │ gzip:  11.67 kB
│  storybook-static/assets/WithTooltip-CDUNV5IS-PZG7aayt.js
│  32.72 kB │ gzip:  11.46 kB
│  storybook-static/assets/drawer.stories-gF9eTK10.js
│  32.91 kB │ gzip:   9.79 kB
│  storybook-static/assets/sonner.stories-gfGb_RXK.js
│  36.73 kB │ gzip:  10.61 kB
│  storybook-static/assets/form-DlWMOFtV.js
│  42.45 kB │ gzip:  14.78 kB
│  storybook-static/assets/resizable.stories-Dx19ULYx.js
│  45.81 kB │ gzip:  14.88 kB
│  storybook-static/assets/theming-K8zzODLs.js
│  55.39 kB │ gzip:  21.34 kB
│  storybook-static/assets/esm-C2oGAgJS.js
│  57.43 kB │ gzip:  16.68 kB
│  storybook-static/assets/WorldExplorerClient-DZTUe8fl.js
│  71.97 kB │ gzip:  26.43 kB
│  storybook-static/assets/syntaxhighlighter-4REYKNEV-BMUJTQLL.js
│  75.83 kB │ gzip:  27.23 kB
│  storybook-static/assets/calendar.stories-B52Sk5h1.js
│  80.26 kB │ gzip:  23.75 kB
│  storybook-static/assets/schemas-BlgLiO46.js
│  95.33 kB │ gzip:  27.28 kB
│  storybook-static/assets/combobox.stories-Dpl1ZDEb.js
│  120.69 kB │ gzip:  42.17 kB
│  storybook-static/assets/utilities.stories-CZ9VvnTZ.js
│  151.55 kB │ gzip:  50.12 kB
│  storybook-static/assets/DocsRenderer-JROSPFPF-0fi25JiD.js
│  191.34 kB │ gzip:  60.31 kB
│  storybook-static/assets/react-18-mQvaX4pw.js
│  208.00 kB │ gzip:  65.28 kB
│  storybook-static/assets/chart.stories-Ov9urPvp.js
│  391.45 kB │ gzip: 116.16 kB
│  storybook-static/assets/components-BqGXEN9v.js
│  556.90 kB │ gzip: 176.49 kB
│  storybook-static/assets/WorldHud-BuU0tFyl.js
│  647.55 kB │ gzip: 170.97 kB
│  storybook-static/assets/axe-C7pk9Kxd.js
│  659.32 kB │ gzip: 187.87 kB
│  storybook-static/assets/iframe-ClVGniNy.js
│  1,359.04 kB │ gzip: 389.18 kB

│  Vite ✓ built in 12.85s
│
◇  Output directory:
│  /home/hatch/workspace/danang-simulation-work/danang-simulation-main/storybook-static
│
└  Storybook build completed successfully
```

## build.txt

- Original file: `build.txt`
- Original size: 2632 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:13957) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ next build
(node:13985) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
▲ Next.js 16.4.6 (Turbopack)
- Environments: .env.local
✓ Running next.config.ts took 475ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
(node:14021) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:14034) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
✓ Compiled successfully in 29.0s
  Running TypeScript ...
(node:14089) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
  Finished TypeScript in 5.6s ...
  Collecting page data using 3 workers ...
(node:14142) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:14141) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:14140) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
  Generating static pages using 3 workers (0/14) ...
  Generating static pages using 3 workers (3/14) 
  Generating static pages using 3 workers (6/14) 
  Generating static pages using 3 workers (10/14) 
✓ Generating static pages using 3 workers (14/14) in 1382ms
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

## format.txt

- Original file: `format.txt`
- Original size: 419 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:16942) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ biome format .
Checked 405 files in 307ms. No fixes applied.
(node:16971) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## lint.txt

- Original file: `lint.txt`
- Original size: 418 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:16190) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ biome lint .
Checked 406 files in 1074ms. No fixes applied.
(node:16219) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## redirect-probe.txt

- Original file: `redirect-probe.txt`
- Original size: 1425 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
# Standalone redirect probe — phase-14 completion, 2026-11-19
# Production build: Next 16.4.6, next-intl 4.15.1, Node 22.23.5.
# Server: node .next/standalone/server.js, HOSTNAME as listed, PORT 3193/3194.
# Method: curl -s -o /dev/null -w "%{http_code} loc:%{redirect_url}" per path;
# "/" also followed with -L --max-redirs 5.

## HOSTNAME=127.0.0.1 — FAIL (unchanged after Next/next-intl upgrade)
/ 307 loc:http://127.0.0.1:3193/        (follow -L: 307 after 5 redirects)
/en 307 loc:http://127.0.0.1:3193/
/vi 200
/health 307 loc:http://127.0.0.1:3193/health
/en/health 307 loc:http://127.0.0.1:3193/health

## HOSTNAME=localhost — PASS (retest; one earlier run returned 000 for all
## paths due to a transient server-start race, retest gave 200)
/ 200
/health 200

## HOSTNAME=0.0.0.0 — PASS
/ 200
/en 307 loc:http://127.0.0.1:3193/   (single correct strip of the default-locale prefix)
/vi 200
/health 200
/en/health 307 loc:http://127.0.0.1:3193/health

## Interpretation
Root cause is upstream Next.js issue #94745: middleware rewrites are
network-proxied when the standalone server binds 127.0.0.1, because
NextURL normalises loopback hostnames to localhost and the rewritten
request re-enters the next-intl middleware. Next 16.4.6 (latest stable
2026-11-09) does not fix it. Docker already binds HOSTNAME=0.0.0.0 and
is unaffected. Workaround documented in README: bind localhost or
0.0.0.0, not 127.0.0.1.
```

## test-coverage-before-timeout-fix.txt

- Original file: `test-coverage-before-timeout-fix.txt`
- Original size: 18060 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:11192) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ vitest run --coverage --maxWorkers=2
(node:11224) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

[1m[30m[46m RUN [49m[39m[22m [36mv5.0.5 [39m[90m/home/hatch/workspace/danang-simulation-work/danang-simulation-main[39m
      [2mCoverage enabled with [22m[33mv8[39m

(node:11254) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11255) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 682[2mms[22m[39m
   [32m✓[39m imagery canvas lifecycle [2m(1)[22m
     [33m[2m✓[22m[39m IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates[33m 677[2mms[22m[39m
(node:11274) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx [2m([22m[2m4 tests[22m[2m)[22m[33m 655[2mms[22m[39m
   [32m✓[39m runtime retry lifecycle [2m(4)[22m
     [33m[2m✓[22m[39m ignores callbacks from the disposed Strict Mode mount within the same generation[33m 351[2mms[22m[39m
(node:11293) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 510[2mms[22m[39m
   [32m✓[39m imagery inspector [2m(3)[22m
     [33m[2m✓[22m[39m IMG-41/42/43/44 toggles an honest fixture footprint without network or a WebGL canvas[33m 401[2mms[22m[39m
(node:11310) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [31m❯[39m src/modules/WorldExplorer/__tests__/world.test.ts [2m([22m[2m3 tests[22m[2m | [22m[31m1 failed[39m[2m)[22m[33m 7684[2mms[22m[39m
   [31m❯[39m scene composition and browser runtime [2m(3)[22m
     [33m[2m✓[22m[39m preserves synthetic fixtures, shared rocks, character, grass, and owned resource disposal[33m 591[2mms[22m[39m
[31m     [31m×[31m owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources[39m[33m 6510[2mms[22m[39m
     [33m[2m✓[22m[39m keeps Mini Map failure unavailable while restoring scene visibility[33m 577[2mms[22m[39m
(node:11322) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/providers/__tests__/ThemeProvider.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 435[2mms[22m[39m
   [32m✓[39m ThemeProvider [2m(5)[22m
     [33m[2m✓[22m[39m persists an explicit choice and applies the dark class[33m 326[2mms[22m[39m
(node:11334) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 895[2mms[22m[39m
   [32m✓[39m HUD button semantics [2m(5)[22m
     [33m[2m✓[22m[39m preserves the Phase 10 FPS, frame time, and checks chips in compact diagnostics[33m 565[2mms[22m[39m
(node:11351) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/controls/__tests__/events.test.ts [2m([22m[2m12 tests[22m[2m)[22m[33m 507[2mms[22m[39m
   [32m✓[39m input lifecycle [2m(12)[22m
     [33m[2m✓[22m[39m IMG-48 skips capture on a locked second click and releases mouse drag on blur[33m 376[2mms[22m[39m
(node:11363) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/ui/__tests__/button.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 404[2mms[22m[39m
   [32m✓[39m Button [2m(2)[22m
     [33m[2m✓[22m[39m renders a native button by default[33m 380[2mms[22m[39m
(node:11375) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-state.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 399[2mms[22m[39m
[90mstdout[2m | src/modules/WorldExplorer/__tests__/geospatial.test.tsx[2m > [22m[2mread-only geographic integration[2m > [22m[2mGEO-01–16 execute and retain measured residual evidence
[22m[39mGEO-01: PASS Anchor residual 0 m
GEO-02: PASS World origin residual 6.780130685568339e-9 m
GEO-03: PASS EPSG golden residual 0.0030970181388314585 m; threshold 0.01 m
GEO-04: PASS ECEF/ENU residual 2.0372681319713593e-10 m
GEO-05: PASS ENU 1,2,3 = World 1,3,-2
GEO-06: PASS East X=10.700537735483234 m
GEO-07: PASS North Z=-11.065924930947537 m
GEO-08: PASS Up Y=10.00000000020203 m
GEO-09: PASS N/E/S/W heading/yaw round-trip
GEO-10: PASS East right; North up; marker heading consistent
GEO-11: PASS Maximum world residual 9.18977803700484e-9 m; threshold 0.01 m; 175 points within 5km
GEO-12: PASS 5/5 invalid coordinates rejected
GEO-13: PASS Date line canonical longitude -180 degrees
GEO-14: PASS Pole height residual 0 m
GEO-15: PASS WGS84_ELLIPSOID; 0m reference assumption; not measured terrain elevation
GEO-16: PASS 9/9 historical diagnostics pass

(node:11393) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/geospatial.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[32m 54[2mms[22m[39m
(node:11405) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/geodata/__tests__/overpass.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 121[2mms[22m[39m
(node:11417) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/imagery/__tests__/alignment.test.ts [2m([22m[2m36 tests[22m[2m)[22m[32m 121[2mms[22m[39m
(node:11429) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/renderer/__tests__/webgl.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 66[2mms[22m[39m
(node:11446) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useTranslations.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 63[2mms[22m[39m
(node:11458) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/weather.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 98[2mms[22m[39m
(node:11470) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useDebounce.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 84[2mms[22m[39m
(node:11482) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/interceptors.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 25[2mms[22m[39m
(node:11499) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useToggle.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 29[2mms[22m[39m
(node:11511) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/snapshot.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 80[2mms[22m[39m
(node:11523) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-preview.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 179[2mms[22m[39m
(node:11540) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/character/__tests__/controller.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 61[2mms[22m[39m
(node:11552) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstdout[2m | src/engine/geospatial/__tests__/core.test.ts[2m > [22m[2mPhase 12 pure geographic core[2m > [22m[2mGEO-11 retains millimeter through 5km offsets with <=0.01m numerical residual
[22m[39mGEO-11 maximum world residual: 9.18977803700484e-9 m; threshold 0.01 m

 [32m✓[39m src/engine/geospatial/__tests__/core.test.ts [2m([22m[2m18 tests[22m[2m)[22m[32m 79[2mms[22m[39m
(node:11564) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/phase-regression.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 73[2mms[22m[39m
(node:11576) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/health/__tests__/route.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 20[2mms[22m[39m
(node:11593) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/object.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 11[2mms[22m[39m
(node:11605) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/date.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32m✓[39m src/world-core/registries/__tests__/imagery.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 83[2mms[22m[39m
(node:11621) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11627) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/core/__tests__/runtime.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 16[2mms[22m[39m
(node:11646) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/data-sources.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 78[2mms[22m[39m
(node:11658) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstderr[2m | src/world-core/__tests__/prefabs.test.ts[2m > [22m[2mPrefab composition and ownership[2m > [22m[2mshares geometry/material across independent transforms, metadata and zones
[22m[39mTHREE.Material: parameter 'map' has value of undefined.

 [32m✓[39m src/world-core/__tests__/prefabs.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 72[2mms[22m[39m
 [32m✓[39m src/messages/__tests__/messages.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 64[2mms[22m[39m
(node:11670) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11682) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/number.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 34[2mms[22m[39m
 [32m✓[39m src/integrations/weather/__tests__/route.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 16[2mms[22m[39m
(node:11699) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11711) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/decimal.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m src/engine/interactions/__tests__/registry.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 13[2mms[22m[39m
(node:11723) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11735) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/api-error.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 13[2mms[22m[39m
 [32m✓[39m src/api/__tests__/backend.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 59[2mms[22m[39m
(node:11752) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11764) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/lib/__tests__/seo.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m src/i18n/__tests__/request.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:11776) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:11787) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/string.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32m✓[39m src/hooks/__tests__/useTranslations.types.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m

[31m⎯⎯⎯⎯⎯⎯⎯[39m[1m[41m Failed Tests 1 [49m[22m[31m⎯⎯⎯⎯⎯⎯⎯[39m

[41m[1m FAIL [22m[49m src/modules/WorldExplorer/__tests__/world.test.ts[2m > [22mscene composition and browser runtime[2m > [22mowns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources
[31m[1mError[22m: Test timed out in 5000ms.
If this is a long-running test, pass a timeout value as the last argument or configure it globally with "testTimeout".[39m
[36m [2m❯[22m src/modules/WorldExplorer/__tests__/world.test.ts:[2m57:3[22m[39m
    [90m 55|[39m     expect(rocks[0].parent).toBeNull();
    [90m 56|[39m   });
    [90m 57|[39m   it('owns one loop, resizes camera, clears input on hidden context, a…
    [90m   |[39m   [31m^[39m
    [90m 58|[39m     canvasContext();
    [90m 59|[39m     const queue = new Map<number, FrameRequestCallback>();

[31m[2m⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/1]⎯[22m[39m


[2m Test Files [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m40 passed[39m[22m[90m (41)[39m
[2m      Tests [22m [1m[31m1 failed[39m[22m[2m | [22m[1m[32m235 passed[39m[22m[90m (236)[39m
[2m   Start at [22m 09:27:40
[2m   Duration [22m 62.33s[2m (environment 58%, setup 18%, tests 13%, import 7%, worker 3%, transform 1%)[22m

[2mEnvironment [22m [33mjsdom was created 41 times[39m[2m · 59.81s total, 58% of tracked time[22m
[2m            [22m [2mcreate it once per worker with [22m[33mpool: 'vmThreads'[39m[2m (keeps per-file isolation) or [22m[33misolate: false[39m[2m (shares it across files)[22m
[2m            [22m [2mlearn more: https://vitest.dev/guide/improving-performance#test-environments[22m

[ELIFECYCLE] Command failed with exit code 1.
```

## test-coverage.txt

- Original file: `test-coverage.txt`
- Original size: 32802 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:15281) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ vitest run --coverage --maxWorkers=2
(node:15313) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

[1m[30m[46m RUN [49m[39m[22m [36mv5.0.5 [39m[90m/home/hatch/workspace/danang-simulation-work/danang-simulation-main[39m
      [2mCoverage enabled with [22m[33mv8[39m

(node:15344) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:15343) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx [2m([22m[2m4 tests[22m[2m)[22m[33m 700[2mms[22m[39m
   [32m✓[39m runtime retry lifecycle [2m(4)[22m
     [33m[2m✓[22m[39m ignores callbacks from the disposed Strict Mode mount within the same generation[33m 454[2mms[22m[39m
(node:15368) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 588[2mms[22m[39m
   [32m✓[39m HUD button semantics [2m(5)[22m
     [33m[2m✓[22m[39m preserves the Phase 10 FPS, frame time, and checks chips in compact diagnostics[33m 312[2mms[22m[39m
(node:15380) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/world.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 7615[2mms[22m[39m
   [32m✓[39m scene composition and browser runtime [2m(3)[22m
     [33m[2m✓[22m[39m preserves synthetic fixtures, shared rocks, character, grass, and owned resource disposal[33m 690[2mms[22m[39m
     [33m[2m✓[22m[39m owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources[33m 6427[2mms[22m[39m
     [33m[2m✓[22m[39m keeps Mini Map failure unavailable while restoring scene visibility[33m 491[2mms[22m[39m
(node:15397) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/providers/__tests__/ThemeProvider.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 529[2mms[22m[39m
   [32m✓[39m ThemeProvider [2m(5)[22m
     [33m[2m✓[22m[39m persists an explicit choice and applies the dark class[33m 403[2mms[22m[39m
(node:15409) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 698[2mms[22m[39m
   [32m✓[39m imagery canvas lifecycle [2m(1)[22m
     [33m[2m✓[22m[39m IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates[33m 692[2mms[22m[39m
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 592[2mms[22m[39m
   [32m✓[39m imagery inspector [2m(3)[22m
     [33m[2m✓[22m[39m IMG-41/42/43/44 toggles an honest fixture footprint without network or a WebGL canvas[33m 495[2mms[22m[39m
(node:15426) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:15438) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/controls/__tests__/events.test.ts [2m([22m[2m12 tests[22m[2m)[22m[33m 420[2mms[22m[39m
 [32m✓[39m src/components/ui/__tests__/button.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 434[2mms[22m[39m
   [32m✓[39m Button [2m(2)[22m
     [33m[2m✓[22m[39m renders a native button by default[33m 411[2mms[22m[39m
(node:15454) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:15455) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-preview.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 167[2mms[22m[39m
(node:15479) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-state.test.tsx [2m([22m[2m6 tests[22m[2m)[22m[33m 470[2mms[22m[39m
(node:15493) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstdout[2m | src/modules/WorldExplorer/__tests__/geospatial.test.tsx[2m > [22m[2mread-only geographic integration[2m > [22m[2mGEO-01–16 execute and retain measured residual evidence
[22m[39mGEO-01: PASS Anchor residual 0 m
GEO-02: PASS World origin residual 6.780130685568339e-9 m
GEO-03: PASS EPSG golden residual 0.0030970181388314585 m; threshold 0.01 m
GEO-04: PASS ECEF/ENU residual 2.0372681319713593e-10 m
GEO-05: PASS ENU 1,2,3 = World 1,3,-2
GEO-06: PASS East X=10.700537735483234 m
GEO-07: PASS North Z=-11.065924930947537 m
GEO-08: PASS Up Y=10.00000000020203 m
GEO-09: PASS N/E/S/W heading/yaw round-trip
GEO-10: PASS East right; North up; marker heading consistent
GEO-11: PASS Maximum world residual 9.18977803700484e-9 m; threshold 0.01 m; 175 points within 5km
GEO-12: PASS 5/5 invalid coordinates rejected
GEO-13: PASS Date line canonical longitude -180 degrees
GEO-14: PASS Pole height residual 0 m
GEO-15: PASS WGS84_ELLIPSOID; 0m reference assumption; not measured terrain elevation
GEO-16: PASS 9/9 historical diagnostics pass

 [32m✓[39m src/modules/WorldExplorer/__tests__/geospatial.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[32m 89[2mms[22m[39m
(node:15505) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/imagery/__tests__/alignment.test.ts [2m([22m[2m36 tests[22m[2m)[22m[32m 109[2mms[22m[39m
(node:15522) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/imagery.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 45[2mms[22m[39m
(node:15534) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useDebounce.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 107[2mms[22m[39m
(node:15546) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/snapshot.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 95[2mms[22m[39m
(node:15558) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/geodata/__tests__/overpass.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 186[2mms[22m[39m
(node:15575) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstderr[2m | src/world-core/__tests__/prefabs.test.ts[2m > [22m[2mPrefab composition and ownership[2m > [22m[2mshares geometry/material across independent transforms, metadata and zones
[22m[39mTHREE.Material: parameter 'map' has value of undefined.

 [32m✓[39m src/world-core/__tests__/prefabs.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 77[2mms[22m[39m
(node:15592) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/data-sources.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 74[2mms[22m[39m
(node:15604) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/weather.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 78[2mms[22m[39m
(node:15616) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useToggle.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 29[2mms[22m[39m
(node:15633) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useTranslations.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 88[2mms[22m[39m
(node:15645) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/messages/__tests__/messages.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 73[2mms[22m[39m
(node:15657) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/number.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 30[2mms[22m[39m
(node:15669) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/phase-regression.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 61[2mms[22m[39m
(node:15686) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/renderer/__tests__/webgl.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 71[2mms[22m[39m
(node:15698) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/interceptors.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 54[2mms[22m[39m
(node:15710) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstdout[2m | src/engine/geospatial/__tests__/core.test.ts[2m > [22m[2mPhase 12 pure geographic core[2m > [22m[2mGEO-11 retains millimeter through 5km offsets with <=0.01m numerical residual
[22m[39mGEO-11 maximum world residual: 9.18977803700484e-9 m; threshold 0.01 m

 [32m✓[39m src/engine/geospatial/__tests__/core.test.ts [2m([22m[2m18 tests[22m[2m)[22m[32m 73[2mms[22m[39m
(node:15727) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/core/__tests__/runtime.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 14[2mms[22m[39m
(node:15740) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/api-error.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 53[2mms[22m[39m
(node:15752) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/i18n/__tests__/request.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:15764) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/interactions/__tests__/registry.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 56[2mms[22m[39m
(node:15781) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/lib/__tests__/seo.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:15793) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/character/__tests__/controller.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 13[2mms[22m[39m
(node:15805) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/decimal.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 11[2mms[22m[39m
(node:15817) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/backend.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 18[2mms[22m[39m
(node:15834) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/route.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 52[2mms[22m[39m
(node:15846) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/health/__tests__/route.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 13[2mms[22m[39m
(node:15858) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/object.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
(node:15870) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/date.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 17[2mms[22m[39m
(node:15887) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/string.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32m✓[39m src/hooks/__tests__/useTranslations.types.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m

[2m Test Files [22m [1m[32m41 passed[39m[22m[90m (41)[39m
[2m      Tests [22m [1m[32m237 passed[39m[22m[90m (237)[39m
[2m   Start at [22m 09:41:16
[2m   Duration [22m 62.46s[2m (environment 56%, setup 18%, tests 13%, import 7%, worker 3%, transform 2%)[22m

[2mEnvironment [22m [33mjsdom was created 41 times[39m[2m · 58.30s total, 56% of tracked time[22m
[2m            [22m [2mcreate it once per worker with [22m[33mpool: 'vmThreads'[39m[2m (keeps per-file isolation) or [22m[33misolate: false[39m[2m (shares it across files)[22m
[2m            [22m [2mlearn more: https://vitest.dev/guide/improving-performance#test-environments[22m

[34m % [39m[2mCoverage report from [22m[33mv8[39m
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   76.81 |    65.12 |   61.26 |   78.62 |                   
 src               |       0 |      100 |     100 |       0 |                   
  proxy.ts         |       0 |      100 |     100 |       0 | 23                
 src/api           |   89.47 |    78.12 |   83.33 |   92.15 |                   
  axios.ts         |   81.81 |    33.33 |      50 |   88.88 | 31                
  index.ts         |       0 |        0 |       0 |       0 |                   
  interceptors.ts  |    91.3 |    88.46 |      90 |   92.85 | 45-46,78          
 src/api/health    |       0 |        0 |       0 |       0 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
  keys.ts          |       0 |      100 |     100 |       0 | 2-6               
  queries.ts       |       0 |        0 |       0 |       0 | 10-11             
  requests.ts      |       0 |      100 |       0 |       0 | 5-9               
  type.ts          |       0 |        0 |       0 |       0 |                   
 ...ponents/common |       0 |        0 |       0 |       0 |                   
  CopyButton.tsx   |       0 |        0 |       0 |       0 | 1-12              
  ErrorState.tsx   |       0 |        0 |       0 |       0 | 12-13             
  PageHeader.tsx   |       0 |        0 |       0 |       0 | 12-13             
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...nts/form-field |       0 |        0 |       0 |       0 |                   
  ...kboxField.tsx |       0 |        0 |       0 |       0 | 1-28              
  SelectField.tsx  |       0 |        0 |       0 |       0 | 1-52              
  SwitchField.tsx  |       0 |        0 |       0 |       0 | 1-28              
  ...AreaField.tsx |       0 |        0 |       0 |       0 | 1-28              
  TextField.tsx    |       0 |        0 |       0 |       0 | 1-43              
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...onents/layouts |       0 |        0 |       0 |       0 |                   
  Footer.tsx       |       0 |      100 |       0 |       0 | 3-6               
  Header.tsx       |       0 |      100 |       0 |       0 | 8-11              
  ...eSwitcher.tsx |       0 |        0 |       0 |       0 | 1-48              
  MainLayout.tsx   |       0 |      100 |       0 |       0 | 6-7               
  ...eSwitcher.tsx |       0 |      100 |       0 |       0 | 1-36              
  index.ts         |       0 |        0 |       0 |       0 |                   
 ...ents/providers |   73.33 |       25 |    62.5 |   74.35 |                   
  ...tProvider.tsx |       0 |        0 |       0 |       0 | 1-39              
  ...eProvider.tsx |   94.28 |       50 |   83.33 |   96.66 | 19                
 ...components/seo |       0 |      100 |       0 |       0 |                   
  JsonLd.tsx       |       0 |      100 |       0 |       0 | 6-7               
 ...ents/utilities |       0 |        0 |       0 |       0 |                   
  FadeIn.tsx       |       0 |        0 |       0 |       0 | 1-19              
  h-stack.tsx      |       0 |        0 |       0 |       0 | 7-66              
  index.ts         |       0 |        0 |       0 |       0 |                   
  show.tsx         |       0 |        0 |       0 |       0 | 3-4               
  ...opagation.tsx |       0 |      100 |       0 |       0 | 7-12              
  v-stack.tsx      |       0 |        0 |       0 |       0 | 7-66              
 src/config        |       0 |      100 |     100 |       0 |                   
  fonts.ts         |       0 |      100 |     100 |       0 | 3-9               
  site.ts          |       0 |      100 |     100 |       0 | 11                
 src/constants     |   77.77 |    33.33 |      25 |   76.92 |                   
  const.ts         |     100 |      100 |     100 |     100 |                   
  env.ts           |    87.5 |       50 |      50 |   85.71 | 15                
  routes.ts        |       0 |        0 |       0 |       0 | 1-15              
 ...gine/character |   84.94 |    77.23 |     100 |   85.49 |                   
  controller.ts    |   88.46 |     87.5 |     100 |   90.81 | ...31-133,145-146 
  humanoid.ts      |   83.68 |    51.42 |     100 |   83.68 | 347-397           
 ...ngine/controls |    69.8 |    58.91 |   76.19 |   72.92 |                   
  events.ts        |   67.91 |    56.98 |   72.22 |   72.17 | ...84-196,207-208 
  input.ts         |   73.52 |    60.86 |     100 |   74.24 | ...82,85-86,88-89 
 src/engine/core   |   90.27 |    88.57 |     100 |   91.66 |                   
  const.ts         |     100 |      100 |     100 |     100 |                   
  resources.ts     |   82.35 |    66.66 |     100 |   92.85 | 24                
  runtime.ts       |   92.59 |     93.1 |     100 |   91.11 | 25,63-65          
  type.ts          |       0 |        0 |       0 |       0 |                   
 ...ne/environment |     100 |      100 |     100 |     100 |                   
  dust.ts          |     100 |      100 |     100 |     100 |                   
 ...ine/geospatial |   98.97 |    96.55 |     100 |     100 |                   
  core.ts          |   98.97 |    96.55 |     100 |     100 | 100               
  type.ts          |       0 |        0 |       0 |       0 |                   
 ...engine/imagery |    95.3 |    92.55 |     100 |   95.45 |                   
  alignment.ts     |   95.27 |    92.55 |     100 |   95.41 | ...45,250,258,313 
  const.ts         |     100 |      100 |     100 |     100 |                   
 ...gery/__tests__ |     100 |      100 |     100 |     100 |                   
  fixtures.ts      |     100 |      100 |     100 |     100 |                   
 ...e/interactions |   88.63 |    72.46 |   94.73 |   91.66 |                   
  registry.ts      |   88.63 |    72.46 |   94.73 |   91.66 | 13,28,145-148,173 
 ...gine/materials |     100 |       80 |     100 |     100 |                   
  textures.ts      |     100 |       80 |     100 |     100 | 7,34              
 ...ngine/renderer |   90.76 |    72.72 |    87.5 |   96.42 |                   
  type.ts          |       0 |        0 |       0 |       0 |                   
  webgl.ts         |   90.76 |    72.72 |    87.5 |   96.42 | 24,61             
 ...engine/spatial |     100 |    81.48 |     100 |     100 |                   
  minimap.ts       |     100 |    81.48 |     100 |     100 | 38-39,49-59       
 src/enums         |     100 |      100 |     100 |     100 |                   
  enum.ts          |     100 |      100 |     100 |     100 |                   
 src/hooks         |     7.6 |     5.55 |   11.11 |    6.94 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
  use-mobile.ts    |       0 |      100 |       0 |       0 | 3-18              
  ...ickOutside.ts |       0 |        0 |       0 |       0 | 1-20              
  useCopy.ts       |       0 |        0 |       0 |       0 | 1-45              
  useCountdown.ts  |       0 |      100 |       0 |       0 | 1-18              
  useDebounce.ts   |     100 |      100 |     100 |     100 |                   
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
  useToggle.ts     |     100 |      100 |     100 |     100 |                   
  ...anslations.ts |     100 |      100 |     100 |     100 |                   
  ...ionsServer.ts |       0 |        0 |       0 |       0 | 26-29             
  ...archParams.ts |       0 |        0 |       0 |       0 | 1-29              
  useWindowSize.ts |       0 |        0 |       0 |       0 | 1-33              
 src/i18n          |   84.61 |    66.66 |      50 |   83.33 |                   
  navigation.ts    |       0 |      100 |     100 |       0 | 5                 
  request.ts       |     100 |      100 |     100 |     100 |                   
  routing.ts       |   85.71 |        0 |       0 |   85.71 | 27                
 ...ations/geodata |   98.21 |    91.11 |     100 |   97.91 |                   
  ...ass.server.ts |   98.21 |    91.11 |     100 |   97.91 | 49                
 ...ations/weather |   78.04 |    89.07 |   72.22 |      80 |                   
  client.ts        |       0 |        0 |       0 |       0 | 6-36              
  freshness.ts     |     100 |      100 |     100 |     100 |                   
  mapper.ts        |     100 |    98.38 |     100 |     100 | 3                 
  provider.ts      |    90.9 |    72.72 |     100 |   96.55 | 18                
  service.ts       |      90 |    93.54 |      80 |   89.74 | 58,120-122        
  type.ts          |       0 |        0 |       0 |       0 |                   
  validation.ts    |     100 |      100 |     100 |     100 |                   
 src/lib           |   83.01 |    88.46 |   78.26 |   80.85 |                   
  ...ie-storage.ts |   85.71 |      100 |      75 |   85.71 | 33                
  cookie.ts        |       0 |      100 |       0 |       0 | 3-12              
  og-image.tsx     |       0 |        0 |       0 |       0 | 11-12             
  seo.ts           |     100 |    94.44 |     100 |     100 | 26                
  theme.ts         |     100 |      100 |     100 |     100 |                   
  utils.ts         |     100 |      100 |     100 |     100 |                   
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
  controls.ts      |     100 |      100 |     100 |     100 |                   
  diagnostics.ts   |     100 |      100 |     100 |     100 |                   
  ...iagnostics.ts |   98.48 |    94.73 |     100 |     100 | 111               
  ...iagnostics.ts |   95.65 |       50 |     100 |     100 | 49                
  ...ry-preview.ts |    92.1 |    90.47 |     100 |   94.11 | 26-27             
  index.tsx        |       0 |      100 |       0 |       0 | 6-7               
  type.ts          |       0 |        0 |       0 |       0 |                   
 ...rer/components |    52.1 |    21.11 |   31.39 |   53.45 |                   
  ...tBoundary.tsx |       0 |        0 |       0 |       0 | 1-31              
  Icons.tsx        |     100 |      100 |     100 |     100 |                   
  ...Inspector.tsx |   89.47 |    86.48 |   93.33 |      92 | 48-50,159         
  ...rerClient.tsx |       0 |        0 |       0 |       0 | 1-18              
  WorldHud.tsx     |   21.36 |     10.9 |   18.03 |   20.95 | ...70-488,609-841 
 ...Explorer/hooks |   57.89 |    43.91 |   47.05 |   61.71 |                   
  ...oTelemetry.ts |     100 |      100 |     100 |     100 |                   
  ...ldExplorer.ts |    55.4 |    42.36 |   43.75 |    59.5 | ...48,353-388,427 
 ...plorer/runtime |   90.36 |     82.6 |   77.14 |   93.13 |                   
  world.ts         |   90.36 |     82.6 |   77.14 |   93.13 | ...30,552,566-569 
 src/stores        |   77.27 |       50 |   69.23 |   82.35 |                   
  index.ts         |       0 |        0 |       0 |       0 |                   
  modalStore.ts    |      60 |      100 |   33.33 |      50 | 15-16             
  sessionStore.ts  |   82.35 |       50 |      80 |    92.3 | 46                
 src/types         |       0 |        0 |       0 |       0 |                   
  translation.ts   |       0 |        0 |       0 |       0 |                   
  type.ts          |       0 |        0 |       0 |       0 |                   
 src/utils         |   70.25 |    76.86 |   73.17 |    74.4 |                   
  api-error.ts     |   93.75 |    89.47 |     100 |     100 | 6,16              
  array.ts         |       0 |        0 |       0 |       0 | 1-26              
  common.ts        |       0 |      100 |       0 |       0 | 1-10              
  date.ts          |   69.23 |    44.44 |   66.66 |   72.72 | 26-28,33-35       
  index.ts         |       0 |        0 |       0 |       0 |                   
  number.ts        |   89.13 |     92.3 |     100 |   94.44 | 22-23             
  object.ts        |   96.42 |       80 |     100 |     100 | 9,20              
  string.ts        |     100 |       90 |     100 |     100 | 1,8               
 ...assets/catalog |    93.1 |       75 |     100 |     100 |                   
  ...hetic-rock.ts |    93.1 |       75 |     100 |     100 | 15                
 ...ore/registries |   93.95 |    93.13 |   98.07 |   96.66 |                   
  data-sources.ts  |   97.84 |    95.91 |     100 |   99.13 | 209               
  imagery.ts       |    87.8 |    88.37 |   88.88 |   91.89 | 57,63,81          
  prefabs.ts       |   85.71 |    78.57 |     100 |   92.85 | 32,48             
 ...ries/__tests__ |     100 |      100 |     100 |     100 |                   
  fixtures.ts      |     100 |      100 |     100 |     100 |                   
 ...d-core/schemas |   91.89 |       60 |     100 |   96.66 |                   
  manifest.ts      |   91.89 |       60 |     100 |   96.66 | 84                
 src/worlds/danang |     100 |      100 |     100 |     100 |                   
  const.ts         |     100 |      100 |     100 |     100 |                   
  data-sources.ts  |     100 |      100 |     100 |     100 |                   
  georeference.ts  |     100 |      100 |     100 |     100 |                   
  scene.ts         |     100 |      100 |     100 |     100 |                   
 ...ng/environment |   83.22 |    65.97 |     100 |   84.19 |                   
  simulation.ts    |   77.88 |       50 |     100 |   79.36 | ...16,279,285-322 
  solar.ts         |   93.33 |    91.89 |     100 |   93.13 | ...76-178,188-190 
  type.ts          |       0 |        0 |       0 |       0 |                   
 ...s/danang/zones |   77.08 |       32 |     100 |   78.72 |                   
  fixtures.ts      |     100 |      100 |     100 |     100 |                   
  manifest.ts      |     100 |      100 |     100 |     100 |                   
  synthetic.ts     |   75.55 |       32 |     100 |   77.27 | 57,82-87,99-102   
-------------------|---------|----------|---------|---------|-------------------
```

## test.txt

- Original file: `test.txt`
- Original size: 16814 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:16405) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ vitest run
(node:16437) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

[1m[30m[46m RUN [49m[39m[22m [36mv5.0.5 [39m[90m/home/hatch/workspace/danang-simulation-work/danang-simulation-main[39m

(node:16467) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16469) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16468) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx [2m([22m[2m4 tests[22m[2m)[22m[33m 632[2mms[22m[39m
   [32m✓[39m runtime retry lifecycle [2m(4)[22m
     [33m[2m✓[22m[39m ignores callbacks from the disposed Strict Mode mount within the same generation[33m 360[2mms[22m[39m
(node:16496) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 880[2mms[22m[39m
   [32m✓[39m imagery canvas lifecycle [2m(1)[22m
     [33m[2m✓[22m[39m IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates[33m 875[2mms[22m[39m
(node:16504) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/world.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 3674[2mms[22m[39m
   [32m✓[39m scene composition and browser runtime [2m(3)[22m
     [33m[2m✓[22m[39m preserves synthetic fixtures, shared rocks, character, grass, and owned resource disposal[33m 594[2mms[22m[39m
     [33m[2m✓[22m[39m owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources[33m 2297[2mms[22m[39m
     [33m[2m✓[22m[39m keeps Mini Map failure unavailable while restoring scene visibility[33m 775[2mms[22m[39m
(node:16517) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 795[2mms[22m[39m
   [32m✓[39m imagery inspector [2m(3)[22m
     [33m[2m✓[22m[39m IMG-41/42/43/44 toggles an honest fixture footprint without network or a WebGL canvas[33m 680[2mms[22m[39m
(node:16525) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 817[2mms[22m[39m
   [32m✓[39m HUD button semantics [2m(5)[22m
     [33m[2m✓[22m[39m preserves the Phase 10 FPS, frame time, and checks chips in compact diagnostics[33m 418[2mms[22m[39m
(node:16538) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/providers/__tests__/ThemeProvider.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 881[2mms[22m[39m
   [32m✓[39m ThemeProvider [2m(5)[22m
     [33m[2m✓[22m[39m persists an explicit choice and applies the dark class[33m 621[2mms[22m[39m
(node:16546) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-state.test.tsx [2m([22m[2m6 tests[22m[2m)[22m[33m 413[2mms[22m[39m
(node:16554) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/controls/__tests__/events.test.ts [2m([22m[2m12 tests[22m[2m)[22m[33m 807[2mms[22m[39m
   [32m✓[39m input lifecycle [2m(12)[22m
     [33m[2m✓[22m[39m IMG-48 skips capture on a locked second click and releases mouse drag on blur[33m 605[2mms[22m[39m
 [32m✓[39m src/components/ui/__tests__/button.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 506[2mms[22m[39m
   [32m✓[39m Button [2m(2)[22m
     [33m[2m✓[22m[39m renders a native button by default[33m 486[2mms[22m[39m
(node:16568) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16567) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/geodata/__tests__/overpass.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 185[2mms[22m[39m
(node:16587) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useDebounce.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 82[2mms[22m[39m
(node:16599) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-preview.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 213[2mms[22m[39m
 [32m✓[39m src/engine/imagery/__tests__/alignment.test.ts [2m([22m[2m36 tests[22m[2m)[22m[32m 216[2mms[22m[39m
(node:16607) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16614) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/snapshot.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 98[2mms[22m[39m
(node:16632) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstdout[2m | src/modules/WorldExplorer/__tests__/geospatial.test.tsx[2m > [22m[2mread-only geographic integration[2m > [22m[2mGEO-01–16 execute and retain measured residual evidence
[22m[39mGEO-01: PASS Anchor residual 0 m
GEO-02: PASS World origin residual 6.780130685568339e-9 m
GEO-03: PASS EPSG golden residual 0.0030970181388314585 m; threshold 0.01 m
GEO-04: PASS ECEF/ENU residual 2.0372681319713593e-10 m
GEO-05: PASS ENU 1,2,3 = World 1,3,-2
GEO-06: PASS East X=10.700537735483234 m
GEO-07: PASS North Z=-11.065924930947537 m
GEO-08: PASS Up Y=10.00000000020203 m
GEO-09: PASS N/E/S/W heading/yaw round-trip
GEO-10: PASS East right; North up; marker heading consistent
GEO-11: PASS Maximum world residual 9.18977803700484e-9 m; threshold 0.01 m; 175 points within 5km
GEO-12: PASS 5/5 invalid coordinates rejected
GEO-13: PASS Date line canonical longitude -180 degrees
GEO-14: PASS Pole height residual 0 m
GEO-15: PASS WGS84_ELLIPSOID; 0m reference assumption; not measured terrain elevation
GEO-16: PASS 9/9 historical diagnostics pass

 [32m✓[39m src/modules/WorldExplorer/__tests__/geospatial.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[32m 176[2mms[22m[39m
 [32m✓[39m src/hooks/__tests__/useTranslations.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 91[2mms[22m[39m
(node:16640) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16648) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/weather.test.ts [2m([22m[2m13 tests[22m[2m)[22m[32m 111[2mms[22m[39m
(node:16661) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstderr[2m | src/world-core/__tests__/prefabs.test.ts[2m > [22m[2mPrefab composition and ownership[2m > [22m[2mshares geometry/material across independent transforms, metadata and zones
[22m[39mTHREE.Material: parameter 'map' has value of undefined.

 [32m✓[39m src/world-core/__tests__/prefabs.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 172[2mms[22m[39m
 [32m✓[39m src/world-core/registries/__tests__/data-sources.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 103[2mms[22m[39m
(node:16669) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16671) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstdout[2m | src/engine/geospatial/__tests__/core.test.ts[2m > [22m[2mPhase 12 pure geographic core[2m > [22m[2mGEO-11 retains millimeter through 5km offsets with <=0.01m numerical residual
[22m[39mGEO-11 maximum world residual: 9.18977803700484e-9 m; threshold 0.01 m

 [32m✓[39m src/engine/geospatial/__tests__/core.test.ts [2m([22m[2m18 tests[22m[2m)[22m[32m 23[2mms[22m[39m
(node:16685) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/renderer/__tests__/webgl.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 78[2mms[22m[39m
 [32m✓[39m src/messages/__tests__/messages.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 99[2mms[22m[39m
(node:16698) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16704) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/phase-regression.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 30[2mms[22m[39m
(node:16715) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/interactions/__tests__/registry.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 17[2mms[22m[39m
(node:16725) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/interceptors.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 32[2mms[22m[39m
(node:16738) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/api-error.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
(node:16746) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/route.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 17[2mms[22m[39m
(node:16754) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/imagery.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 169[2mms[22m[39m
(node:16762) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/number.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 96[2mms[22m[39m
(node:16775) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useToggle.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 91[2mms[22m[39m
(node:16783) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/backend.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 104[2mms[22m[39m
 [32m✓[39m src/utils/__tests__/date.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 25[2mms[22m[39m
(node:16791) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16792) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/core/__tests__/runtime.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 13[2mms[22m[39m
(node:16812) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/character/__tests__/controller.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:16820) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/health/__tests__/route.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 72[2mms[22m[39m
(node:16828) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/lib/__tests__/seo.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 17[2mms[22m[39m
(node:16836) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/string.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 11[2mms[22m[39m
 [32m✓[39m src/i18n/__tests__/request.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 73[2mms[22m[39m
(node:16849) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:16857) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/decimal.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 10[2mms[22m[39m
 [32m✓[39m src/hooks/__tests__/useTranslations.types.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/utils/__tests__/object.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 8[2mms[22m[39m

[2m Test Files [22m [1m[32m41 passed[39m[22m[90m (41)[39m
[2m      Tests [22m [1m[32m237 passed[39m[22m[90m (237)[39m
[2m   Start at [22m 09:44:22
[2m   Duration [22m 56.37s[2m (environment 66%, setup 15%, tests 8%, import 8%, transform 2%, worker 1%)[22m

[2mEnvironment [22m [33mjsdom was created 41 times[39m[2m · 96.48s total, 66% of tracked time[22m
[2m            [22m [2mcreate it once per worker with [22m[33mpool: 'vmThreads'[39m[2m (keeps per-file isolation) or [22m[33misolate: false[39m[2m (shares it across files)[22m
[2m            [22m [2mlearn more: https://vitest.dev/guide/improving-performance#test-environments[22m
```

## type-check.txt

- Original file: `type-check.txt`
- Original size: 644 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:16306) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ next typegen && tsc --noEmit --incremental false
(node:16335) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
Generating route types...
✓ Types generated successfully
(node:16358) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```
