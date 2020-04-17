const config = require('@workshop/babel');

module.exports = config;

// module.exports = api => {
//   // This caches the Babel config
//   api.cache.using(() => process.env.NODE_ENV);
//
//   console.log('config: ', config, {
//     ...config,
//     plugins: [
//       ...config.plugins,
//       ...(api.env('development') && ['react-refresh/babel']),
//     ],
//   });
//
//   return {
//     ...config,
//     plugins: []
//       ...config.plugins,
//       ...(api.env('development') && ['react-refresh/babel']),
//     ],
//   };
// };
