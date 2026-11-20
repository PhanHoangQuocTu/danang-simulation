'use client';
import { useMemo, useRef } from 'react';
import type { ReactNode } from 'react';
import { Dialog as DialogPrimitive } from 'radix-ui';
import { Dialog, DialogPortal, DialogTitle } from '@/components/ui/dialog';
import { useTranslations } from '@/hooks';
import type { messages } from '@/messages';
import type { WorldExplorerModel } from '../hooks/useWorldExplorer';
import { getActiveControlGuideInstructions } from '../controls';
import { formatCompassDirection } from '@/integrations/weather/service';
import { runSystemDiagnosticsSuite } from '../diagnostics';
import { runGeospatialDiagnosticsSuite } from '../geospatial-diagnostics';
import { runTerrainDiagnosticsSuite } from '../terrain-diagnostics';
import { getActiveTerrainProvider, resolveMiniMapHalfExtentMeters } from '../runtime/world';
import { useGeoTelemetry } from '../hooks/useGeoTelemetry';
import { computeMiniMapVisibleSpanMeters } from '@/engine/spatial/minimap';
import { GAME_CONFIG } from '@/engine/core/const';
import { danangSourceRegistry } from '@/worlds/danang/data-sources';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { ImageryInspector } from './ImageryInspector';
import {
  Compass,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Maximize2,
  Minimize2,
  MapIcon,
  Activity,
  Info,
  X,
  Sun,
  Moon,
  Cloud,
  CloudRain,
  CloudLightning,
  CloudFog,
  Keyboard,
  Gamepad2,
  Footprints,
  ArrowUpCircle,
  NavigationArrowIcon,
} from './Icons';

