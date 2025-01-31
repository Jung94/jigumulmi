import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchPlaceMenu from '@/src/4.entities/place-admin/api/fetchPlaceMenu'
import type { FetchPlaceMenuResponse } from '@/src/4.entities/place-admin/model/types'

export default function useFetchPlaceMenu(
  placeId: number
): UseQueryResult<FetchPlaceMenuResponse> {
  return useQuery({
    queryKey: placeQueryKey.menu(placeId),
    queryFn: () => fetchPlaceMenu(placeId),
  })
}
