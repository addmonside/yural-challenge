/**
 * Обрабатывает тело запроса для HTTP-запросов
 *
 * @param data - Данные для отправки в теле запроса
 * @returns Обработанное тело запроса или undefined
 *
 * Функция обрабатывает различные типы данных:
 * - Если данные отсутствуют, возвращает undefined
 * - Если данные являются экземпляром FormData, возвращает их без изменений
 * - Если данные являются объектом, преобразует их в JSON-строку
 * - В остальных случаях возвращает undefined
 */
export function handleBody(data) {
  if (data instanceof FormData) {
    return data
  } else if (typeof data === 'object') {
    return JSON.stringify(data)
  }

  return undefined
}
