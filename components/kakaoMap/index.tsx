"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react'
import styles from './kakaoMap.module.scss'
import { set_kakao_places_func, update_bakery_cd } from '@/lib/store/modules/search'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'

let selectedMarker: any = null;
let markers: any[] = [];

const KakaoMap = ({ bakeryList, bakeryCode }: { bakeryList: any, bakeryCode: number | null }) => {
  const dispatch = useAppDispatch()
  const location = useAppSelector(((state) => state.search.location))
  // const bakeryCode = useAppSelector(((state) => state.search.bakery_cd))
  const isShownBottomSheet = useAppSelector(((state) => state.bottomSheet.isShown))
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<any>(null)
  const [bakeries, setBakeries] = useState<{id: number, name: string, latlng: any}[]>([])

  function panTo(x: string, y: string) {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new window.kakao.maps.LatLng(x, y)
    
    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);            
  }

  useEffect(()=>{
    if (!location.x || !location.y) return
    panTo(location.x, location.y)
  }, [location])

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
          level: 7,
        }

        const map = new window.kakao.maps.Map(mapContainer, mapOption)
        setMap(map)

        const positions = bakeryList.map((e: any) => {
          return {id: e.id, name: e.name, latlng: new kakao.maps.LatLng(e.position.lat, e.position.lng)}
        })
        setBakeries(positions)

        const places = new window.kakao.maps.services.Places()
        dispatch(set_kakao_places_func(places))
        
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI)
    }
  }, [])


  const getMarkerImages = useCallback(() => {
    // const normalImage = 'https://ifh.cc/g/TyJnVh.png' // inactive marker - black border
    // const normalImage = 'https://ifh.cc/g/7GbARo.png' // inactive marker - brick-red border(좀 더 밝음)
    // const normalImage = 'https://ifh.cc/g/CYpq7M.png' // inactive marker - brick-red border(톤다운, 차분함) - brick-red border(좀 더 밝음)
    const normalImage = 'https://ifh.cc/g/9gS2ma.png' // inactive marker - desert-gold bgColor
    const activeImage = 'https://ifh.cc/g/1pXKtO.png' // active marker
    const imageSize = new kakao.maps.Size(24, 32)
    const imageSizeActive = new kakao.maps.Size(32, 42)
    const markerImage = new kakao.maps.MarkerImage(normalImage, imageSize)
    const markerImageActive = new kakao.maps.MarkerImage(activeImage, imageSizeActive)

    return { markerImage, markerImageActive }
  }, [])

  useEffect(()=>{
    if (bakeries.length === 0 || !map) return

    bakeries.forEach((e: any, index: number) => {
      const { markerImage, markerImageActive } = getMarkerImages()
      
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: e.latlng, // 마커를 표시할 위치
        title: e.id, // 마커의 타이틀
        image: e.id === bakeryCode ? markerImageActive : markerImage,
        zIndex: e.id === bakeryCode ? 1 : 0
      })

      if (e.id === bakeryCode) selectedMarker = marker;

      // 마커에 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'click', () => {
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
        selectedMarker = marker;

        dispatch(update_bakery_cd(e.id))
      })

      markers.push(marker)
    })

  }, [bakeries, map])

  useEffect(()=>{
    if (bakeries.length === 0 || !map) return
    const { markerImage, markerImageActive } = getMarkerImages()

    if (bakeryCode) {
      const marker = markers.find(e => e.Gb === String(bakeryCode))

      if (!!selectedMarker) {
        selectedMarker.setImage(markerImage);
        selectedMarker.setZIndex(0);
      }
      marker.setImage(markerImageActive);
      marker.setZIndex(1);
      selectedMarker = marker;
    }
    if (!bakeryCode && !!selectedMarker) {
      selectedMarker.setImage(markerImage);
      selectedMarker.setZIndex(0);
      selectedMarker = null;
    }
  }, [bakeryCode])

  // 모바일 환경에서 bottom sheet 열기/닫기 이벤트에 따라 지도의 중심 이동
  // useEffect(()=>{
  //   if (isShownBottomSheet) {
  //     // const mapHeight = mapRef.current?.offsetHeight
  //     // console.log(String(parseFloat(location.x) - 0.025), mapHeight / 5)
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