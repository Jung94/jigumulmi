import PlaceListPage from '@/components/admin/pages/place'
import type { PageSearchParams } from '@/components/admin/pages/place/types'

export default function PlaceList({ searchParams }: { searchParams: PageSearchParams }) {
  return <PlaceListPage searchParamsOnServer={searchParams} />
}