'use client'

import { Table } from '@/src/shared/ui/table'
import { useGetAllParams } from '@/src/shared/hooks'
import { HEAD, COL_WIDTH_LIST } from './banner-list.constant'
import useFetchBanners from '@/src/4.entities/banner-admin/queries/useFetchBanners'
import TableRows from './banner-list-row.ui'

export default function BannerTable() {
  const queries = useGetAllParams() // ex. {bannerPage: '1', placePage: '1'}
  const { data: banners } = useFetchBanners()
  console.log(banners)

  // const head = Head({
  //   rows: items,
  //   columns: ["이름", "checkbox"],
  //   checked: !!(items.length !== 0 && items.every((item: {id: number, name: string}) => selectedRows.includes(item.id))),
  //   handleCheckbox: handleCheckbox
  // });
  // const body = Body({
  //   data: items, 
  //   currentPage, 
  //   selectedRows,
  //   onClick: handleSelectRow
  // });

  const Head = Table.Head(HEAD)
  const Body = TableRows({ rows: banners })

  return (
    <Table 
      headContents={Head} 
      bodyContents={Body} 
      colWidthList={COL_WIDTH_LIST} 
      hasNoPagination
    />
  )
}