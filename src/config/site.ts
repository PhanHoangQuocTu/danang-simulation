import { env, isProductionEnv } from '@/constants/env';

export type SiteConfig = typeof siteConfig;

export { isProductionEnv };

/**
 * Locale-independent site facts (manifest, fallbacks).
 * Localised copy lives in `src/messages/<locale>/common.json` under `seo`.
 */
export const siteConfig = {
  appUrl: env.APP_URL,
  name: 'Da Nang 3D Open World',
  shortName: 'Da Nang 3D',
  description: 'Interactive 3D exploration with Da Nang time and weather in a synthetic test environment.',
};
