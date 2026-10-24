import * as React from 'react'

/**
 * Подписывается на произвольный media query.
 * @param query        например "(max-width: 767px)" или "(prefers-color-scheme: dark)"
 * @param defaultValue значение на сервере (SSR) и при первом рендере до гидратации
 */
export function useMediaQuery(query, defaultValue) {
  const subscribe = React.useCallback(
    (onChange) => {
      const mql = globalThis.matchMedia(query)
      mql.addEventListener('change', onChange)
      return () => mql.removeEventListener('change', onChange)
    },
    [query],
  )

  const getSnapshot = () => globalThis.matchMedia(query).matches
  const getServerSnapshot = () => defaultValue

  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
