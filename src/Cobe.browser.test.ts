import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Cobe } from './Cobe'

describe('Cobe browser', () => {
  it('renders globe visually', async () => {
    const { container } = render(Cobe, {
      props: {
        width: 200,
        height: 200,
        devicePixelRatio: 2,
        phi: 0,
        theta: 0.2,
        dark: 0,
        diffuse: 1.2,
        mapSamples: 16_000,
        mapBrightness: 6,
        baseColor: [1, 1, 1],
        markerColor: [0.2, 0.4, 1],
        glowColor: [1, 1, 1],
        markers: [
          { location: [37.78, -122.44], size: 0.03, id: 'sf' },
          { location: [40.71, -74.01], size: 0.03, id: 'nyc' },
        ],
        arcs: [{ from: [37.78, -122.44], to: [40.71, -74.01] }],
        arcColor: [0.3, 0.5, 1],
        arcWidth: 0.5,
        arcHeight: 0.3,
      },
      attrs: {
        width: 200,
        height: 200,
        style: 'width:200px;height:200px',
      },
    })

    // Wait for WebGL to render
    await new Promise((r) => setTimeout(r, 500))

    await expect(container).toMatchScreenshot()
  })
})
