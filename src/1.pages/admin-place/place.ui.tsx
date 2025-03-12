'use client'

import { useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useQueryParams } from '@/src/shared/hooks'
import { Search, Button } from '@/src/shared/ui/admin'
import Header from '@/src/shared/ui/admin/layout/section/header'
import PlaceTable from '@/src/2.widgets/admin-place/place-list/place-list.ui'

export default function PlacePage() {
  const router = useRouter()
  const placeNameRef = useRef<HTMLInputElement>(null)
  const { queryParams, updateQueryParams } = useQueryParams()

  const handlePlaceNameChange = () => {
    if (placeNameRef.current) {
      updateQueryParams({ placeName: placeNameRef.current.value })
    }
  }

  const navigatePlaceRegistration = () => router.push('/admin/place/registration')

  return (
    <>
      <Header title='장소 관리'>
        <Search 
          ref={placeNameRef}
          placeholder='장소명'
          defaultValue={queryParams.placeName ?? ''}
          onSearch={handlePlaceNameChange} 
        />
        <Button onClick={navigatePlaceRegistration}>장소 등록</Button>
      </Header>
      <PlaceTable />
    </>
  )
}
