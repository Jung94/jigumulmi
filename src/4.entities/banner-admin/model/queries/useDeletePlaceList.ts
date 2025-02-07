import { useMutation } from '@tanstack/react-query'
import deletePlaceList from '@/src/4.entities/banner-admin/api/deletePlaceList'

export default function useDeletePlaceList() {
  return useMutation(deletePlaceList)
}
