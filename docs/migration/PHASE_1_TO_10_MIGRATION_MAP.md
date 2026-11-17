# Migration map

Browser evidence for the integrated responsibilities is recorded in the [Phase 1–10 QA report](evidence/PHASE_1_TO_10_BROWSER_QA_REPORT.md), including matched screenshots of the executed original reference. Integration status does not imply physical-device or full master-spec certification.

Nguồn: history/code/da_nang_3d_open_world_simulation_phase_10.tsx. Cập nhật 2026-11-17: các đích dưới đây là ownership thực tế của integration. INTEGRATED chỉ xác nhận responsibility đã nối vào runtime/HUD; không chứng nhận pixel-perfect hoặc mọi browser state. Xem INTEGRATION_REPORT_2026_11_17.md cho bằng chứng và giới hạn.

| Symbol | Dòng gốc | Đích | Status |
|---|---:|---|---|
| `IconProps` | 7 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `createSvgIcon` | 11 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Compass` | 30 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `RotateCcw` | 36 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Maximize2` | 42 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Minimize2` | 50 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Keyboard` | 58 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Activity` | 64 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Footprints` | 67 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `ArrowUpCircle` | 73 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Wind` | 80 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Droplets` | 87 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Cloud` | 93 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Sun` | 96 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Moon` | 102 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Sunrise` | 105 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Sunset` | 117 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Thermometer` | 129 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `CloudRain` | 132 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `CloudLightning` | 138 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `CloudFog` | 144 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Sparkles` | 150 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `RefreshCw` | 153 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `AlertTriangle` | 161 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `MapPin` | 167 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Clock` | 173 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Smartphone` | 179 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Tablet` | 185 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Monitor` | 191 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `CheckCircle2` | 198 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `ShieldCheck` | 204 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Gauge` | 210 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Info` | 216 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `X` | 222 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `ChevronDown` | 228 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `ChevronUp` | 229 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `MapIcon` | 230 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `Gamepad2` | 237 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `MousePointer` | 246 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `HandTouch` | 252 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `ZoomInIcon` | 260 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `ZoomOutIcon` | 268 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `CrosshairIcon` | 275 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `NavigationArrowIcon` | 284 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `EyeIcon` | 287 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `ZapIcon` | 293 | `src/modules/WorldExplorer/components/Icons.tsx` | INTEGRATED |
| `DESIGN_SYSTEM_CSS` | 300 | `src/modules/WorldExplorer/styles/world.css` | INTEGRATED |
| `DA_NANG_CONFIG` | 449 | `src/worlds/danang/const.ts` | INTEGRATED |
| `CharacterAnimationState` | 463 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `TimeOfDayPhase` | 471 | `src/worlds/danang/environment/type.ts` | INTEGRATED — type-check |
| `WeatherCondition` | 479 | `src/integrations/weather/type.ts` | INTEGRATED — type-check |
| `DeviceFormFactor` | 492 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `ActiveInputMethod` | 493 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `PanelDisplayMode` | 495 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `StatusWidgetMode` | 496 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `CriticalPanelDisplayMode` | 497 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `MovementGuideDisplayMode` | 498 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `MiniMapDisplayMode` | 499 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `MiniMapFollowMode` | 500 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `ControlInputType` | 501 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `MiniDataChipVariant` | 502 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `ControlInstruction` | 504 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `HUDPanelState` | 513 | `src/modules/WorldExplorer/type.ts` | INTEGRATED — type-check |
| `MiniMapConfig` | 525 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `MiniMapState` | 538 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `MiniMapProjectionResult` | 546 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `MiniMapPhase9ExtensionProps` | 555 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `InteractionType` | 564 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `InteractionEligibilityStatus` | 566 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `InteractableDefinition` | 573 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `RegisteredInteractableEntry` | 587 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `ActiveInteractionTargetState` | 596 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `InteractionExecutionFeedback` | 605 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `JoystickInput` | 615 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `AdaptiveDeviceProfile` | 622 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `WeatherEffectConfig` | 633 | `src/integrations/weather/type.ts` | INTEGRATED — type-check |
| `MappedWeatherInfo` | 644 | `src/integrations/weather/type.ts` | INTEGRATED — type-check |
| `DataFreshnessStatus` | 652 | `src/integrations/weather/type.ts` | INTEGRATED — type-check |
| `NormalizedWeatherState` | 654 | `src/integrations/weather/type.ts` | INTEGRATED — type-check |
| `DaNangClockData` | 680 | `src/worlds/danang/environment/type.ts` | INTEGRATED — type-check |
| `SolarAstronomicalData` | 695 | `src/worlds/danang/environment/type.ts` | INTEGRATED — type-check |
| `SynchronizedTimeSolarSnapshot` | 716 | `src/worlds/danang/environment/type.ts` | INTEGRATED — type-check |
| `KeyboardInputState` | 721 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `PerformanceMetricsSnapshot` | 730 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `PlayerRuntimeState` | 743 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `HumanoidRig` | 759 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `PlatformCollider` | 785 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `CylinderCollider` | 796 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `DiagnosticCheckResult` | 803 | `src/engine/core/type.ts` | INTEGRATED — type-check |
| `GAME_CONFIG` | 814 | `src/engine/core/const.ts` | INTEGRATED |
| `clampMiniMapZoom` | 880 | `src/engine/spatial/minimap.ts` | INTEGRATED |
| `computeMiniMapVisibleSpanMeters` | 888 | `src/engine/spatial/minimap.ts` | INTEGRATED |
| `_projWorldPos` | 899 | `src/engine/spatial/minimap.ts` | INTEGRATED |
| `_projForwardPoint` | 900 | `src/engine/spatial/minimap.ts` | INTEGRATED |
| `projectWorldToMiniMap` | 902 | `src/engine/spatial/minimap.ts` | INTEGRATED |
| `InteractableRegistry` | 978 | `src/engine/interactions/registry.ts` | INTEGRATED |
| `evaluateInteractionDistanceAndEligibility` | 1134 | `src/engine/interactions/registry.ts` | INTEGRATED |
| `INITIAL_INTERACTABLE_FIXTURES` | 1159 | `src/worlds/danang/zones/fixtures.ts` | INTEGRATED |
| `mapWmoWeatherCode` | 1219 | `src/integrations/weather/mapper.ts` | INTEGRATED |
| `daNangPartsFormatter` | 1457 | `src/worlds/danang/environment/solar.ts` | INTEGRATED |
| `daNangDateEnFormatter` | 1468 | `src/worlds/danang/environment/solar.ts` | INTEGRATED |
| `daNangDateViFormatter` | 1476 | `src/worlds/danang/environment/solar.ts` | INTEGRATED |
| `getDaNangClockData` | 1484 | `src/worlds/danang/environment/solar.ts` | INTEGRATED |
| `formatDecimalHoursToHHMM` | 1537 | `src/worlds/danang/environment/solar.ts` | INTEGRATED |
| `formatIsoTimeString` | 1545 | `src/worlds/danang/environment/solar.ts` | INTEGRATED |
| `calculateDaNangSolarData` | 1554 | `src/worlds/danang/environment/solar.ts` | INTEGRATED |
| `buildDaNangOpenMeteoUrl` | 1696 | `src/integrations/weather/service.ts` | INTEGRATED |
| `sanitizeFiniteNumber` | 1724 | `src/integrations/weather/service.ts` | INTEGRATED |
| `validateAndNormalizeWeatherPayload` | 1743 | `src/integrations/weather/service.ts` | INTEGRATED |
| `formatCompassDirection` | 1868 | `src/integrations/weather/service.ts` | INTEGRATED |
| `isInteractiveInputElement` | 1877 | `src/engine/controls/input.ts` | INTEGRATED |
| `evaluateAdaptiveDeviceProfile` | 1901 | `src/engine/controls/input.ts` | INTEGRATED |
| `computeNormalizedJoystickInput` | 1988 | `src/engine/controls/input.ts` | INTEGRATED |
| `DESKTOP_CONTROL_INSTRUCTIONS` | 2049 | `src/modules/WorldExplorer/controls.ts` | INTEGRATED |
| `TOUCH_CONTROL_INSTRUCTIONS` | 2088 | `src/modules/WorldExplorer/controls.ts` | INTEGRATED |
| `getActiveControlGuideInstructions` | 2126 | `src/modules/WorldExplorer/controls.ts` | INTEGRATED |
| `runSystemDiagnosticsSuite` | 2137 | `src/modules/WorldExplorer/diagnostics.ts` | INTEGRATED |
| `PLATFORM_COLLIDERS` | 2375 | `src/worlds/danang/zones/synthetic.ts` | INTEGRATED |
| `ROCK_COLLIDERS` | 2383 | `src/worlds/danang/zones/synthetic.ts` | INTEGRATED |
| `TREE_COLLIDERS` | 2394 | `src/worlds/danang/zones/synthetic.ts` | INTEGRATED |
| `getTerrainElevation` | 2415 | `src/worlds/danang/zones/synthetic.ts` | INTEGRATED |
| `getSupportSurfaceHeight` | 2426 | `src/worlds/danang/zones/synthetic.ts` | INTEGRATED |
| `resolveHorizontalCollisions` | 2448 | `src/worlds/danang/zones/synthetic.ts` | INTEGRATED |
| `createOrganicGrassTexture` | 2497 | `src/engine/materials/textures.ts` | INTEGRATED |
| `createStoneTexture` | 2524 | `src/engine/materials/textures.ts` | INTEGRATED |
| `createCasualExplorerRig` | 2552 | `src/engine/character/humanoid.ts` | INTEGRATED |
| `dampValue` | 2806 | `src/engine/character/humanoid.ts` | INTEGRATED |
| `updateHumanoidAnimation` | 2815 | `src/engine/character/humanoid.ts` | INTEGRATED |
| `DustParticle` | 2980 | `src/engine/environment/dust.ts` | INTEGRATED |
| `createFootstepParticleSystem` | 2988 | `src/engine/environment/dust.ts` | INTEGRATED |
| `SeoAndDesignTokenManager` | 3059 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `DsButtonProps` | 3116 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `DsButton` | 3121 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `DsIconButtonProps` | 3150 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `DsIconButton` | 3156 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `DsBadge` | 3178 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `MiniDataChipProps` | 3201 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `formatSafeChipValue` | 3213 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `MiniDataChip` | 3232 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `getStateBadgeTone` | 3321 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `WeatherCategoryIcon` | 3339 | `src/modules/WorldExplorer/components/WorldHud.tsx (SEO replaced by Next metadata)` | INTEGRATED |
| `TopLeftMiniMapSlotProps` | 3381 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `TopLeftMiniMapSlot` | 3407 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `DaNangTimeWeatherHUDProps` | 3867 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `DaNangTimeWeatherHUD` | 3878 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `BottomLeftMovementGuideSlotProps` | 4331 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `BottomLeftMovementGuideSlot` | 4337 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `ContextualInteractionOverlayProps` | 4580 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `ContextualInteractionOverlay` | 4595 | `src/modules/WorldExplorer/components/WorldHud.tsx` | INTEGRATED |
| `App` | 4821 | `src/modules/WorldExplorer/index.tsx + components/WorldExplorerClient.tsx + hooks/useWorldExplorer.ts + runtime/world.ts` | INTEGRATED |

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

## Bằng chứng integration hiện tại

Helper preservation vẫn được kiểm tra bằng phase-regression.test.ts: WMO (-1..100), clock/solar, joystick và map projection; DIAG-01–09 không thay browser QA. Generic controller/runtime/resources/registries được dùng lại, không sao chép calculations vào React.

App responsibilities hiện nằm ở runtime/world.ts (loop/camera/interaction/map), engine/controls/events.ts (event lifecycle), hooks/useWorldExplorer.ts (UI/weather/browser lifecycle), worlds/danang/scene.ts (scene composition) và worlds/danang/environment/simulation.ts (atmosphere/weather). Toàn bộ HUD nằm trong components/WorldHud.tsx, với icons và scoped CSS riêng. SeoAndDesignTokenManager được thay bằng Next metadata, semantic server content và scoped CSS; không giữ client-side robots mutation. Một số tên helper/component lịch sử được gộp theo responsibility, không nhất thiết giữ một export cùng tên.

Retry generation, reset pointer-lock/quality, instanced-grass buffer disposal và map settling có regression tests. Browser thật đã kiểm tra homepage và production scene; xem [integration report](INTEGRATION_REPORT_2026_11_17.md) cùng evidence có ngày. Character movement, terrain/vegetation, weather/time HUD, minimap, beacon interaction, dialogs và desktop/touch controls đã nối vào ứng dụng.

Các strings UI/control/fixture hiển thị qua typed messages en/vi; historical fixture/control descriptions chỉ giữ làm reference dữ liệu, không render trực tiếp. Weather live boundary dùng validation.ts trước normalizer cũ và fixed /api/weather BFF; không đưa historical defaults ra làm quan trắc thật.

Không thêm first-person, GIS, async city streaming hoặc Phase 11. Pixel-perfect visual parity, thiết bị thật và long-running GPU memory profiling chưa được chứng minh. Full master specification còn các milestones ngoài phạm vi Prompt 01.
