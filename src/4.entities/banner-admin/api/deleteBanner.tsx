import { apiClient } from '@/src/shared/api/fetch'
import { bannerAmdinAPI } from './banner.constant'
import type { DeleteBannerVariables } from '../model/types'

export default async function deleteBanner({ bannerId }: DeleteBannerVariables) {
  return await apiClient.delete({
    endpoint: `${bannerAmdinAPI.deleteBanner(bannerId)}`,
  })
}