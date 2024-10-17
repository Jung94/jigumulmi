"use client"

import React, { useEffect, useState, useRef } from 'react'
import styles from './searchBar.module.scss'
import { useWindowSize } from '@/lib/hooks'
import { useRouter, useSearchParams } from 'next/navigation'
import { useGetPlaceSubway } from '@/domain/place/query'

declare global {
  interface Window {
    kakao: any;
  }
}

type AutoCompletedSubway = { id: number, lineNumber: string, stationName: string }

const SearchBar = () => {
  const router = useRouter()
  const windowSize = useWindowSize()
  const searchParams = useSearchParams()
  const selectedPlace = searchParams?.get("place") // string | null
  const placeName = searchParams?.get("placeName") // string | null
  const stationName = searchParams?.get("stationName") // string | null

  const autoRef = useRef<any>(null)
  const selectboxRef = useRef<any>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [nowIndex, setNowIndex] = useState<number>(-1)
  const [value, setValue] = useState<string>((stationName || placeName) ?? '')
  const [searchType, setSearchType] = useState('subwayStation') // subwayStation | placeName
  const [isShownSelectbox, setIsShownSelectbox] = useState<boolean>(false)
  const { data: autoCompletedSubwayList } = useGetPlaceSubway(searchType === 'subwayStation' ? value : null)

  const [shownOptionList, setShownOptionList] = useState<boolean>(false)
  const [autoCompleteList, setAutoCompleteList] = useState<AutoCompletedSubway[]>([])

  const handleClickSelectbox = () => {
    setIsShownSelectbox(prev => !prev)
  }

  const handleSearchType = (searchType: string) => {
    setSearchType(searchType)
    setIsShownSelectbox(false)
  }

  const handleSearchPlaceName = () => {
    const params = new URLSearchParams()
    params.set('placeName', value)
    router.push(`search?${params.toString()}`)
  }

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
    inputRef.current?.blur()
  }

  const handleKeyArrow = (e: React.KeyboardEvent) => {
    const { key, nativeEvent } = e
    if (nativeEvent.isComposing || !value) return 

    if (key === 'Enter') {
      if (nowIndex === -1) {  // 검색창에 있을 때
        if (windowSize.width <= 1100) inputRef.current?.blur()  // 모바일 - 키보드 이동(return) 클릭시 키보드 닫힘(input focus를 삭제)

        handleSearchPlaceName()
      } else selectAutoSearchResult()  // 자동 검색 박스 안에 있을 때
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
    setShownOptionList(true)
    inputRef.current?.focus()
  }
  
  useEffect(()=>{
    setNowIndex(-1)
  }, [value])

  useEffect(()=>{
    setShownOptionList(false)
    inputRef.current?.blur()
  }, [inputRef, selectedPlace])

  useEffect(()=>{
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (inputRef.current) {
        if (inputRef.current.contains(e.target as Node)) { // inside
          setShownOptionList(true)
        } else if (autoRef.current && !autoRef.current.contains(e.target as Node)) { // outside
          setShownOptionList(false)
          inputRef.current.blur()
        }
      }
      if (!selectboxRef.current?.contains(e.target as Node)) {
        setIsShownSelectbox(false)
      }
    };

    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousedown', handleClick);
    }
  }, [inputRef, autoRef])


  return (
    <div className={styles.container}>
      <div className={styles['selectbox']} ref={selectboxRef}>
        <div className={styles['selectbox-inner']} onClick={handleClickSelectbox}>
          <span className={styles['selectbox-icon']}>
            <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
              <path d="M6 9L12 15L18 9" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </span>
          <span className={styles['selectbox-content']}>
            {searchType === 'subwayStation' ? '지하철역' : '가게명'}
          </span>
        </div>
        {isShownSelectbox &&
          <div className={styles['selectbox-optionbox']}>
            <div className={styles['selectbox-optionbox-inner']}>
              <div 
                className={`${styles['selectbox-optionbox-item']} ${searchType === 'subwayStation' ? styles[`selectbox-selected`] : ''}`}
                onClick={() => handleSearchType('subwayStation')}
              >지하철역</div>
              <div 
                className={`${styles['selectbox-optionbox-item']} ${searchType === 'placeName' ? styles[`selectbox-selected`] : ''}`}
                onClick={() => handleSearchType('placeName')}
              >가게명</div>
            </div>
          </div>
        }
      </div>
      <input ref={inputRef} type='text' placeholder={searchType === 'subwayStation' ? '지하철역' : '가게명'} value={value} onChange={handleChangeInput} onKeyDown={handleKeyArrow} />
      {!!value &&
        <div className={styles.erase_all_text} onClick={eraseAllText}>
          <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000" strokeWidth="1.5">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM9.70164 8.64124C9.40875 8.34835 8.93388 8.34835 8.64098 8.64124C8.34809 8.93414 8.34809 9.40901 8.64098 9.7019L10.9391 12L8.64098 14.2981C8.34809 14.591 8.34809 15.0659 8.64098 15.3588C8.93388 15.6517 9.40875 15.6517 9.70164 15.3588L11.9997 13.0607L14.2978 15.3588C14.5907 15.6517 15.0656 15.6517 15.3585 15.3588C15.6514 15.0659 15.6514 14.591 15.3585 14.2981L13.0604 12L15.3585 9.7019C15.6514 9.40901 15.6514 8.93414 15.3585 8.64124C15.0656 8.34835 14.5907 8.34835 14.2978 8.64124L11.9997 10.9393L9.70164 8.64124Z" fill="#b0b8c1"></path>
          </svg>
        </div>
      }
      
      {searchType === 'subwayStation' && shownOptionList && autoCompleteList.length > 0 &&
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
                onMouseDown={e => e.preventDefault()}
              >
                <div>{e.stationName}</div>
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