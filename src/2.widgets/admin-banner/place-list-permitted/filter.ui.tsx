import { Dispatch, SetStateAction, KeyboardEvent, MouseEvent, useRef, useEffect } from 'react'
import { useParams } from 'next/navigation'
import styles from './place-list.module.scss'
import { useQueryParams } from '@/src/shared/hooks'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Search, SelectBox, SearchSubway } from '@/src/shared/ui/admin'
import { useUpdatePlaceList } from '@/src/4.entities/banner-admin/model/queries'
import { bannerAmdinAPI } from '@/src/4.entities/banner-admin/api/banner.constant'
import { useFetchRegionList, useFetchDistrictList } from '@/src/4.entities/place-admin/model/queries'

const placeCategoryGroups = [
  {name: '전체', value: ''},
  {name: '음식점', value: '음식점'},
  {name: '카페', value: '카페'},
  {name: '제로웨이스트샵', value: '제로웨이스트샵'},
  {name: '재활용센터', value: '재활용센터'},
]

export default function PlaceFilter({ 
  selectedIdList,
  setSelectedIdList
}: { 
  selectedIdList: number[] 
  setSelectedIdList: Dispatch<SetStateAction<number[]>>
}) {
  const params = useParams()
  const queryClient = useQueryClient()
  const mutation = useUpdatePlaceList()
  const { queryParams, updateQueryParams, clearQueryParams } = useQueryParams()

  const { data: regionList } = useFetchRegionList()
  const { data: districtList } = useFetchDistrictList({ region: queryParams.region })

  const placeNameRef = useRef<HTMLInputElement>(null)
  const menuNameRef = useRef<HTMLInputElement>(null)

  const handlePlaceNameChange = () => {
    if (placeNameRef.current) updateQueryParams({ page: null, placeName: placeNameRef.current.value })
  }

  const handleMenuNameChange = () => {
    if (menuNameRef.current) updateQueryParams({ page: null, menuName: menuNameRef.current.value })
  }

  const handleSubwayChange = (stationId: number) => {
    updateQueryParams({ page: null, subwayStationId: String(stationId) })
  }

  const handleCategoryChange = (e) => {
    updateQueryParams({ page: null, placeCategoryGroup: !!e ? e.target.value : null })
  }

  const handleRegionChange = (e) => {
    updateQueryParams({ 
      region: !!e ? e.target.value : null,
      districtId: null
    })
  }

  const handleDistrictChange = (e) => {
    updateQueryParams({ page: null, districtId: !!e ? e.target.value : null })
  }

  const handlePlaceListAssign = async () => {
    const bannerId = Number(params?.bannerId)
    if (!bannerId) return
    try {
      await mutation.mutateAsync({
        bannerId, 
        data: { placeIdList: selectedIdList }
      })
      await queryClient.refetchQueries({ queryKey: [bannerAmdinAPI.placeList(bannerId)] }) // 할당된 장소 리스트
      await queryClient.refetchQueries({ queryKey: [bannerAmdinAPI.parmittedPlaceList], type: 'active' }) // 할당 가능한 장소 리스트
      setSelectedIdList([])
      alert('할당이 완료되었습니다.')
    } catch (error) {
      alert("장소 할당에 실패하였습니다. 개발자에게 문의해 주세요!")
      console.error("Failed to update place list:", error)
    }
  }

  useEffect(() => {
    if (placeNameRef.current) placeNameRef.current.value = queryParams.placeName ?? ''
  }, [queryParams.placeName])

  useEffect(() => {
    if (menuNameRef.current) menuNameRef.current.value = queryParams.menuName ?? ''
  }, [queryParams.menuName])
  
  return (
    <div className={styles['filter']}>
      <div className={styles['filter-top']}>
        <Search 
          ref={placeNameRef}
          placeholder='장소명'
          defaultValue={queryParams.placeName ?? ''}
          onSearch={handlePlaceNameChange} 
          style={{
            height: '32px',
            minWidth: '7rem',
            maxWidth: '8rem',
          }}
        />
        <Search 
          ref={menuNameRef}
          placeholder='메뉴명'
          defaultValue={queryParams.menuName ?? ''}
          onSearch={handleMenuNameChange} 
          style={{
            height: '32px',
            minWidth: '7rem',
            maxWidth: '8rem',
          }}
        />
        <SearchSubway
          placeholder='지하철명'
          selectedValue={queryParams.subwayStationId ? Number(queryParams.subwayStationId) : null}
          onSearch={handleSubwayChange} 
          style={{
            height: '32px',
            minWidth: '7rem',
            maxWidth: '8rem',
          }}
        />
        <SelectBox.HiddenOption
          placeholder='카테고리'
          options={placeCategoryGroups}
          selectedValue={queryParams.placeCategoryGroup}
          onClick={handleCategoryChange}
          styleShowBox={{ height: '32px' }} 
        ></SelectBox.HiddenOption>
        <SelectBox.HiddenOption
          placeholder='광역시도'
          options={regionList 
            ? [{name: '전체', value: null}, ...regionList.map(r => ({ name: r, value: r }))] 
            : []}
          selectedValue={queryParams.region}
          onClick={handleRegionChange}
          styleShowBox={{ height: '32px' }} 
        ></SelectBox.HiddenOption>
        <SelectBox.HiddenOption
          placeholder='시군구'
          disabled={!queryParams.region}
          options={districtList 
            ? [{name: '전체', value: null}, ...districtList.map(d => ({ name: d.title, value: d.id })) ]
            : []}
          selectedValue={queryParams.districtId ? Number(queryParams.districtId) : null}
          onClick={handleDistrictChange}
          styleShowBox={{ height: '32px' }} 
        ></SelectBox.HiddenOption>
      </div>
      <div className={styles['filter-bottom']}>
        <div className={styles['filter-bottom-left']}>
          <Button 
            size='small' 
            color='primary' 
            disabled={!selectedIdList.length}
            onClick={handlePlaceListAssign}
          >할당하기</Button>
        </div>
        <div className={styles['filter-bottom-right']}>
          <Button size='small' variant='outline' onClick={clearQueryParams}>초기화</Button>
          <Button size='small'>검색하기</Button>
        </div>
      </div>
    </div>
  )
}