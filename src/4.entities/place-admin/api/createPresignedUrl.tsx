import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'

export default async function createPresignedUrl(
  body: { fileExtension: string }
) {
  return await apiClient.post({
    endpoint: `${placeAmdinAPI.putPresignedUrl}`,
    body
  })
}