'use client'

import styles from './banner-detail.module.scss'
import KakaoMap from '@/src/shared/ui/kakao-map'
import 'react-spring-bottom-sheet/dist/style.css'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { HeaderMobileLayout } from '@/src/shared/ui/layout'
import { PlaceList, BannerInnerImage } from '@/src/2.widgets/service-banner-detail/ui'
import { useFetchBanner, useFetchPlaceList } from '@/src/4.entities/banner/model/queries'
import type { PlaceListItem } from '@/src/4.entities/banner/model/types'

export default function BannerDetailPage({ 
  bannerId 
}: { 
  bannerId: number 
}) {
  const { data: banner } = useFetchBanner(bannerId)
  const { 
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useFetchPlaceList(bannerId)

  if (!banner || !data) return

  const placeList = 
    data.pages.reduce<PlaceListItem[]>((acc, page) => acc.concat(page.data), [])

  return (
    <div className={styles['banner']}>
      <HeaderMobileLayout showBackIcon hasHomeIcon>
        <div className={styles['banner-header-title']}>
          {banner.title}
        </div>
      </HeaderMobileLayout>
      <div className={styles['banner-map']}>
        <KakaoMap placeList={placeList} />
      </div>
      <BottomSheet 
        id="place-list-about-banner-bottom-sheet"
        open
        skipInitialTransition
        blocking={false}
        scrollLocking={false}
        expandOnContentDrag={true}
        header={<div style={{ height: '7px'}} />}
        defaultSnap={({ maxHeight }) => maxHeight - 53}
        snapPoints={({ minHeight, maxHeight }) => [
          150,
          maxHeight - 53,
        ]}
      >
        <BannerInnerImage innerImageS3Key={banner.innerImageS3Key} />
        <PlaceList 
          bannerId={bannerId}
          data={data} 
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </BottomSheet>
    </div>
  )
}
