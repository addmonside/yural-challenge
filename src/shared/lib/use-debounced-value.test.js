// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { useDebouncedValue } from './use-debounced-value'

function renderDebounced(value = 'a', delay = 400) {
  return renderHook(({ value }) => useDebouncedValue(value, delay), {
    initialProps: { value },
  })
}

describe('useDebouncedValue', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('returns the initial value immediately', () => {
    const { result } = renderDebounced('a')

    expect(result.current).toBe('a')
  })

  it('returns the latest value only after the delay without changes', () => {
    const { result, rerender } = renderDebounced('a')

    rerender({ value: 'ab' })
    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(399))
    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(1))
    expect(result.current).toBe('ab')
  })

  it('restarts the delay on every change', () => {
    const { result, rerender } = renderDebounced('a')

    act(() => vi.advanceTimersByTime(300))
    rerender({ value: 'ab' })
    act(() => vi.advanceTimersByTime(300))

    expect(result.current).toBe('a')

    act(() => vi.advanceTimersByTime(100))
    expect(result.current).toBe('ab')
  })

  it('cancels the pending update on unmount', () => {
    const { unmount } = renderDebounced('a')

    expect(vi.getTimerCount()).toBe(1)

    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
