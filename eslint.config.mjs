import { FlatCompat } from "@eslint/eslintrc";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier/recommended";
import importPlugin from "eslint-plugin-import";
import importXPlugin from "eslint-plugin-import-x";
import path from "node:path";
import { fileURLToPath } from "node:url";
import globals from "globals";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname,
});

export default tsEslint.config(
  eslint.configs.recommended,
  ...tsEslint.configs.recommended,
  ...compat.extends("airbnb-base"),
  {
    plugins: {
      "import": importPlugin,
      "import-x": importXPlugin,
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: "./tsconfig.json",
        },
      },
    },
    rules: {
      "no-plusplus": "off",
      "class-methods-use-this": "off",
      "no-bitwise": "off",
      "no-underscore-dangle": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-this-alias": "off",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-empty-function": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "no-restricted-syntax": "off",
      "import/no-unresolved": ["error", { ignore: ["^virtual:"] }],
      "consistent-return": "off",
      "no-continue": "off",
      "no-eval": "off",
      "no-await-in-loop": "off",
      "no-nested-ternary": "off",
      "no-param-reassign": ["error", { props: false }],
      "prefer-destructuring": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-useless-assignment": "off",
      "preserve-caught-error": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-constant-binary-expression": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["sibling", "parent"],
            "index",
            "unknown",
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "sort-imports": [
        "error",
        {
          ignoreCase: false,
          ignoreDeclarationSort: true,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ["none", "all", "multiple", "single"],
          allowSeparatedGroups: true,
        },
      ],
    },
  },
  prettierPlugin,
  {
    ignores: [
      "lib/*",
      "tests/*",
      "*.js",
      "*.ts",
      "src/__test__/*",
      "**/*.test.ts",
      "test/*",
    ],
  }
);
