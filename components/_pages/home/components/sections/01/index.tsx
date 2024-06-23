import styles from './section.module.scss'
import Image from 'next/image'
import Section01Image from '@/public/images/home/section01.png'

const Section01 = () => {
  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        <div className={styles['section-inner-title']}>
          집단지성으로 완성하는 우리만의 채식 지도
        </div>
        <div className={styles['section-inner-image']}>
          <Image className={styles.symbol} src={Section01Image} width={343} height={550} alt='section-01'></Image>
        </div>
        <button className={styles['section-inner-button']}>지도 바로보기</button>
      </div>
    </div>
  )
}

export default Section01