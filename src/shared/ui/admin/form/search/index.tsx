
"use client"
import { useId, KeyboardEvent, forwardRef } from 'react';
import styles from './search.module.scss';
import Image from 'next/image';
import searchIcon from '@/public/images/search.svg';

type Ref = HTMLInputElement;
type Props = {
  type?: string
  name?: string
  value?: any
  defaultValue?: any
  placeholder?: string
  disabled?: boolean
  onClick?: (e: any)=>void
  onChange?: (e: any)=>void
  onKeyDown?: (e: KeyboardEvent)=>void
  style?: any
}
const Search = forwardRef<Ref, Props>(function Search({
  type='text',
  name='', 
  value,
  defaultValue,
  placeholder,
  disabled,
  onClick,
  onChange,
  onKeyDown,
  style,
}, ref) {
  const inputId = useId();
  
  return (
    <div className={styles.container} style={style}>
      <input 
        ref={ref}
        name={name + inputId} 
        type={type} 
        value={onChange && value} 
        defaultValue={defaultValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange && onChange} 
        onKeyDown={onKeyDown}
      />
      <div className={styles.icon_wrap} onClick={onClick}>
        <Image src={searchIcon} width={16} height={16} alt='search-input' />
      </div>
    </div>
  )
})

export default Search
