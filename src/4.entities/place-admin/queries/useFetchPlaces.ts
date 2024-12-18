import { useQuery, UseQueryResult } from '@tanstack/react-query'
import fetchPlaces from '../api/fetchPlaces'
import { PLACE_ADMIN_PATH } from '../api/place.constant'
import type { PlacesResponse } from '../types/PlaceTypes'

export default function useFetchPlaces(queryParams: Record<string, any>): UseQueryResult<PlacesResponse> {
  return useQuery({
    queryKey: [PLACE_ADMIN_PATH, queryParams],
    queryFn: () => fetchPlaces(queryParams),
  })
}
