<script setup lang="ts">
import { Cobe } from 'cobe-vue'

type Color = [number, number, number]
type Location = [number, number]

const themePresets = {
  default: {
    label: 'Nuxt (Default)',
    dark: 1,
    diffuse: 1.4,
    mapSamples: 16_000,
    mapBrightness: 10,
    baseColor: [0.08, 0.12, 0.22] as Color,
    markerColor: [0, 0.86, 0.51] as Color,
    glowColor: [0.01, 0.02, 0.12] as Color,
    arcColor: [0.21, 0.89, 0.85] as Color,
  },
  dark: {
    label: 'Dark Mode',
    dark: 1,
    diffuse: 1.2,
    mapSamples: 16_000,
    mapBrightness: 6,
    baseColor: [0.3, 0.3, 0.3] as Color,
    markerColor: [1, 0.5, 1] as Color,
    glowColor: [0.1, 0.1, 0.1] as Color,
    arcColor: [1, 0.5, 1] as Color,
  },
  minimal: {
    label: 'Minimal',
    dark: 0,
    diffuse: 3,
    mapSamples: 40_000,
    mapBrightness: 1.5,
    baseColor: [1, 1, 1] as Color,
    markerColor: [0.1, 0.1, 0.1] as Color,
    glowColor: [1, 1, 1] as Color,
    arcColor: [0.1, 0.1, 0.1] as Color,
  },
  neon: {
    label: 'Neon',
    dark: 2,
    diffuse: 0.6,
    mapSamples: 20_000,
    mapBrightness: 12,
    baseColor: [0.02, 0.02, 0.1] as Color,
    markerColor: [0, 1, 0.8] as Color,
    glowColor: [0, 0.5, 0.8] as Color,
    arcColor: [0, 1, 0.8] as Color,
  },
}

const markerPresets = {
  'World Cities': {
    markers: [
      { id: 'pg-sf', location: [37.78, -122.44] as Location, label: 'San Francisco' },
      { id: 'pg-nyc', location: [40.71, -74.01] as Location, label: 'New York' },
      { id: 'pg-london', location: [51.51, -0.13] as Location, label: 'London' },
      { id: 'pg-tokyo', location: [35.68, 139.65] as Location, label: 'Tokyo' },
      { id: 'pg-sydney', location: [-33.87, 151.21] as Location, label: 'Sydney' },
      { id: 'pg-singapore', location: [1.35, 103.82] as Location, label: 'Singapore' },
      { id: 'pg-dubai', location: [25.2, 55.27] as Location, label: 'Dubai' },
      { id: 'pg-saopaulo', location: [-23.55, -46.63] as Location, label: 'São Paulo' },
      { id: 'pg-capetown', location: [-33.92, 18.42] as Location, label: 'Cape Town' },
    ],
    arcs: [
      { id: 'pg-sf-tokyo', from: [37.78, -122.44] as Location, to: [35.68, 139.65] as Location },
      { id: 'pg-nyc-london', from: [40.71, -74.01] as Location, to: [51.51, -0.13] as Location },
      { id: 'pg-london-dubai', from: [51.51, -0.13] as Location, to: [25.2, 55.27] as Location },
    ],
  },
  'US Offices': {
    markers: [
      { id: 'pg-sf', location: [37.78, -122.44] as Location, label: 'San Francisco' },
      { id: 'pg-nyc', location: [40.71, -74.01] as Location, label: 'New York' },
      { id: 'pg-seattle', location: [47.61, -122.33] as Location, label: 'Seattle' },
      { id: 'pg-la', location: [34.05, -118.24] as Location, label: 'Los Angeles' },
      { id: 'pg-chicago', location: [41.88, -87.63] as Location, label: 'Chicago' },
      { id: 'pg-austin', location: [30.27, -97.74] as Location, label: 'Austin' },
    ],
    arcs: [
      { id: 'pg-sf-nyc', from: [37.78, -122.44] as Location, to: [40.71, -74.01] as Location },
      {
        id: 'pg-seattle-chicago',
        from: [47.61, -122.33] as Location,
        to: [41.88, -87.63] as Location,
      },
      { id: 'pg-la-austin', from: [34.05, -118.24] as Location, to: [30.27, -97.74] as Location },
    ],
  },
  'Flight Routes': {
    markers: [
      { id: 'pg-lhr', location: [51.47, -0.46] as Location, label: 'LHR' },
      { id: 'pg-jfk', location: [40.64, -73.78] as Location, label: 'JFK' },
      { id: 'pg-dxb', location: [25.25, 55.36] as Location, label: 'DXB' },
      { id: 'pg-sin', location: [1.36, 103.99] as Location, label: 'SIN' },
      { id: 'pg-hnd', location: [35.55, 139.78] as Location, label: 'HND' },
      { id: 'pg-syd', location: [-33.95, 151.18] as Location, label: 'SYD' },
      { id: 'pg-cdg', location: [49.01, 2.55] as Location, label: 'CDG' },
    ],
    arcs: [
      { id: 'pg-lhr-jfk', from: [51.47, -0.46] as Location, to: [40.64, -73.78] as Location },
      { id: 'pg-dxb-sin', from: [25.25, 55.36] as Location, to: [1.36, 103.99] as Location },
      { id: 'pg-hnd-syd', from: [35.55, 139.78] as Location, to: [-33.95, 151.18] as Location },
      { id: 'pg-cdg-dxb', from: [49.01, 2.55] as Location, to: [25.25, 55.36] as Location },
    ],
  },
  'Data Centers': {
    markers: [
      { id: 'pg-sanjose', location: [37.37, -121.92] as Location, label: 'us-west-1' },
      { id: 'pg-ashburn', location: [39.04, -77.49] as Location, label: 'us-east-1' },
      { id: 'pg-dublin', location: [53.35, -6.26] as Location, label: 'eu-west-1' },
      { id: 'pg-frankfurt', location: [50.11, 8.68] as Location, label: 'eu-central-1' },
      { id: 'pg-singapore', location: [1.35, 103.82] as Location, label: 'ap-southeast-1' },
      { id: 'pg-tokyo', location: [35.68, 139.65] as Location, label: 'ap-northeast-1' },
      { id: 'pg-sydney', location: [-33.87, 151.21] as Location, label: 'ap-southeast-2' },
      { id: 'pg-saopaulo', location: [-23.55, -46.63] as Location, label: 'sa-east-1' },
    ],
    arcs: [
      { id: 'pg-west-east', from: [37.37, -121.92] as Location, to: [39.04, -77.49] as Location },
      {
        id: 'pg-dublin-frankfurt',
        from: [53.35, -6.26] as Location,
        to: [50.11, 8.68] as Location,
      },
      {
        id: 'pg-singapore-tokyo',
        from: [1.35, 103.82] as Location,
        to: [35.68, 139.65] as Location,
      },
    ],
  },
}

