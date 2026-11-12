import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import * as THREE from 'three';

// ============================================================================
// 0. NATIVE INLINE SVG ICON SYSTEM (Eliminates Dual-React $$typeof Mismatch)
// ============================================================================
interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const createSvgIcon = (paths: React.ReactNode): React.FC<IconProps> => {
  const IconComponent: React.FC<IconProps> = ({ className = 'h-4 w-4', ...rest }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...rest}
    >
      {paths}
    </svg>
  );
  return IconComponent;
};

const Compass = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </>
);
const RotateCcw = createSvgIcon(
  <>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </>
);
const Maximize2 = createSvgIcon(
  <>
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </>
);
const Minimize2 = createSvgIcon(
  <>
    <polyline points="4 14 10 14 10 20" />
    <polyline points="20 10 14 10 14 4" />
    <line x1="14" y1="10" x2="21" y2="3" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </>
);
const Keyboard = createSvgIcon(
  <>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M7 16h10" />
  </>
);
const Activity = createSvgIcon(
  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
);
const Footprints = createSvgIcon(
  <>
    <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z" />
    <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z" />
  </>
);
const ArrowUpCircle = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="16 12 12 8 8 12" />
    <line x1="12" y1="16" x2="12" y2="8" />
  </>
);
const Wind = createSvgIcon(
  <>
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </>
);
const Droplets = createSvgIcon(
  <>
    <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
    <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
  </>
);
const Cloud = createSvgIcon(
  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
);
const Sun = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </>
);
const Moon = createSvgIcon(
  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
);
const Sunrise = createSvgIcon(
  <>
    <path d="M12 2v8" />
    <path d="m4.93 10.93 1.41 1.41" />
    <path d="M2 18h2" />
    <path d="M20 18h2" />
    <path d="m19.07 10.93-1.41 1.41" />
    <path d="M22 22H2" />
    <path d="m8 6 4-4 4 4" />
    <path d="M16 18a4 4 0 0 0-8 0" />
  </>
);
const Sunset = createSvgIcon(
  <>
    <path d="M12 10V2" />
    <path d="m4.93 10.93 1.41 1.41" />
    <path d="M2 18h2" />
    <path d="M20 18h2" />
    <path d="m19.07 10.93-1.41 1.41" />
    <path d="M22 22H2" />
    <path d="m16 6-4 4-4-4" />
    <path d="M16 18a4 4 0 0 0-8 0" />
  </>
);
const Thermometer = createSvgIcon(
  <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" />
);
const CloudRain = createSvgIcon(
  <>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M16 14v6M8 14v6M12 16v6" />
  </>
);
const CloudLightning = createSvgIcon(
  <>
    <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
    <path d="m13 12-3 5h4l-3 5" />
  </>
);
const CloudFog = createSvgIcon(
  <>
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M16 17H7M17 21H9" />
  </>
);
const Sparkles = createSvgIcon(
  <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3Z" />
);
const RefreshCw = createSvgIcon(
  <>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </>
);
const AlertTriangle = createSvgIcon(
  <>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4M12 17h.01" />
  </>
);
const MapPin = createSvgIcon(
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </>
);
const Clock = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </>
);
const Smartphone = createSvgIcon(
  <>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </>
);
const Tablet = createSvgIcon(
  <>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <line x1="12" x2="12.01" y1="18" y2="18" />
  </>
);
const Monitor = createSvgIcon(
  <>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </>
);
const CheckCircle2 = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </>
);
const ShieldCheck = createSvgIcon(
  <>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <path d="m9 12 2 2 4-4" />
  </>
);
const Gauge = createSvgIcon(
  <>
    <path d="m12 14 4-4" />
    <path d="M3.34 19a10 10 0 1 1 17.32 0" />
  </>
);
const Info = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </>
);
const X = createSvgIcon(
  <>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </>
);
const ChevronDown = createSvgIcon(<path d="m6 9 6 6 6-6" />);
const ChevronUp = createSvgIcon(<path d="m18 15-6-6-6 6" />);
const MapIcon = createSvgIcon(
  <>
    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
    <line x1="9" x2="9" y1="3" y2="18" />
    <line x1="15" x2="15" y1="6" y2="21" />
  </>
);
const Gamepad2 = createSvgIcon(
  <>
    <line x1="6" x2="10" y1="12" y2="12" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="15" x2="15.01" y1="13" y2="13" />
    <line x1="18" x2="18.01" y1="11" y2="11" />
    <rect width="20" height="12" x="2" y="6" rx="2" />
  </>
);
const MousePointer = createSvgIcon(
  <>
    <rect x="5" y="2" width="14" height="20" rx="7" />
    <line x1="12" y1="6" x2="12" y2="10" />
  </>
);
const HandTouch = createSvgIcon(
  <>
    <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
    <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
    <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
    <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
  </>
);
const ZoomInIcon = createSvgIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="11" y1="8" x2="11" y2="14" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </>
);
const ZoomOutIcon = createSvgIcon(
  <>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </>
);
const CrosshairIcon = createSvgIcon(
  <>
    <circle cx="12" cy="12" r="10" />
    <line x1="22" y1="12" x2="18" y2="12" />
    <line x1="6" y1="12" x2="2" y2="12" />
    <line x1="12" y1="6" x2="12" y2="2" />
    <line x1="12" y1="22" x2="12" y2="18" />
  </>
);
const NavigationArrowIcon = createSvgIcon(
  <polygon points="12 2 19 21 12 17 5 21 12 2" />
);
const EyeIcon = createSvgIcon(
  <>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </>
);
const ZapIcon = createSvgIcon(
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
);

// ============================================================================
// 1. CENTRALIZED DESIGN SYSTEM TOKENS (PHASE 4 MANDATORY CSS CUSTOM PROPERTIES)
// ============================================================================
const DESIGN_SYSTEM_CSS = `
:root {
  /* 10.2 Spacing System (4px base unit) */
  --space-0: 0px;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;

  /* 10.3 Border Radius System */
  --radius-none: 0px;
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 20px;
  --radius-3xl: 24px;
  --radius-full: 9999px;

  /* 10.4 Typography System */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;

  /* 10.5 Semantic Color System */
  --color-background: #020617;
  --color-surface: rgba(15, 23, 42, 0.78);
  --color-surface-elevated: rgba(30, 41, 59, 0.85);
  --color-text-primary: #f8fafc;
  --color-text-secondary: #cbd5e1;
  --color-text-muted: #94a3b8;
  --color-border: rgba(148, 163, 184, 0.22);
  --color-border-subtle: rgba(148, 163, 184, 0.14);
  --color-border-strong: rgba(56, 189, 248, 0.55);
  --color-primary: #0ea5e9;
  --color-primary-hover: #38bdf8;
  --color-primary-active: #0284c7;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;
  --color-info: #38bdf8;
  --color-focus-ring: rgba(56, 189, 248, 0.65);

  /* 10.6 Elevation & Shadow System */
  --shadow-xs: 0 1px 2px rgba(2, 6, 23, 0.35);
  --shadow-sm: 0 2px 6px rgba(2, 6, 23, 0.45);
  --shadow-md: 0 6px 16px rgba(2, 6, 23, 0.55);
  --shadow-lg: 0 12px 28px rgba(2, 6, 23, 0.68);
  --shadow-xl: 0 20px 44px rgba(2, 6, 23, 0.82);

  /* 10.7 Motion & Transition System */
  --motion-fast: 120ms;
  --motion-normal: 200ms;
  --motion-slow: 300ms;
  --motion-slower: 450ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* 10.8 Z-Index Layer System */
  --z-base: 0;
  --z-canvas: 1;
  --z-hud: 10;
  --z-floating-controls: 20;
  --z-dropdown: 30;
  --z-tooltip: 40;
  --z-modal: 50;
  --z-toast: 60;
  --z-critical: 70;
}

@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-fast: 0ms;
    --motion-normal: 0ms;
    --motion-slow: 0ms;
    --motion-slower: 0ms;
  }
}

.ds-surface-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(12px);
  color: var(--color-text-primary);
  transition: border-color var(--motion-normal) var(--ease-standard),
              background-color var(--motion-normal) var(--ease-standard);
}

.ds-surface-elevated {
  background: var(--color-surface-elevated);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.ds-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  border-radius: var(--radius-lg);
  font-family: var(--font-sans);
  font-size: var(--text-xs);
  font-weight: 600;
  padding: var(--space-2) var(--space-3);
  transition: all var(--motion-fast) var(--ease-standard);
  cursor: pointer;
  outline: none;
}

.ds-btn:focus-visible,
.ds-input:focus-visible {
  box-shadow: 0 0 0 2px var(--color-focus-ring);
}

.ds-btn:active:not(:disabled) {
  transform: scale(0.97);
}

.ds-btn:disabled {
  opacity: 0.48;
  cursor: not-allowed;
}
`;

// ============================================================================
// 2. DA NANG GEOGRAPHIC & TIMEZONE CONFIGURATION
// ============================================================================
export const DA_NANG_CONFIG = {
  name: 'Da Nang',
  country: 'Vietnam',
  latitude: 16.0544,
  longitude: 108.2022,
  timezone: 'Asia/Ho_Chi_Minh',
  locale: 'vi-VN',
  utcOffset: '+07:00',
  utcOffsetHours: 7,
} as const;

// ============================================================================
// 3. STRICT TYPESCRIPT DEFINITIONS
// ============================================================================
export type CharacterAnimationState =
  | 'IDLE'
  | 'WALK'
  | 'RUN'
  | 'JUMP'
  | 'FALL'
  | 'LANDING';

export type TimeOfDayPhase =
  | 'DAWN'
  | 'MORNING'
  | 'NOON'
  | 'AFTERNOON'
  | 'SUNSET'
  | 'NIGHT';

export type WeatherCondition =
  | 'clear'
  | 'mainly-clear'
  | 'partly-cloudy'
  | 'overcast'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'heavy-rain'
  | 'showers'
  | 'snow'
  | 'thunderstorm';

export type DeviceFormFactor = 'desktop' | 'tablet' | 'mobile';
export type ActiveInputMethod = 'keyboard-mouse' | 'touch' | 'hybrid';
// PHASE 4, 5, 6 & 7 HUD STATE ARCHITECTURE (Independent per-panel state, no global hide)
export type PanelDisplayMode = 'expanded' | 'compact' | 'hidden';
export type StatusWidgetMode = 'expanded' | 'compact';
export type CriticalPanelDisplayMode = StatusWidgetMode;
export type MovementGuideDisplayMode = 'expanded' | 'collapsed';
export type MiniMapDisplayMode = 'expanded' | 'compact';
export type MiniMapFollowMode = 'overview' | 'follow';
export type ControlInputType = 'keyboard' | 'mouse' | 'touch';
export type MiniDataChipVariant = 'metric' | 'status' | 'info';

export interface ControlInstruction {
  id: string;
  inputType: ControlInputType;
  action: string;
  description: string;
  keys?: string[];
  badgeText?: string;
}

export interface HUDPanelState {
  miniMap: MiniMapDisplayMode;
  statusWidget: StatusWidgetMode;
  movementGuide: MovementGuideDisplayMode;
  environmentPanel: PanelDisplayMode;
  secondaryInfo: PanelDisplayMode;
  playerStatus: CriticalPanelDisplayMode;
}

// ============================================================================
// 3.5 PHASE 8 & PHASE 9 MINI MAP & PLAYER SYNCHRONIZATION INTERFACES
// ============================================================================
export interface MiniMapConfig {
  defaultZoom: number;
  minZoom: number;
  maxZoom: number;
  zoomStep: number;
  orthoHalfExtent: number;
  cameraHeight: number;
  near: number;
  far: number;
  resolutionPx: number;
  followSmoothing: number;
}

export interface MiniMapState {
  zoom: number;
  followMode: MiniMapFollowMode;
  status: 'initializing' | 'ready' | 'unavailable';
  worldSpanMeters: number;
  lastRenderTimeMs: number;
}

export interface MiniMapProjectionResult {
  u: number;
  v: number;
  clampedU: number;
  clampedV: number;
  isOutOfBounds: boolean;
  screenRotationDeg: number;
}

export interface MiniMapPhase9ExtensionProps {
  playerWorldPosition?: { x: number; y: number; z: number };
  playerRotationYRad?: number;
  followPlayer?: boolean;
}

// ============================================================================
// 3.6 PHASE 10 WORLD INTERACTION SYSTEM INTERFACES
// ============================================================================
export type InteractionType = 'inspect' | 'information' | 'activate';

export type InteractionEligibilityStatus =
  | 'idle'
  | 'eligible'
  | 'out-of-range'
  | 'occluded'
  | 'disabled';

export interface InteractableDefinition {
  id: string;
  type: InteractionType;
  label: string;
  actionLabelVi: string;
  actionLabelEn: string;
  description: string;
  detailPoints: string[];
  maxDistance: number;
  enabled: boolean;
  worldPosition: [number, number, number];
  accentColorHex: number;
}

export interface RegisteredInteractableEntry {
  definition: InteractableDefinition;
  object3D: THREE.Object3D;
  highlightMeshes: THREE.Mesh[];
  worldAnchor: THREE.Vector3;
  isActivated: boolean;
  interactionCount: number;
}

export interface ActiveInteractionTargetState {
  targetId: string | null;
  status: InteractionEligibilityStatus;
  distanceMeters: number;
  definition: InteractableDefinition | null;
  isActivated: boolean;
  interactionCount: number;
}

export interface InteractionExecutionFeedback {
  id: string;
  targetId: string;
  title: string;
  message: string;
  type: InteractionType;
  timestampMs: number;
  isActivated?: boolean;
}

export interface JoystickInput {
  x: number;
  y: number;
  magnitude: number;
  active: boolean;
}

export interface AdaptiveDeviceProfile {
  formFactor: DeviceFormFactor;
  activeInput: ActiveInputMethod;
  hasCoarsePointer: boolean;
  hasFinePointer: boolean;
  maxTouchPoints: number;
  showTouchControls: boolean;
  isHybrid: boolean;
  orientation: 'landscape' | 'portrait';
}

export interface WeatherEffectConfig {
  cloudCoverFloor: number;
  cloudDarkness: number;
  sunAttenuation: number;
  fogMultiplier: number;
  rainParticleCount: number;
  rainFallSpeed: number;
  groundWetness: number;
  hasLightning: boolean;
}

export interface MappedWeatherInfo {
  code: number;
  category: WeatherCondition;
  viDescription: string;
  enDescription: string;
  effects: WeatherEffectConfig;
}

export type DataFreshnessStatus = 'live' | 'stale';

export interface NormalizedWeatherState {
  source: 'Open-Meteo Forecast API';
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  isDay: boolean;
  precipitation: number;
  rain: number;
  showers: number;
  weatherCode: number;
  cloudCover: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  sunriseIso: string;
  sunsetIso: string;
  sunriseFormatted: string;
  sunsetFormatted: string;
  apiObservationTime: string;
  fetchedAtFormatted: string;
  fetchedAtTimestampMs: number;
  freshness: DataFreshnessStatus;
  validationStatus: 'valid' | 'sanitized';
  mapped: MappedWeatherInfo;
}

export interface DaNangClockData {
  timeString: string;
  timeShortString: string;
  dateStringEn: string;
  dateStringVi: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
  fractionalHours: number;
  timestampMs: number;
}

export interface SolarAstronomicalData {
  azimuthRad: number;
  altitudeRad: number;
  altitudeDeg: number;
  azimuthDeg: number;
  sunriseHours: number;
  sunsetHours: number;
  dawnHours: number;
  duskHours: number;
  solarNoonHours: number;
  sunriseFormatted: string;
  sunsetFormatted: string;
  solarNoonFormatted: string;
  phase: TimeOfDayPhase;
  phaseVi: string;
  phaseEn: string;
  sunDirection: THREE.Vector3;
  daylightFactor: number;
  twilightFactor: number;
}

export interface SynchronizedTimeSolarSnapshot {
  clock: DaNangClockData;
  solar: SolarAstronomicalData;
}

export interface KeyboardInputState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
  sprint: boolean;
  jump: boolean;
}

export interface PerformanceMetricsSnapshot {
  fps: number;
  avgFrameTimeMs: number;
  p95FrameTimeMs: number;
  drawCalls: number;
  triangles: number;
  geometriesCount: number;
  texturesCount: number;
  jsHeapUsedMb: number | null;
  pixelRatioActive: number;
  adaptiveQualityTier: 'ultra' | 'balanced' | 'performance';
}

export interface PlayerRuntimeState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  horizontalSpeed: number;
  rotationY: number;
  isGrounded: boolean;
  surfaceHeight: number;
  animationState: CharacterAnimationState;
  landingTimer: number;
  cameraYaw: number;
  cameraPitch: number;
  cameraDistance: number;
  isPointerLocked: boolean;
  perf: PerformanceMetricsSnapshot;
}

interface HumanoidRig {
  root: THREE.Group;
  hips: THREE.Group;
  waist: THREE.Group;
  body: THREE.Group;
  chest: THREE.Group;
  neck: THREE.Group;
  head: THREE.Group;
  leftShoulder: THREE.Group;
  leftArm: THREE.Group;
  leftElbow: THREE.Group;
  leftHand: THREE.Group;
  rightShoulder: THREE.Group;
  rightArm: THREE.Group;
  rightElbow: THREE.Group;
  rightHand: THREE.Group;
  leftHip: THREE.Group;
  leftLeg: THREE.Group;
  leftKnee: THREE.Group;
  leftFoot: THREE.Group;
  rightHip: THREE.Group;
  rightLeg: THREE.Group;
  rightKnee: THREE.Group;
  rightFoot: THREE.Group;
}

interface PlatformCollider {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  topY: number;
  baseY: number;
  color: number;
}

interface CylinderCollider {
  x: number;
  z: number;
  radius: number;
  height: number;
}

export interface DiagnosticCheckResult {
  id: string;
  domain: string;
  name: string;
  passed: boolean;
  details: string;
}

// ============================================================================
// 4. CENTRALIZED GAME & PHYSICS CONFIGURATION
// ============================================================================
const GAME_CONFIG = {
  physics: {
    walkSpeed: 4.5,
    runSpeed: 8.6,
    acceleration: 15.0,
    deceleration: 18.0,
    airControlMultiplier: 0.48,
    rotationSmoothing: 14.0,
    gravity: -25.0,
    jumpVelocity: 9.8,
    maxDeltaTime: 0.05,
    landingDuration: 0.18,
    walkSpeedThreshold: 0.25,
    runSpeedThreshold: 5.9,
    playerRadius: 0.38,
  },
  camera: {
    defaultDistance: 5.4,
    minDistance: 2.3,
    maxDistance: 12.5,
    defaultPitch: 0.28,
    minPitch: -0.18,
    maxPitch: 1.25,
    lookAtHeightOffset: 1.48,
    followSmoothing: 16.0,
    zoomSmoothing: 12.0,
    zoomStep: 0.65,
    mouseSensitivity: 0.0023,
    touchSensitivity: 0.0048,
    groundClearance: 0.42,
    fov: 55,
    near: 0.1,
    far: 320,
  },
  joystick: {
    deadzone: 0.12,
    mobileMaxRadiusPx: 44,
    tabletMaxRadiusPx: 54,
  },
  weatherRefreshIntervalMs: 15 * 60 * 1000,
  weatherStaleThresholdMs: 25 * 60 * 1000,
  weatherRequestTimeoutMs: 10000,
  worldBoundaryRadius: 68,
  maxRainParticles: 3200,
  miniMap: {
    defaultZoom: 1.0,
    minZoom: 0.6,
    maxZoom: 2.8,
    zoomStep: 0.35,
    orthoHalfExtent: 72,
    cameraHeight: 140,
    near: 1,
    far: 260,
    resolutionPx: 256,
    followSmoothing: 12.0,
  } as MiniMapConfig,
  interaction: {
    defaultMaxDistance: 4.6,
    maxDetectionDistance: 12.5,
    raycastIntervalMs: 50,
    cooldownMs: 320,
    keyCode: 'KeyE',
    keyDisplay: 'E',
  },
};

export function clampMiniMapZoom(rawZoom: number): number {
  const { minZoom, maxZoom, defaultZoom } = GAME_CONFIG.miniMap;
  if (!Number.isFinite(rawZoom)) return defaultZoom;
  return Number(
    THREE.MathUtils.clamp(rawZoom, minZoom, maxZoom).toFixed(2)
  );
}

export function computeMiniMapVisibleSpanMeters(zoom: number): number {
  const safeZoom = clampMiniMapZoom(zoom);
  return Math.round((GAME_CONFIG.miniMap.orthoHalfExtent * 2) / safeZoom);
}

/**
 * PHASE 9 SPATIAL MATHEMATICS: World-to-Map Orthographic Projection & Direction
 * Projects authoritative 3D World Coordinates (X, Z) and character facing yaw (rotationYRad)
 * into normalized Mini Map viewport coordinates [0..1] and screen rotation degrees.
 * Uses ground-plane projection (Y = 0) so jumping never distorts horizontal map coordinates.
 */
const _projWorldPos = new THREE.Vector3();
const _projForwardPoint = new THREE.Vector3();

export function projectWorldToMiniMap(
  worldX: number,
  worldZ: number,
  rotationYRad: number,
  mapCenterX: number,
  mapCenterZ: number,
  zoom: number,
  orthoHalfExtent: number = GAME_CONFIG.miniMap.orthoHalfExtent,
  orthoCamera?: THREE.OrthographicCamera | null
): MiniMapProjectionResult {
  const safeX = Number.isFinite(worldX) ? worldX : 0;
  const safeZ = Number.isFinite(worldZ) ? worldZ : 0;
  const safeRotY = Number.isFinite(rotationYRad) ? rotationYRad : 0;
  const safeCenterX = Number.isFinite(mapCenterX) ? mapCenterX : 0;
  const safeCenterZ = Number.isFinite(mapCenterZ) ? mapCenterZ : 0;
  const safeZoom = clampMiniMapZoom(zoom);
  const halfSpan = Math.max(1, orthoHalfExtent / safeZoom);

  let ndcX = 0;
  let ndcY = 0;
  let screenRotationDeg = 0;

  if (orthoCamera) {
    _projWorldPos.set(safeX, 0, safeZ).project(orthoCamera);
    ndcX = Number.isFinite(_projWorldPos.x) ? _projWorldPos.x : 0;
    ndcY = Number.isFinite(_projWorldPos.y) ? _projWorldPos.y : 0;

    // Project a point 1m ahead of the character's local +Z forward axis in World Space
    const fwdWorldX = safeX + Math.sin(safeRotY) * 1.0;
    const fwdWorldZ = safeZ + Math.cos(safeRotY) * 1.0;
    _projForwardPoint.set(fwdWorldX, 0, fwdWorldZ).project(orthoCamera);

    const dScreenX = (_projForwardPoint.x - ndcX) * 0.5;
    const dScreenY = (ndcY - _projForwardPoint.y) * 0.5;
    if (Math.hypot(dScreenX, dScreenY) > 1e-5) {
      // 0 deg points UP (top of Mini Map = -Y in screen space)
      screenRotationDeg = (Math.atan2(dScreenX, -dScreenY) * 180) / Math.PI;
    }
  } else {
    // Analytical Orthographic projection matching camera at (centerX, H, centerZ) with up=(0,0,-1)
    ndcX = (safeX - safeCenterX) / halfSpan;
    ndcY = -(safeZ - safeCenterZ) / halfSpan;
    const dScreenX = Math.sin(safeRotY);
    const dScreenY = Math.cos(safeRotY);
    screenRotationDeg = (Math.atan2(dScreenX, -dScreenY) * 180) / Math.PI;
  }

  // Normalize angle to [0, 360)
  screenRotationDeg = ((screenRotationDeg % 360) + 360) % 360;

  const u = (ndcX + 1) * 0.5;
  const v = (1 - ndcY) * 0.5;

  const edgeMargin = 0.065;
  const isOutOfBounds =
    u < edgeMargin ||
    u > 1 - edgeMargin ||
    v < edgeMargin ||
    v > 1 - edgeMargin;

  const clampedU = THREE.MathUtils.clamp(u, edgeMargin, 1 - edgeMargin);
  const clampedV = THREE.MathUtils.clamp(v, edgeMargin, 1 - edgeMargin);

  return {
    u,
    v,
    clampedU,
    clampedV,
    isOutOfBounds,
    screenRotationDeg,
  };
}

// ============================================================================
// 4.5 PHASE 10 INTERACTABLE OBJECT REGISTRY & ELIGIBILITY ENGINE
// ============================================================================
export class InteractableRegistry {
  private entries = new Map<string, RegisteredInteractableEntry>();

  public register(
    definition: InteractableDefinition,
    object3D: THREE.Object3D,
    highlightMeshes: THREE.Mesh[]
  ): RegisteredInteractableEntry {
    if (!definition || !definition.id || typeof definition.id !== 'string') {
      throw new Error('Invalid InteractableDefinition: stable id is required');
    }
    const safeMaxDist =
      Number.isFinite(definition.maxDistance) && definition.maxDistance > 0.5
        ? definition.maxDistance
        : GAME_CONFIG.interaction.defaultMaxDistance;

    const normalizedDef: InteractableDefinition = {
      ...definition,
      maxDistance: safeMaxDist,
      enabled: Boolean(definition.enabled),
    };

    const existing = this.entries.get(normalizedDef.id);
    if (existing) {
      this.restoreOriginalMaterial(existing);
    }

    highlightMeshes.forEach((mesh) => {
      mesh.userData.interactableId = normalizedDef.id;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && mat.emissive && mesh.userData.baseEmissiveHex === undefined) {
        mesh.userData.baseEmissiveHex = mat.emissive.getHex();
        mesh.userData.baseEmissiveIntensity = mat.emissiveIntensity ?? 0;
      }
    });

    const anchor = new THREE.Vector3(
      normalizedDef.worldPosition[0],
      normalizedDef.worldPosition[1],
      normalizedDef.worldPosition[2]
    );

    const entry: RegisteredInteractableEntry = {
      definition: normalizedDef,
      object3D,
      highlightMeshes,
      worldAnchor: anchor,
      isActivated: existing ? existing.isActivated : false,
      interactionCount: existing ? existing.interactionCount : 0,
    };

    this.entries.set(normalizedDef.id, entry);
    return entry;
  }

  public unregister(id: string): boolean {
    const existing = this.entries.get(id);
    if (!existing) return false;
    this.restoreOriginalMaterial(existing);
    existing.highlightMeshes.forEach((m) => {
      delete m.userData.interactableId;
    });
    return this.entries.delete(id);
  }

  public setEnabled(id: string, enabled: boolean): boolean {
    const entry = this.entries.get(id);
    if (!entry) return false;
    entry.definition.enabled = Boolean(enabled);
    if (!enabled) {
      this.restoreOriginalMaterial(entry);
    }
    return true;
  }

  public get(id: string): RegisteredInteractableEntry | undefined {
    return this.entries.get(id);
  }

  public getAll(): RegisteredInteractableEntry[] {
    return Array.from(this.entries.values());
  }

  public getCandidateMeshes(): THREE.Mesh[] {
    const list: THREE.Mesh[] = [];
    this.entries.forEach((entry) => {
      if (entry.definition.enabled && entry.object3D.visible) {
        for (let i = 0; i < entry.highlightMeshes.length; i++) {
          list.push(entry.highlightMeshes[i]);
        }
      }
    });
    return list;
  }

  public applyHighlight(
    targetId: string | null,
    status: InteractionEligibilityStatus
  ): void {
    this.entries.forEach((entry, id) => {
      if (id !== targetId || status === 'idle' || status === 'disabled') {
        this.restoreOriginalMaterial(entry);
        return;
      }

      const isEligible = status === 'eligible';
      const highlightHex = isEligible ? 0x38bdf8 : 0xf59e0b;
      const highlightIntensity = isEligible ? 0.85 : 0.32;

      entry.highlightMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat && mat.emissive) {
          mat.emissive.setHex(highlightHex);
          mat.emissiveIntensity = highlightIntensity;
        }
      });
    });
  }

  public restoreOriginalMaterial(entry: RegisteredInteractableEntry): void {
    entry.highlightMeshes.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && mat.emissive && mesh.userData.baseEmissiveHex !== undefined) {
        if (entry.definition.type === 'activate' && entry.isActivated) {
          mat.emissive.setHex(0x10b981);
          mat.emissiveIntensity = 0.72;
        } else {
          mat.emissive.setHex(mesh.userData.baseEmissiveHex);
          mat.emissiveIntensity = mesh.userData.baseEmissiveIntensity ?? 0;
        }
      }
    });
  }

  public toggleActivated(id: string): boolean {
    const entry = this.entries.get(id);
    if (!entry) return false;
    entry.isActivated = !entry.isActivated;
    entry.interactionCount += 1;
    this.restoreOriginalMaterial(entry);
    return entry.isActivated;
  }

  public recordInteraction(id: string): number {
    const entry = this.entries.get(id);
    if (!entry) return 0;
    entry.interactionCount += 1;
    return entry.interactionCount;
  }

  public clear(): void {
    this.entries.forEach((entry) => this.restoreOriginalMaterial(entry));
    this.entries.clear();
  }
}

export function evaluateInteractionDistanceAndEligibility(
  playerPos: { x: number; y: number; z: number },
  entry: RegisteredInteractableEntry,
  isOccluded: boolean
): { distanceMeters: number; status: InteractionEligibilityStatus } {
  if (!entry.definition.enabled) {
    return { distanceMeters: Infinity, status: 'disabled' };
  }
  const dx = (Number.isFinite(playerPos.x) ? playerPos.x : 0) - entry.worldAnchor.x;
  const dy = (Number.isFinite(playerPos.y) ? playerPos.y : 0) - entry.worldAnchor.y;
  const dz = (Number.isFinite(playerPos.z) ? playerPos.z : 0) - entry.worldAnchor.z;
  const dist = Math.hypot(dx, dy, dz);

  if (!Number.isFinite(dist)) {
    return { distanceMeters: Infinity, status: 'out-of-range' };
  }
  if (isOccluded) {
    return { distanceMeters: Number(dist.toFixed(2)), status: 'occluded' };
  }
  if (dist <= entry.definition.maxDistance) {
    return { distanceMeters: Number(dist.toFixed(2)), status: 'eligible' };
  }
  return { distanceMeters: Number(dist.toFixed(2)), status: 'out-of-range' };
}

export const INITIAL_INTERACTABLE_FIXTURES: readonly InteractableDefinition[] = [
  {
    id: 'fixture-origin-monolith',
    type: 'inspect',
    label: 'Cột Mốc Tọa Độ Trung Tâm (Test Fixture)',
    actionLabelVi: 'Quan sát cột mốc',
    actionLabelEn: 'Inspect Survey Monolith',
    description:
      'Cột mốc chuẩn hệ trục thế giới cục bộ (-Z/+X) đặt tại rìa Quảng trường Xuất phát để kiểm thử Raycasting và khoảng cách tương tác.',
    detailPoints: [
      'Loại tương tác: INSPECT (Khảo sát đối tượng tại chỗ)',
      'Tọa độ thế giới cục bộ: X = -3.20m, Z = -4.50m',
      'Bán kính tương tác tối đa: 4.60m tính từ gốc nhân vật (Player Root)',
    ],
    maxDistance: 4.6,
    enabled: true,
    worldPosition: [-3.2, 0, -4.5],
    accentColorHex: 0x0ea5e9,
  },
  {
    id: 'fixture-weather-telemetry-post',
    type: 'information',
    label: 'Trạm Dữ Liệu Khí Tượng Thử Nghiệm',
    actionLabelVi: 'Xem thông tin trạm',
    actionLabelEn: 'Read Telemetry Station',
    description:
      'Trạm thu phát tín hiệu thời tiết và vị trí mặt trời thời gian thực (Asia/Ho_Chi_Minh GMT+7) phục vụ kiểm thử Contextual Information Panel.',
    detailPoints: [
      'Loại tương tác: INFORMATION (Mở bảng thông tin ngữ cảnh chi tiết)',
      'Đồng bộ trực tiếp với Open-Meteo API và bộ tính toán thiên văn Đà Nẵng',
      'Tọa độ thế giới cục bộ: X = +4.20m, Z = -4.20m',
    ],
    maxDistance: 4.8,
    enabled: true,
    worldPosition: [4.2, 0, -4.2],
    accentColorHex: 0x10b981,
  },
  {
    id: 'fixture-calibration-beacon',
    type: 'activate',
    label: 'Đèn Hiệu Chuẩn Tương Tác (Beacon)',
    actionLabelVi: 'Bật / Tắt đèn hiệu',
    actionLabelEn: 'Toggle Calibration Beacon',
    description:
      'Trụ đèn hiệu chuẩn năng lượng cho phép người chơi kích hoạt hoặc ngắt trạng thái hoạt động trực tiếp trong không gian 3D.',
    detailPoints: [
      'Loại tương tác: ACTIVATE (Chuyển đổi trạng thái vật thể 3D)',
      'Phản hồi trực quan: Thay đổi màu lõi năng lượng và tốc độ vòng xoay',
      'Tọa độ thế giới cục bộ: X = 0.00m, Z = -6.80m',
    ],
    maxDistance: 5.0,
    enabled: true,
    worldPosition: [0.0, 0, -6.8],
    accentColorHex: 0xf59e0b,
  },
] as const;

