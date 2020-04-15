const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv-webpack');
const Serve = require('webpack-plugin-serve');

const PORT = process.env.PORT || 7502;

const cwd = process.cwd();

const outputPath = path.join(cwd, 'build');
const srcPath = path.join(cwd, 'src');

module.exports = {
  mode: 'development',
  context: path.resolve(cwd, './'),
  entry: ['react-hot-loader/patch', './src/client.tsx', 'webpack-plugin-serve/client'],
  devtool: 'cheap-eval-source-map',
  output: {
    path: outputPath,
    filename: 'bundle.js',
    publicPath: '/',
    pathinfo: false,
    // https://github.com/webpack/webpack/pull/8642
    futureEmitAssets: true,
  },
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
    //  alias: {
    //   'react-dom': '@hot-loader/react-dom',
    // },
  },
  module: {
    rules: [
      {
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      },
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        use: 'babel-loader',
        include: [srcPath, path.join(cwd, '../')],
      },
      {
        test: /\.(jpe?g|png|gif|svg|pdf|csv|xlsx|ttf|woff(2)?)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  watch: true,
  devServer: {
    contentBase: outputPath,
    compress: false,
    port: PORT,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    watchOptions: {
      aggregateTimeout: 800,
      ignored: ['data', 'node_modules'],
    },
    stats: {
      // reasons: true,
      source: true,
      timings: true,
      warnings: true,
    },
    hotOnly: true,
  },
  // TODO - test more this
  // optimization: {
  //   removeAvailableModules: false,
  //   removeEmptyChunks: false,
  //   splitChunks: false,
  // },
  plugins: [
    // new EagerImportsPlugin(),
    new Serve.WebpackPluginServe({
      port: PORT,
      historyFallback: {
        disableDotRule: true,
        verbose: true,
        rewrites: [
          {
            from: '/wps',
            to: context => context.parsedUrl.pathname,
          },
          {
            from: /.js/,
            to: context => context.parsedUrl.pathname,
          },
        ],
      },
      static: [outputPath],
      status: false,
    }),
    new dotEnv({
      path: './.env',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunksSortMode: 'none',
    }),
  ],
};
