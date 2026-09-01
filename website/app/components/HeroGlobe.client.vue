<script setup lang="ts">
import { Cobe } from 'cobe-vue'
import { showcases, type ShowcaseItem } from '~/data/showcases'

const size = ref(520)
const phi = ref(0)
const activeIndex = ref(0)
const progress = ref(0)
const dragging = ref(false)
const paused = ref(false)
const pointerX = ref(0)
const expanded = ref<string>()
const liveViewers = 2847
const host = useTemplateRef<HTMLElement>('host')
const duration = 6000

const active = computed(() => showcases[activeIndex.value]!)
const markers = computed(() =>
  active.value.items.map((item) => ({
    id: item.id,
    location: item.location,
    size: active.value.markerSize ?? 0.025,
  })),
)
const arcs = computed(() =>
  (active.value.arcs ?? []).map((arc) => ({
    id: arc.id,
    from: arc.from,
    to: arc.to,
  })),
)

let frame: number | undefined
let observer: ResizeObserver | undefined
let lastTime = 0
let elapsed = 0

function select(index: number) {
  activeIndex.value = (index + showcases.length) % showcases.length
  expanded.value = undefined
  elapsed = 0
  progress.value = 0
}

function animate(time: number) {
  const delta = lastTime ? Math.min(time - lastTime, 50) : 0
  lastTime = time
  if (!dragging.value && !paused.value) {
    phi.value += 0.0025
    elapsed += delta
    progress.value = Math.min((elapsed / duration) * 100, 100)
    if (elapsed >= duration) select(activeIndex.value + 1)
  }
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

function markerStyle(item: ShowcaseItem) {
  return { positionAnchor: `--cobe-${item.id}`, opacity: `var(--cobe-visible-${item.id}, 0)` }
}

function arcStyle(id: string) {
  return { positionAnchor: `--cobe-arc-${id}`, opacity: `var(--cobe-visible-arc-${id}, 0)` }
}

onMounted(() => {
  if (host.value) {
    observer = new ResizeObserver(([entry]) => {
      if (entry) size.value = Math.round(entry.contentRect.width)
    })
    observer.observe(host.value)
  }
  frame = requestAnimationFrame(animate)
})

onUnmounted(() => {
  observer?.disconnect()
  if (frame !== undefined) cancelAnimationFrame(frame)
})
</script>

<template>
  <div class="showcases-demo" @mouseenter="paused = true" @mouseleave="paused = false">
    <div ref="host" class="showcases-globe">
      <Cobe
        class="showcases-canvas"
        :width="size"
        :height="size"
        :phi="phi"
        :theta="0.2"
        :dark="active.dark ?? 1"
        :diffuse="1.5"
        :map-samples="16_000"
        :map-brightness="active.mapBrightness ?? 10"
        :base-color="active.baseColor"
        :marker-color="active.markerColor"
        :glow-color="[0.01, 0.02, 0.12]"
        :arc-color="active.arcColor"
        :arc-width="0.5"
        :arc-height="active.arcHeight ?? 0.25"
        :marker-elevation="active.markerElevation ?? 0.01"
        :markers="markers"
        :arcs="arcs"
        @pointerdown="startDrag"
        @pointermove="drag"
        @pointerup="stopDrag"
        @pointercancel="stopDrag"
      />

      <template v-if="active.key === 'default'">
        <div class="globe-overlay"><h1>COBE</h1></div>
        <div class="orbit-ring" aria-hidden="true">
          <svg class="orbit-svg" viewBox="0 0 300 300">
            <defs><path id="orbit-path" d="M 150,18 A 132,132 0 1,1 149.9,18" /></defs>
            <text class="orbit-text">
              <textPath href="#orbit-path">
                THE 5KB GLOBE FOR VUE · NUXT READY · BEAUTIFULLY TINY ·
              </textPath>
            </text>
          </svg>
        </div>
        <div
          v-for="item in active.items"
          :key="item.id"
          class="showcase-default-label"
          :style="markerStyle(item)"
        >
          {{ item.label }}
        </div>
        <div
          v-for="arc in active.arcs"
          :key="arc.id"
          class="showcase-arc-label"
          :style="arcStyle(arc.id)"
        >
          {{ arc.label }}
        </div>
      </template>

      <template v-else-if="active.key === 'cdn'">
        <div
          v-for="item in active.items"
          :key="item.id"
          class="showcase-cdn"
          :style="markerStyle(item)"
        >
          <span class="showcase-cdn-mark">▲</span><span>{{ item.region }}</span>
        </div>
        <div
          v-for="arc in active.arcs"
          :key="arc.id"
          class="showcase-cdn-traffic"
          :style="arcStyle(arc.id)"
        >
          {{ arc.traffic }}
        </div>
      </template>

      <div
        v-else-if="active.key === 'stickers'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-sticker"
        :style="markerStyle(item)"
      >
        {{ item.sticker }}
      </div>
      <div
        v-else-if="active.key === 'labels'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-label"
        :style="{ ...markerStyle(item), rotate: `${item.rotate}deg` }"
      >
        {{ item.label }}
      </div>
      <div
        v-else-if="active.key === 'satellites'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-satellite"
        :style="markerStyle(item)"
      >
        🛰️
      </div>
      <div
        v-else-if="active.key === 'polaroids'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-polaroid"
        :style="{ ...markerStyle(item), rotate: `${item.rotate}deg` }"
      >
        <img :src="item.image" :alt="item.caption" /><span>{{ item.caption }}</span>
      </div>
      <div
        v-else-if="active.key === 'live'"
        v-for="(item, index) in active.items"
        :key="item.id"
        class="showcase-live"
        :style="markerStyle(item)"
      >
        <i /><strong>LIVE</strong
        ><span>{{ Math.round(liveViewers * 0.68 ** index).toLocaleString() }} watching</span>
      </div>
      <template v-else-if="active.key === 'flights'"
        ><div
          v-for="arc in active.arcs"
          :key="arc.id"
          class="showcase-flight"
          :style="arcStyle(arc.id)"
        >
          ✈
        </div></template
      >
      <button
        v-else-if="active.key === 'interactive'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-interactive"
        :class="{ expanded: expanded === item.id }"
        :style="markerStyle(item)"
        type="button"
        @click="expanded = expanded === item.id ? undefined : item.id"
      >
        <strong>{{ item.label }}</strong
        ><span v-if="expanded === item.id">{{ item.users?.toLocaleString() }} users</span>
      </button>
      <div
        v-else-if="active.key === 'analytics'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-analytics"
        :style="markerStyle(item)"
      >
        <strong>{{ item.visitors }}</strong
        ><span :class="{ down: Number(item.trend) < 0 }"
          >{{ Number(item.trend) >= 0 ? '↑' : '↓' }} {{ Math.abs(Number(item.trend)) }}%</span
        >
      </div>
      <div
        v-else-if="active.key === 'pulse'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-pulse"
        :style="{ ...markerStyle(item), animationDelay: `${item.delay}s` }"
      />
      <div
        v-else-if="active.key === 'weather'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-weather"
        :style="markerStyle(item)"
      >
        {{ item.emoji }}
      </div>
      <div
        v-else-if="active.key === 'bars'"
        v-for="item in active.items"
        :key="item.id"
        class="showcase-bar"
        :style="markerStyle(item)"
      >
        <span>{{ item.label }}</span
        ><i><b :style="{ width: `${item.value}%` }" /></i><strong>{{ item.value }}%</strong>
      </div>
    </div>

    <div class="showcases-controls">
      <p class="showcase-title">{{ active.name }}</p>
      <div class="showcase-indicators" role="tablist" aria-label="Globe examples">
        <button
          v-for="(showcase, index) in showcases"
          :key="showcase.key"
          :class="{ active: index === activeIndex }"
          type="button"
          role="tab"
          :aria-label="showcase.name"
          :aria-selected="index === activeIndex"
          @click="select(index)"
        >
          <i /><span>{{ showcase.name }}</span>
        </button>
      </div>
      <div class="showcase-progress"><i :style="{ width: `${progress}%` }" /></div>
      <div class="showcase-nav">
        <button type="button" aria-label="Previous example" @click="select(activeIndex - 1)">
          ←
        </button>
        <span>{{ activeIndex + 1 }} / {{ showcases.length }}</span>
        <button type="button" aria-label="Next example" @click="select(activeIndex + 1)">→</button>
      </div>
    </div>
  </div>
</template>
