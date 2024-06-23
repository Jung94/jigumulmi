import styles from './section.module.scss'
import Image from 'next/image'
import Section01Image from '@/public/images/home/section01.png'

const Section02 = () => {
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
          {/* <Image className={styles.symbol} src={Section01Image} width={343} height={550} alt='section-01'></Image> */}
        </div>
      </div>
    </div>
  )
}

export default Section02