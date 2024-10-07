"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Layout from '@/components/admin/layout/main';
import MainLayout from '@/components/admin/layout/section/main';
import HeaderSection from '@/components/admin/layout/section/header';
import TabBox from '@/components/admin/pages/place/components/tab-box';
import FilterBox from '@/components/admin/pages/place/components/filter-box';
import TableSection from '@/components/admin/pages/place/components/table';
import { useGetPlaceList } from '@/domain/admin/query';
import type { PageSearchParams } from './types';
import type { Table } from '@/lib/types/table';
import type { PlaceQueryParams } from '@/domain/admin/query/useGetPlaceList';

export default function SeasonsPage({ searchParamsOnServer }: { searchParamsOnServer: PageSearchParams }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const queryParams = {
    page: searchParamsOnServer.page ? Number(searchParamsOnServer.page) : 1,
    sort: searchParamsOnServer.sort ? Number(searchParamsOnServer.sort) : 1,
    placeName: searchParamsOnServer.placeName ? searchParamsOnServer.placeName : '',
    isFromAdmin: searchParamsOnServer.isFromAdmin ? Number(searchParamsOnServer.isFromAdmin) : 1,
  }

  // 모든 필터
  const [ filters, setFilters ] = useState<PlaceQueryParams>({
    page: queryParams.page,
    sort: queryParams.sort,
    placeName: queryParams.placeName,
    isFromAdmin: queryParams.isFromAdmin,
  })

  const [ tableData, setTableData ] = useState<Table>({
    items: [],
    currentPage: queryParams.page,
    totalPage: 0,
    totalCount: 0,
  });
  
  const { data: placeList } = useGetPlaceList(filters);

  const handleSelect = (v: any, name: string) => {
    const params = new URLSearchParams(searchParams!)
    Object.entries(filters).forEach((e: any) => params.set(e[0], e[1]))
    params.set("page", "1")

    if (name === 'placeName' || name === 'isFromAdmin') params.set(name, v)

    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams!)
    params.set("page", `${page}`)
    
    router.push(`${pathname}?${params.toString()}`)
  }

  useEffect(()=>{
    if (!placeList?.data?.page) {
      setTableData({
        items: [],
        currentPage: 1,
        totalPage: 1,
        totalCount: 0
      })
    } else {
      setTableData({
        items: placeList.data.data,
        currentPage: placeList.data.page.currentPage,
        totalPage: placeList.data.page.totalPage,
        totalCount: placeList.data.page.totalCount
      })
    }
  }, [placeList])

  useEffect(()=>{
    setFilters({
      page: queryParams.page,
      sort: queryParams.sort,
      placeName: queryParams.placeName,
      isFromAdmin: queryParams.isFromAdmin,
    })
  }, [queryParams.page, queryParams.sort, queryParams.placeName, queryParams.isFromAdmin])

  return (
    <Layout row>
      <MainLayout>
        <HeaderSection info={<TabBox active={filters.isFromAdmin} handleSelect={handleSelect} />}>
          <FilterBox 
            isShownCreation={filters.isFromAdmin === 1}
            filters={filters}
            handleSelect={handleSelect}
          />
        </HeaderSection>
        <TableSection
          items={tableData.items}
          currentPage={tableData.currentPage}
          totalPage={tableData.totalPage}
          handlePage={handlePage}
        />
      </MainLayout>
    </Layout>
  )
}