/// <reference types="vitest" />
import { resolve } from 'path';
import { defaultExclude, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: [...defaultExclude],
    setupFiles: [],
  },
  resolve: {
    alias: [
      {
        replacement: resolve(__dirname, './src'),
        find: '@',
      },
    ],
  },
});