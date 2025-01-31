import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { UpdatePlaceImageListVariables } from '../model/types'

export default async function updatePlaceImage(
  { placeId, data }: UpdatePlaceImageListVariables
) {
  return await apiClient.put({
    endpoint: `${placeAmdinAPI.image(placeId)}`,
    body: data
  })
}