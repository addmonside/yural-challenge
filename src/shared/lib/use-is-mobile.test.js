// @vitest-environment jsdom
import { cleanup, renderHook } from '@testing-library/react'
import { afterEach, vi } from 'vite-plus/test'
import { describe, expect, it } from 'vite-plus/test'
import { useIsMobile } from './use-is-mobile'

function setupMatchMedia(matches = false) {
  const matchMedia = vi.fn(() => ({
    matches,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }))

  vi.stubGlobal('matchMedia', matchMedia)

  return matchMedia
}

describe('useIsMobile', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

  it('returns true on a mobile viewport', () => {
    setupMatchMedia(true)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('returns false on a desktop viewport', () => {
    setupMatchMedia(false)

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it('uses the default 1024px breakpoint', () => {
    const matchMedia = setupMatchMedia()

    renderHook(() => useIsMobile())

    expect(matchMedia).toHaveBeenCalledWith('(max-width: 1023px)')
  })

  it('accepts a custom breakpoint', () => {
    const matchMedia = setupMatchMedia()

    renderHook(() => useIsMobile(768))

    expect(matchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })
})
