import { defineConfig } from 'oxlint';
import base from './index.ts';

export default defineConfig({
  extends: [base],
  jsPlugins: [
    {
      name: 'anti-slop-effect',
      specifier: '@devlsh/tools/oxlint/anti-slop/effect',
    },
  ],
  rules: {
    'anti-slop-effect/no-manual-effect-error-tag': 'error',
    'anti-slop-effect/no-manual-tag-comparison': 'error',
    'anti-slop-effect/no-manual-tagged-construction': 'error',
    'anti-slop-effect/no-service-constructor-imports': 'error',
    'anti-slop-effect/prefer-effect-match': 'error',
  },
});
