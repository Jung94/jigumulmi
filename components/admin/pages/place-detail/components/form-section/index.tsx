"use client"

import styles from './form-section.module.scss'
import { useEffect, useState } from 'react'
import { Input } from '@/components/admin/form'
import { Button } from '@/components/admin/button'
import { SelectBox } from '@/components/admin/form'

type OpeningHourDay = 
  'openingHourSun' 
  | 'openingHourMon'
  | 'openingHourTue'
  | 'openingHourWed'
  | 'openingHourThu'
  | 'openingHourFri'
  | 'openingHourSat'

export type DefaultData = {
  name: string,
  mainImageUrl: string,
  position: { latitude: string, longitude: string },
  subwayStation: null,
  category: string,
  address: string,
  contact: string,
  menuList: {id: number, name: string}[],
  openingHour: Record<OpeningHourDay, string>,
  additionalInfo: string,
  overallReview: any,
  createdAt: string,
  modifiedAt: string,
  registrantComment: string,
  isApproved: boolean
}

export default function FormSection ({ defaultData }: { defaultData: DefaultData }) {
  const _defaultData = {
    name: '', // --
    mainImageUrl: '',
    position: { latitude: '', longitude: '' },
    subwayStation: null,
    category: '', // --
    address: '', // --
    contact: '', // --
    menuList: [],
    openingHour: {
      openingHourSun: '',
      openingHourMon: '',
      openingHourTue: '',
      openingHourWed: '',
      openingHourThu: '',
      openingHourFri: '',
      openingHourSat: '',
    },
    additionalInfo: '',
    overallReview: null,
    createdAt: '',
    modifiedAt: '',
    registrantComment: '',
    isApproved: false
  }
  const [ data, setData ] = useState<DefaultData>(_defaultData)

  const handleName = (name: string) => setData(prev => {return {...prev, name}})
  const handleCategory = (category: string) => setData(prev => {return {...prev, category}})
  const handleAddress = (address: string) => setData(prev => {return {...prev, address}})
  const handleContact = (contact: string) => setData(prev => {return {...prev, contact}})
  const handleOpeningHour = (day: OpeningHourDay, hour: string) => {
    setData((prev: DefaultData) => {
      let openingHour = {...prev.openingHour}
      openingHour[day] = hour
      return {...prev, openingHour}
    })
  }

  useEffect(()=>{
    if (!defaultData) return
    setData(defaultData)
  }, [defaultData])

  return (
    <div className={styles['form-section']}>
      <div className={styles['form-section-inputs-wrapper']}>
        <Input 
          type='text' 
          name='이름' 
          value={data.name} 
          onChange={(v)=>handleName(v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='카테고리' 
          value={data.category} 
          onChange={(v)=>handleCategory(v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='주소' 
          value={data.address} 
          onChange={(v)=>handleAddress(v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='연락처' 
          value={data.contact} 
          onChange={(v)=>handleContact(v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
      </div>
      <div className={styles['form-section-inputs-wrapper']}>
        <Input 
          type='text' 
          name='일' 
          value={data.openingHour.openingHourSun} 
          onChange={(v)=>handleOpeningHour('openingHourSun', v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='월' 
          value={data.openingHour.openingHourMon} 
          onChange={(v)=>handleOpeningHour('openingHourMon', v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='화' 
          value={data.openingHour.openingHourTue} 
          onChange={(v)=>handleOpeningHour('openingHourTue', v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='수' 
          value={data.openingHour.openingHourWed} 
          onChange={(v)=>handleOpeningHour('openingHourWed', v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='목' 
          value={data.openingHour.openingHourThu} 
          onChange={(v)=>handleOpeningHour('openingHourThu', v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='금' 
          value={data.openingHour.openingHourFri} 
          onChange={(v)=>handleOpeningHour('openingHourFri', v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
        <Input 
          type='text' 
          name='토' 
          value={data.openingHour.openingHourSat} 
          onChange={(v)=>handleOpeningHour('openingHourSat', v)} 
          styleLabel={{fontSize: '0.875rem'}} 
        />
      </div>
      {/* <SelectBox.HiddenOption
        name="sort" 
        label='정렬'
        options={sortOptions}
        selected={filters.sort}
        onClick={(v)=>handleSelect(v, "sort")}
        style={{
          width: '8rem'
        }}
      ></SelectBox.HiddenOption> */}
    </div>
  )
}