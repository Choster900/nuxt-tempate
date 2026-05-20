import { httpClient } from '@services/http/http-client'

export function useApiClient() {
  return {
    get: httpClient.get,
    post: httpClient.post,
    put: httpClient.put,
    patch: httpClient.patch,
    delete: httpClient.delete,
  }
}
