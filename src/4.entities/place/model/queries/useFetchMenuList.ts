import { useInfiniteQuery, UseInfiniteQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchMenuList from '../../api/fetchMenuList'
import type { FetchMenuListResponse } from '../types'

export default function useFetchMenuList(
  placeId: number,
  queryParams?: Record<string, any>
): UseInfiniteQueryResult<FetchMenuListResponse> {
  return useInfiniteQuery({
    queryKey: placeQueryKey.menu(placeId, queryParams),
    queryFn: ({ pageParam = 1 }) => fetchMenuList(placeId, pageParam, queryParams?.size),
    getNextPageParam: (lastPage) => 
      lastPage.page.currentPage < lastPage.page.totalPage 
        ? lastPage.page.currentPage + 1 
        : undefined,
  })
}