import { useQuery, UseQueryResult } from '@tanstack/react-query'
import bannerQueryKey from './query-key.constant'
import fetchBannerList from '../../api/fetchBannerList'
import type { FetchBannerListResponse } from '../types'

export default function useFetchBannerList(): UseQueryResult<FetchBannerListResponse> {
  return useQuery({
    queryKey: bannerQueryKey.list(),
    queryFn: fetchBannerList,
  })
}
