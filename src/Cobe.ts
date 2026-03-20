import {
  defineComponent,
  h,
  onMounted,
  onUnmounted,
  shallowRef,
  watch,
  type PropType,
  type SlotsType,
} from 'vue'
import createGlobe from 'cobe'
import type { COBEOptions, Globe, Marker, Arc } from 'cobe'

export interface CobeOptions {
  width: number
  height: number
  phi: number
  theta: number
  mapSamples: number
  mapBrightness: number
  mapBaseBrightness?: number
  baseColor: [number, number, number]
  markerColor: [number, number, number]
  glowColor: [number, number, number]
  markers?: Marker[]
  diffuse: number
  devicePixelRatio: number
  dark: number
  opacity?: number
  offset?: [number, number]
  scale?: number
  context?: WebGLContextAttributes
  arcs?: Arc[]
  arcColor?: [number, number, number]
  arcWidth?: number
  arcHeight?: number
  markerElevation?: number
}

type Color = [red: number, green: number, blue: number]

export const Cobe = defineComponent({
  name: 'Cobe',

  props: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    phi: Number,
    theta: Number,
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

  slots: Object as SlotsType<{}>,

  setup(props, { attrs }) {
    const canvasRef = shallowRef<HTMLCanvasElement>()
    let globe: Globe | undefined

    onMounted(() => {
      if (canvasRef.value) {
        globe = createGlobe(canvasRef.value, props)
      }
    })

    watch(props, () => {
      // globe?.update({ phi: props.phi })

      globe?.update(props)
    })

    onUnmounted(() => {
      globe?.destroy()
    })

    return () => h('canvas', { ...attrs, ref: canvasRef })
  },
})
