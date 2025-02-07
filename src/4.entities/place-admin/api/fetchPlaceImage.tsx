import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { FetchPlaceImageResponse } from '../model/types'

export default async function fetchPlaceImage(
  placeId: number
): Promise<FetchPlaceImageResponse> {
  return await apiClient.get({
    endpoint: placeAmdinAPI.image(placeId)
  })
}
