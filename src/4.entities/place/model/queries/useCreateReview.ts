import { useMutation } from '@tanstack/react-query'
import createReview from '../../api/createReview'

export default function useCreateReview() {
  return useMutation(createReview)
}
