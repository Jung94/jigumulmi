'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './place-detail.module.scss'
import { HeaderMobileLayout } from '@/src/shared/ui/layout'
import { useFetchPlaceBasic } from '@/src/4.entities/place/model/queries'
import { 
  Carousel,
  PlaceMenu,
  PlaceBasic,
  PlaceReview,
  Tabs, TabsList, TabsTrigger, TabsContent,
} from '@/src/2.widgets/service-place-detail/ui'

export default function PlaceDetailPage({ 
  bannerId,
  placeId 
}: { 
  bannerId: number
  placeId: number 
}) {
  const router = useRouter()
  const { data: placeBasic } = useFetchPlaceBasic(placeId)

  const [tab, setTab] = useState('basic')

  const handleBannerPageNavigation = () => router.push(`/banner/${bannerId}`)
  const handleTabTrigger = (newTab: string) => setTab(newTab)

  if (!placeBasic) return

  return (
    <div className={styles['place']}>
      <HeaderMobileLayout showHomeIcon onGoBack={handleBannerPageNavigation}>
        <div className={styles['place-header-text']}>
          {placeBasic.name}
        </div>
      </HeaderMobileLayout>
      <Carousel imageList={placeBasic.imageList} placeId={placeBasic.id} />
      <div className={styles['place-header']}>
        <div className={styles['place-header-title-wrapper']}>
          <div className={styles['place-header-title']}>{placeBasic.name}</div>
          <div className={styles['place-header-category']}>
            {[...new Set(placeBasic.categoryList.map(c => c.categoryGroup))].join(', ')}
          </div>
        </div>
      </div>
      <div className={styles['place-tabs-wrapper']}>
      <Tabs defaultValue='basic' value={tab} >
        <TabsList>
          <TabsTrigger value='basic' onTrigger={() => handleTabTrigger('basic')}>
            기본 정보
          </TabsTrigger>
          <TabsTrigger value='menu' onTrigger={() => handleTabTrigger('menu')}>
            메뉴
          </TabsTrigger>
          <TabsTrigger value='review' onTrigger={() => handleTabTrigger('review')}>
            리뷰
          </TabsTrigger>
        </TabsList>
        <TabsContent value='basic' style={{ height: '100%' }}>
          <PlaceBasic bannerId={bannerId} placeId={placeId} data={placeBasic} onTabTrigger={handleTabTrigger} />
        </TabsContent>
        <TabsContent value='menu' style={{ height: '100%' }}>
          <PlaceMenu placeId={placeId} />
        </TabsContent>
        <TabsContent value='review' style={{ height: '100%' }}>
          <PlaceReview bannerId={bannerId} placeId={placeId} />
        </TabsContent>
      </Tabs>
      </div>
    </div>
  )
}
