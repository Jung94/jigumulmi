"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useWindowSize } from '@/lib/hooks'
import styles from './search.module.scss'
import BakeryCard from '@/components/card/Bakery'
import BakeryDetail from '@/components/bakery-detail/Detail'
import BottomSheet from '@/components/bottom-sheet'
import { SearchContent } from '@/components/bottom-sheet/contents'

import KakaoMap from '@/components/kakaoMap'
import { useQueryClient } from '@tanstack/react-query'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { update_station_cd } from '@/lib/store/modules/search'
import { update_is_shown } from '@/lib/store/modules/bottom-sheet'
import { update_is_shown_detail } from '@/lib/store/modules/search'

import { useModal } from '@/lib/hooks'
import RegistrationBakeryContent from '@/components/modal/registration-bakery/Content'
import type { Bakery } from '@/types/bakery'

export default function Search() {
  const cache = useQueryClient()
  const [ bakeryList ] = useState<Bakery[] | undefined>(()=>{
    const data = cache.getQueryData(["bakeries"])
    return data ? data.data : []
  })
  const router = useRouter()
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const selectedBakeryId = searchParams?.get("bakery")
  const bakeryCode = useAppSelector(((state) => state.search.bakery_cd))
  const bakeries = useAppSelector(((state) => state.search.bakeries))
  const [ bakery, setBakery ] = useState<Bakery>(null)

  // set URL query parameter - search_query
  const setUrlSearchQuery = (bakeryId: number, reset?: boolean) => {  
    let params: any;
    if (reset) params = new URLSearchParams()
      else if (!searchParams) return
      else params = new URLSearchParams(searchParams)
  
    params.set('bakery', bakeryId)
    router.push(`search?${params.toString()}`)
  }

  const handleClickBakeryCard = (bakeryId: number) => {
    setUrlSearchQuery(bakeryId, true)
    dispatch(update_is_shown_detail(true))
  }

  const RegistrationBakeryModal = useModal(
    <RegistrationBakeryContent onClose={handleCloseRegistrationBakeryModal} /> 
  )
  function handleOpenRegistrationBakeryModal() { RegistrationBakeryModal.open() }
  function handleCloseRegistrationBakeryModal() { RegistrationBakeryModal.close() }

  useEffect(()=>{
    if (!selectedBakeryId) return setBakery(null)

    const targetBakery = bakeryList?.find((b: Bakery) => b.id === Number(selectedBakeryId))
    setBakery(targetBakery)
    dispatch(update_is_shown(true)) // bottom-sheet

    if (1100 < windowSize.width) dispatch(update_is_shown_detail(true))
  }, [selectedBakeryId])

  useEffect(()=>{
    if (!bakeryCode) return

    dispatch(update_station_cd(""))
    setUrlSearchQuery(bakeryCode, true)
  }, [bakeryCode])

  return (
    <>
      <div className={`${styles.container} ${bakery && styles.hasDetail}`}>
        <div className={styles.map}>
          <KakaoMap bakeryList={bakeryList} bakeryCode={bakery ? bakery.id : null} />
        </div>
        {/* PC ver */}
        {1100 < windowSize.width &&
          <div className={styles.bakeries_wrap}>
            <BakeryDetail bakery={bakery} />
            <div className={styles.cards}>
              {bakeries
                ? bakeries.map((bakery: any) => (
                    <BakeryCard key={bakery.id} bakery={bakery} onClick={handleClickBakeryCard} />
                  ))
                : bakeryList?.map((bakery: any) => (
                  <BakeryCard key={bakery.id} bakery={bakery} onClick={handleClickBakeryCard} />
                ))
            }
            </div>
            
            <button 
              className={`${styles.floating_button} ${styles.registration_bakery}`}
              onClick={handleOpenRegistrationBakeryModal}
            >
              <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
            </button>
          </div>
        }

      </div>

      {/* Mobile ver */}
      {windowSize.width <= 1100 &&
        <>
          <BakeryDetail bakery={bakery} />
          <BottomSheet handleClickFloatBtn={handleOpenRegistrationBakeryModal}>
            <SearchContent bakeries={bakeries ?? bakeryList} handleClickBakeryCard={handleClickBakeryCard} />
          </BottomSheet>
        </>
      }
      {RegistrationBakeryModal.Dialog}
    </>
  )
}
