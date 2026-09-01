<script setup lang="ts">
const installCommands = {
  'Copy Prompt': 'Add cobe-vue@latest to my Nuxt app.',
  npm: 'npm i cobe-vue',
  pnpm: 'pnpm add cobe-vue',
  yarn: 'yarn add cobe-vue',
  bun: 'bun add cobe-vue',
}

const packageManager = ref<keyof typeof installCommands>('Copy Prompt')
const copied = ref(false)

async function copyInstall() {
  await navigator.clipboard.writeText(installCommands[packageManager.value])
  copied.value = true
  window.setTimeout(() => (copied.value = false), 1500)
}

const scriptClose = '</' + 'script>'
const usageCode = `<script setup lang="ts">
import { Cobe } from 'cobe-vue'

const phi = ref(0)
const markers = [
  { location: [37.78, -122.44], size: 0.03, id: 'sf' },
  { location: [40.71, -74.01], size: 0.03, id: 'nyc' },
]

onMounted(() => {
  const animate = () => {
    phi.value += 0.005
    requestAnimationFrame(animate)
  }
  animate()
})
${scriptClose}

<template>
  <Cobe
    :width="600"
    :height="600"
    :phi="phi"
    :theta="0.2"
    :dark="0"
    :markers="markers"
    :base-color="[1, 1, 1]"
    :glow-color="[1, 1, 1]"
  />
</template>`

const options = [
  ['width', 'number', 'Canvas width in CSS pixels.', true],
  ['height', 'number', 'Canvas height in CSS pixels.', true],
  ['phi', 'number', 'Horizontal rotation in radians.'],
  ['theta', 'number', 'Vertical tilt in radians.'],
  ['dark', 'number', 'Land darkness: 0 is light, 1 is dark.'],
  ['diffuse', 'number', 'Diffuse lighting intensity.'],
  ['mapSamples', 'number', 'Number of dots used to render the map.'],
  ['mapBrightness', 'number', 'Brightness of the land dots.'],
  ['baseColor', '[r, g, b]', 'Globe base color with channels from 0 to 1.'],
  ['markerColor', '[r, g, b]', 'Default color for markers.'],
  ['glowColor', '[r, g, b]', 'Atmospheric glow around the globe.'],
  ['markers', 'Marker[]', 'Dots positioned by latitude and longitude.'],
  ['arcs', 'Arc[]', 'Curves drawn between two locations.'],
  ['arcColor', '[r, g, b]', 'Default color for arcs.'],
  ['arcWidth', 'number', 'Arc line thickness.'],
  ['arcHeight', 'number', 'Curve height above the globe.'],
  ['markerElevation', 'number', 'Marker height above the surface.'],
  ['scale', 'number', 'Globe scale multiplier.'],
  ['offset', '[x, y]', 'Pixel offset from the canvas center.'],
  ['opacity', 'number', 'Globe opacity from 0 to 1.'],
]

const recipes = [
  {
    name: 'Auto Rotate',
    code: `const phi = ref(0)

function animate() {
  phi.value += 0.005
  requestAnimationFrame(animate)
}

onMounted(animate)`,
    description: 'Update a reactive phi value in an animation frame for continuous rotation.',
  },
  {
    name: 'Draggable',
    code: `function onPointerMove(event: PointerEvent) {
  if (!dragging.value) return
  phi.value += (event.clientX - lastX.value) / 200
  lastX.value = event.clientX
}`,
    description: 'Track pointer movement and apply the horizontal delta to phi.',
  },
  {
    name: 'Dynamic Markers',
    code: `const markers = ref([
  { location: [37.78, -122.44], size: 0.03 }
])

markers.value.push({
  location: [35.68, 139.65],
  size: 0.03
})`,
    description: 'Pass a reactive array. The Vue component updates COBE without recreating it.',
  },
  {
    name: 'Cleanup',
    code: `<Cobe v-if="visible" v-bind="options" />

<!-- Destroy is called automatically when
     the component is unmounted. -->`,
    description: 'Component lifecycle cleanup releases the WebGL context automatically.',
  },
]
const activeRecipe = ref(0)

useSeoMeta({
  title: 'COBE for Vue',
  description: 'A lightweight Vue component for the COBE WebGL globe.',
  ogTitle: 'COBE for Vue',
  ogDescription: 'A lightweight Vue component for the COBE WebGL globe.',
})
</script>

<template>
  <main class="page">
    <section class="hero">
      <ClientOnly>
        <HeroGlobe />
        <template #fallback><div class="hero-placeholder" aria-hidden="true" /></template>
      </ClientOnly>
      <p class="hero-tagline">COBE for Vue: the lightweight WebGL globe</p>
      <nav class="hero-links" aria-label="Project links">
        <a href="https://github.com/posva/cobe-vue">GitHub</a>
        <span>/</span>
        <a href="https://www.npmjs.com/package/cobe-vue">npm</a>
        <span>/</span>
        <a href="https://github.com/shuding/cobe">COBE</a>
      </nav>
    </section>

    <section class="section install-section" aria-label="Install">
      <div class="install-box">
        <div class="install-tabs" role="tablist">
          <button
            v-for="(_, manager) in installCommands"
            :key="manager"
            :class="{ active: packageManager === manager }"
            type="button"
            role="tab"
            @click="packageManager = manager"
          >
            {{ manager }}
          </button>
        </div>
        <button class="install-command" type="button" @click="copyInstall">
          <code>{{ installCommands[packageManager] }}</code>
          <span>{{ copied ? 'Copied!' : 'Copy' }}</span>
        </button>
      </div>
    </section>

    <section class="section">
      <h2>Usage</h2>
      <CodeBlock :code="usageCode" />
      <p class="section-note">
        Props are reactive, typed, and passed through to COBE. The component handles creation,
        updates, and cleanup.
      </p>
    </section>

    <section class="section">
      <h2>API</h2>
      <p class="section-intro">
        <code>&lt;Cobe v-bind="options" /&gt;</code> renders a canvas and reacts to option changes.
      </p>
      <h3>Props</h3>
      <div class="api-grid">
        <div v-for="option in options" :key="String(option[0])" class="api-item">
          <div class="api-header">
            <code>{{ option[0] }}</code>
            <span>{{ option[1] }}</span>
            <small v-if="option[3]">required</small>
          </div>
          <p>{{ option[2] }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Recipes</h2>
      <div class="recipe-tabs" role="tablist">
        <button
          v-for="(recipe, index) in recipes"
          :key="recipe.name"
          :class="{ active: activeRecipe === index }"
          type="button"
          @click="activeRecipe = index"
        >
          {{ recipe.name }}
        </button>
      </div>
      <CodeBlock :code="recipes[activeRecipe]!.code" />
      <p class="recipe-description">{{ recipes[activeRecipe]!.description }}</p>
    </section>

    <section class="section">
      <h2>Playground</h2>
      <p class="section-intro">
        Experiment with different options in real time. Adjust the controls to see how they affect
        the globe.
      </p>
      <ClientOnly><PlaygroundGlobe /></ClientOnly>
    </section>

    <footer class="footer">
      <nav aria-label="Footer links">
        <a href="https://github.com/posva/cobe-vue">GitHub</a>
        <span>/</span>
        <a href="https://github.com/posva">@posva</a>
        <span>/</span>
        <a href="https://cobe.vercel.app">Original COBE →</a>
      </nav>
    </footer>
  </main>
</template>
