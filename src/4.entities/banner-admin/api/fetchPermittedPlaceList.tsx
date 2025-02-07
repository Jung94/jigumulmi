import { apiClient } from '@/src/shared/api/fetch'
import { bannerAmdinAPI } from './banner.constant'
import type { FetchPermittedPlaceList } from '../model/types'

export default async function fetchPermittedPlaceList(
  queryParams: Record<string, any>
): Promise<FetchPermittedPlaceList> {
  return await apiClient.get({
    endpoint: bannerAmdinAPI.parmittedPlaceList,
    queryParams,
  })
}
