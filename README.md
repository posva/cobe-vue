# posva-template-lib

[![npm version](https://img.shields.io/npm/v/posva-template-lib.svg)](https://www.npmjs.com/package/posva-template-lib)
[![ci](https://github.com/posva/posva-template-lib/actions/workflows/ci.yml/badge.svg)](https://github.com/posva/posva-template-lib/actions/workflows/ci.yml)

A Vue.js library template.

## Getting Started

1. Fork or clone this repository
2. Follow the **Migration Checklist** below to customize it for your library
3. Replace `src/useHello.ts` with your own code
4. Run `pnpm install` and start developing

## Migration Checklist

After forking, find & replace `posva-template-lib` with your package name, then go through these steps:

1. **Find & replace** `posva-template-lib` with your package name in all files
2. **Update `globalName`** in `tsdown.config.ts` (e.g. `PosvaTemplateLib` → `YourLibName`)
3. **Update `package.json`**: `description`, `keywords`, `homepage`, `bugs`, `repository`
4. **Update `LICENSE`** year and copyright holder
5. **Update `release.yml`** repo condition (`github.repository == '...'`)
6. **Set up npm trusted publishing** (see comments in `release.yml`)
7. **Set up Codecov** (optional): add `codecov/codecov-action` step to `ci.yml`
8. **Replace `src/`** with your library code

## Scripts

| Command           | Description                |
| ----------------- | -------------------------- |
| `pnpm dev`        | Start Vitest UI            |
| `pnpm build`      | Build with tsdown          |
| `pnpm test`       | Build + test + typecheck   |
| `pnpm test:cov`   | Run tests with coverage    |
| `pnpm test:types` | Typecheck                  |
| `pnpm lint`       | Lint with oxlint           |
| `pnpm fmt`        | Format with oxfmt          |
| `pnpm release`    | Interactive release script |
| `pnpm size`       | Check bundle size          |

## License

[MIT](./LICENSE)