type MarkerPreset = keyof typeof markerPresets
type ThemePreset = keyof typeof themePresets

const preset = ref<ThemePreset>('default')
const markerPreset = ref<MarkerPreset>('World Cities')
const phi = ref(0)
const theta = ref(0.2)
const dark = ref(1)
const diffuse = ref(1.4)
const mapSamples = ref(16_000)
const mapBrightness = ref(10)
const mapBaseBrightness = ref(0)
const scale = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
const markerSize = ref(0.04)
const markerElevation = ref(0)
const showArcs = ref(true)
const arcHeight = ref(0.25)
const arcWidth = ref(0.4)
const autoRotate = ref(false)
const canvasSize = ref(320)
const devicePixelRatio = ref(2)
const rotationPhi = ref(0)
const rotationTheta = ref(0)
const dragging = ref(false)
const pointerX = ref(0)
const pointerY = ref(0)
const host = useTemplateRef<HTMLElement>('host')

const theme = computed(() => themePresets[preset.value])
const activeMarkers = computed(() => markerPresets[markerPreset.value].markers)
const markers = computed(() =>
  activeMarkers.value.map(({ id, location }) => ({ id, location, size: markerSize.value })),
)
const arcs = computed(() => (showArcs.value ? markerPresets[markerPreset.value].arcs : []))
const renderPhi = computed(() => phi.value + rotationPhi.value)
const renderTheta = computed(() => theta.value + rotationTheta.value)

watch(preset, (value) => {
  const next = themePresets[value]
  dark.value = next.dark
  diffuse.value = next.diffuse
  mapSamples.value = next.mapSamples
  mapBrightness.value = next.mapBrightness
})

let frame: number | undefined
let observer: ResizeObserver | undefined

function tick() {
  if (autoRotate.value && !dragging.value) rotationPhi.value += 0.003
  frame = requestAnimationFrame(tick)
}

