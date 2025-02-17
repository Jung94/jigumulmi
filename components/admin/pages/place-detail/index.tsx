"use client"
import { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { placeDetailQueryKey } from '@/domain/admin/query/useGetPlaceDetail';
import Layout from '@/components/admin/layout/main';
import MainLayout from '@/components/admin/layout/section/main';
import HeaderSection from '@/components/admin/layout/section/header';
import FilterBox from '@/components/admin/pages/place-detail/components/filter-box';
import FormSection from '@/components/admin/pages/place-detail/components/form-section';
import { useGetPlaceDetail, usePostPlace, usePutPlace, useDeletePlace } from '@/domain/admin/query';
import { APIadmin } from "@/lib/api/admin";
import type { Params, PlaceDetail } from './types';

const defaultData = {
  id: null, // --
  name: '', // --
  placeUrl: '', // --
  position: { latitude: '', longitude: '' }, // --
  subwayStationList: [],
  categoryList: [], // --
  address: '', // --
  contact: '', // --
  menuList: [], // --
  imageList: [], // --
  openingHour: { // --
    openingHourSun: '',
    openingHourMon: '',
    openingHourTue: '',
    openingHourWed: '',
    openingHourThu: '',
    openingHourFri: '',
    openingHourSat: '',
  },
  additionalInfo: '',
  overallReview: null,
  createdAt: '',
  modifiedAt: '',
  registrantComment: '',
  isApproved: false, 
  kakaoPlaceId: '',
}

export default function PlaceDetailPage() {
  const router = useRouter()
  const params = useParams()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const [ data, setData ] = useState<PlaceDetail>(defaultData)

  const { data: placeDetail } = useGetPlaceDetail(params?.placeId ? Number(params.placeId) : null)

  const postPlace = usePostPlace()
  const putPlace = usePutPlace()
  const deletePlace = useDeletePlace()

  const handleRegister = (body: any) => {
    postPlace.mutate(body, { 
      onSuccess(data, variables, context) {
        console.log(data)
        if (data.status === 204) {
          queryClient.refetchQueries({queryKey: [APIadmin.place]})
          alert('등록이 완료되었습니다')
          router.push('/admin/place?sort=1&page=1')
        } else if (data.status === 400) {
          alert('이미 등록된 장소입니다! : 등록 시')
        } else {
          alert(`알 수 없는 에러 발생! 개발자를 호출해보아요!(code: ${data.status})`)
        }
      }
    })
  }

  const handleModify = (body: any) => {
    putPlace.mutate(body, { 
      onSuccess(data, variables, context) {
        if (data.status === 204) {
          queryClient.refetchQueries({queryKey: [APIadmin.place]})
          queryClient.invalidateQueries([placeDetailQueryKey(Number(params.placeId))])
          alert('수정이 완료되었습니다')
        } else if (data.status === 400) {
          alert('이미 등록된 장소입니다!')
        } else {
          alert(`알 수 없는 에러 발생! 개발자를 호출해보아요!(${data.status})`)
        }
      }
    })
  }

  const handleDelete = () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return

    deletePlace.mutate(
      Number(params.placeId), { 
        onSuccess(data, variables, context) {
          if (data.status === 204) {
            queryClient.refetchQueries({queryKey: [APIadmin.place]})
            alert('삭제가 완료되었습니다')
            const prevListUrl = getCookie('ji-admin-list-url')
            router.push(prevListUrl ?? '/admin/place?sort=1&page=1&placeName=&isFromAdmin=1')
          } else {
            alert(`알 수 없는 에러 발생! 개발자를 호출해보아요!(${data.status})`)
          }
        }
    })
  }

  const save = () => {
    let body: any = {
      ...data,
      menuList: !!data.menuList.length ? data.menuList.map(v => v.name) : [],
      imageList: data.imageList.map((image, index) => {
        return {url: image.url, isMain: index === 0 ? true : false}
      }),
      position: {
        latitude: Number(data.position.latitude),
        longitude: Number(data.position.longitude)
      },
      subwayStationIdList: !!data.subwayStationList.length ? data.subwayStationList.map(v => v.id) : [],
    }
    delete body.subwayStationList
    delete body.subwayStation
    delete body.createdAt
    delete body.modifiedAt
    delete body.id

    if (params.placeId) { // 수정
      body = { ...body, placeId: Number(params.placeId) }
      handleModify(body)
    } else { // 등록
      handleRegister(body)
    }
  }

  useEffect(()=>{
    return () => {
      if (pathname !== '/admin/place/registration') deleteCookie('ji-admin-list-url')
    }
  }, [])

  useEffect(()=>{
    if (!placeDetail?.data) return
    setData({...placeDetail?.data})
  }, [placeDetail?.data])

  const handleCheckActiveSaveButton = () => {
    if (!!params?.placeId) {
      const initialData = placeDetail?.data
      if (!initialData) return false
      console.log(initialData)

      const isSameCategory = 
        initialData.categoryList.length === data.categoryList.length
        && initialData.categoryList.map(x => x.category).filter(c => !data.categoryList.map(x => x.category).includes(c)).concat(data.categoryList.map(x => x.category).filter(c => !initialData.categoryList.map(x => x.category).includes(c))).length === 0

      const isSameSubwayStation = 
        initialData.subwayStationList.length === data.subwayStationList.length
        && initialData.subwayStationList.map(x => x.id).filter(id => !data.subwayStationList.map(x => x.id).includes(id)).concat(data.subwayStationList.map(x => x.id).filter(id => !initialData.subwayStationList.map(x => x.id).includes(id))).length === 0

      const isSameMenu = 
        initialData.menuList.length === data.menuList.length
        && initialData.menuList.map(x => x.id).filter(id => !data.menuList.map(x => x.id).includes(id)).concat(data.menuList.map(x => x.id).filter(id => !initialData.menuList.map(x => x.id).includes(id))).length === 0
      
      const isSameImage = 
        initialData.imageList.length === data.imageList.length
        && initialData.imageList.map(x => x.id).filter(id => !data.imageList.map(x => x.id).includes(id)).concat(data.imageList.map(x => x.id).filter(id => !initialData.imageList.map(x => x.id).includes(id))).length === 0
      
      if (initialData.kakaoPlaceId === data.kakaoPlaceId
        && initialData.name === data.name // 이름
        && initialData.address === data.address // 주소
        && initialData.contact === data.contact // 연락처
        && initialData.placeUrl === data.placeUrl // 네이버 URL
        && initialData.isApproved === data.isApproved // 승인 여부
        && initialData.additionalInfo === data.additionalInfo // 추가 정보
        && initialData.position.latitude === data.position.latitude // 위도
        && initialData.position.longitude === data.position.longitude // 경도
        && initialData.openingHour.openingHourMon === data.openingHour.openingHourMon
        && initialData.openingHour.openingHourTue === data.openingHour.openingHourTue
        && initialData.openingHour.openingHourWed === data.openingHour.openingHourWed
        && initialData.openingHour.openingHourThu === data.openingHour.openingHourThu
        && initialData.openingHour.openingHourFri === data.openingHour.openingHourFri
        && initialData.openingHour.openingHourSat === data.openingHour.openingHourSat
        && initialData.openingHour.openingHourSun === data.openingHour.openingHourSun
        && isSameMenu // 메뉴
        && isSameImage // 이미지
        && isSameCategory // 카테고리
        && isSameSubwayStation // 지하철역
      ) return false
        else return true
    } else return true
  }

  return (
    <Layout row>
      <MainLayout>
        <HeaderSection title={`${params?.placeId ? `장소 수정${data ? ` (ID: ${data.id}, KakaoID: ${data.kakaoPlaceId ?? "-"})` : ''}` : '장소 등록'}`}>
          <FilterBox 
            isModifyingPage={!!params?.placeId}
            save={save}
            handleDelete={handleDelete}
            handleCheckActiveSaveButton={handleCheckActiveSaveButton}
          />
        </HeaderSection>
        <FormSection data={data} setData={setData} />
      </MainLayout>
    </Layout>
  )
}