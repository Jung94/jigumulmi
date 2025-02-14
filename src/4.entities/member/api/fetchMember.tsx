import memberAPI from './member.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { FetchMemberResponse } from '../model/types'

export default async function fetchMember(): Promise<FetchMemberResponse> {
  return await apiClient.get({
    endpoint: memberAPI.base()
  })
}
