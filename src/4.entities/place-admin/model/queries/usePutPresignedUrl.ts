import { useMutation } from '@tanstack/react-query'
import createPresignedUrl from '@/src/4.entities/place-admin/api/createPresignedUrl'

export default function usePutPresignedUrl() {
  return useMutation(createPresignedUrl)
}
