# Physical-device verification checklist

Run this on a real device, not in the SwiftShader VM. Record every run in
`docs/audit/verification-2026-11-19/evidence/` (one JSON + screenshots per
device/date) and summarise it in `VERIFICATION_REPORT.md`. No verbal
"feels smooth" counts as evidence.

## 1. Device inventory (record per run)

- Device model, OS + browser version, GPU string from
  `WEBGL_debug_renderer_info`, screen size / DPR, power mode (plugged in
  vs battery), thermal state note.
- Build under test: git head + `BUILD_ID`, served over LAN or the deployed
  URL (not localhost on the device). Record the URL.

## 2. FPS runs (script)

Run `fps-probe.mjs` against the served URL, 60 s per scenario/viewport:

- Desktop 1920×1080 idle: PASS only if p95 frame ≤ 16.7 ms AND mean
  FPS ≥ 60 over 60 s AND zero frames > 100 ms.
- Mobile 390×844: PASS only if p95 ≤ 33.3 ms AND mean FPS ≥ 30.
- SwiftShader/llvmpipe runs are `NOT_APPLICABLE`, never a PASS.

If CDP over USB/Wi-Fi is unavailable, fall back to the in-app HUD
(F3 diagnostics) + a 60 s screen recording as evidence, and mark the run
`MANUAL` in the JSON.

## 3. Interaction and layout (same device)

- Touch joystick, camera swipe, pinch zoom, sprint + jump.
- 200% browser zoom, safe-area / cutout viewports, portrait + landscape.
- Background → foreground: hide the tab 60 s, return, measure 60 s after.
- Low-power mode on, if the device has one.

## 4. Accessibility

- Screen reader pass (TalkBack / VoiceOver) over HUD + dialogs.
  This closes TEST_MATRIX IMG-55, currently NOT_VERIFIED.

## 5. Long session

- 600 s soak: heap + FPS sampled in 60 s buckets. PASS only if heap
  growth ≤ 10% from first to last bucket and FPS degradation ≤ 10%.
