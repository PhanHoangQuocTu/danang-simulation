import { describe, expect, it } from 'vitest';
import { createTestDemProvider, TEST_DEM_NO_DATA } from '../fixtures';
import { GridDemProvider } from '../grid';

function testMetadata(overrides: Record<string, unknown> = {}) {
  return {
    datasetId: 'test-dem-fixture-5x5',
    sourceId: 'test-only',
    version: '1',
    checksumSha256: null,
    crs: 'EPSG:4326',
    verticalDatum: 'WGS84_ELLIPSOID',
    unit: 'meters',
    coverage: { minXMeters: -25, maxXMeters: 25, minZMeters: -25, maxZMeters: 25 },
    widthCells: 5,
    heightCells: 5,
    resolutionMeters: 10,
    noData: TEST_DEM_NO_DATA,
    captureDate: null,
    sourceAccuracyMeters: null,
    license: 'TEST-ONLY — NOT REAL DA NANG GEOGRAPHIC DATA',
    attribution: 'TEST-ONLY fixture',
    processingHistory: ['Synthetic test grid'],
    purpose: 'test-only',
    isGeographic: true,
    ...overrides,
  };
}

function elevations() {
  const values: number[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      values.push(col === 4 && row === 0 ? TEST_DEM_NO_DATA : col + row);
    }
  }
  return values;
}

function createProvider(overrides: Record<string, unknown> = {}) {
  return new GridDemProvider({
    metadata: testMetadata(),
    width: 5,
    height: 5,
    cellSizeMeters: 10,
    originXMeters: -25,
    originZMeters: -25,
    elevations: elevations(),
    noData: TEST_DEM_NO_DATA,
    ...overrides,
  });
}

describe('grid DEM provider', () => {
  it('samples a cell centre exactly (nearest and bilinear agree)', () => {
    const provider = createProvider();
    // Cell centre col 1, row 1: x = -25 + 1.5 * 10 = -10, z = -10, value 1 + 1 = 2.
    const sample = provider.sampleElevation(-10, -10);
    expect(sample.status).toBe('ok');
    if (sample.status === 'ok') expect(sample.elevationMeters).toBeCloseTo(2, 6);
  });

  it('bilinearly interpolates between cell centres', () => {
    const provider = createProvider();
    // Halfway between centres (-10,-10)=2 and (0,-10)=3.
    const sample = provider.sampleElevation(-5, -10);
    expect(sample.status).toBe('ok');
    if (sample.status === 'ok') expect(sample.elevationMeters).toBeCloseTo(2.5, 6);
  });

  it('nearest sampling returns the nearest cell', () => {
    const provider = createProvider({ interpolation: 'nearest' });
    const sample = provider.sampleElevation(-12, -15);
    expect(sample.status).toBe('ok');
    if (sample.status === 'ok') expect(sample.elevationMeters).toBeCloseTo(2, 6);
  });

  it('returns no-data when bilinear interpolation would cross a NoData cell', () => {
    const provider = createProvider();
    // Between the NoData corner cell (20,-20) and its neighbours.
    const sample = provider.sampleElevation(15, -20);
    expect(sample.status).toBe('no-data');
    if (sample.status === 'no-data') expect(sample.elevationMeters).toBeNull();
  });

  it('returns outside-coverage beyond the grid', () => {
    const provider = createProvider();
    const sample = provider.sampleElevation(100, 0);
    expect(sample.status).toBe('outside-coverage');
  });

  it('returns invalid-input for non-finite coordinates and never a silent zero', () => {
    const provider = createProvider();
    expect(provider.sampleElevation(Number.NaN, 0).status).toBe('invalid-input');
    expect(provider.sampleElevation(0, Number.POSITIVE_INFINITY).status).toBe('invalid-input');
  });

  it('samples the grid edges without reading out of bounds', () => {
    const provider = createProvider();
    const east = provider.sampleElevation(25, 0);
    expect(east.status).toBe('ok');
    const south = provider.sampleElevation(0, 25);
    expect(south.status).toBe('ok');
  });

  it('rejects dimensions that do not match metadata', () => {
    expect(() => createProvider({ width: 4 })).toThrow(/dimensions do not match/i);
  });

  it('rejects orthometric metadata', () => {
    expect(() =>
      createProvider({
        metadata: testMetadata({ verticalDatum: 'ORTHOMETRIC_EGM2008' }),
      })
    ).toThrow(/geoid transformation/i);
  });

  it('rejects an unsupported CRS', () => {
    expect(() => createProvider({ metadata: testMetadata({ crs: 'EPSG:3857' }) })).toThrow();
  });

  it('rejects a NoData marker that does not match metadata', () => {
    expect(() => createProvider({ noData: -32768 })).toThrow(/NoData marker/i);
  });

  it('rejects an elevation count that does not match dimensions', () => {
    expect(() => createProvider({ elevations: [1, 2, 3] })).toThrow(/elevation count/i);
  });

  it('throws after disposal and disposal is idempotent', () => {
    const provider = createProvider();
    provider.dispose();
    provider.dispose();
    expect(provider.isDisposed).toBe(true);
    expect(() => provider.sampleElevation(0, 0)).toThrow(/disposed/i);
  });

  it('the test fixture is explicitly test-only, not real geography', () => {
    const provider = createTestDemProvider();
    expect(provider.metadata.purpose).toBe('test-only');
    expect(provider.metadata.license).toContain('TEST-ONLY');
    expect(provider.metadata.datasetId).toBe('test-dem-fixture-5x5');
  });
});
