import { getAPI } from '@/src/shared/api'
import { BANNER_ADMIN_PATH } from './banner.constant'

export default async function fetchBanners() {
  const response = await getAPI({
    url: BANNER_ADMIN_PATH
  })

  if (response.status !== 200) {
    throw new Error(`Error fetching banner list: ${response.statusText}`)
  }

  return response.data
}
