const webpackConfig = require('@workshop/webpack');
const { merge } = require('webpack-merge');

module.exports = merge(webpackConfig.webpackDevConfig, {
  entry: './src/client.tsx',
});
