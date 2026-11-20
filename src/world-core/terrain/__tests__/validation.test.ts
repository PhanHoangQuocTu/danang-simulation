import { describe, expect, it } from 'vitest';
import { validateTerrainDatasetMetadata } from '../validation';

const baseMetadata = {
  datasetId: 'test-dem',
  sourceId: 'copernicus-dsm',
  version: '1',
  checksumSha256: 'a'.repeat(64),
  crs: 'EPSG:4326',
  verticalDatum: 'WGS84_ELLIPSOID',
  unit: 'meters',
  coverage: { minXMeters: -25, maxXMeters: 25, minZMeters: -25, maxZMeters: 25 },
  widthCells: 5,
  heightCells: 5,
  resolutionMeters: 10,
  noData: -9999,
  captureDate: '2024-01-15',
  sourceAccuracyMeters: 2,
  license: 'Test license',
  attribution: 'Test attribution',
  processingHistory: ['Preprocessed to world meters'],
  purpose: 'production',
  isGeographic: true,
} as const;

describe('terrain metadata validation', () => {
  it('accepts a complete geographic production dataset', () => {
    const validated = validateTerrainDatasetMetadata(baseMetadata);
    expect(validated.isProductionReady).toBe(true);
    expect(validated.metadata.datasetId).toBe('test-dem');
  });

  it('rejects unknown vertical datum', () => {
    expect(() => validateTerrainDatasetMetadata({ ...baseMetadata, verticalDatum: 'UNKNOWN' })).toThrow(
      /vertical datum is unknown/i
    );
  });

  it('rejects orthometric heights without a verified geoid transformation', () => {
    expect(() => validateTerrainDatasetMetadata({ ...baseMetadata, verticalDatum: 'ORTHOMETRIC_EGM2008' })).toThrow(
      /geoid transformation/i
    );
  });

  it('rejects unsupported CRS', () => {
    expect(() => validateTerrainDatasetMetadata({ ...baseMetadata, crs: 'EPSG:3857' })).toThrow();
  });

  it('rejects inverted coverage bounds', () => {
    expect(() =>
      validateTerrainDatasetMetadata({
        ...baseMetadata,
        coverage: { minXMeters: 25, maxXMeters: -25, minZMeters: -25, maxZMeters: 25 },
      })
    ).toThrow(/coverage bounds are inverted/i);
  });

  it('rejects a production geographic dataset without a checksum', () => {
    expect(() => validateTerrainDatasetMetadata({ ...baseMetadata, checksumSha256: null })).toThrow(
      /SHA-256 checksum/i
    );
  });

  it('rejects a production geographic dataset without a capture date', () => {
    expect(() => validateTerrainDatasetMetadata({ ...baseMetadata, captureDate: null })).toThrow(/capture date/i);
  });

  it('rejects raster dimensions without a resolution', () => {
    expect(() => validateTerrainDatasetMetadata({ ...baseMetadata, resolutionMeters: null })).toThrow(/resolution/i);
  });

  it('rejects synthetic-local data marked geographic', () => {
    expect(() =>
      validateTerrainDatasetMetadata({
        ...baseMetadata,
        crs: 'synthetic-local-meters',
        verticalDatum: 'SYNTHETIC_LOCAL',
      })
    ).toThrow(/cannot be geographic/i);
  });

  it('rejects non-meter units', () => {
    expect(() => validateTerrainDatasetMetadata({ ...baseMetadata, unit: 'feet' })).toThrow();
  });
});
