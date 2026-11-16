import * as THREE from 'three';
import type { PlayerRuntimeState } from '@/engine/core/type';
import type { SolarAstronomicalData } from '@/worlds/danang/environment/type';
import type { NormalizedWeatherState, WeatherEffectConfig } from '@/integrations/weather/type';
import type { createDaNangScene } from '@/worlds/danang/scene';

export function createEnvironmentSystem(world: ReturnType<typeof createDaNangScene>) {
  const {
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
    cloudMat,
    cloudClusters,
    rainGeo,
    rainDropMeta,
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
  } = world;
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

  let lightningTimer = 6;
  let lightningFlashIntensity = 0;
  let grassBatchToggle = 0;

  return {
    update(
      dt: number,
      now: number,
      state: PlayerRuntimeState,
      solar: SolarAstronomicalData,
      weather: NormalizedWeatherState | null,
      rainQualityMultiplier = 1
    ) {
      // PART II: DYNAMIC ASTRONOMICAL DAY/NIGHT SKY & LIGHTING INTERPOLATION
      // ======================================================================
      const dayFactor = solar.daylightFactor;
      const twilight = solar.twilightFactor;

      const fx: WeatherEffectConfig = weather?.mapped.effects ?? neutralUnavailableEffects;

      const rawCloudCover = weather ? weather.cloudCover : neutralUnavailableEffects.cloudCoverFloor;
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

      targetSunGlowColor.setHex(solar.phase === 'DAWN' ? 0xfdba74 : 0xf97316);

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
      starMat.opacity = THREE.MathUtils.lerp(starMat.opacity, THREE.MathUtils.clamp(nightVisibility, 0, 0.9), envLerp);

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
        lightningFlashIntensity = Math.max(0, lightningFlashIntensity - dt * 11.0);
      }

      const baseDayIntensity = (0.35 + 1.95 * dayFactor) * fx.sunAttenuation * (1.0 - cloudRatio * 0.35);
      const nightMoonIntensity = 0.42 * (1.0 - fx.cloudDarkness * 0.5);
      const targetDirIntensity =
        THREE.MathUtils.lerp(nightMoonIntensity, baseDayIntensity, dayFactor) + lightningFlashIntensity;

      mainDirLight.intensity = THREE.MathUtils.lerp(mainDirLight.intensity, targetDirIntensity, envLerp);

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
      targetHemiGroundColor.copy(colorHemiNightGround).lerp(colorHemiDayGround, dayFactor);

      hemiLight.color.lerp(targetHemiSkyColor, envLerp);
      hemiLight.groundColor.lerp(targetHemiGroundColor, envLerp);
      hemiLight.intensity = THREE.MathUtils.lerp(hemiLight.intensity, 0.38 + 0.45 * dayFactor, envLerp);

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
      fog.density = THREE.MathUtils.lerp(fog.density, targetFogDensity, envLerp);

      const lanternActiveFactor = 1.0 - THREE.MathUtils.smoothstep(solar.altitudeDeg, -2.0, 6.0);
      lanternBulbMat.emissiveIntensity = THREE.MathUtils.lerp(
        lanternBulbMat.emissiveIntensity,
        lanternActiveFactor * 2.4,
        envLerp
      );
      lanternLights.forEach((ptLight) => {
        ptLight.intensity = THREE.MathUtils.lerp(ptLight.intensity, lanternActiveFactor * 2.2, envLerp);
      });

      const targetTerrainRoughness = THREE.MathUtils.lerp(0.88, 0.32, fx.groundWetness);
      const targetTerrainMetalness = THREE.MathUtils.lerp(0.04, 0.22, fx.groundWetness);
      terrainMat.roughness = THREE.MathUtils.lerp(terrainMat.roughness, targetTerrainRoughness, envLerp);
      terrainMat.metalness = THREE.MathUtils.lerp(terrainMat.metalness, targetTerrainMetalness, envLerp);

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
      cloudMat.opacity = THREE.MathUtils.lerp(cloudMat.opacity, targetCloudOpacity, envLerp);

      const cloudDriftSpeed = Math.max(0.45, windSpeedMs * 0.45);
      const cloudScaleMultiplier = THREE.MathUtils.lerp(0.65, 1.35, cloudRatio);

      for (const item of cloudClusters) {
        const cGroup = item.group;
        cGroup.position.x += windDirX * cloudDriftSpeed * dt;
        cGroup.position.z += windDirZ * cloudDriftSpeed * dt;

        if (cGroup.position.x - state.position.x > 130) cGroup.position.x -= 260;
        if (cGroup.position.x - state.position.x < -130) cGroup.position.x += 260;
        if (cGroup.position.z - state.position.z > 130) cGroup.position.z -= 260;
        if (cGroup.position.z - state.position.z < -130) cGroup.position.z += 260;

        const desiredScale = item.baseScale * cloudScaleMultiplier;
        cGroup.scale.setScalar(THREE.MathUtils.lerp(cGroup.scale.x, desiredScale, envLerp));
      }

      let baseRainCount = fx.rainParticleCount;
      if (baseRainCount === 0 && weather && (weather.precipitation > 0 || weather.rain > 0 || weather.showers > 0)) {
        baseRainCount = 1400;
      }
      const activeRainDrops = Math.floor(baseRainCount * rainQualityMultiplier);

      rainGeo.setDrawRange(0, activeRainDrops * 2);
      if (activeRainDrops > 0) {
        const fallSpeed = fx.rainFallSpeed > 0 ? fx.rainFallSpeed : 18.0;
        const windDriftX = windDirX * windSpeedMs * 0.55;
        const windDriftZ = windDirZ * windSpeedMs * 0.55;
        const streakLen = 0.85;
        const streakTiltX = windDriftX * 0.045;
        const streakTiltZ = windDriftZ * 0.045;

        const posArray = (rainGeo.attributes.position as THREE.BufferAttribute).array as Float32Array;

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
      const treeSwayAmp = THREE.MathUtils.clamp(0.015 + effectiveWindKmh * 0.0028, 0.015, 0.16);
      const grassSwayAmp = THREE.MathUtils.clamp(0.08 + effectiveWindKmh * 0.009, 0.08, 0.42);

      for (const tc of treeCrownGroups) {
        const wave = Math.sin(windTime + tc.phaseOffset + tc.x * 0.1 + tc.z * 0.1) * 0.7 + 0.3;
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
          const gustWave = Math.sin(windTime * 1.4 + g.x * 0.35 + g.z * 0.25) * 0.65 + 0.35;
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
    },
  };
}
