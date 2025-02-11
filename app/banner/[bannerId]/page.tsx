import BannerDetailPage from '@/src/1.pages/service-banner-detail'

export default async function BannerDetail({ 
  params,
}: { 
  params: Promise<{ bannerId: string }> 
}) {
  const bannerId = Number((await params).bannerId)

  if (isNaN(bannerId)) return
  
  return <BannerDetailPage bannerId={bannerId} />
}
