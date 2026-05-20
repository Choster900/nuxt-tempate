export function buildApiBaseUrl(appUrl: string): string {
  if (import.meta.client) {
    return '/api'
  }

  try {
    return new URL('/api', appUrl).toString()
  } catch {
    return 'http://localhost:3000/api'
  }
}
