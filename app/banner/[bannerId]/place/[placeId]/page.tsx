import PlaceDetailPage from '@/src/1.pages/service-place-detail'

export default async function PlaceDetail({ 
  params,
}: { 
  params: Promise<{ bannerId: string, placeId: string }> 
}) {
  const bannerId = Number((await params).bannerId)
  const placeId = Number((await params).placeId)

  if (isNaN(bannerId) || isNaN(placeId)) return
  
  return <PlaceDetailPage bannerId={bannerId} placeId={placeId} />
}
