'use client'

import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react'
import Image from 'next/image'
import { regex } from '@/src/shared/utils'
import styles from './place-form.module.scss'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, Button, ToggleSwitch, UploadImage, Preview } from '@/src/shared/ui/admin'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { useUpdatePlaceBasic } from '@/src/4.entities/place-admin/model/queries'
import type {
  MenuImage, 
  PlaceMenu, 
  PlaceMenuInput, 
} from '@/src/4.entities/place-admin/model/types'

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
  const [naverUrl, setNaverUrl] = useState('')
  const [menu, setMenu] = useState<PlaceMenuInput>({
    name: '',
    price: '',
    isNew: true,
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
    
    setMenu((prev: PlaceMenuInput) => ({ ...prev, [name]: value }))
  }

  const handleIsUploadInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaverUrl && menu.tempImage?.urlFromBlob) {
      if (!window.confirm('업로드한 사진이 존재합니다. 삭제하고 넘어가시겠습니까?')) return
    } else if (isNaverUrl && menu.tempImage?.file) {
      if (!window.confirm('생성된 사진 파일이 존재합니다. 삭제하고 넘어가시겠습니까?')) return
    }
    setMenu((prev: PlaceMenuInput) => ({ ...prev, tempImage: undefined }))
    setNaverUrl('')

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
      
      setMenu((prev: PlaceMenuInput) => ({ ...prev, tempImage: { file, urlFromBlob: URL.createObjectURL(file) }}))
    }
  }

  const handleNaverUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setNaverUrl(value)
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
      setMenu((prev: PlaceMenuInput) => ({ ...prev, tempImage: { file, urlFromBlob: URL.createObjectURL(file) } }))
      setNaverUrl('')
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
                {url
                  ? <Image fill src={url} alt={url} style={{ objectFit: 'cover' }} />
                  : <span>사진 없음</span>
                }
              </div>
              <div className={styles['place-form-menu-card-name']}>
                {menu.name}
              </div>
              <div className={styles['place-form-menu-card-price']}>
                {menu.price
                  ? menu.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '원'
                  : '가격 변동'
                }
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
      isNew: true,
      isMain: false,
      description: '',
      tempImage: undefined,
    })
  }

  const handleUpdateMenu = async () => {
    // 생성된 메뉴가 있는지 & 그 중 이미지 존재 하는지
    const createdMenuList = menuData.filter(m => m.isNew)

    let menuList = []
    for (let i = 0; i < createdMenuList.length; i++) {
      const menu = createdMenuList[i]
      
      if (menu.tempImage) {
        // 
      } else {
        menuList.push({
          name: menu.name,
          price: menu.price,
          isMain: menu.isMain,
          description: menu.description,
          fullFilename: null
        })
      }
    }
    console.log(createdMenuList)
    try {
      // const { placeId } = await createPlace.mutateAsync(newPlaceBasic)
      // alert('메뉴 정보가 저장되었습니다.')
      // router.replace(`/admin/place/${placeId}`)
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
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                <div style={{ width: '100%', display: 'flex', gap: '0.5rem'}}>
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
                {menu.tempImage?.urlFromBlob &&
                  <Preview size='large' url={menu.tempImage?.urlFromBlob} />
                }
              </div>
              
            )
            : (
              <UploadImage 
                size='large'
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