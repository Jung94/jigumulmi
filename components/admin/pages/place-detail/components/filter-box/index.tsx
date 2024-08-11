"use client"

import styles from './filter-box.module.scss'
import { useRouter } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { Button } from '@/components/admin/button'

const FilterBox = ({
  isDetail,
  save,
  handleDelete
}: {
  isDetail: boolean
  save: ()=>void
  handleDelete: ()=>void
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
      <Button onClick={save}>
        {isDetail ? '수정하기' : '등록하기'}
      </Button>
      {isDetail &&
        <Button type='deletion' onClick={handleDelete}>
          삭제하기
        </Button>
      }
    </div>
  )
}

export default FilterBox