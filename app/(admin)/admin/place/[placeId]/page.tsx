// import PlaceDetailPage from '@/components/admin/pages/place-detail';
import PlaceDetailPage from '@/src/1.pages/admin-place-detail'

export default async function PlaceDetail({ 
  params,
}: { 
  params: Promise<{ placeId: string }> 
}) {
    const placeId = Number((await params).placeId)
  return <PlaceDetailPage placeId={placeId} />
}
