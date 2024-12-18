'use client'

import { useState } from 'react'
import styles from './banner-registration.module.scss'
import Layout from '@/src/shared/ui/admin/layout/main'
import MainLayout from '@/src/shared/ui/admin/layout/section/main'
import Header from '@/src/shared/ui/admin/layout/section/header'
import PlaceTable from '@/src/2.widgets/admin-place/list.ui'
import RegistrationFrom from '@/src/2.widgets/admin-banner/registration-form/registration-form'

export default function BannerRegistrationPage() {
  const [banner, setBanner] = useState({
    title: '',
    isActive: false,
    outerImage: null,
    innerImage: null,
  })

  return (
    <Layout row>
      <MainLayout>
        <Header title="배너 등록" />
        <div className={styles['banner-registration']}>
          <RegistrationFrom banner={banner} setBanner={setBanner} />
          <PlaceTable />
        </div>
      </MainLayout>
    </Layout>
  )
}
