import preset from './src/oxfmt/index.ts';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...preset,
  ignorePatterns: [
    ...preset.ignorePatterns,
    '/CHANGELOG.md',
    'ast-grep/tests/__snapshots__/**',
    'dist/**',
    'src/oxlint/anti-slop/**',
  ],
});
