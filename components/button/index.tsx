"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './button.module.scss';
// import Spinner from 'public/icons/loading-spinner-white.svg';
import Spinner from '@/public/icons/LoadingSpinnerWhite';
import LoadingSpinner from '@/components/icon/loading-spinner';

type Props = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'success' | 'error'
  variant?: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
  formAction?: ()=>void
  style?: any
}

const Button = ({
  children, 
  type='button', 
  size='medium',
  color='primary',
  variant='contained',
  disabled,
  loading,
  onClick,
  formAction,
  style
}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick && onClick(e);
  };

  return (
    <button 
      ref={buttonRef}
      type={type}
      disabled={disabled}
      className={`
        ${styles.button} 
        ${styles[`size_${size}`]}
        ${styles[`color_${color}`]}
        ${styles[`${variant}`]}
        ${loading && styles.loading}
      `} 
      style={style}
      formAction={formAction}
      onClick={(e)=>(!disabled || !loading) && handleClick(e)}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;