const babelJest = require('babel-jest').default;

const entriaBabel = require('@workshop/babel');

module.exports = babelJest.createTransformer(entriaBabel);
