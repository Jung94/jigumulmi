import { Suspense } from 'react'
import LoginPage from '@/src/1.pages/login'

export default function Page() {
  return (
    <Suspense>
      <LoginPage />
    </Suspense>
  )
}