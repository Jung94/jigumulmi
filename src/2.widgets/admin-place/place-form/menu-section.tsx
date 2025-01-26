'use client'

import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react'
import Image from 'next/image'
import styles from './place-form.module.scss'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, Button, ToggleSwitch, UploadImage } from '@/src/shared/ui/admin'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { useUpdatePlaceBasic } from '@/src/4.entities/place-admin/model/queries'
import type {
  MenuImage, 
  PlaceMenu, 
  PlaceMenuInput, 
} from '@/src/4.entities/place-admin/model/types'

type Menu = {
  name: string
  price: string
  isMain: boolean
  description: string
  tempImage?: MenuImage
}

export default function MenuSection({
  menuData,
  setMenuData
}: {
  menuData: PlaceMenuInput[]
  setMenuData: Dispatch<SetStateAction<PlaceMenuInput[]>>
}) {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const updatePlace = useUpdatePlaceBasic()

  const placeId = params?.placeId ? Number(params.placeId) : null
  
  const [isNaverUrl, setIsNaverUrl] = useState(false)
  const [menu, setMenu] = useState<Menu>({
    name: '',
    price: '',
    isMain: false,
    description: '',
    tempImage: undefined,
  })
  console.log(menu)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    let value: any

    if (type === 'checkbox') {
      value = e.target.checked
    } else value = e.target.value
    
    setMenu((prev: Menu) => ({ ...prev, [name]: value }))
  }

  const handleIsUploadInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaverUrl && menu.tempImage?.urlFromBlob) {
      if (!window.confirm('업로드한 사진이 존재합니다. 삭제하고 넘어가시겠습니까?')) return
    } else if (isNaverUrl && menu.tempImage?.urlFromNaver && menu.tempImage?.file) {
      if (!window.confirm('생성된 사진 파일이 존재합니다. 삭제하고 넘어가시겠습니까?')) return
    }
    setMenu((prev: Menu) => ({ ...prev, tempImage: undefined }))

    const { checked } = e.target
    setIsNaverUrl(checked)
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
      
      setMenu((prev: Menu) => ({ ...prev, tempImage: { urlFromBlob: URL.createObjectURL(file), file }}))
    }
  }

  const handleNaverUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setMenu((prev: Menu) => ({ ...prev, tempImage: { urlFromNaver: value } }))
  }

  const fetchImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl)
      if (!response.ok) {
        throw new Error('이미지 다운로드 실패')
      }
      const blob = await response.blob() // Blob 데이터를 가져옵니다.
      return blob;
    } catch (error) {
      console.error(error)
    }
  }

  const handleCreateImageFileFromNaverUrl = async () => {
    const imageUrl = menu.tempImage?.urlFromNaver
    if (!imageUrl) return
    const blob = await fetchImage(imageUrl)
    if (blob) {
      console.log('blob')
      const file = new File([blob], 'image.jpg', { type: blob.type })
      setMenu((prev: Menu) => ({ ...prev, tempImage: { file } }))
    }
  }

  const drawMenuCard = (menuList: PlaceMenuInput[]) => {
    return (
      <div className={styles['place-form-menu']}>
        {menuList.map(menu => {
          const url = menu.imageS3Key ?? (menu.tempImage?.urlFromBlob ?? '')
          return (
            <div key={menu.name} className={styles['place-form-menu-card']}>
              <div className={styles['place-form-menu-card-image']}>
                <Image fill src={url} alt={url} style={{ objectFit: 'cover' }} />
              </div>
              <div className={styles['place-form-menu-card-name']}>
                {menu.name}
              </div>
              <div className={styles['place-form-menu-card-price']}>
                {menu.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const handleCreateMenu = () => {
    const newMenu: PlaceMenuInput = menu
    setMenuData((prev: PlaceMenuInput[]) => ([...prev, newMenu]))
    setMenu({
      name: '',
      price: '',
      isMain: false,
      description: '',
      tempImage: undefined,
    })
  }

  const handleUpdateMenu = async () => {
    // 생성된 메뉴가 있는지 & 그 중 이미지 존재 하는지
    try {
      // const { placeId } = await createPlace.mutateAsync(newPlaceBasic)
      alert('메뉴 정보가 저장되었습니다.')
      router.replace(`/admin/place/${placeId}`)
    } catch (error) {
      alert("메뉴 정보 저장을 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update menu:", error)
    }
  }

  return (
    <Form>
      <Form.Item row name='대표 메뉴'>
        <Form.Control>
          <ToggleSwitch
            name='isMain'
            checked={menu.isMain}
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
              value={menu.name} 
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
              value={menu.price} 
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
            value={menu.description} 
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
              <div style={{ width: '100%', display: 'flex', gap: '0.5rem'}}>
                <Input 
                  type='text' 
                  name='urlFromNaver'
                  value={menu.tempImage?.urlFromNaver ?? ''} 
                  onChange={handleNaverUrlChange} 
                  style={{ fontSize: '0.875rem' }} 
                />
                <Button 
                  disabled={!menu.tempImage?.urlFromNaver} 
                  onClick={handleCreateImageFileFromNaverUrl}
                >파일 생성하기</Button>
              </div>
            )
            : (
              <UploadImage 
                name='tempImage' 
                url={menu.tempImage?.urlFromBlob ?? null} 
                onChange={handleImageUploadChange}
              />
            )
          }
        </Form.Control>
      </Form.Item>
      <Button disabled={!menu.name} onClick={handleCreateMenu}>메뉴 추가하기</Button>
      <Form.Divider />
      {!!menuData.length
        ? drawMenuCard(menuData)
        : <div className={styles['place-form-menu-empty']}>메뉴 없음</div>
      }
      <Form.Divider />
      <Button onClick={handleUpdateMenu}>저장하기</Button>
    </Form>
  )
}