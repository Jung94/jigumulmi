import { useQuery, UseQueryResult } from '@tanstack/react-query'
import bannerQueryKey from './query-key.constant'
import fetchAssignedPlaceList from '@/src/4.entities/banner-admin/api/fetchAssignedPlaceList'
import type { FetchAssignedPlaceList } from '@/src/4.entities/banner-admin/model/types'

export default function useFetchAssignedPlaceList(
  bannerId: number, queryParams: Record<string, any>
): UseQueryResult<FetchAssignedPlaceList> {
  return useQuery({
    queryKey: bannerQueryKey.placeList(bannerId, queryParams),
    queryFn: () => fetchAssignedPlaceList(bannerId, queryParams),
    enabled: !Number.isNaN(bannerId)
  })
}
