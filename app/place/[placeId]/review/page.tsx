import ReviewPage from '@/src/1.pages/service-review'

export default async function Review({ 
  params,
}: { 
  params: Promise<{ placeId: string }> 
}) {
  const placeId = Number((await params).placeId)

  if (isNaN(placeId)) return
  
  return <ReviewPage placeId={placeId} />
}
