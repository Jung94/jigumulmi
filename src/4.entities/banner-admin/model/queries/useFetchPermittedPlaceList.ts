import { useQuery, UseQueryResult } from '@tanstack/react-query'
import fetchPermittedPlaceList from '../../api/fetchPermittedPlaceList'
import bannerQueryKey from './query-key.constant'
import type { FetchPermittedPlaceList } from '../types'

export default function useFetchPermittedPlaceList(
  queryParams: Record<string, any>
): UseQueryResult<FetchPermittedPlaceList> {
  return useQuery({
    queryKey: bannerQueryKey.permittedPlaceList(queryParams),
    queryFn: () => fetchPermittedPlaceList(queryParams),
  })
}
