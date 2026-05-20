import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

export function createDevRequestLoggerInterceptor(isDev: boolean) {
  return (config: InternalAxiosRequestConfig) => {
    if (isDev) {
      console.info(`[HTTP_REQUEST] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`)
    }

    return config
  }
}

export function createDevResponseLoggerInterceptor(isDev: boolean) {
  return (response: AxiosResponse) => {
    if (isDev) {
      console.info(`[HTTP_RESPONSE] ${response.status} ${response.config.url}`)
    }

    return response
  }
}
