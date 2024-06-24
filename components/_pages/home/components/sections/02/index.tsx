"use client"

import styles from './section.module.scss'
import { useWindowSize } from '@/lib/hooks'
import Image from 'next/image'
import Section02Image from '@/public/images/home/section02.png'
import Section02MobileImage from '@/public/images/home/section02-mobile.png'

const Section02 = () => {
  const windowSize = useWindowSize()

  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        <div className={styles['section-inner-title']}>
          가까운 지하철역 주변 채식 카페 찾기
        </div>
        <div className={styles['section-inner-title-sub']}>
          오늘 티타임부터 건강하게 바꿔보는 건 어떨까요?
        </div>
        <div className={styles['section-inner-image']}>
          <div className={styles['section-inner-image-header']}>
            <div className={styles['section-inner-image-header-left']}>지구멀미</div>
            <div className={styles['section-inner-image-header-right']}></div>
          </div>
          {649 < windowSize.width
            ? <Image className={styles['section-inner-image-content']} src={Section02Image} width={440} height={115} alt='section-01'></Image>
            : <Image className={styles['section-inner-image-content']} src={Section02MobileImage} width={243} height={302} alt='section-01'></Image>
          }
        </div>
      </div>
    </div>
  )
}

export default Section02