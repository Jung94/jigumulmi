"use client"

import React, {useEffect, useState} from 'react'
import Image from 'next/image'
import styles from './root.module.scss'

import KakaoMap from '@/components/kakaoMap'
import { useAppSelector } from '@/lib/store/hooks'
import { BAKERIES } from '@/lib/json/bakery.json'

export default function Home() {
  const { station_cd, bakery_cd } = useAppSelector(((state) => state.search))
  const [bakeries, setBakeries] = useState<any[]>(BAKERIES)
  console.log(bakeries)

  useEffect(()=>{
    if (!station_cd) return

    let list_01: any[] = []
    let list_02: any[] = []
    BAKERIES.map((e: any) => {
      const hasStationOnFirst = !!(e.stations[0].station_cd.find((v: any) => v === station_cd))
      const hasStationOnSecond = !!(e.stations[1].station_cd.find((v: any) => v === station_cd))
      if (hasStationOnFirst) list_01.push(e)
      if (hasStationOnSecond) list_02.push(e)
    })
    setBakeries([...list_01, ...list_02])
  }, [station_cd])

  useEffect(()=>{
    if (!bakery_cd) return
  }, [bakery_cd])

  let bool = false
  const selectedBakery = bakeries[11]

  return (
    <div className={`${styles.container} ${bool && styles.hasDetail}`}>
      <div className={styles.map}>
        <KakaoMap />
      </div>
      <div className={styles.bakeries_wrap}>
        {/* {bakery_cd && */}
        {bool &&
          <div className={styles.card_detail}>
            <div className={styles.card_detail_carousel}>
              <Image fill src={selectedBakery.image_thum} alt={selectedBakery.bakery_nm} unoptimized={true} />
            </div>
            <div className={styles.card_detail_content}>
              <div className={styles.title_wrap}>
                <div className={styles.title}>{selectedBakery.bakery_nm}</div>
                <div className={styles.category_main}>{selectedBakery.category_main}</div>
              </div>
              <div className={styles.info_wrap}>
                <div className={styles.info}>
                  <div className={styles.left} style={{margin: "0 0 0 -1px"}}>
                    <svg width="17px" height="17px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                      <path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z" stroke="#000000" strokeWidth="1.5"></path>
                      <path d="M12 11a1 1 0 100-2 1 1 0 000 2z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.address}>서울 마포구 독막로7길 62 1층</div>
                    <div className={styles.station}>2호선 홍대입구</div>
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.left}>
                    <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                      <path d="M12 6v6h6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                  </div>
                  <div className={styles.right}>
                    <div className={styles.status}>
                      <div className={styles.current_status}>영업 중</div>
                      <div className={styles.time}>22시까지</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.content_wrap}>
                <div className={styles.main_menus}>
                  <div className={styles.menu}>
                    <div className={styles.checkbox}>
                      <svg width="13px" height="13px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M5 13l4 4L19 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <div className={styles.menu_nm}>무화과치아바타</div>
                    <div className={styles.price}>6,000원</div>
                  </div>
                  <div className={styles.menu}>
                    <div className={styles.checkbox}>
                      <svg width="13px" height="13px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M5 13l4 4L19 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                      </svg>
                    </div>
                    <div className={styles.menu_nm}>무화과치아바타</div>
                    <div className={styles.price}>6,000원</div>
                  </div>
                </div>
                <div className={styles.content}>
                  이모지 넣을 수 있어?
                </div>
              </div>
            </div>
          </div>
        }
        <div className={styles.cards}>
          {bakeries.map((e: any) => (
            <div key={e.id} className={styles.card}>
              <div className={styles.card_image}>
                <Image className={styles.image} fill src={e.image_thum} alt={e.bakery_nm} unoptimized={true} />
              </div>
              <div className={styles.card_info_wrap}>
                <div className={styles.top}>
                  <div className={styles.left}>
                    <div className={styles.card_title}>{e.bakery_nm}</div>
                    <div className={styles.card_desc}>비건 성지순례 오세요!</div>
                  </div>
                  <div className={styles.right}>
                    <div className={`${styles.status} ${styles.open}`}>영업 중</div>
                  </div>
                </div>
                <div className={styles.bottom}>
                  <div className={styles.subway_line}>2</div>
                  <div className={styles.subway_station}>{e.stations[0].station_nm}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className={`${styles.floating_button} ${styles.registration_bakery}`}>
          <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
      </div>
    </div>
  )
}
