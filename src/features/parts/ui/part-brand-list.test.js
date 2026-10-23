import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { renderToStaticMarkup } from 'react-dom/server'
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
}

function render(props) {
  return renderToStaticMarkup(PartBrandList({ article: '01089', onSelect: vi.fn(), ...props }))
}

describe('PartBrandList', () => {
  beforeEach(() => {
    useParts.mockReset()
  })

  it('renders parts as selectable buttons', () => {
    useParts.mockReturnValue({
      ...emptyState,
      list: [
        { brand: 'OSSCA', goodsID: 'goods-1', name: 'Датчик' },
        { brand: 'AP', goodsID: 'goods-2', name: 'Ролик' },
      ],
    })

    const markup = render()

    expect(markup).toContain('list-group-item-action')
    expect(markup).toContain('OSSCA')
    expect(markup).toContain('AP')
  })

  it('renders a loader while parts are loading', () => {
    useParts.mockReturnValue({ ...emptyState, isPending: true })

    expect(render()).toContain('spinner-border')
  })

  it('renders an API error', () => {
    useParts.mockReturnValue({ ...emptyState, error: 'Request quota exceeded!' })

    expect(render()).toContain('Request quota exceeded!')
  })

  it('renders an empty message when no parts are found', () => {
    useParts.mockReturnValue(emptyState)

    expect(render()).toContain('Производители не найдены')
  })

  it('renders a prompt until an article is provided', () => {
    useParts.mockReturnValue(emptyState)

    expect(render({ article: '' })).toContain('Не введен артикул')
  })
})
