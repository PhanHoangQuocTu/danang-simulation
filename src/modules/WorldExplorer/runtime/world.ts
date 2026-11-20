import * as THREE from 'three';
import { EngineRuntime } from '@/engine/core/runtime';
import { ResourceScope } from '@/engine/core/resources';
import { GAME_CONFIG } from '@/engine/core/const';
import type { PlayerRuntimeState, ActiveInteractionTargetState, KeyboardInputState } from '@/engine/core/type';
import { createCharacterController } from '@/engine/character/controller';
import { updateHumanoidAnimation } from '@/engine/character/humanoid';
import { InteractableRegistry, evaluateInteractionDistanceAndEligibility } from '@/engine/interactions/registry';
import { createWebGlRenderer } from '@/engine/renderer/webgl';
import { bindWorldInput, type WorldCommand } from '@/engine/controls/events';
import { clampMiniMapZoom, projectWorldToMiniMap } from '@/engine/spatial/minimap';
import { createDaNangScene } from '@/worlds/danang/scene';
import { createEnvironmentSystem } from '@/worlds/danang/environment/simulation';
import { syntheticTerrainProvider } from '@/worlds/danang/zones/synthetic-terrain';
import { danangDemPilotGridInput } from '@/worlds/danang/data/danang-dem-pilot';
import { selectTerrainProvider } from '@/world-core/terrain/selection';
import type { TerrainMode } from '@/worlds/danang/terrain-mode';
import type { TerrainProvider } from '@/engine/terrain/type';
import { getDaNangClockData, calculateDaNangSolarData } from '@/worlds/danang/environment/solar';
import type { NormalizedWeatherState } from '@/integrations/weather/type';
import type { GisMode } from '@/worlds/danang/gis-mode';
import type { GisLayerResult } from '@/worlds/danang/gis-layer';

export const idleTarget = (): ActiveInteractionTargetState => ({
  targetId: null,
  status: 'idle',
  distanceMeters: Number.POSITIVE_INFINITY,
  definition: null,
  isActivated: false,
  interactionCount: 0,
});
export function createPlayerState(terrain: TerrainProvider = syntheticTerrainProvider): PlayerRuntimeState {
  const spawn = terrain.spawnPosition;
  return {
    position: new THREE.Vector3(spawn[0], spawn[1], spawn[2]),
    velocity: new THREE.Vector3(),
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
      fps: 0,
      avgFrameTimeMs: 0,
      p95FrameTimeMs: 0,
      drawCalls: 0,
      triangles: 0,
      geometriesCount: 0,
      texturesCount: 0,
      jsHeapUsedMb: null,
      pixelRatioActive: 1,
      adaptiveQualityTier: 'ultra',
    },
  };
}
export interface WorldSnapshot {
  x: number;
  y: number;
  z: number;
  rotationY: number;
  speed: number;
  grounded: boolean;
  animation: PlayerRuntimeState['animationState'];
  surface: number;
  cameraDistance: number;
  cameraYaw: number;
  perf: PlayerRuntimeState['perf'];
  target: ActiveInteractionTargetState;
  mapStatus: 'initializing' | 'ready' | 'unavailable';
}
export type RuntimeStatus = 'loading' | 'ready' | 'unsupported' | 'context-lost' | 'error';
export interface WorldBindings {
  canvas: HTMLCanvasElement;
  mapCanvas: HTMLCanvasElement;
  marker: HTMLDivElement;
  cone: HTMLDivElement;
  edge: HTMLSpanElement;
  release?(): void;
  command(command: WorldCommand): void;
  device(pointer: 'mouse' | 'touch' | 'keyboard'): void;
  snapshot(snapshot: WorldSnapshot): void;
  status(status: RuntimeStatus): void;
}

export interface WorldRuntimeOptions {
  /** Phase 16: 'synthetic' (default production world) or 'dem-pilot' (the
   * real Copernicus DEM pilot, 3 km across). DEM selection is explicit
   * only; an invalid DEM asset fails the runtime instead of silently
   * falling back to synthetic. */
  terrainMode?: TerrainMode;
  /** Phase 17: 'real' opts into the OSM roads & buildings pilot layer
   * (`?gis=real`); it only builds on a geographic (DEM) terrain. */
  gisMode?: GisMode;
}

/** The provider the most recently created runtime is using (synthetic by
 * default). The HUD diagnostics read the active provider through this
 * getter so F3 shows the world the player is actually standing on. */
