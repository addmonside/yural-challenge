import { beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { useDispatch, useSelector } from 'react-redux'
import { useAccount } from '@/services/account/use-account'
import { fetchParts } from './parts-slice'
import { useParts } from './use-parts'

vi.mock('react', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useEffect: (effect) => effect(),
    useCallback: (callback) => callback,
  }
})

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
  useSelector: vi.fn(),
}))

vi.mock('@/services/account/use-account', () => ({
  useAccount: vi.fn(),
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

function mockState(overrides = {}) {
  useSelector.mockReturnValue({ ...emptyState, ...overrides })
}

describe('useParts', () => {
  const dispatch = vi.fn()

  beforeEach(() => {
    dispatch.mockReset()
    fetchParts.mockClear()
    useDispatch.mockReturnValue(dispatch)
    useAccount.mockReturnValue({ id: 'key' })
    mockState()
  })

  it('dispatches a request with a normalized number and brand', () => {
    useParts(' 7160500039S ', ' MEYLE ')

    expect(fetchParts).toHaveBeenCalledWith({
      number: '7160500039S',
      brand: 'MEYLE',
      key: 'key',
      hasAnalogues: false,
    })
  })

  it('dispatches a request with analogues when hasAnalogues is true', () => {
    useParts('7160500039S', 'MEYLE', true)

    expect(fetchParts).toHaveBeenCalledWith({
      number: '7160500039S',
      brand: 'MEYLE',
      key: 'key',
      hasAnalogues: true,
    })
  })

  it('dispatches a request without a brand when it is not provided', () => {
    useParts('7160500039S')

    expect(fetchParts).toHaveBeenCalledWith({
      number: '7160500039S',
      brand: '',
      key: 'key',
      hasAnalogues: false,
    })
  })

  it('does not dispatch a request for an empty part number', () => {
    useParts('  ', 'MEYLE')

    expect(fetchParts).not.toHaveBeenCalled()
  })

  it('hides data while another brand is loading', () => {
    mockState({
      list: [{ brand: 'MEYLE' }],
      brandNameList: ['MEYLE'],
      status: 'succeeded',
      requestedNumber: '7160500039S',
      requestedBrand: 'MEYLE',
      requestedHasAnalogues: false,
    })

    const result = useParts('7160500039S', 'OTHER')

    expect(result.isPending).toBe(true)
    expect(result.list).toEqual([])
    expect(result.brandNameList).toEqual([])
  })
})
