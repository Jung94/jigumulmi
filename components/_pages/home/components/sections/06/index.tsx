import styles from './section.module.scss'
import Image from 'next/image'
import Section01Image from '@/public/images/home/section01.png'

const Section06 = () => {
  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        <div className={styles['section-inner-title-sub']}>
          지구멀미가 더 나은 정보를 제공할 수 있도록 <br/>개선 의견을 남겨주시면 적극적으로 반영하겠습니다.
        </div>
        <div className={styles['section-inner-button-wrapper']}>
          <button className={styles['section-inner-button']}>의견 남기기</button>
        </div>
      </div>
    </div>
  )
}

export default Section06