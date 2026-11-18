import { validateImageryAsset, verifyImageryBytes, type SourceRegistry } from '@/world-core/registries/imagery';
import type { GeoReference } from '@/engine/geospatial/type';
import { imageryPreviewGeometry } from './imagery-diagnostics';

/** Same-origin, content-addressed PNG only. No disk cache, redirects, remote URL or provider credentials. */
export async function loadImageryPreview(
  raw: unknown,
  registry: SourceRegistry,
  reference: GeoReference,
  controls: unknown,
  signal: AbortSignal
) {
  const asset = validateImageryAsset(raw, registry, reference, controls);
  const geometry = imageryPreviewGeometry(asset.registration, reference);
  const combined = AbortSignal.any([signal, AbortSignal.timeout(8000)]);
  const response = await fetch(asset.path, {
    signal: combined,
    redirect: 'error',
    credentials: 'omit',
    cache: 'no-store',
  });
  if (!response.ok || response.headers.get('content-type')?.split(';')[0].trim() !== 'image/png')
    throw new Error('Imagery unavailable or unsupported MIME');
  const declared = response.headers.get('content-length');
  if (declared !== null && Number(declared) !== asset.byteLength) {
    await response.body?.cancel();
    throw new Error('Imagery content length mismatch');
  }
  const reader = response.body?.getReader();
  if (!reader) throw new Error('Imagery body unavailable');
  const bytes = new Uint8Array(asset.byteLength);
  let length = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (length + value.byteLength > bytes.byteLength) throw new Error('Imagery exceeds byte budget');
      bytes.set(value, length);
      length += value.byteLength;
    }
  } catch (error) {
    await reader.cancel();
    throw error;
  } finally {
    reader.releaseLock();
  }
  if (length !== bytes.byteLength) throw new Error('Truncated imagery');
  await verifyImageryBytes(asset, bytes.buffer);
  combined.throwIfAborted();
  // Rights can be revoked while the request is in flight; never render using stale approval.
  validateImageryAsset(raw, registry, reference, controls);
  const bitmap = await createImageBitmap(new Blob([bytes], { type: 'image/png' }));
  if (combined.aborted || bitmap.width !== asset.registration.width || bitmap.height !== asset.registration.height) {
    bitmap.close();
    combined.throwIfAborted();
    throw new Error('Decoded imagery dimensions mismatch');
  }
  return { asset, geometry, bitmap };
}
