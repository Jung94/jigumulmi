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
import { update_is_shown } from '@/lib/store/modules/bottom-sheet'
import { update_is_shown_detail, update_marker } from '@/lib/store/modules/search'

import { useModal } from '@/lib/hooks'
import RegistrationBakeryContent from '@/components/modal/registration-bakery/Content'
import type { PlaceSummary } from '@/types/place'
import { useGetPlaceList, useGetPlaceDetail } from '@/domain/search/query'
import { convertPlaceList } from '@/app/search/_utils/convertPlaceList'

type KakaoSearchResult = {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}

export default function Search() {
  const router = useRouter()
  const cache = useQueryClient()
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const stationId = searchParams?.get("stationId") // string | null
  const stationName = searchParams?.get("stationName") // string | null
  const selectedPlace = searchParams?.get("place") // string | null
  const isShownDetail = useAppSelector(((state) => state.search.isShownDetail))
  const marker = useAppSelector(((state) => state.search.marker))
  const kakaoMap = useAppSelector(((state) => state.search.kakaoMap))
  const kakaoKeywordSearch = useAppSelector(((state) => state.search.kakaoKeywordSearch))

  const [ bakeryList, setBakeryList ] = useState<PlaceSummary[]>(cache.getQueryData(["places"]) ?? [])
  const [ allThePlaces ] = useState<PlaceSummary[]>(cache.getQueryData(["places"]) ?? [])
  const { data: places } = useGetPlaceList({ 
    subwayStationId: stationId != null ? Number(stationId) : undefined,
    placeId: marker?.placeId ?? (selectedPlace ? Number(selectedPlace) : undefined)
  })

  const [ detail, setDetail ] = useState(null)
  const handleResetDetail = () => setDetail(null)
  const { data: placeDetail, isFetching } = useGetPlaceDetail(selectedPlace ? Number(selectedPlace) : 0)

  // set URL query parameter - search_query
  const setUrlSearchQuery = (type: 'card' | 'marker', placeId: number) => {  
    if (!searchParams) return

    const params = new URLSearchParams(searchParams)
    
    if (type === 'marker') {
      params.delete('stationId')
    } else if (type === 'card') {
      if (!params.has('stationId')) {
        params.set('stationId', "")
      }
    }
  
    params.set('place', String(placeId))
    router.push(`search?${params.toString()}`)
  }

  // 검색 결과 리스트에서 카드 클릭
  const handleClickPlaceCard = (bakeryId: number) => {
    setUrlSearchQuery('card', bakeryId)
    dispatch(update_is_shown_detail(true))
  }

  const RegistrationBakeryModal = useModal(
    <RegistrationBakeryContent onClose={handleCloseRegistrationBakeryModal} /> 
  )
  function handleOpenRegistrationBakeryModal() { RegistrationBakeryModal.open() }
  function handleCloseRegistrationBakeryModal() { RegistrationBakeryModal.close() }

  function panTo(x: number, y: number) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new window.kakao.maps.LatLng(x, y)
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    kakaoMap.panTo(moveLatLon);
  }

  const getLocationOfKeyword = (value: string) => {
    if (value.trim().slice(-1) === '역') value = value.trim()
      else value = `${value.trim()}역`
    
    const getLocation = (result: KakaoSearchResult[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let location: KakaoSearchResult | undefined
        const stations = result.filter((e: KakaoSearchResult) => e.category_group_code === 'SW8')  // SW8: 지하철역
        
        location = stations[0]

        if (!location) return  // ex. 강릉역 검색 시
        const locationY = 1100 < windowSize.width ? location.y : String(parseFloat(location.y) - 0.025)

        panTo(Number(locationY), Number(location.x))
        dispatch(update_is_shown(true))
      }
    }
    kakaoKeywordSearch && kakaoKeywordSearch(value, getLocation)
  }

    // 쿼리 스트림 place 변경 시 동작
  useEffect(()=>{
    if (!selectedPlace) {
      setDetail(null)
      dispatch(update_is_shown_detail(false))
      return
    }

    dispatch(update_is_shown(true)) // bottom-sheet
    
    if (1100 < windowSize.width) dispatch(update_is_shown_detail(true))
  }, [selectedPlace, windowSize.width])

  useEffect(()=>{
    if (!window.kakao || !kakaoMap || !stationName) return 
    
    getLocationOfKeyword(stationName)
  }, [stationName, window.kakao, kakaoMap])

  useEffect(()=>{
    if (!stationId) return

    if (marker) {
      dispatch(update_marker(null))
    }
  }, [stationId])

  // 지도 마커 클릭했을 때 동작
  useEffect(()=>{
    if (!marker) return

    setUrlSearchQuery('marker', marker.placeId)
  }, [marker])

  useEffect(()=>{
    const placeList = places?.data
    if (!placeList?.length) return

    setBakeryList(convertPlaceList(placeList))
  }, [places])

  useEffect(()=>{
    if (!placeDetail?.data?.id) return

    setDetail(placeDetail.data)

    return () => {
      handleResetDetail()
    }
  }, [placeDetail])

  return allThePlaces && (
    <>
      <div className={`${styles.container} ${isShownDetail && detail && styles.hasDetail}`}>
        <div className={styles.map}>
          <KakaoMap placeList={allThePlaces} placeCode={selectedPlace ? Number(selectedPlace) : null} />
        </div>
        {/* PC ver */}
        {1100 < windowSize.width &&
          <div className={styles.bakeries_wrap}>
            <BakeryDetail place={detail} loading={isFetching} />
            <div className={styles.cards}>
              {bakeryList.map((place: PlaceSummary) => (
                <BakeryCard key={place.id} place={place} onClick={handleClickPlaceCard} />
              ))}
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
          {!isFetching && <BakeryDetail place={detail} handleResetDetail={handleResetDetail} />}
          
          <BottomSheet handleClickFloatBtn={handleOpenRegistrationBakeryModal}>
            <SearchContent placeList={bakeryList} handleClickPlaceCard={handleClickPlaceCard} />
          </BottomSheet>
        </>
      }
      {RegistrationBakeryModal.Dialog}
    </>
  )
}
