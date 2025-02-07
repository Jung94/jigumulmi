import { useMutation } from '@tanstack/react-query'
import updateFixedBusinessHour from '@/src/4.entities/place-admin/api/updateFixedBusinessHour'

export default function useUpdateFixedBusinessHour() {
  return useMutation(updateFixedBusinessHour)
}
