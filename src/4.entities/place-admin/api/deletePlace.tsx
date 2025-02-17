import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'

export default async function deletePlace(placeId: number) {
  return await apiClient.delete({
    endpoint: `${placeAmdinAPI.deletePlace(placeId)}`,
  })
}