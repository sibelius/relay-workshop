const { webpackProdConfig } = require('@workshop/webpack');
const { merge } = require('webpack-merge');

module.exports = merge(webpackProdConfig, {
  entry: './src/client.tsx',
});
