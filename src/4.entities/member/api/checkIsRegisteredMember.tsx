import { apiClient } from '@/src/shared/api/fetch'
import memberAPI from './member.constant'
import type { CheckIsRegisteredMemberVariables } from '../model/types'

export default async function checkIsRegisteredMember(
  body: CheckIsRegisteredMemberVariables
) {
  return await apiClient.post({
    endpoint: `${memberAPI.checkRegisteredUser()}`,
    body
  })
}