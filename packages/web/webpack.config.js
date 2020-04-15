const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const dotEnv = require('dotenv-webpack');

const PORT = process.env.PORT || 7503;

const cwd = process.cwd();

const outputPath = path.join(cwd, 'build');
const srcPath = path.join(cwd, 'src');

module.exports = {
  mode: 'development',
  context: path.resolve(cwd, './'),
  entry: './src/client.tsx',
  output: {
    path: outputPath,
    filename: 'bundle.js',
    publicPath: '/',
    pathinfo: false,
    // https://github.com/webpack/webpack/pull/8642
    futureEmitAssets: true,
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
        exclude: /node_modules/,
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
  devServer: {
    port: PORT,
    host: '0.0.0.0',
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    contentBase: path.join(cwd, 'build'),
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new dotEnv({
      path: './.env',
    }),
  ],
  resolve: {
    modules: [srcPath, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
  },
};
