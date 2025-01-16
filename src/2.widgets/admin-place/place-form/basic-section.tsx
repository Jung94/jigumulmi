'use client'

import { Dispatch, SetStateAction, ChangeEvent } from 'react'
import styles from './place-form.module.scss'
import { Form, Input, ToggleSwitch, Button } from '@/src/shared/ui/admin'
import { KakaoPlaceSearch, CategorySelectbox, SubwayStationSearch } from '@/src/2.widgets/admin-place/place-form'
import type { SubwayStation } from '@/src/4.entities/place-admin/model/types'
import type { MainCategory, SubCategory } from '@/src/4.entities/place-admin/model/types'
import type { SearchedKakaoPlace } from '@/src/2.widgets/admin-place/place-form/kakao-place-search'

type Category = {
  categoryGroup: MainCategory
  category: SubCategory
}

export default function BasicSection({
  basicData,
  setBasicData
}: {
  basicData: any
  setBasicData: Dispatch<SetStateAction<any>>
}) {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    let value: any

    if (type === 'checkbox') {
      value = e.target.checked
    } else value = e.target.value
    
    setBasicData((prev: any) => ({ ...prev, [name]: value }))
  }

  const handleKakaoPlaceSearchSelect = (kakaoPlace: SearchedKakaoPlace) => {
    setBasicData((prev: any) => ({
      ...prev,
      name: kakaoPlace.place_name,
      address: kakaoPlace.road_address_name,
      contact: kakaoPlace.phone,
      latitude: kakaoPlace.y, 
      longitude: kakaoPlace.x,
      kakaoPlaceId: kakaoPlace.id,
    }))
  }

  const handleCategoryListChange = (categoryList: Category[]) => {
    setBasicData((prev: any) => ({ ...prev, categoryList }))
  }

  const handleSubwayStationListChange = (subwayStationList: SubwayStation[]) => {
    setBasicData((prev: any) => ({ ...prev, subwayStationList }))
  }

  return (
    <Form>
      <Form.Item row name='승인 여부'>
        <Form.Control>
          <ToggleSwitch
            name='isApproved'
            checked={basicData.isApproved}
            onChange={handleChange}
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='장소 검색'>
        <Form.Control>
          <KakaoPlaceSearch handleSelect={handleKakaoPlaceSearchSelect} />
        </Form.Control>
      </Form.Item>
      <Form.Item name='카테고리'>
        <Form.Control>
          <CategorySelectbox 
            categoryList={basicData.categoryList} 
            handleCategoryListChange={handleCategoryListChange} 
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='네이버 URL'>
        <Form.Control>
          <Input 
            type='text' 
            name='placeUrl'
            value={basicData.placeUrl} 
            onChange={handleChange} 
            style={{ fontSize: '0.875rem' }} 
          />
        </Form.Control>
      </Form.Item>
      <div className={styles['place-form-row']}>
        <Form.Item name='이름'>
          <Form.Control>
            <Input 
              type='text' 
              name='name'
              value={basicData.name} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='주소'>
          <Form.Control>
            <Input 
              type='text' 
              name='address'
              value={basicData.address} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='연락처'>
          <Form.Control>
            <Input 
              type='text' 
              name='contact'
              value={basicData.contact} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
      </div>
      <div className={styles['place-form-row']}>
        <Form.Item name='위도'>
          <Form.Control>
            <Input 
              type='text' 
              name='latitude'
              value={basicData.latitude} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='경도'>
          <Form.Control>
            <Input 
              type='text' 
              name='longitude'
              value={basicData.longitude} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='추가 정보'>
          <Form.Control>
            <Input 
              type='text' 
              name='additionalInfo'
              value={basicData.additionalInfo} 
              onChange={handleChange} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
      </div>
      <Form.Item name='지하철역'>
        <Form.Control>
          <SubwayStationSearch 
            subwayStationList={basicData.subwayStationList} 
            handleSubwayStationListChange={handleSubwayStationListChange}
          />
        </Form.Control>
      </Form.Item>
      <Form.Item name='유저가 남긴 말'>
        <Form.Control>
        <textarea 
          readOnly 
          id='registrantComment' 
          name='registrantComment' 
          className={styles['place-form-textarea']}
          value={basicData.registrantComment ?? ''} />
        </Form.Control>
      </Form.Item>
      <Button>저장하기</Button>
    </Form>
  )
}