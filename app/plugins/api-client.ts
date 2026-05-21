import { createAxiosClient, buildApiBaseUrl, HTTP_TIMEOUT_MS } from '~/infrastructure/http/axios'

export default defineNuxtPlugin(() => {
    const runtimeConfig = useRuntimeConfig()
    const accessToken = useCookie<string | null>('access_token')

    const apiClient = createAxiosClient({
        baseURL: buildApiBaseUrl(runtimeConfig.public.appUrl),
        timeout: HTTP_TIMEOUT_MS,
        isDev: import.meta.dev,
        getAuthToken: () => accessToken.value,
    })

    return {
        provide: {
            apiClient,
        },
    }
})
