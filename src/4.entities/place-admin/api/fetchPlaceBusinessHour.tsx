import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { FetchPlaceBusinessHourResponse } from '../model/types'

export default async function fetchPlaceBusinessHour(
  placeId: number,
  queryParams: Record<string, any>
): Promise<FetchPlaceBusinessHourResponse> {
  return await apiClient.get({
    endpoint: placeAmdinAPI.businessHour(placeId),
    queryParams
  })
}
