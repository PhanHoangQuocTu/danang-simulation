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
  if (source.id === 'sentinel-imagery') {
    source.documentationCheckedAt = '2026-11-20T08:00:00.000Z';
    source.license =
      'Copernicus open licence: free use including commercial use, with attribution "Contains modified Copernicus Sentinel data 2026".';
    source.horizontalCrs = 'EPSG:4326';
    source.captureDate = '2026-04-06';
    source.verifiedDate = '2026-11-20';
    source.accuracyMeters = 10;
    source.reviewStatus = 'approved-for-ingestion';
    source.metadataReview = {
      reviewer: 'Phase 14 Sentinel-2 pilot ingestion (live verification 2026-11-20)',
      reviewedAt: '2026-11-20T08:00:00.000Z',
      evidenceUrl: 'https://planetarycomputer.microsoft.com/api/stac/v1/search',
      decision:
        'Sentinel-2 L2A approved for ingestion as a pilot: two scenes from 2026-04-06 (tiles 49PBT cloud 0.0032% and 48PZC cloud 0.0024%, same date and orbit R075) mosaicked over the DEM pilot bbox; raw 1.5 GB COGs stay outside the repo (SHA-256 recorded in docs/audit/phase-14/SENTINEL2_PILOT_INGESTION.md); 300x300 RGB preview committed as audit evidence. Pixel parity NOT certified (10 m imagery, no surveyed GCPs).',
    };
    source.rights = {
      licenseId: 'Copernicus open licence',
      licenseUrl: 'https://dataspace.copernicus.eu/explore-data/data-collections/sentinel-data/sentinel-2',
      attribution: 'Contains modified Copernicus Sentinel data 2026',
      attributionUrl: 'https://dataspace.copernicus.eu/explore-data/data-collections/sentinel-data/sentinel-2',
      copyrightHolder: 'European Union / ESA (Copernicus programme)',
      permittedUses: ['download', 'display', 'derived-geometry'],
      redistributionAllowed: true,
      restrictions: [
        'Attribution "Contains modified Copernicus Sentinel data 2026" must accompany any display',
        '10 m resolution: cannot certify sub-metre pixel parity; no surveyed GCPs yet',
      ],
      review: source.metadataReview,
    };
    source.geographic = {
      bounds: [108.188181, 16.040844, 108.216217, 16.067955],
      coordinateOrder: 'longitude-latitude',
      units: 'degree',
      coverageEvidence:
        'Two 2026-04-06 L2A scenes (49PBT + 48PZC) mosaicked over the pilot bbox; 100% coverage in B02/B03/B04, 0 NoData pixels in the pilot window; visual check shows Da Nang airport runway/terminal and urban grid, no cloud, no seam artefact',
    };
    source.resolutionMeters = 10;
    source.updateCadence = '5-day revisit';
    source.capabilities = { download: true, api: true, view: true };
    source.notes = [
      'Sentinel-2 L2A (surface reflectance, orthorectified): 10 m RGB bands B04/B03/B02; pilot bbox straddles the 48PZC/49PBT tile boundary at lon 108.1931, so a same-date pair was mosaicked.',
      'Pilot preview: docs/audit/phase-14/evidence/sentinel2-pilot-rgb-300.png (300x300) and sentinel2-pilot-rgb-600.png; registration validated by the Phase 14 inspector (src/engine/imagery/__tests__/sentinel2-pilot.test.ts).',
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
