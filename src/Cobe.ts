import { defineComponent, h, onMounted, onUnmounted, shallowRef, watch, type PropType } from 'vue'
import createGlobe from 'cobe'
import type { Arc, COBEOptions, Globe, Marker } from 'cobe'

type Color = [red: number, green: number, blue: number]
type ReactiveScalarOptions = Omit<
  COBEOptions,
  | 'arcColor'
  | 'arcs'
  | 'baseColor'
  | 'context'
  | 'devicePixelRatio'
  | 'glowColor'
  | 'markerColor'
  | 'markers'
  | 'offset'
>

export const Cobe = defineComponent({
  name: 'Cobe',

  props: {
    /**
     * Width of the WebGL drawing buffer in CSS pixels.
     */
    width: { type: Number, required: true },

    /**
     * Height of the WebGL drawing buffer in CSS pixels.
     */
    height: { type: Number, required: true },

    /**
     * Horizontal rotation of the globe in radians.
     *
     * @default 0
     */
    phi: { type: Number, default: 0 },

    /**
     * Vertical rotation of the globe in radians.
     *
     * @default 0
     */
    theta: { type: Number, default: 0 },

    /**
     * Number of samples used to draw the world map.
     *
     * @default 16000
     */
    mapSamples: { type: Number, default: 16_000 },

    /**
     * Brightness of the world map samples.
     *
     * @default 6
     */
    mapBrightness: { type: Number, default: 6 },

    /**
     * Minimum brightness of the world map.
     *
     * @default 0
     */
    mapBaseBrightness: Number,

    /**
     * RGB color of the globe, with each channel between 0 and 1.
     *
     * @default [0.3, 0.3, 0.3]
     */
    baseColor: {
      type: Array as unknown as PropType<Color>,
      default: (): [number, number, number] => [0.3, 0.3, 0.3],
    },

    /**
     * Default RGB color of markers, with each channel between 0 and 1.
     *
     * @default [1, 0.5, 1]
     */
    markerColor: {
      type: Array as unknown as PropType<Color>,
      default: (): [number, number, number] => [1, 0.5, 1],
    },

    /**
     * RGB color of the glow around the globe, with each channel between 0 and 1.
     *
     * @default [1, 1, 1]
     */
    glowColor: {
      type: Array as unknown as PropType<Color>,
      default: (): [number, number, number] => [1, 1, 1],
    },

    /**
     * Markers to draw at latitude and longitude coordinates.
     *
     * @default []
     */
    markers: { type: Array as unknown as PropType<Marker[]>, default: undefined },

    /**
     * Strength of the globe's diffuse lighting.
     *
     * @default 1.2
     */
    diffuse: { type: Number, default: 1.2 },

    /**
     * The device pixel ratio to use for rendering. This is useful for high-DPI
     * displays.
     *
     * **THIS PROP IS NOT REACTIVE**, changing it requires re-instantiating the
     * component.
     *
     * @default 2
     */
    devicePixelRatio: { type: Number, default: 2 },

    /**
     * Amount of dark shading applied to the globe.
     *
     * @default 1
     */
    dark: { type: Number, default: 1 },

    /**
     * Opacity of the globe between 0 and 1.
     *
     * @default 1
     */
    opacity: Number,

    /**
     * Horizontal and vertical offset of the globe in CSS pixels.
     *
     * @default [0, 0]
     */
    offset: {
      type: Array as unknown as PropType<[number, number]>,
      default: undefined,
    },

    /**
     * Scale of the globe within the canvas.
     *
     * @default 1
     */
    scale: Number,

    /**
     * Attributes used to create the WebGL rendering context.
     *
     * **THIS PROP IS NOT REACTIVE**, changing it requires re-instantiating the
     * component.
     *
     * @default { alpha: true, stencil: false, antialias: true, depth: false, preserveDrawingBuffer: false }
     */
    context: Object as PropType<WebGLContextAttributes>,

    /**
     * Arcs to draw between pairs of latitude and longitude coordinates.
     *
     * @default []
     */
    arcs: Array as unknown as PropType<Arc[]>,

    /**
     * Default RGB color of arcs, with each channel between 0 and 1.
     *
     * @default [0.3, 0.6, 1]
     */
    arcColor: Array as unknown as PropType<[number, number, number]>,

    /**
     * Width of the arcs.
     *
     * @default 1
     */
    arcWidth: Number,

    /**
     * Height of the arcs above the globe.
     *
     * @default 0.2
     */
    arcHeight: Number,

    /**
     * Elevation of markers above the globe.
     *
     * @default 0.05
     */
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

    watch(
      (): ReactiveScalarOptions => ({
        width: props.width,
        height: props.height,
        phi: props.phi,
        theta: props.theta,
        mapSamples: props.mapSamples,
        mapBrightness: props.mapBrightness,
        mapBaseBrightness: props.mapBaseBrightness,
        diffuse: props.diffuse,
        dark: props.dark,
        opacity: props.opacity,
        scale: props.scale,
        arcWidth: props.arcWidth,
        arcHeight: props.arcHeight,
        markerElevation: props.markerElevation,
      }),
      (options, previousOptions) => {
        const update: Partial<ReactiveScalarOptions> = {}
        let rebuildArcs = false

        if (options.width !== previousOptions.width || options.height !== previousOptions.height) {
          update.width = options.width
          update.height = options.height
        }

        for (const key of Object.keys(options) as Array<keyof ReactiveScalarOptions>) {
          if (key === 'width' || key === 'height') continue
          if (Object.is(options[key], previousOptions[key])) continue

          Object.assign(update, { [key]: options[key] })
          rebuildArcs ||= key === 'arcWidth' || key === 'arcHeight' || key === 'markerElevation'
        }

        if (Object.keys(update).length > 0) {
          globe?.update(update)
        }

        /*
         * COBE bakes these values into the arc buffer before applying the
         * scalar updates, so rebuild the buffer in a second update.
         */
        if (rebuildArcs && props.arcs) {
          globe?.update({ arcs: props.arcs })
        }
      },
    )

    watch([() => props.baseColor[0], () => props.baseColor[1], () => props.baseColor[2]], () =>
      globe?.update({ baseColor: props.baseColor }),
    )

    watch(
      [() => props.markerColor[0], () => props.markerColor[1], () => props.markerColor[2]],
      () => globe?.update({ markerColor: props.markerColor }),
    )

    watch([() => props.glowColor[0], () => props.glowColor[1], () => props.glowColor[2]], () =>
      globe?.update({ glowColor: props.glowColor }),
    )

    watch([() => props.offset?.[0], () => props.offset?.[1]], () =>
      globe?.update({ offset: props.offset }),
    )

    watch([() => props.arcColor?.[0], () => props.arcColor?.[1], () => props.arcColor?.[2]], () =>
      globe?.update({ arcColor: props.arcColor }),
    )

    watch(
      () => props.markers,
      (markers) => globe?.update({ markers: markers ?? [] }),
      { deep: true },
    )

    watch(
      () => props.arcs,
      (arcs) => globe?.update({ arcs: arcs ?? [] }),
      { deep: true },
    )

    onUnmounted(() => {
      globe?.destroy()
    })

    return () => h('canvas', { ...attrs, ref: canvasRef })
  },
})
