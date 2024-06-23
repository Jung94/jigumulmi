import styles from './section.module.scss'
import Image from 'next/image'
import Section01Image from '@/public/images/home/section01.png'

const Section03 = () => {
  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        <div className={styles['section-inner-title']}>
          "이 메뉴 채식 옵션 가능해요!"
        </div>
        <div className={styles['section-inner-title-sub']}>
          가 본 사람이 공유하는 채식 메뉴 정보
        </div>
        <div className={styles['section-inner-image']}>
          {/* <Image className={styles.symbol} src={Section01Image} width={343} height={550} alt='section-01'></Image> */}
        </div>
      </div>
    </div>
  )
}

export default Section03