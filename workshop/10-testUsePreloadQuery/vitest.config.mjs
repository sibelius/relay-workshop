import { defineConfig } from 'vitest/config';

import pkg from './package.json'
import { vitestBaseConfig } from './vitest.config.global'

console.log(process.env.NODE_ENV)

export default defineConfig({
  ...vitestBaseConfig,
  test: {
    ...vitestBaseConfig.test,
    name: pkg.name,
  },
});