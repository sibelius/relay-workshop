import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import react from "eslint-plugin-react";
import flowtype from "eslint-plugin-flowtype";
import _import from "eslint-plugin-import";
import cypress from "eslint-plugin-cypress";
import relay from "eslint-plugin-relay";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:relay/recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
)), {
    ignores: [
        '.circleci',
        '.github',
        'build',
        'data',
        'digital_assets',
        'flow-typed',
        'hard-source-cache',
        'public',
        '__generated__'
    ],
    plugins: {
        react: fixupPluginRules(react),
        flowtype,
        import: fixupPluginRules(_import),
        cypress,
        relay: fixupPluginRules(relay),
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        "react-hooks": fixupPluginRules(reactHooks),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.node,
            ...globals.jest,
            ...cypress.environments.globals.globals,
            ...globals.serviceworker,
        },

        parser: tsParser,
        ecmaVersion: 10,
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                modules: true,
            },
        },
    },

    settings: {
        "import/resolver": {
            node: true,
            "eslint-import-resolver-typescript": true,

            "eslint-import-resolver-lerna": {
                packages: "/home/hallexcosta/local/github.com/sibelius/relay-workshop/packages",
            },
        },
    },

    rules: {
        "comma-dangle": [2, "always-multiline"],

        quotes: [2, "single", {
            allowTemplateLiterals: true,
            avoidEscape: true,
        }],

        "jsx-quotes": [2, "prefer-single"],
        "react/prop-types": 0,
        "no-case-declarations": 0,
        "react/jsx-no-bind": 0,
        "react/display-name": 0,
        "new-cap": 0,
        "no-unexpected-multiline": 0,
        "no-class-assign": 1,
        "no-console": 2,
        "object-curly-spacing": [1, "always"],
        "import/first": 2,
        "import/default": 0,
        "no-extra-boolean-cast": 0,
        "import/named": 0,

        "import/namespace": [2, {
            allowComputed: true,
        }],

        "import/no-duplicates": 2,

        "import/order": [2, {
            "newlines-between": "always-and-inside-groups",
        }],

        "react/no-children-prop": 1,
        "react/no-deprecated": 1,
        "import/no-cycle": 1,
        "import/no-self-import": 1,
        "relay/graphql-syntax": "error",
        "relay/compat-uses-vars": "warn",
        "relay/graphql-naming": "error",
        "relay/generated-flow-types": "warn",
        "relay/no-future-added-value": "warn",
        "relay/unused-fields": 0,
        indent: 0,
        "@typescript-eslint/indent": 0,
        "@typescript-eslint/camelcase": 0,
        "@typescript-eslint/explicit-function-return-type": 0,
        "interface-over-type-literal": 0,
        "@typescript-eslint/consistent-type-definitions": 0,
        "@typescript-eslint/prefer-interface": 0,
        "lines-between-class-members": 0,
        "@typescript-eslint/explicit-member-accessibility": 0,
        "@typescript-eslint/no-non-null-assertion": 0,

        "@typescript-eslint/no-unused-vars": ["error", {
            ignoreRestSiblings: true,
        }],

        "@typescript-eslint/no-var-requires": 1,
        "react-hooks/rules-of-hooks": "error",
        "@typescript-eslint/no-empty-function": 1,
        "@typescript-eslint/interface-name-prefix": 0,
    },
}];