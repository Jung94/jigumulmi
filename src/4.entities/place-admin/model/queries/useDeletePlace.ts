import { useMutation } from '@tanstack/react-query'
import deletePlace from '@/src/4.entities/place-admin/api/deletePlace'

export default function useDeletePlace() {
  return useMutation(deletePlace)
}
