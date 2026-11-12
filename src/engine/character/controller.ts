import { Vector3 } from 'three';
import * as THREE from 'three';
import { GAME_CONFIG } from '../core/const';
import type { PlayerRuntimeState, KeyboardInputState, JoystickInput } from '../core/type';

export interface CharacterEnvironment {
  boundaryRadius: number;
  getTerrainElevation(x: number, z: number): number;
  getSupportSurfaceHeight(x: number, z: number, currentY: number, radius: number): number;
  resolveHorizontalCollisions(x: number, z: number, currentY: number, radius: number): { x: number; z: number };
  onLanding?(x: number, y: number, z: number): void;
}

/** Phase 1 controller; world geometry is injected rather than imported. */
export function createCharacterController(state: PlayerRuntimeState, environment: CharacterEnvironment) {
  if (!Number.isFinite(environment.boundaryRadius) || environment.boundaryRadius <= 0) {
    throw new Error('Invalid movement boundary');
  }
  const forwardVec = new Vector3();
  const rightVec = new Vector3();
  const moveDir = new Vector3();
  const upAxis = new Vector3(0, 1, 0);
  const physics = GAME_CONFIG.physics;
  return {
    update(
      rawDelta: number,
      kb: KeyboardInputState,
      joy: JoystickInput,
      touchAct: { sprint: boolean; sprintLatched: boolean; jump: boolean }
    ) {
      if (!Number.isFinite(rawDelta) || rawDelta <= 0) return;
      const dt = Math.min(rawDelta, physics.maxDeltaTime);
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

      const isSprinting = kb.sprint || touchAct.sprint || touchAct.sprintLatched;
      const isJumping = kb.jump || touchAct.jump;

      const maxTargetSpeed = isSprinting ? physics.runSpeed : physics.walkSpeed;
      const targetSpeed = hasMoveInput ? maxTargetSpeed * analogMagnitude : 0;

      const targetVelX = moveDir.x * targetSpeed;
      const targetVelZ = moveDir.z * targetSpeed;

      const accelRate = hasMoveInput ? physics.acceleration : physics.deceleration;
      const effectiveAccel = state.isGrounded ? accelRate : accelRate * physics.airControlMultiplier;

      const velLerp = 1 - Math.exp(-effectiveAccel * dt);
      state.velocity.x = THREE.MathUtils.lerp(state.velocity.x, targetVelX, velLerp);
      state.velocity.z = THREE.MathUtils.lerp(state.velocity.z, targetVelZ, velLerp);

      if (!hasMoveInput && state.velocity.x * state.velocity.x + state.velocity.z * state.velocity.z < 0.0008) {
        state.velocity.x = 0;
        state.velocity.z = 0;
      }

      state.horizontalSpeed = Math.hypot(state.velocity.x, state.velocity.z);

      if (hasMoveInput) {
        const desiredRotY = Math.atan2(moveDir.x, moveDir.z);
        state.rotationY = dampAngle(state.rotationY, desiredRotY, physics.rotationSmoothing, dt);
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

      const resolvedXZ = environment.resolveHorizontalCollisions(nextX, nextZ, nextY, physics.playerRadius);
      nextX = resolvedXZ.x;
      nextZ = resolvedXZ.z;

      const distFromCenter = Math.hypot(nextX, nextZ);
      if (distFromCenter > environment.boundaryRadius) {
        const clampScale = environment.boundaryRadius / distFromCenter;
        nextX *= clampScale;
        nextZ *= clampScale;
      }

      const surfaceY = environment.getSupportSurfaceHeight(nextX, nextZ, prevY, physics.playerRadius);
      state.surfaceHeight = surfaceY;

      if (nextY <= surfaceY + 0.04 && state.velocity.y <= 0 && prevY >= surfaceY - 0.55) {
        nextY = surfaceY;
        if (!wasGrounded && state.velocity.y < -3.2) {
          state.landingTimer = physics.landingDuration;
          environment.onLanding?.(nextX, surfaceY, nextZ);
        }
        state.velocity.y = 0;
        state.isGrounded = true;
      } else if (nextY < environment.getTerrainElevation(nextX, nextZ)) {
        nextY = environment.getTerrainElevation(nextX, nextZ);
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
        if (hasMoveInput && state.horizontalSpeed > physics.walkSpeedThreshold * 1.6) {
          state.landingTimer = 0;
          state.animationState = state.horizontalSpeed >= physics.runSpeedThreshold ? 'RUN' : 'WALK';
        } else {
          state.animationState = 'LANDING';
        }
      } else if (state.horizontalSpeed > physics.walkSpeedThreshold) {
        state.animationState = state.horizontalSpeed >= physics.runSpeedThreshold ? 'RUN' : 'WALK';
      } else {
        state.animationState = 'IDLE';
      }
    },
  };
}

function dampAngle(current: number, target: number, lambda: number, dt: number) {
  let delta = ((target - current + Math.PI) % (Math.PI * 2)) - Math.PI;
  if (delta < -Math.PI) delta += Math.PI * 2;
  return current + delta * (1 - Math.exp(-lambda * dt));
}
