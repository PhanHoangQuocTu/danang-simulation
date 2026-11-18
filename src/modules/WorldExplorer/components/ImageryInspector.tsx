'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslations } from '@/hooks';
import type { GeoReference } from '@/engine/geospatial/type';
import type { SourceRegistry } from '@/world-core/registries/imagery';
import { createImageryDiagnostic, imageryPreviewGeometry } from '../imagery-diagnostics';
import { loadImageryPreview } from '../imagery-preview';

const emptyControls: readonly unknown[] = Object.freeze([]);
const statusKeys = {
  idle: 'imageryLoading',
  loading: 'imageryLoading',
  ready: 'imageryRegistered',
  error: 'imageryFailed',
} as const;
export function ImageryInspector({
  registry,
  reference,
  asset,
  controls = emptyControls,
}: {
  registry: SourceRegistry;
  reference: GeoReference;
  asset?: unknown;
  controls?: unknown;
}) {
  const { t } = useTranslations('worldExplorer');
  const [preview, setPreview] = useState({ enabled: false });
  const [state, setState] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [metadata, setMetadata] = useState<Awaited<ReturnType<typeof loadImageryPreview>>['asset'] | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const diagnosticRaster = useMemo(() => createImageryDiagnostic(reference), [reference]);
  const diagnostic = useMemo(() => imageryPreviewGeometry(diagnosticRaster, reference), [diagnosticRaster, reference]);
  const hasAsset = asset !== undefined;
  useEffect(() => {
    const previewCanvas = canvas.current;
    const clear = () => previewCanvas?.getContext('2d')?.clearRect(0, 0, 300, 220);
    clear();
    if (!preview.enabled || !hasAsset) return;
    const abort = new AbortController();
    let bitmap: ImageBitmap | undefined;
    setState('loading');
    setMetadata(null);
    loadImageryPreview(asset, registry, reference, controls, abort.signal)
      .then((result) => {
        bitmap = result.bitmap;
        if (abort.signal.aborted) {
          bitmap.close();
          bitmap = undefined;
          return;
        }
        const context = canvas.current?.getContext('2d');
        if (!context) throw new Error('2D preview unavailable');
        context.clearRect(0, 0, 300, 220);
        context.save();
        context.setTransform(...result.geometry.matrix);
        context.drawImage(bitmap, 0, 0);
        context.restore();
        setMetadata(result.asset);
        setState('ready');
      })
      .catch(() => {
        if (!abort.signal.aborted) {
          clear();
          bitmap?.close();
          bitmap = undefined;
          setState('error');
        }
      });
    return () => {
      abort.abort();
      clear();
      bitmap?.close();
    };
  }, [preview, hasAsset, asset, registry, reference, controls]);
  return (
    <details
      data-testid='imagery-inspector'
      onToggle={(event) => {
        if (!event.currentTarget.open) setPreview({ enabled: false });
      }}
    >
      <summary>{t('imageryTitle')}</summary>
      <p>{t(hasAsset ? 'imageryGate' : 'imageryAbsent')}</p>
      <p>{t('imageryAccuracy')}</p>
      {!hasAsset && <p className='world-amber'>{t('imageryFixture')}</p>}
      {!hasAsset && (
        <>
          <p>
            {t('imageryRasterInfo', {
              crs: diagnosticRaster.nativeCrs,
              width: diagnosticRaster.width,
              height: diagnosticRaster.height,
              gsd: diagnosticRaster.groundSampleDistanceMeters,
            })}
          </p>
          <p>{t('imageryNoControls')}</p>
        </>
      )}
      <button
        type='button'
        className='ds-btn world-button'
        aria-pressed={preview.enabled}
        onClick={() => setPreview((value) => ({ enabled: !value.enabled }))}
      >
        {t(preview.enabled ? 'imageryHide' : 'imageryPreview')}
      </button>
      {preview.enabled &&
        (hasAsset ? (
          <>
            <p role='status'>{t(statusKeys[state])}</p>
            {state === 'error' && (
              <button type='button' className='ds-btn world-button' onClick={() => setPreview({ enabled: true })}>
                {t('retry')}
              </button>
            )}
            <canvas
              ref={canvas}
              width={300}
              height={220}
              className='world-imagery-preview'
              aria-label={t('imageryTitle')}
            />
            {metadata && (
              <>
                <p>
                  {metadata.provider} · {metadata.registration.captureDate ?? t('imageryUnknown')} · {metadata.license}
                </p>
                <p>{t(metadata.quality.status === 'checkpoint-validated' ? 'imageryChecked' : 'imageryAccuracy')}</p>
                <p>
                  {t('imageryRasterInfo', {
                    crs: metadata.registration.nativeCrs,
                    width: metadata.registration.width,
                    height: metadata.registration.height,
                    gsd: metadata.registration.groundSampleDistanceMeters,
                  })}
                </p>
                <p>
                  {t('imageryAssetInfo', {
                    source: metadata.registration.sourceId,
                    dataset: metadata.registration.datasetId,
                    asset: metadata.registration.assetId,
                    version: metadata.registration.version,
                  })}
                </p>
                <p>
                  {t('imageryControlStats', {
                    n: metadata.quality.independent.n,
                    rmse: metadata.quality.independent.rmseMeters?.toFixed(3) ?? '--',
                    max: metadata.quality.independent.maxMeters?.toFixed(3) ?? '--',
                    rmseLimit: metadata.thresholds.rmseMeters,
                    maxLimit: metadata.thresholds.maxMeters,
                  })}
                </p>
                <details>
                  <summary>{t('imageryResiduals')}</summary>
                  <ul>
                    {metadata.quality.residuals.map((point) => (
                      <li key={point.id}>
                        {point.id} · {point.role} · {point.horizontalMeters.toFixed(3)} /{' '}
                        {point.pixelResidual.toFixed(3)}
                      </li>
                    ))}
                  </ul>
                </details>
                <a href={metadata.attributionUrl} target='_blank' rel='noreferrer'>
                  {metadata.attribution}
                </a>
              </>
            )}
          </>
        ) : (
          <svg viewBox='0 0 300 220' className='world-imagery-preview' role='img' aria-label={t('imageryFixture')}>
            <title>{t('imageryFixture')}</title>
            <polygon
              points={diagnostic.points.map((p) => `${p.x},${p.y}`).join(' ')}
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            />
            {diagnostic.points.map((p, index) => (
              <circle key={index} cx={p.x} cy={p.y} r='4' fill='currentColor' />
            ))}
            <text x='10' y='18'>
              {t('north')} ↑ · {t('east')} →
            </text>
            <text x='10' y='215'>
              {t('imageryTestGrid')}
            </text>
          </svg>
        ))}
    </details>
  );
}
