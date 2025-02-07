import { postAPI } from '@/src/shared/api'
import { placeAmdinAPI } from './place.constant'
import type { CreatePlaceVariables } from '../model/types'

export default async function createPlace(data: CreatePlaceVariables) {
  const response = await postAPI({
    url: placeAmdinAPI.base,
    body: data
  })

  if (response.status !== 201) {
    throw new Error(`Error create place: ${response.statusText}`)
  }

  return response.data
}