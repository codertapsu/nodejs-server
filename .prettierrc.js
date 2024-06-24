/** @type {import("prettier").Config} */
const config = {
  useTabs: false,
  trailingComma: 'all',
  tabWidth: 2,
  singleQuote: true,
  overrides: [
    {
      files: '.prettierrc.js',
      options: { parser: 'typescript' },
    },
  ],
  semi: true,
  printWidth: 120,
  bracketSpacing: true,
  bracketSameLine: true,
  arrowParens: 'avoid',
};

module.exports = config;
