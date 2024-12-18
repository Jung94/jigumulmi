'use client'

import { Dispatch, SetStateAction } from 'react'
import { Input } from '@/src/shared/ui/admin/form'
import styles from './registration-form.module.scss'

export default function RegistrationFrom({
  banner,
  setBanner
}: {
  banner: any
  setBanner: Dispatch<SetStateAction<any>>
}) {
  const handleTitle = (value: string) => {
    setBanner(prev => {
      return { ...prev, title: value}
    })
  }

  const handleImage = (name: 'outer' | 'inner', value: string) => {
    // setBanner((prev: any) => {
    //   let position = {...prev.position}
    //   position[propName] = value
    //   return {...prev, position}
    // })
  }

  return (
    <div className={styles['registration-form']}>
      <Input 
        type='text' 
        name='이름' 
        value={banner.title} 
        onChange={handleTitle} 
        style={{fontSize: '0.875rem'}} 
      />
      <Input 
        type='text' 
        name='메인 이미지' 
        value={banner.title} 
        // onChange={(v)=>handleChange('name', v)} 
        style={{fontSize: '0.875rem'}} 
      />
      <Input 
        type='text' 
        name='내부 이미지' 
        value={banner.title} 
        // onChange={(v)=>handleChange('name', v)} 
        style={{fontSize: '0.875rem'}} 
      />
    </div>
  )
}