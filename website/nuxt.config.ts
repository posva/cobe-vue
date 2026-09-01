import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2026-08-01',
  future: {
    compatibilityVersion: 5,
  },
  alias: {
    'cobe-vue': fileURLToPath(new URL('../src/index.ts', import.meta.url)),
  },
  modules: ['@nuxt/ui'],
  ui: {
    colorMode: false,
    fonts: false,
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'en', class: 'dark' },
      meta: [{ name: 'theme-color', content: '#020420' }],
      link: [
        {
          rel: 'icon',
          href: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="24" fill="%23020420"/><circle cx="50" cy="50" r="32" fill="%2300DC82"/></svg>',
        },
      ],
    },
  },
})
