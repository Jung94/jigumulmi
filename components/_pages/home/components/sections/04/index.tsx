import styles from './section.module.scss'
import Image from 'next/image'
import Section04Image from '@/public/images/home/section04.webp'

const Section04 = () => {
  return (
    <div className={styles['section']}>
      <div className={styles['section-inner']}>
        <div className={styles['section-inner-title']}>
          따뜻하게, 때로는 솔직하게
        </div>
        <div className={styles['section-inner-title-sub']}>
          채식하면서도 맛있게 먹고 싶으니까, 솔직한 방문 후기를 공유하는 커뮤니티
        </div>
        <div className={styles['section-inner-image']}>
          <Image className={styles['section-inner-image-content']} src={Section04Image} width={337} height={285} sizes="340px" layout='fixed' placeholder='blur' alt='section-04' />
        </div>
      </div>
    </div>
  )
}

export default Section04