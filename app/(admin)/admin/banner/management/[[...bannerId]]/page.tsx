import BannerManagementPage from '@/src/1.pages/admin-banner-management'
import type { PageSearchParams } from '@/components/admin/pages/member/types'

export default async function Banner({ params, searchParams }: { 
  params: Promise<{ bannerId?: string[] }>
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {
  const bannerIds = (await params).bannerId  // ex. [ '3'. '5' ] | undefined
  const bannerId = bannerIds ? bannerIds[0] : bannerIds
  const { bannerPage = '1', placePage = '1' } = await searchParams
  console.log('banner-page:', bannerId, bannerPage, placePage)

  // return <BannerPage searchParamsOnServer={searchParams} />
  // return <BannerManagementPage />
  return <div></div>
}