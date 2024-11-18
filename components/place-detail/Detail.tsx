"use client"

import { useState } from 'react'
import styles from './Detail.module.scss'
import { useWindowSize } from '@/lib/hooks'
import Carousel from '@/components/carousel'
import ImageGallery from './components/image-gallery'
import Spinner from '@/public/icons/LoadingSpinnerWhite'
import Review from '@/components/place-detail/components/review/review'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { update_is_shown_detail } from '@/lib/store/modules/search'
import type { Place } from '@/types/place'

const PlaceDetail = ({ place, loading }: { place?: Place | null, loading?: boolean }) => {
  // console.log(place)
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()
  const isShownDetail = useAppSelector(((state) => state.search.isShownDetail))

  const [isShownImageGallery, setIsShownImageGallery] = useState(false)
  const handleOpenImageGallery = () => setIsShownImageGallery(true)
  const handleCloseImageGallery = () => setIsShownImageGallery(false)

  const handleCloseDetail = () => dispatch(update_is_shown_detail(false))

  const getSlides = (imageList: { id: number, isMain: boolean, url: string }[]): string[] => {
    const mainImg = imageList.find(img => img.isMain)?.url!
    const restedImg = imageList.filter(img => !img.isMain)?.map(img => img.url)

    return [mainImg, ...restedImg]
  }

  const [reaction, setReation] = useState(true)

  const handleRegisterReaction = () => {
    setReation(true)
  }

  const handleCancelReaction = () => {
    setReation(false)
  }

  const handleClickReaction = () => {
    if (reaction) handleCancelReaction()
      else handleRegisterReaction()
  }

  const getOpeningHour = (v: string) => {
    if (v === 'openingHourMon') return '월'
    if (v === 'openingHourTue') return '화'
    if (v === 'openingHourWed') return '수'
    if (v === 'openingHourThu') return '목'
    if (v === 'openingHourFri') return '금'
    if (v === 'openingHourSat') return '토'
    if (v === 'openingHourSun') return '일'
  }

  const changeLineName = (subwayLineName: string) => {
    const nameList = subwayLineName.split('')

    if (nameList[0] === '0') subwayLineName = nameList.splice(1).join('')
    if (subwayLineName.includes('호선')) return subwayLineName.replace('호선', '')
    if (subwayLineName.includes('선')) return subwayLineName.replace('선', '')
    return subwayLineName
  }
  const week = ['일', '월', '화', '수', '목', '금', '토']
  const dayOfWeek = week[new Date().getDay()]

  return place && isShownDetail && (
    <div className={styles.wrapper}>
      <div className={`${styles.loading} ${loading ? styles.show_loading : styles.hide_loading}`}>
        <Spinner size='22px' color='#232323' />
      </div>
      {place && 
        <div className={styles.outer}>
          <div className={styles.content}>
            {1100 < windowSize.width &&
              <>
                <div className={styles["back-gradation"]}></div>
                <button className={styles["close"]} onClick={handleCloseDetail}>
                  <svg width="32px" height="32px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                    <path d="M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426" stroke="rgba(255, 255, 255, 0.9)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </button>
              </>
            }
            <div className={`${styles.card_detail_carousel}`}>
              <Carousel slides={getSlides(place.imageList)} placeId={place.id} />
            </div>

            <div className={styles.card_detail_content}>
              <div className={styles.header}>
                <div className={styles.title_wrap}>
                  <div className={styles.title}>{place.name}</div>
                  <div className={styles.category}>{[...new Set(place.categoryList.map(c => c.categoryGroup))].join(', ')}</div>
                </div>
                {/* {reaction 
                  ? <button className={styles.heart_icon} onClick={handleClickReaction}>
                      <svg width="22px" height="22px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z" fill="#E72929"></path>
                      </svg>
                    </button>
                  : <button className={styles.heart_icon} onClick={handleClickReaction}>
                      <svg width="22px" height="22px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                        <path d="M22 8.86222C22 10.4087 21.4062 11.8941 20.3458 12.9929C17.9049 15.523 15.5374 18.1613 13.0053 20.5997C12.4249 21.1505 11.5042 21.1304 10.9488 20.5547L3.65376 12.9929C1.44875 10.7072 1.44875 7.01723 3.65376 4.73157C5.88044 2.42345 9.50794 2.42345 11.7346 4.73157L11.9998 5.00642L12.2648 4.73173C13.3324 3.6245 14.7864 3 16.3053 3C17.8242 3 19.2781 3.62444 20.3458 4.73157C21.4063 5.83045 22 7.31577 22 8.86222Z" stroke="hsl(0,0%,79%)" strokeWidth="1.5" strokeLinejoin="round"></path>
                      </svg>
                    </button>
                } */}
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
                    <div className={styles["subway-wrapper"]}>
                      {place.subwayStation.subwayStationLineList.map((line: {id: number, lineNumber: string}) => {
                        return (
                          <div key={line.id} id={`subway-station-line-${line.lineNumber}`} className={styles["subway-line"]}>
                            {changeLineName(line.lineNumber)}
                          </div>
                        )
                      })}
                      <div className={styles["subway-name"]}>{place.subwayStation.stationName}</div>
                    </div>
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
                        <div key={String(idx)} className={`${styles.time_wrap} ${getOpeningHour(h[0]) === dayOfWeek && styles.today_active}`}>
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

              {place.menuList.length > 0 && (
                <>
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
                    {!!place.additionalInfo &&
                      <div className={styles.additional_info}>
                        {place.additionalInfo}
                      </div>
                    }
                  </div>
                </>
              )}
              

              <div className={styles.divider}></div>

              <Review place={place} data={place.overallReview} handleOpenImageGallery={handleOpenImageGallery} />
            </div>
          </div>
          {isShownImageGallery &&
            <ImageGallery reviewImageList={place.reviewImageList} handleCloseImageGallery={handleCloseImageGallery} />
          }
        </div>
      }
    </div>
  )
}

export default PlaceDetail