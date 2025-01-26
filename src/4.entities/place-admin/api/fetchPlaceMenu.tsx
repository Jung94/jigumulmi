import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { FetchPlaceMenuResponse } from '../model/types'

export default async function fetchPlaceMenu(
  placeId: number
): Promise<FetchPlaceMenuResponse> {
  return await apiClient.get({
    endpoint: placeAmdinAPI.menu(placeId)
  })
}
