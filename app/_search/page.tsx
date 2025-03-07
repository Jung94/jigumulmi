'use client'

import { Suspense } from 'react'
import SearchPage from '@/src/1.pages/service-search'

export default function Page() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}