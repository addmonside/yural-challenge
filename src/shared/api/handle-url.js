import { appConfig } from '../model/app-config'
import { endpoints } from '../model/endpoints'

const ABSOLUTE_URL_MASK = /^[a-z][a-z\d+\-.]*:\/\//i

/**
 * Формирует полный URL для API запроса.
 * @param uri - URI строка, которая может начинаться с "/" или без него
 * @returns Объект с полным URL и флагом необходимости аутентификации
 */
export function handleUrl(uri) {
  if (ABSOLUTE_URL_MASK.test(uri)) {
    return { url: uri, needAuth: false }
  }

  const base = appConfig.API_BASE_URL.replace(/\/+$/, '')
  const path = uri.replace(/^\/+/, '')
  const url = `${base}/${path}`
  const needAuth = endpoints.isPrivate?.(uri) ?? false

  return { url, needAuth }
}
