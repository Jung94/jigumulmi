import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { FetchPlaceListResponse } from '../model/types'

export default async function fetchPlaceList(
  queryParams: Record<string, any>
): Promise<FetchPlaceListResponse> {
  return await apiClient.get({
    endpoint: placeAmdinAPI.base,
    queryParams,
  })
}
