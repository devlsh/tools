import { defineConfig } from 'oxfmt';

export default defineConfig({
  ignorePatterns: ['.opencode', '.vscode'],
  arrowParens: 'always',
  bracketSpacing: true,
  embeddedLanguageFormatting: 'auto',
  endOfLine: 'lf',
  sortPackageJson: {
    sortScripts: true,
  },
  insertFinalNewline: true,
  jsxSingleQuote: false,
  objectWrap: 'preserve',
  printWidth: 120,
  proseWrap: 'preserve',
  quoteProps: 'as-needed',
  semi: true,
  singleAttributePerLine: false,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
});
