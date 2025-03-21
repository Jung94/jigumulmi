import Image from 'next/image'
import { useState } from 'react'
import styles from './basic.module.scss'
import { setCookie } from 'cookies-next'
import { Button } from '@/src/shared/ui/admin'
import { useAuthCheck } from '@/src/shared/hooks'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { ArrowDown, ArrowRight, ImageEmpty, Star } from '@/src/shared/assets/icons'
import { 
  ReviewCard,
  ReviewImageList,
} from '@/src/2.widgets/service-place-detail/ui'
import { 
  useFetchMenuList,
  useFetchReviewList,
  useFetchReviewImageList,
  useFetchReviewStatistics,
} from '@/src/4.entities/place/model/queries'
import type { 
  PlaceBasic, 
  DayOfTheWeek, 
  WeeklyBusinessHour, 
} from '@/src/4.entities/place/model/types'

export default function PlaceBasic({
  bannerId,
  placeId,
  data,
  onTabTrigger
}: {
  bannerId: number
  placeId: number
  data: PlaceBasic
  onTabTrigger: (newTab: string) => void
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isAuthenticated = useAuthCheck()
  const { data: menuList } = useFetchMenuList(placeId, { size: 4 })
  const { data: reviewStatistics } = useFetchReviewStatistics(placeId)
  const { data: reviewImageList } = useFetchReviewImageList(
    placeId, 
    reviewStatistics ? reviewStatistics.totalCount > 0 : false, 
    { size: 5 }
  )
  const { data: reviewList } = useFetchReviewList(
    placeId, 
    reviewStatistics ? reviewStatistics.totalCount > 0 : false, 
    { size: 2 }
  )

  const [isOpeningHour, setIsOpeningHour] = useState(false)

  const handleLoginPageNavigation = () => {
    if (!window.confirm('로그인 후 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?')) return
    const params = new URLSearchParams(searchParams!)
    const currentUrl = `${pathname}?${params.toString()}`
    
    setCookie('ji-login-prev-path', currentUrl)
    router.push('/login')
  }

  const handleMenuMoreClick = () => onTabTrigger('menu')
  const handleReviewMoreClick = () => onTabTrigger('review')

  const handleClickReviewCreation = () => {
    if (isAuthenticated) router.push(`/banner/${bannerId}/place/${placeId}/review`)
      else handleLoginPageNavigation()
  }

  const changeLineName = (subwayLineName: string) => {
    const nameList = subwayLineName.split('')

    if (nameList[0] === '0') subwayLineName = nameList.splice(1).join('')
    if (subwayLineName.includes('호선')) return subwayLineName.replace('호선', '')
    if (subwayLineName.includes('선')) return subwayLineName.replace('선', '')
    return subwayLineName
  }

  const handleClickOpeningHour = () => {
    setIsOpeningHour(prev => !prev)
  }

  // 영업 시간 utils
  const convertEngToKo = (value: DayOfTheWeek) => {
    switch(value) {
      case 'SUNDAY': return '일'
      case 'MONDAY': return '월'
      case 'TUESDAY': return '화'
      case 'WEDNESDAY': return '수'
      case 'THURSDAY': return '목'
      case 'FRIDAY': return '금'
      case 'SATURDAY': return '토'
    }
  }

  const mapHourAndMinute = (num: number) => {
    if (num < 10) return `0${num}`
    else return num
  }

  const drawTime = (openHour: number, openMinute: number) => {
    return `${mapHourAndMinute(openHour)}:${mapHourAndMinute(openMinute)}`
  }

  const drawTimeToTime = (openHour: number, openMinute: number, closeHour: number, closeMinute: number) => {
    return `${drawTime(openHour, openMinute)} - ${drawTime(closeHour, closeMinute)}` // ex. 12:00
  }

  const drawWeeklyBusinessHour = (openingData: WeeklyBusinessHour) => {
    return openingData.map((day, index) => {
      const isDayOff = day.isDayOff
      const temporaryDate = day.temporaryDate 
        ? `${new Date(day.temporaryDate).getMonth() + 1}/${new Date(day.temporaryDate).getDate()}`
        : null

      return (
        <div key={index} className={`
          ${styles['place-basic-opening-hour-hidden-day']}
          ${index === 0
            ? styles['place-basic-opening-hour-hidden-day-active']
            : ''
          }
        `}>
          <div className={styles['place-basic-opening-hour-hidden-day-name']}>
            {convertEngToKo(day.dayOfWeek)}
            {temporaryDate && `(${temporaryDate})`}
          </div>
          <div className={styles['place-basic-opening-hour-hidden-day-content']}>
            {isDayOff
              ? (temporaryDate ? '휴무' : '정기휴무')
              : <div className={styles['place-basic-opening-hour-hidden-day-content-hour']}>
                  {drawTimeToTime(
                    day.openTime?.hour!, 
                    day.openTime?.minute!,
                    day.closeTime?.hour!, 
                    day.closeTime?.minute!,
                  )}
                </div>
            }
            {!isDayOff && day.breakStart && day.breakEnd &&
              <div className={styles['place-basic-opening-hour-hidden-day-content-hour']}>
                {drawTimeToTime(
                  day.breakStart?.hour!, 
                  day.breakStart?.minute!,
                  day.breakEnd?.hour!, 
                  day.breakEnd?.minute!,
                )}
                &nbsp;브레이크타임
              </div>
            }
          </div>
        </div>
      )
    })
  }

  return (
    <div className={styles['place-basic']}>
      <div className={styles['place-basic-section']}>
        <div className={styles['place-basic-section-info']}>
          <div className={styles['place-basic-section-info-name']}>
            주소
          </div>
          <div className={styles['place-basic-section-info-content']}>
            {data.address}
          </div>
        </div>
        <div className={styles['place-basic-section-info']}>
          <div className={styles['place-basic-section-info-name']}>
            지하철역
          </div>
          <div className={styles['place-basic-section-info-content']}>
            <div className={styles['place-basic-subway']}>
              {data.subwayStation.subwayStationLineList?.map((line: {id: number, lineNumber: string}) => {
                return (
                  <div 
                    key={line.id} 
                    id={`subway-station-line-${line.lineNumber}`} 
                    className={styles['place-basic-subway-line']}
                  >
                    {changeLineName(line.lineNumber)}
                  </div>
                )
              })}
              <div className={styles['place-basic-subway-name']}>{data.subwayStation.stationName}</div>
            </div>
          </div>
        </div>
        <div className={styles['place-basic-section-info']}>
          <div className={styles['place-basic-section-info-name']}>
            영업시간
          </div>
          <div className={styles['place-basic-section-info-content']}>
            <div 
              className={styles['place-basic-opening-hour']}
              onClick={handleClickOpeningHour}
            >
              <div className={styles['place-basic-opening-hour-main']}>
                <div className={`
                  ${styles['place-basic-opening-hour-main-current']}
                  ${data.liveOpeningInfo.currentOpeningStatus === '영업 중'
                    ? styles['place-basic-opening-hour-main-current-active']
                    : ''
                  }
                `}>
                  {data.liveOpeningInfo.currentOpeningStatus}
                </div>
                {data.liveOpeningInfo.nextOpeningInfo &&
                  <>
                    <div className={styles['place-basic-opening-hour-main-divider']}></div>
                    <div className={styles['place-basic-opening-hour-main-next']}>
                      {drawTime(data.liveOpeningInfo.nextOpeningInfo.at.hour, data.liveOpeningInfo.nextOpeningInfo.at.minute)}
                      에&nbsp;
                      {data.liveOpeningInfo.nextOpeningInfo.status}
                    </div>
                  </>
                }
                <ArrowDown width={17} height={17} />
              </div>
              {isOpeningHour &&
                <div className={styles['place-basic-opening-hour-hidden']}>
                  {drawWeeklyBusinessHour(data.liveOpeningInfo.weeklyBusinessHour)}
                </div>
              }
            </div>
          </div>
        </div>
        {data.contact &&
          <div className={styles['place-basic-section-info']}>
            <div className={styles['place-basic-section-info-name']}>
              전화번호
            </div>
            <div className={styles['place-basic-section-info-content']}>
              {data.contact}
            </div>
          </div>
        }
      </div>

      {/* 메뉴 */}
      {menuList && menuList.pages[0].data.length > 0 &&
        <div className={styles['place-basic-menu']}>
          <div className={styles['place-basic-menu-header']}>
            <div className={styles['place-basic-menu-header-title']}>
              메뉴
            </div>
            {menuList.pages[0].page.totalCount > 4 &&
              <div 
                className={styles['place-basic-menu-header-more']}
                onClick={handleMenuMoreClick}
              >
                <span>더보기</span>
                <ArrowRight width={15} height={15} />
              </div>
            }
          </div>
          <div className={styles['place-basic-menu-list']} onClick={handleMenuMoreClick}>
            {menuList.pages[0].data.map(menu => (
              <div key={menu.name} className={styles['place-basic-menu-list-item']}>
                <div className={styles['place-basic-menu-list-item-image']}>
                  {menu.imageS3Key
                    ? <Image 
                        fill
                        alt='menu-image-preview'
                        src={process.env.NEXT_PUBLIC_CDN + menu.imageS3Key}
                        style={{ objectFit: 'cover' }}
                      />
                    : <div className={styles['place-basic-menu-list-item-image-empty']}>
                        <ImageEmpty width={24} height={24} />
                      </div>
                  }
                </div>
                <div className={styles['place-basic-menu-list-item-name']}>
                  {menu.name}
                </div>
                <div className={styles['place-basic-menu-list-item-price']}>
                  {menu.price
                    ? <>{Number(menu.price).toLocaleString()}원</>
                    : '가격 변동'
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      }

      {/* 리뷰 */}
      <div className={styles['place-basic-review']}>
        <div className={styles['place-basic-review-header']}>
          <div className={styles['place-basic-review-header-title']}>
            <span>리뷰</span>
            {reviewStatistics && reviewStatistics.totalCount > 0 &&
              <>
                <Star width={18} height={18} color='#0060AE' />
                <span>{reviewStatistics?.averageRating}</span>
              </>
            }
          </div>
          {reviewStatistics && reviewStatistics.totalCount > 2 &&
            <div 
              className={styles['place-basic-review-header-more']}
              onClick={handleReviewMoreClick}
            >
              <span>더보기</span>
              <ArrowRight width={15} height={15} />
            </div>
          }
        </div>
        {/* {reviewStatistics && reviewStatistics.totalCount > 0 && 
          <div className={styles['place-basic-review-statistics']}>
            <ReviewRating data={reviewStatistics} />
          </div>
        } */}
        {reviewImageList && reviewImageList.pages[0].data.length > 0 &&
          <ReviewImageList 
            placeId={placeId} 
            bannerId={bannerId} 
            imageList={reviewImageList.pages[0].data} 
          />
        }
        
        {reviewList && reviewList.pages[0].data.length > 0 
          ? <>
              <div className='padding-xy-mobile'>
                <Button 
                  variant='outline'
                  onClick={handleClickReviewCreation}
                  style={{ width: '100%', borderRadius: '4px' }}
                >
                  리뷰 남기기
                </Button>
              </div>
              {reviewList.pages[0].data.map((review, index) => (
                <ReviewCard 
                  key={review.id} 
                  review={review} 
                  placeId={placeId} 
                  isLast={index === reviewList.pages[0].data.length - 1} 
                />
              ))}
            </>
          : <div className='padding-x-mobile'>
              <Button 
                onClick={handleClickReviewCreation}
                style={{ width: '100%', borderRadius: '4px' }}
              >
                리뷰 남기기
              </Button>
            </div>
        }
      </div>
    </div>
  )
}