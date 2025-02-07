"use client"

import { useId, useRef, useEffect } from 'react';
import styles from './select-box.module.scss';
import HiddenOption from './hidden-option';
import MultiSelectbox from './hidden-option-multi';

type Props = {
  name: string
  label?: string
  disabled?: boolean
  options: undefined | {value: any, name: string}[]
  selected?: any
  selectHeight?: string
  style?: any
  onClick: (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => void
}

const SelectBox = ({
  name, 
  label='', 
  disabled,
  options=[],
  selected,
  selectHeight='6rem',
  style,
  onClick
}: Props) => {
  const optionId = useId();
  const scrollRef = useRef<HTMLLIElement>(null);
  
  const checkSelectedOption = (option: number) => {
    const isMulti = typeof selected === 'object'
    if (isMulti) return selected.includes(option)
    if (!isMulti) return selected === option
  }

  useEffect(()=>{
    scrollRef.current?.scrollIntoView({ block: 'center' })
  }, [options])

  return (
    <div className={styles.form} style={style}>
      <div className={styles.label}>{label}</div>
      <ul className={`${styles.select} ${disabled && styles.disabled}`} style={{height: selectHeight}}>
        {options?.map((option: any) => 
          <li
            ref={selected === option.value ? scrollRef : null}
            className={`${styles.option} ${checkSelectedOption(option.value) && styles.selected}`}
            key={option.value + optionId} 
            data-name={name}
            value={option.value} 
            onClick={onClick}
          >
            {option.name}
          </li>
        )}
      </ul>
    </div>
  )
}

SelectBox.Multi = MultiSelectbox
SelectBox.HiddenOption = HiddenOption

export default SelectBox