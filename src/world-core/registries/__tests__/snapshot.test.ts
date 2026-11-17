// @vitest-environment node
import { createHash } from 'node:crypto';
import { describe, expect, it } from 'vitest';
import { validateSnapshot, createDataSourceRegistry } from '../data-sources';
import { danangDataSources } from '@/worlds/danang/data-sources';
import { geoToWorld } from '@/engine/geospatial/core';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { testSource } from './fixtures';

// TEST-ONLY: invented nodes and coordinates, never a provider observation or production artifact.
const raw = JSON.stringify({
  version: 0.6,
  generator: 'TEST-ONLY',
  elements: [
    { type: 'node', id: 1, lon: 108.2022, lat: 16.0544, tags: { name: 'TEST-ONLY <script>' } },
    { type: 'node', id: 2, lon: 108.2023, lat: 16.0545, tags: {} },
  ],
});
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const fixtureRecord = () => ({
  id: 'test-only-snapshot',
  sourceId: 'osm-vector',
  name: 'TEST-ONLY invented nodes',
  version: 'test-v1',
  sourceUrl: 'https://www.openstreetmap.org/copyright',
  retrievedAt: '2026-11-18T00:00:00Z',
  captureDate: null,
  horizontalCrs: 'EPSG:4326' as const,
  verticalDatum: null,
  bounds: [108.2, 16.05, 108.21, 16.06],
  sha256: digest(raw),
  featureCount: 2,
  processing: ['TEST-ONLY; invented fixture; no acquisition'],
  purpose: 'test-only' as const,
});

