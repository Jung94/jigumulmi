"use client"
import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import Layout from '@/components/admin/layout/main';
import MainLayout from '@/components/admin/layout/section/main';
import HeaderSection from '@/components/admin/layout/section/header';
import TableSection from '@/components/admin/pages/member/components/table';
import AsideSection from '@/components/admin/layout/section/aside';
import UserDetail from '@/components/admin/pages/member/components/user-detail';
// import { useGetMemberList } from '@/domain/admin/query';
import type { PageSearchParams } from './types';
import type { Table } from '@/lib/types/table';
// import type { MembersQueryParams } from '@/domain/admin/query/useGetMemberList';

export default function MembersPage({ searchParamsOnServer }: { searchParamsOnServer: PageSearchParams }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const queryParams = {
    page: searchParamsOnServer.page ? Number(searchParamsOnServer.page) : 1,
    sort: searchParamsOnServer.sort ? Number(searchParamsOnServer.sort) : 1,
  }

  const [ selectedMember, setSelectedMember ] = useState<any>(null)

  const handleClickMember = (member: any) => {
    setSelectedMember(member)
  }

  // 모든 필터
  const [ filters, setFilters ] = useState({
    page: queryParams.page,
    sort: queryParams.sort,
  })

  const [ tableData, setTableData ] = useState<Table>({
    items: [],
    currentPage: queryParams.page,
    totalPage: 0,
    totalCount: 0,
  });
  
  // const { data: memberList } = useGetMemberList(filters);
  const memberList = null

  const handlePage = (page: number) => {
    const params = new URLSearchParams(searchParams!)
    params.set("page", `${page}`)
    
    router.push(`${pathname}?${params.toString()}`)
  }

  useEffect(()=>{
    if (!memberList?.data?.page) {
      setTableData({
        items: [],
        currentPage: 1,
        totalPage: 1,
        totalCount: 0
      })
    } else {
      setTableData({
        items: memberList.data.data,
        currentPage: memberList.data.page.currentPage,
        totalPage: memberList.data.page.totalPage,
        totalCount: memberList.data.page.totalCount
      })
    }
  }, [memberList])

  useEffect(()=>{
    setFilters({
      page: queryParams.page,
      sort: queryParams.sort,
    })
  }, [queryParams.page, queryParams.sort])

  return (
    <Layout row>
      <MainLayout>
        <HeaderSection title='유저 관리' />
        <TableSection
          items={tableData.items}
          currentPage={tableData.currentPage}
          totalPage={tableData.totalPage}
          handlePage={handlePage}
          handleClickRow={handleClickMember}
        />
      </MainLayout>
      <AsideSection style={{padding: 0, width: '20rem'}}>
        <UserDetail
          member={selectedMember}
        />
      </AsideSection>
    </Layout>
  )
}