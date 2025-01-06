import { apiClient } from '@/src/shared/api/fetch'
import { bannerAmdinAPI } from './banner.constant'
import type { FetchBannerResponse } from '../model/types'

export default async function fetchBanner(bannerId: number): Promise<FetchBannerResponse> {
  return await apiClient.get({
    endpoint: `${bannerAmdinAPI.base}/${bannerId}`
  })
}
