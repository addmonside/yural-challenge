import { createElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { useParts } from '../model/use-parts'
import { PartBrandList } from './part-brand-list'

vi.mock('../model/use-parts', () => ({
  useParts: vi.fn(),
}))

const emptyState = {
  list: [],
  brandNameList: [],
  isPending: false,
  error: null,
  refetch: vi.fn(),
}

function render({ article = '01089', state = emptyState } = {}) {
  useParts.mockReturnValue(state)

  return renderToStaticMarkup(
    createElement(
      StaticRouter,
      { location: article ? `/?search=${article}` : '/' },
      createElement(PartBrandList),
    ),
  )
}

describe('PartBrandList', () => {
  beforeEach(() => {
    useParts.mockReset()
  })

  it('requests parts for the article from the search param', () => {
    render()

    expect(useParts).toHaveBeenCalledWith('01089')
  })

  it('renders parts as selectable links', () => {
    const markup = render({
      state: { ...emptyState, brandNameList: ['OSSCA', 'AP'] },
    })

    expect(markup).toContain('href="/parts/OSSCA/01089"')
    expect(markup).toContain('href="/parts/AP/01089"')
    expect(markup).toContain('aria-label="Выбрать производителя OSSCA"')
    expect(markup).toContain('aria-label="Выбрать производителя AP"')
  })

  it('renders a skeleton while parts are loading', () => {
    const markup = render({ state: { ...emptyState, isPending: true } })

    expect(markup).toContain('aria-busy="true"')
    expect(markup.match(/data-slot="skeleton"/g)).toHaveLength(30)
  })

  it('renders an API error', () => {
    const markup = render({
      state: { ...emptyState, error: 'Request quota exceeded!' },
    })

    expect(markup).toContain('Request quota exceeded!')
  })

  it('renders an empty message when no parts are found', () => {
    expect(render()).toContain('Нет подходящих запчастей')
  })

  it('renders a prompt until an article is provided', () => {
    expect(render({ article: '' })).toContain('Не введен артикул')
  })
})
