import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { UpdatePlaceBasicVariables } from '../model/types'

export default async function updatePlaceBasic({ 
  placeId, data 
}: UpdatePlaceBasicVariables) {
  return await apiClient.put({
    endpoint: `${placeAmdinAPI.basic(placeId)}`,
    body: data
  })
}