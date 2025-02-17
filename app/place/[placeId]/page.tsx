import PlaceDetailPage from '@/src/1.pages/service-place-detail'

export default async function PlaceDetail({ 
  params,
}: { 
  params: Promise<{ placeId: string }> 
}) {
  const placeId = Number((await params).placeId)

  if (isNaN(placeId)) return
  
  return <PlaceDetailPage placeId={placeId} />
}
