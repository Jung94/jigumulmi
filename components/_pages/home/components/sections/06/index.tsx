import styles from './section.module.scss'
import Link from 'next/link'

const Section06 = () => {
  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        <div className={styles['section-inner-title-sub']}>
          지구멀미가 더 나은 정보를 제공할 수 있도록 <br/>개선 의견을 남겨주시면 적극적으로 반영하겠습니다.
        </div>
        <div className={styles['section-inner-button-wrapper']}>
          <button className={styles['section-inner-button']}>
            <Link href="https://smore.im/form/gKNbMW1VUf" target='_blank'>의견 남기기</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Section06