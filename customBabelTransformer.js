const babelJest = require('babel-jest');
const entriaBabel = require('@workshop/babel');

module.exports = babelJest.createTransformer(entriaBabel);
