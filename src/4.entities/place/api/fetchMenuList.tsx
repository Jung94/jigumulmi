import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchMenuListResponse } from '../model/types'

export default async function fetchMenuList(
  placeId: number, page: number, size?: number
): Promise<FetchMenuListResponse> {
  return await apiClient.get({
    endpoint: placeAPI.menu(placeId),
    queryParams: { page, size }
  })
}
