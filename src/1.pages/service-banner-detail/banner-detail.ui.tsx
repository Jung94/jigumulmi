'use client'

import { useRouter } from 'next/navigation'
import styles from './banner-detail.module.scss'
import KakaoMap from '@/src/shared/ui/kakao-map'
import 'react-spring-bottom-sheet/dist/style.css'
import { HeaderMobileLayout } from '@/src/shared/ui/layout'
import { BottomSheet } from 'react-spring-bottom-sheet'
import { PlaceList, BannerInnerImage } from '@/src/2.widgets/service-banner-detail/ui'
import { useFetchBanner, useFetchPlaceList } from '@/src/4.entities/banner/model/queries'
import type { PlaceListItem } from '@/src/4.entities/banner/model/types'
import { useEffect } from 'react'

export default function BannerDetailPage({ 
  bannerId 
}: { 
  bannerId: number 
}) {
  const router = useRouter()
  const { data: banner } = useFetchBanner(bannerId)
  const { 
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useFetchPlaceList(bannerId)

  const handleHomePageNavigation = () => router.push(`/`)

  // const sessionStorageKey = `bannerBottomSheetScroll-${bannerId}`

  // sessionStorage에 저장된 스크롤 위치 Element에 적용
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("bannerBottomSheetScroll")
    if (!savedScroll) return
    const restoreScrollPosition = () => {
      requestAnimationFrame(() => {
        const bottomSheetDiv = document.getElementById(
          "place-list-about-banner-bottom-sheet"
        );
        if (bottomSheetDiv) {
          const targetDiv = bottomSheetDiv.children[0].children[1] as HTMLDivElement;
          targetDiv.scrollTo({ top: Number(savedScroll), behavior: "smooth" });
        }
      });
    };
  
    setTimeout(restoreScrollPosition, 100);
  }, [])

  // 스크롤 위치 sessionStorage에 저장
  useEffect(() => {
    const handleScroll = (contentEl: HTMLDivElement) => {
      sessionStorage.setItem("bannerBottomSheetScroll", String(contentEl.scrollTop));
    }

    setTimeout(() => {
      const bottomSheetDiv = document.getElementById(
        "place-list-about-banner-bottom-sheet"
      )
      if (bottomSheetDiv) {
        const targetDiv = bottomSheetDiv.children[0].children[1] as HTMLDivElement
        targetDiv.addEventListener('scroll', () => handleScroll(targetDiv))
      }
    }, 500)

    return () => {
      const bottomSheetDiv = document.getElementById(
        "place-list-about-banner-bottom-sheet"
      )
      if (bottomSheetDiv) {
        const targetDiv = bottomSheetDiv.children[0].children[1] as HTMLDivElement
        targetDiv.removeEventListener('scroll', () => handleScroll(targetDiv))
      }
    }
  }, [])

  if (!banner || !data) return

  const placeList = 
    data.pages.reduce<PlaceListItem[]>((acc, page) => acc.concat(page.data), [])

  return (
    <div className={styles['banner']}>
      <HeaderMobileLayout onGoBack={handleHomePageNavigation}>
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
