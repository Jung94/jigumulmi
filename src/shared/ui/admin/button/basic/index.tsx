'use client'

import { ReactNode, MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import styles from './basic.module.scss'
import Image from 'next/image'
import SpinnerBlack from '@/public/icons/loading-spinner.svg'
import SpinnerWhite from '@/public/icons/loading-spinner-white.svg'

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

  const setLoading = () => {
    return <Image src={variant === 'filled' ? SpinnerWhite : SpinnerBlack} width={25} height={25} alt='loading-spinner' />
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
        {loading && setLoading()}
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