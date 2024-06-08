import Image from 'next/image'
import styles from './Bakery.module.scss'
import type { PlaceSummary, SubwayStation } from '@/types/place'

type Props = {
  place: PlaceSummary
  onClick: (place: PlaceSummary)=>void
}

const BakeryCard = ({ place, onClick }: Props) => {
  
  const changeLineName = (subwayLineName: string) => {
    const nameList = subwayLineName.split('')

    if (nameList[0] === '0') subwayLineName = nameList.splice(1).join('')
    if (subwayLineName.includes('호선')) return subwayLineName.replace('호선', '')
    if (subwayLineName.includes('선')) return subwayLineName.replace('선', '')
  }

  return place && (
    <div className={styles.bakery_card} onClick={()=>onClick(place)}>
      <div className={styles.card_image}>
        <Image className={styles.image} fill src={place.images[0]} alt={place.name} />
      </div>
      <div className={styles.card_info_wrap}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.card_title}>{place.name}</div>
            <div className={styles.card_desc}>비건 성지순례 오세요!</div>
          </div>
          {/* <div className={styles.right}>
            <div className={`${styles.status} ${styles.open}`}>영업 중</div>
          </div> */}
        </div>
        <div className={styles.bottom}>
          <div className={styles.subway_station_wrapper}>
            {place.subwayStation.subwayStationLineList.map((line: {id: number, lineNumber: string}) => {
              return (
                <div key={line.id} className={`${styles.subway_line} ${styles[`line_${line.lineNumber}`]}`}>
                  {changeLineName(line.lineNumber)}
                </div>
              )
            })}
            <div className={styles.subway_station}>{place.subwayStation.stationName}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BakeryCard