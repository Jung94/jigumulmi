"use client"

import styles from './filter-box.module.scss'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/admin/button'
import { SelectBox, Search } from '@/components/admin/form'
import type { PlaceQueryParams } from '@/domain/admin/query/useGetPlaceList'

const sortOptions = [
  {value: 1, name: '최신 순'},
  {value: 2, name: '오래된 순'},
]

const FilterBox = ({
  filters,
  handleSelect,
}: {
  filters: PlaceQueryParams
  handleSelect: (v: any, name: string)=>void
}) => {
  const router = useRouter()

  const handleClickCreation = () => {
    router.push('/admin/place/creation')
  }

  const searchRef = useRef<any>(null)

  const handleClickSearchPlaceName = () => {
    handleSelect(searchRef.current.value, "placeName")
  }
  const handleKeyDownKeyword = (e: any) => {
    if (e.code === 'Enter') handleSelect(searchRef.current.value, "placeName")
  }

  return (
    <div className={styles.container} style={{alignItems: 'flex-end'}}>
      <Search 
        ref={searchRef}
        defaultValue={filters.placeName}
        placeholder='장소 이름'
        onClick={handleClickSearchPlaceName} 
        onKeyDown={(e) => handleKeyDownKeyword(e)} 
        style={{
          marginTop: '1.49rem',
          height: '2.5rem',
          borderRadius: '6px'
        }}
      />
      {/* <SelectBox.HiddenOption
        name="sort" 
        label='정렬'
        options={sortOptions}
        selected={filters.sort}
        onClick={(v)=>handleSelect(v, "sort")}
        style={{
          width: '8rem'
        }}
      ></SelectBox.HiddenOption> */}
      <Button type='normal' onClick={handleClickCreation} style={{height: '2.5rem', fontSize: '13px'}}>등록하기</Button>
    </div>
  )
}

export default FilterBox