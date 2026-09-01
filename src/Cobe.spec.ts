import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { Cobe } from './Cobe'
import { nextTick, reactive } from 'vue'

const destroyFn = vi.fn()
const updateFn = vi.fn()

vi.mock('cobe', () => ({
  default: vi.fn(() => ({ destroy: destroyFn, update: updateFn })),
}))

const baseProps = {
  width: 400,
  height: 400,
  phi: 0,
  theta: 0,
  mapSamples: 16_000,
  mapBrightness: 6,
  baseColor: [0.3, 0.3, 0.3] as [number, number, number],
  markerColor: [1, 0.5, 1] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  diffuse: 1.2,
  devicePixelRatio: 2,
  dark: 1,
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('Cobe', () => {
  it('renders a canvas element', () => {
    const wrapper = mount(Cobe, { props: baseProps })
    expect(wrapper.find('canvas').exists()).toBe(true)
  })

  it('calls createGlobe with canvas and options', async () => {
    const { default: createGlobe } = await import('cobe')
    mount(Cobe, { props: baseProps })
    expect(createGlobe).toHaveBeenCalledTimes(1)
    const [canvas, opts] = (createGlobe as ReturnType<typeof vi.fn>).mock.calls[0]!
    expect(canvas).toBeInstanceOf(HTMLCanvasElement)
    expect(opts.width).toBe(400)
    expect(opts.phi).toBe(0)
  })

  it('forwards attrs to canvas', () => {
    const wrapper = mount(Cobe, {
      props: baseProps,
      attrs: { id: 'my-globe', class: 'globe-canvas' },
    })
    const canvas = wrapper.find('canvas')
    expect(canvas.attributes('id')).toBe('my-globe')
    expect(canvas.classes()).toContain('globe-canvas')
  })

  it('calls destroy on unmount', () => {
    const wrapper = mount(Cobe, { props: baseProps })
    wrapper.unmount()
    expect(destroyFn).toHaveBeenCalledTimes(1)
  })

  it('updates only changed scalar props', async () => {
    const markers = [{ location: [0, 0] as [number, number], size: 0.1 }]
    const arcs = [{ from: [0, 0] as [number, number], to: [1, 1] as [number, number] }]
    const wrapper = mount(Cobe, { props: { ...baseProps, markers, arcs } })

    await wrapper.setProps({ phi: 0.5 })

    expect(updateFn).toHaveBeenCalledTimes(1)
    expect(updateFn).toHaveBeenCalledWith({ phi: 0.5 })
  })

  it('updates width and height together', async () => {
    const wrapper = mount(Cobe, { props: baseProps })

    await wrapper.setProps({ width: 600 })

    expect(updateFn).toHaveBeenCalledWith({ width: 600, height: 400 })
  })

  it('clears removed markers and arcs', async () => {
    const wrapper = mount(Cobe, {
      props: {
        ...baseProps,
        markers: [{ location: [0, 0], size: 0.1 }],
        arcs: [{ from: [0, 0], to: [1, 1] }],
      },
    })

    await wrapper.setProps({ markers: undefined })
    expect(updateFn).toHaveBeenLastCalledWith({ markers: [] })

    await wrapper.setProps({ arcs: undefined })
    expect(updateFn).toHaveBeenLastCalledWith({ arcs: [] })
  })

  it('updates markers after a nested change', async () => {
    const markers = reactive([{ location: [0, 0] as [number, number], size: 0.1 }])
    mount(Cobe, { props: { ...baseProps, markers } })

    markers[0]!.size = 0.2
    await nextTick()

    expect(updateFn).toHaveBeenCalledWith({ markers })
  })

  it('updates a color after an in-place channel change', async () => {
    const glowColor = reactive<[number, number, number]>([1, 1, 1])
    mount(Cobe, { props: { ...baseProps, glowColor } })

    glowColor[0] = 0.5
    await nextTick()

    expect(updateFn).toHaveBeenCalledTimes(1)
    expect(updateFn).toHaveBeenCalledWith({ glowColor })
  })

  it('rebuilds arcs after an arc geometry option changes', async () => {
    const arcs = [{ from: [0, 0] as [number, number], to: [1, 1] as [number, number] }]
    const wrapper = mount(Cobe, { props: { ...baseProps, arcs } })

    await wrapper.setProps({ arcWidth: 0.5 })

    expect(updateFn.mock.calls).toEqual([[{ arcWidth: 0.5 }], [{ arcs }]])
  })

  it('does not react to construction-only props', async () => {
    const context = { alpha: false }
    const wrapper = mount(Cobe, { props: baseProps })

    await wrapper.setProps({ devicePixelRatio: 3, context })

    expect(updateFn).toHaveBeenCalledTimes(0)
  })
})
