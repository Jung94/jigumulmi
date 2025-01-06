import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { bannerAmdinAPI } from '../../api/banner.constant'
import fetchBannerList from '../../api/fetchBannerList'
import type { FetchBannersResponse } from '../types'

export default function useFetchBannerList(): UseQueryResult<FetchBannersResponse> {
  return useQuery({
    queryKey: [bannerAmdinAPI.base],
    queryFn: fetchBannerList,
  })
}
