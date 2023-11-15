const rspack = require('@rspack/core');
const NodePolyfill = require('@rspack/plugin-node-polyfill');

const cwd = process.cwd();

/**
 * @type {import('@rspack/cli').Configuration}
 */
module.exports = {
  context: cwd,
  entry: {
    main: './src/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        loader: 'builtin:swc-loader',
        options: {
          rspackExperiments: {
            relay: true,
          },
          jsc: {
            experimental: {
              plugins: [
                [
                  '@swc/plugin-relay',
                  {
                    rootDir: cwd,
                    language: 'typescript',
                  },
                ],
              ],
            },
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
            transform: {
              react: {
                runtime: 'automatic',
              },
            },
          },
        },
        type: 'javascript/auto',
      },
      {
        test: /\.(jpe?g|png|gif|svg|mp3|pdf|csv|xlsx|ttf|woff(2)?)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new NodePolyfill(),
    new rspack.HtmlRspackPlugin({
      template: './src/index.html',
    }),
  ],
  devServer: {
    historyApiFallback: true,
    open: true,
  },
  builtins: {
    relay: true,
  },
  resolve: {
    fallback: {
      fs: false,
    },
  },
};
