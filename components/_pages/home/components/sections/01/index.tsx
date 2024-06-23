"use client"

import styles from './section.module.scss'
import { useRouter } from 'next/navigation'
import { useWindowSize } from '@/lib/hooks'
import Image from 'next/image'
import Section01Image from '@/public/images/home/section01.png'

const Section01 = () => {
  const router = useRouter()
  const windowSize = useWindowSize()

  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        {700 < windowSize.width &&
          <div className={styles['section-inner-line']}>
            <div className={styles['section-inner-line-inner']}>
              <div className={`${styles['section-inner-line-inner-circle']} ${styles['section-inner-line-inner-circle-01']}`}>강남</div>
              <div className={`${styles['section-inner-line-inner-circle']} ${styles['section-inner-line-inner-circle-02']}`}>성수</div>
              <div className={`${styles['section-inner-line-inner-circle']} ${styles['section-inner-line-inner-circle-03']}`}>홍대</div>
              {1000 < windowSize.width &&
                <div className={`${styles['section-inner-line-inner-circle']} ${styles['section-inner-line-inner-circle-04']}`}>부천</div>
              }
            </div>
          </div>
        }
        <div className={styles['section-inner-title']}>
          집단지성으로 완성하는 우리만의 채식 지도
        </div>
        <div className={styles['section-inner-image']}>
          <Image className={styles.symbol} src={Section01Image} width={343} height={550} alt='section-01'></Image>
        </div>
        <button className={styles['section-inner-button']} onClick={()=>router.push('/search')}>지도 바로보기</button>
      </div>
    </div>
  )
}

export default Section01