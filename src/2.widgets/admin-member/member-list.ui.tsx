'use client'

import { Table } from '@/src/shared/ui/table'
import MemberListTableRows from './member-list-row.ui'
import { useQueryParams } from '@/src/shared/hooks'
import { useFetchMemberList } from '@/src/4.entities/member-admin/model/queries'
import { HEAD, COL_WIDTH_LIST, ROWS_PER_PAGE } from './member-list.constant'
import type { Member } from '@/src/4.entities/member-admin/model/types'

export default function MemberTable({
  handleMemberListTableRowClick
}: {
  handleMemberListTableRowClick: (member: Member) => void
}) {
  const { queryParams, updateQueryParams } = useQueryParams({
    page: 1, 
    size: ROWS_PER_PAGE, 
    sort: 'ASC', // id,asc
  })

  const { data: memberListData, isLoading, error } = useFetchMemberList(queryParams)

  const Head = Table.Head({ headList: HEAD })
  const Body = MemberListTableRows({ 
    rows: memberListData?.data,
    handleMemberListTableRowClick
  })

  const handlePage = (newPage: number) => {
    updateQueryParams({ page: newPage.toString() })
  }

  if (isLoading || !memberListData) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Table 
      headContents={Head} 
      bodyContents={Body} 
      colWidthList={COL_WIDTH_LIST} 
      totalPage={memberListData.page.totalPage}
      currentPage={memberListData.page.currentPage}
      handlePage={handlePage}
    />
  )
}