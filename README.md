# cobe-vue

[![npm version](https://img.shields.io/npm/v/cobe-vue.svg)](https://npmx.dev/package/cobe-vue)
[![ci](https://github.com/posva/cobe-vue/actions/workflows/ci.yml/badge.svg)](https://github.com/posva/cobe-vue/actions/workflows/ci.yml)

A Vue 3 component for the [COBE](https://github.com/shuding/cobe) WebGL globe.

## Installation

```sh
pnpm add cobe-vue
```

## Usage

```vue
<script setup lang="ts">
import { Cobe } from 'cobe-vue'
</script>

<template>
  <Cobe
    :width="600"
    :height="600"
    :phi="0"
    :theta="0.3"
    :markers="[{ location: [48.8566, 2.3522], size: 0.08 }]"
    style="width: 600px; height: 600px"
  />
</template>
```

The component accepts COBE's globe options as Vue props and forwards other attributes to the
underlying canvas. Updating props updates the globe, and unmounting the component destroys it.

## Development

```sh
pnpm install
pnpm play
pnpm test
```

## License

[MIT](./LICENSE)
