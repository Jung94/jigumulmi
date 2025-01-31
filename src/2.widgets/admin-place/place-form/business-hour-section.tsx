'use client'

import { Form } from '@/src/shared/ui/admin'
import { Dispatch, SetStateAction } from 'react'
import FixedBusinessHourForm from './fixed-business-hour-form'
import TemporaryBusinessHourForm from './temporary-business-hour-form'
import type { PlaceBusinessHour } from '@/src/4.entities/place-admin/model/types'

export default function BusinessHourSection(props: {
  businessHourData: PlaceBusinessHour
  setBusinessHourData: Dispatch<SetStateAction<PlaceBusinessHour>>
  setMonth: Dispatch<SetStateAction<number>>
}) {
  return (
    <Form>
      <FixedBusinessHourForm {...props} />
      <Form.Divider />
      <TemporaryBusinessHourForm {...props} />
    </Form>
  )
}