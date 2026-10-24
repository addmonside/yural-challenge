// @vitest-environment jsdom
import { act, cleanup, renderHook } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'
import { useDebouncedCallback } from './use-debounced-callback'

function renderDebounced(fn, delay) {
  return renderHook(({ fn: nextFn }) => useDebouncedCallback(nextFn, delay), {
    initialProps: { fn },
  })
}

describe('useDebouncedCallback', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
    vi.useRealTimers()
  })

  it('does not call the callback before the delay', () => {
    const fn = vi.fn()
    const { result } = renderDebounced(fn, 400)

    act(() => result.current())
    act(() => vi.advanceTimersByTime(399))

    expect(fn).not.toHaveBeenCalled()
  })

  it('calls the callback once after the default delay', () => {
    const fn = vi.fn()
    const { result } = renderDebounced(fn)

    act(() => result.current())
    act(() => vi.advanceTimersByTime(400))

    expect(fn).toHaveBeenCalledTimes(1)
  })

  it('restarts the delay on every call', () => {
    const fn = vi.fn()
    const { result } = renderDebounced(fn, 400)

    act(() => result.current('first'))
    act(() => vi.advanceTimersByTime(300))
    act(() => result.current('second'))
    act(() => vi.advanceTimersByTime(300))

    expect(fn).not.toHaveBeenCalled()

    act(() => vi.advanceTimersByTime(100))

    expect(fn).toHaveBeenCalledTimes(1)
    expect(fn).toHaveBeenCalledWith('second')
  })

  it('always calls the latest provided function', () => {
    const firstFn = vi.fn()
    const secondFn = vi.fn()
    const { result, rerender } = renderDebounced(firstFn, 400)

    act(() => result.current('value'))
    rerender({ fn: secondFn })
    act(() => vi.advanceTimersByTime(400))

    expect(firstFn).not.toHaveBeenCalled()
    expect(secondFn).toHaveBeenCalledWith('value')
  })

  it('cancels a pending call', () => {
    const fn = vi.fn()
    const { result } = renderDebounced(fn, 400)

    act(() => result.current())
    act(() => result.current.cancel())
    act(() => vi.advanceTimersByTime(400))

    expect(fn).not.toHaveBeenCalled()
  })

  it('cancels a pending call on unmount', () => {
    const fn = vi.fn()
    const { result, unmount } = renderDebounced(fn, 400)

    act(() => result.current())
    expect(vi.getTimerCount()).toBe(1)

    unmount()

    expect(vi.getTimerCount()).toBe(0)
  })
})
