import Layout from '@/src/shared/ui/admin/layout/main'
import MainLayout from '@/src/shared/ui/admin/layout/section/main'
import HeaderSection from '@/src/shared/ui/admin/layout/section/header'
// import TableSection from 'components/_pages/seasons/assignment/components/table';
// import { useGetSeason } from 'domain/labeling/season/query';

// export default function AssignmentPage({ params }: { params: { bannerId: string } }) {
export default function BannerPage() {
  // const seasonId = Number(params.seasonId)
  // const { data: season } = useGetSeason(seasonId)

  // return season?.data && (
  return (
    <Layout row>
      <MainLayout>
        <div style={{border: '1px solid orange'}}></div>
        <div style={{border: '1px solid green'}}></div>
        {/* <HeaderSection title={season.data.name} />
        <TableSection seasonId={seasonId} /> */}
      </MainLayout>
    </Layout>
  )
}
