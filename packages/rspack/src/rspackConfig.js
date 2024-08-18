import { resolve as _resolve, join } from 'path';

import { EnvironmentPlugin, ReactRefreshPlugin, HtmlRspackPlugin } from '@rspack/core';

const cwd = process.cwd();

export const mode = 'development';
export const devtool = 'cheap-module-source-map';
export const context = _resolve(cwd, './');
export const entry = ['./src/index.tsx'];
export const output = {
  path: join(cwd, 'build'),
  publicPath: '/',
  pathinfo: false,
};
export const resolve = {
  extensions: ['.ts', '.tsx', '.js', '.json', '.mjs'],
};
export const module = {
  rules: [
    {
      test: /\.(js|jsx|ts|tsx)?$/,
      exclude: [/node_modules/],
      use: ['babel-loader?cacheDirectory'],
    },
  ],
};
export const devServer = {
  contentBase: join(cwd, 'build'),
  disableHostCheck: true,
  historyApiFallback: {
    disableDotRule: true,
  },
  hot: true,
  hotOnly: false,
  compress: true,
  open: true,
  port: '8007',
};
export const plugins = [
  new EnvironmentPlugin({
    path: './.env',
    safe: true,
  }),
  new ReactRefreshPlugin(),
  new HtmlRspackPlugin({
    template: './src/index.html',
  }),
];
