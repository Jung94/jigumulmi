'use client'

import { ChangeEvent, MouseEvent, useState, useEffect } from 'react'
import styles from './registration-form.module.scss'
import { useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, ToggleSwitch, UploadImage } from '@/src/shared/ui/admin'
import { initialStateForBanner } from './banner-form.constant'
import { 
  useFetchBanner, 
  useUpdateBanner, 
  useDeleteBanner,
  updateBannerOuterImage,
  useUpdateBannerInnerImage
} from '@/src/4.entities/banner-admin/model/queries'
import bannerQueryKey from '@/src/4.entities/banner-admin/model/queries/query-key.constant'
import type { Banner } from '@/src/4.entities/banner-admin/model/types'

export default function ModificationFrom({ bannerId }: { bannerId: number }) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const updateMutation = useUpdateBanner()
  const deleteMutation = useDeleteBanner()
  const outerImageMutation = updateBannerOuterImage()
  const innerImageMutation = useUpdateBannerInnerImage()
  const { data: banner } = useFetchBanner(bannerId)
  const [formData, setFormData] = useState<Banner>(banner ?? initialStateForBanner)
  
  useEffect(() => {
    if (banner) setFormData(banner)
  }, [banner])

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>, type: 'outer' | 'inner') => {
    if (!banner) return
    const { files } = e.target
    const koName = type === 'outer' ? '외부' : '내부'

    if (files && files?.length === 1) {
      const file = files[0]
      const limitSize = 1024 ** 2 * 10

      if (file.size > limitSize) {
        alert("10MB 이하의 사진을 업로드해 주세요!")
        return
      }
      
      try {
        if (type === 'outer') {
          await outerImageMutation.mutateAsync({
            bannerId: banner.id, 
            outerImage: file
          })
        } else {
          await innerImageMutation.mutateAsync({
            bannerId: banner.id, 
            innerImage: file
          })
        }
        
        await queryClient.refetchQueries(bannerQueryKey.detail(banner.id))
        alert(`배너 ${koName} 이미지 수정이 완료되었습니다.`)
      } catch (error) {
        alert(`배너 ${koName} 이미지 수정을 실패하였습니다. 개발자에게 문의해 주세요!`)
        console.error("Failed to update banner image:", error)
      }
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type } = e.target
    let value: any

    if (type === "checkbox") {
      value = e.target.checked
    } else { // text, select 등
      value = e.target.value
    }
    
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const checkForUpdates = (): boolean => {
    if (!banner) return true
    if (formData.title !== banner.title
      || formData.isActive !== banner.isActive
    ) return false
      else return true
  }

  const handleUpdateBanner = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (!banner) return
    try {
      await updateMutation.mutateAsync({
        bannerId: banner.id, 
        data: { title: formData.title, isActive: formData.isActive }
      })
      await queryClient.refetchQueries(bannerQueryKey.detail(banner.id))
      alert('배너 수정이 완료되었습니다.')
    } catch (error) {
      alert("배너 수정을 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update banner:", error)
    }
  }

  const handleDeleteBanner = async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.preventDefault()
    if (!banner) return
    if (!window.confirm('정말 삭제하시겠습니까?')) return
    try {
      await deleteMutation.mutateAsync({ bannerId })
      alert('배너가 삭제되었습니다.')
      router.push('/admin/banner')
    } catch (error) {
      alert("배너 삭제를 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to delete banner:", error)
    }
  }

  return (
    <div className={styles['registration-form']}>
      <Form>
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
              value={formData.title ?? ''} 
              onChange={handleChange} 
              style={{fontSize: '0.875rem'}} 
            />
          </Form.Control>
        </Form.Item>
        <div className={styles['registration-form-button']}>
          <Button color='red' onClick={handleDeleteBanner}>삭제하기</Button>
          <Button disabled={checkForUpdates()} onClick={handleUpdateBanner} style={{ width: '100%' }}>수정하기</Button>
        </div>
        <Form.Divider />
        <div className={styles['registration-form-upload-wrapper']}>
          <Form.Item name='메인 이미지'>
            <Form.Control>
              <UploadImage 
                name='outerImage' 
                url={formData.outerImageS3Key 
                  ? `${process.env.NEXT_PUBLIC_CDN}${formData.outerImageS3Key}`
                  : null
                } 
                onChange={(e) => handleImageChange(e, 'outer')}
              />
            </Form.Control>
          </Form.Item>
          <Form.Item name='내부 이미지'>
            <UploadImage 
              name='innerImage' 
              url={formData.innerImageS3Key 
                ? `${process.env.NEXT_PUBLIC_CDN}${formData.innerImageS3Key}`
                : null
              } 
              onChange={(e) => handleImageChange(e, 'inner')}
            />
          </Form.Item>
        </div>
      </Form>
    </div>
  )
}