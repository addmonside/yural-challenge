import { createElement } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { renderToStaticMarkup } from 'react-dom/server'
import { useParts } from '../model/use-parts'
import { PartList } from './part-list'

vi.mock('../model/use-parts', () => ({
  useParts: vi.fn(),
}))

const NBSP = '\u00a0'

const emptyState = {
  list: [],
  brandNameList: [],
  isPending: false,
  error: null,
  refetch: vi.fn(),
}

function render({ article = '01089', brand = 'OSSCA', state = emptyState } = {}) {
  useParts.mockReturnValue(state)

  return renderToStaticMarkup(createElement(PartList, { article, brand }))
}

describe('PartList', () => {
  beforeEach(() => {
    useParts.mockReset()
  })

  it('requests analogues for the article and brand', () => {
    render()

    expect(useParts).toHaveBeenCalledWith('01089', 'OSSCA', true)
  })

  it('renders a skeleton while parts are loading', () => {
    const markup = render({ state: { ...emptyState, isPending: true } })

    expect(markup).toContain('aria-busy="true"')
    expect(markup.match(/data-slot="skeleton"/g)).toHaveLength(30)
  })

  it('renders an API error', () => {
    const markup = render({ state: { ...emptyState, error: 'Request quota exceeded!' } })

    expect(markup).toContain('Не удалось загрузить аналоги')
    expect(markup).not.toContain('Не удалось загрузить производителей')
    expect(markup).toContain('Request quota exceeded!')
  })

  it('renders an empty message when no parts are found', () => {
    const markup = render()

    expect(markup).toContain('Нет подходящих запчастей')
    expect(markup).toContain('01089')
    expect(markup).toContain('OSSCA')
    expect(markup).toContain('нет подходящих запчастей')
    expect(markup).not.toContain('подзодящих')
  })

  it('renders several positions with the same brand', () => {
    const markup = render({
      state: {
        ...emptyState,
        list: [
          { goodsID: 'main', brand: 'MEYLE', name: 'Рычаг', count: 20, price: 12533.62 },
          { goodsID: 'analogue', brand: 'MEYLE', name: 'Рычаг короткий', count: 0, price: 0 },
        ],
      },
    })

    expect(markup.match(/Рычаг/g)).toHaveLength(2)
  })

  it('renders out-of-stock positions at the end of the list', () => {
    const markup = render({
      state: {
        ...emptyState,
        list: [
          { goodsID: 'empty', brand: 'OSSCA', name: 'Позиция без остатка', count: 0, price: 0 },
          { goodsID: 'available', brand: 'OSSCA', name: 'Позиция в наличии', count: 5, price: 100 },
        ],
      },
    })

    expect(markup.indexOf('Позиция в наличии')).toBeLessThan(markup.indexOf('Позиция без остатка'))
  })

  it('renders the parts list', () => {
    const markup = render({
      state: {
        ...emptyState,
        list: [
          { brand: 'OSSCA', name: 'Колодка тормозная', count: 12, price: 1200 },
          { brand: 'AP', name: 'Колодка тормозная', count: 3, price: 2400.5 },
        ],
      },
    })

    expect(markup).toContain('OSSCA')
    expect(markup).toContain('AP')
    expect(markup.match(/Колодка тормозная/g)).toHaveLength(2)
    expect(markup).toContain(`1${NBSP}200${NBSP}₽`)
    expect(markup).toContain(`2${NBSP}400,5${NBSP}₽`)
  })

  it('renders column headers above the parts list', () => {
    const markup = render({
      state: {
        ...emptyState,
        list: [{ brand: 'OSSCA', name: 'Колодка тормозная', count: 12, price: 1200 }],
      },
    })

    expect(markup).toContain('Производитель / Наименование')
    expect(markup.indexOf('Производитель / Наименование')).toBeLessThan(markup.indexOf('<ol'))
  })
})
