import { formatErrorToAppError } from '../model/errors/format-error-to-app-error'
import { handleBody } from './handle-body'
import { handleHeaders } from './handle-headers'
import { handleUrl } from './handle-url'

export async function api(uri, init) {
  const { url, needAuth } = handleUrl(uri)
  const headers = await handleHeaders(init, needAuth)
  const body = init?.data ? handleBody(init.data) : undefined

  const res = await fetch(url, {
    ...init,
    body,
    headers,
    signal: init?.signal,
  })

  if (!res.ok) {
    throw await formatErrorToAppError(res)
  }

  const result = await res.json()
  return result
}

api.get = async (uri, init) => api(uri, { ...init, method: 'GET' })
api.post = async (uri, data, init) => api(uri, { ...init, method: 'POST', data })
api.put = async (uri, data, init) => api(uri, { ...init, method: 'PUT', data })
api.patch = async (uri, data, init) => api(uri, { ...init, method: 'PATCH', data })
api.delete = async (uri, data, init) => api(uri, { ...init, method: 'DELETE', data })
