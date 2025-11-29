import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default tseslint.config(
  // Ignora pastas de build e dependências
  {
    ignores: [
      "dist",
      "dev-dist",
      "node_modules",
      "coverage",
      "*.config.js",
      "*.config.ts",
    ],
  },

  // Configuração base para TypeScript + React
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      eslintConfigPrettier,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.browser,
        ...globals.es2024,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      // =========================================================
      // React
      // =========================================================
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/prop-types": "off", // TypeScript cuida disso
      "react/react-in-jsx-scope": "off", // React 17+ não precisa
      "react-hooks/exhaustive-deps": "warn", // Warnings para deps faltando
      // Desabilita regra muito rigorosa do react-hooks v7
      "react-hooks/set-state-in-effect": "off",
      "react-hooks/incompatible-library": "off",

      // =========================================================
      // TypeScript
      // =========================================================
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",

      // =========================================================
      // Prettier
      // =========================================================
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],

      // =========================================================
      // Boas práticas gerais
      // =========================================================
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
    },
  }
);
