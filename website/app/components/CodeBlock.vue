<script setup lang="ts">
import { highlight } from 'sugar-high'

const props = defineProps<{ code: string }>()
const highlightedCode = computed(() => highlight(props.code))
</script>

<template>
  <div class="code-box">
    <pre><code v-html="highlightedCode" /></pre>
  </div>
</template>
