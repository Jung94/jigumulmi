import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchPlaceList from '@/src/4.entities/place-admin/api/fetchPlaceList'
import type { FetchPlaceListResponse } from '@/src/4.entities/place-admin/model/types'

export default function useFetchPlaceList(
  queryParams: Record<string, any>
): UseQueryResult<FetchPlaceListResponse> {
  return useQuery({
    queryKey: placeQueryKey.list(queryParams),
    queryFn: () => fetchPlaceList(queryParams),
  })
}
