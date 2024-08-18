const path = require('path');

const rspack = require('@rspack/core')
const WebpackNodeExternals = require('webpack-node-externals');

Object.assign(rspack, {
  ReloadServerPlugin: require('./rspack/ReloadServerPlugin'),
})

const cwd = process.cwd();

module.exports = {
  mode: 'development',
  devtool: 'eval-cheap-source-map',
  entry: {
    server: [
      // 'webpack/hot/poll?1000',
      './src/server.ts',
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
      allowlist: ['rspack/hot/poll?1000'],
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
    new rspack.ReloadServerPlugin({
      script: path.resolve('build', 'server.js'),
    }),
    new rspack.HotModuleReplacementPlugin(),
    new rspack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
