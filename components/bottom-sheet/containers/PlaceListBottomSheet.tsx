"use client"

import { ReactNode, memo, useRef } from 'react'
import styles from '../bottom-sheet.module.scss'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
// import { useBottomSheet } from '@/lib/hooks'

type Props = {
  children: ReactNode
  handleClickFloatBtn: ()=>void
}

const PlaceListBottomSheet = ({
  children,
  handleClickFloatBtn
}: Props) => {
  const sheetRef = useRef<BottomSheetRef>(null)

  return (
    <BottomSheet 
      id="bottom-sheet"
      className={styles.wrapper} 
      open
      skipInitialTransition
      ref={sheetRef}
      blocking = {false}
      header={
        <div className={styles.empty_space} />
      }
      defaultSnap={({ maxHeight }) => 360}
      snapPoints={({ minHeight, maxHeight }) => [
        35,
        360
      ]}
    >
      <div 
        className={`${styles.inner}`}
      >
        {children}
      </div>
    </BottomSheet>
  )
}

export default memo(PlaceListBottomSheet)