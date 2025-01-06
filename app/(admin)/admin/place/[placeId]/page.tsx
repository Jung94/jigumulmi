import PlaceDetailPage from '@/components/admin/pages/place-detail';

// export default function PlaceDetail({ params }: { params: { placeId: string } }) {
export default async function PlaceDetail({ 
  params,
}: { 
  params: Promise<{ placeId: string }> 
}) {
    const placeId = Number((await params).placeId)
  return <PlaceDetailPage />
}