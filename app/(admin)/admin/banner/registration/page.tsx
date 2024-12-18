import BannerManagementPage from '@/src/1.pages/admin-banner-registration'
import type { PageSearchParams } from '@/components/admin/pages/member/types'

export default async function Banner({ searchParams }: { 
  searchParams: Promise<{ [key: string]: string | undefined }> 
}) {
  // const { page = '1', name = '1' } = await searchParams

  // return <BannerPage searchParamsOnServer={searchParams} />
  return <BannerManagementPage />
}