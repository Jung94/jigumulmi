'use client'

import { useState } from 'react'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { PreviousPageButton } from '@/src/shared/ui/admin'
import Header from '@/src/shared/ui/admin/layout/section/header'
import { BasicSection } from '@/src/2.widgets/admin-place/place-form'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/shared/ui/admin/tabs'
import type { CreatePlaceBasicInput } from '@/src/4.entities/place-admin/model/types'

export default function PlaceRegistrationPage() {
  const router = useRouter()

  const [basicData, setBasicData] = useState<CreatePlaceBasicInput>({
    isApproved: false,
    name: '',
    region: '서울',
    address: '',
    contact: '',
    placeUrl: '',
    districtId: 0,
    position: {
      latitude: 0, // 위도
      longitude: 0 // 경도
    },
    categoryList: [], 
    kakaoPlaceId: null,
    additionalInfo: '', // 추가 정보
    registrantComment: '',
    subwayStationList: [], // 지하철역 ID
  })

  const navigatePlaceList = () => {
    if (window.confirm('입력하신 정보가 저장되지 않습니다. 장소 목록으로 이동하시겠습니까?')) {
      const prevPlaceListUrl = getCookie('ji-admin-list-url')
      router.push(prevPlaceListUrl ?? '/admin/place')
    }
  }

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
          <TabsTrigger disabled value='opening'>
            영업 시간
          </TabsTrigger>
          <TabsTrigger disabled value='menu'>
            메뉴
          </TabsTrigger>
          <TabsTrigger disabled value='image'>
            사진
          </TabsTrigger>
        </TabsList>
        <TabsContent basicStyle value='basic' style={{ height: '100%' }}>
          <BasicSection basicData={basicData} setBasicData={setBasicData} />
        </TabsContent>
      </Tabs>
    </>
  )
}
