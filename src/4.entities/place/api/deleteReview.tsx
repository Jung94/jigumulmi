import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'

export default async function deleteReview(
  reviewId: number
) {
  return await apiClient.delete({
    endpoint: placeAPI.deleteReview(reviewId),
  })
}