'use client'

import { useEffect, useState } from 'react'
import styles from './main.module.scss'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/src/shared/assets/icons'
import { useFetchBannerList } from '@/src/4.entities/banner/model/queries'

export default function MainPage() {
  const router = useRouter()
  const { data: bannerList } = useFetchBannerList()
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false)

  const navigateBannerDetail = (bannerId: number) => {
    setIsFetchingNextPage(true)
    router.push(`/banner/${bannerId}`)
  }
  const handleClickBannerCard = (bannerId: number) => navigateBannerDetail(bannerId)

  const drawArrowIcon = () => {
    return (
      <svg width="19px" height="19px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.00005 19L19 5.99996M19 5.99996V18.48M19 5.99996H6.52005" stroke="#444" strokeWidth="1.85" strokeLinecap="round" strokeLinejoin="round"></path>
      </svg>
    )
  }

  useEffect(() => {
    sessionStorage.removeItem("bannerBottomSheetScroll")
  }, [])

  if (!bannerList) return

  return (
    <div className={styles['main']}>
      <div className={styles['main-title']}>
        지구멀미
      </div>
      <div className={styles['main-sub-title']}>
        <div className={styles['main-sub-title-01']}>지구 속도에 발맞추는 가장 맛있는 한걸음</div>
        <div className={styles['main-sub-title-02']}>어떤 비건 식당을 찾고 계세요?</div>
      </div>
      <div className={styles['main-banner-list']}>
        <button className={styles['main-banner-list-card']} onClick={() => handleClickBannerCard(bannerList[0].id)}>
          <div className={styles['main-banner-list-card-icon']} style={{ backgroundColor: '#feeaf1' }}>
            {drawArrowIcon()}
          </div>
          <div className={styles['main-banner-list-card-text']}>
            <span>새로운 비건 식당을</span>
            <span>찾고있을 때</span>
          </div>
        </button>
        <button className={styles['main-banner-list-card']} onClick={() => handleClickBannerCard(bannerList[1].id)}>
          <div className={styles['main-banner-list-card-icon']} style={{ backgroundColor: '#eeebfe' }}>
            {drawArrowIcon()}
          </div>
          <div className={styles['main-banner-list-card-text']}>
            <span>맛도 건강도</span>
            <span>놓치고 싶지 않을 때</span>
          </div>
        </button>
        <button className={styles['main-banner-list-card']} onClick={() => handleClickBannerCard(bannerList[2].id)}>
          <div className={styles['main-banner-list-card-icon']} style={{ backgroundColor: '#e2f4fb' }}>
            {drawArrowIcon()}
          </div>
          <div className={styles['main-banner-list-card-text']}>
            <span>체질 상 특정 재료를</span>
            <span>피해야 할 때</span>
          </div>
        </button>
        <button className={styles['main-banner-list-card']} onClick={() => handleClickBannerCard(bannerList[3].id)}>
          <div className={styles['main-banner-list-card-icon']} style={{ backgroundColor: '#ffe9db' }}>
            {drawArrowIcon()}
          </div>
          <div className={styles['main-banner-list-card-text']}>
            <span>트렌디한 비건식당이</span>
            <span>궁금할 때</span>
          </div>
        </button>
      </div>
      {isFetchingNextPage &&
        <div className={`
          ${styles['main-loading']}
          ${styles['main-loading-fade-in']}
        `}>
          <LoadingSpinner 
            width={40} 
            height={40} 
            style={{ margin: '2rem auto', width: '100%' }} 
          />
        </div>
      }
    </div>
  )
}
