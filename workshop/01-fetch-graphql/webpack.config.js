const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const dotEnv = require('dotenv-webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  context: path.resolve(cwd, './'),
  entry: ['./src/index.tsx'],
  output: {
    path: path.join(cwd, 'build'),
    publicPath: '/',
    pathinfo: false,
    // https://github.com/webpack/webpack/pull/8642
    futureEmitAssets: true,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)?$/,
        exclude: [/node_modules/],
        use: ['babel-loader?cacheDirectory'],
      },
    ],
  },
  devServer: {
    contentBase: path.join(cwd, 'build'),
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    hot: true,
    hotOnly: false,
    compress: true,
  },
  plugins: [
    new dotEnv({
      path: './.env',
    }),
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
