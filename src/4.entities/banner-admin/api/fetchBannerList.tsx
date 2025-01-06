import { apiClient } from '@/src/shared/api/fetch'
import { bannerAmdinAPI } from './banner.constant'

export default async function fetchBannerList() {
  return await apiClient.get({
    endpoint: bannerAmdinAPI.base
  })
}
