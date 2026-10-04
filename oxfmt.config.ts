import preset from './src/oxfmt/index.ts';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...preset,
  ignorePatterns: [
    ...preset.ignorePatterns,
    '/CHANGELOG.md',
    '.github',
    'dist/**',
    'pnpm-lock.yaml',
    'src/oxlint/anti-slop/**',
  ],
});
