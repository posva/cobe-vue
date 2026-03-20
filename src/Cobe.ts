import { defineComponent, h, onMounted, onUnmounted, shallowRef, watch, type PropType } from 'vue'
import createGlobe from 'cobe'
import type { Globe, Marker, Arc } from 'cobe'

type Color = [red: number, green: number, blue: number]

export const Cobe = defineComponent({
  name: 'Cobe',

  props: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    phi: { type: Number, default: 0 },
    theta: { type: Number, default: 0 },
    mapSamples: { type: Number, default: 16_000 },
    mapBrightness: { type: Number, default: 6 },
    mapBaseBrightness: Number,
    baseColor: {
      type: Array as unknown as PropType<Color>,
      default: (): [number, number, number] => [0.3, 0.3, 0.3],
    },
    markerColor: {
      type: Array as unknown as PropType<Color>,
      default: (): [number, number, number] => [1, 0.5, 1],
    },
    glowColor: {
      type: Array as unknown as PropType<Color>,
      default: (): [number, number, number] => [1, 1, 1],
    },
    markers: { type: Array as unknown as PropType<Marker[]>, default: undefined },
    diffuse: { type: Number, default: 1.2 },
    devicePixelRatio: { type: Number, default: 2 },
    dark: { type: Number, default: 1 },
    opacity: Number,
    offset: {
      type: Array as unknown as PropType<[number, number]>,
      default: undefined,
    },
    scale: Number,
    context: Object as PropType<WebGLContextAttributes>,
    arcs: Array as unknown as PropType<Arc[]>,
    arcColor: Array as unknown as PropType<[number, number, number]>,
    arcWidth: Number,
    arcHeight: Number,
    markerElevation: Number,
  },

  setup(props, { attrs }) {
    const canvasRef = shallowRef<HTMLCanvasElement>()
    let globe: Globe | undefined

    onMounted(() => {
      if (canvasRef.value) {
        globe = createGlobe(canvasRef.value, props)
      }
    })

    watch(props, () => {
      globe?.update(props)
    })

    onUnmounted(() => {
      globe?.destroy()
    })

    return () => h('canvas', { ...attrs, ref: canvasRef })
  },
})
