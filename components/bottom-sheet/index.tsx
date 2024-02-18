"use client"

import { ReactNode, memo } from 'react'
import styles from './bottom-sheet.module.scss'
import { useBottomSheet } from '@/lib/hooks'

type Props = {
  children: ReactNode
  minHeight?: string
}

const BottomSheet = ({
  children,
  minHeight
}: Props) => {
  const { sheetRef, contentRef } = useBottomSheet()
  
  return (
    <div className={styles.wrapper} ref={sheetRef}>
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