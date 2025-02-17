import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchReviewStatistics from '../../api/fetchReviewStatistics'
import type { FetchReviewStatisticsResponse } from '../types'

export default function useFetchReviewStatistics(
  placeId: number
): UseQueryResult<FetchReviewStatisticsResponse> {
  return useQuery({
    queryKey: placeQueryKey.reviewStatistics(placeId),
    queryFn: () => fetchReviewStatistics(placeId),
  })
}
