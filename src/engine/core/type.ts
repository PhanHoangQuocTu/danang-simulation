import type * as THREE from 'three';
export type CharacterAnimationState = 'IDLE' | 'WALK' | 'RUN' | 'JUMP' | 'FALL' | 'LANDING';

export type DeviceFormFactor = 'desktop' | 'tablet' | 'mobile';
export type ActiveInputMethod = 'keyboard-mouse' | 'touch' | 'hybrid';
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

export type InteractionEligibilityStatus = 'idle' | 'eligible' | 'out-of-range' | 'occluded' | 'disabled';

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

export interface HumanoidRig {
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

export interface PlatformCollider {
  id: string;
  x: number;
  z: number;
  width: number;
  depth: number;
  topY: number;
  baseY: number;
  color: number;
}

export interface CylinderCollider {
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

export type MiniMapFollowMode = 'overview' | 'follow';
