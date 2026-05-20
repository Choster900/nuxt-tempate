export function buildApiBaseUrl(appUrl: string): string {
  if (import.meta.client) {
    return '/api'
  }

  const port = Number(process.env.PORT || 3000)
  const localApiBaseUrl = `http://127.0.0.1:${port}/api`

  if (process.env.NODE_ENV !== 'production') {
    return localApiBaseUrl
  }

  try {
    return new URL('/api', appUrl).toString()
  } catch {
    return localApiBaseUrl
  }
}
