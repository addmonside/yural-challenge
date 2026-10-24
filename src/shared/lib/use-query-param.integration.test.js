import { createElement } from 'react'
import { act, renderHook } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router'
import { describe, expect, it } from 'vite-plus/test'
import { useQueryParam } from './use-query-param'

function renderQueryParam({ initialEntries = ['/'], defaultValue } = {}) {
  return renderHook(
    () => ({
      param: useQueryParam('search', defaultValue),
      location: useLocation(),
    }),
    {
      wrapper: ({ children }) => createElement(MemoryRouter, { initialEntries }, children),
    },
  )
}

describe('useQueryParam', () => {
  it('reads the value from the url', () => {
    const { result } = renderQueryParam({ initialEntries: ['/?search=123'] })

    expect(result.current.param[0]).toBe('123')
  })

  it('falls back to the default value', () => {
    const { result } = renderQueryParam({ defaultValue: 'fallback' })

    expect(result.current.param[0]).toBe('fallback')
  })

  it('writes the default value into the url on mount when it is missing', () => {
    const { result } = renderQueryParam({ defaultValue: 'fallback' })

    expect(result.current.location.search).toBe('?search=fallback')
  })

  it('does not override an existing url value with the default', () => {
    const { result } = renderQueryParam({
      initialEntries: ['/?search=123'],
      defaultValue: 'fallback',
    })

    expect(result.current.param[0]).toBe('123')
    expect(result.current.location.search).toBe('?search=123')
  })

  it('does not add a query param without a default value', () => {
    const { result } = renderQueryParam()

    expect(result.current.param[0]).toBeUndefined()
    expect(result.current.location.search).toBe('')
  })

  it('updates the value and keeps the other query params', () => {
    const { result } = renderQueryParam({ initialEntries: ['/?search=123&page=2'] })

    act(() => result.current.param[1]('456'))

    expect(result.current.param[0]).toBe('456')
    expect(result.current.location.search).toBe('?search=456&page=2')
  })

  it.each([null, undefined, ''])('removes the query param for %p', (nextValue) => {
    const { result } = renderQueryParam({ initialEntries: ['/?search=123&page=2'] })

    act(() => result.current.param[1](nextValue))

    expect(result.current.param[0]).toBeUndefined()
    expect(result.current.location.search).toBe('?page=2')
  })

  it('supports navigation options', () => {
    const { result } = renderQueryParam({ initialEntries: ['/?search=123'] })

    act(() => result.current.param[1]('456', { replace: true }))

    expect(result.current.location.search).toBe('?search=456')
  })

  it('returns a frozen tuple', () => {
    const { result } = renderQueryParam()

    expect(Object.isFrozen(result.current.param)).toBe(true)
  })
})
