import { useMutation } from '@tanstack/react-query'
import deleteReview from '../../api/deleteReview'

export default function useDeleteReview() {
  return useMutation(deleteReview)
}
