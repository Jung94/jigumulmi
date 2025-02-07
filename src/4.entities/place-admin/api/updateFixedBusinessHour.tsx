import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { UpdateTemporaryBusinessHour } from '../model/types'

export default async function updateFixedBusinessHour({ 
  placeId, body 
}: any) {
  return await apiClient.put({
    endpoint: placeAmdinAPI.updateFixedBusinessHour(placeId),
    body
  })
}
