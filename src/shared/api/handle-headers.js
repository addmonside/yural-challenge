/**
 * Функция обрабатки заголовки HTTP-запроса
 *
 * @template Data - Тип данных, передаваемых в запросе
 * @param init - Объект инициализации запроса, содержащий заголовки и данные
 * @returns Promise<Record<string, string>> - Объект с обработанными заголовками
 *
 * @description
 * Функция выполняет следующие операции:
 * - Преобразует заголовки из объекта Headers в обычный объект
 * - Проверяет необходимость аутентификации для эндпоинта
 * - Автоматически устанавливает Content-Type в "application/json" при наличии данных объектного типа
 */
export async function handleHeaders(init) {
  const headers =
    init?.headers instanceof Headers
      ? Object.fromEntries(init.headers.entries())
      : { ...init?.headers }

  const data = init?.data

  if (init && data && typeof data === 'object') {
    headers['Content-Type'] = 'application/json'
  }

  // ! при наличии, добавляем ключ аутентификации

  return headers
}
