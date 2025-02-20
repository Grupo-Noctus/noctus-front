import eslintJs from "@eslint/js";
import tsEslint from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";
import unicornPlugin from "eslint-plugin-unicorn";
import vueParser from "vue-eslint-parser";

export default [
    {
        ignores: ["**/dist/**", "**/dist-ssr/**", "**/coverage/**", "**/node_modules/**"],
    },

    eslintJs.configs.recommended,

    {
        files: ["**/*.{js,ts,vue}"],
        plugins: {
            unicorn: unicornPlugin,
        },
        rules: {
            "unicorn/filename-case": ["error", { case: "kebabCase" }],
        },
    },

    ...pluginVue.configs["flat/essential"],

    {
        files: ["**/*.{ts,tsx,vue}"],
        languageOptions: {
            parser: tsEslint,
        },
        rules: {
            "no-debugger": "error",
            "no-console": ["error", { allow: ["warn", "error", "info"] }],
            "no-empty": "off",
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
        },
    },

    {
        files: ["**/*.vue"],
        languageOptions: {
            parser: vueParser,
            parserOptions: { parser: tsEslint },
        },
        rules: {
            "vue/multi-word-component-names": "off",
            "vue/attributes-order": 2,
            "vue/no-parsing-error": "off",
            "no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    caughtErrorsIgnorePattern: "^_",
                },
            ],
            "vue/valid-v-slot": ["error", { allowModifiers: true }],
        },
    },
];
