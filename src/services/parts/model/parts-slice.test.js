import { configureStore } from '@reduxjs/toolkit'
import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { api } from '@/shared/api/api'
import { BusinessAppError } from '@/shared/model/errors/app-error'
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
      list: [
        {
          goodsID: '7C995F79-3E23-4B9F-8102-D32A3CA1173C',
          brand: 'Renault',
          name: 'Датчик уровня масла',
          number: '111459423R',
          count: 13,
          price: 9609.25,
        },
        {
          goodsID: '6216CAB2-EA2C-4736-857C-3D235F40C364',
          brand: 'ZETRA',
          name: 'Коромысло толкателя впускного клапана',
          number: 'CETA009',
          count: 4,
          price: 858,
        },
        {
          goodsID: 'duplicate',
          brand: 'ZETRA',
          name: '',
          number: '',
          count: 0,
          price: 0,
        },
      ],
      brandNameList: ['Renault', 'ZETRA'],
      status: 'succeeded',
      error: null,
      requestedNumber: '01089',
      requestedBrand: '',
      requestedHasAnalogues: false,
    })
  })

  it('takes the lowest warehouse price', async () => {
    api.get.mockResolvedValue({
      goods: [
        {
          brand: 'OSSCA',
          goodsID: 'ossca',
          name: 'Колодка тормозная',
          number: '01089',
          count: 5,
          warehouses: [
            { id: 'warehouse-1', price: 1200, stock: 2 },
            { id: 'warehouse-2', price: 980.5, stock: 3 },
            { id: 'warehouse-3', price: 0, stock: 0 },
          ],
        },
      ],
    })
    const store = createStore()

    await store.dispatch(fetchParts({ number: '01089', key: 'key' }))

    expect(store.getState().parts.list).toEqual([
      {
        goodsID: 'ossca',
        brand: 'OSSCA',
        name: 'Колодка тормозная',
        number: '01089',
        count: 5,
        price: 980.5,
      },
    ])
  })

  it('flattens analogues and keeps brand names from top-level goods', async () => {
    api.get.mockResolvedValue({
      goods: [
        {
          brand: 'MEYLE',
          goodsID: 'main',
          name: 'Рычаги задней подвески',
          number: '7160500039/S',
          count: 20,
          warehouses: [{ id: 'warehouse-1', price: 12533.62, stock: 20 }],
          analogues: [
            {
              brand: 'Нарсо',
              goodsID: 'analogue-1',
              name: 'Комплект рычагов',
              number: '53612/1',
              count: 10,
              warehouses: [{ id: 'warehouse-2', price: 8680.2, stock: 10 }],
            },
            {
              brand: 'MEYLE',
              goodsID: 'analogue-2',
              name: 'Рычаг задней подвески',
              number: '7160500039/SK',
              count: 0,
              warehouses: [],
            },
            {
              brand: '',
              goodsID: 'empty-brand',
              name: 'Мусор',
              number: '',
              warehouses: [],
            },
          ],
        },
      ],
    })
    const store = createStore()

    await store.dispatch(
      fetchParts({
        number: '7160500039S',
        brand: 'MEYLE',
        key: 'key',
        hasAnalogues: true,
      }),
    )

    expect(store.getState().parts.list).toEqual([
      {
        goodsID: 'main',
        brand: 'MEYLE',
        name: 'Рычаги задней подвески',
        number: '7160500039/S',
        count: 20,
        price: 12533.62,
      },
      {
        goodsID: 'analogue-1',
        brand: 'Нарсо',
        name: 'Комплект рычагов',
        number: '53612/1',
        count: 10,
        price: 8680.2,
      },
      {
        goodsID: 'analogue-2',
        brand: 'MEYLE',
        name: 'Рычаг задней подвески',
        number: '7160500039/SK',
        count: 0,
        price: 0,
      },
    ])
    expect(store.getState().parts.brandNameList).toEqual(['MEYLE'])
  })

  it('does not duplicate positions with the same goodsID', async () => {
    api.get.mockResolvedValue({
      goods: [
        {
          brand: 'MEYLE',
          goodsID: 'same',
          name: 'Рычаг',
          number: '7160500039/S',
          count: 1,
          warehouses: [],
          analogues: [
            {
              brand: 'MEYLE',
              goodsID: 'same',
              name: 'Рычаг',
              number: '7160500039/S',
              count: 1,
              warehouses: [],
            },
          ],
        },
      ],
    })
    const store = createStore()

    await store.dispatch(
      fetchParts({ number: '7160500039S', brand: 'MEYLE', key: 'key', hasAnalogues: true }),
    )

    expect(store.getState().parts.list).toHaveLength(1)
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
      .mockResolvedValueOnce({
        goods: [{ brand: 'SECOND', goodsID: 'second', name: 'Второй', number: '2' }],
      })
    const store = createStore()

    const first = store.dispatch(fetchParts({ number: '01089', brand: 'FIRST', key: 'key' }))
    const second = store.dispatch(fetchParts({ number: '01089', brand: 'SECOND', key: 'key' }))

    await second
    resolveFirst({ goods: [{ brand: 'FIRST', goodsID: 'first', name: 'Первый', number: '1' }] })
    await first

    expect(store.getState().parts.list).toEqual([
      {
        goodsID: 'second',
        brand: 'SECOND',
        name: 'Второй',
        number: '2',
        count: 0,
        price: 0,
      },
    ])
    expect(store.getState().parts.requestedBrand).toBe('SECOND')
  })

  it('stores the translated API error message', async () => {
    api.get.mockRejectedValue(
      new BusinessAppError('Вы превысили лимит запросов по грузовому ассортименту'),
    )
    const store = createStore()

    await store.dispatch(fetchParts({ number: '01089', key: 'key' }))

    expect(store.getState().parts).toEqual({
      list: [],
      brandNameList: [],
      status: 'failed',
      error: 'Вы превысили лимит запросов по грузовому ассортименту',
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
