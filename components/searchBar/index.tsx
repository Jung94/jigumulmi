"use client"

import React, { useEffect, useState, useRef } from 'react'
import styles from './searchBar.module.scss'
import { useQueryClient } from '@tanstack/react-query'
import { useWindowSize } from '@/lib/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { STATIONS } from '@/lib/json/subwayStation.json'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'
import { update_location, update_bakeries } from '@/lib/store/modules/search'
import { update_is_shown } from '@/lib/store/modules/bottom-sheet'
import type { Bakery } from '@/types/bakery'

declare global {
  interface Window {
    kakao: any;
  }
}

type SearchBarProps = {
  type: 'bakery' | 'station'
}

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

const searchTypes = [
  {
    id: 'search', 
    name: 'search', 
    placeholder: '지하철역',
    json: STATIONS,
    icon: <svg width="21px" height="21px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.609 7h4.782A2.609 2.609 0 0117 9.609a.391.391 0 01-.391.391H7.39A.391.391 0 017 9.609 2.609 2.609 0 019.609 7z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 3h6a6 6 0 016 6v4a6 6 0 01-6 6H9a6 6 0 01-6-6V9a6 6 0 016-6zM16 15.01l.01-.011M8 15.01l.01-.011" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.5 19l-2 2.5M13.5 19l2 2.5M16.5 19l2 2.5M7.5 19l-2 2.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path></svg>
  },
  {
    id: 'station', 
    name: 'station', 
    placeholder: '지하철역',
    json: STATIONS,
    icon: <svg width="23px" height="23px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M17 17L21 21" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M3 11C3 15.4183 6.58172 19 11 19C13.213 19 15.2161 18.1015 16.6644 16.6493C18.1077 15.2022 19 13.2053 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11Z" stroke="#333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
    // icon: <svg width="21px" height="21px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.609 7h4.782A2.609 2.609 0 0117 9.609a.391.391 0 01-.391.391H7.39A.391.391 0 017 9.609 2.609 2.609 0 019.609 7z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 3h6a6 6 0 016 6v4a6 6 0 01-6 6H9a6 6 0 01-6-6V9a6 6 0 016-6zM16 15.01l.01-.011M8 15.01l.01-.011" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.5 19l-2 2.5M13.5 19l2 2.5M16.5 19l2 2.5M7.5 19l-2 2.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path></svg>
  },
  {
    id: 'bakery', 
    name: 'bakery', 
    placeholder: '베이커리',
    json: STATIONS,   
    icon: <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.4706 1C10.4118 2.78571 11.4706 4.07143 11.4706 4.07143C11.4706 4.07143 12.6618 5.5 11.4706 7" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M8.47059 2C7.41176 3.4881 8.47059 4.55952 8.47059 4.55952C8.47059 4.55952 9.66176 5.75 8.47059 7" stroke="black" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M19 14.8382C17.9258 8.38725 1.40314 8.38725 1.00912 14.8382C0.816526 17.9913 3.67205 17.9913 9.85266 17.9913H9.87857C16.0771 17.9913 19 18.3258 19 14.8382Z" stroke="black" strokeWidth="1.5"/>
            <rect x="0.236814" y="0.440392" width="0.7" height="3.63991" rx="0.35" transform="matrix(0.954661 0.297696 -0.278049 0.960567 6.56318 10.0824)" fill="black" stroke="black" strokeWidth="0.7"/>
            <rect x="0.236814" y="0.440392" width="0.7" height="3.67027" rx="0.35" transform="matrix(0.954661 0.297696 -0.278049 0.960567 10.1471 10.0524)" fill="black" stroke="black" strokeWidth="0.7"/>
            <rect x="0.236814" y="0.440392" width="0.7" height="3.83877" rx="0.35" transform="matrix(0.954661 0.297696 -0.278049 0.960567 13.6949 9.94687)" fill="black" stroke="black" strokeWidth="0.7"/>
          </svg>
  },
]

const getSearchType = (type: 'bakery' | 'station') => {
  return searchTypes.find((e: any) => e.name === type)
}

