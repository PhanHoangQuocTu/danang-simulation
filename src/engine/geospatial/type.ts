/** WGS84 geographic degrees (EPSG:4326); height is deliberately absent. */
export interface GeoHorizontalCoordinate {
  readonly latitudeDeg: number;
  readonly longitudeDeg: number;
}
/** EPSG:4979, height in meters above the WGS84 ellipsoid, never MSL. */
export interface GeodeticCoordinate extends GeoHorizontalCoordinate {
  readonly ellipsoidalHeightMeters: number;
}
/** EPSG:4978 geocentric meters, not renderer axes. */
export interface ECEFCoordinate {
  readonly xMeters: number;
  readonly yMeters: number;
  readonly zMeters: number;
}
export interface ENUCoordinate {
  readonly eastMeters: number;
  readonly northMeters: number;
  readonly upMeters: number;
}
/** Simulation meters: +X East, +Y Up, -Z North. */
export interface WorldCoordinate {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}
/** Created by createGeoReference; cached orthonormal basis and origin are immutable. */
export interface GeoReference {
  readonly anchor: GeodeticCoordinate;
  readonly worldOrigin: WorldCoordinate;
  readonly ecef: ECEFCoordinate;
  readonly sinLatitude: number;
  readonly cosLatitude: number;
  readonly sinLongitude: number;
  readonly cosLongitude: number;
}
export interface GeoAnchor {
  readonly id: string;
  readonly coordinate: GeodeticCoordinate;
  readonly anchorVersion: number;
  readonly status: 'reference-only' | 'unverified' | 'surveyed' | 'verified';
  readonly isGroundTruthVerified: boolean;
  readonly source: string;
  readonly horizontalAccuracyMeters: number | null;
  readonly verticalAccuracyMeters: number | null;
  readonly heightAssumption: string;
}
export interface GeoReferenceConfig {
  readonly anchor: GeoAnchor;
  readonly reference: GeoReference;
  readonly axisConvention: '+X East / +Y Up / -Z North';
  readonly metersPerWorldUnit: 1;
  readonly geographicCrs: 'EPSG:4979';
  readonly geocentricCrs: 'EPSG:4978';
  readonly heightDatum: 'WGS84_ELLIPSOID';
  readonly readiness: 'reference-only';
}
