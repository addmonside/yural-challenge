import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { AppError, BusinessAppError } from '../model/errors/app-error'
import { defaultErrorMessage } from '../model/errors/messages'
import { api } from './api'

function mockFetch(body, init) {
  const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(body), init))
  vi.stubGlobal('fetch', fetchMock)
  return fetchMock
}

describe('api.get', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('does not send a body with GET requests', async () => {
    const fetchMock = mockFetch(
      { goods: [] },
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    )

    await api.get('/hsprice/?key=key&number=01089')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api.favorit-parts.ru/hsprice/?key=key&number=01089',
      expect.objectContaining({ body: undefined, method: 'GET' }),
    )
  })

  it('translates a business error from a successful response', async () => {
    mockFetch({ error: 'Empty key!' }, { status: 200 })

    await expect(api.get('/hsprice/')).rejects.toThrow(
      new BusinessAppError('Не указан ключ покупателя'),
    )
  })

  it('translates every error from a list', async () => {
    mockFetch({ error: ['Empty key!', 'Empty number goods!'] }, { status: 200 })

    await expect(api.get('/hsprice/')).rejects.toThrow(
      new BusinessAppError('Не указан ключ покупателя; Не указан номер детали'),
    )
  })

  it('falls back to the default message for an unknown error', async () => {
    mockFetch({ error: 'Something went wrong' }, { status: 200 })

    await expect(api.get('/hsprice/')).rejects.toThrow(new BusinessAppError(defaultErrorMessage))
  })

  it('throws an AppError for an unsuccessful response', async () => {
    mockFetch({}, { status: 500 })

    await expect(api.get('/hsprice/')).rejects.toThrow(AppError)
  })

  it('throws an AppError for a network failure', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')))

    await expect(api.get('/hsprice/')).rejects.toThrow(new AppError(defaultErrorMessage))
  })
})
