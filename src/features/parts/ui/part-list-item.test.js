import { createElement } from 'react'
import { describe, expect, it } from 'vite-plus/test'
import { renderToStaticMarkup } from 'react-dom/server'
import { PartListItem } from './part-list-item'

const NBSP = '\u00a0'

function render(props = {}) {
  return renderToStaticMarkup(
    createElement(PartListItem, {
      brand: 'OSSCA',
      name: 'Колодка тормозная',
      count: 12,
      price: 1200,
      ...props,
    }),
  )
}

describe('PartListItem', () => {
  it('renders a list item with brand and name', () => {
    const markup = render()

    expect(markup).toContain('<li')
    expect(markup).toContain('OSSCA Колодка тормозная')
  })

  it('renders the available count', () => {
    expect(render()).toContain('<p class="text-center col-1">12</p>')
  })

  it('renders the formatted price', () => {
    expect(render()).toContain(`1${NBSP}200${NBSP}₽`)
  })
})
