import { defineConfig } from 'oxlint';
import preset from './src/oxlint/index.ts';

export default defineConfig({
  extends: [preset],
  ignorePatterns: ['/CHANGELOG.md', 'dist/**', 'src/oxlint/anti-slop/**'],
  overrides: [
    {
      files: ['src/**/*.ts'],
      rules: {
        'import/no-anonymous-default-export': 'off',
        'import/no-default-export': 'off',
      },
    },
    {
      files: ['*.config.ts', 'src/oxlint/effect.ts'],
      rules: {
        'import/extensions': 'off',
      },
    },
  ],
});
