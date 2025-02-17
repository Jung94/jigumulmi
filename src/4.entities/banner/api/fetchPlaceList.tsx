import { apiClient } from '@/src/shared/api/fetch'
import { bannerAPI } from './banner.constant'
import type { FetchPlaceListResponse } from '../model/types'

export default async function fetchPlaceList(
  bannerId: number, page: number
): Promise<FetchPlaceListResponse> {
  return await apiClient.get({
    endpoint: bannerAPI.placeList(bannerId),
    queryParams: { page }
  })
}
