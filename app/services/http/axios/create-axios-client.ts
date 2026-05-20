import axios from 'axios'
import { HTTP_TIMEOUT_MS } from './constants/http.constants'
import type { HttpClientContext } from './interfaces/http-client-context.interface'
import { registerAxiosInterceptors } from './interceptors/register-axios-interceptors'

export function createAxiosClient(context: HttpClientContext) {
  const client = axios.create({
    baseURL: context.baseURL,
    timeout: context.timeout || HTTP_TIMEOUT_MS,
  })

  registerAxiosInterceptors(client, context)
  return client
}