// ============================================================================
// 5. WMO WEATHER INTERPRETATION CODE MAPPER
// ============================================================================
export function mapWmoWeatherCode(rawCode: number): MappedWeatherInfo {
  const code = Number.isFinite(rawCode) ? Math.round(rawCode) : -1;

  switch (code) {
    case 0:
      return {
        code,
        category: 'clear',
        viDescription: 'Trời quang đãng',
        enDescription: 'Clear Sky',
        effects: {
          cloudCoverFloor: 5,
          cloudDarkness: 0.0,
          sunAttenuation: 1.0,
          fogMultiplier: 0.85,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
    case 1:
      return {
        code,
        category: 'mainly-clear',
        viDescription: 'Nắng nhẹ, ít mây',
        enDescription: 'Mainly Clear',
        effects: {
          cloudCoverFloor: 18,
          cloudDarkness: 0.04,
          sunAttenuation: 0.96,
          fogMultiplier: 0.92,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
    case 2:
      return {
        code,
        category: 'partly-cloudy',
        viDescription: 'Có mây rải rác',
        enDescription: 'Partly Cloudy',
        effects: {
          cloudCoverFloor: 48,
          cloudDarkness: 0.14,
          sunAttenuation: 0.84,
          fogMultiplier: 1.05,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
    case 3:
      return {
        code,
        category: 'overcast',
        viDescription: 'Nhiều mây âm u',
        enDescription: 'Overcast',
        effects: {
          cloudCoverFloor: 88,
          cloudDarkness: 0.38,
          sunAttenuation: 0.56,
          fogMultiplier: 1.35,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.1,
          hasLightning: false,
        },
      };
    case 45:
    case 48:
      return {
        code,
        category: 'fog',
        viDescription: 'Sương mù dày',
        enDescription: 'Fog',
        effects: {
          cloudCoverFloor: 75,
          cloudDarkness: 0.25,
          sunAttenuation: 0.52,
          fogMultiplier: 2.85,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.25,
          hasLightning: false,
        },
      };
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        code,
        category: 'drizzle',
        viDescription:
          code >= 56 ? 'Mưa phùn lạnh' : code === 55 ? 'Mưa phùn dày' : 'Mưa phùn nhẹ',
        enDescription: code >= 56 ? 'Freezing Drizzle' : 'Drizzle',
        effects: {
          cloudCoverFloor: 78,
          cloudDarkness: 0.35,
          sunAttenuation: 0.58,
          fogMultiplier: 1.65,
          rainParticleCount: 950,
          rainFallSpeed: 13.5,
          groundWetness: 0.55,
          hasLightning: false,
        },
      };
    case 61:
    case 63:
    case 66:
      return {
        code,
        category: 'rain',
        viDescription: code === 61 ? 'Mưa nhỏ' : 'Mưa vừa',
        enDescription: code === 66 ? 'Freezing Rain' : 'Rain',
        effects: {
          cloudCoverFloor: 88,
          cloudDarkness: 0.48,
          sunAttenuation: 0.45,
          fogMultiplier: 1.85,
          rainParticleCount: 1900,
          rainFallSpeed: 19.5,
          groundWetness: 0.8,
          hasLightning: false,
        },
      };
    case 65:
    case 67:
      return {
        code,
        category: 'heavy-rain',
        viDescription: 'Mưa lớn nặng hạt',
        enDescription: 'Heavy Rain',
        effects: {
          cloudCoverFloor: 96,
          cloudDarkness: 0.65,
          sunAttenuation: 0.32,
          fogMultiplier: 2.35,
          rainParticleCount: 3000,
          rainFallSpeed: 25.0,
          groundWetness: 0.95,
          hasLightning: false,
        },
      };
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return {
        code,
        category: 'snow',
        viDescription: 'Tuyết rơi',
        enDescription: code >= 85 ? 'Snow Showers' : 'Snow',
        effects: {
          cloudCoverFloor: 85,
          cloudDarkness: 0.3,
          sunAttenuation: 0.5,
          fogMultiplier: 1.9,
          rainParticleCount: 1200,
          rainFallSpeed: 6.5,
          groundWetness: 0.4,
          hasLightning: false,
        },
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        category: code === 82 ? 'heavy-rain' : 'showers',
        viDescription:
          code === 82
            ? 'Mưa rào rất to'
            : code === 81
              ? 'Mưa rào vừa'
              : 'Mưa rào nhẹ',
        enDescription: code === 82 ? 'Violent Rain Showers' : 'Rain Showers',
        effects: {
          cloudCoverFloor: 85,
          cloudDarkness: code === 82 ? 0.65 : 0.48,
          sunAttenuation: code === 82 ? 0.34 : 0.48,
          fogMultiplier: code === 82 ? 2.25 : 1.75,
          rainParticleCount: code === 82 ? 2900 : 1850,
          rainFallSpeed: code === 82 ? 24.5 : 19.0,
          groundWetness: 0.88,
          hasLightning: false,
        },
      };
    case 95:
    case 96:
    case 97:
    case 99:
      return {
        code,
        category: 'thunderstorm',
        viDescription: 'Mưa giông kèm sấm sét',
        enDescription: 'Thunderstorm',
        effects: {
          cloudCoverFloor: 98,
          cloudDarkness: 0.78,
          sunAttenuation: 0.24,
          fogMultiplier: 2.45,
          rainParticleCount: 3200,
          rainFallSpeed: 26.5,
          groundWetness: 1.0,
          hasLightning: true,
        },
      };
    default:
      return {
        code,
        category: 'partly-cloudy',
        viDescription: 'Mây thay đổi',
        enDescription: 'Variable Clouds',
        effects: {
          cloudCoverFloor: 40,
          cloudDarkness: 0.15,
          sunAttenuation: 0.85,
          fogMultiplier: 1.05,
          rainParticleCount: 0,
          rainFallSpeed: 0,
          groundWetness: 0.0,
          hasLightning: false,
        },
      };
  }
}

// ============================================================================
// 6. REAL-TIME DA NANG CLOCK (ASIA/HO_CHI_MINH) & SOLAR ASTRONOMY ENGINE
// ============================================================================
const daNangPartsFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: DA_NANG_CONFIG.timezone,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
});

const daNangDateEnFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: DA_NANG_CONFIG.timezone,
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

const daNangDateViFormatter = new Intl.DateTimeFormat('vi-VN', {
  timeZone: DA_NANG_CONFIG.timezone,
  weekday: 'long',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export function getDaNangClockData(now: Date = new Date()): DaNangClockData {
  const parts = daNangPartsFormatter.formatToParts(now);
  let year = 2026;
  let month = 1;
  let day = 1;
  let hour = 0;
  let minute = 0;
  let second = 0;

  for (const p of parts) {
    switch (p.type) {
      case 'year':
        year = parseInt(p.value, 10);
        break;
      case 'month':
        month = parseInt(p.value, 10);
        break;
      case 'day':
        day = parseInt(p.value, 10);
        break;
      case 'hour':
        hour = parseInt(p.value, 10) % 24;
        break;
      case 'minute':
        minute = parseInt(p.value, 10);
        break;
      case 'second':
        second = parseInt(p.value, 10);
        break;
    }
  }

  const pad = (n: number) => String(n).padStart(2, '0');
  const timeString = `${pad(hour)}:${pad(minute)}:${pad(second)}`;
  const timeShortString = `${pad(hour)}:${pad(minute)}`;
  const fractionalHours = hour + minute / 60 + second / 3600;

  return {
    timeString,
    timeShortString,
    dateStringEn: daNangDateEnFormatter.format(now),
    dateStringVi: daNangDateViFormatter.format(now),
    year,
    month,
    day,
    hour,
    minute,
    second,
    fractionalHours,
    timestampMs: now.getTime(),
  };
}

export function formatDecimalHoursToHHMM(decimalHours: number): string {
  const normalized = ((decimalHours % 24) + 24) % 24;
  const totalMinutes = Math.round(normalized * 60);
  const h = Math.floor(totalMinutes / 60) % 24;
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
}

export function formatIsoTimeString(isoStr?: string): string {
  if (!isoStr || typeof isoStr !== 'string') return '--:--';
  const tIndex = isoStr.indexOf('T');
  if (tIndex !== -1 && isoStr.length >= tIndex + 6) {
    return isoStr.slice(tIndex + 1, tIndex + 6);
  }
  return isoStr;
}

export function calculateDaNangSolarData(
  clock: DaNangClockData
): SolarAstronomicalData {
  const rad = Math.PI / 180;
  const deg = 180 / Math.PI;

  const startOfYearUtc = Date.UTC(clock.year, 0, 0);
  const currentDayUtc = Date.UTC(clock.year, clock.month - 1, clock.day);
  const dayOfYear = Math.floor((currentDayUtc - startOfYearUtc) / 86400000);

  const gamma =
    ((2 * Math.PI) / 365) *
    (dayOfYear - 1 + (clock.fractionalHours - 12) / 24);

  const eqTimeMinutes =
    229.18 *
    (0.000075 +
      0.001868 * Math.cos(gamma) -
      0.032077 * Math.sin(gamma) -
      0.014615 * Math.cos(2 * gamma) -
      0.040849 * Math.sin(2 * gamma));

  const declRad =
    0.006918 -
    0.399912 * Math.cos(gamma) +
    0.070257 * Math.sin(gamma) -
    0.006758 * Math.cos(2 * gamma) +
    0.000907 * Math.sin(2 * gamma) -
    0.002697 * Math.cos(3 * gamma) +
    0.00148 * Math.sin(3 * gamma);

  const latRad = DA_NANG_CONFIG.latitude * rad;
  const lon = DA_NANG_CONFIG.longitude;
  const tzOffset = DA_NANG_CONFIG.utcOffsetHours;

  const solarNoonHours =
    12 + tzOffset - lon / 15 - eqTimeMinutes / 60;

  const calcHourAngleForZenith = (zenithDeg: number): number => {
    const cosH =
      (Math.cos(zenithDeg * rad) - Math.sin(latRad) * Math.sin(declRad)) /
      (Math.cos(latRad) * Math.cos(declRad));
    return Math.acos(THREE.MathUtils.clamp(cosH, -1, 1)) * deg;
  };

  const sunriseHaDeg = calcHourAngleForZenith(90.833);
  const dawnHaDeg = calcHourAngleForZenith(96.0);

  const sunriseHours = solarNoonHours - sunriseHaDeg / 15;
  const sunsetHours = solarNoonHours + sunriseHaDeg / 15;
  const dawnHours = solarNoonHours - dawnHaDeg / 15;
  const duskHours = solarNoonHours + dawnHaDeg / 15;

  const timeOffsetMinutes = eqTimeMinutes + 4 * lon - 60 * tzOffset;
  const trueSolarTimeMinutes =
    ((clock.fractionalHours * 60 + timeOffsetMinutes) % 1440 + 1440) % 1440;
  const hourAngleDeg = trueSolarTimeMinutes / 4 - 180;
  const hourAngleRad = hourAngleDeg * rad;

  const sinAlt =
    Math.sin(latRad) * Math.sin(declRad) +
    Math.cos(latRad) * Math.cos(declRad) * Math.cos(hourAngleRad);
  const altitudeRad = Math.asin(THREE.MathUtils.clamp(sinAlt, -1, 1));
  const altitudeDeg = altitudeRad * deg;

  const yAz = -Math.cos(declRad) * Math.sin(hourAngleRad);
  const xAz =
    Math.sin(declRad) * Math.cos(latRad) -
    Math.cos(declRad) * Math.sin(latRad) * Math.cos(hourAngleRad);
  let azimuthRad = Math.atan2(yAz, xAz);
  if (azimuthRad < 0) azimuthRad += 2 * Math.PI;
  const azimuthDeg = azimuthRad * deg;

  const cosAlt = Math.cos(altitudeRad);
  const sunDirection = new THREE.Vector3(
    cosAlt * Math.sin(azimuthRad),
    Math.sin(altitudeRad),
    -cosAlt * Math.cos(azimuthRad)
  ).normalize();

  const h = clock.fractionalHours;
  let phase: TimeOfDayPhase = 'NIGHT';
  let phaseVi = 'Ban đêm';
  let phaseEn = 'Night';

  if (h >= dawnHours && h < sunriseHours + 0.55) {
    phase = 'DAWN';
    phaseVi = 'Bình minh';
    phaseEn = 'Dawn';
  } else if (h >= sunriseHours + 0.55 && h < solarNoonHours - 1.15) {
    phase = 'MORNING';
    phaseVi = 'Buổi sáng';
    phaseEn = 'Morning';
  } else if (h >= solarNoonHours - 1.15 && h <= solarNoonHours + 1.35) {
    phase = 'NOON';
    phaseVi = 'Buổi trưa';
    phaseEn = 'Noon';
  } else if (h > solarNoonHours + 1.35 && h < sunsetHours - 0.65) {
    phase = 'AFTERNOON';
    phaseVi = 'Buổi chiều';
    phaseEn = 'Afternoon';
  } else if (h >= sunsetHours - 0.65 && h <= duskHours) {
    phase = 'SUNSET';
    phaseVi = 'Hoàng hôn';
    phaseEn = 'Sunset';
  } else {
    phase = 'NIGHT';
    phaseVi = 'Ban đêm';
    phaseEn = 'Night';
  }

  const daylightFactor = THREE.MathUtils.smoothstep(altitudeDeg, -6.0, 18.0);
  const twilightFactor = Math.max(
    0,
    1.0 - Math.abs(altitudeDeg - 1.5) / 10.5
  );

  return {
    azimuthRad,
    altitudeRad,
    altitudeDeg,
    azimuthDeg,
    sunriseHours,
    sunsetHours,
    dawnHours,
    duskHours,
    solarNoonHours,
    sunriseFormatted: formatDecimalHoursToHHMM(sunriseHours),
    sunsetFormatted: formatDecimalHoursToHHMM(sunsetHours),
    solarNoonFormatted: formatDecimalHoursToHHMM(solarNoonHours),
    phase,
    phaseVi,
    phaseEn,
    sunDirection,
    daylightFactor,
    twilightFactor,
  };
}

// ============================================================================
// 7. OPEN-METEO REAL-TIME WEATHER SERVICE WITH STRICT SANITIZATION
// ============================================================================
export function buildDaNangOpenMeteoUrl(): string {
  const params = new URLSearchParams({
    latitude: String(DA_NANG_CONFIG.latitude),
    longitude: String(DA_NANG_CONFIG.longitude),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'precipitation',
      'rain',
      'showers',
      'weather_code',
      'cloud_cover',
      'wind_speed_10m',
      'wind_direction_10m',
      'wind_gusts_10m',
    ].join(','),
    daily: 'sunrise,sunset',
    timezone: DA_NANG_CONFIG.timezone,
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
    forecast_days: '1',
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

function sanitizeFiniteNumber(
  raw: unknown,
  fallback: number,
  min: number,
  max: number
): { value: number; wasSanitized: boolean } {
  const num = typeof raw === 'number' ? raw : Number(raw);
  if (!Number.isFinite(num)) {
    return { value: fallback, wasSanitized: true };
  }
  if (num < min || num > max) {
    return {
      value: THREE.MathUtils.clamp(num, min, max),
      wasSanitized: true,
    };
  }
  return { value: num, wasSanitized: false };
}

export function validateAndNormalizeWeatherPayload(
  data: Record<string, unknown>,
  nowDate: Date = new Date()
): NormalizedWeatherState {
  if (!data || typeof data !== 'object' || !data.current || typeof data.current !== 'object') {
    throw new Error('Invalid Open-Meteo response schema: missing current weather block');
  }

  const cur = data.current as Record<string, unknown>;
  const daily = (data.daily as Record<string, unknown>) || {};

  let anySanitized = false;
  const check = (raw: unknown, fallback: number, min: number, max: number): number => {
    const res = sanitizeFiniteNumber(raw, fallback, min, max);
    if (res.wasSanitized) anySanitized = true;
    return res.value;
  };

  const temperature = check(cur.temperature_2m, 26, -50, 60);
  const apparentTemperature = check(cur.apparent_temperature, temperature, -60, 70);
  const humidity = Math.round(check(cur.relative_humidity_2m, 75, 0, 100));
  const precipitation = check(cur.precipitation, 0, 0, 500);
  const rain = check(cur.rain, 0, 0, 500);
  const showers = check(cur.showers, 0, 0, 500);
  const weatherCode = Math.round(check(cur.weather_code, 2, 0, 99));
  const cloudCover = Math.round(check(cur.cloud_cover, 40, 0, 100));
  const windSpeed = check(cur.wind_speed_10m, 8, 0, 300);
  const rawWindDir = check(cur.wind_direction_10m, 90, -360, 720);
  const windDirection = ((Math.round(rawWindDir) % 360) + 360) % 360;
  const windGusts = check(cur.wind_gusts_10m, windSpeed, 0, 400);

  const sunriseArr = Array.isArray(daily.sunrise) ? daily.sunrise : [];
  const sunsetArr = Array.isArray(daily.sunset) ? daily.sunset : [];
  const sunriseIso = typeof sunriseArr[0] === 'string' ? sunriseArr[0] : '';
  const sunsetIso = typeof sunsetArr[0] === 'string' ? sunsetArr[0] : '';

  const mapped = mapWmoWeatherCode(weatherCode);
  const fetchClock = getDaNangClockData(nowDate);

  return {
    source: 'Open-Meteo Forecast API',
    temperature,
    apparentTemperature,
    humidity,
    isDay: cur.is_day === 1,
    precipitation,
    rain,
    showers,
    weatherCode,
    cloudCover,
    windSpeed,
    windDirection,
    windGusts,
    sunriseIso,
    sunsetIso,
    sunriseFormatted: formatIsoTimeString(sunriseIso),
    sunsetFormatted: formatIsoTimeString(sunsetIso),
    apiObservationTime: formatIsoTimeString(typeof cur.time === 'string' ? cur.time : ''),
    fetchedAtFormatted: fetchClock.timeString.slice(0, 5),
    fetchedAtTimestampMs: nowDate.getTime(),
    freshness: 'live',
    validationStatus: anySanitized ? 'sanitized' : 'valid',
    mapped,
  };
}

export async function fetchDaNangWeatherWithRetry(
  externalSignal?: AbortSignal,
  maxRetries = 3
): Promise<NormalizedWeatherState> {
  const url = buildDaNangOpenMeteoUrl();
  let attempt = 0;

  while (attempt < maxRetries) {
    const timeoutController = new AbortController();
    const timeoutId = window.setTimeout(
      () => timeoutController.abort(),
      GAME_CONFIG.weatherRequestTimeoutMs
    );

    const onExternalAbort = () => timeoutController.abort();
    if (externalSignal) {
      if (externalSignal.aborted) {
        window.clearTimeout(timeoutId);
        throw new DOMException('Aborted', 'AbortError');
      }
      externalSignal.addEventListener('abort', onExternalAbort, { once: true });
    }

    try {
      const response = await fetch(url, {
        signal: timeoutController.signal,
        headers: { Accept: 'application/json' },
      });
      window.clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener('abort', onExternalAbort);
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const rawJson = (await response.json()) as Record<string, unknown>;
      return validateAndNormalizeWeatherPayload(rawJson, new Date());
    } catch (err: unknown) {
      window.clearTimeout(timeoutId);
      if (externalSignal) {
        externalSignal.removeEventListener('abort', onExternalAbort);
      }
      if (externalSignal?.aborted) {
        throw err;
      }
      attempt++;
      if (attempt >= maxRetries) {
        throw err;
      }
      const backoffMs = 1000 * Math.pow(2, attempt - 1);
      await new Promise((resolve) => window.setTimeout(resolve, backoffMs));
    }
  }

  throw new Error('Weather API maximum retries exceeded');
}

export function formatCompassDirection(deg: number): string {
  const directions = ['Bắc', 'ĐB', 'Đông', 'ĐN', 'Nam', 'TN', 'Tây', 'TB'];
  const idx = Math.round(((deg % 360) + 360) / 45) % 8;
  return directions[idx];
}

// ============================================================================
// 8. ADAPTIVE INPUT SYSTEM & FOCUS ISOLATION HELPERS
// ============================================================================
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
    window.matchMedia?.('(pointer: coarse)').matches ||
    window.matchMedia?.('(any-pointer: coarse)').matches ||
    false;
  const hasFine =
    window.matchMedia?.('(pointer: fine)').matches ||
    window.matchMedia?.('(any-pointer: fine)').matches ||
    false;
  const hoverNone = window.matchMedia?.('(hover: none)').matches || false;
  const maxTouchPoints = navigator.maxTouchPoints || 0;
  const hasTouchCapability = hasCoarse || maxTouchPoints > 0;

  const width = window.innerWidth;
  const height = window.innerHeight;
  const minDim = Math.min(width, height);
  const maxDim = Math.max(width, height);
  const orientation: 'landscape' | 'portrait' =
    width >= height ? 'landscape' : 'portrait';

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
  } else {
    if (hasCoarse && (!hasFine || hoverNone)) {
      showTouchControls = true;
      activeInput = 'touch';
    } else if (formFactor === 'mobile' || formFactor === 'tablet') {
      showTouchControls = true;
      activeInput = isHybrid ? 'hybrid' : 'touch';
    } else {
      showTouchControls = false;
      activeInput = isHybrid ? 'hybrid' : 'keyboard-mouse';
    }
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
  const safeDeadzone = THREE.MathUtils.clamp(
    Number.isFinite(deadzone) ? deadzone : 0.12,
    0,
    0.85
  );

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

  const remappedMagnitude = Math.min(
    1,
    (rawRatio - safeDeadzone) / (1 - safeDeadzone)
  );

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

// ============================================================================
// 8.5 PHASE 7 CONTROL GUIDE DATA MODEL (DECOUPLED FROM JSX PRESENTATION)
// ============================================================================
export const DESKTOP_CONTROL_INSTRUCTIONS: readonly ControlInstruction[] = [
  {
    id: 'kb-move-wasd',
    inputType: 'keyboard',
    action: 'Di chuyển 4 hướng',
    description: 'Tiến (W), Lùi (S), Trái (A), Phải (D) hoặc Phím Mũi Tên',
    keys: ['W', 'A', 'S', 'D'],
    badgeText: 'Arrows',
  },
  {
    id: 'kb-sprint-shift',
    inputType: 'keyboard',
    action: 'Chạy nhanh (Sprint)',
    description: 'Giữ phím Shift khi đang di chuyển để chạy bứt tốc',
    keys: ['SHIFT'],
  },
  {
    id: 'kb-jump-space',
    inputType: 'keyboard',
    action: 'Nhảy (Jump)',
    description: 'Nhấn Space để bật nhảy khi nhân vật đang đứng trên mặt đất',
    keys: ['SPACE'],
  },
  {
    id: 'mouse-look-orbit',
    inputType: 'mouse',
    action: 'Xoay góc nhìn 360°',
    description: 'Click vào vùng 3D để khóa chuột (Pointer Lock) hoặc giữ chuột trái kéo, nhấn ESC để nhả chuột',
    keys: ['MOUSE', 'ESC'],
  },
  {
    id: 'mouse-wheel-zoom',
    inputType: 'mouse',
    action: 'Thu phóng Camera',
    description: 'Lăn con lăn chuột (Scroll Wheel) để đổi khoảng cách góc nhìn',
    keys: ['SCROLL'],
  },
] as const;

export const TOUCH_CONTROL_INSTRUCTIONS: readonly ControlInstruction[] = [
  {
    id: 'touch-virtual-joystick',
    inputType: 'touch',
    action: 'Di chuyển nhân vật',
    description: 'Kéo Virtual Joystick bên trái màn hình (biên độ kéo điều chỉnh tốc độ)',
    badgeText: 'LEFT JOYSTICK',
  },
  {
    id: 'touch-camera-swipe',
    inputType: 'touch',
    action: 'Quan sát & Thu phóng',
    description: 'Vuốt 1 ngón trên vùng cảnh 3D để xoay camera, chụm 2 ngón để Zoom',
    badgeText: 'SWIPE / PINCH',
  },
  {
    id: 'touch-sprint-action',
    inputType: 'touch',
    action: 'Chạy nhanh (Sprint)',
    description: 'Nhấn giữ nút SPRINT bên phải hoặc chạm đúp để khóa chạy (RUN)',
    badgeText: 'HOLD / 2x TAP',
  },
  {
    id: 'touch-jump-action',
    inputType: 'touch',
    action: 'Nhảy (Jump)',
    description: 'Chạm nút JUMP bên phải để nhảy khi nhân vật đang trên mặt đất',
    badgeText: 'TAP JUMP',
  },
  {
    id: 'touch-multitouch-tip',
    inputType: 'touch',
    action: 'Điều khiển đa điểm',
    description: 'Một ngón tay kéo Joystick di chuyển, ngón tay khác vuốt xoay Camera cùng lúc',
    badgeText: 'MULTI-TOUCH',
  },
] as const;

export function getActiveControlGuideInstructions(
  isTouchGuideMode: boolean
): readonly ControlInstruction[] {
  return isTouchGuideMode
    ? TOUCH_CONTROL_INSTRUCTIONS
    : DESKTOP_CONTROL_INSTRUCTIONS;
}

// ============================================================================
// 9. AUTOMATED IN-APP DIAGNOSTIC SUITE
// ============================================================================
export function runSystemDiagnosticsSuite(): DiagnosticCheckResult[] {
  const results: DiagnosticCheckResult[] = [];

  const testDate = new Date('2026-11-10T01:30:00.000Z');
  const clockCheck = getDaNangClockData(testDate);
  const tzPassed =
    clockCheck.hour === 8 &&
    clockCheck.minute === 30 &&
    clockCheck.timeString === '08:30:00';
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
      apparent_temperature: NaN,
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
  const joyNaN = computeNormalizedJoystickInput(NaN, Infinity, 50, 0.15);
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
  const zNaNSafe = clampMiniMapZoom(NaN);
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
  const projNaN = projectWorldToMiniMap(NaN, Infinity, NaN, 0, 0, 1.0, 72);
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
  const nearEval = evaluateInteractionDistanceAndEligibility(
    { x: 0, y: 0, z: -4.0 },
    regEntry,
    false
  );
  const farEval = evaluateInteractionDistanceAndEligibility(
    { x: 0, y: 0, z: -15.0 },
    regEntry,
    false
  );
  const occludedEval = evaluateInteractionDistanceAndEligibility(
    { x: 0, y: 0, z: -4.0 },
    regEntry,
    true
  );
  testRegistry.applyHighlight('test-beacon', 'eligible');
  const highlightedHex = (
    dummyMesh.material as THREE.MeshStandardMaterial
  ).emissive.getHex();
  testRegistry.applyHighlight(null, 'idle');
  const restoredHex = (
    dummyMesh.material as THREE.MeshStandardMaterial
  ).emissive.getHex();
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

  return results;
}

// ============================================================================
// 10. TERRAIN TOPOGRAPHY & COLLISION GEOMETRY DEFINITIONS
// ============================================================================
const PLATFORM_COLLIDERS: PlatformCollider[] = [
  { id: 'step-1', x: 7.5, z: -6.0, width: 3.4, depth: 3.4, topY: 0.45, baseY: -0.5, color: 0x64748b },
  { id: 'step-2', x: 11.5, z: -6.0, width: 3.6, depth: 3.6, topY: 1.0, baseY: -0.5, color: 0x475569 },
  { id: 'step-3', x: 15.8, z: -6.0, width: 4.0, depth: 4.0, topY: 1.6, baseY: -0.5, color: 0x334155 },
  { id: 'step-4', x: 15.8, z: -11.2, width: 4.6, depth: 4.6, topY: 2.2, baseY: -0.5, color: 0x475569 },
  { id: 'overlook', x: 10.5, z: -12.0, width: 5.5, depth: 4.5, topY: 2.75, baseY: -0.5, color: 0x1e293b },
];

const ROCK_COLLIDERS: CylinderCollider[] = [
  { x: -9.5, z: -7.5, radius: 1.6, height: 1.8 },
  { x: -14.0, z: 5.5, radius: 2.2, height: 2.5 },
  { x: 6.5, z: 11.0, radius: 1.5, height: 1.6 },
  { x: -6.5, z: 16.5, radius: 2.0, height: 2.1 },
  { x: 19.0, z: 7.5, radius: 2.4, height: 2.8 },
  { x: -19.5, z: -14.5, radius: 2.6, height: 3.0 },
  { x: 3.0, z: -20.0, radius: 1.9, height: 2.2 },
  { x: 23.0, z: -17.0, radius: 2.3, height: 2.6 },
];

const TREE_COLLIDERS: CylinderCollider[] = [
  { x: -7.5, z: -13.0, radius: 0.48, height: 5.0 },
  { x: -13.5, z: -4.0, radius: 0.52, height: 5.5 },
  { x: -11.0, z: 11.0, radius: 0.48, height: 5.0 },
  { x: -4.5, z: 13.5, radius: 0.45, height: 4.8 },
  { x: 11.5, z: 8.5, radius: 0.52, height: 5.4 },
  { x: 16.5, z: 3.0, radius: 0.48, height: 5.0 },
  { x: 19.5, z: -2.0, radius: 0.52, height: 5.2 },
  { x: 6.0, z: -17.5, radius: 0.48, height: 5.0 },
  { x: -17.5, z: -19.0, radius: 0.55, height: 6.0 },
  { x: -23.0, z: 2.0, radius: 0.55, height: 5.8 },
  { x: -19.0, z: 18.5, radius: 0.52, height: 5.5 },
  { x: 2.5, z: 23.0, radius: 0.5, height: 5.2 },
  { x: 17.0, z: 19.0, radius: 0.55, height: 5.8 },
  { x: 26.0, z: 11.0, radius: 0.52, height: 5.4 },
  { x: 27.0, z: -9.5, radius: 0.55, height: 6.0 },
  { x: 15.0, z: -23.5, radius: 0.5, height: 5.2 },
  { x: -4.0, z: -25.0, radius: 0.52, height: 5.4 },
  { x: -26.0, z: -9.5, radius: 0.55, height: 5.8 },
];

function getTerrainElevation(x: number, z: number): number {
  const distFromOrigin = Math.hypot(x, z);
  const spawnFlatten = THREE.MathUtils.smoothstep(distFromOrigin, 5.5, 17.0);
  const rollingHills =
    Math.sin(x * 0.055) * Math.cos(z * 0.055) * 1.35 +
    Math.sin(x * 0.13 + z * 0.09) * 0.42;
  const outerRim =
    THREE.MathUtils.smoothstep(distFromOrigin, 38.0, 68.0) * 3.2;
  return (rollingHills + outerRim) * spawnFlatten;
}

function getSupportSurfaceHeight(
  x: number,
  z: number,
  currentY: number,
  playerRadius: number
): number {
  let highestY = getTerrainElevation(x, z);
  for (let i = 0; i < PLATFORM_COLLIDERS.length; i++) {
    const p = PLATFORM_COLLIDERS[i];
    const halfW = p.width / 2 + playerRadius * 0.72;
    const halfD = p.depth / 2 + playerRadius * 0.72;
    if (
      Math.abs(x - p.x) <= halfW &&
      Math.abs(z - p.z) <= halfD &&
      currentY >= p.topY - 0.68
    ) {
      if (p.topY > highestY) highestY = p.topY;
    }
  }
  return highestY;
}

function resolveHorizontalCollisions(
  nextX: number,
  nextZ: number,
  currentY: number,
  playerRadius: number
): { x: number; z: number } {
  let rx = nextX;
  let rz = nextZ;

  for (let i = 0; i < PLATFORM_COLLIDERS.length; i++) {
    const p = PLATFORM_COLLIDERS[i];
    if (currentY < p.topY - 0.25) {
      const halfW = p.width / 2 + playerRadius;
      const halfD = p.depth / 2 + playerRadius;
      const dx = rx - p.x;
      const dz = rz - p.z;
      if (Math.abs(dx) < halfW && Math.abs(dz) < halfD) {
        const overlapX = halfW - Math.abs(dx);
        const overlapZ = halfD - Math.abs(dz);
        if (overlapX < overlapZ) {
          rx += dx > 0 ? overlapX : -overlapX;
        } else {
          rz += dz > 0 ? overlapZ : -overlapZ;
        }
      }
    }
  }

  const allCylinders = [...ROCK_COLLIDERS, ...TREE_COLLIDERS];
  for (let i = 0; i < allCylinders.length; i++) {
    const c = allCylinders[i];
    const minDist = c.radius + playerRadius;
    const dx = rx - c.x;
    const dz = rz - c.z;
    const distSq = dx * dx + dz * dz;
    if (distSq < minDist * minDist && distSq > 0.00001) {
      const dist = Math.sqrt(distSq);
      const push = minDist - dist;
      rx += (dx / dist) * push;
      rz += (dz / dist) * push;
    }
  }

  return { x: rx, z: rz };
}

// ============================================================================
// 11. PROCEDURAL PBR TEXTURE GENERATORS
// ============================================================================
function createOrganicGrassTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#3f6a28';
    ctx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 16000; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const w = 1 + Math.random() * 2;
      const h = 3 + Math.random() * 6;
      const shade = Math.random();
      ctx.fillStyle =
        shade > 0.65 ? '#528735' : shade > 0.3 ? '#355c20' : '#2a4b18';
      ctx.fillRect(x, y, w, h);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(36, 36);
  texture.anisotropy = 4;
  return texture;
}

function createStoneTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#64748b';
    ctx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 4500; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle =
        Math.random() > 0.5
          ? 'rgba(255,255,255,0.07)'
          : 'rgba(15,23,42,0.12)';
      ctx.fillRect(x, y, 3, 3);
    }
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// ============================================================================
// 12. 3D HUMANOID CHARACTER BUILDER ("CASUAL EXPLORER")
// ============================================================================
function createCasualExplorerRig(): HumanoidRig {
  const root = new THREE.Group();
  root.name = 'PlayerRoot';

  const skinMat = new THREE.MeshStandardMaterial({ color: 0xf1c29d, roughness: 0.62, metalness: 0.04 });
  const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.78, metalness: 0.05 });
  const jacketMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.52, metalness: 0.1 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7, metalness: 0.02 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.76, metalness: 0.05 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.55, metalness: 0.12 });
  const soleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.5 });
  const backpackMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.65, metalness: 0.08 });
  const darkDetailMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.25 });
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0xb96b59, roughness: 0.5 });

  const enableShadow = (mesh: THREE.Mesh): THREE.Mesh => {
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    return mesh;
  };

  const hips = new THREE.Group();
  hips.position.set(0, 0.92, 0);
  root.add(hips);

  const waist = new THREE.Group();
  hips.add(waist);

  const pelvisMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.14, 0.22), pantsMat));
  waist.add(pelvisMesh);

  const beltMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.355, 0.04, 0.23), darkDetailMat));
  beltMesh.position.set(0, 0.06, 0);
  waist.add(beltMesh);

  const body = new THREE.Group();
  body.position.set(0, 0.08, 0);
  waist.add(body);

  const abdomenShirt = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.31, 0.22, 0.19), shirtMat));
  abdomenShirt.position.set(0, 0.11, 0);
  body.add(abdomenShirt);

  const jacketLeftPanel = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.23, 0.215), jacketMat));
  jacketLeftPanel.position.set(0.11, 0.11, 0.005);
  body.add(jacketLeftPanel);

  const jacketRightPanel = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.23, 0.215), jacketMat));
  jacketRightPanel.position.set(-0.11, 0.11, 0.005);
  body.add(jacketRightPanel);

  const jacketBackLower = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.23, 0.1), jacketMat));
  jacketBackLower.position.set(0, 0.11, -0.06);
  body.add(jacketBackLower);

  const chest = new THREE.Group();
  chest.position.set(0, 0.22, 0);
  body.add(chest);

  const upperChestMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.23), jacketMat));
  upperChestMesh.position.set(0, 0.14, 0);
  chest.add(upperChestMesh);

  const shirtVNeck = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.26, 0.06), shirtMat));
  shirtVNeck.position.set(0, 0.15, 0.095);
  chest.add(shirtVNeck);

  const collarMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.19), jacketMat));
  collarMesh.position.set(0, 0.29, -0.015);
  chest.add(collarMesh);

  const backpackMain = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.34, 0.14), backpackMat));
  backpackMain.position.set(0, 0.12, -0.17);
  chest.add(backpackMain);

  const backpackPocket = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.16, 0.05), darkDetailMat));
  backpackPocket.position.set(0, 0.06, -0.25);
  chest.add(backpackPocket);

  const neck = new THREE.Group();
  neck.position.set(0, 0.29, 0);
  chest.add(neck);

  const neckMesh = enableShadow(new THREE.Mesh(new THREE.CylinderGeometry(0.064, 0.074, 0.1, 14), skinMat));
  neckMesh.position.set(0, 0.05, 0);
  neck.add(neckMesh);

  const head = new THREE.Group();
  head.position.set(0, 0.09, 0);
  neck.add(head);

  const faceBox = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.24, 0.22), skinMat));
  faceBox.position.set(0, 0.12, 0);
  head.add(faceBox);

  const jawMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.05, 0.19), skinMat));
  jawMesh.position.set(0, 0.01, 0.01);
  head.add(jawMesh);

  const noseMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.052, 0.04), skinMat));
  noseMesh.position.set(0, 0.115, 0.12);
  head.add(noseMesh);

  const mouthMesh = new THREE.Mesh(new THREE.BoxGeometry(0.064, 0.016, 0.015), mouthMat);
  mouthMesh.position.set(0, 0.062, 0.112);
  head.add(mouthMesh);

  const leftEye = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.028, 0.015), darkDetailMat);
  leftEye.position.set(0.052, 0.14, 0.112);
  head.add(leftEye);

  const rightEye = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.028, 0.015), darkDetailMat);
  rightEye.position.set(-0.052, 0.14, 0.112);
  head.add(rightEye);

  const leftBrow = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.013, 0.015), hairMat);
  leftBrow.position.set(0.052, 0.174, 0.114);
  head.add(leftBrow);

  const rightBrow = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.013, 0.015), hairMat);
  rightBrow.position.set(-0.052, 0.174, 0.114);
  head.add(rightBrow);

  const leftEar = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.06, 0.042), skinMat));
  leftEar.position.set(0.12, 0.12, 0);
  head.add(leftEar);

  const rightEar = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.06, 0.042), skinMat));
  rightEar.position.set(-0.12, 0.12, 0);
  head.add(rightEar);

  const hairTop = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.242, 0.075, 0.25), hairMat));
  hairTop.position.set(0, 0.24, 0.01);
  head.add(hairTop);

  const hairFringe = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.225, 0.045, 0.06), hairMat));
  hairFringe.position.set(0, 0.215, 0.115);
  hairFringe.rotation.x = 0.2;
  head.add(hairFringe);

  const hairBack = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.236, 0.21, 0.095), hairMat));
  hairBack.position.set(0, 0.145, -0.08);
  head.add(hairBack);

  const leftSideburn = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.11, 0.18), hairMat));
  leftSideburn.position.set(0.114, 0.18, 0.005);
  head.add(leftSideburn);

  const rightSideburn = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.022, 0.11, 0.18), hairMat));
  rightSideburn.position.set(-0.114, 0.18, 0.005);
  head.add(rightSideburn);

  const buildArmHierarchy = (sideSign: 1 | -1) => {
    const shoulder = new THREE.Group();
    shoulder.position.set(sideSign * 0.235, 0.24, 0);
    chest.add(shoulder);

    const arm = new THREE.Group();
    shoulder.add(arm);

    const upperArmSleeve = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.112, 0.26, 0.112), jacketMat));
    upperArmSleeve.position.set(0, -0.12, 0);
    arm.add(upperArmSleeve);

    const elbow = new THREE.Group();
    elbow.position.set(0, -0.25, 0);
    arm.add(elbow);

    const forearmMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.22, 0.088), skinMat));
    forearmMesh.position.set(0, -0.11, 0);
    elbow.add(forearmMesh);

    const hand = new THREE.Group();
    hand.position.set(0, -0.23, 0);
    elbow.add(hand);

    const handMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.095), skinMat));
    handMesh.position.set(0, -0.04, 0);
    hand.add(handMesh);

    return { shoulder, arm, elbow, hand };
  };

  const leftArmChain = buildArmHierarchy(1);
  const rightArmChain = buildArmHierarchy(-1);

  const buildLegHierarchy = (sideSign: 1 | -1) => {
    const hip = new THREE.Group();
    hip.position.set(sideSign * 0.1, -0.04, 0);
    hips.add(hip);

    const leg = new THREE.Group();
    hip.add(leg);

    const thighMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.136, 0.4, 0.145), pantsMat));
    thighMesh.position.set(0, -0.2, 0);
    leg.add(thighMesh);

    const knee = new THREE.Group();
    knee.position.set(0, -0.4, 0);
    leg.add(knee);

    const shinMesh = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.116, 0.38, 0.122), pantsMat));
    shinMesh.position.set(0, -0.19, 0);
    knee.add(shinMesh);

    const foot = new THREE.Group();
    foot.position.set(0, -0.39, 0);
    knee.add(foot);

    const shoeUpper = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.126, 0.075, 0.225), shoeMat));
    shoeUpper.position.set(0, -0.04, 0.036);
    foot.add(shoeUpper);

    const shoeSole = enableShadow(new THREE.Mesh(new THREE.BoxGeometry(0.132, 0.025, 0.235), soleMat));
    shoeSole.position.set(0, -0.08, 0.036);
    foot.add(shoeSole);

    return { hip, leg, knee, foot };
  };

  const leftLegChain = buildLegHierarchy(1);
  const rightLegChain = buildLegHierarchy(-1);

  return {
    root,
    hips,
    waist,
    body,
    chest,
    neck,
    head,
    leftShoulder: leftArmChain.shoulder,
    leftArm: leftArmChain.arm,
    leftElbow: leftArmChain.elbow,
    leftHand: leftArmChain.hand,
    rightShoulder: rightArmChain.shoulder,
    rightArm: rightArmChain.arm,
    rightElbow: rightArmChain.elbow,
    rightHand: rightArmChain.hand,
    leftHip: leftLegChain.hip,
    leftLeg: leftLegChain.leg,
    leftKnee: leftLegChain.knee,
    leftFoot: leftLegChain.foot,
    rightHip: rightLegChain.hip,
    rightLeg: rightLegChain.leg,
    rightKnee: rightLegChain.knee,
    rightFoot: rightLegChain.foot,
  };
}

