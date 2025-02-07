import { apiClient } from '@/src/shared/api/fetch'
import { bannerAmdinAPI } from './banner.constant'
import type { UpdatePlaceListVariables } from '../model/types'

export default async function updatePlaceList({ bannerId, data }: UpdatePlaceListVariables) {
  return await apiClient.post({
    endpoint: `${bannerAmdinAPI.placeList(bannerId)}`,
    body: { placeIdList: data.placeIdList }
  })
}