import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { DeleteTemporaryBusinessHour } from '../model/types'

export default async function deleteTemporaryBusinessHour({ 
  placeId, temporaryBusinessHourId 
}: DeleteTemporaryBusinessHour) {
  return await apiClient.delete({
    endpoint: placeAmdinAPI.updateTemporaryBusinessHour(placeId, temporaryBusinessHourId),
  })
}
