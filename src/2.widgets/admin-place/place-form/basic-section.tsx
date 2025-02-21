'use client'

import { Dispatch, SetStateAction, ChangeEvent } from 'react'
import styles from './place-form.module.scss'
import { useParams, useRouter } from 'next/navigation'
import { useQueryClient } from '@tanstack/react-query'
import { Form, Input, ToggleSwitch, Button, SelectBox } from '@/src/shared/ui/admin'
import placeQueryKey from '@/src/4.entities/place-admin/model/queries/query-key.constant'
import { KakaoPlaceSearch, CategorySelectbox, SubwayStationSearch } from '@/src/2.widgets/admin-place/place-form'
import { 
  useCreatePlace, 
  useCheckIsApproved,
  useUpdatePlaceBasic,
  useFetchRegionList, 
  useFetchDistrictList,
} from '@/src/4.entities/place-admin/model/queries'
import type { SearchedKakaoPlace } from '@/src/2.widgets/admin-place/place-form/kakao-place-search'
import type { 
  MainCategory, 
  SubCategory, 
  SubwayStation, 
  PlaceBasic, 
  CreatePlaceBasicInput, 
  CreatePlaceVariables,
  PlaceBusinessHour,
  FetchPlaceMenuResponse,
  PlaceImage
} from '@/src/4.entities/place-admin/model/types'

type Category = {
  categoryGroup: MainCategory
  category: SubCategory
}

export default function BasicSection({
  basicData,
  setBasicData,
  placeMenuData,
  placeBasicData,
  placeImageData,
  placeBusinessHourData
}: {
  basicData: PlaceBasic | CreatePlaceBasicInput
  setBasicData: Dispatch<SetStateAction<any>>
  placeMenuData?: FetchPlaceMenuResponse
  placeBasicData?: PlaceBasic
  placeImageData?: PlaceImage[]
  placeBusinessHourData?: PlaceBusinessHour
}) {
  const router = useRouter()
  const params = useParams()
  const queryClient = useQueryClient()
  const createPlace = useCreatePlace()
  const updatePlace = useUpdatePlaceBasic()
  const checkIsApproved = useCheckIsApproved()
  const placeId = params?.placeId ? Number(params.placeId) : null

  const { data: regionList } = useFetchRegionList()
  const { data: districtList } = useFetchDistrictList({ region: basicData.region })

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target
    let value: any

    if (type === 'checkbox') {
      value = e.target.checked
    } else value = e.target.value
    
    setBasicData((prev: any) => ({ ...prev, [name]: value }))
  }

  const isCheckedFixedBusinessHour = () => {
    if (!placeBusinessHourData) return
    const fixedBusinessHour = placeBusinessHourData.fixedBusinessHour
    
    for (const key in fixedBusinessHour) {
      const typedKey = key as keyof typeof fixedBusinessHour
      if (!fixedBusinessHour[typedKey]) return false
    }
    return true
  }

  const handleIsApprovedChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target

    if (!placeId) return
    if (checked) { // 승인하는 경우에만 검증
      if (
        !(
          placeBasicData?.name &&
          placeBasicData?.region &&
          placeBasicData?.address &&
          placeBasicData?.district &&
          placeBasicData?.position.latitude &&
          placeBasicData?.position.longitude &&
          !!placeBasicData?.categoryList.length &&
          !!placeBasicData?.subwayStationList.length &&
          !!placeMenuData?.length &&
          !!placeImageData?.length &&
          isCheckedFixedBusinessHour()
        )
      ) return alert(
        "장소 승인이 불가합니다. 필수 항목들을 입력해 주세요.\n\n" +
        "<필수 항목>\n" +
        "이름, 주소, 광역시도, 시군구, 위도, 경도, 고정 영업시간, 카테고리(1개 이상), 지하철역(1개 이상), 메뉴(1개 이상), 사진(1개 이상)"
      )
    }
    try {
      await checkIsApproved.mutateAsync({
        placeId, 
        body: { approve: checked }
      })
      // 주석 이유: refetch 하면 수정 중인 내용들이 다시 리셋됨
      // await queryClient.refetchQueries(placeQueryKey.basic(placeId))
      setBasicData((prev: any) => ({ ...prev, isApproved: checked }))
    } catch (error) {
      console.error(error)
    }
  }

  const handleRegionChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value } = e.target
    setBasicData((prev: any) => ({ ...prev, region: value, district: null }))
  }

  const handleDistrictChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { value, dataset } = e.target
    setBasicData((prev: any) => ({ ...prev, district: { id: Number(value), title: dataset.name } }))
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
      name: basicData.name,
      region: basicData.region,
      address: basicData.address,
      contact: basicData.contact,
      placeUrl: basicData.placeUrl,
      districtId: basicData.district ? basicData.district.id : null,
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
    
    // 승인되어 있는 장소인 경우
    if (basicData?.isApproved) {
      // 승인에 필요한 필수 항목이 존재하는지 검증
      if (
        !(
          basicData.name &&
          basicData.region &&
          basicData.address &&
          basicData.district &&
          basicData.position.latitude &&
          basicData.position.longitude &&
          !!basicData.categoryList.length &&
          !!basicData.subwayStationList.length
        )
      ) return alert(
        "장소 미승인 처리 후 저장이 가능합니다.\n\n" +
        "<필수 항목>\n" +
        "이름, 주소, 광역시도, 시군구, 위도, 경도, 고정 영업시간, 카테고리(1개 이상), 지하철역(1개 이상), 메뉴(1개 이상), 사진(1개 이상)"
      )
    }

    const newPlaceBasic: CreatePlaceVariables = {
      name: basicData.name,
      region: basicData.region,
      address: basicData.address,
      contact: basicData.contact,
      placeUrl: basicData.placeUrl,
      districtId: basicData.district ? basicData.district.id : null,
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
      {placeId &&
        <Form.Item row name='승인 여부'>
          <Form.Control>
            <ToggleSwitch
              name='isApproved'
              checked={basicData.isApproved}
              onChange={handleIsApprovedChange}
            />
          </Form.Control>
        </Form.Item>
      }
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
        <Form.Item name='광역시도'>
          <Form.Control>
            <SelectBox.HiddenOption
              placeholder='광역시도'
              options={regionList 
                ? [...regionList.map(r => ({ name: r, value: r }))] 
                : []}
              selectedValue={basicData.region}
              onClick={handleRegionChange}
            ></SelectBox.HiddenOption>
          </Form.Control>
        </Form.Item>
        <Form.Item name='시군구'>
          <Form.Control>
            <SelectBox.HiddenOption
              placeholder='시군구'
              options={districtList 
                ? [...districtList.map(d => ({ name: d.title, value: d.id })) ]
                : []}
              selectedValue={basicData.district ? basicData.district.id : null}
              onClick={handleDistrictChange}
            ></SelectBox.HiddenOption>
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