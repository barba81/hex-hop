import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import unusedImports from 'eslint-plugin-unused-imports';
import unicorn from 'eslint-plugin-unicorn';

export default [
  // Ignore generated/build files
  {
    ignores: [
      'dist/**',
      'src-tauri/**',
      'assets/**',
    ],
  },

  // ESLint recommended JavaScript rules
  js.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tseslint.configs.recommended,

  // React recommended rules
  react.configs.flat.recommended,

  // React JSX runtime
  react.configs.flat['jsx-runtime'],

  // Your application configuration
  {
    files: ['**/*.{ts,tsx}'],

    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser,
    },

    settings: {
      react: {
        version: '19.0.0',
      },
    },

    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
      unicorn,
    },

    rules: {
      ...reactHooks.configs.recommended.rules,

      'react-refresh/only-export-components': [
        'warn',
        {
          allowConstantExport: true,
        },
      ],

      // Optimization & clean code
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-unstable-nested-components': 'error',
      'react/jsx-no-leaked-render': 'warn',

      // Unused imports & variables
      '@typescript-eslint/no-unused-vars': 'off',

      'unused-imports/no-unused-imports': 'error',

      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],

      '@typescript-eslint/consistent-type-imports': 'warn',

      // File naming
      'unicorn/filename-case': [
        'error',
        {
          case: 'kebabCase',
        },
      ],

      // Console
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info'],
        },
      ],

      'react-hooks/exhaustive-deps': 'error',

      // Absolute imports
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['../**'],
              message:
                'Use absolute imports (e.g., @/components/...) instead of relative parent paths.',
            },
          ],
        },
      ],
    },
  },

  // Node-context files
  {
    files: ['vite.config.ts', '*.config.ts'],

    languageOptions: {
      globals: globals.node,
    },
  },
];