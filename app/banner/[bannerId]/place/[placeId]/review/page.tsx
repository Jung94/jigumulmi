import ReviewPage from '@/src/1.pages/service-review'

export default async function Review({ 
  params,
}: { 
  params: Promise<{ bannerId: string, placeId: string }> 
}) {
  const bannerId = Number((await params).bannerId)
  const placeId = Number((await params).placeId)

  if (isNaN(bannerId) || isNaN(placeId)) return
  
  return <ReviewPage bannerId={bannerId} placeId={placeId} />
}
