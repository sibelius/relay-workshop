const webRazzlePlugin = require('./razzle/webRazzle');

module.exports = {
  plugins: [
    {
      name: 'web plugin',
      func: webRazzlePlugin,
    },
  ],
};
