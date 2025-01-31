import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchPlaceImage from '@/src/4.entities/place-admin/api/fetchPlaceImage'
import type { FetchPlaceImageResponse } from '@/src/4.entities/place-admin/model/types'

export default function useFetchPlaceImage(
  placeId: number
): UseQueryResult<FetchPlaceImageResponse> {
  return useQuery({
    queryKey: placeQueryKey.image(placeId),
    queryFn: () => fetchPlaceImage(placeId),
  })
}
