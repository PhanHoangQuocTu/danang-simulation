import { describe, expect, it } from 'vitest';
import { createDataSourceRegistry } from '../data-sources';
import { testSource } from './fixtures';
import { validateImageryAsset, verifyImageryBytes } from '../imagery';
import { rasterFixture } from '@/engine/imagery/__tests__/fixtures';
import { createGeoReference } from '@/engine/geospatial/core';

const ref = createGeoReference({ latitudeDeg: 16.06, longitudeDeg: 108.2, ellipsoidalHeightMeters: 0 });
function imageryFixture() {
  const source = testSource();
  source.category = 'satellite-imagery';
  source.rights.permittedUses.push('redistribute');
  source.rights.redistributionAllowed = true;
  return {
    source,
    asset: {
      registration: rasterFixture,
      purpose: 'production',
      sha256: 'a'.repeat(64),
      path: `/imagery/test-raster/${'a'.repeat(64)}.png`,
      byteLength: 100,
      retrievedAt: '2026-11-18T00:00:00Z',
      originUrl: source.officialUrl,
      inputArtifact: 'TEST DATA original raster',
      licenseReview: source.metadataReview,
      processing: ['TEST DATA / PNG alpha contains no-data mask'],
      maskApplied: true,
      thresholds: { rmseMeters: 2, maxMeters: 3 },
    },
  };
}
describe('imagery trust adapter', () => {
  it('IMG-23/25/37 reuses registry rights and preserves attribution, unknown capture and unverified accuracy', () => {
    const { source, asset } = imageryFixture();
    const result = validateImageryAsset(asset, createDataSourceRegistry([source]), ref, []);
    expect(result.attribution).toBe(source.rights.attribution);
    expect(result.attributionUrl).toBe(source.rights.attributionUrl);
    expect(result.quality.status).toBe('unverified');
    expect(result.registration.captureDate).toBeNull();
  });
  it.each(['candidate', 'blocked', 'rejected'] as const)(
    'IMG-24/38 rejects %s source including cached metadata',
    (status) => {
      const { source, asset } = imageryFixture();
      source.reviewStatus = status;
      expect(() => validateImageryAsset(asset, createDataSourceRegistry([source]), ref, [])).toThrow();
    }
  );
  it('IMG-24 rejects display or redistribution without permission', () => {
    for (const use of ['display', 'redistribute'] as const) {
      const { source, asset } = imageryFixture();
      source.rights.permittedUses = source.rights.permittedUses.filter((u) => u !== use);
      expect(() => validateImageryAsset(asset, createDataSourceRegistry([source]), ref, [])).toThrow();
    }
  });
  it('IMG-26/28 rejects unknown source, mismatched capture and missing provenance', () => {
    const { source, asset } = imageryFixture();
    const registry = createDataSourceRegistry([source]);
    for (const changed of [
      { ...asset, registration: { ...rasterFixture, sourceId: 'absent' } },
      { ...asset, processing: [] },
      { ...asset, registration: { ...rasterFixture, captureDate: '2027-01-01' } },
    ])
      expect(() => validateImageryAsset(changed, registry, ref, [])).toThrow();
  });
  it.each(['https://evil.example/image.png', '//evil.example/x', '/imagery/../x.png', '/imagery/%2e%2e/x.png'])(
    'IMG-27/64/66 blocks non-content-addressed path %s',
    (path) => {
      const { source, asset } = imageryFixture();
      expect(() => validateImageryAsset({ ...asset, path }, createDataSourceRegistry([source]), ref, [])).toThrow();
    }
  );
  it('IMG-39/65 rejects oversized and corrupt bytes before decoding', async () => {
    const { source, asset } = imageryFixture();
    const record = validateImageryAsset(asset, createDataSourceRegistry([source]), ref, []);
    await expect(verifyImageryBytes(record, new ArrayBuffer(100))).rejects.toThrow();
    expect(() =>
      validateImageryAsset({ ...asset, byteLength: 1e9 }, createDataSourceRegistry([source]), ref, [])
    ).toThrow();
  });
  it('IMG-40 deterministic validation; immutable source registry stays single owner', () => {
    const { source, asset } = imageryFixture();
    const registry = createDataSourceRegistry([source]);
    expect(validateImageryAsset(asset, registry, ref, [])).toEqual(validateImageryAsset(asset, registry, ref, []));
    expect(registry.listSources()).toHaveLength(1);
    expect(registry.canIngest(source.id, 'download').allowed).toBe(false);
  });
});
