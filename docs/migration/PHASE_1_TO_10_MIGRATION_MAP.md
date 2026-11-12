# Migration map

Nguồn: history/code/da_nang_3d_open_world_simulation_phase_10.tsx. Các đích dưới đây là kế hoạch trước migration; cập nhật status khi code và test thực sự có. Không phải tuyên bố hoàn tất.

| Symbol | Dòng gốc | Đích | Status |
|---|---:|---|---|
| `IconProps` | 7 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `createSvgIcon` | 11 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Compass` | 30 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `RotateCcw` | 36 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Maximize2` | 42 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Minimize2` | 50 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Keyboard` | 58 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Activity` | 64 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Footprints` | 67 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `ArrowUpCircle` | 73 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Wind` | 80 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Droplets` | 87 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Cloud` | 93 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Sun` | 96 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Moon` | 102 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Sunrise` | 105 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Sunset` | 117 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Thermometer` | 129 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `CloudRain` | 132 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `CloudLightning` | 138 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `CloudFog` | 144 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Sparkles` | 150 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `RefreshCw` | 153 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `AlertTriangle` | 161 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `MapPin` | 167 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Clock` | 173 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Smartphone` | 179 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Tablet` | 185 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Monitor` | 191 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `CheckCircle2` | 198 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `ShieldCheck` | 204 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Gauge` | 210 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Info` | 216 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `X` | 222 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `ChevronDown` | 228 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `ChevronUp` | 229 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `MapIcon` | 230 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `Gamepad2` | 237 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `MousePointer` | 246 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `HandTouch` | 252 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `ZoomInIcon` | 260 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `ZoomOutIcon` | 268 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `CrosshairIcon` | 275 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `NavigationArrowIcon` | 284 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `EyeIcon` | 287 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `ZapIcon` | 293 | `src/modules/WorldExplorer/components/Icons.tsx` | PENDING |
| `DESIGN_SYSTEM_CSS` | 300 | `src/modules/WorldExplorer/styles.css` | PENDING |
| `DA_NANG_CONFIG` | 449 | `src/worlds/danang/const.ts` | EXTRACTED — chưa nối UI |
| `CharacterAnimationState` | 463 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `TimeOfDayPhase` | 471 | `src/worlds/danang/environment/type.ts` | EXTRACTED — type-check |
| `WeatherCondition` | 479 | `src/integrations/weather/type.ts` | EXTRACTED — type-check |
| `DeviceFormFactor` | 492 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `ActiveInputMethod` | 493 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `PanelDisplayMode` | 495 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `StatusWidgetMode` | 496 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `CriticalPanelDisplayMode` | 497 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `MovementGuideDisplayMode` | 498 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `MiniMapDisplayMode` | 499 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `MiniMapFollowMode` | 500 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `ControlInputType` | 501 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `MiniDataChipVariant` | 502 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `ControlInstruction` | 504 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `HUDPanelState` | 513 | `src/modules/WorldExplorer/type.ts` | EXTRACTED — type-check |
| `MiniMapConfig` | 525 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `MiniMapState` | 538 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `MiniMapProjectionResult` | 546 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `MiniMapPhase9ExtensionProps` | 555 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `InteractionType` | 564 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `InteractionEligibilityStatus` | 566 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `InteractableDefinition` | 573 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `RegisteredInteractableEntry` | 587 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `ActiveInteractionTargetState` | 596 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `InteractionExecutionFeedback` | 605 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `JoystickInput` | 615 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `AdaptiveDeviceProfile` | 622 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `WeatherEffectConfig` | 633 | `src/integrations/weather/type.ts` | EXTRACTED — type-check |
| `MappedWeatherInfo` | 644 | `src/integrations/weather/type.ts` | EXTRACTED — type-check |
| `DataFreshnessStatus` | 652 | `src/integrations/weather/type.ts` | EXTRACTED — type-check |
| `NormalizedWeatherState` | 654 | `src/integrations/weather/type.ts` | EXTRACTED — type-check |
| `DaNangClockData` | 680 | `src/worlds/danang/environment/type.ts` | EXTRACTED — type-check |
| `SolarAstronomicalData` | 695 | `src/worlds/danang/environment/type.ts` | EXTRACTED — type-check |
| `SynchronizedTimeSolarSnapshot` | 716 | `src/worlds/danang/environment/type.ts` | EXTRACTED — type-check |
| `KeyboardInputState` | 721 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `PerformanceMetricsSnapshot` | 730 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `PlayerRuntimeState` | 743 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `HumanoidRig` | 759 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `PlatformCollider` | 785 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `CylinderCollider` | 796 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `DiagnosticCheckResult` | 803 | `src/engine/core/type.ts` | EXTRACTED — type-check |
| `GAME_CONFIG` | 814 | `src/engine/core/const.ts` | EXTRACTED — chưa nối UI |
| `clampMiniMapZoom` | 880 | `src/engine/spatial/minimap.ts` | EXTRACTED — chưa nối UI |
| `computeMiniMapVisibleSpanMeters` | 888 | `src/engine/spatial/minimap.ts` | EXTRACTED — chưa nối UI |
| `_projWorldPos` | 899 | `src/engine/spatial/minimap.ts` | PENDING |
| `_projForwardPoint` | 900 | `src/engine/spatial/minimap.ts` | PENDING |
| `projectWorldToMiniMap` | 902 | `src/engine/spatial/minimap.ts` | EXTRACTED — chưa nối UI |
| `InteractableRegistry` | 978 | `src/engine/interactions/registry.ts` | EXTRACTED — chưa nối UI |
| `evaluateInteractionDistanceAndEligibility` | 1134 | `src/engine/interactions/registry.ts` | EXTRACTED — chưa nối UI |
| `INITIAL_INTERACTABLE_FIXTURES` | 1159 | `src/worlds/danang/zones/fixtures.ts` | EXTRACTED — chưa nối UI |
| `mapWmoWeatherCode` | 1219 | `src/integrations/weather/mapper.ts` | EXTRACTED — chưa nối UI |
| `daNangPartsFormatter` | 1457 | `src/worlds/danang/environment/solar.ts` | PENDING |
| `daNangDateEnFormatter` | 1468 | `src/worlds/danang/environment/solar.ts` | PENDING |
| `daNangDateViFormatter` | 1476 | `src/worlds/danang/environment/solar.ts` | PENDING |
| `getDaNangClockData` | 1484 | `src/worlds/danang/environment/solar.ts` | EXTRACTED — chưa nối UI |
| `formatDecimalHoursToHHMM` | 1537 | `src/worlds/danang/environment/solar.ts` | EXTRACTED — chưa nối UI |
| `formatIsoTimeString` | 1545 | `src/worlds/danang/environment/solar.ts` | EXTRACTED — chưa nối UI |
| `calculateDaNangSolarData` | 1554 | `src/worlds/danang/environment/solar.ts` | EXTRACTED — chưa nối UI |
| `buildDaNangOpenMeteoUrl` | 1696 | `src/integrations/weather/service.ts` | EXTRACTED — chưa nối UI |
| `sanitizeFiniteNumber` | 1724 | `src/integrations/weather/service.ts` | EXTRACTED — chưa nối UI |
| `validateAndNormalizeWeatherPayload` | 1743 | `src/integrations/weather/service.ts` | EXTRACTED — chưa nối UI |
| `formatCompassDirection` | 1868 | `src/integrations/weather/service.ts` | EXTRACTED — chưa nối UI |
| `isInteractiveInputElement` | 1877 | `src/engine/controls/input.ts` | EXTRACTED — chưa nối UI |
| `evaluateAdaptiveDeviceProfile` | 1901 | `src/engine/controls/input.ts` | EXTRACTED — chưa nối UI |
| `computeNormalizedJoystickInput` | 1988 | `src/engine/controls/input.ts` | EXTRACTED — chưa nối UI |
| `DESKTOP_CONTROL_INSTRUCTIONS` | 2049 | `src/modules/WorldExplorer/controls.ts` | EXTRACTED — chưa nối UI |
| `TOUCH_CONTROL_INSTRUCTIONS` | 2088 | `src/modules/WorldExplorer/controls.ts` | EXTRACTED — chưa nối UI |
| `getActiveControlGuideInstructions` | 2126 | `src/modules/WorldExplorer/controls.ts` | EXTRACTED — chưa nối UI |
| `runSystemDiagnosticsSuite` | 2137 | `src/modules/WorldExplorer/diagnostics.ts` | EXTRACTED — chưa nối UI |
| `PLATFORM_COLLIDERS` | 2375 | `src/worlds/danang/zones/synthetic.ts` | EXTRACTED — chưa nối UI |
| `ROCK_COLLIDERS` | 2383 | `src/worlds/danang/zones/synthetic.ts` | EXTRACTED — chưa nối UI |
| `TREE_COLLIDERS` | 2394 | `src/worlds/danang/zones/synthetic.ts` | EXTRACTED — chưa nối UI |
| `getTerrainElevation` | 2415 | `src/worlds/danang/zones/synthetic.ts` | EXTRACTED — chưa nối UI |
| `getSupportSurfaceHeight` | 2426 | `src/worlds/danang/zones/synthetic.ts` | EXTRACTED — chưa nối UI |
| `resolveHorizontalCollisions` | 2448 | `src/worlds/danang/zones/synthetic.ts` | EXTRACTED — chưa nối UI |
| `createOrganicGrassTexture` | 2497 | `src/engine/materials/textures.ts` | EXTRACTED — chưa nối UI |
| `createStoneTexture` | 2524 | `src/engine/materials/textures.ts` | EXTRACTED — chưa nối UI |
| `createCasualExplorerRig` | 2552 | `src/engine/character/humanoid.ts` | EXTRACTED — chưa nối UI |
| `dampValue` | 2806 | `src/engine/character/humanoid.ts` | EXTRACTED — chưa nối UI |
| `updateHumanoidAnimation` | 2815 | `src/engine/character/humanoid.ts` | EXTRACTED — chưa nối UI |
| `DustParticle` | 2980 | `src/engine/environment/dust.ts` | EXTRACTED — chưa nối UI |
| `createFootstepParticleSystem` | 2988 | `src/engine/environment/dust.ts` | EXTRACTED — chưa nối UI |
| `SeoAndDesignTokenManager` | 3059 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `DsButtonProps` | 3116 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `DsButton` | 3121 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `DsIconButtonProps` | 3150 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `DsIconButton` | 3156 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `DsBadge` | 3178 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `MiniDataChipProps` | 3201 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `formatSafeChipValue` | 3213 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `MiniDataChip` | 3232 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `getStateBadgeTone` | 3321 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `WeatherCategoryIcon` | 3339 | `src/modules/WorldExplorer/components/Primitives.tsx (SEO replaced by Next metadata)` | PENDING |
| `TopLeftMiniMapSlotProps` | 3381 | `src/modules/WorldExplorer/components/MiniMap.tsx` | PENDING |
| `TopLeftMiniMapSlot` | 3407 | `src/modules/WorldExplorer/components/MiniMap.tsx` | PENDING |
| `DaNangTimeWeatherHUDProps` | 3867 | `src/modules/WorldExplorer/components/TimeWeather.tsx` | PENDING |
| `DaNangTimeWeatherHUD` | 3878 | `src/modules/WorldExplorer/components/TimeWeather.tsx` | PENDING |
| `BottomLeftMovementGuideSlotProps` | 4331 | `src/modules/WorldExplorer/components/MovementGuide.tsx` | PENDING |
| `BottomLeftMovementGuideSlot` | 4337 | `src/modules/WorldExplorer/components/MovementGuide.tsx` | PENDING |
| `ContextualInteractionOverlayProps` | 4580 | `src/modules/WorldExplorer/components/InteractionOverlay.tsx` | PENDING |
| `ContextualInteractionOverlay` | 4595 | `src/modules/WorldExplorer/components/InteractionOverlay.tsx` | PENDING |
| `App` | 4821 | `src/modules/WorldExplorer/index.tsx + engine runtime controller` | PENDING |

## App effect và local systems

| Dòng gốc | Responsibility | Dependencies | Regression |
|---|---|---|---|
| 4821–5660 | state, focus, keyboard, polling | React, registry, weather, input | timers/races/focus |
| 5661–6428 | renderer, scene, fixtures | Three, synthetic terrain, textures, character | resource ownership |
| 6429–6590 | minimap pass | renderer/cameras, DOM refs | state restoration, failure |
| 6591–6789 | orbit/touch/wheel + scratch objects | input, camera | pointer capture/resize |
| 6790–7240 | animate/perf/sky/weather | solar/weather, material pools | throttle/no invented weather |
| 7241–7506 | movement/physics/animation | terrain/colliders, humanoid | jump/sprint/landing |
| 7507–7719 | interaction/map sync | raycasters, registry | occlusion/heading |
| 7720–7763 | cleanup | scene/materials/textures/listeners | repeated mount/unmount |
| 7764–8513 | HUD and dialogs | state/snapshots | keyboard/touch + locale parity |

Các dòng local systems là khoảng định hướng; symbol map chính xác ở bảng trên. Single-file historical rule bị master spec thay thế. First-person chưa tồn tại trong source Phase 10, không tự thêm Phase 11. DIAG-01–09 chỉ kiểm tra helpers, không thay browser gameplay regression.

## Bằng chứng nhóm extraction

`phase-regression.test.ts` so sánh trực tiếp source lịch sử cho WMO (-1..100), clock/solar (3 timestamps), joystick và map projection. DIAG-01–09 của bản tách đều PASS. `controller.test.ts` kiểm tra walk 4.5m/s, sprint 8.6m/s, diagonal, jump/landing, delta guard trên terrain synthetic phẳng. Character rig/textures/dust đã tách và type-check nhưng chưa có visual regression.

`createCharacterController` mới tách phần movement trong animate (không phải export riêng trong file gốc). Terrain/collision được inject qua `CharacterEnvironment`; callback landing tách dust khỏi physics. `EngineRuntime` và `ResourceScope` là foundation mới, không thay loop gốc trong browser. Type definitions được chia theo ownership engine, weather, city environment, UI; không còn weather provider trong generic engine types.

Giới hạn quan trọng: source lịch sử vẫn chưa được nối vào `/explore`; không được coi EXTRACTED là migrated end-to-end. Strings UI/control/fixture còn giữ nguyên source cho preservation tests; cần đưa vào typed messages en/vi trước UI integration. Weather sanitizer còn defaults của prototype; không được đưa live trước xử lý semantics thiếu dữ liệu. Async streaming, asset binary loader, profile resolver, first-person và GPU benchmark chưa triển khai.
