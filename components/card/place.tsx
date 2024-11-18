import Image from 'next/image'
import styles from './place.module.scss'
import { getCurrentOpeningInfo } from '@/lib/utils/getCurrentOpeningInfo'
import type { PlaceSummary } from '@/types/place'

type Props = {
  selected: boolean
  place: PlaceSummary
  onClick: (place: PlaceSummary)=>void
}

const BakeryCard = ({ selected, place, onClick }: Props) => {
  const changeLineName = (subwayLineName: string) => {
    const nameList = subwayLineName.split('')
    
    if (nameList[0] === '0') subwayLineName = nameList.splice(1).join('')
    if (subwayLineName.includes('호선')) return subwayLineName.replace('호선', '')
    if (subwayLineName.includes('선')) return subwayLineName.replace('선', '')
    return subwayLineName
  }

  return place && (
    <div className={`${styles.bakery_card} ${selected ? styles.selected : ''}`} onClick={()=>onClick(place)}>
      <div className={styles.card_image}>
        <Image className={styles.image} fill src={place.imageUrl} alt={place.name} />
      </div>
      <div className={styles.card_info_wrap}>
        <div className={styles.top}>
          <div className={styles.left}>
            <div className={styles.card_title}>{place.name}</div>
            <div className={styles.card_category}>{[...new Set(place.categoryList.map(c => c.categoryGroup))].join(', ')}</div>
          </div>
          <div className={styles.right}>
            <div className={`${styles['status']} ${styles[`status-${getCurrentOpeningInfo(place.currentOpeningInfo).className}`]}`}>
              {getCurrentOpeningInfo(place.currentOpeningInfo).info}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.subway_station_wrapper}>
            {place.subwayStation.subwayStationLineList.map((line: {id: number, lineNumber: string}) => {
              return (
                <div key={line.id} id={`subway-station-line-${line.lineNumber}`} className={styles.subway_line}>
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