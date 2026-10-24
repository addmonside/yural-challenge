import { createElement } from 'react'
import { describe, expect, it } from 'vite-plus/test'
import { renderToStaticMarkup } from 'react-dom/server'
import { PartListItem } from './part-list-item'
import styles from './part-list-item.module.scss'

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
    expect(markup).toContain('Колодка тормозная')
    expect(markup).toContain('OSSCA')
  })

  it('renders the available count at the start on mobile and centered on desktop', () => {
    expect(render()).toContain(
      '<p class="col-6 col-md-1 mb-0 text-start text-md-center"><span>12</span></p>',
    )
  })

  it('fades out-of-stock positions', () => {
    expect(render({ count: 0 })).toContain(styles.outOfStock)
  })

  it('does not fade positions in stock', () => {
    expect(render()).not.toContain(styles.outOfStock)
  })

  it('renders the formatted price', () => {
    expect(render()).toContain(`1${NBSP}200${NBSP}₽`)
  })

  it('uses a responsive grid with the name on the first row on mobile', () => {
    const markup = render()

    expect(markup).toContain('row g-2 align-items-center')
    expect(markup).toContain('col-12 col-md-8')
    expect(markup).toContain('col-6 col-md-3')
    expect(markup).not.toContain('style=')
  })
})
