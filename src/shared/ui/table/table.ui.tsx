import { ReactNode } from 'react'
import { Th, Checkbox } from './table-atoms.ui'
import styles from './table.module.scss'
import Pagination from './pagination.ui'

type Props = {
  headContents: ReactNode
  bodyContents: ReactNode
  colWidthList: string[]
  totalPage?: number
  currentPage?: number
  hasNoPagination?: boolean
  handlePage?: (page: number) => void
}

export default function Table({
  headContents, 
  bodyContents,
  colWidthList,
  totalPage,
  currentPage,
  hasNoPagination,
  handlePage,
}: Props) {
  return (
    <div className={styles['container']}>
      <div className={styles['table-wrapper']}>
        <table className={styles['table']}>
          <colgroup>
            {colWidthList.map((width, index) => (
              <col key={index} width={width} />
            ))}
          </colgroup>
          <thead className={styles.thead}>
            <tr>
              {headContents}
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {bodyContents}
          </tbody>
        </table>
      </div>
      {!hasNoPagination &&
        <div className={styles['footer']}>
          <Pagination
            totalPage={totalPage}
            currentPage={currentPage}
            handlePage={handlePage}
          />
        </div>
      }
    </div>
  )
}

Table.Head = ({
  headList,
  checkInfo
}: {
  headList: string[]
  checkInfo?: { checked: boolean; onCheck: () => void }
}) => (
  <>
    {headList.map((data: string, index: number) => (
      <Th key={index}>
        {data === 'checkbox' ? <Checkbox isActive={checkInfo?.checked} onCheck={checkInfo?.onCheck} /> : data}
      </Th>
    ))}
  </>
)