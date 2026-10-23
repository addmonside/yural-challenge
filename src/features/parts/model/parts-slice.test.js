import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { api } from '@/shared/api/api'
import { fetchParts, partsReducer } from './parts-slice'

vi.mock('@/shared/api/api', () => ({
  api: { get: vi.fn() },
}))

function createStore() {
  return configureStore({ reducer: { parts: partsReducer } })
}

describe('parts slice', () => {
  beforeEach(() => {
    api.get.mockReset()
  })

  it('loads full goods for a part number', async () => {
    const goods = [
      {
        brand: 'Renault',
        count: 13,
        goodsID: '7C995F79-3E23-4B9F-8102-D32A3CA1173C',
        name: 'Датчик уровня масла',
        number: '111459423R',
        warehouses: [{ id: 'warehouse-1', price: 9609.25, stock: 1 }],
      },
      {
        brand: 'ZETRA',
        count: 4,
        goodsID: '6216CAB2-EA2C-4736-857C-3D235F40C364',
        name: 'Коромысло толкателя впускного клапана',
        number: 'CETA009',
        warehouses: [{ id: 'warehouse-2', price: 858, stock: 4 }],
      },
    ]
    api.get.mockResolvedValue({
      goods: [
        ...goods,
        { brand: 'ZETRA', goodsID: 'duplicate', name: '', number: '' },
        { brand: '', goodsID: '', name: '', number: '' },
      ],
    })
    const store = createStore()

    await store.dispatch(fetchParts({ number: ' 01089 ', key: 'key' }))

    expect(api.get).toHaveBeenCalledWith('/hs/hsprice/?key=key&number=01089')
    expect(store.getState().parts).toEqual({
      list: [...goods, { brand: 'ZETRA', goodsID: 'duplicate', name: '', number: '' }],
      brandNameList: ['Renault', 'ZETRA'],
      status: 'succeeded',
      error: null,
      requestedNumber: '01089',
      requestedBrand: '',
      requestedHasAnalogues: false,
    })
  })

  it('requests analogues when hasAnalogues is true', async () => {
    api.get.mockResolvedValue({ goods: [] })
    const store = createStore()

    await store.dispatch(
      fetchParts({ number: ' 7160500039S ', brand: ' MEYLE ', key: 'key', hasAnalogues: true }),
    )

    expect(api.get).toHaveBeenCalledWith(
      '/hs/hsprice/?key=key&number=7160500039S&brand=MEYLE&analogues=on',
    )
    expect(store.getState().parts.requestedBrand).toBe('MEYLE')
  })

  it('does not request analogues when hasAnalogues is false', async () => {
    api.get.mockResolvedValue({ goods: [] })
    const store = createStore()

    await store.dispatch(fetchParts({ number: '7160500039S', brand: 'MEYLE', key: 'key' }))

    expect(api.get).toHaveBeenCalledWith('/hs/hsprice/?key=key&number=7160500039S&brand=MEYLE')
  })

  it('encodes special characters in the part number and brand', async () => {
    api.get.mockResolvedValue({ goods: [] })
    const store = createStore()

    await store.dispatch(
      fetchParts({ number: '01&89', brand: 'A/B', key: 'key', hasAnalogues: true }),
    )

    expect(api.get).toHaveBeenCalledWith(
      '/hs/hsprice/?key=key&number=01%2689&brand=A%2FB&analogues=on',
    )
  })

  it('ignores a stale response for a previously selected brand', async () => {
    let resolveFirst
    api.get
      .mockImplementationOnce(
        () =>
          new Promise((resolve) => {
            resolveFirst = resolve
          }),
      )
      .mockResolvedValueOnce({ goods: [{ brand: 'SECOND', goodsID: 'second' }] })
    const store = createStore()

    const first = store.dispatch(fetchParts({ number: '01089', brand: 'FIRST', key: 'key' }))
    const second = store.dispatch(fetchParts({ number: '01089', brand: 'SECOND', key: 'key' }))

    await second
    resolveFirst({ goods: [{ brand: 'FIRST', goodsID: 'first' }] })
    await first

    expect(store.getState().parts.list).toEqual([{ brand: 'SECOND', goodsID: 'second' }])
    expect(store.getState().parts.requestedBrand).toBe('SECOND')
  })

  it('rejects when the API returns an error in the response body', async () => {
    api.get.mockResolvedValue({ error: 'Request quota exceeded!' })
    const store = createStore()

    await store.dispatch(fetchParts({ number: '01089', key: 'key' }))

    expect(store.getState().parts).toEqual({
      list: [],
      brandNameList: [],
      status: 'failed',
      error: 'Request quota exceeded!',
      requestedNumber: '01089',
      requestedBrand: '',
      requestedHasAnalogues: false,
    })
  })

  it('does not request parts for an empty part number', async () => {
    const store = createStore()

    await store.dispatch(fetchParts({ number: '  ', key: 'key' }))

    expect(api.get).not.toHaveBeenCalled()
    expect(store.getState().parts.status).toBe('idle')
  })
})
