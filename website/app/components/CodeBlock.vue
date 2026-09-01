<script setup lang="ts">
defineProps<{ code: string }>()
</script>

<template>
  <div class="code-box">
    <pre><code>{{ code }}</code></pre>
  </div>
</template>
