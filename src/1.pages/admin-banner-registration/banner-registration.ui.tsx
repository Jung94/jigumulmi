'use client'

import styles from './banner-registration.module.scss'
import { useRouter } from 'next/navigation'
import { PreviousPageButton } from '@/src/shared/ui/admin/button'
import Header from '@/src/shared/ui/admin/layout/section/header'
import RegistrationFrom from '@/src/2.widgets/admin-banner/banner-form/registration-form'

export default function BannerRegistrationPage() {
  const router = useRouter()
  const navigateBannerList = () => router.push('/admin/banner')

  return (
    <>
      <Header title="배너 관리">
      <PreviousPageButton onClick={navigateBannerList}>
        배너 목록
      </PreviousPageButton>
      </Header>
      <div className={styles['banner-registration']}>
        <div className={styles['banner-registration-left-wrapper']}>
          <RegistrationFrom />
        </div>
        <div className={styles['banner-registration-empty']}></div>
      </div>
    </>
  )
}