describe('bounded snapshot validation', () => {
  it('DS-16 preserves provider update time separately and rejects impossible retrieval chronology', async () => {
    const payload = {
      ...JSON.parse(raw),
      osm3s: { timestamp_osm_base: '2026-11-17T23:00:00Z', copyright: 'TEST-ONLY' },
    };
    const body = JSON.stringify(payload);
    expect((await validateSnapshot({ ...fixtureRecord(), sha256: digest(body) }, body)).providerUpdatedAt).toBe(
      '2026-11-17T23:00:00Z'
    );
    await expect(
      validateSnapshot({ ...fixtureRecord(), sha256: digest(body), retrievedAt: '2026-11-17T22:00:00Z' }, body)
    ).rejects.toThrow('chronology');
  });
  it('DS-02/06/09/17 registers only validated bytes and rejects duplicate datasets atomically', async () => {
    const source = { ...testSource(), reviewStatus: 'ingested' };
    const record = { ...fixtureRecord(), sourceId: source.id, sourceUrl: source.source, purpose: 'exploratory' };
    const snapshot = await validateSnapshot(record, raw);
    const registry = createDataSourceRegistry([source], [snapshot.dataset]);
    expect(registry.getDataset(record.id)?.sha256).toBe(digest(raw));
    expect(registry.getAttributionFor([record.id, record.id])).toEqual(['TEST-ONLY']);
    expect(registry.getReadinessSummary().ingested).toBe(1);
    expect(() => createDataSourceRegistry([source], [snapshot.dataset, snapshot.dataset])).toThrow('Duplicate');
    expect(() => createDataSourceRegistry([source], [structuredClone(snapshot.dataset)])).toThrow('validateSnapshot');
    const read = registry.getDataset(record.id);
    if (read) read.processing.length = 0;
    expect(registry.getDataset(record.id)?.processing.length).toBe(1);
    expect(() =>
      createDataSourceRegistry([{ ...source, category: 'dsm', verticalDatum: 'EGM2008' }], [snapshot.dataset])
    ).toThrow();
    expect(() => createDataSourceRegistry([{ ...source, verticalDatum: 'EGM96' }], [snapshot.dataset])).toThrow();
  });
  it('DS-17/19 deduplicates equal nodes, rejects conflicts and canonicalizes tag order', async () => {
    const original = JSON.parse(raw);
    const duplicate = JSON.stringify({ ...original, elements: [...original.elements, original.elements[0]] });
    expect(
      (await validateSnapshot({ ...fixtureRecord(), sha256: digest(duplicate) }, duplicate)).features
    ).toHaveLength(2);
    const conflict = JSON.stringify({
      ...original,
      elements: [...original.elements, { ...original.elements[0], lat: 16.055 }],
    });
    await expect(validateSnapshot({ ...fixtureRecord(), sha256: digest(conflict) }, conflict)).rejects.toThrow(
      'Conflicting'
    );
    const reordered = JSON.stringify({ ...original, elements: [...original.elements].reverse() });
    const result = await validateSnapshot({ ...fixtureRecord(), sha256: digest(reordered) }, reordered);
    expect(result.normalizedSha256).toBe((await validateSnapshot(fixtureRecord(), raw)).normalizedSha256);
    const unicode = JSON.stringify({
      ...original,
      elements: original.elements.map((node: object) => ({ ...node, tags: { ä: 'TEST-ONLY', z: 'TEST-ONLY' } })),
    });
    const canonical = await validateSnapshot({ ...fixtureRecord(), sha256: digest(unicode) }, unicode);
    expect(Object.keys(canonical.features[0].tags)).toEqual(['z', 'ä']);
  });
  it('DS-12/14/17/19 retains IDs, literal tags, absent height, lineage and deterministic checksum', async () => {
    const result = await validateSnapshot(fixtureRecord(), raw);
    expect(result.features[0]).toEqual({
      id: 'test-only-snapshot-node-1',
      providerId: 'node/1',
      sourceId: 'osm-vector',
      datasetId: 'test-only-snapshot',
      coordinates: [108.2022, 16.0544],
      tags: { name: 'TEST-ONLY <script>' },
    });
    expect(result.normalizedSha256).toMatch(/^[a-f0-9]{64}$/);
    expect(await validateSnapshot(fixtureRecord(), raw)).toEqual(result);
    expect(result.dataset.captureDate).toBeNull();
    expect(result.providerUpdatedAt).toBeNull();
    expect(() => createDataSourceRegistry(danangDataSources, [result.dataset])).toThrow();
  });
  it('DS-18 rejects corrupt bytes and forged records', async () => {
    await expect(validateSnapshot(fixtureRecord(), `${raw} `)).rejects.toThrow('Snapshot integrity');
    expect(() => createDataSourceRegistry(danangDataSources, [fixtureRecord()])).toThrow();
  });
  it('DS-04/20 rejects malformed envelopes, feature limits, inverted bounds and invalid coordinates', async () => {
    for (const body of ['{}', '{', JSON.stringify({ elements: [] }), raw.replace('108.2022', '16.0544')]) {
      await expect(validateSnapshot({ ...fixtureRecord(), sha256: digest(body) }, body)).rejects.toThrow();
    }
    await expect(validateSnapshot({ ...fixtureRecord(), bounds: [2, 1, 1, 2] }, raw)).rejects.toThrow();
    await expect(validateSnapshot(fixtureRecord(), ' '.repeat(262145))).rejects.toThrow('Snapshot size');
  });
  it('DS-13/15 leaves the reference anchor unverified and preserves east/north math', () => {
    expect(DANANG_GEO_REFERENCE.anchor.isGroundTruthVerified).toBe(false);
    const anchor = DANANG_GEO_REFERENCE.reference.anchor;
    expect(
      geoToWorld({ ...anchor, longitudeDeg: anchor.longitudeDeg + 0.0001 }, DANANG_GEO_REFERENCE.reference).x
    ).toBeGreaterThan(0);
    expect(
      geoToWorld({ ...anchor, latitudeDeg: anchor.latitudeDeg + 0.0001 }, DANANG_GEO_REFERENCE.reference).z
    ).toBeLessThan(0);
  });
});
