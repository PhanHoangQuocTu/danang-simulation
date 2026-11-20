import { z } from 'zod';
import { provenanceSchema } from '../schemas/manifest';

const sourceIdSchema = z
  .string()
  .regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/)
  .max(120);
const text = z.string().trim().min(1).max(2000);
/** Documentation URLs only. Transport has a separate fixed endpoint, never this URL. */
const documentationUrlSchema = z
  .url()
  .max(2000)
  .refine((value) => {
    const url = new URL(value);
    return (
      url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      /^[a-z0-9-]+(?:\.[a-z0-9-]+)+$/i.test(url.hostname) &&
      !/^(?:\d+\.){3}\d+$/.test(url.hostname) &&
      !/\.(?:localhost|local|internal)$/i.test(url.hostname) &&
      !/%2e|%2f|%5c/i.test(value)
    );
  }, 'Unsafe documentation URL');
export const bboxSchema = z
  .tuple([
    z.number().min(-180).max(180),
    z.number().min(-90).max(90),
    z.number().min(-180).max(180),
    z.number().min(-90).max(90),
  ])
  .refine(([west, south, east, north]) => west < east && south < north, 'Inverted or wrapping bounds');
const useCaseSchema = z.enum(['download', 'display', 'redistribute', 'derived-geometry']);
export type DataUse = z.infer<typeof useCaseSchema>;
const reviewSchema = z.strictObject({
  reviewer: text,
  reviewedAt: z.iso.datetime(),
  evidenceUrl: documentationUrlSchema,
  decision: text,
});

/** Extends the manifest's provenance contract; synthetic manifests keep their existing contract. */
export const sourceSchema = provenanceSchema
  .extend({
    id: sourceIdSchema,
    provider: text,
    source: documentationUrlSchema,
    license: text,
    horizontalCrs: text.nullable(),
    verticalDatum: text.nullable(),
    officialUrl: documentationUrlSchema,
    category: z.enum([
      'vector-osm',
      'dem',
      'dsm',
      'ortho-imagery',
      'satellite-imagery',
      'ground-reference',
      'control-point',
      'official-gis',
    ]),
    datasetName: text,
    reviewStatus: z.enum([
      'candidate',
      'metadata-verified',
      'approved-for-ingestion',
      'ingested',
      'blocked',
      'rejected',
    ]),
    metadataReview: reviewSchema.nullable(),
    documentationCheckedAt: z.iso.datetime().nullable(),
    rights: z.strictObject({
      licenseId: text.nullable(),
      licenseUrl: documentationUrlSchema.nullable(),
      attribution: text.nullable(),
      attributionUrl: documentationUrlSchema.nullable(),
      copyrightHolder: text.nullable(),
      permittedUses: z.array(useCaseSchema),
      redistributionAllowed: z.boolean().nullable(),
      restrictions: z.array(text),
      review: reviewSchema.nullable(),
    }),
    geographic: z.strictObject({
      bounds: bboxSchema.nullable(),
      coordinateOrder: z.literal('longitude-latitude'),
      units: z.literal('degree'),
      coverageEvidence: text.nullable(),
    }),
    resolutionMeters: z.number().positive().nullable(),
    updateCadence: text.nullable(),
    capabilities: z.strictObject({ download: z.boolean(), api: z.boolean(), view: z.boolean() }),
    notes: z.array(text).min(1),
  })
  .superRefine((source, context) => {
    const fail = (message: string) => context.addIssue({ code: 'custom', message });
    if (
      source.reviewStatus !== 'candidate' &&
      source.reviewStatus !== 'blocked' &&
      source.reviewStatus !== 'rejected'
    ) {
      if (!source.metadataReview || !source.verifiedDate) fail('Metadata review required');
    }
    if (source.captureDate && source.verifiedDate && source.captureDate > source.verifiedDate)
      fail('Invalid source dates');
    if (source.reviewStatus === 'approved-for-ingestion' || source.reviewStatus === 'ingested') {
      const imagery = source.category === 'satellite-imagery' || source.category === 'ortho-imagery';
      if ((imagery ? dataUseDenials(source, 'download') : ingestionDenials(source, 'download')).length)
        fail('Approval requires complete rights, CRS, extent and review');
      if (source.confidence === 'S') fail('Synthetic source cannot receive production approval');
    }
  });
export type DataSource = z.infer<typeof sourceSchema>;

