const config = require('@workshop/babel');

const { createTransformer } = require('babel-jest').default;

module.exports = createTransformer({
  ...config,
});
