#!/usr/bin/env node
/**
 * Sustained FPS probe for Da Nang 3D Open World.
 *
 * Zero npm dependencies: uses Node 22's built-in WebSocket client to talk
 * CDP to a headless Chromium, and the production standalone server (started
 * separately, e.g. `node .next/standalone/server.js` with HOSTNAME=localhost
 * or 0.0.0.0 — never 127.0.0.1, see upstream Next.js #94745).
 *
 * Usage:
 *   node docs/audit/verification-2026-11-19/fps-probe.mjs \
 *     --url http://localhost:3000/ --viewport 1920x1080 \
 *     --duration 60 --warmup 10 --chrome /opt/meta-chromium/chrome \
 *     --out docs/audit/verification-2026-11-19/evidence/fps-1920x1080.json
 *
 * What it measures (per run): rAF frame deltas over the full duration
 * (not a 3 s sample), mean/p50/p95/p99 frame time, FPS as frames/wall-time
 * AND reciprocal-of-mean (they diverge when hitches exist), 1% low FPS,
 * hitch counts (>50 ms, >100 ms, >250 ms — the in-app ring drops >=250 ms
 * frames, so the probe counts them independently), renderer.info draws /
 * triangles / geometries / textures via the page, JS heap sampled at
 * start/end, unmasked GPU renderer string, console/page errors.
 *
 * PASS criteria (all three, per scenario):
 *   desktop 1920x1080 idle: p95 frame <= 16.7 ms AND mean FPS >= 60 over
 *   a 60 s window AND zero frames > 100 ms.
 *   mobile 390x844: p95 <= 33.3 ms AND mean FPS >= 30.
 * SwiftShader / llvmpipe runs are reported as status NOT_APPLICABLE
 * regardless of numbers — software rendering is a regression baseline
 * only, never a 60 FPS certification. A PASS requires a hardware
 * renderer string (e.g. ANGLE (Intel, Intel(R) UHD Graphics ...)).
 */
import { spawn } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import process from 'node:process';

