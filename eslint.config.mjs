import typescriptEslint from "@typescript-eslint/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
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

export default [{
    ignores: [
        "!**/.*",
        "**/coverage/",
        "**/junit/",
        "**/dist/",
        "**/mobiles/",
        "**/node_modules/*",
    ],

    files: ['**/*.ts', '**/*.tsx'],

    plugins: {
        "@typescript-eslint": typescriptEslint,
        "simple-import-sort": simpleImportSort,
    },

    languageOptions: {
        parser: tsParser,
        parserOptions: {
            project: "./tsconfig.json",
        },
    },

    rules: {
        "@typescript-eslint/no-restricted-types": "error",
        "@typescript-eslint/no-explicit-any": "warn",

        "max-len": ["warn", {
            code: 80,
            tabWidth: 2,
            comments: 80,
            ignoreComments: true,
            ignoreTrailingComments: true,
            ignoreUrls: true,
            ignoreStrings: true,
            ignoreTemplateLiterals: true,
            ignoreRegExpLiterals: true,
        }],

        "@typescript-eslint/no-unused-vars": ["warn"],

        "simple-import-sort/imports": "error",
        "simple-import-sort/exports": "error",
    },
}];