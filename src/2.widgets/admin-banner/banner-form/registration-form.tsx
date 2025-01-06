'use client'

import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './registration-form.module.scss'
import { useRouter } from 'next/navigation'
import UploadingImage from './uploading-image'
import ToggleSwitch from '@/src/shared/ui/toggle-switch'
import { initialState } from './banner-form.constant'
import { Button, Form, Input } from '@/src/shared/ui/admin'
import useCreateBanner from '@/src/4.entities/banner-admin/model/queries/useCreateBanner'
import { bannerAmdinAPI } from '@/src/4.entities/banner-admin/api/banner.constant'
import type { CreateBannerInput } from '@/src/4.entities/banner-admin/model/types'

export default function RegistrationFrom() {
  const router = useRouter()
  const mutation = useCreateBanner()
  const [formData, setFormData] = useState<CreateBannerInput>(initialState)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    let value: any

    if (type === "file") {
      const { files } = e.target as HTMLInputElement

      if (files && files?.length === 1) {
        const file = files[0]
        const limitSize = 1024 ** 2 * 10
  
        if (file.size > limitSize) {
          alert("10MB 이하의 사진을 업로드해 주세요!")
          return
        }
        
        value = { url: URL.createObjectURL(file), file }
      }
    } else if (type === "checkbox") {
      value = (e.target as HTMLInputElement).checked
    } else { // text, select 등
      value = e.target.value
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleDeleteOuterImage = () => {
    setFormData((prev) => ({ ...prev, outerImage: null }))
  }

  const handleDeleteInnerImage = () => {
    setFormData((prev) => ({ ...prev, innerImage: null }))
  }

  const checkAllFilled = (): boolean => {
    if (formData.title) return false
      else return true
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const { bannerId } = await mutation.mutateAsync(formData)
      router.push(`${bannerAmdinAPI.base}/${bannerId}`)
    } catch (error) {
      alert("배너 생성에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to create banner:", error)
    }
  }

  return (
    <div className={styles['registration-form']}>
      <Form onSubmit={handleSubmit}>
        <Form.Item row name='노출 여부'>
          <Form.Control>
            <ToggleSwitch
              name='isActive'
              checked={formData.isActive}
              onChange={handleChange}
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='제목'>
          <Form.Control>
            <Input 
              type='text' 
              name='title'
              value={formData.title} 
              onChange={handleChange} 
              style={{fontSize: '0.875rem'}} 
            />
          </Form.Control>
        </Form.Item>
        <div className={styles['registration-form-upload-wrapper']}>
          <Form.Item name='메인 이미지'>
            <Form.Control>
              <UploadingImage 
                name='outerImage' 
                url={formData.outerImage?.url} 
                onChange={handleChange}
                onDelete={handleDeleteOuterImage}
              />
            </Form.Control>
          </Form.Item>
          <Form.Item name='내부 이미지'>
            <UploadingImage 
              name='innerImage' 
              url={formData.innerImage?.url} 
              onChange={handleChange} 
              onDelete={handleDeleteInnerImage}
            />
          </Form.Item>
        </div>
        <Button type='submit' disabled={checkAllFilled()}>배너 생성하기</Button>
      </Form>
    </div>
  )
}