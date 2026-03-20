<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { Cobe } from '../src/index'

const width = ref(600)
const height = ref(600)
const phi = ref(0)
const theta = ref(0.3)
const mapSamples = ref(16_000)
const mapBrightness = ref(6)
const diffuse = ref(1.2)
const dark = ref(1)

const baseColor = ref<[number, number, number]>([0.3, 0.3, 0.3])
const markerColor = ref<[number, number, number]>([1, 0.5, 1])
const glowColor = ref<[number, number, number]>([1, 1, 1])

const autoRotate = ref(true)
const showMarkers = ref(true)

const sampleMarkers = [
  { id: 'nyc', location: [40.7128, -74.006] as [number, number], size: 0.1, label: 'New York' },
  { id: 'paris', location: [48.8566, 2.3522] as [number, number], size: 0.08, label: 'Paris' },
  { id: 'tokyo', location: [35.6762, 139.6503] as [number, number], size: 0.08, label: 'Tokyo' },
  { id: 'sydney', location: [-33.8688, 151.2093] as [number, number], size: 0.06, label: 'Sydney' },
]

let rafId: number | undefined
function tick() {
  if (autoRotate.value) {
    phi.value += 0.005
  }
  rafId = requestAnimationFrame(tick)
}
rafId = requestAnimationFrame(tick)
onUnmounted(() => {
  if (rafId != null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <div style="display: flex; gap: 24px; padding: 16px; font-family: system-ui">
    <div style="position: relative">
      <Cobe
        :width="width"
        :height="height"
        :phi="phi"
        :theta="theta"
        :map-samples="mapSamples"
        :map-brightness="mapBrightness"
        :diffuse="diffuse"
        :dark="dark"
        :base-color="baseColor"
        :marker-color="markerColor"
        :glow-color="glowColor"
        :markers="showMarkers ? sampleMarkers : undefined"
        :style="{ width: width + 'px', height: height + 'px' }"
      />
      <div
        v-for="marker in sampleMarkers"
        v-show="showMarkers"
        :key="marker.id"
        class="marker-label"
        :style="{
          positionAnchor: `--cobe-${marker.id}`,
          opacity: `var(--cobe-visible-${marker.id}, 0)`,
          filter: `blur(calc((1 - var(--cobe-visible-${marker.id}, 0)) * 8px))`,
        }"
      >
        {{ marker.label }}
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 8px; min-width: 260px">
      <h3 style="margin: 0">Controls</h3>

      <label> <input type="checkbox" v-model="autoRotate" /> Auto-rotate </label>
      <label> <input type="checkbox" v-model="showMarkers" /> Show markers </label>

      <label
        >Width: {{ width }}<br /><input type="range" v-model.number="width" min="200" max="1000"
      /></label>
      <label
        >Height: {{ height }}<br /><input type="range" v-model.number="height" min="200" max="1000"
      /></label>

      <label
        >Phi: {{ phi.toFixed(2) }}<br /><input
          type="range"
          v-model.number="phi"
          min="0"
          max="6.28"
          step="0.01"
      /></label>
      <label
        >Theta: {{ theta.toFixed(2) }}<br /><input
          type="range"
          v-model.number="theta"
          min="-1.57"
          max="1.57"
          step="0.01"
      /></label>

      <label
        >Map samples: {{ mapSamples }}<br /><input
          type="range"
          v-model.number="mapSamples"
          min="1000"
          max="40000"
          step="1000"
      /></label>
      <label
        >Map brightness: {{ mapBrightness.toFixed(1) }}<br /><input
          type="range"
          v-model.number="mapBrightness"
          min="0"
          max="20"
          step="0.1"
      /></label>
      <label
        >Diffuse: {{ diffuse.toFixed(1) }}<br /><input
          type="range"
          v-model.number="diffuse"
          min="0"
          max="5"
          step="0.1"
      /></label>
      <label
        >Dark: {{ dark.toFixed(1) }}<br /><input
          type="range"
          v-model.number="dark"
          min="0"
          max="1"
          step="0.01"
      /></label>

      <fieldset>
        <legend>Base color</legend>
        <label
          >R
          <input
            type="number"
            v-model.number="baseColor[0]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
        <label
          >G
          <input
            type="number"
            v-model.number="baseColor[1]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
        <label
          >B
          <input
            type="number"
            v-model.number="baseColor[2]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
      </fieldset>

      <fieldset>
        <legend>Marker color</legend>
        <label
          >R
          <input
            type="number"
            v-model.number="markerColor[0]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
        <label
          >G
          <input
            type="number"
            v-model.number="markerColor[1]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
        <label
          >B
          <input
            type="number"
            v-model.number="markerColor[2]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
      </fieldset>

      <fieldset>
        <legend>Glow color</legend>
        <label
          >R
          <input
            type="number"
            v-model.number="glowColor[0]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
        <label
          >G
          <input
            type="number"
            v-model.number="glowColor[1]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
        <label
          >B
          <input
            type="number"
            v-model.number="glowColor[2]"
            min="0"
            max="1"
            step="0.05"
            style="width: 60px"
        /></label>
      </fieldset>
    </div>
  </div>
</template>

<style>
.marker-label {
  position: absolute;
  bottom: anchor(top);
  left: anchor(center);
  translate: -50% 0;
  margin-bottom: 8px;
  padding: 0.25rem 0.5rem;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.75rem;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  transition:
    opacity 0.3s,
    filter 0.3s;
}
</style>
