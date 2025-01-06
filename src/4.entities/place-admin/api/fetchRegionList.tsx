import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { FetchRegionListResponse } from '../model/types'

export default async function fetchRegionList(): Promise<FetchRegionListResponse> {
  return await apiClient.get({
    endpoint: placeAmdinAPI.region,
  })
}
