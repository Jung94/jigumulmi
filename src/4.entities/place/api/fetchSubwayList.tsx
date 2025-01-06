import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchSubwayListResponse } from '../model/types'

export default async function fetchSubwayList(
  queryParams: Record<string, any>
): Promise<FetchSubwayListResponse> {
  return await apiClient.get({
    endpoint: placeAPI.subway,
    queryParams,
  })
}
