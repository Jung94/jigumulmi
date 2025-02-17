import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import bannerQueryKey from './query-key.constant'
import fetchPlaceList from '../../api/fetchPlaceList'
import type { FetchPlaceListResponse } from '../types'

export default function useFetchPlaceList(
  bannerId: number
): UseInfiniteQueryResult<FetchPlaceListResponse> {
  return useInfiniteQuery({
    queryKey: bannerQueryKey.placeList(bannerId),
    queryFn: ({ pageParam = 1 }) => fetchPlaceList(bannerId, pageParam),
    getNextPageParam: (lastPage) => 
      lastPage.page.currentPage < lastPage.page.totalPage 
        ? lastPage.page.currentPage + 1 
        : undefined,
  })
}