let activeTerrainProvider: TerrainProvider = syntheticTerrainProvider;

export function getActiveTerrainProvider(): TerrainProvider {
  return activeTerrainProvider;
}

/** The GIS layer the most recently created runtime built, or null when
 * GIS is off (the default) or the terrain is not geographic. The HUD
 * diagnostics read the layer through this getter. */
let activeGisLayer: GisLayerResult | null = null;

export function getActiveGisLayer(): GisLayerResult | null {
  return activeGisLayer;
}

/** The GIS mode the most recently created runtime was asked for
 * (`?gis=real` or the default `off`). The HUD reads this so a requested
 * layer that was not built (no DEM terrain) reports as a failure
 * instead of silently looking like "GIS off". */
let activeGisMode: GisMode = 'off';

export function getActiveGisMode(): GisMode {
  return activeGisMode;
}

/**
 * Mini Map half-extent for a provider: the synthetic world's 72 m, or half
 * the geographic coverage span for a DEM provider (1500 m for the pilot).
 * The Mini Map camera and its Span label must both read this one value.
 */
export function resolveMiniMapHalfExtentMeters(terrain: TerrainProvider): number {
  if (!terrain.metadata.isGeographic) return GAME_CONFIG.miniMap.orthoHalfExtent;
  return (
    Math.max(
      terrain.coverage.maxXMeters - terrain.coverage.minXMeters,
      terrain.coverage.maxZMeters - terrain.coverage.minZMeters
    ) / 2
  );
}