// ============================================================================
// 13. 6-STATE HUMANOID PROCEDURAL ANIMATION ENGINE
// ============================================================================
function dampValue(
  current: number,
  target: number,
  lambda: number,
  dt: number
): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

function updateHumanoidAnimation(
  rig: HumanoidRig,
  state: PlayerRuntimeState,
  timers: { cyclePhase: number; idleTime: number },
  dt: number
): void {
  timers.idleTime += dt;
  const speed = state.horizontalSpeed;
  const animState = state.animationState;
  const blend = 14.5;

  let hipsY = 0.92;
  let bodyRotX = 0;
  let bodyRotY = 0;
  let chestScaleY = 1.0;
  let headRotX = 0;

  let lArmX = 0;
  let lArmZ = 0.06;
  let lElbowX = -0.14;
  let rArmX = 0;
  let rArmZ = -0.06;
  let rElbowX = -0.14;

  let lLegX = 0;
  let lKneeX = 0;
  let lFootX = 0;
  let rLegX = 0;
  let rKneeX = 0;
  let rFootX = 0;

  switch (animState) {
    case 'IDLE': {
      const breath = Math.sin(timers.idleTime * 2.3);
      hipsY = 0.92 + breath * 0.008;
      chestScaleY = 1.0 + breath * 0.014;
      bodyRotX = breath * 0.015;
      headRotX = -breath * 0.02;
      lArmX = Math.sin(timers.idleTime * 1.5) * 0.03;
      rArmX = -Math.sin(timers.idleTime * 1.5) * 0.03;
      break;
    }
    case 'WALK':
    case 'RUN': {
      const isRun = animState === 'RUN';
      const freq = isRun ? 1.85 : 2.15;
      timers.cyclePhase += speed * freq * dt;

      const s = Math.sin(timers.cyclePhase);
      const c = Math.cos(timers.cyclePhase);

      const legAmp = isRun ? 0.88 : 0.48;
      const armAmp = isRun ? 0.82 : 0.4;
      const bob = Math.abs(c) * (isRun ? 0.058 : 0.025);

      hipsY = 0.92 + bob - (isRun ? 0.035 : 0);
      bodyRotX = isRun ? 0.17 : 0.05;
      bodyRotY = -s * (isRun ? 0.13 : 0.06);
      headRotX = isRun ? -0.1 : -0.03;

      lLegX = s * legAmp;
      rLegX = -s * legAmp;

      const lLift = Math.max(0, -c);
      const rLift = Math.max(0, c);
      lKneeX = lLift * (isRun ? 1.18 : 0.65) + 0.06;
      rKneeX = rLift * (isRun ? 1.18 : 0.65) + 0.06;

      lFootX = -lLegX * 0.32;
      rFootX = -rLegX * 0.32;

      lArmX = -s * armAmp;
      rArmX = s * armAmp;
      lArmZ = isRun ? 0.13 : 0.07;
      rArmZ = isRun ? -0.13 : -0.07;

      lElbowX = isRun
        ? -0.88 - Math.max(0, -s) * 0.35
        : -0.25 - Math.max(0, -s) * 0.18;
      rElbowX = isRun
        ? -0.88 - Math.max(0, s) * 0.35
        : -0.25 - Math.max(0, s) * 0.18;
      break;
    }
    case 'JUMP': {
      hipsY = 0.96;
      bodyRotX = -0.08;
      headRotX = -0.12;
      lArmX = -0.68;
      rArmX = -0.58;
      lArmZ = 0.25;
      rArmZ = -0.25;
      lElbowX = -0.55;
      rElbowX = -0.55;
      lLegX = -0.48;
      lKneeX = 0.88;
      rLegX = 0.22;
      rKneeX = 0.45;
      lFootX = 0.25;
      rFootX = 0.3;
      break;
    }
    case 'FALL': {
      const sway = Math.sin(timers.idleTime * 8.0) * 0.06;
      hipsY = 0.92;
      bodyRotX = 0.12;
      headRotX = 0.14;
      lArmX = -0.22 + sway;
      rArmX = -0.22 - sway;
      lArmZ = 0.48;
      rArmZ = -0.48;
      lElbowX = -0.45;
      rElbowX = -0.45;
      lLegX = -0.22;
      lKneeX = 0.36;
      rLegX = 0.14;
      rKneeX = 0.28;
      break;
    }
    case 'LANDING': {
      hipsY = 0.77;
      bodyRotX = 0.26;
      headRotX = 0.1;
      lArmX = 0.26;
      rArmX = 0.26;
      lArmZ = 0.18;
      rArmZ = -0.18;
      lElbowX = -0.45;
      rElbowX = -0.45;
      lLegX = -0.44;
      lKneeX = 0.8;
      rLegX = -0.44;
      rKneeX = 0.8;
      lFootX = -0.25;
      rFootX = -0.25;
      break;
    }
  }

  rig.hips.position.y = dampValue(rig.hips.position.y, hipsY, blend, dt);
  rig.body.rotation.x = dampValue(rig.body.rotation.x, bodyRotX, blend, dt);
  rig.body.rotation.y = dampValue(rig.body.rotation.y, bodyRotY, blend, dt);
  rig.chest.scale.y = dampValue(rig.chest.scale.y, chestScaleY, blend, dt);
  rig.head.rotation.x = dampValue(rig.head.rotation.x, headRotX, blend, dt);

  rig.leftArm.rotation.x = dampValue(rig.leftArm.rotation.x, lArmX, blend, dt);
  rig.leftArm.rotation.z = dampValue(rig.leftArm.rotation.z, lArmZ, blend, dt);
  rig.leftElbow.rotation.x = dampValue(rig.leftElbow.rotation.x, lElbowX, blend, dt);

  rig.rightArm.rotation.x = dampValue(rig.rightArm.rotation.x, rArmX, blend, dt);
  rig.rightArm.rotation.z = dampValue(rig.rightArm.rotation.z, rArmZ, blend, dt);
  rig.rightElbow.rotation.x = dampValue(rig.rightElbow.rotation.x, rElbowX, blend, dt);

  rig.leftLeg.rotation.x = dampValue(rig.leftLeg.rotation.x, lLegX, blend, dt);
  rig.leftKnee.rotation.x = dampValue(rig.leftKnee.rotation.x, lKneeX, blend, dt);
  rig.leftFoot.rotation.x = dampValue(rig.leftFoot.rotation.x, lFootX, blend, dt);

  rig.rightLeg.rotation.x = dampValue(rig.rightLeg.rotation.x, rLegX, blend, dt);
  rig.rightKnee.rotation.x = dampValue(rig.rightKnee.rotation.x, rKneeX, blend, dt);
  rig.rightFoot.rotation.x = dampValue(rig.rightFoot.rotation.x, rFootX, blend, dt);
}

// ============================================================================
// 14. FOOTSTEP DUST PARTICLE POOL
// ============================================================================
interface DustParticle {
  mesh: THREE.Mesh;
  velocity: THREE.Vector3;
  age: number;
  maxAge: number;
  active: boolean;
}

function createFootstepParticleSystem(scene: THREE.Scene) {
  const pool: DustParticle[] = [];
  const geo = new THREE.SphereGeometry(0.11, 6, 6);
  const baseMat = new THREE.MeshBasicMaterial({
    color: 0xd6d3d1,
    transparent: true,
    opacity: 0.55,
  });

  for (let i = 0; i < 24; i++) {
    const mesh = new THREE.Mesh(geo, baseMat.clone());
    mesh.visible = false;
    scene.add(mesh);
    pool.push({
      mesh,
      velocity: new THREE.Vector3(),
      age: 0,
      maxAge: 0.45,
      active: false,
    });
  }

  const spawnBurst = (x: number, y: number, z: number, count: number) => {
    let spawned = 0;
    for (let i = 0; i < pool.length && spawned < count; i++) {
      const p = pool[i];
      if (!p.active) {
        p.active = true;
        p.age = 0;
        p.maxAge = 0.35 + Math.random() * 0.25;
        p.mesh.position.set(
          x + (Math.random() - 0.5) * 0.35,
          y + 0.06,
          z + (Math.random() - 0.5) * 0.35
        );
        p.mesh.scale.setScalar(0.6 + Math.random() * 0.5);
        p.velocity.set(
          (Math.random() - 0.5) * 1.4,
          0.6 + Math.random() * 0.9,
          (Math.random() - 0.5) * 1.4
        );
        p.mesh.visible = true;
        spawned++;
      }
    }
  };

  const update = (dt: number) => {
    for (let i = 0; i < pool.length; i++) {
      const p = pool[i];
      if (!p.active) continue;
      p.age += dt;
      if (p.age >= p.maxAge) {
        p.active = false;
        p.mesh.visible = false;
        continue;
      }
      p.mesh.position.addScaledVector(p.velocity, dt);
      const progress = p.age / p.maxAge;
      p.mesh.scale.setScalar(0.7 + progress * 1.3);
      const mat = p.mesh.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - progress) * 0.45;
    }
  };

  return { spawnBurst, update };
}

// ============================================================================
// 15. TECHNICAL SEO, JSON-LD & DESIGN SYSTEM UI PRIMITIVES
// ============================================================================
const SeoAndDesignTokenManager: React.FC = React.memo(() => {
  useEffect(() => {
    document.title =
      'Da Nang 3D Open World Simulation — Interactive 3D Environment & Real-Time Weather';

    const upsertMeta = (
      attrName: 'name' | 'property',
      attrValue: string,
      content: string
    ) => {
      let el = document.head.querySelector(
        `meta[${attrName}="${attrValue}"]`
      ) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrValue);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    upsertMeta(
      'description',
      'description',
      'Trải nghiệm mô phỏng không gian 3D tương tác tại Đà Nẵng, Việt Nam với đồng hồ thời gian thực GMT+7, tính toán vị trí mặt trời thiên văn và thời tiết trực tiếp từ Open-Meteo.'
    );
    upsertMeta('name', 'theme-color', '#020617');
    upsertMeta('name', 'robots', 'index, follow');
    upsertMeta(
      'property',
      'og:title',
      'Da Nang 3D Open World Simulation — Real-Time 3D WebGL Experience'
    );
    upsertMeta('property', 'og:type', 'website');

    let scriptEl = document.head.querySelector(
      'script#danang-3d-jsonld'
    ) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = 'danang-3d-jsonld';
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Da Nang 3D Open World Simulation',
      applicationCategory: 'SimulationApplication',
      operatingSystem: 'Web Browser (Desktop, Mobile, Tablet)',
      inLanguage: 'vi-VN',
    });
  }, []);

  return <style>{DESIGN_SYSTEM_CSS}</style>;
});

interface DsButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  active?: boolean;
}

const DsButton: React.FC<DsButtonProps> = ({
  variant = 'secondary',
  active = false,
  className = '',
  children,
  ...rest
}) => {
  const variantClasses =
    variant === 'primary'
      ? 'bg-sky-500/30 hover:bg-sky-500/40 text-sky-100 border border-sky-400/60'
      : variant === 'danger'
        ? 'bg-red-500/25 hover:bg-red-500/35 text-red-100 border border-red-400/50'
        : variant === 'ghost'
          ? 'bg-transparent hover:bg-slate-800/60 text-slate-300 border border-transparent'
          : active
            ? 'bg-sky-500/25 text-sky-200 border border-sky-400/55'
            : 'bg-slate-900/75 hover:bg-slate-800/85 text-slate-200 border border-slate-700/60';

  return (
    <button
      type="button"
      className={`ds-btn ${variantClasses} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

interface DsIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  active?: boolean;
}

const DsIconButton: React.FC<DsIconButtonProps> = ({
  label,
  active = false,
  className = '',
  children,
  ...rest
}) => (
  <button
    type="button"
    aria-label={label}
    title={label}
    className={`ds-btn !p-2 ${
      active
        ? 'bg-sky-500/25 text-sky-200 border border-sky-400/55'
        : 'bg-slate-900/75 hover:bg-slate-800/85 text-slate-200 border border-slate-700/60'
    } ${className}`}
    {...rest}
  >
    {children}
  </button>
);

const DsBadge: React.FC<{
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  children: React.ReactNode;
}> = ({ tone = 'neutral', children }) => {
  const toneClass =
    tone === 'info'
      ? 'bg-sky-500/20 text-sky-300 border-sky-400/45'
      : tone === 'success'
        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/45'
        : tone === 'warning'
          ? 'bg-amber-500/20 text-amber-300 border-amber-400/45'
          : tone === 'danger'
            ? 'bg-red-500/20 text-red-300 border-red-400/45'
            : 'bg-slate-800/80 text-slate-300 border-slate-600/50';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[var(--radius-sm)] border px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${toneClass}`}
    >
      {children}
    </span>
  );
};

interface MiniDataChipProps {
  variant?: MiniDataChipVariant;
  icon?: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  tone?: 'info' | 'success' | 'warning' | 'danger' | 'neutral';
  statusDot?: 'online' | 'warning' | 'offline';
  onExpand?: () => void;
  expandLabel?: string;
}

function formatSafeChipValue(raw: string | number): string {
  if (typeof raw === 'number') {
    return Number.isFinite(raw) ? String(raw) : '--';
  }
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (
      !trimmed ||
      trimmed === 'NaN' ||
      trimmed === 'undefined' ||
      trimmed === 'null'
    ) {
      return '--';
    }
    return trimmed;
  }
  return '--';
}

