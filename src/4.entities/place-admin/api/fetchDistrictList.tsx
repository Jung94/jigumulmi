import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { FetchDistrictListResponse } from '../model/types'

export default async function fetchDistrictList(
  queryParams: Record<string, any>
): Promise<FetchDistrictListResponse> {
  return await apiClient.get({
    endpoint: placeAmdinAPI.district,
    queryParams,
  })
}
