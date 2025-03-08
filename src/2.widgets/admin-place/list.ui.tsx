'use client'

import { useState } from 'react'
import PlaceTableRows from './list-row.ui'
import { Table } from '@/src/shared/ui/table'
import { useQueryParams } from '@/src/shared/hooks'
import { HEAD, COL_WIDTH_LIST, ROWS_PER_PAGE } from './list.constant'
import { useFetchPlaceList } from '@/src/4.entities/place-admin/model/queries'

export default function PlaceTable() {
  const [selectedIdList, setSelectedIdList] = useState<number[]>([])
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

  const handleCheckbox = (placeId: number) => {
    setSelectedIdList((prev) => {
      const hasId = prev.includes(placeId)
      if (hasId) return prev.filter(id => id !== placeId)
        else return [...prev, placeId].sort((a, b) => a - b) // 오름차순
    })
  }

  const handleHeadCheckbox = () => {
    const placeList = placeListData?.data
    if (!placeList) return
    if (selectedIdList.length < placeList.length) setSelectedIdList(placeList.map(place => place.id))
      else setSelectedIdList([])
  }

  const Head = Table.Head({ 
    headList: HEAD,
    checkInfo: { 
      checked: !!(
        !!placeListData?.data.length 
        && placeListData.data.every(place => selectedIdList.includes(place.id))
      ), 
      onCheck: handleHeadCheckbox 
    }
  })
  const Body = PlaceTableRows({ 
    rows: placeListData?.data, 
    selectedIdList,
    handleCheckbox 
  })

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