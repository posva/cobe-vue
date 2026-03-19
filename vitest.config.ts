import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  plugins: [Vue()],

  test: {
    projects: [
      {
        test: {
          name: 'unit',
          include: ['src/**/*.{test,spec}.ts'],
          exclude: ['**/*.browser.test.ts'],
          environment: 'happy-dom',
          typecheck: {
            enabled: true,
          },
          coverage: {
            enabled: true,
            provider: 'v8',
            reporter: ['text', 'lcovonly', 'html'],
            include: ['src'],
            exclude: ['**/src/index.ts', '**/*.test-d.ts'],
          },
        },
      },
      {
        plugins: [Vue()],
        test: {
          name: 'browser',
          include: ['src/**/*.browser.test.ts'],
          browser: {
            enabled: true,
            provider: playwright(),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
  },
})
