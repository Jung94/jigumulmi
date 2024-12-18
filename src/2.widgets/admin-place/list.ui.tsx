'use client'

import { Table } from '@/src/shared/ui/table'
import { useQueryParams } from '@/src/shared/hooks'
import { HEAD, COL_WIDTH_LIST } from './list.constant'
import useFetchPlaces from '@/src/4.entities/place-admin/queries/useFetchPlaces'
import PlaceTableRows from './list-row.ui'

export default function PlaceTable() {
  const defaultQuery = { 
    page: 1, 
    size: 15, 
    sort: 'ASC', // id,asc
    isFromAdmin: true, 
    placeName: '', 
    subwayStationId: null, 
    categoryGroup: null, 
    showLikedOnly: null 
  }
  const queryParams = useQueryParams(defaultQuery)
  const { data: placeData, isLoading, error } = useFetchPlaces(queryParams)

  // const { page: pageData, data: placeList } = placeData!
  // console.log(pageData, placeList)

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
  const Body = PlaceTableRows({ rows: placeData?.data })

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error!</p>

  return (
    <Table 
      headContents={Head} 
      bodyContents={Body} 
      colWidthList={COL_WIDTH_LIST} 
      hasNoPagination
    />
  )
}