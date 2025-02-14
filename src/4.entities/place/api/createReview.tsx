import placeAPI from './place.constant'
import { apiClient } from '@/src/shared/api/fetch'
import type { CreateReviewRequestBody } from '../model/types'

const createReviewFormData = (data: CreateReviewRequestBody): FormData => {
  const formData = new FormData()
  formData.append('rating', data.rating.toString())

  if (data.content) formData.append('content', data.content)
  if (data.imageList && !!data.imageList.length) {
    for (let i = 0; i < data.imageList.length; i++) {
      const imageFile = data.imageList[i].file
      if (imageFile instanceof File && imageFile.size > 0) {
        formData.append("image", imageFile)
      }
    }
  }

  return formData
}

export default async function createReview({
  placeId,
  body
}: {
  placeId: number
  body: CreateReviewRequestBody
}) {
  const formData = createReviewFormData(body)
  return await apiClient.post({
    endpoint: placeAPI.review(placeId),
    body: formData
  })
}
