# Evidence Log — docs/audit/phase-11/evidence

Consolidated from 12 text log files in `docs/audit/phase-11/evidence` on 2026-11-20 as part of Option A docs consolidation. Each section preserves one original file verbatim (UTF-16 files decoded to UTF-8, CRLF normalized to LF). The original `*.txt` files were removed; `*.cjs.txt` files (executable script copies) were kept in place. PNG, JSON and other non-txt evidence files are unchanged.
## Index

- [browser-driver.txt](#browser-drivertxt) — 5986 bytes, ASCII
- [build.txt](#buildtxt) — 2914 bytes, UTF-16LE with BOM
- [format-check-final.txt](#format-check-finaltxt) — 778 bytes, UTF-16LE with BOM
- [format-check.txt](#format-checktxt) — 778 bytes, UTF-16LE with BOM
- [integrity.txt](#integritytxt) — 444 bytes, UTF-8 with BOM
- [lint-final.txt](#lint-finaltxt) — 770 bytes, UTF-16LE with BOM
- [lint.txt](#linttxt) — 790 bytes, UTF-16LE with BOM
- [server-standalone.txt](#server-standalonetxt) — 146 bytes, UTF-8
- [server.txt](#servertxt) — 271 bytes, UTF-8
- [storybook.txt](#storybooktxt) — 30346 bytes, UTF-16LE with BOM
- [test.txt](#testtxt) — 1760 bytes, UTF-16LE with BOM
- [type-check.txt](#type-checktxt) — 904 bytes, UTF-16LE with BOM

## browser-driver.txt

- Original file: `browser-driver.txt`
- Original size: 5986 bytes
- Original encoding: ASCII
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path'),readline=require('node:readline');
const dir=path.resolve('docs/audit/phase-11/evidence'),origin='http://localhost:3191';
const report={origin,node:process.version,started:new Date().toISOString(),weather:'Real BFF only; no fabricated payloads or observations',commands:[],events:[]};
const out=fs.openSync(path.join(dir,'server.txt'),'w');
const server=spawn(process.execPath,['--use-system-ca',require.resolve('next/dist/bin/next'),'start','--port','3191','--hostname','0.0.0.0'],{windowsHide:true,stdio:['ignore',out,out]});
const chrome=spawn('C:/Program Files/Google/Chrome/Application/chrome.exe',['--headless=new','--remote-debugging-port=9341','--remote-debugging-address=127.0.0.1','--user-data-dir='+path.resolve('.next/phase11-chrome'),'--no-first-run','--no-default-browser-check','--window-size=1920,1080','about:blank'],{windowsHide:true,stdio:'ignore'});
let socket,sequence=0;const pending=new Map();const pause=ms=>new Promise(r=>setTimeout(r,ms));
function save(){fs.writeFileSync(path.join(dir,'browser.json'),JSON.stringify(report,null,2)+'\n')}
async function send(method,params={}){const id=++sequence;const p=new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});setTimeout(()=>{if(pending.delete(id))reject(new Error('Timeout '+method))},30000).unref()});socket.send(JSON.stringify({id,method,params}));return p}
async function evaluate(expression){const r=await send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function waitFor(expression,ms=15000){const t=Date.now();while(Date.now()-t<ms){if(await evaluate(expression))return true;await pause(150)}throw new Error('Condition '+expression)}
async function key(code,key,type='keyDown',extra={}){await send('Input.dispatchKeyEvent',{type,code,key,...extra})}
async function tap(code,name=code.replace('Key','').toLowerCase(),extra={}){await key(code,name,'keyDown',extra);await key(code,name,'keyUp',extra)}
async function focus(){await evaluate("document.querySelector('.world-canvas').focus()")}
async function rect(selector){return evaluate('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2,w:r.width,h:r.height}})()')}
async function click(selector){const r=await rect(selector);await send('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,x:r.x,y:r.y});await send('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,x:r.x,y:r.y})}
async function shot(name){const r=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(dir,name+'.png'),Buffer.from(r.data,'base64'));return name+'.png'}
async function snapshot(){return evaluate("({...document.querySelector('.world-explorer')?.dataset,debug:document.querySelector('.world-debug')?.innerText,weather:document.querySelector('.world-weather')?.innerText,map:document.querySelector('.world-map-panel')?.innerText,heap:performance.memory?.usedJSHeapSize})")}
async function navigate(route='/'){await send('Page.navigate',{url:origin+route});await waitFor("document.querySelector('.world-explorer')?.dataset.runtimeStatus==='ready'",45000);await pause(600)}
async function viewport(width,height,touch=false){await send('Emulation.setDeviceMetricsOverride',{width,height,deviceScaleFactor:1,mobile:touch});await send('Emulation.setTouchEmulationEnabled',{enabled:touch,maxTouchPoints:touch?5:1})}
async function measure(name,ms=2000){const before=await snapshot();const frames=await evaluate('new Promise(resolve=>{const a=[];let prev=performance.now(),start=prev;function tick(now){a.push(now-prev);prev=now;if(now-start<'+ms+')requestAnimationFrame(tick);else{a.sort((x,y)=>x-y);resolve({n:a.length,elapsed:now-start,averageMs:(now-start)/a.length,p95Ms:a[Math.floor(a.length*.95)],fps:1000*a.length/(now-start)})}}requestAnimationFrame(tick)})');const result={name,before,frames,after:await snapshot()};report.commands.push({measurement:result});save();return result}
function cleanup(){save();try{socket?.close()}catch{}chrome.kill();server.kill()}
process.on('SIGINT',()=>{cleanup();process.exit()});process.on('SIGTERM',()=>{cleanup();process.exit()});
(async()=>{let targets;for(let i=0;i<100;i++){try{targets=await(await fetch('http://127.0.0.1:9341/json')).json();if(targets.some(t=>t.type==='page'))break}catch{}await pause(200)}
socket=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>socket.addEventListener('open',r,{once:true}));
socket.addEventListener('message',({data})=>{const m=JSON.parse(data);if(m.id){const p=pending.get(m.id);if(p){pending.delete(m.id);m.error?p.reject(new Error(JSON.stringify(m.error))):p.resolve(m.result)}}else if(['Runtime.exceptionThrown','Runtime.consoleAPICalled','Log.entryAdded','Network.loadingFailed','Network.responseReceived'].includes(m.method)){if(m.method==='Network.responseReceived'){if(m.params.response.url.includes('/api/'))report.events.push({method:m.method,url:m.params.response.url,status:m.params.response.status})}else report.events.push(m);save()}});
await send('Page.enable');await send('Runtime.enable');await send('Log.enable');await send('Network.enable');console.log('AUDIT_BROWSER_READY');
const rl=readline.createInterface({input:process.stdin,terminal:false});for await(const line of rl){if(!line.trim())continue;if(line==='EXIT'){cleanup();console.log('CLEANED');process.exit(0)}try{const code=JSON.parse(line);const result=await eval('(async()=>{'+code+'})()');report.commands.push({code,result});save();console.log('RESULT '+JSON.stringify(result))}catch(e){report.commands.push({code:line,error:String(e.stack)});save();console.log('ERROR '+e.stack)}}
cleanup();
})().catch(e=>{console.error(e);report.failure=String(e.stack);cleanup();process.exit(1)});
```

## build.txt

- Original file: `build.txt`
- Original size: 2914 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next build
At line:2 char:1
+ & (Get-Command pnpm.cmd).Source build *> docs/audit/phase-11/evidence ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
▲ Next.js 16.4.2 (Turbopack)
✓ Running next.config.ts took 158ms
- Experiments (use with caution):
  ✓ globalNotFound

  Creating an optimized production build ...
✓ Compiled successfully in 12.5s
  Running TypeScript ...
  Finished TypeScript in 5.7s ...
  Collecting page data using 7 workers ...
  Generating static pages using 7 workers (0/14) ...
  Generating static pages using 7 workers (3/14) 
  Generating static pages using 7 workers (6/14) 
  Generating static pages using 7 workers (10/14) 
✓ Generating static pages using 7 workers (14/14) in 1692ms
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

## format-check-final.txt

- Original file: `format-check-final.txt`
- Original size: 778 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:2 char:1
+ & (Get-Command pnpm.cmd).Source format:check *> docs/audit/phase-11/e ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 344 files in 478ms. No fixes applied.
```

## format-check.txt

- Original file: `format-check.txt`
- Original size: 778 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome format .
At line:2 char:1
+ & (Get-Command pnpm.cmd).Source format:check *> docs/audit/phase-11/e ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome format .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 341 files in 311ms. No fixes applied.
```

## integrity.txt

- Original file: `integrity.txt`
- Original size: 444 bytes
- Original encoding: UTF-8 with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
Audit source integrity check
Source/history/dependency/config diff exit code: 0
Final status:
warning: unable to access 'C:\Users\USER/.config/git/ignore': Permission denied
warning: unable to access 'C:\Users\USER/.config/git/ignore': Permission denied
?? PHASE_11_AUDIT_REPORT.md
?? docs/audit/
?? docs/prompts/PHASE_11.md
Owned listener count on 3191/9341: 0
All tracked files diff exit code: 0
Tracked diff whitespace check exit code: 0
```

## lint-final.txt

- Original file: `lint-final.txt`
- Original size: 770 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:2 char:1
+ & (Get-Command pnpm.cmd).Source lint *> docs/audit/phase-11/evidence/ ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 345 files in 722ms. No fixes applied.
```

## lint.txt

- Original file: `lint.txt`
- Original size: 790 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ biome lint .
At line:2 char:271
+ ... | Out-Null; & (Get-Command pnpm.cmd).Source lint *> docs/audit/phase- ...
+                 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ biome lint .:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Checked 342 files in 767ms. No fixes applied.
```

## server-standalone.txt

- Original file: `server-standalone.txt`
- Original size: 146 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3191
- Network:       http://0.0.0.0:3191
✓ Ready in 0ms
✓ Running next.config took 60ms
```

## server.txt

- Original file: `server.txt`
- Original size: 271 bytes
- Original encoding: UTF-8
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
▲ Next.js 16.4.2
- Local:         http://localhost:3191
- Network:       http://0.0.0.0:3191
✓ Ready in 982ms
✓ Running next.config.ts took 300ms
⚠ "next start" does not work with "output: standalone" configuration. Use "node .next/standalone/server.js" instead.
```

## storybook.txt

- Original file: `storybook.txt`
- Original size: 30346 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ storybook build
At line:2 char:1
+ & (Get-Command pnpm.cmd).Source build-storybook *> docs/audit/phase-1 ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ storybook build:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

T  Building storybook v10.6.2
|
o  Cleaning outputDir: storybook-static
(node:9384) [DEP0205] DeprecationWarning: `module.register()` is deprecated. Use `module.registerHooks()` instead.
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
✓ 4801 modules transformed.
rendering chunks...
computing gzip size...
|  Vite storybook-static/iframe.html
|  20.52 kB │ gzip:   5.60 kB
|  storybook-static/assets/world-CZmdgin0.css
|  19.83 kB │ gzip:   4.71 kB
|  storybook-static/assets/iframe-B2LDjb9J.css
|  206.30 kB │ gzip:  30.85 kB
|  storybook-static/assets/iframe-DWva67kn.js
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
|  storybook-static/assets/WorldExplorerClient.stories-Bf8WuNRZ.js
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
|  storybook-static/assets/tooltip.stories-BUoMIiEF.js
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
|  storybook-static/assets/form.stories-DxPMjvdP.js
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
|  storybook-static/assets/common.stories-DrZmWoxW.js
|  4.37 kB │ gzip:   1.62 kB
|  storybook-static/assets/table.stories-CwoXqX2f.js
|  4.39 kB │ gzip:   1.34 kB
|  storybook-static/assets/item.stories-CPT7yNG5.js
|  4.58 kB │ gzip:   1.76 kB
|  storybook-static/assets/layouts.stories-FugOP7AA.js
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
|  storybook-static/assets/ClientBoundary.stories-Bc8ndrgv.js
|  6.03 kB │ gzip:   2.63 kB
|  storybook-static/assets/toggle-group.stories-C7ZwWetR.js
|  6.43 kB │ gzip:   2.43 kB
|  storybook-static/assets/WorldHud.stories-B0mrKrlJ.js
|  6.47 kB │ gzip:   2.56 kB
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
|  storybook-static/assets/form-field.stories-mDgvJjxF.js
|  8.72 kB │ gzip:   2.42 kB
|  storybook-static/assets/menubar.stories-BSKf86iT.js
|  10.19 kB │ gzip:   3.58 kB
|  storybook-static/assets/input-otp.stories-ngCTD5Oe.js
|  12.77 kB │ gzip:   4.94 kB
|  storybook-static/assets/slider.stories-DMrVLFUF.js
|  13.05 kB │ gzip:   5.02 kB
|  storybook-static/assets/sidebar.stories-A916D1ES.js
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
|  storybook-static/assets/hooks-BavKIzeV.js
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
|  storybook-static/assets/WorldExplorerClient-LNZ644fH.js
|  71.94 kB │ gzip:  26.42 kB
|  storybook-static/assets/syntaxhighlighter-4REYKNEV-BMUJTQLL.js
|  75.83 kB │ gzip:  27.23 kB
|  storybook-static/assets/calendar.stories-D4SJ_MSG.js
|  80.74 kB │ gzip:  23.91 kB
|  storybook-static/assets/schemas-BYLud2ZN.js
|  90.20 kB │ gzip:  26.04 kB
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
|  storybook-static/assets/world-CbaCO17s.js
|  646.28 kB │ gzip: 170.15 kB
|  storybook-static/assets/axe-C7pk9Kxd.js
|  659.32 kB │ gzip: 187.87 kB
|  storybook-static/assets/iframe-NePLlMWm.js
|  1,386.06 kB │ gzip: 391.69 kB

|  Vite ✓ built in 16.43s
|
!  Vite [33m[PLUGIN_TIMINGS] [0mJavaScript callbacks ran for 13.6s of this 16.3s
|  build (83%).
|  The slowest callbacks, timed inside each callback (the wait before a
|  callback starts is excluded, the time it awaits is included):
|  - plugin storybook:react-docgen-plugin transform (43%, 7.0s, 4801
|  calls)
|  Additional callback time came from the callbacks below and from
|  callbacks under 1s.
|  3 callbacks are listed without a time. Their calls overlapped, so the
|  time inside one call includes work from other calls. To find their
|  cost, profile the build with `node --cpu-prof`:
|  - plugin vite-plugin-storybook-nextjs-swc transform (4801 calls)
|  - plugin plugin-csf transform (4801 calls)
|  - plugin vite:css transform (3 calls)
|  See ]8;;https://rolldown.rs/reference/InputOptions.checks#bundlertimingshttps://rolldown.rs/reference/InputOptions.checks#bundlertimings]8;;
|  for more details.

|
o  Output directory:
|  C:/Workspace/Personnel/danang-simulation/storybook-static
|
—  Storybook build completed successfully
```

## test.txt

- Original file: `test.txt`
- Original size: 1760 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ vitest run
At line:2 char:1
+ & (Get-Command pnpm.cmd).Source test *> docs/audit/phase-11/evidence/ ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ vitest run:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 

 RUN  v5.0.5 C:/Workspace/Personnel/danang-simulation


 Test Files  31 passed (31)
      Tests  127 passed (127)
   Start at  20:50:10
   Duration  28.30s (environment 66%, setup 19%, import 7%, tests 5%, transform 3%, worker 1%)

Environment  jsdom was created 31 times · 105.87s total, 66% of tracked time
             create it once per worker with pool: 'vmThreads' (keeps per-file isolation) or isolate: false (shares it across files)
             learn more: https://vitest.dev/guide/improving-performance#test-environments
```

## type-check.txt

- Original file: `type-check.txt`
- Original size: 904 bytes
- Original encoding: UTF-16LE with BOM
- Consolidated: 2026-11-20 (Option A docs consolidation)

```
pnpm.CMD : $ next typegen && tsc --noEmit --incremental false
At line:2 char:1
+ & (Get-Command pnpm.cmd).Source type-check *> docs/audit/phase-11/evi ...
+ ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : NotSpecified: ($ next typegen ...cremental false:String) [], RemoteException
    + FullyQualifiedErrorId : NativeCommandError
 
Generating route types...
✓ Types generated successfully
```
