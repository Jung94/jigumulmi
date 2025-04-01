import { useMutation } from '@tanstack/react-query'
import checkIsRegisteredMember from '../../api/checkIsRegisteredMember'

export default function useCheckIsRegisteredMember() {
  return useMutation(checkIsRegisteredMember)
}
