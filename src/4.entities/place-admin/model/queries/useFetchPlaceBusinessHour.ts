import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchPlaceBusinessHour from '@/src/4.entities/place-admin/api/fetchPlaceBusinessHour'
import type { FetchPlaceBusinessHourResponse } from '@/src/4.entities/place-admin/model/types'

export default function useFetchPlaceBusinessHour(
  placeId: number,
  queryParams: Record<string, any>
): UseQueryResult<FetchPlaceBusinessHourResponse> {
  return useQuery({
    queryKey: placeQueryKey.businessHour(placeId, queryParams),
    queryFn: () => fetchPlaceBusinessHour(placeId, queryParams),
  })
}
