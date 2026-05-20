import type { QueryClient } from '@tanstack/vue-query'
import type { AxiosInstance } from 'axios'

declare module '#app' {
  interface NuxtApp {
    $queryClient: QueryClient
    $apiClient: AxiosInstance
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $queryClient: QueryClient
    $apiClient: AxiosInstance
  }
}

export {}
