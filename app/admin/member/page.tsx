'use client'

import { Suspense } from 'react'
import MemberPage from '@/src/1.pages/admin-member'

export default function MemberListPage() {
  return (
    <Suspense>
      <MemberPage />
    </Suspense>
  )
}