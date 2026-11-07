import { defineConfig } from 'oxfmt';

import preset from './src/oxfmt/index.ts';

export default defineConfig({
  ...preset,
  ignorePatterns: [...preset.ignorePatterns, 'CHANGELOG.md', 'src/oxlint/anti-slop/**'],
});
