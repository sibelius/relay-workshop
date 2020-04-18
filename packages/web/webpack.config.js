const webpackConfig = require('@workshop/webpack');
const merge = require('webpack-merge');

module.exports = merge(webpackConfig, {
  entry: './src/client.tsx',
});
