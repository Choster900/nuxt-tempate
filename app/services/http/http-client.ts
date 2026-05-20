import { ofetch } from 'ofetch'

export const httpClient = ofetch.create({
  retry: 1,
  timeout: 10_000,
})
