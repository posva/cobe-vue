<script setup lang="ts">
import { Cobe } from 'cobe-vue'

const phi = ref(0)
const dark = ref(1)
const mapBrightness = ref(10)
const diffuse = ref(1.4)
const markerSize = ref(0.06)
const autoRotate = ref(true)
const showMarkers = ref(true)
const showArcs = ref(true)
const canvasSize = ref(320)
const host = useTemplateRef<HTMLElement>('host')

const markers = computed(() =>
  showMarkers.value
    ? [
        { id: 'sf-play', location: [37.78, -122.44] as [number, number], size: markerSize.value },
        { id: 'tokyo-play', location: [35.68, 139.65] as [number, number], size: markerSize.value },
      ]
    : [],
)
const arcs = computed(() =>
  showArcs.value
    ? [
        {
          from: [37.78, -122.44] as [number, number],
          to: [35.68, 139.65] as [number, number],
        },
      ]
    : [],
)

let frame: number | undefined
let observer: ResizeObserver | undefined
function tick() {
  if (autoRotate.value) phi.value += 0.004
  frame = requestAnimationFrame(tick)
}

onMounted(() => {
  if (host.value) {
    observer = new ResizeObserver(([entry]) => {
      if (entry) canvasSize.value = Math.round(entry.contentRect.width)
    })
    observer.observe(host.value)
  }
  frame = requestAnimationFrame(tick)
})

onUnmounted(() => {
  observer?.disconnect()
  if (frame !== undefined) cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="playground-inline">
    <div ref="host" class="playground-canvas-wrap">
      <Cobe
        class="playground-canvas"
        :width="canvasSize"
        :height="canvasSize"
        :phi="phi"
        :theta="0.2"
        :dark="dark"
        :diffuse="diffuse"
        :map-brightness="mapBrightness"
        :base-color="dark ? [0.08, 0.12, 0.22] : [1, 1, 1]"
        :marker-color="[0, 0.86, 0.51]"
        :glow-color="dark ? [0.01, 0.02, 0.12] : [1, 1, 1]"
        :arc-color="[0.21, 0.89, 0.85]"
        :markers="markers"
        :arcs="arcs"
      />
    </div>

    <div class="playground-controls">
      <label>
        <span
          >dark <code>{{ dark.toFixed(1) }}</code></span
        >
        <input v-model.number="dark" type="range" min="0" max="1" step="0.1" />
      </label>
      <label>
        <span
          >mapBrightness <code>{{ mapBrightness.toFixed(1) }}</code></span
        >
        <input v-model.number="mapBrightness" type="range" min="1" max="12" step="0.5" />
      </label>
      <label>
        <span
          >diffuse <code>{{ diffuse.toFixed(1) }}</code></span
        >
        <input v-model.number="diffuse" type="range" min="0.5" max="3" step="0.1" />
      </label>
      <label>
        <span
          >marker size <code>{{ markerSize.toFixed(2) }}</code></span
        >
        <input v-model.number="markerSize" type="range" min="0.02" max="0.12" step="0.01" />
      </label>
      <label class="check"><input v-model="showMarkers" type="checkbox" /> Show markers</label>
      <label class="check"><input v-model="showArcs" type="checkbox" /> Show arcs</label>
      <label class="check"><input v-model="autoRotate" type="checkbox" /> Auto rotate</label>
    </div>
  </div>
</template>
