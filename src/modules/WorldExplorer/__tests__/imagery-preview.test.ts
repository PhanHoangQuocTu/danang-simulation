import { afterEach, describe, expect, it, vi } from 'vitest';
import { createDataSourceRegistry } from '@/world-core/registries/data-sources';
import { testSource } from '@/world-core/registries/__tests__/fixtures';
import { rasterFixture } from '@/engine/imagery/__tests__/fixtures';
import { createGeoReference } from '@/engine/geospatial/core';
import { loadImageryPreview } from '../imagery-preview';

afterEach(() => vi.unstubAllGlobals());
const reference = createGeoReference({ latitudeDeg: 16.06, longitudeDeg: 108.2, ellipsoidalHeightMeters: 0 });
async function fixture() {
  // Deliberately minimal PNG-like header exercises trust/transport. Browser decoder is mocked here.
  const bytes = new Uint8Array(100);
  bytes.set([137, 80, 78, 71, 13, 10, 26, 10]);
  const view = new DataView(bytes.buffer);
  view.setUint32(8, 13);
  view.setUint32(12, 0x49484452);
  view.setUint32(16, 100);
  view.setUint32(20, 100);
  const hash = Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)), (b) =>
    b.toString(16).padStart(2, '0')
  ).join('');
  const source = testSource();
  source.category = 'satellite-imagery';
  source.rights.permittedUses.push('redistribute');
  source.rights.redistributionAllowed = true;
  const registry = createDataSourceRegistry([source]);
  const asset = {
    registration: rasterFixture,
    purpose: 'production',
    sha256: hash,
    path: `/imagery/test-raster/${hash}.png`,
    byteLength: 100,
    retrievedAt: '2026-11-18T00:00:00Z',
    originUrl: source.officialUrl,
    inputArtifact: 'TEST DATA original raster',
    licenseReview: source.metadataReview,
    processing: ['TEST DATA'],
    maskApplied: true,
    thresholds: { rmseMeters: 2, maxMeters: 3 },
  };
  const close = vi.fn();
  const bitmap = { width: 100, height: 100, close };
  const decode = vi.fn().mockResolvedValue(bitmap);
  vi.stubGlobal('createImageBitmap', decode);
  const fetcher = vi
    .fn()
    .mockImplementation(() =>
      Promise.resolve(new Response(bytes, { headers: { 'content-type': 'image/png', 'content-length': '100' } }))
    );
  vi.stubGlobal('fetch', fetcher);
  return { asset, registry, bytes, close, decode, fetcher };
}
describe('bounded PNG preview transport', () => {
  it('IMG-39/42/66 validates checksum/dimensions before decode and uses exact local path', async () => {
    const f = await fixture();
    const result = await loadImageryPreview(f.asset, f.registry, reference, [], new AbortController().signal);
    expect(result.asset.registration.assetId).toBe('test-raster');
    expect(f.fetcher).toHaveBeenCalledWith(
      f.asset.path,
      expect.objectContaining({ redirect: 'error', credentials: 'omit', cache: 'no-store' })
    );
    expect(f.decode).toHaveBeenCalledOnce();
    result.bitmap.close();
    expect(f.close).toHaveBeenCalledOnce();
  });
  it('IMG-24/27 rejects unapproved metadata without any network', async () => {
    const f = await fixture();
    await expect(
      loadImageryPreview(
        { ...f.asset, path: 'https://evil.example/r.png' },
        f.registry,
        reference,
        [],
        new AbortController().signal
      )
    ).rejects.toThrow();
    expect(f.fetcher).not.toHaveBeenCalled();
  });
  it('IMG-39 refuses corrupt checksum and dimensions before image decoding', async () => {
    const f = await fixture();
    f.bytes[40] = 1;
    await expect(loadImageryPreview(f.asset, f.registry, reference, [], new AbortController().signal)).rejects.toThrow(
      /checksum/
    );
    expect(f.decode).not.toHaveBeenCalled();
    new DataView(f.bytes.buffer).setUint32(16, 100000);
    await expect(loadImageryPreview(f.asset, f.registry, reference, [], new AbortController().signal)).rejects.toThrow(
      /dimensions/
    );
  });
  it('IMG-45 closes a decoded image when unmounted during decode', async () => {
    const f = await fixture();
    const abort = new AbortController();
    f.decode.mockImplementation(async () => {
      abort.abort();
      return { width: 100, height: 100, close: f.close };
    });
    await expect(loadImageryPreview(f.asset, f.registry, reference, [], abort.signal)).rejects.toThrow();
    expect(f.close).toHaveBeenCalledOnce();
  });
  it('IMG-46 fails offline, wrong MIME, missing and truncated assets', async () => {
    const f = await fixture();
    f.fetcher.mockRejectedValueOnce(new Error('offline'));
    await expect(loadImageryPreview(f.asset, f.registry, reference, [], new AbortController().signal)).rejects.toThrow(
      'offline'
    );
    for (const response of [
      new Response('', { status: 404 }),
      new Response('x', { headers: { 'content-type': 'text/html' } }),
      new Response(new Uint8Array(30), { headers: { 'content-type': 'image/png' } }),
    ]) {
      f.fetcher.mockResolvedValueOnce(response);
      await expect(
        loadImageryPreview(f.asset, f.registry, reference, [], new AbortController().signal)
      ).rejects.toThrow();
    }
    expect(f.decode).not.toHaveBeenCalled();
  });
  it('IMG-65 cancels an over-budget stream before decoding', async () => {
    const f = await fixture();
    const cancel = vi.fn();
    f.fetcher.mockResolvedValueOnce(
      new Response(
        new ReadableStream({
          start(controller) {
            controller.enqueue(new Uint8Array(101));
          },
          cancel,
        }),
        { headers: { 'content-type': 'image/png' } }
      )
    );
    await expect(loadImageryPreview(f.asset, f.registry, reference, [], new AbortController().signal)).rejects.toThrow(
      /budget/
    );
    expect(cancel).toHaveBeenCalledOnce();
    expect(f.decode).not.toHaveBeenCalled();
  });
});