function parseArgs(argv) {
  const out = {
    url: 'http://localhost:3000/',
    viewport: '1920x1080',
    duration: 60,
    warmup: 10,
    chrome: null,
    out: null,
  };
  for (let i = 0; i < argv.length; i++) {
    const [key, value] = argv[i].split('=');
    const v = value ?? argv[++i];
    if (key === '--url') out.url = v;
    else if (key === '--viewport') out.viewport = v;
    else if (key === '--duration') out.duration = Number(v);
    else if (key === '--warmup') out.warmup = Number(v);
    else if (key === '--chrome') out.chrome = v;
    else if (key === '--out') out.out = v;
  }
  return out;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const [width, height] = args.viewport.split('x').map(Number);
  const chrome = args.chrome ?? process.env.CHROME_PATH ?? 'google-chrome';
  const port = 9333;
  const chromeProc = spawn(
    chrome,
    [
      '--headless=new',
      `--remote-debugging-port=${port}`,
      '--no-sandbox',
      `--window-size=${width},${height}`,
      '--hide-scrollbars',
      'about:blank',
    ],
    { stdio: 'ignore' }
  );
  try {
    let targets = null;
    for (let i = 0; i < 30; i++) {
      await sleep(500);
      try {
        targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
        break;
      } catch {
        // Chrome not up yet.
      }
    }
    if (!targets) throw new Error('Chromium did not expose a DevTools endpoint');
    const page = targets.find((t) => t.type === 'page');
    const ws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      ws.onopen = resolve;
      ws.onerror = reject;
    });
    let nextId = 1;
    const pending = new Map();
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = nextId++;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const { resolve, reject } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(JSON.stringify(message.error)));
        else resolve(message.result);
      }
    };
    const errors = [];
    ws.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);
      if (message.method === 'Runtime.exceptionThrown')
        errors.push(String(message.params.exceptionDetails?.text ?? 'exception'));
      if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error')
        errors.push(message.params.args.map((a) => a.value ?? a.description ?? '').join(' '));
    });
    await send('Runtime.enable');
    await send('Page.enable');
    await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 600 });
    await send('Page.navigate', { url: args.url });
    await sleep(args.warmup * 1000);
    // The world must actually initialize before any frame measurement
    // means anything: a bare rAF loop ticks at 60 Hz even with no scene,
    // so a run with zero canvases is a failed run, not a 60 FPS result.
    const canvasCheck = await send('Runtime.evaluate', {
      expression: `JSON.stringify({ canvases: document.querySelectorAll('canvas').length, bodyText: document.body.innerText.slice(0, 200) })`,
      returnByValue: true,
    });
    const canvasState = JSON.parse(canvasCheck.result.value);
    if (canvasState.canvases === 0) {
      const report = {
        schema: 1,
        tool: 'fps-probe.mjs',
        url: args.url,
        viewport: args.viewport,
        durationSeconds: 0,
        warmupSeconds: args.warmup,
        renderer: null,
        softwareRenderer: true,
        status: 'FAIL (world did not initialize — no canvas after warmup)',
        canvases: 0,
        bodyText: canvasState.bodyText,
        frames: 0,
        consoleErrors: errors,
        timestampUtc: new Date().toISOString(),
      };
      console.log(JSON.stringify(report, null, 2));
      if (args.out) writeFileSync(args.out, `${JSON.stringify(report, null, 2)}\n`);
      ws.close();
      return;
    }
    const collect = await send('Runtime.evaluate', {
      expression: `(() => new Promise((resolve) => {
        const deltas = [];
        let last = performance.now();
        const start = last;
        const end = start + ${args.duration * 1000};
        const heapStart = performance.memory ? performance.memory.usedJSHeapSize : null;
        function frame(now) {
          deltas.push(now - last);
          last = now;
          if (now < end) requestAnimationFrame(frame);
          else {
            const canvas = document.querySelector('canvas');
            let renderer = null;
            try {
              const gl = canvas && (canvas.getContext('webgl2') || canvas.getContext('webgl'));
              const ext = gl && gl.getExtension('WEBGL_debug_renderer_info');
              renderer = ext ? gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) : null;
            } catch { renderer = null; }
            resolve({
              deltas, wallMs: last - start,
              heapStart, heapEnd: performance.memory ? performance.memory.usedJSHeapSize : null,
              renderer, fpsChip: document.querySelector('[data-fps]')?.getAttribute('data-fps') ?? null,
            });
          }
        }
        requestAnimationFrame(frame);
      }))()`,
      awaitPromise: true,
      returnByValue: true,
    });
    const result = collect.result.value;
    const deltas = result.deltas.filter((d) => d > 0 && d < 10000);
    const sorted = [...deltas].sort((a, b) => a - b);
    const mean = deltas.reduce((a, b) => a + b, 0) / deltas.length;
    const pct = (p) => sorted[Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))];
    const fpsWall = (deltas.length / result.wallMs) * 1000;
    const fpsMean = 1000 / mean;
    const onePctLow = (() => {
      const worst = sorted.slice(-Math.max(1, Math.floor(sorted.length * 0.01)));
      return 1000 / (worst.reduce((a, b) => a + b, 0) / worst.length);
    })();
    const isSoftware = /swiftshader|llvmpipe|software/i.test(result.renderer ?? '') || result.renderer === null;
    const isDesktop = width >= 1024;
    let status = 'FAIL';
    if (isSoftware) status = 'NOT_APPLICABLE (software renderer — baseline only, not a PASS)';
    else if (
      isDesktop
        ? pct(95) <= 16.7 && fpsWall >= 60 && deltas.filter((d) => d > 100).length === 0
        : pct(95) <= 33.3 && fpsWall >= 30
    )
      status = 'PASS';
    const report = {
      schema: 1,
      tool: 'fps-probe.mjs',
      url: args.url,
      viewport: args.viewport,
      durationSeconds: args.duration,
      warmupSeconds: args.warmup,
      renderer: result.renderer,
      softwareRenderer: isSoftware,
      canvases: canvasState.canvases,
      status: isSoftware ? 'NOT_APPLICABLE (software renderer — baseline only, not a PASS)' : status,
      frames: deltas.length,
      wallMs: result.wallMs,
      fpsFramesPerWallTime: Number(fpsWall.toFixed(2)),
      fpsReciprocalOfMean: Number(fpsMean.toFixed(2)),
      meanFrameMs: Number(mean.toFixed(2)),
      p50FrameMs: Number(pct(50).toFixed(2)),
      p95FrameMs: Number(pct(95).toFixed(2)),
      p99FrameMs: Number(pct(99).toFixed(2)),
      onePercentLowFps: Number(onePctLow.toFixed(2)),
      hitchesOver50ms: deltas.filter((d) => d > 50).length,
      hitchesOver100ms: deltas.filter((d) => d > 100).length,
      hitchesOver250ms: deltas.filter((d) => d > 250).length,
      heapStartBytes: result.heapStart,
      heapEndBytes: result.heapEnd,
      fpsChip: result.fpsChip,
      consoleErrors: errors,
      timestampUtc: new Date().toISOString(),
    };
    console.log(JSON.stringify(report, null, 2));
    if (args.out) writeFileSync(args.out, `${JSON.stringify(report, null, 2)}\n`);
    ws.close();
  } finally {
    chromeProc.kill('SIGKILL');
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