/** Shared source governance; each format adapter owns its supported CRS, datum and payload checks. */
export function dataUseDenials(source: DataSource, use: DataUse): string[] {
  const reasons: string[] = [];
  if (!['approved-for-ingestion', 'ingested'].includes(source.reviewStatus)) reasons.push('source-not-approved');
  const rights = source.rights;
  if (
    !rights.licenseId ||
    /^(unknown|unverified|unspecified|none|n\/a)(?:\b|$)/i.test(rights.licenseId) ||
    /^(unknown|unverified|unspecified)(?:\b|$)/i.test(source.license)
  )
    reasons.push('license-unknown');
  if (
    !rights.licenseId ||
    !rights.licenseUrl ||
    !rights.attribution ||
    !rights.attributionUrl ||
    !rights.copyrightHolder ||
    !rights.review ||
    !rights.permittedUses.includes(use)
  )
    reasons.push('rights-not-reviewed');
  if (use === 'redistribute' && rights.redistributionAllowed !== true) reasons.push('redistribution-denied');
  if (
    !source.metadataReview ||
    !source.horizontalCrs ||
    !source.geographic.bounds ||
    !source.geographic.coverageEvidence
  )
    reasons.push('metadata-incomplete');
  if (use === 'download' && !source.capabilities.download) reasons.push('download-unavailable');
  return reasons;
}

function ingestionDenials(source: DataSource, use: DataUse): string[] {
  const reasons = dataUseDenials(source, use);
  if (source.horizontalCrs !== 'EPSG:4326') reasons.push('requires-conversion');
  // Phase 16: DEM ingestion is supported for the Copernicus DSM category
  // (EPSG:4326, named vertical datum). Any other non-OSM kind stays denied.
  if (source.category !== 'vector-osm' && source.category !== 'dsm') reasons.push('unsupported-dataset-kind');
  if (source.category !== 'vector-osm' && !source.verticalDatum) reasons.push('vertical-datum-unknown');
  return reasons;
}

const datasetSchema = z.strictObject({
  id: sourceIdSchema,
  sourceId: sourceIdSchema,
  name: text,
  version: text,
  sourceUrl: documentationUrlSchema,
  retrievedAt: z.iso.datetime(),
  captureDate: z.iso.date().nullable(),
  horizontalCrs: z.literal('EPSG:4326'),
  verticalDatum: z.null(),
  bounds: bboxSchema,
  sha256: z.string().regex(/^[a-f0-9]{64}$/),
  featureCount: z.number().int().positive().max(1000),
  processing: z.array(text).min(1),
  purpose: z.enum(['exploratory', 'test-only']),
});
type DatasetRecord = z.infer<typeof datasetSchema>;
const verifiedDatasets = new WeakSet<DatasetRecord>();

function freezeRecord<T extends object>(value: T): T {
  for (const child of Object.values(value)) {
    if (child && typeof child === 'object') freezeRecord(child);
  }
  return Object.freeze(value);
}

