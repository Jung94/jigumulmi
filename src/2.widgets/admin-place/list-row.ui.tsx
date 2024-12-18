'use client'

import { ROWS_PER_PAGE } from './list.constant'
import { useSearchParams } from 'next/navigation'
import { Tr, Td, BooleanCircle } from '@/src/shared/ui/table'
import { getRowOrder } from '@/src/shared/ui/table/table.util'
import type { Place } from '@/src/4.entities/place-admin/types/PlaceTypes'

type Props = {
  rows: Place[] | undefined;
  selectedRows?: any
}

export default function PlaceTableRows<T extends object>({
  rows,
  selectedRows
}: Props) {
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get("page") ? Number(searchParams.get("page")) : 1

  const handleClick = (id: number) => {
  }

  if (!rows) return

  return (
    <>
      {rows.map((row: Place, index: number) => {
        return (
          // <Tr key={row.id} active={isActive} onClick={()=>handleClick(row.id)}>
          <Tr key={row.id} onClick={()=>handleClick(row.id)}>
            <Td>{getRowOrder(index, currentPage, ROWS_PER_PAGE)}</Td>
            <Td>{row.name}</Td>
            <Td>{row.id}</Td>
            <Td>{row.categoryList.map(c => c.category).join(', ')}</Td>
            <Td>{row.subwayStation.stationName}</Td>
            <Td>
              <BooleanCircle value={row.isApproved} />
            </Td>
            {/* <Td></Td> // 상세페이지 target: _blank */}
          </Tr>
        )
      })}
    </>
  )
}