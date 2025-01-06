import { QueryClient, dehydrate } from '@tanstack/react-query'
import bannerQueryKey from './query-key.constant'
import fetchBanner from '../../api/fetchBanner'

export default async function prefetchBanner(queryClient: QueryClient, bannerId: number) {
  await queryClient.prefetchQuery({
    queryKey: bannerQueryKey.detail(bannerId),
    queryFn: () => fetchBanner(bannerId),
  })
  // return dehydrate(queryClient)
}