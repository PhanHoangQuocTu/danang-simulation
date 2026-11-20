import { GridDemProvider } from './grid';

/**
 * TEST-ONLY — NOT REAL DA NANG GEOGRAPHIC DATA.
 *
 * A small deterministic 5x5 DEM grid used only by automated tests to
 * exercise grid sampling, bilinear interpolation, NoData and boundary
 * behaviour. It must never enter the production world configuration, and
 * it must never be presented as real geographical evidence.
 *
 * Layout (world meters, cell size 10, origin -25/-25, coverage -25..25):
 * row 0 is the north edge (min Z); columns run east (+X), rows run south
 * (+Z). Elevation = column + row, except the north-east corner cell
 * (column 4, row 0), which is NoData (-9999).
 */
export const TEST_DEM_NO_DATA = -9999;

export function createTestDemProvider(): GridDemProvider {
  const elevations: number[] = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      elevations.push(col === 4 && row === 0 ? TEST_DEM_NO_DATA : col + row);
    }
  }
  return new GridDemProvider({
    metadata: {
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
      attribution: 'TEST-ONLY fixture, generated deterministically in code',
      processingHistory: ['Synthetic test grid generated deterministically in code; not a real DEM'],
      purpose: 'test-only',
      isGeographic: true,
    },
    width: 5,
    height: 5,
    cellSizeMeters: 10,
    originXMeters: -25,
    originZMeters: -25,
    elevations,
    noData: TEST_DEM_NO_DATA,
  });
}
