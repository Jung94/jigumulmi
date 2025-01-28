import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { UpdatePlaceMenuVariables } from '../model/types'

export default async function updatePlaceMenu(
  { placeId, data }: UpdatePlaceMenuVariables
) {
  return await apiClient.put({
    endpoint: `${placeAmdinAPI.menu(placeId)}`,
    body: data
  })
}