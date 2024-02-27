"use client"

import { ReactNode, memo } from 'react'
import styles from './bottom-sheet.module.scss'
import { useBottomSheet } from '@/lib/hooks'

type Props = {
  children: ReactNode
}

const BottomSheet = ({
  children,
}: Props) => {
  const { sheetRef, contentRef } = useBottomSheet()
  
  return (
    <div className={styles.wrapper} ref={sheetRef}>
      <button className={styles.floating_button}>
        <svg width="25px" height="25px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
      </button>
      <div className={styles.header}>
        <div className={styles.handlebar}></div>
      </div>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

export default memo(BottomSheet)