'use client'

import styles from './place-form.module.scss'
import { useParams } from 'next/navigation'
import { ChangeEvent, useState } from 'react'
import { Dispatch, SetStateAction } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Button, SelectBox, ToggleSwitch, CalendarBusinessHour } from '@/src/shared/ui/admin'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { 
  useCreateTemporaryBusinessHour,
  useUpdateTemporaryBusinessHour,
  useDeleteTemporaryBusinessHour
} from '@/src/4.entities/place-admin/model/queries'
import type { 
  TimeCategory,
  PlaceBusinessHour,
  TemporaryBusinessHour
} from '@/src/4.entities/place-admin/model/types'

function formatDate(date: Date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // getMonth()는 0부터 시작하므로 1을 더함
  const day = date.getDate()

  return `${year}-${String(month).length === 1 ? `0${month}` : month}-${String(day).length === 1 ? `0${day}` : day}`
}

export default function TemporaryBusinessHourForm(props: {
  businessHourData: PlaceBusinessHour
  setBusinessHourData: Dispatch<SetStateAction<PlaceBusinessHour>>
  setMonth: Dispatch<SetStateAction<number>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const placeId = params?.placeId ? Number(params.placeId) : null
  const createTemporaryBusinessHour = useCreateTemporaryBusinessHour()
  const updateTemporaryBusinessHour = useUpdateTemporaryBusinessHour()
  const deleteTemporaryBusinessHour = useDeleteTemporaryBusinessHour()
  
  const { businessHourData, setBusinessHourData, setMonth } = props
  const [hasBreakTime, setHasBreakTime] = useState<boolean>(false)
  const [tempBusinessHour, setTempBusinessHour] = useState<TemporaryBusinessHour>({
    date: new Date()
  })

  const handleSelectDate = (selectedDate: Date) => {
    const existingTemporaryBusinessHour = businessHourData.temporaryBusinessHour.find(b => (
      b.date.getFullYear() === selectedDate.getFullYear() &&
      b.date.getMonth() === selectedDate.getMonth() &&
      b.date.getDate() === selectedDate.getDate()
    ))
    
    if (existingTemporaryBusinessHour) {
      setHasBreakTime(!!existingTemporaryBusinessHour.businessHour?.breakStart ||
        !!existingTemporaryBusinessHour.businessHour?.breakEnd
      )
      setTempBusinessHour(existingTemporaryBusinessHour)
    } else {
      setHasBreakTime(false)
      setTempBusinessHour({ date: selectedDate })
    }
  }

  const handleDayOffChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setTempBusinessHour((prev) => ({
      ...prev,
      businessHour: {
        ...prev.businessHour,
        openTime: undefined,
        closeTime: undefined,
        isDayOff: checked
      }
    }))
  }

  const handleHasBreakTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target
    setHasBreakTime(checked)
    setTempBusinessHour((prev) => ({
      ...prev,
      businessHour: {
        ...prev.businessHour,
        breakStart: undefined,
        breakEnd: undefined,
      }
    }))
  }

  const checkIsPossibleSubmit = (): boolean => {
    let isPossible = true
    if (!tempBusinessHour.date) isPossible = false
    if (!tempBusinessHour.businessHour?.isDayOff &&
      (typeof tempBusinessHour.businessHour?.openTime?.hour === 'undefined' ||
      typeof tempBusinessHour.businessHour?.openTime?.minute === 'undefined' ||
      typeof tempBusinessHour.businessHour?.closeTime?.hour === 'undefined' ||
      typeof tempBusinessHour.businessHour?.closeTime?.minute === 'undefined')
    ) isPossible = false
    if (hasBreakTime && 
      (typeof tempBusinessHour.businessHour?.breakStart?.hour === 'undefined' ||
      typeof tempBusinessHour.businessHour?.breakStart?.minute === 'undefined' ||
      typeof tempBusinessHour.businessHour?.breakEnd?.hour === 'undefined' ||
      typeof tempBusinessHour.businessHour?.breakEnd?.minute === 'undefined')
    ) isPossible = false
    return isPossible
  }

  const createNewTemporaryBusinessHour = () => {
    return {
      date: formatDate(tempBusinessHour.date),
      businessHour: {
        openTime: tempBusinessHour.businessHour?.openTime ?? null,
        closeTime: tempBusinessHour.businessHour?.closeTime ?? null,
        breakStart: tempBusinessHour.businessHour?.breakStart ?? null,
        breakEnd: tempBusinessHour.businessHour?.breakEnd ?? null,
        isDayOff: !!tempBusinessHour.businessHour?.isDayOff
      }
    }
  }

  const handleCreate = async () => {
    if (!placeId) return
    const newTemporaryBusinessHour = createNewTemporaryBusinessHour()
    try {
      await createTemporaryBusinessHour.mutateAsync({ 
        placeId, 
        body: newTemporaryBusinessHour
      })
      await queryClient.refetchQueries(placeQueryKey.businessHour(placeId, { month: undefined }))
      alert('변동 영업 시간 생성이 완료되었습니다.')
    } catch (error) {
      alert("변동 영업 시간 생성에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to create temporaryBusinessHour:", error)
    }
  }

  const handleUpdate = async () => {
    if (!placeId || !tempBusinessHour?.id) return
    const newTemporaryBusinessHour = createNewTemporaryBusinessHour()
    try {
      await updateTemporaryBusinessHour.mutateAsync({ 
        placeId, 
        temporaryBusinessHourId: tempBusinessHour.id,
        body: newTemporaryBusinessHour
      })
      await queryClient.refetchQueries(placeQueryKey.businessHour(placeId, { month: undefined }))
      alert('변동 영업 시간 수정이 완료되었습니다.')
    } catch (error) {
      alert("변동 영업 시간 수정에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update temporaryBusinessHour:", error)
    }
  }

  const handleDelete = async () => {
    if (!placeId || !tempBusinessHour?.id) return
    try {
      await deleteTemporaryBusinessHour.mutateAsync({ 
        placeId, 
        temporaryBusinessHourId: tempBusinessHour.id,
      })
      await queryClient.refetchQueries(placeQueryKey.businessHour(placeId, { month: undefined }))
      setTempBusinessHour({ date: tempBusinessHour.date })
      setHasBreakTime(false)
      alert('변동 영업 시간 삭제가 완료되었습니다.')
    } catch (error) {
      alert("변동 영업 시간 삭제를 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update temporaryBusinessHour:", error)
    }
  }

  return (
    <>
      <Form.Title>변동 영업 시간</Form.Title>
      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CalendarBusinessHour 
            selectedDay={tempBusinessHour.date} 
            selectedDayList={businessHourData.temporaryBusinessHour.map(b => b.date)}
            setSelectedDay={handleSelectDate}
          />
        </div>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='temporary-is-day-off'
              checked={tempBusinessHour.businessHour?.isDayOff ?? false}
              onChange={handleDayOffChange}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm 
            timeCategory='business'
            date={tempBusinessHour.date} 
            tempBusinessHour={tempBusinessHour}
            setTempBusinessHour={setTempBusinessHour}
          />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='temporary-is-break-time'
              checked={hasBreakTime}
              onChange={handleHasBreakTimeChange}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime &&
          <Form.Control>
            <BusinessHourForm 
              timeCategory='break' 
              date={tempBusinessHour.date} 
              tempBusinessHour={tempBusinessHour}
              setTempBusinessHour={setTempBusinessHour}
            />
          </Form.Control>
        }
      </Form.Item>
      {tempBusinessHour.id 
        ? <div style={{ marginTop: '2rem', display: 'flex', gap: '0.5rem' }}>
            <Button color='red' onClick={handleDelete} style={{ width: '15rem' }}>
              삭제하기
            </Button>
            <Button disabled={!checkIsPossibleSubmit()} onClick={handleUpdate}  style={{ width: '100%' }}>
              수정하기
            </Button>
          </div>
        : <Button disabled={!checkIsPossibleSubmit()} onClick={handleCreate} style={{ marginTop: '2rem' }}>
            저장하기
          </Button>
      }
    </>
  )
}