export function createWorldRuntime(bindings: WorldBindings, options: WorldRuntimeOptions = {}) {
  const scope = new ResourceScope();
  const registry = new InteractableRegistry();
  const terrainMode = options.terrainMode ?? 'synthetic';
  // Phase 16: one terrain provider instance, shared by scene, controller
  // and camera. Synthetic is the default until a real DEM passes approval;
  // the DEM pilot is an explicit opt-in (see terrain-mode.ts).
  const terrain: TerrainProvider =
    terrainMode === 'dem-pilot'
      ? selectTerrainProvider({ kind: 'dem', grid: danangDemPilotGridInput() }, syntheticTerrainProvider)
      : syntheticTerrainProvider;
  activeTerrainProvider = terrain;
  const isDem = terrain.metadata.isGeographic;
  const gisMode = options.gisMode ?? 'off';
  activeGisMode = gisMode;
  const state = createPlayerState(terrain);
  const keyboard: KeyboardInputState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    sprint: false,
    jump: false,
  };
  const joystick = { x: 0, y: 0, magnitude: 0, active: false };
  const actions = { sprint: false, sprintLatched: false, jump: false };
  let blocked = false;
  let disposed = false;
  let weather: NormalizedWeatherState | null = null;
  let zoom = 1;
  let follow = false;
  let targetDistance = GAME_CONFIG.camera.defaultDistance;
  let mapDirty = true;
  let mapStatus: WorldSnapshot['mapStatus'] = 'initializing';
  let target = idleTarget();
  let lastInteraction = Number.NEGATIVE_INFINITY;
  const releases: (() => void)[] = [];
  try {
    const renderer = scope.own(createWebGlRenderer(bindings.canvas));
    const world = createDaNangScene(registry, scope, terrain, { gisEnabled: gisMode === 'real' });
    activeGisLayer = world.gisLayer;
    const { scene, characterRig, dustParticles } = world;
    const environment = createEnvironmentSystem(world);
    const camera = new THREE.PerspectiveCamera(
      GAME_CONFIG.camera.fov,
      1,
      GAME_CONFIG.camera.near,
      // Phase 16: a 3 km DEM world needs a far plane far beyond the
      // synthetic world's 320 m, or the terrain is clipped at 320 m.
      isDem ? 6000 : GAME_CONFIG.camera.far
    );
    camera.position.set(terrain.spawnPosition[0], terrain.spawnPosition[1] + 3, terrain.spawnPosition[2] + 5.4);
    // Mini Map extent follows the provider coverage: 72 m for the synthetic
    // world, half the DEM span (1500 m) for the pilot.
    const mapHalfExtent = resolveMiniMapHalfExtentMeters(terrain);
    const mapCameraHeight = isDem ? 1600 : GAME_CONFIG.miniMap.cameraHeight;
    const mapCamera = new THREE.OrthographicCamera(
      -mapHalfExtent,
      mapHalfExtent,
      mapHalfExtent,
      -mapHalfExtent,
      GAME_CONFIG.miniMap.near,
      isDem ? 3200 : GAME_CONFIG.miniMap.far
    );
    mapCamera.up.set(0, 0, -1);
    const mapCenter = new THREE.Vector2();
    const lookAt = new THREE.Vector3(
      terrain.spawnPosition[0],
      terrain.spawnPosition[1] + GAME_CONFIG.camera.lookAtHeightOffset,
      terrain.spawnPosition[2]
    );
    const desired = new THREE.Vector3();
    const cameraPosition = new THREE.Vector3();
    const forward = new THREE.Vector3();
    const toCandidate = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const blockers = new THREE.Raycaster();
    const center = new THREE.Vector2();
    const hits: THREE.Intersection[] = [];
    const blockerHits: THREE.Intersection[] = [];
    const mapProjection = { u: 0, v: 0, clampedU: 0, clampedV: 0, isOutOfBounds: false, screenRotationDeg: 0 };
    const controller = createCharacterController(state, {
      terrain,
      onLanding(x, y, z) {
        dustParticles.spawnBurst(x, y, z, 6);
      },
    });
    const timers = { cyclePhase: 0, idleTime: 0 };
    const frames = new Float32Array(60);
    const sorted = new Float32Array(60);
    let frameIndex = 0;
    let frameCount = 0;
    let lastFrame: number | null = null;
    let lastHud = Number.NEGATIVE_INFINITY;
    let lastSolar = Number.NEGATIVE_INFINITY;
    let lastRay = Number.NEGATIVE_INFINITY;
    let lastMap = Number.NEGATIVE_INFINITY;
    let dustTimer = 0;
    let solar = calculateDaNangSolarData(getDaNangClockData());
    let qualityCooldown = 0;
    let rainQuality = 1;
    let contextLost = false;
    let failed = false;
    let pageActive = true;
    const baseDpr = Math.min(window.devicePixelRatio || 1, 2);
    let activeDpr = baseDpr;
    let resizePending = false;
    const release = () => {
      Object.assign(joystick, { x: 0, y: 0, magnitude: 0, active: false });
      Object.assign(actions, { sprint: false, sprintLatched: false, jump: false });
      bindings.release?.();
    };
    const input = bindWorldInput(bindings.canvas, state, keyboard, {
      blocked: () => blocked,
      command: bindings.command,
      device: bindings.device,
      release,
      zoom(delta) {
        targetDistance = THREE.MathUtils.clamp(
          targetDistance + delta,
          GAME_CONFIG.camera.minDistance,
          GAME_CONFIG.camera.maxDistance
        );
      },
    });
    releases.push(() => input.dispose());
    const resize = () => {
      const { width, height } = bindings.canvas.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.resize(width, height, activeDpr);
      mapDirty = true;
    };
    const observer = new ResizeObserver(resize);
    observer.observe(bindings.canvas);
    releases.push(() => observer.disconnect());
    window.addEventListener('resize', resize);
    releases.push(() => window.removeEventListener('resize', resize));
    resize();

    const selectTarget = () => {
      camera.updateMatrixWorld();
      scene.updateMatrixWorld();
      raycaster.setFromCamera(center, camera);
      raycaster.near = 0.2;
      raycaster.far = GAME_CONFIG.interaction.maxDetectionDistance;
      hits.length = 0;
      raycaster.intersectObjects(registry.getCandidateMeshes(), false, hits);
      let entry = hits[0] ? registry.get(hits[0].object.userData.interactableId) : undefined;
      if (!entry) {
        camera.getWorldDirection(forward);
        let score = 0.94;
        for (const candidate of registry.getAll()) {
          if (!candidate.definition.enabled || !candidate.object3D.visible) continue;
          toCandidate.copy(candidate.worldAnchor).sub(camera.position);
          const distance = toCandidate.length();
          if (distance < 0.2 || distance > GAME_CONFIG.interaction.maxDetectionDistance) continue;
          const alignment = forward.dot(toCandidate.divideScalar(distance));
          if (alignment > score) {
            score = alignment;
            entry = candidate;
          }
        }
      }
      let next = idleTarget();
      if (entry) {
        toCandidate.copy(entry.worldAnchor).sub(camera.position);
        const distance = toCandidate.length();
        blockerHits.length = 0;
        blockers.set(camera.position, toCandidate.normalize());
        blockers.near = 0.2;
        blockers.far = Math.max(0.25, distance - 0.55);
        blockers.intersectObjects(world.blockerMeshes, false, blockerHits);
        const eligibility = evaluateInteractionDistanceAndEligibility(
          state.position,
          entry,
          distance > 0.3 && blockerHits.length > 0
        );
        next = {
          targetId: entry.definition.id,
          status: eligibility.status,
          distanceMeters: eligibility.distanceMeters,
          definition: entry.definition,
          isActivated: entry.isActivated,
          interactionCount: entry.interactionCount,
        };
      }
      registry.applyHighlight(next.targetId, next.status);
      target = next;
    };
    const captureMap = () => {
      const hidden = [
        world.skyDomeMesh,
        world.starField,
        world.sunOrb,
        world.moonOrb,
        world.cloudsGroup,
        world.rainLines,
        characterRig.root,
      ];
      const visibility = hidden.map((object) => object.visible);
      const fog = scene.fog;
      const ambient = world.ambientLight.intensity;
      const hemi = world.hemiLight.intensity;
      try {
        scene.fog = null;
        for (const object of hidden) object.visible = false;
        world.ambientLight.intensity = Math.max(ambient, 0.72);
        world.hemiLight.intensity = Math.max(hemi, 0.85);
        renderer.captureOverview(scene, mapCamera, bindings.mapCanvas);
        mapStatus = 'ready';
      } catch {
        mapStatus = 'unavailable';
      } finally {
        scene.fog = fog;
        hidden.forEach((object, index) => {
          object.visible = visibility[index];
        });
        world.ambientLight.intensity = ambient;
        world.hemiLight.intensity = hemi;
      }
    };
    const runtime = new EngineRuntime(
      { request: (callback) => requestAnimationFrame(callback), cancel: (handle) => cancelAnimationFrame(handle) },
      [
        {
          update(dt, now) {
            if (resizePending) {
              resize();
              resizePending = false;
            }
            const rawMs = lastFrame === null ? 0 : now - lastFrame;
            lastFrame = now;
            if (rawMs > 0 && rawMs < 250) {
              frames[frameIndex] = rawMs;
              frameIndex = (frameIndex + 1) % 60;
              frameCount = Math.min(60, frameCount + 1);
            }
            if (now - lastSolar >= 1000) {
              solar = calculateDaNangSolarData(getDaNangClockData());
              lastSolar = now;
            }
            if (!blocked) controller.update(dt, keyboard, joystick, actions);
            updateHumanoidAnimation(characterRig, state, timers, dt);
            characterRig.root.position.copy(state.position);
            characterRig.root.rotation.y = state.rotationY;
            if (!blocked && state.isGrounded && state.horizontalSpeed > 2.2) {
              dustTimer += dt * (state.animationState === 'RUN' ? 2.2 : 1.2);
              if (dustTimer >= 0.36) {
                dustTimer = 0;
                dustParticles.spawnBurst(
                  state.position.x,
                  state.position.y,
                  state.position.z,
                  state.animationState === 'RUN' ? 3 : 1
                );
              }
            }
            dustParticles.update(dt);
            state.cameraDistance = THREE.MathUtils.damp(
              state.cameraDistance,
              targetDistance,
              GAME_CONFIG.camera.zoomSmoothing,
              dt
            );
            desired.copy(state.position);
            desired.y += GAME_CONFIG.camera.lookAtHeightOffset;
            const smoothing = 1 - Math.exp(-GAME_CONFIG.camera.followSmoothing * dt);
            lookAt.lerp(desired, smoothing);
            const horizontal = state.cameraDistance * Math.cos(state.cameraPitch);
            cameraPosition.set(
              lookAt.x + Math.sin(state.cameraYaw) * horizontal,
              lookAt.y + state.cameraDistance * Math.sin(state.cameraPitch),
              lookAt.z + Math.cos(state.cameraYaw) * horizontal
            );
            const cameraSample = terrain.sampleElevation(cameraPosition.x, cameraPosition.z);
            if (cameraSample.status === 'ok' && cameraSample.elevationMeters !== null) {
              cameraPosition.y = Math.max(
                cameraPosition.y,
                cameraSample.elevationMeters + GAME_CONFIG.camera.groundClearance
              );
            }
            camera.position.lerp(cameraPosition, smoothing);
            camera.lookAt(lookAt);
            environment.update(dt, now, state, solar, weather, rainQuality);
            for (const beacon of world.beaconRingGroups) {
              const speed = registry.get(beacon.id)?.isActivated ? 3.4 : 1;
              beacon.ring.rotation.z += dt * 1.1 * speed;
              beacon.ring.rotation.y += dt * 0.7 * speed;
            }
            if (!blocked && now - lastRay >= 50) {
              selectTarget();
              lastRay = now;
            }
            const previousMapX = mapCenter.x;
            const previousMapZ = mapCenter.y;
            mapCenter.x = THREE.MathUtils.damp(
              mapCenter.x,
              follow ? state.position.x : 0,
              GAME_CONFIG.miniMap.followSmoothing,
              dt
            );
            mapCenter.y = THREE.MathUtils.damp(
              mapCenter.y,
              follow ? state.position.z : 0,
              GAME_CONFIG.miniMap.followSmoothing,
              dt
            );
            const mapCenterMoved = Math.hypot(mapCenter.x - previousMapX, mapCenter.y - previousMapZ) > 0.04;
            mapCamera.position.set(mapCenter.x, mapCameraHeight, mapCenter.y);
            mapCamera.lookAt(mapCenter.x, 0, mapCenter.y);
            mapCamera.zoom = zoom;
            mapCamera.updateProjectionMatrix();
            mapCamera.updateMatrixWorld();
            if (mapDirty || now - lastMap >= (follow || mapCenterMoved ? 50 : 2500)) {
              captureMap();
              lastMap = now;
              mapDirty = false;
            }
            const projection = projectWorldToMiniMap(
              state.position.x,
              state.position.z,
              state.rotationY,
              mapCenter.x,
              mapCenter.y,
              zoom,
              mapHalfExtent,
              mapCamera,
              mapProjection
            );
            bindings.marker.style.left = `${projection.clampedU * 100}%`;
            bindings.marker.style.top = `${projection.clampedV * 100}%`;
            bindings.cone.style.transform = `rotate(${projection.screenRotationDeg}deg)`;
            bindings.edge.hidden = !projection.isOutOfBounds;
            renderer.render(scene, camera);
            if (now - lastHud >= 100) {
              const info = renderer.getDiagnostics();
              const perf = state.perf;
              if (frameCount) {
                let sum = 0;
                for (let index = 0; index < frameCount; index++) {
                  sum += frames[index];
                  sorted[index] = frames[index];
                }
                // Sorting happens only at HUD cadence, outside frame-critical simulation calculations.
                const sample = sorted.slice(0, frameCount);
                sample.sort();
                perf.avgFrameTimeMs = sum / frameCount;
                perf.fps = Math.round(1000 / perf.avgFrameTimeMs);
                perf.p95FrameTimeMs = sample[Math.min(frameCount - 1, Math.floor(frameCount * 0.95))];
              }
              qualityCooldown = Math.max(
                0,
                qualityCooldown + (lastHud === Number.NEGATIVE_INFINITY ? 0 : lastHud - now)
              );
              if (frameCount >= 30 && qualityCooldown === 0) {
                const tiers = ['ultra', 'balanced', 'performance'] as const;
                let tier = tiers.indexOf(perf.adaptiveQualityTier);
                if (perf.p95FrameTimeMs > 28 && tier < 2) tier++;
                else if (perf.p95FrameTimeMs < 17.5 && tier > 0) tier--;
                if (tiers[tier] !== perf.adaptiveQualityTier) {
                  perf.adaptiveQualityTier = tiers[tier];
                  activeDpr = tier === 0 ? baseDpr : Math.min(baseDpr, tier === 1 ? 1.35 : 1);
                  rainQuality = [1, 0.75, 0.5][tier];
                  resizePending = true;
                  qualityCooldown = 3500;
                }
              }
              Object.assign(perf, {
                drawCalls: info.calls,
                triangles: info.triangles,
                geometriesCount: info.geometries,
                texturesCount: info.textures,
                pixelRatioActive: info.pixelRatio,
              });
              bindings.snapshot({
                x: state.position.x,
                y: state.position.y,
                z: state.position.z,
                rotationY: state.rotationY,
                speed: state.horizontalSpeed,
                grounded: state.isGrounded,
                animation: state.animationState,
                surface: state.surfaceHeight,
                cameraDistance: state.cameraDistance,
                cameraYaw: state.cameraYaw,
                perf: { ...perf },
                target: { ...target },
                mapStatus,
              });
              lastHud = now;
            }
          },
          dispose() {
            registry.clear();
            scope.dispose();
          },
        },
      ],
      () => {
        failed = true;
        bindings.status('error');
      }
    );
    const reconcile = () => {
      if (disposed) return;
      if (document.hidden || !pageActive || contextLost || failed) {
        runtime.stop();
        input.release();
        lastFrame = null;
      } else {
        lastFrame = null;
        lastHud = Number.NEGATIVE_INFINITY;
        runtime.start();
      }
    };
    const lost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      bindings.status('context-lost');
      reconcile();
    };
    const restored = () => {
      contextLost = false;
      mapDirty = true;
      resize();
      bindings.status('ready');
      reconcile();
    };
    const hide = () => {
      pageActive = false;
      reconcile();
    };
    const show = () => {
      pageActive = true;
      reconcile();
    };
    for (const [object, event, callback] of [
      [document, 'visibilitychange', reconcile],
      [window, 'pagehide', hide],
      [window, 'pageshow', show],
      [bindings.canvas, 'webglcontextlost', lost],
      [bindings.canvas, 'webglcontextrestored', restored],
    ] as const) {
      object.addEventListener(event, callback as EventListener);
      releases.push(() => object.removeEventListener(event, callback as EventListener));
    }
    bindings.status('ready');
    reconcile();
    return {
      setWeather(value: NormalizedWeatherState | null) {
        weather = value;
      },
      setBlocked(value: boolean) {
        blocked = value;
        if (value) {
          input.release();
          state.velocity.set(0, 0, 0);
          state.horizontalSpeed = 0;
          if (document.pointerLockElement === bindings.canvas) document.exitPointerLock();
        }
      },
      setMap(nextZoom: number, nextFollow: boolean) {
        zoom = clampMiniMapZoom(nextZoom);
        follow = nextFollow;
        mapDirty = true;
      },
      joystick(value: typeof joystick) {
        Object.assign(joystick, value);
      },
      action(action: 'sprint' | 'sprintLatched' | 'jump', value: boolean) {
        actions[action] = value;
      },
      reset() {
        input.release();
        const { perf, isPointerLocked } = state;
        Object.assign(state, createPlayerState(terrain), { perf, isPointerLocked });
        targetDistance = GAME_CONFIG.camera.defaultDistance;
        lookAt.set(terrain.spawnPosition[0], terrain.spawnPosition[1] + 1.48, terrain.spawnPosition[2]);
        camera.position.set(terrain.spawnPosition[0], terrain.spawnPosition[1] + 3, terrain.spawnPosition[2] + 5.4);
        mapDirty = true;
      },
      interact() {
        if (blocked) return { status: 'rejected' as const, reason: 'blocked' as const };
        selectTarget();
        const now = performance.now();
        if (!target.targetId) return { status: 'no-target' as const };
        if (target.status !== 'eligible') return { status: 'rejected' as const, reason: 'ineligible' as const };
        if (now - lastInteraction < 320) return { status: 'rejected' as const, reason: 'cooldown' as const };
        const entry = registry.get(target.targetId);
        if (!entry) return { status: 'rejected' as const, reason: 'missing' as const };
        lastInteraction = now;
        if (entry.definition.type === 'activate') registry.toggleActivated(entry.definition.id);
        else registry.recordInteraction(entry.definition.id);
        mapDirty = true;
        selectTarget();
        return { status: 'executed' as const, target: { ...target } };
      },
      dispose() {
        if (disposed) return;
        disposed = true;
        runtime.stop();
        for (const cleanup of releases.reverse()) cleanup();
        runtime.dispose();
        // Phase 16: dispose a runtime-owned DEM provider. The synthetic
        // provider is a shared singleton and must never be disposed here.
        if (terrain !== syntheticTerrainProvider) terrain.dispose();
        if (activeTerrainProvider === terrain) activeTerrainProvider = syntheticTerrainProvider;
        if (activeGisLayer === world.gisLayer) activeGisLayer = null;
        if (activeGisMode === gisMode) activeGisMode = 'off';
      },
    };
  } catch (error) {
    for (const cleanup of releases.reverse()) cleanup();
    registry.clear();
    scope.dispose();
    throw error;
  }
}
export type WorldRuntime = ReturnType<typeof createWorldRuntime>;
