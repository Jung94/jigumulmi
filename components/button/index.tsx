"use client"

import React, { useRef } from 'react';
import styles from './button.module.scss';
import Spinner from '@/public/icons/LoadingSpinnerWhite';

type Props = {
  children: React.ReactNode
  type?: 'button' | 'submit'
  size?: 'small' | 'medium' | 'large'
  color?: 'primary' | 'success' | 'error'
  variant?: 'text' | 'contained' | 'outlined'
  disabled?: boolean
  loading?: boolean
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void
  formAction?: (formData: FormData)=>void
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