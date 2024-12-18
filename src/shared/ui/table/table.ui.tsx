import { ReactNode } from 'react'
import { Th } from './table-atoms.ui'
import styles from './table.module.scss'
import Pagination from './pagination.ui'

type Props = {
  headContents: ReactNode
  bodyContents: ReactNode
  colWidthList: string[]
  emptyMsg?: string
  orderToText?: string
  orderStyle?: any
  totalPage?: number
  currentPage?: number
  hasNoPagination?: boolean
  handlePage?: (page: number)=>void
}

export default function Table({
  headContents, 
  bodyContents,
  colWidthList,
  emptyMsg,
  orderToText="#",
  orderStyle,
  totalPage,
  currentPage,
  hasNoPagination,
  handlePage,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.table_wrap}>
        {emptyMsg 
          ? <div className={styles.empty_msg}>{emptyMsg}</div>
          : (
            <table className={styles.table}>
              <colgroup>
                {colWidthList.map((width, index) => (
                  <col key={index} width={width} />
                ))}
              </colgroup>
              <thead className={styles.thead}>
                <tr>
                  {/* <th className={styles.order} style={orderStyle}>{orderToText}</th> */}
                  {headContents}
                </tr>
              </thead>
              <tbody className={styles.tbody}>
                {bodyContents}
              </tbody>
            </table>
          )
        }
      </div>

      {!hasNoPagination &&
        <Pagination
          totalPage={totalPage}
          currentPage={currentPage}
          handlePage={handlePage}
        />
      }
    </div>
  )
}

Table.Head = (dataList: string[]) => (
  <>
    {dataList.map((data: string, index: number) => (
      <Th key={index}>{data}</Th>
    ))}
  </>
)