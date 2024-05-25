"use client"

import { useEffect, useId, useState } from 'react';
import styles from './select-box.module.scss';
import ArrowDown from '@/public/icons/ArrowDown';

type Props = {
  name: string
  label: string
  multi?: boolean
  disabled?: boolean
  options: undefined | {value: any, name: string}[]
  selected?: any
  hasSearch?: boolean
  defaultName?: string
  styleShowBox?: any
  styleLabel?: any
  style?: any
  onClick: (v: any)=>void
}

const HiddenOption = ({
  name, 
  label, 
  multi, 
  disabled,
  options=[],
  selected,
  hasSearch=false,
  defaultName='',
  styleShowBox,
  styleLabel,
  style,
  onClick
}: Props) => {
  const optionId = useId()

  const getName = () => {
    const name = options.find(option => option.value === selected)?.name
    return name ? name : ''
  }

  const getSelectedNames = (selectedValues: number[]) => {
    return options.filter((option: {name: string, value: number}) => selectedValues.find((v: number) => v === option.value)).map(v => v.name)
  }

  const [ activeOptionBox, setActiveOptionBox ] = useState(false)
  const [ selectedName, setSelectedName ] = useState<string>(()=>getName())
  const [ selectedNames, setSelectedNames ] = useState<string[]>([])

  const handleClick = (v: any) => {
    !multi && setSelectedName(v.target.dataset.optionName)
    onClick(v)
  }

  const checkSelectedOption = (option: number) => {
    if (multi) return selected.includes(option)
      else return selected === option
  }

  useEffect(()=>{
    if (!multi) return
      else setSelectedNames(selected.length > 0 ? getSelectedNames(selected): [])
      // else if (selected.length === 0) return setSelectedNames([])
  }, [multi, selected])

  // options가 api를 통해 외부에서 가져오는 경우 업데이트를 해줘야 한다.
  useEffect(()=>{
    setSelectedName(()=>getName())
  }, [options])

  return (
    <div 
      className={styles.form} 
      style={style}
      onMouseLeave={()=>setActiveOptionBox(false)}
    >
      <div className={styles.label} style={styleLabel}>{label}</div>
      <div 
        style={styleShowBox}
        className={`${styles.show_box} ${multi && styles.multi}`} 
        onClick={()=>setActiveOptionBox(prev => !prev)}
      >
        <div className={`${styles.name} ${multi && styles.multi}`}>
          {multi
            ? selectedNames.length > 0 
              ? selectedNames.map((name: string, index: number) => <div key={name + index} className={`${defaultName ? styles.hidden_name_multi_tag : styles.name_multi_tag}`}>{name}</div>) 
              : defaultName
            : selectedName
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
                key={option.value + optionId} 
                data-name={name}
                data-option-name={option.name}
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