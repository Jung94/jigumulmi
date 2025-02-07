'use client'

import { useEffect, useId, useState } from 'react'
import ArrowDown from '@/public/icons/ArrowDown'
import styles from './select-box.module.scss'

type Props = {
  valueList?: any[]
  placeholder?: string
  options?: { name: string, value: any }[]
  styleShowBox?: any
  style?: any
  onClick: (valueList: any[]) => void
}

const HiddenOption = ({
  valueList = [],
  placeholder,
  options = [],
  styleShowBox,
  style,
  onClick,
}: Props) => {
  const optionId = useId()

  const getSelectedNameList = () => {
    return options.filter((option: {name: string, value: number}) => valueList.find((v: number) => v === option.value)).map(v => v.name)
  }

  const getSelectedValueList = () => {
    return options.filter((option: {name: string, value: number}) => valueList.find((v: number) => v === option.value)).map(v => v.value)
  }

  const [ activeOptionBox, setActiveOptionBox ] = useState(false)

  const handleClick = (e: any) => {
    let newValueList = []
    let value = e.target.value
    const valueType = typeof options[0].value // ex. number | string
    
    if (valueType === 'number') value = Number(value)
    if (valueList?.includes(value)) newValueList = [...valueList?.filter(v => v !== value)]
      else newValueList = [...valueList, value]

    onClick(newValueList)
  }

  const checkSelectedOption = (value: number | string): boolean => {
    const valueType = typeof options[0].value // ex. number | string
    if (valueType === 'number') value = Number(value)
    
    return getSelectedValueList().includes(value)
  }
  
  // options가 api를 통해 외부에서 가져오는 경우 업데이트를 해줘야 한다.
  // useEffect(()=>{
  //   setSelectedNameList(() => initSelectedNameList())
  // }, [options, valueList])

  return (
    <div 
      className={styles['selectbox-multi']} 
      onMouseLeave={() => setActiveOptionBox(false)}
      style={style}
    >
      <div 
        className={`${styles['selectbox-multi-wrapper']}`} 
        onClick={()=>setActiveOptionBox(prev => !prev)}
        style={styleShowBox}
      >
        <div className={styles['selectbox-multi-name']}>
          {placeholder && !valueList.length
            ? <div className={styles['selectbox-multi-placeholder']}>{placeholder}</div>
            : getSelectedNameList().map((name: string) => <div key={name} className={styles['selectbox-multi-name-tag']}>{name}</div>) 
          }
        </div>
        <span className={styles['selectbox-multi-arrow']}><ArrowDown /></span>
      </div>

      {activeOptionBox &&
        <div className={styles['selectbox-multi-option-outer']}>
          <div className={styles['selectbox-multi-option-inner']}>
            {options?.map((option: { name: string, value: any }) => 
              <option
                className={`
                  ${styles['selectbox-multi-option-item']} 
                  ${checkSelectedOption(option.value) ? styles['selectbox-multi-option-item-active'] : ''}
                `}
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