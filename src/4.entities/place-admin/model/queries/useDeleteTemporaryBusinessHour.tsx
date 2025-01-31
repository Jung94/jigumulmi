import { useMutation } from '@tanstack/react-query'
import deleteTemporaryBusinessHour from '@/src/4.entities/place-admin/api/deleteTemporaryBusinessHour'

export default function useDeleteTemporaryBusinessHour() {
  return useMutation(deleteTemporaryBusinessHour)
}
