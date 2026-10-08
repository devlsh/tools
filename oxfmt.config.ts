import preset from './src/oxfmt/index.ts';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...preset,
  ignorePatterns: [...preset.ignorePatterns, '/CHANGELOG.md', 'dist/**', 'src/oxlint/anti-slop/**'],
});
