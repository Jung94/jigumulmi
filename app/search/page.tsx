"use client"

import React, {useEffect, useState} from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './root.module.scss'
import BakeryCard from '@/components/card/Bakery'
import BakeryDetail from '@/components/bakery-detail/Detail'

import KakaoMap from '@/components/kakaoMap'
import { update_station_cd } from '@/lib/store/modules/search'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { BAKERIES } from '@/lib/json/bakery.json'

export default function SearchPage() {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const searchParams = useSearchParams()
  const selectedBakeryId = searchParams?.get("bakery")
  const station_cd = useAppSelector(((state) => state.search.station_cd))
  const bakeryCode = useAppSelector(((state) => state.search.bakery_cd))
  const bakeries = useAppSelector(((state) => state.search.bakeries))
  // const [ bakeries, setBakeries ] = useState<any[]>(BAKERIES)
  const [ bakery, setBakery ] = useState<any>(null)

  // set URL query parameter - search_query
  const setUrlSearchQuery = (keyword: string, reset?: boolean) => {
    let params: any;
    if (reset) params = new URLSearchParams()
      else if (!searchParams) return
      else params = new URLSearchParams(searchParams)
    // const params = new URLSearchParams(searchParams)
  
    params.set('bakery', keyword)
    router.push(`search?${params.toString()}`)
  }

  // useEffect(()=>{
  //   if (!station_cd) return

  //   let list_01: any[] = []
  //   let list_02: any[] = []
  //   BAKERIES.map((e: any) => {
  //     const hasStationOnFirst = !!(e.stations[0].station_cd.find((v: any) => v === station_cd))
  //     const hasStationOnSecond = !!(e.stations[1].station_cd.find((v: any) => v === station_cd))
  //     if (hasStationOnFirst) list_01.push(e)
  //     if (hasStationOnSecond) list_02.push(e)
  //   })
  //   setBakeries([...list_01, ...list_02])
  // }, [station_cd])

  useEffect(()=>{
    if (!selectedBakeryId) return setBakery(null)
    const targetBakery = BAKERIES.find(b => b.id === Number(selectedBakeryId))
    setBakery(targetBakery)
  }, [selectedBakeryId])

  useEffect(()=>{
    if (!bakeryCode) return
    dispatch(update_station_cd(""))
    setUrlSearchQuery(String(bakeryCode), true)
  }, [bakeryCode])


  return (
    <div className={`${styles.container} ${bakery && styles.hasDetail}`}>
      <div className={styles.map}>
        <KakaoMap />
      </div>
      <div className={styles.bakeries_wrap}>
        <BakeryDetail bakery={bakery} />
        <div className={styles.cards}>
          {bakeries.map((bakery: any) => (
            <BakeryCard key={bakery.id} bakery={bakery} onClick={setUrlSearchQuery} />
          ))}
        </div>
        
        <button className={`${styles.floating_button} ${styles.registration_bakery}`}>
          <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
        </button>
      </div>
    </div>
  )
}
