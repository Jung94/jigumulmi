"use client"

import React from 'react'
import styles from './filter-box.module.scss'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { Button } from '@/components/admin/button'

const FilterBox = ({
  isModifyingPage,
  save,
  handleDelete,
  handleCheckActiveSaveButton
}: {
  isModifyingPage: boolean
  save: () => void
  handleDelete: () => void
  handleCheckActiveSaveButton: () => boolean
}) => {
  const router = useRouter()

  const handleMoveToList = () => {
    const prevListUrl = getCookie('ji-admin-list-url')
    router.push(prevListUrl ?? '/admin/place?sort=1&page=1&placeName=&isFromAdmin=1')
  }

  return (
    <div className={styles.container} style={{alignItems: 'flex-end'}}>
      <Button type="empty" onClick={handleMoveToList} style={{ padding: '0 12px 0 6px'}}>
        <svg width="18px" height="18px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000">
          <path d="M15 6L9 12L15 18" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
        &nbsp;List
      </Button>
      <Button type={handleCheckActiveSaveButton() ? 'normal' : 'disabled'} onClick={save}>
        {isModifyingPage ? '수정하기' : '등록하기'}
      </Button>
      {isModifyingPage &&
        <Button type='deletion' onClick={handleDelete}>
          삭제하기
        </Button>
      }
    </div>
  )
}

export default React.memo(FilterBox)