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

function collectOptions(props: CobeOptions): COBEOptions {
  const opts: COBEOptions = {
    width: props.width,
    height: props.height,
    phi: props.phi,
    theta: props.theta,
    mapSamples: props.mapSamples,
    mapBrightness: props.mapBrightness,
    baseColor: props.baseColor,
    markerColor: props.markerColor,
    glowColor: props.glowColor,
    diffuse: props.diffuse,
    devicePixelRatio: props.devicePixelRatio,
    dark: props.dark,
  }
  if (props.mapBaseBrightness != null) opts.mapBaseBrightness = props.mapBaseBrightness
  if (props.markers != null) opts.markers = props.markers
  if (props.opacity != null) opts.opacity = props.opacity
  if (props.offset != null) opts.offset = props.offset
  if (props.scale != null) opts.scale = props.scale
  if (props.context != null) opts.context = props.context
  if (props.arcs != null) opts.arcs = props.arcs
  if (props.arcColor != null) opts.arcColor = props.arcColor
  if (props.arcWidth != null) opts.arcWidth = props.arcWidth
  if (props.arcHeight != null) opts.arcHeight = props.arcHeight
  if (props.markerElevation != null) opts.markerElevation = props.markerElevation
  return opts
}

export const Cobe = defineComponent({
  name: 'Cobe',

  props: {
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    phi: { type: Number, default: 0 },
    theta: { type: Number, default: 0 },
    mapSamples: { type: Number, default: 16_000 },
    mapBrightness: { type: Number, default: 6 },
    mapBaseBrightness: { type: Number, default: undefined },
    baseColor: {
      type: Array as unknown as PropType<[number, number, number]>,
      default: (): [number, number, number] => [0.3, 0.3, 0.3],
    },
    markerColor: {
      type: Array as unknown as PropType<[number, number, number]>,
      default: (): [number, number, number] => [1, 0.5, 1],
    },
    glowColor: {
      type: Array as unknown as PropType<[number, number, number]>,
      default: (): [number, number, number] => [1, 1, 1],
    },
    markers: { type: Array as unknown as PropType<Marker[]>, default: undefined },
    diffuse: { type: Number, default: 1.2 },
    devicePixelRatio: { type: Number, default: 2 },
    dark: { type: Number, default: 1 },
    opacity: { type: Number, default: undefined },
    offset: {
      type: Array as unknown as PropType<[number, number]>,
      default: undefined,
    },
    scale: { type: Number, default: undefined },
    context: { type: Object as PropType<WebGLContextAttributes>, default: undefined },
    arcs: { type: Array as unknown as PropType<Arc[]>, default: undefined },
    arcColor: {
      type: Array as unknown as PropType<[number, number, number]>,
      default: undefined,
    },
    arcWidth: { type: Number, default: undefined },
    arcHeight: { type: Number, default: undefined },
    markerElevation: { type: Number, default: undefined },
  },

  slots: Object as SlotsType<{}>,

  setup(props, { attrs }) {
    const canvasRef = shallowRef<HTMLCanvasElement>()
    let globe: Globe | undefined

    onMounted(() => {
      if (canvasRef.value) {
        globe = createGlobe(canvasRef.value, collectOptions(props))
      }
    })

    watch(
      () => collectOptions(props),
      (state) => {
        globe?.update(state)
      },
      { deep: true },
    )

    onUnmounted(() => {
      globe?.destroy()
    })

    return () => h('canvas', { ...attrs, ref: canvasRef })
  },
})
