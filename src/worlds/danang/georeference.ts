import { createGeoReference } from '@/engine/geospatial/core';
import type { GeoReferenceConfig } from '@/engine/geospatial/type';
import { DA_NANG_CONFIG } from './const';

const reference = createGeoReference({
  latitudeDeg: DA_NANG_CONFIG.latitude,
  longitudeDeg: DA_NANG_CONFIG.longitude,
  ellipsoidalHeightMeters: 0,
});

/** Math reference only. Nothing in the synthetic scene has surveyed geographic placement. */
export const DANANG_GEO_REFERENCE: GeoReferenceConfig = Object.freeze({
  anchor: Object.freeze({
    id: 'danang-reference-v1',
    coordinate: reference.anchor,
    anchorVersion: 1,
    status: 'reference-only',
    isGroundTruthVerified: false,
    source: 'existing DA_NANG_CONFIG; reference anchor only',
    horizontalAccuracyMeters: null,
    verticalAccuracyMeters: null,
    heightAssumption: '0m reference assumption; not measured terrain elevation',
  }),
  reference,
  axisConvention: '+X East / +Y Up / -Z North',
  metersPerWorldUnit: 1,
  geographicCrs: 'EPSG:4979',
  geocentricCrs: 'EPSG:4978',
  heightDatum: 'WGS84_ELLIPSOID',
  readiness: 'reference-only',
});
