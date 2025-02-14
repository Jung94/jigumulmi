import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchPlaceBasicResponse } from '../model/types'

export default async function fetchPlaceBasic(
  placeId: number
): Promise<FetchPlaceBasicResponse> {
  return await apiClient.get({
    endpoint: placeAPI.basic(placeId)
  })
}
