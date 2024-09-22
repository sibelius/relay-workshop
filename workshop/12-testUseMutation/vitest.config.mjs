// eslint-disable-next-line import/no-unresolved
import { defineConfig } from "vitest/config";

import { vitestBaseConfig } from "@workshop/vitest";

import pkg from "./package.json";
// eslint-disable-next-line import/namespace
export default defineConfig({
	...vitestBaseConfig,
	test: {
		...vitestBaseConfig.test,
		name: pkg.name,
	},
});