function BusinessHourForm ({
  date,
  timeCategory,
  tempBusinessHour,
  setTempBusinessHour
}: {
  date: Date
  timeCategory: 'business' | 'break'
  tempBusinessHour: TemporaryBusinessHour
  setTempBusinessHour: Dispatch<SetStateAction<TemporaryBusinessHour>>
}) {
  const drawColon = () => <span style={{ margin: 'auto 0.75rem' }}>:</span>
  const drawHyphen = () => <span style={{ margin: 'auto 1.5rem', fontSize: '1.5rem', fontWeight: 100 }}>-</span>

  const createHourOptionList = () => {
    let optionList = []

    for (let i = 0; i < 24; i++) {
      const name = String(i).length === 1 ? `0${i}` :`${i}`
      const value = i
      optionList.push({ name, value })
    }
    return optionList
  }

  const createMinuteOptionList = () => {
    let optionList = []

    for (let i = 0; i < 6; i++) {
      const name = `${i}0`
      const value = 10 * i
      optionList.push({ name, value })
    }
    return optionList
  }

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement>, 
    timeCategory: TimeCategory, 
    timeType: 'hour' | 'minute'
  ) => {
    const { value } = e.target
    setTempBusinessHour((prev) => ({
      ...prev,
      businessHour: {
        ...prev.businessHour,
        [timeCategory]: {
          ...prev.businessHour?.[timeCategory],
          [timeType]: Number(value)
        }
      }
    }))
  }

  return (
    <>
      <div className={styles['place-hour-row']}>
        <SelectBox.HiddenOption
          disabled={
            timeCategory === 'business'
            ? tempBusinessHour.businessHour?.isDayOff
            : false
          }
          placeholder='시간'
          options={createHourOptionList()}
          selectedValue={tempBusinessHour.businessHour?.[timeCategory === 'business' ? 'openTime' : 'breakStart']?.hour ?? ''}
          onClick={e => handleTimeChange(e, timeCategory === 'business' ? 'openTime' : 'breakStart', 'hour')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
        {drawColon()}
        <SelectBox.HiddenOption
          disabled={
            timeCategory === 'business'
            ? tempBusinessHour.businessHour?.isDayOff
            : false
          }
          placeholder='분'
          options={createMinuteOptionList()}
          selectedValue={tempBusinessHour.businessHour?.[timeCategory === 'business' ? 'openTime' : 'breakStart']?.minute ?? ''}
          onClick={e => handleTimeChange(e, timeCategory === 'business' ? 'openTime' : 'breakStart', 'minute')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
      </div>
      {drawHyphen()}
      <div className={styles['place-hour-row']}>
        <SelectBox.HiddenOption
          disabled={
            timeCategory === 'business'
            ? tempBusinessHour.businessHour?.isDayOff
            : false
          }
          placeholder='시간'
          options={createHourOptionList()}
          selectedValue={tempBusinessHour.businessHour?.[timeCategory === 'business' ? 'closeTime' : 'breakEnd']?.hour ?? ''}
          onClick={e => handleTimeChange(e, timeCategory === 'business' ? 'closeTime' : 'breakEnd', 'hour')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
        {drawColon()}
        <SelectBox.HiddenOption
          disabled={
            timeCategory === 'business'
            ? tempBusinessHour.businessHour?.isDayOff
            : false
          }
          placeholder='분'
          options={createMinuteOptionList()}
          selectedValue={tempBusinessHour.businessHour?.[timeCategory === 'business' ? 'closeTime' : 'breakEnd']?.minute ?? ''}
          onClick={e => handleTimeChange(e, timeCategory === 'business' ? 'closeTime' : 'breakEnd', 'minute')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
      </div>
    </>
  )
}