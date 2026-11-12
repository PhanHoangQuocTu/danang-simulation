import * as THREE from 'three';
import { GAME_CONFIG } from '@/engine/core/const';
import type { DiagnosticCheckResult, InteractableDefinition } from '@/engine/core/type';
import { getDaNangClockData, calculateDaNangSolarData } from '@/worlds/danang/environment/solar';
import { mapWmoWeatherCode } from '@/integrations/weather/mapper';
import { validateAndNormalizeWeatherPayload } from '@/integrations/weather/service';
import { computeNormalizedJoystickInput } from '@/engine/controls/input';
import { getActiveControlGuideInstructions } from './controls';
import { clampMiniMapZoom, computeMiniMapVisibleSpanMeters, projectWorldToMiniMap } from '@/engine/spatial/minimap';
import { InteractableRegistry, evaluateInteractionDistanceAndEligibility } from '@/engine/interactions/registry';
import { INITIAL_INTERACTABLE_FIXTURES } from '@/worlds/danang/zones/fixtures';
export function runSystemDiagnosticsSuite(): DiagnosticCheckResult[] {
  const results: DiagnosticCheckResult[] = [];

  const testDate = new Date('2026-11-10T01:30:00.000Z');
  const clockCheck = getDaNangClockData(testDate);
  const tzPassed = clockCheck.hour === 8 && clockCheck.minute === 30 && clockCheck.timeString === '08:30:00';
  results.push({
    id: 'DIAG-01',
    domain: 'Clock & Timezone',
    name: 'Asia/Ho_Chi_Minh Wall Clock (GMT+7)',
    passed: tzPassed,
    details: `01:30 UTC -> ${clockCheck.timeString} GMT+7`,
  });

  const noonClock = getDaNangClockData(new Date('2026-06-21T05:00:00.000Z'));
  const midnightClock = getDaNangClockData(new Date('2026-06-21T17:00:00.000Z'));
  const noonSolar = calculateDaNangSolarData(noonClock);
  const midnightSolar = calculateDaNangSolarData(midnightClock);
  const solarPassed =
    noonSolar.altitudeDeg > 70 &&
    noonSolar.phase === 'NOON' &&
    midnightSolar.altitudeDeg < -30 &&
    midnightSolar.phase === 'NIGHT';
  results.push({
    id: 'DIAG-02',
    domain: 'Solar Astronomy',
    name: 'Solar Trajectory & Automatic Phase Detection',
    passed: solarPassed,
    details: `Noon Alt ${noonSolar.altitudeDeg.toFixed(1)}° (${noonSolar.phase}) | Midnight ${midnightSolar.altitudeDeg.toFixed(1)}°`,
  });

  const wmoClear = mapWmoWeatherCode(0);
  const wmoStorm = mapWmoWeatherCode(95);
  const wmoUnknown = mapWmoWeatherCode(999);
  const wmoPassed =
    wmoClear.category === 'clear' &&
    wmoStorm.category === 'thunderstorm' &&
    wmoStorm.effects.hasLightning === true &&
    wmoUnknown.category === 'partly-cloudy';
  results.push({
    id: 'DIAG-03',
    domain: 'Weather Mapper',
    name: 'WMO Code Table & Fallback Safety',
    passed: wmoPassed,
    details: `0->${wmoClear.category}, 95->${wmoStorm.category}, Unknown->${wmoUnknown.category}`,
  });

  const malformedPayload = {
    current: {
      temperature_2m: '29.4',
      apparent_temperature: Number.NaN,
      relative_humidity_2m: 145,
      weather_code: 63,
      cloud_cover: -20,
      wind_speed_10m: 18.5,
      wind_direction_10m: 405,
      wind_gusts_10m: 27,
      precipitation: 2.4,
      rain: 2.4,
      showers: 0,
      is_day: 1,
      time: '2026-11-10T08:30',
    },
    daily: {
      sunrise: ['2026-11-10T05:54'],
      sunset: ['2026-11-10T17:16'],
    },
  };
  const sanitized = validateAndNormalizeWeatherPayload(malformedPayload);
  const validationPassed =
    sanitized.validationStatus === 'sanitized' &&
    sanitized.humidity === 100 &&
    sanitized.cloudCover === 0 &&
    sanitized.windDirection === 45 &&
    Number.isFinite(sanitized.apparentTemperature);
  results.push({
    id: 'DIAG-04',
    domain: 'Data Validation',
    name: 'API Schema & Out-of-Range Sanitizer',
    passed: validationPassed,
    details: `Status: ${sanitized.validationStatus}, RH clamped to ${sanitized.humidity}%, WindDir ${sanitized.windDirection}°`,
  });

  const joyDead = computeNormalizedJoystickInput(2, 2, 50, 0.15);
  const joyMax = computeNormalizedJoystickInput(0, -120, 50, 0.15);
  const joyNaN = computeNormalizedJoystickInput(Number.NaN, Number.POSITIVE_INFINITY, 50, 0.15);
  const joyPassed =
    joyDead.input.magnitude === 0 &&
    Math.abs(joyMax.input.magnitude - 1) < 0.001 &&
    joyMax.input.y > 0.99 &&
    joyNaN.input.magnitude === 0;
  results.push({
    id: 'DIAG-05',
    domain: 'Adaptive Input',
    name: 'Joystick Deadzone, NaN Guard & Clamping',
    passed: joyPassed,
    details: `Deadzone=${joyDead.input.magnitude}, Max=${joyMax.input.magnitude.toFixed(2)}, NaN-safe=true`,
  });

  const desktopGuide = getActiveControlGuideInstructions(false);
  const touchGuide = getActiveControlGuideInstructions(true);
  const desktopIds = new Set(desktopGuide.map((item) => item.id));
  const touchIds = new Set(touchGuide.map((item) => item.id));
  const guidePassed =
    desktopGuide.length === 5 &&
    touchGuide.length === 5 &&
    desktopIds.size === desktopGuide.length &&
    touchIds.size === touchGuide.length &&
    desktopGuide.some((i) => i.keys?.includes('W') && i.keys?.includes('D')) &&
    touchGuide.every((i) => i.inputType === 'touch');
  results.push({
    id: 'DIAG-06',
    domain: 'Phase 7 Guide',
    name: 'Control Guide Model & Adaptive Mapping Integrity',
    passed: guidePassed,
    details: `Desktop=${desktopGuide.length} actions (WASD/Mouse), Touch=${touchGuide.length} actions (Multi-touch)`,
  });

  const zDefault = clampMiniMapZoom(GAME_CONFIG.miniMap.defaultZoom);
  const zMinClamp = clampMiniMapZoom(-10);
  const zMaxClamp = clampMiniMapZoom(999);
  const zNaNSafe = clampMiniMapZoom(Number.NaN);
  const spanDefault = computeMiniMapVisibleSpanMeters(1.0);
  const spanZoomedIn = computeMiniMapVisibleSpanMeters(2.0);
  const miniMapPassed =
    zDefault === 1.0 &&
    zMinClamp === GAME_CONFIG.miniMap.minZoom &&
    zMaxClamp === GAME_CONFIG.miniMap.maxZoom &&
    zNaNSafe === GAME_CONFIG.miniMap.defaultZoom &&
    spanDefault === 144 &&
    spanZoomedIn === 72;
  results.push({
    id: 'DIAG-07',
    domain: 'Phase 8 Mini Map',
    name: 'Orthographic Zoom Bounds, NaN Guard & Scale Span',
    passed: miniMapPassed,
    details: `Zoom=[${zMinClamp}x..${zMaxClamp}x], Span(1x)=${spanDefault}m, Span(2x)=${spanZoomedIn}m`,
  });

  // Test 8 (Phase 9): World-to-Map Projection, Boundary Clamping & Direction Synchronization
  const projCenter = projectWorldToMiniMap(0, 0, Math.PI, 0, 0, 1.0, 72);
  const projEast = projectWorldToMiniMap(36, 0, Math.PI / 2, 0, 0, 1.0, 72);
  const projNorth = projectWorldToMiniMap(0, -36, Math.PI, 0, 0, 1.0, 72);
  const projOut = projectWorldToMiniMap(250, -250, 0, 0, 0, 1.0, 72);
  const projFollow = projectWorldToMiniMap(24, -18, 0, 24, -18, 1.8, 72);
  const projNaN = projectWorldToMiniMap(Number.NaN, Number.POSITIVE_INFINITY, Number.NaN, 0, 0, 1.0, 72);
  const phase9Passed =
    Math.abs(projCenter.u - 0.5) < 0.001 &&
    Math.abs(projCenter.v - 0.5) < 0.001 &&
    Math.abs(projCenter.screenRotationDeg - 0) < 0.5 &&
    Math.abs(projEast.u - 0.75) < 0.001 &&
    Math.abs(projEast.screenRotationDeg - 90) < 0.5 &&
    Math.abs(projNorth.v - 0.25) < 0.001 &&
    projOut.isOutOfBounds === true &&
    projOut.clampedU <= 0.94 &&
    projOut.clampedV >= 0.06 &&
    Math.abs(projFollow.u - 0.5) < 0.001 &&
    Math.abs(projFollow.v - 0.5) < 0.001 &&
    Number.isFinite(projNaN.clampedU) &&
    Number.isFinite(projNaN.screenRotationDeg);
  results.push({
    id: 'DIAG-08',
    domain: 'Phase 9 Map Sync',
    name: 'World-to-Map Projection, Heading & Follow Centering',
    passed: phase9Passed,
    details: `Center=(${projCenter.u.toFixed(2)},${projCenter.v.toFixed(2)}), EastRot=${projEast.screenRotationDeg.toFixed(0)}°, Clamp=${projOut.isOutOfBounds}`,
  });

  // Test 9 (Phase 10): Interactable Registry, Distance Eligibility, Occlusion & State Toggle
  const testRegistry = new InteractableRegistry();
  const dummyGroup = new THREE.Group();
  const dummyMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: new THREE.Color(0x112233),
      emissiveIntensity: 0.2,
    })
  );
  const sampleDef: InteractableDefinition = {
    ...INITIAL_INTERACTABLE_FIXTURES[2],
    id: 'test-beacon',
    maxDistance: 4.5,
  };
  const regEntry = testRegistry.register(sampleDef, dummyGroup, [dummyMesh]);
  const nearEval = evaluateInteractionDistanceAndEligibility({ x: 0, y: 0, z: -4.0 }, regEntry, false);
  const farEval = evaluateInteractionDistanceAndEligibility({ x: 0, y: 0, z: -15.0 }, regEntry, false);
  const occludedEval = evaluateInteractionDistanceAndEligibility({ x: 0, y: 0, z: -4.0 }, regEntry, true);
  testRegistry.applyHighlight('test-beacon', 'eligible');
  const highlightedHex = (dummyMesh.material as THREE.MeshStandardMaterial).emissive.getHex();
  testRegistry.applyHighlight(null, 'idle');
  const restoredHex = (dummyMesh.material as THREE.MeshStandardMaterial).emissive.getHex();
  const toggledState = testRegistry.toggleActivated('test-beacon');
  const unregOk = testRegistry.unregister('test-beacon');

  const phase10Passed =
    nearEval.status === 'eligible' &&
    farEval.status === 'out-of-range' &&
    occludedEval.status === 'occluded' &&
    highlightedHex === 0x38bdf8 &&
    restoredHex === 0x112233 &&
    toggledState === true &&
    unregOk === true &&
    testRegistry.getAll().length === 0;

  results.push({
    id: 'DIAG-09',
    domain: 'Phase 10 Interaction',
    name: 'Registry, Distance, Occlusion & Highlight Restore',
    passed: phase10Passed,
    details: `Near=${nearEval.status} (${nearEval.distanceMeters}m), Far=${farEval.status}, Restore=0x${restoredHex.toString(16)}`,
  });

  dummyMesh.geometry.dispose();
  dummyMesh.material.dispose();
  return results;
}
