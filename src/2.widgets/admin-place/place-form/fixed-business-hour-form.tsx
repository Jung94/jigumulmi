'use client'

import styles from './place-form.module.scss'
import { useParams } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react'
import { Form, Button, SelectBox, ToggleSwitch } from '@/src/shared/ui/admin'
import { useUpdateFixedBusinessHour } from '@/src/4.entities/place-admin/model/queries'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import type { 
  TimeCategory,
  DayOfTheWeek, 
  HasBreakTime,
  FixedBusinessHour,
  PlaceBusinessHour 
} from '@/src/4.entities/place-admin/model/types'

export default function FixedBusinessHourForm(props: {
  businessHourData: PlaceBusinessHour
  setBusinessHourData: Dispatch<SetStateAction<PlaceBusinessHour>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const { businessHourData, setBusinessHourData } = props
  const updateFixedBusinessHour = useUpdateFixedBusinessHour()
  const placeId = params?.placeId ? Number(params.placeId) : null
  
  const [hasBreakTime, setHasBreakTime] = useState<HasBreakTime>({
    monday: !!(businessHourData.fixedBusinessHour.monday?.breakStart || businessHourData.fixedBusinessHour.monday?.breakEnd),
    tuesday: !!(businessHourData.fixedBusinessHour.tuesday?.breakStart || businessHourData.fixedBusinessHour.tuesday?.breakEnd),
    wednesday: !!(businessHourData.fixedBusinessHour.wednesday?.breakStart || businessHourData.fixedBusinessHour.wednesday?.breakEnd),
    thursday: !!(businessHourData.fixedBusinessHour.thursday?.breakStart || businessHourData.fixedBusinessHour.thursday?.breakEnd),
    friday: !!(businessHourData.fixedBusinessHour.friday?.breakStart || businessHourData.fixedBusinessHour.friday?.breakEnd),
    saturday: !!(businessHourData.fixedBusinessHour.saturday?.breakStart || businessHourData.fixedBusinessHour.saturday?.breakEnd),
    sunday: !!(businessHourData.fixedBusinessHour.sunday?.breakStart || businessHourData.fixedBusinessHour.sunday?.breakEnd),
  })

  const handleDayOffChange = (e: ChangeEvent<HTMLInputElement>, day: DayOfTheWeek) => {
    const { checked } = e.target
    checked && setHasBreakTime((prev) => ({ ...prev, [day]: !checked }))
    setBusinessHourData((prev) => ({
      ...prev,
      fixedBusinessHour: {
        ...prev.fixedBusinessHour,
        [day]: {
          ...prev.fixedBusinessHour[day],
          openTime: null,
          closeTime: null,
          breakStart: null,
          breakEnd: null,
          isDayOff: checked
        }
      }
    }))
  }
  
  const handleHasBreakTimeChange = (e: ChangeEvent<HTMLInputElement>, day: DayOfTheWeek) => {
    const { checked } = e.target
    setHasBreakTime((prev) => ({ ...prev, [day]: checked }))
    setBusinessHourData((prev) => ({
      ...prev,
      fixedBusinessHour: {
        ...prev.fixedBusinessHour,
        [day]: {
          ...prev.fixedBusinessHour[day],
          breakStart: null,
          breakEnd: null,
        }
      }
    }))
  }

  const isSaveButtonEnabled = (): boolean => {
    const fixedBusinessHour = businessHourData.fixedBusinessHour
    
    for (const [key, value] of Object.entries(fixedBusinessHour)) {
      const typedKey = key as keyof typeof fixedBusinessHour
      if (!value) return false
      if (!value.isDayOff &&
        (
          !/[0-9]/.test(String(value.openTime?.hour)) ||
          !/[0-9]/.test(String(value.openTime?.minute)) ||
          !/[0-9]/.test(String(value.closeTime?.hour)) ||
          !/[0-9]/.test(String(value.closeTime?.minute))
        )
      ) return false
      if (hasBreakTime[typedKey] &&
        (
          !/[0-9]/.test(String(value.breakStart?.hour)) ||
          !/[0-9]/.test(String(value.breakStart?.minute)) ||
          !/[0-9]/.test(String(value.breakEnd?.hour)) ||
          !/[0-9]/.test(String(value.breakEnd?.minute))
        )
      ) return false
    }
    return true
  }

  const handleUpdate = async () => {
    if (!placeId) return
    try {
      await updateFixedBusinessHour.mutateAsync({ 
        placeId, 
        body: businessHourData.fixedBusinessHour
      })
      await queryClient.refetchQueries(placeQueryKey.businessHour(placeId, { month: undefined }))
      alert('고정 영업 시간 수정이 완료되었습니다.')
    } catch (error) {
      alert("고정 영업 시간 수정에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update fixedBusinessHour:", error)
    }
  }

  return (
    <>
      <Form.Title>고정 영업 시간</Form.Title>
      <Form.SubTitle>월</Form.SubTitle>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='day-off-monday'
              checked={businessHourData.fixedBusinessHour.monday?.isDayOff ?? false}
              onChange={e => handleDayOffChange(e, 'monday')}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm day='monday' timeCategory='business' {...props} />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='break-time-monday'
              checked={hasBreakTime.monday}
              disabled={businessHourData.fixedBusinessHour.monday?.isDayOff}
              onChange={e => handleHasBreakTimeChange(e, 'monday')}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime.monday &&
          <Form.Control>
            <BusinessHourForm day='monday' timeCategory='break' {...props} />
          </Form.Control>
        }
      </Form.Item>

      <Form.Divider />
      
      <Form.SubTitle>화</Form.SubTitle>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='day-off-tuesday'
              checked={businessHourData.fixedBusinessHour.tuesday?.isDayOff ?? false}
              onChange={e => handleDayOffChange(e, 'tuesday')}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm day='tuesday' timeCategory='business' {...props} />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='break-time-tuesday'
              checked={hasBreakTime.tuesday}
              disabled={businessHourData.fixedBusinessHour.tuesday?.isDayOff}
              onChange={e => handleHasBreakTimeChange(e, 'tuesday')}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime.tuesday &&
          <Form.Control>
            <BusinessHourForm day='tuesday' timeCategory='break' {...props} />
          </Form.Control>
        }
      </Form.Item>

      <Form.Divider />

      <Form.SubTitle>수</Form.SubTitle>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='day-off-wednesday'
              checked={businessHourData.fixedBusinessHour.wednesday?.isDayOff ?? false}
              onChange={e => handleDayOffChange(e, 'wednesday')}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm day='wednesday' timeCategory='business' {...props} />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='break-time-wednesday'
              checked={hasBreakTime.wednesday}
              disabled={businessHourData.fixedBusinessHour.wednesday?.isDayOff}
              onChange={e => handleHasBreakTimeChange(e, 'wednesday')}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime.wednesday &&
          <Form.Control>
            <BusinessHourForm day='wednesday' timeCategory='break' {...props} />
          </Form.Control>
        }
      </Form.Item>

      <Form.Divider />

      <Form.SubTitle>목</Form.SubTitle>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='day-off-thursday'
              checked={businessHourData.fixedBusinessHour.thursday?.isDayOff ?? false}
              onChange={e => handleDayOffChange(e, 'thursday')}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm day='thursday' timeCategory='business' {...props} />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='break-time-thursday'
              checked={hasBreakTime.thursday}
              disabled={businessHourData.fixedBusinessHour.thursday?.isDayOff}
              onChange={e => handleHasBreakTimeChange(e, 'thursday')}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime.thursday &&
          <Form.Control>
            <BusinessHourForm day='thursday' timeCategory='break' {...props} />
          </Form.Control>
        }
      </Form.Item>

      <Form.Divider />

      <Form.SubTitle>금</Form.SubTitle>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='day-off-friday'
              checked={businessHourData.fixedBusinessHour.friday?.isDayOff ?? false}
              onChange={e => handleDayOffChange(e, 'friday')}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm day='friday' timeCategory='business' {...props} />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='break-time-friday'
              checked={hasBreakTime.friday}
              disabled={businessHourData.fixedBusinessHour.friday?.isDayOff}
              onChange={e => handleHasBreakTimeChange(e, 'friday')}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime.friday &&
          <Form.Control>
            <BusinessHourForm day='friday' timeCategory='break' {...props} />
          </Form.Control>
        }
      </Form.Item>

      <Form.Divider />

      <Form.SubTitle>토</Form.SubTitle>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='day-off-saturday'
              checked={businessHourData.fixedBusinessHour.saturday?.isDayOff ?? false}
              onChange={e => handleDayOffChange(e, 'saturday')}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm day='saturday' timeCategory='business' {...props} />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='break-time-saturday'
              checked={hasBreakTime.saturday}
              disabled={businessHourData.fixedBusinessHour.saturday?.isDayOff}
              onChange={e => handleHasBreakTimeChange(e, 'saturday')}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime.saturday &&
          <Form.Control>
            <BusinessHourForm day='saturday' timeCategory='break' {...props} />
          </Form.Control>
        }
      </Form.Item>

      <Form.Divider />

      <Form.SubTitle>일</Form.SubTitle>
      <Form.Item>
        <Form.Item row name='휴무일'>
          <Form.Control>
            <ToggleSwitch
              name='day-off-sunday'
              checked={businessHourData.fixedBusinessHour.sunday?.isDayOff ?? false}
              onChange={e => handleDayOffChange(e, 'sunday')}
            />
          </Form.Control>
        </Form.Item>
        <Form.Control>
          <BusinessHourForm day='sunday' timeCategory='business' {...props} />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Item row name='휴식 시간'>
          <Form.Control>
            <ToggleSwitch
              name='break-time-sunday'
              checked={hasBreakTime.sunday}
              disabled={businessHourData.fixedBusinessHour.sunday?.isDayOff}
              onChange={e => handleHasBreakTimeChange(e, 'sunday')}
            />
          </Form.Control>
        </Form.Item>
        {hasBreakTime.sunday &&
          <Form.Control>
            <BusinessHourForm day='sunday' timeCategory='break' {...props} />
          </Form.Control>
        }
      </Form.Item>

      <Button disabled={!isSaveButtonEnabled()} onClick={handleUpdate} style={{ marginTop: '2rem' }}>
        저장하기
      </Button>
    </>
  )
}

