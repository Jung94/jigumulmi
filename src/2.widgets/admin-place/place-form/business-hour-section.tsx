'use client'

import { useParams } from 'next/navigation'
import { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import FixedBusinessHourForm from './fixed-business-hour-form'
import { Form, Button, CalendarBase } from '@/src/shared/ui/admin'
import TemporaryBusinessHourForm from './temporary-business-hour-form'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { useUpdatePlaceMenu } from '@/src/4.entities/place-admin/model/queries'
import type { PlaceBusinessHour } from '@/src/4.entities/place-admin/model/types'

export default function BusinessHourSection(props: {
  businessHourData: PlaceBusinessHour
  setBusinessHourData: Dispatch<SetStateAction<PlaceBusinessHour>>
  setMonth: Dispatch<SetStateAction<number>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const updatePlaceMenu = useUpdatePlaceMenu()
  const placeId = params?.placeId ? Number(params.placeId) : null

  const handleUpdate = async () => {}

  return (
    <Form>
      <FixedBusinessHourForm {...props} />
      <Form.Divider />
      <TemporaryBusinessHourForm {...props} />
    </Form>
  )
}