async function sha256(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const hash = await globalThis.crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(hash), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

const nodeSchema = z.strictObject({
  type: z.literal('node'),
  id: z.number().int().positive().max(Number.MAX_SAFE_INTEGER),
  lon: z.number().min(-180).max(180),
  lat: z.number().min(-90).max(90),
  tags: z.record(z.string().max(255), z.string().max(2000)).refine((tags) => Object.keys(tags).length <= 100),
});
const envelopeSchema = z.strictObject({
  version: z.literal(0.6),
  generator: text,
  osm3s: z.strictObject({ timestamp_osm_base: z.iso.datetime(), copyright: text }).optional(),
  elements: z.array(nodeSchema).min(1).max(1000),
});

/** Explicit node-only OSM slice. No ways/polygons, inferred heights or coordinate conversion. */
export async function validateSnapshot(rawRecord: unknown, body: string) {
  if (new TextEncoder().encode(body).byteLength > 262144) throw new Error('Snapshot size exceeds limit');
  const dataset = datasetSchema.parse(rawRecord);
  if ((await sha256(body)) !== dataset.sha256) throw new Error('Snapshot integrity mismatch');
  if (dataset.captureDate && dataset.captureDate > dataset.retrievedAt.slice(0, 10))
    throw new Error('Invalid acquisition date');
  let decoded: unknown;
  try {
    decoded = JSON.parse(body);
  } catch {
    throw new Error('Malformed snapshot JSON');
  }
  const envelope = envelopeSchema.safeParse(decoded);
  if (!envelope.success) throw new Error('Invalid snapshot envelope');
  if (envelope.data.osm3s && Date.parse(envelope.data.osm3s.timestamp_osm_base) > Date.parse(dataset.retrievedAt)) {
    throw new Error('Invalid snapshot chronology');
  }
  const nodes = new Map<number, z.infer<typeof nodeSchema>>();
  for (const node of envelope.data.elements) {
    const [west, south, east, north] = dataset.bounds;
    if (node.lon < west || node.lon > east || node.lat < south || node.lat > north)
      throw new Error('Coordinate outside snapshot bounds');
    const canonical = {
      ...node,
      tags: Object.fromEntries(
        Object.keys(node.tags)
          .sort()
          .map((key) => [key, node.tags[key]])
      ),
    };
    const previous = nodes.get(node.id);
    if (previous && JSON.stringify(previous) !== JSON.stringify(canonical)) throw new Error('Conflicting provider ID');
    nodes.set(node.id, canonical);
  }
  if (nodes.size !== dataset.featureCount) throw new Error('Snapshot feature count mismatch');
  const features = [...nodes.values()]
    .sort((a, b) => a.id - b.id)
    .map((node) => ({
      id: `${dataset.id}-node-${node.id}`,
      providerId: `node/${node.id}`,
      sourceId: dataset.sourceId,
      datasetId: dataset.id,
      coordinates: [node.lon, node.lat] as [number, number],
      tags: node.tags,
    }));
  freezeRecord(dataset);
  verifiedDatasets.add(dataset);
  return freezeRecord({
    dataset,
    features,
    providerUpdatedAt: envelope.data.osm3s?.timestamp_osm_base ?? null,
    normalizedSha256: await sha256(JSON.stringify(features)),
  });
}

/** Atomic construction; defensive copies prevent mutation of authoritative state. No I/O or clock reads. */
export function createDataSourceRegistry(rawSources: unknown, rawDatasets: unknown = []) {
  if (!Array.isArray(rawDatasets) || rawDatasets.some((record) => !verifiedDatasets.has(record))) {
    throw new Error('Dataset must come from validateSnapshot; serialized metadata is not validation evidence');
  }
  const sources = z
    .array(sourceSchema)
    .parse(rawSources)
    .sort((a, b) => a.id.localeCompare(b.id));
  const datasets = z
    .array(datasetSchema)
    .parse(rawDatasets)
    .sort((a, b) => a.id.localeCompare(b.id));
  for (const records of [sources, datasets]) {
    if (new Set(records.map((record) => record.id)).size !== records.length) throw new Error('Duplicate registry ID');
  }
  const sourceMap = new Map(sources.map((source) => [source.id, source]));
  for (const dataset of datasets) {
    const source = sourceMap.get(dataset.sourceId);
    if (
      source?.reviewStatus !== 'ingested' ||
      ingestionDenials(source, 'download').length ||
      dataset.purpose === 'test-only' ||
      dataset.horizontalCrs !== source.horizontalCrs ||
      dataset.verticalDatum !== source.verticalDatum ||
      dataset.sourceUrl !== source.source ||
      dataset.captureDate !== source.captureDate ||
      !source.geographic.bounds ||
      !containsBounds(source.geographic.bounds, dataset.bounds) ||
      (dataset.captureDate && dataset.captureDate > dataset.retrievedAt.slice(0, 10))
    ) {
      throw new Error('Dataset is not eligible for production registry');
    }
  }
  for (const source of sources) {
    if (source.reviewStatus === 'ingested' && !datasets.some((dataset) => dataset.sourceId === source.id)) {
      throw new Error('Ingested status requires validated snapshot record');
    }
  }
  const eligibility = (source: DataSource | undefined, use: DataUse) => {
    const reasons = source ? ingestionDenials(source, useCaseSchema.parse(use)) : ['unknown-source'];
    return { allowed: reasons.length === 0, reasons };
  };
  return Object.freeze({
    getSource: (id: string) => {
      const source = sourceMap.get(id);
      return source && structuredClone(source);
    },
    listSources: (filter: { category?: DataSource['category']; status?: DataSource['reviewStatus'] } = {}) =>
      structuredClone(
        sources.filter(
          (source) =>
            (!filter.category || source.category === filter.category) &&
            (!filter.status || source.reviewStatus === filter.status)
        )
      ),
    getDataset: (id: string) => {
      const dataset = datasets.find((entry) => entry.id === id);
      return dataset && structuredClone(dataset);
    },
    canIngest: (id: string, use: DataUse) => eligibility(sourceMap.get(id), use),
    // A metadata record alone is not proof of validated bytes. Rendering remains closed in Phase 13.
    canRender: (_id: string, _use: DataUse) => ({ allowed: false, reasons: ['scene-integration-not-implemented'] }),
    getAttributionFor: (ids: string[]) => [
      ...new Set(
        ids.map((id) => {
          const dataset = datasets.find((entry) => entry.id === id);
          if (!dataset) throw new Error('Unknown dataset');
          return sourceMap.get(dataset.sourceId)?.rights.attribution;
        })
      ),
    ],
    getReadinessSummary: () => ({
      total: sources.length,
      candidate: sources.filter((source) => source.reviewStatus === 'candidate').length,
      metadataVerified: sources.filter((source) => source.reviewStatus === 'metadata-verified').length,
      approved: sources.filter((source) => source.reviewStatus === 'approved-for-ingestion').length,
      blocked: sources.filter((source) => ['blocked', 'rejected'].includes(source.reviewStatus)).length,
      ingested: datasets.length,
      realGeometryLoaded: false as const,
    }),
  });
}

export function containsBounds(outer: z.infer<typeof bboxSchema>, inner: z.infer<typeof bboxSchema>): boolean {
  return inner[0] >= outer[0] && inner[1] >= outer[1] && inner[2] <= outer[2] && inner[3] <= outer[3];
}
