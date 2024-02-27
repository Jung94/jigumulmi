"use client"

import React, { useState, useEffect, useRef } from 'react'
import styles from './kakaoMap.module.scss'
import { BAKERIES } from '@/lib/json/bakery.json'
import { set_kakao_places_func, update_bakery_cd, update_location } from '@/lib/store/modules/search'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'

const KakaoMap = () => {
  const dispatch = useAppDispatch()
  const location = useAppSelector(((state) => state.search.location))
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

        const positions = BAKERIES.map((e: any) => {
          return {id: e.id, name: e.bakery_nm, latlng: new kakao.maps.LatLng(e.position.lat, e.position.lng)}
        })
        setBakeries(positions)

        const places = new window.kakao.maps.services.Places()
        dispatch(set_kakao_places_func(places.keywordSearch))
        
      })
    }

    kakaoMapScript.addEventListener('load', onLoadKakaoAPI)

    return () => {
      kakaoMapScript.removeEventListener('load', onLoadKakaoAPI)
    }
  }, [])

  useEffect(()=>{
    if (bakeries.length === 0 || !map) return

    const imageSrc = 'https://ifh.cc/g/1pXKtO.png'

    bakeries.forEach((e: any, index: number) => {
      const imageSize = new kakao.maps.Size(22, 29)
      const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize)
      const marker = new kakao.maps.Marker({
        map: map, // 마커를 표시할 지도
        position: bakeries[index].latlng, // 마커를 표시할 위치
        title: bakeries[index].bakery_nm, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시된다.
        image: markerImage
      })

      // 마커에 클릭 이벤트 등록
      window.kakao.maps.event.addListener(marker, 'click', () => {
        dispatch(update_bakery_cd(e.id))
      })
    })

  }, [bakeries, map])

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