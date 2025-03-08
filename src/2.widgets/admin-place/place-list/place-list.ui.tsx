'use client'

import { Table } from '@/src/shared/ui/table'
import PlaceTableRows from './place-list-row.ui'
import { useQueryParams } from '@/src/shared/hooks'
import { HEAD, COL_WIDTH_LIST, ROWS_PER_PAGE } from './place-list.constant'
import useFetchPlaceList from '@/src/4.entities/place-admin/model/queries/useFetchPlaceList'

export default function PlaceTable() {
  const { queryParams, updateQueryParams } = useQueryParams({
    page: 1, 
    size: ROWS_PER_PAGE, 
    sort: 'ASC', // id,asc
    isFromAdmin: true, 
    placeName: '', 
    subwayStationId: null, 
    categoryGroup: null, 
    showLikedOnly: null 
  })

  const { data: placeListData, isLoading, error } = useFetchPlaceList(queryParams)

  const Head = Table.Head({ headList: HEAD })
  const Body = PlaceTableRows({ rows: placeListData?.data })

  const handlePage = (newPage: number) => {
    updateQueryParams({ page: newPage.toString() })
  }

  if (isLoading || !placeListData) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Table 
      headContents={Head} 
      bodyContents={Body} 
      colWidthList={COL_WIDTH_LIST} 
      totalPage={placeListData.page.totalPage}
      currentPage={placeListData.page.currentPage}
      handlePage={handlePage}
    />
  )
}