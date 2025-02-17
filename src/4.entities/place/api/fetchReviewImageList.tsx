import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchReviewImageListResponse } from '../model/types'

export default async function fetchReviewImageList(
  placeId: number, page: number, size?: number
): Promise<FetchReviewImageListResponse> {
  return await apiClient.get({
    endpoint: placeAPI.reviewImage(placeId),
    queryParams: { page, size }
  })
}
