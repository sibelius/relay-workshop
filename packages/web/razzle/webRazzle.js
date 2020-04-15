const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const babelLoaderFinder = makeLoaderFinder('babel-loader');

const defaultOptions = {
  include: [],
};

function modify(baseConfig, env, webpack, userOptions = {}) {
  const { target, dev } = env;
  const options = { ...defaultOptions, ...userOptions };
  const webpackConfig = { ...baseConfig };

  webpackConfig.devtool = 'cheap-eval-source-map';
  webpackConfig.resolve.extensions = [...webpackConfig.resolve.extensions, '.ts', '.tsx'];

  // Client: ts optimization on development
  if (target === 'web' && dev) {
    // As suggested by Microsoft's Outlook team, these optimizations crank up Webpack x TypeScript perf.
    // https://medium.com/@kenneth_chau/speeding-up-webpack-typescript-incremental-builds-by-7x-3912ba4c1d15
    webpackConfig.output.pathinfo = false;
    webpackConfig.optimization = {
      removeAvailableModules: false,
      removeEmptyChunks: false,
      splitChunks: false,
    };
  }

  // Client: chunk strategy on production
  if (target === 'web' && !dev) {
    webpackConfig.output = {
      ...webpackConfig.output,
      filename: 'static/js/[chunkhash].js',
      chunkFilename: 'static/js/chunk-[id]-[chunkhash].js',
      futureEmitAssets: true,
    };
  }

  // Safely locate Babel loader in Razzle's webpack internals
  const babelLoader = webpackConfig.module.rules.find(babelLoaderFinder);
  if (!babelLoader) {
    throw new Error(`'babel-loader' was erased from config, we need it to define typescript options`);
  }

  babelLoader.test = [babelLoader.test, /\.tsx?$/];
  babelLoader.include = [...babelLoader.include, ...options.include];
  babelLoader.use[0].options = {
    babelrc: false,
    cacheDirectory: true,
  };

  // Client: three shaking on production
  if (target === 'web' && !dev) {
    webpackConfig.plugins = [new CleanWebpackPlugin(), ...webpackConfig.plugins];
  }

  // FIXME - avoid performance degradation, check: https://github.com/jaredpalmer/razzle/issues/671
  // if (!dev) {
  //   webpackConfig.performance = Object.assign(
  //     {},
  //     {
  //       maxAssetSize: 100000,
  //       maxEntrypointSize: 300000,
  //       hints: false,
  //     },
  //   );
  // }

  return webpackConfig;
}

module.exports = modify;
