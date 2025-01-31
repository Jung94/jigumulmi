import { useMutation } from '@tanstack/react-query'
import updateTemporaryBusinessHour from '@/src/4.entities/place-admin/api/updateTemporaryBusinessHour'

export default function useUpdateTemporaryBusinessHour() {
  return useMutation(updateTemporaryBusinessHour)
}
