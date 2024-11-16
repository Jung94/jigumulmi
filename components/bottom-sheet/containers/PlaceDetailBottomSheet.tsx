"use client"

import Image from 'next/image'
import { ReactNode, memo, useRef, useState } from 'react'
import styles from '../bottom-sheet.module.scss'
import { getCurrentOpeningInfo } from '@/lib/utils/getCurrentOpeningInfo'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import FloatingButton from '../FloatingButton'
import type { Place } from '@/types/place'

type Props = {
  children: ReactNode
  place: Place
  handleClickFloatBtn: ()=>void
}

const PlaceDetailBottomSheet = ({
  children,
  place,
  handleClickFloatBtn
}: Props) => {
  const sheetRef = useRef<BottomSheetRef>(null)
  const [ isOpen, setIsOpen ] = useState(false)

  const handleOpenBottomSheet = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    sheetRef.current?.snapTo(({ snapPoints }) =>
      Math.max(...snapPoints)
    )
    setIsOpen(true)
  }

  return (
    <BottomSheet 
      id="bottom-sheet"
      open
      skipInitialTransition
      ref={sheetRef}
      blocking={false}
      scrollLocking={false}
      expandOnContentDrag={true}
      header={
        <div className={styles.empty_space}>
          <FloatingButton onClick={handleClickFloatBtn} />
        </div>
      }
      defaultSnap={({ maxHeight }) => 150}
      snapPoints={({ minHeight, maxHeight }) => [
        150,
        maxHeight - 52,
      ]}
      onSpringStart={(event) => {
        requestAnimationFrame(() => {
          if (event.type === 'SNAP' && sheetRef.current && sheetRef.current.height > 150) {
            setIsOpen(true)
          } else {
            setIsOpen(false)
          }
        })
      }}
    >
      <div className={`${styles['detail-summary']} ${isOpen && styles['detail-summary-disabled']}`} onClick={handleOpenBottomSheet}>
        <div className={styles['detail-summary-content']}>
          <div className={styles['detail-summary-content-left']}>
            <div className={styles['detail-summary-content-left-title']}>{place.name}</div>
            <div className={styles['detail-summary-content-left-category']}>{place.category}</div>
            
            <div className={styles['detail-summary-content-left-today-time']}>
              <span className={`
                ${styles['detail-summary-content-left-today-time-content']} 
                ${styles[`detail-summary-content-left-today-time-content-${getCurrentOpeningInfo(place.currentOpeningInfo).className}`]}
              `}>
                {getCurrentOpeningInfo(place.currentOpeningInfo).info}
              </span>
            </div>
            <div className={styles['detail-summary-content-left-review-star-rating']}>
              <div className={styles['detail-summary-content-left-review-star-rating-icon']}>
                <svg width="16px" height="16px" strokeWidth="1.5" viewBox="0 0 24 24" fill='#0060AE' xmlns="http://www.w3.org/2000/svg" color="#000000">
                  <path d="M8.58737 8.23597L11.1849 3.00376C11.5183 2.33208 12.4817 2.33208 12.8151 3.00376L15.4126 8.23597L21.2215 9.08017C21.9668 9.18848 22.2638 10.0994 21.7243 10.6219L17.5217 14.6918L18.5135 20.4414C18.6409 21.1798 17.8614 21.7428 17.1945 21.3941L12 18.678L6.80547 21.3941C6.1386 21.7428 5.35909 21.1798 5.48645 20.4414L6.47825 14.6918L2.27575 10.6219C1.73617 10.0994 2.03322 9.18848 2.77852 9.08017L8.58737 8.23597Z" stroke="#000000" strokeWidth="0" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles['detail-summary-content-left-review-star-rating-number']}>{place.overallReview.averageRating}</div>
              <div className={styles['detail-summary-content-left-review-count']}>
                리뷰 {place.overallReview.totalCount}
              </div>
            </div>
          </div>
          <div className={styles['detail-summary-content-right']}>
            <div className={styles['detail-summary-content-right-image-wrapper']}>
              <Image fill src={place.imageList[0].url} alt={place.name} style={{objectFit: 'cover', borderRadius: '5px'}} />
            </div>
          </div>
        </div>
      </div>
      {children}
    </BottomSheet>
  )
}

export default memo(PlaceDetailBottomSheet)