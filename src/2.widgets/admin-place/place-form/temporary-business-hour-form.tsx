import styles from './place-form.module.scss'
import { Dispatch, SetStateAction } from 'react'
import { Form, Button } from '@/src/shared/ui/admin'
import type { PlaceBusinessHour } from '@/src/4.entities/place-admin/model/types'

export default function TemporaryBusinessHourForm({
  businessHourData,
  setBusinessHourData
}: {
  businessHourData: PlaceBusinessHour
  setBusinessHourData: Dispatch<SetStateAction<PlaceBusinessHour>>
}) {
  const handleUpdate = async () => {}

  return (
    <Form>
      <Form.Title>변동 영업 시간</Form.Title>
      <Form.Item>
      </Form.Item>
      
      <Button onClick={handleUpdate} style={{ marginTop: '2rem' }}>
        저장하기
      </Button>
    </Form>
  )
}