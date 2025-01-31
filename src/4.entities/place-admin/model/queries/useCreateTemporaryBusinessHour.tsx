import { useMutation } from '@tanstack/react-query'
import createTemporaryBusinessHour from '@/src/4.entities/place-admin/api/createTemporaryBusinessHour'

export default function useCreateTemporaryBusinessHour() {
  return useMutation(createTemporaryBusinessHour)
}
