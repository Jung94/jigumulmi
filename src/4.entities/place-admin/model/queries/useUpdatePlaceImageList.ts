import { useMutation } from '@tanstack/react-query'
import updatePlaceImage from '@/src/4.entities/place-admin/api/updatePlaceImage'

export default function useUpdatePlaceImageList() {
  return useMutation(updatePlaceImage)
}
