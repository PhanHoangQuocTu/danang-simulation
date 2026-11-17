import { describe, expect, it } from 'vitest';
import { createDataSourceRegistry, sourceSchema } from '../data-sources';
import { danangDataSources } from '@/worlds/danang/data-sources';
import { testSource } from './fixtures';
import { syntheticManifest } from '@/worlds/danang/zones/manifest';

describe('data source trust boundary', () => {
  it('DS-04/05/11/16 rejects incomplete rights, invalid quality and unsupported coordinates without defaults', () => {
    for (const field of [
      'licenseId',
      'licenseUrl',
      'attribution',
      'attributionUrl',
      'copyrightHolder',
      'review',
    ] as const) {
      const source = testSource();
      source.rights[field] = null;
      expect(sourceSchema.safeParse(source).success).toBe(false);
    }
    for (const patch of [
      { geographic: { ...testSource().geographic, bounds: [2, 1, 1, 2] } },
      { resolutionMeters: -1 },
      { accuracyMeters: Number.POSITIVE_INFINITY },
      { horizontalCrs: 'EPSG:4979' },
      { horizontalCrs: 'EPSG:4978' },
      { captureDate: '2026-11-19', verifiedDate: '2026-11-18' },
    ])
      expect(sourceSchema.safeParse({ ...testSource(), ...patch }).success).toBe(false);
    const source = testSource();
    source.reviewStatus = 'candidate';
    source.horizontalCrs = 'VN-2000';
    expect(createDataSourceRegistry([source]).canIngest(source.id, 'download').reasons).toContain(
      'requires-conversion'
    );
  });
  it('DS-26 never changes the synthetic manifest while constructing or querying a registry', () => {
    const before = JSON.stringify(syntheticManifest);
    const registry = createDataSourceRegistry([testSource()]);
    registry.listSources();
    expect(JSON.stringify(syntheticManifest)).toBe(before);
    expect(syntheticManifest.sources[0].confidence).toBe('S');
  });
  it('DS-03 rejects unsafe IDs, schemes and private documentation addresses', () => {
    for (const id of ['../a', ' a', 'a/b', 'A', 'a--b'])
      expect(sourceSchema.safeParse({ ...testSource(), id }).success).toBe(false);
    for (const source of [
      'http://example.org',
      'file:///a',
      'https://localhost/a',
      'https://127.0.0.1/a',
      'https://[::1]/a',
      'https://user@example.org',
      'https://example.org/%2e%2e/a',
    ]) {
      expect(sourceSchema.safeParse({ ...testSource(), source }).success).toBe(false);
    }
  });
  it('DS-05/06/11/16 denies approvals without evidence, CRS, license, attribution or coverage', () => {
    for (const patch of [
      { metadataReview: null },
      { horizontalCrs: null },
      { horizontalCrs: 'EPSG:4979' },
      { captureDate: '2027-01-01' },
      { confidence: 'S' },
      { geographic: { ...testSource().geographic, bounds: null } },
      { rights: { ...testSource().rights, attribution: null } },
      { rights: { ...testSource().rights, review: null } },
      { rights: { ...testSource().rights, licenseId: null } },
    ]) {
      expect(() => createDataSourceRegistry([{ ...testSource(), ...patch }])).toThrow();
    }
    expect(() => createDataSourceRegistry([{ ...testSource(), reviewStatus: 'ingested' }])).toThrow();
    const unknown = testSource();
    unknown.rights.licenseId = 'UNKNOWN';
    expect(sourceSchema.safeParse(unknown).success).toBe(false);
  });
  it('DS-02/07/08/09/28 is atomic, independent of city data and defensive on every read', () => {
    const source = testSource();
    const registry = createDataSourceRegistry([source]);
    source.rights.permittedUses.length = 0;
    const read = registry.getSource('test-source');
    if (read) read.rights.permittedUses.length = 0;
    expect(registry.canIngest('test-source', 'download').allowed).toBe(true);
    expect(registry.canIngest('test-source', 'redistribute').allowed).toBe(false);
    expect(registry.getSource('unknown')).toBeUndefined();
    expect(registry.canIngest('unknown', 'download').reasons).toContain('unknown-source');
    expect(() => createDataSourceRegistry([testSource(), testSource()])).toThrow('Duplicate');
    for (const reviewStatus of ['blocked', 'rejected', 'candidate'] as const) {
      const denied = createDataSourceRegistry([{ ...testSource(), reviewStatus }]);
      expect(denied.canIngest('test-source', 'download').allowed).toBe(false);
      expect(denied.canRender('unknown', 'display').allowed).toBe(false);
    }
  });
  it('DS-01/10/25 parses all candidate categories without approving public documentation', () => {
    const registry = createDataSourceRegistry(danangDataSources);
    expect(registry.listSources().length).toBeGreaterThanOrEqual(5);
    for (const source of registry.listSources()) {
      expect(sourceSchema.safeParse({ ...source, unexpected: true }).success).toBe(false);
      expect(registry.canIngest(source.id, 'download').allowed).toBe(false);
    }
    expect(registry.getSource('osm-vector')?.license).toContain('ODbL');
  });

  it('DS-02 rejects duplicate sources atomically', () => {
    expect(() => createDataSourceRegistry([danangDataSources[0], danangDataSources[0]])).toThrow();
  });

  it('DS-03 rejects unsafe identifiers and URLs', () => {
    for (const id of ['../x', ' x', 'X', 'a/b']) {
      expect(sourceSchema.safeParse({ ...danangDataSources[0], id }).success).toBe(false);
    }
    for (const source of ['file:///etc/passwd', 'http://example.com', 'https://localhost/x', 'https://127.0.0.1']) {
      expect(sourceSchema.safeParse({ ...danangDataSources[0], source }).success).toBe(false);
    }
  });

  it('DS-05/06/07 rejects status escalation without reviewed evidence', () => {
    for (const reviewStatus of ['metadata-verified', 'approved-for-ingestion', 'ingested']) {
      expect(() => createDataSourceRegistry([{ ...danangDataSources[0], reviewStatus }])).toThrow();
    }
    for (const reviewStatus of ['blocked', 'rejected']) {
      const registry = createDataSourceRegistry([{ ...danangDataSources[0], reviewStatus }]);
      expect(registry.canIngest('osm-vector', 'download').allowed).toBe(false);
      expect(registry.canRender('missing', 'display').allowed).toBe(false);
    }
  });

  it('DS-08/09/24/28 returns deterministic defensive reads without I/O', () => {
    const registry = createDataSourceRegistry(danangDataSources);
    const first = registry.getSource('osm-vector');
    if (!first) throw new Error('Missing source');
    first.rights.permittedUses.push('download');
    expect(registry.getSource('osm-vector')?.rights.permittedUses).toEqual([]);
    expect(registry.getSource('missing')).toBeUndefined();
    expect(registry.listSources({ category: 'vector-osm' }).map((s) => s.id)).toEqual(['osm-vector']);
    expect(registry.getReadinessSummary().realGeometryLoaded).toBe(false);
    expect(createDataSourceRegistry([]).listSources()).toEqual([]);
  });
});
