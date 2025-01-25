'use client'

import { Dispatch, SetStateAction, ChangeEvent } from 'react'
import styles from './place-form.module.scss'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, ToggleSwitch, Button } from '@/src/shared/ui/admin'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { useCreatePlace, useUpdatePlaceBasic } from '@/src/4.entities/place-admin/model/queries'
import { KakaoPlaceSearch, CategorySelectbox, SubwayStationSearch } from '@/src/2.widgets/admin-place/place-form'
import type { MainCategory, SubCategory, SubwayStation, PlaceBasic, CreatePlaceBasicInput, CreatePlaceVariables } from '@/src/4.entities/place-admin/model/types'
import type { SearchedKakaoPlace } from '@/src/2.widgets/admin-place/place-form/kakao-place-search'

type Category = {
  categoryGroup: MainCategory
  category: SubCategory
}

export default function BasicSection({
  basicData,
  setBasicData
}: {
  basicData: PlaceBasic | CreatePlaceBasicInput
  setBasicData: Dispatch<SetStateAction<any>>
}) {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const createPlace = useCreatePlace()
  const updatePlace = useUpdatePlaceBasic()

  const placeId = params?.placeId ? Number(params.placeId) : null

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
      position: {
        latitude: kakaoPlace.y,
        longitude: kakaoPlace.x
      },
      kakaoPlaceId: kakaoPlace.id,
    }))
  }

  const handlePositionChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, 
    type: 'latitude' | 'longitude'
  ) => {
    const { value } = e.target
    setBasicData((prev: any) => ({ ...prev, position: { ...prev.position, [type]: value } }))
  }

  const handleCategoryListChange = (categoryList: Category[]) => {
    setBasicData((prev: any) => ({ ...prev, categoryList }))
  }

  const handleSubwayStationListChange = (subwayStationList: SubwayStation[]) => {
    setBasicData((prev: any) => ({ ...prev, subwayStationList }))
  }

  const handleCreatePlace = async () => {
    const newPlaceBasic: CreatePlaceVariables = {
      isApproved: basicData.isApproved,
      name: basicData.name,
      region: basicData.region,
      address: basicData.address,
      contact: basicData.contact,
      placeUrl: basicData.placeUrl,
      districtId: basicData.districtId,
      position: {
        latitude: basicData.position.latitude,
        longitude: basicData.position.longitude
      },
      categoryList: basicData.categoryList,
      kakaoPlaceId: basicData.kakaoPlaceId,
      additionalInfo: basicData.additionalInfo,
      registrantComment: basicData.registrantComment,
      subwayStationIdList: basicData.subwayStationList.map(s => s.id),
    }
    
    try {
      const { placeId } = await createPlace.mutateAsync(newPlaceBasic)
      alert('장소 생성이 완료되었습니다.')
      router.replace(`/admin/place/${placeId}`)
    } catch (error) {
      alert("장소 생성에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to create place:", error)
    }
  }

  const handleUpdatePlace = async () => {
    if (!placeId) return

    const newPlaceBasic: CreatePlaceVariables = {
      isApproved: basicData.isApproved,
      name: basicData.name,
      region: basicData.region,
      address: basicData.address,
      contact: basicData.contact,
      placeUrl: basicData.placeUrl,
      districtId: basicData.districtId,
      position: {
        latitude: basicData.position.latitude,
        longitude: basicData.position.longitude
      },
      categoryList: basicData.categoryList,
      kakaoPlaceId: basicData.kakaoPlaceId,
      additionalInfo: basicData.additionalInfo,
      registrantComment: basicData.registrantComment,
      subwayStationIdList: basicData.subwayStationList.map(s => s.id),
    }
    
    try {
      await updatePlace.mutateAsync({ placeId, data: newPlaceBasic })
      await queryClient.refetchQueries(placeQueryKey.basic(placeId))
      alert('기본 정보 수정이 완료되었습니다.')
    } catch (error) {
      alert("장소 수정에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update place:", error)
    }
  }

  const handleSubmitPlace = () => {
    if (placeId) handleUpdatePlace() // 수정
      else handleCreatePlace() // 생성
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
              value={basicData.position.latitude} 
              onChange={(e) => handlePositionChange(e, 'latitude')} 
              style={{ fontSize: '0.875rem' }} 
            />
          </Form.Control>
        </Form.Item>
        <Form.Item name='경도'>
          <Form.Control>
            <Input 
              type='text' 
              name='longitude'
              value={basicData.position.longitude} 
              onChange={(e) => handlePositionChange(e, 'longitude')} 
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
      <Button onClick={handleSubmitPlace}>저장하기</Button>
    </Form>
  )
}