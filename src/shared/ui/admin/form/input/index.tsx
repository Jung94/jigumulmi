'use client'

import { ReactNode, KeyboardEvent, forwardRef } from 'react'
import styles from './input.module.scss'

type Ref = HTMLInputElement;
type Props = {
  name: string
  type?: string
  value?: any
  alert?: {error: boolean, message: string}
  dataName?: string
  placeholder?: string
  isChecked?: boolean
  disabled?: boolean
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>)=>void
  onFocus?: (e: React.FocusEvent<HTMLInputElement, Element>)=>void
  onChange?: (e: React.ChangeEvent<HTMLInputElement>)=>void
  onKeyDown?: (e: KeyboardEvent)=>void
  handleButton?: ()=>ReactNode
  style?: any
}
const Input = forwardRef<Ref, Props>(function Input({
  name, 
  type='text',
  value,
  alert,
  dataName,
  placeholder,
  isChecked,
  disabled,
  onBlur,
  onFocus,
  onChange,
  onKeyDown,
  handleButton,
  style,
}, ref) {
  return (
    <div className={styles.container}>
      <div className={styles.label_button_wrap}>
        <label className={styles.label}>
          <div className={styles.input_wrap}>
            <input 
              ref={ref}
              disabled={disabled}
              className={`${value && typeof isChecked === 'boolean' && !isChecked && styles.error} ${disabled && styles.disabled}`}
              name={name} 
              type={type} 
              value={value} 
              data-name={dataName}
              placeholder={placeholder} 
              onChange={onChange} 
              onKeyDown={onKeyDown}
              onFocus={onFocus}
              onBlur={onBlur}
              style={style} 
            />
          </div>
        </label>
        {handleButton && handleButton()}
      </div>
      {alert?.message &&
        <div className={`${styles.alert} ${alert?.error && styles.alert_error}`}>{alert?.message}</div>
      }
    </div>
  )
})

export default Input