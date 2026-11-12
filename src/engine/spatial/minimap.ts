import * as THREE from 'three';
import { GAME_CONFIG } from '../core/const';
import type { MiniMapProjectionResult } from '../core/type';
export function clampMiniMapZoom(rawZoom: number): number {
  const { minZoom, maxZoom, defaultZoom } = GAME_CONFIG.miniMap;
  if (!Number.isFinite(rawZoom)) return defaultZoom;
  return Number(THREE.MathUtils.clamp(rawZoom, minZoom, maxZoom).toFixed(2));
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
  const isOutOfBounds = u < edgeMargin || u > 1 - edgeMargin || v < edgeMargin || v > 1 - edgeMargin;

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
