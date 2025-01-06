import { putAPI } from '@/src/shared/api'
import { bannerAmdinAPI } from './banner.constant'
import type { UpdateBannerOuterImageVariables } from '../model/types'

const createOuterImageFormData = (outerImage: File): FormData => {
  const formData = new FormData()
  formData.append('outerImage', outerImage)

  return formData
}

export default async function updateBannerOuterImage({ bannerId, outerImage }: UpdateBannerOuterImageVariables): Promise<void> {
  const formData = createOuterImageFormData(outerImage)
  const response = await putAPI({
    url: bannerAmdinAPI.putOuterImage(bannerId),
    body: formData
  })

  if (response.status !== 201) {
    throw new Error(`Error uptate banner outer image: ${response.statusText}`)
  }

  return response.data
}