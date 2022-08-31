const path = require('path');

const webpack = require('webpack');

const WebpackNodeExternals = require('webpack-node-externals');

const ReloadServerPlugin = require('./webpack/ReloadServerPlugin');
// const ReloadServerPlugin = require('reload-server-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: {
    server: [
      // 'webpack/hot/poll?1000',
      './src/index.ts',
    ],
  },
  output: {
    path: path.resolve('build'),
    filename: 'server.js',
  },
  target: 'node',
  node: {
    __dirname: true,
  },
  externals: [
    WebpackNodeExternals({
      allowlist: ['webpack/hot/poll?1000'],
    }),
    WebpackNodeExternals({
      modulesDir: path.resolve(__dirname, '../../node_modules'),
      allowlist: [/@workshop/],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
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
        use: {
          loader: 'babel-loader',
        },
        exclude: [/node_modules/],
        include: [path.join(cwd, 'src'), path.join(cwd, '../')],
      },
    ],
  },
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('build', 'server.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
