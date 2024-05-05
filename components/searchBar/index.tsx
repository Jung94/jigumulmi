"use client"

import React, { useEffect, useState, useRef } from 'react'
import styles from './searchBar.module.scss'
import { useWindowSize } from '@/lib/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { STATIONS } from '@/lib/json/subwayStation.json'
import { useGetPlaceSubway } from '@/domain/search/query'

declare global {
  interface Window {
    kakao: any;
  }
}

type SearchBarProps = {
  type: 'bakery' | 'station'
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

type AutoCompletedSubway = { id: number, lineNumber: string, stationName: string }

const SearchBar = ({type}: SearchBarProps) => {
  const router = useRouter()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const stationName = searchParams?.get("stationName") // string | null

  const inputRef = useRef<HTMLInputElement>(null)
  const autoRef = useRef<any>(null)
  const [nowIndex, setNowIndex] = useState<number>(-1)
  const [searchType] = useState<any>(() => getSearchType(type))
  const [value, setValue] = useState<string>(stationName ?? '')
  const { data: autoCompletedSubwayList } = useGetPlaceSubway(value)
  // stationId == null와 stationId == undefined와 stationId === null || stationId === undefined와 같음 - https://helloworldjavascript.net/pages/160-null-undefined.html

  const [shownOptionList, setShownOptionList] = useState<boolean>(false)
  const [autoCompleteList, setAutoCompleteList] = useState<AutoCompletedSubway[]>([])

  const handleFocus = () => setShownOptionList(true)

  // 지하철역 검색 키워드 자동완성
  useEffect(()=>{
    if (!autoCompletedSubwayList || autoCompletedSubwayList.status !== 200) return
    
    setAutoCompleteList(autoCompletedSubwayList.data)
  }, [autoCompletedSubwayList])

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  // update query parameter
  const updateQueryStation = (stationId: number, stationName: string) => {
    const params = new URLSearchParams()
  
    params.set('stationId', String(stationId))
    params.set('stationName', stationName)
    router.push(`search?${params.toString()}`)
  }
  
  // implement when the auto-search keyword is selected
  const selectAutoSearchResult = (stationId?: number) => {
    // 클릭 이벤트가 우선. 만약 방향키로 활성화된 옵션과 실제 클릭한 옵션이 다르다면 어떻게 될까? 무조건 클릭이 우선이 된다.
    if (stationId) { // 자동 검색 리스트 중 한 개 클릭한 경우
      const { id, stationName } = autoCompleteList.find(v => v.id === stationId)!
      setValue(stationName)
      updateQueryStation(id, stationName)
    } else {
      const { id, stationName } = autoCompleteList[nowIndex]
      setValue(stationName)
      updateQueryStation(id, stationName)
    }
    
    setNowIndex(-1)
    setShownOptionList(false)

    // PC - auto-search가 클릭(엔터)되어도 한 번 더 검색하기 때문에 focus가 되어야 합니다.
    // Mobile - auto-search가 클릭(엔터)되면 곧바로 검색되는 것이 자연스럽기 때문에 blur 되어야 합니다.
    if (1100 < windowSize.width) {
      // inputRef.current?.focus()
    } else {
      inputRef.current?.blur()
    }
  }

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    const { key, nativeEvent } = e
    if (nativeEvent.isComposing || !value) return 

    if (key === 'Enter') {
      if (nowIndex === -1) {  // 검색창에 있을 때
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

  const eraseAllText = () => {
    setValue('')  // erase input value
    setAutoCompleteList([])  // empty auto searched list
    inputRef.current?.focus()
  }
  
  useEffect(()=>{
    setNowIndex(-1)
  }, [value])


  return (
    <div className={styles.container}>
      <input ref={inputRef} type='text' placeholder={searchType.placeholder} value={value} onChange={handleChangeInput} onKeyDown={handleKeyArrow} onFocus={handleFocus} />
      {!!value &&
        <div className={styles.erase_all_text} onClick={eraseAllText}>
          <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z" fill="#b7a890"></path>
          </svg>
        </div>
      }
      {/* <div className={styles.search_icon}>{searchType.icon}</div> */}
      
      {shownOptionList && autoCompleteList.length > 0 &&
        <ul className={styles.auto_complete} ref={autoRef}>
          {autoCompleteList.map((e: any, index: number) => {
            return (
              <li 
                key={String(index)} 
                className={`
                  ${styles.item} 
                  ${styles.station} 
                  ${nowIndex === index && styles.active}
                `}
                onClick={() => selectAutoSearchResult(e.id)}
              >
                <div>{e.stationName}</div>
                {/* <div className={styles.line_num}>{e.lineNumber}</div> */}
              </li>
            )
          }
          )}
        </ul>
      }
    </div>
  )
}

export default React.memo(SearchBar)