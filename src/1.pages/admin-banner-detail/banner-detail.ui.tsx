'use client'

import { useRouter } from 'next/navigation'
import styles from './banner-detail.module.scss'
import { useQueryParams } from '@/src/shared/hooks'
import Header from '@/src/shared/ui/admin/layout/section/header'
import { PreviousPageButton } from '@/src/shared/ui/admin/button'
import AssignedPlaceList from '@/src/2.widgets/admin-banner/place-list-of-banner'
import PermittedPlaceList from '@/src/2.widgets/admin-banner/place-list-permitted'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/shared/ui/admin/tabs'
import ModificationFrom from '@/src/2.widgets/admin-banner/banner-form/modification-form'

export default function BannerDetailPage({ bannerId }: { bannerId: number }) {
  const router = useRouter()
  const { clearQueryParams } = useQueryParams()
  const navigateBannerList = () => router.push('/admin/banner')

  return (
    <>
      <Header title="배너 관리">
        <PreviousPageButton onClick={navigateBannerList}>
          배너 목록
        </PreviousPageButton>
      </Header>
      <div className={styles['banner-detail']}>
        <ModificationFrom bannerId={bannerId} />
        <Tabs defaultValue='assigned-place-list' style={{ overflow: 'hidden' }}>
          <TabsList>
            <TabsTrigger value='assigned-place-list' handleTrigger={clearQueryParams}>
              할당된 장소
            </TabsTrigger>
            <TabsTrigger value='all-place-list' handleTrigger={clearQueryParams}>
              할당 가능한 장소
            </TabsTrigger>
          </TabsList>
          <TabsContent value='assigned-place-list' style={{ height: '100%' }}>
            <AssignedPlaceList />
          </TabsContent>
          <TabsContent value='all-place-list' style={{ height: '100%' }}>
            <PermittedPlaceList />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
