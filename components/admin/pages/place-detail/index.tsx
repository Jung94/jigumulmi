"use client"
import { useState, useEffect } from 'react';
import { getCookie, deleteCookie } from 'cookies-next';
import { useRouter, usePathname } from 'next/navigation';
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

export default function PlaceDetailPage({ params }: { params: Params }) {
  const router = useRouter()
  const pathname = usePathname()
  const queryClient = useQueryClient()

  const [ data, setData ] = useState<PlaceDetail>(defaultData)

  const { data: placeDetail } = useGetPlaceDetail(
    params.placeId ? Number(params.placeId) : null
  )

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

  const save = (data: PlaceDetail) => {
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

    // console.log(data, body)
    // return
    
    // 수정
    if (params.placeId) {
      body = { ...body, placeId: Number(params.placeId) }
      handleModify(body)
    } else { // 등록
      handleRegister(body)
    }
  }

  useEffect(()=>{
    return () => {
      if (pathname !== '/admin/place/creation') deleteCookie('ji-admin-list-url')
    }
  }, [])

  useEffect(()=>{
    if (!placeDetail?.data) return
    setData({...placeDetail?.data})
  }, [placeDetail?.data])

  return (
    <Layout row>
      <MainLayout>
        <HeaderSection title={`${params.placeId ? `장소 수정${data ? ` (ID: ${data.id}, KakaoID: ${data.kakaoPlaceId ?? "-"})` : ''}` : '장소 등록'}`}>
          <FilterBox 
            isDetail={!!params.placeId}
            save={() => save(data)}
            handleDelete={handleDelete}
          />
        </HeaderSection>
        <FormSection data={data} setData={setData} />
      </MainLayout>
    </Layout>
  )
}