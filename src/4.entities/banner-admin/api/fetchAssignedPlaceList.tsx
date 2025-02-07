import { apiClient } from '@/src/shared/api/fetch'
import { bannerAmdinAPI } from './banner.constant'
import type { FetchAssignedPlaceList } from '@/src/4.entities/banner-admin/model/types'

export default async function fetchAssignedPlaceList(
  bannerId: number, queryParams: Record<string, any>
): Promise<FetchAssignedPlaceList> {
  return await apiClient.get({
    endpoint: bannerAmdinAPI.placeList(bannerId),
    queryParams,
  })
}
