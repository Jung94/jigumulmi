import PlaceDetailPage from '@/components/admin/pages/place-detail';

export default function PlaceDetail({ params }: { params: { placeId: string } }) {
  return <PlaceDetailPage params={params} />
}