type CopyKey = keyof typeof messages.en.worldExplorer;
const sourceReadiness = danangSourceRegistry.getReadinessSummary();
const sourceCatalog = danangSourceRegistry.listSources();
const sourceStatusKeys = {
  candidate: 'sourceCandidate',
  'metadata-verified': 'sourceMetadataVerified',
  'approved-for-ingestion': 'sourceApproved',
  ingested: 'sourceIngested',
  blocked: 'sourceBlocked',
  rejected: 'sourceRejected',
} as const;
export function HudButton({
  children,
  onClick,
  label,
  active,
  expanded,
  disabled = false,
}: {
  children: ReactNode;
  onClick(): void;
  label?: string;
  active?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type='button'
      className={`ds-btn world-button ${active ? 'world-active' : ''}`}
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={active}
      aria-expanded={expanded}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export function WeatherIcon({ model }: { model: WorldExplorerModel }) {
  const { weather, solar } = model;
  if (!weather) return <Cloud className='world-weather-icon world-muted' />;
  if (weather.mapped.category === 'thunderstorm') return <CloudLightning className='world-weather-icon world-amber' />;
  if (['rain', 'heavy-rain', 'showers', 'drizzle', 'snow'].includes(weather.mapped.category))
    return <CloudRain className='world-weather-icon world-sky' />;
  if (weather.mapped.category === 'fog') return <CloudFog className='world-weather-icon' />;
  if (['clear', 'mainly-clear'].includes(weather.mapped.category))
    return solar.phase === 'NIGHT' ? (
      <Moon className='world-weather-icon' />
    ) : (
      <Sun className='world-weather-icon world-amber' />
    );
  return <Cloud className='world-weather-icon world-sky' />;
}
export function WorldDialog({
  title,
  children,
  onClose,
  container,
}: {
  title: string;
  children: ReactNode;
  onClose(): void;
  container?: HTMLElement | null;
}) {
  const { t } = useTranslations('worldExplorer');
  const returnFocus = useRef(
    typeof document !== 'undefined' && document.activeElement instanceof HTMLElement ? document.activeElement : null
  );
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogPortal container={container}>
        <DialogPrimitive.Overlay className='world-dialog-overlay' />
        <DialogPrimitive.Content
          className='world-explorer world-dialog ds-surface-card'
          aria-describedby={undefined}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (returnFocus.current?.isConnected) returnFocus.current.focus();
            else container?.querySelector('canvas')?.focus();
          }}
        >
          <header className='world-panel-heading'>
            <DialogTitle>{title}</DialogTitle>
            <HudButton label={t('close')} onClick={onClose}>
              <X />
            </HudButton>
          </header>
          {children}
          <footer className='world-dialog-footer'>
            <HudButton onClick={onClose}>{t('close')}</HudButton>
          </footer>
        </DialogPrimitive.Content>
      </DialogPortal>
    </Dialog>
  );
}
export function MiniMap({ model: m }: { model: WorldExplorerModel }) {
  const { t } = m;
  const compact = m.panels.miniMap === 'compact';
  return (
    <section
      className={`world-minimap-column ${compact ? 'world-map-compact' : ''}`}
      data-hud-interactive='true'
      data-hud-zone='top-left'
    >
      <div className='ds-surface-card world-brand'>
        <Compass />
        <div>
          <strong>{t('brand')}</strong>
          <small>
            {t(m.profile.formFactor)} · {t(m.profile.activeInput)}
          </small>
        </div>
        <HudButton
          expanded={!compact}
          label={t(compact ? 'expand' : 'collapse', { panel: t('map') })}
          onClick={() => m.toggle('miniMap')}
        >
          {compact ? <ChevronDown /> : <ChevronUp />}
        </HudButton>
      </div>
      <div className='ds-surface-card world-map-panel' data-testid='minimap-container'>
        <header className='world-panel-heading'>
          <strong>
            <MapIcon />
            {t(m.map.follow ? 'follow' : 'overview')}
          </strong>
          <HudButton active={m.map.follow} label={t('follow')} onClick={() => m.onCommand('follow')}>
            {t(m.map.follow ? 'follow' : 'static')}
          </HudButton>
          <span>{m.map.zoom.toFixed(1)}×</span>
        </header>
        <div className='world-map-body'>
          <div className='world-map-viewport' data-testid='minimap-viewport'>
            <canvas ref={m.mapCanvas} width={256} height={256} aria-label={t('mapLabel')} />
            <div className='world-map-cross' aria-hidden='true' />
            <div ref={m.marker} className='world-map-marker' data-testid='minimap-player-marker'>
              <div ref={m.cone} className='world-map-cone' data-testid='minimap-player-direction'>
                <svg viewBox='0 0 40 40' aria-hidden='true'>
                  <path d='M20 20 L8 4 A18 18 0 0 1 32 4 Z' fill='currentColor' />
                </svg>
                <NavigationArrowIcon />
              </div>
              <span ref={m.edge} hidden>
                {t('edge')}
              </span>
            </div>
            <div className='world-map-compass' aria-hidden='true'>
              <span>-Z</span>
              <span>-X</span>
              <span>+X</span>
              <span>+Z</span>
            </div>
            {m.snapshot?.mapStatus !== 'ready' && (
              <div className='world-map-loading' role='status'>
                {t(m.snapshot?.mapStatus === 'unavailable' ? 'mapUnavailable' : 'mapLoading')}
              </div>
            )}
          </div>
          <div className='world-map-controls'>
            {!compact && (
              <>
                <small className='world-sky'>{t('position')}</small>
                <strong data-testid='minimap-player-coords'>
                  {m.snapshot?.x.toFixed(2) ?? '0.00'} m, {m.snapshot?.z.toFixed(2) ?? '0.00'} m
                </strong>
                <small>
                  {t('span', {
                    value: computeMiniMapVisibleSpanMeters(
                      m.map.zoom,
                      resolveMiniMapHalfExtentMeters(getActiveTerrainProvider())
                    ),
                  })}
                </small>
              </>
            )}
            <div className='world-inline'>
              <HudButton label={t('zoomIn')} onClick={() => m.zoom(0.35)} disabled={m.map.zoom >= 2.8}>
                +
              </HudButton>
              <HudButton label={t('zoomOut')} onClick={() => m.zoom(-0.35)} disabled={m.map.zoom <= 0.6}>
                −
              </HudButton>
            </div>
            {!compact && (
              <HudButton onClick={() => m.setMap((value) => ({ ...value, zoom: 1 }))} disabled={m.map.zoom === 1}>
                {t('resetZoom')}
              </HudButton>
            )}
          </div>
        </div>
      </div>
      <nav className='world-toolbar' aria-label={t('controls')}>
        <HudButton label={`${t('reset')} (R)`} onClick={() => m.onCommand('reset')}>
          <RotateCcw />
          {t('reset')}
        </HudButton>
        <HudButton active={m.panels.environmentPanel !== 'hidden'} onClick={() => m.toggle('environmentPanel')}>
          <MapIcon />
          {t('environment')}
        </HudButton>
        <HudButton active={m.panels.secondaryInfo !== 'hidden'} onClick={() => m.toggle('secondaryInfo')}>
          <Activity />
          {t('debug')}
        </HudButton>
        <HudButton label={t('specs')} onClick={() => m.setDialog('specs')}>
          <Info />
          <span className='world-desktop-label'>{t('specs')}</span>
        </HudButton>
        <HudButton label={t(m.fullscreen ? 'exitFullscreen' : 'fullscreen')} onClick={() => void m.toggleFullscreen()}>
          {m.fullscreen ? <Minimize2 /> : <Maximize2 />}
        </HudButton>
      </nav>
      {m.fullscreenError && <p role='status'>{t('fullscreenError')}</p>}
    </section>
  );
}
export function TimeWeather({ model: m }: { model: WorldExplorerModel }) {
  const { t, locale } = useTranslations('worldExplorer');
  const compact = m.panels.statusWidget === 'compact';
  const weather = m.weather;
  const compassKeys: Record<string, CopyKey> = {
    Bắc: 'north',
    ĐB: 'northeast',
    Đông: 'east',
    ĐN: 'southeast',
    Nam: 'south',
    TN: 'southwest',
    Tây: 'west',
    TB: 'northwest',
  };
  const temperature = weather ? `${Math.round(weather.temperature)}°C` : t('noTemperature');
  const label = weather
    ? t(weather.mapped.category)
    : t(m.weatherStatus === 'loading' ? 'weatherLoading' : 'weatherUnavailable');
  return (
    <aside
      className={`ds-surface-card world-weather ${compact ? 'world-weather-compact' : ''}`}
      data-hud-interactive='true'
      data-hud-zone='top-right'
      data-widget-mode={m.panels.statusWidget}
      aria-label={t('weather')}
    >
      <header className='world-weather-heading'>
        <div>
          {!compact && <strong className='world-sky'>{t('location')}</strong>}
          <time dateTime={new Date(m.clock.timestampMs).toISOString()}>
            {compact && m.profile.formFactor === 'mobile' ? m.clock.timeShortString : m.clock.timeString}
          </time>
          {!compact && (
            <>
              <small>{locale === 'vi' ? m.clock.dateStringVi : m.clock.dateStringEn}</small>
              <small className='world-muted'>{t('timezone')}</small>
            </>
          )}
        </div>
        {!compact && (
          <span className='world-phase'>
            {m.solar.phase === 'NIGHT' ? <Moon /> : <Sun />}
            {t(m.solar.phase)}
            <small>{m.solar.altitudeDeg.toFixed(1)}°</small>
          </span>
        )}
        {compact && (
          <>
            <WeatherIcon model={m} />
            <strong title={label}>{temperature}</strong>
            {weather?.freshness === 'stale' && (
              <span role='img' className='world-amber' aria-label={t('stale')}>
                ●
              </span>
            )}
          </>
        )}
        <HudButton
          expanded={!compact}
          label={t(compact ? 'expand' : 'collapse', { panel: t('weather') })}
          onClick={() => m.toggle('statusWidget')}
        >
          {compact ? <ChevronDown /> : <ChevronUp />}
        </HudButton>
      </header>
      {!compact && (
        <>
          <div className='ds-surface-elevated world-weather-summary'>
            <WeatherIcon model={m} />
            <div>
              <strong>{temperature}</strong>
              {weather && <small>{t('feelsLike', { value: Math.round(weather.apparentTemperature) })}</small>}
              <p>{label}</p>
            </div>
            <span className={weather?.freshness === 'stale' ? 'world-amber' : 'world-green'}>
              {weather && <small>WMO #{weather.weatherCode}</small>}
              {weather
                ? t(weather.freshness === 'stale' ? 'stale' : 'live')
                : t(m.weatherStatus === 'loading' ? 'weatherLoading' : 'weatherUnavailable')}
            </span>
          </div>
          {m.weatherStatus === 'error' && (
            <div className='world-weather-error' role='status'>
              <p>{t('weatherError')}</p>
              <HudButton onClick={() => void m.refresh()}>{t('retry')}</HudButton>
            </div>
          )}
          {weather && (
            <>
              <dl className='world-metrics'>
                <div>
                  <dt>{t('humidity')}</dt>
                  <dd>{weather.humidity}%</dd>
                </div>
                <div>
                  <dt>{t('clouds')}</dt>
                  <dd>{weather.cloudCover}%</dd>
                </div>
                <div>
                  <dt>{t('wind')}</dt>
                  <dd>
                    {weather.windSpeed.toFixed(1)} km/h ·{' '}
                    {t(compassKeys[formatCompassDirection(weather.windDirection)])}
                  </dd>
                </div>
                <div>
                  <dt>{t('precipitation')}</dt>
                  <dd>{weather.precipitation.toFixed(1)} mm</dd>
                </div>
              </dl>
              <div className='world-inline world-sun-times'>
                <span>
                  {t('sunrise')} <b>{weather.sunriseFormatted}</b>
                </span>
                <span>
                  {t('sunset')} <b>{weather.sunsetFormatted}</b>
                </span>
              </div>
            </>
          )}
          <footer className='world-weather-footer'>
            <small>{weather ? t('updated', { value: weather.apiObservationTime }) : t('weatherUnavailable')}</small>
            <a href='https://open-meteo.com/' target='_blank' rel='noreferrer'>
              {t('provider')}
            </a>
            {weather?.freshness === 'stale' && <HudButton onClick={() => void m.refresh()}>{t('refresh')}</HudButton>}
          </footer>
        </>
      )}
    </aside>
  );
}
export function InformationPanels({ model: m }: { model: WorldExplorerModel }) {
  const { t } = m;
  const s = m.snapshot;
  const diagnostics = useMemo(() => runSystemDiagnosticsSuite(), []);
  const geoDiagnostics = useMemo(() => runGeospatialDiagnosticsSuite(), []);
  // The active provider is set by createWorldRuntime in an effect, after
  // this component first mounts — so the diagnostics must be keyed on the
  // provider identity, not computed once with []. A [] memo reads the
  // synthetic default forever and mislabels the DEM world in F3.
  const activeTerrainProvider = getActiveTerrainProvider();
  const terrainDiagnostics = useMemo(() => runTerrainDiagnosticsSuite(activeTerrainProvider), [activeTerrainProvider]);
  const checksPassed = [...diagnostics, ...geoDiagnostics, ...terrainDiagnostics].filter(
    (check) => check.passed
  ).length;
  const checksTotal = diagnostics.length + geoDiagnostics.length + terrainDiagnostics.length;
  const environment = m.panels.environmentPanel;
  const debug = m.panels.secondaryInfo;
  const geo = useGeoTelemetry(s, debug === 'expanded');
  const set = (panel: 'environmentPanel' | 'secondaryInfo', value: 'expanded' | 'compact' | 'hidden') =>
    m.setPanels((current) => ({ ...current, [panel]: value }));
  return (
    <>
      {environment === 'compact' && (
        <div className='world-chips world-env-chips' data-hud-interactive='true'>
          <HudButton expanded={false} onClick={() => set('environmentPanel', 'expanded')}>
            {t('elevation')}: {s?.surface.toFixed(2) ?? '0.00'} m
          </HudButton>
          <HudButton expanded={false} onClick={() => set('environmentPanel', 'expanded')}>
            {t('solarAltitude')}: {m.solar.altitudeDeg.toFixed(1)}°
          </HudButton>
          <HudButton label={t('hide', { panel: t('environment') })} onClick={() => set('environmentPanel', 'hidden')}>
            <X />
          </HudButton>
        </div>
      )}
      {environment === 'expanded' && (
        <section className='ds-surface-card world-environment' data-hud-interactive='true'>
          <header className='world-panel-heading'>
            <strong>{t('environmentTitle')}</strong>
            <HudButton
              expanded
              label={t('collapse', { panel: t('environment') })}
              onClick={() => set('environmentPanel', 'compact')}
            >
              <ChevronUp />
            </HudButton>
            <HudButton label={t('hide', { panel: t('environment') })} onClick={() => set('environmentPanel', 'hidden')}>
              <X />
            </HudButton>
          </header>
          <dl className='world-metrics'>
            <div>
              <dt>{t('position')}</dt>
              <dd>
                {s?.x.toFixed(2)}, {s?.z.toFixed(2)}
              </dd>
            </div>
            <div>
              <dt>{t('elevation')}</dt>
              <dd>{s?.surface.toFixed(2)} m</dd>
            </div>
            <div>
              <dt>{t('solarAltitude')}</dt>
              <dd>
                {m.solar.altitudeDeg.toFixed(1)}° / {m.solar.azimuthDeg.toFixed(1)}°
              </dd>
            </div>
            <div>
              <dt>{t('camera')}</dt>
              <dd>{s?.cameraDistance.toFixed(2)} m</dd>
            </div>
          </dl>
          <small>{t('synthetic')}</small>
        </section>
      )}
      {debug !== 'hidden' && (
        <section className={`world-debug ${debug === 'expanded' ? 'ds-surface-card' : ''}`} data-hud-interactive='true'>
          {debug === 'compact' ? (
            <div className='world-chips'>
              <HudButton expanded={false} onClick={() => set('secondaryInfo', 'expanded')}>
                {t('fps')}: {s?.perf.fps ?? '--'}
              </HudButton>
              <HudButton expanded={false} onClick={() => set('secondaryInfo', 'expanded')}>
                {t('frameShort')}: {s?.perf.avgFrameTimeMs.toFixed(1) ?? '--'} ms
              </HudButton>
              <HudButton expanded={false} onClick={() => set('secondaryInfo', 'expanded')}>
                {t('checks')}: {checksPassed}/{checksTotal}
              </HudButton>
              <HudButton label={t('hide', { panel: t('debug') })} onClick={() => set('secondaryInfo', 'hidden')}>
                <X />
              </HudButton>
            </div>
          ) : (
            <>
              <header className='world-panel-heading'>
                <strong>{t('debugTitle')}</strong>
                <HudButton
                  expanded
                  label={t('collapse', { panel: t('debug') })}
                  onClick={() => set('secondaryInfo', 'compact')}
                >
                  <ChevronUp />
                </HudButton>
                <HudButton label={t('hide', { panel: t('debug') })} onClick={() => set('secondaryInfo', 'hidden')}>
                  <X />
                </HudButton>
              </header>
              <dl className='world-metrics'>
                <div>
                  <dt>{t('frame')}</dt>
                  <dd>
                    {s?.perf.avgFrameTimeMs.toFixed(1)} / {s?.perf.p95FrameTimeMs.toFixed(1)} ms
                  </dd>
                </div>
                <div>
                  <dt>{t('draws')}</dt>
                  <dd>
                    {s?.perf.drawCalls} / {s?.perf.triangles}
                  </dd>
                </div>
                <div>
                  <dt>{t('resources')}</dt>
                  <dd>
                    {s?.perf.geometriesCount} / {s?.perf.texturesCount}
                  </dd>
                </div>
                <div>
                  <dt>{t('quality')}</dt>
                  <dd>
                    {t(s?.perf.adaptiveQualityTier ?? 'ultra')} / {s?.perf.pixelRatioActive.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <div data-testid='geo-telemetry'>
                <strong>{t('geoReference')}</strong>
                <p>{t('geoConvention')}</p>
                <p>{t('geoHeightAssumption')}</p>
                <p className='world-amber'>{t('geoWarning')}</p>
                {geo && (
                  <dl className='world-metrics'>
                    <div>
                      <dt>{t('geoLatitude')}</dt>
                      <dd>{geo.coordinate.latitudeDeg.toFixed(7)}°</dd>
                    </div>
                    <div>
                      <dt>{t('geoLongitude')}</dt>
                      <dd>{geo.coordinate.longitudeDeg.toFixed(7)}°</dd>
                    </div>
                    <div>
                      <dt>{t('geoHeight')}</dt>
                      <dd>{geo.coordinate.ellipsoidalHeightMeters.toFixed(3)} m</dd>
                    </div>
                    <div>
                      <dt>{t('geoHeading')}</dt>
                      <dd>{geo.headingDeg.toFixed(1)}°</dd>
                    </div>
                  </dl>
                )}
              </div>
              <ImageryInspector registry={danangSourceRegistry} reference={DANANG_GEO_REFERENCE.reference} />
              <details>
                <summary>
                  {t('geoDiagnostics')}: {geoDiagnostics.filter((check) => check.passed).length}/{geoDiagnostics.length}
                </summary>
                <ul className='world-diagnostics'>
                  {geoDiagnostics.map((check, index) => (
                    <li key={check.id} title={check.details}>
                      <span>
                        {check.id}: {t(`geoDiag${index + 1}` as CopyKey)}
                      </span>
                      <b className={check.passed ? 'world-green' : 'world-amber'}>
                        {t(check.passed ? 'passed' : 'failed')}
                      </b>
                    </li>
                  ))}
                </ul>
              </details>
              <details>
                <summary>
                  {t('terrainDiagnostics')}: {terrainDiagnostics.filter((check) => check.passed).length}/
                  {terrainDiagnostics.length}
                </summary>
                <ul className='world-diagnostics'>
                  {terrainDiagnostics.map((check, index) => (
                    <li key={check.id} title={check.details}>
                      <span>
                        {check.id}: {t(`terrainDiag${index + 1}` as CopyKey)}
                      </span>
                      <b className={check.passed ? 'world-green' : 'world-amber'}>
                        {t(check.passed ? 'passed' : 'failed')}
                      </b>
                    </li>
                  ))}
                </ul>
              </details>
              <details data-testid='source-registry'>
                <summary>{t('dataSources')}</summary>
                <p>{t('sourceSummary', sourceReadiness)}</p>
                <p className='world-amber'>{t('sourceNotLoaded')}</p>
                <ul>
                  {sourceCatalog.map((source) => (
                    <li key={source.id}>
                      <a href={source.officialUrl} target='_blank' rel='noreferrer'>
                        {source.provider}
                      </a>
                      <p>
                        {t('sourceEntry', {
                          id: source.id,
                          status: t(sourceStatusKeys[source.reviewStatus]),
                          crs: source.horizontalCrs ?? t('sourceUnknown'),
                          license: source.rights.licenseId ?? t('sourceUnknown'),
                        })}
                      </p>
                    </li>
                  ))}
                </ul>
              </details>
              <h3>{t('diagnostics')}</h3>
              <ul className='world-diagnostics'>
                {diagnostics.map((check, index) => (
                  <li key={check.id}>
                    <span>
                      {check.id}: {t(`diag${index + 1}` as CopyKey)}
                    </span>
                    <b className={check.passed ? 'world-green' : 'world-amber'}>
                      {t(check.passed ? 'passed' : 'failed')}
                    </b>
                  </li>
                ))}
              </ul>
              <label className='world-focus-test'>
                {t('focusTest')}
                <input placeholder={t('focusPlaceholder')} />
              </label>
            </>
          )}
        </section>
      )}
    </>
  );
}
export function MovementGuide({ model: m }: { model: WorldExplorerModel }) {
  const { t } = m;
  const collapsed = m.panels.movementGuide === 'collapsed';
  const copy: Record<string, [CopyKey, CopyKey]> = {
    'kb-move-wasd': ['move', 'moveDescription'],
    'kb-sprint-shift': ['sprint', 'sprintDescription'],
    'kb-jump-space': ['jump', 'jumpDescription'],
    'mouse-look-orbit': ['orbit', 'orbitDescription'],
    'mouse-wheel-zoom': ['zoom', 'zoomDescription'],
    'touch-virtual-joystick': ['joystick', 'joystickDescription'],
    'touch-camera-swipe': ['swipe', 'swipeDescription'],
    'touch-sprint-action': ['sprint', 'touchSprint'],
    'touch-jump-action': ['jump', 'touchJumpDescription'],
    'touch-multitouch-tip': ['multitouch', 'multitouchDescription'],
  };
  const instructions = getActiveControlGuideInstructions(m.profile.showTouchControls).map((instruction) => {
    const [title, description] = copy[instruction.id];
    const keys =
      instruction.keys
        ?.map((key) => (key === 'MOUSE' ? t('mouseKey') : (() => (key === 'SCROLL' ? t('scrollKey') : key))()))
        .join(' · ') ?? '';
    return { id: instruction.id, title, description, keys };
  });
  return (
    <section
      className={`world-guide ${collapsed ? '' : 'ds-surface-card'}`}
      data-hud-zone='bottom-left'
      data-hud-interactive='true'
      data-guide-mode={m.panels.movementGuide}
    >
      {collapsed ? (
        <HudButton expanded={false} onClick={() => m.toggle('movementGuide')}>
          {m.profile.showTouchControls ? <Gamepad2 /> : <Keyboard />}
          {t('controls')} <kbd>H</kbd>
          <ChevronUp />
        </HudButton>
      ) : (
        <>
          <header className='world-panel-heading'>
            <strong>
              {m.profile.showTouchControls ? <Gamepad2 /> : <Keyboard />}
              {t('guide')}
            </strong>
            <HudButton
              expanded
              label={t('collapse', { panel: t('controls') })}
              onClick={() => m.toggle('movementGuide')}
            >
              <ChevronDown />
            </HudButton>
          </header>
          <small className='world-sky'>{t(m.profile.showTouchControls ? 'touchActive' : 'keyboardActive')}</small>
          <ul>
            {instructions.map(({ id, title, description, keys }) => (
              <li key={id}>
                <div>
                  <strong>{t(title)}</strong>
                  <p>{t(description)}</p>
                </div>
                {keys &&
                  (title === 'move' ? (
                    <div className='world-wasd' role='group' aria-label='W A S D'>
                      <kbd>W</kbd>
                      <div>
                        <kbd>A</kbd>
                        <kbd>S</kbd>
                        <kbd>D</kbd>
                      </div>
                    </div>
                  ) : (
                    <kbd>{keys}</kbd>
                  ))}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
export function CharacterStatus({ model: m }: { model: WorldExplorerModel }) {
  const { t } = m;
  const s = m.snapshot;
  if (m.panels.playerStatus === 'compact')
    return (
      <section
        className='world-character-compact world-chips'
        data-hud-zone='bottom-right-status'
        data-panel-mode='compact'
        data-hud-interactive='true'
      >
        <HudButton
          expanded={false}
          label={t('expand', { panel: t('character') })}
          onClick={() => m.toggle('playerStatus')}
        >
          <Footprints />
          {t(s?.animation ?? 'IDLE')}
        </HudButton>
        <HudButton expanded={false} label={t('expand', { panel: t('speed') })} onClick={() => m.toggle('playerStatus')}>
          {t('speed')}: {s?.speed.toFixed(2) ?? '0.00'} m/s
        </HudButton>
      </section>
    );
  return (
    <section
      className='world-character ds-surface-card'
      data-hud-zone='bottom-right-status'
      data-panel-mode={m.panels.playerStatus}
      data-hud-interactive='true'
    >
      <div>
        <small>{t('character')}</small>
        <strong className={s?.grounded ? 'world-sky' : 'world-amber'}>
          {t(s?.animation ?? 'IDLE')} <span title={t(s?.grounded ? 'grounded' : 'airborne')}>●</span>
        </strong>
      </div>
      <div>
        <small>{t('speed')}</small>
        <strong>{s?.speed.toFixed(2) ?? '0.00'} m/s</strong>
        {m.panels.playerStatus === 'expanded' && (
          <div className='world-speed-bar'>
            <span style={{ width: `${Math.min(100, ((s?.speed ?? 0) / GAME_CONFIG.physics.runSpeed) * 100)}%` }} />
          </div>
        )}
      </div>
      <HudButton expanded label={t('collapse', { panel: t('character') })} onClick={() => m.toggle('playerStatus')}>
        <ChevronDown />
      </HudButton>
    </section>
  );
}
export function TouchControls({ model: m }: { model: WorldExplorerModel }) {
  const { t } = m;
  const joy = m.joystickHandlers;
  return (
    <div className='world-touch-controls' data-hud-interactive='true'>
      <div className='world-joystick-group'>
        <div
          role='slider'
          tabIndex={0}
          aria-label={t('joystick')}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(m.touch.magnitude * 100)}
          className={`world-joystick ${m.touch.active ? 'world-active' : ''}`}
          {...joy}
          onPointerCancel={joy.onPointerUp}
          onLostPointerCapture={joy.onPointerUp}
        >
          <div className='world-joystick-ring' />
          <div className='world-joystick-thumb' style={{ transform: `translate(${m.touch.x}px,${m.touch.y}px)` }} />
        </div>
        <small>{t('movePercent', { value: Math.round(m.touch.magnitude * 100) })}</small>
      </div>
      <div className='world-touch-actions'>
        {(['sprint', 'jump'] as const).map((action) => {
          const handlers = m.actionHandlers(action);
          const active = m.touch[action] || (action === 'sprint' && m.touch.latched);
          return (
            <button
              type='button'
              key={action}
              className={`world-touch-action world-touch-${action} ${active ? 'world-active' : ''}`}
              aria-label={t(action === 'sprint' ? 'touchSprint' : 'jump')}
              aria-pressed={active}
              {...handlers}
              onPointerCancel={handlers.onPointerUp}
              onLostPointerCapture={handlers.onPointerUp}
            >
              {action === 'sprint' ? <Footprints /> : <ArrowUpCircle />}
              {t(action === 'sprint' && m.touch.latched ? 'run' : action)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
export function Interactions({ model: m }: { model: WorldExplorerModel }) {
  const { t } = m;
  const target = m.snapshot?.target;
  const name = (id: string) => t(id as CopyKey);
  return (
    <>
      <div className={`world-reticle ${target?.status === 'eligible' ? 'world-eligible' : ''}`} aria-hidden='true' />
      {target?.definition && target.status !== 'idle' && target.status !== 'disabled' && !m.dialog && (
        <div
          className={`ds-surface-card world-interaction-prompt world-${target.status}`}
          data-testid='interaction-prompt-container'
          data-interaction-status={target.status}
        >
          {target.status === 'eligible' ? (
            <button type='button' onClick={() => m.onCommand('interact')}>
              <kbd>{m.profile.showTouchControls ? t('interact') : 'E'}</kbd>
              <div>
                <strong>{t(target.definition.type)}</strong>
                <small>
                  {name(target.definition.id)} · {target.distanceMeters.toFixed(1)} m{' '}
                  {target.definition.type === 'activate' && t(target.isActivated ? 'on' : 'off')}
                </small>
              </div>
            </button>
          ) : (
            <p>
              {target.status === 'occluded'
                ? t('occluded', { distance: target.distanceMeters.toFixed(1) })
                : t('closer', {
                    distance: target.distanceMeters.toFixed(1),
                    max: target.definition.maxDistance.toFixed(1),
                  })}
            </p>
          )}
        </div>
      )}
      {m.feedback !== null && !m.dialog && (
        <div className='ds-surface-card world-feedback' role='status'>
          {t(m.feedback ? 'activated' : 'deactivated')}
        </div>
      )}
      {m.dialog === 'specs' && (
        <WorldDialog title={t('specsTitle')} onClose={() => m.setDialog(null)} container={m.root.current}>
          <div className='world-specs-grid'>
            {(['Time', 'World', 'Controls', 'Render'] as const).map((section) => (
              <section className='ds-surface-elevated' key={section}>
                <h3>{t(`specs${section}Title`)}</h3>
                <p>{t(`specs${section}`)}</p>
              </section>
            ))}
          </div>
        </WorldDialog>
      )}
      {m.dialog && m.dialog !== 'specs' && m.dialog.definition && (
        <WorldDialog title={name(m.dialog.definition.id)} onClose={() => m.setDialog(null)} container={m.root.current}>
          <p>{t(`${m.dialog.definition.id}-detail` as CopyKey)}</p>
          {m.dialog.definition.type === 'information' && (
            <div className='ds-surface-elevated world-station-data'>
              {m.clock.timeString} ·{' '}
              {m.weather
                ? `${Math.round(m.weather.temperature)}°C · ${t(m.weather.mapped.category)}`
                : t('weatherUnavailable')}
              <p>
                {t('solarAltitude')}: {m.solar.altitudeDeg.toFixed(1)}°
              </p>
            </div>
          )}
          <small>{t('interactionCount', { value: m.dialog.interactionCount })}</small>
        </WorldDialog>
      )}
    </>
  );
}
