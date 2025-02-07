import { apiClient } from '@/src/shared/api/fetch'
import { placeAPI } from './place.constant'

export default async function createPresignedUrl(
  body: { fileExtension: string }
) {
  return await apiClient.post({
    endpoint: `${placeAPI.putPresignedUrl}`,
    body
  })
}