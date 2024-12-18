'use client'

import { Tr, Td } from '@/src/shared/ui/table'
import { useRouter, useSearchParams } from 'next/navigation'
import { getRowOrder } from '@/src/shared/ui/table/table.util'
import { ROWS_PER_PAGE, BANNER_PATH } from './banner-list.constant'
import type { Banner } from '@/src/4.entities/banner-admin/types/bannerTypes'

type Props<T extends Object> = {
  rows: T[] | undefined;
  selectedRows?: any
}

export default function BannerRows<T extends object>({
  rows,
  selectedRows
}: Props<T>) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = searchParams ? Number(searchParams.get("bannerPage")) : 1

  const handleClick = (id: number) => {
    router.push(`${BANNER_PATH}/${id}`)
  }

  if (!rows) return

  return (
    <>
      {rows.map((row: T, index: number) => {
        const dataList = [index + 1].concat(Object.values(row))
        console.log(row, Object.values(row), dataList)
        // const isActive = selectedRows.includes(row.id);
        return (
          // <Tr key={row.id} active={isActive} onClick={()=>handleClick(row.id)}>
          <Tr key={row.id} onClick={()=>handleClick(row.id)}>
            <Td>{getRowOrder(index, currentPage, ROWS_PER_PAGE)}</Td>
            <Td align='left'>{row.name}</Td>
            <Td>{row.modifiedAt}</Td>
            <Td>{row.isActive}</Td>
          </Tr>
        )
      })}
    </>
  )
}

// const handleSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent> | string, name: string) => {
//   const params = new URLSearchParams(searchParams)
//   Object.entries(filters).forEach((e: any) => params.set(e[0], e[1]))
  
//   if (name !== 'searchFilter') params.set("page", "1")
//   if (name === 'keyword' && typeof e === 'string') {
//     params.set(name, e)
//   } else if (typeof e === 'object') {
//     const { value }: { value: any } = e.target as HTMLButtonElement;
//     params.set(name, value)
//   }

//   router.push(`${pathname}?${params.toString()}`)
// }

// const handleCurrentPage = (page: number) => {
//   const params = new URLSearchParams(searchParams)
//   params.set("page", `${page}`)
//   router.push(`${pathname}?${params.toString()}`)
// }