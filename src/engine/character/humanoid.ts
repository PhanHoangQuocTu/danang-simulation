import * as THREE from 'three';
import type { HumanoidRig, PlayerRuntimeState } from '../core/type';
export function createCasualExplorerRig(): HumanoidRig {
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
function dampValue(current: number, target: number, lambda: number, dt: number): number {
  return THREE.MathUtils.lerp(current, target, 1 - Math.exp(-lambda * dt));
}

export function updateHumanoidAnimation(
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

      lElbowX = isRun ? -0.88 - Math.max(0, -s) * 0.35 : -0.25 - Math.max(0, -s) * 0.18;
      rElbowX = isRun ? -0.88 - Math.max(0, s) * 0.35 : -0.25 - Math.max(0, s) * 0.18;
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
