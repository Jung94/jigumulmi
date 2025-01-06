import { putAPI } from '@/src/shared/api'
import { bannerAmdinAPI } from './banner.constant'
import type { UpdateBannerVariables } from '../model/types'

export default async function updateBanner({ bannerId, data }: UpdateBannerVariables) {
  const response = await putAPI({
    url: `${bannerAmdinAPI.base}/${bannerId}`,
    body: { title: data.title, isActive: data.isActive }
  })

  if (response.status !== 201) {
    throw new Error(`Error update banner: ${response.statusText}`)
  }

  return response.data
}