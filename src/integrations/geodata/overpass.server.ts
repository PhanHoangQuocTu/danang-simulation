import { createHash } from 'node:crypto';
import {
  bboxSchema,
  containsBounds,
  validateSnapshot,
  type createDataSourceRegistry,
} from '@/world-core/registries/data-sources';

const endpoint = 'https://overpass-api.de/api/interpreter';
type Registry = ReturnType<typeof createDataSourceRegistry>;

/** Node-only opt-in transport. There is no URL argument, route, startup job or retry loop. */
export async function fetchExploratoryNodes(registry: Registry, sourceId: string, rawBounds: unknown) {
  const source = registry.getSource(sourceId);
  if (
    source?.category !== 'vector-osm' ||
    !source.capabilities.api ||
    !registry.canIngest(sourceId, 'download').allowed
  )
    throw new Error('Source not eligible');
  const bounds = bboxSchema.parse(rawBounds);
  const [west, south, east, north] = bounds;
  if (
    east - west > 0.002 ||
    north - south > 0.002 ||
    !source.geographic.bounds ||
    !containsBounds(source.geographic.bounds, bounds)
  )
    throw new Error('Exploratory bounds exceed reviewed extent');
  const query = `[out:json][timeout:8];node["name"](${south},${west},${north},${east});out body 101;`;
  const controller = new AbortController();
  // Timer spans headers AND body; an upstream trickle cannot extend the deadline.
  const timer = setTimeout(() => controller.abort(), 10000);
  let response: Response | undefined;
  try {
    response = await fetch(endpoint, {
      method: 'POST',
      redirect: 'error',
      signal: controller.signal,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Accept: 'application/json' },
      body: new URLSearchParams({ data: query }).toString(),
    });
    if (!response.ok) throw new Error(`Provider HTTP ${response.status}; no retry performed`);
    if (!/^application\/json(?:;|$)/i.test(response.headers.get('content-type') ?? '') || !response.body) {
      throw new Error('Provider content type invalid');
    }
    const declared = response.headers.get('content-length');
    if (declared && (!/^\d+$/.test(declared) || Number(declared) > 262144))
      throw new Error('Provider size exceeds limit');
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let size = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        if (size > 262144) throw new Error('Provider size exceeds limit');
        chunks.push(value);
      }
    } finally {
      await reader.cancel().catch(() => undefined);
      reader.releaseLock();
    }
    const buffer = Buffer.concat(chunks);
    const body = new TextDecoder('utf-8', { fatal: true }).decode(buffer);
    let parsed: unknown;
    try {
      parsed = JSON.parse(body);
    } catch {
      throw new Error('Provider JSON invalid');
    }
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('elements' in parsed) ||
      !Array.isArray(parsed.elements) ||
      parsed.elements.length > 100
    )
      throw new Error('Provider feature limit exceeded');
    const sha256 = createHash('sha256').update(buffer).digest('hex');
    const snapshot = await validateSnapshot(
      {
        id: `${sourceId}-${sha256.slice(0, 16)}`,
        sourceId,
        name: 'Exploratory named OSM nodes',
        version: sha256,
        sourceUrl: source.source,
        retrievedAt: new Date().toISOString(),
        captureDate: null,
        horizontalCrs: 'EPSG:4326',
        verticalDatum: null,
        bounds,
        sha256,
        featureCount: parsed.elements.length,
        processing: [`POST ${endpoint}`, query, 'phase-13-node-validator-v1; no height inference'],
        purpose: 'exploratory',
      },
      body
    );
    // Preserve exact bytes for revalidation after restart; no cache or filesystem write is implicit.
    return Object.freeze({ ...snapshot, rawBody: body });
  } catch (error) {
    // Only bounded local messages escape; provider bodies, tags and network details stay private.
    if (controller.signal.aborted) throw new Error('Provider timeout');
    if (error instanceof Error && /^(Provider|Snapshot|Invalid snapshot|Malformed snapshot)/.test(error.message))
      throw error;
    throw new Error('Provider unavailable');
  } finally {
    clearTimeout(timer);
    controller.abort();
    if (response?.body && !response.body.locked) await response.body.cancel().catch(() => undefined);
  }
}
