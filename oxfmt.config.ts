import preset from './src/oxfmt/index.ts';
import { defineConfig } from 'oxfmt';

export default defineConfig({
  ...preset,
  ignorePatterns: [...preset.ignorePatterns, '.github', 'dist/**', 'pnpm-lock.yaml', 'src/oxlint/anti-slop/**'],
});
