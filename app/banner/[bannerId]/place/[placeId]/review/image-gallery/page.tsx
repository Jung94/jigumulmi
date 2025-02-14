import ReviewImageGalleryPage from '@/src/1.pages/service-review-image-gallery'

export default async function ReviewImageGallery({ 
  params,
}: { 
  params: Promise<{ placeId: string }> 
}) {
  const placeId = Number((await params).placeId)

  if (isNaN(placeId)) return
  
  return <ReviewImageGalleryPage placeId={placeId} />
}
