import Layout from '@/src/shared/ui/admin/layout/main'
import MainLayout from '@/src/shared/ui/admin/layout/section/main'

export default async function BannerLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Layout row>
      <MainLayout>
        {children}
      </MainLayout>
    </Layout>
  )
}