function startDrag(event: PointerEvent) {
  dragging.value = true
  pointerX.value = event.clientX
  pointerY.value = event.clientY
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function drag(event: PointerEvent) {
  if (!dragging.value) return
  rotationPhi.value += (event.clientX - pointerX.value) / 150
  rotationTheta.value = Math.max(
    -0.7,
    Math.min(0.7, rotationTheta.value + (event.clientY - pointerY.value) / 300),
  )
  pointerX.value = event.clientX
  pointerY.value = event.clientY
}

function stopDrag() {
  dragging.value = false
}

function markerStyle(id: string) {
  return {
    positionAnchor: `--cobe-${id}`,
    opacity: `var(--cobe-visible-${id}, 0)`,
    filter: `blur(calc((1 - var(--cobe-visible-${id}, 0)) * 8px))`,
  }
}

onMounted(() => {
  devicePixelRatio.value = Math.min(window.devicePixelRatio || 1, window.innerWidth < 640 ? 1.8 : 2)
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
        :class="{ dragging }"
        :width="canvasSize"
        :height="canvasSize"
        :device-pixel-ratio="devicePixelRatio"
        :phi="renderPhi"
        :theta="renderTheta"
        :dark="dark"
        :diffuse="diffuse"
        :map-samples="mapSamples"
        :map-brightness="mapBrightness"
        :map-base-brightness="mapBaseBrightness"
        :base-color="theme.baseColor"
        :marker-color="theme.markerColor"
        :glow-color="theme.glowColor"
        :scale="scale"
        :offset="[offsetX, offsetY]"
        :marker-elevation="markerElevation"
        :arc-color="theme.arcColor"
        :arc-height="arcHeight"
        :arc-width="arcWidth"
        :markers="markers"
        :arcs="arcs"
        @pointerdown="startDrag"
        @pointermove="drag"
        @pointerup="stopDrag"
        @pointercancel="stopDrag"
      />
      <div
        v-for="marker in activeMarkers"
        :key="marker.id"
        class="playground-marker-label"
        :style="markerStyle(marker.id)"
      >
        {{ marker.label }}
      </div>
    </div>

    <div class="playground-controls">
      <label class="playground-control">
        <span
          >phi <code>{{ phi.toFixed(2) }}</code></span
        >
        <input v-model.number="phi" type="range" min="0" max="6.28" step="0.01" />
      </label>
      <label class="playground-control">
        <span
          >theta <code>{{ theta.toFixed(2) }}</code></span
        >
        <input v-model.number="theta" type="range" min="-0.5" max="0.5" step="0.01" />
      </label>
      <label class="playground-control">
        <span>Theme</span>
        <select v-model="preset">
          <option v-for="(value, key) in themePresets" :key="key" :value="key">
            {{ value.label }}
          </option>
        </select>
      </label>
      <label class="playground-control">
        <span>Markers</span>
        <select v-model="markerPreset">
          <option v-for="(_, key) in markerPresets" :key="key" :value="key">{{ key }}</option>
        </select>
      </label>
      <label class="playground-control">
        <span
          >dark <code>{{ dark.toFixed(2) }}</code></span
        >
        <input v-model.number="dark" type="range" min="0" max="2" step="0.01" />
      </label>
      <label class="playground-control">
        <span
          >diffuse <code>{{ diffuse.toFixed(1) }}</code></span
        >
        <input v-model.number="diffuse" type="range" min="0" max="3" step="0.1" />
      </label>
      <label class="playground-control">
        <span
          >mapSamples <code>{{ mapSamples }}</code></span
        >
        <input v-model.number="mapSamples" type="range" min="1000" max="40000" step="1000" />
      </label>
      <label class="playground-control">
        <span
          >mapBrightness <code>{{ mapBrightness.toFixed(1) }}</code></span
        >
        <input v-model.number="mapBrightness" type="range" min="0" max="12" step="0.5" />
      </label>
      <label class="playground-control">
        <span
          >mapBaseBrightness <code>{{ mapBaseBrightness.toFixed(2) }}</code></span
        >
        <input v-model.number="mapBaseBrightness" type="range" min="0" max="1" step="0.01" />
      </label>
      <label class="playground-control">
        <span
          >scale <code>{{ scale.toFixed(2) }}</code></span
        >
        <input v-model.number="scale" type="range" min="0.5" max="2" step="0.05" />
      </label>
      <label class="playground-control">
        <span
          >offset[0] <code>{{ offsetX }}</code></span
        >
        <input v-model.number="offsetX" type="range" min="-200" max="200" step="10" />
      </label>
      <label class="playground-control">
        <span
          >offset[1] <code>{{ offsetY }}</code></span
        >
        <input v-model.number="offsetY" type="range" min="-200" max="200" step="10" />
      </label>
      <label class="playground-control">
        <span
          >markerSize <code>{{ markerSize.toFixed(3) }}</code></span
        >
        <input v-model.number="markerSize" type="range" min="0" max="0.1" step="0.005" />
      </label>
      <label class="playground-control">
        <span
          >markerElevation <code>{{ markerElevation.toFixed(2) }}</code></span
        >
        <input v-model.number="markerElevation" type="range" min="0" max="0.2" step="0.01" />
      </label>
      <label class="playground-control">
        <span
          >arcHeight <code>{{ arcHeight.toFixed(2) }}</code></span
        >
        <input v-model.number="arcHeight" type="range" min="0.05" max="0.5" step="0.01" />
      </label>
      <label class="playground-control">
        <span
          >arcWidth <code>{{ arcWidth.toFixed(2) }}</code></span
        >
        <input v-model.number="arcWidth" type="range" min="0.1" max="2" step="0.1" />
      </label>
      <label class="playground-control check">
        <input v-model="showArcs" type="checkbox" /> Show Arcs
      </label>
      <label class="playground-control check">
        <input v-model="autoRotate" type="checkbox" /> Auto Rotate
      </label>
    </div>
  </div>
</template>
