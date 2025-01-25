import { useMutation } from '@tanstack/react-query'
import updatePlaceBasic from '@/src/4.entities/place-admin/api/updatePlaceBasic'

export default function useUpdatePlaceBasic() {
  return useMutation(updatePlaceBasic)
}
