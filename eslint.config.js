import { includeIgnoreFile } from '@eslint/compat'
import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { fileURLToPath } from 'url'

const gitignorePath = fileURLToPath(new URL('.gitignore', import.meta.url))

export default defineConfig([
  includeIgnoreFile(gitignorePath),

  // Base recommended rules
  js.configs.recommended,

  // TypeScript: parser, plugin, eslint-recommended overrides, type-checked rules
  ...tseslint.configs.recommendedTypeChecked,

  // Import plugin: TS extensions, parsers, disables import/named
  importPlugin.flatConfigs.typescript,

  // Global language options + custom rule overrides
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        projectService: { allowDefaultProject: ['*.cjs', '*.mjs', '*.js'] },
        tsconfigRootDir: import.meta.dirname,
      },
    },

    settings: {
      'import/resolver': {
        typescript: {},
      },
    },

    rules: {
      // Downgrade noisy type-checked rules
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',

      // sloppy code
      'no-console': 'warn',
      'no-lonely-if': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/require-await': 'warn',

      // unused code
      'no-empty': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],

      // style
      'curly': 'warn',
      'lines-between-class-members': 'warn',
      'no-var': 'warn',
      'object-shorthand': 'warn',
      'prefer-const': 'warn',

      '@typescript-eslint/array-type': [
        'warn',
        { default: 'generic', readonly: 'generic' },
      ],

      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { disallowTypeAnnotations: false },
      ],

      'import/extensions': [
        'warn',
        'ignorePackages',
        {
          pattern: {
            '': 'never',
            'js': 'always',
            'jsx': 'always',
            'ts': 'never',
            'tsx': 'never',
          },
        },
      ],

      'import/newline-after-import': 'warn',
      'import/no-duplicates': 'warn',
    },
  },

  // React-specific rules
  {
    files: ['**/*.{ts,tsx}'],
    extends: [reactHooks.configs.flat.recommended, reactRefresh.configs.vite],
  },

  // Disable formatting rules handled by prettier
  prettierConfig,

  // Disable type checking for plain JS
  {
    files: ['**/*.cjs', '**/*.mjs', '**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
  },
])
