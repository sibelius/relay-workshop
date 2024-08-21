import react from '@vitejs/plugin-react';

import relay from './test/vitestRelayPlugin';

/**
 * @type {import('vite').UserConfig} vitestBaseConfig
 */
export const vitestBaseConfig = {
  plugins: [react(), relay],
  resolve: {
    mainFields: ['module', 'main'],
    alias: {
      graphql: 'graphql/index.js',
      //   clsx: 'clsx/dist/clsx.js',
    },
    // alias: {
    //   '@woovi/ui': path.resolve(__dirname, '../ui/src/index.tsx'),
    // },
  },
  test: {
    // name: 'charge',
    environment: 'jsdom',
    globals: true,
    // globalSetup: [
    //   '../testutils/src/vitest/globalSetup.ts',
    // ],
    // setupFiles: [
    //   '../testutils/src/vitest/setupFiles.ts'
    // ],
    include: ['./src/**/*.spec.tsx'],
    server: {
      deps: {
        inline: ['clsx'],
        fallbackCJS: true
      },
    },
  },
  // Fallback to ensure that won't fail down on CJS of graphql
  // See more: https://github.com/graphql/graphql-js/issues/2801
};