'use client'

import { setCookie } from 'cookies-next'
import { useCurrentUrl } from '@/src/shared/hooks'
import { ROWS_PER_PAGE } from './place-list.constant'
import { useRouter, useSearchParams } from 'next/navigation'
import { Tr, Td, BooleanCircle } from '@/src/shared/ui/table'
import { getRowOrder } from '@/src/shared/ui/table/table.util'
import { placeAmdinAPI } from '@/src/4.entities/place-admin/api/place.constant'
import type { PlaceRow } from '@/src/4.entities/place-admin/model/types'

export default function BannerRows({ rows }: { rows: PlaceRow[] | undefined }) {
  const router = useRouter()
  const currentUrl = useCurrentUrl()
  const searchParams = useSearchParams()
  const currentPage = searchParams?.get("page") ? Number(searchParams.get("page")) : 1

  const navigatePlaceDetail = (placeId: number) => {
    router.push(`${placeAmdinAPI.base}/${placeId}`)
  }

  const handlePlaceRowClick = (placeId: number) => {
    setCookie("ji-admin-list-url", currentUrl)
    navigatePlaceDetail(placeId)
  }

  if (!rows) return

  return (
    <>
      {rows.map((row: PlaceRow, index: number) => {
        return (
          <Tr key={row.id} onClick={() => handlePlaceRowClick(row.id)}>
            <Td>{getRowOrder(index, currentPage, ROWS_PER_PAGE)}</Td>
            <Td>{row.name}</Td>
            <Td>{row.id}</Td>
            <Td>{row.categoryList.map(c => c.category).join(', ')}</Td>
            <Td>{row.subwayStation?.stationName}</Td>
            <Td>
              <BooleanCircle value={row.isApproved} />
            </Td>
          </Tr>
        )
      })}
    </>
  )
}
