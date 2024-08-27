const legacy = require('@vitejs/plugin-legacy')
const react = require('@vitejs/plugin-react-swc')
// eslint-disable-next-line import/namespace
const { defineConfig } = require('vite')
// eslint-disable-next-line import/namespace
const relay = require('vite-plugin-relay')
// import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
module.exports = defineConfig({  
  test:{
    server: {
      deps: {
        fallbackCJS: true,
      },
    },
    environment: 'jsdom',
    setupFiles: ['./vitest-setup.js'],
  },
  plugins: [
    // commonjs({
    //   filter(id) {
    //     if (id.includes('node_modules/core-js')) {
    //       return true;
    //     }
    //   },
    // }),
    legacy({
      // targets: ['defaults', 'not IE 11'],
    }),
    relay,
    react(),
  ],
  define: {
    'process.env': process.env,
    global: 'window',
  },
  // optimizeDeps: {
  //   esbuildOptions: {
  //     plugins: [
  //       esbuildCommonjs(['core-js'])
  //     ]
  //   }
  // }
  build: {
    commonjsOptions: {
      strictRequires: true,
    },
  },
});