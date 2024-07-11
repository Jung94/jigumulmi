"use client"

import { ReactNode, memo } from 'react'
import styles from './bottom-sheet.module.scss'
import { useBottomSheet } from '@/lib/hooks'
import Link from 'next/link'

type Props = {
  children: ReactNode
  handleClickFloatBtn: ()=>void
}

const BottomSheetCom = ({
  children,
  handleClickFloatBtn
}: Props) => {
  const { sheetRef, contentRef } = useBottomSheet()
  
  return (
    <div className={styles.wrapper} ref={sheetRef}>
      {/* <Link href="https://smore.im/form/gKNbMW1VUf" target='_blank'>
        <button className={`${styles.floating_button} ${styles.leave_opinion}`}>
          <svg width="20px" height="20px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
            <path fillRule="evenodd" clipRule="evenodd" d="M1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C17.937 1.25 22.75 6.06293 22.75 12C22.75 17.937 17.937 22.75 12 22.75C10.1437 22.75 8.39536 22.2788 6.87016 21.4493L2.63727 22.2373C2.39422 22.2826 2.14448 22.2051 1.96967 22.0303C1.79485 21.8555 1.71742 21.6058 1.76267 21.3627L2.55076 17.1298C1.72113 15.6046 1.25 13.8563 1.25 12Z" fill="#fff"></path>
          </svg>
        </button>
      </Link> */}
      {/* <button className={styles.floating_button} onClick={handleClickFloatBtn}>
        <svg width="30px" height="30px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M6 12h6m6 0h-6m0 0V6m0 6v6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
      </button> */}
      <div className={styles.header}>
        <div className={styles.handlebar}></div>
      </div>
      <div className={styles.content} ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

export default memo(BottomSheetCom)