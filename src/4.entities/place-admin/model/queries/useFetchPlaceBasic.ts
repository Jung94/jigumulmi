import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchPlaceBasic from '@/src/4.entities/place-admin/api/fetchPlaceBasic'
import type { FetchPlaceBasicResponse } from '@/src/4.entities/place-admin/model/types'

export default function useFetchPlaceBasic(
  placeId: number
): UseQueryResult<FetchPlaceBasicResponse> {
  return useQuery({
    queryKey: placeQueryKey.basic(placeId),
    queryFn: () => fetchPlaceBasic(placeId),
  })
}