const SearchBar = ({type}: SearchBarProps) => {
  const cache = useQueryClient()
  const [ bakeryList ] = useState<Bakery[] | undefined>(()=>{
    const data = cache.getQueryData(["bakeries"])
    return data ? data.data : []
  })
  const dispatch = useAppDispatch()
  const router = useRouter()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const stationParam = searchParams?.get("station")
  const bakeryCode = useAppSelector(((state) => state.search.bakery_cd))
  const kakaoKeywordSearch = useAppSelector(((state) => state.search.kakaoKeywordSearch))

  const inputRef = useRef<HTMLInputElement>(null)
  const autoRef = useRef<any>(null)
  const [nowIndex, setNowIndex] = useState<number>(-1)
  const [searchType] = useState<any>(() => getSearchType(type))
  const [value, setValue] = useState<string>(stationParam ?? '')
  const [selectedStationLine, setStationLine] = useState<string>('')  // ex. 공항철도, 03호선, ...
  const [autoCompleteList, setAutoCompleteList] = useState<any[]>([])

  const handleChangeInput = (e: any) => {
    setValue(e.target.value)

    if (e.target.value.length < 1) return setAutoCompleteList([])

    const value = e.target.value.trim()
    const matchedStations = value 
      ? STATIONS.filter((station: any) => station[`${searchType.name}_nm`].includes(value))
      : []
    setAutoCompleteList(matchedStations)
    console.log(matchedStations)
  }

  // set URL query parameter - search_query
  const updateUrlSearchQuery = (keyword: string) => {
    // if (!searchParams) return
    const params = new URLSearchParams()
  
    params.set('station', keyword)
    router.push(`search?${params.toString()}`)
  }

  const getLocationOfKeyword = () => {
    let _value: string = ''
    _value = value.trim()
    if (value.trim().slice(-1) === '역') _value = value.trim()
      else _value = `${value.trim()}역`
    
    const getLocation = (result: KakaoSearchResult[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        let location: KakaoSearchResult | undefined
        const stations = result.filter((e: KakaoSearchResult) => e.category_group_code === 'SW8')  // SW8: 지하철역
        
        if (selectedStationLine) {  // 자동검색결과에서 선택한 옵션이 있는지 여부
          location = stations.filter((e: KakaoSearchResult) => selectedStationLine.includes(e.place_name.split(' ')[1]))[0]
        } else {
          location = stations[0]
        }
        // console.log('kakao-search-result:', stations)
        // console.log('line:', selectedStationLine)
        // console.log('location:', location)
        if (!location) return  // ex. 강릉역 검색 시
        const locationY = 1100 < windowSize.width ? location.y : String(parseFloat(location.y) - 0.025)
        dispatch(update_location({x: locationY, y: location.x}))

        // --- 베이커리 리스트 만들기
        const placeName = location.place_name.split(' ')  // 압구정역 3호선
        const subwayName = placeName[0]  // 압구정역
        let list_01: any[] = []
        let list_02: any[] = []
        
        if (!bakeryList) return
        bakeryList.map((e: Bakery) => {
          // const hasStationOnFirst = !!(e.stations[0].station_cd.find((v: any) => v === location?.id))
          // const hasStationOnSecond = !!(e.stations[1].station_cd.find((v: any) => v === location?.id))
          const hasStationOnFirst = !!(subwayName.includes(e.stations[0].name))
          const hasStationOnSecond = !!(subwayName.includes(e.stations[1].name))

          if (hasStationOnFirst) list_01.push(e)
          if (hasStationOnSecond) list_02.push(e)
        })
        dispatch(update_bakeries([...list_01, ...list_02]))
        dispatch(update_is_shown(true))
      }
    }
    kakaoKeywordSearch && kakaoKeywordSearch(_value, getLocation)
  }

  // implement when the auto-search keyword is selected
  const selectAutoSearchResult = (index?: number) => {
    // 클릭 이벤트가 우선. 만약 방향키로 활성화된 옵션과 실제 클릭한 옵션이 다르다면 어떻게 될까? 무조건 클릭이 우선이 된다.
    setValue(autoCompleteList[index ?? nowIndex][`${searchType.name}_nm`] || "")
    setNowIndex(-1)

    console.log(autoCompleteList[index ?? nowIndex].line_num)
    setStationLine(autoCompleteList[index ?? nowIndex].line_num)
    setAutoCompleteList([])

    // PC - auto-search가 클릭(엔터)되어도 한 번 더 검색하기 때문에 focus가 되어야 합니다.
    // Mobile - auto-search가 클릭(엔터)되면 곧바로 검색되는 것이 자연스럽기 때문에 blur 되어야 합니다.
    if (1100 < windowSize.width) {
      inputRef.current?.focus()
    } else {
      search()
      inputRef.current?.blur()
    }
  }

  const search = () => {
    if(stationParam === value.trim()) getLocationOfKeyword()  // 현재 station query와 검색 키워드가 같아도 검색이 가능하게 합니다.
      else updateUrlSearchQuery(value.trim())  // update URL query parameter - station
  }

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    const { key, nativeEvent } = e
    setStationLine('')
    if (nativeEvent.isComposing || !value) return 

    if (key === 'Enter') {
      if (nowIndex === -1) {  // 검색창에 있을 때
        search()

        if (windowSize.width <= 1100) inputRef.current?.blur()  // 모바일 - 키보드 이동(return) 클릭시 키보드 닫힘(input focus를 삭제)
      } else selectAutoSearchResult()  // 자동 검색 박스 안에 있을 때

      setAutoCompleteList([])
    }

    if (autoCompleteList.length > 0) {
      switch (key) {
        case 'ArrowDown': 
          setNowIndex(prev => {
            if (autoRef.current?.childElementCount === prev + 1) return prev
            return prev + 1
          })
          break
        case 'ArrowUp': 
          setNowIndex(prev => {
            if (prev <= 0) {
              setAutoCompleteList([])
              return -1
            }
            return prev - 1
          })
          break
        case 'Escape': 
          setAutoCompleteList([])
          setNowIndex(-1)
          break
        default: 
          setNowIndex(-1)
          break
      }
    }
  }

  const getAutoCompleteItem = (e: any, index: number, type: 'station' | 'bakery') => {
    let children: any
    if (type === 'bakery') children = e[`${type}_nm`]
    if (type === 'station') children = (
      <>
        <div>{e[`${type}_nm`]}</div>
        <div className={styles.line_num}>{e.line_num}</div>
      </>
    )

    return (
      <li 
        key={String(index)} 
        className={`
          ${styles.item} 
          ${searchType.name === 'station' && styles.station}
          ${searchType.name === 'bakery' && styles.bakery}
          ${nowIndex === index && styles.active}
        `}
        onClick={() => selectAutoSearchResult(index)}
      >
        {children}
      </li>
    )
  }

  const eraseAllText = () => {
    setValue('')  // erase input value
    setAutoCompleteList([])  // empty auto searched list
    inputRef.current?.focus()
  }

  useEffect(()=>{
    const bakery = bakeryList?.find((e: any) => e.id === bakeryCode)
    
    if (bakery) {
      dispatch(update_bakeries([bakery]))
    }
  }, [bakeryCode])
  
  useEffect(()=>{
    setNowIndex(-1)
  }, [value])
  
  useEffect(()=>{
    if (!stationParam) return  // 지도 활성화 여부
    
    getLocationOfKeyword()
  }, [kakaoKeywordSearch, stationParam])


  return (
    <div className={styles.container}>
      <input ref={inputRef} type='text' placeholder={searchType.placeholder} value={value} onChange={handleChangeInput} onKeyDown={handleKeyArrow} />
      {value &&
        <div className={styles.erase_all_text} onClick={eraseAllText}>
          <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z" fill="#b7a890"></path>
          </svg>
        </div>
      }
      <div className={styles.search_icon} onClick={search}>{searchType.icon}</div>
      
      {autoCompleteList.length > 0 &&
        <ul className={styles.auto_complete} ref={autoRef}>
          {autoCompleteList.map((e: any, index: number) => getAutoCompleteItem(e, index, searchType.name)
          )}
        </ul>
      }
    </div>
  )
}

export default React.memo(SearchBar)


