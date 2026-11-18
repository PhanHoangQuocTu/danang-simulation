import { pixelToWorld, validateRasterRegistration } from '@/engine/imagery/alignment';
import type { RasterRegistration } from '@/engine/imagery/alignment';
import type { GeoReference } from '@/engine/geospatial/type';

/** Invented grid for the explicitly labeled F3 TEST DATA harness. No source, license or survey claims. */
export function createImageryDiagnostic(reference: GeoReference) {
  const { longitudeDeg, latitudeDeg } = reference.anchor;
  const width = 100;
  const height = 100;
  const step = 0.00001;
  return validateRasterRegistration({
    assetId: 'test-grid',
    sourceId: 'test-only',
    datasetId: 'test-only',
    version: 'v1',
    width,
    height,
    nativeCrs: 'EPSG:4326',
    pixelReference: 'pixel-corner',
    transform: [longitudeDeg, step, 0, latitudeDeg, 0, -step],
    footprintWgs84: [
      [longitudeDeg, latitudeDeg],
      [longitudeDeg + width * step, latitudeDeg],
      [longitudeDeg + width * step, latitudeDeg - height * step],
      [longitudeDeg, latitudeDeg - height * step],
      [longitudeDeg, latitudeDeg],
    ],
    captureDate: null,
    noData: null,
    cloudFraction: null,
    noDataFraction: null,
    orthorectified: true,
    groundSampleDistanceMeters: 1.1,
  });
}

/** A bounded 2D tangent-plane diagnostic. Reject curvature beyond half a source pixel instead of silently warping. */
export function imageryPreviewGeometry(raster: RasterRegistration, reference: GeoReference) {
  const points = [
    { column: 0, row: 0 },
    { column: raster.width, row: 0 },
    { column: raster.width, row: raster.height },
    { column: 0, row: raster.height },
  ].map((p) => pixelToWorld(p, raster, reference, reference.anchor.ellipsoidalHeightMeters));
  const error = Math.hypot(
    points[2].x - (points[1].x + points[3].x - points[0].x),
    points[2].z - (points[1].z + points[3].z - points[0].z)
  );
  if (error > raster.groundSampleDistanceMeters / 2) throw new Error('Preprocess a smaller raster for planar preview');
  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.z);
  const minX = Math.min(...xs);
  const minY = Math.min(...ys);
  const spanX = Math.max(...xs) - minX;
  const spanY = Math.max(...ys) - minY;
  const scale = Math.min(260 / spanX, 160 / spanY);
  const projected = points.map((p) => ({ x: 20 + (p.x - minX) * scale, y: 30 + (p.z - minY) * scale }));
  const [a, b, , d] = projected;
  return {
    points: projected,
    matrix: [
      (b.x - a.x) / raster.width,
      (b.y - a.y) / raster.width,
      (d.x - a.x) / raster.height,
      (d.y - a.y) / raster.height,
      a.x,
      a.y,
    ] as const,
    errorMeters: error,
  };
}
