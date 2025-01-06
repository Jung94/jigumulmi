import { useMutation } from '@tanstack/react-query'
import updateBannerInnerImage from '../../api/updateBannerInnerImage'

export default function useUpdateBannerInnerImage() {
  return useMutation(updateBannerInnerImage)
}
