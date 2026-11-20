# Evidence Log — docs/audit/phase-15/evidence

Consolidated from 16 text log files in `docs/audit/phase-15/evidence` on 2026-11-20 as part of Option A docs consolidation. Each section preserves one original file verbatim (UTF-16 files decoded to UTF-8, CRLF normalized to LF). The original `*.txt` files were removed; `*.cjs.txt` files (executable script copies) were kept in place. PNG, JSON and other non-txt evidence files are unchanged.
## Index

- [audit-prod-after.txt](#audit-prod-aftertxt) — 209 bytes, ASCII
- [audit-prod-baseline.txt](#audit-prod-baselinetxt) — 209 bytes, ASCII
- [browser-context-restore-1024x768.txt](#browser-context-restore-1024x768txt) — 187 bytes, ASCII
- [build-after.txt](#build-aftertxt) — 2632 bytes, UTF-8
- [build-baseline.txt](#build-baselinetxt) — 2453 bytes, UTF-8
- [build-storybook-after.txt](#build-storybook-aftertxt) — 15139 bytes, UTF-8
- [build-storybook-baseline.txt](#build-storybook-baselinetxt) — 15139 bytes, UTF-8
- [format-after.txt](#format-aftertxt) — 419 bytes, ASCII
- [format-baseline.txt](#format-baselinetxt) — 417 bytes, ASCII
- [lint-after.txt](#lint-aftertxt) — 418 bytes, ASCII
- [lint-baseline.txt](#lint-baselinetxt) — 416 bytes, ASCII
- [test-after.txt](#test-aftertxt) — 18939 bytes, UTF-8
- [test-baseline.txt](#test-baselinetxt) — 17405 bytes, UTF-8
- [test-coverage-after.txt](#test-coverage-aftertxt) — 35913 bytes, UTF-8
- [type-check-after.txt](#type-check-aftertxt) — 644 bytes, UTF-8
- [type-check-baseline.txt](#type-check-baselinetxt) — 642 bytes, UTF-8

## audit-prod-after.txt

- Original file: `audit-prod-after.txt`
- Original size: 209 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:19947) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
No known vulnerabilities found
```

## audit-prod-baseline.txt

- Original file: `audit-prod-baseline.txt`
- Original size: 209 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:10979) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
No known vulnerabilities found
```

## browser-context-restore-1024x768.txt

- Original file: `browser-context-restore-1024x768.txt`
- Original size: 187 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
canvases: 2
lose: [true,false]
afterLoss body has recovery?: {"recovery":true,"canvases":2}
restore: restored
afterRestore: {"canvases":2,"world":true,"recoveryGone":true}
exceptions: []
```

## build-after.txt

- Original file: `build-after.txt`
- Original size: 2632 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:19588) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ next build
(node:19617) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
▲ Next.js 16.4.6 (Turbopack)
- Environments: .env.local
✓ Running next.config.ts took 266ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
(node:19655) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:19669) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
✓ Compiled successfully in 16.8s
  Running TypeScript ...
(node:19712) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
  Finished TypeScript in 4.7s ...
  Collecting page data using 3 workers ...
(node:19744) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:19743) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:19755) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
  Generating static pages using 3 workers (0/14) ...
  Generating static pages using 3 workers (3/14) 
  Generating static pages using 3 workers (6/14) 
  Generating static pages using 3 workers (10/14) 
✓ Generating static pages using 3 workers (14/14) in 1362ms
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

## build-baseline.txt

- Original file: `build-baseline.txt`
- Original size: 2453 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:10632) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ next build
(node:10661) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
▲ Next.js 16.4.6 (Turbopack)
- Environments: .env.local
✓ Running next.config.ts took 356ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
(node:10690) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
✓ Compiled successfully in 8.1s
  Running TypeScript ...
(node:10728) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
  Finished TypeScript in 3.3s ...
  Collecting page data using 3 workers ...
(node:10771) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10772) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10783) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
  Generating static pages using 3 workers (0/14) ...
  Generating static pages using 3 workers (3/14) 
  Generating static pages using 3 workers (6/14) 
  Generating static pages using 3 workers (10/14) 
✓ Generating static pages using 3 workers (14/14) in 1171ms
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

## build-storybook-after.txt

- Original file: `build-storybook-after.txt`
- Original size: 15139 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:19791) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ storybook build
(node:19820) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

┌  Building storybook v10.6.7
(node:19820) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
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
(node:19820) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
transforming...
✓ 4813 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  20.50 kB │ gzip:   5.61 kB
│  storybook-static/assets/world-explorer-BqispFX7.css
│  20.87 kB │ gzip:   4.92 kB
│  storybook-static/assets/iframe-BaSE0WOI.css
│  206.47 kB │ gzip:  30.87 kB
│  storybook-static/assets/iframe-CCQbi4UC.js
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
│  storybook-static/assets/WorldExplorerClient.stories-Dfy0Ul_X.js
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
│  storybook-static/assets/tooltip.stories-fEAWm5KS.js
│  0.86 kB │ gzip:   0.48 kB
│  storybook-static/assets/spinner.stories-BbO4ZAVA.js
│  0.87 kB │ gzip:   0.47 kB
│  storybook-static/assets/ImageryInspector.stories-BRGw5Mgo.js
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
│  storybook-static/assets/common.stories-BTp194r_.js
│  3.53 kB │ gzip:   1.45 kB
│  storybook-static/assets/createLucideIcon-DTc4q1oi.js
│  3.66 kB │ gzip:   1.68 kB
│  storybook-static/assets/table.stories-2_pBIDMb.js
│  3.80 kB │ gzip:   1.25 kB
│  storybook-static/assets/item.stories-DFbhpR30.js
│  3.83 kB │ gzip:   1.61 kB
│  storybook-static/assets/react-dom-qBXZUrFy.js
│  3.92 kB │ gzip:   1.44 kB
│  storybook-static/assets/layouts.stories-BGRazaN1.js
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
│  storybook-static/assets/ClientBoundary.stories-C2Q-G6Xx.js
│  6.00 kB │ gzip:   2.60 kB
│  storybook-static/assets/toggle-group.stories-C0oB8Ijo.js
│  6.16 kB │ gzip:   2.33 kB
│  storybook-static/assets/alert-dialog.stories-Cf2tvcxR.js
│  6.27 kB │ gzip:   1.97 kB
│  storybook-static/assets/WorldHud.stories-BLgU0Ls2.js
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
│  storybook-static/assets/sidebar.stories-NmY2R-bU.js
│  10.91 kB │ gzip:   3.72 kB
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
│  storybook-static/assets/hooks-CgcLKPcf.js
│  29.59 kB │ gzip:  12.46 kB
│  storybook-static/assets/Color-6AOWCN3U-Drme6BgZ.js
│  30.40 kB │ gzip:  11.49 kB
│  storybook-static/assets/world-explorer-BJbUt-OZ.js
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
│  storybook-static/assets/WorldExplorerClient-S_3vD1cW.js
│  72.02 kB │ gzip:  26.45 kB
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
│  storybook-static/assets/WorldHud-fz4zBCsS.js
│  656.34 kB │ gzip: 173.74 kB
│  storybook-static/assets/axe-C7pk9Kxd.js
│  659.32 kB │ gzip: 187.87 kB
│  storybook-static/assets/iframe-BWmvnwLq.js
│  1,359.86 kB │ gzip: 389.48 kB

│  Vite ✓ built in 12.26s
│
◇  Output directory:
│  /home/hatch/workspace/danang-simulation-work/danang-simulation-main/storybook-static
│
└  Storybook build completed successfully
```

## build-storybook-baseline.txt

- Original file: `build-storybook-baseline.txt`
- Original size: 15139 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:10819) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ storybook build
(node:10848) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

┌  Building storybook v10.6.7
(node:10848) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
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
(node:10848) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
transforming...
✓ 4809 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  20.50 kB │ gzip:   5.61 kB
│  storybook-static/assets/world-explorer-BqispFX7.css
│  20.87 kB │ gzip:   4.92 kB
│  storybook-static/assets/iframe-BaSE0WOI.css
│  206.47 kB │ gzip:  30.87 kB
│  storybook-static/assets/iframe-jpRmIV_-.js
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
│  storybook-static/assets/WorldExplorerClient.stories-Bt6tmXl5.js
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
│  storybook-static/assets/tooltip.stories-DL4BMged.js
│  0.86 kB │ gzip:   0.48 kB
│  storybook-static/assets/spinner.stories-BbO4ZAVA.js
│  0.87 kB │ gzip:   0.47 kB
│  storybook-static/assets/ImageryInspector.stories-BdqOVeLG.js
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
│  storybook-static/assets/common.stories-vyWIIibf.js
│  3.53 kB │ gzip:   1.45 kB
│  storybook-static/assets/createLucideIcon-DTc4q1oi.js
│  3.66 kB │ gzip:   1.68 kB
│  storybook-static/assets/table.stories-2_pBIDMb.js
│  3.80 kB │ gzip:   1.25 kB
│  storybook-static/assets/item.stories-DFbhpR30.js
│  3.83 kB │ gzip:   1.61 kB
│  storybook-static/assets/react-dom-qBXZUrFy.js
│  3.92 kB │ gzip:   1.44 kB
│  storybook-static/assets/layouts.stories-C45bpK7V.js
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
│  storybook-static/assets/ClientBoundary.stories-QbnP3G-G.js
│  6.00 kB │ gzip:   2.60 kB
│  storybook-static/assets/toggle-group.stories-C0oB8Ijo.js
│  6.16 kB │ gzip:   2.33 kB
│  storybook-static/assets/alert-dialog.stories-Cf2tvcxR.js
│  6.27 kB │ gzip:   1.97 kB
│  storybook-static/assets/WorldHud.stories-C7-FH4vI.js
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
│  storybook-static/assets/sidebar.stories-Co395oVU.js
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
│  storybook-static/assets/hooks-4A849-Dx.js
│  29.59 kB │ gzip:  12.46 kB
│  storybook-static/assets/Color-6AOWCN3U-Drme6BgZ.js
│  30.40 kB │ gzip:  11.49 kB
│  storybook-static/assets/world-explorer-BMv59P_R.js
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
│  storybook-static/assets/WorldExplorerClient-DUGYatto.js
│  72.02 kB │ gzip:  26.45 kB
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
│  storybook-static/assets/WorldHud-Dn2tIbzr.js
│  647.55 kB │ gzip: 170.97 kB
│  storybook-static/assets/axe-C7pk9Kxd.js
│  659.32 kB │ gzip: 187.87 kB
│  storybook-static/assets/iframe-DP90oth6.js
│  1,359.04 kB │ gzip: 389.19 kB

│  Vite ✓ built in 12.40s
│
◇  Output directory:
│  /home/hatch/workspace/danang-simulation-work/danang-simulation-main/storybook-static
│
└  Storybook build completed successfully
```

## format-after.txt

- Original file: `format-after.txt`
- Original size: 419 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:20782) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ biome format .
Checked 423 files in 381ms. No fixes applied.
(node:20811) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## format-baseline.txt

- Original file: `format-baseline.txt`
- Original size: 417 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:9891) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ biome format .
Checked 409 files in 335ms. No fixes applied.
(node:9920) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## lint-after.txt

- Original file: `lint-after.txt`
- Original size: 418 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:20729) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ biome lint .
Checked 424 files in 1259ms. No fixes applied.
(node:20758) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## lint-baseline.txt

- Original file: `lint-baseline.txt`
- Original size: 416 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:9816) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ biome lint .
Checked 410 files in 1207ms. No fixes applied.
(node:9850) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## test-after.txt

- Original file: `test-after.txt`
- Original size: 18939 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:19034) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ vitest run
(node:19063) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

[1m[30m[46m RUN [49m[39m[22m [36mv5.0.5 [39m[90m/home/hatch/workspace/danang-simulation-work/danang-simulation-main[39m

(node:19105) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:19098) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:19099) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 611[2mms[22m[39m
   [32m✓[39m imagery canvas lifecycle [2m(1)[22m
     [33m[2m✓[22m[39m IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates[33m 607[2mms[22m[39m
 [32m✓[39m src/integrations/weather/__tests__/client.test.ts [2m([22m[2m2 tests[22m[2m)[22m[33m 1066[2mms[22m[39m
   [32m✓[39m weather client retries [2m(2)[22m
     [33m[2m✓[22m[39m retries a transient failure and then succeeds[33m 1004[2mms[22m[39m
(node:19127) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:19134) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/world.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 3788[2mms[22m[39m
   [32m✓[39m scene composition and browser runtime [2m(3)[22m
     [33m[2m✓[22m[39m preserves synthetic fixtures, shared rocks, character, grass, and owned resource disposal[33m 594[2mms[22m[39m
     [33m[2m✓[22m[39m owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources[33m 2593[2mms[22m[39m
     [33m[2m✓[22m[39m keeps Mini Map failure unavailable while restoring scene visibility[33m 596[2mms[22m[39m
(node:19143) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx [2m([22m[2m4 tests[22m[2m)[22m[33m 795[2mms[22m[39m
   [32m✓[39m runtime retry lifecycle [2m(4)[22m
     [33m[2m✓[22m[39m ignores callbacks from the disposed Strict Mode mount within the same generation[33m 481[2mms[22m[39m
(node:19158) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 1203[2mms[22m[39m
   [32m✓[39m HUD button semantics [2m(5)[22m
     [33m[2m✓[22m[39m shows read-only geographic confidence and height assumption in expanded F3[33m 510[2mms[22m[39m
     [33m[2m✓[22m[39m preserves the Phase 10 FPS, frame time, and checks chips in compact diagnostics[33m 582[2mms[22m[39m
(node:19166) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 912[2mms[22m[39m
   [32m✓[39m imagery inspector [2m(3)[22m
     [33m[2m✓[22m[39m IMG-41/42/43/44 toggles an honest fixture footprint without network or a WebGL canvas[33m 794[2mms[22m[39m
(node:19174) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/ui/__tests__/button.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 612[2mms[22m[39m
   [32m✓[39m Button [2m(2)[22m
     [33m[2m✓[22m[39m renders a native button by default[33m 577[2mms[22m[39m
(node:19187) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/controls/__tests__/events.test.ts [2m([22m[2m12 tests[22m[2m)[22m[33m 526[2mms[22m[39m
   [32m✓[39m input lifecycle [2m(12)[22m
     [33m[2m✓[22m[39m IMG-48 skips capture on a locked second click and releases mouse drag on blur[33m 401[2mms[22m[39m
(node:19195) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/providers/__tests__/ThemeProvider.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 707[2mms[22m[39m
   [32m✓[39m ThemeProvider [2m(5)[22m
     [33m[2m✓[22m[39m persists an explicit choice and applies the dark class[33m 570[2mms[22m[39m
(node:19203) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-state.test.tsx [2m([22m[2m6 tests[22m[2m)[22m[33m 490[2mms[22m[39m
(node:19216) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/geodata/__tests__/overpass.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 188[2mms[22m[39m
(node:19228) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/imagery.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 106[2mms[22m[39m
(node:19236) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-preview.test.ts [2m([22m[2m6 tests[22m[2m)[22m[33m 383[2mms[22m[39m
(node:19252) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/imagery/__tests__/alignment.test.ts [2m([22m[2m36 tests[22m[2m)[22m[32m 278[2mms[22m[39m
(node:19262) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useTranslations.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 90[2mms[22m[39m
(node:19274) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
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

 [32m✓[39m src/modules/WorldExplorer/__tests__/geospatial.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[32m 98[2mms[22m[39m
(node:19283) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/number.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 37[2mms[22m[39m
(node:19301) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/weather.test.ts [2m([22m[2m15 tests[22m[2m)[22m[32m 189[2mms[22m[39m
(node:19309) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/snapshot.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 40[2mms[22m[39m
(node:19321) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useDebounce.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 106[2mms[22m[39m
(node:19329) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/data-sources.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 36[2mms[22m[39m
(node:19337) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/i18n/__tests__/request.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 72[2mms[22m[39m
(node:19350) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/terrain/__tests__/selection.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:19358) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/core/__tests__/runtime.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 18[2mms[22m[39m
(node:19366) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/terrain/__tests__/grid.test.ts [2m([22m[2m14 tests[22m[2m)[22m[32m 92[2mms[22m[39m
(node:19379) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/messages/__tests__/messages.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 165[2mms[22m[39m
(node:19389) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/terrain/__tests__/synthetic.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 183[2mms[22m[39m
(node:19397) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstdout[2m | src/engine/geospatial/__tests__/core.test.ts[2m > [22m[2mPhase 12 pure geographic core[2m > [22m[2mGEO-11 retains millimeter through 5km offsets with <=0.01m numerical residual
[22m[39mGEO-11 maximum world residual: 9.18977803700484e-9 m; threshold 0.01 m

 [32m✓[39m src/engine/geospatial/__tests__/core.test.ts [2m([22m[2m18 tests[22m[2m)[22m[32m 78[2mms[22m[39m
(node:19405) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/string.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 14[2mms[22m[39m
(node:19418) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstderr[2m | src/world-core/__tests__/prefabs.test.ts[2m > [22m[2mPrefab composition and ownership[2m > [22m[2mshares geometry/material across independent transforms, metadata and zones
[22m[39mTHREE.Material: parameter 'map' has value of undefined.

 [32m✓[39m src/world-core/__tests__/prefabs.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 105[2mms[22m[39m
(node:19426) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/renderer/__tests__/webgl.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 92[2mms[22m[39m
(node:19447) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useToggle.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 28[2mms[22m[39m
(node:19460) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/interceptors.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 80[2mms[22m[39m
(node:19468) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/phase-regression.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 22[2mms[22m[39m
(node:19476) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/route.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 31[2mms[22m[39m
(node:19484) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/character/__tests__/controller.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 75[2mms[22m[39m
(node:19497) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/terrain/__tests__/validation.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 78[2mms[22m[39m
(node:19505) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/backend.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 69[2mms[22m[39m
(node:19513) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/api-error.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:19521) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/health/__tests__/route.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 23[2mms[22m[39m
(node:19534) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/terrain-diagnostics.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 71[2mms[22m[39m
(node:19542) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/interactions/__tests__/registry.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 30[2mms[22m[39m
(node:19550) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/lib/__tests__/seo.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 21[2mms[22m[39m
(node:19558) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/decimal.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:19571) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/date.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 72[2mms[22m[39m
 [32m✓[39m src/utils/__tests__/object.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 9[2mms[22m[39m
 [32m✓[39m src/hooks/__tests__/useTranslations.types.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m

[2m Test Files [22m [1m[32m47 passed[39m[22m[90m (47)[39m
[2m      Tests [22m [1m[32m280 passed[39m[22m[90m (280)[39m
[2m   Start at [22m 11:13:29
[2m   Duration [22m 67.85s[2m (environment 66%, setup 16%, tests 8%, import 7%, transform 2%, worker 1%)[22m

[2mEnvironment [22m [33mjsdom was created 47 times[39m[2m · 116.12s total, 66% of tracked time[22m
[2m            [22m [2mcreate it once per worker with [22m[33mpool: 'vmThreads'[39m[2m (keeps per-file isolation) or [22m[33misolate: false[39m[2m (shares it across files)[22m
[2m            [22m [2mlearn more: https://vitest.dev/guide/improving-performance#test-environments[22m
```

## test-baseline.txt

- Original file: `test-baseline.txt`
- Original size: 17405 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:10075) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ vitest run
(node:10104) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

[1m[30m[46m RUN [49m[39m[22m [36mv5.0.5 [39m[90m/home/hatch/workspace/danang-simulation-work/danang-simulation-main[39m

(node:10159) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10160) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10161) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/client.test.ts [2m([22m[2m2 tests[22m[2m)[22m[33m 1034[2mms[22m[39m
   [32m✓[39m weather client retries [2m(2)[22m
     [33m[2m✓[22m[39m retries a transient failure and then succeeds[33m 1027[2mms[22m[39m
(node:10188) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/world.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 2819[2mms[22m[39m
   [32m✓[39m scene composition and browser runtime [2m(3)[22m
     [33m[2m✓[22m[39m preserves synthetic fixtures, shared rocks, character, grass, and owned resource disposal[33m 354[2mms[22m[39m
     [33m[2m✓[22m[39m owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources[33m 1853[2mms[22m[39m
     [33m[2m✓[22m[39m keeps Mini Map failure unavailable while restoring scene visibility[33m 608[2mms[22m[39m
(node:10196) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 1135[2mms[22m[39m
   [32m✓[39m HUD button semantics [2m(5)[22m
     [33m[2m✓[22m[39m shows read-only geographic confidence and height assumption in expanded F3[33m 429[2mms[22m[39m
     [33m[2m✓[22m[39m preserves the Phase 10 FPS, frame time, and checks chips in compact diagnostics[33m 593[2mms[22m[39m
(node:10204) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 1041[2mms[22m[39m
   [32m✓[39m imagery canvas lifecycle [2m(1)[22m
     [33m[2m✓[22m[39m IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates[33m 1034[2mms[22m[39m
(node:10232) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx [2m([22m[2m4 tests[22m[2m)[22m[33m 829[2mms[22m[39m
   [32m✓[39m runtime retry lifecycle [2m(4)[22m
     [33m[2m✓[22m[39m ignores callbacks from the disposed Strict Mode mount within the same generation[33m 427[2mms[22m[39m
 [32m✓[39m src/components/providers/__tests__/ThemeProvider.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 598[2mms[22m[39m
   [32m✓[39m ThemeProvider [2m(5)[22m
     [33m[2m✓[22m[39m persists an explicit choice and applies the dark class[33m 473[2mms[22m[39m
(node:10240) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10241) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 794[2mms[22m[39m
   [32m✓[39m imagery inspector [2m(3)[22m
     [33m[2m✓[22m[39m IMG-41/42/43/44 toggles an honest fixture footprint without network or a WebGL canvas[33m 610[2mms[22m[39m
(node:10261) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/controls/__tests__/events.test.ts [2m([22m[2m12 tests[22m[2m)[22m[33m 424[2mms[22m[39m
   [32m✓[39m input lifecycle [2m(12)[22m
     [33m[2m✓[22m[39m IMG-48 skips capture on a locked second click and releases mouse drag on blur[33m 303[2mms[22m[39m
(node:10269) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-state.test.tsx [2m([22m[2m6 tests[22m[2m)[22m[33m 502[2mms[22m[39m
(node:10277) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/geodata/__tests__/overpass.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 228[2mms[22m[39m
(node:10298) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/ui/__tests__/button.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 585[2mms[22m[39m
   [32m✓[39m Button [2m(2)[22m
     [33m[2m✓[22m[39m renders a native button by default[33m 500[2mms[22m[39m
(node:10307) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/number.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 90[2mms[22m[39m
(node:10321) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/imagery/__tests__/alignment.test.ts [2m([22m[2m36 tests[22m[2m)[22m[32m 165[2mms[22m[39m
(node:10329) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-preview.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 207[2mms[22m[39m
(node:10353) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/weather.test.ts [2m([22m[2m15 tests[22m[2m)[22m[32m 180[2mms[22m[39m
(node:10361) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/imagery.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 177[2mms[22m[39m
(node:10376) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
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

 [32m✓[39m src/modules/WorldExplorer/__tests__/geospatial.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[32m 108[2mms[22m[39m
(node:10384) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/snapshot.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 101[2mms[22m[39m
 [32m✓[39m src/hooks/__tests__/useTranslations.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 80[2mms[22m[39m
(node:10401) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10408) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/data-sources.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 121[2mms[22m[39m
(node:10425) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useToggle.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 87[2mms[22m[39m
 [32m✓[39m src/modules/WorldExplorer/__tests__/phase-regression.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 84[2mms[22m[39m
(node:10433) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10441) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstderr[2m | src/world-core/__tests__/prefabs.test.ts[2m > [22m[2mPrefab composition and ownership[2m > [22m[2mshares geometry/material across independent transforms, metadata and zones
[22m[39mTHREE.Material: parameter 'map' has value of undefined.

 [32m✓[39m src/world-core/__tests__/prefabs.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 92[2mms[22m[39m
(node:10454) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstdout[2m | src/engine/geospatial/__tests__/core.test.ts[2m > [22m[2mPhase 12 pure geographic core[2m > [22m[2mGEO-11 retains millimeter through 5km offsets with <=0.01m numerical residual
[22m[39mGEO-11 maximum world residual: 9.18977803700484e-9 m; threshold 0.01 m

 [32m✓[39m src/engine/geospatial/__tests__/core.test.ts [2m([22m[2m18 tests[22m[2m)[22m[32m 82[2mms[22m[39m
 [32m✓[39m src/engine/renderer/__tests__/webgl.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 165[2mms[22m[39m
(node:10463) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10469) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useDebounce.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 99[2mms[22m[39m
 [32m✓[39m src/utils/__tests__/api-error.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 15[2mms[22m[39m
(node:10484) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:10491) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/lib/__tests__/seo.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 75[2mms[22m[39m
(node:10500) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/i18n/__tests__/request.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 23[2mms[22m[39m
(node:10518) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/messages/__tests__/messages.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 105[2mms[22m[39m
(node:10526) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/interceptors.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 32[2mms[22m[39m
(node:10534) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/route.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 82[2mms[22m[39m
(node:10542) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/date.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 62[2mms[22m[39m
(node:10550) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/interactions/__tests__/registry.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 14[2mms[22m[39m
(node:10563) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/decimal.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 67[2mms[22m[39m
(node:10571) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/core/__tests__/runtime.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 68[2mms[22m[39m
(node:10579) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/character/__tests__/controller.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:10587) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/backend.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 74[2mms[22m[39m
(node:10610) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/health/__tests__/route.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 16[2mms[22m[39m
(node:10618) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/object.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 14[2mms[22m[39m
 [32m✓[39m src/utils/__tests__/string.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 8[2mms[22m[39m
 [32m✓[39m src/hooks/__tests__/useTranslations.types.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m

[2m Test Files [22m [1m[32m42 passed[39m[22m[90m (42)[39m
[2m      Tests [22m [1m[32m242 passed[39m[22m[90m (242)[39m
[2m   Start at [22m 10:45:19
[2m   Duration [22m 58.67s[2m (environment 66%, setup 16%, tests 8%, import 8%, transform 2%, worker 1%)[22m

[2mEnvironment [22m [33mjsdom was created 42 times[39m[2m · 99.89s total, 66% of tracked time[22m
[2m            [22m [2mcreate it once per worker with [22m[33mpool: 'vmThreads'[39m[2m (keeps per-file isolation) or [22m[33misolate: false[39m[2m (shares it across files)[22m
[2m            [22m [2mlearn more: https://vitest.dev/guide/improving-performance#test-environments[22m
```

## test-coverage-after.txt

- Original file: `test-coverage-after.txt`
- Original size: 35913 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:19975) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ vitest run --coverage --maxWorkers=2
(node:20004) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)

[1m[30m[46m RUN [49m[39m[22m [36mv5.0.5 [39m[90m/home/hatch/workspace/danang-simulation-work/danang-simulation-main[39m
      [2mCoverage enabled with [22m[33mv8[39m

(node:20035) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:20034) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-semantics.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 892[2mms[22m[39m
   [32m✓[39m HUD button semantics [2m(5)[22m
     [33m[2m✓[22m[39m shows read-only geographic confidence and height assumption in expanded F3[33m 395[2mms[22m[39m
     [33m[2m✓[22m[39m preserves the Phase 10 FPS, frame time, and checks chips in compact diagnostics[33m 401[2mms[22m[39m
(node:20064) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/client.test.ts [2m([22m[2m2 tests[22m[2m)[22m[33m 1038[2mms[22m[39m
   [32m✓[39m weather client retries [2m(2)[22m
     [33m[2m✓[22m[39m retries a transient failure and then succeeds[33m 1003[2mms[22m[39m
(node:20076) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/world.test.ts [2m([22m[2m3 tests[22m[2m)[22m[33m 7969[2mms[22m[39m
   [32m✓[39m scene composition and browser runtime [2m(3)[22m
     [33m[2m✓[22m[39m preserves synthetic fixtures, shared rocks, character, grass, and owned resource disposal[33m 754[2mms[22m[39m
     [33m[2m✓[22m[39m owns one loop, resizes camera, clears input on hidden context, and disposes listeners/resources[33m 6447[2mms[22m[39m
     [33m[2m✓[22m[39m keeps Mini Map failure unavailable while restoring scene visibility[33m 760[2mms[22m[39m
(node:20093) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery.test.tsx [2m([22m[2m3 tests[22m[2m)[22m[33m 890[2mms[22m[39m
   [32m✓[39m imagery inspector [2m(3)[22m
     [33m[2m✓[22m[39m IMG-41/42/43/44 toggles an honest fixture footprint without network or a WebGL canvas[33m 689[2mms[22m[39m
(node:20105) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/retry-lifecycle.test.tsx [2m([22m[2m4 tests[22m[2m)[22m[33m 703[2mms[22m[39m
   [32m✓[39m runtime retry lifecycle [2m(4)[22m
     [33m[2m✓[22m[39m ignores callbacks from the disposed Strict Mode mount within the same generation[33m 394[2mms[22m[39m
(node:20122) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/providers/__tests__/ThemeProvider.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[33m 515[2mms[22m[39m
   [32m✓[39m ThemeProvider [2m(5)[22m
     [33m[2m✓[22m[39m persists an explicit choice and applies the dark class[33m 327[2mms[22m[39m
(node:20134) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/components/ui/__tests__/button.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[33m 426[2mms[22m[39m
   [32m✓[39m Button [2m(2)[22m
     [33m[2m✓[22m[39m renders a native button by default[33m 398[2mms[22m[39m
(node:20146) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-lifecycle.test.tsx [2m([22m[2m1 test[22m[2m)[22m[33m 670[2mms[22m[39m
   [32m✓[39m imagery canvas lifecycle [2m(1)[22m
     [33m[2m✓[22m[39m IMG-38/45 removes pixels and attribution after rights rejection; retry revalidates[33m 665[2mms[22m[39m
(node:20163) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/controls/__tests__/events.test.ts [2m([22m[2m12 tests[22m[2m)[22m[33m 430[2mms[22m[39m
   [32m✓[39m input lifecycle [2m(12)[22m
     [33m[2m✓[22m[39m IMG-48 skips capture on a locked second click and releases mouse drag on blur[33m 322[2mms[22m[39m
(node:20175) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/hud-state.test.tsx [2m([22m[2m6 tests[22m[2m)[22m[33m 366[2mms[22m[39m
(node:20187) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/imagery-preview.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 186[2mms[22m[39m
(node:20204) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/imagery/__tests__/alignment.test.ts [2m([22m[2m36 tests[22m[2m)[22m[32m 139[2mms[22m[39m
(node:20218) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/weather.test.ts [2m([22m[2m15 tests[22m[2m)[22m[32m 90[2mms[22m[39m
 [32m✓[39m src/integrations/geodata/__tests__/overpass.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 111[2mms[22m[39m
(node:20234) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:20240) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/messages/__tests__/messages.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 29[2mms[22m[39m
 [32m✓[39m src/world-core/terrain/__tests__/synthetic.test.ts [2m([22m[2m8 tests[22m[2m)[22m[32m 15[2mms[22m[39m
(node:20261) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:20272) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useDebounce.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 37[2mms[22m[39m
(node:20289) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/imagery.test.ts [2m([22m[2m12 tests[22m[2m)[22m[32m 49[2mms[22m[39m
(node:20301) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
[90mstderr[2m | src/world-core/__tests__/prefabs.test.ts[2m > [22m[2mPrefab composition and ownership[2m > [22m[2mshares geometry/material across independent transforms, metadata and zones
[22m[39mTHREE.Material: parameter 'map' has value of undefined.

 [32m✓[39m src/world-core/__tests__/prefabs.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 77[2mms[22m[39m
(node:20318) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
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

 [32m✓[39m src/modules/WorldExplorer/__tests__/geospatial.test.tsx [2m([22m[2m5 tests[22m[2m)[22m[32m 97[2mms[22m[39m
(node:20330) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/terrain/__tests__/grid.test.ts [2m([22m[2m14 tests[22m[2m)[22m[32m 77[2mms[22m[39m
(node:20349) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/renderer/__tests__/webgl.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 81[2mms[22m[39m
(node:20361) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useTranslations.test.tsx [2m([22m[2m2 tests[22m[2m)[22m[32m 43[2mms[22m[39m
(node:20373) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/interceptors.test.ts [2m([22m[2m6 tests[22m[2m)[22m[32m 22[2mms[22m[39m
(node:20385) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/terrain/__tests__/validation.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 67[2mms[22m[39m
[90mstdout[2m | src/engine/geospatial/__tests__/core.test.ts[2m > [22m[2mPhase 12 pure geographic core[2m > [22m[2mGEO-11 retains millimeter through 5km offsets with <=0.01m numerical residual
[22m[39mGEO-11 maximum world residual: 9.18977803700484e-9 m; threshold 0.01 m

(node:20402) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/geospatial/__tests__/core.test.ts [2m([22m[2m18 tests[22m[2m)[22m[32m 23[2mms[22m[39m
(node:20414) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/i18n/__tests__/request.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 12[2mms[22m[39m
 [32m✓[39m src/engine/character/__tests__/controller.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 26[2mms[22m[39m
(node:20426) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
(node:20438) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/date.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:20455) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/terrain-diagnostics.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 13[2mms[22m[39m
(node:20467) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/snapshot.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 108[2mms[22m[39m
(node:20479) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/__tests__/backend.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 13[2mms[22m[39m
(node:20491) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/number.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 31[2mms[22m[39m
(node:20508) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/registries/__tests__/data-sources.test.ts [2m([22m[2m10 tests[22m[2m)[22m[32m 98[2mms[22m[39m
(node:20520) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/integrations/weather/__tests__/route.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 55[2mms[22m[39m
(node:20532) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/interactions/__tests__/registry.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 16[2mms[22m[39m
(node:20550) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useToggle.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 63[2mms[22m[39m
(node:20562) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/api/health/__tests__/route.test.ts [2m([22m[2m1 test[22m[2m)[22m[32m 13[2mms[22m[39m
(node:20574) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/modules/WorldExplorer/__tests__/phase-regression.test.ts [2m([22m[2m5 tests[22m[2m)[22m[32m 26[2mms[22m[39m
(node:20586) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/lib/__tests__/seo.test.ts [2m([22m[2m7 tests[22m[2m)[22m[32m 12[2mms[22m[39m
(node:20603) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/engine/core/__tests__/runtime.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 48[2mms[22m[39m
(node:20615) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/string.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 9[2mms[22m[39m
(node:20627) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/decimal.test.ts [2m([22m[2m2 tests[22m[2m)[22m[32m 15[2mms[22m[39m
(node:20639) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/world-core/terrain/__tests__/selection.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 54[2mms[22m[39m
(node:20656) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/utils/__tests__/api-error.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 15[2mms[22m[39m
(node:20668) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
 [32m✓[39m src/hooks/__tests__/useTranslations.types.test.ts [2m([22m[2m3 tests[22m[2m)[22m[32m 7[2mms[22m[39m
 [32m✓[39m src/utils/__tests__/object.test.ts [2m([22m[2m4 tests[22m[2m)[22m[32m 10[2mms[22m[39m

[2m Test Files [22m [1m[32m47 passed[39m[22m[90m (47)[39m
[2m      Tests [22m [1m[32m280 passed[39m[22m[90m (280)[39m
[2m   Start at [22m 11:15:28
[2m   Duration [22m 75.98s[2m (environment 57%, setup 18%, tests 12%, import 8%, worker 3%, transform 2%)[22m

[2mEnvironment [22m [33mjsdom was created 47 times[39m[2m · 72.77s total, 57% of tracked time[22m
[2m            [22m [2mcreate it once per worker with [22m[33mpool: 'vmThreads'[39m[2m (keeps per-file isolation) or [22m[33misolate: false[39m[2m (shares it across files)[22m
[2m            [22m [2mlearn more: https://vitest.dev/guide/improving-performance#test-environments[22m

[34m % [39m[2mCoverage report from [22m[33mv8[39m
-------------------|---------|----------|---------|---------|-------------------
File               | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-------------------|---------|----------|---------|---------|-------------------
All files          |   77.83 |     67.3 |   63.03 |   79.64 |                   
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
 ...gine/character |   84.84 |    76.74 |     100 |   85.38 |                   
  controller.ts    |   87.96 |    86.17 |     100 |   90.19 | ...37-139,151-152 
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
 ...engine/terrain |   83.33 |    66.66 |     100 |   83.33 |                   
  const.ts         |     100 |      100 |     100 |     100 |                   
  type.ts          |      80 |    66.66 |     100 |      80 | 146               
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
 ...ations/weather |   91.72 |    93.84 |   89.47 |    92.8 |                   
  client.ts        |   81.81 |    81.81 |      75 |   84.21 | 17,28-29          
  errors.ts        |     100 |      100 |     100 |     100 |                   
  freshness.ts     |     100 |      100 |     100 |     100 |                   
  mapper.ts        |     100 |    98.38 |     100 |     100 | 3                 
  provider.ts      |    92.1 |    82.35 |     100 |   94.28 | 26,29             
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
 .../WorldExplorer |    96.8 |    95.76 |   96.42 |   98.06 |                   
  controls.ts      |     100 |      100 |     100 |     100 |                   
  diagnostics.ts   |     100 |      100 |     100 |     100 |                   
  ...iagnostics.ts |   98.48 |    94.73 |     100 |     100 | 111               
  ...iagnostics.ts |   95.65 |       50 |     100 |     100 | 49                
  ...ry-preview.ts |    92.1 |    90.47 |     100 |   94.11 | 26-27             
  index.tsx        |       0 |      100 |       0 |       0 | 6-7               
  ...iagnostics.ts |     100 |    94.73 |     100 |     100 | 30                
  type.ts          |       0 |        0 |       0 |       0 |                   
 ...rer/components |   52.89 |    21.53 |    33.7 |   54.29 |                   
  ...tBoundary.tsx |       0 |        0 |       0 |       0 | 1-31              
  Icons.tsx        |     100 |      100 |     100 |     100 |                   
  ...Inspector.tsx |   89.47 |    86.48 |   93.33 |      92 | 48-50,159         
  ...rerClient.tsx |       0 |        0 |       0 |       0 | 1-18              
  WorldHud.tsx     |   23.96 |     11.6 |   21.87 |   23.85 | ...75-493,632-864 
 ...Explorer/hooks |   57.89 |    43.91 |   47.05 |   61.71 |                   
  ...oTelemetry.ts |     100 |      100 |     100 |     100 |                   
  ...ldExplorer.ts |    55.4 |    42.36 |   43.75 |    59.5 | ...48,353-388,427 
 ...plorer/runtime |   90.41 |     82.5 |   76.47 |   93.18 |                   
  world.ts         |   90.41 |     82.5 |   76.47 |   93.18 | ...30,552,566-569 
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
 ...d-core/terrain |   83.09 |    81.25 |   93.75 |    85.6 |                   
  fixtures.ts      |     100 |      100 |     100 |     100 |                   
  grid.ts          |   83.75 |    79.31 |    90.9 |   85.33 | ...98,112,209-213 
  selection.ts     |     100 |      100 |     100 |     100 |                   
  validation.ts    |   78.43 |    81.25 |     100 |   83.33 | ...,86,89,103,109 
 src/worlds/danang |     100 |      100 |     100 |     100 |                   
  const.ts         |     100 |      100 |     100 |     100 |                   
  data-sources.ts  |     100 |      100 |     100 |     100 |                   
  georeference.ts  |     100 |      100 |     100 |     100 |                   
  scene.ts         |     100 |      100 |     100 |     100 |                   
 ...ng/environment |    81.9 |    63.91 |     100 |   82.81 |                   
  simulation.ts    |   77.38 |    48.33 |     100 |   78.83 | ...16,279,285-322 
  solar.ts         |   90.47 |    89.18 |     100 |   90.19 | ...88-190,192-194 
  type.ts          |       0 |        0 |       0 |       0 |                   
 ...s/danang/zones |    97.5 |    85.36 |     100 |    98.7 |                   
  fixtures.ts      |     100 |      100 |     100 |     100 |                   
  manifest.ts      |     100 |      100 |     100 |     100 |                   
  ...ic-terrain.ts |    97.4 |    85.36 |     100 |   98.64 | 180               
-------------------|---------|----------|---------|---------|-------------------
```

## type-check-after.txt

- Original file: `type-check-after.txt`
- Original size: 644 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:20835) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ next typegen && tsc --noEmit --incremental false
(node:20864) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
Generating route types...
✓ Types generated successfully
(node:20887) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```

## type-check-baseline.txt

- Original file: `type-check-baseline.txt`
- Original size: 642 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
(node:9944) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
$ next typegen && tsc --noEmit --incremental false
(node:9973) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
Generating route types...
✓ Types generated successfully
(node:10008) [UNDICI-EHPA] Warning: EnvHttpProxyAgent is experimental, expect them to change at any time.
(Use `node --trace-warnings ...` to show where the warning was created)
```
