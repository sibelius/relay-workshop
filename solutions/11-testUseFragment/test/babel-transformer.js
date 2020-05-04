const config = require('@workshop/babel');

const { createTransformer } = require('babel-jest');

module.exports = createTransformer({
  ...config,
});
