'use client'

import styles from './kakaoMap.module.scss'
import React, { useState, useEffect, useRef, useCallback, memo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useWindowSize } from '@/lib/hooks'
import { set_kakao_map_func, set_kakao_places_func, update_marker, update_is_shown_detail } from '@/lib/store/modules/search'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import type { PlaceListItem, PlaceForMarker } from '@/src/4.entities/banner/model/types'

let selectedMarker: any = null;
let markers: any[] = [];

const KakaoMap = ({ placeList }: { placeList: PlaceListItem[] }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const placeId = searchParams?.get("place") // string | null
  const stationId = searchParams?.get("stationId") // string | null
  const category = searchParams?.get("category") // string | null

  const mapRef = useRef<HTMLDivElement>(null)
  const marker = useAppSelector(((state) => state.search.marker))
  const kakaoMapFunc = useAppSelector(((state) => state.search.kakaoMap))
  const [ positionList, setPositionList ] = useState<PlaceForMarker[]>([])

  const createPositionList = (placeList: PlaceListItem[]) => {
    const positions = placeList.map((place: PlaceListItem) => {
      return {id: place.id, name: place.name, latlng: new kakao.maps.LatLng(place.position.latitude, place.position.longitude)}
    })
    
    setPositionList(positions)
  }


  useEffect(()=>{
    if (!kakaoMapFunc) return
    if (category) {
      createPositionList(placeList)
      return
    }
    
    if (!!stationId) kakaoMapFunc.setLevel(5)
      else {
        kakaoMapFunc.relayout()
        kakaoMapFunc.setLevel(8)
        if (!!marker) panTo(37.523844561019224, 126.98021150388406)
    }
    
    createPositionList(placeList)

  }, [kakaoMapFunc, placeList])

  function panTo(x: number, y: number) {
    const moveLatLon = new window.kakao.maps.LatLng(x, y) // 이동할 위도 경도 위치 생성
    
    kakaoMapFunc.panTo(moveLatLon); // 지도 중심을 부드럽게 이동시킵니다. (만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동)
  }

  useEffect(()=>{
    const kakaoMapScript = document.createElement('script')
    kakaoMapScript.async = false
    kakaoMapScript.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=71dbbbe7210304436369e6cab53f8400&libraries=services,clusterer,drawing&autoload=false`
    document.head.appendChild(kakaoMapScript)

    const onLoadKakaoAPI = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('kakao_map')
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.523844561019224, 126.98021150388406),
          level: stationId ? 5 : 8,
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOption)
        const places = new window.kakao.maps.services.Places()

        dispatch(set_kakao_map_func(map))
        dispatch(set_kakao_places_func(places))
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI)
    }
  }, [])

  const getMarkerImages = useCallback(() => {
    // const normalImage = 'https://ifh.cc/g/aklZk9.png' // inactive marker - desert-gold bgColor
    // const activeImage = 'https://ifh.cc/g/PV5ZBA.png' // active marker
    const normalImage = 'https://ifh.cc/g/HY2Vt7.png' // inactive marker
    const activeImage = 'https://ifh.cc/g/yvm1Oo.png' // active marker
    
    const imageSize = new kakao.maps.Size(24, 32)
    const imageSizeActive = new kakao.maps.Size(35, 46.5)
    // const imageSizeActive = new kakao.maps.Size(45, 60)
    const markerImage = new kakao.maps.MarkerImage(normalImage, imageSize)
    const markerImageActive = new kakao.maps.MarkerImage(activeImage, imageSizeActive)

    return { markerImage, markerImageActive }
  }, [])

  const handleClickMarker = (marker: any, e?: PlaceForMarker) => {
    const { markerImage, markerImageActive } = getMarkerImages()

    // https://apis.map.kakao.com/web/sample/multipleMarkerEvent2/
    if (!selectedMarker || selectedMarker !== marker) {

      // 클릭된 마커 객체가 null이 아니면
      // 클릭된 마커의 이미지를 기본 이미지로 변경하고
      if (!!selectedMarker) {
        selectedMarker.setImage(markerImage);
        selectedMarker.setZIndex(0);
      }

      // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경합니다
      marker.setImage(markerImageActive);
      marker.setZIndex(1);
    }

    // 클릭된 마커를 현재 클릭된 마커 객체로 설정합니다
    // selectedMarker = marker;

    if (!e) return
    // 배너와 연관된 장소 클릭 시
    router.push(`/place/${e.id}`)

    // /search 페이지 때 사용했던 로직
    // dispatch(update_marker({
    //   placeId: e.id,
    //   position: {x: e.latlng.La, y: e.latlng.Ma}
    // }))
    // dispatch(update_is_shown_detail(true))
  }

  useEffect(()=>{
    if (positionList.length === 0 || !kakaoMapFunc) return

    positionList.forEach((e: PlaceForMarker, index: number) => {
      const { markerImage, markerImageActive } = getMarkerImages()
      
      const marker = new kakao.maps.Marker({
        map: kakaoMapFunc, // 마커를 표시할 지도
        position: e.latlng, // 마커를 표시할 위치
        title: e.id, // 마커의 타이틀
        image: e.id === Number(placeId) ? markerImageActive : markerImage,
        zIndex: e.id === Number(placeId) ? 1 : 0
      })
      marker.setMap(kakaoMapFunc)

      if (e.id === Number(placeId)) { // 맨 처음 로드 시 - 상세페이지 있을 때
        selectedMarker = marker;
        
        const panTo = (x: number, y: number) => {
          const moveLatLon = new window.kakao.maps.LatLng(x, y) // 이동할 위도 경도 위치 생성
          
          kakaoMapFunc.panTo(moveLatLon); // 지도 중심을 부드럽게 이동시킵니다. (만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동)
        }

        kakaoMapFunc.relayout()
        kakaoMapFunc.setLevel(5)

        // if (1100 < windowSize.width) panTo(e.latlng.Ma, e.latlng.La)
        //   else panTo(e.latlng.Ma - 0.003, e.latlng.La)
      }

      window.kakao.maps.event.addListener(marker, 'click', () => handleClickMarker(marker, e))
      markers.push(marker)
    })

    return () => {
      markers.forEach(marker => {
        marker.setMap(null)
        window.kakao.maps.event.removeListener(marker, 'click', () => handleClickMarker(marker))
      })
      markers = []
    }

  }, [positionList, kakaoMapFunc])

  useEffect(()=>{
    if (positionList.length === 0 || !kakaoMapFunc) return
    const { markerImage, markerImageActive } = getMarkerImages()

    if (placeId) {
      const marker = markers.find(e => e.Gb === String(placeId))

      if (!marker) return

      if (!!selectedMarker) {
        selectedMarker.setImage(markerImage);
        selectedMarker.setZIndex(0);
      }
      marker.setImage(markerImageActive);
      marker.setZIndex(1);
      selectedMarker = marker;
    }

    if (!placeId && !!selectedMarker) { // placeId가 사라졌을 때 (ex. 지하철역 재검색)
      selectedMarker.setImage(markerImage);
      selectedMarker.setZIndex(0);
      selectedMarker = null;
    }
  }, [placeId])

  // const handleFilterCategory = (categoryName: string) => {
  //   const params = new URLSearchParams(searchParams)
  //   if (category === categoryName) {
  //     params.delete('category')
  //   } else {
  //     params.delete('place')
  //     params.set('category', categoryName)
  //     dispatch(update_is_shown_detail(false))
  //   }
  //   router.push(`search?${params.toString()}`)
  // }

  return (
    <div ref={mapRef} id='kakao_map' className={styles.container}>
      {/* <div className={styles['category']}>
        <div className={`${styles['category-item']} ${category === '음식점' ? styles['category-item-selected'] : ''}`} onClick={() => handleFilterCategory('음식점')}>
          <svg width="15px" height="15px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M6 20H9M12 20H9M9 20V15" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 20V12C17 12 19.5 11 19.5 9C19.5 7.24264 19.5 4.5 19.5 4.5" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 8.5V4.5" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M4.49999 11C5.49991 13.1281 8.99999 15 8.99999 15C8.99999 15 12.5001 13.1281 13.5 11C14.5795 8.70257 13.5 4.5 13.5 4.5L4.49999 4.5C4.49999 4.5 3.42047 8.70257 4.49999 11Z" stroke="currentcolor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <span>음식점</span>
        </div>
        <div className={`${styles['category-item']} ${category === '카페' ? styles['category-item-selected'] : ''}`} onClick={() => handleFilterCategory('카페')}>
          <svg width="15px" height="15px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M17 11.6V15C17 18.3137 14.3137 21 11 21H9C5.68629 21 3 18.3137 3 15V11.6C3 11.2686 3.26863 11 3.6 11H16.4C16.7314 11 17 11.2686 17 11.6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 9C12 8 12.7143 7 14.1429 7V7C15.7208 7 17 5.72081 17 4.14286V3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 9V8.5C8 6.84315 9.34315 5.5 11 5.5V5.5C12.1046 5.5 13 4.60457 13 3.5V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M16 11H18.5C19.8807 11 21 12.1193 21 13.5C21 14.8807 19.8807 16 18.5 16H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <span>카페</span>
        </div>
        <div className={`${styles['category-item']} ${category === '제로웨이스트샵' ? styles['category-item-selected'] : ''}`} onClick={() => handleFilterCategory('제로웨이스트샵')}>
          <svg width="15px" height="15px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M7 21C7 21 7.5 16.5 11 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M19.1297 4.24224L19.7243 10.4167C20.0984 14.3026 17.1849 17.7626 13.2989 18.1367C9.486 18.5039 6.03191 15.7168 5.66477 11.9039C5.29763 8.09099 8.09098 4.70237 11.9039 4.33523L18.475 3.70251C18.8048 3.67074 19.098 3.91239 19.1297 4.24224Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <span>제로웨이스트샵</span>
        </div>
        <div className={`${styles['category-item']} ${category === '재활용센터' ? styles['category-item-selected'] : ''}`} onClick={() => handleFilterCategory('재활용센터')}>
          <svg width="13px" height="13px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="currentColor"><path d="M21.1679 8C19.6247 4.46819 16.1006 2 11.9999 2C6.81459 2 2.55104 5.94668 2.04932 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M17 8H21.4C21.7314 8 22 7.73137 22 7.4V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M2.88146 16C4.42458 19.5318 7.94874 22 12.0494 22C17.2347 22 21.4983 18.0533 22 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M7.04932 16H2.64932C2.31795 16 2.04932 16.2686 2.04932 16.6V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
          <span style={{ paddingLeft: '2px' }}>재활용센터</span>
        </div>
      </div> */}
    </div>
  )
}

export default memo(KakaoMap)