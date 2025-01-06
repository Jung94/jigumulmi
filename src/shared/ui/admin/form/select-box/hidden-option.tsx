"use client"

import { useEffect, useId, useState } from 'react';
import styles from './select-box.module.scss';
import ArrowDown from '@/public/icons/ArrowDown';

type Props = {
  label?: string
  // multi?: boolean
  disabled?: boolean
  options: undefined | {value: any, name: string}[]
  hasSearch?: boolean
  placeholder?: string
  styleShowBox?: any
  selectedValue?: any
  styleLabel?: any
  style?: any
  onClick: (v: any)=>void
}

const HiddenOption = ({
  label, 
  // multi, 
  disabled,
  options=[],
  hasSearch=false,
  placeholder,
  styleShowBox,
  selectedValue,
  styleLabel,
  style,
  onClick,
}: Props) => {
  const optionId = useId()

  const initSelectedName = () => {
    const name = options.find(option => option.value === selectedValue)?.name
    return name ? name : ''
  }

  const [ activeOptionBox, setActiveOptionBox ] = useState(false)
  const [ selectedName, setSelectedName ] = useState<string>(() => initSelectedName())

  const handleClick = (e: any) => {
    const optionName = e.target.dataset.name

    if (optionName !== selectedName) {
      setSelectedName(e.target.dataset.name)
      onClick(e)
    } else {
      setSelectedName('')
      onClick(null)
    }
  }

  const checkSelectedOption = (option: number) => {
    return selectedValue === option
  }
  
  // options가 api를 통해 외부에서 가져오는 경우 업데이트를 해줘야 한다.
  useEffect(()=>{
    setSelectedName(() => initSelectedName())
  }, [options, selectedValue])

  return (
    <div 
      className={`
        ${styles.form}
        ${disabled ? styles['form-disabled'] : ''}
      `} 
      style={style}
      onMouseLeave={()=>setActiveOptionBox(false)}
    >
      {label && 
        <div className={styles.label} style={styleLabel}>{label}</div>
      }
      <div 
        style={styleShowBox}
        className={`${styles.show_box}`} 
        onClick={()=>setActiveOptionBox(prev => !prev)}
      >
        <div className={`${styles.name}`}>
          {placeholder && !selectedName
            ? <div className={styles['placeholder']}>{placeholder}</div>
            : <>{selectedName}</>
          }
        </div>
        <span className={styles.arrow_wrap}><ArrowDown /></span>
      </div>

      {activeOptionBox &&
        <div className={styles.options_box_wrap}>
          <div className={styles.options_box}>
            {hasSearch && <div className={styles.search_box}></div>}

            {options?.map((option: any) => 
              <option
                className={`${styles.option} ${checkSelectedOption(option.value) && styles.selected}`}
                data-name={option.name}
                key={option.value + optionId} 
                value={option.value} 
                onClick={handleClick}
              >
                {option.name}
              </option>
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default HiddenOption