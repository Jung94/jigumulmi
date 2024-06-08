"use client"

import styles from './kakaoMap.module.scss'
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useWindowSize } from '@/lib/hooks'
import { set_kakao_map_func, set_kakao_places_func, update_marker } from '@/lib/store/modules/search'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import type { PlaceSummary, PlaceForMarker } from '@/types/place'

let selectedMarker: any = null;
let markers: any[] = [];

const KakaoMap = ({ placeList }: { placeList: PlaceSummary[] }) => {
  const dispatch = useAppDispatch()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const stationId = searchParams?.get("stationId") // string | null
  const placeId = searchParams?.get("place") // string | null

  const mapRef = useRef<HTMLDivElement>(null)
  const kakaoMapFunc = useAppSelector(((state) => state.search.kakaoMap))
  const [ positionList, setPositionList ] = useState<PlaceForMarker[]>([])

  const createPositionList = (placeList: PlaceSummary[]) => {
    const positions = placeList.map((place: PlaceSummary) => {
      return {id: place.id, name: place.name, latlng: new kakao.maps.LatLng(place.position.latitude, place.position.longitude)}
    })
    
    setPositionList(positions)
  }

  useEffect(()=>{
    // if (!kakaoMapFunc || !stationId) return
    if (!kakaoMapFunc) return
    
    if (!!stationId) kakaoMapFunc.setLevel(5)
      else kakaoMapFunc.setLevel(8)
    createPositionList(placeList)
  }, [kakaoMapFunc, placeList])

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
    dispatch(update_marker({
      placeId: e.id,
      position: {x: e.latlng.La, y: e.latlng.Ma}
    }))
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

      if (e.id === Number(placeId)) { // 맨 처음 로드 시
        selectedMarker = marker;
        
        const panTo = (x: number, y: number) => {
          const moveLatLon = new window.kakao.maps.LatLng(x, y) // 이동할 위도 경도 위치 생성
          
          kakaoMapFunc.panTo(moveLatLon); // 지도 중심을 부드럽게 이동시킵니다. (만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동)
        }

        kakaoMapFunc.relayout()
        kakaoMapFunc.setLevel(5)

        if (1100 < windowSize.width) panTo(e.latlng.Ma, e.latlng.La)
          else panTo(e.latlng.Ma - 0.003, e.latlng.La)
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

  // 모바일 환경에서 bottom sheet 열기/닫기 이벤트에 따라 지도의 중심 이동
  // useEffect(()=>{
  //   if (isShownBottomSheet) {
  //     // const mapHeight = mapRef.current?.offsetHeight
  //     dispatch(update_location({x: String(parseFloat(location.x) - 0.025), y: location.y}))
  //   } else if (isShownBottomSheet === false) {
  //     dispatch(update_location({x: String(parseFloat(location.x) + 0.025), y: location.y}))
  //   }
  // }, [isShownBottomSheet])

  return (
    <div ref={mapRef} id='kakao_map' className={styles.container}></div>
  )
}

export default KakaoMap