function BusinessHourForm ({
  day,
  timeCategory,
  businessHourData,
  setBusinessHourData
}: {
  day: DayOfTheWeek
  timeCategory: 'business' | 'break'
  businessHourData: PlaceBusinessHour
  setBusinessHourData: Dispatch<SetStateAction<PlaceBusinessHour>>
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
    day: DayOfTheWeek, 
    timeCategory: TimeCategory, 
    timeType: 'hour' | 'minute'
  ) => {
    const { value } = e.target
    setBusinessHourData((prev) => ({
      ...prev,
      fixedBusinessHour: {
        ...prev.fixedBusinessHour,
        [day]: {
          ...prev.fixedBusinessHour[day],
          [timeCategory]: {
            ...prev.fixedBusinessHour[day]?.[timeCategory],
            [timeType]: Number(value)
          }
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
            ? businessHourData.fixedBusinessHour[day]?.isDayOff
            : false
          }
          placeholder='시간'
          options={createHourOptionList()}
          selectedValue={businessHourData.fixedBusinessHour[day]?.[timeCategory === 'business' ? 'openTime' : 'breakStart']?.hour ?? ''}
          onClick={e => handleTimeChange(e, day, timeCategory === 'business' ? 'openTime' : 'breakStart', 'hour')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
        {drawColon()}
        <SelectBox.HiddenOption
          disabled={
            timeCategory === 'business'
            ? businessHourData.fixedBusinessHour[day]?.isDayOff
            : false
          }
          placeholder='분'
          options={createMinuteOptionList()}
          selectedValue={businessHourData.fixedBusinessHour[day]?.[timeCategory === 'business' ? 'openTime' : 'breakStart']?.minute ?? ''}
          onClick={e => handleTimeChange(e, day, timeCategory === 'business' ? 'openTime' : 'breakStart', 'minute')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
      </div>
      {drawHyphen()}
      <div className={styles['place-hour-row']}>
        <SelectBox.HiddenOption
          disabled={
            timeCategory === 'business'
            ? businessHourData.fixedBusinessHour[day]?.isDayOff
            : false
          }
          placeholder='시간'
          options={createHourOptionList()}
          selectedValue={businessHourData.fixedBusinessHour[day]?.[timeCategory === 'business' ? 'closeTime' : 'breakEnd']?.hour ?? ''}
          onClick={e => handleTimeChange(e, day, timeCategory === 'business' ? 'closeTime' : 'breakEnd', 'hour')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
        {drawColon()}
        <SelectBox.HiddenOption
          disabled={
            timeCategory === 'business'
            ? businessHourData.fixedBusinessHour[day]?.isDayOff
            : false
          }
          placeholder='분'
          options={createMinuteOptionList()}
          selectedValue={businessHourData.fixedBusinessHour[day]?.[timeCategory === 'business' ? 'closeTime' : 'breakEnd']?.minute ?? ''}
          onClick={e => handleTimeChange(e, day, timeCategory === 'business' ? 'closeTime' : 'breakEnd', 'minute')}
          styleShowBox={{ width: '7rem', height: '32px' }} 
        ></SelectBox.HiddenOption>
      </div>
    </>
  )
}