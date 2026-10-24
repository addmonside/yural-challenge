import { AppError, BusinessAppError } from '../model/errors/app-error'
import { getErrorMessage } from '../model/errors/messages'
import { handleBody } from './handle-body'
import { handleHeaders } from './handle-headers'
import { handleUrl } from './handle-url'

export async function api(uri, init) {
  const { url, needAuth } = handleUrl(uri)
  const headers = await handleHeaders(init, needAuth)
  const body = init?.data ? handleBody(init.data) : undefined

  try {
    const res = await fetch(url, {
      ...init,
      body,
      headers,
      signal: init?.signal,
    })

    if (!res.ok) {
      throw new AppError()
    }

    const result = await res.json()

    if (result?.error) {
      const messages = Array.isArray(result.error)
        ? result.error.map(getErrorMessage)
        : [getErrorMessage(result.error)]

      throw new BusinessAppError(messages.join('; '))
    }

    return result
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }

    throw new AppError()
  }
}

api.get = async (uri, init) => api(uri, { ...init, method: 'GET' })
api.post = async (uri, data, init) => api(uri, { ...init, method: 'POST', data })
api.put = async (uri, data, init) => api(uri, { ...init, method: 'PUT', data })
api.patch = async (uri, data, init) => api(uri, { ...init, method: 'PATCH', data })
api.delete = async (uri, data, init) => api(uri, { ...init, method: 'DELETE', data })
