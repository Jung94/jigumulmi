import { useMutation } from '@tanstack/react-query'
import updateBannerOuterImage from '../../api/updateBannerOuterImage'

export default function useUpdateBannerOuterImage() {
  return useMutation(updateBannerOuterImage)
}
