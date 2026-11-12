import { z } from 'zod';

const id = z.string().trim().min(1).max(120);
const vector = z.tuple([z.number().finite(), z.number().finite(), z.number().finite()]);

export const provenanceSchema = z.strictObject({
  id,
  provider: z.string().min(1),
  source: z.string().min(1),
  confidence: z.enum(['A', 'B', 'C', 'D', 'E', 'S']),
  horizontalCrs: z.string().nullable(),
  verticalDatum: z.string().nullable(),
  captureDate: z.iso.date().nullable(),
  verifiedDate: z.iso.date().nullable(),
  license: z.string().min(1),
  accuracyMeters: z.number().nonnegative().nullable(),
  processing: z.array(z.string()),
});

export const assetSchema = z.strictObject({
  id,
  version: z.number().int().positive(),
  sourceId: id,
  uri: z.string().startsWith('/assets/'),
  units: z.literal('meter'),
});

export const prefabSchema = z.strictObject({
  id,
  version: z.number().int().positive(),
  assetIds: z.array(id),
  instancing: z.enum(['individual', 'instance', 'batch']),
  materialProfile: id.nullable(),
  lodProfile: id.nullable(),
  collisionProfile: id.nullable(),
  interactionProfile: id.nullable(),
});

export const elementSchema = z.strictObject({
  id,
  prefabId: id,
  sourceId: id,
  transform: z.strictObject({
    position: vector,
    rotation: vector,
    scale: z.tuple([z.number().positive(), z.number().positive(), z.number().positive()]),
  }),
});

export const zoneSchema = z.strictObject({
  id,
  version: z.number().int().positive(),
  coordinateSpace: z.literal('synthetic-local-meters'),
  origin: vector,
  bounds: z
    .strictObject({ min: vector, max: vector })
    .refine(({ min, max }) => min.every((value, axis) => value <= max[axis]), 'Inverted spatial bounds'),
  elements: z.array(elementSchema),
});

export const manifestSchema = z
  .strictObject({
    version: z.literal(1),
    sources: z.array(provenanceSchema),
    assets: z.array(assetSchema),
    prefabs: z.array(prefabSchema),
    zones: z.array(zoneSchema),
  })
  .superRefine((manifest, context) => {
    const fail = (message: string) => context.addIssue({ code: 'custom', message });
    const ids = (items: { id: string }[], category: string) => {
      const values = new Set<string>();
      for (const item of items) {
        if (values.has(item.id)) fail(`Duplicate ${category}: ${item.id}`);
        values.add(item.id);
      }
      return values;
    };
    const sources = ids(manifest.sources, 'source');
    const assets = ids(manifest.assets, 'asset');
    const prefabs = ids(manifest.prefabs, 'prefab');
    ids(manifest.zones, 'zone');
    for (const asset of manifest.assets) {
      if (!sources.has(asset.sourceId)) fail(`Unknown asset source: ${asset.sourceId}`);
    }
    for (const prefab of manifest.prefabs) {
      for (const assetId of prefab.assetIds) {
        if (!assets.has(assetId)) fail(`Unknown prefab asset: ${assetId}`);
      }
    }
    for (const zone of manifest.zones) {
      ids(zone.elements, `element in ${zone.id}`);
      for (const element of zone.elements) {
        if (!prefabs.has(element.prefabId)) fail(`Unknown prefab: ${element.prefabId}`);
        if (!sources.has(element.sourceId)) fail(`Unknown element source: ${element.sourceId}`);
      }
    }
  });

export type WorldManifest = z.infer<typeof manifestSchema>;
export type ElementInstance = z.infer<typeof elementSchema>;
export type PrefabDefinition = z.infer<typeof prefabSchema>;
