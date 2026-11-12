import * as THREE from 'three';
import type { AdaptiveDeviceProfile, DeviceFormFactor, ActiveInputMethod, JoystickInput } from '../core/type';
export function isInteractiveInputElement(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tagName = target.tagName;
  if (
    tagName === 'INPUT' ||
    tagName === 'TEXTAREA' ||
    tagName === 'SELECT' ||
    tagName === 'BUTTON' ||
    tagName === 'A' ||
    tagName === 'LABEL'
  ) {
    return true;
  }
  if (target.isContentEditable) return true;
  if (
    target.closest(
      'input, textarea, select, button, a, [contenteditable="true"], [data-hud-interactive="true"], [role="dialog"]'
    )
  ) {
    return true;
  }
  return false;
}

export function evaluateAdaptiveDeviceProfile(
  lastUsedPointerType: 'mouse' | 'touch' | 'pen' | 'keyboard' | null
): AdaptiveDeviceProfile {
  if (typeof window === 'undefined') {
    return {
      formFactor: 'desktop',
      activeInput: 'keyboard-mouse',
      hasCoarsePointer: false,
      hasFinePointer: true,
      maxTouchPoints: 0,
      showTouchControls: false,
      isHybrid: false,
      orientation: 'landscape',
    };
  }

  const hasCoarse =
    window.matchMedia?.('(pointer: coarse)').matches || window.matchMedia?.('(any-pointer: coarse)').matches || false;
  const hasFine =
    window.matchMedia?.('(pointer: fine)').matches || window.matchMedia?.('(any-pointer: fine)').matches || false;
  const hoverNone = window.matchMedia?.('(hover: none)').matches || false;
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const hasTouchCapability = hasCoarse || maxTouchPoints > 0;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const minDim = Math.min(width, height);
  const maxDim = Math.max(width, height);
  const orientation: 'landscape' | 'portrait' = width >= height ? 'landscape' : 'portrait';

  const isHybrid = hasTouchCapability && hasFine;

  let formFactor: DeviceFormFactor = 'desktop';
  if (hasTouchCapability && (!hasFine || hoverNone || lastUsedPointerType === 'touch')) {
    if (minDim < 600 || maxDim < 920) {
      formFactor = 'mobile';
    } else {
      formFactor = 'tablet';
    }
  } else if (hasTouchCapability && minDim <= 1024 && maxDim <= 1366) {
    formFactor = minDim < 600 ? 'mobile' : 'tablet';
  }

  let showTouchControls = false;
  let activeInput: ActiveInputMethod = 'keyboard-mouse';

  if (lastUsedPointerType === 'touch') {
    showTouchControls = true;
    activeInput = isHybrid ? 'hybrid' : 'touch';
  } else if (lastUsedPointerType === 'mouse' || lastUsedPointerType === 'keyboard') {
    if (!hasFine && hasTouchCapability) {
      showTouchControls = true;
      activeInput = 'touch';
    } else {
      showTouchControls = false;
      activeInput = isHybrid ? 'hybrid' : 'keyboard-mouse';
    }
  } else if (hasCoarse && (!hasFine || hoverNone)) {
    showTouchControls = true;
    activeInput = 'touch';
  } else if (formFactor === 'mobile' || formFactor === 'tablet') {
    showTouchControls = true;
    activeInput = isHybrid ? 'hybrid' : 'touch';
  } else {
    showTouchControls = false;
    activeInput = isHybrid ? 'hybrid' : 'keyboard-mouse';
  }

  return {
    formFactor,
    activeInput,
    hasCoarsePointer: hasCoarse,
    hasFinePointer: hasFine,
    maxTouchPoints,
    showTouchControls,
    isHybrid,
    orientation,
  };
}

export function computeNormalizedJoystickInput(
  rawDx: number,
  rawDy: number,
  maxRadiusPx: number,
  deadzone: number
): {
  input: JoystickInput;
  thumbOffsetPx: { x: number; y: number };
} {
  const safeDx = Number.isFinite(rawDx) ? rawDx : 0;
  const safeDy = Number.isFinite(rawDy) ? rawDy : 0;
  const safeRadius = Number.isFinite(maxRadiusPx) && maxRadiusPx > 1 ? maxRadiusPx : 44;
  const safeDeadzone = THREE.MathUtils.clamp(Number.isFinite(deadzone) ? deadzone : 0.12, 0, 0.85);

  const distPx = Math.hypot(safeDx, safeDy);
  if (distPx < 0.0001) {
    return {
      input: { x: 0, y: 0, magnitude: 0, active: true },
      thumbOffsetPx: { x: 0, y: 0 },
    };
  }

  const clampedDistPx = Math.min(distPx, safeRadius);
  const angle = Math.atan2(safeDy, safeDx);
  const thumbX = Math.cos(angle) * clampedDistPx;
  const thumbY = Math.sin(angle) * clampedDistPx;

  const rawRatio = clampedDistPx / safeRadius;
  if (rawRatio <= safeDeadzone) {
    return {
      input: { x: 0, y: 0, magnitude: 0, active: true },
      thumbOffsetPx: { x: thumbX, y: thumbY },
    };
  }

  const remappedMagnitude = Math.min(1, (rawRatio - safeDeadzone) / (1 - safeDeadzone));

  const normX = Math.cos(angle) * remappedMagnitude;
  const normY = -Math.sin(angle) * remappedMagnitude;

  return {
    input: {
      x: THREE.MathUtils.clamp(normX, -1, 1),
      y: THREE.MathUtils.clamp(normY, -1, 1),
      magnitude: THREE.MathUtils.clamp(remappedMagnitude, 0, 1),
      active: true,
    },
    thumbOffsetPx: { x: thumbX, y: thumbY },
  };
}
