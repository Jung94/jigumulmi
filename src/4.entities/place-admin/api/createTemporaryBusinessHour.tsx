import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { CreateTemporaryBusinessHour } from '../model/types'

export default async function createTemporaryBusinessHour({ 
  placeId, body 
}: CreateTemporaryBusinessHour) {
  return await apiClient.post({
    endpoint: placeAmdinAPI.createTemporaryBusinessHour(placeId),
    body
  })
}
