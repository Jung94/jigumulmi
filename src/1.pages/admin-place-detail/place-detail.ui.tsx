'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getCookie, deleteCookie } from 'cookies-next'
import { PreviousPageButton } from '@/src/shared/ui/admin'
import Header from '@/src/shared/ui/admin/layout/section/header'
import { BasicSection, MenuSection, ImageSection, BusinessHourSection } from '@/src/2.widgets/admin-place/place-form'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/shared/ui/admin/tabs'
import { 
  useFetchPlaceMenu, 
  useFetchPlaceBasic, 
  useFetchPlaceImage,
  useFetchPlaceBusinessHour,
} from '@/src/4.entities/place-admin/model/queries'
import type { 
  PlaceBasic, 
  PlaceMenuInput, 
  PlaceImage,
  PlaceBusinessHour 
} from '@/src/4.entities/place-admin/model/types'

const initialBusinessHour = {
  fixedBusinessHour: {
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
  },
  temporaryBusinessHour: []
}

export default function PlaceDetailPage({ placeId }: { placeId: number }) {
  const router = useRouter()

  const [basicData, setBasicData] = useState<PlaceBasic>()
  const [menuData, setMenuData] = useState<PlaceMenuInput[]>([])
  const [imageData, setImageData] = useState<PlaceImage[]>([])
  const [businessHourData, setBusinessHourData] = useState<PlaceBusinessHour>(initialBusinessHour)
  const [month, setMonth] = useState((new Date).getMonth() + 1)

  const navigatePlaceList = () => {
    const prevPlaceListUrl = getCookie('ji-admin-list-url')
    router.push(prevPlaceListUrl ?? '/admin/place')
  }

  const { data: placeBasicData } = useFetchPlaceBasic(placeId)
  const { data: placeMenuData } = useFetchPlaceMenu(placeId)
  const { data: placeImageData } = useFetchPlaceImage(placeId)
  const { data: placeBusinessHourData } = useFetchPlaceBusinessHour(placeId, { month: undefined })

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
    const addedIdMenuList = placeMenuData.map(m => {
      return { ...m, id: crypto.randomUUID() } as PlaceMenuInput
    })
    setMenuData(addedIdMenuList)
  }, [placeMenuData])

  useEffect(() => {
    if (!placeImageData) return
    setImageData(placeImageData)
  }, [placeImageData])

  useEffect(() => {
    if (!placeBusinessHourData) return
    placeBusinessHourData.temporaryBusinessHour = placeBusinessHourData.temporaryBusinessHour.map((temporaryBusinessHour) => ({
      ...temporaryBusinessHour,
        date: new Date(temporaryBusinessHour.date)
    }))
    setBusinessHourData(placeBusinessHourData)
  }, [placeBusinessHourData])

  if (!basicData || !placeImageData || !businessHourData) return
  console.log('businessHourData:', businessHourData)

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
          <BusinessHourSection setMonth={setMonth} businessHourData={businessHourData} setBusinessHourData={setBusinessHourData} />
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
