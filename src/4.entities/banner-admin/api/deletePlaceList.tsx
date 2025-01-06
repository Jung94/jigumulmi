import { apiClient } from '@/src/shared/api/fetch'
import { bannerAmdinAPI } from './banner.constant'
import type { DeletePlaceListVariables } from '../model/types'

export default async function deletePlaceList({ bannerId, data }: DeletePlaceListVariables) {
  return await apiClient.delete({
    endpoint: `${bannerAmdinAPI.placeList(bannerId)}`,
    body: { placeIdList: data.placeIdList }
  })
}