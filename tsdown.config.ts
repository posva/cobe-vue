import { defineConfig } from 'tsdown'
import type { UserConfig } from 'tsdown'

const commonOptions = {
  sourcemap: true,
  format: ['esm'],
  deps: {
    onlyBundle: [],
    neverBundle: ['vue'],
  },
  target: 'esnext',
  tsconfig: 'tsconfig.build.json',
  dts: true,
} satisfies UserConfig

export default defineConfig([
  {
    ...commonOptions,
    clean: true,
    entry: ['src/index.ts'],
    globalName: 'PosvaTemplateLib',
  },
])
