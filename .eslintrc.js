/** @type {import("eslint").Linter.Config} */
const config = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
      plugins: ['simple-import-sort'],
      rules: {
        'simple-import-sort/imports': [
          'warn',
          {
            groups: [
              ['^next.*'],
              ['^electron.*'],
              ['^'],
              ['^@.*'],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
            ],
          },
        ],
        'no-unused-vars': 'off',
        '@typescript-eslint/explicit-member-accessibility': [
          'warn',
          {
            accessibility: 'explicit',
            overrides: {
              accessors: 'off',
              constructors: 'explicit',
              methods: 'explicit',
              properties: 'explicit',
              parameterProperties: 'explicit',
            },
          },
        ],
        '@typescript-eslint/no-unused-vars': [
          'warn',
          {
            argsIgnorePattern: '^[_]*$',
            varsIgnorePattern: '^[_]*$',
            caughtErrorsIgnorePattern: '^[_]*$',
          },
        ],
        '@typescript-eslint/no-explicit-any': [
          'warn',
          {
            fixToUnknown: true,
            ignoreRestArgs: true,
          },
        ],
      },
    },
  ],
};

module.exports = config;
