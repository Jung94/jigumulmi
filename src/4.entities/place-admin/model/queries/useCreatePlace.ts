import { useMutation } from '@tanstack/react-query'
import createPlace from '../../api/createPlace'

export default function useCreatePlace() {
  return useMutation(createPlace)
}
