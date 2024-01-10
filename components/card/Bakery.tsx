import Image from 'next/image'
import styles from './Bakery.module.scss'

type Props = {
  bakery: any
  onClick: (keyword: string)=>void
}

const BakeryCard = ({ bakery, onClick }: Props) => {
  return (
    <div className={styles.bakery_card} onClick={()=>onClick(bakery.id)}>
      <div className={styles.card_image}>
        <Image className={styles.image} fill src={bakery.image_thum} alt={bakery.bakery_nm} />
      </div>
      <div className={styles.card_info_wrap}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.card_title}>{bakery.bakery_nm}</div>
            <div className={styles.card_desc}>비건 성지순례 오세요!</div>
          </div>
          <div className={styles.right}>
            <div className={`${styles.status} ${styles.open}`}>영업 중</div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.subway_line}>2</div>
          <div className={styles.subway_station}>{bakery.stations[0].station_nm}</div>
        </div>
      </div>
    </div>
  )
}

export default BakeryCard