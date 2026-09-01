import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import { playwright } from '@vitest/browser-playwright'
import { resolve } from 'node:path'

const browserUI = process.argv.includes('--ui')

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
            ui: browserUI,
            viewport: { width: 1280, height: 720 },
            provider: playwright(
              browserUI
                ? undefined
                : {
                    contextOptions: {
                      deviceScaleFactor: 1,
                    },
                  },
            ),
            instances: [{ browser: 'chromium' }],
            expect: {
              toMatchScreenshot: {
                comparatorName: 'pixelmatch',
                comparatorOptions: {
                  allowedMismatchedPixelRatio: 0.01,
                },
                resolveScreenshotPath: ({
                  arg,
                  browserName,
                  ext,
                  platform,
                  root,
                  screenshotDirectory,
                  testFileDirectory,
                  testFileName,
                }) =>
                  resolve(
                    root,
                    testFileDirectory,
                    screenshotDirectory,
                    testFileName,
                    `${arg}-${browserName}${browserUI ? `-${platform}-ui` : ''}${ext}`,
                  ),
              },
            },
          },
        },
      },
    ],
  },
})
