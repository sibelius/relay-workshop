const { webpackDevConfig } = require('@workshop/webpack');
const { merge } = require('webpack-merge');

module.exports = merge(webpackDevConfig, {
  entry: './src/index.tsx',
  devServer: {
    proxy: {
      '/graphql': 'http://localhost:7500',
    },
  },
});
