import { z } from 'zod';
import { evaluateControlPoints, validateRasterRegistration } from '@/engine/imagery/alignment';
import { IMAGERY_LIMITS } from '@/engine/imagery/const';
import type { GeoReference } from '@/engine/geospatial/type';
import { containsBounds, dataUseDenials, sourceSchema, type createDataSourceRegistry } from './data-sources';

const assetSchema = z.strictObject({
  registration: z.unknown(),
  purpose: z.enum(['production', 'test-only']),
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  path: z.string().max(300),
  byteLength: z.number().int().min(33).max(IMAGERY_LIMITS.maxBytes),
  retrievedAt: z.iso.datetime(),
  originUrl: sourceSchema.shape.officialUrl,
  inputArtifact: z.string().min(1).max(2000),
  licenseReview: sourceSchema.shape.metadataReview.unwrap(),
  processing: z.array(z.string().min(1).max(2000)).min(1).max(30),
  maskApplied: z.literal(true),
  thresholds: z.strictObject({
    rmseMeters: z.number().positive().max(10000),
    maxMeters: z.number().positive().max(10000),
  }),
});
export type SourceRegistry = ReturnType<typeof createDataSourceRegistry>;

/** Re-evaluate against the current registry on every selection/load. No URL proxy or second source catalog. */
export function validateImageryAsset(
  raw: unknown,
  registry: SourceRegistry,
  reference: GeoReference,
  controls: unknown
) {
  const asset = assetSchema.parse(raw);
  const registration = validateRasterRegistration(asset.registration);
  const source = registry.getSource(registration.sourceId);
  if (!source || !['satellite-imagery', 'ortho-imagery'].includes(source.category))
    throw new Error('Unknown imagery source');
  const denials = [...dataUseDenials(source, 'display'), ...dataUseDenials(source, 'redistribute')];
  if (asset.purpose !== 'production' || source.confidence === 'S' || denials.length)
    throw new Error(`Imagery rights/source not approved: ${[...new Set(denials)].join(', ')}`);
  if (
    source.horizontalCrs !== registration.nativeCrs ||
    new URL(asset.originUrl).origin !== new URL(source.officialUrl).origin ||
    source.captureDate !== registration.captureDate ||
    Date.parse(asset.licenseReview.reviewedAt) < Date.parse(asset.retrievedAt) ||
    (registration.captureDate && registration.captureDate > asset.retrievedAt.slice(0, 10))
  )
    throw new Error('Imagery source/asset metadata mismatch');
  const ring = registration.footprintWgs84;
  const bounds: [number, number, number, number] = [
    Math.min(...ring.map((p) => p[0])),
    Math.min(...ring.map((p) => p[1])),
    Math.max(...ring.map((p) => p[0])),
    Math.max(...ring.map((p) => p[1])),
  ];
  if (!source.geographic.bounds || !containsBounds(source.geographic.bounds, bounds))
    throw new Error('Imagery outside approved source extent');
  // Exact content-addressed preprocessed local PNG only. No protocol, redirect, query, encoded path or user URL.
  if (asset.path !== `/imagery/${registration.assetId}/${asset.sha256}.png`)
    throw new Error('Unapproved imagery asset path');
  const quality = evaluateControlPoints(registration, controls, reference, asset.thresholds);
  if (Array.isArray(controls) && controls.some((point) => point.collectedAt > asset.retrievedAt.slice(0, 10)))
    throw new Error('Control point chronology mismatch');
  if (quality.status === 'rejected') throw new Error('Imagery failed control point thresholds');
  return {
    ...asset,
    registration,
    quality,
    provider: source.provider,
    license: source.license,
    attribution: source.rights.attribution!,
    attributionUrl: source.rights.attributionUrl!,
    sourceUrl: source.officialUrl,
  };
}
export type ValidatedImageryAsset = ReturnType<typeof validateImageryAsset>;

/** Header and checksum checks precede image decoding, preventing declared-dimension bombs. */
export async function verifyImageryBytes(asset: ValidatedImageryAsset, buffer: ArrayBuffer): Promise<void> {
  if (buffer.byteLength !== asset.byteLength || buffer.byteLength > IMAGERY_LIMITS.maxBytes)
    throw new Error('Imagery byte length mismatch');
  const bytes = new Uint8Array(buffer);
  const view = new DataView(buffer);
  const signature = [137, 80, 78, 71, 13, 10, 26, 10];
  if (
    buffer.byteLength < 33 ||
    signature.some((b, i) => bytes[i] !== b) ||
    view.getUint32(8) !== 13 ||
    view.getUint32(12) !== 0x49484452 ||
    view.getUint32(16) !== asset.registration.width ||
    view.getUint32(20) !== asset.registration.height
  )
    throw new Error('PNG header/dimensions mismatch');
  const digest = await crypto.subtle.digest('SHA-256', buffer);
  const hash = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  if (hash !== asset.sha256) throw new Error('Imagery checksum mismatch');
}
