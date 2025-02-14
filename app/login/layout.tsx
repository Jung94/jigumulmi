import { MobileForceLayout } from '@/src/shared/ui/layout'

export default async function LoginLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <MobileForceLayout>
      {children}
    </MobileForceLayout>
  )
}