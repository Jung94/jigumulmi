import { useQuery, UseQueryResult } from '@tanstack/react-query'
import memberQueryKey from './query-key.constant'
import fetchMember from '../../api/fetchMember'
import type { FetchMemberResponse } from '../types'

export default function useFetchMember(): UseQueryResult<FetchMemberResponse> {
  return useQuery({
    queryKey: memberQueryKey.base(),
    queryFn: () => fetchMember(),
  })
}
