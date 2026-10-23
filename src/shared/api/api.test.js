import { afterEach, describe, expect, it, vi } from 'vite-plus/test'
import { api } from './api'

describe('api.get', () => {
  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('does not send a body with GET requests', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ goods: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }),
    )
    vi.stubGlobal('fetch', fetchMock)

    await api.get('/hsprice/?key=key&number=01089')

    expect(fetchMock).toHaveBeenCalledWith(
      'http://api.favorit-parts.ru/hs/hsprice/?key=key&number=01089',
      expect.objectContaining({ body: undefined, method: 'GET' }),
    )
  })
})
