'use client'

import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react'
import { regex, deepEqual } from '@/src/shared/utils'
import styles from './place-form.module.scss'
import { Form, Input, Button, ToggleSwitch, UploadImage, Preview } from '@/src/shared/ui/admin'
import type { PlaceMenuInput } from '@/src/4.entities/place-admin/model/types'

const initialMenu = {
  id: crypto.randomUUID(),
  name: '',
  price: '',
  isNew: true,
  isMain: false,
  description: '',
  tempImage: undefined,
}

export default function MenuForm({
  menu,
  setMenu,
  menuList,
  setMenuList,
  isModifying,
  setIsModifying,
  handleDeleteMenu,
}: {
  menu: PlaceMenuInput
  setMenu: Dispatch<SetStateAction<PlaceMenuInput>>
  menuList: PlaceMenuInput[]
  setMenuList: Dispatch<SetStateAction<PlaceMenuInput[]>>
  isModifying: boolean
  setIsModifying: Dispatch<SetStateAction<boolean>>
  handleDeleteMenu: (menu: PlaceMenuInput) => void
}) {
  const [naverUrl, setNaverUrl] = useState('')
  const [isNaverUrl, setIsNaverUrl] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    let value: any

    if (type === 'checkbox') {
      value = e.target.checked
    } else value = e.target.value
    
    setMenu((prev) => ({ ...prev, [name]: value }))
  }
  
  const handleIsUploadInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isModifying) {
      if (!isNaverUrl && menu?.tempImage?.urlFromBlob) {
        if (!window.confirm('업로드한 사진이 존재합니다. 삭제하고 넘어가시겠습니까?')) return
      } else if (isNaverUrl && menu?.tempImage?.file) {
        if (!window.confirm('생성된 사진 파일이 존재합니다. 삭제하고 넘어가시겠습니까?')) return
      }
      setMenu((prev) => ({ ...prev, tempImage: undefined }))
      setNaverUrl('')
    }

    const { checked } = e.target
    setIsNaverUrl(checked)
  }

  const fetchImage = async (imageUrl: string) => {
    try {
      const proxyUrl = `/api/proxyImage?url=${encodeURIComponent(imageUrl)}`
      const response = await fetch(proxyUrl)

      if (!response.ok) {
        throw new Error('이미지 다운로드 실패')
      }
      
      const blob = await response.blob() // Blob 데이터를 가져옵니다.
      return blob
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const handleCreateImageFileFromNaverUrl = async () => {
    if (!naverUrl || 
      !(!!naverUrl.match(regex.urlRegex)?.length)
    ) return alert('올바른 url 형식이 아닙니다.')

    const blob = await fetchImage(naverUrl)
    
    if (blob) {
      const file = new File([blob], 'image.jpg', { type: blob.type })
      setMenu((prev) => ({ ...prev, tempImage: { file, urlFromBlob: URL.createObjectURL(file) } }))
      setNaverUrl('')
    }
  }

  const handleImageUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    
    if (files && files?.length === 1) {
      const file = files[0]
      const limitSize = 1024 ** 2 * 10

      if (file.size > limitSize) {
        alert("10MB 이하의 사진을 업로드해 주세요!")
        return
      }
      
      setMenu((prev) => ({ ...prev, tempImage: { file, urlFromBlob: URL.createObjectURL(file) }}))
    }
  }

  const handleNaverUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNaverUrl(value)
  }

  const handleCreateMenu = () => {
    const newMenu = menu as PlaceMenuInput
    setMenuList((prev: PlaceMenuInput[]) => ([...prev, newMenu]))
    setMenu(initialMenu)
    setNaverUrl('')
  }

  const handleUpdateMenu = () => {
    const newMenu = menu as PlaceMenuInput
    setMenuList((prev: PlaceMenuInput[]) => 
      prev.map(m => m.id === newMenu.id ? newMenu : m)
    )
    setMenu(initialMenu)
    setNaverUrl('')
    setIsModifying(false)
  }

  const checkIsUpdatedMenu = (): boolean => {
    const sameMenu = menuList.find(m => m.id === menu.id) // return [] | undefined
    const isUpdated = !deepEqual(menu, sameMenu)
    return isUpdated
  }

  return (
    <>
      <Form.Item row name='대표 메뉴'>
        <Form.Control>
          <ToggleSwitch
            name='isMain'
            checked={menu?.isMain ?? false}
            onChange={handleChange}
          />
        </Form.Control>
      </Form.Item>
      <div className={styles['place-form-row']}>
        <Form.Item name='이름'>
          <Form.Control>
            <Input 
              type='text' 
              name='name'
              value={menu?.name ?? ''} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='가격'>
          <Form.Control>
            <Input 
              type='text' 
              name='price'
              value={menu?.price ?? ''} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
      </div>
      <Form.Item name='설명'>
        <Form.Control>
          <Input 
            type='text' 
            name='description'
            value={menu?.description ?? ''} 
            onChange={handleChange} 
            style={{ fontSize: '0.875rem' }} 
          />
        </Form.Control>
      </Form.Item>
      <Form.Item row name={isNaverUrl ? '네이버 URL' : '사진 업로드'}>
        <Form.Control>
          <ToggleSwitch
            name='isNaverUrl'
            checked={isNaverUrl}
            onChange={handleIsUploadInputChange}
          />
        </Form.Control>
      </Form.Item>
      <Form.Item>
        <Form.Control>
          {isNaverUrl
            ? (
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
                  <Button 
                    disabled={!naverUrl} 
                    onClick={handleCreateImageFileFromNaverUrl}
                  >파일 생성하기</Button>
                  <Input 
                    type='text' 
                    name='naverUrl'
                    value={naverUrl} 
                    onChange={handleNaverUrlChange} 
                    style={{ fontSize: '0.875rem' }} 
                  />
                </div>
                {menu?.tempImage?.urlFromBlob
                  ? <Preview size='large' url={menu.tempImage?.urlFromBlob} />
                  : menu?.imageS3Key && <Preview size='large' url={process.env.NEXT_PUBLIC_CDN + menu.imageS3Key} />
                }
              </div>
              
            )
            : (
              <UploadImage 
                size='large'
                name='tempImage' 
                url={menu?.tempImage?.urlFromBlob ?? 
                  (menu?.imageS3Key ? process.env.NEXT_PUBLIC_CDN + menu.imageS3Key : null)
                } 
                onChange={handleImageUploadChange}
              />
            )
          }
        </Form.Control>
      </Form.Item>

      {isModifying
        ? (
          <div style={{ width: '100%', display: 'flex', gap: '0.5rem' }}>
            <Button color='red' style={{ width: '15rem' }} onClick={() => handleDeleteMenu(menu)}>삭제</Button>
            <Button disabled={!checkIsUpdatedMenu() || !menu?.name} style={{ width: '100%' }} onClick={handleUpdateMenu}>수정하기</Button>
          </div>
        )
        : <Button disabled={!menu?.name} onClick={handleCreateMenu}>메뉴 추가하기</Button>
      }
    </>
  )
}