import { createDataSourceRegistry, type DataSource } from '@/world-core/registries/data-sources';

/** Discovery metadata only; no dataset, license approval, verified coverage or loaded geography. */
function candidate(
  id: string,
  provider: string,
  source: string,
  category: DataSource['category'],
  datasetName: string
): DataSource {
  return {
    id,
    provider,
    source,
    officialUrl: source,
    category,
    datasetName,
    confidence: 'E',
    horizontalCrs: null,
    verticalDatum: null,
    captureDate: null,
    verifiedDate: null,
    license: 'UNKNOWN — dataset-specific permission review required',
    accuracyMeters: null,
    processing: [],
    reviewStatus: 'candidate',
    metadataReview: null,
    documentationCheckedAt: null,
    rights: {
      licenseId: null,
      licenseUrl: null,
      attribution: null,
      attributionUrl: null,
      copyrightHolder: null,
      permittedUses: [],
      redistributionAllowed: null,
      restrictions: ['No ingestion before dataset-specific review'],
      review: null,
    },
    geographic: { bounds: null, coordinateOrder: 'longitude-latitude', units: 'degree', coverageEvidence: null },
    resolutionMeters: null,
    updateCadence: null,
    capabilities: { download: false, api: false, view: true },
    notes: ['Documentation discovery only; license, coverage, CRS and current access need verification.'],
  };
}

const osm = candidate(
  'osm-vector',
  'OpenStreetMap contributors',
  'https://www.openstreetmap.org/copyright',
  'vector-osm',
  'Exploratory OSM vector sample (not acquired)'
);
osm.license = 'ODbL-1.0 — attribution and derived-database share-alike require use-specific review';
osm.rights.licenseId = 'ODbL-1.0';
osm.rights.licenseUrl = 'https://www.openstreetmap.org/copyright';
osm.rights.attribution = '© OpenStreetMap contributors';
osm.rights.attributionUrl = 'https://www.openstreetmap.org/copyright';
osm.rights.copyrightHolder = 'OpenStreetMap contributors';
osm.horizontalCrs = 'EPSG:4326';
osm.notes = [
  'OSM heights and positional accuracy are unknown. Public Overpass is not a production per-visitor service. No tiles or Vietnam PBF downloaded.',
];

export const danangDataSources: DataSource[] = [
  osm,
  candidate(
    'copernicus-dsm',
    'Copernicus Data Space',
    'https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM',
    'dsm',
    'Copernicus DEM GLO-30/GLO-90 discovery'
  ),
  candidate(
    'sentinel-imagery',
    'Copernicus Data Space',
    'https://dataspace.copernicus.eu/explore-data/data-collections/sentinel-data/sentinel-2',
    'satellite-imagery',
    'Sentinel-2 imagery discovery'
  ),
  candidate(
    'commons-ground-reference',
    'Wikimedia Commons',
    'https://commons.wikimedia.org/wiki/Category:Da_Nang',
    'ground-reference',
    'Individual photograph discovery; no image acquired'
  ),
  candidate(
    'danang-official-gis',
    'Da Nang GIS portal',
    'https://gisportal.danang.gov.vn/sxd/',
    'official-gis',
    'Official GIS dataset discovery'
  ),
  candidate(
    'vietnam-official-gis',
    'Vietnam national spatial data portal',
    'https://dosm.vnsdi.gov.vn/',
    'official-gis',
    'National GIS dataset discovery'
  ),
];

