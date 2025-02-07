import React, { forwardRef } from 'react'
import styles from './input-base.module.scss'

interface TextInputProps {
  name?: string;
  value?: string;
  placeholder?: string;
  defaultValue?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(function TextInput({
  name,
  value,
  placeholder,
  defaultValue,
  disabled,
  onChange,
  onKeyDown,
  onFocus,
  onBlur,
  style
}, ref) {
  return (
    <input
      ref={ref}
      type="text"
      name={name}
      value={value}
      placeholder={placeholder}
      defaultValue={defaultValue}
      disabled={disabled}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
      className={styles['text-input']}
    />
  )
})

export default TextInput