import { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router'

export function useQueryParam(key, defaultValue) {
  const [searchParams, setSearchParams] = useSearchParams()
  const value = searchParams.get(key) ?? defaultValue

  const setValue = useCallback(
    (newValue, options) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev)
        if (newValue === null || newValue === undefined || newValue === '') {
          next.delete(key)
        } else {
          next.set(key, newValue)
        }
        return next
      }, options)
    },
    [key, setSearchParams],
  )

  useEffect(() => {
    if (defaultValue && !searchParams.has(key)) {
      setValue(defaultValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, defaultValue])

  return Object.freeze([value, setValue])
}
