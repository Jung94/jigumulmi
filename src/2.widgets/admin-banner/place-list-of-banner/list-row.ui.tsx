'use client'

import { ROWS_PER_PAGE } from './list.constant'
import { useSearchParams } from 'next/navigation'
import { NewTabButton } from '@/src/shared/ui/admin'
import { Tr, Td, Checkbox } from '@/src/shared/ui/table'
import { getRowOrder } from '@/src/shared/ui/table/table.util'
import type { AssignedPlace } from '@/src/4.entities/banner-admin/model/types'

type Props = {
  rows?: AssignedPlace[];
  selectedIdList: number[]
  handleCheckbox: (placeId: number) => void
}

export default function PlaceTableRows({
  rows,
  selectedIdList,
  handleCheckbox
}: Props) {
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get("page") ? Number(searchParams.get("page")) : 1

  const handleRowClick = (placeId: number) => handleCheckbox(placeId)

  if (!rows) return

  return (
    <>
      {rows.map((row: AssignedPlace, index: number) => {
        return (
          <Tr key={row.id} onClick={() => handleRowClick(row.id)}>
            <Td>
              <Checkbox isActive={selectedIdList.includes(row.id)} />
            </Td>
            <Td>{getRowOrder(index, currentPage, ROWS_PER_PAGE)}</Td>
            <Td>{row.name}</Td>
            <Td>{row.id}</Td>
            <Td>{row.subwayStation?.stationName}</Td>
            <Td>{row.categoryList.map(c => c.category).join(', ')}</Td>
            <Td>{row.district}</Td>
            <Td>
              <NewTabButton 
                size='small' 
                variant='filled'
                href={`/admin/place/${row.id}`}
              >
                자세히
              </NewTabButton>
            </Td>
          </Tr>
        )
      })}
    </>
  )
}