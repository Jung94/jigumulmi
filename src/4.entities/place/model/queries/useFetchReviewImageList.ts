import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchReviewImageList from '../../api/fetchReviewImageList'
import type { FetchReviewImageListResponse } from '../types'

export default function useFetchReviewImageList(
  placeId: number,
  hasReview: boolean,
  queryParams?: Record<string, any>
): UseInfiniteQueryResult<FetchReviewImageListResponse> {
  return useInfiniteQuery({
    queryKey: placeQueryKey.reviewImage(placeId, queryParams),
    queryFn: ({ pageParam = 1 }) => fetchReviewImageList(placeId, pageParam, queryParams?.size),
    getNextPageParam: (lastPage) => 
      lastPage.page.currentPage < lastPage.page.totalPage 
        ? lastPage.page.currentPage + 1 
        : undefined,
    enabled: hasReview
  })
}