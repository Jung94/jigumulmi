import { useMutation } from '@tanstack/react-query'
import updatePlaceList from '@/src/4.entities/banner-admin/api/updatePlaceList'

export default function useUpdatePlaceList() {
  return useMutation(updatePlaceList)
}
