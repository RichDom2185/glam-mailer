// @ts-check
import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import { dirname } from "path";
import tseslint from "typescript-eslint";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: `${__dirname}`,
});

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ["eslint.config.js"] },
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
      },
    },
  },
  ...compat.config({
    extends: ["plugin:react-hooks/recommended"],
  }),
  {
    files: ["*.tsx"],
    plugins: { "react-refresh": reactRefresh },
    rules: {
      "react-refresh/only-export-components": "warn",
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "all",
          ignoreRestSiblings: false,
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
        },
      ],
    },
  }
);
