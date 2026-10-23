export const appConfig = {
  API_BASE_URL: import.meta.env.VITE_API_URL ?? '',
  DEVTOOLS_ENABLED:
    import.meta.env.VITE_ENV === 'localhost' || import.meta.env.VITE_ENV === 'development',
}
