const { webpackDevConfig } = require('@workshop/webpack');
const { merge } = require('webpack-merge');

module.exports = merge(webpackDevConfig, {
  entry: './src/client.tsx',
});
