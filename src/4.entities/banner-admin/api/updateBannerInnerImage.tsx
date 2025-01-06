import { putAPI } from '@/src/shared/api'
import { bannerAmdinAPI } from './banner.constant'
import type { UpdateBannerInnerImageVariables } from '../model/types'

const createInnerImageFormData = (innerImage: File): FormData => {
  const formData = new FormData()
  formData.append('innerImage', innerImage)

  return formData
}

export default async function updateBannerInnerImage({ bannerId, innerImage }: UpdateBannerInnerImageVariables): Promise<void> {
  const formData = createInnerImageFormData(innerImage)
  const response = await putAPI({
    url: bannerAmdinAPI.putInnerImage(bannerId),
    body: formData
  })

  if (response.status !== 201) {
    throw new Error(`Error uptate banner inner image: ${response.statusText}`)
  }

  return response.data
}