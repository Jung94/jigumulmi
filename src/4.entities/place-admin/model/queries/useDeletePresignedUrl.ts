import { useMutation } from '@tanstack/react-query'
import deletePresignedUrl from '@/src/4.entities/place-admin/api/deletePresignedUrl'

export default function useDeletePresignedUrl() {
  return useMutation(deletePresignedUrl)
}
