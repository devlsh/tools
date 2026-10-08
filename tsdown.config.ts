import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: {
    'oxlint/index': './src/oxlint/index.ts',
    'oxlint/effect': './src/oxlint/effect.ts',
    'oxlint/anti-slop/index': './src/oxlint/anti-slop/index.ts',
    'oxlint/anti-slop/effect/index': './src/oxlint/anti-slop/effect/index.ts',
    'oxfmt/index': './src/oxfmt/index.ts',
  },
  deps: { neverBundle: true },
  format: 'esm',
  platform: 'node',
  fixedExtension: true,
  outExtensions: () => {
    return {
      js: '.mjs',
      dts: '.d.ts',
    };
  },
  minify: true,
  dts: true,
  clean: true,
});
