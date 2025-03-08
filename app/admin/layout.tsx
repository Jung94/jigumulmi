import Layout from '@/src/shared/ui/admin/layout/root'

export default async function ServiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
      {children}
    </Layout>
  )
}