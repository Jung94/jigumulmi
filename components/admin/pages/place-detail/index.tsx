"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { APIadmin } from "@/lib/api/admin";
import { placeDetailQueryKey } from '@/domain/admin/query/useGetPlaceDetail';
import Layout from '@/components/admin/layout/main';
import MainLayout from '@/components/admin/layout/section/main';
import HeaderSection from '@/components/admin/layout/section/header';
import FormSection from '@/components/admin/pages/place-detail/components/form-section';
import { Button } from '@/components/admin/button';
import { useGetPlaceDetail, usePostPlace, usePutPlace } from '@/domain/admin/query';
import type { Params, PlaceDetail } from './types';

const defaultData = {
  name: '', // --
  mainImageUrl: '', // --
  position: { latitude: '', longitude: '' }, // --
  subwayStationList: [],
  category: '', // --
  address: '', // --
  contact: '', // --
  menuList: [], // --
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
  isApproved: false // --
}

export default function PlaceDetailPage({ params }: { params: Params }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const [ data, setData ] = useState<PlaceDetail>(defaultData)

  const { data: placeDetail } = useGetPlaceDetail(
    params.placeId ? Number(params.placeId) : null
  )
  console.log(data)

  const postPlace = usePostPlace()
  const putPlace = usePutPlace()

  const save = () => {
    let body: any = {
      ...data,
      menuList: !!data.menuList.length ? data.menuList.map(v => v.name) : null,
      placeUrl: '',
      position: {
        latitude: Number(data.position.latitude),
        longitude: Number(data.position.longitude)
      },
      subwayStationIdList: !!data.subwayStationList.length ? data.subwayStationList.map(v => v.id) : null,
    }
    delete body.subwayStationList
    delete body.createdAt
    delete body.modifiedAt
    
    // 수정
    if (params.placeId) {
      body = { ...body, placeId: Number(params.placeId) }
      console.log(body)
      putPlace.mutate(body, { 
        onSuccess(data, variables, context) {
          if (data.status === 204) {
            queryClient.refetchQueries({queryKey: ["places"]})
            queryClient.invalidateQueries([placeDetailQueryKey(Number(params.placeId))])
            // queryClient.invalidateQueries([placeDetailQueryKey(Number(params.placeId)), "places"])
            alert('수정이 완료되었습니다')
            // router.push('/admin/place?sort=1&page=1')
          }
        }
      })
    } else { // 등록
      postPlace.mutate(body, { 
        onSuccess(data, variables, context) {
          if (data.status === 204) {
            queryClient.refetchQueries({queryKey: ["places"]})
            alert('등록이 완료되었습니다')
            router.push('/admin/place?sort=1&page=1')
          }
        }
      })
    }
  }

  useEffect(()=>{
    if (!placeDetail?.data) return
    setData(placeDetail?.data)
  }, [placeDetail?.data])

  return (
    <Layout row>
      <MainLayout>
        <HeaderSection title={`${params.placeId ? '장소 수정' : '장소 등록'}`}>
          <Button onClick={save}>저장하기</Button>
        </HeaderSection>
        <FormSection data={data} setData={setData} />
      </MainLayout>
    </Layout>
  )
}