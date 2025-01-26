'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie, deleteCookie } from 'cookies-next'
import { PreviousPageButton } from '@/src/shared/ui/admin'
import Header from '@/src/shared/ui/admin/layout/section/header'
import { BasicSection, MenuSection, ImageSection } from '@/src/2.widgets/admin-place/place-form'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/shared/ui/admin/tabs'
import { useFetchPlaceBasic, useFetchPlaceMenu, useFetchPlaceImage } from '@/src/4.entities/place-admin/model/queries'
import type { PlaceBasic, PlaceMenuInput, PlaceImage } from '@/src/4.entities/place-admin/model/types'

export default function PlaceDetailPage({ placeId }: { placeId: number }) {
  const router = useRouter()

  const [basicData, setBasicData] = useState<PlaceBasic>()
  const [openingData, setOpeningData] = useState()
  const [menuData, setMenuData] = useState<PlaceMenuInput[]>([])
  const [imageData, setImageData] = useState<PlaceImage[]>([])

  const navigatePlaceList = () => {
    const prevPlaceListUrl = getCookie('ji-admin-list-url')
    router.push(prevPlaceListUrl ?? '/admin/place')
  }

  const { data: placeBasicData } = useFetchPlaceBasic(placeId)
  const { data: placeMenuData } = useFetchPlaceMenu(placeId)
  const { data: placeImageData } = useFetchPlaceImage(placeId)

  useEffect(()=>{
    return () => deleteCookie('ji-admin-list-url')
  }, [])

  useEffect(() => {
    if (!placeBasicData) return
    setBasicData({ 
      ...placeBasicData, 
      subwayStationList: placeBasicData.subwayStationList
        .filter(s => s.isMain)
        .concat(placeBasicData.subwayStationList.filter(s => !s.isMain))
    })
  }, [placeBasicData])

  useEffect(() => {
    if (!placeMenuData) return
    setMenuData(placeMenuData)
  }, [placeMenuData])

  useEffect(() => {
    if (!placeImageData) return
    setImageData(placeImageData)
  }, [placeImageData])

  if (!basicData || !placeImageData) return
  console.log(basicData, menuData, imageData)

  return (
    <>
      <Header title="장소 관리">
        <PreviousPageButton onClick={navigatePlaceList}>
          장소 목록
        </PreviousPageButton>
      </Header>
      <Tabs defaultValue='basic' style={{ height: '100%', overflow: 'hidden' }}>
        <TabsList>
          <TabsTrigger value='basic'>
            기본 정보
          </TabsTrigger>
          <TabsTrigger value='opening'>
            영업 시간
          </TabsTrigger>
          <TabsTrigger value='menu'>
            메뉴
          </TabsTrigger>
          <TabsTrigger value='image'>
            사진
          </TabsTrigger>
        </TabsList>
        <TabsContent basicStyle value='basic' style={{ height: '100%' }}>
          <BasicSection basicData={basicData} setBasicData={setBasicData} />
        </TabsContent>
        <TabsContent basicStyle value='opening' style={{ height: '100%' }}>
          {/* <BasicSection basicData={basicData} setBasicData={setBasicData} /> */}
        </TabsContent>
        <TabsContent basicStyle value='menu' style={{ height: '100%' }}>
          <MenuSection menuData={menuData} setMenuData={setMenuData} />
        </TabsContent>
        <TabsContent basicStyle value='image' style={{ height: '100%' }}>
          <ImageSection placeImageList={imageData} setPlaceImageList={setImageData} />
        </TabsContent>
      </Tabs>
    </>
  )
}
