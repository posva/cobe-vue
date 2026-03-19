import { describe, expectTypeOf, it } from 'vitest'
import { Cobe, type CobeOptions } from './index'
import type { AllowedComponentProps, VNodeProps } from 'vue'

describe('Cobe types', () => {
  it('CobeOptions has expected fields', () => {
    expectTypeOf<CobeOptions>().toHaveProperty('phi')
    expectTypeOf<CobeOptions>().toHaveProperty('theta')
    expectTypeOf<CobeOptions>().toHaveProperty('width')
    expectTypeOf<CobeOptions>().toHaveProperty('height')
    expectTypeOf<CobeOptions>().toHaveProperty('markers')
    expectTypeOf<CobeOptions>().toHaveProperty('arcs')
    expectTypeOf<CobeOptions['baseColor']>().toEqualTypeOf<[number, number, number]>()
  })

  it('accepts required props', () => {
    type CobeProps = InstanceType<typeof Cobe>['$props']
    // width and height are required
    expectTypeOf<CobeProps>().toHaveProperty('width')
    expectTypeOf<CobeProps>().toHaveProperty('height')
  })
})
