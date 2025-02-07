'use client'

import { Tr, Td, BooleanCircle } from '@/src/shared/ui/table'
import { useRouter, useSearchParams } from 'next/navigation'
import { getRowOrder } from '@/src/shared/ui/table/table.util'
import { ROWS_PER_PAGE } from './banner-list.constant'
import { bannerAmdinAPI } from '@/src/4.entities/banner-admin/api/banner.constant'
import type { BannerTableRow } from '@/src/4.entities/banner-admin/model/types'

export default function BannerRows({ rows }: { rows: BannerTableRow[] | undefined }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get("bannerPage") ? Number(searchParams.get("bannerPage")) : 1

  const handleRouter = (bannerId: number) => {
    router.push(`${bannerAmdinAPI.base}/${bannerId}`)
  }

  if (!rows) return

  return (
    <>
      {rows.map((row: BannerTableRow, index: number) => {
        return (
          <Tr key={row.id} onClick={() => handleRouter(row.id)}>
            <Td>{getRowOrder(index, currentPage, ROWS_PER_PAGE)}</Td>
            <Td>{row.title}</Td>
            <Td>{row.modifiedAt?.split('T')[0]}</Td>
            <Td>
              <BooleanCircle value={row.isActive} />
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
