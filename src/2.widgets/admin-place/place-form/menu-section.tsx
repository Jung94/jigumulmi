'use client'

import { Dispatch, SetStateAction, ChangeEvent, useState } from 'react'
import styles from './place-form.module.scss'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, Button } from '@/src/shared/ui/admin'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { useUpdatePlaceBasic } from '@/src/4.entities/place-admin/model/queries'
import { KakaoPlaceSearch, CategorySelectbox, SubwayStationSearch } from '@/src/2.widgets/admin-place/place-form'
import type { 
  MainCategory, 
  SubCategory, 
  SubwayStation, 
  PlaceMenu, 
  PlaceMenuInput, 
  CreatePlaceBasicInput 
} from '@/src/4.entities/place-admin/model/types'
import type { SearchedKakaoPlace } from '@/src/2.widgets/admin-place/place-form/kakao-place-search'

type MenuImage = {
  url: string
  file: File
} | null

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
  
  const [name, setName] = useState<string>('')
  const [price, setPrice] = useState<string>('')
  const [desc, setDesc] = useState<string>('')
  const [image, setImage] = useState<MenuImage>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    let value: any

    if (type === 'checkbox') {
      value = e.target.checked
    } else value = e.target.value
    
    setMenuData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleKakaoPlaceSearchSelect = (kakaoPlace: SearchedKakaoPlace) => {
    setMenuData((prev: any) => ({
      ...prev,
      name: kakaoPlace.place_name,
      address: kakaoPlace.road_address_name,
      contact: kakaoPlace.phone,
      position: {
        latitude: kakaoPlace.y,
        longitude: kakaoPlace.x
      },
      kakaoPlaceId: kakaoPlace.id,
    }))
  }

  const handleUpdateMenu = async () => {
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
      <div className={styles['place-form-row']}>
        <Form.Item name='이름'>
          <Form.Control>
            <Input 
              type='text' 
              name='name'
              value={name} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='가격'>
          <Form.Control>
            <Input 
              type='text' 
              name='address'
              value={price} 
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
            name='contact'
            value={desc} 
            onChange={handleChange} 
            style={{ fontSize: '0.875rem' }} 
          />
        </Form.Control>
      </Form.Item>
      <Button onClick={handleUpdateMenu}>저장하기</Button>
    </Form>
  )
}