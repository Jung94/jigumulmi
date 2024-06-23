import styles from './section.module.scss'
import Link from 'next/link'

const Section05 = () => {
  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        <div className={styles['section-inner-title']}>
          지구멀미, 무슨 뜻이에요?
        </div>
        <div className={styles['section-inner-title-sub']}>
          지구에게 편안한 속도를 찾아가는 여정, 지구멀미 팀의 이야기를 확인해 보세요.
        </div>
        <div className={styles['section-inner-button-wrapper']}>
          <button className={styles['section-inner-button']}>
            <Link href="https://developerjoseph.notion.site/dfea728380654c84b4b898b63e411707?pvs=4" target='_blank'>팀 소개 바로가기</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Section05