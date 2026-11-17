import type { DataSource } from '../data-sources';

/** Invented legal metadata for offline tests only. Never register in the city catalog. */
export function testSource(): DataSource {
  const review = {
    reviewer: 'TEST-ONLY reviewer',
    reviewedAt: '2026-11-18T00:00:00Z',
    evidenceUrl: 'https://example.org/test-only',
    decision: 'TEST-ONLY permission; no legal authority',
  };
  return {
    id: 'test-source',
    provider: 'TEST-ONLY provider',
    source: 'https://example.org/test-only',
    officialUrl: 'https://example.org/test-only',
    confidence: 'E',
    horizontalCrs: 'EPSG:4326',
    verticalDatum: null,
    captureDate: null,
    verifiedDate: '2026-11-18',
    license: 'TEST-ONLY',
    accuracyMeters: null,
    processing: [],
    category: 'vector-osm',
    datasetName: 'TEST-ONLY',
    reviewStatus: 'approved-for-ingestion',
    metadataReview: review,
    documentationCheckedAt: null,
    rights: {
      licenseId: 'TEST-ONLY',
      licenseUrl: 'https://example.org/test-only',
      attribution: 'TEST-ONLY',
      attributionUrl: 'https://example.org/test-only',
      copyrightHolder: 'TEST-ONLY',
      permittedUses: ['download', 'display'],
      redistributionAllowed: false,
      restrictions: ['TEST-ONLY'],
      review,
    },
    geographic: {
      bounds: [108.2, 16.05, 108.21, 16.06],
      coordinateOrder: 'longitude-latitude',
      units: 'degree',
      coverageEvidence: 'TEST-ONLY',
    },
    resolutionMeters: null,
    updateCadence: null,
    capabilities: { download: true, api: true, view: true },
    notes: ['TEST-ONLY; not geographic evidence'],
  };
}
