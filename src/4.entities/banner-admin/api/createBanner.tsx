import { postAPI } from '@/src/shared/api'
import { bannerAmdinAPI } from './banner.constant'
import type { CreateBannerInput, CreateBannerResponse } from '../model/types'

const createBannerFormData = (data: CreateBannerInput): FormData => {
  const formData = new FormData()
  formData.append('title', data.title)
  formData.append('isActive', data.isActive.toString())

  if (data.outerImage?.file) formData.append('outerImage', data.outerImage.file)
  if (data.innerImage?.file) formData.append('innerImage', data.innerImage.file)

  return formData
}

export default async function createBanner(data: CreateBannerInput): Promise<CreateBannerResponse> {
  const formData = createBannerFormData(data)
  const response = await postAPI({
    url: bannerAmdinAPI.base,
    body: formData
  })

  if (response.status !== 201) {
    throw new Error(`Error create banner: ${response.statusText}`)
  }

  return response.data
}