const MiniDataChip: React.FC<MiniDataChipProps> = React.memo(
  ({
    icon,
    label,
    value,
    unit,
    tone = 'neutral',
    statusDot,
    onExpand,
    expandLabel,
  }) => {
    const safeValue = formatSafeChipValue(value);
    const toneBorder =
      tone === 'info'
        ? 'border-sky-400/45 bg-slate-900/85 text-sky-100'
        : tone === 'success'
          ? 'border-emerald-400/45 bg-slate-900/85 text-emerald-100'
          : tone === 'warning'
            ? 'border-amber-400/45 bg-slate-900/85 text-amber-100'
            : tone === 'danger'
              ? 'border-red-400/45 bg-slate-900/85 text-red-100'
              : 'border-slate-700/75 bg-slate-900/85 text-slate-100';

    const dotClass =
      statusDot === 'online'
        ? 'bg-emerald-400'
        : statusDot === 'warning'
          ? 'bg-amber-400'
          : statusDot === 'offline'
            ? 'bg-red-400'
            : null;

    const chipContent = (
      <>
        {dotClass && (
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${dotClass}`}
            aria-hidden="true"
          />
        )}
        {icon && (
          <span className="shrink-0 text-sky-400" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="text-[10px] font-medium text-[var(--color-text-muted)] whitespace-nowrap">
          {label}:
        </span>
        <span className="font-mono text-[11px] font-extrabold text-white whitespace-nowrap">
          {safeValue}
          {unit && safeValue !== '--' ? (
            <span className="ml-0.5 text-[10px] font-normal text-slate-300">
              {unit}
            </span>
          ) : null}
        </span>
        {onExpand && (
          <ChevronDown
            className="h-3 w-3 shrink-0 text-sky-300/85 ml-0.5"
            aria-hidden="true"
          />
        )}
      </>
    );

    if (onExpand) {
      return (
        <button
          type="button"
          onClick={onExpand}
          aria-label={expandLabel || `Mở rộng chi tiết ${label}: ${safeValue}${unit || ''}`}
          title={expandLabel || `Nhấn để mở rộng bảng ${label}`}
          className={`ds-btn inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 shadow-md backdrop-blur-md hover:border-sky-400/70 ${toneBorder}`}
        >
          {chipContent}
        </button>
      );
    }

    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 shadow-md backdrop-blur-md ${toneBorder}`}
      >
        {chipContent}
      </div>
    );
  }
);

function getStateBadgeTone(
  state: CharacterAnimationState
): 'info' | 'success' | 'warning' | 'danger' | 'neutral' {
  switch (state) {
    case 'RUN':
      return 'success';
    case 'WALK':
      return 'info';
    case 'JUMP':
    case 'FALL':
      return 'warning';
    case 'LANDING':
      return 'danger';
    default:
      return 'neutral';
  }
}

const WeatherCategoryIcon: React.FC<{
  category: WeatherCondition;
  isDay: boolean;
  className?: string;
}> = ({ category, isDay, className = 'h-6 w-6' }) => {
  switch (category) {
    case 'clear':
    case 'mainly-clear':
      return isDay ? (
        <Sun className={`${className} text-amber-400`} aria-hidden="true" />
      ) : (
        <Moon className={`${className} text-indigo-300`} aria-hidden="true" />
      );
    case 'partly-cloudy':
      return <Cloud className={`${className} text-sky-300`} aria-hidden="true" />;
    case 'overcast':
      return <Cloud className={`${className} text-slate-400`} aria-hidden="true" />;
    case 'fog':
      return <CloudFog className={`${className} text-slate-300`} aria-hidden="true" />;
    case 'drizzle':
    case 'rain':
    case 'heavy-rain':
    case 'showers':
      return <CloudRain className={`${className} text-sky-400`} aria-hidden="true" />;
    case 'thunderstorm':
      return <CloudLightning className={`${className} text-amber-400`} aria-hidden="true" />;
    default:
      return <Cloud className={`${className} text-sky-300`} aria-hidden="true" />;
  }
};

// ============================================================================
// 16. INDEPENDENT HUD ZONE SLOT COMPONENTS (PHASE 4, 8, 9 & 10 ARCHITECTURE)
// ============================================================================

/**
 * 5.1 Top-Left Zone – Phase 8 & Phase 9 Mini Map & Real-Time Player Synchronization
 * Renders an authentic top-down Orthographic overview of the 3D world with:
 * - Real-time imperative Player Marker & Direction Arrow synchronized at 60Hz without React re-renders.
 * - World Overview Mode vs. Player Follow Mode toggle.
 * - Expanded vs. Compact display mode to keep the 3D viewport unobstructed.
 */
interface TopLeftMiniMapSlotProps {
  deviceProfile: AdaptiveDeviceProfile;
  miniMapCanvasRef: React.RefObject<HTMLCanvasElement | null>;
  miniMapMarkerDomRef: React.RefObject<HTMLDivElement | null>;
  miniMapConeDomRef: React.RefObject<HTMLDivElement | null>;
  miniMapEdgeBadgeDomRef: React.RefObject<HTMLSpanElement | null>;
  miniMapState: MiniMapState;
  displayMode: MiniMapDisplayMode;
  onToggleDisplayMode: () => void;
  onToggleFollowMode: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
  playerCoordsText: string;
  phase9Extension?: MiniMapPhase9ExtensionProps;
  onResetPlayer: () => void;
  environmentPanelMode: PanelDisplayMode;
  onToggleEnvironmentPanel: () => void;
  secondaryInfoMode: PanelDisplayMode;
  onCycleSecondaryInfo: () => void;
  showSpecsModal: boolean;
  onOpenSpecsModal: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

const TopLeftMiniMapSlot: React.FC<TopLeftMiniMapSlotProps> = React.memo(
  ({
    deviceProfile,
    miniMapCanvasRef,
    miniMapMarkerDomRef,
    miniMapConeDomRef,
    miniMapEdgeBadgeDomRef,
    miniMapState,
    displayMode,
    onToggleDisplayMode,
    onToggleFollowMode,
    onZoomIn,
    onZoomOut,
    onResetZoom,
    playerCoordsText,
    onResetPlayer,
    environmentPanelMode,
    onToggleEnvironmentPanel,
    secondaryInfoMode,
    onCycleSecondaryInfo,
    showSpecsModal,
    onOpenSpecsModal,
    isFullscreen,
    onToggleFullscreen,
  }) => {
    const isMobilePortrait =
      deviceProfile.formFactor === 'mobile' &&
      deviceProfile.orientation === 'portrait';
    const isMobileLandscape =
      deviceProfile.formFactor === 'mobile' &&
      deviceProfile.orientation === 'landscape';
    const isTablet = deviceProfile.formFactor === 'tablet';
    const isCompactMap = displayMode === 'compact';
    const isFollowing = miniMapState.followMode === 'follow';

    const { minZoom, maxZoom, defaultZoom } = GAME_CONFIG.miniMap;
    const canZoomIn = miniMapState.zoom < maxZoom - 0.01;
    const canZoomOut = miniMapState.zoom > minZoom + 0.01;
    const isDefaultZoom = Math.abs(miniMapState.zoom - defaultZoom) < 0.02;

    const stopGameplayPropagation = (
      e: React.PointerEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) => {
      e.stopPropagation();
    };

    const viewportSizeClass = isCompactMap
      ? isMobilePortrait
        ? 'h-20 w-20'
        : 'h-24 w-24'
      : isMobilePortrait
        ? 'h-28 w-28'
        : isMobileLandscape
          ? 'h-24 w-24'
          : isTablet
            ? 'h-32 w-32'
            : 'h-36 w-36';

    return (
      <section
        id="hud-minimap-mount-slot"
        aria-label="Bản đồ thu nhỏ đồng bộ vị trí nhân vật thời gian thực và công cụ thế giới (Top-Left Zone)"
        data-hud-zone="top-left"
        data-minimap-slot="active-phase-9-player-sync"
        data-minimap-mode={displayMode}
        data-minimap-follow={miniMapState.followMode}
        data-hud-interactive="true"
        onPointerDown={stopGameplayPropagation}
        onClick={stopGameplayPropagation}
        className={`pointer-events-auto flex flex-col gap-[var(--space-2)] transition-all ${
          isCompactMap
            ? 'w-auto max-w-[230px]'
            : isMobilePortrait
              ? 'w-56 sm:w-64'
              : 'w-64 sm:w-[276px]'
        }`}
      >
        {/* Compact Brand Identity & Input Mode Pill */}
        <div className="ds-surface-card flex items-center justify-between gap-[var(--space-2)] px-2.5 py-1.5">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-sky-500/20 border border-sky-400/40 text-sky-300">
              <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="truncate text-[11px] font-extrabold tracking-wider text-white">
                  DA NANG 3D
                </span>
                <span
                  className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400 animate-pulse"
                  aria-hidden="true"
                />
              </div>
              <div className="flex items-center gap-1 text-[9px] font-mono text-sky-300/90">
                {deviceProfile.formFactor === 'mobile' ? (
                  <Smartphone className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                ) : deviceProfile.formFactor === 'tablet' ? (
                  <Tablet className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                ) : (
                  <Monitor className="h-2.5 w-2.5 shrink-0" aria-hidden="true" />
                )}
                <span className="truncate uppercase">
                  {deviceProfile.formFactor} • {deviceProfile.activeInput}
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleDisplayMode}
            aria-expanded={!isCompactMap}
            aria-label={
              isCompactMap
                ? 'Mở rộng Mini Map (Phím M)'
                : 'Thu gọn Mini Map (Phím M)'
            }
            title={
              isCompactMap
                ? 'Mở rộng Mini Map (Phím M)'
                : 'Thu gọn Mini Map (Phím M)'
            }
            className="ds-btn !p-1 bg-slate-800/85 hover:bg-slate-700/90 text-slate-200 border border-slate-600/60 shrink-0"
          >
            {isCompactMap ? (
              <ChevronDown className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
            ) : (
              <ChevronUp className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* PHASE 8 & PHASE 9 MINI MAP CONTAINER */}
        <div
          role="region"
          aria-label="Mini Map đồng bộ vị trí và hướng nhân vật thời gian thực"
          data-testid="minimap-container"
          className="ds-surface-card p-2 sm:p-2.5 space-y-2 select-none"
        >
          {/* MiniMapHeader */}
          <div className="flex items-center justify-between gap-1 border-b border-[var(--color-border-subtle)] pb-1">
            <div className="flex items-center gap-1.5 min-w-0">
              <MapIcon
                className="h-3.5 w-3.5 text-sky-400 shrink-0"
                aria-hidden="true"
              />
              <span className="truncate text-[10px] font-extrabold uppercase tracking-wider text-white">
                {isFollowing ? 'PLAYER FOLLOW' : 'WORLD OVERVIEW'}
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={onToggleFollowMode}
                aria-pressed={isFollowing}
                aria-label={
                  isFollowing
                    ? 'Đang bật theo dõi nhân vật (Nhấn để chuyển về World Overview - Phím F)'
                    : 'Bật chế độ bản đồ theo dõi nhân vật (Player Follow - Phím F)'
                }
                title={
                  isFollowing
                    ? 'Chế độ: Theo dõi nhân vật (Phím F)'
                    : 'Chế độ: Toàn cảnh cố định (Phím F)'
                }
                className={`ds-btn !px-1.5 !py-0.5 text-[9px] font-mono border ${
                  isFollowing
                    ? 'bg-emerald-500/25 border-emerald-400/60 text-emerald-200'
                    : 'bg-slate-800/90 border-slate-600/70 text-slate-300 hover:text-white'
                }`}
              >
                <CrosshairIcon className="h-2.5 w-2.5" aria-hidden="true" />
                <span>{isFollowing ? 'FOLLOW' : 'STATIC'}</span>
              </button>

              <span
                title="Tỷ lệ thu phóng của Mini Map"
                className="rounded bg-slate-800/90 px-1.5 py-0.5 font-mono text-[9px] font-bold text-sky-300 border border-slate-700/70"
              >
                {miniMapState.zoom.toFixed(1)}x
              </span>
            </div>
          </div>

          {/* Body: MiniMapViewport + Controls */}
          <div className="flex items-center gap-2">
            {/* MiniMapViewport */}
            <div
              data-testid="minimap-viewport"
              className={`relative ${viewportSizeClass} shrink-0 overflow-hidden rounded-[var(--radius-lg)] border border-sky-400/40 bg-slate-950/95 shadow-inner transition-all`}
            >
              {/* 1. MapRenderingLayer (Top-down Orthographic WebGL pass) */}
              <canvas
                ref={miniMapCanvasRef}
                width={GAME_CONFIG.miniMap.resolutionPx}
                height={GAME_CONFIG.miniMap.resolutionPx}
                aria-label="Khung hình Orthographic nhìn từ trên xuống của địa hình 3D"
                className="h-full w-full block object-cover"
              />

              {/* 2. Subtle Coordinate Grid Crosshair */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <div className="h-full w-px bg-sky-400/12" />
                <div className="absolute w-full h-px bg-sky-400/12" />
              </div>

              {/* 3. PHASE 9 REAL-TIME PLAYER MARKER & DIRECTION INDICATOR
                  Updated imperatively at 60Hz via miniMapMarkerDomRef & miniMapConeDomRef */}
              <div
                ref={miniMapMarkerDomRef}
                data-testid="minimap-player-marker"
                aria-label="Vị trí và hướng quay hiện tại của nhân vật trên bản đồ"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                }}
                className="pointer-events-none absolute z-10 flex items-center justify-center will-change-transform"
              >
                {/* Rotating Heading Cone & Directional Navigation Arrow */}
                <div
                  ref={miniMapConeDomRef}
                  data-testid="minimap-player-direction"
                  style={{ transform: 'rotate(0deg)' }}
                  className="relative flex items-center justify-center will-change-transform"
                >
                  {/* Subtle View/Heading Wedge */}
                  <svg
                    viewBox="0 0 40 40"
                    className="h-7 w-7 -translate-y-1 text-sky-400/35 drop-shadow-[0_0_6px_rgba(56,189,248,0.65)]"
                    aria-hidden="true"
                  >
                    <path
                      d="M20 20 L8 4 A18 18 0 0 1 32 4 Z"
                      fill="currentColor"
                    />
                  </svg>
                  {/* Crisp Player Navigation Arrow */}
                  <div className="absolute flex h-4 w-4 items-center justify-center rounded-full bg-slate-950/90 ring-1 ring-white/80 shadow-[0_0_8px_rgba(56,189,248,0.95)]">
                    <NavigationArrowIcon
                      className="h-3 w-3 text-sky-300 fill-sky-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>

                {/* Edge Clamped Indicator Pill (Shown only when player is outside current zoom bounds) */}
                <span
                  ref={miniMapEdgeBadgeDomRef}
                  style={{ display: 'none' }}
                  className="absolute -bottom-3.5 whitespace-nowrap rounded bg-amber-500/90 px-1 py-0.2 font-mono text-[7px] font-extrabold uppercase text-slate-950 shadow"
                >
                  EDGE
                </span>
              </div>

              {/* 4. CompassIndicator (Local World Axes: -Z Top, +X Right, +Z Bottom, -X Left) */}
              <div
                data-testid="minimap-compass"
                aria-label="Chỉ báo định hướng hệ trục thế giới cục bộ: -Z phía trên, +X bên phải, +Z phía dưới, -X bên trái"
                className="pointer-events-none absolute inset-1 flex flex-col justify-between items-center font-mono text-[8px] font-extrabold"
              >
                <span className="rounded bg-slate-950/80 px-1 text-amber-300 border border-amber-400/40">
                  -Z
                </span>
                <div className="w-full flex items-center justify-between px-0.5">
                  <span className="rounded bg-slate-950/75 px-1 text-slate-300 border border-slate-700/60">
                    -X
                  </span>
                  <span className="rounded bg-slate-950/75 px-1 text-sky-300 border border-sky-400/35">
                    +X
                  </span>
                </div>
                <span className="rounded bg-slate-950/75 px-1 text-slate-400 border border-slate-700/60">
                  +Z
                </span>
              </div>

              {miniMapState.status !== 'ready' && (
                <div
                  role="status"
                  className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 p-2 text-center"
                >
                  <span className="font-mono text-[9px] font-bold text-slate-300">
                    {miniMapState.status === 'initializing'
                      ? 'Đang dựng bản đồ...'
                      : 'Map Unavailable'}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Shown in Expanded Mode, or condensed in Compact Mode */}
            {!isCompactMap ? (
              <div className="flex flex-1 flex-col justify-between gap-1.5 min-w-0">
                <div className="space-y-0.5">
                  <div className="flex items-center justify-between text-[9px] font-bold uppercase tracking-wider text-sky-300">
                    <span>POS (XZ)</span>
                    <span className="font-mono text-emerald-300">LIVE</span>
                  </div>
                  <div
                    data-testid="minimap-player-coords"
                    className="font-mono text-[10px] font-bold text-white truncate"
                  >
                    {playerCoordsText}
                  </div>
                  <div className="font-mono text-[9px] text-[var(--color-text-muted)]">
                    Span: {miniMapState.worldSpanMeters}m × {miniMapState.worldSpanMeters}m
                  </div>
                </div>

                {/* Zoom & Reset Controls */}
                <div
                  role="group"
                  aria-label="Điều khiển thu phóng Mini Map"
                  className="flex flex-col gap-1"
                >
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={onZoomIn}
                      disabled={!canZoomIn}
                      aria-label="Phóng to Mini Map (Zoom In)"
                      title="Phóng to Mini Map"
                      className="ds-btn flex-1 !px-2 !py-1 bg-slate-800/90 hover:bg-slate-700/90 text-sky-200 border border-slate-600/70"
                    >
                      <ZoomInIcon className="h-3 w-3" aria-hidden="true" />
                      <span className="text-[10px]">+</span>
                    </button>
                    <button
                      type="button"
                      onClick={onZoomOut}
                      disabled={!canZoomOut}
                      aria-label="Thu nhỏ Mini Map (Zoom Out)"
                      title="Thu nhỏ Mini Map"
                      className="ds-btn flex-1 !px-2 !py-1 bg-slate-800/90 hover:bg-slate-700/90 text-sky-200 border border-slate-600/70"
                    >
                      <ZoomOutIcon className="h-3 w-3" aria-hidden="true" />
                      <span className="text-[10px]">-</span>
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={onResetZoom}
                    disabled={isDefaultZoom}
                    aria-label="Đặt lại mức thu phóng Mini Map mặc định (1.0x)"
                    title="Reset Zoom (1.0x)"
                    className="ds-btn w-full !px-2 !py-0.5 bg-slate-900/85 hover:bg-slate-800/90 text-slate-300 border border-slate-700/70 text-[10px]"
                  >
                    <RotateCcw className="h-2.5 w-2.5 text-sky-400" aria-hidden="true" />
                    <span>Reset 1x</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={onZoomIn}
                  disabled={!canZoomIn}
                  aria-label="Phóng to Mini Map"
                  title="Phóng to Mini Map"
                  className="ds-btn !p-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-sky-200 border border-slate-600/70"
                >
                  <ZoomInIcon className="h-3 w-3" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onZoomOut}
                  disabled={!canZoomOut}
                  aria-label="Thu nhỏ Mini Map"
                  title="Thu nhỏ Mini Map"
                  className="ds-btn !p-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-sky-200 border border-slate-600/70"
                >
                  <ZoomOutIcon className="h-3 w-3" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Auxiliary World Toolbar & Panel Launchers */}
        <nav
          aria-label="Thanh công cụ điều khiển phụ trợ và khôi phục bảng thông tin"
          className="flex flex-wrap items-center gap-1"
        >
          <DsButton
            variant="secondary"
            onClick={onResetPlayer}
            title="Đưa nhân vật về vị trí xuất phát (Phím R)"
            className="!px-2 !py-1"
          >
            <RotateCcw className="h-3 w-3 text-sky-400" aria-hidden="true" />
            <span>Reset</span>
          </DsButton>

          <DsButton
            variant="secondary"
            active={environmentPanelMode !== 'hidden'}
            aria-pressed={environmentPanelMode !== 'hidden'}
            onClick={onToggleEnvironmentPanel}
            title="Chuyển đổi bảng Môi trường & Địa hình (Phím E)"
            className="!px-2 !py-1"
          >
            <MapIcon className="h-3 w-3 text-emerald-400" aria-hidden="true" />
            <span>Env</span>
          </DsButton>

          <DsButton
            variant="secondary"
            active={secondaryInfoMode !== 'hidden'}
            aria-pressed={secondaryInfoMode !== 'hidden'}
            onClick={onCycleSecondaryInfo}
            title="Chuyển đổi bảng Debug Telemetry (Phím F3)"
            className="!px-2 !py-1"
          >
            <Activity className="h-3 w-3 text-sky-400" aria-hidden="true" />
            <span>Debug</span>
          </DsButton>

          <DsButton
            variant="secondary"
            active={showSpecsModal}
            aria-haspopup="dialog"
            aria-expanded={showSpecsModal}
            onClick={onOpenSpecsModal}
            title="Xem kiến trúc hệ thống"
            className="!px-2 !py-1"
          >
            <Info className="h-3 w-3" aria-hidden="true" />
            <span className="hidden sm:inline">Specs</span>
          </DsButton>

          <DsIconButton
            label={isFullscreen ? 'Thoát toàn màn hình' : 'Toàn màn hình'}
            onClick={onToggleFullscreen}
            className="!p-1.5"
          >
            {isFullscreen ? (
              <Minimize2 className="h-3 w-3" aria-hidden="true" />
            ) : (
              <Maximize2 className="h-3 w-3" aria-hidden="true" />
            )}
          </DsIconButton>
        </nav>
      </section>
    );
  }
);

/**
 * 5.2 Top-Right Zone – Phase 5 Persistent Time & Weather Status Widget
 * Supports strictly two modes: 'expanded' | 'compact' (never hidden).
 * In Compact Mode, Current Time, Weather Icon, and Current Temperature are ALWAYS visible.
 * Reuses the Phase 2 Clock and Open-Meteo Weather services without duplicate timers or requests.
 */
interface DaNangTimeWeatherHUDProps {
  syncSnapshot: SynchronizedTimeSolarSnapshot;
  weather: NormalizedWeatherState | null;
  weatherStatus: 'loading' | 'ready' | 'error';
  weatherErrorMsg: string | null;
  displayMode: StatusWidgetMode;
  onToggleDisplayMode: () => void;
  isMobileViewport: boolean;
  onRetryWeather: () => void;
}

const DaNangTimeWeatherHUD: React.FC<DaNangTimeWeatherHUDProps> = React.memo(
  ({
    syncSnapshot,
    weather,
    weatherStatus,
    weatherErrorMsg,
    displayMode,
    onToggleDisplayMode,
    isMobileViewport,
    onRetryWeather,
  }) => {
    const { clock, solar } = syncSnapshot;
    const isCompact = displayMode === 'compact';
    const detailsRegionId = 'danang-weather-expanded-details';

    // Validate temperature & weather availability (never show NaN, undefined, or fake sunny fallback)
    const hasValidWeather =
      weather !== null && Number.isFinite(weather.temperature);
    const isStale = hasValidWeather && weather.freshness === 'stale';
    const formattedTemperature = hasValidWeather
      ? `${Math.round(weather.temperature)}°C`
      : '--°C';
    const formattedFeelsLike =
      hasValidWeather && Number.isFinite(weather.apparentTemperature)
        ? `${Math.round(weather.apparentTemperature)}°C`
        : '--°C';

    const getPhaseBadgeStyle = (phase: TimeOfDayPhase): string => {
      switch (phase) {
        case 'DAWN':
          return 'bg-orange-500/25 text-orange-200 border-orange-400/50';
        case 'MORNING':
          return 'bg-sky-500/25 text-sky-200 border-sky-400/50';
        case 'NOON':
          return 'bg-amber-500/25 text-amber-200 border-amber-400/50';
        case 'AFTERNOON':
          return 'bg-yellow-500/25 text-yellow-200 border-yellow-400/50';
        case 'SUNSET':
          return 'bg-rose-500/25 text-rose-200 border-rose-400/50';
        case 'NIGHT':
          return 'bg-indigo-500/25 text-indigo-200 border-indigo-400/50';
      }
    };

    const renderPersistentWeatherIcon = (sizeClass: string) => {
      if (weatherStatus === 'loading' && !hasValidWeather) {
        return (
          <RefreshCw
            className={`${sizeClass} animate-spin text-sky-400 shrink-0`}
            aria-label="Đang tải dữ liệu thời tiết"
          />
        );
      }
      if (!hasValidWeather) {
        return (
          <Cloud
            className={`${sizeClass} text-slate-400 opacity-75 shrink-0`}
            aria-label="Chưa có dữ liệu thời tiết"
          />
        );
      }
      return (
        <WeatherCategoryIcon
          category={weather.mapped.category}
          isDay={weather.isDay}
          className={`${sizeClass} shrink-0`}
        />
      );
    };

    // ========================================================================
    // COMPACT MODE: [ Current Time ] [ Weather Icon ] [ Temperature ] [ Expand ]
    // Always keeps all 3 mandatory data points visible across all screen sizes
    // ========================================================================
    if (isCompact) {
      return (
        <aside
          aria-label="Trạng thái thời gian và thời tiết Đà Nẵng (Chế độ thu gọn)"
          data-hud-zone="top-right"
          data-widget-mode="compact"
          data-hud-interactive="true"
          className="pointer-events-auto ds-surface-card inline-flex items-center gap-2 sm:gap-2.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 select-text max-w-[calc(100vw-24px)] transition-all"
        >
          {/* 1. MANDATORY: CURRENT TIME (Asia/Ho_Chi_Minh, 24h) */}
          <div className="flex items-center gap-1.5">
            <Clock
              className="h-3.5 w-3.5 text-sky-400 shrink-0 hidden xs:inline-block sm:inline-block"
              aria-hidden="true"
            />
            <time
              dateTime={new Date(clock.timestampMs).toISOString()}
              title={`Giờ Đà Nẵng (GMT+7): ${clock.timeString} — ${clock.dateStringVi}`}
              className="font-mono text-xs sm:text-sm font-extrabold tracking-tight text-white whitespace-nowrap"
            >
              {isMobileViewport ? clock.timeShortString : clock.timeString}
            </time>
          </div>

          <span className="h-3.5 w-px bg-slate-700/80 shrink-0" aria-hidden="true" />

          {/* 2. MANDATORY: WEATHER ICON */}
          <div
            className="flex items-center justify-center shrink-0"
            title={
              hasValidWeather
                ? weather.mapped.viDescription
                : weatherStatus === 'loading'
                  ? 'Đang tải thời tiết...'
                  : 'Chưa có dữ liệu thời tiết'
            }
          >
            {renderPersistentWeatherIcon('h-4 w-4 sm:h-5 sm:w-5')}
          </div>

          {/* 3. MANDATORY: CURRENT TEMPERATURE */}
          <div className="flex items-center gap-1 shrink-0">
            <span
              className={`font-mono text-xs sm:text-sm font-extrabold whitespace-nowrap ${
                hasValidWeather ? 'text-white' : 'text-slate-400'
              }`}
            >
              {formattedTemperature}
            </span>
            {isStale && (
              <span
                title="Dữ liệu thời tiết cũ (Stale)"
                className="h-2 w-2 rounded-full bg-amber-400 shrink-0"
                aria-label="Dữ liệu thời tiết cũ"
              />
            )}
          </div>

          {/* 4. EXPAND BUTTON */}
          <button
            type="button"
            onClick={onToggleDisplayMode}
            aria-expanded={false}
            aria-controls={detailsRegionId}
            aria-label="Mở rộng bảng thông tin chi tiết thời gian và thời tiết Đà Nẵng"
            title="Mở rộng chi tiết thời tiết"
            className="ds-btn !p-1.5 bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border border-slate-600/60 shrink-0 ml-0.5"
          >
            <ChevronDown className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
          </button>
        </aside>
      );
    }

    // ========================================================================
    // EXPANDED MODE: Full Location, Clock, Weather Hero, Details & Freshness
    // ========================================================================
    return (
      <aside
        aria-label="Đồng hồ thời gian thực và thời tiết Đà Nẵng (Chế độ chi tiết)"
        data-hud-zone="top-right"
        data-widget-mode="expanded"
        data-hud-interactive="true"
        className={`pointer-events-auto ds-surface-card select-text transition-all ${
          isMobileViewport
            ? 'w-[min(92vw,280px)] p-[var(--space-3)] space-y-[var(--space-2)] max-h-[68vh] overflow-y-auto'
            : 'w-72 sm:w-80 p-[var(--space-4)] space-y-[var(--space-3)]'
        }`}
      >
        {/* A & B. Location Header + Real-time Clock (Asia/Ho_Chi_Minh) */}
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider text-sky-400">
              <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="truncate">ĐÀ NẴNG, VIỆT NAM</span>
            </div>

            {/* 1. Primary Hierarchy: Real-Time 24h Clock */}
            <div
              className={`mt-0.5 font-mono font-extrabold tracking-tight text-white ${
                isMobileViewport
                  ? 'text-[length:var(--text-xl)]'
                  : 'text-[length:var(--text-2xl)]'
              }`}
            >
              <time dateTime={new Date(clock.timestampMs).toISOString()}>
                {clock.timeString}
              </time>
            </div>

            {/* Vietnamese Day of Week & Date */}
            <div className="mt-0.5 text-[11px] font-medium text-[var(--color-text-secondary)] capitalize">
              {clock.dateStringVi}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-mono text-[var(--color-text-muted)]">
              <Clock className="h-3 w-3 text-sky-400 shrink-0" aria-hidden="true" />
              <span>GMT+7 • {DA_NANG_CONFIG.timezone}</span>
            </div>
          </div>

          {/* Solar Phase Badge & Collapse Toggle */}
          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="flex items-center gap-1.5">
              <span
                className={`inline-flex items-center gap-1 rounded-[var(--radius-md)] border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getPhaseBadgeStyle(
                  solar.phase
                )}`}
              >
                {solar.phase === 'NIGHT' ? (
                  <Moon className="h-3 w-3" aria-hidden="true" />
                ) : (
                  <Sun className="h-3 w-3" aria-hidden="true" />
                )}
                {solar.phaseVi}
              </span>

              <button
                type="button"
                onClick={onToggleDisplayMode}
                aria-expanded={true}
                aria-controls={detailsRegionId}
                aria-label="Thu gọn bảng thời gian và thời tiết Đà Nẵng"
                title="Thu gọn về chế độ Compact"
                className="ds-btn !p-1.5 bg-slate-800/85 hover:bg-slate-700/90 text-slate-200 border border-slate-600/60"
              >
                <ChevronUp className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
              </button>
            </div>
            <span className="font-mono text-[10px] text-[var(--color-text-muted)]">
              Mặt trời: {solar.altitudeDeg.toFixed(1)}°
            </span>
          </div>
        </div>

        {/* C, D & E. Controlled Weather Details Region */}
        <div
          id={detailsRegionId}
          className="border-t border-[var(--color-border-subtle)] pt-[var(--space-2)] space-y-2.5"
        >
          {/* C. Primary Current Weather Summary Bar (Always shows Icon & Temperature / --°C) */}
          <div className="flex items-center justify-between ds-surface-elevated px-3 py-2">
            <div className="flex items-center gap-2.5">
              {renderPersistentWeatherIcon(
                isMobileViewport ? 'h-6 w-6' : 'h-7 w-7'
              )}
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`font-mono font-extrabold text-white ${
                      isMobileViewport
                        ? 'text-[length:var(--text-base)]'
                        : 'text-[length:var(--text-xl)]'
                    }`}
                  >
                    {formattedTemperature}
                  </span>
                  {hasValidWeather && (
                    <span className="text-[11px] text-[var(--color-text-muted)]">
                      Cảm giác {formattedFeelsLike}
                    </span>
                  )}
                </div>
                <div className="text-xs font-semibold text-sky-300">
                  {hasValidWeather
                    ? weather.mapped.viDescription
                    : weatherStatus === 'loading'
                      ? 'Đang đồng bộ thời tiết...'
                      : 'Chưa có dữ liệu thời tiết'}
                </div>
              </div>
            </div>

            <div className="text-right font-mono text-[10px] text-[var(--color-text-muted)]">
              {hasValidWeather ? (
                <>
                  <div>WMO #{weather.weatherCode}</div>
                  <div
                    className={
                      isStale
                        ? 'text-amber-300 font-bold'
                        : 'text-emerald-300 font-semibold'
                    }
                  >
                    {isStale ? 'DỮ LIỆU CŨ' : 'TRỰC TIẾP'}
                  </div>
                </>
              ) : (
                <div className="text-amber-300 font-semibold">
                  {weatherStatus === 'loading' ? 'LOADING' : 'UNAVAILABLE'}
                </div>
              )}
            </div>
          </div>

          {/* Loading State Banner (When initial fetch is in progress) */}
          {weatherStatus === 'loading' && !hasValidWeather && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-2 rounded-[var(--radius-lg)] bg-slate-900/70 px-3 py-2 text-xs text-slate-300"
            >
              <RefreshCw
                className="h-3.5 w-3.5 animate-spin text-sky-400 shrink-0"
                aria-hidden="true"
              />
              <span>Đang tải dữ liệu khí tượng Đà Nẵng...</span>
            </div>
          )}

          {/* Error State Banner (When API fails and no cached data exists) */}
          {weatherStatus === 'error' && !hasValidWeather && (
            <div
              role="alert"
              className="rounded-[var(--radius-lg)] border border-amber-500/40 bg-amber-950/40 p-2.5 text-xs text-amber-200 space-y-1.5"
            >
              <div className="flex items-center justify-between gap-1.5 font-semibold">
                <span className="flex items-center gap-1.5">
                  <AlertTriangle
                    className="h-4 w-4 text-amber-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>Không thể tải thời tiết</span>
                </span>
                <DsButton
                  variant="primary"
                  onClick={onRetryWeather}
                  className="!px-2 !py-0.5 text-[10px]"
                >
                  Thử lại
                </DsButton>
              </div>
              <p className="text-[11px] text-amber-300/80">
                {weatherErrorMsg || 'Kết nối Open-Meteo tạm thời gián đoạn.'}
              </p>
            </div>
          )}

          {/* D. Additional Weather Information (Only rendered when real validated data exists) */}
          {hasValidWeather && (
            <>
              <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-slate-900/55 px-2.5 py-1.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                    <Droplets
                      className="h-3.5 w-3.5 text-sky-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Độ ẩm</span>
                  </span>
                  <span className="font-mono font-semibold text-slate-200">
                    {weather.humidity}%
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-slate-900/55 px-2.5 py-1.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                    <Cloud
                      className="h-3.5 w-3.5 text-slate-300 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Mây</span>
                  </span>
                  <span className="font-mono font-semibold text-slate-200">
                    {weather.cloudCover}%
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-slate-900/55 px-2.5 py-1.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                    <Wind
                      className="h-3.5 w-3.5 text-emerald-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Gió</span>
                  </span>
                  <span className="font-mono font-semibold text-slate-200">
                    {weather.windSpeed.toFixed(1)} km/h{' '}
                    {formatCompassDirection(weather.windDirection)}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-[var(--radius-md)] bg-slate-900/55 px-2.5 py-1.5">
                  <span className="flex items-center gap-1 text-[var(--color-text-muted)]">
                    <Thermometer
                      className="h-3.5 w-3.5 text-amber-400 shrink-0"
                      aria-hidden="true"
                    />
                    <span>Lượng mưa</span>
                  </span>
                  <span className="font-mono font-semibold text-slate-200">
                    {weather.precipitation.toFixed(1)} mm
                  </span>
                </div>
              </div>

              {/* Sunrise & Sunset Bar */}
              <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-[var(--color-border-subtle)] bg-slate-900/45 px-2.5 py-1.5 text-[11px]">
                <div className="flex items-center gap-1.5 text-amber-300">
                  <Sunrise className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="text-[var(--color-text-muted)]">Mọc</span>
                  <span className="font-mono font-semibold text-slate-100">
                    {weather.sunriseFormatted !== '--:--'
                      ? weather.sunriseFormatted
                      : solar.sunriseFormatted}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-300">
                  <Sunset className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span className="text-[var(--color-text-muted)]">Lặn</span>
                  <span className="font-mono font-semibold text-slate-100">
                    {weather.sunsetFormatted !== '--:--'
                      ? weather.sunsetFormatted
                      : solar.sunsetFormatted}
                  </span>
                </div>
              </div>

              {/* E. Data Freshness & Attribution Footer */}
              <div className="flex items-center justify-between pt-0.5 text-[10px] text-[var(--color-text-muted)]">
                <div className="flex items-center gap-1.5">
                  <span>
                    Cập nhật:{' '}
                    {weather.apiObservationTime !== '--:--'
                      ? weather.apiObservationTime
                      : weather.fetchedAtFormatted}
                  </span>
                  {isStale && (
                    <button
                      type="button"
                      onClick={onRetryWeather}
                      className="text-amber-300 underline hover:text-amber-200"
                      title="Làm mới dữ liệu thời tiết"
                    >
                      Làm mới
                    </button>
                  )}
                </div>
                <a
                  href="https://open-meteo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400/90 hover:text-sky-300 underline decoration-sky-400/40"
                >
                  Open-Meteo
                </a>
              </div>
            </>
          )}
        </div>
      </aside>
    );
  }
);

/**
 * 5.3 Bottom-Left Zone – Movement Guide Area
 * Independent layout slot for movement instructions. Automatically avoids overlapping
 * the Virtual Joystick when touch controls are active.
 */
interface BottomLeftMovementGuideSlotProps {
  mode: MovementGuideDisplayMode;
  onToggleMode: () => void;
  deviceProfile: AdaptiveDeviceProfile;
}

