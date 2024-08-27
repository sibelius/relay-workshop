const babelCommons = require('@workshop/babel');

module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [...babelCommons.presets],
    plugins: [
      ...babelCommons.plugins,

      // Applies the react-refresh Babel plugin on non-production modes only
      // ...(!api.env('production') && ['react-refresh/babel']),
    ],
  };
};
