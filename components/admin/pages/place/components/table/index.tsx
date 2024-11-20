"use client"

import { setCookie } from 'cookies-next'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Table, Th, Td, Tr } from '@/components/admin/table'
import type { TableProps, BodyProps } from './types'


export const Col = (data: string[]) => 
  <>{data.map((width: string, index: number) => <col key={String(index)} span={1} width={width} />)}</>

export const Head = (data: string[]) => 
  <>{data.map((th: any, index: number) => <Th key={String(index)}>{th}</Th>)}</>

export const Body = ({
  data,
  currentPage,
  rowsPerPage,
}: BodyProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const handleClick = (placeId: number) => {
    const params = new URLSearchParams(searchParams!)
    const currentUrl = `${pathname}?${params.toString()}`
    
    setCookie("ji-admin-list-url", currentUrl)
    router.push(`/admin/place/${placeId}`)
  }

  return (
    <>
      {data.map((el: any, index: number) => 
        <Tr key={el.id} onClick={()=>handleClick(el.id)}>
          <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td>
          <Td align='left'>{el.name}</Td>
          <Td>{el.id}</Td>
          <Td>{el.categoryList.map(category => category.category).join(', ')}</Td>
          <Td>
            {el.subwayStation?.stationName}
          </Td>
          <Td>
            {el.isApproved 
              ? <div style={{width: '0.75rem', height: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#0D9276'}}></div> 
              : <div style={{width: '0.75rem', height: '0.75rem', borderRadius: '0.75rem', backgroundColor: '#EF4040'}}></div>}
          </Td>
        </Tr>
      )}
    </>
  )
}

const TableSection = ({
  isFetching, 
  items, 
  currentPage, 
  totalPage, 
  handlePage,
}: TableProps) => {
  const cols = ["30%", "10%", "20%", "25%", "15%"] // total: 100%
  const columns = ["이름", "ID", "카테고리", "지하철", "승인 여부"]
  const rowsPerPage = 15 // 한 페이지 내 row 개수

  const col = Col(cols)
  const head = Head(columns)
  const body = Body({ data: items, currentPage, rowsPerPage })

  return (
    <>
      <Table 
        col={col} 
        head={head} 
        body={body} 
        totalPage={totalPage} 
        currentPage={currentPage} 
        rowsPerPage={rowsPerPage} 
        handlePage={handlePage} 
      />
    </>
  )
}

export default TableSection