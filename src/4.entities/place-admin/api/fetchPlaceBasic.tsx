import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { FetchPlaceBasicResponse } from '../model/types'

export default async function fetchPlaceBasic(
  placeId: number
): Promise<FetchPlaceBasicResponse> {
  return await apiClient.get({
    endpoint: placeAmdinAPI.basic(placeId)
  })
}
