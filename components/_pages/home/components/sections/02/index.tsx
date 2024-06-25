"use client"

import styles from './section.module.scss'
import { useWindowSize } from '@/lib/hooks'
import Image from 'next/image'
import Section02PcImage from '@/public/images/home/section02-pc.webp'
import Section02MobileImage from '@/public/images/home/section02-mobile.webp'

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
            <div className={styles['section-inner-image-header-right']}>
              <svg width="21px" height="21px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M5 20V19C5 15.134 8.13401 12 12 12V12C15.866 12 19 15.134 19 19V20" stroke="#666" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="#666" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
          {649 < windowSize.width
            ? <Image className={styles['section-inner-image-content']} src={Section02PcImage} width={440} height={108} placeholder='blur' sizes="440px" layout='fixed' alt='section-02-pc'></Image>
            : <Image className={styles['section-inner-image-content']} src={Section02MobileImage} width={243} height={304} placeholder='blur' sizes="250px" layout='fixed' alt='section-02-mobile'></Image>
          }
        </div>
      </div>
    </div>
  )
}

export default Section02