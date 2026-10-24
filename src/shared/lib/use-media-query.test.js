// @vitest-environment jsdom
import { createElement } from 'react'
import { act, cleanup, renderHook } from '@testing-library/react'
import { renderToStaticMarkup } from 'react-dom/server'
import { afterEach, vi } from 'vite-plus/test'
import { describe, expect, it } from 'vite-plus/test'
import { useMediaQuery } from './use-media-query'

function createMediaQueryList(matches = false) {
  const listeners = new Set()

  return {
    matches,
    addEventListener: vi.fn((type, listener) => listeners.add(listener)),
    removeEventListener: vi.fn((type, listener) => listeners.delete(listener)),
    emitChange(nextMatches) {
      this.matches = nextMatches
      listeners.forEach((listener) => listener())
    },
    get listenerCount() {
      return listeners.size
    },
  }
}

function setupMatchMedia() {
  const lists = new Map()
  const getMediaQueryList = (query) => {
    if (!lists.has(query)) {
      lists.set(query, createMediaQueryList())
    }
    return lists.get(query)
  }
  const matchMedia = vi.fn(getMediaQueryList)

  vi.stubGlobal('matchMedia', matchMedia)

  return {
    matchMedia,
    list: getMediaQueryList,
  }
}

describe('useMediaQuery', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('returns the current match state', () => {
    const { list } = setupMatchMedia()
    list('(max-width: 767px)').matches = true

    const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'))

    expect(result.current).toBe(true)
  })

  it('returns false when the query does not match', () => {
    setupMatchMedia()

    const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'))

    expect(result.current).toBe(false)
  })

  it('updates when the media query state changes', () => {
    const { list } = setupMatchMedia()
    const { result } = renderHook(() => useMediaQuery('(max-width: 767px)'))
    const mediaQueryList = list('(max-width: 767px)')

    act(() => mediaQueryList.emitChange(true))
    expect(result.current).toBe(true)

    act(() => mediaQueryList.emitChange(false))
    expect(result.current).toBe(false)
  })

  it('subscribes to the change event and unsubscribes on unmount', () => {
    const { list } = setupMatchMedia()
    const { unmount } = renderHook(() => useMediaQuery('(max-width: 767px)'))
    const mediaQueryList = list('(max-width: 767px)')

    expect(mediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(mediaQueryList.listenerCount).toBe(1)

    unmount()

    expect(mediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    expect(mediaQueryList.listenerCount).toBe(0)
  })

  it('resubscribes when the query changes', () => {
    const { matchMedia, list } = setupMatchMedia()
    const { result, rerender } = renderHook(({ query }) => useMediaQuery(query), {
      initialProps: { query: '(max-width: 767px)' },
    })

    list('(max-width: 767px)').matches = false
    list('(max-width: 1023px)').matches = true

    rerender({ query: '(max-width: 1023px)' })

    expect(matchMedia).toHaveBeenCalledWith('(max-width: 1023px)')
    expect(list('(max-width: 767px)').listenerCount).toBe(0)
    expect(list('(max-width: 1023px)').listenerCount).toBe(1)
    expect(result.current).toBe(true)
  })

  it('uses the provided value during server rendering', () => {
    setupMatchMedia()

    const html = renderToStaticMarkup(
      createElement(MediaQueryProbe, { query: '(max-width: 767px)', defaultValue: 'fallback' }),
    )

    expect(html).toBe('<span>fallback</span>')
  })
})

function MediaQueryProbe({ query, defaultValue }) {
  return createElement('span', null, String(useMediaQuery(query, defaultValue)))
}
