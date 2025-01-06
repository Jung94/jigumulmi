'use client'

import { useState } from 'react'
import PlaceTable from './list.ui'
import PlaceFilter from './filter.ui'
import styles from './place-list.module.scss'

export default function PlaceListWidget() {
  const [selectedIdList, setSelectedIdList] = useState<number[]>([])

  return (
    <div className={styles['place-list']}>
      <PlaceFilter selectedIdList={selectedIdList} setSelectedIdList={setSelectedIdList} />
      <PlaceTable selectedIdList={selectedIdList} setSelectedIdList={setSelectedIdList} />
    </div>
  )
}
