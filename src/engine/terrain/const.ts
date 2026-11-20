/** Bounded terrain datasets; no unbounded in-memory DEM loading. */
export const TERRAIN_LIMITS = Object.freeze({
  /** Maximum grid dimension (cells) on either axis. */
  maxDimension: 4096,
  /** Maximum total samples in one grid (4096 x 1024, matching the imagery pixel cap). */
  maxSamples: 4_194_304,
  /** Maximum elevation payload in bytes (Float32 samples). */
  maxBytes: 16_777_216,
  /** Maximum horizontal span of one grid, in meters. */
  maxSpanMeters: 100_000,
  /** Maximum cell size, in meters. */
  maxCellSizeMeters: 1000,
  /** Maximum metadata string / array sizes. */
  maxTextLength: 2000,
  maxProcessingEntries: 30,
  /** Maximum supported terrain coverage half-extent, in meters. */
  maxCoverageMeters: 100_000,
});
