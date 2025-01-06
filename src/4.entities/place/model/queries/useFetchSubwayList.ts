import { useQuery, UseQueryResult } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchSubwayList from '../../api/fetchSubwayList'
import type { FetchSubwayListResponse } from '../types'

export default function useFetchSubwayList(
  queryParams: Record<string, any>
): UseQueryResult<FetchSubwayListResponse> {
  return useQuery({
    queryKey: placeQueryKey.subway(queryParams),
    queryFn: () => fetchSubwayList(queryParams),
  })
}
