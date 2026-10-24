import { useMediaQuery } from './use-media-query'

const DEFAULT_MOBILE_BREAKPOINT = 1024

export function useIsMobile(breakpoint = DEFAULT_MOBILE_BREAKPOINT) {
  return useMediaQuery(`(max-width: ${breakpoint - 1}px)`)
}
