'use client';
import { useWorldExplorer } from '../hooks/useWorldExplorer';
import {
  MiniMap,
  TimeWeather,
  InformationPanels,
  MovementGuide,
  CharacterStatus,
  TouchControls,
  Interactions,
  HudButton,
} from './WorldHud';
import '../styles/world.css';

export default function WorldExplorerClient() {
  const model = useWorldExplorer();
  const { t } = model;
  return (
    <div
      ref={model.root}
      className={`world-explorer world-root ${model.profile.showTouchControls ? 'world-touch' : ''}`}
      data-runtime-status={model.status}
      data-player-x={model.snapshot?.x}
      data-player-y={model.snapshot?.y}
      data-player-z={model.snapshot?.z}
      data-player-state={model.snapshot?.animation}
      data-speed={model.snapshot?.speed}
      data-camera-distance={model.snapshot?.cameraDistance}
      data-camera-yaw={model.snapshot?.cameraYaw}
      data-geometries={model.snapshot?.perf.geometriesCount}
      data-textures={model.snapshot?.perf.texturesCount}
      data-fps={model.snapshot?.perf.fps}
    >
      <canvas
        key={model.generation}
        ref={model.canvas}
        className='world-canvas'
        tabIndex={0}
        aria-label={t('summary')}
      />
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
        {model.profile.showTouchControls && <TouchControls model={model} />}
      </div>
      <Interactions model={model} />
      {model.status !== 'ready' && (
        <div className='world-runtime-overlay' role={model.status === 'loading' ? 'status' : 'alert'}>
          <div className='ds-surface-card'>
            <h2>{t(model.status)}</h2>
            {model.status !== 'loading' && (
              <>
                <p>{t('recovery')}</p>
                <HudButton onClick={model.retry}>{t('retry')}</HudButton>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
