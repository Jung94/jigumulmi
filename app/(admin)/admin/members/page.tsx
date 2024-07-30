import MemberListPage from '@/components/admin/pages/member'
import type { PageSearchParams } from '@/components/admin/pages/member/types'

export default function MemberList({ searchParams }: { searchParams: PageSearchParams }) {
  return <MemberListPage searchParamsOnServer={searchParams} />
}