"use client"

import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useWindowSize } from '@/lib/hooks'
import Link from 'next/link'
import styles from './search.module.scss'
import Button from '@/components/button'
import BakeryCard from '@/components/card/Bakery'
import BakeryDetail from '@/components/bakery-detail/Detail'
import PlaceListBottomSheet from '@/components/bottom-sheet/containers/PlaceListBottomSheet'
import PlaceDetailBottomSheet from '@/components/bottom-sheet/containers/PlaceDetailBottomSheet'
// import BottomSheet from '@/components/bottom-sheet'
import { SearchContent } from '@/components/bottom-sheet/contents'

import KakaoMap from '@/components/kakaoMap'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { update_is_shown as update_is_shown_bottom_sheet } from '@/lib/store/modules/bottom-sheet'
import { update_is_shown_detail, update_marker } from '@/lib/store/modules/search'

import { useModal } from '@/lib/hooks'
import RegistrationBakeryContent from '@/components/modal/registration-bakery/Content'
import type { PlaceSummary } from '@/types/place'
import { useGetPlaceList, useGetPlaceDetail } from '@/domain/place/query'
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
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const stationId = searchParams?.get("stationId") // string | null
  const stationName = searchParams?.get("stationName") // string | null
  const placeId = searchParams?.get("place") // string | null
  const isShownDetail = useAppSelector(((state) => state.search.isShownDetail))
  const marker = useAppSelector(((state) => state.search.marker))
  const kakaoMapFunc = useAppSelector(((state) => state.search.kakaoMap))
  const kakaoKeywordSearch = useAppSelector(((state) => state.search.kakaoKeywordSearch))

  const [ placeList, setPlaceList ] = useState<PlaceSummary[]>([])
  const { data: places } = useGetPlaceList(stationId === null ? null : Number(stationId)) // null: all

  const [ detail, setDetail ] = useState(null)
  const handleResetDetail = () => setDetail(null)
  const { data: placeDetail, isFetching } = useGetPlaceDetail(placeId ? Number(placeId) : 0)

  // set URL query parameter - search_query
  const setUrlSearchQuery = (placeId: number) => {  
    if (!searchParams) return

    const params = new URLSearchParams(searchParams)
    
    params.set('place', String(placeId))
    router.push(`search?${params.toString()}`)
  }

  // 검색 결과 리스트에서 카드 클릭
  const handleClickPlaceCard = (place: PlaceSummary) => {
    setUrlSearchQuery(place.id)
    const latlng = new window.kakao.maps.LatLng(place.position.latitude, place.position.longitude)
    dispatch(update_marker({ placeId: place.id, position: {x: latlng.La, y: latlng.Ma} }))
    dispatch(update_is_shown_detail(true))
  }

  const RegistrationBakeryModal = useModal(
    <RegistrationBakeryContent onClose={handleCloseRegistrationBakeryModal} /> 
  )
  function handleOpenRegistrationBakeryModal() { RegistrationBakeryModal.open() }
  function handleCloseRegistrationBakeryModal() { RegistrationBakeryModal.close() }

  function panTo(x: number, y: number) {
    const moveLatLon = new window.kakao.maps.LatLng(x, y) // 이동할 위도 경도 위치 생성
    
    kakaoMapFunc.panTo(moveLatLon); // 지도 중심을 부드럽게 이동시킵니다. (만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동)
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
        const locationY = 1100 < windowSize.width ? location.y : String(parseFloat(location.y) - 0.007)

        kakaoMapFunc.relayout()
        kakaoMapFunc.setLevel(5)
        panTo(Number(locationY), Number(location.x))
        dispatch(update_is_shown_bottom_sheet(true))
      }
    }
    kakaoKeywordSearch && kakaoKeywordSearch(value, getLocation)
  }

  useEffect(()=>{
    // console.log(placeId, detail, isShownDetail, stationId)
    if (!placeId) {
      setDetail(null)

      if (!!stationId && !!stationName) { // 역 검색 후 상세페이지 있는 상태에서 동일 역 재검색 시 리렌더링
        getLocationOfKeyword(stationName)
      }

      if (!!kakaoMapFunc && !detail && !isShownDetail) {
        kakaoMapFunc.relayout()
        kakaoMapFunc.setLevel(8)
        if (!!marker) panTo(37.523844561019224, 126.98021150388406)
      }
      return
    }

    dispatch(update_is_shown_bottom_sheet(true)) // bottom-sheet
    
    if (1100 < windowSize.width) {
      // detail과 isShownDetail 값이 모두 존재할 때 상세페이지가 등장합니다. 
      // 등장 후에 relayout 메서드를 호출해야 새롭게 변경된 지도 영역에 맞춰 다시 지도를 그릴 수 있습니다.
      if (!!kakaoMapFunc && !!detail) { 
        kakaoMapFunc.relayout()
        kakaoMapFunc.setLevel(5)
        if (!!marker) panTo(marker.position.y, marker.position.x)
      }
      
    } else if (1100 >= windowSize.width) {
      if (!!kakaoMapFunc && !!detail) {
        kakaoMapFunc.relayout()
        kakaoMapFunc.setLevel(5)
        if (!!marker) panTo(marker.position.y - 0.003, marker.position.x)
      }

      !!placeId && dispatch(update_is_shown_detail(true))
    }
  }, [placeId, windowSize.width, detail, isShownDetail, kakaoMapFunc])
  
  useEffect(()=>{ // 지하철역 검색 시
    if (!window.kakao || !kakaoMapFunc || !stationName) return 
    
    !placeId && getLocationOfKeyword(stationName)
  }, [stationName, window.kakao, kakaoMapFunc])

  useEffect(()=>{ // 지하철역 검색 시
    if (!!stationId && !!marker) dispatch(update_marker(null))
  }, [stationId])

  useEffect(()=>{ // 지도 마커 클릭 or 검색 결과 리스트에서 카드 클릭
    if (!!marker) setUrlSearchQuery(marker.placeId)
  }, [marker])

  useEffect(()=>{
    if (!places?.data) return
    if (places.data.length === 0) setPlaceList([])
      else setPlaceList(convertPlaceList(places.data))
  }, [places])

  useEffect(()=>{ // 상세 페이지 데이터 업데이트 시
    if (!!placeDetail?.data?.id) setDetail(placeDetail.data)

    return () => handleResetDetail()
  }, [placeDetail])

  useEffect(()=>{
    const handleShownDetailOnMobile = () => {
      if (windowSize.width <= 1100) dispatch(update_is_shown_detail(false))
    }
    window.addEventListener('popstate', handleShownDetailOnMobile)

    return () => window.removeEventListener('popstate', handleShownDetailOnMobile)
  }, [])
  

  return places?.data && (
    <>
      <div className={`${styles.container} ${isShownDetail && detail && styles.hasDetail}`}>
        <div className={styles.map}>
          <KakaoMap placeList={placeList} />
        </div>
        
        {/* PC ver */}
        {1100 < windowSize.width &&
          <div className={styles.bakeries_wrap}>
            <BakeryDetail place={detail} loading={isFetching} />
            <div className={styles.cards}>
              {placeList.map((place: PlaceSummary) => (
                <BakeryCard key={place.id} selected={isShownDetail && place.id === Number(placeId)} place={place} onClick={handleClickPlaceCard} />
              ))}
              {placeList.length === 0 &&
                <div className={styles.cards_empty}>
                  <div>등록된 장소가 없습니다.</div>
                  <div>새로운 장소를 등록해 주세요.</div>
                  <Button type='button' variant='contained' color='primary' onClick={handleOpenRegistrationBakeryModal} style={{ marginTop: '0.5rem', width: '13rem', height: '2.5rem' }}>장소 등록하기</Button>
                </div>
              }
            </div>
            
            <Link href="https://smore.im/form/gKNbMW1VUf" target='_blank'>
              <button className={`${styles.floating_button} ${styles.leave_opinion}`}>
                <svg width="20px" height="20px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                  <path fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.937 1.25 22.75 6.06293 22.75 12C22.75 17.937 17.937 22.75 12 22.75C10.1437 22.75 8.39536 22.2788 6.87016 21.4493L2.63727 22.2373C2.39422 22.2826 2.14448 22.2051 1.96967 22.0303C1.79485 21.8555 1.71742 21.6058 1.76267 21.3627L2.55076 17.1298C1.72113 15.6046 1.25 13.8563 1.25 12Z" fill="#fff"></path>
                  {/* <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 13.8563 1.72113 15.6046 2.55076 17.1298L1.76267 21.3627C1.71742 21.6058 1.79485 21.8555 1.96967 22.0303C2.14448 22.2051 2.39422 22.2826 2.63727 22.2373L6.87016 21.4493C8.39536 22.2788 10.1437 22.75 12 22.75C17.937 22.75 22.75 17.937 22.75 12C22.75 6.06293 17.937 1.25 12 1.25ZM17 10.75C16.3097 10.75 15.75 11.3097 15.75 12C15.75 12.6903 16.3097 13.25 17 13.25C17.6903 13.25 18.25 12.6903 18.25 12C18.25 11.3097 17.6903 10.75 17 10.75ZM10.75 12C10.75 11.3097 11.3097 10.75 12 10.75C12.6903 10.75 13.25 11.3097 13.25 12C13.25 12.6903 12.6903 13.25 12 13.25C11.3097 13.25 10.75 12.6903 10.75 12ZM7 10.75C6.30961 10.75 5.75 11.3097 5.75 12C5.75 12.6903 6.30961 13.25 7 13.25C7.69039 13.25 8.25 12.6903 8.25 12C8.25 11.3097 7.69039 10.75 7 10.75Z" fill="#fff"></path> */}
                </svg>
              </button>
            </Link>
            <button 
              className={`${styles.floating_button} ${styles.registration_bakery}`}
              onClick={handleOpenRegistrationBakeryModal}
            >
              <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
                <path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </button>
          </div>
        }
      </div>

      {/* Mobile ver */}
      {windowSize.width <= 1100 &&
        (detail
          ? (
            <PlaceDetailBottomSheet place={detail} handleClickFloatBtn={handleOpenRegistrationBakeryModal}>
              <BakeryDetail place={detail} />
            </PlaceDetailBottomSheet>
          )
          : (
            <PlaceListBottomSheet handleClickFloatBtn={handleOpenRegistrationBakeryModal}>
              <SearchContent placeList={placeList} handleClickPlaceCard={handleClickPlaceCard} handleOpenRegistrationBakeryModal={handleOpenRegistrationBakeryModal} />
            </PlaceListBottomSheet>
          )
        )
      }
      {RegistrationBakeryModal.Dialog}
    </>
  )
}
