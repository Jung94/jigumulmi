import { useMutation } from '@tanstack/react-query'
import updatePlaceMenu from '@/src/4.entities/place-admin/api/updatePlaceMenu'

export default function useUpdatePlaceMenu() {
  return useMutation(updatePlaceMenu)
}
