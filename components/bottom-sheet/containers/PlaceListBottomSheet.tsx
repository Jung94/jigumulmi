"use client"

import { ReactNode, memo, useRef } from 'react'
import styles from '../bottom-sheet.module.scss'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'
import 'react-spring-bottom-sheet/dist/style.css'
import FloatingButton from '../FloatingButton'

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
      open
      skipInitialTransition
      ref={sheetRef}
      blocking={false}
      scrollLocking={false}
      header={
        <div className={styles.empty_space}>
          <FloatingButton onClick={handleClickFloatBtn} />
        </div>
      }
      defaultSnap={({ maxHeight }) => 380}
      snapPoints={({ minHeight, maxHeight }) => [
        35,
        380
      ]}
      expandOnContentDrag={true}
    >
      {/* <div className={`${styles.inner}`}> */}
        {children}
      {/* </div> */}
    </BottomSheet>
  )
}

export default memo(PlaceListBottomSheet)