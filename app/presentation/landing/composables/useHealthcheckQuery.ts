import { useQuery } from '@tanstack/vue-query'
import { useApiClient } from '~/presentation/shared/composables/useApiClient'
import { queryKeys } from '~/constants/query-keys'
import { getHealthcheck } from '../services/healthcheck.service'

export function useHealthcheckQuery() {
    const apiClient = useApiClient()

    return useQuery({
        queryKey: queryKeys.system.healthcheck,
        queryFn: () => getHealthcheck(apiClient),
    })
}
