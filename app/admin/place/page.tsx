import { Suspense } from 'react'
import PlacePage from '@/src/1.pages/admin-place'

export default function PlaceListPage() {
  return (
    <Suspense>
      <PlacePage />
    </Suspense>
  )
}
