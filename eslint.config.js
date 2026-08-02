import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config(
  { ignores: ['dist', 'src-tauri'] },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      react.configs.flat.recommended,
      react.configs.flat['jsx-runtime'], // no need to import React in scope (Vite auto JSX)
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },
    settings: {
      react: { version:  '19.0.0' },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // --- Optimization & Clean Code Rules ---
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-unstable-nested-components': 'error', // avoid remount-on-every-render perf hits
      'react/jsx-no-leaked-render': 'warn', // avoid stray `0`/`NaN` renders

      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'warn', // type-only imports get elided from the bundle

      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  // Node-context files (Vite config etc.) shouldn't use browser globals
  {
    files: ['vite.config.ts', '*.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  }
);