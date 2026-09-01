<script setup lang="ts">
import { Cobe } from 'cobe-vue'

const size = ref(600)
const phi = ref(0)
const dragging = ref(false)
const pointerX = ref(0)
const markers = [
  { id: 'sf', location: [37.78, -122.44] as [number, number], size: 0.045 },
  { id: 'nyc', location: [40.71, -74.01] as [number, number], size: 0.04 },
  { id: 'london', location: [51.51, -0.13] as [number, number], size: 0.04 },
  { id: 'tokyo', location: [35.68, 139.65] as [number, number], size: 0.045 },
]
const arcs = [
  { id: 'sf-nyc', from: markers[0]!.location, to: markers[1]!.location },
  { id: 'london-tokyo', from: markers[2]!.location, to: markers[3]!.location },
]

let frame: number | undefined
let observer: ResizeObserver | undefined

function animate() {
  if (!dragging.value) phi.value += 0.0025
  frame = requestAnimationFrame(animate)
}

function startDrag(event: PointerEvent) {
  dragging.value = true
  pointerX.value = event.clientX
  ;(event.currentTarget as HTMLElement).setPointerCapture(event.pointerId)
}

function drag(event: PointerEvent) {
  if (!dragging.value) return
  phi.value += (event.clientX - pointerX.value) / 180
  pointerX.value = event.clientX
}

function stopDrag() {
  dragging.value = false
}

onMounted(() => {
  const host = document.querySelector<HTMLElement>('.hero-globe')
  if (host) {
    observer = new ResizeObserver(([entry]) => {
      if (entry) size.value = Math.round(entry.contentRect.width)
    })
    observer.observe(host)
  }
  frame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  observer?.disconnect()
  if (frame !== undefined) cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="hero-globe">
    <Cobe
      class="globe-canvas"
      :width="size"
      :height="size"
      :phi="phi"
      :theta="0.2"
      :dark="1"
      :diffuse="1.4"
      :map-samples="16_000"
      :map-brightness="10"
      :base-color="[0.3, 0.3, 0.3]"
      :marker-color="[0, 0.86, 0.51]"
      :glow-color="[0.01, 0.02, 0.12]"
      :arc-color="[0, 0.86, 0.51]"
      :arc-width="0.5"
      :arc-height="0.3"
      :markers="markers"
      :arcs="arcs"
      @pointerdown="startDrag"
      @pointermove="drag"
      @pointerup="stopDrag"
      @pointercancel="stopDrag"
    />

    <div class="globe-overlay"><h1>COBE</h1></div>
    <div class="orbit-ring" aria-hidden="true">
      <svg class="orbit-svg" viewBox="0 0 300 300">
        <defs>
          <path id="orbit-path" d="M 150,18 A 132,132 0 1,1 149.9,18" />
        </defs>
        <text class="orbit-text">
          <textPath href="#orbit-path" startOffset="0%">
            WEBGL · FIVE KILOBYTES · FRAMEWORK AGNOSTIC · BEAUTIFULLY TINY ·
          </textPath>
        </text>
      </svg>
    </div>
  </div>
</template>
