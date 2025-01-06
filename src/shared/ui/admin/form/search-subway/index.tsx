'use client'

import Image from 'next/image'
import React, { memo, useEffect, useState } from 'react'
import styles from './search.module.scss'
import searchIcon from '@/public/images/search.svg'
import { TextInput } from '@/src/shared/ui/admin/form/input/base'
import { useFetchSubwayList } from '@/src/4.entities/place/model/queries'

type Props = {
  name?: string
  disabled?: boolean
  placeholder?: string
  selectedValue: number | null
  onSearch: (stationId: number) => void
  style?: any
}
const SearchSubway = ({
  name='', 
  disabled,
  placeholder,
  selectedValue,
  onSearch,
  style,
}: Props) => {
  const [value, setValue] = useState<string>('')
  const [shownOption, setShownOption] = useState<boolean>(false)

  const { data: subwayList } = useFetchSubwayList({ stationName: value })

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    !!subwayList?.length && setShownOption(true)
    setValue(e.target.value)
  }

  const handleInputFocus = () => setShownOption(true)

  const handleInputBlur = () => setShownOption(false)

  const handleOptionClick = (stationId: number, stationName: string) => {
    setValue(stationName)
    setShownOption(false)
    onSearch(stationId)
  }

  useEffect(() => {
    !selectedValue && setValue('')
  }, [selectedValue])

  return (
    <div className={styles['search']} style={style}>
      <div className={styles['search-content']}>
        <div className={styles['search-icon']}>
          <Image src={searchIcon} width={16} height={16} alt='search-input' />
        </div>
        <TextInput 
          name={name} 
          value={value} 
          disabled={disabled}
          placeholder={placeholder}
          onChange={handleValueChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </div>
      {shownOption && !!subwayList?.length &&
        <div className={styles['search-option']}>
          <div className={styles['search-option-list']}>
          {subwayList?.map(s => (
            <div 
              key={s.id} 
              className={`
                ${styles['search-option-list-option']}
                ${s.id === selectedValue ? styles['search-option-list-option-active'] : ''}
              `}
              onClick={() => handleOptionClick(s.id, s.stationName)}
              onMouseDown={e => e.preventDefault()}
            >
              {s.stationName}
            </div>
          ))}
          </div>
        </div>
      }
    </div>
  )
}

export default memo(SearchSubway)