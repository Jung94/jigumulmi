import { useQuery, UseQueryResult } from '@tanstack/react-query'
import memberQueryKey from './query-key.constant'
import fetchMemberList from '../../api/fetchMemberList'
import type { FetchMemberListResponse } from '../types'

export default function useFetchMemberList(
  queryParams: Record<string, any>
): UseQueryResult<FetchMemberListResponse> {
  return useQuery({
    queryKey: memberQueryKey.list(queryParams),
    queryFn: () => fetchMemberList(queryParams),
  })
}
