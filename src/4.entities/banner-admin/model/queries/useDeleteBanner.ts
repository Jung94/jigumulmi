import { useMutation } from '@tanstack/react-query'
import deleteBanner from '@/src/4.entities/banner-admin/api/deleteBanner'

export default function useDeleteBanner() {
  return useMutation(deleteBanner)
}
