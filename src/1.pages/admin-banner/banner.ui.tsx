'use client'

import { Suspense } from 'react'
import styles from './banner.module.scss'
import { useRouter } from 'next/navigation'
import { Button } from '@/src/shared/ui/admin'
import Header from '@/src/shared/ui/admin/layout/section/header'
import BannerTable from '@/src/2.widgets/admin-banner/banner-list/banner-list.ui'

export default function BannerPage() {
  const router = useRouter()
  const navigateBannerDetail = () => router.push('/admin/banner/registration')

  return (
    <Suspense>
      <Header title="배너 관리">
        <Button onClick={navigateBannerDetail}>배너 생성</Button>
      </Header>
      <div className={styles['banner']}>
        <BannerTable />
        <div className={styles['banner-empty']}></div>
      </div>
    </Suspense>
  )
}
