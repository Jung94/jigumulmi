'use client'

import BannerTableRows from './banner-list-row.ui'
import { Table } from '@/src/shared/ui/table'
import { HEAD, COL_WIDTH_LIST } from './banner-list.constant'
import useFetchBannerList from '@/src/4.entities/banner-admin/model/queries/useFetchBannerList'

export default function BannerTable() {
  const { data: banners } = useFetchBannerList()

  const Head = Table.Head({ headList: HEAD })
  const Body = BannerTableRows({ rows: banners })

  return (
    <Table 
      headContents={Head} 
      bodyContents={Body} 
      colWidthList={COL_WIDTH_LIST} 
      hasNoPagination
    />
  )
}