const BottomLeftMovementGuideSlot: React.FC<BottomLeftMovementGuideSlotProps> =
  React.memo(({ mode, onToggleMode, deviceProfile }) => {
    const isTouchActive = deviceProfile.showTouchControls;
    const isCollapsed = mode === 'collapsed';
    const guideContentId = 'hud-adaptive-movement-guide-panel';
    const instructions = useMemo(
      () => getActiveControlGuideInstructions(isTouchActive),
      [isTouchActive]
    );

    const isMobilePortrait =
      deviceProfile.formFactor === 'mobile' &&
      deviceProfile.orientation === 'portrait';
    const isMobileLandscape =
      deviceProfile.formFactor === 'mobile' &&
      deviceProfile.orientation === 'landscape';

    const stopGameplayPropagation = (
      e: React.PointerEvent<HTMLElement> | React.MouseEvent<HTMLElement>
    ) => {
      e.stopPropagation();
    };

    if (isCollapsed) {
      return (
        <section
          aria-label="Hướng dẫn điều khiển nhân vật (Chế độ thu gọn)"
          data-hud-zone="bottom-left"
          data-guide-mode="collapsed"
          data-hud-interactive="true"
          onPointerDown={stopGameplayPropagation}
          onClick={stopGameplayPropagation}
          className="pointer-events-auto flex items-center"
        >
          <button
            type="button"
            onClick={onToggleMode}
            aria-expanded={false}
            aria-controls={guideContentId}
            aria-label={`Mở bảng hướng dẫn điều khiển (${
              isTouchActive ? 'Cảm ứng Touch' : 'Bàn phím & Chuột'
            } - Phím H)`}
            title="Mở hướng dẫn điều khiển (Phím H)"
            className="ds-btn ds-surface-card inline-flex items-center gap-2 px-3 py-2 text-xs font-bold text-slate-100 hover:border-sky-400/60 hover:text-white shadow-lg"
          >
            {isTouchActive ? (
              <Gamepad2 className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
            ) : (
              <Keyboard className="h-4 w-4 text-sky-400 shrink-0" aria-hidden="true" />
            )}
            <span>Controls</span>
            <span className="rounded bg-slate-800/90 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-sky-300 border border-slate-700/70">
              {isTouchActive ? 'TOUCH' : 'WASD'}
            </span>
            <ChevronUp className="h-3.5 w-3.5 text-sky-300 shrink-0" aria-hidden="true" />
          </button>
        </section>
      );
    }

    return (
      <section
        id={guideContentId}
        aria-label="Bảng hướng dẫn điều khiển nhân vật thích ứng (Bottom-Left Zone)"
        data-hud-zone="bottom-left"
        data-guide-mode="expanded"
        data-input-mode={isTouchActive ? 'touch' : 'keyboard-mouse'}
        data-hud-interactive="true"
        onPointerDown={stopGameplayPropagation}
        onClick={stopGameplayPropagation}
        className={`pointer-events-auto ds-surface-card select-text transition-all ${
          isMobilePortrait
            ? 'w-[min(88vw,285px)] p-2.5 max-h-[34vh] overflow-y-auto'
            : isMobileLandscape
              ? 'w-72 p-2.5 max-h-[42vh] overflow-y-auto'
              : deviceProfile.formFactor === 'tablet'
                ? 'w-80 p-3.5'
                : 'w-80 sm:w-[340px] p-3.5'
        }`}
      >
        {/* Header Bar: Title + Active Input Mode Pill + Collapse Button */}
        <div className="mb-2.5 flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-sky-500/20 border border-sky-400/40 text-sky-300">
              {isTouchActive ? (
                <Gamepad2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Keyboard className="h-3.5 w-3.5" aria-hidden="true" />
              )}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-[11px] font-extrabold tracking-wider uppercase text-white">
                MOVEMENT &amp; CAMERA GUIDE
              </h2>
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-sky-300/90">
                <span>
                  {isTouchActive
                    ? 'Touch Controls Active'
                    : 'Keyboard & Mouse Active'}
                </span>
                {deviceProfile.isHybrid && (
                  <span className="rounded bg-amber-500/20 px-1 py-0.2 text-[9px] text-amber-300 border border-amber-400/30">
                    HYBRID AUTO
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggleMode}
            aria-expanded={true}
            aria-controls={guideContentId}
            aria-label="Thu gọn bảng hướng dẫn điều khiển thành nút Controls (Phím H)"
            title="Thu gọn hướng dẫn (Phím H)"
            className="ds-btn !p-1.5 bg-slate-800/85 hover:bg-slate-700/90 text-slate-200 border border-slate-600/60 shrink-0"
          >
            <ChevronDown className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
          </button>
        </div>

        {/* Visual Control Representation: Desktop WASD Cap Cluster vs. Mobile Touch Cluster */}
        {!isTouchActive ? (
          <div className="space-y-2.5">
            {/* Visual WASD Keycap Layout + Quick Sprint/Jump Keycaps */}
            <div className="ds-surface-elevated flex items-center justify-between gap-2 px-3 py-2">
              <div
                aria-label="Bố cục phím di chuyển W A S D"
                className="flex flex-col items-center gap-1"
              >
                <kbd className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-xs)] border border-sky-400/50 bg-slate-900/95 font-mono text-[11px] font-extrabold text-sky-300 shadow-inner">
                  W
                </kbd>
                <div className="flex items-center gap-1">
                  {(['A', 'S', 'D'] as const).map((k) => (
                    <kbd
                      key={k}
                      className="flex h-6 w-6 items-center justify-center rounded-[var(--radius-xs)] border border-sky-400/50 bg-slate-900/95 font-mono text-[11px] font-extrabold text-sky-300 shadow-inner"
                    >
                      {k}
                    </kbd>
                  ))}
                </div>
              </div>

              <div className="flex-1 pl-2 text-[11px] leading-snug text-slate-200">
                <div className="font-bold text-white">Di chuyển theo hướng Camera</div>
                <div className="text-[10px] text-[var(--color-text-muted)]">
                  W (Tiến) • S (Lùi) • A (Trái) • D (Phải) hoặc phím Mũi tên
                </div>
              </div>
            </div>

            {/* Structured Desktop Instructions List */}
            <ul className="space-y-1.5 text-[11px]">
              {instructions
                .filter((item) => item.id !== 'kb-move-wasd')
                .map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-2 rounded-[var(--radius-md)] bg-slate-900/55 px-2.5 py-1.5 border border-slate-800/80"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 font-semibold text-slate-100">
                        {item.inputType === 'mouse' ? (
                          <MousePointer
                            className="h-3 w-3 text-amber-300 shrink-0"
                            aria-hidden="true"
                          />
                        ) : (
                          <Keyboard
                            className="h-3 w-3 text-sky-400 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        <span className="truncate">{item.action}</span>
                      </div>
                      <p className="text-[10px] text-[var(--color-text-muted)] leading-tight mt-0.5">
                        {item.description}
                      </p>
                    </div>
                    {item.keys && (
                      <div className="flex items-center gap-1 shrink-0">
                        {item.keys.map((k) => (
                          <kbd
                            key={k}
                            className="rounded-[var(--radius-xs)] border border-slate-600/80 bg-slate-800/95 px-1.5 py-0.5 font-mono text-[10px] font-bold text-sky-300"
                          >
                            {k}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        ) : (
          <div className="space-y-2">
            {/* Visual Touch Gesture Summary Bar */}
            <div className="ds-surface-elevated flex items-center justify-between gap-2 px-2.5 py-2 text-[11px]">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-400/60 bg-sky-500/15 text-sky-300">
                  <HandTouch className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-bold text-white">Điều khiển Cảm ứng Đa điểm</div>
                  <div className="text-[10px] text-[var(--color-text-muted)]">
                    Trái: Joystick • Phải: Vuốt Camera &amp; Nút Jump/Sprint
                  </div>
                </div>
              </div>
            </div>

            <ul className="space-y-1.5 text-[11px]">
              {instructions.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between gap-2 rounded-[var(--radius-md)] bg-slate-900/55 px-2.5 py-1.5 border border-slate-800/80"
                >
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-slate-100 truncate">
                      {item.action}
                    </div>
                    <p className="text-[10px] text-[var(--color-text-muted)] leading-tight mt-0.5">
                      {item.description}
                    </p>
                  </div>
                  {item.badgeText && (
                    <span className="shrink-0 rounded-[var(--radius-xs)] border border-emerald-400/40 bg-emerald-500/15 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-300">
                      {item.badgeText}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    );
  });

interface ContextualInteractionOverlayProps {
  targetState: ActiveInteractionTargetState;
  deviceProfile: AdaptiveDeviceProfile;
  onTriggerInteraction: () => void;
  contextualPanelItem: {
    definition: InteractableDefinition;
    isActivated: boolean;
    interactionCount: number;
  } | null;
  onCloseContextualPanel: () => void;
  actionFeedback: InteractionExecutionFeedback | null;
  syncSnapshot: SynchronizedTimeSolarSnapshot;
  weather: NormalizedWeatherState | null;
}

const ContextualInteractionOverlay: React.FC<ContextualInteractionOverlayProps> =
  React.memo(
    ({
      targetState,
      deviceProfile,
      onTriggerInteraction,
      contextualPanelItem,
      onCloseContextualPanel,
      actionFeedback,
      syncSnapshot,
      weather,
    }) => {
      const isTouch = deviceProfile.showTouchControls;
      const { definition, status, distanceMeters, isActivated } = targetState;

      const stopGameplayPropagation = (
        e: React.PointerEvent<HTMLElement> | React.MouseEvent<HTMLElement>
      ) => {
        e.stopPropagation();
      };

      const renderInteractionTypeIcon = (type: InteractionType) => {
        switch (type) {
          case 'inspect':
            return <EyeIcon className="h-3.5 w-3.5 text-sky-300 shrink-0" aria-hidden="true" />;
          case 'information':
            return <Info className="h-3.5 w-3.5 text-emerald-300 shrink-0" aria-hidden="true" />;
          case 'activate':
            return <ZapIcon className="h-3.5 w-3.5 text-amber-300 shrink-0" aria-hidden="true" />;
        }
      };

      return (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
            style={{ zIndex: 'var(--z-hud)' }}
          >
            <div
              className={`rounded-full transition-all duration-150 ${
                status === 'eligible'
                  ? 'h-3 w-3 border-2 border-sky-300 bg-sky-400/30 shadow-[0_0_10px_rgba(56,189,248,0.9)] scale-110'
                  : status === 'out-of-range'
                    ? 'h-2.5 w-2.5 border border-amber-300/80 bg-amber-400/20'
                    : 'h-1.5 w-1.5 bg-white/45 ring-1 ring-slate-950/50'
              }`}
            />
          </div>

          {definition && status !== 'idle' && status !== 'disabled' && !contextualPanelItem && (
            <div
              data-testid="interaction-prompt-container"
              data-interaction-status={status}
              data-hud-interactive="true"
              onPointerDown={stopGameplayPropagation}
              onClick={stopGameplayPropagation}
              style={{ zIndex: 'var(--z-floating-controls)' }}
              className="pointer-events-auto fixed left-1/2 bottom-[22%] sm:bottom-[18%] -translate-x-1/2 flex flex-col items-center gap-1.5 px-3 max-w-[92vw]"
            >
              {status === 'eligible' ? (
                <button
                  type="button"
                  onClick={onTriggerInteraction}
                  aria-label={`${definition.actionLabelVi}: ${definition.label} (${distanceMeters.toFixed(1)} mét)`}
                  className="ds-surface-card group flex items-center gap-2.5 px-3.5 py-2 border-sky-400/70 hover:border-sky-300 shadow-[0_8px_28px_rgba(2,6,23,0.75)] transition-all active:scale-95"
                >
                  {!isTouch ? (
                    <kbd className="flex h-6 min-w-[24px] items-center justify-center rounded-[var(--radius-sm)] border border-sky-300/80 bg-sky-500/25 px-1.5 font-mono text-xs font-extrabold text-white shadow-inner">
                      {GAME_CONFIG.interaction.keyDisplay}
                    </kbd>
                  ) : (
                    <span className="flex h-6 items-center gap-1 rounded-[var(--radius-sm)] border border-emerald-400/70 bg-emerald-500/25 px-2 font-mono text-[10px] font-extrabold uppercase text-emerald-200">
                      <HandTouch className="h-3 w-3" aria-hidden="true" />
                      <span>Tương tác</span>
                    </span>
                  )}

                  <div className="text-left min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-extrabold text-white">
                      {renderInteractionTypeIcon(definition.type)}
                      <span className="truncate">{definition.actionLabelVi}</span>
                      {definition.type === 'activate' && (
                        <span
                          className={`rounded px-1.5 py-0.2 font-mono text-[9px] font-bold uppercase ${
                            isActivated
                              ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40'
                              : 'bg-slate-800 text-slate-300 border border-slate-600/60'
                          }`}
                        >
                          {isActivated ? 'ON' : 'OFF'}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--color-text-secondary)]">
                      <span className="truncate max-w-[210px] sm:max-w-[260px]">
                        {definition.label}
                      </span>
                      <span className="font-mono text-sky-300 font-semibold shrink-0">
                        • {distanceMeters.toFixed(1)}m
                      </span>
                    </div>
                  </div>
                </button>
              ) : status === 'out-of-range' ? (
                <div
                  role="status"
                  className="ds-surface-card flex items-center gap-2 px-3 py-1.5 border-amber-400/45 text-[11px] text-amber-200 opacity-90"
                >
                  {renderInteractionTypeIcon(definition.type)}
                  <span className="font-semibold truncate max-w-[200px]">
                    {definition.label}
                  </span>
                  <span className="font-mono text-[10px] text-amber-300 shrink-0">
                    ({distanceMeters.toFixed(1)}m / tối đa {definition.maxDistance.toFixed(1)}m — Tiếp cận gần hơn)
                  </span>
                </div>
              ) : (
                <div
                  role="status"
                  className="ds-surface-card flex items-center gap-1.5 px-2.5 py-1 border-slate-600/60 text-[10px] text-slate-300 opacity-85"
                >
                  <span>Bị che khuất tầm nhìn ({distanceMeters.toFixed(1)}m)</span>
                </div>
              )}
            </div>
          )}

          {actionFeedback && !contextualPanelItem && (
            <div
              role="status"
              aria-live="polite"
              data-testid="interaction-feedback-banner"
              style={{ zIndex: 'var(--z-toast)' }}
              className="pointer-events-none fixed left-1/2 top-16 -translate-x-1/2 ds-surface-card flex items-center gap-2 px-3.5 py-2 border-emerald-400/55 shadow-lg"
            >
              <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <div className="text-xs">
                <span className="font-bold text-white">{actionFeedback.title}: </span>
                <span className="text-slate-200">{actionFeedback.message}</span>
              </div>
            </div>
          )}

          {contextualPanelItem && (
            <div
              role="dialog"
              aria-modal="false"
              aria-labelledby="contextual-interaction-panel-title"
              data-testid="contextual-interaction-panel"
              data-hud-interactive="true"
              onPointerDown={stopGameplayPropagation}
              onClick={stopGameplayPropagation}
              style={{ zIndex: 'var(--z-modal)' }}
              className="pointer-events-auto fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,420px)] ds-surface-card p-4 sm:p-5 space-y-3 border-sky-400/60 shadow-2xl select-text"
            >
              <div className="flex items-start justify-between gap-2 border-b border-[var(--color-border)] pb-2.5">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-sky-500/20 border border-sky-400/45">
                    {renderInteractionTypeIcon(contextualPanelItem.definition.type)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-sky-400">
                      {contextualPanelItem.definition.type === 'inspect'
                        ? 'INSPECT OBJECT'
                        : 'CONTEXTUAL INFORMATION'}
                    </div>
                    <h3
                      id="contextual-interaction-panel-title"
                      className="text-sm font-extrabold text-white truncate"
                    >
                      {contextualPanelItem.definition.label}
                    </h3>
                  </div>
                </div>

                <DsIconButton
                  label="Đóng bảng tương tác (ESC)"
                  onClick={onCloseContextualPanel}
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </DsIconButton>
              </div>

              <p className="text-xs leading-relaxed text-[var(--color-text-secondary)]">
                {contextualPanelItem.definition.description}
              </p>

              <ul className="space-y-1.5 text-[11px] font-mono">
                {contextualPanelItem.definition.detailPoints.map((pt, idx) => (
                  <li
                    key={idx}
                    className="ds-surface-elevated px-2.5 py-1.5 text-slate-200"
                  >
                    • {pt}
                  </li>
                ))}
                {contextualPanelItem.definition.id ===
                  'fixture-weather-telemetry-post' && (
                  <li className="ds-surface-elevated px-2.5 py-1.5 text-emerald-300">
                    • Dữ liệu trực tiếp Đà Nẵng: {syncSnapshot.clock.timeString} GMT+7 |{' '}
                    {weather
                      ? `${Math.round(weather.temperature)}°C — ${weather.mapped.viDescription}`
                      : `Góc mặt trời ${syncSnapshot.solar.altitudeDeg.toFixed(1)}° (${syncSnapshot.solar.phaseVi})`}
                  </li>
                )}
              </ul>

              <div className="flex items-center justify-between border-t border-[var(--color-border-subtle)] pt-2.5 text-[11px]">
                <span className="font-mono text-[var(--color-text-muted)]">
                  Số lần tương tác: {contextualPanelItem.interactionCount}
                </span>
                <DsButton variant="primary" onClick={onCloseContextualPanel}>
                  Đóng (ESC)
                </DsButton>
              </div>
            </div>
          )}
        </>
      );
    }
  );

// ============================================================================
// 18. MAIN APPLICATION COMPONENT (PHASE 1 TO PHASE 10 COMPLETE)
// ============================================================================
export const App: React.FC = () => {
  const mountContainerRef = useRef<HTMLDivElement | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const miniMapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const miniMapMarkerDomRef = useRef<HTMLDivElement | null>(null);
  const miniMapConeDomRef = useRef<HTMLDivElement | null>(null);
  const miniMapEdgeBadgeDomRef = useRef<HTMLSpanElement | null>(null);
  const requestMiniMapRenderRef = useRef<(() => void) | null>(null);

  const [miniMapState, setMiniMapState] = useState<MiniMapState>(() => ({
    zoom: GAME_CONFIG.miniMap.defaultZoom,
    followMode: 'overview',
    status: 'initializing',
    worldSpanMeters: computeMiniMapVisibleSpanMeters(
      GAME_CONFIG.miniMap.defaultZoom
    ),
    lastRenderTimeMs: 0,
  }));
  const miniMapZoomRef = useRef<number>(GAME_CONFIG.miniMap.defaultZoom);
  const miniMapFollowModeRef = useRef<MiniMapFollowMode>('overview');

  const handleToggleMiniMapFollow = useCallback(() => {
    setMiniMapState((prev) => {
      const nextFollow: MiniMapFollowMode =
        prev.followMode === 'overview' ? 'follow' : 'overview';
      miniMapFollowModeRef.current = nextFollow;
      requestMiniMapRenderRef.current?.();
      return {
        ...prev,
        followMode: nextFollow,
      };
    });
  }, []);

  const handleMiniMapZoomIn = useCallback(() => {
    setMiniMapState((prev) => {
      const nextZoom = clampMiniMapZoom(
        prev.zoom + GAME_CONFIG.miniMap.zoomStep
      );
      miniMapZoomRef.current = nextZoom;
      requestMiniMapRenderRef.current?.();
      return {
        ...prev,
        zoom: nextZoom,
        worldSpanMeters: computeMiniMapVisibleSpanMeters(nextZoom),
      };
    });
  }, []);

  const handleMiniMapZoomOut = useCallback(() => {
    setMiniMapState((prev) => {
      const nextZoom = clampMiniMapZoom(
        prev.zoom - GAME_CONFIG.miniMap.zoomStep
      );
      miniMapZoomRef.current = nextZoom;
      requestMiniMapRenderRef.current?.();
      return {
        ...prev,
        zoom: nextZoom,
        worldSpanMeters: computeMiniMapVisibleSpanMeters(nextZoom),
      };
    });
  }, []);

  const handleMiniMapResetZoom = useCallback(() => {
    const resetZoom = GAME_CONFIG.miniMap.defaultZoom;
    miniMapZoomRef.current = resetZoom;
    requestMiniMapRenderRef.current?.();
    setMiniMapState((prev) => ({
      ...prev,
      zoom: resetZoom,
      worldSpanMeters: computeMiniMapVisibleSpanMeters(resetZoom),
    }));
  }, []);

  const keyboardInputRef = useRef<KeyboardInputState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
  });

  const joystickInputRef = useRef<JoystickInput>({
    x: 0,
    y: 0,
    magnitude: 0,
    active: false,
  });

  const touchActionRef = useRef<{
    sprint: boolean;
    sprintLatched: boolean;
    jump: boolean;
  }>({
    sprint: false,
    sprintLatched: false,
    jump: false,
  });

  const isGameplayFocusedRef = useRef<boolean>(true);
  const lastPointerTypeRef = useRef<'mouse' | 'touch' | 'pen' | 'keyboard' | null>(null);

  const [deviceProfile, setDeviceProfile] = useState<AdaptiveDeviceProfile>(() =>
    evaluateAdaptiveDeviceProfile(null)
  );

  const [syncTimeSolar, setSyncTimeSolar] = useState<SynchronizedTimeSolarSnapshot>(() => {
    const c = getDaNangClockData(new Date());
    return {
      clock: c,
      solar: calculateDaNangSolarData(c),
    };
  });
  const solarRef = useRef<SolarAstronomicalData>(syncTimeSolar.solar);

  // Real-Time Open-Meteo Weather State & Refs
  const [weatherState, setWeatherState] = useState<NormalizedWeatherState | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [weatherErrorMsg, setWeatherErrorMsg] = useState<string | null>(null);
  const weatherRef = useRef<NormalizedWeatherState | null>(null);
  const weatherRequestSeqRef = useRef<number>(0);

  // PHASE 10: World Interaction Registry, Active Target State & Contextual Execution
  const interactableRegistryRef = useRef<InteractableRegistry>(
    new InteractableRegistry()
  );
  const activeTargetStateRef = useRef<ActiveInteractionTargetState>({
    targetId: null,
    status: 'idle',
    distanceMeters: Infinity,
    definition: null,
    isActivated: false,
    interactionCount: 0,
  });
  const [activeTargetState, setActiveTargetState] =
    useState<ActiveInteractionTargetState>(() => ({
      targetId: null,
      status: 'idle',
      distanceMeters: Infinity,
      definition: null,
      isActivated: false,
      interactionCount: 0,
    }));
  const [contextualPanelItem, setContextualPanelItem] = useState<{
    definition: InteractableDefinition;
    isActivated: boolean;
    interactionCount: number;
  } | null>(null);
  const [actionFeedback, setActionFeedback] =
    useState<InteractionExecutionFeedback | null>(null);
  const lastInteractionExecMsRef = useRef<number>(0);

  const executeTargetInteraction = useCallback(() => {
    const nowMs = performance.now();
    if (
      nowMs - lastInteractionExecMsRef.current <
      GAME_CONFIG.interaction.cooldownMs
    ) {
      return;
    }
    const current = activeTargetStateRef.current;
    if (!current.targetId || current.status !== 'eligible' || !current.definition) {
      return;
    }

    lastInteractionExecMsRef.current = nowMs;
    const registry = interactableRegistryRef.current;
    const def = current.definition;

    if (def.type === 'activate') {
      const nextActive = registry.toggleActivated(def.id);
      const entry = registry.get(def.id);
      const updatedCount = entry ? entry.interactionCount : current.interactionCount + 1;

      const updatedTarget: ActiveInteractionTargetState = {
        ...current,
        isActivated: nextActive,
        interactionCount: updatedCount,
      };
      activeTargetStateRef.current = updatedTarget;
      setActiveTargetState(updatedTarget);
      requestMiniMapRenderRef.current?.();

      setActionFeedback({
        id: `${def.id}-${nowMs}`,
        targetId: def.id,
        title: def.label,
        message: nextActive
          ? 'Đã KÍCH HOẠT (ON) trụ đèn hiệu chuẩn năng lượng.'
          : 'Đã TẮT (OFF) trụ đèn hiệu chuẩn năng lượng.',
        type: 'activate',
        timestampMs: Date.now(),
        isActivated: nextActive,
      });
    } else {
      const updatedCount = registry.recordInteraction(def.id);
      const entry = registry.get(def.id);
      const isAct = entry ? entry.isActivated : false;

      const updatedTarget: ActiveInteractionTargetState = {
        ...current,
        interactionCount: updatedCount,
      };
      activeTargetStateRef.current = updatedTarget;
      setActiveTargetState(updatedTarget);

      setContextualPanelItem({
        definition: def,
        isActivated: isAct,
        interactionCount: updatedCount,
      });
    }
  }, []);

  useEffect(() => {
    if (!actionFeedback) return;
    const timer = window.setTimeout(() => {
      setActionFeedback(null);
    }, 3400);
    return () => window.clearTimeout(timer);
  }, [actionFeedback]);

  const playerStateRef = useRef<PlayerRuntimeState>({
    position: new THREE.Vector3(0, 0, 0),
    velocity: new THREE.Vector3(0, 0, 0),
    horizontalSpeed: 0,
    rotationY: 0,
    isGrounded: true,
    surfaceHeight: 0,
    animationState: 'IDLE',
    landingTimer: 0,
    cameraYaw: 0,
    cameraPitch: GAME_CONFIG.camera.defaultPitch,
    cameraDistance: GAME_CONFIG.camera.defaultDistance,
    isPointerLocked: false,
    perf: {
      fps: 60,
      avgFrameTimeMs: 16.6,
      p95FrameTimeMs: 18.0,
      drawCalls: 0,
      triangles: 0,
      geometriesCount: 0,
      texturesCount: 0,
      jsHeapUsedMb: null,
      pixelRatioActive: 1,
      adaptiveQualityTier: 'ultra',
    },
  });
  // PHASE 4, 5, 6, 7 & 9 HUD STATE MANAGEMENT (Independent per-panel state, non-intrusive defaults)
  const [hudPanels, setHudPanels] = useState<HUDPanelState>(() => {
    const initialProfile = evaluateAdaptiveDeviceProfile(null);
    const isSmallScreen = initialProfile.formFactor === 'mobile';
    return {
      miniMap: isSmallScreen ? 'compact' : 'expanded',
      statusWidget: isSmallScreen ? 'compact' : 'expanded',
      movementGuide: isSmallScreen ? 'collapsed' : 'expanded',
      environmentPanel: 'compact',
      secondaryInfo: isSmallScreen ? 'hidden' : 'compact',
      playerStatus: isSmallScreen ? 'compact' : 'expanded',
    };
  });

  const toggleMiniMapDisplayMode = useCallback(() => {
    setHudPanels((prev) => ({
      ...prev,
      miniMap: prev.miniMap === 'expanded' ? 'compact' : 'expanded',
    }));
  }, []);

  const toggleStatusWidgetMode = useCallback(() => {
    setHudPanels((prev) => ({
      ...prev,
      statusWidget: prev.statusWidget === 'expanded' ? 'compact' : 'expanded',
    }));
  }, []);

  const togglePlayerStatusMode = useCallback(() => {
    setHudPanels((prev) => ({
      ...prev,
      playerStatus: prev.playerStatus === 'expanded' ? 'compact' : 'expanded',
    }));
  }, []);

  const toggleMovementGuideMode = useCallback(() => {
    setHudPanels((prev) => ({
      ...prev,
      movementGuide:
        prev.movementGuide === 'expanded' ? 'collapsed' : 'expanded',
    }));
  }, []);

  const setEnvironmentPanelMode = useCallback((targetMode?: PanelDisplayMode) => {
    setHudPanels((prev) => {
      if (targetMode) {
        return { ...prev, environmentPanel: targetMode };
      }
      const next: PanelDisplayMode =
        prev.environmentPanel === 'expanded'
          ? 'compact'
          : prev.environmentPanel === 'compact'
            ? 'hidden'
            : 'compact';
      return { ...prev, environmentPanel: next };
    });
  }, []);

  const cycleSecondaryInfoMode = useCallback((targetMode?: PanelDisplayMode) => {
    setHudPanels((prev) => {
      if (targetMode) {
        return { ...prev, secondaryInfo: targetMode };
      }
      const next: PanelDisplayMode =
        prev.secondaryInfo === 'hidden'
          ? 'compact'
          : prev.secondaryInfo === 'compact'
            ? 'expanded'
            : 'hidden';
      return { ...prev, secondaryInfo: next };
    });
  }, []);

  const [showSystemInfoModal, setShowSystemInfoModal] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [webglStatus, setWebglStatus] = useState<'ok' | 'context-lost' | 'unsupported'>('ok');
  const [focusGuardNote, setFocusGuardNote] = useState<string>('');

  const [joystickVisual, setJoystickVisual] = useState<{
    x: number;
    y: number;
    active: boolean;
    magnitude: number;
  }>({ x: 0, y: 0, active: false, magnitude: 0 });
  const [touchSprintPressed, setTouchSprintPressed] = useState<boolean>(false);
  const [touchSprintLatched, setTouchSprintLatched] = useState<boolean>(false);
  const [touchJumpPressed, setTouchJumpPressed] = useState<boolean>(false);

  const diagnosticsResults = useMemo<DiagnosticCheckResult[]>(
    () => runSystemDiagnosticsSuite(),
    []
  );

  const [telemetry, setTelemetry] = useState({
    posX: '0.00',
    posY: '0.00',
    posZ: '0.00',
    surfaceY: '0.00',
    state: 'IDLE' as CharacterAnimationState,
    speed: '0.00',
    speedPercent: 0,
    grounded: true,
    cameraDist: '5.40',
    cameraYawDeg: '0',
    cameraPitchDeg: '16',
    pointerLocked: false,
    fps: 60,
    avgFrameMs: '16.6',
    p95FrameMs: '18.0',
    drawCalls: 0,
    triangles: 0,
    geometriesCount: 0,
    jsHeapMb: 'N/A',
    qualityTier: 'ultra' as 'ultra' | 'balanced' | 'performance',
    solarAltDeg: '0.0',
    solarAzDeg: '0.0',
  });

  // Reset Player Position
  const handleResetPlayer = useCallback(() => {
    const s = playerStateRef.current;
    s.position.set(0, 0, 0);
    s.velocity.set(0, 0, 0);
    s.horizontalSpeed = 0;
    s.rotationY = 0;
    s.isGrounded = true;
    s.surfaceHeight = 0;
    s.animationState = 'IDLE';
    s.cameraYaw = 0;
    s.cameraPitch = GAME_CONFIG.camera.defaultPitch;
    s.cameraDistance = GAME_CONFIG.camera.defaultDistance;
    touchActionRef.current.sprint = false;
    touchActionRef.current.sprintLatched = false;
    touchActionRef.current.jump = false;
    setTouchSprintPressed(false);
    setTouchSprintLatched(false);
    setTouchJumpPressed(false);
  }, []);

  // Toggle Browser Fullscreen
  const handleToggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', onFullscreenChange);
  }, []);

  // Automatic Device & Input Mode Detection
  useEffect(() => {
    const refreshDeviceProfile = () => {
      setDeviceProfile(evaluateAdaptiveDeviceProfile(lastPointerTypeRef.current));
    };

    const onGlobalPointerDown = (e: PointerEvent) => {
      if (isInteractiveInputElement(e.target)) {
        isGameplayFocusedRef.current = false;
        return;
      }

      isGameplayFocusedRef.current = true;
      if (
        document.activeElement instanceof HTMLElement &&
        isInteractiveInputElement(document.activeElement)
      ) {
        document.activeElement.blur();
      }

      const pType =
        e.pointerType === 'touch'
          ? 'touch'
          : e.pointerType === 'pen'
            ? 'pen'
            : 'mouse';
      if (lastPointerTypeRef.current !== pType) {
        lastPointerTypeRef.current = pType;
        refreshDeviceProfile();
      }
    };

    const mqlCoarse = window.matchMedia?.('(pointer: coarse)');
    const mqlFine = window.matchMedia?.('(pointer: fine)');
    const mqlHover = window.matchMedia?.('(hover: none)');

    window.addEventListener('pointerdown', onGlobalPointerDown, { passive: true });
    window.addEventListener('resize', refreshDeviceProfile);
    window.addEventListener('orientationchange', refreshDeviceProfile);
    mqlCoarse?.addEventListener?.('change', refreshDeviceProfile);
    mqlFine?.addEventListener?.('change', refreshDeviceProfile);
    mqlHover?.addEventListener?.('change', refreshDeviceProfile);

    return () => {
      window.removeEventListener('pointerdown', onGlobalPointerDown);
      window.removeEventListener('resize', refreshDeviceProfile);
      window.removeEventListener('orientationchange', refreshDeviceProfile);
      mqlCoarse?.removeEventListener?.('change', refreshDeviceProfile);
      mqlFine?.removeEventListener?.('change', refreshDeviceProfile);
      mqlHover?.removeEventListener?.('change', refreshDeviceProfile);
    };
  }, []);

  // Unified 1Hz Clock & Astronomical Solar Position Updater
  useEffect(() => {
    const syncTimeAndSolar = () => {
      const now = new Date();
      const clock = getDaNangClockData(now);
      const solar = calculateDaNangSolarData(clock);
      solarRef.current = solar;
      setSyncTimeSolar({ clock, solar });

      if (weatherRef.current) {
        const ageMs = now.getTime() - weatherRef.current.fetchedAtTimestampMs;
        if (
          ageMs > GAME_CONFIG.weatherStaleThresholdMs &&
          weatherRef.current.freshness !== 'stale'
        ) {
          const staleCopy: NormalizedWeatherState = {
            ...weatherRef.current,
            freshness: 'stale',
          };
          weatherRef.current = staleCopy;
          setWeatherState(staleCopy);
        }
      }
    };

    syncTimeAndSolar();
    const intervalId = window.setInterval(syncTimeAndSolar, 1000);
    const onVisibility = () => {
      if (!document.hidden) syncTimeAndSolar();
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearInterval(intervalId);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  // Open-Meteo Real-Time Weather Polling with Race-Safe Sequence ID
  const triggerWeatherRefresh = useCallback((abortSignal?: AbortSignal) => {
    const requestSeq = ++weatherRequestSeqRef.current;
    if (!weatherRef.current) {
      setWeatherStatus('loading');
    }

    fetchDaNangWeatherWithRetry(abortSignal, 3)
      .then((normalized) => {
        if (requestSeq !== weatherRequestSeqRef.current) return;
        weatherRef.current = normalized;
        setWeatherState(normalized);
        setWeatherStatus('ready');
        setWeatherErrorMsg(null);
      })
      .catch((err: unknown) => {
        if (abortSignal?.aborted || requestSeq !== weatherRequestSeqRef.current) {
          return;
        }
        const message =
          err instanceof Error ? err.message : 'Weather service unavailable';
        setWeatherErrorMsg(message);
        if (!weatherRef.current) {
          setWeatherStatus('error');
        } else {
          const staleState: NormalizedWeatherState = {
            ...weatherRef.current,
            freshness: 'stale',
          };
          weatherRef.current = staleState;
          setWeatherState(staleState);
        }
      });
  }, []);

  useEffect(() => {
    let activeAbortController: AbortController | null = new AbortController();
    triggerWeatherRefresh(activeAbortController.signal);

    const refreshTimer = window.setInterval(() => {
      activeAbortController?.abort();
      activeAbortController = new AbortController();
      triggerWeatherRefresh(activeAbortController.signal);
    }, GAME_CONFIG.weatherRefreshIntervalMs);

    const onVisibilityChange = () => {
      if (!document.hidden) {
        const lastFetched = weatherRef.current?.fetchedAtTimestampMs ?? 0;
        if (Date.now() - lastFetched >= GAME_CONFIG.weatherRefreshIntervalMs) {
          activeAbortController?.abort();
          activeAbortController = new AbortController();
          triggerWeatherRefresh(activeAbortController.signal);
        }
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      activeAbortController?.abort();
      window.clearInterval(refreshTimer);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [triggerWeatherRefresh]);

  // Desktop Keyboard Controls with Strict Focus Management
  useEffect(() => {
    const gameCodes = new Set([
      'KeyW',
      'KeyS',
      'KeyA',
      'KeyD',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'ShiftLeft',
      'ShiftRight',
      'Space',
    ]);

    const resetKeys = () => {
      const k = keyboardInputRef.current;
      k.forward = false;
      k.backward = false;
      k.left = false;
      k.right = false;
      k.sprint = false;
      k.jump = false;
      touchActionRef.current.jump = false;
      touchActionRef.current.sprint = false;
      setTouchJumpPressed(false);
      setTouchSprintPressed(false);
    };

    const setKey = (code: string, pressed: boolean) => {
      const k = keyboardInputRef.current;
      switch (code) {
        case 'KeyW':
        case 'ArrowUp':
          k.forward = pressed;
          break;
        case 'KeyS':
        case 'ArrowDown':
          k.backward = pressed;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          k.left = pressed;
          break;
        case 'KeyD':
        case 'ArrowRight':
          k.right = pressed;
          break;
        case 'ShiftLeft':
        case 'ShiftRight':
          k.sprint = pressed;
          break;
        case 'Space':
          k.jump = pressed;
          break;
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        if (contextualPanelItem) {
          setContextualPanelItem(null);
          return;
        }
        if (showSystemInfoModal) {
          setShowSystemInfoModal(false);
        }
        if (document.pointerLockElement) {
          document.exitPointerLock?.();
        }
        return;
      }

      if (e.ctrlKey || e.metaKey || e.altKey) return;

      if (
        isInteractiveInputElement(e.target) ||
        isInteractiveInputElement(document.activeElement)
      ) {
        return;
      }

      if (e.code === 'F3') {
        e.preventDefault();
        cycleSecondaryInfoMode();
        return;
      }

      if (e.code === 'KeyE') {
        if (e.repeat) return;
        e.preventDefault();
        if (
          !e.shiftKey &&
          activeTargetStateRef.current.status === 'eligible' &&
          activeTargetStateRef.current.targetId
        ) {
          executeTargetInteraction();
        } else {
          setEnvironmentPanelMode();
        }
        return;
      }

      if (e.code === 'KeyH') {
        e.preventDefault();
        toggleMovementGuideMode();
        return;
      }

      if (e.code === 'KeyM') {
        e.preventDefault();
        toggleMiniMapDisplayMode();
        return;
      }

      if (e.code === 'KeyF') {
        e.preventDefault();
        handleToggleMiniMapFollow();
        return;
      }

      if (e.code === 'KeyR') {
        e.preventDefault();
        handleResetPlayer();
        return;
      }

      if (gameCodes.has(e.code)) {
        if (lastPointerTypeRef.current !== 'keyboard') {
          lastPointerTypeRef.current = 'keyboard';
          setDeviceProfile(evaluateAdaptiveDeviceProfile('keyboard'));
        }
        isGameplayFocusedRef.current = true;
        if (e.code === 'Space' || e.code.startsWith('Arrow')) {
          e.preventDefault();
        }
        setKey(e.code, true);
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (gameCodes.has(e.code)) {
        setKey(e.code, false);
      }
    };

    const onVisibility = () => {
      if (document.hidden) resetKeys();
    };

    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('blur', resetKeys);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('blur', resetKeys);
      document.removeEventListener('visibilitychange', onVisibility);
      resetKeys();
    };
  }, [
    handleResetPlayer,
    showSystemInfoModal,
    contextualPanelItem,
    executeTargetInteraction,
    cycleSecondaryInfoMode,
    setEnvironmentPanelMode,
    toggleMovementGuideMode,
    toggleMiniMapDisplayMode,
    handleToggleMiniMapFollow,
  ]);

  // Telemetry Polling for HUD (10Hz)
  useEffect(() => {
    const interval = window.setInterval(() => {
      const s = playerStateRef.current;
      const sol = solarRef.current;
      const yawDeg = (((s.cameraYaw * 180) / Math.PI) % 360 + 360) % 360;
      const pitchDeg = (s.cameraPitch * 180) / Math.PI;
      setTelemetry({
        posX: s.position.x.toFixed(2),
        posY: s.position.y.toFixed(2),
        posZ: s.position.z.toFixed(2),
        surfaceY: s.surfaceHeight.toFixed(2),
        state: s.animationState,
        speed: s.horizontalSpeed.toFixed(2),
        speedPercent: Math.min(
          100,
          Math.round((s.horizontalSpeed / GAME_CONFIG.physics.runSpeed) * 100)
        ),
        grounded: s.isGrounded,
        cameraDist: s.cameraDistance.toFixed(2),
        cameraYawDeg: yawDeg.toFixed(0),
        cameraPitchDeg: pitchDeg.toFixed(0),
        pointerLocked: s.isPointerLocked,
        fps: s.perf.fps,
        avgFrameMs: s.perf.avgFrameTimeMs.toFixed(1),
        p95FrameMs: s.perf.p95FrameTimeMs.toFixed(1),
        drawCalls: s.perf.drawCalls,
        triangles: s.perf.triangles,
        geometriesCount: s.perf.geometriesCount,
        jsHeapMb:
          s.perf.jsHeapUsedMb !== null
            ? `${s.perf.jsHeapUsedMb.toFixed(1)} MB`
            : 'N/A',
        qualityTier: s.perf.adaptiveQualityTier,
        solarAltDeg: sol.altitudeDeg.toFixed(1),
        solarAzDeg: sol.azimuthDeg.toFixed(1),
      });
    }, 100);

    return () => window.clearInterval(interval);
  }, []);

  // ==========================================================================
  // VIRTUAL JOYSTICK POINTER CAPTURE LIFECYCLE HANDLERS
  // ==========================================================================
  const joystickTouchIdRef = useRef<number | null>(null);
  const joystickCenterRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const maxJoystickRadiusPx =
    deviceProfile.formFactor === 'tablet'
      ? GAME_CONFIG.joystick.tabletMaxRadiusPx
      : GAME_CONFIG.joystick.mobileMaxRadiusPx;

  const updateJoystickFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const dx = clientX - joystickCenterRef.current.x;
      const dy = clientY - joystickCenterRef.current.y;
      const { input, thumbOffsetPx } = computeNormalizedJoystickInput(
        dx,
        dy,
        maxJoystickRadiusPx,
        GAME_CONFIG.joystick.deadzone
      );

      joystickInputRef.current = input;
      setJoystickVisual({
        x: thumbOffsetPx.x,
        y: thumbOffsetPx.y,
        active: true,
        magnitude: input.magnitude,
      });
    },
    [maxJoystickRadiusPx]
  );

  const handleJoystickPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    if (lastPointerTypeRef.current !== 'touch') {
      lastPointerTypeRef.current = 'touch';
      setDeviceProfile(evaluateAdaptiveDeviceProfile('touch'));
    }
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore synthetic pointer capture exceptions
    }
    const rect = e.currentTarget.getBoundingClientRect();
    joystickTouchIdRef.current = e.pointerId;
    joystickCenterRef.current = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    updateJoystickFromPointer(e.clientX, e.clientY);
  };

  const handleJoystickPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (joystickTouchIdRef.current !== e.pointerId) return;
    e.stopPropagation();
    e.preventDefault();
    updateJoystickFromPointer(e.clientX, e.clientY);
  };

  const releaseJoystickPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    if (joystickTouchIdRef.current !== e.pointerId) return;
    e.stopPropagation();
    try {
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore if pointer capture already released
    }
    joystickTouchIdRef.current = null;
    joystickInputRef.current = {
      x: 0,
      y: 0,
      magnitude: 0,
      active: false,
    };
    setJoystickVisual({ x: 0, y: 0, active: false, magnitude: 0 });
  };

  // ==========================================================================
  // CORE THREE.JS REAL-TIME 3D WORLD, SOLAR SKY, WEATHER & CHARACTER LOOP
  // ==========================================================================
  useEffect(() => {
    const container = mountContainerRef.current;
    if (!container) return;

    // 1. Scene & Exponential Atmospheric Fog
    const scene = new THREE.Scene();
    const fog = new THREE.FogExp2(0xbae6fd, 0.0055);
    scene.fog = fog;

    // 2. Perspective Camera
    const camera = new THREE.PerspectiveCamera(
      GAME_CONFIG.camera.fov,
      container.clientWidth / container.clientHeight,
      GAME_CONFIG.camera.near,
      GAME_CONFIG.camera.far
    );

    // 3. WebGLRenderer with Safe Initialization, Context Loss Recovery & Soft Shadows
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebglStatus('unsupported');
      return;
    }

    const baseMaxDpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(baseMaxDpr);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.touchAction = 'none';
    renderer.domElement.setAttribute(
      'aria-label',
      'Không gian mô phỏng 3D thành phố Đà Nẵng góc nhìn thứ ba'
    );
    canvasElementRef.current = renderer.domElement;
    container.appendChild(renderer.domElement);

    const onWebglContextLost = (e: Event) => {
      e.preventDefault();
      setWebglStatus('context-lost');
    };
    const onWebglContextRestored = () => {
      setWebglStatus('ok');
    };
    renderer.domElement.addEventListener(
      'webglcontextlost',
      onWebglContextLost,
      false
    );
    renderer.domElement.addEventListener(
      'webglcontextrestored',
      onWebglContextRestored,
      false
    );

    // 4. Dynamic Atmospheric Sky Dome
    const skyUniforms = {
      uTopColor: { value: new THREE.Color(0x1d4ed8) },
      uHorizonColor: { value: new THREE.Color(0xbae6fd) },
      uSunGlowColor: { value: new THREE.Color(0xfde047) },
      uSunDirection: { value: new THREE.Vector3(0.4, 0.8, 0.3).normalize() },
      uTwilightWeight: { value: 0.0 },
    };

    const skyDomeGeo = new THREE.SphereGeometry(225, 32, 24);
    const skyDomeMat = new THREE.ShaderMaterial({
      uniforms: skyUniforms,
      side: THREE.BackSide,
      depthWrite: false,
      vertexShader: `
        varying vec3 vWorldDirection;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldDirection = normalize(position);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform vec3 uTopColor;
        uniform vec3 uHorizonColor;
        uniform vec3 uSunGlowColor;
        uniform vec3 uSunDirection;
        uniform float uTwilightWeight;
        varying vec3 vWorldDirection;
        void main() {
          vec3 dir = normalize(vWorldDirection);
          float h = clamp(dir.y, 0.0, 1.0);
          vec3 baseSky = mix(uHorizonColor, uTopColor, pow(h, 0.55));
          float sunCos = max(dot(dir, normalize(uSunDirection)), 0.0);
          float halo = pow(sunCos, 8.0) * (0.28 + 0.45 * uTwilightWeight);
          float horizonBand = pow(1.0 - h, 4.0) * max(sunCos, 0.15) * uTwilightWeight * 0.65;
          vec3 finalColor = baseSky + uSunGlowColor * (halo + horizonBand);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
    });
    const skyDomeMesh = new THREE.Mesh(skyDomeGeo, skyDomeMat);
    scene.add(skyDomeMesh);

    // 5. Night Starfield
    const starCount = 450;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(0.12 + Math.random() * 0.88);
      const r = 205;
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.cos(phi);
      starPositions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(starPositions, 3)
    );
    const starMat = new THREE.PointsMaterial({
      color: 0xf8fafc,
      size: 1.45,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      fog: false,
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // 6. Celestial Sun Disc & Night Moon Disc
    const sunOrbGeo = new THREE.SphereGeometry(5.5, 20, 20);
    const sunOrbMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      fog: false,
    });
    const sunOrb = new THREE.Mesh(sunOrbGeo, sunOrbMat);
    scene.add(sunOrb);

    const moonOrbGeo = new THREE.SphereGeometry(4.0, 16, 16);
    const moonOrbMat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.0,
      fog: false,
    });
    const moonOrb = new THREE.Mesh(moonOrbGeo, moonOrbMat);
    scene.add(moonOrb);

    // 7. Dynamic Cloud System
    const cloudsGroup = new THREE.Group();
    const cloudGeo = new THREE.DodecahedronGeometry(1, 1);
    const cloudMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.0,
      transparent: true,
      opacity: 0.78,
    });

    const cloudClusters: {
      group: THREE.Group;
      baseX: number;
      baseZ: number;
      baseScale: number;
    }[] = [];

    for (let i = 0; i < 24; i++) {
      const cluster = new THREE.Group();
      const angle = (i / 24) * Math.PI * 2 + (i % 3) * 0.2;
      const dist = 28 + (i % 6) * 24;
      const baseX = Math.cos(angle) * dist;
      const baseZ = Math.sin(angle) * dist;
      cluster.position.set(baseX, 34 + (i % 5) * 4.5, baseZ);

      const puffCount = 4 + (i % 3);
      for (let p = 0; p < puffCount; p++) {
        const puff = new THREE.Mesh(cloudGeo, cloudMat);
        puff.position.set(
          (p - 1.5) * 3.4,
          (p % 2) * 1.1,
          ((p + i) % 2) * 2.1
        );
        puff.scale.set(4.6 + (p % 2) * 1.8, 2.3, 3.8 + (p % 3) * 1.2);
        cluster.add(puff);
      }
      cloudsGroup.add(cluster);
      cloudClusters.push({
        group: cluster,
        baseX,
        baseZ,
        baseScale: 0.85 + (i % 4) * 0.15,
      });
    }
    scene.add(cloudsGroup);

    // 8. Dynamic Rain Particle System
    const maxRainDrops = GAME_CONFIG.maxRainParticles;
    const rainPositions = new Float32Array(maxRainDrops * 6);
    const rainDropMeta: {
      x: number;
      y: number;
      z: number;
      speedMult: number;
    }[] = [];

    for (let i = 0; i < maxRainDrops; i++) {
      const rx = (Math.random() - 0.5) * 52;
      const ry = Math.random() * 26;
      const rz = (Math.random() - 0.5) * 52;
      rainDropMeta.push({
        x: rx,
        y: ry,
        z: rz,
        speedMult: 0.85 + Math.random() * 0.35,
      });
    }

    const rainGeo = new THREE.BufferGeometry();
    rainGeo.setAttribute(
      'position',
      new THREE.BufferAttribute(rainPositions, 3)
    );
    rainGeo.setDrawRange(0, 0);
    const rainMat = new THREE.LineBasicMaterial({
      color: 0xbae6fd,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const rainLines = new THREE.LineSegments(rainGeo, rainMat);
    rainLines.frustumCulled = false;
    scene.add(rainLines);

    // 9. Dynamic Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xdbeafe, 0.38);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0x3f6212, 0.65);
    hemiLight.position.set(0, 60, 0);
    scene.add(hemiLight);

    const mainDirLight = new THREE.DirectionalLight(0xfffbeb, 1.85);
    mainDirLight.position.set(55, 72, 42);
    mainDirLight.castShadow = true;
    mainDirLight.shadow.mapSize.width = 2048;
    mainDirLight.shadow.mapSize.height = 2048;
    mainDirLight.shadow.camera.near = 2;
    mainDirLight.shadow.camera.far = 185;
    const shadowExtent = 44;
    mainDirLight.shadow.camera.left = -shadowExtent;
    mainDirLight.shadow.camera.right = shadowExtent;
    mainDirLight.shadow.camera.top = shadowExtent;
    mainDirLight.shadow.camera.bottom = -shadowExtent;
    mainDirLight.shadow.bias = -0.0005;
    scene.add(mainDirLight);
    scene.add(mainDirLight.target);

    // 10. Sculpted 3D Terrain Mesh
    const terrainSize = 180;
    const terrainSegments = 128;
    const terrainGeo = new THREE.PlaneGeometry(
      terrainSize,
      terrainSize,
      terrainSegments,
      terrainSegments
    );
    terrainGeo.rotateX(-Math.PI / 2);

    const posAttr = terrainGeo.attributes.position;
    const colors: number[] = [];
    const cGrassLight = new THREE.Color(0x4d8b31);
    const cGrassLush = new THREE.Color(0x3b7523);
    const cPathDirt = new THREE.Color(0x948268);
    const cRockSlope = new THREE.Color(0x64748b);
    const tempColor = new THREE.Color();

    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      const vy = getTerrainElevation(vx, vz);
      posAttr.setY(i, vy);

      const pathCenterX = Math.sin(vz * 0.08) * 3.5;
      const distToPath = Math.abs(vx - pathCenterX);
      const distFromOrigin = Math.hypot(vx, vz);

      if (distFromOrigin < 4.5) {
        tempColor.copy(cPathDirt).lerp(cRockSlope, 0.45);
      } else if (distToPath < 2.1 && Math.abs(vz) < 58) {
        const pathBlend = THREE.MathUtils.smoothstep(distToPath, 1.1, 2.1);
        tempColor.copy(cPathDirt).lerp(cGrassLight, pathBlend);
      } else if (vy > 1.35) {
        const rockBlend = THREE.MathUtils.clamp((vy - 1.35) / 1.8, 0, 0.85);
        tempColor.copy(cGrassLush).lerp(cRockSlope, rockBlend);
      } else {
        const noiseMix = (Math.sin(vx * 0.14) * Math.cos(vz * 0.14) + 1) * 0.5;
        tempColor.copy(cGrassLight).lerp(cGrassLush, noiseMix);
      }

      colors.push(tempColor.r, tempColor.g, tempColor.b);
    }

    terrainGeo.setAttribute(
      'color',
      new THREE.Float32BufferAttribute(colors, 3)
    );
    terrainGeo.computeVertexNormals();

    const grassTexture = createOrganicGrassTexture();
    const stoneTexture = createStoneTexture();

    const terrainMat = new THREE.MeshStandardMaterial({
      map: grassTexture,
      vertexColors: true,
      roughness: 0.88,
      metalness: 0.04,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // 11. Origin Compass Plaza & Winding Cobblestone Trail
    const envGroup = new THREE.Group();

    const spawnPlazaGeo = new THREE.CylinderGeometry(3.4, 3.8, 0.12, 32);
    const spawnPlazaMat = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      color: 0x94a3b8,
      roughness: 0.72,
    });
    const spawnPlaza = new THREE.Mesh(spawnPlazaGeo, spawnPlazaMat);
    spawnPlaza.position.set(0, 0.02, 0);
    spawnPlaza.receiveShadow = true;
    envGroup.add(spawnPlaza);

    const spawnRingGeo = new THREE.RingGeometry(2.6, 2.85, 36);
    spawnRingGeo.rotateX(-Math.PI / 2);
    const spawnRingMat = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.4,
    });
    const spawnRing = new THREE.Mesh(spawnRingGeo, spawnRingMat);
    spawnRing.position.set(0, 0.09, 0);
    envGroup.add(spawnRing);

    const stepStoneGeo = new THREE.CylinderGeometry(0.65, 0.72, 0.08, 10);
    const stepStoneMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8,
    });
    for (let z = -48; z <= 48; z += 2.6) {
      if (Math.abs(z) < 4) continue;
      const sx = Math.sin(z * 0.08) * 3.5 + ((z * 13) % 3 - 1) * 0.25;
      const sy = getTerrainElevation(sx, z);
      const stone = new THREE.Mesh(stepStoneGeo, stepStoneMat);
      stone.position.set(sx, sy + 0.03, z);
      stone.rotation.y = z * 0.5;
      stone.scale.set(1.1, 1, 0.85);
      stone.receiveShadow = true;
      stone.castShadow = true;
      envGroup.add(stone);
    }

    // 11.5 Automatic Night Pathway Lanterns
    const lanternPositions: [number, number][] = [
      [-4.2, -3.5],
      [4.2, -3.5],
      [-4.5, -16],
      [3.8, -28],
      [-3.5, 16],
      [4.5, 28],
    ];
    const lanternPostMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
      metalness: 0.5,
    });
    const lanternBulbMat = new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: new THREE.Color(0xf59e0b),
      emissiveIntensity: 0.0,
      roughness: 0.2,
    });
    const lanternLights: THREE.PointLight[] = [];

    lanternPositions.forEach(([lx, lz], idx) => {
      const ly = getTerrainElevation(lx, lz);
      const lanternGroup = new THREE.Group();
      lanternGroup.position.set(lx, ly, lz);

      const post = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.11, 2.8, 10),
        lanternPostMat
      );
      post.position.y = 1.4;
      post.castShadow = true;
      lanternGroup.add(post);

      const cap = new THREE.Mesh(
        new THREE.ConeGeometry(0.32, 0.22, 8),
        lanternPostMat
      );
      cap.position.y = 2.95;
      lanternGroup.add(cap);

      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 12, 12),
        lanternBulbMat
      );
      bulb.position.y = 2.75;
      lanternGroup.add(bulb);

      if (idx < 3) {
        const ptLight = new THREE.PointLight(0xfbbf24, 0, 16, 1.6);
        ptLight.position.set(0, 2.7, 0);
        lanternGroup.add(ptLight);
        lanternLights.push(ptLight);
      }

      envGroup.add(lanternGroup);
    });

    // 12. Stepped Stone Platforms
    PLATFORM_COLLIDERS.forEach((plat) => {
      const height = plat.topY - plat.baseY;
      const pGeo = new THREE.BoxGeometry(plat.width, height, plat.depth);
      const pMat = new THREE.MeshStandardMaterial({
        map: stoneTexture,
        color: plat.color,
        roughness: 0.72,
        metalness: 0.08,
      });
      const pMesh = new THREE.Mesh(pGeo, pMat);
      pMesh.position.set(plat.x, plat.baseY + height / 2, plat.z);
      pMesh.castShadow = true;
      pMesh.receiveShadow = true;
      envGroup.add(pMesh);

      const trimGeo = new THREE.BoxGeometry(
        plat.width + 0.16,
        0.12,
        plat.depth + 0.16
      );
      const trimMat = new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        roughness: 0.6,
      });
      const trimMesh = new THREE.Mesh(trimGeo, trimMat);
      trimMesh.position.set(plat.x, plat.topY - 0.06, plat.z);
      trimMesh.castShadow = true;
      trimMesh.receiveShadow = true;
      envGroup.add(trimMesh);
    });

    // 13. Natural Boulders & Rock Outcrops
    const boulderGeo = new THREE.DodecahedronGeometry(1, 1);
    const boulderMat = new THREE.MeshStandardMaterial({
      map: stoneTexture,
      color: 0x64748b,
      roughness: 0.82,
      metalness: 0.08,
    });

    ROCK_COLLIDERS.forEach((rock, idx) => {
      const groundY = getTerrainElevation(rock.x, rock.z);
      const rockMesh = new THREE.Mesh(boulderGeo, boulderMat);
      rockMesh.position.set(rock.x, groundY + rock.height * 0.42, rock.z);
      rockMesh.scale.set(
        rock.radius * 1.08,
        rock.height * 0.65,
        rock.radius * 0.96
      );
      rockMesh.rotation.set(idx * 0.4, idx * 1.1, idx * 0.3);
      rockMesh.castShadow = true;
      rockMesh.receiveShadow = true;
      envGroup.add(rockMesh);
    });

    // 14. Multi-Species Trees with Wind-Responsive Crown Groups
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.9,
    });
    const pineLeafMat1 = new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.78,
    });
    const pineLeafMat2 = new THREE.MeshStandardMaterial({
      color: 0x40916c,
      roughness: 0.75,
    });
    const oakLeafMat = new THREE.MeshStandardMaterial({
      color: 0x3a7d44,
      roughness: 0.8,
    });

    const treeCrownGroups: {
      crown: THREE.Group;
      phaseOffset: number;
      x: number;
      z: number;
    }[] = [];

    TREE_COLLIDERS.forEach((tree, idx) => {
      const ty = getTerrainElevation(tree.x, tree.z);
      const treeGroup = new THREE.Group();
      treeGroup.position.set(tree.x, ty, tree.z);

      const scale = 0.85 + (idx % 4) * 0.22;
      const trunkGeo = new THREE.CylinderGeometry(
        0.22 * scale,
        0.36 * scale,
        2.4 * scale,
        10
      );
      const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
      trunkMesh.position.y = 1.2 * scale;
      trunkMesh.castShadow = true;
      trunkMesh.receiveShadow = true;
      treeGroup.add(trunkMesh);

      const crownGroup = new THREE.Group();
      crownGroup.position.y = 2.2 * scale;

      if (idx % 3 === 0) {
        const crownGeo = new THREE.IcosahedronGeometry(1.65 * scale, 1);
        const c1 = new THREE.Mesh(crownGeo, oakLeafMat);
        c1.position.set(0, 1.1 * scale, 0);
        c1.castShadow = true;
        c1.receiveShadow = true;
        crownGroup.add(c1);

        const c2 = new THREE.Mesh(crownGeo, pineLeafMat2);
        c2.position.set(0.8 * scale, 0.6 * scale, 0.5 * scale);
        c2.scale.setScalar(0.72);
        c2.castShadow = true;
        crownGroup.add(c2);

        const c3 = new THREE.Mesh(crownGeo, pineLeafMat1);
        c3.position.set(-0.75 * scale, 0.7 * scale, -0.45 * scale);
        c3.scale.setScalar(0.68);
        c3.castShadow = true;
        crownGroup.add(c3);
      } else {
        for (let layer = 0; layer < 3; layer++) {
          const coneRadius = (1.85 - layer * 0.42) * scale;
          const coneHeight = (2.2 - layer * 0.3) * scale;
          const coneGeo = new THREE.ConeGeometry(coneRadius, coneHeight, 9);
          const coneMesh = new THREE.Mesh(
            coneGeo,
            layer % 2 === 0 ? pineLeafMat1 : pineLeafMat2
          );
          coneMesh.position.y = (0.8 + layer * 1.15) * scale;
          coneMesh.castShadow = true;
          coneMesh.receiveShadow = true;
          crownGroup.add(coneMesh);
        }
      }

      treeGroup.add(crownGroup);
      envGroup.add(treeGroup);
      treeCrownGroups.push({
        crown: crownGroup,
        phaseOffset: idx * 0.75,
        x: tree.x,
        z: tree.z,
      });
    });

    // 15. Decorative Shrubs & Bushes
    const bushGeo = new THREE.DodecahedronGeometry(0.55, 1);
    const bushMat = new THREE.MeshStandardMaterial({
      color: 0x4d903e,
      roughness: 0.82,
    });
    for (let i = 0; i < 48; i++) {
      const angle = i * 2.39996;
      const radius = 8 + Math.sqrt(i) * 6.8;
      const bx = Math.cos(angle) * radius;
      const bz = Math.sin(angle) * radius;
      const by = getTerrainElevation(bx, bz);

      const bush = new THREE.Mesh(bushGeo, bushMat);
      const s = 0.7 + (i % 4) * 0.25;
      bush.position.set(bx, by + 0.25 * s, bz);
      bush.scale.set(s * 1.2, s * 0.85, s);
      bush.castShadow = true;
      bush.receiveShadow = true;
      envGroup.add(bush);
    }

    // 15.5 PHASE 10: Build & Register 3 Interactive World Test Fixtures around Origin Plaza
    const registry = interactableRegistryRef.current;
    registry.clear();
    const beaconRingGroups: { id: string; ring: THREE.Mesh }[] = [];
    const blockerMeshes: THREE.Object3D[] = [terrainMesh];

    INITIAL_INTERACTABLE_FIXTURES.forEach((def) => {
      const [fxX, , fxZ] = def.worldPosition;
      const groundY = getTerrainElevation(fxX, fxZ);
      const fixtureGroup = new THREE.Group();
      fixtureGroup.position.set(fxX, groundY, fxZ);
      fixtureGroup.name = def.id;

      const highlightTargets: THREE.Mesh[] = [];

      const baseMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.58, 0.7, 0.28, 16),
        new THREE.MeshStandardMaterial({
          map: stoneTexture,
          color: 0x334155,
          roughness: 0.65,
          metalness: 0.2,
        })
      );
      baseMesh.position.y = 0.14;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      fixtureGroup.add(baseMesh);

      const pillarMat = new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: new THREE.Color(def.accentColorHex),
        emissiveIntensity: 0.16,
        roughness: 0.45,
        metalness: 0.35,
      });
      const pillarMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.32, 0.38, 1.35, 16),
        pillarMat
      );
      pillarMesh.position.y = 0.82;
      pillarMesh.castShadow = true;
      pillarMesh.receiveShadow = true;
      fixtureGroup.add(pillarMesh);
      highlightTargets.push(pillarMesh);

      const coreMat = new THREE.MeshStandardMaterial({
        color: def.accentColorHex,
        emissive: new THREE.Color(def.accentColorHex),
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.4,
      });
      const coreGeo =
        def.type === 'inspect'
          ? new THREE.OctahedronGeometry(0.32, 0)
          : def.type === 'information'
            ? new THREE.BoxGeometry(0.46, 0.46, 0.46)
            : new THREE.SphereGeometry(0.32, 16, 16);
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      coreMesh.position.y = 1.82;
      coreMesh.castShadow = true;
      fixtureGroup.add(coreMesh);
      highlightTargets.push(coreMesh);

      const ringMesh = new THREE.Mesh(
        new THREE.TorusGeometry(0.48, 0.04, 10, 28),
        new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          emissive: new THREE.Color(def.accentColorHex),
          emissiveIntensity: 0.25,
          roughness: 0.3,
          metalness: 0.6,
        })
      );
      ringMesh.position.y = 1.82;
      ringMesh.rotation.x = Math.PI / 3;
      fixtureGroup.add(ringMesh);
      highlightTargets.push(ringMesh);
      beaconRingGroups.push({ id: def.id, ring: ringMesh });

      envGroup.add(fixtureGroup);

      const anchoredDef: InteractableDefinition = {
        ...def,
        worldPosition: [fxX, groundY + 1.2, fxZ],
      };
      registry.register(anchoredDef, fixtureGroup, highlightTargets);
    });

    scene.add(envGroup);

    // 16. Instanced Grass Blades with Real-Time Wind Sway
    const grassCount = 2600;
    const bladeGeo = new THREE.ConeGeometry(0.065, 0.42, 4);
    bladeGeo.translate(0, 0.21, 0);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0x5ca938,
      roughness: 0.75,
    });
    const instancedGrass = new THREE.InstancedMesh(
      bladeGeo,
      bladeMat,
      grassCount
    );
    instancedGrass.receiveShadow = true;

    const grassBaseData: {
      x: number;
      y: number;
      z: number;
      scaleY: number;
      rotY: number;
    }[] = [];
    const dummy = new THREE.Object3D();

    let gIdx = 0;
    for (let i = 0; i < grassCount * 2 && gIdx < grassCount; i++) {
      const r = 4.5 + Math.pow(Math.random(), 0.75) * 58;
      const theta = Math.random() * Math.PI * 2;
      const gx = Math.cos(theta) * r;
      const gz = Math.sin(theta) * r;

      const pathCenterX = Math.sin(gz * 0.08) * 3.5;
      if (Math.abs(gx - pathCenterX) < 2.2) continue;

      const gy = getTerrainElevation(gx, gz);
      const scaleY = 0.75 + Math.random() * 0.85;
      const rotY = Math.random() * Math.PI;

      grassBaseData.push({ x: gx, y: gy, z: gz, scaleY, rotY });
      dummy.position.set(gx, gy, gz);
      dummy.rotation.set(0, rotY, 0);
      dummy.scale.set(1, scaleY, 1);
      dummy.updateMatrix();
      instancedGrass.setMatrixAt(gIdx, dummy.matrix);
      gIdx++;
    }
    instancedGrass.count = gIdx;
    instancedGrass.instanceMatrix.needsUpdate = true;
    scene.add(instancedGrass);

    // 17. Build Main Player 3D Human Character & Footstep Dust Particles
    const characterRig = createCasualExplorerRig();
    scene.add(characterRig.root);

    const dustParticles = createFootstepParticleSystem(scene);

    // 17.5 PHASE 8: ORTHOGRAPHIC MINI MAP CAMERA & ISOLATED TOP-DOWN RENDER PASS
    // Reuses the existing WebGLRenderer (no second WebGLRenderer created) and renders
    // an isolated top-down Orthographic overview of the static 3D world geometry
    // onto the 2D HUD Mini Map canvas without mutating Main Camera or character state.
    const orthoHalf = GAME_CONFIG.miniMap.orthoHalfExtent;
    const miniMapCamera = new THREE.OrthographicCamera(
      -orthoHalf,
      orthoHalf,
      orthoHalf,
      -orthoHalf,
      GAME_CONFIG.miniMap.near,
      GAME_CONFIG.miniMap.far
    );
    miniMapCamera.position.set(0, GAME_CONFIG.miniMap.cameraHeight, 0);
    // Orient top of map to local -Z forward axis, right to +X axis
    miniMapCamera.up.set(0, 0, -1);
    miniMapCamera.lookAt(0, 0, 0);
    miniMapCamera.zoom = miniMapZoomRef.current;
    miniMapCamera.updateProjectionMatrix();

    const savedViewport = new THREE.Vector4();
    const savedScissor = new THREE.Vector4();
    const miniMapCurrentCenter = new THREE.Vector2(0, 0);
    let miniMapNeedsUpdate = true;
    let lastMiniMapRefreshMs = 0;

    const renderMiniMapOverviewPass = (timestampMs: number) => {
      const target2dCanvas = miniMapCanvasRef.current;
      if (!target2dCanvas) return;
      const ctx2d = target2dCanvas.getContext('2d');
      if (!ctx2d) return;

      // Save all Main Scene & Renderer states for strict rendering isolation
      const prevRenderTarget = renderer.getRenderTarget();
      const prevScissorTest = renderer.getScissorTest();
      renderer.getViewport(savedViewport);
      renderer.getScissor(savedScissor);

      const prevFog = scene.fog;
      const prevSkyVisible = skyDomeMesh.visible;
      const prevStarsVisible = starField.visible;
      const prevSunVisible = sunOrb.visible;
      const prevMoonVisible = moonOrb.visible;
      const prevCloudsVisible = cloudsGroup.visible;
      const prevRainVisible = rainLines.visible;
      const prevCharVisible = characterRig.root.visible;
      const prevAmbientIntensity = ambientLight.intensity;
      const prevHemiIntensity = hemiLight.intensity;

      try {
        // Isolate static world geometry (hide character, clouds, rain, sky dome, and fog)
        // Character is hidden during the map pass to prevent duplicate representation with the HUD Player Marker
        scene.fog = null;
        skyDomeMesh.visible = false;
        starField.visible = false;
        sunOrb.visible = false;
        moonOrb.visible = false;
        cloudsGroup.visible = false;
        rainLines.visible = false;
        characterRig.root.visible = false;

        // Ensure clear, readable top-down cartographic illumination even at night
        ambientLight.intensity = Math.max(prevAmbientIntensity, 0.72);
        hemiLight.intensity = Math.max(prevHemiIntensity, 0.85);

        const desiredZoom = clampMiniMapZoom(miniMapZoomRef.current);
        if (Math.abs(miniMapCamera.zoom - desiredZoom) > 0.001) {
          miniMapCamera.zoom = desiredZoom;
          miniMapCamera.updateProjectionMatrix();
        }

        miniMapCamera.position.set(
          miniMapCurrentCenter.x,
          GAME_CONFIG.miniMap.cameraHeight,
          miniMapCurrentCenter.y
        );
        miniMapCamera.lookAt(
          miniMapCurrentCenter.x,
          0,
          miniMapCurrentCenter.y
        );
        miniMapCamera.updateMatrixWorld();

        const mapSize = GAME_CONFIG.miniMap.resolutionPx;
        const canvasWidth = container.clientWidth;
        const canvasHeight = container.clientHeight;

        if (canvasWidth >= 64 && canvasHeight >= 64) {
          const vpSize = Math.min(mapSize, canvasWidth, canvasHeight);
          renderer.setRenderTarget(null);
          renderer.setViewport(0, 0, vpSize, vpSize);
          renderer.setScissor(0, 0, vpSize, vpSize);
          renderer.setScissorTest(true);

          renderer.render(scene, miniMapCamera);

          const dpr = renderer.getPixelRatio();
          const srcPixelSize = Math.floor(vpSize * dpr);
          const glCanvas = renderer.domElement;
          const srcY = Math.max(0, glCanvas.height - srcPixelSize);

          ctx2d.clearRect(0, 0, target2dCanvas.width, target2dCanvas.height);
          ctx2d.drawImage(
            glCanvas,
            0,
            srcY,
            srcPixelSize,
            srcPixelSize,
            0,
            0,
            target2dCanvas.width,
            target2dCanvas.height
          );
        }

        lastMiniMapRefreshMs = timestampMs;
        miniMapNeedsUpdate = false;
      } catch {
        setMiniMapState((prev) =>
          prev.status === 'unavailable'
            ? prev
            : { ...prev, status: 'unavailable' }
        );
      } finally {
        // Restore 100% of Main Scene & Renderer state before the main camera render
        scene.fog = prevFog;
        skyDomeMesh.visible = prevSkyVisible;
        starField.visible = prevStarsVisible;
        sunOrb.visible = prevSunVisible;
        moonOrb.visible = prevMoonVisible;
        cloudsGroup.visible = prevCloudsVisible;
        rainLines.visible = prevRainVisible;
        characterRig.root.visible = prevCharVisible;
        ambientLight.intensity = prevAmbientIntensity;
        hemiLight.intensity = prevHemiIntensity;

        renderer.setRenderTarget(prevRenderTarget);
        renderer.setViewport(savedViewport);
        renderer.setScissor(savedScissor);
        renderer.setScissorTest(prevScissorTest);
      }
    };

    requestMiniMapRenderRef.current = () => {
      miniMapNeedsUpdate = true;
    };

    // 18. Camera Orbit Controls (Desktop Mouse + Mobile Multi-Touch Orbit & Pinch-to-Zoom)
    let isMouseDragging = false;
    let targetCameraDist = GAME_CONFIG.camera.defaultDistance;
    const activeCameraTouches = new Map<number, { x: number; y: number }>();
    let prevPinchDistance: number | null = null;

    const onCanvasClick = (e: MouseEvent) => {
      if (e.button !== 0) return;
      if (lastPointerTypeRef.current === 'touch') return;
      if (isInteractiveInputElement(e.target)) return;
      isGameplayFocusedRef.current = true;
      const dom = renderer.domElement;
      if (document.pointerLockElement !== dom && dom.requestPointerLock) {
        try {
          const p = dom.requestPointerLock() as unknown as
            | Promise<void>
            | undefined;
          if (p && typeof p.catch === 'function') p.catch(() => {});
        } catch {
          // Ignore pointer lock rejection
        }
      }
    };

    const onPointerLockChange = () => {
      playerStateRef.current.isPointerLocked =
        document.pointerLockElement === renderer.domElement;
    };

    const onCanvasPointerDown = (e: PointerEvent) => {
      if (isInteractiveInputElement(e.target)) return;
      isGameplayFocusedRef.current = true;

      if (e.pointerType === 'mouse') {
        if (e.button === 0) {
          isMouseDragging = true;
        }
        return;
      }

      if (e.pointerId === joystickTouchIdRef.current) return;

      try {
        renderer.domElement.setPointerCapture(e.pointerId);
      } catch {
        // Ignore capture errors
      }
      activeCameraTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });

      if (activeCameraTouches.size === 2) {
        const pts = Array.from(activeCameraTouches.values());
        prevPinchDistance = Math.hypot(
          pts[0].x - pts[1].x,
          pts[0].y - pts[1].y
        );
      }
    };

    const onCanvasPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      if (!activeCameraTouches.has(e.pointerId)) return;

      const prevPos = activeCameraTouches.get(e.pointerId)!;
      const dx = e.clientX - prevPos.x;
      const dy = e.clientY - prevPos.y;
      activeCameraTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });

      const s = playerStateRef.current;

      if (activeCameraTouches.size === 1) {
        s.cameraYaw -= dx * GAME_CONFIG.camera.touchSensitivity;
        s.cameraPitch = THREE.MathUtils.clamp(
          s.cameraPitch + dy * GAME_CONFIG.camera.touchSensitivity,
          GAME_CONFIG.camera.minPitch,
          GAME_CONFIG.camera.maxPitch
        );
      } else if (activeCameraTouches.size >= 2) {
        const pts = Array.from(activeCameraTouches.values());
        const newPinchDist = Math.hypot(
          pts[0].x - pts[1].x,
          pts[0].y - pts[1].y
        );
        if (prevPinchDistance !== null) {
          const pinchDelta = prevPinchDistance - newPinchDist;
          targetCameraDist = THREE.MathUtils.clamp(
            targetCameraDist + pinchDelta * 0.025,
            GAME_CONFIG.camera.minDistance,
            GAME_CONFIG.camera.maxDistance
          );
        }
        prevPinchDistance = newPinchDist;
      }
    };

    const releaseCameraTouch = (e: PointerEvent) => {
      if (activeCameraTouches.has(e.pointerId)) {
        activeCameraTouches.delete(e.pointerId);
      }
      if (activeCameraTouches.size < 2) {
        prevPinchDistance = null;
      }
    };

    const onMouseUp = () => {
      isMouseDragging = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      const isLocked = document.pointerLockElement === renderer.domElement;
      if (!isLocked && !isMouseDragging) return;

      const s = playerStateRef.current;
      s.cameraYaw -= e.movementX * GAME_CONFIG.camera.mouseSensitivity;
      s.cameraPitch = THREE.MathUtils.clamp(
        s.cameraPitch + e.movementY * GAME_CONFIG.camera.mouseSensitivity,
        GAME_CONFIG.camera.minPitch,
        GAME_CONFIG.camera.maxPitch
      );
    };

    const onWheel = (e: WheelEvent) => {
      if (isInteractiveInputElement(e.target)) return;
      e.preventDefault();
      const dir = Math.sign(e.deltaY);
      targetCameraDist = THREE.MathUtils.clamp(
        targetCameraDist + dir * GAME_CONFIG.camera.zoomStep,
        GAME_CONFIG.camera.minDistance,
        GAME_CONFIG.camera.maxDistance
      );
    };

    const onWindowResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('click', onCanvasClick);
    domElement.addEventListener('pointerdown', onCanvasPointerDown);
    domElement.addEventListener('pointermove', onCanvasPointerMove);
    domElement.addEventListener('pointerup', releaseCameraTouch);
    domElement.addEventListener('pointercancel', releaseCameraTouch);
    domElement.addEventListener('lostpointercapture', releaseCameraTouch);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    domElement.addEventListener('wheel', onWheel, { passive: false });
    document.addEventListener('pointerlockchange', onPointerLockChange);
    window.addEventListener('resize', onWindowResize);

    // 19. Pre-allocated Math & Color Objects for Zero-GC Render Loop
    const forwardVec = new THREE.Vector3();
    const rightVec = new THREE.Vector3();
    const moveDir = new THREE.Vector3();
    const upAxis = new THREE.Vector3(0, 1, 0);
    const smoothedLookAt = new THREE.Vector3(
      0,
      GAME_CONFIG.camera.lookAtHeightOffset,
      0
    );
    const desiredTarget = new THREE.Vector3();
    const desiredCamPos = new THREE.Vector3();

    const targetTopColor = new THREE.Color();
    const targetHorizonColor = new THREE.Color();
    const targetSunGlowColor = new THREE.Color();
    const targetSunLightColor = new THREE.Color();
    const targetHemiSkyColor = new THREE.Color();
    const targetHemiGroundColor = new THREE.Color();
    const targetFogColor = new THREE.Color();
    const targetCloudColor = new THREE.Color();

    const colorNightTop = new THREE.Color(0x090d16);
    const colorNightHorizon = new THREE.Color(0x1e293b);
    const colorDayTop = new THREE.Color(0x1d4ed8);
    const colorDayHorizon = new THREE.Color(0xbae6fd);
    const colorTwilightTop = new THREE.Color(0x312e81);
    const colorTwilightHorizon = new THREE.Color(0xf97316);
    const colorOvercastGray = new THREE.Color(0x64748b);
    const colorStormSlate = new THREE.Color(0x1e293b);

    const colorMoonlight = new THREE.Color(0x93c5fd);
    const colorNoonSun = new THREE.Color(0xfffbeb);
    const colorGoldenSun = new THREE.Color(0xfdba74);
    const colorHemiNightSky = new THREE.Color(0x1e293b);
    const colorHemiDaySky = new THREE.Color(0xdbeafe);
    const colorHemiTwilightSky = new THREE.Color(0xfed7aa);
    const colorHemiNightGround = new THREE.Color(0x0f172a);
    const colorHemiDayGround = new THREE.Color(0x4d7c0f);
    const colorLightningFlash = new THREE.Color(0xe0f2fe);
    const colorCloudWhite = new THREE.Color(0xffffff);
    const colorCloudDark = new THREE.Color(0x475569);

    const neutralUnavailableEffects: WeatherEffectConfig = {
      cloudCoverFloor: 42,
      cloudDarkness: 0.22,
      sunAttenuation: 0.78,
      fogMultiplier: 1.15,
      rainParticleCount: 0,
      rainFallSpeed: 0,
      groundWetness: 0.0,
      hasLightning: false,
    };

    const animTimers = { cyclePhase: 0, idleTime: 0 };
    let lastTime = performance.now();
    let frameCount = 0;
    let fpsTimer = 0;
    let stepDustTimer = 0;
    let lightningTimer = 6.0;
    let lightningFlashIntensity = 0.0;
    let animationFrameId = 0;
    let grassBatchToggle = 0;

    const frameTimeSamples = new Float32Array(60);
    const sortedFrameScratch = new Float32Array(60);
    let sampleWriteIdx = 0;
    let sampleCount = 0;
    let adaptiveCooldownSec = 0;
    let currentQualityTier: 'ultra' | 'balanced' | 'performance' = 'ultra';
    let rainQualityMultiplier = 1.0;

    // Phase 10 Pre-allocated Raycasters & Vectors (Zero per-frame allocation)
    const interactionRaycaster = new THREE.Raycaster();
    const occlusionRaycaster = new THREE.Raycaster();
    const centerNdc = new THREE.Vector2(0, 0);
    const camForwardVec = new THREE.Vector3();
    const toCandidateVec = new THREE.Vector3();
    let lastInteractionRayMs = 0;
    let prevHighlightedTargetId: string | null = null;

    const dampAngle = (
      current: number,
      target: number,
      lambda: number,
      dt: number
    ) => {
      let delta = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI;
      if (delta < -Math.PI) delta += Math.PI * 2;
      return current + delta * (1 - Math.exp(-lambda * dt));
    };

    // 20. Main Real-Time Game, Solar & Weather Simulation Loop
    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const rawDtMs = now - lastTime;
      const rawDt = rawDtMs / 1000;
      lastTime = now;
      const dt = Math.min(
        Math.max(rawDt, 0.001),
        GAME_CONFIG.physics.maxDeltaTime
      );

      if (rawDtMs > 0 && rawDtMs < 250) {
        frameTimeSamples[sampleWriteIdx] = rawDtMs;
        sampleWriteIdx = (sampleWriteIdx + 1) % 60;
        if (sampleCount < 60) sampleCount++;
      }

      frameCount++;
      fpsTimer += rawDt;
      adaptiveCooldownSec = Math.max(0, adaptiveCooldownSec - rawDt);

      if (fpsTimer >= 0.5) {
        const perf = playerStateRef.current.perf;
        perf.fps = Math.round(frameCount / fpsTimer);

        if (sampleCount > 0) {
          let sum = 0;
          for (let i = 0; i < sampleCount; i++) {
            const v = frameTimeSamples[i];
            sum += v;
            sortedFrameScratch[i] = v;
          }
          perf.avgFrameTimeMs = sum / sampleCount;
          const sub = sortedFrameScratch.subarray(0, sampleCount);
          sub.sort();
          const p95Idx = Math.min(
            sampleCount - 1,
            Math.floor(sampleCount * 0.95)
          );
          perf.p95FrameTimeMs = sub[p95Idx];

          if (adaptiveCooldownSec <= 0 && sampleCount >= 30) {
            if (
              perf.p95FrameTimeMs > 28.0 &&
              currentQualityTier !== 'performance'
            ) {
              currentQualityTier =
                currentQualityTier === 'ultra' ? 'balanced' : 'performance';
              const nextDpr =
                currentQualityTier === 'balanced'
                  ? Math.min(baseMaxDpr, 1.35)
                  : 1.0;
              renderer.setPixelRatio(nextDpr);
              perf.pixelRatioActive = nextDpr;
              perf.adaptiveQualityTier = currentQualityTier;
              rainQualityMultiplier =
                currentQualityTier === 'balanced' ? 0.75 : 0.5;
              adaptiveCooldownSec = 3.5;
            } else if (
              perf.p95FrameTimeMs < 17.5 &&
              currentQualityTier !== 'ultra'
            ) {
              currentQualityTier =
                currentQualityTier === 'performance' ? 'balanced' : 'ultra';
              const nextDpr =
                currentQualityTier === 'ultra'
                  ? baseMaxDpr
                  : Math.min(baseMaxDpr, 1.35);
              renderer.setPixelRatio(nextDpr);
              perf.pixelRatioActive = nextDpr;
              perf.adaptiveQualityTier = currentQualityTier;
              rainQualityMultiplier =
                currentQualityTier === 'ultra' ? 1.0 : 0.75;
              adaptiveCooldownSec = 3.5;
            }
          }
        }

        perf.drawCalls = renderer.info.render.calls;
        perf.triangles = renderer.info.render.triangles;
        perf.geometriesCount = renderer.info.memory.geometries;
        perf.texturesCount = renderer.info.memory.textures;

        const perfWithMem = performance as unknown as {
          memory?: { usedJSHeapSize: number };
        };
        if (perfWithMem.memory?.usedJSHeapSize) {
          perf.jsHeapUsedMb =
            perfWithMem.memory.usedJSHeapSize / (1024 * 1024);
        }

        frameCount = 0;
        fpsTimer = 0;
      }

      const state = playerStateRef.current;
      const kb = keyboardInputRef.current;
      const joy = joystickInputRef.current;
      const touchAct = touchActionRef.current;
      const solar = solarRef.current;
      const weather = weatherRef.current;

      // ======================================================================
      // PART II: DYNAMIC ASTRONOMICAL DAY/NIGHT SKY & LIGHTING INTERPOLATION
      // ======================================================================
      const dayFactor = solar.daylightFactor;
      const twilight = solar.twilightFactor;

      const fx: WeatherEffectConfig =
        weather?.mapped.effects ?? neutralUnavailableEffects;

      const rawCloudCover = weather
        ? weather.cloudCover
        : neutralUnavailableEffects.cloudCoverFloor;
      const effectiveCloudPct = Math.max(rawCloudCover, fx.cloudCoverFloor);
      const cloudRatio = THREE.MathUtils.clamp(effectiveCloudPct / 100, 0, 1);

      targetTopColor
        .copy(colorNightTop)
        .lerp(colorDayTop, dayFactor)
        .lerp(colorTwilightTop, twilight * 0.55)
        .lerp(colorOvercastGray, cloudRatio * dayFactor * 0.65)
        .lerp(colorStormSlate, fx.cloudDarkness * 0.6);

      targetHorizonColor
        .copy(colorNightHorizon)
        .lerp(colorDayHorizon, dayFactor)
        .lerp(colorTwilightHorizon, twilight * 0.72)
        .lerp(colorOvercastGray, cloudRatio * dayFactor * 0.7)
        .lerp(colorStormSlate, fx.cloudDarkness * 0.55);

      targetSunGlowColor.setHex(
        solar.phase === 'DAWN' ? 0xfdba74 : 0xf97316
      );

      const envLerp = 1 - Math.exp(-3.5 * dt);
      skyUniforms.uTopColor.value.lerp(targetTopColor, envLerp);
      skyUniforms.uHorizonColor.value.lerp(targetHorizonColor, envLerp);
      skyUniforms.uSunGlowColor.value.lerp(targetSunGlowColor, envLerp);
      skyUniforms.uSunDirection.value.lerp(solar.sunDirection, envLerp);
      skyUniforms.uTwilightWeight.value = THREE.MathUtils.lerp(
        skyUniforms.uTwilightWeight.value,
        twilight * (1.0 - fx.cloudDarkness * 0.75),
        envLerp
      );

      skyDomeMesh.position.set(state.position.x, 0, state.position.z);
      starField.position.set(state.position.x, 0, state.position.z);

      const nightVisibility = (1.0 - dayFactor) * (1.0 - cloudRatio * 0.85);
      starMat.opacity = THREE.MathUtils.lerp(
        starMat.opacity,
        THREE.MathUtils.clamp(nightVisibility, 0, 0.9),
        envLerp
      );

      const celestialRadius = 185;
      sunOrb.position.set(
        state.position.x + solar.sunDirection.x * celestialRadius,
        solar.sunDirection.y * celestialRadius,
        state.position.z + solar.sunDirection.z * celestialRadius
      );
      sunOrb.visible = solar.altitudeDeg > -3.0 && cloudRatio < 0.92;
      sunOrbMat.color.setHex(twilight > 0.35 ? 0xfb923c : 0xfef08a);

      const moonDirX = -solar.sunDirection.x;
      const moonDirY = Math.max(0.38, -solar.sunDirection.y);
      const moonDirZ = -solar.sunDirection.z;
      moonOrb.position.set(
        state.position.x + moonDirX * celestialRadius,
        moonDirY * celestialRadius,
        state.position.z + moonDirZ * celestialRadius
      );
      moonOrbMat.opacity = THREE.MathUtils.lerp(
        moonOrbMat.opacity,
        (1.0 - dayFactor) * (1.0 - cloudRatio * 0.7),
        envLerp
      );

      const lightDist = 85;
      if (solar.altitudeDeg >= -1.5) {
        const clampedSunY = Math.max(0.14, solar.sunDirection.y);
        mainDirLight.position.set(
          state.position.x + solar.sunDirection.x * lightDist,
          state.position.y + clampedSunY * lightDist,
          state.position.z + solar.sunDirection.z * lightDist
        );
      } else {
        mainDirLight.position.set(
          state.position.x + moonDirX * lightDist,
          state.position.y + moonDirY * lightDist,
          state.position.z + moonDirZ * lightDist
        );
      }
      mainDirLight.target.position.copy(state.position);
      mainDirLight.target.updateMatrixWorld();

      if (fx.hasLightning) {
        lightningTimer -= dt;
        if (lightningTimer <= 0) {
          lightningFlashIntensity = 2.8 + Math.random() * 1.8;
          lightningTimer = 5.5 + Math.random() * 9.0;
        }
      }
      if (lightningFlashIntensity > 0) {
        lightningFlashIntensity = Math.max(
          0,
          lightningFlashIntensity - dt * 11.0
        );
      }

      const baseDayIntensity =
        (0.35 + 1.95 * dayFactor) *
        fx.sunAttenuation *
        (1.0 - cloudRatio * 0.35);
      const nightMoonIntensity = 0.42 * (1.0 - fx.cloudDarkness * 0.5);
      const targetDirIntensity =
        THREE.MathUtils.lerp(nightMoonIntensity, baseDayIntensity, dayFactor) +
        lightningFlashIntensity;

      mainDirLight.intensity = THREE.MathUtils.lerp(
        mainDirLight.intensity,
        targetDirIntensity,
        envLerp
      );

      targetSunLightColor
        .copy(colorMoonlight)
        .lerp(colorNoonSun, dayFactor)
        .lerp(colorGoldenSun, twilight * 0.75);
      mainDirLight.color.lerp(targetSunLightColor, envLerp);

      targetHemiSkyColor
        .copy(colorHemiNightSky)
        .lerp(colorHemiDaySky, dayFactor)
        .lerp(colorHemiTwilightSky, twilight * 0.5)
        .lerp(colorOvercastGray, cloudRatio * 0.5);
      targetHemiGroundColor
        .copy(colorHemiNightGround)
        .lerp(colorHemiDayGround, dayFactor);

      hemiLight.color.lerp(targetHemiSkyColor, envLerp);
      hemiLight.groundColor.lerp(targetHemiGroundColor, envLerp);
      hemiLight.intensity = THREE.MathUtils.lerp(
        hemiLight.intensity,
        0.38 + 0.45 * dayFactor,
        envLerp
      );

      ambientLight.intensity = THREE.MathUtils.lerp(
        ambientLight.intensity,
        0.25 + 0.22 * dayFactor + lightningFlashIntensity * 0.4,
        envLerp
      );

      targetFogColor.copy(skyUniforms.uHorizonColor.value);
      if (lightningFlashIntensity > 0.2) {
        targetFogColor.lerp(colorLightningFlash, 0.5);
      }
      fog.color.lerp(targetFogColor, envLerp);
      scene.background = fog.color;

      const targetFogDensity = 0.0055 * fx.fogMultiplier;
      fog.density = THREE.MathUtils.lerp(
        fog.density,
        targetFogDensity,
        envLerp
      );

      const lanternActiveFactor =
        1.0 - THREE.MathUtils.smoothstep(solar.altitudeDeg, -2.0, 6.0);
      lanternBulbMat.emissiveIntensity = THREE.MathUtils.lerp(
        lanternBulbMat.emissiveIntensity,
        lanternActiveFactor * 2.4,
        envLerp
      );
      lanternLights.forEach((ptLight) => {
        ptLight.intensity = THREE.MathUtils.lerp(
          ptLight.intensity,
          lanternActiveFactor * 2.2,
          envLerp
        );
      });

      const targetTerrainRoughness = THREE.MathUtils.lerp(
        0.88,
        0.32,
        fx.groundWetness
      );
      const targetTerrainMetalness = THREE.MathUtils.lerp(
        0.04,
        0.22,
        fx.groundWetness
      );
      terrainMat.roughness = THREE.MathUtils.lerp(
        terrainMat.roughness,
        targetTerrainRoughness,
        envLerp
      );
      terrainMat.metalness = THREE.MathUtils.lerp(
        terrainMat.metalness,
        targetTerrainMetalness,
        envLerp
      );

      // ======================================================================
      // PART III: REAL-TIME WIND, CLOUDS & RAIN PARTICLE SIMULATION
      // ======================================================================
      const windSpeedKmh = weather ? weather.windSpeed : 10.0;
      const windGustsKmh = weather ? weather.windGusts : 14.0;
      const windDirDeg = weather ? weather.windDirection : 90.0;

      const windTravelRad = ((windDirDeg + 180) * Math.PI) / 180;
      const windDirX = Math.sin(windTravelRad);
      const windDirZ = -Math.cos(windTravelRad);
      const windSpeedMs = windSpeedKmh / 3.6;

      targetCloudColor
        .copy(colorCloudWhite)
        .lerp(colorCloudDark, fx.cloudDarkness)
        .multiplyScalar(0.35 + 0.65 * dayFactor);
      cloudMat.color.lerp(targetCloudColor, envLerp);

      const targetCloudOpacity = THREE.MathUtils.lerp(0.18, 0.92, cloudRatio);
      cloudMat.opacity = THREE.MathUtils.lerp(
        cloudMat.opacity,
        targetCloudOpacity,
        envLerp
      );

      const cloudDriftSpeed = Math.max(0.45, windSpeedMs * 0.45);
      const cloudScaleMultiplier = THREE.MathUtils.lerp(
        0.65,
        1.35,
        cloudRatio
      );

      for (let i = 0; i < cloudClusters.length; i++) {
        const item = cloudClusters[i];
        const cGroup = item.group;
        cGroup.position.x += windDirX * cloudDriftSpeed * dt;
        cGroup.position.z += windDirZ * cloudDriftSpeed * dt;

        if (cGroup.position.x - state.position.x > 130)
          cGroup.position.x -= 260;
        if (cGroup.position.x - state.position.x < -130)
          cGroup.position.x += 260;
        if (cGroup.position.z - state.position.z > 130)
          cGroup.position.z -= 260;
        if (cGroup.position.z - state.position.z < -130)
          cGroup.position.z += 260;

        const desiredScale = item.baseScale * cloudScaleMultiplier;
        cGroup.scale.setScalar(
          THREE.MathUtils.lerp(cGroup.scale.x, desiredScale, envLerp)
        );
      }

      let baseRainCount = fx.rainParticleCount;
      if (
        baseRainCount === 0 &&
        weather &&
        (weather.precipitation > 0 ||
          weather.rain > 0 ||
          weather.showers > 0)
      ) {
        baseRainCount = 1400;
      }
      const activeRainDrops = Math.floor(
        baseRainCount * rainQualityMultiplier
      );

      rainGeo.setDrawRange(0, activeRainDrops * 2);
      if (activeRainDrops > 0) {
        const fallSpeed = fx.rainFallSpeed > 0 ? fx.rainFallSpeed : 18.0;
        const windDriftX = windDirX * windSpeedMs * 0.55;
        const windDriftZ = windDirZ * windSpeedMs * 0.55;
        const streakLen = 0.85;
        const streakTiltX = windDriftX * 0.045;
        const streakTiltZ = windDriftZ * 0.045;

        const posArray = (
          rainGeo.attributes.position as THREE.BufferAttribute
        ).array as Float32Array;

        for (let i = 0; i < activeRainDrops; i++) {
          const drop = rainDropMeta[i];
          drop.y -= fallSpeed * drop.speedMult * dt;
          drop.x += windDriftX * dt;
          drop.z += windDriftZ * dt;

          if (drop.y < 0) {
            drop.y = 24 + Math.random() * 5;
            drop.x = (Math.random() - 0.5) * 52;
            drop.z = (Math.random() - 0.5) * 52;
          }
          if (drop.x > 26) drop.x -= 52;
          if (drop.x < -26) drop.x += 52;
          if (drop.z > 26) drop.z -= 52;
          if (drop.z < -26) drop.z += 52;

          const wx = state.position.x + drop.x;
          const wy = state.position.y + drop.y;
          const wz = state.position.z + drop.z;

          const baseIdx = i * 6;
          posArray[baseIdx] = wx;
          posArray[baseIdx + 1] = wy;
          posArray[baseIdx + 2] = wz;
          posArray[baseIdx + 3] = wx - streakTiltX;
          posArray[baseIdx + 4] = wy - streakLen;
          posArray[baseIdx + 5] = wz - streakTiltZ;
        }
        rainGeo.attributes.position.needsUpdate = true;
      }

      const effectiveWindKmh = windSpeedKmh * 0.7 + windGustsKmh * 0.3;
      const windFreq = 1.6 + Math.min(effectiveWindKmh * 0.06, 2.8);
      const windTime = now * 0.001 * windFreq;
      const treeSwayAmp = THREE.MathUtils.clamp(
        0.015 + effectiveWindKmh * 0.0028,
        0.015,
        0.16
      );
      const grassSwayAmp = THREE.MathUtils.clamp(
        0.08 + effectiveWindKmh * 0.009,
        0.08,
        0.42
      );

      for (let i = 0; i < treeCrownGroups.length; i++) {
        const tc = treeCrownGroups[i];
        const wave =
          Math.sin(windTime + tc.phaseOffset + tc.x * 0.1 + tc.z * 0.1) *
            0.7 +
          0.3;
        tc.crown.rotation.z = -windDirX * treeSwayAmp * wave;
        tc.crown.rotation.x = windDirZ * treeSwayAmp * wave;
      }

      grassBatchToggle = (grassBatchToggle + 1) & 1;
      let grassMatrixMutated = false;
      for (let i = grassBatchToggle; i < grassBaseData.length; i += 2) {
        const g = grassBaseData[i];
        const dx = g.x - state.position.x;
        const dz = g.z - state.position.z;
        if (dx * dx + dz * dz < 1024) {
          const gustWave =
            Math.sin(windTime * 1.4 + g.x * 0.35 + g.z * 0.25) * 0.65 + 0.35;
          const swayX = windDirZ * grassSwayAmp * gustWave;
          const swayZ = -windDirX * grassSwayAmp * gustWave;
          dummy.position.set(g.x, g.y, g.z);
          dummy.rotation.set(swayX, g.rotY, swayZ);
          dummy.scale.set(1, g.scaleY, 1);
          dummy.updateMatrix();
          instancedGrass.setMatrixAt(i, dummy.matrix);
          grassMatrixMutated = true;
        }
      }
      if (grassMatrixMutated) {
        instancedGrass.instanceMatrix.needsUpdate = true;
      }

      // ======================================================================
      // PART IV: PHASE 1 & PHASE 3 CHARACTER CONTROLLER & MOVEMENT PHYSICS
      // ======================================================================
      const { physics, camera: camCfg } = GAME_CONFIG;

      forwardVec.set(0, 0, -1).applyAxisAngle(upAxis, state.cameraYaw);
      rightVec.set(1, 0, 0).applyAxisAngle(upAxis, state.cameraYaw);

      let inputX = 0;
      let inputZ = 0;
      let analogMagnitude = 0;

      const hasKeyboardInput = kb.forward || kb.backward || kb.left || kb.right;
      if (hasKeyboardInput) {
        if (kb.right) inputX += 1;
        if (kb.left) inputX -= 1;
        if (kb.forward) inputZ += 1;
        if (kb.backward) inputZ -= 1;
        analogMagnitude = 1.0;
      } else if (joy.active && joy.magnitude > 0) {
        inputX = joy.x;
        inputZ = joy.y;
        analogMagnitude = THREE.MathUtils.clamp(joy.magnitude, 0, 1);
      }

      moveDir.set(0, 0, 0);
      if (Math.abs(inputX) > 0.001 || Math.abs(inputZ) > 0.001) {
        moveDir.addScaledVector(forwardVec, inputZ);
        moveDir.addScaledVector(rightVec, inputX);
      }

      const hasMoveInput = moveDir.lengthSq() > 0.0004;
      if (hasMoveInput) {
        moveDir.normalize();
      }

      const isSprinting =
        kb.sprint || touchAct.sprint || touchAct.sprintLatched;
      const isJumping = kb.jump || touchAct.jump;

      const maxTargetSpeed = isSprinting ? physics.runSpeed : physics.walkSpeed;
      const targetSpeed = hasMoveInput ? maxTargetSpeed * analogMagnitude : 0;

      const targetVelX = moveDir.x * targetSpeed;
      const targetVelZ = moveDir.z * targetSpeed;

      const accelRate = hasMoveInput
        ? physics.acceleration
        : physics.deceleration;
      const effectiveAccel = state.isGrounded
        ? accelRate
        : accelRate * physics.airControlMultiplier;

      const velLerp = 1 - Math.exp(-effectiveAccel * dt);
      state.velocity.x = THREE.MathUtils.lerp(
        state.velocity.x,
        targetVelX,
        velLerp
      );
      state.velocity.z = THREE.MathUtils.lerp(
        state.velocity.z,
        targetVelZ,
        velLerp
      );

      if (
        !hasMoveInput &&
        state.velocity.x * state.velocity.x +
          state.velocity.z * state.velocity.z <
          0.0008
      ) {
        state.velocity.x = 0;
        state.velocity.z = 0;
      }

      state.horizontalSpeed = Math.hypot(state.velocity.x, state.velocity.z);

      if (hasMoveInput) {
        const desiredRotY = Math.atan2(moveDir.x, moveDir.z);
        state.rotationY = dampAngle(
          state.rotationY,
          desiredRotY,
          physics.rotationSmoothing,
          dt
        );
      }

      const wasGrounded = state.isGrounded;
      if (isJumping && state.isGrounded) {
        state.velocity.y = physics.jumpVelocity;
        state.isGrounded = false;
        state.landingTimer = 0;
      }

      if (!state.isGrounded) {
        state.velocity.y += physics.gravity * dt;
      }

      const prevY = state.position.y;
      let nextX = state.position.x + state.velocity.x * dt;
      let nextZ = state.position.z + state.velocity.z * dt;
      let nextY = state.position.y + state.velocity.y * dt;

      const resolvedXZ = resolveHorizontalCollisions(
        nextX,
        nextZ,
        nextY,
        physics.playerRadius
      );
      nextX = resolvedXZ.x;
      nextZ = resolvedXZ.z;

      const distFromCenter = Math.hypot(nextX, nextZ);
      if (distFromCenter > GAME_CONFIG.worldBoundaryRadius) {
        const clampScale = GAME_CONFIG.worldBoundaryRadius / distFromCenter;
        nextX *= clampScale;
        nextZ *= clampScale;
      }

      const surfaceY = getSupportSurfaceHeight(
        nextX,
        nextZ,
        prevY,
        physics.playerRadius
      );
      state.surfaceHeight = surfaceY;

      if (
        nextY <= surfaceY + 0.04 &&
        state.velocity.y <= 0 &&
        prevY >= surfaceY - 0.55
      ) {
        nextY = surfaceY;
        if (!wasGrounded && state.velocity.y < -3.2) {
          state.landingTimer = physics.landingDuration;
          dustParticles.spawnBurst(nextX, surfaceY, nextZ, 6);
        }
        state.velocity.y = 0;
        state.isGrounded = true;
      } else if (nextY < getTerrainElevation(nextX, nextZ)) {
        nextY = getTerrainElevation(nextX, nextZ);
        state.velocity.y = 0;
        state.isGrounded = true;
      } else {
        state.isGrounded = false;
      }

      state.position.set(nextX, nextY, nextZ);

      if (!state.isGrounded) {
        state.animationState = state.velocity.y > 0.6 ? 'JUMP' : 'FALL';
      } else if (state.landingTimer > 0) {
        state.landingTimer = Math.max(0, state.landingTimer - dt);
        if (
          hasMoveInput &&
          state.horizontalSpeed > physics.walkSpeedThreshold * 1.6
        ) {
          state.landingTimer = 0;
          state.animationState =
            state.horizontalSpeed >= physics.runSpeedThreshold ? 'RUN' : 'WALK';
        } else {
          state.animationState = 'LANDING';
        }
      } else if (state.horizontalSpeed > physics.walkSpeedThreshold) {
        state.animationState =
          state.horizontalSpeed >= physics.runSpeedThreshold ? 'RUN' : 'WALK';
      } else {
        state.animationState = 'IDLE';
      }

      if (state.isGrounded && state.horizontalSpeed > 2.2) {
        stepDustTimer += dt * (state.animationState === 'RUN' ? 2.2 : 1.2);
        if (stepDustTimer >= 0.36) {
          stepDustTimer = 0;
          dustParticles.spawnBurst(
            state.position.x,
            state.position.y,
            state.position.z,
            state.animationState === 'RUN' ? 3 : 1
          );
        }
      }

      updateHumanoidAnimation(characterRig, state, animTimers, dt);
      characterRig.root.position.copy(state.position);
      characterRig.root.rotation.y = state.rotationY;
      dustParticles.update(dt);

      // ======================================================================
      // PART V: THIRD-PERSON CAMERA SMOOTHING & GROUND CLEARANCE
      // ======================================================================
      const zoomLerp = 1 - Math.exp(-camCfg.zoomSmoothing * dt);
      state.cameraDistance = THREE.MathUtils.lerp(
        state.cameraDistance,
        targetCameraDist,
        zoomLerp
      );

      desiredTarget.set(
        state.position.x,
        state.position.y + camCfg.lookAtHeightOffset,
        state.position.z
      );
      const followLerp = 1 - Math.exp(-camCfg.followSmoothing * dt);
      smoothedLookAt.lerp(desiredTarget, followLerp);

      const hDist = state.cameraDistance * Math.cos(state.cameraPitch);
      const vDist = state.cameraDistance * Math.sin(state.cameraPitch);

      desiredCamPos.set(
        smoothedLookAt.x + Math.sin(state.cameraYaw) * hDist,
        smoothedLookAt.y + vDist,
        smoothedLookAt.z + Math.cos(state.cameraYaw) * hDist
      );

      const camGroundY =
        getTerrainElevation(desiredCamPos.x, desiredCamPos.z) +
        camCfg.groundClearance;
      if (desiredCamPos.y < camGroundY) {
        desiredCamPos.y = camGroundY;
      }

      camera.position.lerp(desiredCamPos, followLerp);
      camera.lookAt(smoothedLookAt);

      // ======================================================================
      // PART V-B: PHASE 10 WORLD INTERACTION RAYCASTING & HIGHLIGHT (20Hz)
      // ======================================================================
      for (let i = 0; i < beaconRingGroups.length; i++) {
        const b = beaconRingGroups[i];
        const entry = registry.get(b.id);
        const speedMult = entry?.isActivated ? 3.4 : 1.0;
        b.ring.rotation.z += dt * 1.1 * speedMult;
        b.ring.rotation.y += dt * 0.7 * speedMult;
      }

      if (now - lastInteractionRayMs >= GAME_CONFIG.interaction.raycastIntervalMs) {
        lastInteractionRayMs = now;
        const candidateMeshes = registry.getCandidateMeshes();
        interactionRaycaster.setFromCamera(centerNdc, camera);
        interactionRaycaster.near = 0.2;
        interactionRaycaster.far = GAME_CONFIG.interaction.maxDetectionDistance;

        const hits = interactionRaycaster.intersectObjects(candidateMeshes, false);
        let bestEntry: RegisteredInteractableEntry | undefined;

        if (hits.length > 0) {
          const hitId = hits[0].object.userData?.interactableId as string | undefined;
          if (hitId) {
            bestEntry = registry.get(hitId);
          }
        }

        if (!bestEntry) {
          camera.getWorldDirection(camForwardVec);
          let bestConeScore = 0.94;
          const allEntries = registry.getAll();
          for (let i = 0; i < allEntries.length; i++) {
            const candidate = allEntries[i];
            if (!candidate.definition.enabled) continue;
            toCandidateVec.copy(candidate.worldAnchor).sub(camera.position);
            const camDist = toCandidateVec.length();
            if (camDist > GAME_CONFIG.interaction.maxDetectionDistance || camDist < 0.2) {
              continue;
            }
            toCandidateVec.divideScalar(camDist);
            const align = camForwardVec.dot(toCandidateVec);
            if (align > bestConeScore) {
              bestConeScore = align;
              bestEntry = candidate;
            }
          }
        }

        let nextTargetId: string | null = null;
        let nextStatus: InteractionEligibilityStatus = 'idle';
        let nextDist = Infinity;
        let nextDef: InteractableDefinition | null = null;
        let nextIsActivated = false;
        let nextCount = 0;

        if (bestEntry) {
          toCandidateVec.copy(bestEntry.worldAnchor).sub(camera.position);
          const distCamToAnchor = toCandidateVec.length();
          let isOccluded = false;
          if (distCamToAnchor > 0.3 && blockerMeshes.length > 0) {
            occlusionRaycaster.set(
              camera.position,
              toCandidateVec.normalize()
            );
            occlusionRaycaster.near = 0.2;
            occlusionRaycaster.far = Math.max(0.25, distCamToAnchor - 0.55);
            const blockerHits = occlusionRaycaster.intersectObjects(
              blockerMeshes,
              false
            );
            if (blockerHits.length > 0) {
              isOccluded = true;
            }
          }

          const evalRes = evaluateInteractionDistanceAndEligibility(
            characterRig.root.position,
            bestEntry,
            isOccluded
          );

          nextTargetId = bestEntry.definition.id;
          nextStatus = evalRes.status;
          nextDist = evalRes.distanceMeters;
          nextDef = bestEntry.definition;
          nextIsActivated = bestEntry.isActivated;
          nextCount = bestEntry.interactionCount;
        }

        if (
          prevHighlightedTargetId !== nextTargetId ||
          activeTargetStateRef.current.status !== nextStatus
        ) {
          registry.applyHighlight(nextTargetId, nextStatus);
          prevHighlightedTargetId = nextTargetId;
        }

        const prev = activeTargetStateRef.current;
        const distChanged =
          Number.isFinite(nextDist) &&
          Math.abs((prev.distanceMeters || 0) - nextDist) >= 0.15;

        if (
          prev.targetId !== nextTargetId ||
          prev.status !== nextStatus ||
          prev.isActivated !== nextIsActivated ||
          distChanged
        ) {
          const updated: ActiveInteractionTargetState = {
            targetId: nextTargetId,
            status: nextStatus,
            distanceMeters: nextDist,
            definition: nextDef,
            isActivated: nextIsActivated,
            interactionCount: nextCount,
          };
          activeTargetStateRef.current = updated;
          setActiveTargetState(updated);
        }
      }

      // ======================================================================
      // PART VI: PHASE 8 & PHASE 9 MINI MAP CAMERA FOLLOW & PLAYER MARKER SYNC
      // ======================================================================
      const isFollowActive = miniMapFollowModeRef.current === 'follow';
      const targetMapCenterX = isFollowActive ? state.position.x : 0;
      const targetMapCenterZ = isFollowActive ? state.position.z : 0;

      const mapFollowLerp =
        1 - Math.exp(-GAME_CONFIG.miniMap.followSmoothing * dt);
      const prevMapCenterX = miniMapCurrentCenter.x;
      const prevMapCenterZ = miniMapCurrentCenter.y;

      miniMapCurrentCenter.x = THREE.MathUtils.lerp(
        miniMapCurrentCenter.x,
        targetMapCenterX,
        mapFollowLerp
      );
      miniMapCurrentCenter.y = THREE.MathUtils.lerp(
        miniMapCurrentCenter.y,
        targetMapCenterZ,
        mapFollowLerp
      );

      const mapCenterMoved =
        Math.hypot(
          miniMapCurrentCenter.x - prevMapCenterX,
          miniMapCurrentCenter.y - prevMapCenterZ
        ) > 0.04;

      // Refresh Mini Map WebGL texture when zoom/mode changes, when map camera pans in Follow Mode (~20Hz),
      // or every 2.5 seconds in Static Overview mode to reflect solar lighting shifts.
      const refreshIntervalMs =
        isFollowActive || mapCenterMoved ? 50 : 2500;
      if (miniMapNeedsUpdate || now - lastMiniMapRefreshMs >= refreshIntervalMs) {
        renderMiniMapOverviewPass(now);
        setMiniMapState((prev) =>
          prev.status === 'ready'
            ? prev
            : { ...prev, status: 'ready', lastRenderTimeMs: now }
        );
      } else {
        // Keep miniMapCamera matrix updated for accurate per-frame player marker projection
        miniMapCamera.position.set(
          miniMapCurrentCenter.x,
          GAME_CONFIG.miniMap.cameraHeight,
          miniMapCurrentCenter.y
        );
        miniMapCamera.lookAt(
          miniMapCurrentCenter.x,
          0,
          miniMapCurrentCenter.y
        );
        miniMapCamera.updateMatrixWorld();
      }

      // Imperatively synchronize Player Marker position & direction at 60Hz (Zero React re-renders)
      const markerEl = miniMapMarkerDomRef.current;
      if (markerEl) {
        const proj = projectWorldToMiniMap(
          characterRig.root.position.x,
          characterRig.root.position.z,
          characterRig.root.rotation.y,
          miniMapCurrentCenter.x,
          miniMapCurrentCenter.y,
          miniMapZoomRef.current,
          GAME_CONFIG.miniMap.orthoHalfExtent,
          miniMapCamera
        );

        markerEl.style.left = `${(proj.clampedU * 100).toFixed(2)}%`;
        markerEl.style.top = `${(proj.clampedV * 100).toFixed(2)}%`;

        if (miniMapConeDomRef.current) {
          miniMapConeDomRef.current.style.transform = `rotate(${proj.screenRotationDeg.toFixed(
            1
          )}deg)`;
        }
        if (miniMapEdgeBadgeDomRef.current) {
          miniMapEdgeBadgeDomRef.current.style.display = proj.isOutOfBounds
            ? 'inline-block'
            : 'none';
        }
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // 21. Full WebGL & Event Listener Cleanup on Unmount
    return () => {
      requestMiniMapRenderRef.current = null;
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('click', onCanvasClick);
      domElement.removeEventListener('pointerdown', onCanvasPointerDown);
      domElement.removeEventListener('pointermove', onCanvasPointerMove);
      domElement.removeEventListener('pointerup', releaseCameraTouch);
      domElement.removeEventListener('pointercancel', releaseCameraTouch);
      domElement.removeEventListener('lostpointercapture', releaseCameraTouch);
      domElement.removeEventListener('webglcontextlost', onWebglContextLost);
      domElement.removeEventListener('webglcontextrestored', onWebglContextRestored);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      domElement.removeEventListener('wheel', onWheel);
      document.removeEventListener('pointerlockchange', onPointerLockChange);
      window.removeEventListener('resize', onWindowResize);
      registry.clear();

      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) {
          mesh.geometry.dispose();
        }
        if (mesh.material) {
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }
      });
      grassTexture.dispose();
      stoneTexture.dispose();
      renderer.dispose();
      if (domElement.parentNode === container) {
        container.removeChild(domElement);
      }
    };
  }, []);

  const isCompactMobile = deviceProfile.formFactor === 'mobile';

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[var(--color-background)] font-sans select-none">
      <SeoAndDesignTokenManager />

      {/* PHASE 10: CONTEXTUAL WORLD INTERACTION PROMPT, RETICLE & INSPECT DIALOG */}
      <ContextualInteractionOverlay
        targetState={activeTargetState}
        deviceProfile={deviceProfile}
        onTriggerInteraction={executeTargetInteraction}
        contextualPanelItem={contextualPanelItem}
        onCloseContextualPanel={() => setContextualPanelItem(null)}
        actionFeedback={actionFeedback}
        syncSnapshot={syncTimeSolar}
        weather={weatherState}
      />

      {/* Crawlable Semantic Summary for Search Engines & Screen Readers */}
      <article className="sr-only">
        <h1>Da Nang 3D Open World Simulation — Phase 6 Collapsible Information Panels &amp; Mini Data Chips</h1>
        <p>
          Ứng dụng mô phỏng không gian 3D tương tác tại thành phố Đà Nẵng, Việt Nam
          ({DA_NANG_CONFIG.latitude}°N, {DA_NANG_CONFIG.longitude}°E) theo múi giờ{' '}
          {DA_NANG_CONFIG.timezone} (GMT+7), tích hợp nhân vật 3D góc nhìn thứ ba,
          hệ thống tính toán vị trí mặt trời thiên văn, thời tiết trực tiếp từ
          Open-Meteo và kiến trúc HUD thu gọn dạng Mini Data Chips.
        </p>
      </article>

      {/* WebGL Unsupported or Context Lost Recovery Banner */}
      {webglStatus !== 'ok' && (
        <div
          role="alert"
          style={{ zIndex: 'var(--z-critical)' }}
          className="fixed inset-0 flex items-center justify-center bg-slate-950/90 p-6 text-center"
        >
          <div className="ds-surface-card max-w-md p-6 space-y-3">
            <AlertTriangle className="h-8 w-8 text-amber-400 mx-auto" aria-hidden="true" />
            <h2 className="text-base font-bold text-white">
              {webglStatus === 'context-lost'
                ? 'Ngữ cảnh đồ họa WebGL tạm thời bị gián đoạn'
                : 'Trình duyệt không hỗ trợ WebGL 3D'}
            </h2>
            <p className="text-xs text-slate-300">
              Hệ thống đang tự động khôi phục ngữ cảnh kết xuất 3D hoặc bạn có thể đặt lại vị trí nhân vật.
            </p>
          </div>
        </div>
      )}

      {/* 1. MAIN 3D WORLD VIEWPORT */}
      <div
        ref={mountContainerRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 'var(--z-canvas)' }}
      />

      {/* 2. PERSISTENT HUD OVERLAY LAYER */}
      <div
        style={{ zIndex: 'var(--z-hud)' }}
        className="absolute inset-0 pointer-events-none flex flex-col justify-between p-[var(--space-3)] sm:p-[var(--space-4)]"
      >
        {/* TOP ROW: TopLeftZone (MiniMapSlot & World Actions) + Secondary Collapsible Panels + TopRightZone (StatusWidgetSlot) */}
        <header className="flex flex-wrap items-start justify-between gap-[var(--space-3)]">
          {/* TOP-LEFT ZONE: Phase 8 & 9 Mini Map Real-Time Player Sync, Auxiliary Actions & Collapsible World Environment Panel */}
          <div className="flex flex-col gap-[var(--space-2)]">
            <TopLeftMiniMapSlot
              deviceProfile={deviceProfile}
              miniMapCanvasRef={miniMapCanvasRef}
              miniMapMarkerDomRef={miniMapMarkerDomRef}
              miniMapConeDomRef={miniMapConeDomRef}
              miniMapEdgeBadgeDomRef={miniMapEdgeBadgeDomRef}
              miniMapState={miniMapState}
              displayMode={hudPanels.miniMap}
              onToggleDisplayMode={toggleMiniMapDisplayMode}
              onToggleFollowMode={handleToggleMiniMapFollow}
              onZoomIn={handleMiniMapZoomIn}
              onZoomOut={handleMiniMapZoomOut}
              onResetZoom={handleMiniMapResetZoom}
              playerCoordsText={`${telemetry.posX}m, ${telemetry.posZ}m`}
              phase9Extension={{
                playerWorldPosition: {
                  x: Number(telemetry.posX) || 0,
                  y: Number(telemetry.posY) || 0,
                  z: Number(telemetry.posZ) || 0,
                },
                playerRotationYRad: playerStateRef.current.rotationY,
                followPlayer: miniMapState.followMode === 'follow',
              }}
              onResetPlayer={handleResetPlayer}
              environmentPanelMode={hudPanels.environmentPanel}
              onToggleEnvironmentPanel={() => setEnvironmentPanelMode()}
              secondaryInfoMode={hudPanels.secondaryInfo}
              onCycleSecondaryInfo={() => cycleSecondaryInfoMode()}
              showSpecsModal={showSystemInfoModal}
              onOpenSpecsModal={() => setShowSystemInfoModal(true)}
              isFullscreen={isFullscreen}
              onToggleFullscreen={handleToggleFullscreen}
            />

            {/* PHASE 6 SECONDARY PANEL #1: WORLD & SPATIAL ENVIRONMENT PANEL (Expanded / Compact Mini Data Chips / Hidden) */}
            {hudPanels.environmentPanel === 'compact' && (
              <section
                aria-label="Thông tin nhanh Môi trường và Tọa độ (Mini Data Chips)"
                data-hud-zone="environment-info-chips"
                data-panel-mode="compact"
                data-hud-interactive="true"
                className="pointer-events-auto flex flex-wrap items-center gap-1.5 max-w-[min(92vw,340px)] transition-all"
              >
                <MiniDataChip
                  variant="metric"
                  tone="info"
                  icon={<MapPin className="h-3 w-3" />}
                  label="Elevation"
                  value={telemetry.surfaceY}
                  unit="m"
                  onExpand={() => setEnvironmentPanelMode('expanded')}
                  expandLabel="Mở rộng bảng thông tin Môi trường và Địa hình"
                />
                <MiniDataChip
                  variant="metric"
                  tone="neutral"
                  icon={<Sun className="h-3 w-3" />}
                  label="Solar Alt"
                  value={telemetry.solarAltDeg}
                  unit="°"
                  onExpand={() => setEnvironmentPanelMode('expanded')}
                  expandLabel="Mở rộng bảng thông tin Góc Mặt Trời"
                />
                <button
                  type="button"
                  onClick={() => setEnvironmentPanelMode('hidden')}
                  aria-label="Ẩn nhóm chip Môi trường (Có thể mở lại từ thanh công cụ World Env)"
                  title="Ẩn thông tin Môi trường"
                  className="ds-btn !p-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-400 hover:text-white"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </section>
            )}

            {hudPanels.environmentPanel === 'expanded' && (
              <section
                aria-label="Bảng chi tiết Môi trường và Địa hình 3D"
                data-hud-zone="environment-info-panel"
                data-panel-mode="expanded"
                data-hud-interactive="true"
                className="pointer-events-auto ds-surface-card w-64 sm:w-72 p-[var(--space-3)] text-xs select-text space-y-[var(--space-2)] transition-all"
              >
                <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-1.5">
                  <span className="flex items-center gap-1.5 font-bold tracking-wider text-emerald-300 text-[11px]">
                    <MapIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>WORLD &amp; TERRAIN TELEMETRY</span>
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setEnvironmentPanelMode('compact')}
                      aria-label="Thu nhỏ bảng Môi trường thành Mini Data Chips"
                      title="Thu nhỏ thành Mini Data Chips"
                      className="ds-btn !p-1 bg-slate-800/85 text-slate-300 hover:text-white"
                    >
                      <ChevronUp className="h-3 w-3 text-sky-300" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setEnvironmentPanelMode('hidden')}
                      aria-label="Ẩn bảng Môi trường (Khôi phục bằng nút World Env)"
                      title="Ẩn bảng (Phím E)"
                      className="ds-btn !p-1 bg-slate-800/85 text-slate-300 hover:text-white"
                    >
                      <X className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                  <div className="ds-surface-elevated px-2.5 py-1.5">
                    <div className="text-[10px] text-[var(--color-text-muted)]">
                      Coordinates (X, Z)
                    </div>
                    <div className="font-semibold text-white">
                      {telemetry.posX}, {telemetry.posZ}
                    </div>
                  </div>
                  <div className="ds-surface-elevated px-2.5 py-1.5">
                    <div className="text-[10px] text-[var(--color-text-muted)]">
                      Terrain Elevation
                    </div>
                    <div className="font-semibold text-emerald-300">
                      {telemetry.surfaceY} m
                    </div>
                  </div>
                  <div className="ds-surface-elevated px-2.5 py-1.5">
                    <div className="text-[10px] text-[var(--color-text-muted)]">
                      Solar Alt / Azimuth
                    </div>
                    <div className="font-semibold text-amber-300">
                      {telemetry.solarAltDeg}° / {telemetry.solarAzDeg}°
                    </div>
                  </div>
                  <div className="ds-surface-elevated px-2.5 py-1.5">
                    <div className="text-[10px] text-[var(--color-text-muted)]">
                      Camera Distance
                    </div>
                    <div className="font-semibold text-sky-300">
                      {telemetry.cameraDist} m ({telemetry.cameraYawDeg}°)
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* PHASE 6 SECONDARY PANEL #2: SYSTEM PERFORMANCE & DIAGNOSTICS LAYER (Expanded / Compact Mini Data Chips / Hidden) */}
          {hudPanels.secondaryInfo === 'compact' && (
            <section
              aria-label="Thông tin nhanh Hiệu năng và Chẩn đoán hệ thống (Mini Data Chips)"
              data-hud-zone="secondary-info-chips"
              data-panel-mode="compact"
              data-hud-interactive="true"
              className="pointer-events-auto flex flex-wrap items-center gap-1.5 order-3 lg:order-2 transition-all"
            >
              <MiniDataChip
                variant="metric"
                tone={
                  telemetry.fps >= 50
                    ? 'success'
                    : telemetry.fps >= 30
                      ? 'warning'
                      : 'danger'
                }
                statusDot={
                  telemetry.fps >= 50
                    ? 'online'
                    : telemetry.fps >= 30
                      ? 'warning'
                      : 'offline'
                }
                label="FPS"
                value={telemetry.fps}
                onExpand={() => cycleSecondaryInfoMode('expanded')}
                expandLabel="Mở rộng bảng Debug Telemetry chi tiết"
              />
              <MiniDataChip
                variant="metric"
                tone="neutral"
                icon={<Gauge className="h-3 w-3" />}
                label="Frame"
                value={telemetry.avgFrameMs}
                unit="ms"
                onExpand={() => cycleSecondaryInfoMode('expanded')}
                expandLabel="Mở rộng bảng thời gian dựng hình"
              />
              <MiniDataChip
                variant="status"
                tone="info"
                icon={<ShieldCheck className="h-3 w-3" />}
                label="Checks"
                value={`${diagnosticsResults.filter((d) => d.passed).length}/${diagnosticsResults.length}`}
                onExpand={() => cycleSecondaryInfoMode('expanded')}
                expandLabel="Mở rộng kết quả tự kiểm tra hệ thống"
              />
              <button
                type="button"
                onClick={() => cycleSecondaryInfoMode('hidden')}
                aria-label="Ẩn nhóm chip Debug Telemetry (Khôi phục bằng nút Debug hoặc phím F3)"
                title="Ẩn chip Debug (F3)"
                className="ds-btn !p-1 rounded-full bg-slate-900/80 border border-slate-700/70 text-slate-400 hover:text-white"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </section>
          )}

          {hudPanels.secondaryInfo === 'expanded' && (
            <section
              aria-label="Bảng thông tin phụ Debug và Telemetry"
              data-hud-zone="secondary-info"
              data-panel-mode="expanded"
              data-hud-interactive="true"
              className="pointer-events-auto ds-surface-card w-72 sm:w-80 p-[var(--space-3)] text-xs select-text space-y-[var(--space-2)] max-h-[46vh] overflow-y-auto order-3 lg:order-2 transition-all"
            >
              <div className="flex items-center justify-between border-b border-[var(--color-border-subtle)] pb-1.5">
                <span className="flex items-center gap-1.5 font-bold tracking-wider text-[var(--color-text-secondary)]">
                  <Gauge className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                  DEBUG TELEMETRY (F3)
                </span>
                <div className="flex items-center gap-1">
                  <DsBadge
                    tone={
                      telemetry.fps >= 50
                        ? 'success'
                        : telemetry.fps >= 30
                          ? 'warning'
                          : 'danger'
                    }
                  >
                    {telemetry.fps} FPS
                  </DsBadge>
                  <button
                    type="button"
                    onClick={() => cycleSecondaryInfoMode('compact')}
                    title="Thu nhỏ thành Mini Data Chips"
                    aria-label="Thu nhỏ bảng Debug thành Mini Data Chips"
                    className="ds-btn !p-1 bg-slate-800/80 text-slate-300 hover:text-white"
                  >
                    <ChevronUp className="h-3 w-3 text-sky-300" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => cycleSecondaryInfoMode('hidden')}
                    title="Ẩn bảng Debug (F3)"
                    aria-label="Ẩn bảng Debug (F3)"
                    className="ds-btn !p-1 bg-slate-800/80 text-slate-300 hover:text-white"
                  >
                    <X className="h-3 w-3" aria-hidden="true" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <div className="ds-surface-elevated px-2.5 py-1.5">
                  <div className="text-[10px] text-[var(--color-text-muted)]">
                    Frame Avg / P95
                  </div>
                  <div className="font-semibold text-white">
                    {telemetry.avgFrameMs} / {telemetry.p95FrameMs} ms
                  </div>
                </div>
                <div className="ds-surface-elevated px-2.5 py-1.5">
                  <div className="text-[10px] text-[var(--color-text-muted)]">
                    Draw Calls / Tris
                  </div>
                  <div className="font-semibold text-sky-300">
                    {telemetry.drawCalls} / {(telemetry.triangles / 1000).toFixed(1)}k
                  </div>
                </div>
                <div className="ds-surface-elevated px-2.5 py-1.5">
                  <div className="text-[10px] text-[var(--color-text-muted)]">
                    Player Pos (X,Y,Z)
                  </div>
                  <div className="font-semibold text-slate-200">
                    {telemetry.posX}, {telemetry.posY}, {telemetry.posZ}
                  </div>
                </div>
                <div className="ds-surface-elevated px-2.5 py-1.5">
                  <div className="text-[10px] text-[var(--color-text-muted)]">
                    Camera Dist / Yaw
                  </div>
                  <div className="font-semibold text-emerald-300">
                    {telemetry.cameraDist}m / {telemetry.cameraYawDeg}°
                  </div>
                </div>
              </div>

              {/* Automated Diagnostic Verification Summary */}
              <div className="pt-1 border-t border-[var(--color-border-subtle)] space-y-1">
                <div className="flex items-center justify-between text-[10px] font-semibold text-slate-300">
                  <span className="flex items-center gap-1">
                    <ShieldCheck
                      className="h-3.5 w-3.5 text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>Self-Diagnostics</span>
                  </span>
                  <span className="font-mono text-emerald-300">
                    {diagnosticsResults.filter((d) => d.passed).length}/
                    {diagnosticsResults.length} PASSED
                  </span>
                </div>
                <div className="space-y-1">
                  {diagnosticsResults.map((diag) => (
                    <div
                      key={diag.id}
                      className="flex items-center justify-between rounded bg-slate-900/65 px-2 py-1 text-[10px]"
                    >
                      <span className="truncate text-slate-300">{diag.name}</span>
                      <CheckCircle2
                        className="h-3 w-3 shrink-0 text-emerald-400"
                        aria-label="Passed"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-1 border-t border-[var(--color-border-subtle)]">
                <label
                  htmlFor="hud-focus-guard-input"
                  className="block text-[10px] text-[var(--color-text-muted)] mb-1"
                >
                  External Input Isolation Test (Type WASD/Space here):
                </label>
                <input
                  id="hud-focus-guard-input"
                  type="text"
                  value={focusGuardNote}
                  onChange={(e) => setFocusGuardNote(e.target.value)}
                  placeholder="Gõ thử WASD hoặc Space..."
                  className="ds-input w-full rounded-[var(--radius-md)] border border-[var(--color-border)] bg-slate-900/90 px-2.5 py-1.5 text-xs text-slate-100 placeholder-slate-500 outline-none"
                />
              </div>
            </section>
          )}

          {/* TOP-RIGHT ZONE: Phase 5 Persistent Status Information Area (Clock & Weather Widget — Untouched) */}
          <div className="order-2 lg:order-3 ml-auto">
            <DaNangTimeWeatherHUD
              syncSnapshot={syncTimeSolar}
              weather={weatherState}
              weatherStatus={weatherStatus}
              weatherErrorMsg={weatherErrorMsg}
              displayMode={hudPanels.statusWidget}
              onToggleDisplayMode={toggleStatusWidgetMode}
              isMobileViewport={isCompactMobile}
              onRetryWeather={() => triggerWeatherRefresh()}
            />
          </div>
        </header>

        {/* BOTTOM ROW: BottomLeftZone (MovementGuideSlot) + BottomRightZone (Player Status & Protected Touch Controls) */}
        <footer className="flex flex-col gap-[var(--space-2)]">
          <div className="flex flex-wrap items-end justify-between gap-[var(--space-3)]">
            {/* BOTTOM-LEFT ZONE: Phase 7 Adaptive Movement Guide Slot */}
            <BottomLeftMovementGuideSlot
              mode={hudPanels.movementGuide}
              onToggleMode={toggleMovementGuideMode}
              deviceProfile={deviceProfile}
            />

            {/* BOTTOM-RIGHT STATUS SLOT: Character Locomotion Panel (Expanded Card vs. Compact Mini Data Chips) */}
            <section
              aria-label="Trạng thái chuyển động của nhân vật"
              data-hud-zone="bottom-right-status"
              data-panel-mode={hudPanels.playerStatus}
              data-hud-interactive="true"
              className="pointer-events-auto ml-auto"
            >
              {hudPanels.playerStatus === 'compact' ? (
                <div className="flex flex-wrap items-center justify-end gap-1.5">
                  <MiniDataChip
                    variant="status"
                    tone={getStateBadgeTone(telemetry.state)}
                    statusDot={telemetry.grounded ? 'online' : 'warning'}
                    icon={<Footprints className="h-3 w-3" />}
                    label="State"
                    value={telemetry.state}
                    onExpand={togglePlayerStatusMode}
                    expandLabel="Mở rộng bảng trạng thái chuyển động nhân vật"
                  />
                  <MiniDataChip
                    variant="metric"
                    tone="neutral"
                    label="Speed"
                    value={telemetry.speed}
                    unit="m/s"
                    onExpand={togglePlayerStatusMode}
                    expandLabel="Mở rộng bảng vận tốc nhân vật"
                  />
                </div>
              ) : (
                <div className="ds-surface-card flex items-center gap-[var(--space-3)] px-[var(--space-4)] py-[var(--space-2)]">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                      Character State
                    </span>
                    <div className="flex items-center gap-2">
                      <DsBadge tone={getStateBadgeTone(telemetry.state)}>
                        <span>{telemetry.state}</span>
                      </DsBadge>
                      <span
                        className={`h-2 w-2 rounded-full ${
                          telemetry.grounded ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        title={telemetry.grounded ? 'Grounded' : 'Airborne'}
                      />
                    </div>
                  </div>

                  <div className="h-8 w-px bg-slate-800" />

                  <div className="flex flex-col gap-1 min-w-[110px]">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                        Velocity
                      </span>
                      <span className="font-mono font-bold text-white">
                        {telemetry.speed} m/s
                      </span>
                    </div>
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 transition-all duration-100"
                        style={{ width: `${telemetry.speedPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={togglePlayerStatusMode}
                    aria-label="Thu nhỏ trạng thái nhân vật thành Mini Data Chips"
                    title="Thu nhỏ thành Mini Data Chips"
                    className="ds-btn !p-1.5 bg-slate-800/80 text-slate-300 hover:text-white"
                  >
                    <ChevronDown
                      className="h-3.5 w-3.5 text-sky-300"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              )}
            </section>
          </div>

          {/* PROTECTED TOUCH CONTROLS LAYER (Bottom-Left Virtual Joystick & Bottom-Right Sprint/Jump) */}
          {deviceProfile.showTouchControls && (
            <div
              data-hud-zone="touch-controls-slot"
              data-hud-interactive="true"
              className="pointer-events-auto flex w-full items-end justify-between px-2 pb-1"
            >
              {/* Virtual Analog Joystick (Bottom-Left Touch Slot) */}
              <div className="flex flex-col items-center gap-1.5">
                <div
                  role="slider"
                  aria-label="Cần điều khiển di chuyển nhân vật"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(joystickVisual.magnitude * 100)}
                  tabIndex={0}
                  onPointerDown={handleJoystickPointerDown}
                  onPointerMove={handleJoystickPointerMove}
                  onPointerUp={releaseJoystickPointer}
                  onPointerCancel={releaseJoystickPointer}
                  onLostPointerCapture={releaseJoystickPointer}
                  style={{
                    width:
                      deviceProfile.formFactor === 'tablet' ? '136px' : '116px',
                    height:
                      deviceProfile.formFactor === 'tablet' ? '136px' : '116px',
                  }}
                  className={`relative flex items-center justify-center rounded-full border-2 backdrop-blur-md touch-none shadow-2xl transition-colors ${
                    joystickVisual.active
                      ? 'border-sky-400/80 bg-slate-900/75 shadow-sky-500/20'
                      : 'border-slate-500/45 bg-slate-900/55'
                  }`}
                >
                  <div className="pointer-events-none h-20 w-20 rounded-full border border-dashed border-slate-500/35" />
                  <div
                    className={`pointer-events-none h-12 w-12 rounded-full border shadow-lg transition-transform duration-75 ${
                      joystickVisual.active
                        ? 'bg-gradient-to-br from-sky-300 to-sky-600 border-white/80 scale-105'
                        : 'bg-gradient-to-br from-slate-300 to-slate-500 border-slate-200/60'
                    }`}
                    style={{
                      transform: `translate3d(${joystickVisual.x}px, ${joystickVisual.y}px, 0)`,
                    }}
                  />
                </div>
                <span className="font-mono text-[10px] text-slate-300/85 bg-slate-950/65 px-2 py-0.5 rounded-full border border-slate-700/60">
                  MOVE ({Math.round(joystickVisual.magnitude * 100)}%)
                </span>
              </div>

              {/* Protected Bottom-Right Touch Action Buttons: Sprint & Jump */}
              <div className="flex items-center gap-3.5">
                <button
                  type="button"
                  aria-label="Chạy nhanh (Giữ hoặc chạm đúp để khóa chạy)"
                  aria-pressed={touchSprintPressed || touchSprintLatched}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    touchActionRef.current.sprint = true;
                    setTouchSprintPressed(true);
                  }}
                  onPointerUp={(e) => {
                    e.stopPropagation();
                    touchActionRef.current.sprint = false;
                    setTouchSprintPressed(false);
                  }}
                  onPointerCancel={() => {
                    touchActionRef.current.sprint = false;
                    setTouchSprintPressed(false);
                  }}
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    const nextLatch = !touchActionRef.current.sprintLatched;
                    touchActionRef.current.sprintLatched = nextLatch;
                    setTouchSprintLatched(nextLatch);
                  }}
                  style={{
                    width:
                      deviceProfile.formFactor === 'tablet' ? '74px' : '64px',
                    height:
                      deviceProfile.formFactor === 'tablet' ? '74px' : '64px',
                  }}
                  className={`flex flex-col items-center justify-center rounded-full border-2 font-bold backdrop-blur-md transition active:scale-95 touch-none shadow-lg ${
                    touchSprintPressed || touchSprintLatched
                      ? 'border-emerald-300 bg-emerald-500/45 text-emerald-100 shadow-emerald-500/30'
                      : 'border-emerald-400/55 bg-emerald-500/20 text-emerald-200'
                  }`}
                >
                  <Footprints className="h-5 w-5 mb-0.5" aria-hidden="true" />
                  <span className="text-[10px] tracking-wider">
                    {touchSprintLatched ? 'RUN' : 'SPRINT'}
                  </span>
                </button>

                <button
                  type="button"
                  aria-label="Nhảy"
                  aria-pressed={touchJumpPressed}
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    touchActionRef.current.jump = true;
                    setTouchJumpPressed(true);
                  }}
                  onPointerUp={(e) => {
                    e.stopPropagation();
                    touchActionRef.current.jump = false;
                    setTouchJumpPressed(false);
                  }}
                  onPointerCancel={() => {
                    touchActionRef.current.jump = false;
                    setTouchJumpPressed(false);
                  }}
                  style={{
                    width:
                      deviceProfile.formFactor === 'tablet' ? '84px' : '72px',
                    height:
                      deviceProfile.formFactor === 'tablet' ? '84px' : '72px',
                  }}
                  className={`flex flex-col items-center justify-center rounded-full border-2 font-bold backdrop-blur-md transition active:scale-95 touch-none shadow-lg ${
                    touchJumpPressed
                      ? 'border-amber-300 bg-amber-500/50 text-amber-100 shadow-amber-500/30'
                      : 'border-amber-400/60 bg-amber-500/25 text-amber-200'
                  }`}
                >
                  <ArrowUpCircle
                    className="h-6 w-6 mb-0.5"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] tracking-wider">JUMP</span>
                </button>
              </div>
            </div>
          )}
        </footer>
      </div>

      {/* 3. SYSTEM ARCHITECTURE MODAL */}
      {showSystemInfoModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="system-specs-modal-title"
          data-hud-interactive="true"
          style={{ zIndex: 'var(--z-modal)' }}
          className="fixed inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-[var(--space-4)] select-text"
        >
          <article className="ds-surface-card w-full max-w-2xl p-[var(--space-6)] space-y-[var(--space-4)] max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-[var(--space-3)]">
              <div className="flex items-center gap-[var(--space-2)]">
                <Sparkles
                  className="h-5 w-5 text-sky-400"
                  aria-hidden="true"
                />
                <h2
                  id="system-specs-modal-title"
                  className="text-[length:var(--text-base)] font-extrabold tracking-wide text-white"
                >
                  DA NANG 3D SIMULATION — ARCHITECTURE, DESIGN SYSTEM &amp; SEO
                </h2>
              </div>
              <DsIconButton
                label="Close Specifications Modal (ESC)"
                onClick={() => setShowSystemInfoModal(false)}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </DsIconButton>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--space-3)] text-[length:var(--text-xs)]">
              <section className="ds-surface-elevated p-[var(--space-3)] space-y-1.5">
                <h3 className="font-bold text-sky-300 uppercase tracking-wider text-[11px]">
                  1. Geographic &amp; Astronomical Integrity
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Locked to Da Nang center ({DA_NANG_CONFIG.latitude}°N,{' '}
                  {DA_NANG_CONFIG.longitude}°E) in{' '}
                  <code className="font-mono text-sky-300">
                    {DA_NANG_CONFIG.timezone}
                  </code>{' '}
                  (GMT+7). Unified 1Hz clock &amp; solar trajectory calculator drives
                  both HUD and 3D DirectionalLight.
                </p>
              </section>

              <section className="ds-surface-elevated p-[var(--space-3)] space-y-1.5">
                <h3 className="font-bold text-emerald-300 uppercase tracking-wider text-[11px]">
                  2. Weather Validation &amp; Resilience
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Live Open-Meteo integration with strict finite number
                  sanitization, range clamping, sequence deduplication, and
                  neutral astronomical fallback on network errors.
                </p>
              </section>

              <section className="ds-surface-elevated p-[var(--space-3)] space-y-1.5">
                <h3 className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
                  3. Design System Tokens
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Centralized CSS Custom Properties: 4px spacing scale (
                  <code className="font-mono">--space-0..24</code>), radius scale
                  (<code className="font-mono">--radius-xs..full</code>),
                  semantic colors, elevation shadows, motion tokens, and Z-index
                  layers.
                </p>
              </section>

              <section className="ds-surface-elevated p-[var(--space-3)] space-y-1.5">
                <h3 className="font-bold text-purple-300 uppercase tracking-wider text-[11px]">
                  4. WebGL Performance &amp; Memory
                </h3>
                <p className="text-[var(--color-text-secondary)]">
                  Zero per-frame Color/Vector allocations in render loop,
                  staggered near-field instanced grass updates, adaptive quality
                  hysteresis, and full GPU geometry/material/texture disposal.
                </p>
              </section>
            </div>

            <footer className="flex items-center justify-between border-t border-[var(--color-border)] pt-[var(--space-3)] text-[11px] text-[var(--color-text-muted)]">
              <span>HTML5 Semantic DOM • WCAG AA Focus Rings • JSON-LD SEO</span>
              <DsButton
                variant="primary"
                onClick={() => setShowSystemInfoModal(false)}
              >
                Close (ESC)
              </DsButton>
            </footer>
          </article>
        </div>
      )}
    </main>
  );
};

export default App;