// Attempt dates are not metadata verification or legal approval. Evidence is retained in phase-13/metadata.json.
for (const source of danangDataSources) {
  if (source.id === 'osm-vector') source.documentationCheckedAt = '2026-11-17T19:28:14.336Z';
  if (source.id === 'copernicus-dsm') {
    source.documentationCheckedAt = '2026-11-20T02:57:00.000Z';
    source.license =
      'Copernicus DEM licence: free use including commercial use, with attribution. Raw-data redistribution is not claimed.';
    source.horizontalCrs = 'EPSG:4326';
    source.verticalDatum = 'EGM2008 (EPSG:3855)';
    source.captureDate = '2015-12-31';
    source.verifiedDate = '2026-11-20';
    source.accuracyMeters = 4;
    source.reviewStatus = 'approved-for-ingestion';
    source.metadataReview = {
      reviewer: 'Phase 16 DEM research (live verification 2026-11-20)',
      reviewedAt: '2026-11-20T02:57:00.000Z',
      evidenceUrl:
        'https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM',
      decision:
        'Copernicus DEM GLO-30 approved for ingestion as a pilot: tile Copernicus_DSM_COG_10_N16_00_E108_00_DEM downloaded anonymously from the public AWS S3 bucket and verified (SHA-256 f4f95dc5677eaaca9a967230a676bb8a39025ab79d28b89e225a7e822acbdde6); DSM, not bare-earth DTM; orthometric EGM2008, absolute ellipsoid alignment NOT VERIFIED.',
    };
    source.rights = {
      licenseId: 'Copernicus DEM licence',
      licenseUrl:
        'https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM',
      attribution:
        '© DLR e.V. 2010-2014 and © Airbus Defence and Space GmbH 2014-2018 provided under COPERNICUS by the European Union and ESA; all rights reserved',
      attributionUrl:
        'https://dataspace.copernicus.eu/explore-data/data-collections/copernicus-contributing-missions/collections-description/COP-DEM',
      copyrightHolder: 'DLR e.V. and Airbus Defence and Space GmbH (Copernicus programme)',
      permittedUses: ['download', 'display', 'derived-geometry'],
      redistributionAllowed: false,
      restrictions: [
        'Raw-data redistribution is not claimed; only derived geometry (the cropped 100x100 pilot grid) is used in the app',
        'DSM, not bare-earth DTM: buildings and vegetation are included in the heights',
        'Orthometric EGM2008 heights; absolute WGS84-ellipsoid alignment is NOT VERIFIED',
      ],
      review: source.metadataReview,
    };
    source.geographic = {
      bounds: [108.188181, 16.040844, 108.216217, 16.067955],
      coordinateOrder: 'longitude-latitude',
      units: 'degree',
      coverageEvidence:
        'Tile Copernicus_DSM_COG_10_N16_00_E108_00_DEM (1 deg, SW corner N16 E108) downloaded and verified 2026-11-20; pilot window 100x100 cells around lat 16.0544 lon 108.2022, bbox lon 108.188181-108.216217 lat 16.040844-16.067955',
    };
    source.resolutionMeters = 30;
    source.updateCadence = 'Annual releases; latest 2024_1';
    source.capabilities = { download: true, api: false, view: true };
    source.notes = [
      'Copernicus DEM GLO-30 (COP-DEM_GLO-30-DGED): 30 m DSM from TanDEM-X 2011-2015; published absolute vertical accuracy <4 m (90% LE), horizontal <6 m (90% CE); capture date 2015-12-31 is the end of the acquisition window (multi-year composite, not a single-date capture).',
      'Pilot asset: cropped 100x100-cell, 30 m ENU grid (src/worlds/danang/data/danang-dem-pilot.ts); source tile SHA-256 f4f95dc5677eaaca9a967230a676bb8a39025ab79d28b89e225a7e822acbdde6; raw 2.8 MB COG is not in the repo.',
    ];
  }
  if (source.id === 'danang-official-gis') {
    source.documentationCheckedAt = '2026-11-17T19:28:26.704Z';
    source.reviewStatus = 'blocked';
    source.notes = ['Official portal timed out on 2026-11-18 Asia/Bangkok; dataset, license and CRS remain unknown.'];
  }
  if (source.id === 'vietnam-official-gis') {
    source.documentationCheckedAt = '2026-11-17T19:28:26.876Z';
    source.notes = [
      'Portal returned HTTP 200 but no usable dataset/license metadata was found; access does not establish permission.',
    ];
  }
}

export const danangSourceRegistry = createDataSourceRegistry(danangDataSources);
