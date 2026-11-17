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
    source.documentationCheckedAt = '2026-11-17T19:28:18.406Z';
    source.notes = [
      'Product documentation describes a DSM including buildings and vegetation. The 2026-08-25 GLO-30 View Service update restricts access to authorized categories; no tile-specific license, datum or coverage reviewed.',
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
