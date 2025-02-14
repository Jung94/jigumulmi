import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchReviewList from '../../api/fetchReviewList'
import type { FetchReviewListResponse } from '../types'

export default function useFetchReviewList(
  placeId: number,
  hasReview: boolean,
  queryParams?: Record<string, any>
): UseInfiniteQueryResult<FetchReviewListResponse> {
  return useInfiniteQuery({
    queryKey: placeQueryKey.review(placeId, queryParams),
    queryFn: ({ pageParam = 1 }) => fetchReviewList(placeId, pageParam, queryParams?.size),
    getNextPageParam: (lastPage) => 
      lastPage.page.currentPage < lastPage.page.totalPage 
        ? lastPage.page.currentPage + 1 
        : undefined,
    enabled: hasReview
  })
}