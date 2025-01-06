import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchDistrictList from '@/src/4.entities/place-admin/api/fetchDistrictList'
import type { FetchDistrictListResponse } from '@/src/4.entities/place-admin/model/types'

export default function useFetchDistrictList(
  queryParams: Record<string, any>
): UseQueryResult<FetchDistrictListResponse> {
  return useQuery({
    queryKey: placeQueryKey.district(queryParams),
    queryFn: () => fetchDistrictList(queryParams),
    enabled: !!(queryParams.region)
  })
}
