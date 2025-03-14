'use client'

import styles from './basic.module.scss'
import { useRouter } from 'next/navigation'
import { ReactNode, MouseEvent } from 'react'
import { LoadingSpinner } from '@/src/shared/assets/icons'

type Props = {
  style?: any
  href?: string
  icon?: ReactNode
  iconPos?: 'left' | 'right'
  type?: 'button' | 'submit'
  size?: 'small' | 'medium' | 'large'
  color?: 'black' | 'primary' | 'red'
  variant?: 'text' | 'outline' | 'filled' | 'filled-weak'
  disabled?: boolean
  loading?: boolean
  children: ReactNode | string
  onClick?: (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => void
}

export default function Button({
  style,
  href,
  icon,
  iconPos,
  type = 'button',
  size = 'medium',
  color = 'black',
  variant = 'filled',
  disabled,
  loading,
  children, 
  onClick,
}: Props) {
  const router = useRouter()

  const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    if (href) router.push(href)
      else onClick && onClick(e)
  }

  const Content = () => (
    <span className={styles['button-content']}>
      {children}
    </span>
  )

  const setContent = () => {
    const Icon = () => (
      <span className={`
        ${styles['icon']}
        ${styles[`icon-${size}`]}
        ${styles[`icon-${iconPos}`]}
      `}>{icon}</span>
    )
    
    return (
      <>
        {loading && <LoadingSpinner width={20} height={20} />}
        {iconPos === 'left' && Icon()}
        {Content()}
        {iconPos === 'right' && Icon()}
      </>
    )
  }

  return (
    <button 
      type={type}
      style={style}
      disabled={disabled}
      className={`
        ${styles['button-base']} 
        ${styles[`button-${size}`]} 
        ${styles[`button-${variant}-${color}`]} 
      `} 
      onClick={handleClick}
    >
      {setContent()}
    </button>
  )
}