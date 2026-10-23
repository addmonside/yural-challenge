export const apiErrorCodes = Object.freeze({
  BAD_REQUEST: 'BAD_REQUEST',
  BUSINESS_ERROR: 'BUSINESS_ERROR',
  EMPTY_BODY: 'EMPTY_BODY',
  FORBIDDEN: 'FORBIDDEN',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
})

export const apiMessages = Object.freeze({
  [apiErrorCodes.BAD_REQUEST]: 'Тело запроса повреждено или имеет ошибки',
  [apiErrorCodes.EMPTY_BODY]: 'Тело запроса не должно быть пустым',
  [apiErrorCodes.FORBIDDEN]: 'Доступ запрещен',
  [apiErrorCodes.INTERNAL_ERROR]: 'Внутренняя ошибка сервера',
  [apiErrorCodes.NOT_FOUND]: 'Запись не найдена',
  [apiErrorCodes.UNAUTHORIZED]: 'Не авторизован',
  [apiErrorCodes.VALIDATION_ERROR]: 'Ошибка валидации данных',
})
