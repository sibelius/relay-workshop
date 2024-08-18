const babelJest = require('babel-jest');

const config = require('@workshop/babel');

const barrelConfig = {
  ...config,
  plugins: [
    ...config.plugins,
    'transform-barrels',
  ],
}

module.exports = babelJest.createTransformer(barrelConfig);
