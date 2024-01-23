"use client"

import React, { useEffect, useState, useRef } from 'react'
import styles from './searchBar.module.scss'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { STATIONS } from '@/lib/json/subwayStation.json'
import { BAKERIES } from '@/lib/json/bakery.json'
import { update_station_cd, update_location, update_bakeries } from '@/lib/store/modules/search'
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks'

declare global {
  interface Window {
    kakao: any;
  }
}

type SearhBarProps = {
  type: 'bakery' | 'station'
}

const searchTypes = [
  {
    id: 'station', 
    name: 'station', 
    placeholder: '지하철역',
    json: STATIONS,
    icon: <svg width="21px" height="21px" viewBox="0 0 24 24" strokeWidth="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M9.609 7h4.782A2.609 2.609 0 0117 9.609a.391.391 0 01-.391.391H7.39A.391.391 0 017 9.609 2.609 2.609 0 019.609 7z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 3h6a6 6 0 016 6v4a6 6 0 01-6 6H9a6 6 0 01-6-6V9a6 6 0 016-6zM16 15.01l.01-.011M8 15.01l.01-.011" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M10.5 19l-2 2.5M13.5 19l2 2.5M16.5 19l2 2.5M7.5 19l-2 2.5" stroke="#000000" strokeWidth="1.5" strokeLinecap="round"></path></svg>
  },
  {
    id: 'bakery', 
    name: 'bakery', 
    placeholder: '베이커리',
    json: BAKERIES,   
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

const SearchBar = ({type}: SearhBarProps) => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const searchParams = useSearchParams()
  const searchedStation = searchParams?.get("station")
  const stationCode = useAppSelector(((state) => state.search.station_cd))
  const bakeryCode = useAppSelector(((state) => state.search.bakery_cd))
  const kakaoKeywordSearch = useAppSelector(((state) => state.search.kakaoKeywordSearch))

  const autoRef = useRef<any>(null)
  const [nowIndex, setNowIndex] = useState<number>(-1)
  const [searchType] = useState<any>(() => getSearchType(type))
  const [value, setValue] = useState<string>(searchedStation ? searchedStation : '')
  const [selectedStationLine, setStationLine] = useState<string>('')
  const [autoCompleteList, setAutoCompleteList] = useState<any[]>([])

  useEffect(()=>{
    if (!stationCode) return

    let list_01: any[] = []
    let list_02: any[] = []
    BAKERIES.map((e: any) => {
      const hasStationOnFirst = !!(e.stations[0].station_cd.find((v: any) => v === stationCode))
      const hasStationOnSecond = !!(e.stations[1].station_cd.find((v: any) => v === stationCode))
      if (hasStationOnFirst) list_01.push(e)
      if (hasStationOnSecond) list_02.push(e)
    })
    dispatch(update_bakeries([...list_01, ...list_02]))
  }, [stationCode])

  useEffect(()=>{
    const bakery = BAKERIES.find((e: any) => e.id === bakeryCode)
    // console.log(bakeryCode, bakery)
    if (bakery) dispatch(update_bakeries([bakery]))
  }, [bakeryCode])

  // enter 시
  // 1-1. 검색창에 활성화 되어 있을 때
  //    
  
  // 1-2. 자동 검색 박스에 활성화 되어 있을 때

  const getValue = (e: any) => {
    setValue(e.target.value)

    if (e.target.value.length <= 1) return

    const value = e.target.value.trim()
    const matchStations = value 
      ? searchType.json.filter((station: any) => station[`${searchType.name}_nm`].includes(value))
      : []
    setAutoCompleteList(matchStations)
  }

  // set URL query parameter - search_query
  const setUrlSearchQuery = (keyword: string) => {
    if (!searchParams) return
    const params = new URLSearchParams()
  
    params.set('station', keyword)
    router.push(`search?${params.toString()}`)
  }

  const getLocationOfKeyword = () => {
    let _value: string = ''
    if (value.trim().slice(-1) === '역') _value = value.trim()
      else _value = `${value.trim()}역`
    
    const getLocation = (result: any[], status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const stations = result.filter((e: any) => e.category_group_name === '지하철역')

        if (stations.length === 0) return console.log('지하철역이 아님')

        let location: any

        if (selectedStationLine) location = stations.filter((e: any) => selectedStationLine.includes(e.place_name.split(' ')[1]))[0]
          else location = stations[0]

        // console.log(location)
        dispatch(update_station_cd(location.id))
        dispatch(update_location({x: location.y, y: location.x}))
      }
    }
    kakaoKeywordSearch && kakaoKeywordSearch(_value, getLocation)
  }

  const selectAutoSearchResult = (index: number = 0) => {

    setValue(autoCompleteList[nowIndex === -1 ? index : nowIndex][`${searchType.name}_nm`] || "")
    setNowIndex(-1)

    if (searchType === 'station') setStationLine(autoCompleteList[nowIndex].line_num)

    setAutoCompleteList([])
  }

  const search = () => {
    setUrlSearchQuery(value.trim())  // set URL query parameter - station
  }

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    const { key, nativeEvent } = e
    setStationLine('')
    if (nativeEvent.isComposing || !value) return 

    if (key === 'Enter') {
      if (nowIndex === -1) search()  // 검색창에 있을 때
        else selectAutoSearchResult()  // 자동 검색 박스 안에 있을 때

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

  useEffect(()=>{
    setNowIndex(-1)
  }, [value])
  
  useEffect(()=>{
    if (!searchedStation) return  // 지도 활성화 여부
    
    getLocationOfKeyword()
  }, [kakaoKeywordSearch, searchedStation])


  return (
    <div className={styles.container}>
      <input type='text' placeholder={searchType.placeholder} value={value} onChange={getValue} onKeyDown={handleKeyArrow} />
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


