import Layout from '@/src/shared/ui/admin/layout/main'
import MainLayout from '@/src/shared/ui/admin/layout/section/main'
import Header from '@/src/shared/ui/admin/layout/section/header'
import BannerTable from '@/src/2.widgets/admin-banner/banner-list/banner-list.ui'
// import { useGetSeason } from 'domain/labeling/season/query';

// export default function AssignmentPage({ params }: { params: { bannerId: string } }) {
export default function BannerPage() {
  // const seasonId = Number(params.seasonId)
  // const { data: season } = useGetSeason(seasonId)

  // return season?.data && (
  return (
    <Layout row>
      <MainLayout>
        <Header title="배너 관리" />
        <BannerTable />
      </MainLayout>
    </Layout>
  )
}
