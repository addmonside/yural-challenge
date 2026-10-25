// @vitest-environment jsdom
import { configureStore } from '@reduxjs/toolkit'
import { cleanup, renderHook } from '@testing-library/react'
import { createElement } from 'react'
import { Provider } from 'react-redux'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { fetchParts, partsReducer } from './parts-slice'
import { useParts } from './use-parts'

vi.mock('@/services/account/use-account', () => ({
  useAccount: () => ({ id: 'key' }),
}))

vi.mock('./parts-slice', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    fetchParts: vi.fn((arg) => ({ type: 'parts/fetchParts', payload: arg })),
  }
})

const emptyState = {
  list: [],
  brandNameList: [],
  status: 'idle',
  error: null,
  requestedNumber: '',
  requestedBrand: '',
  requestedHasAnalogues: false,
}

function renderUseParts(number, brand, hasAnalogues, state = {}) {
  const store = configureStore({
    reducer: { parts: partsReducer },
    preloadedState: { parts: { ...emptyState, ...state } },
  })

  return renderHook(() => useParts(number, brand, hasAnalogues), {
    wrapper: ({ children }) => createElement(Provider, { store }, children),
  })
}

describe('useParts', () => {
  beforeEach(() => {
    fetchParts.mockClear()
  })

  afterEach(() => {
    cleanup()
  })

  it('dispatches a request with a normalized number and brand', () => {
    renderUseParts(' 7160500039S ', ' MEYLE ')

    expect(fetchParts).toHaveBeenCalledWith({
      number: '7160500039S',
      brand: 'MEYLE',
      key: 'key',
      hasAnalogues: false,
    })
  })

  it('dispatches a request with analogues when hasAnalogues is true', () => {
    renderUseParts('7160500039S', 'MEYLE', true)

    expect(fetchParts).toHaveBeenCalledWith({
      number: '7160500039S',
      brand: 'MEYLE',
      key: 'key',
      hasAnalogues: true,
    })
  })

  it('dispatches a request without a brand when it is not provided', () => {
    renderUseParts('7160500039S')

    expect(fetchParts).toHaveBeenCalledWith({
      number: '7160500039S',
      brand: '',
      key: 'key',
      hasAnalogues: false,
    })
  })

  it('does not dispatch a request for an empty part number', () => {
    renderUseParts('  ', 'MEYLE')

    expect(fetchParts).not.toHaveBeenCalled()
  })

  it('hides data while another brand is loading', () => {
    const { result } = renderUseParts('7160500039S', 'OTHER', false, {
      list: [{ brand: 'MEYLE' }],
      brandNameList: ['MEYLE'],
      status: 'succeeded',
      requestedNumber: '7160500039S',
      requestedBrand: 'MEYLE',
      requestedHasAnalogues: false,
    })

    expect(result.current.isPending).toBe(true)
    expect(result.current.list).toEqual([])
    expect(result.current.brandNameList).toEqual([])
  })
})
