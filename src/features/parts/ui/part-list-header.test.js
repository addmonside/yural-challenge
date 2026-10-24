import { createElement } from 'react'
import { describe, expect, it } from 'vite-plus/test'
import { renderToStaticMarkup } from 'react-dom/server'
import { PartListHeader } from './part-list-header'

function render() {
  return renderToStaticMarkup(createElement(PartListHeader))
}

describe('PartListHeader', () => {
  it('renders column labels', () => {
    const markup = render()

    expect(markup).toContain('Производитель / Наименование')
    expect(markup).toContain('В наличии')
    expect(markup).toContain('Цена')
  })

  it('is hidden below the 768px breakpoint', () => {
    expect(render()).toContain('d-none d-md-flex')
  })

  it('uses the muted small Text styles', () => {
    expect(render()).toContain('text-body-secondary fs-xs')
  })
})
