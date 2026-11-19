import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  framework: '@storybook/nextjs-vite',
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-themes'],
  staticDirs: ['../public'],
  // Disabled 2026-11-19 (phase-14 completion): the react-docgen transform
  // ran 4809 times / 6.2s and tripped Vite PLUGIN_TIMINGS on every
  // `build-storybook`, failing the repo zero-warning gate. Prop tables in
  // Docs lose auto-generated argTypes; stories themselves are unchanged.
  // Re-enable when Storybook ships a docgen plugin that does not time out
  // the build (see PHASE_14_COMPLETION_REPORT.md).
  typescript: { reactDocgen: false },
  core: { disableTelemetry: true },
  viteFinal: (config) => ({
    ...config,
    build: {
      ...config.build,
      // Storybook ships every story in one bundle; the default 500 kB limit only produces noise here.
      chunkSizeWarningLimit: 4000,
      rolldownOptions: {
        ...config.build?.rolldownOptions,
        // Radix / Base UI ship `'use client'` directives; they are meaningless in a plain Vite bundle.
        onLog(level, log, defaultHandler) {
          if (log.code === 'MODULE_LEVEL_DIRECTIVE') return;
          defaultHandler(level, log);
        },
      },
    },
  }),
};

export default config;
