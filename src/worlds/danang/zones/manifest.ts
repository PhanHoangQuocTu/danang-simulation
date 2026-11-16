import type { WorldManifest } from '@/world-core/schemas/manifest';
import { ROCK_COLLIDERS, getTerrainElevation } from './synthetic';
export const syntheticManifest: WorldManifest = {
  version: 1,
  sources: [
    {
      id: 'phase-10',
      provider: 'Project prototype',
      source: 'history/code/da_nang_3d_open_world_simulation_phase_10.tsx',
      confidence: 'S',
      horizontalCrs: null,
      verticalDatum: null,
      captureDate: null,
      verifiedDate: null,
      license: 'Project source; redistribution rights require owner review',
      accuracyMeters: null,
      processing: [],
    },
  ],
  assets: [],
  prefabs: [
    {
      id: 'rock',
      version: 1,
      assetIds: [],
      instancing: 'individual',
      materialProfile: null,
      lodProfile: null,
      collisionProfile: null,
      interactionProfile: null,
    },
  ],
  zones: [
    {
      id: 'phase-10',
      version: 1,
      coordinateSpace: 'synthetic-local-meters',
      origin: [0, 0, 0],
      bounds: { min: [-90, -10, -90], max: [90, 100, 90] },
      elements: ROCK_COLLIDERS.map((rock, index) => ({
        id: `rock-${index}`,
        prefabId: 'rock',
        sourceId: 'phase-10',
        transform: {
          position: [rock.x, getTerrainElevation(rock.x, rock.z) + rock.height * 0.42, rock.z],
          rotation: [index * 0.4, index * 1.1, index * 0.3],
          scale: [rock.radius * 1.08, rock.height * 0.65, rock.radius * 0.96],
        },
      })),
    },
  ],
};
