import memberAPI from './member.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchMemberListResponse } from '../model/types'

export default async function fetchMemberList(
  queryParams: Record<string, any>
): Promise<FetchMemberListResponse> {
  return await apiClient.get({
    endpoint: memberAPI.base(),
    queryParams
  })
}
