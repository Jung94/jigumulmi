"use client"

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './normal.module.scss';
import SpinnerBlack from '@/public/icons/loading-spinner.svg';
import SpinnerWhite from '@/public/icons/loading-spinner-white.svg';

type Props = {
  children: React.ReactNode
  type?: 'normal' | 'primary' | 'empty' | 'disabled' | 'deletion'
  disabled?: boolean
  isLoading?: boolean
  submit?: boolean
  onClick?: (e?: any)=>void
  style?: any
}

const Button = ({
  children, 
  type='normal', 
  disabled,
  isLoading,
  submit,
  onClick,
  style
}: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (isLoading) return handleDisable();
    // console.log('onClick', e)
    onClick && onClick(e);
  };

  const handleEnable = () => {
    if (buttonRef.current) buttonRef.current.disabled = false;
  };

  const handleDisable = () => {
    if (buttonRef.current) buttonRef.current.disabled = true;
  };

  useEffect(()=>{
    if (isLoading === false) handleEnable();
  }, [isLoading])

  return (
    <button 
      ref={buttonRef}
      style={style}
      type={submit ? 'submit' : 'button'}
      className={`
        ${styles.button} 
        ${styles[`${disabled ? 'disabled' : type}`]}
      `} 
      onClick={(e) => type !== 'disabled' && !disabled && handleOnClick(e)}
    >
      {isLoading 
        ? <Image src={type === 'empty' ? SpinnerBlack : SpinnerWhite} width={25} height={25} alt='loading-spinner' />
        : children
      }
    </button>
  );
};

export default Button;