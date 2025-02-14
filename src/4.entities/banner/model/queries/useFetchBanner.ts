import { useQuery, UseQueryResult } from '@tanstack/react-query'
import bannerQueryKey from './query-key.constant'
import fetchBanner from '../../api/fetchBanner'
import type { FetchBannerResponse } from '../types'

export default function useFetchBanner(
  bannerId: number
): UseQueryResult<FetchBannerResponse> {
  return useQuery({
    queryKey: bannerQueryKey.detail(bannerId),
    queryFn: () => fetchBanner(bannerId),
  })
}
