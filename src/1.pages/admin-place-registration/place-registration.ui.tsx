'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PreviousPageButton } from '@/src/shared/ui/admin'
import Header from '@/src/shared/ui/admin/layout/section/header'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/shared/ui/admin/tabs'

import { BasicSection, ImageSection } from '@/src/2.widgets/admin-place/place-form'

export default function PlaceRegistrationPage() {
  const router = useRouter()
  const navigatePlaceList = () => {
    if (window.confirm('입력하신 정보가 저장되지 않습니다. 장소 목록으로 이동하시겠습니까?')) {
      router.push('/admin/place')
    }
  }

  const [basicData, setBasicData] = useState({
    isApproved: false,
    name: '',
    address: '',
    contact: '',
    placeUrl: '',
    latitude: '', // 위도
    longitude: '', // 경도
    categoryList: [], 
    kakaoPlaceId: '',
    additionalInfo: '', // 추가 정보
    subwayStationList: [], // 지하철역
    registrantComment: ''
  })

  const [openingData, setOpeningData] = useState()
  const [menuData, setMenuData] = useState()
  const [imageData, setImageData] = useState()

  return (
    <>
      <Header title="장소 등록">
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
          <BasicSection basicData={basicData} setBasicData={setBasicData} />
        </TabsContent>
        <TabsContent basicStyle value='menu' style={{ height: '100%' }}>
          <BasicSection basicData={basicData} setBasicData={setBasicData} />
        </TabsContent>
        <TabsContent basicStyle value='image' style={{ height: '100%' }}>
          <ImageSection basicData={basicData} setBasicData={setBasicData} />
        </TabsContent>
      </Tabs>
    </>
  )
}
