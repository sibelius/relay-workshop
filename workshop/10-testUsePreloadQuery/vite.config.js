import legacy from '@vitejs/plugin-legacy'
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import relay from 'vite-plugin-relay';
// import { esbuildCommonjs, viteCommonjs } from '@originjs/vite-plugin-commonjs'

// https://vitejs.dev/config/
export default defineConfig({  
  test:{
    server: {
      deps: {
        fallbackCJS: true
      }
    }
  },
  plugins: [
    commonjs({
      filter(id) {
        if (id.includes('node_modules/core-js')) {
          return true;
        }
      },
    }),
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