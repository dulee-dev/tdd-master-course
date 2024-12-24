/// <reference types="vitest" />
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  test: {
    include: [
      '**/*.{test,spec}.?(c|m)[jt]s?(x)',
      '**/*.effect-{test,spec}.?(c|m)[jt]s?(x)',
    ],

    setupFiles: [
      '__tests__/libs/import-env.ts',
      '__tests__/vitest/match-extends.ts',
      '__tests__/vitest/http-interceptor.ts',
    ],
    // ... Specify options here.
  },
  plugins: [tsconfigPaths()],
});
