/** Bounded preprocessed raster diagnostics; no raw GeoTIFF decoding in the browser. */
export const IMAGERY_LIMITS = Object.freeze({
  maxDimension: 4096,
  maxPixels: 4_194_304,
  maxBytes: 8_388_608,
  maxControlPoints: 100,
  maxCondition: 1e8,
  maxSpanDegrees: 1,
  maxLatitude: 85,
  minControlAreaFraction: 0.02,
  footprintToleranceDegrees: 1e-8,
});
