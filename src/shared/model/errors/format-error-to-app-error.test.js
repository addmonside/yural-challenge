import { describe, expect, it } from 'vite-plus/test'
import { AppError } from './app-error'
import { formatErrorToAppError } from './format-error-to-app-error'

describe('formatErrorToAppError', () => {
  it('uses the error field from the response body', async () => {
    const response = new Response(JSON.stringify({ error: 'Invalid access key' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    })

    const error = await formatErrorToAppError(response)

    expect(error).toBeInstanceOf(AppError)
    expect(error.message).toBe('Invalid access key')
    expect(error.status).toBe(403)
  })
})
