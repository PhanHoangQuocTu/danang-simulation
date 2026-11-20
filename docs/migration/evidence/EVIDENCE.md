# Evidence Log — docs/migration/evidence

Consolidated from 8 text log files in `docs/migration/evidence` on 2026-11-20 as part of Option A docs consolidation. Each section preserves one original file verbatim (UTF-16 files decoded to UTF-8, CRLF normalized to LF). The original `*.txt` files were removed; `*.cjs.txt` files (executable script copies) were kept in place. PNG, JSON and other non-txt evidence files are unchanged.
## Index

- [browser-driver.txt](#browser-drivertxt) — 3018 bytes, ASCII
- [browser.txt](#browsertxt) — 2126 bytes, UTF-8
- [node22-build.txt](#node22-buildtxt) — 1206 bytes, UTF-8
- [node22-format.txt](#node22-formattxt) — 62 bytes, ASCII
- [node22-lint.txt](#node22-linttxt) — 61 bytes, ASCII
- [node22-storybook.txt](#node22-storybooktxt) — 12581 bytes, UTF-8
- [node22-tests.txt](#node22-teststxt) — 544 bytes, UTF-8
- [node22-types.txt](#node22-typestxt) — 110 bytes, UTF-8

## browser-driver.txt

- Original file: `browser-driver.txt`
- Original size: 3018 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const chrome = spawn('/usr/bin/google-chrome', ['--headless=new', '--no-sandbox', '--disable-dev-shm-usage', '--remote-debugging-port=9227', '--user-data-dir=/tmp/danang-browser-profile', 'about:blank'], { stdio: 'ignore' });
const pause = ms => new Promise(resolve => setTimeout(resolve, ms));
(async () => {
  let socket;
  try {
    let target;
    for (let i=0;i<60;i++) {
      try { target = (await (await fetch('http://127.0.0.1:9227/json')).json()).find(t=>t.type==='page'); if(target) break; } catch {}
      await pause(100);
    }
    if (!target) throw new Error('Chrome debug endpoint unavailable');
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject});
    let id=0; const pending=new Map(); const events=[];
    socket.onmessage=({data})=>{ const msg=JSON.parse(data); if(msg.id){const callbacks=pending.get(msg.id);pending.delete(msg.id);if(msg.error)callbacks.reject(msg.error);else callbacks.resolve(msg.result);} else events.push(msg); };
    const send=(method,params={})=>new Promise((resolve,reject)=>{const next=++id;pending.set(next,{resolve,reject});socket.send(JSON.stringify({id:next,method,params}));});
    await send('Runtime.enable'); await send('Page.enable'); await send('Network.enable'); await send('Log.enable');
    const results=[];
    for(const route of ['/', '/vi', '/health', '/vi/health']) {
      await send('Network.clearBrowserCookies');
      events.length=0;
      await send('Page.navigate',{url:`http://127.0.0.1:3187${route}`});
      await pause(3000);
      const dom=await send('Runtime.evaluate',{expression:'JSON.stringify({title:document.title,lang:document.documentElement.lang,h1:document.querySelector("h1")?.textContent,canonical:document.querySelector("link[rel=canonical]")?.href,robots:document.querySelector("meta[name=robots]")?.content})',returnByValue:true});
      const errors=events.filter(e=>e.method==='Runtime.exceptionThrown'||(e.method==='Runtime.consoleAPICalled'&&['error','warning'].includes(e.params.type))||(e.method==='Log.entryAdded'&&['error','warning'].includes(e.params.entry.level))||e.method==='Network.loadingFailed'||(e.method==='Network.responseReceived'&&e.params.response.status>=400));
      results.push({route,dom:JSON.parse(dom.result.value),errors});
    }
    const health=await fetch('http://127.0.0.1:3187/api/health');
    const report={browser:await send('Browser.getVersion'),routes:results,health:{status:health.status,cacheControl:health.headers.get('cache-control'),body:await health.json()}};
    fs.writeFileSync('/tmp/danang-browser-results.json',JSON.stringify(report,null,2));
    console.log(JSON.stringify(report,null,2));
    if(results.some(r=>r.errors.length))process.exitCode=1;
  } finally { if(socket)socket.close();chrome.kill('SIGTERM'); }
})().catch(error=>{console.error(error);process.exitCode=1;chrome.kill('SIGTERM')});
```

## browser.txt

- Original file: `browser.txt`
- Original size: 2126 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
{
  "browser": {
    "protocolVersion": "1.3",
    "product": "Chrome/157.0.8103.78",
    "revision": "@4b3d0dabb8250b6f152d2d85d79e7706e309d087",
    "userAgent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/157.0.0.0 Safari/537.36",
    "jsVersion": "15.7.112.43"
  },
  "routes": [
    {
      "route": "/",
      "dom": {
        "title": "Frontend Boilerplate: Next.js, shadcn/ui, i18n",
        "lang": "en",
        "h1": "Next.js frontend boilerplate",
        "canonical": "http://localhost:3000/",
        "robots": "noindex, nofollow"
      },
      "errors": []
    },
    {
      "route": "/vi",
      "dom": {
        "title": "Frontend Boilerplate: Next.js, shadcn/ui, i18n",
        "lang": "vi",
        "h1": "Next.js frontend boilerplate",
        "canonical": "http://localhost:3000/vi",
        "robots": "noindex, nofollow"
      },
      "errors": []
    },
    {
      "route": "/health",
      "dom": {
        "title": "System health | Frontend Boilerplate",
        "lang": "en",
        "h1": "System health",
        "canonical": "http://localhost:3000/health",
        "robots": "noindex, nofollow"
      },
      "errors": []
    },
    {
      "route": "/vi/health",
      "dom": {
        "title": "Tình trạng hệ thống | Frontend Boilerplate",
        "lang": "vi",
        "h1": "Tình trạng hệ thống",
        "canonical": "http://localhost:3000/vi/health",
        "robots": "noindex, nofollow"
      },
      "errors": []
    }
  ],
  "health": {
    "status": 200,
    "cacheControl": "no-store",
    "body": {
      "status": "ok",
      "timestamp": "2026-11-12T07:11:50.885Z",
      "uptime": 13,
      "version": "0.1.0",
      "environment": "development"
    }
  }
}
Starting server 1/1: exec /home/phuonglt/.nvm/versions/node/v22.22.3/bin/node node_modules/next/dist/bin/next start --port 3187
Waiting for server on port 3187...
Server ready on port 3187

All 1 server(s) ready
Running: /home/phuonglt/.nvm/versions/node/v22.22.3/bin/node /tmp/danang-browser.cjs


Stopping 1 server(s)...
Server 1 stopped
All servers stopped
```

## node22-build.txt

- Original file: `node22-build.txt`
- Original size: 1206 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
$ next build
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 44ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 2.2s
  Running TypeScript ...
  Finished TypeScript in 484ms ...
  Collecting page data using 15 workers ...
  Generating static pages using 15 workers (0/14) ...
  Generating static pages using 15 workers (3/14) 
  Generating static pages using 15 workers (6/14) 
  Generating static pages using 15 workers (10/14) 
✓ Generating static pages using 15 workers (14/14) in 493ms
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
├ ƒ /api/posts
├ ƒ /api/posts/[id]
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

## node22-format.txt

- Original file: `node22-format.txt`
- Original size: 62 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
$ biome format .
Checked 301 files in 29ms. No fixes applied.
```

## node22-lint.txt

- Original file: `node22-lint.txt`
- Original size: 61 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
$ biome lint .
Checked 302 files in 102ms. No fixes applied.
```

## node22-storybook.txt

- Original file: `node22-storybook.txt`
- Original size: 12581 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
$ storybook build

┌  Building storybook v10.6.2
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
transforming...
✓ 4684 modules transformed.
rendering chunks...
computing gzip size...
│  Vite storybook-static/iframe.html
│  19.89 kB │ gzip:   5.53 kB
│  storybook-static/assets/iframe-CDkYM-F_.css
│  185.56 kB │ gzip:  27.42 kB
│  storybook-static/assets/iframe-f547KAaX.js
│  0.04 kB │ gzip:   0.06 kB
│  storybook-static/assets/react-CekojL5_.js
│  0.09 kB │ gzip:   0.10 kB
│  storybook-static/assets/theming-9tlzv9Jk.js
│  0.11 kB │ gzip:   0.12 kB
│  storybook-static/assets/components-CjWJSY1B.js
│  0.19 kB │ gzip:   0.16 kB
│  storybook-static/assets/dist-BpWrIoGY.js
│  0.22 kB │ gzip:   0.19 kB
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
│  storybook-static/assets/info-CSIANWNH.js
│  0.34 kB │ gzip:   0.26 kB
│  storybook-static/assets/ellipsis-Dfn6svcK.js
│  0.39 kB │ gzip:   0.27 kB
│  storybook-static/assets/skeleton-ii3-gntU.js
│  0.41 kB │ gzip:   0.29 kB
│  storybook-static/assets/dist-BOqIPbtB.js
│  0.42 kB │ gzip:   0.31 kB
│  storybook-static/assets/use-mobile-BB6e8wyp.js
│  0.42 kB │ gzip:   0.29 kB
│  storybook-static/assets/inbox-CbvC1Bd7.js
│  0.43 kB │ gzip:   0.32 kB
│  storybook-static/assets/jsx-runtime-BxfXuubT.js
│  0.43 kB │ gzip:   0.30 kB
│  storybook-static/assets/dist-P5aEaGBE.js
│  0.49 kB │ gzip:   0.33 kB
│  storybook-static/assets/textarea.stories-yYqLxvKK.js
│  0.65 kB │ gzip:   0.38 kB
│  storybook-static/assets/chunk-UAWMPV5J-Dsq9DvcU.js
│  0.74 kB │ gzip:   0.45 kB
│  storybook-static/assets/dist-CkwUnTzi.js
│  0.75 kB │ gzip:   0.46 kB
│  storybook-static/assets/toggle.stories-C8FDb-AT.js
│  0.78 kB │ gzip:   0.44 kB
│  storybook-static/assets/checkbox.stories-DDAcRNmK.js
│  0.80 kB │ gzip:   0.37 kB
│  storybook-static/assets/label.stories-C_2Cv5xJ.js
│  0.82 kB │ gzip:   0.48 kB
│  storybook-static/assets/textarea-BIK_QUej.js
│  0.83 kB │ gzip:   0.50 kB
│  storybook-static/assets/dist-Ch4r59Bc.js
│  0.85 kB │ gzip:   0.50 kB
│  storybook-static/assets/dist-B0agaa99.js
│  0.85 kB │ gzip:   0.54 kB
│  storybook-static/assets/shim-C5Xie9xJ.js
│  0.85 kB │ gzip:   0.46 kB
│  storybook-static/assets/tooltip.stories-NB4qHPnm.js
│  0.86 kB │ gzip:   0.49 kB
│  storybook-static/assets/skeleton.stories-Ckcr3COc.js
│  0.92 kB │ gzip:   0.46 kB
│  storybook-static/assets/spinner.stories--CFn2sVu.js
│  0.94 kB │ gzip:   0.51 kB
│  storybook-static/assets/with-selector-yh4Qcx8N.js
│  0.94 kB │ gzip:   0.53 kB
│  storybook-static/assets/switch.stories-dCcxDVpc.js
│  1.01 kB │ gzip:   0.54 kB
│  storybook-static/assets/input-DwA6ZmhC.js
│  1.01 kB │ gzip:   0.56 kB
│  storybook-static/assets/dist-r86zl3cz.js
│  1.03 kB │ gzip:   0.55 kB
│  storybook-static/assets/label-CmfPN1qo.js
│  1.05 kB │ gzip:   0.62 kB
│  storybook-static/assets/input.stories-B-cWw7In.js
│  1.18 kB │ gzip:   0.53 kB
│  storybook-static/assets/select.stories-CEslXTDI.js
│  1.20 kB │ gzip:   0.60 kB
│  storybook-static/assets/separator.stories-De_qqVU7.js
│  1.25 kB │ gzip:   0.55 kB
│  storybook-static/assets/rolldown-runtime-2s6bX4vc.js
│  1.26 kB │ gzip:   0.69 kB
│  storybook-static/assets/input-group.stories-DR4WnzLn.js
│  1.34 kB │ gzip:   0.55 kB
│  storybook-static/assets/StatusBadge.stories-QYE_N5od.js
│  1.37 kB │ gzip:   0.73 kB
│  storybook-static/assets/separator-BCQ3sk0X.js
│  1.39 kB │ gzip:   0.70 kB
│  storybook-static/assets/card.stories-D4T3OnZf.js
│  1.40 kB │ gzip:   0.65 kB
│  storybook-static/assets/badge.stories-BaKpp-4I.js
│  1.43 kB │ gzip:   0.66 kB
│  storybook-static/assets/dialog.stories-CMNI2dFy.js
│  1.47 kB │ gzip:   0.66 kB
│  storybook-static/assets/alert.stories-nEJCRyyA.js
│  1.54 kB │ gzip:   0.65 kB
│  storybook-static/assets/aspect-ratio.stories-uFYkMJs8.js
│  1.54 kB │ gzip:   0.82 kB
│  storybook-static/assets/collapsible.stories-DuzjAggU.js
│  1.56 kB │ gzip:   0.68 kB
│  storybook-static/assets/kbd.stories-DAoGi08e.js
│  1.59 kB │ gzip:   0.74 kB
│  storybook-static/assets/preload-helper-0TbE23ZY.js
│  1.64 kB │ gzip:   0.87 kB
│  storybook-static/assets/dropdown-menu.stories-E42_1TFO.js
│  1.66 kB │ gzip:   0.70 kB
│  storybook-static/assets/chunk-IMSF75WX-mRJxbqao.js
│  1.67 kB │ gzip:   0.90 kB
│  storybook-static/assets/badge-Mg0_85pU.js
│  1.74 kB │ gzip:   0.83 kB
│  storybook-static/assets/alert-CcgLZY60.js
│  1.79 kB │ gzip:   0.82 kB
│  storybook-static/assets/ThemeProvider-C5qukvMB.js
│  1.83 kB │ gzip:   0.97 kB
│  storybook-static/assets/card-vCZa8JuI.js
│  1.85 kB │ gzip:   0.62 kB
│  storybook-static/assets/dist-Cp023XQn.js
│  1.89 kB │ gzip:   0.83 kB
│  storybook-static/assets/form.stories-DYkO_ewX.js
│  2.05 kB │ gzip:   0.97 kB
│  storybook-static/assets/sheet.stories-BML_OZV0.js
│  2.09 kB │ gzip:   0.72 kB
│  storybook-static/assets/toggle-qd42sYwI.js
│  2.26 kB │ gzip:   1.19 kB
│  storybook-static/assets/button-C4MUn5ML.js
│  2.30 kB │ gzip:   0.99 kB
│  storybook-static/assets/button-group.stories-Bye6h3-k.js
│  2.36 kB │ gzip:   1.00 kB
│  storybook-static/assets/native-select.stories-B6VCg_Uc.js
│  2.56 kB │ gzip:   1.13 kB
│  storybook-static/assets/dist-D9N3sX5S.js
│  2.76 kB │ gzip:   1.21 kB
│  storybook-static/assets/breadcrumb.stories-DZOH0jhY.js
│  2.94 kB │ gzip:   1.02 kB
│  storybook-static/assets/progress.stories-IorNQcWy.js
│  2.95 kB │ gzip:   1.43 kB
│  storybook-static/assets/empty.stories-CowPePRU.js
│  3.17 kB │ gzip:   1.17 kB
│  storybook-static/assets/button.stories-CrsfxGLz.js
│  3.20 kB │ gzip:   1.18 kB
│  storybook-static/assets/dist-D_OpuV9i.js
│  3.30 kB │ gzip:   1.50 kB
│  storybook-static/assets/chunk-DRQKCCAG-PeJgrGxi.js
│  3.37 kB │ gzip:   1.40 kB
│  storybook-static/assets/pagination.stories-cPNNr9lu.js
│  3.56 kB │ gzip:   1.19 kB
│  storybook-static/assets/sheet-8U1qGEKp.js
│  3.57 kB │ gzip:   1.18 kB
│  storybook-static/assets/dialog-BM39MMWJ.js
│  3.58 kB │ gzip:   1.21 kB
│  storybook-static/assets/createLucideIcon-DTc4q1oi.js
│  3.66 kB │ gzip:   1.68 kB
│  storybook-static/assets/react-dom-qBXZUrFy.js
│  3.92 kB │ gzip:   1.44 kB
│  storybook-static/assets/input-group-qIV5y_la.js
│  4.02 kB │ gzip:   1.41 kB
│  storybook-static/assets/table.stories-DdDbawO3.js
│  4.34 kB │ gzip:   1.34 kB
│  storybook-static/assets/common.stories-DBWgobQk.js
│  4.36 kB │ gzip:   1.62 kB
│  storybook-static/assets/item.stories-Bopu_jSC.js
│  4.57 kB │ gzip:   1.77 kB
│  storybook-static/assets/layouts.stories-BIVUB6Ri.js
│  4.66 kB │ gzip:   1.97 kB
│  storybook-static/assets/dist-C5Bm-cwW.js
│  4.80 kB │ gzip:   2.10 kB
│  storybook-static/assets/chunk-7PIQR4A3-BRrgxE8n.js
│  5.14 kB │ gzip:   1.93 kB
│  storybook-static/assets/field.stories-DQWwus79.js
│  5.28 kB │ gzip:   1.86 kB
│  storybook-static/assets/checkbox-DtT9_n_P.js
│  5.31 kB │ gzip:   2.24 kB
│  storybook-static/assets/switch-BK4MxfZM.js
│  5.32 kB │ gzip:   2.23 kB
│  storybook-static/assets/dist-DflGosJS.js
│  5.72 kB │ gzip:   2.16 kB
│  storybook-static/assets/avatar.stories-C3omurVb.js
│  5.77 kB │ gzip:   2.12 kB
│  storybook-static/assets/toggle-group.stories-Bbdh1o9e.js
│  6.37 kB │ gzip:   2.43 kB
│  storybook-static/assets/hover-card.stories-C8WL2IP8.js
│  6.81 kB │ gzip:   2.61 kB
│  storybook-static/assets/dropdown-menu-Ju6ZVuhO.js
│  7.02 kB │ gzip:   2.41 kB
│  storybook-static/assets/tabs.stories-DzuWtMe0.js
│  7.16 kB │ gzip:   2.58 kB
│  storybook-static/assets/accordion.stories-D0aqF7vB.js
│  7.43 kB │ gzip:   2.78 kB
│  storybook-static/assets/context-menu.stories-DdS01Jvu.js
│  7.51 kB │ gzip:   2.73 kB
│  storybook-static/assets/alert-dialog.stories-Dtqn5U-j.js
│  7.59 kB │ gzip:   2.21 kB
│  storybook-static/assets/popover.stories-DMmHbfOy.js
│  7.76 kB │ gzip:   3.00 kB
│  storybook-static/assets/react-C7Icd8fu.js
│  7.90 kB │ gzip:   3.03 kB
│  storybook-static/assets/radio-group.stories-C2xNgath.js
│  8.01 kB │ gzip:   3.17 kB
│  storybook-static/assets/dist-ZpFVeXSN.js
│  8.67 kB │ gzip:   3.04 kB
│  storybook-static/assets/form-field.stories-C8iEfw-q.js
│  8.67 kB │ gzip:   2.41 kB
│  storybook-static/assets/menubar.stories-CzxY4j-R.js
│  10.10 kB │ gzip:   3.57 kB
│  storybook-static/assets/input-otp.stories-96uZ2hQH.js
│  12.75 kB │ gzip:   4.94 kB
│  storybook-static/assets/slider.stories-Dk2h8q6e.js
│  13.03 kB │ gzip:   5.01 kB
│  storybook-static/assets/sidebar.stories-rGK498BN.js
│  13.39 kB │ gzip:   4.19 kB
│  storybook-static/assets/dist-DyEXIXso.js
│  14.47 kB │ gzip:   4.92 kB
│  storybook-static/assets/es2015-C53hGp5h.js
│  14.52 kB │ gzip:   5.58 kB
│  storybook-static/assets/scroll-area.stories-quywJUl5.js
│  16.03 kB │ gzip:   5.16 kB
│  storybook-static/assets/command.stories-Bo7yOKp9.js
│  16.55 kB │ gzip:   6.14 kB
│  storybook-static/assets/navigation-menu.stories-BRpqPRSj.js
│  19.72 kB │ gzip:   6.19 kB
│  storybook-static/assets/floating-ui.react-dom-BDsy8TX8.js
│  22.18 kB │ gzip:   8.65 kB
│  storybook-static/assets/carousel.stories-Ba4Nbkeq.js
│  24.82 kB │ gzip:   9.57 kB
│  storybook-static/assets/select-Dd8npHHh.js
│  25.71 kB │ gzip:   8.63 kB
│  storybook-static/vite-inject-mocker-entry.js
│  27.81 kB │ gzip:   9.67 kB
│  storybook-static/assets/matchers-JIUQ3HVY-DWxIgmlT.js
│  28.79 kB │ gzip:   9.68 kB
│  storybook-static/assets/hooks-DV0bW-c2.js
│  29.87 kB │ gzip:  12.61 kB
│  storybook-static/assets/Color-6AOWCN3U-7uYMp6so.js
│  30.34 kB │ gzip:  11.46 kB
│  storybook-static/assets/WithTooltip-CDUNV5IS-DN9bjq6E.js
│  32.70 kB │ gzip:  11.46 kB
│  storybook-static/assets/drawer.stories-DrEFhbuS.js
│  33.62 kB │ gzip:   9.89 kB
│  storybook-static/assets/sonner.stories-Q3C6W8Gb.js
│  36.80 kB │ gzip:  10.65 kB
│  storybook-static/assets/resizable.stories-Cy-GsOU6.js
│  46.11 kB │ gzip:  14.97 kB
│  storybook-static/assets/esm-C2oGAgJS.js
│  57.43 kB │ gzip:  16.68 kB
│  storybook-static/assets/syntaxhighlighter-4REYKNEV-R4LHKEnV.js
│  75.77 kB │ gzip:  27.20 kB
│  storybook-static/assets/calendar.stories-DxkKaj1G.js
│  80.74 kB │ gzip:  23.91 kB
│  storybook-static/assets/combobox.stories-Bsx0H4sR.js
│  122.39 kB │ gzip:  42.53 kB
│  storybook-static/assets/form-DPwElEZQ.js
│  123.73 kB │ gzip:  38.05 kB
│  storybook-static/assets/utilities.stories-DymsWg09.js
│  153.34 kB │ gzip:  50.63 kB
│  storybook-static/assets/react-18-mQvaX4pw.js
│  208.00 kB │ gzip:  65.28 kB
│  storybook-static/assets/chart.stories-DJc7D5xk.js
│  394.71 kB │ gzip: 116.73 kB
│  storybook-static/assets/axe-C7pk9Kxd.js
│  659.32 kB │ gzip: 187.87 kB
│  storybook-static/assets/DocsRenderer-JROSPFPF-w3to-puJ.js
│  826.30 kB │ gzip: 264.32 kB
│  storybook-static/assets/iframe-B0Rm1V3X.js
│  1,416.98 kB │ gzip: 399.93 kB

│  Vite ✓ built in 4.78s
│
◇  Output directory:
│  /home/phuonglt/Pictures/danang-simulation/storybook-static
│
└  Storybook build completed successfully
```

## node22-tests.txt

- Original file: `node22-tests.txt`
- Original size: 544 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
$ vitest run

 RUN  v5.0.5 /home/phuonglt/Pictures/danang-simulation


 Test Files  21 passed (21)
      Tests  74 passed (74)
   Start at  14:06:15
   Duration  2.68s (environment 71%, setup 14%, transform 9%, import 3%, tests 3%, worker 1%)

Environment  jsdom was created 21 times · 20.12s total, 71% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## node22-types.txt

- Original file: `node22-types.txt`
- Original size: 110 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
$ next typegen && tsc --noEmit --incremental false
Generating route types...
✓ Types generated successfully
```
