import { describe, it, expect } from 'vitest'
import { render } from 'vitest-browser-vue'
import { Cobe } from './Cobe'

describe('Cobe browser', () => {
  it('renders globe visually', async () => {
    const { container } = render(Cobe, {
      props: {
        width: 200,
        height: 200,
        phi: 0,
        theta: 0.3,
        mapSamples: 4000,
        mapBrightness: 6,
        baseColor: [0.3, 0.3, 0.3],
        markerColor: [1, 0.5, 1],
        glowColor: [1, 1, 1],
        diffuse: 1.2,
        devicePixelRatio: 2,
        dark: 1,
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
