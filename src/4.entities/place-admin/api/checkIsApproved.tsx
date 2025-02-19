import { apiClient } from '@/src/shared/api/fetch'
import { placeAmdinAPI } from './place.constant'
import type { UpdateIsApprovalRequest } from '../model/types'

export default async function checkIsApproved({
  placeId,
  body
}: UpdateIsApprovalRequest) {
  return await apiClient.post({
    endpoint: placeAmdinAPI.checkIsApproved(placeId),
    body
  })
}
