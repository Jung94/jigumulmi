'use client'

import { useSearchParams } from 'next/navigation'
import { ROWS_PER_PAGE } from './member-list.constant'
import { Tr, Td, BooleanCircle } from '@/src/shared/ui/table'
import { getRowOrder } from '@/src/shared/ui/table/table.util'
import type { Member } from '@/src/4.entities/member-admin/model/types'

export default function MemberListTableRows({ 
  rows,
  handleMemberListTableRowClick
}: { 
  rows: Member[] | undefined
  handleMemberListTableRowClick: (member: Member) => void
}) {
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get("page") ? Number(searchParams.get("page")) : 1

  if (!rows) return

  return (
    <>
      {rows.map((row: Member, index: number) => {
        return (
          <Tr key={row.id} onClick={() => handleMemberListTableRowClick(row)}>
            <Td>{getRowOrder(index, currentPage, ROWS_PER_PAGE)}</Td>
            <Td>{row.nickname}</Td>
            <Td>{row.email}</Td>
            <Td>{row.id}</Td>
            <Td>
              <BooleanCircle value={row.isAdmin} />
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
