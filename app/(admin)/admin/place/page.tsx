import PlaceListPage from '@/components/admin/pages/place'
import type { PageSearchParams } from '@/components/admin/pages/place/types'

export default async function PlaceList({ 
  searchParams 
}: { 
  searchParams: Promise<PageSearchParams> 
}) {
  const queryParams = await searchParams

  return <PlaceListPage searchParamsOnServer={queryParams} />
}