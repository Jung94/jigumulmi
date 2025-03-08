import { QueryClient, Hydrate, dehydrate } from '@tanstack/react-query'
import BannerDetailPage from '@/src/1.pages/admin-banner-detail'
import { prefetchBanner } from '@/src/4.entities/banner-admin/model/queries'
import { prefetchPlaceList } from '@/src/4.entities/place-admin/model/queries'

const defaultQuery = { 
  page: 1, 
  size: 15, 
  sort: 'ASC', // id,asc
  isFromAdmin: true, 
  placeName: '', 
  subwayStationId: null, 
  categoryGroup: null, 
  showLikedOnly: null 
}

export default async function Banner({ 
  params,
  searchParams
}: { 
  params: Promise<{ bannerId: string }> 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const query = await searchParams
  const queryClient = new QueryClient()
  const bannerId = Number((await params).bannerId)
  const queryParams = { ...defaultQuery, ...query }

  // 여러 쿼리를 비동기적으로 prefetch
  await Promise.all([
    ()=>prefetchBanner(queryClient, bannerId), 
    ()=>prefetchPlaceList(queryClient, queryParams)
  ])

  const dehydratedState = dehydrate(queryClient)

  return (
    <Hydrate state={dehydratedState}>
      <BannerDetailPage bannerId={bannerId} />
    </Hydrate>
  )
}