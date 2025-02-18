import { useMutation } from '@tanstack/react-query'
import checkIsApproved from '../../api/checkIsApproved'

export default function useCheckIsApproved() {
  return useMutation(checkIsApproved)
}
