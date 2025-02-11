import { apiClient } from '@/src/shared/api/fetch'
import { bannerAPI } from './banner.constant'
import type { FetchBannerListResponse } from '../model/types'

export default async function fetchBannerList(): Promise<FetchBannerListResponse> {
  return await apiClient.get({
    endpoint: bannerAPI.list
  })
}
