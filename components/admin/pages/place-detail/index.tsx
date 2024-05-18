"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Layout from '@/components/admin/layout/main';
import MainLayout from '@/components/admin/layout/section/main';
import HeaderSection from '@/components/admin/layout/section/header';
import FormSection from '@/components/admin/pages/place-detail/components/form-section';
import { Button } from '@/components/admin/button';
import { useGetPlaceDetail } from '@/domain/admin/query';
import type { Params } from './types';

export default function PlaceDetailPage({ params }: { params: Params }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data: placeDetail } = useGetPlaceDetail(
    params.placeId ? Number(params.placeId) : null
  )
  console.log(placeDetail?.data)

  return (
    <Layout row>
      <MainLayout>
        <HeaderSection title={`${params.placeId ? '장소 수정' : '장소 등록'}`}>
          <Button>저장하기</Button>
        </HeaderSection>
        <FormSection defaultData={params.placeId ? placeDetail?.data : null} />
      </MainLayout>
    </Layout>
  )
}