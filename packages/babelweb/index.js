const babelCommons = require('@workshop/babel');

module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);

  const customPlugins = []


  if (api.env('development')) {
      // Applies the react-refresh Babel plugin on non-production modes only
      customPlugins.push(
        'react-refresh/babel',
      )
  }

  return {
    presets: [...babelCommons.presets],
    plugins: [
      ...babelCommons.plugins,
      ...customPlugins,
    ],
  };
};
