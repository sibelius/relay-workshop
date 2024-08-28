const { transformSync } = require('@babel/core')

module.exports = {
  name: 'vite:relay',
  transform(src, id) {
    if (/.(t|j)sx?/.test(id) && src.includes('graphql`')) {
      const out = transformSync(src, {
        presets: [
          [
            '@babel/preset-env',
            {
              // corejs: 3,
              // useBuiltIns: 'usage',
              modules: false,
              loose: false,
            },
          ],
        ],
        plugins: [
          [
            // 'babel-plugin-relay',
            'relay',
            {
              eagerEsModules: true,
            },
          ],
        ],
        code: true,
        filename: id,
        sourceMaps: true,
      });

      if (!out?.code) {
        throw new Error(`vite-plugin-relay: Failed to transform ${id}. Please check the source code and ensure it contains valid GraphQL syntax.`);
      }

      const code = out.code;
      const map = out.map;

      return {
        code,
        map,
      };
    }
  },
};