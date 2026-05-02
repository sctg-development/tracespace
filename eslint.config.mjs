import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: [
      'node_modules/**',
      '__snapshots__/**',
      'coverage/**',
      '.nyc_output/**',
      'dist/**',
      '**/dist/**',
      '**/*.d.ts',
      '**/CHANGELOG.md',
      'package-lock.json',
    ],
  },
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
        process: 'readonly',
      },
    },
    rules: {
      'no-redeclare': 'off',
      'no-undef': 'off',
      'no-unused-vars': 'off',
      'no-useless-assignment': 'off',
    },
  },

  {
    files: ['**/*.config.js', '**/*.config.mjs', '**/integration/**/*.js', '**/example/**/*.js'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['apps/**/*.{js,ts,tsx}'],
    plugins: {
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.worker,
      },
    },
    settings: {
      react: {
        version: '19.2',
      },
    },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [tseslint.configs.recommended],
    rules: {
      'no-dupe-class-members': 'off',
      'no-redeclare': 'off',
      'no-useless-constructor': 'off',
      'import/export': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {'ts-expect-error': false},
      ],
      '@typescript-eslint/explicit-member-accessibility': 'off',
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {allowExpressions: true},
      ],
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {ignoreRestSiblings: true, argsIgnorePattern: '^_'},
      ],
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  {
    files: ['**/*test.js', '**/*test.ts', '**/*test.tsx', '**/__tests__/**', 'scripts/init-test-env.js'],
    languageOptions: {
      globals: {
        ...globals.mocha,
      },
    },
    rules: {
    },
  }
)
