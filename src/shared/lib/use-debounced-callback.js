import { useCallback, useEffect, useMemo, useRef } from 'react'

export function useDebouncedCallback(fn, delay = 400) {
  const fnRef = useRef(fn)
  const timerRef = useRef()

  useEffect(() => {
    fnRef.current = fn
  }, [fn])

  const cancel = useCallback(() => clearTimeout(timerRef.current), [])

  useEffect(() => cancel, [cancel])

  return useMemo(() => {
    const debounced = (...args) => {
      clearTimeout(timerRef.current)
      timerRef.current = setTimeout(() => fnRef.current(...args), delay)
    }
    debounced.cancel = cancel
    return debounced
  }, [delay, cancel])
}
