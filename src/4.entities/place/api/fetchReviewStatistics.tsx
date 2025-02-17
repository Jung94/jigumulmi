import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchReviewStatisticsResponse } from '../model/types'

export default async function fetchReviewStatistics(
  placeId: number
): Promise<FetchReviewStatisticsResponse> {
  return await apiClient.get({
    endpoint: placeAPI.reviewStatistics(placeId)
  })
}
