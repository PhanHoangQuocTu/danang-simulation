import * as THREE from 'three';
import type { ResourceScope } from '@/engine/core/resources';
import type { InteractableDefinition } from '@/engine/core/type';
import type { InteractableRegistry } from '@/engine/interactions/registry';
import { GAME_CONFIG } from '@/engine/core/const';
import { createCasualExplorerRig } from '@/engine/character/humanoid';
import { createFootstepParticleSystem } from '@/engine/environment/dust';
import { createOrganicGrassTexture, createStoneTexture } from '@/engine/materials/textures';
import { createSyntheticRockCatalog } from '@/world-assets/catalog/synthetic-rock';
import { PrefabRegistry } from '@/world-core/registries/prefabs';
import { syntheticManifest } from './zones/manifest';
import { INITIAL_INTERACTABLE_FIXTURES } from './zones/fixtures';
import { PLATFORM_COLLIDERS, TREE_COLLIDERS, getTerrainElevation } from './zones/synthetic';

/** The archived test environment uses synthetic local meters, not surveyed city geometry. */
export function createDaNangScene(registry: InteractableRegistry, scope: ResourceScope) {
  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(0xbae6fd, 0.0055);
  scene.fog = fog;
  // 4. Dynamic Atmospheric Sky Dome
  const skyUniforms = {
    uTopColor: { value: new THREE.Color(0x1d4ed8) },
    uHorizonColor: { value: new THREE.Color(0xbae6fd) },
    uSunGlowColor: { value: new THREE.Color(0xfde047) },
    uSunDirection: { value: new THREE.Vector3(0.4, 0.8, 0.3).normalize() },
    uTwilightWeight: { value: 0.0 },
  };

  const skyDomeGeo = scope.own(new THREE.SphereGeometry(225, 32, 24));
  const skyDomeMat = scope.own(
    new THREE.ShaderMaterial({
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
    })
  );
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
  const starGeo = scope.own(new THREE.BufferGeometry());
  starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starMat = scope.own(
    new THREE.PointsMaterial({
      color: 0xf8fafc,
      size: 1.45,
      transparent: true,
      opacity: 0.0,
      depthWrite: false,
      fog: false,
    })
  );
  const starField = new THREE.Points(starGeo, starMat);
  scene.add(starField);

  // 6. Celestial Sun Disc & Night Moon Disc
  const sunOrbGeo = scope.own(new THREE.SphereGeometry(5.5, 20, 20));
  const sunOrbMat = scope.own(
    new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      fog: false,
    })
  );
  const sunOrb = new THREE.Mesh(sunOrbGeo, sunOrbMat);
  scene.add(sunOrb);

  const moonOrbGeo = scope.own(new THREE.SphereGeometry(4.0, 16, 16));
  const moonOrbMat = scope.own(
    new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.0,
      fog: false,
    })
  );
  const moonOrb = new THREE.Mesh(moonOrbGeo, moonOrbMat);
  scene.add(moonOrb);

  // 7. Dynamic Cloud System
  const cloudsGroup = new THREE.Group();
  const cloudGeo = scope.own(new THREE.DodecahedronGeometry(1, 1));
  const cloudMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.92,
      metalness: 0.0,
      transparent: true,
      opacity: 0.78,
    })
  );

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
      puff.position.set((p - 1.5) * 3.4, (p % 2) * 1.1, ((p + i) % 2) * 2.1);
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

  const rainGeo = scope.own(new THREE.BufferGeometry());
  rainGeo.setAttribute('position', new THREE.BufferAttribute(rainPositions, 3));
  rainGeo.setDrawRange(0, 0);
  const rainMat = scope.own(
    new THREE.LineBasicMaterial({
      color: 0xbae6fd,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
  );
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
  scope.own(mainDirLight.shadow);
  scene.add(mainDirLight);
  scene.add(mainDirLight.target);

  // 10. Sculpted 3D Terrain Mesh
  const terrainSize = 180;
  const terrainSegments = 128;
  const terrainGeo = scope.own(new THREE.PlaneGeometry(terrainSize, terrainSize, terrainSegments, terrainSegments));
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

  terrainGeo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  terrainGeo.computeVertexNormals();

  const grassTexture = scope.own(createOrganicGrassTexture());
  const stoneTexture = scope.own(createStoneTexture());

  const terrainMat = scope.own(
    new THREE.MeshStandardMaterial({
      map: grassTexture,
      vertexColors: true,
      roughness: 0.88,
      metalness: 0.04,
    })
  );
  const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
  terrainMesh.receiveShadow = true;
  scene.add(terrainMesh);

  // 11. Origin Compass Plaza & Winding Cobblestone Trail
  const envGroup = new THREE.Group();

  const spawnPlazaGeo = scope.own(new THREE.CylinderGeometry(3.4, 3.8, 0.12, 32));
  const spawnPlazaMat = scope.own(
    new THREE.MeshStandardMaterial({
      map: stoneTexture,
      color: 0x94a3b8,
      roughness: 0.72,
    })
  );
  const spawnPlaza = new THREE.Mesh(spawnPlazaGeo, spawnPlazaMat);
  spawnPlaza.position.set(0, 0.02, 0);
  spawnPlaza.receiveShadow = true;
  envGroup.add(spawnPlaza);

  const spawnRingGeo = scope.own(new THREE.RingGeometry(2.6, 2.85, 36));
  spawnRingGeo.rotateX(-Math.PI / 2);
  const spawnRingMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      roughness: 0.4,
    })
  );
  const spawnRing = new THREE.Mesh(spawnRingGeo, spawnRingMat);
  spawnRing.position.set(0, 0.09, 0);
  envGroup.add(spawnRing);

  const stepStoneGeo = scope.own(new THREE.CylinderGeometry(0.65, 0.72, 0.08, 10));
  const stepStoneMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.8,
    })
  );
  for (let z = -48; z <= 48; z += 2.6) {
    if (Math.abs(z) < 4) continue;
    const sx = Math.sin(z * 0.08) * 3.5 + (((z * 13) % 3) - 1) * 0.25;
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
  const lanternPostMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.5,
      metalness: 0.5,
    })
  );
  const lanternBulbMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0xfef3c7,
      emissive: new THREE.Color(0xf59e0b),
      emissiveIntensity: 0.0,
      roughness: 0.2,
    })
  );
  const lanternLights: THREE.PointLight[] = [];

  lanternPositions.forEach(([lx, lz], idx) => {
    const ly = getTerrainElevation(lx, lz);
    const lanternGroup = new THREE.Group();
    lanternGroup.position.set(lx, ly, lz);

    const post = new THREE.Mesh(scope.own(new THREE.CylinderGeometry(0.08, 0.11, 2.8, 10)), lanternPostMat);
    post.position.y = 1.4;
    post.castShadow = true;
    lanternGroup.add(post);

    const cap = new THREE.Mesh(scope.own(new THREE.ConeGeometry(0.32, 0.22, 8)), lanternPostMat);
    cap.position.y = 2.95;
    lanternGroup.add(cap);

    const bulb = new THREE.Mesh(scope.own(new THREE.SphereGeometry(0.16, 12, 12)), lanternBulbMat);
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
    const pGeo = scope.own(new THREE.BoxGeometry(plat.width, height, plat.depth));
    const pMat = scope.own(
      new THREE.MeshStandardMaterial({
        map: stoneTexture,
        color: plat.color,
        roughness: 0.72,
        metalness: 0.08,
      })
    );
    const pMesh = new THREE.Mesh(pGeo, pMat);
    pMesh.position.set(plat.x, plat.baseY + height / 2, plat.z);
    pMesh.castShadow = true;
    pMesh.receiveShadow = true;
    envGroup.add(pMesh);

    const trimGeo = scope.own(new THREE.BoxGeometry(plat.width + 0.16, 0.12, plat.depth + 0.16));
    const trimMat = scope.own(
      new THREE.MeshStandardMaterial({
        color: 0xcbd5e1,
        roughness: 0.6,
      })
    );
    const trimMesh = new THREE.Mesh(trimGeo, trimMat);
    trimMesh.position.set(plat.x, plat.topY - 0.06, plat.z);
    trimMesh.castShadow = true;
    trimMesh.receiveShadow = true;
    envGroup.add(trimMesh);
  });

  const rockCatalog = scope.own(createSyntheticRockCatalog(envGroup, stoneTexture));
  const prefabs = new PrefabRegistry();
  prefabs.register('rock', rockCatalog.factory);
  scope.own(prefabs.loadZone(syntheticManifest, 'phase-10'));

  // 14. Multi-Species Trees with Wind-Responsive Crown Groups
  const trunkMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x5c4033,
      roughness: 0.9,
    })
  );
  const pineLeafMat1 = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x2d6a4f,
      roughness: 0.78,
    })
  );
  const pineLeafMat2 = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x40916c,
      roughness: 0.75,
    })
  );
  const oakLeafMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x3a7d44,
      roughness: 0.8,
    })
  );

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
    const trunkGeo = scope.own(new THREE.CylinderGeometry(0.22 * scale, 0.36 * scale, 2.4 * scale, 10));
    const trunkMesh = new THREE.Mesh(trunkGeo, trunkMat);
    trunkMesh.position.y = 1.2 * scale;
    trunkMesh.castShadow = true;
    trunkMesh.receiveShadow = true;
    treeGroup.add(trunkMesh);

    const crownGroup = new THREE.Group();
    crownGroup.position.y = 2.2 * scale;

    if (idx % 3 === 0) {
      const crownGeo = scope.own(new THREE.IcosahedronGeometry(1.65 * scale, 1));
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
        const coneGeo = scope.own(new THREE.ConeGeometry(coneRadius, coneHeight, 9));
        const coneMesh = new THREE.Mesh(coneGeo, layer % 2 === 0 ? pineLeafMat1 : pineLeafMat2);
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
  const bushGeo = scope.own(new THREE.DodecahedronGeometry(0.55, 1));
  const bushMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x4d903e,
      roughness: 0.82,
    })
  );
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
      scope.own(new THREE.CylinderGeometry(0.58, 0.7, 0.28, 16)),
      scope.own(
        new THREE.MeshStandardMaterial({
          map: stoneTexture,
          color: 0x334155,
          roughness: 0.65,
          metalness: 0.2,
        })
      )
    );
    baseMesh.position.y = 0.14;
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    fixtureGroup.add(baseMesh);

    const pillarMat = scope.own(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        emissive: new THREE.Color(def.accentColorHex),
        emissiveIntensity: 0.16,
        roughness: 0.45,
        metalness: 0.35,
      })
    );
    const pillarMesh = new THREE.Mesh(scope.own(new THREE.CylinderGeometry(0.32, 0.38, 1.35, 16)), pillarMat);
    pillarMesh.position.y = 0.82;
    pillarMesh.castShadow = true;
    pillarMesh.receiveShadow = true;
    fixtureGroup.add(pillarMesh);
    highlightTargets.push(pillarMesh);

    const coreMat = scope.own(
      new THREE.MeshStandardMaterial({
        color: def.accentColorHex,
        emissive: new THREE.Color(def.accentColorHex),
        emissiveIntensity: 0.45,
        roughness: 0.25,
        metalness: 0.4,
      })
    );
    let coreGeo: THREE.BufferGeometry;
    if (def.type === 'inspect') coreGeo = scope.own(new THREE.OctahedronGeometry(0.32, 0));
    else if (def.type === 'information') coreGeo = scope.own(new THREE.BoxGeometry(0.46, 0.46, 0.46));
    else coreGeo = scope.own(new THREE.SphereGeometry(0.32, 16, 16));
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 1.82;
    coreMesh.castShadow = true;
    fixtureGroup.add(coreMesh);
    highlightTargets.push(coreMesh);

    const ringMesh = new THREE.Mesh(
      scope.own(new THREE.TorusGeometry(0.48, 0.04, 10, 28)),
      scope.own(
        new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          emissive: new THREE.Color(def.accentColorHex),
          emissiveIntensity: 0.25,
          roughness: 0.3,
          metalness: 0.6,
        })
      )
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
  const bladeGeo = scope.own(new THREE.ConeGeometry(0.065, 0.42, 4));
  bladeGeo.translate(0, 0.21, 0);
  const bladeMat = scope.own(
    new THREE.MeshStandardMaterial({
      color: 0x5ca938,
      roughness: 0.75,
    })
  );
  const instancedGrass = scope.own(new THREE.InstancedMesh(bladeGeo, bladeMat, grassCount));
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
    const r = 4.5 + Math.random() ** 0.75 * 58;
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
  const characterRig = createCasualExplorerRig(scope);
  scene.add(characterRig.root);

  const dustParticles = createFootstepParticleSystem(scene, scope);

  return {
    scene,
    fog,
    skyUniforms,
    skyDomeMesh,
    starField,
    starMat,
    sunOrb,
    sunOrbMat,
    moonOrb,
    moonOrbMat,
    cloudsGroup,
    cloudMat,
    cloudClusters,
    rainGeo,
    rainDropMeta,
    rainLines,
    ambientLight,
    hemiLight,
    mainDirLight,
    terrainMat,
    lanternBulbMat,
    lanternLights,
    treeCrownGroups,
    grassBaseData,
    instancedGrass,
    dummy,
    characterRig,
    dustParticles,
    beaconRingGroups,
    blockerMeshes,
  };
}
