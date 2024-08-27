const path = require('path');

const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

const { merge } = require('webpack-merge');

const rspackCommonConfig = require('./rspack.config');
const {DotenvPlugin} = require('rspack-plugin-dotenv');

const cwd = process.cwd();
const outputPath = path.join(cwd, 'build');

module.exports = merge(rspackCommonConfig, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    static: {
      directory: outputPath,
    },
    allowedHosts: 'all',
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    compress: true,
    open: true,
    port: '8444',
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
  },
  plugins: [
    new ReactRefreshPlugin(),
    new DotenvPlugin({
      path: './.env', // load this now instead of the ones in '.env'
      safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
      allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
      systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
    }),
  ],
});
