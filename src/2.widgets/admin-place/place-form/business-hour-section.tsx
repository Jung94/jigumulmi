'use client'

import { useParams } from 'next/navigation'
import { Form } from '@/src/shared/ui/admin'
import { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import FixedBusinessHourForm from './fixed-business-hour-form'
import TemporaryBusinessHourForm from './temporary-business-hour-form'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { useUpdatePlaceMenu } from '@/src/4.entities/place-admin/model/queries'
import type { PlaceBusinessHour } from '@/src/4.entities/place-admin/model/types'

export default function BusinessHourSection(props: {
  businessHourData: PlaceBusinessHour
  setBusinessHourData: Dispatch<SetStateAction<PlaceBusinessHour>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const updatePlaceMenu = useUpdatePlaceMenu()
  const placeId = params?.placeId ? Number(params.placeId) : null

  return (
    <>
      <FixedBusinessHourForm {...props} />
      <Form.Divider />
      <TemporaryBusinessHourForm {...props} />
    </>
  )
}