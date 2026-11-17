// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchExploratoryNodes } from '../overpass.server';
import { danangSourceRegistry } from '@/worlds/danang/data-sources';
import { createDataSourceRegistry } from '@/world-core/registries/data-sources';
import { testSource } from '@/world-core/registries/__tests__/fixtures';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.useRealTimers();
});
describe('opt-in fixed Overpass transport', () => {
  const registry = () => createDataSourceRegistry([testSource()]);
  const bounds = [108.2, 16.05, 108.201, 16.051];
  it('DS-20/21 handles 403, 429, 500, wrong content type and malformed JSON without fake data', async () => {
    for (const status of [403, 429, 500]) {
      vi.stubGlobal('fetch', async () => new Response('PRIVATE PROVIDER BODY', { status }));
      await expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow(`Provider HTTP ${status}`);
    }
    vi.stubGlobal('fetch', async () => new Response('{}', { headers: { 'content-type': 'text/html' } }));
    await expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow('content type');
    vi.stubGlobal('fetch', async () => new Response('{', { headers: { 'content-type': 'application/json' } }));
    await expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow('JSON invalid');
    vi.stubGlobal('fetch', async () => {
      throw new Error('secret network internals');
    });
    await expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow('Provider unavailable');
  });
  it('DS-21 spans the request with an abort deadline and does not retry', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      (_url: string, options: RequestInit) =>
        new Promise((_resolve, reject) => {
          options.signal?.addEventListener('abort', () => reject(new Error('aborted')), { once: true });
        })
    );
    const result = expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow('Provider timeout');
    await vi.advanceTimersByTimeAsync(10000);
    await result;
  });
  it('DS-22 rejects large or unreviewed bounds before any request', async () => {
    vi.stubGlobal('fetch', () => {
      throw new Error('Should never fetch');
    });
    for (const area of [
      [108.2, 16.05, 108.21, 16.06],
      [0, 0, 0.001, 0.001],
      ['http://localhost', 0, 1, 1],
    ]) {
      await expect(fetchExploratoryNodes(registry(), 'test-source', area)).rejects.toThrow();
    }
  });
  it('DS-20 caps streamed bytes even when content-length is missing', async () => {
    vi.stubGlobal(
      'fetch',
      async () => new Response(' '.repeat(262145), { headers: { 'content-type': 'application/json' } })
    );
    await expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow('size exceeds limit');
  });
  it('DS-20 rejects 101 nodes rather than silently accepting truncated provider output', async () => {
    vi.stubGlobal(
      'fetch',
      async () =>
        new Response(JSON.stringify({ elements: Array.from({ length: 101 }, () => ({})) }), {
          headers: { 'content-type': 'application/json' },
        })
    );
    await expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow('feature limit exceeded');
  });
  it('DS-21 aborts a stalled body after headers arrive', async () => {
    vi.useFakeTimers();
    vi.stubGlobal(
      'fetch',
      async (_url: string, options: RequestInit) =>
        new Response(
          new ReadableStream({
            start(controller) {
              options.signal?.addEventListener('abort', () => controller.error(new Error('aborted')), { once: true });
            },
          }),
          { headers: { 'content-type': 'application/json' } }
        )
    );
    const result = expect(fetchExploratoryNodes(registry(), 'test-source', bounds)).rejects.toThrow('Provider timeout');
    await vi.advanceTimersByTimeAsync(10000);
    await result;
  });
  it('DS-17/19/22 performs fixed HTTPS request and returns validated lineage', async () => {
    vi.stubGlobal('fetch', async (url: string, options: RequestInit) => {
      expect(url).toBe('https://overpass-api.de/api/interpreter');
      expect(options.redirect).toBe('error');
      expect(String(options.body)).toContain('data=');
      return new Response(
        JSON.stringify({
          version: 0.6,
          generator: 'TEST-ONLY',
          elements: [{ type: 'node', id: 1, lon: 108.2001, lat: 16.0501, tags: { name: 'TEST-ONLY' } }],
        }),
        { headers: { 'content-type': 'application/json' } }
      );
    });
    const snapshot = await fetchExploratoryNodes(registry(), 'test-source', bounds);
    expect(snapshot.features[0].providerId).toBe('node/1');
    expect(snapshot.dataset.sourceId).toBe('test-source');
    expect(snapshot.dataset.captureDate).toBeNull();
    expect(snapshot.dataset.sha256).toHaveLength(64);
    expect(snapshot.rawBody).toContain('TEST-ONLY');
  });
  it('DS-05/07/21 denies candidate sources before network', async () => {
    vi.stubGlobal('fetch', () => {
      throw new Error('Network must not run');
    });
    await expect(
      fetchExploratoryNodes(danangSourceRegistry, 'osm-vector', [108.2, 16.05, 108.201, 16.051])
    ).rejects.toThrow('Source not eligible');
  });
});
