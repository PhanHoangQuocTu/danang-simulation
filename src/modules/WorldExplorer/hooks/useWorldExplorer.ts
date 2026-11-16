'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from '@/hooks';
import { GAME_CONFIG } from '@/engine/core/const';
import { computeNormalizedJoystickInput, evaluateAdaptiveDeviceProfile } from '@/engine/controls/input';
import type { ActiveInteractionTargetState } from '@/engine/core/type';
import type { WorldCommand } from '@/engine/controls/events';
import { clampMiniMapZoom } from '@/engine/spatial/minimap';
import { getDaNangClockData, calculateDaNangSolarData } from '@/worlds/danang/environment/solar';
import type { NormalizedWeatherState } from '@/integrations/weather/type';
import { isWeatherStale } from '@/integrations/weather/freshness';
import { fetchWeather } from '@/integrations/weather/client';
import type { HUDPanelState, PanelDisplayMode } from '../type';
import { createWorldRuntime, type WorldRuntime, type WorldSnapshot, type RuntimeStatus } from '../runtime/world';

export function useWorldExplorer() {
  const { t } = useTranslations('worldExplorer');
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mapCanvas = useRef<HTMLCanvasElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const cone = useRef<HTMLDivElement>(null);
  const edge = useRef<HTMLSpanElement>(null);
  const runtime = useRef<WorldRuntime | null>(null);
  const [_generation, setGeneration] = useState(0);
  const [status, setStatus] = useState<RuntimeStatus>('loading');
  const [snapshot, setSnapshot] = useState<WorldSnapshot | null>(null);
  const [profile, setProfile] = useState(() => evaluateAdaptiveDeviceProfile(null));
  const [panels, setPanels] = useState<HUDPanelState>(() => {
    const mobile = evaluateAdaptiveDeviceProfile(null).formFactor === 'mobile';
    return {
      miniMap: mobile ? 'compact' : 'expanded',
      statusWidget: mobile ? 'compact' : 'expanded',
      movementGuide: mobile ? 'collapsed' : 'expanded',
      environmentPanel: 'compact',
      secondaryInfo: mobile ? 'hidden' : 'compact',
      playerStatus: mobile ? 'compact' : 'expanded',
    };
  });
  const [map, setMap] = useState({ zoom: 1, follow: false });
  const [dialog, setDialog] = useState<'specs' | ActiveInteractionTargetState | null>(null);
  const [feedback, setFeedback] = useState<boolean | null>(null);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);
  const [clock, setClock] = useState(() => getDaNangClockData());
  const solar = calculateDaNangSolarData(clock);
  const [weather, setWeather] = useState<NormalizedWeatherState | null>(null);
  const [weatherStatus, setWeatherStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const weatherRef = useRef<NormalizedWeatherState | null>(null);
  const weatherRequest = useRef<AbortController | null>(null);
  const [touch, setTouch] = useState({
    x: 0,
    y: 0,
    magnitude: 0,
    active: false,
    sprint: false,
    latched: false,
    jump: false,
  });
  const pointer = useRef<number | null>(null);
  const joystickElement = useRef<HTMLElement | null>(null);
  const joystickCenter = useRef({ x: 0, y: 0 });
  const sprintTap = useRef(Number.NEGATIVE_INFINITY);
  const actionPointers = useRef<{ sprint: number | null; jump: number | null }>({ sprint: null, jump: null });
  const toggle = useCallback(
    (name: keyof HUDPanelState) =>
      setPanels((current) => {
        const next = { ...current };
        if (name === 'environmentPanel' || name === 'secondaryInfo') {
          const cycles: Record<PanelDisplayMode, PanelDisplayMode> =
            name === 'environmentPanel'
              ? { expanded: 'compact', compact: 'hidden', hidden: 'compact' }
              : { hidden: 'compact', compact: 'expanded', expanded: 'hidden' };
          next[name] = cycles[current[name]];
        } else if (name === 'movementGuide')
          next.movementGuide = current.movementGuide === 'expanded' ? 'collapsed' : 'expanded';
        else next[name] = current[name] === 'expanded' ? 'compact' : 'expanded';
        return next;
      }),
    []
  );
  const resetTouch = useCallback(() => {
    pointer.current = null;
    actionPointers.current = { sprint: null, jump: null };
    setTouch({ x: 0, y: 0, magnitude: 0, active: false, sprint: false, latched: false, jump: false });
  }, []);
  const interact = useCallback(() => {
    const result = runtime.current?.interact();
    if (!result) {
      toggle('environmentPanel');
      return;
    }
    if (result.definition?.type === 'activate') setFeedback(result.isActivated);
    else setDialog(result);
  }, [toggle]);
  const onCommand = useCallback(
    (command: WorldCommand) => {
      switch (command) {
        case 'escape':
          setDialog(null);
          if (document.pointerLockElement) document.exitPointerLock();
          break;
        case 'reset':
          runtime.current?.reset();
          resetTouch();
          break;
        case 'interact':
          interact();
          break;
        case 'environment':
          toggle('environmentPanel');
          break;
        case 'debug':
          toggle('secondaryInfo');
          break;
        case 'guide':
          toggle('movementGuide');
          break;
        case 'map':
          toggle('miniMap');
          break;
        case 'follow':
          setMap((value) => ({ ...value, follow: !value.follow }));
          break;
      }
    },
    [interact, toggle, resetTouch]
  );
  const onCommandRef = useRef(onCommand);
  onCommandRef.current = onCommand;
  useEffect(() => {
    if (!canvas.current || !mapCanvas.current || !marker.current || !cone.current || !edge.current) return;
    let active = true;
    try {
      const instance = createWorldRuntime({
        canvas: canvas.current,
        mapCanvas: mapCanvas.current,
        marker: marker.current,
        cone: cone.current,
        edge: edge.current,
        release: () => {
          if (active) resetTouch();
        },
        command: (command) => onCommandRef.current(command),
        device: (input) => setProfile(evaluateAdaptiveDeviceProfile(input)),
        snapshot: (value) => {
          if (active) setSnapshot(value);
        },
        status: (value) => {
          if (active) setStatus(value);
        },
      });
      runtime.current = instance;
      return () => {
        active = false;
        runtime.current = null;
        instance.dispose();
      };
    } catch (error) {
      setStatus(error instanceof Error && /WebGL|context|renderer/i.test(error.message) ? 'unsupported' : 'error');
    }
  }, [resetTouch]);
  useEffect(() => {
    runtime.current?.setMap(map.zoom, map.follow);
  }, [map]);
  useEffect(() => {
    runtime.current?.setBlocked(dialog !== null);
    if (dialog) resetTouch();
  }, [dialog, resetTouch]);
  useEffect(() => {
    runtime.current?.setWeather(weather);
  }, [weather]);
  useEffect(() => {
    const update = () => setClock(getDaNangClockData());
    update();
    const timer = setInterval(update, 1000);
    const visible = () => {
      if (!document.hidden) update();
    };
    document.addEventListener('visibilitychange', visible);
    return () => {
      clearInterval(timer);
      document.removeEventListener('visibilitychange', visible);
    };
  }, []);
  const refresh = useCallback(async () => {
    weatherRequest.current?.abort();
    const controller = new AbortController();
    weatherRequest.current = controller;
    if (!weatherRef.current) setWeatherStatus('loading');
    try {
      const observation = await fetchWeather(controller.signal);
      if (controller.signal.aborted) return;
      const current = {
        ...observation,
        freshness: isWeatherStale(observation) ? ('stale' as const) : ('live' as const),
      };
      weatherRef.current = current;
      setWeather(current);
      setWeatherStatus('ready');
    } catch {
      if (controller.signal.aborted) return;
      setWeatherStatus('error');
      if (weatherRef.current) {
        const stale = { ...weatherRef.current, freshness: 'stale' as const };
        weatherRef.current = stale;
        setWeather(stale);
      }
    }
  }, []);
  useEffect(() => {
    void refresh();
    const timer = setInterval(() => {
      if (!document.hidden) void refresh();
    }, GAME_CONFIG.weatherRefreshIntervalMs);
    const visible = () => {
      if (
        !document.hidden &&
        Date.now() - (weatherRef.current?.fetchedAtTimestampMs ?? 0) >= GAME_CONFIG.weatherRefreshIntervalMs
      )
        void refresh();
    };
    document.addEventListener('visibilitychange', visible);
    return () => {
      clearInterval(timer);
      weatherRequest.current?.abort();
      document.removeEventListener('visibilitychange', visible);
    };
  }, [refresh]);
  useEffect(() => {
    if (
      weatherRef.current &&
      isWeatherStale(weatherRef.current, clock.timestampMs) &&
      weatherRef.current.freshness !== 'stale'
    ) {
      const stale = { ...weatherRef.current, freshness: 'stale' as const };
      weatherRef.current = stale;
      setWeather(stale);
    }
  }, [clock.timestampMs]);
  useEffect(() => {
    if (feedback === null) return;
    const timer = setTimeout(() => setFeedback(null), 3400);
    return () => clearTimeout(timer);
  }, [feedback]);
  useEffect(() => {
    const release = () => {
      if (document.hidden || !document.hasFocus()) resetTouch();
    };
    const resize = () =>
      setProfile((current) => evaluateAdaptiveDeviceProfile(current.showTouchControls ? 'touch' : 'mouse'));
    const changed = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', changed);
    window.addEventListener('resize', resize);
    window.addEventListener('blur', release);
    document.addEventListener('visibilitychange', release);
    return () => {
      document.removeEventListener('fullscreenchange', changed);
      window.removeEventListener('resize', resize);
      window.removeEventListener('blur', release);
      document.removeEventListener('visibilitychange', release);
    };
  }, [resetTouch]);
  const toggleFullscreen = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (root.current?.requestFullscreen) await root.current.requestFullscreen();
      else throw new Error('Fullscreen unavailable');
      setFullscreenError(false);
    } catch {
      setFullscreenError(true);
    }
  };
  const setJoystick = (event: React.PointerEvent<HTMLElement>) => {
    const radius = profile.formFactor === 'tablet' ? 54 : 44;
    const result = computeNormalizedJoystickInput(
      event.clientX - joystickCenter.current.x,
      event.clientY - joystickCenter.current.y,
      radius,
      0.12
    );
    runtime.current?.joystick(result.input);
    setTouch((current) => ({
      ...current,
      x: result.thumbOffsetPx.x,
      y: result.thumbOffsetPx.y,
      magnitude: result.input.magnitude,
      active: true,
    }));
  };
  const joystickHandlers = {
    onKeyDown(event: React.KeyboardEvent<HTMLElement>) {
      const directions: Record<string, [number, number]> = {
        ArrowUp: [0, 1],
        ArrowDown: [0, -1],
        ArrowLeft: [-1, 0],
        ArrowRight: [1, 0],
      };
      const direction = directions[event.code];
      if (!direction || dialog) return;
      event.preventDefault();
      runtime.current?.joystick({ x: direction[0], y: direction[1], magnitude: 1, active: true });
      setTouch((current) => ({ ...current, x: direction[0] * 44, y: -direction[1] * 44, magnitude: 1, active: true }));
    },
    onKeyUp(event: React.KeyboardEvent<HTMLElement>) {
      if (!event.code.startsWith('Arrow')) return;
      runtime.current?.joystick({ x: 0, y: 0, magnitude: 0, active: false });
      setTouch((current) => ({ ...current, x: 0, y: 0, magnitude: 0, active: false }));
    },
    onPointerDown(event: React.PointerEvent<HTMLElement>) {
      event.preventDefault();
      event.stopPropagation();
      if (dialog || pointer.current !== null) return;
      pointer.current = event.pointerId;
      joystickElement.current = event.currentTarget;
      event.currentTarget.setPointerCapture(event.pointerId);
      const rect = event.currentTarget.getBoundingClientRect();
      joystickCenter.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      setJoystick(event);
    },
    onPointerMove(event: React.PointerEvent<HTMLElement>) {
      if (pointer.current === event.pointerId) {
        event.preventDefault();
        setJoystick(event);
      }
    },
    onPointerUp(event: React.PointerEvent<HTMLElement>) {
      if (pointer.current !== event.pointerId) return;
      pointer.current = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
      runtime.current?.joystick({ x: 0, y: 0, magnitude: 0, active: false });
      setTouch((current) => ({ ...current, x: 0, y: 0, magnitude: 0, active: false }));
    },
  };
  const actionHandlers = (action: 'sprint' | 'jump') => ({
    onPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
      event.preventDefault();
      event.stopPropagation();
      if (dialog || actionPointers.current[action] !== null) return;
      actionPointers.current[action] = event.pointerId;
      event.currentTarget.setPointerCapture(event.pointerId);
      runtime.current?.action(action, true);
      setTouch((current) => ({ ...current, [action]: true }));
      if (action === 'sprint') {
        const now = performance.now();
        if (now - sprintTap.current < 320) {
          setTouch((current) => {
            runtime.current?.action('sprintLatched', !current.latched);
            return { ...current, latched: !current.latched };
          });
          sprintTap.current = Number.NEGATIVE_INFINITY;
        } else sprintTap.current = now;
      }
    },
    onPointerUp(event: React.PointerEvent<HTMLButtonElement>) {
      if (actionPointers.current[action] !== event.pointerId) return;
      actionPointers.current[action] = null;
      if (event.currentTarget.hasPointerCapture(event.pointerId))
        event.currentTarget.releasePointerCapture(event.pointerId);
      runtime.current?.action(action, false);
      setTouch((current) => ({ ...current, [action]: false }));
    },
    onKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
      if (event.code === 'Space' || event.code === 'Enter') {
        event.preventDefault();
        runtime.current?.action(action, true);
        setTouch((current) => ({ ...current, [action]: true }));
      }
    },
    onKeyUp() {
      runtime.current?.action(action, false);
      setTouch((current) => ({ ...current, [action]: false }));
    },
  });
  return {
    t,
    root,
    canvas,
    mapCanvas,
    marker,
    cone,
    edge,
    status,
    snapshot,
    profile,
    panels,
    toggle,
    setPanels,
    map,
    setMap,
    dialog,
    setDialog,
    feedback,
    fullscreen,
    fullscreenError,
    toggleFullscreen,
    clock,
    solar,
    weather,
    weatherStatus,
    refresh,
    touch,
    joystickHandlers,
    actionHandlers,
    onCommand,
    retry: () => {
      setStatus('loading');
      setGeneration((value) => value + 1);
    },
    zoom: (delta: number) => setMap((current) => ({ ...current, zoom: clampMiniMapZoom(current.zoom + delta) })),
  };
}
export type WorldExplorerModel = ReturnType<typeof useWorldExplorer>;
