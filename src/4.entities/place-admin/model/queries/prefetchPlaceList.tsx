import { QueryClient } from '@tanstack/react-query'
import placeQueryKey from './query-key.constant'
import fetchPlaceList from '@/src/4.entities/place-admin/api/fetchPlaceList'

export default async function prefetchPlaceList(queryClient: QueryClient, queryParams: Record<string, any>) {
  await queryClient.prefetchQuery({
    queryKey: placeQueryKey.list(queryParams),
    queryFn: () => fetchPlaceList(queryParams),
  })
}