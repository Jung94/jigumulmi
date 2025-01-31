import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { UpdateTemporaryBusinessHour } from '../model/types'

export default async function updateTemporaryBusinessHour({ 
  placeId, temporaryBusinessHourId, body 
}: UpdateTemporaryBusinessHour) {
  return await apiClient.put({
    endpoint: placeAmdinAPI.updateTemporaryBusinessHour(placeId, temporaryBusinessHourId),
    body
  })
}
