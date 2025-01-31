import { apiClient } from '@/src/shared/api/fetch'
import { placeAPI } from './place.constant'

export default async function deletePresignedUrl(
  body: { s3Key: string }
) {
  return await apiClient.post({
    endpoint: `${placeAPI.deletePresignedUrl}`,
    body
  })
}