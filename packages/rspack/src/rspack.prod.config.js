const { merge } = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');

const rspackCommonConfig = require('./rspack.config');

module.exports = merge(rspackCommonConfig, {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [new TerserPlugin({
      parallel: 4,
    })],
  },
});
