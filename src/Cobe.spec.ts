import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { Cobe } from './Cobe'
import { nextTick } from 'vue'

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

  it.todo('updates globe on prop change', async () => {})
})
