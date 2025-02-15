import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'

export default async function createPresignedUrl(
  body: { placeId: number }
) {
  return await apiClient.post({
    endpoint: `${placeAmdinAPI.putPresignedUrl}`,
    body
  })
}