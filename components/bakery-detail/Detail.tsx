"use client"

import Image from 'next/image'
import styles from './Detail.module.scss'
import Spinner from '@/public/icons/LoadingSpinnerWhite'
import Review from '@/components/bakery-detail/components/review/review'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { update_is_shown_detail } from '@/lib/store/modules/search'
import type { Place } from '@/types/place'

const PlaceDetail = ({ place, loading }: { place?: Place | null, loading: boolean }) => {
  const dispatch = useAppDispatch()
  const isShownDetail = useAppSelector(((state) => state.search.isShownDetail))
  const getOpeningHour = (v: string) => {
    if (v === 'openingHourMon') return '월'
    if (v === 'openingHourTue') return '화'
    if (v === 'openingHourWed') return '수'
    if (v === 'openingHourThu') return '목'
    if (v === 'openingHourFri') return '금'
    if (v === 'openingHourSat') return '토'
    if (v === 'openingHourSun') return '일'
  }

  const closeDetailOnMobile = () => {
    dispatch(update_is_shown_detail(false))
  }

  // console.log(place)

  return place && isShownDetail && (
    <div className={styles.wrapper}>
      <div className={`${styles.loading} ${loading ? styles.show_loading : styles.hide_loading}`}>
        {loading && 
          <Spinner size='22px' color='#232323' />
        }
      </div>
      {place && 
        <div className={styles.content}>
          <div className={styles.header}>
            <div className={styles.icon_close} onClick={closeDetailOnMobile}>
              <svg width="28px" height="28px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
          </div>
          <div className={styles.card_detail_carousel}>
            <Image fill src={place.mainImageUrl} alt={place.name} style={{objectFit: 'cover'}} />
          </div>
          <div className={styles.card_detail_content}>
            <div className={styles.title_wrap}>
              <div className={styles.title}>{place.name}</div>
              <div className={styles.category}>{place.category}</div>
            </div>
            
            <div className={styles.section}>
              <div className={styles.info}>
                <div className={styles.left} style={{margin: "0 0 0 -1px"}}>
                  <svg width="17px" height="17px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M20 10c0 4.418-8 12-8 12s-8-7.582-8-12a8 8 0 1116 0z" stroke="#000000" strokeWidth="1.5"></path>
                    <path d="M12 11a1 1 0 100-2 1 1 0 000 2z" fill="#000000" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div className={styles.right}>
                  <div className={styles.address}>{place.address}</div>
                </div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.section}>
              <div className={styles.info}>
                <div className={styles.left}>
                  <svg width="15px" height="15px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M12 6v6h6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <div className={styles.right}>
                  <div className={styles.opening_hours}>
                    {Object.entries(place.openingHour).map((h: string[], idx: number) =>
                      <div key={String(idx)} className={styles.time_wrap}>
                        <div className={styles.day}>
                          {getOpeningHour(h[0])}
                        </div>
                        <div className={styles.time}>
                          <div className={styles.start}>{h[1].split(" - ")[0]}</div>
                          {h[1].split(" - ")[1] && <div>~</div>}
                          <div className={styles.end}>{h[1].split(" - ")[1]}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.section}>
              <div className={styles.title}>메뉴</div>
              <div className={styles.main_menus}>
                {place.menuList.map((menu: {id: number, name: string}) => {
                  return (
                    <div key={menu.id} className={styles.menu}>
                      <div className={styles.checkbox}>
                        <svg width="11px" height="11px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                          <path d="M5 13l4 4L19 7" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                      </div>
                      <div className={styles.menu_nm}>{menu.name}</div>
                    </div>
                  )
                })}
              </div>
              <div className={styles.additional_info}>
                {place.additionalInfo}
              </div>
            </div>

            <div className={styles.divider}></div>

            <Review placeId={place.id} data={place.overallReview} />
          </div>
        </div>
      }
    </div>
  )
}

export default PlaceDetail