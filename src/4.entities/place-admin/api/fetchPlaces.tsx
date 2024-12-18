import { getAPI } from '@/src/shared/api'
import { PLACE_ADMIN_PATH } from './place.constant'
import type { PlacesResponse } from '../types/PlaceTypes'

export default async function fetchPlaces(queryParams: Record<string, any>): Promise<PlacesResponse> {
  const response = await getAPI({
    url: PLACE_ADMIN_PATH,
    params: queryParams
  })

  if (response.status !== 200) {
    throw new Error(`Error fetching place list: ${response.statusText}`)
  }

  return response.data
}
