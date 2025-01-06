'use client'

import Image from 'next/image'
import React, { forwardRef } from 'react'
import styles from './search.module.scss'
import searchIcon from '@/public/images/search.svg'
import { TextInput } from '@/src/shared/ui/admin/form/input/base'

type Props = {
  name?: string
  defaultValue?: any
  placeholder?: string
  disabled?: boolean
  onSearch: () => void
  style?: any
}

const Search = forwardRef<HTMLInputElement, Props>(function Search({
  name='', 
  defaultValue,
  placeholder,
  disabled,
  onSearch,
  style,
}, ref) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return 
    if (e.code === 'Enter') onSearch()
  }

  return (
    <div className={styles['search']} style={style}>
      <div className={styles['search-icon']} onClick={onSearch}>
        <Image src={searchIcon} width={16} height={16} alt='search-input' />
      </div>
      <TextInput 
        ref={ref}
        name={name} 
        disabled={disabled}
        placeholder={placeholder}
        defaultValue={defaultValue}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
})

export default Search
