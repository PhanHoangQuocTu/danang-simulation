import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useRef, useState } from 'react';
import { useTranslations } from '@/hooks';
import { getDaNangClockData, calculateDaNangSolarData } from '@/worlds/danang/environment/solar';
import { idleTarget, createPlayerState } from '../runtime/world';
import type { WorldExplorerModel } from '../hooks/useWorldExplorer';
import type { HUDPanelState } from '../type';
import {
  MiniMap,
  TimeWeather,
  InformationPanels,
  MovementGuide,
  CharacterStatus,
  TouchControls,
  Interactions,
  WorldDialog,
  HudButton,
} from './WorldHud';
import { normalizeLiveWeather } from '@/integrations/weather/validation';
import { INITIAL_INTERACTABLE_FIXTURES } from '@/worlds/danang/zones/fixtures';
import '../styles/world.css';

function Preview({
  variant = 'expanded',
}: {
  variant?: 'expanded' | 'compact' | 'touch' | 'unavailable' | 'stale' | 'interaction' | 'dialog';
}) {
  const { t } = useTranslations('worldExplorer');
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const mapCanvas = useRef<HTMLCanvasElement>(null);
  const marker = useRef<HTMLDivElement>(null);
  const cone = useRef<HTMLDivElement>(null);
  const edge = useRef<HTMLSpanElement>(null);
  const [panels, setPanels] = useState<HUDPanelState>({
    miniMap: variant === 'compact' ? 'compact' : 'expanded',
    statusWidget: variant === 'compact' ? 'compact' : 'expanded',
    movementGuide: variant === 'compact' ? 'collapsed' : 'expanded',
    environmentPanel: 'compact',
    secondaryInfo: 'compact',
    playerStatus: 'expanded',
  });
  const [map, setMap] = useState({ zoom: 1, follow: false });
  const [dialog, setDialog] = useState<WorldExplorerModel['dialog']>(variant === 'dialog' ? 'specs' : null);
  const clock = getDaNangClockData(new Date('2026-11-16T05:00:00Z'));
  const solar = calculateDaNangSolarData(clock);
  const weather = normalizeLiveWeather(
    {
      current: {
        time: '2026-11-16T12:00',
        temperature_2m: 28,
        apparent_temperature: 30,
        relative_humidity_2m: 75,
        is_day: 1,
        precipitation: 0,
        rain: 0,
        showers: 0,
        weather_code: 2,
        cloud_cover: 48,
        wind_speed_10m: 12,
        wind_direction_10m: 90,
        wind_gusts_10m: 18,
      },
    },
    new Date(clock.timestampMs)
  );
  weather.freshness = variant === 'stale' ? 'stale' : 'live';
  const target = {
    ...idleTarget(),
    targetId: INITIAL_INTERACTABLE_FIXTURES[0].id,
    status: 'eligible' as const,
    definition: INITIAL_INTERACTABLE_FIXTURES[0],
    distanceMeters: 3.2,
  };
  const noop = () => undefined;
  const release = (_event: React.PointerEvent<HTMLElement>) => undefined;
  const model: WorldExplorerModel = {
    t,
    root,
    canvas,
    mapCanvas,
    marker,
    cone,
    edge,
    status: 'ready',
    generation: 0,
    snapshot: {
      x: 0,
      y: 0,
      z: 0,
      speed: 0,
      grounded: true,
      animation: 'IDLE',
      surface: 0,
      cameraDistance: 5.4,
      cameraYaw: 0,
      perf: createPlayerState().perf,
      target: variant === 'interaction' ? target : idleTarget(),
      mapStatus: 'unavailable',
    },
    profile: {
      formFactor: variant === 'touch' ? 'mobile' : 'desktop',
      activeInput: variant === 'touch' ? 'touch' : 'keyboard-mouse',
      hasCoarsePointer: variant === 'touch',
      hasFinePointer: variant !== 'touch',
      maxTouchPoints: variant === 'touch' ? 5 : 0,
      showTouchControls: variant === 'touch',
      isHybrid: false,
      orientation: 'landscape',
    },
    panels,
    setPanels,
    toggle(name) {
      setPanels(
        (current) => ({ ...current, [name]: current[name] === 'expanded' ? 'compact' : 'expanded' }) as HUDPanelState
      );
    },
    map,
    setMap,
    dialog,
    setDialog,
    feedback: null,
    fullscreen: false,
    fullscreenError: false,
    toggleFullscreen: async () => undefined,
    clock,
    solar,
    weather: variant === 'unavailable' ? null : weather,
    weatherStatus: variant === 'unavailable' ? 'error' : 'ready',
    refresh: async () => undefined,
    touch: { x: 0, y: 0, magnitude: 0, active: false, sprint: false, latched: false, jump: false },
    joystickHandlers: {
      onPointerDown: release,
      onPointerMove: release,
      onPointerUp: release,
      onKeyDown: noop,
      onKeyUp: noop,
    },
    actionHandlers: () => ({ onPointerDown: release, onPointerUp: release, onKeyDown: noop, onKeyUp: noop }),
    onCommand: noop,
    retry: noop,
    zoom(delta) {
      setMap((current) => ({ ...current, zoom: Math.min(2.8, Math.max(0.6, current.zoom + delta)) }));
    },
  };
  return (
    <div ref={root} className={`world-explorer world-root ${variant === 'touch' ? 'world-touch' : ''}`}>
      <div className='world-hud'>
        <div className='world-top-left'>
          <MiniMap model={model} />
          <InformationPanels model={model} />
        </div>
        <div className='world-top-right'>
          <TimeWeather model={model} />
        </div>
        <div className='world-bottom-left'>
          <MovementGuide model={model} />
        </div>
        <div className='world-bottom-right'>
          <CharacterStatus model={model} />
        </div>
        {variant === 'touch' && <TouchControls model={model} />}
      </div>
      <Interactions model={model} />
    </div>
  );
}
const meta = {
  title: 'Modules/WorldExplorer/HUD',
  component: Preview,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Preview>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Expanded: Story = {};
export const Compact: Story = { args: { variant: 'compact' } };
export const Touch: Story = { args: { variant: 'touch' } };
export const WeatherUnavailable: Story = { args: { variant: 'unavailable' } };
export const WeatherStale: Story = { args: { variant: 'stale' } };
export const EligibleInteraction: Story = { args: { variant: 'interaction' } };
export const Specifications: Story = { args: { variant: 'dialog' } };
export const Button: Story = {
  render: () => (
    <div className='world-explorer'>
      <HudButton onClick={() => undefined}>Control</HudButton>
    </div>
  ),
};
export const DialogPreview: Story = {
  render: () => (
    <WorldDialog title='Specifications' onClose={() => undefined}>
      Synthetic scene preview
    </WorldDialog>
  ),
};
