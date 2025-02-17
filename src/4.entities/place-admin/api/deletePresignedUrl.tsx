import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'

export default async function deletePresignedUrl(
  body: { s3Key: string }
) {
  return await apiClient.post({
    endpoint: `${placeAmdinAPI.deletePresignedUrl}`,
    body
  })
}