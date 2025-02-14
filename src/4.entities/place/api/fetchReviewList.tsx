import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchReviewListResponse } from '../model/types'

export default async function fetchReviewList(
  placeId: number, page: number, size?: number
): Promise<FetchReviewListResponse> {
  return await apiClient.get({
    endpoint: placeAPI.review(placeId),
    queryParams: { page, size }
  })
}
